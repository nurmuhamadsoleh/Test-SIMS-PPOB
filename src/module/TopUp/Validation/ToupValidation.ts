import { unFormatMoney } from "helpers/unFormatMoney"

export default function ToupValidation(values: any, payment?: string) {
  const error: any = {}
  const {
    top_up_amount
  } = values
  let money = unFormatMoney(payment)
  console.log("money", money)
  if (top_up_amount === "0") {
    error.top_up_amount = "Miniaml Top Up Rp. 10,000"
  } else if (money > 1000000){
     error.top_up_amount = "Maximal Top Up Rp. 1,000,000"
  }
  return error
}
