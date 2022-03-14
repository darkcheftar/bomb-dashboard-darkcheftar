import React from 'react';
import HomeImage from '../../assets/img/background.jpg';
import styled, { createGlobalStyle } from 'styled-components';
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
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Border = styled.div`
  border: 5px solid black;
  text-align: center;
  color: white;
`;
const TITLE = 'bomb.money | Dashboard';
const Dashboard: React.FC = () => {
  const { account } = useWallet();
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
              <Border>
                <BombFinanceSummary />
              </Border>
            </Grid>

            <Grid xs={6}>
              <Border>
                <Links />
                <Boardroom />
              </Border>
            </Grid>

            <Grid xs={6}>
              <Border>
                <News />
              </Border>
            </Grid>

            <Grid xs={12}>
              <Border>
                <BondFarms />
              </Border>
            </Grid>
            
            <Grid xs={12}>
              <Border>
                <Bonds />
              </Border>
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
