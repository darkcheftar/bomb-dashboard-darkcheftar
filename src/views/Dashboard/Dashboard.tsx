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
  const bBondStats = useBondStats();
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

  const bBondPriceInDollars = useMemo(
    () => (bBondStats ? Number(bBondStats.priceInDollars).toFixed(2) : null),
    [bBondStats],
  );
  const bBondPriceInBNB = useMemo(() => (bBondStats ? Number(bBondStats.tokenInFtm).toFixed(4) : null), [bBondStats]);
  const bBondCirculatingSupply = useMemo(
    () => (bBondStats ? String(bBondStats.circulatingSupply) : null),
    [bBondStats],
  );
  const bBondTotalSupply = useMemo(() => (bBondStats ? String(bBondStats.totalSupply) : null), [bBondStats]);

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
      currentSupply: bBondCirculatingSupply,
      totalSupply: bBondTotalSupply,
      price: { indollar: bBondPriceInDollars, inbnb: bBondPriceInBNB },
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
