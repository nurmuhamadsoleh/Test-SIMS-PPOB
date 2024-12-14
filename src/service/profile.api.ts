import store, { IStore } from 'store'

import { IProfileDAO } from 'module/Profile/DAO/profile.dao';
import { UseBaseQueryOptions } from '@tanstack/react-query'
import axios from "axios";

const state = store.getState()

export async function GetProfileAPI(
    params: UseBaseQueryOptions 
): Promise<IProfileDAO> {
     const [
    // eslint-disable-next-line no-unused-vars
    _queryKey,
  ] = params.queryKey || []
  const state: IStore = store.getState()
    const { data } = await axios.get("https://take-home-test-api.nutech-integrasi.com/profile", { 
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + state?.token,
        }
    });
    return data;
}
export async function UpdateUser(params: any) {
    const { data } = await axios.put('https://take-home-test-api.nutech-integrasi.com/profile/update', params, {
         headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + state?.token,
        }
    })
    return data;
}