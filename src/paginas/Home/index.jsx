import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
          <div className={estilos.content}>
            <h1 className={estilos.title}>Pratos da casa</h1>
            <Carrousel />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;
