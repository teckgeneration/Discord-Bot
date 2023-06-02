const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction } = require("discord.js")
const config = require("../../config")

module.exports = {
  name: "addrole",
  description: "Permet de donner un rôle à un utilisateur",
  options: [
    {
      name: "user",
      description: "Quel est l'utilisateur ?",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "role",
      description: "Quel est le rôle ?",
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
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageRoles"))) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
    if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("ManageRoles"))) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

    const rMember = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');

    if (!rMember) return interaction.reply({ content: `Tu doit entrée un utilisateur ! `, ephemeral: true });
    if (!role) return interaction.reply({ content: `Impossible de trouver ce rôle !`, ephemeral: true })

    if (interaction.guild.roles.highest.comparePositionTo(role) <= 0) return interaction.reply({ content: `Le rôle est actuellement supérieur à moi !!`, ephemeral: true })

    if (rMember.roles.cache.has(role.id)) return interaction.reply({ content: `L'utilisateur à déjà le rôle !!`, ephemeral: true })
    if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id).then(async () => {
      await interaction.reply({ content: `J'ai bien ajouter le rôle ${role} a ${rMember}` })
    }).catch(async () => {
      await interaction.reply({ content: `Je n'es pas pu ajouter le rôle ${role} à ${rMember}. Regarder l'emplacement des rôles si je suis bien au dessus des rôles et mes permissions si je suis administrateur !!`, ephemeral: true })
    });

  }
}