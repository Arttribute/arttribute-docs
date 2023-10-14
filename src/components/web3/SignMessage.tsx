import React, { useState, useEffect, useRef } from "react";
import { useSignMessage } from "wagmi";
import { ethers } from "ethers";
import ky from "ky";
import Cookie from "js-cookie";
const apiURL = "https://dev.api.arttribute.io";

export function SignMessage() {
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [projectId, setProjectId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = ethers.verifyMessage(variables.message, data);
      setAddress(address);
      setSignature(data);
    },
  });
  const message = "Get credentials";

  useEffect(() => {
    getCredentials();
  }, [address, signature]);

  async function getCredentials() {
    setLoading(true);
    if (message && signature) {
      await createUser();
      await signInUser();
      //await createProject();
      //await generateApiKey();
      setLoading(false);
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

  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setToastVisible] = useState(false);

  const copyToClipboard = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    // Set the toast message and make it visible
    setToastMessage("copied !");
    setToastVisible(true);

    // Hide the toast after 3 seconds
    setTimeout(() => setToastVisible(false), 3000);
  };

  const toastStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#323232",
    color: "white",
    padding: "10px 20px",
    borderRadius: "4px",
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
    display: isToastVisible ? "block" : "none",
    zIndex: 1000,
  };
  const copyIconSVG = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM5 6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6ZM9 0C7.34315 0 6 1.34315 6 3V3.58579L8.29289 6H11.7071L14 3.58579V3C14 1.34315 12.6569 0 11 0H9ZM10 2H11V4H10V2Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div style={containerStyle}>
      {isLoading && (
        <div style={loaderContainerStyle}>
          <div style={loaderStyle}></div>
        </div>
      )}
      <button style={buttonStyle} onClick={(e) => signMessage({ message })}>
        Get credentials
      </button>

      <div style={infoContainerStyle}>
        <p>User token</p>
        <textarea
          style={textareaStyle}
          readOnly
          onClick={() => copyToClipboard(jwtToken)}
          value={jwtToken}
        ></textarea>
        <button
          style={copyButtonStyle}
          onClick={() => copyToClipboard(jwtToken)}
        >
          {copyIconSVG}
        </button>
      </div>
      <div style={infoContainerStyle}>
        <p>Project Id</p>
        <textarea
          style={textareaStyle}
          readOnly
          onClick={() => copyToClipboard(projectId)}
          value={projectId}
        ></textarea>
        <button
          style={copyButtonStyle}
          onClick={() => copyToClipboard(projectId)}
        >
          {copyIconSVG}
        </button>
      </div>
      <div style={infoContainerStyle}>
        <p>API Key</p>
        <textarea
          style={textareaStyle}
          readOnly
          onClick={() => copyToClipboard(apiKey)}
          value={apiKey}
        ></textarea>
        <button style={copyButtonStyle} onClick={() => copyToClipboard(apiKey)}>
          {copyIconSVG}
        </button>
      </div>

      <div style={toastStyle}>{toastMessage}</div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  width: "100%",
  margin: "50px auto",
  fontFamily: "Arial, sans-serif",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  margin: "10px",
  cursor: "pointer",
  backgroundColor: "#3f00c8",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

const infoStyle: React.CSSProperties = {
  padding: "2px",
  margin: "1px 0",
  width: "100%",
};

const copyButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "14px",
  right: "8px",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};
const infoContainerStyle: React.CSSProperties = {
  ...infoStyle,
  position: "relative",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "4px",
  borderRadius: "4px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #d1d1d1",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  resize: "none",
  outline: "none",
  fontFamily: "inherit",
  fontSize: "inherit",
  cursor: "pointer",
};

const loaderContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "4px", // You can adjust the height if necessary
  backgroundColor: "#e0e0e0", // Base/background color
  position: "relative",
};

const loaderStyle: React.CSSProperties = {
  height: "100%",
  width: "70%", // You can adjust the initial width if necessary
  backgroundColor: "#3498db", // The color of the active loading bar
  position: "absolute",
  left: "0",
  animation: "loadingAnimation 1.5s infinite",
};

const keyframes = `
    @keyframes loadingAnimation {
        to {
            left: 100%;
        }
    }
`;
