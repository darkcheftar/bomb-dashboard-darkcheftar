import React, { useMemo } from 'react';
import styled from 'styled-components';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { PieChart } from 'react-minimal-pie-chart';
import { roundAndFormatNumber } from '../../../0x';
import {getDisplayBalance} from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';

const BombFinanceSummary: React.FC<any> = ({ bombFinance, details }) => {
  const BOMB=getDisplayBalance(useTokenBalance(bombFinance.BOMB));
  const BSHARE=getDisplayBalance(useTokenBalance(bombFinance.BSHARE));
  const BBOND=getDisplayBalance(useTokenBalance(bombFinance.BBOND));
  const BOMB_BTCB=getDisplayBalance(useTokenBalance(bombFinance.externalTokens['BOMB-BTCB-LP']));
  const BSHARE_BNB=getDisplayBalance(useTokenBalance(bombFinance.externalTokens['BSHARE-BNB-LP']));
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const { bomb, bshare, bbond } = details;
  const cashStat = useCashPriceInEstimatedTWAP();
  const livetwap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const lastCashStat = useCashPriceInLastTWAP();
  const lasttwap = (Number(lastCashStat) / 100000000000000).toFixed(4);
  const tvl = useTotalValueLocked();
  return (
    <StyledDiv>
      <h1>Bomb Finance Summary</h1>
      <hr />
      <div className="summarycontainer">
        <table className="summarytable">
          <thead>
            <tr>
              <th></th>
              <th>Current Supply</th>
              <th>Total Supply</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
               <TokenSymbol size={20} symbol={'BOMB'} />
                $BOMB
              </td>
              <td>{roundAndFormatNumber(bomb.currentSupply, 2)}</td>
              <td>{roundAndFormatNumber(bomb.totalSupply, 2)}</td>
              <td>
                ${roundAndFormatNumber(bomb.price.indollar, 2)}
                <br />
                {roundAndFormatNumber(bomb.price.inbnb, 2)}BTCB
              </td>
              <td>
                <img
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BOMB');
                  }}
                  alt="metamask fox"
                  style={{ width: '20px' }}
                  src={MetamaskFox}
                />
              </td>
            </tr>
            <tr>
              <td>
              <TokenSymbol size={20} symbol={'BSHARE'} />
                $BSHARE
              </td>
              <td>{roundAndFormatNumber(bshare.currentSupply, 2)}</td>
              <td>{roundAndFormatNumber(bshare.totalSupply, 2)}</td>
              <td>
                ${roundAndFormatNumber(bshare.price.indollar, 2)}
                <br />
                {roundAndFormatNumber(bshare.price.inbnb, 2)}BTCB
              </td>
              <td>
                <img
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BSHARE');
                  }}
                  alt="metamask fox"
                  style={{ width: '20px' }}
                  src={MetamaskFox}
                />
              </td>
            </tr>
            <tr>
              <td>
              <TokenSymbol size={20} symbol={'BBOND'} />
                $BBOND
              </td>
              <td>{roundAndFormatNumber(bbond.currentSupply, 2)}</td>
              <td>{roundAndFormatNumber(bbond.totalSupply, 2)}</td>
              <td>
                ${roundAndFormatNumber(bbond.price.indollar, 2)}
                <br />
                {roundAndFormatNumber(bbond.price.inbnb, 2)}BTCB
              </td>
              <td>
                <img
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BBOND');
                  }}
                  alt="metamask fox"
                  style={{ width: '20px' }}
                  src={MetamaskFox}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="epochsummary">
          <div className="currentEpoch">
            <div>Current Epoch: </div>
            <div style={{fontSize:'2rem'}}>{Number(currentEpoch)}</div>
          </div>
          <hr style={{width:'70%'}} />
          <div className="nextEpoch" style={{fontSize:'2.5rem'}}>
            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /> 
            <div style={{fontSize:'1.5rem'}}>Next Epoch in</div>
          </div>
         <hr style={{width:'50%'}} />
          <div className="values" style={{margin:'10px'}}>

            <div>
              Live TWAP: <Styledspan>{livetwap}</Styledspan>
            </div>
            <div>
              TVL: <Styledspan>{ roundAndFormatNumber(Number(tvl),2)}</Styledspan>
            </div>
            <div>
              Last Epoch TWAP: <Styledspan>{lasttwap}</Styledspan>
            </div>
          </div>
        </div>
        <div className="graphicsummary">
          <PieChart
            lineWidth={15}
            radius={50}
            data={[
              { title: 'Bomb', value: 10, color: 'url(#g1)' },
              { title: 'Bshare', value: 10, color: '#C3C5CB' },
              { title: 'Bbond', value: 10, color: '#FC7871' },
              { title: 'Bomb-BTCB', value: 10, color: 'url(#g1)' },
              { title: 'Bshare-BNB', value: 15, color: '#00ADE8' },
              { title: 'Others', value: 20, color: '#6A2135' },
            ]}
          >
            <defs>
              <linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="100.08%" y1=".08%" x2="-0.08%" y2="99.92%">
                <stop offset=".25" stopColor="#00E8A2" />
                <stop offset=".941" stopColor="#00ADE8" />
              </linearGradient>
            </defs>
          </PieChart>
          <div className="row">
            <div className="column">
              <div>
              <TokenSymbol size={20} symbol={'BOMB'}/>Bomb : <span>{BOMB}</span>
              </div>
              <div>
              <TokenSymbol size={20} symbol={'BSHARE'}/>Bshare : <span>{BSHARE}</span>
              </div>
              <div>
              <TokenSymbol size={20} symbol={'BBOND'}/>Bbond: <span>{BBOND}</span>
              </div>
            </div>
            <div className="column">
              <div>
              <TokenSymbol size={20} symbol={'BOMB-BTCB-LP'}/>Bomb-BTCB: <span>{BOMB_BTCB}</span>
              </div>
              <div>
              <TokenSymbol size={20} symbol={'BSHARE-BNB-LP'}/>Bshare-BNB: <span>{BSHARE_BNB}</span>
              </div>
              <div>
               Others: <span>value</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  height:min-content;
  text-align: center;
  background: #20254380;

  h1 {
    font-size: 1.25rem;;
    color: white;
    font-weight: normal;
    text-transform: none;
  }

  & .summarycontainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  & svg {
    height: 150px;
    width: 150px;
  }
  & .row{
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }
  & tr{
    border-bottom:1px solid rgba(195, 197, 203, 0.75);
  }
`;


const Styledspan = styled.span`
    color: #00E8A2;

`;

export default BombFinanceSummary;
