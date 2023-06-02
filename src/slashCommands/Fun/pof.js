const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    name: "pof",
    description: "Permet de jouer au pof !",
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
            var ball = [
                "Pile",
                "Face",
            ];
            var ansp = ball[Math.floor(Math.random() * ball.length)];

            var p_embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle('**• Pile ou face**')
                .addFields(
                    { name: 'La pièce', value: `${ansp}` },
                )
                .setTimestamp()
            return interaction.reply({ embeds: [p_embed] })
        } catch (error) {
            interaction.reply({ content: `Une erreur inconnu viens de ce produire sur l'api !`, ephemeral: true })
        }
    }
}