import axios from "axios";
import { useState, useEffect } from "react";

import { useFetch } from "../../hooks/useFetch";
import estilos from "./carrousel.module.css";

import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Carrousel = () => {
  const { data: pratos, nextPage } = useFetch(
    "http://localhost:8000/api/v1/pratos/",
    false
  );
  const [pratosCarregados, setPratosCarregados] = useState([]);
  const [numVisible, setNumVisible] = useState(2);

  useEffect(() => {
    setPratosCarregados([...pratos]);
  }, [pratos]);
  

  const productTemplate = (prato) => {
    return (
      <>
        <div className={estilos.card}>
          <div className={estilos.img}>
            <img
              src={prato.imagem}
              alt="Imagem demostrativa do prato"
              className={estilos.img}
            />
          </div>
          <div className={estilos.content}>
            <h1>{prato.nome}</h1>
            <p>{prato.descricao}</p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Carousel
        value={pratos}
        numVisible={numVisible}
        numScroll={1}
        orientation="horizontal"
        verticalViewPortHeight="500px"
        itemTemplate={productTemplate}
        prevIcon={
          <i className="pi pi-chevron-up">
            <FaArrowLeft size={25} />
          </i>
        }
        nextIcon={
          <i className="pi pi-chevron-down">
            <FaArrowRight size={25}/>
          </i>
        }
      />
    </>
  );
};

export default Carrousel;
