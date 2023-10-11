document.addEventListener("DOMContentLoaded", function () {
  const connectWalletButton = document.getElementById("connect-wallet");
  const responseDiv = document.getElementById("response");

  connectWalletButton.addEventListener("click", async () => {
    try {
      // Connect to the user's wallet (e.g., using Web3.js, ethers.js, etc.)
      // This is a general placeholder; you'd replace this with your actual wallet connection logic.
      const address = await connectToWallet();

      // Send the address to your server to obtain a JWT token
      const jwt = await fetch("/path-to-your-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      }).then((res) => res.json());

      // Display the JWT or a success message
      responseDiv.textContent = `Received JWT: ${jwt.token}`;
    } catch (err) {
      responseDiv.textContent = `Error: ${err.message}`;
    }
  });
});

// Example function to connect to the user's wallet
// You'll need to modify this to use your actual wallet connection logic.
async function connectToWallet() {
  // This is a placeholder function. Replace with actual logic.
  return "0xExampleAddress";
}
