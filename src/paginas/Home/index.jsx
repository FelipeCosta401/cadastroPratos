import axios from "axios";
import { useEffect, useState } from "react";

import { useFetch } from "../../hooks/useFetch";
import Navbar from "../../components/Navbar";
import CardComponent from "../../components/Card";

import estilos from "./home.module.css";

const Home = () => {
  const { data: pratos, nextPage: currentPage} = useFetch(
    "http://localhost:8000/api/v1/pratos/"
  );
  const [pratosCarregados, setPratosCarregados] = useState([]);
  const [nextPage, setNextPage] = useState()


  useEffect(() => {
    if (pratos.length > 0) {
      setPratosCarregados(pratos);
      setNextPage(currentPage)
    }
  }, [pratos]);

  

  const proxPagina = () => {
    axios.get(nextPage).then((res) => {
      setPratosCarregados([...pratosCarregados, ...res.data.results]);
      setNextPage(res.data.next)
    });
  };


  return (
    <>
      <div className={estilos.container}>
        <header>
          <Navbar />
        </header>
        <main>
          <div className={estilos.cards}>
            {pratosCarregados.map((prato) => (
              <div className={estilos.card} key={prato.id}>
                <CardComponent
                  titulo={prato.nome}
                  desc={prato.descricao}
                  img={prato.imagem}
                />
              </div>
            ))}
          </div>
          {nextPage && (
            <input
              type="submit"
              onClick={() => proxPagina()}  
              value="Ver mais"
            />
          )}
        </main>
        <footer>
          <h4>Desenvolvido por Felipe Antunes</h4>
        </footer>
      </div>
    </>
  );
};

export default Home;
