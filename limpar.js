module.exports = {
    name : 'limpar',
    aliases : ['purge'],
    run : async(client, message, args) => {
        if(!args[0]) return message.channel.send('Especifique um número de mensagens para excluir, desde 1 - 99')
        if(isNaN(args[0])) return message.channel.send('Números só são permitidos')
        if(parseInt(args[0]) > 99) return message.channel.send('A quantidade máxima de mensagens que posso excluir é 99')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send('Deletado ' + args[0]  + " de mensagens.")
    }
}