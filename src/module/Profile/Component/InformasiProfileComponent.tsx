import {
  Button,
  Form as FormANTD,
  Space
} from 'antd'
import { EditOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Field, Form } from 'react-final-form'
import Store, { IStore } from 'store'

import Image from 'next/image'
import Input from 'component/Input'
import React from 'react'
import { useRouter } from 'next/router'
import { values } from 'lodash'

interface IProps {
  initialValues?:any;  
  handleSubmit: (_vals:any) => void
}
export default function InformasiProfileComponent(props:IProps) {
    const {initialValues, handleSubmit} = props
    const router = useRouter()
    const {profile, logOut }: IStore = Store()
  return (
    <div className='px-2 bg-yellow-500'>
        <div className='flex justify-center flex-col mx-auto'>
            <div className='relative mx-auto'>
                <Image src={initialValues?.profile_image} alt="Profile" width={80} height={80} aria-label='Profile' className='border-solid border-2 border-gray-200 rounded-full bg-white'/>
                <EditOutlined className='absolute top-12 left-16 p-2 rounded-full border-2 border-solid border-gray-500'/>
            </div>
            <h1 className='text-center -mt-0'>{`${initialValues?.first_name} ${initialValues?.last_name}`}</h1>
            {/* Form */}
           <div className='w-9/12 bg-green-600 mx-auto'>
            <Form keepDirtyOnReinitialize onSubmit={handleSubmit} subscription={{values: true}} initialValues={initialValues}>
                {(formProps )=>{
                    const {dirty, invalid, handleSubmit, values} = formProps
                    console.log("profile", {profile, values})
                    return (
                        <FormANTD layout="vertical" onFinish={handleSubmit} >
                            <div className='w-full bg-yellow-600'>
                                <div className='-mt-2'>
                                    <Field 
                                        label="Email"
                                        name='email' 
                                        showError={dirty} 
                                        className="w-full" 
                                        component={Input} 
                                        isFormItem
                                        placeholder="Masukan email/username"
                                        allowClear
                                        disabled
                                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,1)' }} />}  
                                    />
                                </div>
                                <div className='-mt-4'>
                                    <Field 
                                        label="Nama Depan"
                                        name='first_name' 
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
                                        name='last_name' 
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
                                {(profile?.first_name !== values?.first_name || profile?.last_name !== values?.last_name) && (
                                <Button
                                    size="large"
                                    className="w-full text-red-600 bg-white text-center border-solid border-2 border-red-600 mb-3"
                                    htmlType="submit"
                                    onMouseEnter={() => false}
                                   
                                >
                                    Edit Profile
                                </Button>
                                )}

                                <Button size='large' className="w-full bg-red-600 text-center text-white" htmlType="submit" onClick={()=> {
                                    logOut()
                                    router.push('/login')
                                }} onMouseEnter={() => false} disabled={invalid}>Logout</Button> 
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
