import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import "styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Store, { IStore } from 'store'
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import NotFoundContainer from "module/404/Container/NotFoundContainer";
import OfflinePageContainer from "module/404/Container/OfflinePageContainer";
import { PulseLoader } from "react-spinners";
import RegistrasiContainer from "module/Registrasi/Container/RegistrasiContainer";
import Template from "component/Template";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
   const {setProfile, token, logOut }: IStore = Store()
  const [isLoading, setIsLoading] = useState(false);
  const [statusPage, setStatusPage] = useState(true);
  const [showChild, setShowChild] = useState(false);
  
  useEffect(() => {
    const changeStatus = () =>{
      setStatusPage(navigator.onLine)
    }
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleStop = () => {
      setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };
    window.addEventListener('online', changeStatus)
    window.addEventListener('offline', changeStatus)
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
   const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: true,
        cacheTime: 5000,
      },
    },
  });
  const GetProfileList = async (): Promise<void> => {
  try {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/profile",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer " + token,
        },
      }
    );
    const data = response;
    if(data?.data?.status === 0){
      setProfile(data?.data?.data)
      return
    }
  } catch (error:any) {
    if (error.message === 'Network Error') {
      toast.warning(error.message)
    } else if(error.response.data.status === 108){
      toast.error(error.response.data.message)
      router.push('/login')
      logOut()
    } else {
      toast.error(error.message)
      return
    }
  }
};

useEffect(() => {
  if (token) {
        GetProfileList()
        const intervalId = setInterval(
          () => {
            GetProfileList()
          },
          500
          // 5 * 60 * 1000 // 5 menit dalam milidetik
        ) // 4 jam dalam milidetik

        return () => clearInterval(intervalId) // Bersihkan interval saat komponen di-unmount
      }
}, [token]);
  function Root(){
    useEffect(()=>{
      setShowChild(true)
    },[])
    useEffect(()=>{
      if(showChild && statusPage == true){
        if(router.pathname === '/'){
          router.push("/")
        } else if(router.pathname !== '/'){
          router.push('/homepage')
        }
      }
    },[showChild, statusPage])
    if(!showChild){
    return null
    }
    if(statusPage === false){
      return <OfflinePageContainer/>
    }
    if(router.pathname === '/_error'){
      return <NotFoundContainer/> 
    }
    if(showChild){
      const listNoTemplate= ['/','/login']
      if(!listNoTemplate.includes(router.pathname)){
        return (
          <Template>
            <Component {...pageProps} />
          </Template>
        )
      }
      if(router.pathname === '/'){
        return <RegistrasiContainer/>
      } else {
        return <Component {...pageProps} />
      }
    }
  }
  
  
  return (
   <QueryClientProvider client={queryClient}>
      <Head>
        <title>Country</title>
      </Head>
      <div className="light m-0 p-0 box-border">
        {isLoading && (
          <div className="fixed  z-[1000] w-screen h-screen flex justify-center items-center bg-red-600 opacity-100 duration-1000 overflow-hidden">
            <PulseLoader color="white" className="m-auto" size={40} />
          </div>
        )}
        {Root()}
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}