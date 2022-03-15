import React, { useMemo } from 'react';
import HomeImage from '../../assets/img/background.jpg';
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
import { Grid } from '@material-ui/core';
import { useWallet } from 'use-wallet';
// import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useBombFinance from '../../hooks/useBombFinance';
import useBombStats from '../../hooks/useBombStats';
// import useLpStats from '../../hooks/useLpStats';
// import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const TITLE = 'bomb.money | Dashboard';
const Dashboard: React.FC = () => {
  // const TVL = useTotalValueLocked();
  // const bombFtmLpStats = useLpStatsBTC('BOMB-BTCB-LP');
  // const bShareFtmLpStats = useLpStats('BSHARE-BNB-LP');
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();

  const { account } = useWallet();

  // const bombLPStats = useMemo(() => (bombFtmLpStats ? bombFtmLpStats : null), [bombFtmLpStats]);
  // const bshareLPStats = useMemo(() => (bShareFtmLpStats ? bShareFtmLpStats : null), [bShareFtmLpStats]);
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
      price: { indollar: bombPriceInDollars,inbnb:bombPriceInBNB    }
    },
    bshare: {
      currentSupply: bShareCirculatingSupply,
      totalSupply: bShareTotalSupply,
      price: { indollar: bSharePriceInDollars, inbnb:bSharePriceInBNB },
    },
    bbond: {
      currentSupply: tBondCirculatingSupply,
      totalSupply: tBondTotalSupply,
      price: { indollar: tBondPriceInDollars, inbnb:tBondPriceInBNB },
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
          <Grid container spacing={2}>
            <Grid xs={12}>
              <BombFinanceSummary details={details} bombFinance={bombFinance}/>
            </Grid>

            <Grid xs={6}>
              <Links />
              <Boardroom />
            </Grid>

            <Grid xs={6} style={{ flex: 'auto' }}>
              <News />
            </Grid>

            <Grid xs={12}>
              <BondFarms />
            </Grid>

            <Grid xs={12}>
              <Bonds />
            </Grid>
          </Grid>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

export default Dashboard;
