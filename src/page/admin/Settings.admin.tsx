import React from "react";
import { Button, Input } from "@nextui-org/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../helpers/Icons"
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { dbAuth } from "../../firebase-cfg";
import { toast } from "react-toastify";

const Settings = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleResetPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      old_password: { value: string };
      new_password: { value: string };
    };

    const old_password = target.old_password.value;
    const new_password = target.new_password.value;
    const user = dbAuth.currentUser;
    if (user) {
      try {
        const credentials = {
          email: user.email,
          password: old_password
        }
        const credential = EmailAuthProvider.credential(
          credentials.email as string,
          credentials.password
        );
        if (dbAuth.currentUser) {
          await reauthenticateWithCredential(dbAuth.currentUser, credential);
          await updatePassword(dbAuth.currentUser, new_password);
        }
        notify("Password reset successfully", true);
      } catch (error: any) {
        notify(error.message, false);
      }
    }
  }

  const notify = (message: string, success: boolean) => success ? toast.success(message) : toast.error(message);

  return (
    <div className='max-w-xl  mx-auto h-[calc(100vh-85px)] p-4 '>
      <form className="w-full space-y-2" onSubmit={handleResetPassword}>
        <h4 className="font-medium">Reset password</h4>
        <Input
          name="old_password"
          placeholder="Old password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="text-default-100 max-w-lg"
        />
        <Input
          name="new_password"
          placeholder="New password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="text-default-100 max-w-lg"
        />
        <div className='justify-end max-w-lg w-full flex '>
          <Button type='submit'>Reset password</Button>
        </div>
      </form>

    </div>
  )
}

export default Settings
