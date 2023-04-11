import { resolve } from "styled-jsx/css";

export async function uploadUserProfileImage(supabase,userId,file,bucket,profileColum){

        
        
       
       return new Promise(async(resolve,reject) => {

           const newName = Date.now() + file.name;
           const {data,error} = await supabase.storage.from(bucket).upload(newName, file)
           if (error) {
               
               throw error
           }
           if (data) {
               const url = process.env.NEXT_PUBLIC_SUPABASE_URL + `/storage/v1/object/public/${bucket}/` + data.path;
               const res = await supabase.from('profiles').update({
                   [profileColum] : url
               }).eq('id', userId)

               if(!res.error) {
                   resolve();
               } else {
                throw res.error
               }

               
             }
       })
           
}