import { CANCEL_ERROR } from "apisauce";
import axios from "axios";
import { useEffect, useState } from "react";
import subcategories from "../../apis/subcategories";

function useSearchSuggestions(keyword) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    subcategories
      .getSubcategoriesSuggestions(
        { q: keyword },
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        if (res.problem === CANCEL_ERROR) {
          return;
        }

        if (res.ok) {
          const { data: suggestions } = res.data;
          setResults(suggestions);
        } else {
          setError(true);
        }

        setLoading(false);
      });

    return () => cancel();
  }, [keyword]);

  return { loading, error, results };
}

export default useSearchSuggestions;
