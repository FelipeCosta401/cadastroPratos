import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import estilos from "./home.module.css";
import Carrousel from "../../components/Carrousel";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={estilos.main}>
        <div className={estilos.content}>
          <h1 className={estilos.title}>Pratos da casa</h1>
          <Carrousel />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
