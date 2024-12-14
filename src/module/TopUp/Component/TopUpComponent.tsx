import {
  Button,
  Form as FormANTD
} from 'antd'
import { Field, Form } from 'react-final-form'

import Image from "next/image"
import Listrik from "assets/images/Listrik.png"
import React from 'react'
import Select from 'component/Select'
import ToupValidation from '../Validation/ToupValidation'

export default function TopUpComponent() {
  return (
    <div className=' bg-teal-600 '>
      <h1 className='pl-2'>Pembayaran</h1>
        <div className='flex gap-x-2 items-center -mt-3 px-2'>
            <Image src={Listrik} alt="Listrik" width={40} height={40} aria-label='Listrik'  className="object-contain" />
            <span>Listrik Prabayar</span>            
        </div>
        <div className="mt-4  mx-2">
            {/* Form */}
            <Form keepDirtyOnReinitialize onSubmit={()=>{}} subscription={{values: true}} validate={ToupValidation}>
              {(formProps) =>{
                const {dirty, invalid} = formProps
                return (
                  <FormANTD layout="vertical" onFinish={formProps.handleSubmit} className="mx-auto">
                    <div className='w-full bg-yellow-500 h-[8vh]'>
                      <Field 
                      name='TOUP' 
                      showError={dirty} 
                      className="w-full" 
                      component={Select} 
                      isFormItem
                      allowClear
                      showSearch 
                      filterOption={false} 
                      loading={false} 
                      optionData= {[{value: "10.000", label: "10.000"}, {value: "20.000", label: "20.000"}, {value: "50.000", label: "50.000"}]} 
                    />
                    </div>
                    <div className='w-full -mt-0 bg-green-500'>
                      <Button size='large' className="w-full bg-red-600 text-center text-white" htmlType="submit" onMouseEnter={() => false} disabled={invalid}>Bayar</Button>
                    </div>
                  </FormANTD>
                )
              }}
            </Form>
        </div>
    </div>
  )
}
