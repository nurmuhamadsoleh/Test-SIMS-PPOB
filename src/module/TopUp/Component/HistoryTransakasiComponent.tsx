import React from 'react'

export default function HistoryTransakasiComponent() {
  return (
    <div className='px-2'>
        <p className='font-bold text-xl'>Semua Transaksi</p>
        <div>
            <div className='bg-white text-black px-3 py-2 border-solid border-2 border-gray-300 rounded-lg mb-2'>
                <div className='flex justify-between'>
                    <div className='flex flex-col flex-wrap basis-2/12 bg-yellow-500'>
                        <h1 className='text-2xl text-greenBrand'>+ Rp. 10.000</h1>
                        <h1 className='text-sm text-gray-400 -mt-4'>17 Agustus 2023 13:10 WIB</h1>
                    </div>
                    <div className='flex basis-auto'>
                        <p className='text-lg capitalize'>Top Up Saldo</p>
                    </div>
                </div>
            </div>
             <div className='bg-white text-black px-3 py-2 border-solid border-2 border-gray-300 rounded-lg'>
                <div className='flex justify-between'>
                    <div className='flex flex-col flex-wrap basis-2/12 bg-yellow-500'>
                        <h1 className='text-2xl text-greenBrand'>+ Rp. 10.000</h1>
                        <h1 className='text-sm text-gray-400 -mt-4'>17 Agustus 2023 13:10 WIB</h1>
                    </div>
                    <div className='flex basis-auto'>
                        <p className='text-lg capitalize'>Top Up Saldo</p>
                    </div>
                </div>
            </div>
            {/* Show More Ubah Pagination */}
            <h1 className='text-red-500 text-xl text-center mt-2'>Show More</h1>
        </div>
    </div>
  )
}
