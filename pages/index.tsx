"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

import { useWalletAuth } from "../pages/modules/wallet/hooks/useWalletAuth";
import ConnectWallet from "../components/ConnectWallet";
import { Transaction } from "../components/Transaction";
import { useWindowSize } from "../lib/ui/hooks/useWindowSize";
import Confetti from "react-confetti";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [authKitSignData, setAuthKitSignData] = useState(null);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState(null);
  const [authenticationInitiated, setAuthenticationInitiated] = useState(false);

  const { isConnecting, isConnected, connect, connectionError, wallet } =
    useWalletAuth();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  useEffect(() => {
    async function signIn() {
      const options: Web3AuthOptions = {
        clientId:
          "BIxWl4KU9ZIF3VauZZ7cU9WdXxSqkGanT60JWyYvjTgqwh-rpp7Ffky0nqAm2tsMvLCSH77xsJ8EL0iKMbNnN6s", // https://dashboard.web3auth.io/
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x13881",
          // https://chainlist.org/
          rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google", "facebook"],
        },
      };

      // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: "torus",
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: "metamask",
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      // https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "mandatory",
        },
        adapterSettings: {
          uxMode: "popup",
          loginConfig: {
            // Google login
            google: {
              verifier: "MegaMask Google", // Pass the Verifier name here
              typeOfLogin: "google", // Pass on the login provider of the verifier you've created
              clientId:
                "312232668489-1kic9n3ul9eop5jeah7o56kpefrls3d0.apps.googleusercontent.com", // Pass on the Google `Client ID` here
            },
          },
        },
      });

      const web3AuthConfig: Web3AuthConfig = {
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
      };

      //   // Instantiate and initialize the pack
      const pack = new Web3AuthModalPack(web3AuthConfig);
      await pack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });
      setWeb3AuthModalPack(pack);
      // Check if authentication should be initiated
      if (authenticationInitiated) {
        const data = await pack.signIn();
        setAuthKitSignData(data);
      }
    }

    // Only initiate authentication if the flag is set to true
    if (authenticationInitiated) {
      signIn();
    }
  }, [authenticationInitiated]);

  // Function to handle the Web3 authentication when the button is clicked
  const handleWeb3Auth = () => {
    setAuthenticationInitiated(true);
  };

  return (
    <main>
      <div className="divSize">
        <h1 className="h1Size">Welcome to MegaMask Wallet</h1>
        <div className="mt-4 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aacesslogo.png" alt="logo" className="Image" />
        </div>
        <div className="mt-4">
          {/* <Button className="w-64">Create Account</Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-64">
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
                <DialogDescription>
                  Select your preferred method of creating your account: <br />{" "}
                  <br />
                  Create with Email: Safe Wallet <br />
                  Create with Biometrics: Cometh Wallet
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 justify-center">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Button className="w-64" onClick={handleWeb3Auth}>
                    Safe Wallet
                  </Button>
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Button className="w-64">Cometh Wallet</Button>
                </div> */}
                <div>
                  <br />
                </div>
                <div className="Cometh grid grid-cols-4 items-center gap-4">
                  <div className="md:min-h-[70vh] gap-2 flex flex-col justify-center items-center">
                    <div className="absolute left-1/2 z-10 mt-5 flex w-72 max-w-max -translate-x-1/2 px-4">
                      <div className="ComethWallet">
                        <div className="grid divide-green-900/5 bg-green-50">
                          <ConnectWallet
                            isConnected={isConnected}
                            isConnecting={isConnecting}
                            connect={connect}
                            connectionError={connectionError}
                            wallet={wallet}
                          />
                        </div>
                        {isConnected && (
                          <Transaction
                            transactionSuccess={transactionSuccess}
                            setTransactionSuccess={setTransactionSuccess}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {transactionSuccess && (
                    <Confetti width={windowWidth} height={windowHeight} />
                  )}
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
