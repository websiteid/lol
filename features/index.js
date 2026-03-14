const fs = require('fs');
const path = require('path');
const config = require('../config');

global.userState = global.userState || {};
global.orderDB = global.orderDB || {};

const features = {};

const files = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== 'index.js');

files.forEach(file => {
  const name = path.basename(file, '.js');
  features[name] = require(`./${file}`);
});

function register(bot) {

  console.log('🚀 Bot Shop Started');

  // COMMAND
  Object.values(features).forEach(feature => {
    if (feature.command) {
      const pattern = new RegExp(`^\\/${feature.command}`);
      bot.onText(pattern, (msg) => {
        feature.execute(bot, msg);
      });
    }
  });

  // HANDLE BUKTI TRANSFER
  bot.on('message', async (msg) => {

    const chatId = msg.chat.id;

    if (global.userState[chatId] === "waiting_payment") {

      if (msg.photo) {

        const order = global.orderDB[chatId];

        bot.sendPhoto(config.ADMIN_ID, msg.photo[msg.photo.length - 1].file_id, {
          caption:
`📥 ORDER MASUK

User : @${msg.from.username || "no_username"}
Produk : ${order.product}
Harga : ${order.price}`
        });

        bot.sendMessage(chatId, "⏳ Admin sedang memverifikasi pembayaran...");

        global.userState[chatId] = "waiting_admin";

      }

    }

  });

  // CALLBACK BUTTON
  bot.on("callback_query", async (q) => {

    const data = q.data;
    const chatId = q.message.chat.id;

    if (data.startsWith("buy_")) {

      const product = data.replace("buy_", "");

      const productList = {
        vip: { price: "Rp10.000", file: "VIP ACCESS LINK" },
        panel: { price: "Rp15.000", file: "PANEL FILE DOWNLOAD" },
        script: { price: "Rp25.000", file: "SCRIPT BOT DOWNLOAD" }
      };

      const item = productList[product];

      global.orderDB[chatId] = {
        product: product,
        price: item.price,
        file: item.file
      };

      global.userState[chatId] = "waiting_payment";

      bot.sendPhoto(chatId, "./assets/qris.jpg", {
        caption:
`💳 *Pembayaran QRIS*

Produk : ${product}
Harga : ${item.price}

⏳ Waktu pembayaran 10 menit

Setelah bayar kirim bukti transfer.`,
        parse_mode: "Markdown"
      });

      // TIMER 10 MENIT
      setTimeout(() => {

        if (global.userState[chatId] === "waiting_payment") {

          delete global.userState[chatId];
          delete global.orderDB[chatId];

          bot.sendMessage(chatId,"❌ Waktu pembayaran habis.");

        }

      }, 600000);

    }

    bot.answerCallbackQuery(q.id);

  });

}

module.exports = { ...features, register };
