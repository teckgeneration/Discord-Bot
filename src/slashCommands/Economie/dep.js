const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require("../../events/Client/parseMs");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "depo",
    description: "Permet de déposer de l'argent",
    options: [
        {
            name: "value",
            description: "Mettez la valeur du dépôt !",
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

            const args = interaction.options.getString("value");

            let money = await db.get(`money_${interaction.guild.id}_${interaction.user.id}`);
            if (money === null) money = 0;
        
            if (args.includes("all") == true) {
                let cart = await db.get(`money_${interaction.guild.id}_${interaction.user.id}`);
                if (cart == null) cart = 0;
                
                await db.add(`bank_${interaction.guild.id}_${interaction.user.id}`, cart);
                await db.set(`money_${interaction.guild.id}_${interaction.user.id}`, 0);
        
                const embedDepAll = new EmbedBuilder()
                    .setTitle("🏦 **|** Dépôt")
                    .setColor("Green")
                    .setDescription(`💵 Vous avez déposé dans la **Banque** un montant de **$ ${cart}** !`);
        
                return interaction.reply({ embeds: [embedDepAll] });
            }
        
            let member = await db.get(`money_${interaction.guild.id}_${interaction.user.id}`);
            if (member == null) member = 0;
        
            if (!args) return interaction.reply({
                content: "🚫 **|** Mettez la valeur du dépôt !"
            });
        
            if (member < args) return interaction.reply({
                content: "🚫 **|** Vous n'avez pas assez d'argent pour effectuer le dépôt. !"
            });
        
            if (args < 0) return interaction.reply({
                content: "🚫 **|** Vous devez saisir une valeur supérieure à **0** pour effectuer un dépôt. !"
            });
        
            if (isNaN(args) || args <= 0) return interaction.reply({
                content: "🚫 **|** Vous devez saisir une valeur numérique pour effectuer le dépôt. !"
            });
        
            const embedInfo = new EmbedBuilder()
                .setTitle("🏦 **|** Deposit")
                .setColor("#008000")
                .setDescription(`💵 Vous avez déposé dans la **Banque** un montant de **$ ${args}**!`);
        
            await db.add(`bank_${interaction.guild.id}_${interaction.user.id}`, args);
            await db.set(`money_${interaction.guild.id}_${interaction.user.id}`, money - parseInt(args));
            
            interaction.reply({ embeds: [embedInfo] });
    }
}