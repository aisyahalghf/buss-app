import { Button } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { useRef } from "react";

const Login = ({ handleLogin, message }) => {
  let emailOrUsername = useRef();
  let password = useRef();
  return (
    <div className="  w-1/4  m-auto ">
      <h1 className="text-3xl font-bold text-center m-20  ">Sign in</h1>
      <div>
        <div className=" flex-col border border-slate-300 shadow-2xl rounded-xl text-center h-130 pb-10 pt-10">
          <h4 className="p-3">*indicates required field </h4>
          <div>
            <input
              ref={emailOrUsername}
              className="border border-slate-600 rounded-xl p-2 text-center m-2"
              placeholder="*email or username"
              type="text"
            />
          </div>
          <div>
            <input
              ref={password}
              className="border border-slate-600 rounded-xl p-2 text-center m-2"
              placeholder="*Password"
              type="text"
            />
          </div>
          <div className=" text-red-700 text-xs ">{message}</div>

          <Button
            onClick={() =>
              handleLogin({
                emailOrUsername: emailOrUsername.current.value,
                password: password.current.value,
              })
            }
            className="pl-2 pr-2 p-1 mt-2 border border-slate-500 rounded-xl m-0-auto"
          >
            Sign in
          </Button>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Login;
