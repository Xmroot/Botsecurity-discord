const { Message } = require('discord.js')

module.exports = {
    name : 'adicionarcargo',
    run : async(client, message, args) => {
        /**
         * @param {Message} message
         */
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Você não tem permissão.')
        const target = message.mentions.members.first()
        if(!target) return message.channel.send('Nenhum membro especificado')
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send('Nenhuma função especificada')
        await target.roles.add(role) 
        message.channel.send(`${target.user.username} conseguiu um papel`)
    }
}