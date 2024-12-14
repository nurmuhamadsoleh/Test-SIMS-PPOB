import React, {useEffect, useRef, useState} from 'react'

import {GetHistoryAPI} from "service/topup.api"
import HistoryTransakasiComponent from '../Component/HistoryTransakasiComponent'
import { useQuery } from "@tanstack/react-query"

export default function HistoryTransaksiContainer() {
  const [pageIndex, setPageIndex] = useState(3)
  const [productList, setProductList] = useState<any[]>([]);

  const {refetch: refetchListHistory} = useQuery(["Get List History", pageIndex], GetHistoryAPI, {
    refetchOnWindowFocus: false,
    onSuccess: (data:any) =>{
      console.log("response data", data?.data?.records)
      const newItem = data?.data?.records;
      setProductList(()=> [ ...newItem])
    }
  })
  
  console.log("dataListHistory", productList)
  const handleIndexPagination = (vals:any) =>{
   if (refForm.current) {
    const scrollPosition = refForm.current.scrollTop;  // Menyimpan posisi scroll saat ini

    // Logika untuk mengambil data berikutnya atau memuat lebih banyak data
    setPageIndex(pageIndex + vals);

    // Kembalikan posisi scroll setelah data baru dimuat
    refForm.current.scrollTop = scrollPosition;
  }
  }
  const refForm: any = useRef<HTMLDivElement>(null);
  console.log("pageIndex", pageIndex)
   const handleScroll = () => {
        if (refForm.current) {
            const scrollY = refForm.current.scrollTop;
            console.log("scrollY", scrollY); // Menampilkan posisi scroll
            if(scrollY <= 100){
              setPageIndex(3)
              setProductList([])
              refetchListHistory()
            } else if ( scrollY > 100){
              setPageIndex(pageIndex)
              refetchListHistory()
            }
        }
    };

    useEffect(() => {
        const formElement = refForm.current;
        if (formElement) {
            formElement.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (formElement) {
                formElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
  return (
    <HistoryTransakasiComponent refForm={refForm} dataListHistory={productList} handlePagination={handleIndexPagination}/>
  )
}
