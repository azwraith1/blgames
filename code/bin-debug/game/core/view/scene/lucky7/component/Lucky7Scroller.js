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
var lucky7;
(function (lucky7) {
    var LUCKY7Scroller = (function (_super) {
        __extends(LUCKY7Scroller, _super);
        function LUCKY7Scroller() {
            var _this = _super.call(this) || this;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.overIndex = 0;
            _this.lastClick = false;
            _this.flashIcon = [];
            _this.isRun = false;
            _this.overIndexes = [];
            _this.skinName = "Lucky7ScrollerSkin";
            return _this;
        }
        LUCKY7Scroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        LUCKY7Scroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        LUCKY7Scroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        LUCKY7Scroller.prototype.stopIconDb = function () {
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i].stopAni();
            }
        };
        LUCKY7Scroller.prototype.run = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            this.overIndexes = [];
            this.resultArrList = null;
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        /**
         * 快速旋转结果
         */
        LUCKY7Scroller.prototype.runResultFast = function () {
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
        /**
         * 替换转轴旋转结果
         * @param  {} resultArr
         */
        LUCKY7Scroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        LUCKY7Scroller.prototype.changeResultByIndex = function (index) {
            switch (index) {
                case 1:
                    return game.LaohuUtils.downTime1;
                case 2:
                    return game.LaohuUtils.downTime2;
                case 3:
                    return game.LaohuUtils.downTime3;
            }
        };
        LUCKY7Scroller.prototype.changeSpeedByIndex = function (index) {
            switch (index) {
                case 1:
                    return 48 * 1;
                case 2:
                    return 48 * 1.01;
                case 3:
                    return 48 * 1.02;
            }
        };
        LUCKY7Scroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent("cbzz_fast_ani1");
            // let mask: egret.Shape = new egret.Shape();
            // mask.graphics.drawCircle(249, 270, 249);
            // this.addChild(mask);
            // this.scroller.mask = mask;
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;
            // this.addChild(this.scatterAni);
        };
        /**
         * @param  {} sceneIndex
         */
        LUCKY7Scroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        LUCKY7Scroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        /**
         * @param  {} excludeValue
         */
        LUCKY7Scroller.prototype.getLine3Icon = function (excludeValue) {
            var arrWating = [];
            for (var i = 1; i <= 3; i++) {
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
         * @param  {Array<Array<number>>} allline
         * @param  {number} allscore
         */
        LUCKY7Scroller.prototype.addBonusAni = function (allline, allscore) {
            for (var i = 1; i <= allline.length; i++) {
                for (var j = 0; j < allline[i - 1].length; j++) {
                    this["item" + i].showAni(allline[i - 1][j]);
                }
            }
        };
        /**
         * 数是否在数组中
         * @param  {number} num
         * @param  {Array<number>} array
         */
        LUCKY7Scroller.prototype.checkisInArray = function (num, array) {
            array.forEach(function (v) {
                if (v == num) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        LUCKY7Scroller.prototype.removeScroller = function () {
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i].removeitem();
            }
            this.scroller.removeChildren();
        };
        /**
         * @param  {} index?
         */
        LUCKY7Scroller.prototype.removeScatterAni = function (index) {
            game.UIUtils.removeSelf(this.scatterAni);
        };
        LUCKY7Scroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(1));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(3));
        };
        return LUCKY7Scroller;
    }(game.BaseUI));
    lucky7.LUCKY7Scroller = LUCKY7Scroller;
    __reflect(LUCKY7Scroller.prototype, "lucky7.LUCKY7Scroller");
})(lucky7 || (lucky7 = {}));
