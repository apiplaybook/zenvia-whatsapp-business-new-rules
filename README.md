# zenvia-whatsapp-business-new-rules

Aplicação de exemplo de uso da api do WhatsApp através da ZENVIA, onde automatizamos o processo de notificações utilizando as novas regras de comunicação do WhatsApp Business API.

## Como rodar a aplicação

Para esta aplicação será necessário realizar a contratação do serviço do WhatsApp Business através da  plataforma Zenvia. Para isso acesse o [**site**](https://www.zenvia.com/produtos/whatsapp/) e realize a contratação.

Com o serviço contratado, coloque suas credenciais no arquivo [**`api.ts`**](/src/config/api.ts), preecha os campos **x_api_token** e **from**.

Com tudo configurado, execute o script `dev`:

```bash
npm run dev
#ou
yarn dev
```

Para iniciar a api fake com o **json-server**, execute o comando:

```bash
yarn json-server
```
