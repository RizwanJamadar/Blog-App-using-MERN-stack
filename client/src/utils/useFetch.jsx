import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null); // Initialize as null or an object depending on the expected data structure
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data); // Set the fetched data
      } catch (err) {
        setError(err.message || "Something went wrong"); // Handle error more gracefully
      }
      setLoading(false);
    };

    fetchData();
  }, [url]); // Only refetch if `url` changes

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
