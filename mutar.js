const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'mutar',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Você não tem permissão para usar este comando')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send('Membro não encontrado.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'mutado')
        if(!role) {
            try {
                message.channel.send('A função silenciada não foi encontrada, tentando criar uma função silenciada.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'mutado',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('A função silenciada foi criada com sucesso.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'mutado')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} já foi silenciado.`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} agora está mudo.`)
    }
}