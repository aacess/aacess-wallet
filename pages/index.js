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
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="divSize">
        <h1 className="h1Size">Welcome to MegaMask Wallet</h1>
        <div className="mt-4 mb-8">
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
                  <Button className="w-64">Cometh Wallet</Button>
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
