module.exports = {

execute: async (bot,msg) => {

const chatId = msg.chat.id

bot.sendMessage(chatId,
`📦 Cara Order

1 Pilih produk
2 Scan QRIS
3 Kirim bukti transfer
4 Admin verifikasi
5 Produk dikirim otomatis`)

}

}
