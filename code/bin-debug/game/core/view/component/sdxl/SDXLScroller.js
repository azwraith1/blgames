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
var sdxl;
(function (sdxl) {
    var SDXLScroller = (function (_super) {
        __extends(SDXLScroller, _super);
        function SDXLScroller() {
            var _this = _super.call(this) || this;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.itemSize4 = 8;
            _this.itemSize5 = 8;
            _this.overIndex = 0;
            _this.speed = 48;
            _this.lastClick = false;
            _this.isRun = false;
            _this.overIndexes = [];
            _this.skinName = new SDXLScrollerSkin();
            return _this;
        }
        SDXLScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SDXLScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SDXLScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        SDXLScroller.prototype.stopIconDb = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].stopAni();
            }
        };
        /**
         * 转动
         */
        SDXLScroller.prototype.run = function () {
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
        SDXLScroller.prototype.removeScroller = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].removeitem();
            }
            this.scroller.removeChildren();
        };
        /**
         * 免费游戏转动
         */
        SDXLScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        /**
         * 快速转动结果
         */
        SDXLScroller.prototype.runResultFast = function () {
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
         * 将转动结果resultAtr替换成转轴结果
         * @param  {} resultArr
         */
        SDXLScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        /**
         * 中了scatter的特效
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        SDXLScroller.prototype.addFoGuang = function (item, index, str) {
            this["item" + item].changeFoguang(index, str);
        };
        /**
         * 可能中scatter的scatter特效
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        SDXLScroller.prototype.addFoGuang1 = function (item, index, str) {
            this["item" + item].changeFoguang1(index, str);
        };
        /**
         * 更改index列转动结果
         * @param  {} index
         */
        SDXLScroller.prototype.changeResultByIndex = function (index) {
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
        /**
         * 改变index列速度
         * @param  {} index
         */
        SDXLScroller.prototype.changeSpeedByIndex = function (index) {
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
        SDXLScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent("sdxl_scatterkuang");
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;
            // this.addChild(this.scatterAni);
        };
        /**
         * 初始化每列图表数量
         * @param  {} sceneIndex
         */
        SDXLScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * 初始化每列图标
         * @param  {} index
         * @param  {} firstArr
         */
        SDXLScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        /**
         * 生成一列除excludeValue以外的转轴图标数组
         * @param  {} excludeValue
         */
        SDXLScroller.prototype.getLine3Icon = function (excludeValue) {
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
         * scatter加速特效
         * @param  {number} index
         */
        SDXLScroller.prototype.addScatterAni = function (index) {
            switch (index) {
                case 4:
                    this.scatterAni.x = 700;
                    this.scatterAni.y = 260;
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", -1);
                    break;
                case 5:
                    this.scatterAni.x = 900;
                    this.scatterAni.y = 260;
                    this.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", -1);
                    break;
            }
        };
        /**
         * @param  {Array<Array<number>>} allline
         * @param  {number} allscore
         */
        SDXLScroller.prototype.addBonusAni = function (allline, allscore) {
            for (var i = 1; i <= allline.length; i++) {
                for (var j = 0; j < allline[i - 1].length; j++) {
                    this["item" + i].showAni(allline[i - 1][j]);
                }
            }
        };
        /**
         * 图标置灰
         */
        SDXLScroller.prototype.setIconHui = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].setIconHui();
            }
        };
        /**
         * 移除置灰
         * @param  {Array<Array<number>>} array
         */
        SDXLScroller.prototype.removeIconHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].resetIconHui(array[i - 1][j]);
                }
            }
        };
        /**
         * 特殊图标置灰
         * @param  {Array<Array<number>>} array
         */
        SDXLScroller.prototype.setSpecilHui = function (array) {
            for (var i = 1; i <= array.length; i++) {
                for (var j = 0; j < array[i - 1].length; j++) {
                    this["item" + i].setSpecilHui(array[i - 1][j]);
                }
            }
        };
        /**
         * @param  {} index?
         */
        SDXLScroller.prototype.removeScatterAni = function (index) {
            if (this.scatterAni.parent && this.scatterAni) {
                this.scatterAni.parent.removeChild(this.scatterAni);
            }
        };
        /**
         * 初始化游戏图标
         * @param  {} sceneIndex
         */
        SDXLScroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            // this.initItemByFirst(1, [2, 2, 2, 2, 2, 2, 2, 2]);
            // this.initItemByFirst(2, [2, 2, 2, 2, 2, 2, 2, 2]);
            // this.initItemByFirst(3, [2, 2, 2, 2, 2, 2, 2, 2]);
            // this.initItemByFirst(4, [2, 2, 2, 2, 2, 2, 2, 2]);
            // this.initItemByFirst(5, [2, 2, 2, 2, 2, 2, 2, 2]);
            this.initItemByFirst(1, this.getLine3Icon(1));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(0));
            this.initItemByFirst(4, this.getLine3Icon(2));
            this.initItemByFirst(5, this.getLine3Icon(1));
        };
        /**
         * 免费游戏初始化图标
         * @param  {} sceneIndex
         */
        SDXLScroller.prototype.showFreeFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(2));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(2));
            this.initItemByFirst(4, this.getLine3Icon(2));
            this.initItemByFirst(5, this.getLine3Icon(2));
        };
        return SDXLScroller;
    }(game.BaseUI));
    sdxl.SDXLScroller = SDXLScroller;
    __reflect(SDXLScroller.prototype, "sdxl.SDXLScroller");
})(sdxl || (sdxl = {}));
