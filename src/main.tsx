import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";

import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  localnet: { url: "http://127.0.0.1:3041/v1" },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const X = () => {
  const [activeNetwork, setActiveNetwork] = useState("localnet" as any);
  return (
    <SuiClientProvider
      networks={networkConfig}
      network={activeNetwork}
      onNetworkChange={(network) => {
        // setActiveNetwork(network);
      }}
    >
      <WalletProvider autoConnect>
        <App />
      </WalletProvider>
    </SuiClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <X />
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
