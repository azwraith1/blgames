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
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-31 14:17:59
 * @Description: 牌墙
 */
var majiang;
(function (majiang) {
    var PaiQiang112 = (function (_super) {
        __extends(PaiQiang112, _super);
        function PaiQiang112() {
            var _this = _super.call(this) || this;
            _this.currentNumber = 1;
            _this.startNumber = 1;
            _this.maxNumber = 112;
            return _this;
        }
        PaiQiang112.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        PaiQiang112.prototype.showPaiQiangByData = function (directions, roomInfo) {
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
                            this.startNumber = 85;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 57;
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
                            this.startNumber = 85;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 57;
                            break;
                    }
                    break;
                case "top":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 57;
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
                            this.startNumber = 85;
                            break;
                    }
                    break;
                case "right":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 85;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 57;
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
            this.lastNumber = this.startNumber - 1;
            this.currentNumber = this.startNumber;
        };
        PaiQiang112.prototype.showPaiQiang = function (directions) {
            var roomInfo = Global.gameProxy.roomInfo;
            var zhuangIndex = roomInfo.dealer;
            //todu 后端没有
            var seizi = roomInfo['diceNumber'];
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
                            this.startNumber = 85;
                            break;
                        case 3:
                        case 7:
                        case 11:
                            this.startNumber = 57;
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
                            this.startNumber = 85;
                            break;
                        case 4:
                        case 6:
                        case 12:
                            this.startNumber = 57;
                            break;
                    }
                    break;
                case "top":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 57;
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
                            this.startNumber = 85;
                            break;
                    }
                    break;
                case "right":
                    switch (offerSet) {
                        case 1:
                        case 5:
                        case 9:
                            this.startNumber = 85;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            this.startNumber = 57;
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
            this.lastNumber = this.startNumber - 1;
            this.currentNumber = this.startNumber;
        };
        PaiQiang112.prototype.reloadPaiQiang = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var lessNum = roomInfo.publicCardNum;
            for (var i = 0; i < this.maxNumber - lessNum; i++) {
                this.removeNumByIndex();
            }
        };
        PaiQiang112.prototype.reloadPaiQiangByRoomInfo = function (roomInfo) {
            var lessNum = roomInfo.publicCardNum;
            for (var i = 0; i < this.maxNumber - lessNum; i++) {
                this.removeNumByIndex();
            }
        };
        PaiQiang112.prototype.removeNumByIndex = function () {
            var pai = this['pai' + this.currentNumber];
            if (pai) {
                game.UIUtils.removeSelf(pai);
                pai = null;
                this.currentNumber += 1;
                if (this.currentNumber > this.maxNumber) {
                    this.currentNumber = 1;
                }
            }
        };
        // public removePaiByOfferset(offerSet) {
        // 	this.currentNumber = this.currentNumber + offerSet
        // 	this.removeNumByIndex();
        // }
        PaiQiang112.prototype.removePaiByOfferset = function (offerSet) {
            this.currentNumber = this.currentNumber + offerSet;
            if (this.currentNumber > this.maxNumber) {
                this.currentNumber -= this.maxNumber;
            }
            else if (this.currentNumber < 0) {
                this.currentNumber += this.maxNumber;
            }
            this.removeNumByIndex();
        };
        PaiQiang112.prototype.getPaiQiangNum = function () {
            return this.leftGroup.numChildren + this.rightGroup.numChildren
                + this.topGroup.numChildren + this.mineGroup.numChildren;
        };
        PaiQiang112.prototype.hidePaiQiang = function () {
            this.leftGroup.visible = this.topGroup.visible = this.rightGroup.visible = this.mineGroup.visible = false;
        };
        return PaiQiang112;
    }(eui.Component));
    majiang.PaiQiang112 = PaiQiang112;
    __reflect(PaiQiang112.prototype, "majiang.PaiQiang112");
})(majiang || (majiang = {}));
