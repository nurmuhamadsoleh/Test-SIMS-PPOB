import { ILoginDAO } from "module/Login/DAO/login.dao";
import { IProfileDAO } from "module/Profile/DAO/profile.dao";
import Profile from "assets/images/Profile Photo.png"

export interface IAuthState {
    token: string;
    profile: {
        email: string,
        first_name: string,
        last_name: string,
        profile_image: string
    }
    setToken: (_params: ILoginDAO) => void;
    setProfile: (_params: IProfileDAO) => void;
    logOut: () => void
}

const initialState: IAuthState = {
    token: '',
    profile: {
        email: '',
        first_name: '',
        last_name: '',
        profile_image: '',
    },
    setToken: () => {},
    setProfile: () => {},
    logOut: () => {}
}
const createAuthSlice = (set:any, _get:any) => ({
    token: initialState.token,
    setToken: (_params: ILoginDAO) => {
        set((state: IAuthState) => ({...state, token:_params?.data?.token}))
    },
    setProfile: (_params: IProfileDAO) =>{
        const dataProfile = _params?.data;
        const payload = {
            ...dataProfile,
                email: dataProfile?.email,
                first_name: dataProfile?.first_name,
                last_name: dataProfile?.last_name,
                profile_image: dataProfile?.profile_image?.includes("null") ? Profile : dataProfile?.profile_image,
        }
        set(() => ({profile: payload}))
    },
    logOut: () => {
        set((state: IAuthState) => ({...state, token: ''}))
    }
})
export default createAuthSlice