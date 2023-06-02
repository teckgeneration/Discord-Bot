const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder, ChannelType } = require("discord.js")
const config = require("../../config")
const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {
    name: "nuke",
    description: "Permet de recréer un salon",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true}).catch(() => { });
        if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({content: `**❌ Tu n'a pas les autorisations pour faire cette commande**`, ephemeral: true}).catch(() => { });


        try {
            channel = interaction.channel;
            
            channel.clone({ position: channel.rawPosition }).then(async ch => {
               const embed = new EmbedBuilder()
               .setColor("#f7f7f7")
               .setDescription(`Le salon a bien été recréer par ${interaction.user.username}`)
               .setImage("https://thumbs.gfycat.com/AlarmedTintedHartebeest-size_restricted.gif")
               .setTimestamp();
             ch.send({embeds: [embed]});

             let logs = interaction.guild.channels.cache.get(await db.get(`log_bot_${interaction.guild.id}`))
             if (!logs) return;
             if (logs) {
               const e = new EmbedBuilder()
                 .setTitle(`[NUKE]`)
                 .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }) || "https://cdn.discordapp.com/attachments/798945891678421044/951585273324650496/discord-logo-white.png")
                 .addFields([
                     { name: 'Channel :', value: ` ${ch} `},
                     { name: 'Modérateur :', value: `${interaction.user.tag} | \`${interaction.user.id}\` ` },
                 ])
                 .setColor("#f7f7f7")
                 .setTimestamp()
                 .setFooter({ text: `${client.user.username} © 2022`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
               logs.send({ embeds: [e] })
             }

           });
             await channel.delete().catch(() => { })
         } catch (error) {
             console.log("Une erreur est survenue sur la commande [NUKE]", error)
         }

    }
}