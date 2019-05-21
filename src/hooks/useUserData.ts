import adamite from "@adamite/sdk";
import useAuthState from "./useAuthState";
import useReference from "./useReference";

export default function useUserData(
  usersRef = adamite()
    .database()
    .collection("users"),
  auth = adamite().auth()
) {
  const { user: authState } = useAuthState(auth);
  const userRef = usersRef.doc(authState ? authState.id : "");

  const { loading, value: userData } = useReference(userRef, {
    skip: !authState
  });

  return {
    loading: loading,
    user: userData,
    authState: authState
  };
}
