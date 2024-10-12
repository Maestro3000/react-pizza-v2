import React from "react";
import { Home } from "./pages";
import { Header } from "./components";

export function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Home />
        </div>
      </div>
    </div>
  );
}
