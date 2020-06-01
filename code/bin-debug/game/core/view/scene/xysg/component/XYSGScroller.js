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
var xysg;
(function (xysg) {
    var XYSGScroller = (function (_super) {
        __extends(XYSGScroller, _super);
        function XYSGScroller() {
            var _this = _super.call(this) || this;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.overIndex = 0;
            _this.lastClick = false;
            _this.flashIcon = [];
            _this.isRun = false;
            _this.overIndexes = [];
            _this.skinName = "XYSGScrollerSkin";
            return _this;
        }
        XYSGScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        XYSGScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        XYSGScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown(i);
            }
        };
        XYSGScroller.prototype.stopIconDb = function () {
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i].stopAni();
            }
        };
        XYSGScroller.prototype.run = function () {
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
        XYSGScroller.prototype.runResultFast = function () {
            if (this.resultArrList) {
                var resultArr = this.resultArrList;
                this.lastClick = true;
                for (var i = 0; i < resultArr.length; i++) {
                    var result = resultArr[i];
                    var item = this["item" + (i + 1)];
                    item.clearDownTimeOut();
                    if (this.overIndexes.indexOf(i + "") < 0) {
                        item.startDownTimeOut(i + 1, 20 * (1 + i), result);
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
        XYSGScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(i + 1, this.changeResultByIndex(i + 1), result);
            }
        };
        XYSGScroller.prototype.changeResultByIndex = function (index) {
            switch (index) {
                case 1:
                    return game.LaohuUtils.downTime1;
                case 2:
                    return game.LaohuUtils.downTime2;
                case 3:
                    return game.LaohuUtils.downTime3;
            }
        };
        XYSGScroller.prototype.changeSpeedByIndex = function (index) {
            switch (index) {
                case 1:
                    return 48 * 1;
                case 2:
                    return 48 * 1.01;
                case 3:
                    return 48 * 1.02;
            }
        };
        XYSGScroller.prototype.createChildren = function () {
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
        XYSGScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        XYSGScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(index, firstArr);
        };
        /**
         * @param  {} excludeValue
         */
        XYSGScroller.prototype.getLine3Icon = function (excludeValue) {
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
        XYSGScroller.prototype.addBonusAni = function (allline, allscore) {
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
        XYSGScroller.prototype.checkisInArray = function (num, array) {
            array.forEach(function (v) {
                if (v == num) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        XYSGScroller.prototype.removeScroller = function () {
            for (var i = 1; i <= 3; i++) {
                var item = this["item" + i].removeitem();
            }
            this.scroller.removeChildren();
        };
        /**
         * @param  {} index?
         */
        XYSGScroller.prototype.removeScatterAni = function (index) {
            game.UIUtils.removeSelf(this.scatterAni);
        };
        XYSGScroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(1));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(3));
        };
        return XYSGScroller;
    }(game.BaseUI));
    xysg.XYSGScroller = XYSGScroller;
    __reflect(XYSGScroller.prototype, "xysg.XYSGScroller");
})(xysg || (xysg = {}));
