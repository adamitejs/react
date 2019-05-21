import { useCallback, useEffect, useState } from "react";
import { DocumentReference, CollectionReference } from "@adamite/sdk";

function useReferenceOnce(ref: DocumentReference | CollectionReference) {
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

  return { loading, value, refetch };
}

export default useReferenceOnce;
