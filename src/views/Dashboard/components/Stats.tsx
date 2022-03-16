import React from 'react';
import styled from 'styled-components';

const Stats: React.FC<any> = ({
  heading,
  bg,
  icon,
  approve,
  message,
  tvl,
  yourstake,
  returns,
  earned,
  deposit,
  withdraw,
  claimrewards,
  totalstaked,
}) => {
  return (
    <StyledStats bg={bg}>
      <div className="heading" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <h1>
          {heading} <span>Recommended</span>
          {message && <p style={{ fontSize: '0.8rem' }}>{message}</p>}
        </h1>
        <p style={{ justifySelf: 'flex-end', alignSelf: 'flex-end' }}>TVL: ${tvl}</p>
      </div>
      <hr />

      {!!totalstaked && (
        <p style={{ textAlign: 'right' }}>
          Total Staked: <span>{totalstaked}</span>
        </p>
      )}
      <div className="stats" style={{display:'grid',gridTemplateColumns:'3fr 1fr'}}>
        <div className="data" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
        <p>Daily Returns: {returns}%</p>
        <p>
          Your Stake {yourstake} = ${yourstake}
        </p>
        <p>
          Earned {earned} = ${earned}
        </p>
        </div>
        <div className="functions" style={{alignSelf:'flex-end'}}>
          <StyledButton
            disabled={!approve}
            onClick={() => {
              deposit();
            }}
          >
            Deposit
          </StyledButton>
          <StyledButton
            onClick={() => {
              withdraw();
            }}
          >
            Withdraw
          </StyledButton>
          <StyledButton
            onClick={() => {
              claimrewards();
            }}
          >
            Claim Rewards
          </StyledButton>
        </div>
      </div>
    </StyledStats>
  );
};

interface Props {
  bg: boolean;
}

const StyledStats = styled.div<Props>`
  background: ${(props) => (props.bg ? '#23284bbf' : 'none')};
  border: ${(props) => (props.bg ? '1px solid #728cdf' : 'none')};
  border-radius: 10px;
  padding: 10px;
  & h1 {
    font-size: 1.25rem;
    color: white;
    text-transform: none;
    align-self: center;
    & span {
      background: #00e8a280;
      color: white;
      font-size: 0.7rem;
      padding: 0.3rem;
      vertical-align: middle;
      border-radius: 5px;
    }
  }
`;


const StyledButton = styled.button`
  background:transparent;
  border: 1px solid currentColor;
  color:${p=>p.disabled?'#FFFFFF80':'#FFFFFF'};
  border-radius: 16px;
  margin:3px;
  padding:5px;
  margin:0 auto;
`;
export default Stats;
