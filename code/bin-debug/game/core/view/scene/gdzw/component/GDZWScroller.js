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
 * @Date: 2019-07-17 15:26:34
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-08-13 15:22:47
 * @Description:
 */
var gdzw;
(function (gdzw) {
    var GDZWScroller = (function (_super) {
        __extends(GDZWScroller, _super);
        function GDZWScroller() {
            var _this = _super.call(this) || this;
            _this.aniName = "gdzw_reel_fast";
            _this.strName = game.GDZWUtils.comm2FreeModel;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.itemSize4 = 8;
            _this.itemSize5 = 8;
            _this.overIndex = 0;
            _this.speed = 48;
            _this.aniX = [395, 550, 710];
            _this.aniY = [300, 300, 300];
            _this.flashIcon = [];
            _this.isRun = false;
            _this.overIndexes = [];
            _this.skinName = "GDZWScrollerSkin";
            return _this;
        }
        GDZWScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        GDZWScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        GDZWScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        GDZWScroller.prototype.run = function () {
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
        GDZWScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        GDZWScroller.prototype.runResultFast = function () {
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
        GDZWScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                this.lastClick = false;
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        GDZWScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @param  {} sceneIndex
         */
        GDZWScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        GDZWScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        GDZWScroller.prototype.showScatterHideIcon = function () {
            for (var i = 1; i <= 5; i++) {
                this["item" + i].showScatterIcon();
            }
        };
        return GDZWScroller;
    }(game.BaseScroller));
    gdzw.GDZWScroller = GDZWScroller;
    __reflect(GDZWScroller.prototype, "gdzw.GDZWScroller");
})(gdzw || (gdzw = {}));
