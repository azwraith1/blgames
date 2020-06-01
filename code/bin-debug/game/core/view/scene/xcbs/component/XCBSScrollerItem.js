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
var xcbs;
(function (xcbs) {
    var XCBSScrollerItem = (function (_super) {
        __extends(XCBSScrollerItem, _super);
        // public aniItem: SDMNAniItem;
        function XCBSScrollerItem() {
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
        XCBSScrollerItem.prototype.startDownTimeOut = function (time, result) {
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
        XCBSScrollerItem.prototype.clearDownTimeOut = function () {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        };
        XCBSScrollerItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.scatterAni.visible = false;
        };
        XCBSScrollerItem.prototype.initSize = function (size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex;
        };
        XCBSScrollerItem.prototype.startRun = function () {
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
        XCBSScrollerItem.prototype.changeResult = function (result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var icons = _.sortBy(this.icons, "y");
            icons[0].changeSourceByNameValue("xcbs", result[0]);
            icons[1].changeSourceByNameValue("xcbs", result[1]);
            icons[2].changeSourceByNameValue("xcbs", result[2]);
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
        XCBSScrollerItem.prototype.changeFoguang = function (index, str) {
            var icons = _.sortBy(this.icons, "y");
            icons[index + 5].addScatter(str);
        };
        XCBSScrollerItem.prototype.changeFoguang1 = function (index, str) {
            this.iconList[index].addScatter1(str);
        };
        XCBSScrollerItem.prototype.resetPosition = function () {
            var y = this.y;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        };
        XCBSScrollerItem.prototype.itemDown = function () {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                var y = this.y;
                var point = this.stopIcon.y - 180;
                if (y + point >= 355) {
                    var cha = y + point - 355;
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
                    icon.y = last.y - 180;
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
        XCBSScrollerItem.prototype.updateScrollerItem = function (index, length, spinResult) {
            this.eliminateIconsY = [];
            var icon1 = this.findLast();
            for (var i = 0; i < length; i++) {
                this.icons[4 - i].changeSourceByNameValue("xcbs", spinResult[length - i - 1]);
                this.addChild(this.icons[i]);
            }
            for (var i = index.length - 1; i >= 0; i--) {
                var icon = this.iconList[index[i]];
                this.eliminateIconsY.push(icon.y);
                var last = this.findLast();
                icon.y = last.y - 180;
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
        XCBSScrollerItem.prototype.iconDownDis = function (y) {
            var count = 0;
            for (var i = 0; i < this.eliminateIconsY.length; i++) {
                if (y < this.eliminateIconsY[i])
                    count++;
            }
            return 180 * count;
        };
        XCBSScrollerItem.prototype.findLast = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        XCBSScrollerItem.prototype.findMax = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y > returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        XCBSScrollerItem.prototype.fixPos = function () {
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
        XCBSScrollerItem.prototype.showAni = function (index, dir1, dir2, dir3, dir4) {
            var data = this.iconList[index];
            data.showSdDbComponet();
            this.addChild(data);
        };
        XCBSScrollerItem.prototype.smashingDB = function (index, time) {
            var data = this.iconList[index];
            data.showSmashingDB(time);
            this.addChild(data);
        };
        XCBSScrollerItem.prototype.stopAni = function () {
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
        XCBSScrollerItem.prototype.getLineArr = function () {
            var countArr = [];
            for (var i = 1; i <= 11; i++) {
                var count = Math.floor(_.random(4, 6));
                for (var j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        };
        XCBSScrollerItem.prototype.createIcons = function (firstArr) {
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
                var arr = new xcbs.XCBSIcon();
                arr.changeSourceByNameValue("xcbs", iconData);
                // arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (180 * (i + 1)) - 10;
                if (i == 0) {
                    this.minYIndex = arr.y + 180 + 97;
                }
                this.icons.push(arr);
            }
        };
        XCBSScrollerItem.prototype.setIconHui = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                if (this.iconList[i]) {
                    var icon = this.iconList[i].showRect();
                }
            }
        };
        XCBSScrollerItem.prototype.resetSpecilHui = function () {
            for (var i = 0; i < this.iconList.length; i++) {
                if (this.iconList[i].rect.visible) {
                    var icon = this.iconList[i].hideRect();
                }
            }
        };
        XCBSScrollerItem.prototype.resetIconHui = function (index) {
            var data = this.iconList[index];
            data.hideRect();
        };
        XCBSScrollerItem.prototype.setSpecilHui = function (index) {
            var data = this.iconList[index];
            data.showRect();
        };
        XCBSScrollerItem.prototype.sotr1 = function () {
            this.sortIcons();
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.findLast();
                if (this.icons[i].y >= this.stopIcon.y) {
                    this.icons[i].y = icon.y - 180;
                }
                this.addChild(this.icons[i]);
            }
            this.sortIcons();
        };
        XCBSScrollerItem.prototype.sortIcons = function () {
            this.icons = _.sortBy(this.icons, "y");
            for (var i = 0; i < this.icons.length; i++) {
                this.addChild(this.icons[i]);
            }
        };
        return XCBSScrollerItem;
    }(eui.Component));
    xcbs.XCBSScrollerItem = XCBSScrollerItem;
    __reflect(XCBSScrollerItem.prototype, "xcbs.XCBSScrollerItem");
})(xcbs || (xcbs = {}));
