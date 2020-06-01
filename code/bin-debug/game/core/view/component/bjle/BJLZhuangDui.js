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
var bjle;
(function (bjle) {
    var BJLZhuangDui = (function (_super) {
        __extends(BJLZhuangDui, _super);
        function BJLZhuangDui() {
            var _this = _super.call(this) || this;
            _this.mineScore1 = 0;
            _this.totalScore = 0;
            return _this;
        }
        BJLZhuangDui.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.bgImage.source = RES.getRes("bjl_zdbg" + CF.tic);
            //this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        BJLZhuangDui.prototype.init = function (root, index) {
            this.root = root;
            this.index = index;
            this.mineScore.text = "0";
            this.zhuangScore.text = "0";
        };
        BJLZhuangDui.prototype.init_bili = function (index) {
            this.bili.font = "bjl_zhuang_fnt";
            this.bili.text = index;
        };
        BJLZhuangDui.prototype.onTouchTap = function () {
            this.root.yzZhuangDui();
        };
        BJLZhuangDui.prototype.updateMyValue = function (value, isAdd, isRecont) {
            if (isAdd) {
                this.mineScore1 += value;
            }
            else {
                this.mineScore1 = value;
            }
            this.mineScoreGroup.visible = isAdd;
            if (isRecont) {
                this.mineScoreGroup.visible = (value == 0) ? false : true;
            }
            //当自己下注值为0  隐藏mineScoreGroup  smart
            this.mineScoreGroup.visible = (this.mineScore1 == 0) ? false : true;
            this.mineScore.text = this.mineScore1 + "";
        };
        /**
         * 更新总押注
         */
        BJLZhuangDui.prototype.updateTotalValue = function (value, isAdd) {
            if (isAdd) {
                this.totalScore += value;
            }
            else {
                this.totalScore = value;
            }
            this.zhuangScore.text = this.totalScore + "";
        };
        BJLZhuangDui.prototype.winAni = function () {
            var _this = this;
            this.light.visible = true;
            this.light.alpha = 1;
            egret.Tween.get(this.light, { loop: true }).to({
                alpha: 0
            }, 400).to({
                alpha: 1
            }, 400);
            egret.setTimeout(function () {
                egret.Tween.removeTweens(_this.light);
                _this.light.visible = false;
            }, this, 2000);
        };
        return BJLZhuangDui;
    }(eui.Component));
    bjle.BJLZhuangDui = BJLZhuangDui;
    __reflect(BJLZhuangDui.prototype, "bjle.BJLZhuangDui");
})(bjle || (bjle = {}));
