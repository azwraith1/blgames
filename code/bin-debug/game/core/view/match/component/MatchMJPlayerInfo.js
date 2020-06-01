var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Author: MC Lee
 * @Date: 2019-11-28 18:42:33
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-16 20:08:28
 * @Description: 比赛场玩家
 */
var MatchMJPlayerInfo = (function (_super) {
    __extends(MatchMJPlayerInfo, _super);
    function MatchMJPlayerInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchMJPlayerInfoSkin();
        return _this;
    }
    MatchMJPlayerInfo.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var roomInfo = Global.gameProxy.roomInfo;
        var emojiData = roomInfo.emoji;
        if (!emojiData) {
            emojiData = { 1: { "gold": 10 }, 2: { "gold": 10 }, 3: { "gold": 10 }, 4: { "gold": 10 } };
        }
        for (var i = 1; i <= 4; i++) {
            var emojiItem = new MatchMJEmojiItem();
            emojiItem.initData(i, emojiData[i].gold);
            this.emojiGroup.addChild(emojiItem);
        }
    };
    MatchMJPlayerInfo.prototype.initPlayerInfo = function (playerData) {
        this.nameLabel.text = playerData.nickname + ("(" + playerData.loginIp + ")");
        this.scoreLabel.text = playerData.gold;
        var headerId = playerData['figureUrl'] || playerData.figure_url;
        var headerSex = playerData['sex'] || playerData.sex;
        this.headerImage.source = "hall_header_" + headerSex + "_" + headerId + "_png";
    };
    return MatchMJPlayerInfo;
}(game.BaseUI));
__reflect(MatchMJPlayerInfo.prototype, "MatchMJPlayerInfo");
