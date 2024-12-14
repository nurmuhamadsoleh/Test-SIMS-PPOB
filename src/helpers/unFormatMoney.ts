 export const unFormatMoney = (val: any) => {
    return parseFloat(val?.replace(/\./g, ""));
  };