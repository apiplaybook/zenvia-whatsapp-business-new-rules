import sendMessage from "../utils/sendMessages";
import api from "axios";
import formatUnitOfTime from "../utils/formatUnitOfTime";
import { args } from "../configs/api";

interface IProducts {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface ICustomer {
  name: string;
  email: string;
  whatsapp: string;
}

// classe para manipular clientes
class CustomerService {
  public async getCustomer(): Promise<any> {
    //dados retornados da api fake
    const responseCustomers = await api.get("http://localhost:4000/customers");

    const customers = responseCustomers.data;

    return customers;
  }

  public async sendMessageCustomer(product: IProducts, customer: ICustomer) {
    {
      await sendMessage({
        contents: [
          //Estrutura do template onde será enviado a mensagem conforme os dados da api fake JSON Server
          {
            type: "template",
            templateId: "c19443a9-1b36-4dec-a5ba-d3c7a480c90f",
            fields: {
              imageUrl: product.image,
              customer_name: customer.name,
              product_name: product.title,
              link_name: "www.example.com",
              link_promotions: "www.example.com",
            },
          },
        ],
        from: args.from,
        to: customer.whatsapp,
      });
    }
  }

  public async alertCustomerProductBackToCart() {
    //dados retornados da metodo getCustomer
    const customers = await this.getCustomer();

    // irá percorer os dados da api fake para cada cliente irá ser
    // feita a verificação de produtos no carrinho enviando a mensagem de alerta
    customers.forEach(async (customer: any) => {
      const today = new Date();

      //A vaŕiável hourNow recebera o horário convertido no formato 00:00
      const hourNow = `${formatUnitOfTime(today.getHours())}:${formatUnitOfTime(
        today.getMinutes()
      )}`;

      // será feita uma comparação com o horário atual e o horário que foi configurado no objeto args
      // se o horário configurado for o horário atual se  tiver produtos no carrinho será enviado a mensagem de alerta
      if (customer.cart.length && hourNow === args.hour_messages) {
        customer.cart.forEach(async (productsCart: any) => {
          this.sendMessageCustomer(productsCart.product, customer);
        });
      }
    });
  }
}

export default CustomerService;
