const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../../config");
const { randomInt } = require("crypto");
var fs = require("fs");

module.exports = {
    name: "démineur",
    description: "Permet de jouer a la mine",
    options: [
        {
            name: "args",
            description: "Quel est la valeur ?",
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

        try {

            const args = interaction.options.getString("args")

            const rps = ['*', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            let userChoice;
            if (args.length) userChoice = args
            if (!rps.includes(userChoice)) return interaction.reply({ content: ' Merci d\'entrer soit `*`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` '})

            const symbol = {
                "*": "💥",
                "0": "⬛",
                "1": "1️⃣",
                "2": "2️⃣",
                "3": "3️⃣",
                "4": "4️⃣",
                "5": "5️⃣",
                "6": "6️⃣",
                "7": "7️⃣",
                "8": "8️⃣",
                "9": "9️⃣"
            }
            var dimX = 9;
            if (args != undefined) {
                dimX = parseInt(args);
            }
    
            var dimY = 9;
            if (args != undefined) {
                dimY = parseInt(args);
            }
    
            var nbBombes = Math.round(dimX * dimY / 10);
            /*if (args[2] != undefined) {
                nbBombes = parseInt(args[2]);
            }*/
    
            var board = new Array(dimX);
    
            for (var i = 0; i < board.length; i++) {
                board[i] = new Array(dimY);
            }
    
            if (nbBombes > (dimX * dimY)/2 || dimX*dimY > 100 || dimX < 2 || dimY <2) {
                message.reply("plateau non valide, il doit avoir moins de 100 cases et ne doit pas contenir plus de 50% de bombes")
            } else {
                for (let i = 0; i < dimX; i++) {
                    for (let j = 0; j < dimY; j++) {
                        board[i][j] = 0;
                    }
                }
    
                bombesPlacees = 0;
                while (bombesPlacees < nbBombes) {
                    rX = randomInt(0, dimX);
                    rY = randomInt(0, dimY);
                    if (rX > 0 && rY > 0) {
                        if (board[rX][rY] != "*") {
                            board[rX][rY] = "*";
                            bombesPlacees = bombesPlacees + 1;
                        }
                    }
                }
    
                for (let i = 0; i < dimX; i++) {
                    for (let j = 0; j < dimY; j++) {
                        if (board[i][j] != "*") {
                            num = 0;
                            if (i != 0 && j !=0 && board[i - 1][j - 1] == "*") {
                                num++;
                            }
                            if (i != 0 && board[i - 1][j] == "*") {
                                num++;
                            }
                            if (i != 0 && j !=dimY-1 && board[i - 1][j + 1] == "*" ) {
                                num++;
                            }
                            if (j !=0 && board[i][j - 1] == "*" ) {
                                num++;
                            }
                            if (j !=dimY-1 && board[i][j + 1] == "*") {
                                num++;
                            }
                            if (i != dimX-1 && j !=0 && board[i + 1][j - 1] == "*" ) {
                                num++;
                            }
                            if (i != dimX-1 && board[i + 1][j] == "*" ) {
                                num++;
                            }
                            if (i != dimX-1 && j !=dimY-1 && board[i + 1][j + 1] == "*") {
                                num++;
                            }
                            board[i][j] = num;
                        }
                    }
                }
    
                texte = "\n";
                for (let i = 0; i < dimX; i++) {
                    for (let j = 0; j < dimY; j++) {
                        if( i == 0 || j == 0){
                            texte = texte + symbol[board[i][j]] ;
                        } else {
                            texte = texte + "||" + symbol[board[i][j]] + "||";
                        }
                    }
                    texte = texte + "\n";
                }
                //console.log(board);
                interaction.reply({content: `${texte}`});
            }

        } catch(error) {
            interaction.reply({content: `Une erreur inconnu viens de ce produire ! ${error}`, ephemeral: true})
        }
    }
}