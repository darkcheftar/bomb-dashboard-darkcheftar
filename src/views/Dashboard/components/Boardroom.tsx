import React, { useEffect, useState } from 'react';
import Stats from './Stats';

import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombFinance from '../../../hooks/useBombFinance';

import { getDisplayBalance } from '../../../utils/formatBalance';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useApprove from '../../../hooks/useApprove';//, {ApprovalState}

const Boardroom: React.FC<any> = () => {
  const bombFinance = useBombFinance();
  const [boardroomTVL, setBoardroomTVL] = useState(0);
  useEffect(()=>{
    const TVLcalc = async ()=>{
      const BSHAREPrice = (await bombFinance.getShareStat()).priceInDollars;
      const boardroomtShareBalanceOf = await bombFinance.BSHARE.balanceOf(bombFinance.currentBoardroom().address);
      setBoardroomTVL(Number(getDisplayBalance(boardroomtShareBalanceOf, bombFinance.BSHARE.decimal)) * Number(BSHAREPrice));
    }
    TVLcalc();
    },
    [bombFinance]
  );
  
  const stakedBalance = useStakedBalanceOnBoardroom();
  const totalStaked = useTotalStakedOnBoardroom();
  const earning = useEarningsOnBoardroom();
  const { onRedeem } = useRedeemOnBoardroom();
  const {onReward} = useHarvestFromBoardroom();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
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
    deposit:approve,
    withdraw:onRedeem,
    claimrewards:onReward,
  };
  return (
    <>
      <Stats {...values} />
    </>
  );
};
export default Boardroom;
