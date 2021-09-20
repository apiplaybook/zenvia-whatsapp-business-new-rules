import express from "express";
import CustomerService from "./services/CustomerService";
import PromotionService from "./services/PromotionService";
import cron from "node-cron";

const app = express();

app.use(express.json());

//webhook criado para receber o evento de "Mais opções"
app.post("/", async (request, response) => {
  try {
    const { message } = request.body;

    const alertPromotion = new PromotionService();

    await alertPromotion.sendMessagePromotion({ message });

    return response.json().send();
  } catch (error) {
    //@ts-ignore
    return console.error(error.message);
  }
});

// Com está biblioteca o cron job é possível controlar tarefas a serem executadas em tempos pré-configurados.
cron.schedule("* * * * *", async () => {
  try {
    const promotionService = new CustomerService();

    //esta função vai mandar um alerta sobre produtos que estão de volta ao estoque.
    await promotionService.alertCustomerProductBackToCart();
  } catch (error) {
    //@ts-ignore
    return console.error(error.message);
  }
});

app.listen(3000, () => console.log("Web server running on port 3000!"));
