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
var sgws;
(function (sgws) {
    var SGWSTipsPanel = (function (_super) {
        __extends(SGWSTipsPanel, _super);
        function SGWSTipsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "SGWSTipsSkin";
            return _this;
        }
        SGWSTipsPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initData();
        };
        SGWSTipsPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        SGWSTipsPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        SGWSTipsPanel.prototype.onTouchTap = function (e) {
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
                    CF.sN(PanelNotify.CLOSE_SGWS_TIPS_PANEL);
                    break;
            }
        };
        SGWSTipsPanel.prototype.initData = function () {
            var data;
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(10000));
            this.pay2_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(2500));
            this.pay2_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(1000));
            this.pay2_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(2500));
            this.pay3_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(1250));
            this.pay3_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(250));
            this.pay3_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(500));
            this.pay4_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(250));
            this.pay4_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(50));
            this.pay4_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(250));
            this.pay5_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(75));
            this.pay5_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(25));
            this.pay5_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(175));
            this.pay6_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(60));
            this.pay6_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(25));
            this.pay6_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(150));
            this.pay7_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(50));
            this.pay7_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(15));
            this.pay7_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(125));
            this.pay8_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(25));
            this.pay8_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(10));
            this.pay8_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(100));
            this.pay9_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(25));
            this.pay9_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(10));
            this.pay9_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(100));
            this.pay10_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(15));
            this.pay10_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(5));
            this.pay10_3.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(75));
            this.pay11_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(15));
            this.pay11_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(game.LaohuUtils.mul * game.LaohuUtils.bet).mul(5));
            this.pay11_3.text = NumberFormat.handleFloatDecimal(data) + "";
        };
        return SGWSTipsPanel;
    }(game.BaseComponent));
    sgws.SGWSTipsPanel = SGWSTipsPanel;
    __reflect(SGWSTipsPanel.prototype, "sgws.SGWSTipsPanel");
})(sgws || (sgws = {}));
