import { GetBanner, GetServiceAPI } from "service/homepage.api"

import HomePageComponent from '../Component/HomePageComponent'
import React from 'react'
import { useQuery } from "@tanstack/react-query"

export default function HomePageContainer() {
  const {data: dataBanner} = useQuery(['Get Banner List'], GetBanner)
  const {data: dataService} = useQuery(['Get Service List'], GetServiceAPI)
  return (
    <HomePageComponent dataBanner={dataBanner} dataService={dataService}/>
  )
}
