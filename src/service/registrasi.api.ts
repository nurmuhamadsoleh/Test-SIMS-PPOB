import { IRegisterDTO } from 'module/Registrasi/DTO/register.dto';
import axios from "axios";

// import { UseBaseQueryOptions } from '@tanstack/react-query'


export async function Register(params: IRegisterDTO) {
    const {data} = await axios.post('https://take-home-test-api.nutech-integrasi.com/registration', params);
    return data
}