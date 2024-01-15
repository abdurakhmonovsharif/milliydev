import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase-cfg";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export const workApi = createApi({
    reducerPath: "workApi",
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        getWorks: builder.query<any, void>({
            queryFn: async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "works"));
                    const works: any = [];
                    await Promise.all(
                        querySnapshot.docs.map((doc) => {
                            works.push({ ...doc.data(), id: doc.id });
                        })
                    );
                    return { data: works };
                } catch (error: any) {
                    return { error: error };
                }
            },
        }),
        getWorkById: builder.query<Work, { id: string }>({
            queryFn: async ({ id }) => {
                try {
                    
                    const docRef = doc(db, "works", id);
                    const workDoc = await getDoc(docRef);
                    if (workDoc.exists()) {
                        const workData = workDoc.data();
                        return { data: { ...workData, id } as Work };
                    } else {
                        return { error: "Work not found" };
                    }
                } catch (error: any) {
                    return { error: error };
                }
            },
        }),
        getWorkByCaption: builder.query<Work, { caption: string }>({
            queryFn: async ({ caption }) => {
                try {
                    const docRef = collection(db, "works");
                    const workDoc = await getDocs(docRef);
                    const works: any = [];
                    workDoc.forEach((doc) => {
                        const docCaption = doc.data().caption;
                        if (docCaption.toLowerCase() === caption.toLowerCase()) {
                            works.push({ ...doc.data(), id: doc.id });
                        }
                    });
                    return { data: works };
                } catch (error: any) {
                    return { error: error };
                }
            },
        }),
        postWork: builder.mutation<Work, Work>({
            queryFn: async (work) => {
                try {
                    if (!work) throw new Error("Work not found!")
                    const workRef = await addDoc(collection(db, "works"), work);
                    const postedWork = await getDoc(workRef);
                    return { data: { ...postedWork.data(), id: postedWork.id } as Work }
                } catch (error: any) {
                    return { error: error }
                }
            }
        }),
        postWorkMedia: builder.mutation<String, { media_url: File }>({
            queryFn: async ({ media_url }) => {
                try {
                    if (!media_url) throw new Error("media_url not found!")
                    return { data: await uploadMediaToFirebase(media_url) };
                } catch (error: any) {
                    return { error: error }
                }
            }
        }),
        updateWork: builder.mutation<Work, Work>({
            queryFn: async (work) => {
                try {
                    if (!work || work.id == undefined) throw new Error("Work not found!");
                    const washingtonRef = doc(db, "works", work.id);
                    await updateDoc(washingtonRef, work);
                    return { data: work as Work };
                } catch (error: any) {
                    console.error("Error updating work:", error);
                    return { error };
                }
            }

        }),
        deleteWork: builder.mutation<String, { id: string }>({
            queryFn: async ({ id }) => {
                try {
                    if (!id) throw new Error("Work not found!")
                    await deleteDoc(doc(db, "works", id))
                    return { data: "Work successfuly deleted." }
                } catch (error: any) {
                    return { error: error }
                }
            }
        })
    }),
});
const uploadMediaToFirebase = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `milliydev/${new Date().toISOString()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}
export const {
    useGetWorksQuery,
    usePostWorkMutation,
    useGetWorkByIdQuery,
    useGetWorkByCaptionQuery,
    usePostWorkMediaMutation,
    useUpdateWorkMutation,
    useDeleteWorkMutation } = workApi;