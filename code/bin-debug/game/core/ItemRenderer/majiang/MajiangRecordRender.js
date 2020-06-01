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
var MajiangRecordRender = (function (_super) {
    __extends(MajiangRecordRender, _super);
    function MajiangRecordRender(data) {
        var _this = _super.call(this) || this;
        _this.values = data;
        _this.skinName = "MajiangRecordRenderSkin";
        return _this;
    }
    MajiangRecordRender.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var num = this.values;
        this.roomIdLabel.text = num["roomId"];
        this.roomNameLabel.text = this.choseField(num["sceneId"]);
        if (num["gainGold"] >= 0) {
            this.goldLabel.text = "+" + NumberFormat.formatGold(num["gainGold"]);
            this.goldLabel.textColor = 0Xe21d1d;
        }
        else {
            this.goldLabel.text = NumberFormat.formatGold(num["gainGold"]);
            this.goldLabel.textColor = 0X0A850D;
        }
        this.timeLabel.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
    };
    MajiangRecordRender.prototype.choseField = function (value) {
        var val = Number(value);
        switch (val) {
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
    return MajiangRecordRender;
}(eui.Component));
__reflect(MajiangRecordRender.prototype, "MajiangRecordRender");
