import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Navbar";

import estilos from "./cadastro.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [img, setImg] = useState();
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [tag, setTag] = useState("");
  const [restaurante, setRestaurante] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v2/tags/")
      .then((res) => setTags(res.data.tags));

    axios
      .get("http://localhost:8000/api/v2/restaurantes/")
      .then((res) => setRestaurantes(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nome !== "" &&
      restaurante !== "" &&
      tag !== "" &&
      desc !== ""
    ) {
      salvar();
    } else {
      toast.warn("Preencha todos os campos");
    }
  };

  const salvar = () => {
    axios
      .post("http://localhost:8000/api/v2/pratos/", {
        nome,
        restaurante,
        tag,
        descricao: desc,
      })
      .then(() => toast.success("Cadastro realizado com sucesso!"))
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className={estilos.container}>
          <h3>Cadastrar novo prato</h3>
          <form className={estilos.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={estilos.font_item}>
              <TextField
                id="outlined-basic"
                label="Nome do prato"
                variant="outlined"
                className={estilos.input}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className={estilos.font_item}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Tag</InputLabel>
                <Select
                  label="Tags"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className={estilos.input}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.value}>
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={estilos.font_item}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Restaurante
                </InputLabel>
                <Select
                  value={restaurante}
                  label="Restaurante"
                  onChange={(e) => setRestaurante(e.target.value)}
                  className={estilos.input}
                >
                  {restaurantes.map((restaurante) => (
                    <MenuItem key={restaurante.id} value={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <input type="file" className={estilos.input} onChange={(e)=>setImg(e.target.value)}/>
            </div>

            <div className={estilos.font_item}>
              <TextField
                className={estilos.input}
                label="Descrição"
                multiline
                rows={4}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={estilos.font_item}>
              <Button type="submit" variant="contained" className={estilos.btn}>
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default Cadastro;
