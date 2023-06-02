const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const config = require("../../config");
const moment = require("moment");
moment.locale('fr');

module.exports = {
    name: "server-info",
    description: "Permet de voir les informations du serveur",
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
                    .setLabel('Invite Moi')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),

                new ButtonBuilder()
                    .setLabel('Support Serveur')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://google.com`)
            )


        const embed = new EmbedBuilder()
            .setTitle(`Serveur information`)
            .setDescription(`
            **__Serveur information :__**

            > Nom : ${interaction.guild.name}
            > ID : ${interaction.guild.id}
            > Description : ${interaction.guild.description}
            > Owner : <@${interaction.guild.ownerId}>
            > Boost : ${interaction.guild.premiumSubscriptionCount}
            > Créer le : ${moment(interaction.guild.createdAt).format('LLL')}
            > Protection : ${interaction.guild.verificationLevel}
            
            **__Membre Information :__**

            > Bots : ${interaction.guild.members.cache.filter(m => m.user.bot).size}
            > Total Membres : ${interaction.guild.memberCount}

            **__Statistique Information :__**

            > Catégorie : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}
            > Stage :  ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size}
            > Vocal :  ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}
            > Textuel :  ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}
            > Rôles : ${interaction.guild.roles.cache.size}
            > Emojis : ${interaction.guild.emojis.cache.size}
            `)
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()

        interaction.reply({ embeds: [embed], components: [row] })
    }
}