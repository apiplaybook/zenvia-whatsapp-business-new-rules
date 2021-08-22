import express from "express";
import cron from "node-cron";
import AlertProductsBackToStockService from "./services/AlertProductsBackToStockService";

const app = express();

// Com está biblioteca o cron job é possível controlar tarefas a serem executadas em tempos pré-configurados.
cron.schedule("* * * * *", async () => {
  const alertProductsChangeBackToCart = new AlertProductsBackToStockService();

  //esta função vai mandar um alerta sobre produtos que estão de volta ao estoque.
  await alertProductsChangeBackToCart.execute();
});

app.listen(3000, () => console.log("Web server running on port 3000!"));
