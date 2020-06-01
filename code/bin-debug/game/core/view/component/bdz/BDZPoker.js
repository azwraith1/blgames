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
var BDZPoker = (function (_super) {
    __extends(BDZPoker, _super);
    function BDZPoker() {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        if (!_this.skinName) {
            _this.skinName = new BDZPokerSkin();
        }
        return _this;
    }
    BDZPoker.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        game.UIUtils.setAnchorPot(this.beiImage);
        game.UIUtils.setAnchorPot(this.zhengGroup);
        this.yuanXIndex = this.y;
    };
    BDZPoker.prototype.initWithNum = function (num) {
        this.number = num;
        this.color = Math.floor(num / 100);
        this.value = Math.floor(num % 100);
        this.changeImage();
        //this.showB2Z();
    };
    /**
     * 牌面
     */
    BDZPoker.prototype.changeImage = function () {
        this.valueLabel.text = PukerUtils.number2Puker(this.value);
        this.smallColorImg.source = RES.getRes("common_poper_color_" + this.color + "_png");
        if (this.value >= 11 && this.value <= 13) {
            if (this.color == 1 || this.color == 3) {
                this.bigColorImg.source = RES.getRes("common_poper_" + this.value + "_1_png");
            }
            else {
                this.bigColorImg.source = RES.getRes("common_poper_" + this.value + "_2_png");
            }
        }
        else {
            this.bigColorImg.source = RES.getRes("common_poper_color_" + this.color + "_png");
        }
        if (this.color == 1 || this.color == 3) {
            this.valueLabel.font = "common_poker_black_fnt";
        }
        else {
            this.valueLabel.font = "common_poker_red_fnt";
        }
    };
    BDZPoker.prototype.onTouchTap = function (e) {
        CF.dP(ENo.BDZ_CARD_TOUCH, this.name);
    };
    /**
     * 背面变正面。
     */
    BDZPoker.prototype.showB2Z = function () {
        this.beiImage.visible = false;
        this.zhengGroup.visible = true;
    };
    /**
     * 正面变背面。
     */
    BDZPoker.prototype.showZ2B = function () {
        this.beiImage.visible = true;
        this.zhengGroup.visible = false;
    };
    BDZPoker.prototype.selectDown = function () {
        this.y = this.yuanXIndex;
        this.selected = false;
        return this.selected;
    };
    BDZPoker.prototype.selectUp = function () {
        this.y = this.yuanXIndex - 20;
        this.selected = true;
        return this.selected;
    };
    BDZPoker.prototype.showMb = function (value) {
        this.poker_m.visible = 1 == value ? false : true;
    };
    BDZPoker.prototype.pokerB2ZAni1 = function () {
        var _this = this;
        if (Global.runBack) {
            this.beiImage.scaleX = 1;
            this.beiImage.visible = false;
            this.zhengGroup.scaleX = this.zhengGroup.scaleY = 1;
            this.zhengGroup.visible = true;
            return;
        }
        this.zhengGroup.scaleX = 0;
        this.zhengGroup.visible = true;
        egret.Tween.get(this.beiImage).to({ scaleX: 0 }, 150, egret.Ease.sineIn).call(function () {
            _this.beiImage.scaleX = 1;
            _this.beiImage.visible = false;
            _this.zhengGroup.scaleX = _this.zhengGroup.scaleY = 1.05;
            egret.Tween.get(_this.zhengGroup).to({ scaleX: 1, scaleY: 1 }, 150, egret.Ease.sineIn);
        });
    };
    BDZPoker.prototype.pokerB2ZAni2 = function () {
        var _this = this;
        if (Global.runBack) {
            this.beiImage.scaleX = 1;
            this.beiImage.visible = false;
            this.zhengGroup.scaleX = this.zhengGroup.scaleY = 1;
            this.zhengGroup.visible = true;
            return;
        }
        this.zhengGroup.scaleX = 0;
        this.zhengGroup.visible = true;
        egret.Tween.get(this.beiImage).to({ scaleX: 0 }, 200, egret.Ease.sineIn).call(function () {
            _this.beiImage.scaleX = 1;
            _this.beiImage.visible = false;
            egret.Tween.get(_this.zhengGroup).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineIn);
        });
    };
    return BDZPoker;
}(game.BaseUI));
__reflect(BDZPoker.prototype, "BDZPoker");
