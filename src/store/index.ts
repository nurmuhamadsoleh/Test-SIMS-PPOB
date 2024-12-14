import createAuthSlice, { IAuthState } from "./authSlice";
import { devtools, persist } from 'zustand/middleware';

import { create } from 'zustand'

export interface IStore extends IAuthState {};
const store: any = persist(
    (set: any, get: any) =>
    <IStore>{
        ...createAuthSlice(set, get)
    },
    {
        name: 'auth',
        partialize: (state: any) => ({
            token: state.token,
            profile: state.profile
        }),
    }
)
const createStore:any = create(devtools<IAuthState>(store, {name: 'store'}));

export default createStore