import Details from "./pages/Details";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
export const Context = createContext();
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isLoggin, setLogin] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Context.Provider value={setLogin}>
          <Routes>
            <>
              <Route
                path="/"
                element={
                  isLoggin ? (
                    <Home isAuth={isAuth} isLoggin={isLoggin} />
                  ) : (
                    <Login isAuth={isAuth} isLoggin={setLogin} />
                  )
                }
              />
              <Route path="/form" element={<Form isAuth={isAuth} />} />
              <Route path="/explore" element={<Test />} />
              <Route
                path="/details/:id"
                element={<Details isAuth={isAuth} />}
              />
              <Route path="/profile" element={<Profile isAuth={isAuth} />} />
              <Route path="/edit/:id" element={<Edit isAuth={isAuth} />} />
            </>
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
