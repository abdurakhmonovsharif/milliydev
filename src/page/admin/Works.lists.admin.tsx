import { Button, Spinner } from '@nextui-org/react'
import { RemoveIcon, UpdateIcon } from '../../helpers/Icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWorkState } from '../../redux/reducers/work.reducer'
import { useDeleteWorkMutation, useGetWorksQuery } from '../../redux/api/work.api'
import { useEffect } from 'react'
import { RootState } from '../../redux/store'
const WorkCard=(
  {
  work,
  deleteWork,
  updatingWork}
  :
  {
  work:Work,
  deleteWork:(id:string)=>void,
  updatingWork:(work:Work)=>void
  }
  )=>{
  return <div className={`h-[180px] relative shadow-lg rounded-md cursor-pointer  group`}>
  <img src={work.media_url} alt="#404" className="object-cover rounded-md w-full h-full group-hover:blur-sm" />
   <div className="  items-center gap-x-2 m-auto left-0 right-0 px-5 py-3 text-center bg-black/70 bottom-[35%] absolute hidden group-hover:flex border-global_purpe rounded-md border-2 max-w-min ">
    <Button isIconOnly className='p-2.5' onClick={()=>deleteWork(work._id?work._id:"")}>
    <RemoveIcon/>
    </Button>
    <Button onClick={()=>updatingWork(work)} isIconOnly className='p-2.5'>
    <UpdateIcon/>
    </Button>
  </div>
</div>
}
const WorksList = () => {
  const navigate=useNavigate();
  const {isSearching,searchedWorks,isLoadingSearch}=useSelector((state:RootState)=>state.work);
  // redux and api
  const dispatch=useDispatch();
  const {pathname}=useLocation()
  const {data,isLoading,refetch}=useGetWorksQuery();
  const updatingWork=(work:Work)=>{
    dispatch(setWorkState(work))
    navigate(`/admin/works/edit?id=${work._id}`)
  }
    const [removeWork]=useDeleteWorkMutation();
    const deleteWork=(id:string|undefined)=>{
      if(id){
        removeWork({id})
        setTimeout(() => {
          refetch();
      }, 200);
      }
  }
  useEffect(()=>{
    refetch()
   },[pathname])
  return (
    <div className='max-w-[1366px] mx-auto'>
      {
        isLoading||isLoadingSearch?
       <div className='w-full h-full pt-20 flex justify-center items-center'>
        <Spinner/>
         </div>:
       <div className='p-2.5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>     
     {
    (isSearching?searchedWorks:data?.data)?.map((work) => (
    <WorkCard 
      key={work._id}
      deleteWork={deleteWork}
      updatingWork={updatingWork} 
      work={work}
    />
     ))
    }

      </div>
      }
    </div>
  )
}

export default WorksList
