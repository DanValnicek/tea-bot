
console.log("[MODULE:CONFIG] WORKING Init config.".working);

const handleDataCheck = require("../checks/handleData").check;

const BUILD = "19.4a";
const BUILD_STRING = `${BUILD} InDev - not ready for deployment`;
const COMMAND_PREFIXES = ["!", "tea!"];
const COLORS = {
    FAIL:       16720418,
    WARN:       14540032,
    INFO:       1616639,
    DEFAULT:    this.INFO,
    PROGRESS:   13041919,
    SUCCESS:    4521796,
    STICKY:     65491
};
const FOOTER = (handleData)=>{
    if (handleDataCheck(handleData)) {
        console.log("[HANDLER:COMMAND] ERR handleData check failed. Returning false.");
        return {
            text: `Failed to get footer. Reason: handleData check failed.`
        };
    }
    return {
        //"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
        "text": `Build ${BUILD_STRING} | by FajsiEx | Caller: ${handleData.msg.author.tag}`
    };
};
const BOT_LOGO_ASCII = `
                                 .,***********,.                                  
                       ******************************/***//*                      
                  *****************************************/*///,                 
               ***************************************    **/////                 
            *****************************************      *////*                 
          *******************************************      ***///                 
        .************************,        ***********      ******                 
       ********************          .***************      ******                 
      ****************            *******************      ******                 
      ************            ***********************      ******                 
     **********            **************************      ******                 
     *******           ,*****************************      ******                 
    .*****          .********************     *******      ******                 
    ,***          ***********************      ******      ******                 
    .*         ,*************************      ******       .**                   
             ****************************      ******                             
           *******************    *******        **                               
         **********  ,*******      ******                                         
       **********      ******      ******                                         
      ***********      ******      ******                                         
    ,************      ******      ******                                         
   ******* ******      ******      ******                                         
  ******.  ******      ******      ******                                         
 ******    ******      ******      ******                                         
.*****     ******       ****       ******                                         
   ,,      ******                  ******                                         
           ******                  ******                                         
           ******                   ***,                                          
             ,*                              
`;

// Shove everything into an object
module.exports = {
    BOT: {
        BUILD_INFO: {
            BUILD: BUILD,
            BUILD_STRING: BUILD_STRING
        }
    },

    DISCORD: {
        PREFIXES: COMMAND_PREFIXES
    },

    EMBED: {
        COLORS: COLORS,
        FOOTER: FOOTER
    },    

    SECRETS: {
        DISCORD: {
            TOKEN: process.env.T_DT
        },
        DATABASE: {
            URI: process.env.T_DURI
        }
    },

    AESTHETICS: {
        BOT_LOGO_ASCII: BOT_LOGO_ASCII
    }
};

console.log("[MODULE:CONFIG] DONE Init config".success);