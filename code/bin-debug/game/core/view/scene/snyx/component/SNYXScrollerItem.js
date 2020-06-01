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
var snyx;
(function (snyx) {
    var SNYXScrollerItem = (function (_super) {
        __extends(SNYXScrollerItem, _super);
        // public aniItem: SDMNAniItem;
        function SNYXScrollerItem() {
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
        SNYXScrollerItem.prototype.startDownTimeOut = function (time, result) {
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
        SNYXScrollerItem.prototype.clearDownTimeOut = function () {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        };
        SNYXScrollerItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.scatterAni.visible = false;
        };
        SNYXScrollerItem.prototype.initSize = function (size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex;
        };
        SNYXScrollerItem.prototype.startRun = function () {
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
        SNYXScrollerItem.prototype.changeResult = function (result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            var icons = _.sortBy(this.icons, "y");
            icons[0].changeSourceByNameValue("snyx", result[0]);
            icons[1].changeSourceByNameValue("snyx", result[1]);
            icons[2].changeSourceByNameValue("snyx", result[2]);
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
        SNYXScrollerItem.prototype.changeFoguang = function (index, str) {
            // let icons = _.sortBy(this.icons, "y");
            this.iconList[index].addScatter(str);
        };
        SNYXScrollerItem.prototype.changeFoguang1 = function (index, str) {
            this.iconList[index].addScatter1(str);
        };
        SNYXScrollerItem.prototype.resetPosition = function () {
            var y = this.y;
            for (var i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        };
        SNYXScrollerItem.prototype.itemDown = function () {
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
        SNYXScrollerItem.prototype.findLast = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        SNYXScrollerItem.prototype.findMax = function () {
            var returnIcon = this.icons[0];
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                if (icon.y > returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        };
        SNYXScrollerItem.prototype.fixPos = function () {
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
        SNYXScrollerItem.prototype.showAni = function (index, dir1, dir2, dir3, dir4) {
            var data = this.iconList[index];
            data.showSdDbComponet();
            this.addChild(data);
        };
        // public showiconKuang(index) {
        //     let data = this.iconList[index];
        //     data.showKuang();
        // }
        // public hideiconKuang() {
        //     for (let i = 0; i < this.icons.length; i++) {
        //         if (this.icons[i]) {
        //             let icon = this.icons[i].hideKuang();
        //         }
        //     }
        // }
        SNYXScrollerItem.prototype.showdiAni = function (index) {
            var data = this.iconList[index];
            data.showDiComp();
            this.addChild(data);
        };
        SNYXScrollerItem.prototype.stopdiAni = function (index) {
            var data = this.iconList[index];
            data.stopDiCom();
        };
        SNYXScrollerItem.prototype.smashingDB = function (index, time) {
            var data = this.iconList[index];
            data.showSmashingDB(time);
            this.addChild(data);
        };
        SNYXScrollerItem.prototype.removeSmash = function () {
            for (var i = 0; i < this.icons.length; i++) {
                if (this.icons[i]) {
                    var icon = this.icons[i].stopDiCom();
                }
            }
        };
        SNYXScrollerItem.prototype.stopAni = function () {
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
        SNYXScrollerItem.prototype.getLineArr = function () {
            var countArr = [];
            for (var i = 3; i <= 11; i++) {
                var count = Math.floor(_.random(4, 6));
                for (var j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        };
        SNYXScrollerItem.prototype.createIcons = function (firstArr) {
            var lineArr = this.getLineArr();
            if (firstArr.length > 0) {
                lineArr = lineArr.slice(firstArr.length, lineArr.length);
                lineArr = firstArr.concat(lineArr);
            }
            for (var i = 0; i < lineArr.length; i++) {
                var iconData = lineArr[i];
                var arr = new snyx.SNYXIcon();
                arr.changeSourceByNameValue("snyx", iconData);
                // arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (151 * (i + 1)) - 10;
                if (i == 0) {
                    this.minYIndex = arr.y + 151 + 97;
                }
                this.icons.push(arr);
            }
        };
        SNYXScrollerItem.prototype.setIconHui = function () {
            for (var i = 0; i < this.icons.length; i++) {
                if (this.icons[i]) {
                    var icon = this.icons[i].showRect();
                }
            }
        };
        SNYXScrollerItem.prototype.resetSpecilHui = function () {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i].hideRect();
            }
        };
        SNYXScrollerItem.prototype.resetIconHui = function (index) {
            var data = this.iconList[index];
            data.hideRect();
        };
        SNYXScrollerItem.prototype.setSpecilHui = function (index) {
            var data = this.iconList[index];
            data.showRect();
        };
        SNYXScrollerItem.prototype.sotr1 = function () {
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
        SNYXScrollerItem.prototype.sortIcons = function () {
            this.icons = _.sortBy(this.icons, "y");
            for (var i = 0; i < this.icons.length; i++) {
                this.addChild(this.icons[i]);
            }
        };
        SNYXScrollerItem.prototype.hideItem = function () {
        };
        return SNYXScrollerItem;
    }(eui.Component));
    snyx.SNYXScrollerItem = SNYXScrollerItem;
    __reflect(SNYXScrollerItem.prototype, "snyx.SNYXScrollerItem");
})(snyx || (snyx = {}));
