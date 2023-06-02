const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "clear",
    description: "Permet de supprimer des messages",
    options: [
        {
            name: "nombre",
            description: "Nombre de message ?",
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageMessages"))) return interaction.reply({content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true})
        if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("ManageMessages"))) return interaction.reply({content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true})

        try {
            const amount = interaction.options.getNumber('number');
            const phrase = interaction.options.getString('phrase');

            if (isNaN(amount)) return interaction.reply({ content: `Veuillez mettre une quantité valide pour supprimer les messages`, ephemeral: true });

            if (!phrase) {
                interaction.channel.bulkDelete(amount, { filterOld: true }).then(async (messages) => {
                    await interaction.reply(`J'ai supprimer \`${messages.size}/${amount}\` messages`);
                    setTimeout(async () => {
                        await interaction.deleteReply();
                    }, 2000);
                })
            } else {
                interaction.channel.bulkDelete(
                    (await interaction.channel.messages.fetch({ limit: amount })).filter(filteredMsg => filteredMsg.content.toLowerCase() === phrase.toLowerCase()), { filterOld: true }
                ).then(async (messages) => {
                    await interaction.reply(`J'ai supprimer \`${messages.size}/${amount}\` messages`);
                    setTimeout(async () => {
                        await interaction.deleteReply();
                    }, 2000);
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
}