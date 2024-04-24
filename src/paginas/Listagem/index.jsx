import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Dialog } from "primereact/dialog";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";

import { FaImages } from "react-icons/fa";
import {
  MdModeEdit,
  MdDelete,
  MdNavigateNext,
  MdNavigateBefore,
  MdAdd,
} from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import { useFetch } from "../../hooks/useFetch";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import estilos from "./listagem.module.css";

const Listagem = () => {
  const {
    data: pratos,
    isLoading,
    nextPage,
  } = useFetch("http://localhost:8000/api/v1/pratos/", true);
  const [pratosCarregados, setPratosCarregados] = useState(pratos || []);
  const [pages, setPages] = useState({});
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [idPratoDelete, setIdPratoDelete] = useState(null)

  useEffect(() => {
    setPratosCarregados(pratos);
    setPages({
      prev: "",
      current: "http://localhost:8000/api/v1/pratos/",
      nextPage,
    });
  }, [pratos]);

  const handleNextPage = () => {
    axios.get(pages.nextPage).then((res) => {
      setPratosCarregados(res.data.results);
      setPages({
        prev: res.data.previous,
        current: nextPage,
        nextPage: res.data.next,
      });
    });
  };

  const handlePreviousPage = () => {
    // console.log(prevPage)
    axios.get(pages.prev).then((res) => {
      setPratosCarregados(res.data.results);
      setPages({
        prev: res.data.previous,
        current: nextPage,
        nextPage: res.data.next,
      });
    });
  };

  const deletar = (id) => {
    axios
      .delete(`http://localhost:8000/api/v2/pratos/${id}/`) 
      .then(() => {
        const newList = pratosCarregados.filter((prato) => prato.id !== id);
        setPratosCarregados([...newList]);
        window.location.href = "http://localhost:3000/pratos";
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        toast.success("Prato deletado com sucesso!");
      });
  };

  const footerContent = (
    <div>
      <Button
        label="Não"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className={estilos.btn}
        autoFocus
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        severity="danger"
        className={estilos.btn}
        onClick={() => deletar(idPratoDelete)}
      />
    </div>
  );

  const show = (position, id) => {
    setPosition(position);
    setIdPratoDelete(id)
    setVisible(true);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={estilos.main}>
        <div className={estilos.cardContainer}>
          <h2>Administração de pratos</h2>
          {!pages.prev && (
            <Link to={`/novo`}>
              <Button
                className={estilos.btnCadastro}
                label="Cadastrar novo prato"
                severity="success"
              >
                <MdAdd size={30} />
              </Button>
            </Link>
          )}

          {pratosCarregados.map((prato) => (
            <Accordion className={estilos.card} key={prato.id}>
              <AccordionTab header={prato.nome}>
                <div className={estilos.cardContent}>
                  <div className={estilos.cardInfo}>
                    <p>
                      <strong>Nome:</strong> {prato.nome}
                    </p>
                    <p>
                      <strong>Tag:</strong> {prato.tag}
                    </p>
                    <p>
                      <strong>Descrição:</strong> {prato.descricao}
                    </p>
                    <p>
                      <strong>Imagem:</strong>{" "}
                      <a href={prato.imagem} target="_blank" rel="noreferrer">
                        <FaImages size={35} />
                      </a>
                    </p>
                  </div>
                  <div className={estilos.cardButtons}>
                    <Link to={`/novo/${prato.id}`}>
                      <Button className={estilos.btn} label="Editar">
                        <MdModeEdit size={35} />
                      </Button>
                    </Link>
                    <Link to={`/del/${prato.id}`}>
                      <Button
                        className={estilos.btn}
                        label="Excluir"
                        severity="danger"
                        onClick={() => show("top", prato.id)}
                      >
                        <MdDelete size={35} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
          ))}
          <div className={estilos.pagination}>
            {pages.prev && (
              <MdNavigateBefore
                size={45}
                className={estilos.paginationBtn}
                onClick={handlePreviousPage}
              />
            )}
            {!pages.prev && (
              <MdNavigateBefore
                className={estilos.paginationBtnDisable}
                size={45}
              />
            )}
            <p className={estilos.paginationDesc}>Ver mais</p>
            {pages.nextPage && (
              <MdNavigateNext
                size={45}
                className={estilos.paginationBtn}
                onClick={handleNextPage}
              />
            )}
            {!pages.nextPage && (
              <MdNavigateNext
                size={45}
                className={estilos.paginationBtnDisable}
              />
            )}
          </div>
        </div>
        <div>
          <Dialog
            header="Excluir"
            visible={visible}
            position={position}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
            footer={footerContent}
            draggable={false}
            resizable={false}
            className={estilos.dialog}
          >
            <p>Deseja exlcuir este prato?</p>
          </Dialog>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
};

export default Listagem;
