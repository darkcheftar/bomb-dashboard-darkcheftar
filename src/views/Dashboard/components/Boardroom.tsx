import React, { useEffect, useMemo, useState } from 'react';
import Stats from './Stats';

import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombFinance from '../../../hooks/useBombFinance';

import { getDisplayBalance } from '../../../utils/formatBalance';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useApprove,{ApprovalState} from '../../../hooks/useApprove';//, {ApprovalState}
import useBombStats from '../../../hooks/useBombStats';
import { roundAndFormatNumber } from '../../../0x';

const Boardroom: React.FC<any> = () => {
  const bombStats = useBombStats();
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
  const tokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earning))).toFixed(2);

  const values = {
   
    heading:'Boardroom',
    icon:'BSHARE',
    message:'Stake BSHARE and earn BOMB every epoch',
    bg:true,
    approve:approveStatus!==ApprovalState.NOT_APPROVED,
    tvl:roundAndFormatNumber(boardroomTVL,2),
    totalstaked:getDisplayBalance(totalStaked),
    yourstakeInDollars:earnedInDollars,
    yourstake:getDisplayBalance(stakedBalance),
    returns:roundAndFormatNumber(useFetchBoardroomAPR()/365,2) ,
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
