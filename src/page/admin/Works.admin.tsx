import { useEffect } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Works = () => {
  const navigate = useNavigate();
  const { path } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const isEditing = path === "edit" && id !== "";

  useEffect(() => {
    // Check if not in editing mode, navigate to work list
    if (!isEditing) {
      navigate("/admin/works/list");
    }    
  }, [isEditing, navigate]);

  return (
    <div className='overflow-y-auto h-[calc(100vh-85px)]'>
      <Outlet />
    </div>
  );
};

export default Works;
