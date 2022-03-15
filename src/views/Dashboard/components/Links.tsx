import React from 'react';



const Links: React.FC<any> = () => {
 
  return (
    <div className="links" style={{margin:'10px'}}>
        <a href='/dashboard' style={{width:'50%'}}>Read investment strategy &gt;</a>
        <button style={{width:'100%'}}>Invest Now</button>
        <button style={{display:'inline', width:"50%"}}>Chat on Discord</button>
        <button style={{display:'inline', width:"50%"}}>Read Docs</button>
    </div>
  );
};
export default Links;
