import React from 'react';

const Links: React.FC<any> = () => {
  return (
    <div className="links" style={{ margin: '10px' }}>
      <a href="https://docs.bomb.money/welcome-start-here/strategies" style={{ width: '100%', display: 'block', textAlign: 'right',color: "#9EE6FF"}}>
        Read investment strategy &gt;
      </a>
      <button
        style={{
          width: '100%',
          background:
            'radial-gradient(59345.13% 4094144349.28% at 39511.5% -2722397851.45%, rgba(0, 245, 171, 0.5) 0%, rgba(0, 173, 232, 0.5) 100%)',
          fontFamily: 'Nunito',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: '800',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Invest Now
      </button>
      <button onClick={()=>{window.location.href='http://discord.bomb.money/'}}
        style={secondarybutton}
      >
        Chat on Discord
      </button>
      <button onClick={()=>{window.location.href='https://docs.bomb.money/welcome-start-here/readme'}} style={secondarybutton}>Read Docs</button>
    </div>
  );
};

const secondarybutton = {
  display: 'inline',
  width: '50%',
  background: '#FFFFFF80',
  fontFamily: 'Nunito',
  fontSize: '1.1rem',
  fontStyle: 'normal',
  fontWeight: '700',
  padding: '10px',
  color:'black',
  cursor:'pointer'
}
export default Links;
