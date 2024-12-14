import { GetServiceAPI, Transaksi } from 'service/homepage.api'
import React, { useState } from 'react'
import Store, { IStore } from 'store'
import { useMutation, useQuery } from "@tanstack/react-query"

import TopUpComponent from '../Component/TopUpComponent'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function TopUpContainer() {
   const { selectedJenistrx }: IStore = Store()
  const router = useRouter()
  const [selectedTrx, setSelectedTrx] = useState("");
  const handleSelectedTrx = (vals:any) =>{
    if(vals){
      setSelectedTrx(vals)
    }else{
      setSelectedTrx("")
    }
  }
  const {data: dataService, refetch: refetchDataService, isFetching: isLoadingService} = useQuery(["Get Service List"], GetServiceAPI)
  const filterJenistrx = dataService?.data?.filter((item:any)=>{
    return item?.service_code === selectedJenistrx
  })
  const mutateCreateTrx = useMutation(Transaksi, {
    onSuccess: (data:any) =>{
      if(data.status === 0){
        toast.success(data?.message)
        refetchDataService()
        router.push('/homepage')
        return
      }
    },
    onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
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
  const handleSubmit = (vals:any) =>{
    mutateCreateTrx.mutate(vals)
  }
  return (
   <TopUpComponent dataService={dataService} handleSubmit={handleSubmit} isLoadingSubmit={mutateCreateTrx.isLoading} handleSelectedTrx={handleSelectedTrx} selectedTrx={selectedTrx} isLoadingTrx={isLoadingService} dataFilterService={filterJenistrx}/>
  )
}
