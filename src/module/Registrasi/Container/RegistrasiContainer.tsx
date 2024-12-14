import React from 'react'
import {Register} from "service/registrasi.api"
import RegistrasiComponent from '../Component/RegistrasiComponent'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export default function RegistrasiContainer() {
  const router = useRouter()
  const mutateRegister = useMutation(Register, {
    onSuccess: (data:any) => {
      if(data.status === 200){
        toast.success(data.message)
        router.push("/login")
        return
      }
    },
     onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
      } else if(error.response.data.status === 102){
        toast.error(error.response.data.message)
        return
      }
    },
  })
  const handleSubmit = (vals:any) =>{
    mutateRegister.mutate(vals)
  }
  return (
    <RegistrasiComponent handleSubmit={handleSubmit} isLoadingSubmit={mutateRegister.isLoading}/>
  )
}
