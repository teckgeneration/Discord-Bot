const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder, ChannelType } = require("discord.js")
const config = require("../../config")

module.exports = {
  name: "unlock",
  description: "Permet de déverouiller un salon",
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true})
    if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true})

    interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
        'SendMessages' : true,
        'AddReactions': true,
        'SendTTSMessages': true,
        'AttachFiles': true, 
        'CreatePublicThreads': true,
        'CreatePrivateThreads': true,
        'SendMessagesInThreads': true,
    })
    
    interaction.reply({content: `J'ai bien déverouiller le salon`})

  }
}