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
    var XYSGScrollerItem = (function (_super) {
        __extends(XYSGScrollerItem, _super);
        function XYSGScrollerItem() {
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
        XYSGScrollerItem.prototype.startDownTimeOut = function (index, time, result) {
            var _this = this;
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
            this.downTimeout = new egret.Timer(time, 1);
            this.downTimeout.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                _this.changeResult(index, result);
            }, this);
            this.downTimeout.start();
        };
        XYSGScrollerItem.prototype.clearDownTimeOut = function () {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        };
        XYSGScrollerItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        XYSGScrollerItem.prototype.initSize = function (size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex;
        };
        XYSGScrollerItem.prototype.startRun = function () {
            this.resetPosition();
            this.rollCount = 0;
            this.speed = game.LaohuUtils.speed;
            this.runModel = RUN_MODEL.LOOP;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].x = 0;
                this.icons[i].hideDbComponent();
            }
        };
        /**
         * 根据服务器传来解析的转轴结果赋值
         * @param  {} result
         */
        XYSGScrollerItem.prototype.changeResult = function (index, result) {
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
                icons[1].changeSourceByNameValue("xysg", trueResult[0]);
                icons[2].changeSourceByNameValue("xysg", trueResult[1]);
                if (index == 1) {
                    icons[1].x = 15;
                    icons[2].x = 15;
                }
                if (index == 3) {
                    icons[1].x = 0;
                    icons[2].x = 0;
                }
                this.iconList[0] = icons[1];
                this.iconList[1] = icons[2];
                this.stopIcon = icons[3];
                this.stopY = (this.rollCount + 1) * 866; //- Number(this.stopIcon.name) * 172 
            }
            else {
                this.flag = false;
                icons[1].changeSourceByNameValue("xysg", trueResult[0]);
                icons[2].changeSourceByNameValue("xysg", trueResult[1]);
                icons[3].changeSourceByNameValue("xysg", trueResult[2]);
                if (index == 1) {
                    icons[1].x = 20;
                    icons[2].x = 0;
                    icons[3].x = 50;
                }
                if (index == 3) {
                    icons[1].x = -30;
                    icons[2].x = 0;
                    icons[3].x = -30;
                }
                this.iconList[0] = icons[1];
                this.iconList[1] = icons[2];
                this.iconList[2] = icons[3];
                this.stopIcon = icons[4];
                this.stopY = (this.rollCount + 1) * 866; //- Number(this.stopIcon.name) * 172                
            }
            this.runModel = RUN_MODEL.RESULT;
        };
        XYSGScrollerItem.prototype.resetPosition = function () {
            var y = this.y;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        };
        /**
         * 转轴转动
         */
        XYSGScrollerItem.prototype.itemDown = function (index) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var arr = this.icons;
            this.itemdownfunc();
            this.y += this.speed;
            for (var i = 0; i < arr.length; i++) {
                var icon = arr[i];
                var point = icon.localToGlobal();
                if (point.y >= 800 && this.runModel == RUN_MODEL.LOOP) {
                    var last = this.findLast();
                    icon.y = last.y - 237;
                    if (icon.name == "7") {
                        this.rollCount += 1;
                    }
                }
            }
        };
        XYSGScrollerItem.prototype.itemdownfunc = function () {
            if (this.runModel == RUN_MODEL.RESULT) {
                var y = this.y;
                var point = this.stopIcon.y - 237;
                if (this.flag) {
                    if (y + point >= 235) {
                        var cha = y + point - 235;
                        this.runModel = RUN_MODEL.STOP;
                        this.y -= cha;
                        this.fixPos();
                        CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                        //修正坐标
                        return;
                    }
                }
                else {
                    if (y + point >= 370) {
                        var cha = y + point - 370;
                        this.runModel = RUN_MODEL.STOP;
                        this.y -= cha;
                        this.fixPos();
                        CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                        //修正坐标
                        return;
                    }
                }
            }
        };
        XYSGScrollerItem.prototype.findLast = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        XYSGScrollerItem.prototype.fixPos = function () {
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
        XYSGScrollerItem.prototype.showAni = function (index, dir1, dir2, dir3, dir4) {
            var data = this.iconList[index];
            data.showSdDbComponet();
            this.addChild(data);
        };
        XYSGScrollerItem.prototype.stopAni = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                var icon = this.iconList[i].stopDbComponet();
            }
        };
        /**
         * 初始化
         */
        XYSGScrollerItem.prototype.getLineArr = function () {
            var countArr = [];
            for (var i = 1; i <= 3; i++) {
                var count = Math.floor(_.random(4, 6));
                for (var j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        };
        XYSGScrollerItem.prototype.createIcons = function (index, firstArr) {
            var lineArr = [];
            for (var i = 0; i < 8; i++) {
                lineArr.push(Math.ceil(Math.random() * 3));
            }
            for (var i = 0; i < lineArr.length; i++) {
                var iconData = lineArr[i];
                var arr = new xysg.XYSGIcon();
                arr.changeSourceByNameValue("xysg", iconData);
                arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (237 * i) - 100;
                if (index == 1) {
                    if (i == 0) {
                        arr.x = 50;
                    }
                    if (i == 2) {
                        arr.x = 20;
                    }
                }
                if (index == 3) {
                    if (i == 0 || i == 2) {
                        arr.x = -30;
                    }
                }
                if (i == 0) {
                    this.minYIndex = arr.y + 237 + 97;
                }
                this.icons.push(arr);
            }
        };
        return XYSGScrollerItem;
    }(eui.Component));
    xysg.XYSGScrollerItem = XYSGScrollerItem;
    __reflect(XYSGScrollerItem.prototype, "xysg.XYSGScrollerItem");
})(xysg || (xysg = {}));
