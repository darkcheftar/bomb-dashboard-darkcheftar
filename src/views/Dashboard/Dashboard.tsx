import React, { useMemo } from 'react';
import HomeImage from '../../assets/img/dashboard-background.jpg';
import { createGlobalStyle } from 'styled-components';
import { Switch } from 'react-router-dom';
import Page from '../../components/Page';
import { Helmet } from 'react-helmet';
import UnlockWallet from '../../components/UnlockWallet';
import BombFinanceSummary from './components/BombFinanceSummary';
import Boardroom from './components/Boardroom';
import News from './components/News';
import BondFarms from './components/BombFarms';
import Bonds from './components/Bonds';
import Links from './components/Links';
import { useWallet } from 'use-wallet';
import useBombFinance from '../../hooks/useBombFinance';
import useBombStats from '../../hooks/useBombStats';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
    color:white;
  }
`;

const TITLE = 'bomb.money | Dashboard';
const Dashboard: React.FC = () => {
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();
  const { account } = useWallet();
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const details = {
    bomb: {
      currentSupply: bombCirculatingSupply,
      totalSupply: bombTotalSupply,
      price: { indollar: bombPriceInDollars, inbnb: bombPriceInBNB },
    },
    bshare: {
      currentSupply: bShareCirculatingSupply,
      totalSupply: bShareTotalSupply,
      price: { indollar: bSharePriceInDollars, inbnb: bSharePriceInBNB },
    },
    bbond: {
      currentSupply: tBondCirculatingSupply,
      totalSupply: tBondTotalSupply,
      price: { indollar: tBondPriceInDollars, inbnb: tBondPriceInBNB },
    },
  };

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        {!!account ? (
          <div>
            <BombFinanceSummary details={details} bombFinance={bombFinance} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <Links />
                <Boardroom />
              </div>
              <div>
                <News />
              </div>
            </div>

            <div>
              <BondFarms />
            </div>

            <div>
              <Bonds />
            </div>
          </div>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

export default Dashboard;
