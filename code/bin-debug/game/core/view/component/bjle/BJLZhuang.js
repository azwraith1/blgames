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
    var BJLZhuang = (function (_super) {
        __extends(BJLZhuang, _super);
        function BJLZhuang() {
            var _this = _super.call(this) || this;
            _this.mineScore1 = 0;
            _this.totalScore = 0;
            return _this;
        }
        BJLZhuang.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //this.touchChildren = false;
            this.bgImage.source = RES.getRes("bjl_zbg" + CF.tic);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        BJLZhuang.prototype.init = function (root, index) {
            this.root = root;
            this.index = index;
            this.mineScore.text = "0";
            this.zhuangScore.text = "0";
        };
        BJLZhuang.prototype.init_bili = function (index) {
            this.bili.font = "bjl_zhuang_fnt";
            this.bili.text = index;
        };
        BJLZhuang.prototype.onTouchTap = function () {
            this.root.yzZhuang();
        };
        /**
         * 更新的我的押注
         */
        BJLZhuang.prototype.updateMyValue = function (value, isAdd, isRecont) {
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
        Object.defineProperty(BJLZhuang.prototype, "Bet", {
            /**获取下注值*/
            get: function () {
                if (this.zhuangScore) {
                    return Number(this.mineScore.text);
                }
                else {
                    return -1;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新总押注
         */
        BJLZhuang.prototype.updateTotalValue = function (value, isAdd) {
            if (isAdd) {
                this.totalScore += value;
            }
            else {
                this.totalScore = value;
            }
            this.zhuangScore.text = this.totalScore + "";
        };
        BJLZhuang.prototype.winAni = function () {
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
        return BJLZhuang;
    }(eui.Component));
    bjle.BJLZhuang = BJLZhuang;
    __reflect(BJLZhuang.prototype, "bjle.BJLZhuang");
})(bjle || (bjle = {}));
