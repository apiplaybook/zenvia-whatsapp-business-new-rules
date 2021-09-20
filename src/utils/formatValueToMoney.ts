const formatValueToMoney = (value: number): string => {
  // formata o valor para a moeda brasileira
  const formatedvalue = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  //retorna o valor convertido
  return formatedvalue;
};

export default formatValueToMoney;
