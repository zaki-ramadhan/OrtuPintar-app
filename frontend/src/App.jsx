import React from "react";
import { Toaster } from "react-hot-toast";
import Router from "./router";

function App() {
  return (
    <>
      <Router />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
