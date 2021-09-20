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
          //Estrutura do template para onde será enviada a mensagem conforme os dados da API fake JSON Server
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
    //Dados retornados do método getCustomer
    const customers = await this.getCustomer();

    // Para cada customer vai ser feita a verificação de produtos esquecidos no carrinho e horário determinado
    customers.forEach(async (customer: any) => {
      const today = new Date();

      //A variável hourNow receberá o horário convertido no formato 00:00
      const hourNow = `${formatUnitOfTime(today.getHours())}:${formatUnitOfTime(
        today.getMinutes()
      )}`;

      //Se o horário configurado for o horário atual e se tiverem produtos no carrinho será enviada a mensagem de alerta
      if (customer.cart.length && hourNow === args.hour_messages) {
        customer.cart.forEach(async (productsCart: any) => {
          this.sendMessageCustomer(productsCart.product, customer);
        });
      }
    });
  }
}

export default CustomerService;
