import React from 'react';
import Stats from './Stats';
import styled from 'styled-components';

import useStatsForPool from '../../../hooks/useStatsForPool';
import useBank from '../../../hooks/useBank';
import useStakedBalance from '../../../hooks/useStakedBalance'
import useEarnings from '../../../hooks/useEarnings'
import useRedeem from '../../../hooks/useRedeem'
import useHarvest from '../../../hooks/useHarvest'
import useApprove,{ApprovalState} from '../../../hooks/useApprove'

import {getDisplayBalance} from '../../../utils/formatBalance';


const BombFarms: React.FC<any> = () => {
  const bombBtcb = useBank('BombBtcbLPBShareRewardPool');
  const bombBtcbstatsOnPool = useStatsForPool(bombBtcb);
  const bombBtcbstakedBalance = useStakedBalance(bombBtcb.contract, bombBtcb.poolId);
  const bombBtcbearnings = useEarnings(bombBtcb.contract, bombBtcb.earnTokenName, bombBtcb.poolId);
  const {onRedeem:onRedeemBombbtcb} = useRedeem(bombBtcb);
  const {onReward:onRewardBombbtcb} = useHarvest(bombBtcb);
  const [bombBtcbApproveStatus, bombBtcbApprove] = useApprove(bombBtcb.depositToken, bombBtcb.address);

  const bshareBnb = useBank('BshareBnbLPBShareRewardPool');
  const bshareBnbstatsOnPool = useStatsForPool(bshareBnb);
  const bshareBnbstakedBalance = useStakedBalance(bshareBnb.contract, bshareBnb.poolId);
  const bshareBnbearnings = useEarnings(bshareBnb.contract, bshareBnb.earnTokenName, bshareBnb.poolId);
  const {onRedeem:onRedeemBsharebnb} = useRedeem(bshareBnb);
  const {onReward:onRewardBsharebnb} = useHarvest(bshareBnb);
  const [bSharebnbApproveStatus, bsharebnbApprove] = useApprove(bshareBnb.depositToken, bshareBnb.address);


  const bombbtcb = {
    heading:'BOMB-BTCB',
    bg:false,
    icon:'',
    tvl:bombBtcbstatsOnPool?.TVL,
    yourstake:getDisplayBalance(bombBtcbstakedBalance, bombBtcb.depositToken.decimal),
    approve:bombBtcbApproveStatus===ApprovalState.APPROVED,
    returns:bombBtcbstatsOnPool?.dailyAPR,
    earned:getDisplayBalance(bombBtcbearnings),
    deposit:bombBtcbApprove,
    withdraw: onRedeemBombbtcb,
    claimrewards:onRewardBombbtcb,
  };
  const bsharebnb = {
    heading:'BSHARE-BNB',
    bg:false,
    icon:'',
    tvl:bshareBnbstatsOnPool?.TVL,
    yourstake:getDisplayBalance(bshareBnbstakedBalance, bshareBnb.depositToken.decimal),
    returns:bshareBnbstatsOnPool?.dailyAPR,
    approve:bSharebnbApproveStatus===ApprovalState.APPROVED,
    earned:getDisplayBalance(bshareBnbearnings),
    deposit:bsharebnbApprove,
    withdraw:onRedeemBsharebnb,
    claimrewards:onRewardBsharebnb,
  };
  return (
    <Styleddiv>
    <h1>Bomb Farms</h1>
    <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
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

export default BombFarms;
