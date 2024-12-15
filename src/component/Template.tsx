import Image from 'next/image'
import Link from 'next/link'
import Logo from "../assets/images/Logo.png"
import React from 'react'

require('dayjs/locale/id')
interface IProps {
  children: any
}
export default function Template(props: IProps) {
  const { children } = props
  return (
    <div >
      <div className='h-[10vh]  flex items-center '>
        <div className='flex justify-start w-10/12 '>
        <div className='flex items-center gap-x-2'>
         <Image src={Logo} width={20} height={20} alt='Logo SIMS PPOB'/>
          <h1 className='text-xl'>SIMS PPOB</h1></div>
        </div>
        <div className="flex justify-end w-1/5 bg-red-600 text-black">
          <div className="w-full ">
            <ul className="list-none flex gap-x-3 justify-center"> 
              <li><Link href="/homepage" className="no-underline text-black hover:text-white hover:font-bold font-medium hover:underline hover:underline-offset-2 hover:decoration-red-600 hover:pt-2 cursor-pointer">Top Up</Link></li>
              <li><Link href="/historypembayaran" className="no-underline text-black hover:text-white hover:font-bold font-medium hover:underline hover:underline-offset-2 hover:decoration-red-600 hover:pt-2 cursor-pointer">Transaction</Link></li>
              <li><Link href="/profile" className="no-underline text-black hover:text-white hover:font-bold font-medium hover:underline hover:underline-offset-2 hover:decoration-red-600 hover:pt-2 cursor-pointer">Akun</Link></li>
            </ul>
          </div>
        </div>
        <hr className='border-b-4 border-solid border-gray-700 border-t border-l-0 border-r-0'/>
      </div>
      {children}
    </div>
  )
}
