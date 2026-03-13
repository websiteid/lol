module.exports = {
  command: 'kirimpap',
  description: 'Mengirim media untuk di-rate',
  execute: (bot, msg) => {
    bot.sendMessage(msg.chat.id, '📤 **Kirim PAP**\n\nPilih mode pengiriman:\n1. Foto\n2. Video\n\nSilakan upload media yang ingin dikirim.', { parse_mode: 'Markdown' });
  }
};
