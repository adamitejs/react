import adamite, { AuthUser } from "@adamite/sdk";
import { useEffect, useState } from "react";

function useAuthState(
  auth = adamite().auth()
): {
  user: AuthUser | undefined;
} {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChange(authState => {
      setUser(authState);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return { user };
}

export default useAuthState;
