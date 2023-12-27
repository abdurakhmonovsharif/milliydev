import React from "react";
import { Button, Input } from "@nextui-org/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../helpers/Icons"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Settings = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const user=useSelector((state:RootState)=>state.user.user);
  const handleUpdateProfile=(e:React.SyntheticEvent)=>{
  e.preventDefault();

  } 

  return (
    <form  onSubmit={handleUpdateProfile} className='w-full flex flex-col justify-start items-center h-[calc(100vh-85px)] p-4 gap-y-2'>
      <input
      aria-label="username" 
      name="username"
      defaultValue={user?.username}
       placeholder="Your username" className="dark:text-white max-w-lg w-full text-sm  px-3 h-14 rounded-xl bg-default-100 outline-none"/>
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
        <Button type='submit'>Update profile</Button>
        </div>
    </form>
  )
}

export default Settings
