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
var rdsg;
(function (rdsg) {
    var RDSGScrollerItem = (function (_super) {
        __extends(RDSGScrollerItem, _super);
        // public aniItem: SDMNAniItem;
        function RDSGScrollerItem() {
            var _this = _super.call(this) || this;
            _this.icons = [];
            // -1 停止 1 无限循环 0停止
            _this.runModel = 0;
            _this.iconList = [];
            _this.result = [];
            _this.minYIndex = 0;
            _this.moveX = 0;
            _this.rollCount = 0;
            _this.speed = 48;
            return _this;
        }
        /**
         * 快速旋转停止
         * @param  {} time
         * @param  {} result
         */
        RDSGScrollerItem.prototype.startDownTimeOut = function (time, result) {
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
        RDSGScrollerItem.prototype.clearDownTimeOut = function () {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        };
        RDSGScrollerItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.scatterAni.visible = false;
        };
        RDSGScrollerItem.prototype.initSize = function (size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex;
        };
        RDSGScrollerItem.prototype.startRun = function () {
            this.resetPosition();
            this.rollCount = 0;
            this.speed = game.LaohuUtils.speed;
            this.runModel = RUN_MODEL.LOOP;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].hideDbComponent();
            }
        };
        RDSGScrollerItem.prototype.changeResult = function (result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var icons = _.sortBy(this.icons, "y");
            icons[1].changeSourceByNameValue("rdsg", result[0]);
            icons[2].changeSourceByNameValue("rdsg", result[1]);
            icons[3].changeSourceByNameValue("rdsg", result[2]);
            this.iconList[0] = icons[1];
            this.iconList[1] = icons[2];
            this.iconList[2] = icons[3];
            this.stopIcon = icons[4];
            this.stopY = (this.rollCount + 1) * 866; //- Number(this.stopIcon.name) * 172
            this.runModel = RUN_MODEL.RESULT;
        };
        /**
         * @param  {} index
         * @param  {string} str
         */
        RDSGScrollerItem.prototype.changeFoguang = function (index, str) {
            var icons = _.sortBy(this.icons, "y");
            icons[index + 1].addScatter(str);
        };
        RDSGScrollerItem.prototype.changeFoguang1 = function (index, str) {
            var icons = _.sortBy(this.icons, "y");
            icons[index + 1].addScatter1(str);
        };
        RDSGScrollerItem.prototype.resetPosition = function () {
            var y = this.y;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        };
        RDSGScrollerItem.prototype.itemDown = function () {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                var y = this.y;
                var point = this.stopIcon.y - 163;
                if (y + point >= 330) {
                    var cha = y + point - 330;
                    this.runModel = RUN_MODEL.STOP;
                    this.y -= cha;
                    this.fixPos();
                    CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                    //修正坐标
                    return;
                }
            }
            this.y += this.speed;
            for (var i = 0; i < arr.length; i++) {
                var icon = arr[i];
                var point = icon.localToGlobal();
                if (point.y >= 800 && this.runModel == RUN_MODEL.LOOP) {
                    var last = this.findLast();
                    // last.changeRamdom();
                    icon.y = last.y - 163;
                    if (icon.name == "7") {
                        this.rollCount += 1;
                    }
                }
            }
        };
        RDSGScrollerItem.prototype.findLast = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        RDSGScrollerItem.prototype.fixPos = function () {
            //icons 可以做特效
            var y = this.y;
            this.y += 30;
            egret.Tween.get(this).to({
                y: y
            }, 330);
        };
        RDSGScrollerItem.prototype.showAni = function (index, dir1, dir2, dir3, dir4) {
            var data = this.iconList[index];
            data.showSdDbComponet(dir1, dir2, dir3, dir4);
            // this.aniItem.showIconAni(index);
            // if (!this.aniItem) {
            // 	this.addChild(this.aniItem);
            // }
            this.addChild(data);
        };
        RDSGScrollerItem.prototype.stopAni = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                var icon = this.iconList[i].stopDbComponet();
            }
            // let data = 
        };
        RDSGScrollerItem.prototype.setIconHui = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                var icon = this.iconList[i].showRect();
            }
        };
        RDSGScrollerItem.prototype.resetSpecilHui = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                if (this.iconList[i].rect.visible) {
                    var icon = this.iconList[i].hideRect();
                }
            }
        };
        RDSGScrollerItem.prototype.resetIconHui = function (index) {
            var data = this.iconList[index];
            data.hideRect();
        };
        RDSGScrollerItem.prototype.setSpecilHui = function (index) {
            var data = this.iconList[index];
            data.showRect();
        };
        RDSGScrollerItem.prototype.removeitem = function () {
            this.removeChildren();
            for (var i = 0; i < this.iconList.length; i++) {
                this.iconList[i].clearIcon();
            }
        };
        /**
         * 初始化
         */
        RDSGScrollerItem.prototype.getLineArr = function () {
            var countArr = [];
            for (var i = 1; i <= 12; i++) {
                var count = Math.floor(_.random(4, 6));
                for (var j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        };
        RDSGScrollerItem.prototype.createIcons = function (firstArr) {
            var lineArr = this.getLineArr();
            if (firstArr.length > 0) {
                lineArr = lineArr.slice(firstArr.length, lineArr.length);
                lineArr = firstArr.concat(lineArr);
            }
            // if (!this.aniItem) {
            // 	this.aniItem = new SDMNAniItem();
            // 	this.aniItem.x = this.aniItem.y = 0;
            // 	this.aniItem.width = 202;
            // 	this.aniItem.height = 540;
            // 	this.addChild(this.aniItem);
            // }
            for (var i = 0; i < lineArr.length; i++) {
                var iconData = lineArr[i];
                var arr = new rdsg.RDSGIcon();
                arr.changeSourceByNameValue("rdsg", iconData);
                arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (163 * (i + 1));
                if (i == 0) {
                    this.minYIndex = arr.y + 163 + 97;
                }
                this.icons.push(arr);
            }
        };
        return RDSGScrollerItem;
    }(eui.Component));
    rdsg.RDSGScrollerItem = RDSGScrollerItem;
    __reflect(RDSGScrollerItem.prototype, "rdsg.RDSGScrollerItem");
})(rdsg || (rdsg = {}));
