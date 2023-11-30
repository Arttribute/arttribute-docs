import Web3Wrapper from "./Web3Wrapper";
import React, { useState, useEffect, useRef } from "react";
import { SignMessage } from "./SignMessage";

const GetCredentials = () => {
  return (
    <Web3Wrapper>
      <SignMessage />
    </Web3Wrapper>
  );
};

export default GetCredentials;
