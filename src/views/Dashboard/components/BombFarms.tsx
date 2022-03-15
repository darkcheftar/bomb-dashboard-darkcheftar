import React from 'react';
import Stats from './Stats';
import styled from 'styled-components';

const Styleddiv = styled.div`
margin:10px;
height:max-content;
background: rgba(32, 37, 67, 0.5);
color: white;
`

const BombFarms: React.FC<any> = () => {
  const bombbtcb = {
    heading:'BOMB-BTCB',
    bg:false,
    icon:'',
    tvl:0,
    totalstaked:0,
    yourstake:0,
    returns:0,
    earned:0,
    deposit:() => {},
    withdraw:() => {},
    claimrewards:() => {},
  };
  const bsharebnb = {
    heading:'BSHARE-BNB',
    bg:false,
    icon:'',
    tvl:0,
    totalstaked:0,
    yourstake:0,
    returns:0,
    earned:0,
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
