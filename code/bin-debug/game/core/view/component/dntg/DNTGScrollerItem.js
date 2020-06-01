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
 * @Date: 2019-04-19 17:45:56
 * @Last Modified by: wangtao
 * @Last Modified time: 2019-04-19 17:50:27
 * @Description:
 */
var dntg;
(function (dntg) {
    var DNTGScrollerItem = (function (_super) {
        __extends(DNTGScrollerItem, _super);
        function DNTGScrollerItem() {
            var _this = _super.call(this) || this;
            _this.icons = [];
            // -1 停止 1 无限循环 0停止
            _this.runModel = 0;
            _this.iconList = []; //scroller图标数组
            _this.result = []; //结果数组
            _this.minYIndex = 0;
            _this.moveX = 0;
            _this.rollCount = 0;
            _this.speed = 48;
            return _this;
        }
        /**
         * 转动结束替换图标
         * @param  {} time
         * @param  {} result
         */
        DNTGScrollerItem.prototype.startDownTimeOut = function (time, result) {
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
        DNTGScrollerItem.prototype.removeitem = function () {
            this.removeChildren();
            for (var i = 0; i < this.iconList.length; i++) {
                this.iconList[i].clearIcon();
            }
        };
        /**
         * downTimeout移除
         */
        DNTGScrollerItem.prototype.clearDownTimeOut = function () {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        };
        DNTGScrollerItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.scatterAni.visible = false;
        };
        /**
         * 初始化scrolleritem
         * @param  {} size
         * @param  {} index
         * @param  {} sceneIndex
         */
        DNTGScrollerItem.prototype.initSize = function (size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex;
        };
        /**
         * 开始转动
         */
        DNTGScrollerItem.prototype.startRun = function () {
            this.resetPosition();
            this.rollCount = 0;
            this.speed = game.LaohuUtils.speed;
            this.runModel = RUN_MODEL.LOOP;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].hideDbComponent();
            }
        };
        /**
         * 收到消息替换结果
         * @param  {} result
         */
        DNTGScrollerItem.prototype.changeResult = function (result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var icons = _.sortBy(this.icons, "y");
            icons[1].changeSouceByValue(result[0]);
            icons[2].changeSouceByValue(result[1]);
            icons[3].changeSouceByValue(result[2]);
            this.iconList[0] = icons[1];
            this.iconList[1] = icons[2];
            this.iconList[2] = icons[3];
            this.stopIcon = icons[4];
            this.stopY = (this.rollCount + 1) * 866; //- Number(this.stopIcon.name) * 172
            this.runModel = RUN_MODEL.RESULT;
        };
        /**
         * 满足部分scatter条件，scatter图标动画
         * @param  {} index
         * @param  {string} str
         */
        DNTGScrollerItem.prototype.changeFoguang = function (index, str) {
            var icons = _.sortBy(this.icons, "y");
            icons[index + 1].showFoguang(str);
        };
        /**
         * 转动完成调整图标位置
         */
        DNTGScrollerItem.prototype.resetPosition = function () {
            var y = this.y;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        };
        /**
         * icon下落
         */
        DNTGScrollerItem.prototype.itemDown = function () {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                var y = this.y;
                var point = this.stopIcon.y - 172;
                if (y + point >= 338) {
                    var cha = y + point - 338;
                    this.runModel = RUN_MODEL.STOP;
                    this.y -= cha;
                    this.fixPos();
                    CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                    //修正坐标
                    return;
                }
                // if (point.y > 510 + 93) {
                // 	let cha = point.y - (510 + 93);
                // 	this.runModel = RUN_MODEL.STOP;
                // 	this.y -= cha;
                // 	this.fixPos();
                // 	//修正坐标
                // 	return;
                // }
            }
            this.y += this.speed;
            for (var i = 0; i < arr.length; i++) {
                var icon = arr[i];
                var point = icon.localToGlobal();
                if (point.y >= 800 && this.runModel == RUN_MODEL.LOOP) {
                    var last = this.findLast();
                    // last.changeRamdom();
                    icon.y = last.y - 172;
                    if (icon.name == "7") {
                        this.rollCount += 1;
                    }
                }
            }
        };
        /**
         * 最后一个icon位置
         */
        DNTGScrollerItem.prototype.findLast = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        /**
         * 依据最后图标位置调整其他图标位置
         */
        DNTGScrollerItem.prototype.fixPos = function () {
            //icons 可以做特效
            var y = this.y;
            this.y += 30;
            egret.Tween.get(this).to({
                y: y
            }, 330);
        };
        /**
         * 展示图标中奖连线
         * @param  {} index
         * @param  {} times
         */
        DNTGScrollerItem.prototype.showAni = function (index, times) {
            var data = this.iconList[index];
            data.showDbComponent();
        };
        /**
         * 中间动画移除
         */
        DNTGScrollerItem.prototype.stopAni = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                var icon = this.iconList[i].stopDbComponet();
            }
            // let data = 
        };
        /**
         * 初始化
         */
        DNTGScrollerItem.prototype.getLineArr = function () {
            var countArr = [];
            for (var i = 1; i <= 12; i++) {
                var count = Math.floor(_.random(4, 6));
                for (var j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        };
        /**
         * 创建item上的图标
         * @param  {} firstArr
         */
        DNTGScrollerItem.prototype.createIcons = function (firstArr) {
            var lineArr = this.getLineArr();
            if (firstArr.length > 0) {
                lineArr = lineArr.slice(firstArr.length, lineArr.length);
                lineArr = firstArr.concat(lineArr);
            }
            for (var i = 0; i < lineArr.length; i++) {
                var iconData = lineArr[i];
                var arr = new dntg.DNTGIcon();
                arr.changeSouceByValue(iconData);
                arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (172 * (i + 1));
                if (i == 0) {
                    this.minYIndex = arr.y + 172 + 90;
                }
                this.icons.push(arr);
            }
        };
        return DNTGScrollerItem;
    }(eui.Component));
    dntg.DNTGScrollerItem = DNTGScrollerItem;
    __reflect(DNTGScrollerItem.prototype, "dntg.DNTGScrollerItem");
})(dntg || (dntg = {}));
// 转动条件
var RUN_MODEL;
(function (RUN_MODEL) {
    RUN_MODEL[RUN_MODEL["STOP"] = 0] = "STOP";
    RUN_MODEL[RUN_MODEL["LOOP"] = 1] = "LOOP";
    RUN_MODEL[RUN_MODEL["RESULT"] = 2] = "RESULT";
})(RUN_MODEL || (RUN_MODEL = {}));
