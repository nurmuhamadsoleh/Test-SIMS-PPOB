import {
  Button,
  Form as FormANTD
} from 'antd'
import { Field, Form } from 'react-final-form'

import Banner from 'component/Banner'
import { IRequestDAO } from 'dao/request.dao'
import { IServiceDAO } from 'module/HomePage/DAO/service.dao'
import Image from "next/image"
import Listrik from "assets/images/Listrik.png"
import React from 'react'
import Select from 'component/Select'
import ToupValidation from '../Validation/ToupValidation'
import formatMoney from 'helpers/formatMoney'

interface IProps {
  dataService?:IRequestDAO<IServiceDAO[]>
  dataFilterService?:IServiceDAO[]
  handleSubmit: (_vals:any) => void
  isLoadingSubmit: boolean
  handleSelectedTrx: (_vals:any) => void;
  selectedTrx: string;
  isLoadingTrx: boolean
}
export default function TopUpComponent(props: IProps) {
  const {dataService, handleSubmit, isLoadingSubmit, handleSelectedTrx, selectedTrx, isLoadingTrx, dataFilterService} = props
  const {service_name, service_icon}:any = dataFilterService?.[0] || []
  return (
    <div className=' '>
      <Banner/>
      <h1 className='pl-2'>Pembayaran</h1>
        <div className='flex gap-x-2 items-center -mt-3 px-2'>
            <Image src={service_icon} alt={service_name} width={40} height={40} aria-label={service_name}  className="object-contain" />
            <span>{service_name}</span>            
        </div>
        <div className="mt-4  mx-2">
            {/* Form */}
            <Form keepDirtyOnReinitialize onSubmit={handleSubmit} subscription={{values: true}} validate={(e) =>ToupValidation(e)}>
              {(formProps) =>{
                const {handleSubmit, dirty, invalid} = formProps
                return (
                  <FormANTD layout="vertical" onFinish={handleSubmit} className="mx-auto">
                    <div className='w-full  h-[8vh]'>
                      <Field 
                      name='service_code' 
                      showError={dirty} 
                      className="w-full" 
                      component={Select} 
                      isFormItem
                      allowClear
                      showSearch 
                      placeholder="Pilih Toup"
                      onChange={handleSelectedTrx}
                      filterOption={(input:any, option:any) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} 
                      loading={isLoadingTrx} 
                      optionData= {dataService?.data?.map((item:any)=>({
                        label: `${item?.service_name} - ${formatMoney(item?.service_tariff)}`,
                        value: item?.service_code
                      })) || []} 
                    />
                    </div>
                    <div className={`w-full -mt-0`}>
                      <Button size='large' className={`w-full text-center border-gray-500 border-solid border-2
                          ${selectedTrx === "" ? "bg-gray-400 text-black" : "bg-red-600 text-white" }`} htmlType="submit" onMouseEnter={() => false} loading={isLoadingSubmit} disabled={isLoadingSubmit || selectedTrx === ""}>Bayar</Button>
                    </div>
                  </FormANTD>
                )
              }}
            </Form>
        </div>
    </div>
  )
}
