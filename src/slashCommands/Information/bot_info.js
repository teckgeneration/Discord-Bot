const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const config = require("../../config");
const Discord = require("discord.js")

module.exports = {
    name: "bot-info",
    description: "Renvoie les informations du bot",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Invite Me ')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),

                new ButtonBuilder()
                    .setLabel('Support Server')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://google.com`)
            )


        const embed = new EmbedBuilder()
            .setTitle(`Bot information`)
            .setDescription(`
            **__Bot Information :__**

            > Developper : <@${config.ownerID}>
            > Name : ${client.user.username}
            > Tag : ${client.user.discriminator}
            > ID : ${client.user.id}
            > DataBase : Quick.db
            > Discord Version : V${Discord.version}
            > Node Version : ${process.version}
            > Uptime : ${Math.round(client.uptime / (1000 * 60 * 60)) + 'h ' + (Math.round(client.uptime / (1000 * 60)) % 60) + 'm ' + (Math.round(client.uptime / 1000) % 60) + 's '}
            
            **__Statistique Information :__**

            > Servers : ${client.guilds.cache.size}
            > Users : ${client.guilds.cache.reduce((a, g) => g.memberCount, 0)}
            > Channels :  ${client.guilds.cache.reduce((a, g) => g.channels.cache.size)}
            > Emojis : ${client.guilds.cache.reduce((a, g) => g.channels.cache.size)}
            `)
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()

        interaction.reply({ embeds: [embed], components: [row] })
    }
}