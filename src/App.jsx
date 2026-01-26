import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
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
        </SignedIn>
      </main>
    </div>
  );
}

export default App;
