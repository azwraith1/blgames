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
 * @Author: real MC Lee
 * @Date: 2019-05-27 18:43:56
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-28 17:55:31
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNScroller = (function (_super) {
        __extends(SDMNScroller, _super);
        function SDMNScroller() {
            var _this = _super.call(this) || this;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.itemSize4 = 8;
            _this.itemSize5 = 8;
            _this.overIndex = 0;
            _this.speed = 48;
            _this.lastClick = false;
            _this.flashIcon = [];
            _this.isRun = false;
            _this.overIndexes = [];
            _this.skinName = "SDMNScrollerSkin";
            return _this;
        }
        SDMNScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SDMNScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SDMNScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        SDMNScroller.prototype.stopIconDb = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].stopAni();
            }
        };
        SDMNScroller.prototype.run = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            this.overIndexes = [];
            this.resultArrList = null;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        SDMNScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        SDMNScroller.prototype.runResultFast = function () {
            if (this.resultArrList) {
                var resultArr = this.resultArrList;
                this.lastClick = true;
                for (var i = 0; i < resultArr.length; i++) {
                    var result = resultArr[i];
                    var item = this["item" + (i + 1)];
                    item.clearDownTimeOut();
                    if (this.overIndexes.indexOf(i + "") < 0) {
                        item.startDownTimeOut(20 * (1 + i), result);
                    }
                }
                return true;
            }
            return false;
        };
        SDMNScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        /**
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        SDMNScroller.prototype.addFoGuang = function (item, index, str) {
            this["item" + item].changeFoguang(index, str);
        };
        /**
         * 可能出scatter的动画
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        SDMNScroller.prototype.addFoGuang1 = function (item, index, str) {
            this["item" + item].changeFoguang1(index, str);
        };
        SDMNScroller.prototype.changeResultByIndex = function (index) {
            switch (index) {
                case 1:
                    return game.LaohuUtils.downTime1;
                case 2:
                    return game.LaohuUtils.downTime2;
                case 3:
                    return game.LaohuUtils.downTime3;
                case 4:
                    return game.LaohuUtils.downTime4;
                case 5:
                    return game.LaohuUtils.downTime5;
            }
        };
        SDMNScroller.prototype.changeSpeedByIndex = function (index) {
            switch (index) {
                case 1:
                    return 48 * 1;
                case 2:
                    return 48 * 1.01;
                case 3:
                    return 48 * 1.02;
                case 4:
                    return 48 * 1.03;
                case 5:
                    return 48 * 1.04;
            }
        };
        SDMNScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent("sdmn_fast");
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;
            // this.addChild(this.scatterAni);
        };
        /**
         * @param  {} sceneIndex
         */
        SDMNScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        SDMNScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        /**
         * @param  {} excludeValue
         */
        SDMNScroller.prototype.getLine3Icon = function (excludeValue) {
            var arrWating = [];
            for (var i = 3; i <= 12; i++) {
                if (i != excludeValue) {
                    var count = Math.floor(_.random(1, 2));
                    if (i == 2) {
                        count = 1;
                    }
                    for (var j = 0; j < count; j++) {
                        arrWating.push(i);
                    }
                }
            }
            arrWating = _.shuffle(arrWating);
            var sure1 = [arrWating[0], arrWating[1], arrWating[2]];
            return sure1;
        };
        /**
         * @param  {number} index
         */
        SDMNScroller.prototype.addScatterAni = function (index) {
            switch (index) {
                case 4:
                    this.scatterAni.x = 679;
                    this.scatterAni.y = 300;
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 5:
                    this.scatterAni.x = 874;
                    this.scatterAni.y = 300;
                    this.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", 0);
                    break;
            }
        };
        SDMNScroller.prototype.addScore = function (index) {
            // this.item3.showScore(index);
        };
        /**
         * @param  {Array<Array<number>>} allline
         * @param  {number} allscore
         */
        SDMNScroller.prototype.addBonusAni = function (allline, allscore) {
            for (var i = allline.length; i >= 1; i--) {
                for (var j = 0; j < allline[i - 1].length; j++) {
                    this["item" + i].showAni(allline[i - 1][j]);
                }
                this.itemGroup.addChild(this["item" + i]);
            }
        };
        /**
         * 数是否在数组中
         * @param  {number} num
         * @param  {Array<number>} array
         */
        SDMNScroller.prototype.checkisInArray = function (num, array) {
            array.forEach(function (v) {
                if (v == num) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        SDMNScroller.prototype.setIconHui = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].setIconHui();
            }
        };
        /**
         * 移除数组图标置灰
         * @param  {Array<Array<number>>} array
         */
        SDMNScroller.prototype.removeIconHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].resetIconHui(array[i - 1][j]);
                }
            }
        };
        SDMNScroller.prototype.setSpecilHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].setSpecilHui(array[i - 1][j]);
                }
            }
        };
        SDMNScroller.prototype.removeScroller = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].removeitem();
            }
            this.scroller.removeChildren();
        };
        /**
         * @param  {} index?
         */
        SDMNScroller.prototype.removeScatterAni = function (index) {
            game.UIUtils.removeSelf(this.scatterAni);
        };
        SDMNScroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(1));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(0));
            this.initItemByFirst(4, this.getLine3Icon(2));
            this.initItemByFirst(5, this.getLine3Icon(1));
        };
        SDMNScroller.prototype.showFreeFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(2));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(2));
            this.initItemByFirst(4, this.getLine3Icon(2));
            this.initItemByFirst(5, this.getLine3Icon(2));
        };
        return SDMNScroller;
    }(game.BaseUI));
    sdmn.SDMNScroller = SDMNScroller;
    __reflect(SDMNScroller.prototype, "sdmn.SDMNScroller");
})(sdmn || (sdmn = {}));
