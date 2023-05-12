import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  let username = useRef();
  let email = useRef();
  let password = useRef();
  let [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      let inputUsername = username.current.value;
      let inputEmail = email.current.value;
      let inputPassword = password.current.value;
      let regxEmail = /\S+@\S+\.\S+/;
      let regxPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;

      if ((!inputUsername, !inputEmail, !inputPassword)) {
        throw { message: "incomplete data" };
      } else if (inputUsername.length <= 3) {
        throw { message: "username must have at least 3 character" };
      } else if (!regxEmail.test(inputEmail)) {
        throw { message: "The email you entered is incorrect " };
      } else if (!regxPassword.test(inputPassword)) {
        throw {
          message:
            "password must be contain number, character and min 6 and max 10 character",
        };
      }

      await axios
        .post("http://localhost:4000/users/register", {
          username: inputUsername,
          email: inputEmail,
          password: inputPassword,
          role: "user",
        })
        .catch((err) => {
          throw { message: err.response.data.message };
        });
      toast("Register Successfull");
      username.current.value = "";
      email.current.value = "";
      password.current.value = "";
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  console.log(message);
  return (
    <div>
      <div className="  w-1/4  m-auto ">
        <h1 className="text-3xl font-bold text-center m-20  ">
          Create an account
        </h1>
        <h4 className="text-center indent-2 mb-5">WHITE BUSS </h4>
        <div>
          <div className=" flex-col border border-slate-300 shadow-2xl rounded-xl text-center h-130 pb-10 pt-10">
            <h4 className="p-3">*indicates required field </h4>
            <h2 className="font-bold m-2">Personal Information</h2>
            <div>
              <input
                ref={username}
                className="border border-slate-600 rounded-xl p-2 text-center m-2"
                placeholder="*Username"
                type="text"
              />
            </div>

            <div className="font-bold m-2">Account Security</div>
            <div>
              <input
                ref={email}
                className="border border-slate-600 rounded-xl p-2 text-center m-2"
                placeholder="*Email"
                type="text"
              />
            </div>
            <div>
              <input
                ref={password}
                className="border border-slate-600 rounded-xl p-2 text-center m-2"
                placeholder="Password"
                type="Password"
              />
            </div>
            <div className=" text-red-700 text-xs ">{message}</div>
            <Button
              onClick={handleRegister}
              className="pl-2 pr-2 p-1 mt-2 border border-slate-500 rounded-xl m-0-auto"
            >
              register
            </Button>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
