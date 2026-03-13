const config = require('../config');

module.exports = {
  command: 'menfes',
  description: 'Kirim pesan anonim atau publik ke channel',
  execute: (bot, msg) => {
    // 1. Kirim keyboard pilihan kepada user
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📢 Publik', callback_data: 'menfes_publik' }, { text: '🥷 Privat (Anonim)', callback_data: 'menfes_privat' }]
        ]
      }
    };
    bot.sendMessage(msg.chat.id, '💌 Pilih mode pengiriman pesanmu:', options);

    // 2. Listener untuk menangkap pilihan user
    bot.once('callback_query', (query) => {
      const isPublic = query.data === 'menfes_publik';
      const modeText = isPublic ? 'Publik' : 'Privat';
      
      bot.sendMessage(msg.chat.id, `✅ Mode ${modeText} dipilih. Silakan ketik pesanmu:`);

      // 3. Listener untuk menangkap pesan setelah mode dipilih
      bot.once('message', (pesan) => {
        if (pesan.text) {
          const userDisplay = isPublic ? `@${pesan.from.username || 'User'}` : 'Anonim';
          const label = isPublic ? '📢 Menfes Publik' : '🥷 Menfes Privat';
          
          // Kirim ke Channel
          bot.sendMessage(config.CHANNEL_ID, `${label}\n\n${pesan.text}\n\nDari: ${userDisplay}`, { parse_mode: 'Markdown' });
          
          // Kirim Log ke Admin (selalu menyertakan identitas asli)
          bot.sendMessage(config.ADMIN_ID, `📩 **Log Menfes (${modeText})**\nUser: @${pesan.from.username || 'User'} (${pesan.from.id})\nPesan: ${pesan.text}`);
          
          bot.sendMessage(msg.chat.id, '✅ Pesan berhasil dikirim ke channel!');
        }
      });
      
      bot.answerCallbackQuery(query.id);
    });
  }
};
