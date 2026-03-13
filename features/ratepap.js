module.exports = {
  command: 'ratepap',
  description: 'Melihat & Rate PAP pakai Token',
  execute: (bot, msg) => {
    bot.sendMessage(msg.chat.id, '⭐ Masukkan Token PAP untuk melihat & memberi rating:');

    bot.once('message', (pesan) => {
      const token = pesan.text;
      const data = global.papDatabase[token];

      if (!data) return bot.sendMessage(msg.chat.id, '❌ Token salah atau sudah kadaluarsa.');

      // Bot mengirim media asli secara privat ke user yang merate
      const caption = `Rate PAP ini:\n/rate1 /rate2 /rate3 /rate4 /rate5`;
      
      if (data.type === 'photo') {
        bot.sendPhoto(msg.chat.id, data.media, { caption });
      } else {
        bot.sendVideo(msg.chat.id, data.media, { caption });
      }
    });
  }
};
