import React from "react";
import Link from "next/link";
import { useStoreState } from "easy-peasy";
import { motion } from "framer-motion";

const Toaster = () => {
  const notifications = useStoreState(state => state.toaster.notifications);

  return (
    <motion.div
      variants={{
        hidden: { scale: 0.6, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } }
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
      </div>{" "}
    </motion.div>
  );
};

export default Toaster;
