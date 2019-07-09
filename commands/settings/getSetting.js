const CONFIG = require("../../modules/config");
const outdent = require("outdent");
const settingsInterface = require("../../settings/settingsInterface");

module.exports = {
    handler: async function (messageEventData) {
        let settingName = messageEventData.msg.content.split(" ")[1];

        if (!settingName) {
            try {
                await module.exports.responses.fail.noSettingName(messageEventData);
                return 1;
            } catch (e) {
                throw ("Failed to send msg: " + e);
            }
        }

        if (!settingsInterface.getSettingTemplate(settingName)) {
            try {
                await module.exports.responses.fail.invalidSetting(messageEventData, settingName);
                return 3;
            } catch (e) {
                throw ("Failed to send msg: " + e);
            }
        }

        let settingValue;
        try {
            settingValue = await settingsInterface.get(messageEventData.msg.guild.id, settingName);
        } catch (e) {
            throw ("Failed to get setting from the settingsInterface: " + e);
        }

        console.log(settingValue);
        
        try {
            await module.exports.responses.success.done(messageEventData, settingName, settingValue);
            return 0;
        } catch (e) {
            throw ("Failed to send msg: " + e);
        }
    },

    responses: {
        success: {
            done: async function (messageEventData, settingName, settingValue) {
                try {
                    await messageEventData.msg.channel.send({
                        "embed": {
                            "title": "Settings | Get",
                            "color": CONFIG.EMBED.COLORS.SUCCESS,
                            "description": `
                                Setting \`${settingName}\` has value \`${settingValue}\`.
                            `,
                            "footer": CONFIG.EMBED.FOOTER(messageEventData)
                        }
                    });
                    return 0;
                } catch (e) {
                    throw ("Failed to send a success message: " + e);
                }
            },
        },

        fail: {
            invalidSetting: async function (messageEventData, settingName) {
                try {
                    await messageEventData.msg.channel.send({
                        "embed": {
                            "title": "Settings | Get",
                            "color": CONFIG.EMBED.COLORS.FAIL,
                            "description": `
                                Setting \`${settingName}\` does not exist.
                            `,
                            "footer": CONFIG.EMBED.FOOTER(messageEventData)
                        }
                    });
                    return 0;
                } catch (e) {
                    throw ("Failed to send a fail message: " + e);
                }
            },
            noSettingName: async function (messageEventData) {
                try {
                    await messageEventData.msg.channel.send({
                        "embed": {
                            "title": "Settings | Get",
                            "color": CONFIG.EMBED.COLORS.FAIL,
                            "description": `
                                No setting name was given.
                            `,
                            "footer": CONFIG.EMBED.FOOTER(messageEventData)
                        }
                    });
                    return 0;
                } catch (e) {
                    throw ("Failed to send a fail message: " + e);
                }
            }
        }
    }
};