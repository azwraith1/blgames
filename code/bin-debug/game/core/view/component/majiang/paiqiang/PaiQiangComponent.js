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
/*
 * @Author: li mengchan
 * @Date: 2018-08-20 16:52:36
 * @Last Modified by: li mengchan
 * @Last Modified time: 2019-01-14 14:48:55
 * @Description: 牌墙
 */
var majiang;
(function (majiang) {
    var PaiQiangComponent = (function (_super) {
        __extends(PaiQiangComponent, _super);
        function PaiQiangComponent() {
            var _this = _super.call(this) || this;
            _this.currentNumber = 1;
            _this.startNumber = 1;
            return _this;
            // this.skinName = new PaiQiangSkin();
        }
        PaiQiangComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        PaiQiangComponent.prototype.showPaiQiangByData = function (directions, roomInfo) {
            var zhuangIndex = roomInfo.dealer;
            var seizi = roomInfo.diceNumber;
            var offerSet = seizi[0] + seizi[1];
            var min = seizi[0];
            var zhuang = directions[zhuangIndex];
            switch (zhuang) {
                case "mine":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 1;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 83;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 55;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 29;
                            break;
                    }
                    break;
                case "left":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 29;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 1;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 83;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 55;
                            break;
                    }
                    break;
                case "top":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 55;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 29;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 1;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 83;
                            break;
                    }
                    break;
                case "right":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 83;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 55;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 29;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 1;
                            break;
                    }
                    break;
            }
            this.startNumber += min * 2;
            this.currentNumber = this.startNumber;
        };
        PaiQiangComponent.prototype.showPaiQiang = function (directions) {
            var roomInfo = Global.gameProxy.roomInfo;
            var zhuangIndex = roomInfo.dealer;
            var seizi = roomInfo['diceNumber'];
            var offerSet = seizi[0] + seizi[1];
            var min = seizi[0];
            var zhuang = directions[zhuangIndex];
            // zhuang = "right";
            switch (zhuang) {
                case "mine":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 1;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 83;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 55;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 29;
                            break;
                    }
                    //  this.startNumber = 1;
                    break;
                case "left":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 29;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 1;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 83;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 55;
                            break;
                    }
                    // this.startNumber = 29;
                    break;
                case "top":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 55;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 29;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 1;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 83;
                            break;
                    }
                    // this.startNumber = 55;
                    break;
                case "right":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 83;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 55;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 29;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 1;
                            break;
                    }
                    // this.startNumber = 83;
                    break;
            }
            this.startNumber += min * 2;
            this.currentNumber = this.startNumber;
        };
        PaiQiangComponent.prototype.reloadPaiQiang = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var lessNum = roomInfo.publicCardNum;
            for (var i = 0; i < 108 - lessNum; i++) {
                this.removeNumByIndex();
            }
        };
        PaiQiangComponent.prototype.reloadPaiQiangByRoomInfo = function (roomInfo) {
            var lessNum = roomInfo.remain;
            for (var i = 0; i < 108 - lessNum; i++) {
                this.removeNumByIndex();
            }
        };
        PaiQiangComponent.prototype.removeNumByIndex = function () {
            var pai = this['pai' + this.currentNumber];
            if (pai) {
                game.UIUtils.removeSelf(pai);
                pai = null;
                this.currentNumber += 1;
                if (this.currentNumber > 108) {
                    this.currentNumber = 1;
                }
            }
        };
        // public removePaiByOfferset(offerSet) {
        // 	this.currentNumber = this.currentNumber + offerSet
        // 	this.removeNumByIndex();
        // }
        PaiQiangComponent.prototype.removePaiByOfferset = function (offerSet) {
            this.currentNumber = this.currentNumber + offerSet;
            if (this.currentNumber > 108) {
                this.currentNumber -= 108;
            }
            else if (this.currentNumber < 0) {
                this.currentNumber += 108;
            }
            this.removeNumByIndex();
        };
        PaiQiangComponent.prototype.getPaiQiangNum = function () {
            return this.leftGroup.numChildren + this.rightGroup.numChildren
                + this.topGroup.numChildren + this.mineGroup.numChildren;
        };
        PaiQiangComponent.prototype.hidePaiQiang = function () {
            this.leftGroup.visible = this.topGroup.visible = this.rightGroup.visible = this.mineGroup.visible = false;
        };
        return PaiQiangComponent;
    }(eui.Component));
    majiang.PaiQiangComponent = PaiQiangComponent;
    __reflect(PaiQiangComponent.prototype, "majiang.PaiQiangComponent");
})(majiang || (majiang = {}));
