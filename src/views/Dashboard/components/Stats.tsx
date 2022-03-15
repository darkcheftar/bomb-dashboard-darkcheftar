import React from 'react';
import styled from 'styled-components';

const StyledStats = styled.div`
margin:10px;
height:max-content;
background: rgba(32, 37, 67, 0.5);
color: white;
`
const Stats: React.FC<any> = ({heading, icon, tvl, totalstaked, yourstake, returns, earned, deposit, withdraw, claimrewards}) => {

  return (
      <StyledStats>
        <div className="heading">
    <h2>{heading}</h2>
    <p>Stack BSHARE and earn BOMB every epoch</p>


    <p>TVL: ${tvl}</p>

    <hr />
    </div>
    <p>Daily Returns: {returns}%</p>
    <p>Your Stake {yourstake} = ${yourstake}</p>
    <p>Earned {earned} = ${earned}</p>
    <button onClick={()=>{deposit()}}>Deposit</button>
    <button onClick={()=>{withdraw()}}>Withdraw</button>
    <button onClick={()=>{claimrewards()}}>Claim Rewards</button>

    </StyledStats>
  );
};
export default Stats;
