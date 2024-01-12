import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CreatePlusIconBlack, CreatePlusIconWhite } from '../../helpers/Icons';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { toBase64 } from '../../helpers/toBase64';
import { useGetWorkByIdQuery, usePostWorkMediaMutation, usePostWorkMutation, useUpdateWorkMutation } from '../../redux/api/work.api';
export type FileEventTarget = EventTarget & { files: FileList };
const WorksActions = () => {
  const { path } = useParams();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const formRef = useRef<HTMLFormElement>(null)
  const [isSelectedFile, setIsSelectedFile] = useState<string | null>(null);
  // redux and rtk
  const isEditing = id && path === "edit";
  const [workPost, { isLoading: workPostLoading }] = usePostWorkMutation();
  const { data, isLoading: getWorkLoading } = useGetWorkByIdQuery({ id }, { skip: id === "" });
  const [media_urlPost, { isLoading: media_url_loading }] = usePostWorkMediaMutation();
  const [updateWork] = useUpdateWorkMutation();
  const createWork = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      media_url: { files: FileList };
      caption: { value: string };
      site_url: { value: string };
    };
    const media_url = target.media_url.files[0];
    const caption = target.caption.value;
    const site_url = target.site_url.value;
    if (isEditing) {
      editWork({ media_url, caption, site_url, id })
    } else {
      postWork({ media_url, caption, site_url })
    }
  }
  const postWork = ({ media_url, caption, site_url }: {
    media_url: File, caption: string, site_url: string
  }) => {
    media_urlPost({ media_url }).then(({ data }: any) => {
      workPost({ media_url: data, caption, site_url } as Work).then(() => {
        navigate("/admin/works/list");
      })
    })
  }
  const editWork = ({ media_url, caption, site_url, id }: {
    media_url: File, caption: string, site_url: string, id: string
  }) => {
    if (media_url) {
      media_urlPost({ media_url }).then(({ data }: any) => {
        updateWork({ media_url: data, caption, site_url, id }).then(() => {
          navigate("/admin/works/list")
        })
      })
    } else {
      updateWork({ media_url: data?.media_url, caption, site_url, id } as Work).then(() => {
        navigate("/admin/works/list")
      })
    }
  }
  const getImageFromFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    const fileBase64 = await toBase64(selectedFiles[0]) as string
    setIsSelectedFile(fileBase64);
  }
  if (getWorkLoading) {
    return <div className='w-full h-full flex items-center justify-center'>
      <Spinner />
    </div>
  }
  return (
    <form ref={formRef} onSubmit={createWork} className='w-full h-full flex flex-col items-center p-2.5 gap-y-8'>
      <label title='Upload Image' className='flex items-center flex-col justify-center active:top-[0.5px] cursor-pointer transition-all duration-250 select-none relative border-2 border-dotted  lg:min-w-[280px] md:min-w-[280px] h-[158px] min-w-full border-default-500 rounded-lg'>
        {
          data || isSelectedFile ? <img src={isSelectedFile ? isSelectedFile : data?.media_url} alt="#404" className='w-full h-full object-cover lg:max-w-[280px] rounded-lg' /> : <>
            <div className='hidden dark:block '>
              <CreatePlusIconWhite />
            </div>
            <div className='dark:hidden block'>
              <CreatePlusIconBlack />
            </div>
            <p className='dark:text-white'>Upload Image</p>
          </>
        }
        <input onChange={getImageFromFileInput} name="media_url" type="file" hidden accept="image/png, image/gif, image/jpeg" />
      </label>
      <Input
        required
        name="caption"
        type='text'
        label="Site name"
        placeholder='eg:Milliy Dev'
        labelPlacement="outside"
        defaultValue={data?.caption}
        className='lg:w-[80%] md:w-[80%] w-full'
      />
      <Input
        required
        name="site_url"
        type="url"
        defaultValue={data?.site_url}
        label="Website"
        placeholder="nextui.org"
        labelPlacement="outside"
        className='lg:w-[80%] md:w-[80%] w-full'
      />
      <div className='justify-end lg:w-[80%] md:w-[80%] w-full flex '>
        <Button type='submit'>
          {
            media_url_loading || workPostLoading ? <Spinner /> : <>
              {isEditing ? "Update work" : "Create Work"}
            </>
          }
        </Button>
      </div>
    </form>
  )
}

export default WorksActions;