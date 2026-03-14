module.exports = {

command: "start",

execute: async (bot,msg) => {

const chatId = msg.chat.id
const name = msg.from.first_name

bot.sendMessage(chatId,
`✨ Halo ${name}

Selamat datang di *Shop Bot*

Silahkan pilih menu`,
{
parse_mode:"Markdown",
reply_markup:{
inline_keyboard:[

[{text:"🛒 Lihat Produk",callback_data:"menu_produk"}],
[{text:"📦 Cara Order",callback_data:"menu_help"}]

]
}
})

}

}
