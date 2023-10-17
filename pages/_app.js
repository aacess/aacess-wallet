import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import RootLayout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
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
  );
}
