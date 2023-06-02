const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require('moment');
moment.locale('fr');

module.exports = {
    name: "avatar",
    description: "Permet de récupérer la photo de profil de quelqu'un",
    options: [
        {
            name: "user",
            description: "Quel est l'utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        const member = interaction.options.getMember("user");

        const embed = new EmbedBuilder()
        .setTitle(`${member.user.tag}`)
        .setColor("#F71D0A")
        .setImage(`${member.displayAvatarURL({ dynamic: true }) || "https://c.clc2l.com/c/thumbnail75webp/t/d/i/discord-4OXyS2.png"}`)
        .setTimestamp()

    await interaction.reply({ embeds: [embed]});
    }
}