import React from 'react';
import styled from 'styled-components';

const Styleddiv = styled.div`
height:max-content;
background: rgba(32, 37, 67, 0.5);
color: white;
`

const Bonds: React.FC<any> = () => {

  return (
   <Styleddiv>
     <h1>Bonds</h1>
     <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
      <div>
        <div>Current Price: (Bomb)^2</div>
        <div>BBond = {4523}BTCB</div>
      </div>
      <div>
        <div>Current Price: (Bomb)^2</div>
        <div>BBond = {4523}BTCB</div>
      </div>
      <div>
        <div>Purchase BBond <button>Purchase</button></div>
        <div>Redeem BBond <button>Redeem</button></div>
      </div>
   </Styleddiv>
  );
};
export default Bonds;
