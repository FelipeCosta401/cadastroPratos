import Navbar from "../../components/Navbar";

import estilos from "./home.module.css";
import Carrousel from "../../components/Carrousel";

const Home = () => {

  return (
    <>
      <div className={estilos.container}>
        <header>
          <Navbar />
        </header>
        <main>
          <Carrousel/>          
        </main>
        <footer>
          <h4>Desenvolvido por Felipe Antunes</h4>
        </footer>
      </div>
    </>
  );
};

export default Home;
