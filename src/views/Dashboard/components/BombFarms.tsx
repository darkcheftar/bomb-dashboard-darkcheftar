import React from 'react';
import Stats from './Stats';


const BombFarms: React.FC<any> = () => {
 // dummy start
 const heading = "";
 const icon = "";
 const totalstaked = 0;
 const yourstake = 0;
 const returns = 0;
 const earned = 0;
 const tvl = 0;
 const deposit = ()=>{};
 const withdraw = ()=>{};
 const claimrewards = ()=>{};
 const values = {heading, icon, tvl, totalstaked, yourstake, returns, earned, deposit, withdraw, claimrewards}
 // dummy ends
  return (
    <>
   <Stats {...values} heading='BOMB-BTCB '/>
   <Stats {...values} heading='BSHARE-BNB'/>
   </>
  );
};
export default BombFarms;
