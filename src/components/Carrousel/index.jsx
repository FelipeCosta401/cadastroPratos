import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useFetch } from "../../hooks/useFetch";
import estilos from "./carrousel.module.css";

const Carrousel = () => {
  const { data: pratos, nextPage } = useFetch(
    "http://localhost:8000/api/v1/pratos/",
    false
  );
  const [pratosCarregados, setPratosCarregados] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(2)

  useEffect(() => {
    setPratosCarregados([...pratos]);
  }, [pratos]);

  useEffect(()=>{
    const handleSize = () =>{
      if(window.innerWidth < 960){
        setSlidesPerView(1)       
      } else{
        setSlidesPerView(2)       
      }
    }

    handleSize()

    window.addEventListener("resize", handleSize)

    return () =>{
      window.removeEventListener("resize", handleSize)
    }



  }, [])

  return (
    <>
      <div className={estilos.container}>
        <Swiper
          slidesPerView={slidesPerView}
          pagination={{ clickable: true }}
          spaceBetween={50}
          navigation
        >
          {pratos.map((prato) => (
            <SwiperSlide className={estilos.fodasse} key={prato.id}>
              <div className={estilos.card}>
                <div>
                  <img
                    className={estilos.img}
                    src={prato.imagem}
                    alt="imagem demosntrativa do prato"
                  />
                </div>
                <div className={estilos.cardContent}>
                  <h4>{prato.nome}</h4>
                  <p>{prato.descricao}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Carrousel;
