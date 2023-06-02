const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "help",
    description: "Renvoie les commandes du bot",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })
        
        const embed = new EmbedBuilder()
        .setTitle(`Help ${client.user.username}`)
        .addFields({ name: '💸 Economic : ', value: ' \`daily\`, \`dep\`, \`leaderboard\`, \`monaie\`, \`pay\`, \`set-monaie\`, \`withdraw\`, \`work\` ' })
        .addFields({ name: '😂 Fun : ', value: ' \`8ball\`, \`beautiful\`, \`bingo\`, \`demineur\`, \`hug\`, \`kiss\`, \`love\`, \`meme\`, \`pcf\`, \`pet\`, \`pof\`, \`poll\`, \`slap\`, \`trash\`, \`triggered\`, \`wanted\`, wasted\`' })
        .addFields({ name: '🎉 Giveaway : ', value: ' \`giveaway-end\`, \`giveaway-pause\`, \`giveaway-reroll\`, \`giveaway-resume\`, \`giveaway-start\` ' })
        .addFields({ name: '📎 Information : ', value: '\`avatar\`, \`banner\`, \`bot-info\`, \`help\`, \`ping\`, \`server-info\`, \`user-info\` ' })
        .addFields({ name: '⚔️ Moderation : ', value: '\`addrole\`, \`ban-list\`, \`ban\`, \`clear\`, \`set-logs\`, \`disable-logs\`, \`emoji-add\`, \`kick\`, \`lock\`, \`mute\`, \`nuke\`, \`set-name\`, \`set-status\`, \`unban\`, \`unlock\`, \`unmute\` ' })
        .addFields({ name: '🎟️ Ticket : ', value: ' \`ticket-categorie\`, \`ticket-close\`, \`ticket-create\`, \`ticket-staff\`' })
        .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
        .setTimestamp()

        interaction.reply({embeds: [embed]})
    }
}