import { Button, Form as FormANTD } from 'antd'
import { Field, Form } from "react-final-form";
import React, { useState } from 'react'

import Banner from 'component/Banner';
import Input from 'component/Input'
import ToupValidation from '../Validation/ToupValidation'

interface IProps {
  handleSubmit: (_vals:any) => void  
  isLoadingSubmit: boolean
}
export default function NominalTopUpComponent(props: IProps) {
    const {handleSubmit, isLoadingSubmit} = props
     
    const [payment, setPayment] = useState<undefined|any>("0")
    const handleInputPaymentCash = (e:any) =>{
        const rawValue = e;
        const newValue:any = rawValue === '' ? '0' : rawValue.toLocaleString('id-ID')
        setPayment(newValue);
    }
    const handleInputPayment = (e:any) =>{
        const rawValue = e.target.value.replace(/[^\d]/g, '')
        const newValue: any = rawValue === '' ? '0' : parseFloat(rawValue).toLocaleString('id-ID')
        setPayment(newValue);
    }
  return (
    <div className=' px-2'>
        <Banner/>
        <p className='font-normal text-lg'>Silakan masukan</p>
        <h1 className='font-bold text-2xl -mt-4'>Nominal Top Up</h1>
        <div className='flex gap-x-2'>
            <div className=' w-3/4'>
              <Form onSubmit={handleSubmit} keepDirtyOnReinitialize subscription={{values: true}} validate={(e)=>
                ToupValidation(e, payment)
              }>
                {(formProps) => {
                    const {handleSubmit, invalid, dirty, form} = formProps
                    form.change("top_up_amount", payment)
                    return (
                        <div className='w-full  h-[8vh]'>
                            <FormANTD layout='vertical' onFinish={handleSubmit}>
                                <Field 
                                name='top_up_amount' 
                                component={Input} 
                                isFormItem 
                                placeholder="Masukan Minimal TopUp Rp.10. 0000" 
                                value={payment} 
                                onChange={handleInputPayment}  allowClear 
                                showError={dirty} />
                                <div className="w-full -mt-0">
                                    <Button
                                        size="large"
                                        htmlType="submit"
                                        className={`w-full text-center ${payment === "0" ? "bg-gray-500 text-black" : "text-white bg-red-600"}`}
                                        disabled={payment === "0" || invalid}
                                        loading={isLoadingSubmit}
                                    >
                                        Bayar
                                    </Button>
                                </div>
                            </FormANTD>
                        </div>
                    )
                }}
              </Form>
            </div>
            <div className='w-1/4'>
                <div className='flex justify-evenly flex-wrap gap-2'>
                    <Button type="default" className='bg-white text-black rounded-md outline-2  w-1/4' size='large' onClick={()=> handleInputPaymentCash(10000)}>10.000</Button>
                    <Button type="default" className='bg-white text-black rounded-md outline-2 w-1/4' size='large' onClick={()=> handleInputPaymentCash(20000)}>20.000</Button>
                    <Button type="default" className='bg-white text-black rounded-md outline-2 w-1/4' size='large' onClick={()=> handleInputPaymentCash(50000)}>50.000</Button>
                    <Button type="default" className='bg-white text-black rounded-md outline-2 w-1/4' size='large' onClick={()=> handleInputPaymentCash(100000)}>100.000</Button>
                    <Button type="default" className='bg-white text-black rounded-md outline-2 w-1/4' size='large' onClick={()=> handleInputPaymentCash(250000)}>250.000</Button>
                    <Button type="default" className='bg-white text-black rounded-md outline-2 w-1/4' size='large' onClick={()=> handleInputPaymentCash(500000)}>500.000</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
