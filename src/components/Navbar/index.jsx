import { Link } from "react-router-dom";

import estilos from "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className={estilos.container}>
        <div className="logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYOZcMh96Lr_oVTVAlaFZP-LGtb-LDgSkM1AytTmI-g&s"
            alt="logo"
          />
        </div>
        <ul>
          <Link className={estilos.link} to="/">
            <li>Home</li>
          </Link>
          <Link className={estilos.link} to="/pratos">
            <li>Pratos</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
