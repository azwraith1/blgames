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
var rbwar;
(function (rbwar) {
    var RBWRecordRenderer = (function (_super) {
        __extends(RBWRecordRenderer, _super);
        function RBWRecordRenderer(data) {
            var _this = _super.call(this) || this;
            _this.value = data;
            _this.skinName = new RBWJiLuBarSkin();
            return _this;
        }
        RBWRecordRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.pjbh.text = this.value.roundId;
            this.roomtype.text = this.choseField(this.value.sceneId);
            if (this.value.gainGold > 0) {
                this.w2f.textColor = 0xfed100;
                this.w2f.text = "+" + this.value.gainGold;
            }
            else {
                this.w2f.textColor = 0x28c676;
                this.w2f.text = this.value.gainGold;
            }
            this.time.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", this.value.gameTime);
            ;
        };
        RBWRecordRenderer.prototype.choseField = function (value) {
            switch (value) {
                case 1001:
                    return "初级场";
                case 1002:
                    return "中级场";
                case 1003:
                    return "高级场";
            }
        };
        return RBWRecordRenderer;
    }(game.BaseUI));
    rbwar.RBWRecordRenderer = RBWRecordRenderer;
    __reflect(RBWRecordRenderer.prototype, "rbwar.RBWRecordRenderer");
})(rbwar || (rbwar = {}));
