import Transactions from "./pages/transactions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Buss from "./pages/Buss";
import Navbar from "./Component/Navbar";
import Detail from "./pages/Detail";

import { useNavigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (data) => {
    await axios
      .get(
        `http://localhost:4000/users/login?usernameOrEmail=${data.emailOrUsername}&password=${data.password}`
      )
      .then((res) => {
        setMessage(res.data.message);
        console.log(res.data);
        localStorage.setItem("my_Token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  const keepLogin = async () => {
    try {
      let getStorage = localStorage.my_Token;
      let respons = await axios.get(`http://localhost:4000/users/keep-login`, {
        headers: {
          Authorization: `${getStorage}`,
        },
      });
      setUsername(respons.data.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <div>
      <Navbar username={username} />
      <Routes>
        <Route path="/book" element={<Transactions />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} message={message} />}
        />
        <Route path="/" element={<Buss />} />
        <Route path="/detail/:Id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
