import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { StoreProvider } from "easy-peasy";
import "../styles/bootstrap.min.css";
import "../styles/style.css";
import Layout from "../components/Layout";


class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <StoreProvider store={reduxStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        </StoreProvider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
