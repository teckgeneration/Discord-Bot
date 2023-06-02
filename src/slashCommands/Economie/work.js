const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const ms = require("../../events/Client/parseMs");
const config = require("../../config")
const data = require("../../structures/metier_list.json");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "work",
    description: "Vous permet de travailler",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

            const author = await db.get(`work_${interaction.guild.id}_${interaction.user.id}`);
            const timeout = 600000;
        
            if (author !== null && timeout - (Date.now() - author) > 0) {
                const time = ms(timeout - (Date.now() - author));
                const timeEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`🚫 **|** Avez-vous travaillé récemment ? Essayez à nouveau dans **${time.minutes}m ${time.seconds}s**`);
        
                interaction.reply({ embeds: [timeEmbed] });
            } else {
                const result = Math.floor((Math.random() * data.length));
                const amount = Math.floor(Math.random() * 5000) + 1;
        
                const embedInfo = new EmbedBuilder()
                    .setTitle("💵 **|** Travail")
                    .setColor("Green")
                    .setDescription(`${interaction.user.username} a travaillé comme **${data[result]}** et a gagné: \n\n💵 Argent: **$ ${amount}**`)
                    .setFooter({ text: "Quel travailleur, je suis fier de toi. !" })
                    .setTimestamp();
        
                await db.add(`money_${interaction.guild.id}_${interaction.user.id}`, amount);
                await db.set(`work_${interaction.guild.id}_${interaction.user.id}`, Date.now());
        
                interaction.reply({ embeds: [embedInfo] });
            }
    }
}