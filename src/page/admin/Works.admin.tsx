import { useEffect } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Works = () => {
  const navigate = useNavigate();
  const { path } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const isEditing = path === "edit" && id !== "";

  useEffect(() => {
    if (!isEditing) {
      navigate("/admin/works/list");
    }
  }, [isEditing, window.location.pathname]);
  return (
    <div className='overflow-y-auto h-[calc(100vh-85px)]'>
      <Outlet />
    </div>
  );
};

export default Works;
