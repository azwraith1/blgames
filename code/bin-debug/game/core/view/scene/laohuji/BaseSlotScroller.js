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
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-09-19 16:07:25
 * @Description:
 */
var game;
(function (game) {
    var BaseScroller = (function (_super) {
        __extends(BaseScroller, _super);
        function BaseScroller() {
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
            return _this;
        }
        BaseScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        BaseScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        BaseScroller.prototype.update = function (e) {
        };
        BaseScroller.prototype.stopIconDb = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].stopAni();
            }
        };
        BaseScroller.prototype.run = function () {
            //还原
        };
        BaseScroller.prototype.freeRun = function () {
        };
        BaseScroller.prototype.runResultFast = function () {
        };
        BaseScroller.prototype.runResult = function (resultArr) {
        };
        /**
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        BaseScroller.prototype.addFoGuang = function (item, index, str) {
            this["item" + item].changeFoguang(index, str);
        };
        BaseScroller.prototype.foguang4FreeGame = function (item, index, str) {
            this["item" + item].foGuang4FreeGame(index, str);
        };
        /**
         * 可能出scatter的动画
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        BaseScroller.prototype.addFoGuang1 = function (item, index, str) {
            this["item" + item].changeFoguang1(index, str);
        };
        BaseScroller.prototype.changeResultByIndex = function (index) {
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
        BaseScroller.prototype.changeSpeedByIndex = function (index) {
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
        BaseScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent(this.aniName);
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;
            // this.addChild(this.scatterAni);
        };
        /**
         * @param  {} sceneIndex
         */
        BaseScroller.prototype.initItemCounts = function (sceneIndex) {
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        BaseScroller.prototype.initItemByFirst = function (index, firstArr) {
        };
        /**
         * @param  {} excludeValue
         */
        BaseScroller.prototype.getLine3Icon = function (excludeValue) {
            var arrWating = [];
            for (var i = 3; i <= 11; i++) {
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
        BaseScroller.prototype.addScatterAni = function (index, fixPosition) {
            switch (index) {
                case 3:
                    this.scatterAni.x = this.aniX[0] - fixPosition;
                    this.scatterAni.y = this.aniY[0];
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 4:
                    this.scatterAni.x = this.aniX[1] - fixPosition;
                    this.scatterAni.y = this.aniY[1];
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 5:
                    this.scatterAni.x = this.aniX[2] - fixPosition;
                    this.scatterAni.y = this.aniY[2];
                    this.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", 0);
                    break;
            }
        };
        BaseScroller.prototype.addScore = function (index) {
            // this.item3.showScore(index);
        };
        /**
         * 中奖数组展示
         * @param  {Array<Array<number>>} allline
         * @param  {number} allscore
         */
        BaseScroller.prototype.addBonusAni = function (allline, allscore) {
            for (var i = allline.length; i >= 1; i--) {
                for (var j = 0; j < allline[i - 1].length; j++) {
                    this["item" + i].showAni(allline[i - 1][j]);
                }
                this.itemGroup.addChild(this["item" + i]);
            }
        };
        BaseScroller.prototype.smashingDBani = function (lineArr, time) {
            for (var i = lineArr.length; i >= 1; i--) {
                for (var j = 0; j < lineArr[i - 1].length; j++) {
                    this["item" + i].smashingDB(lineArr[i - 1][j], time);
                }
                this.itemGroup.addChild(this["item" + i]);
            }
        };
        BaseScroller.prototype.removeSmashingDb = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].removeSmash();
            }
        };
        /**
         * 数是否在数组中
         * @param  {number} num
         * @param  {Array<number>} array
         */
        BaseScroller.prototype.checkisInArray = function (num, array) {
            array.forEach(function (v) {
                if (v == num) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        BaseScroller.prototype.setIconHui = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].setIconHui();
            }
        };
        /**
         * 移除数组图标置灰
         * @param  {Array<Array<number>>} array
         */
        BaseScroller.prototype.removeIconHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].resetIconHui(array[i - 1][j]);
                }
            }
        };
        BaseScroller.prototype.setSpecilHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].setSpecilHui(array[i - 1][j]);
                }
            }
        };
        BaseScroller.prototype.removeScroller = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].removeitem();
            }
            this.scroller.removeChildren();
        };
        /**
         * @param  {} index?
         */
        BaseScroller.prototype.removeScatterAni = function (index) {
            game.UIUtils.removeSelf(this.scatterAni);
        };
        BaseScroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(1));
            this.initItemByFirst(2, this.getLine3Icon(1));
            this.initItemByFirst(3, this.getLine3Icon(1));
            this.initItemByFirst(4, this.getLine3Icon(1));
            this.initItemByFirst(5, this.getLine3Icon(1));
        };
        /**
         * 初始化免费游戏场景，图标
         * @param  {} sceneIndex
         */
        BaseScroller.prototype.showFreeFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            if (game.RDSGUtils.comm2FreeModel) {
                this.initItemByFirst(1, this.strName[0].reverse());
                this.initItemByFirst(2, this.strName[1].reverse());
                this.initItemByFirst(3, this.strName[2].reverse());
                this.initItemByFirst(4, this.strName[3].reverse());
                this.initItemByFirst(5, this.strName[4].reverse());
            }
            else {
                this.initItemByFirst(1, this.getLine3Icon(1));
                this.initItemByFirst(2, this.getLine3Icon(1));
                this.initItemByFirst(3, this.getLine3Icon(1));
                this.initItemByFirst(4, this.getLine3Icon(1));
                this.initItemByFirst(5, this.getLine3Icon(1));
            }
        };
        return BaseScroller;
    }(game.BaseUI));
    game.BaseScroller = BaseScroller;
    __reflect(BaseScroller.prototype, "game.BaseScroller");
})(game || (game = {}));
