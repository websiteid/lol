module.exports = {

execute: async (bot,msg) => {

const chatId = msg.chat.id

bot.sendMessage(chatId,
`🛒 *Daftar Produk*

Silahkan pilih produk`,
{
parse_mode:"Markdown",
reply_markup:{
inline_keyboard:[

[{text:"🔥 VIP Access - 10K",callback_data:"buy_vip"}],
[{text:"⚡ Panel Script - 15K",callback_data:"buy_panel"}],
[{text:"🤖 Script Bot - 25K",callback_data:"buy_script"}]

]
}
})

}

}
