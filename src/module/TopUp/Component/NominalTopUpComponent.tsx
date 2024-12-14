import { Button, Form as FormANTD } from 'antd'
import { Field, Form } from "react-final-form";
import React, { useEffect, useState } from 'react'

import Input from 'component/Input'
import ToupValidation from '../Validation/ToupValidation'

interface IProps {
  handleSubmit: (_vals:any) => void  
}
export default function NominalTopUpComponent(props: IProps) {
    const {handleSubmit} = props
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
    console.log("payment", payment)
  return (
    <div className='bg-teal-600 px-2'>
        <p className='font-normal text-lg'>Silakan masukan</p>
        <h1 className='font-bold text-2xl -mt-4'>Nominal Top Up</h1>
        <div className='flex gap-x-2'>
            <div className='bg-green-600 w-3/4'>
                <Form
                onSubmit={(values) => {
                    console.log("Form Values:", values);
                }}
                render={(formProps) => {
                    const { handleSubmit, form, dirty } = formProps;
                useEffect(() => {
                form.change("top_up_amount", payment);
                }, [form, payment]);

                    return (
                        <FormANTD
                            labelCol={{ span: 10 }}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <div className="w-full bg-yellow-600 h-[8vh]">
                            <Field
                                name="top_up_amount"
                                component={Input}
                                onChange={handleInputPayment}
                                value={payment}
                                placeholder="Nilai Minimal Toup Rp. 10. 000"
                                className="w-full"
                                allowClear
                                autoFocus
                                isFormItem
                                showError={dirty}
                            />
                            </div>
                            <div className="w-full bg-green-600 -mt-0">
                            <Button
                                size="large"
                                htmlType="submit"
                                className="w-full bg-green-600 text-center text-white"
                            >
                                Bayar
                            </Button>
                            </div>
                        </FormANTD>
                    );
                }}
                />
            </div>
            <div className='w-1/4 bg-yellow-500'>
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
