import { useState, useEffect } from "react";
import axios from "axios";


export const useFetch = (url) => {
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
  }, []);

  return { data, isLoading, nextPage};
};
