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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaRecordBar = (function (_super) {
        __extends(ZajinhuaRecordBar, _super);
        function ZajinhuaRecordBar(data) {
            var _this = _super.call(this) || this;
            _this.value = data;
            _this.skinName = new ZajinhuaJiluBarSkin();
            return _this;
        }
        ZajinhuaRecordBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.pjbh.text = this.value.roomId;
            this.roomtype.text = this.choseField(this.value.sceneId);
            var gold = this.value.gainGold;
            if (this.value.gainGold > 0) {
                this.w2f.textColor = 0xfcf06f;
                this.w2f.text = "+" + gold.toFixed(2);
            }
            else {
                this.w2f.textColor = 0x9bffab;
                this.w2f.text = gold.toFixed(2);
            }
            this.time.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", this.value.gameTime);
        };
        ZajinhuaRecordBar.prototype.choseField = function (value) {
            switch (value) {
                case 1001:
                    return "初级场";
                case 1002:
                    return "中级场";
                case 1003:
                    return "高级场";
                case 1004:
                    return "王者场";
            }
        };
        return ZajinhuaRecordBar;
    }(game.BaseUI));
    zajinhua.ZajinhuaRecordBar = ZajinhuaRecordBar;
    __reflect(ZajinhuaRecordBar.prototype, "zajinhua.ZajinhuaRecordBar");
})(zajinhua || (zajinhua = {}));
