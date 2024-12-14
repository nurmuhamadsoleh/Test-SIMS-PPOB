import Store, { IStore } from 'store'

import { Login } from "service/login.api"
import LoginComponent from '../Component/LoginComponent'
import React from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export default function LoginContainer() {
  const router = useRouter()
  const { setToken }: IStore = Store()
  const mutateLogin = useMutation(Login, {
    onSuccess: (data:any) => {
      console.log("data", data)
      setToken(data)
      // if(data.status === 0){
      //   console.log("berhasil masul")
      //   // router.push("/dashboard")
      //   return
      // }
    },
     onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
      } else if(error.response.data.status === 102){
        toast.error(error.response.data.message)
      } else if(error.response.data.status === 103){
        toast.error(error.response.data.message)
        return
      }
    },
  })
    const handleSubmit = (vals:any) => {
      mutateLogin.mutate(vals)
    }
  return (
    <LoginComponent handleSubmit={handleSubmit} isLoadingSubmit={mutateLogin.isLoading}/>
  )
}
