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
    var SGWSScrollerItem = (function (_super) {
        __extends(SGWSScrollerItem, _super);
        // public aniItem: SDMNAniItem;
        function SGWSScrollerItem() {
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
        SGWSScrollerItem.prototype.startDownTimeOut = function (time, result) {
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
        SGWSScrollerItem.prototype.clearDownTimeOut = function () {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        };
        SGWSScrollerItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.scatterAni.visible = false;
        };
        SGWSScrollerItem.prototype.initSize = function (size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex;
        };
        SGWSScrollerItem.prototype.startRun = function () {
            this.resetPosition();
            this.rollCount = 0;
            this.speed = game.LaohuUtils.speed;
            this.runModel = RUN_MODEL.LOOP;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].alpha = 1;
                this.icons[i].hideDbComponent();
            }
        };
        /**
         * 根据服务器传来解析的转轴结果赋值
         * @param  {} result
         */
        SGWSScrollerItem.prototype.changeResult = function (result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var icons = _.sortBy(this.icons, "y");
            icons[0].changeSourceByNameValue("sgws", result[0]);
            icons[1].changeSourceByNameValue("sgws", result[1]);
            icons[2].changeSourceByNameValue("sgws", result[2]);
            this.iconList[0] = icons[0];
            this.iconList[1] = icons[1];
            this.iconList[2] = icons[2];
            this.stopIcon = icons[3];
            this.topIcon = icons[0];
            this.stopY = (this.rollCount + 1) * 866; //- Number(this.stopIcon.name) * 172
            this.runModel = RUN_MODEL.RESULT;
        };
        /**
         * @param  {} index
         * @param  {string} str
         */
        SGWSScrollerItem.prototype.changeFoguang = function (index, str) {
            var icons = _.sortBy(this.icons, "y");
            icons[index + 5].addScatter(str);
        };
        SGWSScrollerItem.prototype.changeFoguang1 = function (index, str) {
            this.iconList[index].addScatter1(str);
        };
        SGWSScrollerItem.prototype.resetPosition = function () {
            var y = this.y;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        };
        SGWSScrollerItem.prototype.itemDown = function () {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                var y = this.y;
                var point = this.stopIcon.y - 151;
                if (y + point >= 295) {
                    var cha = y + point - 295;
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
                    icon.y = last.y - 151;
                    if (icon.name == "7") {
                        this.rollCount += 1;
                    }
                }
            }
        };
        /**
         * @param  {Array<number>} index 消除图标所在位置
         * @param  {} length   此列消除图标数量
         * @param  {} spinResult 落下的图标值
         */
        SGWSScrollerItem.prototype.updateScrollerItem = function (index, length, spinResult) {
            this.eliminateIconsY = [];
            var icon1 = this.findLast();
            for (var i = 0; i < length; i++) {
                this.icons[4 - i].changeSourceByNameValue("sgws", spinResult[length - i - 1]);
                this.addChild(this.icons[i]);
            }
            for (var i = index.length - 1; i >= 0; i--) {
                var icon = this.iconList[index[i]];
                this.eliminateIconsY.push(icon.y);
                var last = this.findLast();
                icon.y = last.y - 151;
                this.addChild(icon);
                this.sortIcons();
            }
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                var iconDownY = this.iconDownDis(icon.y);
                egret.Tween.get(icon).to({ y: icon.y + iconDownY }, 250, egret.Ease.backOut);
                this.addChild(icon);
            }
            this.sortIcons();
            this.iconList[2] = this.icons[7];
            this.iconList[1] = this.icons[6];
            this.iconList[0] = this.icons[5];
        };
        /**
         * 图标消除后下降距离
         */
        SGWSScrollerItem.prototype.iconDownDis = function (y) {
            var count = 0;
            for (var i = 0; i < this.eliminateIconsY.length; i++) {
                if (y < this.eliminateIconsY[i])
                    count++;
            }
            return 151 * count;
        };
        SGWSScrollerItem.prototype.findLast = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        SGWSScrollerItem.prototype.findMax = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y > returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        SGWSScrollerItem.prototype.fixPos = function () {
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
        SGWSScrollerItem.prototype.showAni = function (index, dir1, dir2, dir3, dir4) {
            var data = this.iconList[index];
            data.showSdDbComponet();
            this.addChild(data);
        };
        SGWSScrollerItem.prototype.showdiAni = function (index) {
            var data = this.iconList[index];
            data.showDiComp();
            this.addChild(data);
        };
        SGWSScrollerItem.prototype.stopdiAni = function (index) {
            var data = this.iconList[index];
            data.stopDiCom();
        };
        SGWSScrollerItem.prototype.smashingDB = function (index, time) {
            var data = this.iconList[index];
            data.showSmashingDB(time);
            this.addChild(data);
        };
        SGWSScrollerItem.prototype.removeSmash = function () {
            for (var i = 0; i < this.icons.length; i++) {
                if (this.icons[i]) {
                    var icon = this.icons[i].stopDiCom();
                }
            }
        };
        SGWSScrollerItem.prototype.stopAni = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                if (this.iconList[i]) {
                    var icon = this.iconList[i].stopDbComponet();
                }
            }
            // let data = 
        };
        /**
         * 初始化
         */
        SGWSScrollerItem.prototype.getLineArr = function () {
            var countArr = [];
            for (var i = 1; i <= 11; i++) {
                var count = Math.floor(_.random(4, 6));
                for (var j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        };
        SGWSScrollerItem.prototype.createIcons = function (firstArr) {
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
                var arr = new sgws.SGWSIcon();
                arr.changeSourceByNameValue("sgws", iconData);
                // arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (151 * (i + 1)) - 10;
                if (i == 0) {
                    this.minYIndex = arr.y + 151 + 97;
                }
                this.icons.push(arr);
            }
        };
        SGWSScrollerItem.prototype.setIconHui = function () {
            for (var i = 0; i < this.icons.length; i++) {
                if (this.icons[i]) {
                    var icon = this.icons[i].showRect();
                }
            }
        };
        SGWSScrollerItem.prototype.resetSpecilHui = function () {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i].hideRect();
            }
        };
        SGWSScrollerItem.prototype.resetIconHui = function (index) {
            var data = this.iconList[index];
            data.hideRect();
        };
        SGWSScrollerItem.prototype.setSpecilHui = function (index) {
            var data = this.iconList[index];
            data.showRect();
        };
        SGWSScrollerItem.prototype.sotr1 = function () {
            this.sortIcons();
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.findLast();
                if (this.icons[i].y >= this.stopIcon.y) {
                    this.icons[i].y = icon.y - 151;
                }
                this.addChild(this.icons[i]);
            }
            this.sortIcons();
        };
        SGWSScrollerItem.prototype.sortIcons = function () {
            this.icons = _.sortBy(this.icons, "y");
            for (var i = 0; i < this.icons.length; i++) {
                this.addChild(this.icons[i]);
            }
        };
        SGWSScrollerItem.prototype.hideItem = function () {
        };
        return SGWSScrollerItem;
    }(eui.Component));
    sgws.SGWSScrollerItem = SGWSScrollerItem;
    __reflect(SGWSScrollerItem.prototype, "sgws.SGWSScrollerItem");
})(sgws || (sgws = {}));
