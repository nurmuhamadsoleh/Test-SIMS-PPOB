import Store, { IStore } from 'store'

import NominalTopUpComponent from '../Component/NominalTopUpComponent'
import React from 'react'
import { TopupMinimal } from "service/topup.api"
import { toast } from 'react-toastify'
import { unFormatMoney } from 'helpers/unFormatMoney'
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/router'

export default function NominalTopUpContainer() {
  const router = useRouter()
  const { logOut }: IStore = Store()
  const mutateMinimalTopup = useMutation(TopupMinimal, {
    onSuccess: (data:any) => {

      if(data?.data?.status === 0){
        toast.success(data?.data?.message)
        return
      }
    },
    onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
        return
      } else if(error.response.data.status === 102){
        toast.error(error.response.data.message)
      } else if(error.response.data.status === 108){
        toast.error(error.response.data.message)
        router.push("/login")
        logOut()
      } else {
        toast.error(error.message)
        return
      }
    },
  })

  const handleSubmit = (vals:any) =>{
    mutateMinimalTopup.mutate({
      top_up_amount: unFormatMoney(vals?.top_up_amount) ?? "0",
    })
  }
  return (
    <NominalTopUpComponent handleSubmit={handleSubmit} isLoadingSubmit={mutateMinimalTopup.isLoading}/>
  )
}
