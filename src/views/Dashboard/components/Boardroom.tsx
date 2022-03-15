import React from 'react';
import Stats from './Stats';

const Boardroom: React.FC<any> = () => {
  const icon = '';
  const totalstaked = 0;
  const yourstake = 0;
  const returns = 0;
  const earned = 0;
  const tvl = 0;
  const deposit = () => {};
  const withdraw = () => {};
  const claimrewards = () => {};
  const values = {
    heading:'Boardroom',
    icon,
    message:'Stake BSHARE and earn BOMB every epoch',
    bg:true,
    tvl,
    totalstaked,
    yourstake,
    returns,
    earned,
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
