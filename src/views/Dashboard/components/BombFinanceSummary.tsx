import React,{useMemo} from 'react';
import styled from 'styled-components';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import BombImage from '../../../assets/img/bomb.png';
import BshareImage from '../../../assets/img/bshares.png';
import BbondImage from '../../../assets/img/bbond.png';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import { PieChart } from 'react-minimal-pie-chart';
import { roundAndFormatNumber } from '../../../0x';

const StyledDiv = styled.div`
  height: max-content;
  background: rgba(32, 37, 67, 0.5);
  color: white;
  & > h1 {
    color: white;
    font-family: Nunito;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-transform: none;
    text-align: center;
    padding: 0;
  }
  & > hr {
    width: 90%;
    border: 0.5px solid rgba(195, 197, 203, 0.75);
  }
  & table {
    width: max-content;
  }
  & .summarycontainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  & svg {
    height: 100px;
  }
  & .row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Styledspan = styled.span`
  color: #00e8a2; ;
`;

const BombFinanceSummary: React.FC<any> = ({ bombFinance, details }) => {
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const { bomb, bshare, bbond } = details;
  const cashStat = useCashPriceInEstimatedTWAP();
  const livetwap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const lastCashStat = useCashPriceInLastTWAP();
  const lasttwap =(Number(lastCashStat) / 100000000000000).toFixed(4); 
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
                <img src={BombImage} alt="BOMB" style={{ height: '20px' }} />
                $BOMB
              </td>
              <td>{roundAndFormatNumber(bomb.currentSupply, 2)}</td>
              <td>{roundAndFormatNumber(bomb.totalSupply, 2)}</td>
              <td>
                {roundAndFormatNumber(bomb.price.indollar, 2)}
                <br />
                {roundAndFormatNumber(bomb.price.inbnb, 2)}
              </td>
              <td>
                <img
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BOMB');
                  }}
                  alt="metamask fox"
                  style={{ width: '20px', filter: 'grayscale(100%)' }}
                  src={MetamaskFox}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <img src={BshareImage} alt="BSHARE" style={{ height: '20px' }} />
                $BSHARE
              </td>
              <td>{roundAndFormatNumber(bshare.currentSupply, 2)}</td>
              <td>{roundAndFormatNumber(bshare.totalSupply, 2)}</td>
              <td>
                {roundAndFormatNumber(bshare.price.indollar, 2)}
                <br />
                {roundAndFormatNumber(bshare.price.inbnb, 2)}
              </td>
              <td>
                <img
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BOMB');
                  }}
                  alt="metamask fox"
                  style={{ width: '20px', filter: 'grayscale(100%)' }}
                  src={MetamaskFox}
                />
              </td>
            </tr>
            <tr>
              <td>
                {' '}
                <img src={BbondImage} alt="BBOND" style={{ height: '20px' }} />
                $BBOND
              </td>
              <td>{roundAndFormatNumber(bbond.currentSupply, 2)}</td>
              <td>{roundAndFormatNumber(bbond.totalSupply, 2)}</td>
              <td>
                {roundAndFormatNumber(bbond.price.indollar, 2)}
                <br />
                {roundAndFormatNumber(bbond.price.inbnb, 2)}
              </td>
              <td>
                <img
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BOMB');
                  }}
                  alt="metamask fox"
                  style={{ width: '20px', filter: 'grayscale(100%)' }}
                  src={MetamaskFox}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="epochsummary">
          <div className="currentEpoch">
            {' '}
            <div>Current Epoch: </div>
            <div>{Number(currentEpoch)}</div>
          </div>
          <div className="nextEpoch">
            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /> Next
            Epoch in
          </div>
          <div className="values">
            <div>
              Live TWAP: <Styledspan>{livetwap}</Styledspan>
            </div>
            <div>
              TVL: <Styledspan>{tvl}</Styledspan>
            </div>
            <div>
              Last Epoch TWAP: <Styledspan>{lasttwap}</Styledspan>
            </div>
          </div>
        </div>
        <div className="graphicsummary">
          <PieChart
            lineWidth={15}
            radius={30}
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
                Bomb : <Styledspan>value</Styledspan>
              </div>
              <div>
                Bshare : <Styledspan>value</Styledspan>
              </div>
              <div>
                Bbond: <Styledspan>value</Styledspan>
              </div>
            </div>
            <div className="column">
              <div>
                Bomb-BTCB: <Styledspan>value</Styledspan>
              </div>
              <div>
                Bshare-BNB: <Styledspan>value</Styledspan>
              </div>
              <div>
                Others: <Styledspan>value</Styledspan>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};
export default BombFinanceSummary;
