import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
const RemoteApp = React.lazy(() => import("Remote1/App"));
const RemoteButton = React.lazy(() => import("Remote1/Button"));

const RemoteApp2 = React.lazy(() => import("Remote2/App"));
const RemoteTextBox = React.lazy(() => import("Remote2/TextBox"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      border: "1px solid red",
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

export function App() {
  const [value, setValue] = useState("");

  return (
    <div style={{ background: "rgba(43, 192, 219, 0.3)" }}>
      <h1>This is the Host!</h1>
      <h2>Remote App1:</h2>
      <RemoteWrapper>
        <RemoteApp />
      </RemoteWrapper>
      <h2>Remote Button:</h2>
      <RemoteWrapper>
        <RemoteButton />
      </RemoteWrapper>
      <br />
      <br />
      <br />
      <h2>Remote App2:</h2>
      <RemoteWrapper>
        <RemoteApp2 />
      </RemoteWrapper>
      <h2>Remote TextBox:</h2>
      <RemoteWrapper>
        <RemoteTextBox/>
      </RemoteWrapper>
      <a href="http://localhost:5002">Link to Remote1 App</a>
      <a href="http://localhost:5003">Link to Remote2 App</a>
    </div>
  );
}
export default App;
