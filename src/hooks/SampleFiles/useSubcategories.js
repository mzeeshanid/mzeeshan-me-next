import { useEffect, useState } from "react";
import subcategories from "../../apis/subcategories";
import axios from "axios";
import { CANCEL_ERROR } from "apisauce";

function useSubcategories(categoryId, keyword, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setResults([]);
  }, [categoryId, keyword]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let perPage = 10;

    let params = {};
    if (categoryId) params.categoryId = categoryId;
    else params.keyword = keyword;

    params.page = page;
    params.perPage = perPage;

    let cancel;
    subcategories
      .getSubcategories(params, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        if (res.problem === CANCEL_ERROR) {
          return;
        }

        if (res.ok) {
          setResults((previousResults) => {
            return [...previousResults, ...res.data];
          });
          setHasMore(res.data.length >= perPage);
        } else {
          setError(true);
        }
        setLoading(false);
      });

    return () => cancel();
  }, [categoryId, keyword, page]);

  return { loading, results, hasMore, error };
}

export default useSubcategories;
