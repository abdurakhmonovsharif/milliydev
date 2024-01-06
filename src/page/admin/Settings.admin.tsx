import React from "react";
import { Button, Input } from "@nextui-org/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../helpers/Icons"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Settings = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const user = useSelector((state: RootState) => state.user.user);
  const handleUpdateUsername = (e: React.SyntheticEvent) => {
    e.preventDefault();

  }
  const handleResetPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();

  }

  return (
    <div className='max-w-xl  mx-auto h-[calc(100vh-85px)] p-4 '>
      <form className="w-full space-y-2" onSubmit={handleUpdateUsername}>
        <h4 className="font-medium">Update username</h4>
        <input
          aria-label="username"
          name="username"
          defaultValue={user?.username}
          placeholder="Your username" className="dark:text-white max-w-lg w-full text-sm  px-3 h-14 rounded-xl bg-default-100 outline-none" />
        <div className='justify-end max-w-lg w-full flex '>
          <Button type='submit'>Update username</Button>
        </div>
      </form>
      <form className="w-full space-y-2" onSubmit={handleResetPassword}>
        <h4 className="font-medium">Reset password</h4>
        <Input
          name="password"
          placeholder="Current password"
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
          name="password"
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
        <Input
          name="password"
          placeholder="Confirm Password"
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
