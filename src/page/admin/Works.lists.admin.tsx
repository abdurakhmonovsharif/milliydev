import { Button, Spinner } from '@nextui-org/react'
import { RemoveIcon, UpdateIcon } from '../../helpers/Icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDeleteWorkMutation, useGetWorksQuery } from '../../redux/api/work.api'
import { useEffect } from 'react'
const WorkCard = (
  {
    work,
    deleteWork,
    updatingWork }
    :
    {
      work: Work,
      deleteWork: (id: string) => void,
      updatingWork: (work: Work) => void
    }
) => {
  return <div className={`h-[180px] relative shadow-lg rounded-md cursor-pointer  group`}>
    <img src={work.media_url} alt="#404" className="object-cover rounded-md w-full h-full group-hover:blur-sm" />
    <div className="  items-center gap-x-2 m-auto left-0 right-0 px-5 py-3 text-center bg-black/70 bottom-[35%] absolute hidden group-hover:flex border-global_purpe rounded-md border-2 max-w-min ">
      <Button isIconOnly className='p-2.5' onClick={() => deleteWork(work.id ? work.id : "")}>
        <RemoveIcon />
      </Button>
      <Button onClick={() => updatingWork(work)} isIconOnly className='p-2.5'>
        <UpdateIcon />
      </Button>
    </div>
  </div>
}
const WorksList = () => {
  const navigate = useNavigate();
  const { isSearching, searchedWorks, isLoadingSearch } = useSelector((state: RootState) => state.work);
  const [searchParams] = useSearchParams();
  // redux and api
  const { data: works, isLoading, refetch } = useGetWorksQuery();
  const [deleteWorkMutation] = useDeleteWorkMutation();
  useEffect(() => {
    refetch()
  }, [searchParams.get("id")])
  const updatingWork = (work: Work) => {
    navigate(`/admin/works/edit?id=${work.id}`)
  }
  const deleteWork = (id: string) => {
    deleteWorkMutation({ id }).then(() => {
      refetch()
    })
  }

  return (
    <div className='max-w-[1366px] mx-auto'>
      {
        isLoadingSearch || isLoading ?
          <div className='w-full h-full pt-20 flex justify-center items-center'>
            <Spinner />
          </div> :
          <div className='p-2.5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
            {
              (isSearching ? searchedWorks : works)?.map((work: Work) => (
                <WorkCard
                  key={work.id}
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
