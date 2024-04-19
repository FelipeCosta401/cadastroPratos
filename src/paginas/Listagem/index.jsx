import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
} from "@mui/material";

import { IoMdAddCircle } from "react-icons/io";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaImages, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbFaceIdError } from "react-icons/tb";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("Prato deletado com sucesso!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      <div className={estilos.container}>
        <header>
          <Navbar />
        </header>
        <main className={estilos.main}>
          <div className={estilos.tabela}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Tag</TableCell>
                    <TableCell align="center">Imagem</TableCell>
                    <TableCell align="center">Restaurante</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Excluir</TableCell>
                    <TableCell align="center">
                      <Link to={"/novo"}>
                        <IoMdAddCircle
                          className={estilos.iconeCriar}
                          size={30}
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && "Carregando..."}
                  {pratosCarregados.map((prato) => (
                    <TableRow key={prato.id}>
                      <TableCell align="center">{prato.nome}</TableCell>
                      <TableCell align="center">{prato.tag}</TableCell>
                      <TableCell align="center">
                        <a href={prato.imagem} target="_blank" rel="noreferrer">
                          {prato.imagem && (
                            <FaImages className={estilos.icone_img} size={25} />
                          )}
                          {!prato.imagem && <TbFaceIdError size={30} />}
                        </a>
                      </TableCell>
                      <TableCell align="center">{prato.restaurante}</TableCell>
                      <TableCell align="center">
                        <Link to={`/novo/${prato.id}`}>
                          <FaEdit className={estilos.icone_editar} size={25} />
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/del/${prato.id}`}>
                          <MdDelete
                            className={estilos.icone_del}
                            size={25}
                            onClick={() => deletar(prato.id)}
                          />
                        </Link>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className={estilos.table_footer}>
                    <TableCell colSpan={6}></TableCell>
                    <TableCell align="center">
                      {pages.prev && (
                        <GrFormPrevious
                          className={estilos.btn_pg}
                          size={35}
                          onClick={() => handlePreviousPage()}
                        />
                      )}
                      Ver mais
                      {pages.nextPage && (
                        <GrFormNext
                          className={estilos.btn_pg}
                          size={35}
                          onClick={() => handleNextPage()}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
        <ToastContainer />
      </div>
    </>
  );
};

export default Listagem;
