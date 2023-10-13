import React, { useState, useEffect, useRef } from "react";
import { useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";
import { verifyMessage } from "ethers/lib/utils";
import ky from "ky";
import Cookie from "js-cookie";
const apiURL = "https://dev.api.arttribute.io";

export function SignMessage() {
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [projectId, setProjectId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      setAddress(address);
      setSignature(data);
    },
  });
  const message = "Get credentials";

  useEffect(() => {
    getCredentials();
  }, [address, signature]);

  async function getCredentials() {
    if (message && signature) {
      await createUser();
      await signInUser();
      //await createProject();
      //await generateApiKey();
    }
  }
  async function createUser() {
    const userName = "Baranaba";
    const data = await ky
      .post("v1/users", {
        json: { address, message, signature, name: userName },
        prefixUrl: apiURL,
      })
      .json();
    console.log(data);
  }

  async function signInUser() {
    const data = await ky
      .post("v1/auth", {
        json: { address, message, signature },
        prefixUrl: apiURL,
      })
      .json<{ token: string }>();

    Cookie.set("accessToken", data.token);
    setJwtToken(data.token);
    console.log(data);
  }

  async function createProject() {
    //create project
  }

  async function generateApiKey() {
    //generate api key
  }

  return (
    <div>
      <button onClick={(e) => signMessage({ message })}>Get credentials</button>
      <p>address: {address}</p>
      <p>signature:{signature}</p>
      <p>user token:{jwtToken}</p>
      <p>project Id:{projectId}</p>
      <p>api key:{apiKey}</p>
    </div>
  );
}
