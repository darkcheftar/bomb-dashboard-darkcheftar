import React from 'react';
import styled from 'styled-components';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import BombImage from '../../../assets/img/bomb.png';
import BshareImage from '../../../assets/img/bshares.png';
import BbondImage from '../../../assets/img/bbond.png';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import { PieChart } from 'react-minimal-pie-chart';
import { roundAndFormatNumber } from '../../../0x';

const StyledDiv = styled.div`
  height:max-content;
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
  & .row{
    display: grid;
    grid-template-columns:repeat(2, 1fr) ;
  }
`;

const Styledspan = styled.span`
  color: #00e8a2; ;
`;

const BombFinanceSummary: React.FC<any> = ({ bombFinance, details }) => {
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const {bomb, bshare, bbond} = details;
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
              <td>{roundAndFormatNumber(bomb.price.indollar, 2)}<br/>{roundAndFormatNumber(bomb.price.inbnb, 2)}</td>
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
              <td>{roundAndFormatNumber(bshare.price.indollar, 2)}<br/>{roundAndFormatNumber(bshare.price.inbnb, 2)}</td>
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
              <td>{roundAndFormatNumber(bbond.price.indollar, 2)}<br/>{roundAndFormatNumber(bbond.price.inbnb, 2)}</td>
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
              Live TWAP: <Styledspan>value</Styledspan>
            </div>
            <div>
              TVL: <Styledspan>value</Styledspan>
            </div>
            <div>
              Last Epoch TWAP: <Styledspan>value</Styledspan>
            </div>
          </div>
        </div>
        <div className="graphicsummary">
          <PieChart
            lineWidth={15}
            radius={30}
            data={[
              { title: 'One', value: 10, color: '#E38627' },
              { title: 'Two', value: 15, color: '#C13C37' },
              { title: 'Three', value: 20, color: '#6A2135' },
            ]}
          />
         <div className="row">
           <div className="column"><div>
              Live TWAP: <Styledspan>value</Styledspan>
            </div>
            <div>
              TVL: <Styledspan>value</Styledspan>
            </div>
            <div>
              Last Epoch TWAP: <Styledspan>value</Styledspan>
          
          </div></div>
           <div className="column"><div>
              Live TWAP: <Styledspan>value</Styledspan>
            </div>
            <div>
              TVL: <Styledspan>value</Styledspan>
            </div>
            <div>
              Last Epoch TWAP: <Styledspan>value</Styledspan>
            </div>
          </div>
         </div>
        </div>
      </div>
    </StyledDiv>
  );
};
export default BombFinanceSummary;
