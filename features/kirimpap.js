const config = require('../config');

module.exports = {
  command: 'kirimpap',
  description: 'Kirim PAP untuk di-rate dengan pilihan Publik/Privat',
  execute: (bot, msg) => {
    // 1. Menu pilihan Publik/Privat
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📢 Publik', callback_data: 'pap_publik' }, { text: '🥷 Privat', callback_data: 'pap_privat' }]
        ]
      }
    };
    bot.sendMessage(msg.chat.id, '📸 **Kirim PAP**\n\nPilih mode pengiriman pesanmu:', options);

    // 2. Tangkap pilihan user
    bot.once('callback_query', (query) => {
      const mode = query.data === 'pap_publik' ? 'Publik' : 'Privat';
      bot.editMessageText(`✅ Mode ${mode} dipilih. Sekarang, kirim foto atau video PAP kamu:`, {
        chat_id: msg.chat.id,
        message_id: query.message.message_id
      });

      // 3. Tangkap media
      bot.once('message', (pesan) => {
        const media = pesan.photo ? pesan.photo[pesan.photo.length - 1].file_id : (pesan.video ? pesan.video.file_id : null);
        const type = pesan.photo ? 'photo' : (pesan.video ? 'video' : null);

        if (!media) return bot.sendMessage(msg.chat.id, '❌ Harus berupa foto atau video!');

        const token = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Simpan ke database (Gunakan database agar tidak hilang saat restart)
        global.papDatabase[token] = { 
          media, type, mode, 
          sender: pesan.from.username || 'Anonim' 
        };

        // 4. Kirim notifikasi ke Channel (TANPA MEDIA ASLI)
        const channelMsg = `📸 **NEW PAP**\n\n` +
                           `Mode: ${mode}\n` +
                           `Token: \`${token}\`\n\n` +
                           `Kirim /ratepap di bot dan masukkan token di atas untuk melihat media!`;
        
        bot.sendMessage(config.CHANNEL_ID, channelMsg, { parse_mode: 'Markdown' });
        bot.sendMessage(msg.chat.id, `✅ PAP berhasil disimpan!\nToken kamu: \`${token}\``, { parse_mode: 'Markdown' });
      });
      
      bot.answerCallbackQuery(query.id);
    });
  }
};
