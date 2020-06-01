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
// TypeScript file
var sdxl;
(function (sdxl) {
    var SDXLTipsPanel = (function (_super) {
        __extends(SDXLTipsPanel, _super);
        function SDXLTipsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new SDXLTipsSkin();
            _this.initData();
            return _this;
        }
        SDXLTipsPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        SDXLTipsPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        SDXLTipsPanel.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.right1:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.turnRight1();
                    break;
                case this.right2:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.turnRight2();
                    break;
                case this.left1:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.turnLeft1();
                    break;
                case this.left2:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    this.turnLeft2();
                    break;
                case this.closeBtn1:
                case this.closeBtn2:
                case this.closeBtn3:
                    SoundManager.getInstance().playEffect("sdxl_button_dntg_mp3");
                    CF.sN(PanelNotify.CLOSE_SDXL_TIPS);
                    break;
            }
        };
        SDXLTipsPanel.prototype.turnRight1 = function () {
            this.tipGroup1.visible = this.tipGroup3.visible = false;
            this.tipGroup2.visible = true;
        };
        SDXLTipsPanel.prototype.turnRight2 = function () {
            this.tipGroup1.visible = this.tipGroup2.visible = false;
            this.tipGroup3.visible = true;
        };
        SDXLTipsPanel.prototype.turnLeft1 = function () {
            this.tipGroup2.visible = this.tipGroup3.visible = false;
            this.tipGroup1.visible = true;
        };
        SDXLTipsPanel.prototype.turnLeft2 = function () {
            this.tipGroup3.visible = this.tipGroup1.visible = false;
            this.tipGroup2.visible = true;
        };
        SDXLTipsPanel.prototype.initData = function () {
            var data;
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(2000));
            this.pay3_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(200));
            this.pay3_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(20));
            this.pay3_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(1500));
            this.pay4_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(150));
            this.pay4_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(15));
            this.pay4_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(750));
            this.pay5_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(125));
            this.pay5_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(12));
            this.pay5_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(500));
            this.pay6_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(100));
            this.pay6_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(10));
            this.pay6_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(200));
            this.pay7_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(30));
            this.pay7_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(8));
            this.pay7_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(200));
            this.pay8_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(30));
            this.pay8_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(8));
            this.pay8_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(150));
            this.pay9_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(20));
            this.pay9_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(5));
            this.pay9_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(150));
            this.pay10_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(20));
            this.pay10_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(5));
            this.pay10_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(100));
            this.pay11_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(15));
            this.pay11_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(2));
            this.pay11_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(100));
            this.pay12_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(15));
            this.pay12_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.SDXLUtils.mul * game.SDXLUtils.bet).mul(2));
            this.pay12_3.text = NumberFormat.handleFloatDecimal(data) + "";
        };
        return SDXLTipsPanel;
    }(game.BaseComponent));
    sdxl.SDXLTipsPanel = SDXLTipsPanel;
    __reflect(SDXLTipsPanel.prototype, "sdxl.SDXLTipsPanel");
})(sdxl || (sdxl = {}));
