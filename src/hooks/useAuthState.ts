import adamite, { AuthUser } from "@adamite/sdk";
import { useEffect, useState } from "react";

function useAuthState(auth = adamite().auth()): [AuthUser | undefined, boolean] {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChange(authState => {
      setLoading(false);
      setUser(authState);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return [user, loading];
}

export default useAuthState;
