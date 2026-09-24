"use client";
import {useState} from "react";
import {FiArrowLeft,FiArrowRight,FiTrash2,FiCopy,FiLink,FiClock,FiPlus,FiX} from "react-icons/fi";
import "./queue-flow-walkthrough.css";
const first = "Which 500 errors should engineering look at first?";
const long = "Can you break down those June 22 500 errors in more detail and tell me which routes were affected, whether they seem tied to the same deploy or regression, how often crawlers vs real users hit them, whether the failures were concentrated in one service or spread across multiple systems, what evidence suggests they could impact indexing, and what the most useful first debugging steps would be for engineering?";
const initial = "What technical changes would most improve crawlability and indexation?";
const labels = ["Initial request is running", "First message queued", "Two pending messages, input disabled", "Inspect the delete action", "First queued message enters the chat", "Read the full pending message", "Remaining message enters the chat", "Response complete, queue empty"];
function Answer({detail=false}:{detail?:boolean}) {
 return detail ? <div className="qf-answer"><p>All four 500 errors started within 6 minutes of each other on June 22 and tie back to release <u>empower.react@26.6.4</u> hitting the /checkout-form page.</p><ol><li>FRONTEND-REACT-6YQ: Laravel backend, 9,538 events.</li><li>FRONTEND-REACT-6YS: Flask backend, 8,078 events.</li><li>FRONTEND-REACT-6YN: ASP.NET Core backend, 2,015 events.</li><li>FRONTEND-REACT-6YT: Ruby on Rails backend, 1,042 events.</li></ol><p>Investigate the shared frontend change first.</p></div> : <div className="qf-answer"><p>Based on the issue list, here are the problems most likely to hurt SEO and crawl indexing, ranked by impact:</p>{[["Server 500 Errors on Frontend Pages","FRONTEND-REACT-6YT","Four separate server errors totaling about 20,000 events, all appearing on June 22. Investigate what changed in the deploy."],["LCP and Core Web Vitals Failures","FRONTEND-REACT-61T","Product pages show LCP alerts and slow page loads."],["Missing Static Assets","BACKEND-SPRING-BOOT-0TLP-1","Missing files can leave pages with broken asset references."],["N+1 Queries and Slow DB Queries","BACKEND-FLASK-CE","Slow responses increase time to first byte."],["Uncompressed Assets","FRONTEND-REACT-5P0","Large scripts increase download and parse costs."]].map(([title,issue,copy])=><p key={title}><strong>{title}</strong><br/><span className="qf-issue">{issue}</span> {copy}</p>)}</div>;
}
export default function QueueFlowWalkthrough(){
 const [step,setStep]=useState(0);
 const [removed,setRemoved]=useState<number[]>([]);
 const move=(n:number)=>{setStep(Math.max(0,Math.min(7,n)));setRemoved([]);};
 const pending=(step===1?[0]:step===2||step===3?[0,1]:step===4||step===5?[1]:[]).filter(i=>!removed.includes(i));
 const full=pending.length===2;
 const draft=step===0?first:step<3?long:"";
 return <div className="queue-flow" onKeyDown={e=>{if((e.target as HTMLElement).tagName==='INPUT')return;if(e.key==='ArrowRight'){e.preventDefault();move(step+1);}if(e.key==='ArrowLeft'){e.preventDefault();move(step-1);}}}>
  <div className="qf-stage">
   <div className="qf-window">
    <div className="qf-header"><FiX aria-hidden="true"/><span>Seer Agent</span><b>Beta</b><div aria-hidden="true"><FiCopy/><FiLink/><FiClock/><span><FiPlus/> New Chat</span></div></div>
    <div className="qf-conversation" aria-label="Conversation">
     <p className="qf-sent">{step>=5?first:initial}</p>
     {step<2?<p className="qf-progress">◌ {step===0?"Tracing…":"Creating 3 todos…"}</p>:step===2?<div className="qf-progress"><p>✓ Created 3 todos</p><p>✓ Inspected frontend and backend issues</p><p>✓ Updated 3 todos</p><p>Prioritize and summarize recommendations</p></div>:<Answer detail={step>=5}/>}
     {step===4&&<p className="qf-sent">{first}</p>}
     {step>=6&&<p className="qf-sent qf-long-sent">{long}</p>}
     {step>=4&&step<7&&<p className="qf-progress">◌ {step===6?"Analyzing recommended events…":"Tracing…"}</p>}
     {step===7&&<div className="qf-answer"><p><strong>Routes:</strong> /checkout-form, with /cart affected in the Flask and Rails issues.</p><p><strong>Same regression:</strong> The errors share the release and frontend change.</p><p><strong>Crawlers vs. real users:</strong> These requests require JavaScript and have session replays attached.</p><p><strong>Next step:</strong> Investigate CheckoutForm.jsx and validate the checkout flow after the fix.</p></div>}
    </div>
    <div className="qf-bottom">
     <div className="qf-pending" aria-label="Pending messages">{pending.map(i=><div className={`qf-pending-row ${step===5?'show-full':''}`} key={i}>
      <button className="qf-pending-text" aria-label={`Read pending message ${i+1}`}><span>{i===0?first:long}</span><span className="qf-tooltip">{i===0?first:long}</span></button>
      <button className={`qf-delete ${step===3&&i===0?'show-label':''}`} aria-label={`Delete pending message ${i+1}`} onClick={()=>setRemoved([...removed,i])}><FiTrash2/><span className="qf-delete-label">Delete pending message.</span></button>
     </div>)}</div>
     <div className="qf-composer"><input aria-label="Prepared question" value={full?"":draft} readOnly disabled={full} placeholder={full?"Clear queue to type a new message":"Ask Seer a question, or press / for commands."}/><button aria-label="Queue prepared question" disabled={full||!draft} onClick={()=>move(step+1)}><FiArrowRight/></button></div>
    </div>
   </div>
  </div>
  <div className="qf-controls"><button aria-label="Previous handoff state" disabled={step===0} onClick={()=>move(step-1)}><FiArrowLeft/></button><p aria-live="polite">{step+1} of 8, {labels[step]}</p><button aria-label="Next handoff state" disabled={step===7} onClick={()=>move(step+1)}><FiArrowRight/></button></div>
  <div className="qf-actions"><button onClick={()=>move(step<3?3:step===3?4:step<6?6:7)} disabled={step===7}>{step<3?"Finish the initial response":step===3?"Release the first queued question":step<6?"Release the remaining question":"Finish the response"}</button><button onClick={()=>move(0)}>Restart</button></div>
 </div>;
}
