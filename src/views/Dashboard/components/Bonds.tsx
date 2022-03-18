import React,{useMemo,useCallback} from 'react';
import styled from 'styled-components';
import ExchangeModal from '../../Bond/components/ExchangeModal';

import useBondStats from '../../../hooks/useBondStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBombFinance from '../../../hooks/useBombFinance';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import useModal from '../../../hooks/useModal';

import {useTransactionAdder} from '../../../state/transactions/hooks';

import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';

import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';

const Bonds: React.FC<any> = () => {
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const cashPrice = useCashPriceInLastTWAP();
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const bondsPurchasable = useBondsPurchasable();
  const addTransaction = useTransactionAdder();
  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, {summary: `Redeem ${amount} BBOND`});
    },
    [bombFinance, addTransaction],
  );

  const balanceBomb = useTokenBalance(bombFinance.BOMB);
  const [onPresentP, onDismissP] = useModal(
    <ExchangeModal
      title={'Purchase'}
      description={!isBondPurchasable
        ? 'BOMB is over peg'
        : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'}
      max={balanceBomb}
      onConfirm={(value) => {
        handleBuyBonds(value);
        onDismissP();
      }}
      action={'Purchase'}
      tokenName={"BOMB"}
    />,
  );

  const balanceBbond = useTokenBalance(bombFinance.BBOND);
  const [onPresentR, onDismissR] = useModal(
    <ExchangeModal
      title={"Redeem"}
      description={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
      max={balanceBbond}
      onConfirm={(value) => {
        handleRedeemBonds(value);
        onDismissR();
      }}
      action={"Redeem"}
      tokenName={"BBOND"}
    />,
  );
  return (
    <Styleddiv>
      <div style={{display:'grid',gridTemplateColumns:'0.3fr 7fr'}}>
        <div style={{alignSelf:'center'}}>
      <TokenSymbol size={32} symbol='BBOND' />
      </div>
      <div>
      <h1>Bonds</h1>
      <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
      </div>
      </div>
      <div className="grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
        <div>
          <div>Current Price: (Bomb)^2</div>
          <div>10000 BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB</div>
        </div>
        {isBondRedeemable && <div>
         <div>Available to Redeem</div>
          <div><TokenSymbol size={50} symbol='BBOND'/>{getDisplayBalance(bondBalance)}</div>
        </div>}
        {isBondPurchasable && <div>
         <div>Available for purchase</div>
          <div><TokenSymbol size={50} symbol='BBOND'/>{getDisplayBalance(bondsPurchasable)}</div>
        </div>}
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
            Purchase BBond <StyledButton onClick={()=>{
              onPresentP();
              
              }} disabled={!bondStat || isBondRedeemable}>Purchase</StyledButton>
            <span style={{display:(!bondStat || isBondRedeemable)?'inline':'none',color:'#FFFFFF80',fontSize:'0.8rem'}}>Bomb is over peg</span>
          </div>
          <hr />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
            Redeem BBond <StyledButton onClick={()=>{
              onPresentR();
            }} disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}>Redeem</StyledButton>
            <span style={{display:(!bondStat || bondBalance.eq(0) || !isBondRedeemable)?'inline':'none', color:'#FFFFFF80',fontSize:'0.8rem'}}> Enabled when 10,000 BOMB &gt; ${BOND_REDEEM_PRICE}BTC</span>
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
    text-transform:none;
    color:white;
    font-size: 1.25rem;
  }
`;


const StyledButton = styled.button`
  background: transparent;
  border: 1px solid currentColor;
  color: ${(p) => (p.disabled ? '#FFFFFF80' : '#FFFFFF')};
  border-radius: 16px;
  margin: 3px;
  padding: 5px;
  margin: 0 auto;
  cursor:${p=>p.disabled?'not-allowed':'pointer'};
  &:hover{
    background-color: ${p=>p.disabled?'transparent':'#FFFFFF'};
    color:${p=>p.disabled?'#FFFFFF80':'black'};
  }
`;
export default Bonds;
