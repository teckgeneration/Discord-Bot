const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const config = require("../../config");
const moment = require("moment");
moment.locale('fr');

module.exports = {
    name: "user-info",
    description: "Permet de voir les informations d'un utilisateur",
    options: [
        {
          name: "user",
          description: "Quel est l'utilisateur ?",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })
        
        const membre = interaction.options.getMember('user');

        let checkbot = " "; if (membre.user.bot) checkbot = "✅"; else checkbot = "❌"; 


        const Response = new EmbedBuilder()
        .setTitle(`User information \`${membre.user.tag}\``)
        .setThumbnail(membre.user.displayAvatarURL({dynamic: true}))
        .setColor("Blurple")
        .setDescription(`
        __**User Informations**__

        > **Nom** : \`${membre.user.tag}\` ${membre.user.toString()}
        > **Tag** : \`${membre.user.tag}\`
        > **ID:** : \`${membre.user.id}\`
        > **Bot** :  \`${checkbot}\`
        __**Membre Informations**__

        > **Créer le** : <t:${parseInt(membre.user.createdTimestamp / 1000)}:R>
        > **A rejoint le** : <t:${parseInt(membre.joinedAt / 1000)}:R>`)
       interaction.reply({embeds: [Response]});
    }
}