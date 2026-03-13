module.exports = {
  command: 'menfes',
  description: 'Kirim pesan anonim',
  execute: (bot, msg) => {
    bot.sendMessage(msg.chat.id, '💌 **Mode Menfes**\n\nSilakan ketik pesan yang ingin kamu sampaikan. Pesan akan dikirim secara anonim.', { parse_mode: 'Markdown' });
  }
};
