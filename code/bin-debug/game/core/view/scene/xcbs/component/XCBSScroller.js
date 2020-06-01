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
var xcbs;
(function (xcbs) {
    var XCBSScroller = (function (_super) {
        __extends(XCBSScroller, _super);
        function XCBSScroller() {
            var _this = _super.call(this) || this;
            _this.aniName = "xcbs_reel_fast";
            _this.strName = game.GDZWUtils.comm2FreeModel;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.itemSize4 = 8;
            _this.itemSize5 = 8;
            _this.overIndex = 0;
            _this.speed = 48;
            _this.aniX = [480, 670, 870];
            _this.aniY = [295, 295, 295];
            _this.flashIcon = [];
            _this.isRun = false;
            _this.overIndexes = [];
            _this.skinName = "XCBSScrollerSkin";
            return _this;
        }
        XCBSScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        XCBSScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        XCBSScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        XCBSScroller.prototype.run = function () {
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
        /**
         * @param  {} excludeValue
         */
        XCBSScroller.prototype.getLine3Icon = function (excludeValue) {
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
        XCBSScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        XCBSScroller.prototype.runResultFast = function () {
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
         * 传入服务器给的结果数组
         * @param  {} resultArr
         */
        XCBSScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        XCBSScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @param  {} sceneIndex
         */
        XCBSScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        XCBSScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        XCBSScroller.prototype.showScatterHideIcon = function () {
            for (var i = 1; i <= 5; i++) {
                this["item" + i].showScatterIcon();
            }
        };
        XCBSScroller.prototype.sort1 = function () {
            for (var i = 1; i <= 5; i++) {
                this["item" + i].sotr1();
            }
        };
        XCBSScroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(12));
            this.initItemByFirst(2, this.getLine3Icon(12));
            this.initItemByFirst(3, this.getLine3Icon(12));
            this.initItemByFirst(4, this.getLine3Icon(12));
            this.initItemByFirst(5, this.getLine3Icon(12));
        };
        /**
         * 初始化免费游戏场景，图标
         * @param  {} sceneIndex
         */
        XCBSScroller.prototype.showFreeFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            if (game.RDSGUtils.comm2FreeModel) {
                this.initItemByFirst(1, this.strName[0].reverse());
                this.initItemByFirst(2, this.strName[1].reverse());
                this.initItemByFirst(3, this.strName[2].reverse());
                this.initItemByFirst(4, this.strName[3].reverse());
                this.initItemByFirst(5, this.strName[4].reverse());
            }
            else {
                this.initItemByFirst(1, this.getLine3Icon(12));
                this.initItemByFirst(2, this.getLine3Icon(12));
                this.initItemByFirst(3, this.getLine3Icon(12));
                this.initItemByFirst(4, this.getLine3Icon(12));
                this.initItemByFirst(5, this.getLine3Icon(12));
            }
        };
        /**
         * @param  {Array<Array<number>>} allAtr 需要消除的所有icon
         * @param  {Array<Array<number>>} nextIcons 消除完成后展示的图标
         */
        XCBSScroller.prototype.eliminateIcons = function (allAtr, nextIcons) {
            for (var i = 0; i < allAtr.length; i++) {
                var item = this["item" + (i + 1)].setIconHui();
                this["item" + (i + 1)].updateScrollerItem(allAtr[i], allAtr[i].length, nextIcons[i]);
            }
        };
        return XCBSScroller;
    }(game.BaseScroller));
    xcbs.XCBSScroller = XCBSScroller;
    __reflect(XCBSScroller.prototype, "xcbs.XCBSScroller");
})(xcbs || (xcbs = {}));
