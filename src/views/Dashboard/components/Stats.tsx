import React from 'react';
import styled from 'styled-components';
import TokenSymbol from '../../../components/TokenSymbol';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';

const Stats: React.FC<any> = ({
  heading,
  bg,
  icon,
  approve,
  message,
  tvl,
  yourstakeInDollars,
  yourstake,
  returns,
  earned,
  deposit,
  withdraw,
  claimrewards,
  totalstaked,
}) => {

  const canWithdraw = useWithdrawCheck();
  const canClaimReward = useClaimRewardCheck();

  return (
    <StyledStats bg={bg}>
      <div className="heading" style={{ display: 'grid', gridTemplateColumns: '5fr 5fr' }}>
        <h1 style={{ display: 'grid', gridTemplateColumns: '0.3fr 5fr' }}>
          <div style={{ alignSelf:'center' }}>
            <TokenSymbol size={32} symbol={icon} />
          </div>
          <div>
            {heading} <span>Recommended</span>
            {message && <p style={{ fontSize: '0.8rem' }}>{message}</p>}
          </div>
        </h1>
        <p style={{ justifySelf: 'flex-end', alignSelf: 'flex-end' }}>TVL: ${tvl}</p>
      </div>
      <hr />

      {!!totalstaked && (
        <p style={{ textAlign: 'right' }}>
          Total Staked: <span>{totalstaked}</span>
        </p>
      )}
      <div className="stats" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
        <div className="data" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div><div>Daily Returns:</div> <div>  {returns}%</div></div>
          <div>
            <div>our Stake </div>
            <div>{yourstake}</div>
             <div>	&#8776; ${yourstakeInDollars}</div>
          </div>
          <div>
            <div>Earned </div>
            <div>{earned} </div>
            <div>	&#8776; ${earned}</div>
          </div>
        </div>
        <div className="functions" style={{ alignSelf: 'flex-end' }}>
          <StyledButton
            disabled={approve}
            onClick={() => {
              deposit();
            }}
          >
            Deposit
          </StyledButton>
          <StyledButton disabled={Number(yourstake) === 0 || (!canWithdraw && !canClaimReward)}
            onClick={() => {
              withdraw();
            }}
          >
            Withdraw
          </StyledButton>
          <StyledButton
          disabled={Number(earned) === 0 || !canClaimReward}
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
  background: transparent;
  border: 1px solid currentColor;
  color: ${(p) => (p.disabled ? '#FFFFFF80' : '#FFFFFF')};
  border-radius: 16px;
  margin: 3px;
  padding: 5px;
  margin: 0 auto;
  cursor:${p=>p.disabled?'not-allowed':'pointer'};
  &:hover{
    background-color: ${p=>p.disabled?'transparent':'#FFFFFF'};
    color:${p=>p.disabled?'#FFFFFF80':'black'};
  }
`;
export default Stats;
