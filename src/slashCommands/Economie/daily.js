const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require("../../events/Client/parseMs");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "daily",
    description: "Permet de récupérer votre récompense",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

            const user = interaction.user;
            const timeout = 86400000;
            const amount = Math.floor(Math.random() * 10000) + 1000;
        
            const daily = await db.get(`daily_${interaction.guild.id}_${user.id}`);
        
            if (daily !== null && timeout - (Date.now() - daily) > 0) {
                const time = ms(timeout - (Date.now() - daily));
        
                const timeEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`🚫 **|** Vous avez déjà reçu votre récompense quotidienne ! **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
        
                interaction.reply({ embeds: [timeEmbed] });
            } else {
                let moneyEmbed = new EmbedBuilder()
                    .setTitle("💵 **|** Récompense quotidienne")
                    .setColor("Green")
                    .setDescription(`Vous avez collecté votre récompense quotidienne ! 💵 Argent collecté : **\`$ ${amount}\`**`);
        
                await db.set(`daily_${interaction.guild.id}_${user.id}`, Date.now());
                await db.add(`money_${interaction.guild.id}_${user.id}`, amount);
        
                interaction.reply({ embeds: [moneyEmbed] });
            }
    }
}