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
var majiang;
(function (majiang) {
    var HuTipsItem = (function (_super) {
        __extends(HuTipsItem, _super);
        function HuTipsItem(majiangData) {
            var _this = _super.call(this) || this;
            _this.majiangData = majiangData;
            _this.skinName = new majiang.HuTipsItemSkin();
            return _this;
        }
        HuTipsItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var value = this.majiangData.value || this.majiangData.card;
            this.pai.changeColor(value);
            var gameConfig = Global.gameProxy.lastGameConfig;
            if (gameConfig.gameId == "hzmj" || gameConfig.gameId == 10017) {
                this.laiziImage.source = "hzmj_tip_lai_png";
            }
            this.laiziImage.visible = Global.gameProxy.checkCardIsLaizi(value);
            if (this.majiangData.count != undefined) {
                this.syLabel.text = this.majiangData.count;
                if (this.majiangData.count < 1) {
                    this.pai.alpha = 0.5;
                }
            }
            else {
                this.syLabel.text = "未知";
            }
            if (this.majiangData.fan == undefined) {
                this.fanLabel.text = "未知";
            }
            else {
                // this.fanLabel.text = this.majiangData.fan;
                if (this.majiangData.fan == 0) {
                    this.fanLabel.text = "1";
                }
                else {
                    if (gameConfig.gameId == 10006 || gameConfig.gameId == "dzmj") {
                        this.fanLabel.text = this.majiangData.fan;
                    }
                    else if (gameConfig.gameId == 10015 || gameConfig.gameId == "gdmj") {
                        this.fanLabel.text = this.majiangData.fan;
                    }
                    else if (gameConfig.gameId == "hzmj" || gameConfig.gameId == 10017) {
                        this.fanLabel.text = this.majiangData.fan;
                    }
                    else if (gameConfig.gameId == 10018 || gameConfig.gameId == "hbmj") {
                        this.fanLabel.text = this.majiangData.fan;
                    }
                    else if (gameConfig.gameId == 10019 || gameConfig.gameId == "gyzjmj") {
                        this.fanLabel.text = this.majiangData.fan;
                    }
                    else if (gameConfig.gameId == 10020 || gameConfig.gameId == "ermj") {
                        this.fanLabel.text = this.majiangData.fan;
                    }
                    else {
                        this.fanLabel.text = Math.pow(2, this.majiangData.fan) + "";
                    }
                }
            }
        };
        return HuTipsItem;
    }(eui.Component));
    majiang.HuTipsItem = HuTipsItem;
    __reflect(HuTipsItem.prototype, "majiang.HuTipsItem");
})(majiang || (majiang = {}));
