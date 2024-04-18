import { Routes, Route } from "react-router-dom";

import Home from "./paginas/Home";
import Listagem from "./paginas/Listagem";
import Cadastro from "./paginas/cadastro";

import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pratos" element={<Listagem />} />
          <Route path="/pratos:id" element={<Cadastro />} />
          <Route path="/novo" element={<Cadastro />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
