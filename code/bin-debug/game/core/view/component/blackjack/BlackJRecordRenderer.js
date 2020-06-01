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
var BlackJRecordRenderer = (function (_super) {
    __extends(BlackJRecordRenderer, _super);
    function BlackJRecordRenderer(data, id) {
        var _this = _super.call(this) || this;
        _this.values = data;
        _this.ids = id;
        _this.skinName = new BlackJRecordRendererSkin();
        return _this;
    }
    BlackJRecordRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var num = this.values;
        this.roomId.text = num["roomId"];
        this.roomType.text = this.choseField(num["sceneId"], this.ids);
        if (num["gainGold"] >= 0) {
            this.roomMoney.text = "+" + num["gainGold"];
            this.roomMoney.textColor = 0xecb818;
        }
        else {
            this.roomMoney.text = num["gainGold"];
            this.roomMoney.textColor = 0x18ec40;
        }
        this.roomTime.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
    };
    BlackJRecordRenderer.prototype.choseField = function (value, id) {
        if (id == 10024 || id == 10025) {
            switch (value) {
                case 1001:
                    return CF.tigc(125);
                case 1002:
                    return CF.tigc(126);
                case 1003:
                    return CF.tigc(127);
                case 1004:
                    return CF.tigc(128);
                case 1005:
                    return CF.tigc(145);
                case 1006:
                    return CF.tigc(146);
            }
        }
        else {
            switch (value) {
                case 1001:
                    return CF.tigc(151);
                case 1002:
                    return CF.tigc(152);
                case 1003:
                    return CF.tigc(149);
                case 1004:
                    return CF.tigc(150);
                case 1005:
                    return CF.tigc(145);
                case 1006:
                    return CF.tigc(146);
            }
        }
    };
    return BlackJRecordRenderer;
}(game.BaseUI));
__reflect(BlackJRecordRenderer.prototype, "BlackJRecordRenderer");
