const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require("../../events/Client/parseMs");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "leaderboard",
    description: "Permet de voir le classement du serveur",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

            const bank = await db.all();
            const bankList = bank.filter(data => data.id.startsWith(`money_${interaction.guild.id}`)).sort((a, b) => b.value - a.value);
                
            const bankCounter = bankList.length > 10 ?  10 : bankList.length;
        
            let content = "";
        
            for (let i = 0; i < bankCounter; i++) {
                const user = client.users.cache.get(bankList[i].id.split("_")[2]).tag;
        
                content += `${i + 1}º **\`${user || "Unknown user"}\`** - **$ ${bankList[i].value}**\n`;
            }
        
            const embedRank = new EmbedBuilder()
                .setTitle(`💵 **|** Rang monétaire - ${interaction.guild.name}`)
                .setDescription(content.length === 0 ? "Unknown user" : content)
                .setColor("Green")
                .setFooter({ text: "Rang monétaire du serveur !"})
                .setTimestamp();
        
            interaction.reply({ embeds: [embedRank] });
    }
}