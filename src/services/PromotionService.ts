import sendMessage from "../utils/sendMessages";
import api from "axios";
import { args } from "../configs/api";
//Função para formatar o valor que está no formato inteiro em real
import formatValueToMoney from "../utils/formatValueToMoney";

//Classe para manipular promoções
class PromotionService {
  //Método que chama a api fake e pega os dados das promoções
  public async getPromotion() {
    //Retorno da chamada da api para retornar os dados das promoções
    const response = await api.get("http://localhost:4000/promotions");

    return response.data;
  }

  //Método para enviar mensagem com a promoção
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
              type: "file",
              fileUrl: promotion[0].image,
              fileCaption: `${promotion[0].title}\n${formatValueToMoney(
                promotion[0].price.toString()
              )}\n\nClique no link abaixo e tenha mais informações:\nhttp://link.com`,
            },
          ],
        }))
      );
    }
  }
}

export default PromotionService;
