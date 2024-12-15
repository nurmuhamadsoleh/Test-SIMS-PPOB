import React, { useEffect, useState } from 'react'

import Banner from 'component/Banner'
import dayjs from 'dayjs';
import formatMoney from 'helpers/formatMoney';

interface IProps {
    dataListHistory?:any
    handlePagination: (_vals: number) => void
}
export default function HistoryTransakasiComponent(props: IProps) {
    const {dataListHistory, handlePagination} = props;    
    return (
    <div className='px-2'>
        <Banner/>
        <p className='font-bold text-xl'>Semua Transaksi</p>
        <div >
            {dataListHistory?.map((item: any, index: number) => (
            <div 
            key={index} 
            className="bg-white text-black px-3 py-2 border-solid border-2 border-gray-300 rounded-lg mb-2">
                <div className="flex justify-between">
                    <div className="flex flex-col flex-wrap basis-2/12">
                        <h1 className="text-2xl text-greenBrand">+ Rp. {formatMoney(item.total_amount)}</h1>
                        <h1 className="text-sm text-gray-400 -mt-4">
                            {dayjs(item.created_on).format('DD MMMM YYYY HH:mm') + ' WIB'}
                        </h1>
                    </div>
                    <div className="flex basis-auto">
                        <p className="text-lg capitalize">{item.description}</p>
                    </div>
                </div>
            </div>
            ))}
            {/* Show More Ubah Pagination */}
            <h1 className="text-green-600 text-xl text-center mt-2 cursor-pointer" onClick={()=> handlePagination(1)}>Show More</h1>
        </div>
    </div>
  )
}
