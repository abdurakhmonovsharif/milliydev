import { Button, CircularProgress, Image, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../helpers/Icons";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user.reducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { dbAuth } from "../../firebase-cfg";

const Login = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    try {
     
      signInWithEmailAndPassword(dbAuth, email, password)
        .then(({ user }) => {
          if (user) { 
            dispatch(setUser({
              user: {
                email: user.email
              },
              auth: true
            }));
            navigate("/admin")
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          notify(errorMessage)
        });
    } catch (err: any) {
      notify(err.message)
    }
  };
  const notify = (message: string) => toast.error(message);
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
          type="email"
          label="Email"
          name="email"
          variant="bordered"
          placeholder="Enter your username"
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
          {
            false ? <div className="p-2">
              <CircularProgress color="default" size="sm" aria-label="Loading..." />
            </div> : "Login"
          }
        </Button>
      </form>
    </div>
  );
};

export default Login;
