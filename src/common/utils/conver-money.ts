const convertVnd = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
//300,000đ to 300000
const convertVndToNumber = (value: string) => {
  return parseInt(value.replace(/[^0-9]/g, ""));
};
export { convertVnd, convertVndToNumber };
