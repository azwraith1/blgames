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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaCardListOther = (function (_super) {
        __extends(ZajinhuaCardListOther, _super);
        function ZajinhuaCardListOther() {
            var _this = _super.call(this) || this;
            _this.xPoint = [33, 77, 120];
            _this.yPoint = [47, 47, 47];
            /**
             * 发牌动画和展牌动画
             */
            _this.runCardAni = false;
            return _this;
            //this.skinName = new ZajinhuaOtherCardsSkin();
        }
        ZajinhuaCardListOther.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.db();
        };
        ZajinhuaCardListOther.prototype.renderByList = function (listData, isAin) {
            var k = listData.length;
            this.resetPosition();
            for (var i = 0; i < k; i++) {
                var card = this['card' + (k - 1 - i)];
                card.visible = true;
                card.initWithNum(listData[i]);
                card.showB2Z();
            }
            if (isAin) {
                this.cardAnimation();
            }
        };
        /**
         * 后台运行写死
         */
        ZajinhuaCardListOther.prototype.houtaiRun = function (listData) {
            var k = listData.length;
            for (var i = 0; i < k; i++) {
                var card = this['card' + i];
                card.visible = true;
                card.initWithNum(listData[i]);
                card.showB2Z();
                this.addChild(card);
            }
            //this.cardAnimation();
        };
        ZajinhuaCardListOther.prototype.sortPais = function () {
            var group = [];
            this.addChild(this.card0);
            this.addChild(this.card1);
            this.addChild(this.card2);
            this.addChild(this.fenGroup);
        };
        ZajinhuaCardListOther.prototype.cardAnimation = function () {
            var _this = this;
            this.resetPosition();
            this.alphaIs0();
            egret.Tween.get(this.card0).to({ x: this.xPoint[0], y: this.yPoint[0] }, 200);
            egret.Tween.get(this.card1).to({ x: this.xPoint[1], y: this.yPoint[1] }, 200);
            egret.Tween.get(this.card2).to({ x: this.xPoint[2], y: this.yPoint[2] }, 200);
            egret.setTimeout(function () {
                _this.sortPais();
            }, this, 300);
        };
        /**
         * 隐藏
         */
        ZajinhuaCardListOther.prototype.alphaIs0 = function () {
            this.card0.rotation = this.card2.rotation = 0;
            this.card0.x = this.xPoint[0];
            this.card0.y = this.yPoint[0];
            this.card2.x = this.xPoint[0];
            this.card2.y = this.yPoint[2];
            this.card1.x = this.xPoint[0];
            this.card1.y = this.yPoint[1];
        };
        /**
         * 看牌动画
         */
        ZajinhuaCardListOther.prototype.showLookPai = function (isAni) {
            if (isAni || !Global.runBack) {
                this.card0.x += 10;
                this.card2.x -= 10;
                egret.Tween.get(this.card0).to({ rotation: -7 }, 200);
                egret.Tween.get(this.card1).to({ y: 40 }, 200);
                egret.Tween.get(this.card2).to({ rotation: 7 }, 200);
                this.addChild(this.fenGroup);
            }
            else {
                this.card0.x += 10;
                this.card2.x -= 10;
                this.card0.rotation = -7;
                this.card1.y = 40;
                this.card2.rotation = 7;
            }
        };
        ZajinhuaCardListOther.prototype.resetPosition = function () {
            this.addChild(this.card0);
            this.addChild(this.card1);
            this.addChild(this.card2);
            egret.Tween.removeTweens(this.card0);
            this.card0.rotation = 0;
            this.card0.x = this.xPoint[0];
            this.card0.y = this.yPoint[0];
            egret.Tween.removeTweens(this.card1);
            this.card1.x = this.xPoint[1];
            this.card1.y = this.yPoint[1];
            egret.Tween.removeTweens(this.card2);
            this.card2.x = this.xPoint[2];
            this.card2.y = this.yPoint[2];
            this.card2.rotation = 0;
            this.addChild(this.fenGroup);
        };
        /**
         * 恢复最初状态
         */
        ZajinhuaCardListOther.prototype.setNomal = function () {
            for (var i = 2; i >= 0; i--) {
                var cd = this["card" + i];
                cd.scaleX = 0.5;
                cd.scaleY = 0.5;
                cd.alpha = 1;
                // this.addChild(cd);
                cd.showZ2B();
                cd.showMb(1);
                cd.visible = false;
                cd.rotation = 0;
                cd.x = this.xPoint[i];
                cd.y = this.yPoint[i];
            }
        };
        /**
         * 三合一，未开牌合拢
         */
        ZajinhuaCardListOther.prototype.setNomal1 = function () {
            egret.Tween.get(this.card0).to({ x: 129 }, 150);
            egret.Tween.get(this.card1).to({ x: 84 }, 150).wait(50).call(function () {
            });
        };
        /**
         * 三合一,开牌合拢；
         */
        ZajinhuaCardListOther.prototype.setNomal2 = function () {
            egret.Tween.get(this.card0).to({ x: this.xPoint[0], y: this.yPoint[0], rotation: 0 }, 150);
            egret.Tween.get(this.card1).to({ x: this.xPoint[1], y: this.yPoint[1], rotation: 0 }, 150);
            egret.Tween.get(this.card2).to({ x: this.xPoint[2], y: this.yPoint[2], rotation: 0 }, 150).wait(50).call(function () {
            });
        };
        /**
         * 展示分数
         */
        ZajinhuaCardListOther.prototype.showFen = function (num) {
            //10表示隐藏。
            this.db();
            this.addChild(this.fenGroup);
            this.fenGroup.visible = (num == 10) ? false : true;
            if (num != 10) {
                if (num >= 3 && num < 6) {
                    this.fenImage.visible = false;
                    this.word.play(this.chose(num), 1);
                }
                else {
                    this.fenImage.source = "zjh_px_" + num + "_png";
                    if (num == 6) {
                        this.fenImage.x = -15;
                    }
                    else {
                        this.fenImage.x = 0;
                    }
                    this.fenImage.y = 7;
                }
            }
        };
        ZajinhuaCardListOther.prototype.db = function () {
            this.fenGroup.removeChildren();
            this.word = new DBComponent("zjh_px");
            this.fenGroup.addChild(this.fenImage);
            this.fenGroup.addChild(this.word);
            this.word.horizontalCenter = -5;
            this.word.verticalCenter = 5;
            this.word.visible = false;
            this.word.callback = function () {
            };
        };
        ZajinhuaCardListOther.prototype.chose = function (num) {
            switch (num) {
                case 3:
                    return "zjh_px_jinhua";
                case 4:
                    return "zjh_px_shunjin";
                case 5:
                    return "zjh_px_baozi";
            }
        };
        ZajinhuaCardListOther.prototype.showCardByIndex = function (index) {
            if (this["card" + index]) {
                this["card" + index].visible = true;
            }
        };
        ZajinhuaCardListOther.prototype.paiBianHui = function () {
            this.resetPosition();
            for (var i = 0; i < 3; i++) {
                this["card" + i].showMb(2);
            }
        };
        return ZajinhuaCardListOther;
    }(game.BaseUI));
    zajinhua.ZajinhuaCardListOther = ZajinhuaCardListOther;
    __reflect(ZajinhuaCardListOther.prototype, "zajinhua.ZajinhuaCardListOther");
})(zajinhua || (zajinhua = {}));
