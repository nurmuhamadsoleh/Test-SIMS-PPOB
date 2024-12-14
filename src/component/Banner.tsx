import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import React, {useEffect, useState} from 'react'
import Store, { IStore } from 'store'

import {GetBalanceAPI} from "service/topup.api"
import {GetProfileAPI} from "service/profile.api"
import Image from 'next/image'
import PhotoProfile from "assets/images/Profile Photo.png"
import formatMoney from 'helpers/formatMoney'
import { useQuery } from "@tanstack/react-query"

export default function Banner() {
const { profile, setProfile, token }: IStore = Store()
const [hideSaldo, setHideSaldo] = useState<boolean>(false)
 const {data: dataBalance} = useQuery(['Get Balance'], GetBalanceAPI)
  const { data: dataProfile, refetch: refetchDataProfile } = useQuery(['Get Profile Informasi'], GetProfileAPI);
  useEffect(()=>{
    if(dataProfile){
        setProfile(dataProfile)
        setInterval(()=>{
            refetchDataProfile()
        }, 5000)
    }
  },[token])
  return (
   <div className='flex flex-row pl-3'>
            <div className='w-1/2'>
            <Image src={
                !profile?.profile_image || profile?.profile_image.includes("null") 
                ? PhotoProfile 
                : profile?.profile_image
            }  alt="Profile" width={80} height={80} aria-label='Profile' className='rounded-full border-gray-300 border-solid'/>
            <p className='text-xl font-medium -mt-0'>Selamat datang,</p>
            <h1 className='text-2xl font-bold -mt-6'>{`${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`}</h1></div>
            <div className='w-1/2 bg-red-600 pl-4 rounded-lg text-white font-bold flex flex-col justify-start'>
            <p className="text-xl">Saldo Anda</p>
            <div className='h-1/2 flex items-center gap-x-6'>
                <h1>Rp. {hideSaldo ? formatMoney(dataBalance?.data?.balance) : "***************"}</h1>
                {hideSaldo ? <EyeOutlined className='text-3xl' onClick={()=> setHideSaldo(false)}/> : <EyeInvisibleOutlined className='text-3xl' onClick={()=> setHideSaldo(true)}/>}
            </div>
            <div className="text-xl">Limit Saldo</div>
            </div>
        </div> 
  )
}
