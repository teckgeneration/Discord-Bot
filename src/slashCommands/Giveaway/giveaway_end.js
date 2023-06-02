const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require('ms')

module.exports = {
    name: "giveaway-end",
    description: "Permet de terminer le giveaway en cours",
    options: [
          {
            name: "message_id",
            description: "Quel est l'identifiant du message ?",
            required: true,
            type: ApplicationCommandOptionType.String,
          },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })
    
            const messageId = interaction.options.getString('message_id');


            client.giveawaysManager.end(messageId).then(() => {
                    interaction.reply({content: 'Succès ! Le concours a pris fin!'});
                })
                .catch((err) => {
                    interaction.reply({content: ` Une erreur est survenue.\n\`${err}\` `});
                });
    }
}