import { useEffect, useState } from "react";
import { DocumentSnapshot, CollectionSnapshot, DocumentReference } from "@adamite/sdk";

function useDocument(ref: DocumentReference): [DocumentSnapshot | undefined, boolean] {
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState();

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot: DocumentSnapshot) => {
      setSnapshot(snapshot);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [ref.hash]); // eslint-disable-line react-hooks/exhaustive-deps

  return [snapshot, loading];
}

export default useDocument;
