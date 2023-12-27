import { Button, Image, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../helpers/Icons";
import React from "react";
import { useLoginMutation } from "../../redux/api/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/user.reducer";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const Login = () => {
  const user=useSelector((state:RootState)=>state.user);
  const [isVisible, setIsVisible] = React.useState(false);
  const [loginAccount] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    const loginUser: User = {
      username,
      password,
    };
    try {
      const result: any = await loginAccount(loginUser);
      localStorage.setItem("user_token", result.data.token);
      dispatch(setUser({...user,auth:true}))
      navigate("/admin");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        onSubmit={handleLogin}
        className="w-[450px]  rounded-lg p-3 space-y-2 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/favicon.ico"
            className="rounded-full w-20 h-20 object-contain"
          />
          <span className="text-2xl font-medium text-global_purpe">Login</span>
        </div>
        <Input
          isClearable
          type="text"
          label="Username"
          name="username"
          variant="bordered"
          placeholder="Enter your username"
          onClear={() => console.log("input cleared")}
          className="max-w-lg"
        />
        <Input
          label="Password"
          variant="bordered"
          name="password"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-lg"
        />
        <Button
          type="submit"
          variant="shadow"
          className="bg-global_purpe text-white w-full text-lg font-medium">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
