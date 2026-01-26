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
          console.log('🔄 Syncing user to backend:', {
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName
          });
          
          const response = await axiosInstance.post("/api/users/sync", {
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          });
          
          console.log("✅ User synced to MongoDB:", response.data);
          setSynced(true);
        } catch (error) {
          console.error("❌ Failed to sync user:", error.response?.data || error.message);
          console.error("Full error:", error);
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
