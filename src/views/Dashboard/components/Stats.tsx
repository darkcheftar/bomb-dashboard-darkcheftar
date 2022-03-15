import React from 'react';
import styled from 'styled-components';

interface Props {
  bg: boolean;
}

const StyledStats = styled.div<Props>`
margin:10px;
height:max-content;
background: ${(props)=>{
  if (props.bg) return "rgba(32, 37, 67, 0.5)"
  return "none"
  }};
color: white;
`

const Stats: React.FC<any> = ({heading, bg, icon,message, tvl, totalstaked, yourstake, returns, earned, deposit, withdraw, claimrewards}) => {

  return (
      <StyledStats bg={bg}>
        <div className="heading">
    <h2>{heading}</h2>
    <p>{message}</p>


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
