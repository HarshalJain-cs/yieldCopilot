import { createThirdwebClient } from "thirdweb";

// Create the thirdweb client
// Get your client ID from https://thirdweb.com/dashboard/settings/api-keys
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "placeholder";

// Warn but don't crash if missing
if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
  console.warn(
    "[thirdweb] Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID. Wallet features will be limited."
  );
}

export const thirdwebClient = createThirdwebClient({
  clientId,
});
