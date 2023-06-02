const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB()
const config = require("../../config")

module.exports = {
  name: "ticket-staff",
  description: "Permet de configurer le rôle pour les accès tickets",
  options: [
    {
      name: "role1",
      description: "Quel est le 1er rôle ?",
      required: true,
      type: ApplicationCommandOptionType.Role,
    },
    {
      name: "role2",
      description: "Quel est le 2éme rôle ?",
      required: true,
      type: ApplicationCommandOptionType.Role,
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

    const Admin = interaction.options.getRole("role1")
    const Moder = interaction.options.getRole("role2")


    if (!Admin || !Moder) {
      return interaction.reply({ content: `Veuillez mentionner un rôle`, ephemeral: true })
    }

    await db.set(`Staff_${interaction.guild.id}.Admin`, Admin.id)
    await db.set(`Staff_${interaction.guild.id}.Moder`, Moder.id)
    interaction.reply({ content: `Le rôle ${Admin.id} et le rôle ${Moder.id} est sauvegarder` })


  }
}