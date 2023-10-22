import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Test() {
  const [authKitSignData, setAuthKitSignData] = useState(null);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState(null);
  const [authenticationInitiated, setAuthenticationInitiated] = useState(false);
  // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments

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
    <div>
      {authKitSignData ? (
        <div>
          {/* You can now render the data here */}
          <p>User Address: {authKitSignData.address}</p>
          <p>Username: {authKitSignData.username}</p>
        </div>
      ) : (
        <Button onClick={handleWeb3Auth}>Login with Web3</Button>
      )}
      {/* Rest of your component */}
    </div>
  );
}
