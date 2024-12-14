import store, { IStore } from 'store'

import { IBalanceDAO } from 'module/HomePage/DAO/balance.dao';
import { UseBaseQueryOptions } from '@tanstack/react-query'
import axios from "axios";

// import { UseBaseQueryOptions } from '@tanstack/react-query'
// Sesuaikan path ke store Redux Anda.

export async function TopupMinimal(params: any) {
    // Ambil token dari Redux state
    const state: IStore = store.getState();
    const token = state?.token;
    const response = await axios.post(
            'https://take-home-test-api.nutech-integrasi.com/topup', params,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
    return response;
}

export async function GetBalanceAPI(params: UseBaseQueryOptions): Promise<IBalanceDAO>{
    const [
    // eslint-disable-next-line no-unused-vars
    _queryKey,
    ] = params.queryKey || []
    const state: IStore = store.getState();
    const token = state?.token;
    const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/balance", {
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + token,
        }
    });
    return data;
}
export async function GetHistoryAPI(params: UseBaseQueryOptions): Promise<any>{
    const [
    // eslint-disable-next-line no-unused-vars
    _queryKey,
    size,
    ] = params.queryKey || []
    const state: IStore = store.getState();
    const token = state?.token;
    const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/transaction/history", {
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + token,
        }, 
        params: {
            offset: 0,
            limit: size || 3,
        }
    });
    return data;
}