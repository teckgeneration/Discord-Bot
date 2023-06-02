const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require("../../events/Client/parseMs");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "pay",
    description: "Permet de payer un utilisateur",
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

            const member = await db.get(`money_${interaction.guild.id}_${interaction.user.id}`);
            
            const embedBase = new EmbedBuilder().setColor("Green");
        
          
            if (!args) return interaction.reply({
                embeds: [
                    embedBase.setDescription("🚫 **|** Entrez le montant du paiement !")
                ]
            });
        
            if (member < args) return interaction.reply({
                embeds: [
                    embedBase.setDescription("🚫 **|** Vous n'avez pas assez d'argent pour effectuer le paiement. !")
                ]
            });
        
            if (isNaN(args) || args <= 0) return interaction.reply({
                embeds: [
                    embedBase.setDescription("🚫 **|** Vous devez saisir une valeur numérique ou une valeur supérieure à **0** pour effectuer le paiement. !")
                ]
            });
        
            const embedInfo = new EmbedBuilder()
                .setTitle("💵 **|** Payement")
                .setColor("Green")
                .setDescription(`💵 Vous avez payé ${user} avec **$ ${args}**!`);
        
            await db.add(`money_${interaction.guild.id}_${user.id}`, args);
            await db.set(`money_${interaction.guild.id}_${interaction.user.id}`, member - parseInt(args));
            
            interaction.reply({ embeds: [embedInfo] });
    }
}