const config = require('../config');
// Import papDatabase dari file/tempat yang sama (bisa pakai modul terpisah untuk data)

module.exports = {
  command: 'ratepap',
  description: 'Rate PAP pakai token',
  execute: (bot, msg) => {
    bot.sendMessage(msg.chat.id, '⭐ **Rate PAP**\n\nSilakan masukkan Token PAP yang ingin di-rate:');

    bot.once('message', (pesan) => {
      const token = pesan.text;
      const data = papDatabase[token]; // Cari di database

      if (!data) return bot.sendMessage(msg.chat.id, '❌ Token tidak ditemukan!');

      // Kirim medianya ke user yang ingin merate
      const caption = `Rate PAP ini:\n/rate1 /rate2 /rate3 /rate4 /rate5`;
      if (data.type === 'photo') bot.sendPhoto(msg.chat.id, data.media, { caption });
      else bot.sendVideo(msg.chat.id, data.media, { caption });
      
      // Simpan state bahwa user ini sedang merate token tertentu
    });
  }
};
