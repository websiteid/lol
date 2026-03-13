const config = require('../config');

module.exports = {
  command: 'kirimpap',
  description: 'Kirim foto untuk di-rate',
  execute: (bot, msg) => {
    bot.sendMessage(msg.chat.id, '📸 Silakan kirim foto PAP kamu:');

    bot.once('photo', (msg) => {
      const photoId = msg.photo[msg.photo.length - 1].file_id;
      
      // Kirim ke Channel
      bot.sendPhoto(config.CHANNEL_ID, photoId, { caption: '📸 PAP Baru dari user' });
      
      // Kirim ke Admin
      bot.sendPhoto(config.ADMIN_ID, photoId, { caption: `Log PAP dari ${msg.from.id}` });
      
      bot.sendMessage(msg.chat.id, '✅ PAP berhasil dikirim!');
    });
  }
};
