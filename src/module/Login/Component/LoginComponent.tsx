import { Button, Form as FormANTD } from "antd";
import { Field, Form } from "react-final-form";
import { LockFilled, MailOutlined } from '@ant-design/icons';

import IlustrationLogin from "assets/images/Illustrasi Login.png"
import Image from "next/image";
import Input from "component/Input";
import Link from "next/link";
import LoginValidation from "../Validation/LoginValidation";
import Logo from "assets/images/Logo.png"
import React from 'react'

interface IProps {
    handleSubmit: (_vals:any) => void
    isLoadingSubmit?: boolean
}
export default function LoginComponent(props: IProps) {
    const {handleSubmit, isLoadingSubmit} = props
  return (
      <div className="flex h-screen overflow-hidden">
          <div className="w-1/2">
            <Form onSubmit={handleSubmit} validate={LoginValidation} keepDirtyOnReinitialize subscription={{values: true}}>
          {(formProps) =>{
            const {handleSubmit, invalid, dirty, form} = formProps
            return (
             <div className="h-full w-full flex items-center justify-center">
              <div className="w-1/2 ">
              <div className="flex items-center justify-center gap-1">
                <Image src={Logo} width={20} height={20} alt="Logo SIMS PPDB" aria-label="Logo SIMS PPDB" />
                <h1 className="text-xl text-center">SIMS PPDB</h1>
              </div>
              <h3 className="text-3xl text-center">Masuk atau buat akun untuk memulai</h3>
              <div className="flex justify-center">
                <FormANTD layout="vertical" onFinish={handleSubmit} className="mx-auto">
                 <Field 
                  name='email'
                  component={Input} 
                  isFormItem  
                  prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}  
                  placeholder="Masukan email anda"
                  className="w-full"
                  showError={dirty}
                  />
                  <Field
                    name="password"
                    component={Input}
                    type="password"
                    isFormItem
                    prefix={<LockFilled style={{ color: 'rgba(0,0,0,.25)' }} />}
                    className="w-full"
                    placeholder="masukan password anda"
                    showError={dirty}
                    isPassword
                  />
                <div className="mx-auto w-full">
                  <Button
                    className="btn w-full h-10 text-white bg-red-600"
                    size="middle"
                    htmlType="submit"
                    disabled={invalid}
                    loading={isLoadingSubmit}
                  >
                    Masuk
                  </Button>
                  <p>belum punya akun? register <Link className="font-bold text-red-600 underline underline-offset-2 cursor-pointer" href={"/"} replace>disini</Link></p>
                </div>
              </FormANTD>
              </div>
             </div>
            </div>
            )
          }}
          </Form>
          </div>
          <div className="w-1/2 h-screen bg-red-700 my-0">
          <Image
            src={IlustrationLogin}
            alt="Ilustrasi Login"
            aria-label="Ilustrasi Login"
            className="object-cover w-full h-full"  // Ini untuk memastikan gambar mengisi div sepenuhnya
          />
          </div>
        </div>
  )
}
