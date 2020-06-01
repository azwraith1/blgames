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
 * @Author: wangtao
 * @Date: 2019-04-19 17:51:03
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-20 15:34:10
 * @Description:
 */
var dntg;
(function (dntg) {
    var DNTGScroller = (function (_super) {
        __extends(DNTGScroller, _super);
        function DNTGScroller() {
            var _this = _super.call(this) || this;
            _this.itemSize1 = 8;
            _this.itemSize2 = 8;
            _this.itemSize3 = 8;
            _this.itemSize4 = 8;
            _this.itemSize5 = 8;
            _this.overIndex = 0;
            _this.speed = 48;
            _this.lastClick = false;
            _this.isRun = false; //判断转轴是否再转动
            _this.overIndexes = [];
            return _this;
        }
        DNTGScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        DNTGScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        /**
         * 转动时每帧更新图标位置
         * @param  {egret.Event} e
         */
        DNTGScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        /**
         * 调用item内停止图标动画的方法
         */
        DNTGScroller.prototype.stopIconDb = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].stopAni();
            }
        };
        /**
         * scroller转动
         */
        DNTGScroller.prototype.run = function () {
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
         * 免费游戏转动
         */
        DNTGScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        /**
         * 快速停止
         */
        DNTGScroller.prototype.runResultFast = function () {
            //满足收到消息的条件
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
            }
        };
        /**
         * 正常转动结束替换图标
         * @param  {} resultArr
         */
        DNTGScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        /**
         * 调用item内scatter动画的方法
         * @param  {} item
         * @param  {} index
         * @param  {} str
         */
        DNTGScroller.prototype.addFoGuang = function (item, index, str) {
            this["item" + item].changeFoguang(index, str);
        };
        /**
         * 替换每个item的图标结果
         * @param  {} index
         */
        DNTGScroller.prototype.changeResultByIndex = function (index) {
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
         * 根据index更换每列的转动速度
         * @param  {} index
         */
        DNTGScroller.prototype.changeSpeedByIndex = function (index) {
            switch (index) {
                case 1:
                    return 48 * 1;
                case 2:
                    return 48 * 1.1;
                case 3:
                    return 48 * 1.11;
                case 4:
                    return 48 * 1.12;
                case 5:
                    return 48 * 1.13;
            }
        };
        DNTGScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent("fire_flow");
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;
            // this.addChild(this.scatterAni);
        };
        /**
         * 转动前初始化图标数量
         * @param  {} sceneIndex
         */
        DNTGScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        DNTGScroller.prototype.removeScroller = function () {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i].removeitem();
            }
            this.scroller.removeChildren();
        };
        /**
         * 初始化item
         * @param  {} index
         * @param  {} firstArr
         */
        DNTGScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        /**
         * 根据条件给每列移除不符合条件的图标
         * @param  {} excludeValue
         */
        DNTGScroller.prototype.getLine3Icon = function (excludeValue) {
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
         * 第四第五列加速特效
         * @param  {number} index
         */
        DNTGScroller.prototype.addScatterAni = function (index) {
            switch (index) {
                case 4:
                    this.scatterAni.x = 630;
                    this.scatterAni.y = 255;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", -1);
                    break;
                case 5:
                    this.scatterAni.x = 806;
                    this.scatterAni.y = 255;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", -1);
                    break;
            }
        };
        DNTGScroller.prototype.addScore = function (index) {
            // this.item3.showScore(index);
        };
        /**
         * 调用item的展示连线方法
         * @param  {Array<Array<number>>} allline
         * @param  {number} allscore
         */
        DNTGScroller.prototype.addBonusAni = function (allline, allscore) {
            for (var i = 1; i <= allline.length; i++) {
                for (var j = 0; j < allline[i - 1].length; j++) {
                    this["item" + i].showAni(allline[i - 1][j]);
                }
            }
        };
        /**
         * 移除连线动画
         * @param  {} index?
         */
        DNTGScroller.prototype.removeScatterAni = function (index) {
            if (this.scatterAni.parent && this.scatterAni) {
                this.scatterAni.parent.removeChild(this.scatterAni);
            }
        };
        /**
         * 进入游戏时显示的初始图标
         * @param  {} sceneIndex
         */
        DNTGScroller.prototype.showFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(1));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(0));
            this.initItemByFirst(4, this.getLine3Icon(2));
            this.initItemByFirst(5, this.getLine3Icon(1));
        };
        /**
         * 免费游戏显示的初始图标
         * @param  {} sceneIndex
         */
        DNTGScroller.prototype.showFreeFirst = function (sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(2));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(2));
            this.initItemByFirst(4, this.getLine3Icon(2));
            this.initItemByFirst(5, this.getLine3Icon(2));
        };
        return DNTGScroller;
    }(game.BaseUI));
    dntg.DNTGScroller = DNTGScroller;
    __reflect(DNTGScroller.prototype, "dntg.DNTGScroller");
})(dntg || (dntg = {}));
