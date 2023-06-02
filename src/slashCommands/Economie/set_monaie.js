const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require("../../events/Client/parseMs");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "set-monaie",
    description: "Permet de voir votre portefeuille",
    options: [
        {
            name: "user",
            description: "Mentionner un utilisateur !",
            required: true,
            type: ApplicationCommandOptionType.User,
          },
          {
            name: "value",
            description: "Mettez la valeur du paiement !",
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

            const user = interaction.options.getMember("user")
            const args = interaction.options.getString("value")

            if (isNaN(args)) return interaction.reply({
                content: "🚫 **|** Vous devez entrer un numéro valide !"
            });
        
            await db.set(`money_${interaction.guild.id}_${user.id}`, args);
            const bal = await db.get(`money_${interaction.guild.id}_${user.id}`);
        
            const moneyEmbed = new EmbedBuilder()
                .setTitle("💵 **|** Modification monétaire")
                .setColor("Green")
                .setDescription(`Il a été ajouté **$ ${args}** à ${user}!\n\n💵 Argent courant : **$ ${bal}**`)
                .setFooter({ text: "L'argent a été ajouté !" });
        
            interaction.reply({ embeds: [moneyEmbed] });
    }
}