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
var BDZSettlePanel = (function (_super) {
    __extends(BDZSettlePanel, _super);
    function BDZSettlePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = new BDZSettlePanelSkin();
        return _this;
    }
    BDZSettlePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    BDZSettlePanel.prototype.showRoundLiushui = function (liushui) {
        var roomInfo = Global.roomProxy.roomInfo;
        var players = roomInfo.players;
        for (var key in liushui) {
            var item = liushui[key];
            var settleItem = new BDZSettleItem();
            var roundPattern = 16 - item.roundPattern;
            settleItem.showText(players[key].nickname, this.getPatternStr(roundPattern), item.gainGold, item.gainGold > 0, Global.roomProxy.checkIndexIsMe(key));
            this.itemGroup.addChild(settleItem);
        }
        egret.Tween.get(this).to({
            left: 0
        }, 400, egret.Ease.sineIn);
    };
    BDZSettlePanel.prototype.getPatternStr = function (round) {
        switch (round) {
            case 1: return "골프";
            case 2: return "세컨드";
            case 3: return "써드";
            case 4: return "5탑";
            case 5: return "6탑";
            case 6: return "7탑";
            case 7: return "8탑";
            case 8: return "9탑";
            case 9: return "10탑";
            case 10: return "J탑";
            case 11: return "Q탑";
            case 12: return "K탑";
            case 13: return "베이스";
            case 14: return "투베이스";
            case 15: return "탑";
        }
    };
    return BDZSettlePanel;
}(eui.Component));
__reflect(BDZSettlePanel.prototype, "BDZSettlePanel");
