const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config");

module.exports = {
    name: "8ball",
    description: "Permet de répondre a une question",
    options: [
        {
            name: "question",
            description: "Quel est la question ?",
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

        const query = interaction.options.getString('question');

        let responses = ["Comme je le vois, oui.", "Redemandez plus tard.", "Il vaut mieux ne pas vous le dire maintenant.", "On ne peut pas le prédire maintenant.", "Concentrez-vous et redemandez.", "N'y comptez pas.", "C'est certain.", "C'est décidément le cas.", "Très probable.", "Je réponds non. ", "Mes sources disent non.", "Les perspectives ne sont pas très bonnes.", "Les perspectives sont bonnes.", "La réponse est floue, essayez à nouveau.", "Les signes indiquent que oui.", "Très douteux.", "Sans aucun doute.", "Oui.", "Oui - définitivement.", "Vous pouvez vous y fier."]

        let response = Math.floor(Math.random() * responses.length)

        if (query) {

            const embed = new EmbedBuilder()
                .setTitle(`Réponse à ${interaction.user.username}`)
                .addFields(
                    { name: 'Question', value: `${query}`, inline: true },
                    { name: 'Réponse', value: `${responses[response]}`, inline: true },
                )
                .setThumbnail(interaction.user.displayAvatarURL())
                .setTimestamp()

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: "Utilisation incorrect" });
        }
    }
}