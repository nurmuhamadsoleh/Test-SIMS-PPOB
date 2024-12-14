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
import { PulseLoader } from "react-spinners";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
   const {setProfile, token, logOut }: IStore = Store()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleStop = () => {
      setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  console.log("app token", token)
  const GetProfileList = async (): Promise<void> => {
  try {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/profile",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbnV0ZWNoLWludGVncmFzaS5jb20iLCJtZW1iZXJDb2RlIjoiTExLUjZKTDEiLCJpYXQiOjE3MzQwOTk2MDYsImV4cCI6MTczNDE0MjgwNn0._yy5Jvo7YZC_CJcN-QbDgWvsKAhp0GJkC3XKFePUnZU`,
        },
      }
    );
    const data = response;
    console.log("data", data)
    if(data?.data?.status === 0){
      setProfile(data?.data)
      return
    }
  } catch (error:any) {
    if (error.message === 'Network Error') {
      toast.warning(error.message)
    } else if(error.response.data.status === 108){
      toast.error(error.response.data.message)
      router.push('/login')
      logOut()
      localStorage.clear()
    } else {
      toast.error(error.message)
      return
    }
  }
};

useEffect(() => {
  if(token !== ""){
    GetProfileList();
  }
}, []);
  const [queryClient] = useState(() => new QueryClient());
  return (
   <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}