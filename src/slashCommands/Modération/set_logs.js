const {ApplicationCommandOptionType,PermissionsBitField, EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder, ChannelType } = require("discord.js")
const {QuickDB} = require("quick.db");
const db = new QuickDB()
const config = require("../../config")

module.exports = {
    name: "set-logs",
    description: "Allows you to configure the log room",
    options: [
        {
          name: "channel",
          description: "What is the lounge of the logs ?",
          required: true,
          type: ApplicationCommandOptionType.Channel,
        },
      ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `I am missing permissions to perform this command.`, ephemeral: true})
        if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `You are missing permissions to perform this command.`, ephemeral: true})


        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            let b = await db.get(`log_bot_${interaction.guild.id}`);
            let channelName = interaction.guild.channels.cache.get(b);
            if (interaction.guild.channels.cache.has(b)) {
              return interaction.reply({content: `The log lounge has been defined on ${channelName.name} `});
            } else return interaction.reply({content: `Please enter a valid salon`, ephemeral: true});
          }
          
          if (!channel || channel.type !== ChannelType.GuildText) return interaction.reply({content: `Please put a text room`, ephemeral: true});
        try {
            let a = await db.get(`log_bot_${interaction.guild.id}`);
        
            if (a === channel.id) {
              return interaction.reply({content: `This room is already defined on the server`, ephemeral: true});
            } else {
              await db.set(`log_bot_${interaction.guild.id}`, channel.id);
        
              interaction.reply({content: `The log lounge has been defined on ${channel.name} `});
            }
            return;
          } catch (e) {
                 console.log("An error has occurred", e)
          }}

    }