const {ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder, ChannelType } = require("discord.js")
const {QuickDB} = require("quick.db");
const db = new QuickDB()
const config = require("../../config")

module.exports = {
    name: "disable-logs",
    description: "Permet de désactiver les logs",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true})
        if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true})

        try {
            const channel = await db.get(`log_bot_${interaction.guild.id}`);
            if (channel) {
                await db.delete(`log_bot_${interaction.guild.id}`);
                interaction.reply({content: `Les logs viennent d'être désactivés`});
            } else { 
                return interaction.reply({content: `Ce serveur n'a pas de salon enregistré`, ephemeral: true}); 
            };
           } catch (error) {
            console.log("Une erreur est survenue", error)
           } 

    }}