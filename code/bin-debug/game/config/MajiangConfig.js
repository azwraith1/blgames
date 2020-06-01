var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MajiangConfig = (function () {
    function MajiangConfig() {
    }
    MajiangConfig.getSoundConfig = function () {
        if (MajiangConfig.MJ_SOUND_CONFIG) {
            return MajiangConfig.MJ_SOUND_CONFIG;
        }
        MajiangConfig.MJ_SOUND_CONFIG = RES.getRes("mj_sound_json");
        return MajiangConfig.MJ_SOUND_CONFIG;
    };
    MajiangConfig.Task = {
        "HU": 1,
        "GANG": 2,
        "PENG": 3,
        "CHI": 4,
        "TING": 5,
        "CUSTOM": 8,
        /* 虚拟任务 */
        "PASS": 11,
        "PLAY": 12,
    };
    MajiangConfig.MJXLCH = "mjxlch";
    MajiangConfig.MJXZDD = "mjxzdd";
    MajiangConfig.commonMessage = [
        {
            message: "你太牛了",
            id: 1
        },
        {
            message: "哈哈！手气真好",
            id: 2
        },
        {
            message: "快点出牌噢~",
            id: 3
        },
        {
            message: "今天真高兴",
            id: 4
        },
        {
            message: "你放炮，我不胡",
            id: 5
        },
        {
            message: "你家里是开银行的吧",
            id: 6
        },
        {
            message: "你的牌打得太好啦",
            id: 7
        },
        {
            message: "大家好，很高兴见到各位",
            id: 8
        },
        {
            message: "怎么又断线啦！",
            id: 9
        }
    ];
    MajiangConfig.msgType = {
        Word: 1,
        Expression: 2,
    };
    return MajiangConfig;
}());
__reflect(MajiangConfig.prototype, "MajiangConfig");
