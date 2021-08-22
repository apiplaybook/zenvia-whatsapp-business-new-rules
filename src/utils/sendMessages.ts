import axios from "axios";
import { args } from "../configs/api";

interface IBody {
  from: string;
  to: string;
  contents: any[];
}

// função que será responsavel por enviar uma requisição POST onde será enviado as mensagem
async function sendMessage(body: IBody) {
  try {
    const data = await axios.post(
      "https://api.zenvia.com/v2/channels/whatsapp/messages", // endpoint de envios de mensagens
      body,
      {
        headers: {
          "content-type": "application/json",
          "X-API-TOKEN": args.x_api_token, // token gerado na plataforma da zenvia
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
}

export default sendMessage;
