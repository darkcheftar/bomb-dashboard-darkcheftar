import React, { useEffect, useState } from 'react';
import Stats from './Stats';

import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombFinance from '../../../hooks/useBombFinance';

import { getDisplayBalance } from '../../../utils/formatBalance';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';

const Boardroom: React.FC<any> = () => {
  const bombFinanace = useBombFinance();
  const [boardroomTVL, setBoardroomTVL] = useState(0);
  useEffect(()=>{
    const TVLcalc = async ()=>{
      const BSHAREPrice = (await bombFinanace.getShareStat()).priceInDollars;
      const boardroomtShareBalanceOf = await bombFinanace.BSHARE.balanceOf(bombFinanace.currentBoardroom().address);
      setBoardroomTVL(Number(getDisplayBalance(boardroomtShareBalanceOf, bombFinanace.BSHARE.decimal)) * Number(BSHAREPrice));
    }
    TVLcalc();
    },
    [bombFinanace]
  );
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
    tvl:boardroomTVL,
    totalstaked:getDisplayBalance(totalStaked),
    yourstake:getDisplayBalance(stakedBalance),
    returns:useFetchBoardroomAPR()/365,
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
