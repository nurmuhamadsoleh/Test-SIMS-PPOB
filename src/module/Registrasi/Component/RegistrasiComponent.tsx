import { Button, Form as FormANTD } from "antd";
import { Field, Form } from "react-final-form";
import { LockFilled, MailOutlined, UserOutlined } from '@ant-design/icons';

import IlustrationLogin from "assets/images/Illustrasi Login.png"
import Image from "next/image";
import Input from "component/Input";
import Link from "next/link";
import Logo from "assets/images/Logo.png"
import React from 'react'
import RegistrasiValidation from "../Validation/RegistrasiValidation";

interface IProps {
  handleSubmit: (_vals:any) => void
  isLoadingSubmit?: boolean
}
export default function RegistrasiComponent(props: IProps) {
  const {handleSubmit, isLoadingSubmit} = props;

    return (
        <div className="flex h-screen overflow-hidden">
          <div className="w-1/2 ">
            <Form keepDirtyOnReinitialize onSubmit={handleSubmit} subscription={{values: true}} validate={RegistrasiValidation}>
          {(formProps) =>{
            const {handleSubmit, invalid, dirty, form} = formProps
            return (
             <div className="h-full w-full flex items-center justify-center">
              <div className="w-1/2 ">
              <div className="flex items-center justify-center gap-1">
                <Image src={Logo} width={20} height={20} alt="Logo SIMS PPDB" aria-label="Logo SIMS PPDB" />
                <h1 className="text-xl text-center">SIMS PPDB</h1>
              </div>
              <h3 className="text-3xl text-center">Lengkapi data untuk membuat akun</h3>
              <div className="flex justify-center ">
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
                  name='first_name'
                  component={Input} 
                  isFormItem  
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}  
                  placeholder="nama depan"
                  className="w-full"
                  showError={dirty}
                  />
                  <Field 
                  name='last_name'
                  component={Input} 
                  isFormItem  
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}  
                  placeholder="nama belakang"
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
                    placeholder="buat password"
                    showError={dirty}
                    isPassword
                  />
                  <Field
                    name="confirm_password"
                    component={Input}
                    type="password"
                    isFormItem
                    prefix={<LockFilled style={{ color: 'rgba(0,0,0,.25)' }} />}
                    className="w-full"
                    placeholder="konfirmasi password"
                    showError={dirty}
                    isPassword
                    validate={(value:any, allValues:any) => {
                      if (value !== allValues.password) {
                        return "konfirmasi password tidak sesuai dengan password"
                      }
                    }}
                  />
                <div className="mx-auto w-full">
                  <Button
                    className="btn w-full h-10 text-white bg-red-600"
                    size="middle"
                    htmlType="submit"
                    disabled={invalid}
                    loading={isLoadingSubmit}
                  >
                    Registrasi
                  </Button>
                  <p className="text-sm text-black">sudah punya akun? login <Link className="font-bold text-red-600" href={"/login"} replace>disini</Link></p>
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
    );
}
