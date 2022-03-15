import React from 'react';
import styled from 'styled-components';

import useBondStats from '../../../hooks/useBondStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBombFinance from '../../../hooks/useBombFinance';

import {getDisplayBalance} from '../../../utils/formatBalance';

const Styleddiv = styled.div`
height:max-content;
background: rgba(32, 37, 67, 0.5);
color: white;
`

const Bonds: React.FC<any> = () => {
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);

  return (
   <Styleddiv>
     <h1>Bonds</h1>
     <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
      <div>
        <div>Current Price: (Bomb)^2</div>
        <div>10000 BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB</div>
      </div>
      <div>
        <div>Available to Redeem</div>
        <div>{getDisplayBalance(bondBalance)}</div>
      </div>
      <div>
        <div>Purchase BBond <button>Purchase</button></div>
        <div>Redeem BBond <button>Redeem</button></div>
      </div>
   </Styleddiv>
  );
};
export default Bonds;
