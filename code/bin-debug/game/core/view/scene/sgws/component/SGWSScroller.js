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
var sgws;
(function (sgws) {
    var SGWSScroller = (function (_super) {
        __extends(SGWSScroller, _super);
        function SGWSScroller() {
            var _this = _super.call(this) || this;
            _this.aniName = "sgws_reel_fast";
            _this.strName = game.GDZWUtils.comm2FreeModel;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.itemSize4 = 8;
            _this.itemSize5 = 8;
            _this.overIndex = 0;
            _this.speed = 48;
            _this.aniX = [386, 544, 700];
            _this.aniY = [243, 243, 243];
            _this.flashIcon = [];
            _this.isRun = false;
            _this.overIndexes = [];
            _this.skinName = "SGWSScrollerSkin";
            return _this;
        }
        SGWSScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SGWSScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SGWSScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        SGWSScroller.prototype.run = function () {
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
        SGWSScroller.prototype.getLine3Icon = function (excludeValue) {
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
        SGWSScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        SGWSScroller.prototype.runResultFast = function () {
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
        SGWSScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        SGWSScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @param  {} sceneIndex
         */
        SGWSScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        SGWSScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        SGWSScroller.prototype.showScatterHideIcon = function () {
            for (var i = 1; i <= 5; i++) {
                this["item" + i].showScatterIcon();
            }
        };
        SGWSScroller.prototype.sort1 = function () {
            for (var i = 1; i <= 5; i++) {
                this["item" + i].sotr1();
            }
        };
        SGWSScroller.prototype.showFirst = function (sceneIndex) {
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
        SGWSScroller.prototype.showFreeFirst = function (sceneIndex) {
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
        SGWSScroller.prototype.eliminateIcons = function (allAtr, nextIcons) {
            var _this = this;
            var count = 0;
            async.eachSeries(allAtr, function (item, callback) {
                var items = _this["item" + (count + 1)].setIconHui();
                _this.eliminateTimeout = egret.setTimeout(function () {
                    _this["item" + (count + 1)].updateScrollerItem(allAtr[count], allAtr[count].length, nextIcons[count]);
                    count++;
                    callback && callback();
                }, _this, 100);
            }, function () {
                egret.clearTimeout(_this.eliminateTimeout);
                count = 0;
            });
        };
        /**
         * @param  {number} index
         */
        SGWSScroller.prototype.addScatterAni = function (index, fixPosition) {
            switch (index) {
                case 3:
                    this.scatterAni.x = this.aniX[0];
                    this.scatterAni.y = this.aniY[0];
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 4:
                    this.scatterAni.x = this.aniX[1];
                    this.scatterAni.y = this.aniY[1];
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 5:
                    this.scatterAni.x = this.aniX[2];
                    this.scatterAni.y = this.aniY[2];
                    this.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", 0);
                    break;
            }
        };
        SGWSScroller.prototype.smashHideIcon = function (item) {
            this["item" + (item + 1)].resetSpecilHui();
        };
        /**
         * index列不置灰
         * @param  {} index
         */
        SGWSScroller.prototype.setItemGray = function (index) {
            for (var i = 1; i <= 5; i++) {
                if (i != index + 1) {
                    this["itemrect" + i].visible = true;
                }
            }
        };
        SGWSScroller.prototype.resetItemGray = function () {
            for (var i = 1; i <= 5; i++) {
                this["itemrect" + i].visible = false;
            }
        };
        return SGWSScroller;
    }(game.BaseScroller));
    sgws.SGWSScroller = SGWSScroller;
    __reflect(SGWSScroller.prototype, "sgws.SGWSScroller");
})(sgws || (sgws = {}));
