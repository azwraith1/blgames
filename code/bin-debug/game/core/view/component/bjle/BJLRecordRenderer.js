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
var BJLRecordRenderer = (function (_super) {
    __extends(BJLRecordRenderer, _super);
    function BJLRecordRenderer(data, id) {
        var _this = _super.call(this) || this;
        _this.values = data;
        _this.ids = id;
        _this.skinName = new BJLRecordRendererSkin();
        return _this;
    }
    BJLRecordRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var num = this.values;
        this.roomId.text = num["roomId"];
        this.roomType.text = this.choseField(num["sceneId"], this.ids);
        if (num["gainGold"] >= 0) {
            this.roomMoney.text = "+" + num["gainGold"];
            this.roomMoney.textColor = 0xf8c768;
        }
        else {
            this.roomMoney.text = num["gainGold"];
            this.roomMoney.textColor = 0xa5f868;
        }
        this.roomTime.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
    };
    BJLRecordRenderer.prototype.choseField = function (value, id) {
        switch (value) {
            case 1001:
                return CF.tigc(147);
            case 1002:
                return CF.tigc(148);
            case 1003:
                return CF.tigc(149);
            case 1004:
                return CF.tigc(150);
        }
    };
    return BJLRecordRenderer;
}(game.BaseUI));
__reflect(BJLRecordRenderer.prototype, "BJLRecordRenderer");
