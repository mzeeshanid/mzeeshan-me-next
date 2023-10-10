import { CANCEL_ERROR } from "apisauce";
import axios from "axios";
import { useEffect, useState } from "react";
import categories from "../../apis/categories";

function useCategories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    categories
      .getCategories(
        {},
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        if (res.problem === CANCEL_ERROR) {
          return;
        }

        if (res.ok) {
          setResults(res.data);
        } else {
          setError(true);
        }

        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { loading, error, results };
}

export default useCategories;
