import React, { useState } from "react";
import { Home } from "./pages";
import { Header } from "./components";
import { createContext } from "react";
export const SearchContext = createContext("");
export function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Home />
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}
