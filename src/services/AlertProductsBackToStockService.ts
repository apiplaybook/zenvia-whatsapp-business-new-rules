import sendMessage from "../utils/sendMessages";
import api from "axios";
import formatUnitOfTime from "../utils/formatUnitOfTime";
import { args } from "../configs/api";

class AlertProductsBackToStockService {
  public async execute() {
    // retorno da chamada da api que foi criada utilizando o JSON server
    const responseCustomers = await api.get("http://localhost:4000/customers");

    //dados retornados da api fake
    const customers = responseCustomers.data;

    // irá percorer os dados da api fake para cada cliente irá ser
    // feita a verificação de produtos no carrinho enviando a mensagem de alerta
    customers.forEach(async (cusomter: any) => {
      const productsInCart = cusomter.cart; // guarda o length da array cart

      const today = new Date();

      //A vaŕiável hourNow recebera o horário convertido no formato 00:00
      const hourNow = `${formatUnitOfTime(today.getHours())}:${formatUnitOfTime(
        today.getMinutes()
      )}`;

      if (productsInCart.length > 0) {
        // será feita uma comparação com o horário atual e o horário que foi configurado no objeto args
        // se o horário configurado for o horário atual se  tiver produtos no carrinho será enviado a mensagem de alerta
        if (hourNow === args.hour_messages) {
          cusomter.cart.forEach(async (productsCart: any) => {
            await sendMessage({
              contents: [
                //Estrutura do template onde será enviado a mensagem conforme os dados da api fake JSON Server
                {
                  type: "template",
                  templateId: "c19443a9-1b36-4dec-a5ba-d3c7a480c90f",
                  fields: {
                    imageUrl: productsCart.product.image,
                    customer_name: cusomter.name,
                    product_name: productsCart.product.title,
                    link_name: "www.example.com",
                    link_promotions: "www.example.com",
                  },
                },
              ],
              from: args.from,
              to: cusomter.whatsapp,
            });
          });
        }
      }
    });
  }
}

export default AlertProductsBackToStockService;
