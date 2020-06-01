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
var snyx;
(function (snyx) {
    var SNYXTipsPanel = (function (_super) {
        __extends(SNYXTipsPanel, _super);
        function SNYXTipsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "SNYXTipsSkin";
            return _this;
        }
        SNYXTipsPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initData();
        };
        SNYXTipsPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        SNYXTipsPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        SNYXTipsPanel.prototype.onTouchTap = function (e) {
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
                    CF.sN(PanelNotify.CLOSE_SNYX_TIPS_PANEL);
                    break;
            }
        };
        SNYXTipsPanel.prototype.initData = function () {
            var data;
            // 20	5	1
            data = Number(new Big(20 * game.LaohuUtils.bet));
            this.pay3_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(5 * game.LaohuUtils.bet));
            this.pay3_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(1 * game.LaohuUtils.bet));
            this.pay3_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            //10	3	0.75
            data = Number(new Big(10 * game.LaohuUtils.bet));
            this.pay4_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(3 * game.LaohuUtils.bet));
            this.pay4_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.75 * game.LaohuUtils.bet));
            this.pay4_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            // 2.5	1	0.4
            data = Number(new Big(2.5 * game.LaohuUtils.bet));
            this.pay5_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(1 * game.LaohuUtils.bet));
            this.pay5_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.4 * game.LaohuUtils.bet));
            this.pay5_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            // 1	0.75	0.25
            data = Number(new Big(1 * game.LaohuUtils.bet));
            this.pay6_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.75 * game.LaohuUtils.bet));
            this.pay6_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.25 * game.LaohuUtils.bet));
            this.pay6_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            // 0.9	0.5	0.15
            data = Number(new Big(0.9 * game.LaohuUtils.bet));
            this.pay7_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.5 * game.LaohuUtils.bet));
            this.pay7_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.15 * game.LaohuUtils.bet));
            this.pay7_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            // 0.75	0.4	0.1
            data = Number(new Big(0.75 * game.LaohuUtils.bet));
            this.pay8_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.4 * game.LaohuUtils.bet));
            this.pay8_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.1 * game.LaohuUtils.bet));
            this.pay8_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            // 0.65	0.25	0.1
            data = Number(new Big(0.65 * game.LaohuUtils.bet));
            this.pay9_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.25 * game.LaohuUtils.bet));
            this.pay9_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.1 * game.LaohuUtils.bet));
            this.pay9_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            // 0.6	0.2	0.05
            data = Number(new Big(0.6 * game.LaohuUtils.bet));
            this.pay10_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.2 * game.LaohuUtils.bet));
            this.pay10_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.05 * game.LaohuUtils.bet));
            this.pay10_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            // 0.5	0.15	0.05
            data = Number(new Big(0.5 * game.LaohuUtils.bet));
            this.pay11_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.15 * game.LaohuUtils.bet));
            this.pay11_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
            data = Number(new Big(0.05 * game.LaohuUtils.bet));
            this.pay11_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
        };
        return SNYXTipsPanel;
    }(game.BaseComponent));
    snyx.SNYXTipsPanel = SNYXTipsPanel;
    __reflect(SNYXTipsPanel.prototype, "snyx.SNYXTipsPanel");
})(snyx || (snyx = {}));
