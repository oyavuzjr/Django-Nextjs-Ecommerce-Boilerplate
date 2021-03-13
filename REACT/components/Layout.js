import Nav from "./Nav";
import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { useStoreRehydrated } from "easy-peasy";
import ReactGA from 'react-ga';
import Toaster from './Toaster';
const Layout = ({ children }) => {
  const notifications = useStoreState((state) => state.toaster.notifications);
  const router = useRouter();
  const isRehydrated = useStoreRehydrated();

  useEffect(() => {
    ReactGA.initialize(`${gtag.GA_TRACKING_ID}`, {
      'debug': true
    })
  },[])

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {isRehydrated? (
        <>
          <Nav />
          <br />
          <div className="container">{children}</div>
          {notifications.length > 0 ? (
            <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
                <Toaster/>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div id="loading-screen">
          <div id="loading-position" className="text-center">
            <div className="spinner-border" style={{height:"5rem",width:"5rem"}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="mt-4">
            Loading...
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
