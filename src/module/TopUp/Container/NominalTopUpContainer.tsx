import NominalTopUpComponent from '../Component/NominalTopUpComponent'
import React from 'react'
import { TopupMinimal } from "service/topup.api"
import { toast } from 'react-toastify'
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/router'

export default function NominalTopUpContainer() {
  const router = useRouter()
  const mutateMinimalTopup = useMutation(TopupMinimal, {
    onSuccess: (data:any) => {
      console.log("response data", data)
      if(data?.status === 0){
        toast.success(data?.message)
        return
      }
    },
    onError: (error: any) => {
      console.log("error", error)
      if (error.message === 'Network Error') {
        toast.warning(error.message)
        return
      } else if(error.response.data.status === 102){
        toast.error(error.response.data.message)
      } else if(error.response.data.status === 108){
        toast.error(error.response.data.message)
        router.push("/login")
      } else {
        toast.error(error.message)
        return
      }
    },
  })
function unFormatMoney(val: any) {
  // Hapus format titik
  return parseFloat(val.toString().replace(/\./g, ""));
}
  const handleSubmit = (vals:any) =>{
    mutateMinimalTopup.mutate({
      top_up_amount: 10000,
    })
    // console.log("vals", vals)
  }
  return (
    <NominalTopUpComponent handleSubmit={handleSubmit}/>
  )
}
