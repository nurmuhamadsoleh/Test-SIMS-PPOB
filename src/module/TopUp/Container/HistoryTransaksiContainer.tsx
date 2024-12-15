import React, {useEffect, useRef, useState} from 'react'

import {GetHistoryAPI} from "service/topup.api"
import HistoryTransakasiComponent from '../Component/HistoryTransakasiComponent'
import { toast } from 'react-toastify'
import { useQuery } from "@tanstack/react-query"
import { useRouter } from 'next/router'

export default function HistoryTransaksiContainer() {
  const [pageIndex, setPageIndex] = useState(3)
  const [productList, setProductList] = useState<any[]>([]);
  const router = useRouter();

  const {refetch: refetchListHistory} = useQuery(["Get List History", pageIndex], GetHistoryAPI, {
    refetchOnWindowFocus: false,
    onSuccess: (data:any) =>{
      const newItem = data?.data?.records;
      setProductList(()=> [...newItem])
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
  const handleIndexPagination = (vals:any) =>{
   setPageIndex(pageIndex + vals);
  }
  return (
    <HistoryTransakasiComponent dataListHistory={productList} handlePagination={handleIndexPagination}/>
  )
}
