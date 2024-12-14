import store, { IStore } from 'store'

import { IBannerDAO } from 'module/HomePage/DAO/banner.dao';
import { IRequestDAO } from 'dao/request.dao';
import { IServiceDAO } from 'module/HomePage/DAO/service.dao';
import { UseBaseQueryOptions } from '@tanstack/react-query'
import axios from "axios";

const state = store.getState()

export async function GetBanner(params: UseBaseQueryOptions): Promise<IRequestDAO<IBannerDAO[]>>{
    const [
    // eslint-disable-next-line no-unused-vars
    _queryKey,
    ] = params.queryKey || []
    const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/banner", {
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + state?.token,
        }
    });
    return data;
}
export async function GetServiceAPI(params: UseBaseQueryOptions): Promise<IRequestDAO<IServiceDAO[]>>{
    const [
    // eslint-disable-next-line no-unused-vars
    _queryKey,
    ] = params.queryKey || []
    const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/services", {
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + state?.token,
        }
    });
    return data;
}
export async function Transaksi(params: any){
    const { data } = await axios.post('https://take-home-test-api.nutech-integrasi.com/transaction', params, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + state?.token,
        }
    })
    return data
}