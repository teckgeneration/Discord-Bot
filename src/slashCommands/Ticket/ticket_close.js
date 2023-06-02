const { Client, CommandInteraction, PermissionsBitField } = require("discord.js");
const config = require("../../config")
const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {
    name: "ticket-close",
    description: "Permet de fermé un ticket",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve('SendMessages'))) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

        interaction.channel.delete()
        await db.delete(`ticket_${interaction.guild.id}`, `${interaction.user.id}`)
        await db.delete(`ticket_channel_${interaction.guild.id}`)

        interaction.reply({ content: `Je viens de supprimer le ticket`, ephemeral: true })

    }
}