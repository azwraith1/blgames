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
var rdsg;
(function (rdsg) {
    var RDSGScroller = (function (_super) {
        __extends(RDSGScroller, _super);
        function RDSGScroller() {
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
            _this.skinName = "RDSGScrollerSkin";
            return _this;
        }
        RDSGScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        RDSGScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        RDSGScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        RDSGScroller.prototype.stopIconDb = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].stopAni();
            }
        };
        RDSGScroller.prototype.run = function () {
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
        RDSGScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        RDSGScroller.prototype.runResultFast = function () {
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
        RDSGScroller.prototype.runResult = function (resultArr) {
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
        RDSGScroller.prototype.addFoGuang = function (item, index, str) {
            this["item" + item].changeFoguang(index, str);
        };
        /**
         * 可能出scatter的动画
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        RDSGScroller.prototype.addFoGuang1 = function (item, index, str) {
            this["item" + item].changeFoguang1(index, str);
        };
        RDSGScroller.prototype.changeResultByIndex = function (index) {
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
        RDSGScroller.prototype.changeSpeedByIndex = function (index) {
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
        RDSGScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent("rdsg_run_fast");
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;
            // this.addChild(this.scatterAni);
        };
        /**
         * @param  {} sceneIndex
         */
        RDSGScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        RDSGScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        /**
         * @param  {} excludeValue
         */
        RDSGScroller.prototype.getLine3Icon = function (excludeValue) {
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
        RDSGScroller.prototype.addScatterAni = function (index, fixPosition) {
            switch (index) {
                case 3:
                    this.scatterAni.x = 433 - fixPosition;
                    this.scatterAni.y = 265;
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 4:
                    this.scatterAni.x = 602 - fixPosition;
                    this.scatterAni.y = 265;
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 5:
                    this.scatterAni.x = 771 - fixPosition;
                    this.scatterAni.y = 265;
                    this.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", 0);
                    break;
            }
        };
        RDSGScroller.prototype.addScore = function (index) {
            // this.item3.showScore(index);
        };
        /**
         * @param  {Array<Array<number>>} allline
         * @param  {number} allscore
         */
        RDSGScroller.prototype.addBonusAni = function (allline, allscore) {
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
        RDSGScroller.prototype.checkisInArray = function (num, array) {
            array.forEach(function (v) {
                if (v == num) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        RDSGScroller.prototype.setIconHui = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].setIconHui();
            }
        };
        /**
         * 移除数组图标置灰
         * @param  {Array<Array<number>>} array
         */
        RDSGScroller.prototype.removeIconHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].resetIconHui(array[i - 1][j]);
                }
            }
        };
        RDSGScroller.prototype.setSpecilHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].setSpecilHui(array[i - 1][j]);
                }
            }
        };
        RDSGScroller.prototype.removeScroller = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].removeitem();
            }
            this.scroller.removeChildren();
        };
        /**
         * @param  {} index?
         */
        RDSGScroller.prototype.removeScatterAni = function (index) {
            game.UIUtils.removeSelf(this.scatterAni);
        };
        RDSGScroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(0));
            this.initItemByFirst(2, this.getLine3Icon(0));
            this.initItemByFirst(3, this.getLine3Icon(0));
            this.initItemByFirst(4, this.getLine3Icon(0));
            this.initItemByFirst(5, this.getLine3Icon(0));
        };
        RDSGScroller.prototype.showFreeFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            if (game.RDSGUtils.comm2FreeModel) {
                this.initItemByFirst(1, game.RDSGUtils.comm2FreeModel[0].reverse());
                this.initItemByFirst(2, game.RDSGUtils.comm2FreeModel[1].reverse());
                this.initItemByFirst(3, game.RDSGUtils.comm2FreeModel[2].reverse());
                this.initItemByFirst(4, game.RDSGUtils.comm2FreeModel[3].reverse());
                this.initItemByFirst(5, game.RDSGUtils.comm2FreeModel[4].reverse());
            }
            else {
                this.initItemByFirst(1, this.getLine3Icon(0));
                this.initItemByFirst(2, this.getLine3Icon(0));
                this.initItemByFirst(3, this.getLine3Icon(0));
                this.initItemByFirst(4, this.getLine3Icon(0));
                this.initItemByFirst(5, this.getLine3Icon(0));
            }
        };
        return RDSGScroller;
    }(game.BaseUI));
    rdsg.RDSGScroller = RDSGScroller;
    __reflect(RDSGScroller.prototype, "rdsg.RDSGScroller");
})(rdsg || (rdsg = {}));
