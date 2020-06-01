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
/*
 * @Author: real MC Lee
 * @Date: 2019-05-30 15:34:41
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-11 17:19:33
 * @Description:
 */
var rdsg;
(function (rdsg) {
    var RDSGTips = (function (_super) {
        __extends(RDSGTips, _super);
        function RDSGTips() {
            var _this = _super.call(this) || this;
            _this.skinName = "RDSGTipsSkin";
            return _this;
        }
        RDSGTips.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initData();
        };
        RDSGTips.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        RDSGTips.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        RDSGTips.prototype.onTouchTap = function (e) {
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
                    CF.sN(PanelNotify.CLOSE_RDSG_TIPS_PANEL);
                    break;
            }
        };
        RDSGTips.prototype.initData = function () {
            var data;
            data = Number(new Big(2500 * game.RDSGUtils.bet).mul(0.1));
            this.pay3_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(400 * game.RDSGUtils.bet).mul(0.1));
            this.pay3_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(50 * game.RDSGUtils.bet).mul(0.1));
            this.pay3_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(1500 * game.RDSGUtils.bet).mul(0.1));
            this.pay4_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(280 * game.RDSGUtils.bet).mul(0.1));
            this.pay4_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.RDSGUtils.bet).mul(0.1));
            this.pay4_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(1000 * game.RDSGUtils.bet).mul(0.1));
            this.pay5_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(200 * game.RDSGUtils.bet).mul(0.1));
            this.pay5_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.RDSGUtils.bet).mul(0.1));
            this.pay5_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(800 * game.RDSGUtils.bet).mul(0.1));
            this.pay6_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(150 * game.RDSGUtils.bet).mul(0.1));
            this.pay6_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.RDSGUtils.bet).mul(0.1));
            this.pay6_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(600 * game.RDSGUtils.bet).mul(0.1));
            this.pay7_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(120 * game.RDSGUtils.bet).mul(0.1));
            this.pay7_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.RDSGUtils.bet).mul(0.1));
            this.pay7_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(300 * game.RDSGUtils.bet).mul(0.1));
            this.pay8_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(80 * game.RDSGUtils.bet).mul(0.1));
            this.pay8_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.RDSGUtils.bet).mul(0.1));
            this.pay8_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(200 * game.RDSGUtils.bet).mul(0.1));
            this.pay9_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(60 * game.RDSGUtils.bet).mul(0.1));
            this.pay9_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.RDSGUtils.bet).mul(0.1));
            this.pay9_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(100 * game.RDSGUtils.bet).mul(0.1));
            this.pay10_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.RDSGUtils.bet).mul(0.1));
            this.pay10_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(10 * game.RDSGUtils.bet).mul(0.1));
            this.pay10_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(80 * game.RDSGUtils.bet).mul(0.1));
            this.pay11_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.RDSGUtils.bet).mul(0.1));
            this.pay11_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(10 * game.RDSGUtils.bet).mul(0.1));
            this.pay11_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(60 * game.RDSGUtils.bet).mul(0.1));
            this.pay12_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.RDSGUtils.bet).mul(0.1));
            this.pay12_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(8 * game.RDSGUtils.bet).mul(0.1));
            this.pay12_3.text = NumberFormat.handleFloatDecimal(data) + "";
        };
        return RDSGTips;
    }(game.BaseComponent));
    rdsg.RDSGTips = RDSGTips;
    __reflect(RDSGTips.prototype, "rdsg.RDSGTips");
})(rdsg || (rdsg = {}));
