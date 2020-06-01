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
var lhj;
(function (lhj) {
    var BaseLhjIcon = (function (_super) {
        __extends(BaseLhjIcon, _super);
        function BaseLhjIcon() {
            var _this = _super.call(this) || this;
            _this.iconKey = "dntg";
            return _this;
        }
        // abstract playEffect();
        BaseLhjIcon.prototype.changeSource = function (source) {
            this.icon.source = RES.getRes(source);
        };
        BaseLhjIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        BaseLhjIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        /**
         * @param  {string} str
         * dntg scatter图标的特效
         */
        BaseLhjIcon.prototype.showFoguang = function (str) {
            this.foguang = new DBComponent(str);
            this.foguang.x = 90;
            this.foguang.y = 90;
            this.foguang.play("", 1);
            this.addChild(this.foguang);
        };
        BaseLhjIcon.prototype.changePosition = function () {
        };
        BaseLhjIcon.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            this.dbGuang = new DBComponent("guang"); //dntg 图标背景特效1
            this.dbBjgang = new DBComponent("tuan"); //dntg 图标背景特效2
            this.dbGuang.x = this.dbBjgang.x = 90;
            this.dbGuang.y = this.dbBjgang.y = 90;
            this.dbGuang.visible = false;
            this.dbBjgang.visible = false;
            this.dbGuang.callback = function () {
            };
            this.dbBjgang.callback = function () {
                game.UIUtils.removeSelf(_this.dbGuang);
                game.UIUtils.removeSelf(_this.dbBjgang);
            };
        };
        /**
         * dntg 展示图标动画
         */
        BaseLhjIcon.prototype.showDbComponent = function () {
            var _this = this;
            this.addChild(this.dbBjgang);
            this.addChild(this.dbGuang);
            this.addChild(this.icon);
            this.dbBjgang.play1("", 1);
            this.dbGuang.play1("", 1);
            if (this.value <= 8) {
                if (!this.dbComp) {
                    this.dbComp = new DBComponent("icon_" + this.value);
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            _this.dbComp.visible = false;
                            _this.icon.visible = true;
                        }
                    };
                    this.dbComp.x = 90;
                    this.dbComp.y = 90;
                }
                else {
                    this.dbComp.visible = true;
                }
                this.icon.visible = false;
                this.addChild(this.dbComp);
                this.dbComp.play1("", 1);
            }
            else {
                egret.Tween.get(this.icon).to({ scaleX: 1.15, scaleY: 1.15, anchorOffsetX: this.icon.width / 2, anchorOffsetY: this.icon.height / 2 }, 750).to({ scaleX: 1, scaleY: 1, anchorOffsetX: this.icon.width / 2, anchorOffsetY: this.icon.height / 2 }, 750).call(function () { _this.stopDbComponet(); });
                if (this.dbComp) {
                    this.dbComp.visible = false;
                }
                this.icon.visible = true;
            }
        };
        BaseLhjIcon.prototype.hideDbComponent = function () {
            if (this.dbComp) {
                this.dbComp.stop();
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            egret.Tween.removeTweens(this.icon);
            this.icon.scaleX = this.icon.scaleY = 1;
            this.icon.visible = true;
        };
        /**
         * dntg 去除图标特效
         */
        BaseLhjIcon.prototype.stopDbComponet = function () {
            egret.Tween.removeTweens(this.icon);
            this.icon.scaleX = this.icon.scaleY = 1;
            this.icon.visible = true;
            if (this.dbComp) {
                this.dbComp.visible = false;
                game.UIUtils.removeSelf(this.dbComp);
                this.dbComp = null;
            }
            this.stopKuangDB();
        };
        BaseLhjIcon.prototype.stopKuangDB = function () {
            game.UIUtils.removeSelf(this.dbGuang);
            game.UIUtils.removeSelf(this.dbBjgang);
        };
        BaseLhjIcon.prototype.clearIcon = function () {
            this.removeChildren();
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        BaseLhjIcon.prototype.addScatter = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 90;
            this.scatterGuang.y = 90;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        return BaseLhjIcon;
    }(eui.Component));
    lhj.BaseLhjIcon = BaseLhjIcon;
    __reflect(BaseLhjIcon.prototype, "lhj.BaseLhjIcon");
    var slotIocnPoint = {
        dntg: { "1": "92.5", "2": "92.5" }
    };
})(lhj || (lhj = {}));
