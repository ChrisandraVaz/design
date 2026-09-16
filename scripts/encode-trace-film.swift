// Encode the browser's deterministic vector frames as a broadly supported, silent H.264 MP4.
import Foundation
import AVFoundation
import AppKit

let folder = CommandLine.arguments[1]
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let width = 1440, height = 1008, fps: Int32 = 30, frameCount = 540
try? FileManager.default.removeItem(at: output)
let writer = try AVAssetWriter(outputURL: output, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: width, AVVideoHeightKey: height,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 5_500_000,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoMaxKeyFrameIntervalKey: 30, AVVideoAllowFrameReorderingKey: false]
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
  kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height,
  kCVPixelBufferCGImageCompatibilityKey as String: true,
  kCVPixelBufferCGBitmapContextCompatibilityKey as String: true
])
writer.add(input)
guard writer.startWriting() else { fatalError("Cannot start encoding: \(String(describing: writer.error))") }
writer.startSession(atSourceTime: .zero)
for frame in 0..<frameCount {
  while !input.isReadyForMoreMediaData {
    if writer.status == .failed { fatalError("Encoder failed: \(String(describing: writer.error))") }
    Thread.sleep(forTimeInterval: 0.005)
  }
  try autoreleasepool {
    let url = URL(fileURLWithPath: folder).appendingPathComponent(String(format: "%04d.png", frame))
    let data = try Data(contentsOf: url)
    guard let bitmap = NSBitmapImageRep(data: data), let image = bitmap.cgImage else { fatalError("Invalid frame \(frame)") }
    var buffer: CVPixelBuffer?
    guard let pool = adaptor.pixelBufferPool,
          CVPixelBufferPoolCreatePixelBuffer(nil, pool, &buffer) == kCVReturnSuccess,
          let buffer = buffer else { fatalError("No pixel buffer") }
    CVPixelBufferLockBaseAddress(buffer, [])
    let context = CGContext(data: CVPixelBufferGetBaseAddress(buffer), width: width, height: height,
      bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
      space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
    context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
    CVPixelBufferUnlockBaseAddress(buffer, [])
    guard adaptor.append(buffer, withPresentationTime: CMTime(value: Int64(frame), timescale: fps)) else {
      fatalError("Frame \(frame) failed: \(String(describing: writer.error))")
    }
  }
  if frame % 90 == 0 { print("Encoded \(frame)/\(frameCount) frames") }
}
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
guard writer.status == .completed else { fatalError("Export failed: \(String(describing: writer.error))") }
print("Saved 18-second H.264 film: \(output.path)")
