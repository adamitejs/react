import { useEffect, useState } from "react";
import { CollectionSnapshot, CollectionReference } from "@adamite/sdk";

function useCollection(ref: CollectionReference): [CollectionSnapshot | undefined, boolean] {
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState();

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot: CollectionSnapshot) => {
      setSnapshot(snapshot);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [ref.hash]); // eslint-disable-line react-hooks/exhaustive-deps

  return [snapshot, loading];
}

export default useCollection;
