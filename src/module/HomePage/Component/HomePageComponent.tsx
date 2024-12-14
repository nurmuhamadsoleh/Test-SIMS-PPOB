import Store, { IStore } from 'store'

import Banner from 'component/Banner'
import { IBannerDAO } from '../DAO/banner.dao'
import { IRequestDAO } from 'dao/request.dao'
import { IServiceDAO } from '../DAO/service.dao'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

interface IProps {
    dataBanner?: IRequestDAO<IBannerDAO[]>;
    dataService?: IRequestDAO<IServiceDAO[]>;
}
export default function HomePageComponent(props: IProps) {
const {dataBanner, dataService} = props
const { setSelectedJenisTrx }: IStore = Store()
const router = useRouter()
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
        <div className="w-24 h-20 gap-2 flex flex-col justify-between cursor-pointer" onClick={()=>router.push('/pembayaran')}>
            <div className="flex items-center justify-center cursor-pointer" onClick={()=>router.push('/pembayaran')}>
            <Image 
                src={item?.service_icon} 
                alt={item?.service_code} 
                onClick={()=> {
                    setSelectedJenisTrx(item?.service_code)
                    router.push("/pembayaran")
                }}
                width={40} 
                height={40} 
                className="block cursor-pointer"
            />
            </div>
            <p className="whitespace-pre-wrap text-sm text-center text-black  w-full cursor-pointer" onClick={()=>router.push('/pembayaran')}>
            {item?.service_name}
            </p>
        </div>
    </div>
    )
})
  return (
    <div className='h-screen '>
        <Banner/>
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
