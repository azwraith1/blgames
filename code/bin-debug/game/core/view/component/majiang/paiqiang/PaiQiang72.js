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
 * @Last Modified time: 2019-10-14 11:32:07
 * @Description: 牌墙
 */
var majiang;
(function (majiang) {
    var PaiQiang72 = (function (_super) {
        __extends(PaiQiang72, _super);
        function PaiQiang72() {
            var _this = _super.call(this) || this;
            _this.currentNumber = 1;
            _this.startNumber = 1;
            _this.maxNumber = 72;
            return _this;
        }
        PaiQiang72.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        PaiQiang72.prototype.showPaiQiangByData = function (directions, roomInfo) {
            var zhuangIndex = roomInfo.dealer;
            var seizi = roomInfo.diceNumber;
            var offerSet = seizi[1];
            var zhuang = directions[zhuangIndex];
            switch (zhuang) {
                case "mine":
                    switch (offerSet) {
                        case 1:
                        case 3:
                        case 5:
                            this.startNumber = 1;
                            break;
                        case 2:
                        case 4:
                        case 6:
                            this.startNumber = 37;
                            break;
                    }
                    break;
                case "top":
                case "left":
                case "right":
                    switch (offerSet) {
                        case 1:
                        case 3:
                        case 5:
                            this.startNumber = 37;
                            break;
                        case 2:
                        case 4:
                        case 6:
                            this.startNumber = 1;
                            break;
                    }
                    break;
            }
            this.startNumber += offerSet * 2;
            this.lastNumber = this.startNumber - 1;
            this.currentNumber = this.startNumber;
        };
        PaiQiang72.prototype.showPaiQiang = function (directions) {
            var roomInfo = Global.gameProxy.roomInfo;
            var zhuangIndex = roomInfo.dealer;
            //todu 后端没有
            var seizi = roomInfo['diceNumber'];
            var offerSet = seizi[1];
            var zhuang = directions[zhuangIndex];
            switch (zhuang) {
                case "mine":
                    switch (offerSet) {
                        case 1:
                        case 3:
                        case 5:
                            this.startNumber = 1;
                            break;
                        case 2:
                        case 4:
                        case 6:
                            this.startNumber = 37;
                            break;
                    }
                    break;
                case "top":
                case "left":
                case "right":
                    switch (offerSet) {
                        case 1:
                        case 3:
                        case 5:
                            this.startNumber = 37;
                            break;
                        case 2:
                        case 4:
                        case 6:
                            this.startNumber = 1;
                            break;
                    }
                    break;
            }
            this.startNumber += offerSet * 2;
            this.lastNumber = this.startNumber - 1;
            this.currentNumber = this.startNumber;
        };
        PaiQiang72.prototype.reloadPaiQiang = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var lessNum = roomInfo.publicCardNum;
            for (var i = 0; i < this.maxNumber - lessNum; i++) {
                this.removeNumByIndex();
            }
        };
        PaiQiang72.prototype.reloadPaiQiangByRoomInfo = function (roomInfo) {
            var lessNum = roomInfo.publicCardNum;
            for (var i = 0; i < this.maxNumber - lessNum; i++) {
                this.removeNumByIndex();
            }
        };
        PaiQiang72.prototype.removeNumByIndex = function () {
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
        PaiQiang72.prototype.removePaiByOfferset = function (offerSet) {
            this.currentNumber = this.currentNumber + offerSet;
            if (this.currentNumber > this.maxNumber) {
                this.currentNumber -= this.maxNumber;
            }
            else if (this.currentNumber < 0) {
                this.currentNumber += this.maxNumber;
            }
            this.removeNumByIndex();
        };
        PaiQiang72.prototype.getPaiQiangNum = function () {
            return this.topGroup.numChildren
                + this.mineGroup.numChildren;
        };
        PaiQiang72.prototype.hidePaiQiang = function () {
            this.topGroup.visible = this.mineGroup.visible = false;
        };
        return PaiQiang72;
    }(eui.Component));
    majiang.PaiQiang72 = PaiQiang72;
    __reflect(PaiQiang72.prototype, "majiang.PaiQiang72");
})(majiang || (majiang = {}));
