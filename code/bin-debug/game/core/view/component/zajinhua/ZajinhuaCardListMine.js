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
    var ZajinhuaCardListMine = (function (_super) {
        __extends(ZajinhuaCardListMine, _super);
        function ZajinhuaCardListMine() {
            var _this = _super.call(this) || this;
            _this.xPoint = [49, 145, 241];
            _this.yPoint = [70, 70, 70];
            return _this;
            //this.skinName = new ZajinhuaMineCardsSkin();
        }
        ZajinhuaCardListMine.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.db();
        };
        ZajinhuaCardListMine.prototype.renderByList = function (listData, isAni) {
            for (var i = 0; i < listData.length; i++) {
                var card = this['card' + i];
                card.initWithNum(listData[i]);
                card.showB2Z();
            }
            if (isAni) {
                this.cardAnimation();
            }
        };
        /**
         * 展牌动画
         */
        ZajinhuaCardListMine.prototype.cardAnimation = function () {
            if (Global.runBack) {
                //后台
                this.card0.x = this.xPoint[0];
                this.card0.y = this.yPoint[0];
                this.card1.x = this.xPoint[1];
                this.card1.y = this.yPoint[0];
                this.card2.x = this.xPoint[2];
                this.card2.y = this.yPoint[0];
                return;
            }
            this.alphaIs0();
            egret.Tween.get(this.card0).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[0], y: this.yPoint[0] }, 300);
            egret.Tween.get(this.card1).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[1], y: this.yPoint[1] }, 300);
            egret.Tween.get(this.card2).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[2], y: this.yPoint[2] }, 300);
        };
        ZajinhuaCardListMine.prototype.alphaIs0 = function () {
            for (var i = 0; i < 3; i++) {
                var card = this["card" + i];
                card.x = this.xPoint[0];
                card.y = this.yPoint[0];
            }
        };
        /**
         * 展示分数
         */
        ZajinhuaCardListMine.prototype.showFen = function (num, isConit) {
            if (isConit === void 0) { isConit = false; }
            //10表示隐藏。
            this.db();
            this.addChild(this.fenGroup);
            this.fenGroup.visible = (num == 10) ? false : true;
            if (num != 10) {
                if (isConit) {
                    this.fenImage.source = "zjh_px_" + num + "_png";
                    return;
                }
                if (num >= 3) {
                    this.fenImage.visible = false;
                    // this.fenImage.source = "zjh_px_diban_png";
                    this.word.play(this.chose(num), 1);
                }
                else {
                    this.fenImage.source = "zjh_px_" + num + "_png";
                }
            }
        };
        ZajinhuaCardListMine.prototype.db = function () {
            this.fenGroup.removeChildren();
            this.word = new DBComponent("zjh_px");
            this.word.scaleX = this.word.scaleY = 1;
            this.fenGroup.addChild(this.fenImage);
            this.fenGroup.addChild(this.word);
            this.word.verticalCenter = 10;
            this.word.horizontalCenter = 0;
            this.word.visible = false;
            this.word.callback = function () {
            };
        };
        ZajinhuaCardListMine.prototype.chose = function (num) {
            switch (num) {
                case 3:
                    return "zjh_px_jinhua";
                case 4:
                    return "zjh_px_shunjin";
                case 5:
                    return "zjh_px_baozi";
            }
        };
        ZajinhuaCardListMine.prototype.showFen1 = function (num) {
            //10表示隐藏。
            this.fenGroup.visible = (num == 1) ? true : false;
        };
        ZajinhuaCardListMine.prototype.showCardByIndex = function (index) {
            if (this["card" + index]) {
                this["card" + index].visible = true;
            }
        };
        /**
         * 中间收牌
         */
        ZajinhuaCardListMine.prototype.zhongjianShouPai = function () {
            egret.Tween.get(this.card0).to({ x: this.card1.x }, 200);
            egret.Tween.get(this.card2).to({ x: this.card1.x }, 200);
        };
        /**
     * 恢复最初状态
     */
        ZajinhuaCardListMine.prototype.setNomal = function (num) {
            for (var i = 2; i >= 0; i--) {
                var cd = this["card" + i];
                cd.scaleX = 0.75;
                cd.scaleY = 0.75;
                cd.y = this.yPoint[i];
                cd.x = this.xPoint[i];
                cd.alpha = 1;
                cd.showMb(num);
                if (num != 2) {
                    cd.showZ2B();
                }
                cd.visible = 1 == num ? false : true;
                if (num == 2) {
                    this.addChild(this.fenGroup);
                    this.showFen1(1);
                }
            }
        };
        ZajinhuaCardListMine.prototype.paiBianHui = function () {
            for (var i = 0; i < 3; i++) {
                this["card" + i].showMb(2);
            }
        };
        return ZajinhuaCardListMine;
    }(game.BaseUI));
    zajinhua.ZajinhuaCardListMine = ZajinhuaCardListMine;
    __reflect(ZajinhuaCardListMine.prototype, "zajinhua.ZajinhuaCardListMine");
})(zajinhua || (zajinhua = {}));
