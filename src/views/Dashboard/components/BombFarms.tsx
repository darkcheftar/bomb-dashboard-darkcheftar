import React,{useMemo} from 'react';
import Stats from './Stats';
import styled from 'styled-components';

import useStatsForPool from '../../../hooks/useStatsForPool';
import useBank from '../../../hooks/useBank';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useStakedBalance from '../../../hooks/useStakedBalance'
import useEarnings from '../../../hooks/useEarnings'
import useRedeem from '../../../hooks/useRedeem'
import useHarvest from '../../../hooks/useHarvest'
import useApprove,{ApprovalState} from '../../../hooks/useApprove'

import {getDisplayBalance} from '../../../utils/formatBalance';


const BombFarms: React.FC<any> = () => {
  const bombStats = useBombStats();
  const tShareStats = useShareStats();

  
  





  const bombBtcb = useBank('BombBtcbLPBShareRewardPool');
  const bombBtcbstatsOnPool = useStatsForPool(bombBtcb);
  const bombBtcbstakedBalance = useStakedBalance(bombBtcb.contract, bombBtcb.poolId);
  const bombBtcbearnings = useEarnings(bombBtcb.contract, bombBtcb.earnTokenName, bombBtcb.poolId);
  const {onRedeem:onRedeemBombbtcb} = useRedeem(bombBtcb);
  const {onReward:onRewardBombbtcb} = useHarvest(bombBtcb);
  const [bombBtcbApproveStatus, bombBtcbApprove] = useApprove(bombBtcb.depositToken, bombBtcb.address);
  const bombBtcbStats = bombBtcb.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const bombBtcbPriceInDollars = useMemo(
    () => (bombBtcbStats ? Number(bombBtcbStats.priceInDollars).toFixed(2) : null),
    [bombBtcbStats],
  );
  const bombBtcbearnedInDollars = (Number(bombBtcbPriceInDollars) * Number(getDisplayBalance(bombBtcbearnings))).toFixed(2);

  const bshareBnb = useBank('BshareBnbLPBShareRewardPool');
  const bshareBnbstatsOnPool = useStatsForPool(bshareBnb);
  const bshareBnbstakedBalance = useStakedBalance(bshareBnb.contract, bshareBnb.poolId);
  const bshareBnbearnings = useEarnings(bshareBnb.contract, bshareBnb.earnTokenName, bshareBnb.poolId);
  const {onRedeem:onRedeemBsharebnb} = useRedeem(bshareBnb);
  const {onReward:onRewardBsharebnb} = useHarvest(bshareBnb);
  const [bshareBnbApproveStatus, bsharebnbApprove] = useApprove(bshareBnb.depositToken, bshareBnb.address);
  const bshareBnbStats = bshareBnb.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const bSharebnbPriceInDollars = useMemo(
    () => (bshareBnbStats ? Number(bshareBnbStats.priceInDollars).toFixed(2) : null),
    [bshareBnbStats],
  );
  const bshareBnbearnedInDollars = (Number(bSharebnbPriceInDollars) * Number(getDisplayBalance(bshareBnbearnings))).toFixed(2);
  
  const bombbtcb = {
    heading:'BOMB-BTCB',
    bg:false,
    icon:bombBtcb.depositTokenName,
    tvl:bombBtcbstatsOnPool?.TVL,
    yourstake:getDisplayBalance(bombBtcbstakedBalance, bombBtcb.depositToken.decimal),
    yourstakeInDollars:bombBtcbearnedInDollars,
    approve:bombBtcbApproveStatus!==ApprovalState.NOT_APPROVED,
    returns:bombBtcbstatsOnPool?.dailyAPR,
    earned:getDisplayBalance(bombBtcbearnings),
    deposit:bombBtcbApprove,
    withdraw: onRedeemBombbtcb,
    claimrewards:onRewardBombbtcb,
  };
  const bsharebnb = {
    heading:'BSHARE-BNB',
    bg:false,
    icon:bshareBnb.depositTokenName,
    tvl:bshareBnbstatsOnPool?.TVL,
    yourstakeInDollars:bshareBnbearnedInDollars,
    yourstake:getDisplayBalance(bshareBnbstakedBalance, bshareBnb.depositToken.decimal),
    returns:bshareBnbstatsOnPool?.dailyAPR,
    approve:bshareBnbApproveStatus!==ApprovalState.NOT_APPROVED,
    earned:getDisplayBalance(bshareBnbearnings),
    deposit:bsharebnbApprove,
    withdraw:onRedeemBsharebnb,
    claimrewards:onRewardBsharebnb,
  };
  return (
    <Styleddiv>
      <div style={{display:'grid',gridTemplateRows:'0.5fr 1fr',gridTemplateColumns:'5fr 1fr'}}>
    <h1>Bomb Farms</h1><StyledButton onClick={()=>{alert('Functionality Coming soon...')}}>Claim All</StyledButton>
    <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
    </div>
      <Stats {...bombbtcb} />
      <hr />
      <Stats {...bsharebnb} />
    </Styleddiv>
  );
};

const Styleddiv = styled.div`
  margin:10px;
  background:#23284bbf;
  border:  1px solid #728cdf;
  border-radius: 10px;
  padding: 10px;
  h1{
    color:white;
    font-size:1.25rem;
  }
`
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

export default BombFarms;
