import React from "react";
import { signOut } from "firebase/auth";
function SignOut() {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return <button onAuxClick={signUserOut}>sign out cuy </button>;
}

export default SignOut;
