import {FiRadio,FiWifiOff,FiUser,FiAlertCircle} from 'react-icons/fi';
export type TravelMode='mixed'|'attention'|'unavailable'|'failed';
/** Proposed system surface. Values are illustrative, not device readings. */
export default function TravelGlance({mode='mixed'}:{mode?:TravelMode}){
 const missing=mode==='unavailable',low=mode==='attention',failed=mode==='failed';
 const charge=low?12:65;
 return <div className="travel-glance" data-mode={mode} role="group" aria-label="Proposed travel glance with illustrative readings">
  <div className="travel-glance-title"><span>Travel</span><span>Device status</span></div>
  <div className="travel-glance-readings">
   <div className="travel-charge" role="img" aria-label={missing?'Battery unavailable':low?'Battery 12 percent, low charge':'Battery 65 percent'}>
    <div className="travel-charge-ring"><svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="30"/><circle cx="36" cy="36" r="30" pathLength="100" strokeDasharray={`${missing?0:charge} 100`}/></svg><strong>{missing?'?':charge}<small>{missing?'':'%'}</small></strong></div><span>Watch</span>
   </div>
   <div className="travel-network" role="img" aria-label={missing?'Connection offline':'Cellular connection available'}>{missing?<FiWifiOff/>:<FiRadio/>}<strong>{missing?'Offline':'Cellular'}</strong><span>Connection</span></div>
   <div className="travel-location" role="img" aria-label={failed?'Attempted location update failed':missing?'Location update unavailable':'Last location update 12 hours ago, not live'}>{failed?<FiAlertCircle/>:<FiUser/>}<strong>{failed?'Not sent':missing?'Unknown':'12h ago'}</strong><span>{failed?'Last attempt':'Last sent'}</span></div>
  </div>
 </div>;
}
