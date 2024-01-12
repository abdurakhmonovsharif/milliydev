import { Outlet } from 'react-router-dom';

const Works = () => {
  return (
    <div className='overflow-y-auto h-[calc(100vh-85px)]'>
      <Outlet />
    </div>
  );
};

export default Works;
