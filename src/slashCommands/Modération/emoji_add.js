const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder} = require("discord.js")
const config = require("../../config")
const { default: axios } = require('axios');

module.exports = {
    name: "emoji-add",
    description: "Permet d'ajouter un emojis",
    options: [
        {
          name: "emojis",
          description: "Quel est l'émojis ?",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
            name: "name",
            description: "Quel sera le nom de l'émojis ?",
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
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true})
        if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true})

            let  emoji = interaction.options.getString('emojis')?.trim();
            let name = interaction.options.getString('name');
    
            if(emoji.startsWith("<") && emoji.endsWith(">")) {

                const id = emoji.match(/\d{15,}/g)[0] 
                
                const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                .then(image => {
                    if(image) return "gif"
                    else return "png"
                }).catch(err => {
                    return "png"
                })
    
                emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
            }
    
            console.log(emoji)
            console.log(name)
            await interaction.guild.emojis.create({attachment: emoji, name: name})

            .then(emoji => {
                const embed = new EmbedBuilder()
                .setTitle("Emoji Ajouter ✅")
                .setDescription(`Nouveau Emojis ajouter [ ${emoji.toString()} ] avec le nom **\`[ ${emoji.name} ]\`**`)
                .setColor("Green")
    
                return interaction.reply({ embeds: [ embed ]})
            }).catch(err => {
                return interaction.reply({content: `${err}\nImpossible d'ajouter l'émojis.`})
            })
    }
}