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
var cbzz;
(function (cbzz) {
    var CBZZTipsPanel = (function (_super) {
        __extends(CBZZTipsPanel, _super);
        function CBZZTipsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "CBZZTipsSkin";
            return _this;
        }
        CBZZTipsPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initData();
        };
        CBZZTipsPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        CBZZTipsPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        CBZZTipsPanel.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.right1:
                    this.group1.visible = this.group3.visible = false;
                    this.group2.visible = true;
                    break;
                case this.right2:
                    this.group1.visible = this.group2.visible = false;
                    this.group3.visible = true;
                    break;
                case this.left1:
                    this.group2.visible = this.group3.visible = false;
                    this.group1.visible = true;
                    break;
                case this.left2:
                    this.group3.visible = this.group1.visible = false;
                    this.group2.visible = true;
                    break;
                case this.closeBtn3:
                case this.closeBtn1:
                case this.closeBtn2:
                    CF.sN(PanelNotify.CLOSE_CBZZ_TIPS_PANEL);
                    break;
            }
        };
        CBZZTipsPanel.prototype.initData = function () {
            var data;
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(2000));
            this.pay3_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(200));
            this.pay3_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(20));
            this.pay3_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(1500));
            this.pay4_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(150));
            this.pay4_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(15));
            this.pay4_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(750));
            this.pay5_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(125));
            this.pay5_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(12));
            this.pay5_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(500));
            this.pay6_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(100));
            this.pay6_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(10));
            this.pay6_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(200));
            this.pay7_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(30));
            this.pay7_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(8));
            this.pay7_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(200));
            this.pay8_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(30));
            this.pay8_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(8));
            this.pay8_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(150));
            this.pay9_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(20));
            this.pay9_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(5));
            this.pay9_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(150));
            this.pay10_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(20));
            this.pay10_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(5));
            this.pay10_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(100));
            this.pay11_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(15));
            this.pay11_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(2));
            this.pay11_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(100));
            this.pay12_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(15));
            this.pay12_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.CBZZUtils.mul * game.CBZZUtils.bet).mul(2));
            this.pay12_3.text = NumberFormat.handleFloatDecimal(data) + "";
        };
        return CBZZTipsPanel;
    }(game.BaseComponent));
    cbzz.CBZZTipsPanel = CBZZTipsPanel;
    __reflect(CBZZTipsPanel.prototype, "cbzz.CBZZTipsPanel");
})(cbzz || (cbzz = {}));
