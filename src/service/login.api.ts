import {ILoginDTO} from "module/Login/DTO/login.dto"
import axios from "axios";

export async function Login(params: ILoginDTO) {
    console.log("params", params)
    const {data} = await axios.post('https://take-home-test-api.nutech-integrasi.com/login', params);
    return data
}