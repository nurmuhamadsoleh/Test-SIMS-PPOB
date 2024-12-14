import {
  Button,
  Form as FormANTD,
  Space
} from 'antd'
import { EditOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Field, Form } from 'react-final-form'

import Image from 'next/image'
import Input from 'component/Input'
import Profile from "assets/images/Profile Photo.png"
import React from 'react'

export default function EditProfileComponent() {
  return (
    <div className='px-2 bg-yellow-500'>
        <div className='flex justify-center flex-col mx-auto'>
            <div className='relative mx-auto'>
                <Image src={Profile} alt="Profile" width={80} height={80} aria-label='Profile' className='border-solid border-2 border-gray-200 rounded-full bg-white'/>
                <EditOutlined className='absolute top-12 left-16 p-2 rounded-full border-2 border-solid border-gray-500'/>
            </div>
            <h1 className='text-center -mt-0'>Nur Muhamad Soleh</h1>
            {/* Form */}
           <div className='w-9/12 bg-green-600 mx-auto'>
            <Form keepDirtyOnReinitialize onSubmit={()=>{}} subscription={{values: true}}>
                {(formProps )=>{
                    const {dirty, invalid} = formProps
                    return (
                        <FormANTD layout="vertical" onFinish={formProps.handleSubmit} >
                            <div className='w-full bg-yellow-600'>
                                <div className='-mt-2'>
                                    <Field 
                                        label="Email"
                                        name='EMAIL' 
                                        showError={dirty} 
                                        className="w-full" 
                                        component={Input} 
                                        isFormItem
                                        placeholder="Masukan email/username"
                                        allowClear
                                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,1)' }} />}  
                                    />
                                </div>
                                <div className='-mt-4'>
                                    <Field 
                                        label="Nama Depan"
                                        name='NAMA_DEPAN' 
                                        showError={dirty} 
                                        className="w-full" 
                                        component={Input} 
                                        isFormItem
                                        placeholder="Masukan Nama Depan"
                                        allowClear
                                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,1)' }} />}  
                                    />
                                </div>
                                <div className='-mt-4'>
                                    <Field 
                                        label="Nama Belakang"
                                        name='NAMA_BELAKANG' 
                                        showError={dirty} 
                                        className="w-full" 
                                        component={Input} 
                                        isFormItem
                                        placeholder="Masukan Nama Belakang"
                                        allowClear
                                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,1)' }} />}  
                                    />
                                </div>
                            </div>
                            <div className='flex-wrap flex-col  bg-green-600 -mt-0'>
                                <Button size='large' className="w-full bg-red-600 text-center text-white" htmlType="submit" onMouseEnter={() => false} disabled={invalid}>Simpan</Button> 
                            </div>
                        </FormANTD>
                    )
                }}
            </Form>
           </div>
        </div>
    </div>
  )
}
