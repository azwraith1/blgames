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
var ceby;
(function (ceby) {
    var CEBYTipsPanel = (function (_super) {
        __extends(CEBYTipsPanel, _super);
        function CEBYTipsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "CEBYTipsSkin";
            return _this;
        }
        CEBYTipsPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initData();
        };
        CEBYTipsPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        CEBYTipsPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        CEBYTipsPanel.prototype.onTouchTap = function (e) {
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
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.CLOSE_CEBY_TIPS_PANEL);
                    break;
            }
        };
        CEBYTipsPanel.prototype.initData = function () {
            var data;
            data = Number(new Big(2500 * game.CEBYUtils.bet).mul(0.1));
            this.pay3_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(400 * game.CEBYUtils.bet).mul(0.1));
            this.pay3_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(50 * game.CEBYUtils.bet).mul(0.1));
            this.pay3_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(1500 * game.CEBYUtils.bet).mul(0.1));
            this.pay4_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(280 * game.CEBYUtils.bet).mul(0.1));
            this.pay4_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.CEBYUtils.bet).mul(0.1));
            this.pay4_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(1000 * game.CEBYUtils.bet).mul(0.1));
            this.pay5_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(200 * game.CEBYUtils.bet).mul(0.1));
            this.pay5_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.CEBYUtils.bet).mul(0.1));
            this.pay5_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(800 * game.CEBYUtils.bet).mul(0.1));
            this.pay6_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(150 * game.CEBYUtils.bet).mul(0.1));
            this.pay6_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.CEBYUtils.bet).mul(0.1));
            this.pay6_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(600 * game.CEBYUtils.bet).mul(0.1));
            this.pay7_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(120 * game.CEBYUtils.bet).mul(0.1));
            this.pay7_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.CEBYUtils.bet).mul(0.1));
            this.pay7_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(300 * game.CEBYUtils.bet).mul(0.1));
            this.pay8_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(80 * game.CEBYUtils.bet).mul(0.1));
            this.pay8_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.CEBYUtils.bet).mul(0.1));
            this.pay8_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(200 * game.CEBYUtils.bet).mul(0.1));
            this.pay9_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(60 * game.CEBYUtils.bet).mul(0.1));
            this.pay9_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.CEBYUtils.bet).mul(0.1));
            this.pay9_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(100 * game.CEBYUtils.bet).mul(0.1));
            this.pay10_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.CEBYUtils.bet).mul(0.1));
            this.pay10_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(10 * game.CEBYUtils.bet).mul(0.1));
            this.pay10_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(80 * game.CEBYUtils.bet).mul(0.1));
            this.pay11_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.CEBYUtils.bet).mul(0.1));
            this.pay11_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(10 * game.CEBYUtils.bet).mul(0.1));
            this.pay11_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(60 * game.CEBYUtils.bet).mul(0.1));
            this.pay12_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.CEBYUtils.bet).mul(0.1));
            this.pay12_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(8 * game.CEBYUtils.bet).mul(0.1));
            this.pay12_3.text = NumberFormat.handleFloatDecimal(data) + "";
        };
        return CEBYTipsPanel;
    }(game.BaseComponent));
    ceby.CEBYTipsPanel = CEBYTipsPanel;
    __reflect(CEBYTipsPanel.prototype, "ceby.CEBYTipsPanel");
})(ceby || (ceby = {}));
