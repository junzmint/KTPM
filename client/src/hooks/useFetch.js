import { useState, useEffect } from "react";
export function useFetch(url, method = "GET") {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let isFetched = false;
    if (url) {
      if (!isFetched) {
        try {
          fetch("http://localhost:8000/category/" + url)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setLoading(false);
              setData(data);
              setError(false);
            });
        } catch (e) {
          setLoading(false);
          setError(true);
        }
        // request(
        //   method,
        //   url,
        //   (res) => {
        //     setLoading(false);
        //     setData(res.data);
        //     setError(false);
        //   },
        //   {
        //     onError: (e) => {
        //       setLoading(false);
        //       setError(true);
        //     },
        //   }
        // );
      }
    }
    return () => {
      isFetched = true;
    };
  }, [url, method]);
  return { loading, data, error };
}
