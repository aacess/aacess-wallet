import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import RootLayout from "@/components/Layout";
import { motion } from "framer-motion";

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
      <RootLayout>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </RootLayout>
    </motion.div>
  );
}
