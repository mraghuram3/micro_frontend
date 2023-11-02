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

//https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
//https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/
function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function System(props) {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });

  if (!props.system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
}

export function App() {
  const [value, setValue] = useState("");

  const [system, setSystem] = React.useState(undefined);

  function setComicApp() {
    setSystem({
      url: "http://192.168.1.88:5004/moduleEntry.js",
      scope: "Remote3",
      module: "./TextBox",
    });
  }

  return (
    <div style={{ background: "rgba(43, 192, 219, 0.3)" }}>
      <button onClick={setComicApp}>load comp</button>
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
        <RemoteTextBox />
      </RemoteWrapper>
      <a href="http://localhost:5002">Link to Remote1 App</a>
      <a href="http://localhost:5003">Link to Remote2 App</a>
      <br />
      <br />
      <RemoteWrapper>
        <System system={system} />
      </RemoteWrapper>
    </div>
  );
}
export default App;
