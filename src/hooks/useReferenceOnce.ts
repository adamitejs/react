import { useCallback, useEffect, useState } from "react";
import { DocumentReference, CollectionReference, CollectionSnapshot, DocumentSnapshot } from "@adamite/sdk";

function useReferenceOnce(
  ref: DocumentReference | CollectionReference
): { loading: boolean; value: DocumentSnapshot | CollectionSnapshot | undefined; refetch: Function } {
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
