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
    var BJLMineHeader = (function (_super) {
        __extends(BJLMineHeader, _super);
        function BJLMineHeader() {
            var _this = _super.call(this) || this;
            /**
             * 分数加减动画
             */
            _this.count = 0;
            _this.sumFen = 0;
            _this.skinName = new BJLMineHeaderSkin();
            return _this;
        }
        /**
         * 自己流水显示与隐藏
         */
        BJLMineHeader.prototype.lsfalse = function () {
            this.liushuiLabel.visible = false;
        };
        BJLMineHeader.prototype.addDb = function (obj) {
            this.dbGroup.removeChildren();
            this.dbGroup.addChild(obj);
        };
        BJLMineHeader.prototype.showLiushuiLabel = function (gainGold) {
            var _this = this;
            this.liushuiLabel.text = 0 + "";
            this.count = 0;
            this.sumFen = 0;
            this.liushuiLabel.visible = true;
            this.gainGold = gainGold;
            this.liushuiLabel.visible = true;
            this.liushuiLabel.alpha = 0;
            this.liushuiLabel.y = this.liushuiLabel.y + 20;
            egret.Tween.get(this.liushuiLabel).to({ alpha: 0, y: this.liushuiLabel.y }, 50).to({ alpha: 1, y: this.liushuiLabel.y - 20 }, 50).call(function () {
                _this.timer = egret.setInterval(function () {
                    _this.scoreAddOrNo();
                }, _this, 30);
            });
        };
        BJLMineHeader.prototype.scoreAddOrNo = function () {
            this.count++;
            var finalNum = this.gainGold;
            var step = Math.abs(finalNum) / 30;
            this.sumFen = this.sumFen + Math.ceil(step);
            if (this.count > 20) {
                egret.clearInterval(this.timer);
                this.liushuiLabel.text = "+" + finalNum;
            }
            else {
                this.liushuiLabel.text = "+" + this.sumFen;
            }
        };
        /**
         * 押注头像移动
         */
        BJLMineHeader.prototype.headerMovie = function (dirction) {
            egret.Tween.removeTweens(this.headerGroup);
            egret.Tween.get(this.headerGroup).to({
                y: -4
            }, 100).to({
                y: 6
            }, 100);
        };
        return BJLMineHeader;
    }(BaseHeader));
    bjle.BJLMineHeader = BJLMineHeader;
    __reflect(BJLMineHeader.prototype, "bjle.BJLMineHeader");
})(bjle || (bjle = {}));
