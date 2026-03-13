module.exports = {
  command: 'start',
  description: 'Menampilkan menu utama',
  execute: (bot, msg) => {
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '⭐ Rate PAP', callback_data: 'menu_ratepap' }],
          [{ text: '📤 Kirim PAP', callback_data: 'menu_kirimpap' }],
          [{ text: '💌 Menfes', callback_data: 'menu_menfes' }]
        ]
      }
    };
    bot.sendMessage(msg.chat.id, 'Selamat datang! Silakan pilih menu:', opts);
  }
};
