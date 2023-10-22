import "../styles/globals.css";
import RootLayout from "../components/Layout";
import { motion } from "framer-motion";
import { WalletProvider } from "./modules/wallet/services/context";

export default function App({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
      <WalletProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      </WalletProvider>
    </motion.div>
  );
}
