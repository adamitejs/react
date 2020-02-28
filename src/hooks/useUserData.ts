import adamite from "@adamite/sdk";
import useAuthState from "./useAuthState";
import { useEffect, useState } from "react";

export default function useUserData(
  usersRef = adamite()
    .database()
    .collection("users"),
  auth = adamite().auth()
) {
  const [authState, authStateLoading] = useAuthState(auth);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStateLoading) {
      setLoading(true);
      setUserData(undefined);
      return;
    }

    if (!authState) {
      setLoading(false);
      setUserData(undefined);
      return;
    }

    usersRef
      .get()
      .then(snap => {
        setUserData(snap);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [authState, authStateLoading]);

  return [userData, loading || authStateLoading];
}
