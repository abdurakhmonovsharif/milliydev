import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CreatePlusIconBlack, CreatePlusIconWhite } from '../../helpers/Icons';
import { Button, Input, Spinner } from '@nextui-org/react';
import {  useState } from 'react';
import { useGetWorkByIdQuery, usePostWorkMutation, useUpdateWorkMutation } from '../../redux/api/work.api';
import { toBase64 } from '../../helpers/toBase64';
export type FileEventTarget = EventTarget & { files: FileList };
const WorksActions = () => {
  const {path}=useParams();
  const navigate=useNavigate()
  const [searchParams]=useSearchParams();
  const id=searchParams.get("id")||"";
  const [isSelectedFile,setIsSelectedFile]=useState<string|null>(null);
   // redux and rtk
   const [addWork]=usePostWorkMutation();
   const [updateWork]=useUpdateWorkMutation()
   const {data,isLoading,refetch}=useGetWorkByIdQuery({id},{skip:id==""});
   const isEditing=id&&path==="edit";
  const createWork=(e:React.SyntheticEvent)=>{
      const form=new FormData();
      e.preventDefault();
      const target = e.target as typeof e.target & {
        media_url: { files: FileList };
        caption: { value: string };
        site_url: { value: string };
      };
      const media_url=target.media_url.files[0];
      const caption=target.caption.value;
      const site_url=target.site_url.value;
      form.append("caption",caption);
      if(site_url.includes("https")||site_url.includes("http")){
        form.append("site_url",site_url);
      }else{
        const new_site_url="https://"+site_url
      form.append("site_url",new_site_url);
      }
      if(media_url){
        form.append("media",media_url);
      }else{
        if(data){
          const media_url=data.data.media_url
          form.append("media",media_url)
        }
      }
      if(isEditing){
        updateWork({work:form,work_id:id}).then(()=>{
          navigate("/admin/works/list")
          refetch()
        })
      }else{
        addWork(form).then(()=>{
          navigate("/admin/works/list")
          refetch()
        })
      }
  }
  const getFileFromFileInput=async (event:React.ChangeEvent<HTMLInputElement>)=>{
    const { files } = event.target;
    const selectedFiles = files as FileList;
  const fileBase64=await toBase64(selectedFiles[0]) as string
    setIsSelectedFile(fileBase64) ;
  }
  if(isLoading){
    return <div className='w-full h-full flex items-center justify-center'>
      <Spinner/>
    </div>
  }
  return (
    <form onSubmit={createWork} className='w-full h-full flex flex-col items-center p-2.5 gap-y-8'>
      <label title='Upload Image' className='flex items-center flex-col justify-center active:top-[0.5px] cursor-pointer transition-all duration-250 select-none relative border-2 border-dotted  lg:min-w-[280px] md:min-w-[280px] h-[158px] min-w-full border-default-500 rounded-lg'>
        {
          data?.data||isSelectedFile?<img src={isSelectedFile?isSelectedFile:data?.data?.media_url} alt="#404" className='w-full h-full object-cover lg:max-w-[280px] rounded-lg' />:<>
           <div className='hidden dark:block '>
       <CreatePlusIconWhite /> 
       </div>
       <div className='dark:hidden block'>
        <CreatePlusIconBlack/>
       </div> 
       <p className='dark:text-white'>Upload Image</p>
        </>
        }
        <input onChange={getFileFromFileInput}  name="media_url" type="file" hidden accept="image/png, image/gif, image/jpeg" />
         </label>
         <Input 
         required
         name="caption"
         type='text'
        defaultValue={data?.data?.caption}
          label="Site name" 
          placeholder='eg:Milliy Dev'
          labelPlacement="outside"
          className='lg:w-[80%] md:w-[80%] w-full'
            />
        <Input
         required
        name="site_url"
          type="url"
          label="Website"
          placeholder="nextui.org"
          labelPlacement="outside"
          className='lg:w-[80%] md:w-[80%] w-full'
          defaultValue={data?.data?.site_url}
        />
        <div className='justify-end lg:w-[80%] md:w-[80%] w-full flex '>
            <Button type='submit'>{isEditing?"Update work":"Create Work"}</Button>
        </div>
    </form>
  )
}

export default WorksActions;