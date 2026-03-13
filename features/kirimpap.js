const config = require('../config');

// Gunakan database (MongoDB/Firestore/Google Sheets) untuk penyimpanan permanen!
global.papDatabase = global.papDatabase || {}; 

module.exports = {
  command: 'kirimpap',
  description: 'Kirim PAP untuk di-rate',
  execute: (bot, msg) => {
    bot.sendMessage(msg.chat.id, '📸 Kirim foto/video PAP kamu:');

    bot.once('message', (pesan) => {
      const media = pesan.photo ? pesan.photo[pesan.photo.length - 1].file_id : (pesan.video ? pesan.video.file_id : null);
      const type = pesan.photo ? 'photo' : (pesan.video ? 'video' : null);

      if (!media) return bot.sendMessage(msg.chat.id, '❌ Hanya foto atau video!');

      // Generate Token
      const token = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Simpan data
      global.papDatabase[token] = { media, type, sender: pesan.from.id, username: pesan.from.username };

      // Kirim ke Channel
      const text = `📸 **NEW PAP**\n\n` +
                   `Status: [Data Tersembunyi]\n` +
                   `Token: \`${token}\`\n\n` +
                   `Gunakan /ratepap di bot untuk melihat media asli.`;
      
      // Kirim pesan teks saja ke channel agar tidak bocor
      bot.sendMessage(config.CHANNEL_ID, text, { parse_mode: 'Markdown' });
      
      bot.sendMessage(msg.chat.id, `✅ PAP tersimpan! Token kamu: \`${token}\``, { parse_mode: 'Markdown' });
    });
  }
};
