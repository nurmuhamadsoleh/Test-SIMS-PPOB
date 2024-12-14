import {GetProfileAPI, UpdateUser} from "service/profile.api"
import Store, { IStore } from 'store'
import { useMutation, useQuery } from '@tanstack/react-query'

import InformasiProfileComponent from '../Component/InformasiProfileComponent'
import Profile from "assets/images/Profile Photo.png"
import React from 'react'
import { toast } from "react-toastify"
import { useRouter } from "next/router"

export default function InformasiProfileContainer() {
  const { token }: IStore = Store()
  const router = useRouter()
  console.log("token", token)
  const { data: dataProfile, refetch: refetchDataProfile } = useQuery(['Get Profile Informasi'], GetProfileAPI);

const {profile_image, email, first_name, last_name}:any = dataProfile?.data || []
  let initialValues = {
    profile_image: 
    profile_image?.includes("null") || !profile_image
      ? Profile // Ganti dengan path gambar default
      : profile_image,
  email: email || "",
  first_name: first_name || "",
  last_name: last_name || "",
    
  }
  const mutateEditUser = useMutation(UpdateUser, {
    onSuccess: (data:any) => {
      console.log("repsonse data", data)
      if(data?.status == 0){
        toast.success(data?.message)
        refetchDataProfile()
        return
      }
    },
    onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
      } else if(error.response.data.status === 108){
        toast.error(error.response.data.message)
        router.push("/login")
      } else {
        toast.error(error.message)
        return
      }
    },
  })
  const handleSubmit = (vals:any) =>{
    mutateEditUser.mutate(vals)
  }
  return (
    <InformasiProfileComponent initialValues={initialValues} handleSubmit={handleSubmit}/>
  )
}
