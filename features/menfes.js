const config = require('../config');

module.exports = {
  command: 'menfes',
  description: 'Kirim pesan anonim ke channel',
  execute: (bot, msg) => {
    bot.sendMessage(msg.chat.id, '💌 Masukkan pesan menfes kamu:');

    bot.once('message', (pesan) => {
      if (pesan.text) {
        // Kirim ke Channel
        bot.sendMessage(config.CHANNEL_ID, `💌 **Menfes Baru**\n\n${pesan.text}`, { parse_mode: 'Markdown' });
        
        // Kirim ke Admin sebagai log
        bot.sendMessage(config.ADMIN_ID, `📩 Log Menfes dari @${pesan.from.username || 'User'}:\n${pesan.text}`);
        
        bot.sendMessage(msg.chat.id, '✅ Pesan berhasil dikirim!');
      }
    });
  }
};
