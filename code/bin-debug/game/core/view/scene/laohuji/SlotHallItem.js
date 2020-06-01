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
// TypeScript file
var slot;
(function (slot) {
    var SlotHallItem = (function (_super) {
        __extends(SlotHallItem, _super);
        function SlotHallItem(index, grade) {
            var _this = _super.call(this) || this;
            _this.grade = grade;
            _this.index = index;
            _this.skinName = new SlotHallItemSkin();
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            return _this;
        }
        SlotHallItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.icon.source = "slot_hall_new_" + game.LaohuUtils.gamename(this.index) + "_png";
            switch (this.grade) {
                case 2:
                    this.currentState = "hot";
                    this.iconAni();
                    return;
                case 3:
                    this.currentState = "new";
                    break;
                case 4:
                    this.currentState = "common";
                    break;
                case 5:
                    this.currentState = "continiu";
                    break;
                case 6:
                    this.currentState = "hide";
                    break;
            }
            this.addKuangani();
        };
        SlotHallItem.prototype.iconAni = function () {
            this.fireAni = new DBComponent("slot_hall_fire1");
            this.hotAni2 = new DBComponent("slot_hall_hot2");
            this.fireAni.play("", 0);
            this.hotAni2.play("", 0);
            this.fireAni.scaleY = 1.1;
            this.fireAni.touchEnabled = this.hotAni2.touchEnabled = false;
            this.hotAni2.horizontalCenter = this.fireAni.horizontalCenter = 0;
            this.fireAni.bottom = 10;
            this.hotAni2.bottom = 200;
            this.itemGroup.addChild(this.fireAni);
            this.itemGroup.addChild(this.hotAni2);
            this.fireAni.resetPosition();
            this.hotAni2.resetPosition();
        };
        SlotHallItem.prototype.iconGoldAni = function () {
            SoundManager.getInstance().playEffect("slot_hall_coin_mp3");
            this.goldAni = new DBComponent("slot_hall_fire2");
            this.goldAni.play("", 3);
            this.goldAni.horizontalCenter = this.goldAni.bottom = 0;
            this.goldAni.touchEnabled = false;
            this.itemGroup.addChild(this.goldAni);
            this.goldAni.resetPosition();
        };
        //
        SlotHallItem.prototype.onTouchTap = function (e) {
            CF.dP(ENo.SLOT_HALL_CLICK, { gameId: game.LaohuUtils.gamename(this.index) });
        };
        SlotHallItem.prototype.checkAlapa = function (offersetX, width) {
            return;
            egret.Tween.removeTweens(this);
            var alpha = -1;
            if (offersetX > 0) {
                var maxX = this.x + this.width - this.anchorOffsetX;
                var minX = this.x - this.anchorOffsetX + this.width / 3;
                var nowPoint = offersetX;
                if (nowPoint < minX) {
                    alpha = 1;
                }
                else {
                    if (nowPoint >= minX && nowPoint < maxX) {
                        var cha = nowPoint - minX;
                        alpha = this.getChaAlphaByRight(cha);
                    }
                }
            }
            else {
                var maxX = this.x + this.width / 2 - this.width / 4 + this.anchorOffsetX;
                var minX = this.x - this.width / 2 - this.width / 4 + this.anchorOffsetX;
                var nowPoint = width + offersetX;
            }
            if (alpha && alpha > -1) {
                egret.Tween.get(this).to({
                    alpha: alpha
                }, 50);
            }
        };
        SlotHallItem.prototype.getChaAlphaByRight = function (cha) {
            if (cha > 0 && cha < this.width / 95) {
                return 1;
            }
            else if (cha >= this.width / 95 && cha < this.width / 80) {
                return 0.6;
            }
            else if (cha >= this.width / 80 && cha < this.width / 70) {
                return 0.5;
            }
            else if (cha >= this.width / 70 && cha < this.width / 50) {
                return 0.4;
            }
            else if (cha >= this.width / 50 && cha < this.width / 30) {
                return 0.3;
            }
            else if (cha >= this.width / 30 && cha < this.width) {
                return 0.2;
            }
        };
        SlotHallItem.prototype.addKuangani = function () {
            if (this.grade == 2)
                return;
            this.kuangAni = new DBComponent("slot_hall_new_com");
            this.kuangAni.horizontalCenter = 0;
            this.kuangAni.bottom = 120;
            this.kuangAni.play("", 1);
            this.kuangAni.touchEnabled = false;
            this.itemGroup.addChild(this.kuangAni);
            this.kuangAni.resetPosition();
            egret.setInterval(this.playkuangani, this, 5000);
        };
        SlotHallItem.prototype.playkuangani = function () {
            this.kuangAni.horizontalCenter = 0;
            this.kuangAni.bottom = 120;
            this.kuangAni.play("", 1);
            this.kuangAni.touchEnabled = false;
            this.itemGroup.addChild(this.kuangAni);
            this.kuangAni.resetPosition();
        };
        return SlotHallItem;
    }(eui.Component));
    slot.SlotHallItem = SlotHallItem;
    __reflect(SlotHallItem.prototype, "slot.SlotHallItem");
})(slot || (slot = {}));
