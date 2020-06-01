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
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:28:12
 * @Last Modified by:   Li MengChan
 * @Last Modified time: 2018-06-25 14:28:12
 * @Description: 提示
 */
var game;
(function (game) {
    var ToastTip = (function (_super) {
        __extends(ToastTip, _super);
        function ToastTip() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            _this.touchEnabled = false;
            var bg = new eui.Image("log_itembg_png");
            bg.scale9Grid = new egret.Rectangle(25, 25, 1, 1);
            _this.addChild(bg);
            bg.horizontalCenter = 0;
            bg.verticalCenter = 0;
            _this.bg = bg;
            var tf = new eui.Label();
            tf.textAlign = "center";
            tf.lineSpacing = 5;
            tf.maxWidth = 450;
            tf.textColor = 0x440E3B;
            tf.horizontalCenter = 0;
            tf.verticalCenter = 0;
            _this.label = tf;
            _this.addChild(tf);
            return _this;
        }
        ToastTip.prototype.updateTxt = function (txt, isHtml) {
            this.label.text = txt;
            this.label.x = -this.label.width / 2;
            this.label.y = 20;
            this.bg.width = this.label.width + 30;
            this.bg.height = this.label.height + 24;
        };
        ToastTip.popTip = function (txt, time, isHtml) {
            if (time === void 0) { time = 1000; }
            if (isHtml === void 0) { isHtml = false; }
            var tip;
            if (ToastTip._pool.length > 0) {
                tip = ToastTip._pool.pop();
                tip.alpha = 1;
            }
            else {
                tip = new ToastTip();
            }
            tip.updateTxt(txt, isHtml);
            tip.x = (GameConfig.curWidth() - tip.bg.width) / 2;
            tip.y = (GameConfig.curHeight() - tip.bg.height) / 2;
            GameLayerManager.gameLayer().effectLayer.addChild(tip);
            egret.Tween.get(tip).to({ y: tip.y - 50 }, 100, egret.Ease.backOut)
                .wait(300)
                .to({ y: tip.y - 180, alpha: 0 }, 2000)
                .call(function () {
                game.UIUtils.removeSelf(tip);
                if (ToastTip._pool.length < 50) {
                    ToastTip._pool.push(tip);
                }
            });
        };
        ToastTip._pool = [];
        return ToastTip;
    }(eui.Group));
    game.ToastTip = ToastTip;
    __reflect(ToastTip.prototype, "game.ToastTip");
})(game || (game = {}));
