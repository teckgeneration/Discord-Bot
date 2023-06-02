const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "unban",
    description: "Permet de débannir un utilisateur",
    options: [
        {
          name: "userid",
          description: "Quel est l'utilisateur ?",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
      ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
            if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("BanMembers"))) return interaction.reply({content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true})
            if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("BanMembers"))) return interaction.reply({content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true})
    
            const user = interaction.options.getUser('userid');
            
    
            await interaction.guild.bans.remove(user).then(() => {
              return interaction.reply({content: `J'ai débanni ${user}`})
            }).catch(async () => {
              return interaction.reply({content: `Je n'es pas pu débannir ${user}`})
            });
    }
}