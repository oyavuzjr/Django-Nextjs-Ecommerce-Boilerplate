import Nav from "./Nav";
import Link from "next/link";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { useStoreRehydrated } from "easy-peasy";
import ReactGA from 'react-ga'
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
              <motion.div
                variants={{
                  hidden: { scale: 0.6, opacity: 0 },
                  visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
                }}
                initial="hidden"
                animate={notifications.length > 0 ? "visible" : "hidden"}
              >
                <div
                  className="toast show"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="toast-header">
                    <strong className="mr-auto">Success!</strong>
                    <small>now</small>
                    <button
                      type="button"
                      className="ml-2 mb-1 close"
                      data-dismiss="toast"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <Link href="/cart">
                    <a>
                      <div className="toast-body gray-hover">
                        <div className="row">
                          <div className="col col-3 text-center">
                            <img
                              width={50}
                              height={75}
                              src={notifications[notifications.length - 1].img}
                            />
                          </div>
                          <div className="col justify-content-center align-self-center">
                            {notifications[notifications.length - 1].message}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </motion.div>
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
