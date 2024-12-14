import Store, { IStore } from 'store'

import Game from "assets/images/Game.png"
import { IBannerDAO } from '../DAO/banner.dao'
import { IRequestDAO } from 'dao/request.dao'
import { IServiceDAO } from '../DAO/service.dao'
import Image from 'next/image'
import Kurban from "assets/images/Kurban.png"
import Listrik from "assets/images/Listrik.png"
import Musik from "assets/images/Musik.png"
import PBB from "assets/images/PBB.png"
import PDAM from "assets/images/PDAM.png"
import PGN from "assets/images/PGN.png"
import PaketData from "assets/images/Paket Data.png"
import Profile from "assets/images/Profile Photo.png"
import Pulsa from "assets/images/Pulsa.png"
import React from 'react'
import Televisi from "assets/images/Televisi.png"
import VoucherMakanan from "assets/images/Voucher Makanan.png"
import Zakat from 'assets/images/Zakat.png'

interface IProps {
    dataBanner?: IRequestDAO<IBannerDAO[]>;
    dataService?: IRequestDAO<IServiceDAO[]>;
}
export default function HomePageComponent(props: IProps) {
    const {dataBanner, dataService} = props
const { profile }: IStore = Store()
const dataListBanner = dataBanner?.data?.map((item:any, index: number)=>{
    return (
        <div key={index} className='px-3'>
            <Image src={item?.banner_image} width={250} height={125} alt={item?.banner_name}  className='object-contain'/>
        </div>
    )
})
const dataListService = dataService?.data?.map((item:any, index:number)=>{
    return (
       <div key={index} className="">
  <div className="w-24 h-20 gap-2 flex flex-col justify-between">
    <div className="flex items-center justify-center">
      <Image 
        src={item?.service_icon} 
        alt={item?.service_code} 
        width={40} 
        height={40} 
        className="block"
      />
    </div>
    <p className="whitespace-pre-wrap text-sm text-center text-black  w-full">
      {item?.service_name}
    </p>
  </div>
</div>

    )
})
  return (
    <div className='h-screen '>
        <div className='flex flex-row'>
            <div className='w-1/2'>
            <Image src={profile?.profile_image} alt="Profile" width={80} height={80} aria-label='Profile' className='rounded-full border-gray-300 border-solid'/>
            <p className='text-xl font-medium -mt-0'>Selamat datang,</p>
            <h1 className='text-2xl font-bold -mt-6'>{`${profile?.first_name} ${profile?.last_name}`}</h1></div>
            <div className='w-1/2 bg-red-600'>
            <p>Saldo anda</p>
            <h1>Rp. 2,0000,0000</h1>
            <div>Limit Saldo</div>
            </div>
        </div> 
        <div className=' h-1/3 flex flex-wrap justify-between items-center'>
            {dataListService}
        </div> 
        <div className="w-full mt-14">
            <h1 className="mb-3 text-xl">Temukan promo menarik</h1>
            <div className='mt-3 flex justify-between flex-wrap'>
                {dataListBanner}
            </div>
        </div>
    </div>
  )
}
