import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, pagination) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.results);
        setNextPage(res.data.next);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]); // Corrigido para monitorar alterações na URL

  useEffect(() => {
    if (!pagination) {
      if (nextPage) {
        // Verifica se nextPage não é null
        axios.get(nextPage).then((res) => {
          setData((prevData) => [...prevData, ...res.data.results]); // Atualiza o estado anterior
          setNextPage(res.data.next);
        });
      }
    }
  }, [nextPage]); // Executa somente quando nextPage muda

  return { data, isLoading, nextPage };
};
