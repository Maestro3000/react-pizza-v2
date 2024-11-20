import { Header } from "./components";
import { Outlet } from "react-router-dom";


export function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
