import React from 'react';
import Stats from './Stats';
import styled from 'styled-components';

import useStatsForPool from '../../../hooks/useStatsForPool';
import useBank from '../../../hooks/useBank';
import useStakedBalance from '../../../hooks/useStakedBalance'
import useEarnings from '../../../hooks/useEarnings'

import {getDisplayBalance} from '../../../utils/formatBalance';
const Styleddiv = styled.div`
margin:10px;
height:max-content;
background: rgba(32, 37, 67, 0.5);
color: white;
`

const BombFarms: React.FC<any> = () => {
  const bombBtcb = useBank('BombBtcbLPBShareRewardPool');
  const bombBtcbstatsOnPool = useStatsForPool(bombBtcb);
  const bombBtcbstakedBalance = useStakedBalance(bombBtcb.contract, bombBtcb.poolId);
  const bombBtcbearnings = useEarnings(bombBtcb.contract, bombBtcb.earnTokenName, bombBtcb.poolId);
  
  const bshareBnb = useBank('BshareBnbLPBShareRewardPool');
  const bshareBnbstatsOnPool = useStatsForPool(bshareBnb);
  const bshareBnbstakedBalance = useStakedBalance(bshareBnb.contract, bshareBnb.poolId);
  const bshareBnbearnings = useEarnings(bshareBnb.contract, bshareBnb.earnTokenName, bshareBnb.poolId);  
  const bombbtcb = {
    heading:'BOMB-BTCB',
    bg:false,
    icon:'',
    tvl:bombBtcbstatsOnPool?.TVL,
    yourstake:getDisplayBalance(bombBtcbstakedBalance, bombBtcb.depositToken.decimal),
    returns:bombBtcbstatsOnPool?.dailyAPR,
    earned:getDisplayBalance(bombBtcbearnings),
    deposit:() => {},
    withdraw:() => {},
    claimrewards:() => {},
  };
  const bsharebnb = {
    heading:'BSHARE-BNB',
    bg:false,
    icon:'',
    tvl:bshareBnbstatsOnPool?.TVL,
    yourstake:getDisplayBalance(bshareBnbstakedBalance, bshareBnb.depositToken.decimal),
    returns:bshareBnbstatsOnPool?.dailyAPR,
    earned:getDisplayBalance(bshareBnbearnings),
    deposit:() => {},
    withdraw:() => {},
    claimrewards:() => {},
  };
  return (
    <Styleddiv>
    <h1>Bomb Farms</h1>
    <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
      <Stats {...bombbtcb} heading="BOMB-BTCB " />
      <Stats {...bsharebnb} heading="BSHARE-BNB" />
    </Styleddiv>
  );
};
export default BombFarms;
