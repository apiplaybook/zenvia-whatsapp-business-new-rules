import sendMessage from "../utils/sendMessages";
import api from "axios";
import { args } from "../configs/api";

// classe para manipular promoções
class PromotionService {
  //metodo que chama a api fake e pega os dados das promoções
  public async getPromotion() {
    //retorno da chamada da api para retornar os dados das promoções
    const response = await api.get("http://localhost:4000/promotions");

    return response.data;
  }

  //metodo para enviar mensagem com a promoção
  public async sendMessagePromotion({ message }: { message: any }) {
    if (message && message.contents[0].text === "Mais ofertas") {
      const promotion = await this.getPromotion();

      return (
        promotion &&
        (await sendMessage({
          from: args.from,
          to: message.from,
          contents: [
            {
              type: "template",
              templateId: "0ca62925-28b3-4efc-b23f-7a45a3c7a4c8",
              fields: {
                imageUrl: promotion[0].image,
                name_product: promotion[0].title as string,
                price_product: ` ${promotion[0].price.toString()}`,
                product_link: "www.example.com",
              },
            },
          ],
        }))
      );
    }
  }
}

export default PromotionService;
