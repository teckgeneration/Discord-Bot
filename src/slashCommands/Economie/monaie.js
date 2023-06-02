const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require("../../events/Client/parseMs");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "monaie",
    description: "Permet de voir votre portefeuille",
    options: [
        {
            name: "user",
            description: "Mentionner un utilisateur !",
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

            const user = interaction.options.getMember("user")

            let money = await db.get(`money_${interaction.guild.id}_${user.id}`);
            if (money === null) money = 0;
        
            let bank = await db.get(`bank_${interaction.guild.id}_${user.id}`);
            if (bank === null) bank = 0;
        
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle("💵 **|** Bilan monétaire")
                .setDescription(`**${user.user.username}**, consulter les informations sur votre portefeuille :` +
                    `\n\n💵 Money: **$ ${money}**` +
                    `\n🏦 Bank : **$ ${bank}**`)
                .setFooter({ text: "Informations sur votre portefeuille !" })
                .setTimestamp();
        
            interaction.reply({ embeds: [embed] });
    }
}