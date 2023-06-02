
const { Client, ApplicationCommandOptionType, ChannelType, PermissionsBitField, CommandInteraction } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB()
const config = require("../../config")

module.exports = {
    name: "ticket-categorie",
    description: "Permet de configurer les catégories des tickets",
    options: [
        {
            name: "category",
            description: "Quel est la catégorie ?",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

        const cat = interaction.options.getChannel("category")

        if (cat.type !== ChannelType.GuildCategory) return interaction.reply({ content: `Veuillez mentionner une catégory est non un salon textuel`, ephemeral: true });

        await db.set(`Channels_${interaction.guild.id}.Cat`, cat.id)
        interaction.reply({ content: `La catégory ${cat.id} a bien ajouter` })


    }
}