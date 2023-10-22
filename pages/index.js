"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";
import { useWalletAuth } from "../pages/modules/wallet/hooks/useWalletAuth";
import ConnectWallet from "../components/ConnectWallet";
import { Transaction } from "../components/Transaction";
import { useWindowSize } from "../lib/ui/hooks/useWindowSize";
import React, { useState } from "react";
import Confetti from "react-confetti";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isConnecting, isConnected, connect, connectionError, wallet } = useWalletAuth();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [transactionSuccess, setTransactionSuccess] = useState(false);
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
                  <Button className="w-64">Safe Wallet</Button>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
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
