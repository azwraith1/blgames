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
var wszw;
(function (wszw) {
    var WSZWIcon = (function (_super) {
        __extends(WSZWIcon, _super);
        function WSZWIcon() {
            var _this = _super.call(this) || this;
            _this.iconKey = "wszw";
            _this.skinName = new WSZWIconSkin();
            return _this;
        }
        WSZWIcon.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        WSZWIcon.prototype.changeRamdom = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 3; }
            this.changeSouceByValue(Math.floor(_.random(1, 3)));
        };
        /**
         * 更换图标图案3
         * @param  {} source
         */
        WSZWIcon.prototype.changeSource = function (source) {
            this.icon.source = RES.getRes(source);
        };
        /**
        * 更滑图标图案2
        * @param  {} value
        */
        WSZWIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            this.icon.source = RES.getRes(this.iconKey + "_icon _" + value + "_png");
        };
        /**
         * 更换图标图案
         * @param  {string} iconKey
         * @param  {} value
         */
        WSZWIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        /**
      * 展示中奖图标效果，特效
      */
        WSZWIcon.prototype.showSdDbComponet = function () {
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
       * 创建icon动画，对象池控制动画占用内存
       * @param  {} name
       */
        WSZWIcon.prototype.createDbCom = function (name) {
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
        * 调整icon动画位置
        */
        WSZWIcon.prototype.changePosition = function () {
            this.dbComp.x = 83;
            this.dbComp.y = 168;
        };
        WSZWIcon.prototype.showRect = function () {
        };
        WSZWIcon.prototype.hideRect = function () {
        };
        /**
        * 动画结束隐藏
        */
        WSZWIcon.prototype.hideDbComponent = function () {
            if (this.dbComp) {
                this.dbComp.stop();
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            // if (this.dbKaung) {
            //     game.UIUtils.removeSelf(this.dbKaung);
            // }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
        };
        /**
         * 动画完成移除
         */
        WSZWIcon.prototype.stopDbComponet = function () {
            ObjectPool.cancelPool(this.iconKey + "_" + ("icon_" + this.value));
            // if (this.dbKaung) {
            //     game.UIUtils.removeSelf(this.dbKaung);
            //     this.dbKaung = null;
            // }
            egret.Tween.removeTweens(this.icon);
            this.icon.visible = true;
            game.UIUtils.removeSelf(this.dbComp);
            this.dbComp = null;
        };
        return WSZWIcon;
    }(eui.Component));
    wszw.WSZWIcon = WSZWIcon;
    __reflect(WSZWIcon.prototype, "wszw.WSZWIcon");
})(wszw || (wszw = {}));
