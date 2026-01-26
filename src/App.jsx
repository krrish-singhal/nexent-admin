import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axiosInstance from "./lib/axios";

function App() {
  const { user, isSignedIn } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user && !synced) {
        try {
          const userData = {
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          };
          
          console.log('🔄 Syncing user to backend:', userData);
          console.log('📡 Backend URL:', import.meta.env.VITE_API_URL);
          
          const response = await axiosInstance.post("/api/users/sync", userData);
          
          console.log("✅ User synced to MongoDB:", response.data);
          setSynced(true);
        } catch (error) {
          console.error("❌ Failed to sync user:");
          console.error("Error message:", error.message);
          console.error("Error response:", error.response?.data);
          console.error("Error status:", error.response?.status);
          console.error("Full error:", error);
          
          // Show alert for debugging
          alert(`Sync failed: ${error.response?.status || error.message}\nCheck console for details`);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user, synced]);

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main>
        <h1>Welcome to Nexent</h1>
        <SignedOut>
          <p>Please sign in to continue.</p>
        </SignedOut>
        <SignedIn>
          <p>You are signed in!</p>
          {synced && <p style={{ color: "green" }}>✅ Synced to database</p>}
        </SignedIn>
      </main>
    </div>
  );
}

export default App;
