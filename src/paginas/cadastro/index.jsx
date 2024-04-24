import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  InputLabel,
  Button,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import estilos from "./cadastro.module.css";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [img, setImg] = useState();
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [tag, setTag] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [btnValue, setBtnValue] = useState("Cadastrar");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setBtnValue("Atualizar");
      axios.get(`http://localhost:8000/api/v2/pratos/${id}/`).then((res) => {
        console.log(res);
        setNome(res.data.nome);
        setDesc(res.data.descricao);
        setTag(res.data.tag);
        setRestaurante(res.data.restaurante);
      });
    }
  }, [id]);

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
    const formData = new FormData();
    if (nome !== "" && restaurante !== "" && tag !== "" && desc !== "") {
      formData.append("nome", nome);
      formData.append("restaurante", restaurante);
      formData.append("tag", tag);
      formData.append("descricao", desc);
      if (img) {
        formData.append("imagem", img);
      }
      salvar(formData);
    } else {
      toast.warn("Preencha todos os campos");
    }
  };

  const salvar = (formData) => {
    if (id) {
      axios
        .put(`http://localhost:8000/api/v2/pratos/${id}/`, {
          nome,
          descricao: desc,
          tag,
          restaurante,
        })
        .then(() => {
          toast.success("Prato atualizado com sucesso ");
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      axios
        .request({
          url: "http://localhost:8000/api/v2/pratos/",
          method: "POST",
          header: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => toast.success("Cadastro realizado com sucesso!"))
        .catch((err) => {
          toast.error("Algo deu errado! estamos trabalhando nisso...");
        });
    }
  };

  const salvarImg = (e) => {
    if (e.target.files?.length) {
      setImg(e.target.files[0]);
    }
  };

  return (
    <>
      <div className={estilos.app}>
        <header>
          <Navbar />
        </header>
        <main className={estilos.main}>
          <div className={estilos.container}>
            <div className={estilos.containerTitle}>
              <h3>Cadastrar novo prato</h3>
            </div>
            <fieldset>
              <form className={estilos.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={estilos.item}>
                  <TextField
                    id="outlined-basic"
                    label="Nome do prato"
                    value={nome}
                    variant="outlined"
                    className={estilos.input}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className={estilos.item}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Tag</InputLabel>
                    <Select
                      label="Tags"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className={estilos.select}
                    >
                      {tags.map((tag) => (
                        <MenuItem key={tag.id} value={tag.value}>
                          {tag.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={estilos.item}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Restaurante
                    </InputLabel>
                    <Select
                      value={restaurante}
                      label="Restaurante"
                      onChange={(e) => setRestaurante(e.target.value)}
                      className={estilos.select}
                    >
                      {restaurantes.map((restaurante) => (
                        <MenuItem key={restaurante.id} value={restaurante.id}>
                          {restaurante.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <input
                    type="file"
                    className={estilos.input}
                    onChange={salvarImg}
                  />
                </div>

                <div className={estilos.item}>
                  <TextField
                    className={estilos.input}
                    label="Descrição"
                    value={desc}
                    multiline
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </form>
              <div className={estilos.containerBtn}>
                <Button
                  type="submit"
                  variant="contained"
                  className={estilos.btn}
                >
                  <p className={estilos.btn}>{btnValue}</p>
                </Button>
              </div>
            </fieldset>

            <ToastContainer />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Cadastro;
