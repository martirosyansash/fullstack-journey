import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Did not get response");
        }

        const result = await response.json();

        setData(result);

      } catch (error) {
        setError(error.message);
        setData(null);

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error
  };
}

export default useFetch;