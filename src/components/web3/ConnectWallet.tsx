import React from "react";
import Web3Wrapper from "./Web3Wrapper";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWallet = () => {
  return (
    <Web3Wrapper>
      <ConnectButton />
    </Web3Wrapper>
  );
};
export default ConnectWallet;
