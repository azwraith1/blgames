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
 * @Author: reel MC Lee
 * @Date: 2019-09-11 17:08:36
 * @Last Modified by:   reel MC Lee
 * @Last Modified time: 2019-09-11 17:08:36
 * @Description:
 */
var game;
(function (game) {
    var BaseSlotIcon = (function (_super) {
        __extends(BaseSlotIcon, _super);
        function BaseSlotIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 更换图标图案3
         * @param  {} source
         */
        BaseSlotIcon.prototype.changeSource = function (source) {
            this.icon.source = RES.getRes(source);
        };
        /**
        * 更滑图标图案2
        * @param  {} value
        */
        BaseSlotIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            this.icon.source = RES.getRes(this.iconKey + "_icon _" + value + "_png");
        };
        /**
         * 更换图标图案
         * @param  {string} iconKey
         * @param  {} value
         */
        BaseSlotIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        BaseSlotIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.scatterGuang = new DBComponent(str);
            if (str == this.dbName) {
                this.icon.visible = false;
                this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            }
            this.scatterGuang.x = this.scatterLightX;
            this.scatterGuang.y = this.scatterLightY2;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        BaseSlotIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = this.scatterLightX;
            this.scatterGuang.y = this.scatterLightY;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * 关闭所有icon渲染
         * @param  {any} value
         */
        BaseSlotIcon.prototype.showiconKuang = function (value) {
            this.icon.visible = true;
        };
        /**
        * 展示中奖图标效果，特效
        */
        BaseSlotIcon.prototype.showSdDbComponet = function () {
            var _this = this;
            // this.cbzzIconBg.play("", 1);
            // this.cbzzIconKuang.play1("", 1);
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + ("icon_" + this.value));
                this.dbComp.callback = function () {
                    if (_this.dbComp) {
                        _this.icon.visible = true;
                        game.UIUtils.removeSelf(_this.dbComp);
                    }
                };
                this.icon.visible = false;
                this.changePosition();
                // this.addChild(this.cbzzIconKuang);
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
        };
        /**
     * play icon eliminating animation
     */
        BaseSlotIcon.prototype.showEliminateCom = function () {
            if (this.value) {
                this.iconEliminateAni = this.createDbCom(this.iconKey + "_" + ("icon_" + this.value + "+\"_eliminate\""));
                this.icon.visible = false;
                this.iconEliminateAni.callback = function () {
                };
                this.iconEliminateAni.play("", 0);
                this.changePosition();
                this.addChild(this.iconEliminateAni);
            }
        };
        /**
        * 调整icon动画位置
        */
        BaseSlotIcon.prototype.changePosition = function () {
        };
        /**
         * 创建icon动画，对象池控制动画占用内存
         * @param  {} name
         */
        BaseSlotIcon.prototype.createDbCom = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
            }
            gold_big.callback = function () {
                game.UIUtils.removeSelf(gold_big);
                ObjectPool.reclaim(name, gold_big);
            };
            gold_big.touchEnabled = false;
            gold_big.touchChildren = false;
            return gold_big;
        };
        /**
         * 动画结束隐藏
         */
        BaseSlotIcon.prototype.hideDbComponent = function () {
            if (this.dbComp) {
                this.dbComp.stop();
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            if (this.iconEliminateAni) {
                this.iconEliminateAni.stop();
                game.UIUtils.removeSelf(this.iconEliminateAni);
                this.iconEliminateAni = null;
            }
            if (this.dbKaung) {
                game.UIUtils.removeSelf(this.dbKaung);
            }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
        };
        /**
         * 动画完成移除
         */
        BaseSlotIcon.prototype.stopDbComponet = function () {
            ObjectPool.cancelPool(this.iconKey + "_" + ("icon_" + this.value));
            ObjectPool.cancelPool(this.iconKey + "_" + ("icon_" + this.value + "+\"_eliminate\""));
            if (this.dbKaung) {
                game.UIUtils.removeSelf(this.dbKaung);
                this.dbKaung = null;
            }
            if (this.iconEliminateAni) {
                game.UIUtils.removeSelf(this.iconEliminateAni);
                this.iconEliminateAni = null;
            }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
            game.UIUtils.removeSelf(this.dbComp);
            this.dbComp = null;
        };
        return BaseSlotIcon;
    }(eui.Component));
    game.BaseSlotIcon = BaseSlotIcon;
    __reflect(BaseSlotIcon.prototype, "game.BaseSlotIcon");
})(game || (game = {}));
