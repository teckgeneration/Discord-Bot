const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, italic } = require("discord.js");

module.exports = {
    name: "set-name",
    description: "Permet de changer le nom, la photo de profil du bot, ou les deux d'un coup",
    options: [
        {
            name: "nom",
            description: "Quel est le nom ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "photo",
            description: "Quel est l'url de la photo ?",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        try {
            const name = interaction.options.getString("nom");
            const photo = interaction.options.getString("photo");

            if (name) {
                await client.user.setUsername(`${name}`).then(async () => {
                    interaction.reply({ content: `J'ai bien changer le nom du bot en **${name}**` });
                });
            }

            if (photo) {
                await client.user.setAvatar(`${photo}`).then(async () => {
                    interaction.reply({ content: `J'ai bien changer le nom du bot en **${name}** avec la photo ${photo}` });
                });
            }

        } catch (error) {
            console.log(error)
        }

    }
}