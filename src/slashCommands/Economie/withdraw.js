const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require("../../events/Client/parseMs");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "withdraw",
    description: "Permet de retirer de l'argent",
    options: [
          {
            name: "value",
            description: "Définir la valeur du retrait !",
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

            const args = interaction.options.getString("value")

            if (args.includes("all") == true) {
                let cart = await db.get(`bank_${interaction.guild.id}_${interaction.user.id}`);
                if (cart === null) cart == 0;
        
                await db.add(`money_${interaction.guild.id}_${interaction.user.id}`, cart);
                await db.set(`bank_${interaction.guild.id}_${interaction.user.id}`, 0);
        
                const embedWithdrawnAll = new EmbedBuilder()
                    .setTitle("🏦 **|** Dépôt")
                    .setColor("Green")
                    .setDescription(`💵 Vous avez tiré sur la **Banque** un montant de **$ ${cart}**!`);
        
                return interaction.reply({ embeds: [embedWithdrawnAll] });
            }
        
            let member = await db.get(`bank_${interaction.guild.id}_${interaction.user.id}`);
            if (member === null) member = 0;
        
            if (!args) return interaction.reply({
                content: "🚫 **|** Entrez le montant du retrait !"
            });
        
            if (member < args) return interaction.reply({
                content: "🚫 **|** Vous n'avez pas assez d'argent en banque pour effectuer le retrait. !"
            });
        
            if (args < 0) return interaction.reply({
                content: "🚫 **|** Vous devez saisir une valeur supérieure à **0** pour effectuer le retrait!"
            });
        
            if (isNaN(args)) return interaction.reply({
                content: "🚫 **|** Vous devez mettre une valeur numérique pour effectuer la suppression. !"
            });
        
            const embedInfo = new EmbedBuilder()
                .setTitle("🏦 **|** Retrait")
                .setColor("#008000")
                .setDescription(`💵 Vous avez tiré sur la **Banque** un montant de **$ ${args}**!`);
        
            await db.add(`money_${interaction.guild.id}_${interaction.user.id}`, args);
            await db.set(`bank_${interaction.guild.id}_${interaction.user.id}`, member - parseInt(args));
        
            interaction.reply({ embeds: [embedInfo] });
    }
}