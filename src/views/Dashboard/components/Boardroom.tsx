import React from 'react';
import Stats from './Stats';

import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';

import { getDisplayBalance } from '../../../utils/formatBalance';

const Boardroom: React.FC<any> = () => {

  const deposit = () => {};
  const withdraw = () => {};
  const claimrewards = () => {};
  const stakedBalance = useStakedBalanceOnBoardroom();
  const totalStaked = useTotalStakedOnBoardroom();
  const earning = useEarningsOnBoardroom();

  const values = {
   
    heading:'Boardroom',
    icon:'',
    message:'Stake BSHARE and earn BOMB every epoch',
    bg:true,
    tvl:0,
    totalstaked:getDisplayBalance(totalStaked),
    yourstake:getDisplayBalance(stakedBalance),
    returns:0,
    earned:getDisplayBalance(earning),
    deposit,
    withdraw,
    claimrewards,
  };
  return (
    <>
      <Stats {...values} />
    </>
  );
};
export default Boardroom;
