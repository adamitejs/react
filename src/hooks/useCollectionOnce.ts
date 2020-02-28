import { useCallback, useEffect, useState } from "react";
import { CollectionReference, CollectionSnapshot } from "@adamite/sdk";

function useCollectionOnce(ref: CollectionReference): [CollectionSnapshot | undefined, boolean, Function] {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();

  const refetch = useCallback(async () => {
    setLoading(true);
    const snapshot = await ref.get();
    setValue(snapshot);
    setLoading(false);
  }, [ref.hash]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetch();
  }, [ref.hash, refetch]);

  return [value, loading, refetch];
}

export default useCollectionOnce;
