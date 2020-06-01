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
    var SNYXScroller = (function (_super) {
        __extends(SNYXScroller, _super);
        function SNYXScroller() {
            var _this = _super.call(this) || this;
            _this.aniName = "snyx_reel_fast";
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
            _this.skinName = "SNYXScrollerSkin";
            return _this;
        }
        SNYXScroller.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SNYXScroller.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        };
        SNYXScroller.prototype.update = function (e) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i]; //.itemDown(this.speed);
                item.itemDown();
            }
        };
        SNYXScroller.prototype.run = function () {
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
        SNYXScroller.prototype.freeRun = function () {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (var i = 6; i <= 10; i++) {
                var item = this["item" + i];
                item.startRun();
            }
        };
        SNYXScroller.prototype.runResultFast = function () {
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
        SNYXScroller.prototype.runResult = function (resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (var i = 0; i < resultArr.length; i++) {
                var result = resultArr[i];
                var item = this["item" + (i + 1)];
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result);
            }
        };
        // public wildIcon(arr: Array<number>) {
        //     for (let i = 0; i < arr.length; i++) {
        //         if (arr[i] >= 0) this[`item${i + 1}`].showiconKuang(arr[i]);
        //     }
        // }
        // public hideIcon() {
        //     for (let i = 1; i <= 5; i++) {
        //         let item = this[`item${i}`] as SNYXScrollerItem;
        //         item.hideiconKuang();
        //     }
        // }
        SNYXScroller.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @param  {} sceneIndex
         */
        SNYXScroller.prototype.initItemCounts = function (sceneIndex) {
            for (var i = 1; i <= 5; i++) {
                var item = this["item" + i];
                item.initSize(this["itemSize" + i], i, sceneIndex);
            }
        };
        /**
         * @param  {} index
         * @param  {} firstArr
         */
        SNYXScroller.prototype.initItemByFirst = function (index, firstArr) {
            var item = this["item" + index];
            item.name = "item" + index;
            item.createIcons(firstArr);
        };
        SNYXScroller.prototype.showScatterHideIcon = function () {
            for (var i = 1; i <= 5; i++) {
                this["item" + i].showScatterIcon();
            }
        };
        /**
         * 中了wild游戏
         * @param  {} i
         * @param  {} y
         */
        SNYXScroller.prototype.wildKuang = function (i, y) {
            var _this = this;
            var wildKaungAni = new DBComponent("snyx_icon2_1");
            var wildAni = new DBComponent("snyx_icon_1");
            // let wildImag: eui.Image = new eui.Image("snyx_icon_1_png");
            wildAni.horizontalCenter = wildKaungAni.horizontalCenter = 0;
            wildAni.bottom = 150 * (2 - y) + 30;
            wildKaungAni.bottom = -10 + 150 * (2 - y);
            wildAni.play("", 1);
            wildAni.callback = function () {
                game.UIUtils.removeSelf(wildAni);
                wildKaungAni.play("", 0);
                wildKaungAni.touchEnabled = false;
                // this[`wildGroup${i + 1}`].addChild(wildImag);
                _this["wildGroup" + (i + 1)].addChild(wildKaungAni);
                wildKaungAni.resetPosition();
            };
            this["wildGroup" + (i + 1)].addChild(wildAni);
            wildAni.resetPosition();
        };
        /**
         * wild游戏移动
         * @param  {} i
         * @param  {} y
         */
        SNYXScroller.prototype.wildMove = function (i, y) {
            var _this = this;
            egret.Tween.get(this["wildGroup" + (i + 1)]).to({ bottom: this["wildGroup" + (i + 1)].bottom - 150, top: this["wildGroup" + (i + 1)].top + 150 }, 1000, egret.Ease.sineInOut).call(function () {
                // this[`wildGroup${i + 1}`].removeChildAt(this[`wildGroup${i + 1}`].numChildren - 1);
                if (y == -1) {
                    _this["wildGroup" + i].removeChildren();
                    _this["wildGroup" + i].bottom = _this["wildGroup" + i].top = 0;
                }
            });
        };
        /**
         * wild游戏框框特效移除
         */
        SNYXScroller.prototype.removeWild = function (i) {
            var _this = this;
            if (i + 1) {
                egret.Tween.get(this["wildGroup" + (i + 1)]).to({ bottom: this["wildGroup" + (i + 1)].bottom - 150, top: this["wildGroup" + (i + 1)].top + 150 }, 1000, egret.Ease.sineInOut).call(function () {
                    _this["wildGroup" + (i + 1)].bottom = _this["wildGroup" + (i + 1)].top = 0;
                    _this["wildGroup" + (i + 1)].removeChildren();
                });
                return;
            }
            var _loop_1 = function (i_1) {
                egret.Tween.get(this_1["wildGroup" + (i_1 + 1)]).to({ bottom: this_1["wildGroup" + (i_1 + 1)].bottom - 150, top: this_1["wildGroup" + (i_1 + 1)].top + 150 }, 1000, egret.Ease.sineInOut).call(function () {
                    _this["wildGroup" + (i_1 + 1)].bottom = _this["wildGroup" + (i_1 + 1)].top = 0;
                    _this["wildGroup" + (i_1 + 1)].removeChildren();
                });
            };
            var this_1 = this;
            for (var i_1 = 1; i_1 <= 4; i_1++) {
                _loop_1(i_1);
            }
        };
        return SNYXScroller;
    }(game.BaseScroller));
    snyx.SNYXScroller = SNYXScroller;
    __reflect(SNYXScroller.prototype, "snyx.SNYXScroller");
})(snyx || (snyx = {}));
