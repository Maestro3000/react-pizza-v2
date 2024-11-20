import styles from "./NotFoundBlock.module.scss";
import { Link } from "react-router-dom";
import { Header } from "../Header.jsx";

export function NotFoundBlock() {
  return (
    <div className="wrapper">
      <Header/>
      <Link to={ "*" }>
        <div className={ styles.root }>
          <Link to={ "/" }>
            <span>😕</span>
          </Link>
          <h1>Ничего не найдено</h1>
          <p className={ styles.description }>
            К сожалению данная страница отсутствует в нашем интернет-магазине
          </p>
        </div>
      </Link>
    </div>
  );
}
