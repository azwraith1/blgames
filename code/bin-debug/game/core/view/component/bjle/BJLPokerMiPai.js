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
var BJLPokerMiPai = (function (_super) {
    __extends(BJLPokerMiPai, _super);
    function BJLPokerMiPai() {
        var _this = _super.call(this) || this;
        // public mipaiAni: egret.tween.TweenGroup;
        _this.id = null;
        /**正面的最大值 */
        _this.maxZhengY = null;
        /**纠正正面和鼠标按下的偏差 */
        _this.delat = null;
        /**鼠标开始按下的Y值 */
        _this.mouseStartPosY = null;
        /**遮罩初始化时的Y值 */
        _this.maskStartPosY = null;
        /**正面反转完成后 遮罩的Y值*/
        _this.maskZhengEndY = null;
        /**鼠标按下与正面牌的距离 */
        _this.distanceY = null;
        _this.preZhengGroupY = null;
        _this.min = 0;
        _this.touchEnabled = true;
        _this.touchChildren = true;
        _this.skinName = new BJLCardSkinMiPaiSkin();
        return _this;
    }
    BJLPokerMiPai.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.delat = this.touchRec.y;
        this.maskStartPosY = this.mask.y;
        this.maxZhengY = this.zhengGroup.y;
        this.maskZhengEndY = this.maskStartPosY + 20;
        this.reseatPos();
        this.touchRec.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.touchRec.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    BJLPokerMiPai.prototype.reseatPos = function () {
        this.zhengGroup.y = this.maxZhengY;
        this.mask.y = this.maskStartPosY;
        this.beiImage.visible = true;
        this.zhengGroup.visible = true;
        this.valueLabel.alpha = 0;
        this.valueLabel.visible = true;
        this.touchRec.touchEnabled = true;
        this.smallColorImg.alpha = 0;
        this.smallColorImg.visible = true;
    };
    BJLPokerMiPai.prototype.removeLisen = function () {
        this.touchRec.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.touchRec.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    BJLPokerMiPai.prototype.onTouchBegin = function (evt) {
        this.mouseStartPosY = evt.localY;
        this.distanceY = evt.localY - this.zhengGroup.y + this.delat;
        //	LogUtils.logD("onTouchBegin evt.localY:" + evt.localY + "this.zhengGroup.y:" + this.zhengGroup.y + "this.delat" + this.delat + "distanceY：" + this.distanceY);
    };
    BJLPokerMiPai.prototype.onTouchMove = function (evt) {
        var _this = this;
        if (!this.distanceY)
            this.distanceY = evt.localY - this.zhengGroup.y + this.delat;
        var _y = evt.localY - this.distanceY + this.delat;
        //	LogUtils.logD("==onTouchMove=" + "evt.localY:" + evt.localY + "this.distanceY:" + this.distanceY + "this.delat:" + this.delat);
        var deltaDis = evt.localY - this.mouseStartPosY;
        var zhengStartPosY = this.zhengGroup.y;
        if (_y <= 0) {
            this.touchRec.touchEnabled = false;
            this.zhengGroup.y = 0;
            egret.Tween.get(this.mask).to({ y: this.maskZhengEndY }, 400).call(function () {
                egret.Tween.get(_this.valueLabel).to({ alpha: 1 }, 200);
                egret.Tween.get(_this.smallColorImg).to({ alpha: 1 }, 200).call(function () {
                    //	LogUtils.logD("====你好====我在翻牌===");
                    CF.dP(ENo.BJL_FANPAI, { isZhuang: _this.isZhuang, id: _this.id });
                }, _this);
            });
        }
        else if (_y >= this.maxZhengY) {
            this.zhengGroup.y = this.maxZhengY;
        }
        else {
            this.zhengGroup.y = _y;
        }
        var currentY = this.zhengGroup.y;
        var delat = currentY - zhengStartPosY;
        this.mask.y += delat * 0.5;
        // LogUtils.logD("====onTouchMove zhenggroup==" + this.zhengGroup.y);
        // LogUtils.logD("=======onTouchMove this.mask.y==" + this.mask.y);
    };
    BJLPokerMiPai.prototype.onTouchEnd = function (evt) {
        var _this = this;
        var vars = {
            onChange: function () {
                var test = this.preZhengGroupY;
                var delat = this.zhengGroup.y - this.preZhengGroupY;
                this.preZhengGroupY = this.zhengGroup.y;
                var maskY = this.mask.y + delat * 0.5;
                if (maskY < this.maskStartPosY) {
                    this.mask.y = maskY;
                }
                else {
                    this.mask.y = this.maskStartPosY;
                }
                //LogUtils.logD("===onTouchEnd =onChange mask===" + this.mask.y + "this.zhengGroup.y:" + this.zhengGroup.y + "delat:" + delat + "pre:" + test);
                if (this.mask.y > this.maskStartPosY) {
                    this.mask.y = this.maskStartPosY;
                    LogUtils.logD("====超值了=====");
                }
            },
            onChangeObj: this
        };
        if (this.zhengGroup.y > this.min) {
            this.preZhengGroupY = this.zhengGroup.y;
            egret.Tween.get(this.zhengGroup, vars).to({ y: this.maxZhengY }, 300).call(function () {
                //LogUtils.logD("onTouchEnd 结束的时候 this.zhengGroup.y：" + this.zhengGroup.y + "遮罩的位置：" + this.mask.y);
                _this.zhengGroup.y = _this.maxZhengY;
                _this.mask.y = _this.maskStartPosY;
            });
            egret.setTimeout(function () {
                _this.zhengGroup.y = _this.maxZhengY;
                _this.mask.y = _this.maskStartPosY;
            }, this, 300);
        }
        else {
        }
    };
    return BJLPokerMiPai;
}(bjle.BJLPoker));
__reflect(BJLPokerMiPai.prototype, "BJLPokerMiPai");
