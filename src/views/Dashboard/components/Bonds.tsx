import React from 'react';
import styled from 'styled-components';

import useBondStats from '../../../hooks/useBondStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBombFinance from '../../../hooks/useBombFinance';

import { getDisplayBalance } from '../../../utils/formatBalance';


const Bonds: React.FC<any> = () => {
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);

  return (
    <Styleddiv>
      <h1>Bonds</h1>
      <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
      <div className="grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
        <div>
          <div>Current Price: (Bomb)^2</div>
          <div>10000 BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB</div>
        </div>
        <div>
          <div>Available to Redeem</div>
          <div>{getDisplayBalance(bondBalance)}</div>
        </div>
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
            Purchase BBond <StyledButton>Purchase</StyledButton>
          </div>
          <hr />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
            Redeem BBond <StyledButton>Redeem</StyledButton>
          </div>
        </div>
      </div>
    </Styleddiv>
  );
};

const Styleddiv = styled.div`
  margin: 10px;
  background: #23284bbf;
  border: 1px solid #728cdf;
  border-radius: 10px;
  padding: 10px;
  h1{
    color:white;
    font-size: 1.25rem;
  }
`;


const StyledButton = styled.button`
  position: relative;
  right:0;
  background: transparent;
  border: 1px solid #ffffff;
  color: white;
  border-radius: 16px;
  margin: 3px;
  padding: 5px;
  margin: 0 auto;
`;
export default Bonds;
