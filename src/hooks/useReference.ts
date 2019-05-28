import { useEffect, useState } from "react";
import { DocumentSnapshot, CollectionSnapshot, DocumentReference, CollectionReference } from "@adamite/sdk";

function useReference(ref: DocumentReference | CollectionReference, options = { skip: false }) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();

  useEffect(() => {
    if (options.skip) {
      setLoading(false);
      setValue(undefined);
      return;
    }

    const unsubscribe = ref.onSnapshot((snapshot: DocumentSnapshot | CollectionSnapshot) => {
      setValue(snapshot);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [ref.hash, options.skip]); // eslint-disable-line react-hooks/exhaustive-deps

  return { loading, value };
}

export default useReference;
