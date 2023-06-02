const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../../config");
const pet = require('pet-pet-gif');

module.exports = {
    name: "poll",
    description: "Permet de créer un sondage oui/non !",
    options: [
        {
            name: "content",
            description: "Quel est le contenue ?",
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
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        try {
            const args = interaction.options.getString("content")

            const pollEmbed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`**Question:** ${args}`)
            .setTimestamp()
            .setFooter({text: `Créer par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic :true})}`});
            
            interaction.reply({content: `J'ai envoyer votre poll`, ephemeral: true}).then(() => {
                interaction.channel.send({embeds: [pollEmbed]}).then(test => {
                    test.react('❌').then(() => test.react('✅'));
            });
            })
        } catch(error) {
            interaction.reply({content: `Une erreur inconnu viens de ce produire sur l'api !`, ephemeral: true})
        }
    }
}