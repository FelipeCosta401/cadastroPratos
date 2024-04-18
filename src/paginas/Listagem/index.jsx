import { Link } from "react-router-dom";
import { useEffect } from "react";

import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  Pagination,
  Stack,
} from "@mui/material";

import { IoMdAddCircle } from "react-icons/io";
import { DataGrid } from '@mui/x-data-grid';

import { useFetch } from "../../hooks/useFetch";
import Navbar from "../../components/Navbar";
import estilos from "./listagem.module.css";

const Listagem = () => {
  const { 
    data: pratos,
    isLoading,
    nextPage,
  } = useFetch("http://localhost:8000/api/v1/pratos/");
  // const [pratosCarregados, setPratosCarregados] = useState()

  useEffect(() => {}, [pratos]);

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
                  {isLoading && <p>Carregando...</p>}
                  {pratos.map((prato) => (
                    <TableRow key={prato.id}>
                      <TableCell align="center">{prato.nome}</TableCell>
                      <TableCell align="center">{prato.tag}</TableCell>
                      <TableCell align="center">
                        <a href={prato.imagem}>[Ver imagem]</a>
                      </TableCell>
                      <TableCell align="center">{prato.restaurante}</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>
                      <Stack spacing={1}>
                        <Pagination
                          count={pratos.length}
                          rowPerPage={[5]}
                          variant="outlined"
                          shape="rounded"
                          onClick={(e)=>console.log(e.target.value)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </main>
      </div>
    </>
  );
};

export default Listagem;
