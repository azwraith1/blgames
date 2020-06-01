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
var niuniu;
(function (niuniu) {
    var NiuniuRecordRenderer = (function (_super) {
        __extends(NiuniuRecordRenderer, _super);
        function NiuniuRecordRenderer(data, id) {
            var _this = _super.call(this) || this;
            _this.values = data;
            _this.ids = id;
            _this.skinName = new NiunisRecordRendererSkin();
            return _this;
        }
        NiuniuRecordRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var num = this.values;
            this.roomId.text = num["roomId"];
            this.roomType.text = this.choseField(num["sceneId"], this.ids);
            if (num["gainGold"] >= 0) {
                this.roomMoney.text = "+" + num["gainGold"];
                this.roomMoney.textColor = 0xff6b12;
            }
            else {
                this.roomMoney.text = num["gainGold"];
                this.roomMoney.textColor = 0x77df5f;
            }
            this.roomTime.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", num.gameTime);
        };
        NiuniuRecordRenderer.prototype.choseField = function (value, id) {
            if (id == Global.gameProxy.gameIds["sangong"]) {
                switch (value) {
                    case 1001:
                        return "新手场";
                    case 1002:
                        return "初级场";
                    case 1003:
                        return "中级场";
                    case 1004:
                        return "高级场";
                    case 1005:
                        return "王者场";
                }
            }
            else {
                switch (value) {
                    case 1001:
                        return "新手场";
                    case 1002:
                        return "初级场";
                    case 1003:
                        return "中级场";
                    case 1004:
                        return "高级场";
                    case 1005:
                        return "至尊场";
                    case 1006:
                        return "王者场";
                }
            }
        };
        return NiuniuRecordRenderer;
    }(game.BaseUI));
    niuniu.NiuniuRecordRenderer = NiuniuRecordRenderer;
    __reflect(NiuniuRecordRenderer.prototype, "niuniu.NiuniuRecordRenderer");
})(niuniu || (niuniu = {}));
