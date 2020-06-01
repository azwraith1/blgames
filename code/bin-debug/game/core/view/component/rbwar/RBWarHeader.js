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
var rbwar;
(function (rbwar) {
    var RBWarHeader = (function (_super) {
        __extends(RBWarHeader, _super);
        function RBWarHeader() {
            var _this = _super.call(this) || this;
            /**
             * 分数加减动画
             */
            _this.count = 0;
            _this.sumFen = 0;
            return _this;
        }
        RBWarHeader.prototype.showWin = function (num) {
            if (num == 1) {
                this.playerGold.visible = false;
                this.playerGold.x = -43;
                this.playerGold.y = -46;
            }
        };
        RBWarHeader.prototype.showLiushuiLabel = function (gainGold) {
            var _this = this;
            this.playerGold.text = 0 + "";
            this.count = 0;
            this.sumFen = 0;
            this.playerGold.visible = true;
            this.gainGold = gainGold;
            this.playerGold.visible = true;
            this.playerGold.alpha = 0;
            this.playerGold.y = this.playerGold.y + 20;
            egret.Tween.get(this.playerGold).to({ alpha: 0, y: this.playerGold.y }, 50).to({ alpha: 1, y: this.playerGold.y - 20 }, 50).call(function () {
                _this.timer = egret.setInterval(function () {
                    _this.scoreAddOrNo();
                }, _this, 30);
            });
        };
        RBWarHeader.prototype.scoreAddOrNo = function () {
            this.count++;
            var finalNum = this.gainGold;
            var step = Math.abs(finalNum) / 30;
            this.sumFen = this.sumFen + Math.ceil(step);
            if (this.count > 20) {
                egret.clearInterval(this.timer);
                this.playerGold.text = "+" + finalNum;
            }
            else {
                this.playerGold.text = "+" + this.sumFen;
            }
        };
        return RBWarHeader;
    }(BaseHeader));
    rbwar.RBWarHeader = RBWarHeader;
    __reflect(RBWarHeader.prototype, "rbwar.RBWarHeader");
})(rbwar || (rbwar = {}));
