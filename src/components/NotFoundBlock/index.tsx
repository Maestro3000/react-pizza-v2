import { Link } from "react-router-dom";
import { Header } from "../Header";
import React, { FC } from "react";

export const NotFoundBlock: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Link to={"*"}>
        <div className="root">
          <Link to={"/"}>
            <span>😕</span>
          </Link>
          <h1>Ничего не найдено</h1>
          <p className="description">
            К сожалению данная страница отсутствует в нашем интернет-магазине
          </p>
        </div>
      </Link>
    </div>
  );
};
