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
    var LUCKY7ScrollerItem = (function (_super) {
        __extends(LUCKY7ScrollerItem, _super);
        function LUCKY7ScrollerItem() {
            var _this = _super.call(this) || this;
            _this.icons = [];
            // -1 停止 1 无限循环 0停止
            _this.runModel = 0;
            _this.iconList = [];
            _this.result = [];
            _this.minYIndex = 0;
            _this.moveX = 0;
            _this.rollCount = 0;
            _this.speed = 50;
            _this.flag = false; //是否中了鲤鱼
            return _this;
        }
        /**
         * 快速旋转停止
         * @param  {} time
         * @param  {} result
         */
        LUCKY7ScrollerItem.prototype.startDownTimeOut = function (time, result) {
            var _this = this;
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
            this.downTimeout = new egret.Timer(time, 1);
            this.downTimeout.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                _this.changeResult(result);
            }, this);
            this.downTimeout.start();
        };
        LUCKY7ScrollerItem.prototype.clearDownTimeOut = function () {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        };
        LUCKY7ScrollerItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        LUCKY7ScrollerItem.prototype.initSize = function (size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex;
        };
        LUCKY7ScrollerItem.prototype.startRun = function () {
            this.resetPosition();
            this.rollCount = 0;
            this.speed = game.LaohuUtils.speed;
            this.runModel = RUN_MODEL.LOOP;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].hideDbComponent();
            }
        };
        /**
         * 根据服务器传来解析的转轴结果赋值
         * @param  {} result
         */
        LUCKY7ScrollerItem.prototype.changeResult = function (result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var icons = _.sortBy(this.icons, "y");
            var trueResult = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i] != 0) {
                    trueResult.push(result[i]);
                }
            }
            if (result[0] == 0) {
                this.flag = true;
                icons[1].changeSourceByNameValue("lucky7", trueResult[0]);
                icons[2].changeSourceByNameValue("lucky7", trueResult[1]);
                this.iconList[0] = icons[1];
                this.iconList[1] = icons[2];
                this.stopIcon = icons[3];
                this.stopY = (this.rollCount + 1) * 866; //- Number(this.stopIcon.name) * 172 
            }
            else {
                this.flag = false;
                icons[1].changeSourceByNameValue("lucky7", trueResult[0]);
                icons[2].changeSourceByNameValue("lucky7", trueResult[1]);
                icons[3].changeSourceByNameValue("lucky7", trueResult[2]);
                this.iconList[0] = icons[1];
                this.iconList[1] = icons[2];
                this.iconList[2] = icons[3];
                this.stopIcon = icons[4];
                this.stopY = (this.rollCount + 1) * 866; //- Number(this.stopIcon.name) * 172                
            }
            this.runModel = RUN_MODEL.RESULT;
        };
        LUCKY7ScrollerItem.prototype.resetPosition = function () {
            var y = this.y;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        };
        /**
         * 转轴转动
         */
        LUCKY7ScrollerItem.prototype.itemDown = function () {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                var y = this.y;
                var point = this.stopIcon.y - 247;
                //没中
                if (this.flag) {
                    if (y + point >= 298) {
                        var cha = y + point - 298;
                        this.runModel = RUN_MODEL.STOP;
                        this.y -= cha;
                        this.fixPos();
                        CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                        //修正坐标
                        return;
                    }
                }
                else {
                    if (y + point >= 435) {
                        var cha = y + point - 435;
                        this.runModel = RUN_MODEL.STOP;
                        this.y -= cha;
                        this.fixPos();
                        CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                        //修正坐标
                        return;
                    }
                }
            }
            this.y += this.speed;
            for (var i = 0; i < arr.length; i++) {
                var icon = arr[i];
                var point = icon.localToGlobal();
                if (point.y >= 800 && this.runModel == RUN_MODEL.LOOP) {
                    var last = this.findLast();
                    icon.y = last.y - 247;
                    if (icon.name == "7") {
                        this.rollCount += 1;
                    }
                }
            }
        };
        LUCKY7ScrollerItem.prototype.findLast = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        LUCKY7ScrollerItem.prototype.fixPos = function () {
            //icons 可以做特效
            var y = this.y;
            this.y += 30;
            egret.Tween.get(this).to({
                y: y
            }, 330);
        };
        /**
         * 根据中奖数组播放icon的特效
         * @param  {} index
         * @param  {number} dir1?
         * @param  {number} dir2?
         * @param  {number} dir3?
         * @param  {number} dir4?
         */
        LUCKY7ScrollerItem.prototype.showAni = function (index, dir1, dir2, dir3, dir4) {
            var data = this.iconList[index];
            data.showSdDbComponet();
            this.addChild(data);
        };
        LUCKY7ScrollerItem.prototype.stopAni = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                var icon = this.iconList[i].stopDbComponet();
            }
        };
        /**
         * 初始化
         */
        LUCKY7ScrollerItem.prototype.getLineArr = function () {
            var countArr = [];
            for (var i = 1; i <= 3; i++) {
                var count = Math.floor(_.random(4, 6));
                for (var j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        };
        LUCKY7ScrollerItem.prototype.createIcons = function (firstArr) {
            // let lineArr = this.getLineArr();
            // if (firstArr.length > 0) {
            //     lineArr = lineArr.slice(firstArr.length, lineArr.length);
            //     lineArr = firstArr.concat(lineArr);
            // }
            var lineArr = [];
            for (var i = 0; i < 8; i++) {
                lineArr.push(Math.ceil(Math.random() * 3));
            }
            for (var i = 0; i < lineArr.length; i++) {
                var iconData = lineArr[i];
                var arr = new lucky7.LUCKY7Icon();
                arr.changeSourceByNameValue("lucky7", iconData);
                arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (247 * i) - 100;
                if (i == 0) {
                    this.minYIndex = arr.y + 247 + 97;
                }
                this.icons.push(arr);
            }
        };
        return LUCKY7ScrollerItem;
    }(eui.Component));
    lucky7.LUCKY7ScrollerItem = LUCKY7ScrollerItem;
    __reflect(LUCKY7ScrollerItem.prototype, "lucky7.LUCKY7ScrollerItem");
})(lucky7 || (lucky7 = {}));
