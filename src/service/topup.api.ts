import store, { IStore } from 'store'

import axios from "axios";

// import { UseBaseQueryOptions } from '@tanstack/react-query'
// Sesuaikan path ke store Redux Anda.

export async function TopupMinimal(params: any) {
    // Ambil token dari Redux state
    const state: IStore = store.getState();
    const token = state?.token;

    if (!token) {
        throw new Error("Token is missing");
    }

    try {
        const response = await axios.post(
            'https://take-home-test-api.nutech-integrasi.com/topup',
            params,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error;
    }
}
