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
    var RBWarHuixin = (function (_super) {
        __extends(RBWarHuixin, _super);
        function RBWarHuixin() {
            var _this = _super.call(this) || this;
            _this.mineScore = 0;
            _this.totalScore = 0;
            return _this;
        }
        RBWarHuixin.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        RBWarHuixin.prototype.init = function (root, index) {
            this.root = root;
            this.index = index;
            // this.peillabel.text = "";
            this.mineLabel.text = "0";
            this.totalLabel.text = "0";
            var roomInfo = Global.roomProxy.roomInfo;
            var betMulti = roomInfo.betMulti;
            var xingyunBet = betMulti[3];
            var str = xingyunBet[5] + "\u500D | " + xingyunBet[4] + "\u500D | " + xingyunBet[3] + "\u500D  | " + xingyunBet[2] + "\u500D  | " + xingyunBet[1] + "\u500D";
            this.beishuInfoLabel.text = str;
        };
        RBWarHuixin.prototype.showBetMuilt = function () {
            var roomInfo = Global.roomProxy.roomInfo;
        };
        RBWarHuixin.prototype.onTouchTap = function () {
            this.root.yzHuixin();
        };
        /**
         * 更新的我的押注
         */
        RBWarHuixin.prototype.updateMyValue = function (value, isAdd) {
            if (isAdd) {
                this.mineScore += value;
            }
            else {
                this.mineScore = value;
            }
            this.mineLabel.text = this.mineScore + "";
        };
        /**
         * 更新总押注
         */
        RBWarHuixin.prototype.updateTotalValue = function (value, isAdd) {
            if (isAdd) {
                this.totalScore += value;
            }
            else {
                this.totalScore = value;
            }
            this.totalLabel.text = this.totalScore + "";
        };
        RBWarHuixin.prototype.winAni = function () {
            var _this = this;
            this.blinkImage.visible = true;
            this.blinkImage.alpha = 1;
            egret.Tween.get(this.blinkImage, { loop: true }).to({
                alpha: 0
            }, 200).to({
                alpha: 1
            }, 200);
            egret.setTimeout(function () {
                egret.Tween.removeTweens(_this.blinkImage);
                _this.blinkImage.visible = false;
            }, this, 2000);
        };
        return RBWarHuixin;
    }(eui.Component));
    rbwar.RBWarHuixin = RBWarHuixin;
    __reflect(RBWarHuixin.prototype, "rbwar.RBWarHuixin");
})(rbwar || (rbwar = {}));
