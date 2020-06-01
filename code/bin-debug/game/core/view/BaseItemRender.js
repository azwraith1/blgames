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
var game;
(function (game) {
    var BaseItemRender = (function (_super) {
        __extends(BaseItemRender, _super);
        function BaseItemRender() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        /**
         * 当添加到舞台上
         */
        BaseItemRender.prototype.onAdded = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        };
        /**
         * 当添加到舞台上
         */
        BaseItemRender.prototype.onRemoved = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            game.UIUtils.removeButtonScaleEffects(this);
        };
        BaseItemRender.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            TextUtils.instance.languageInter(this);
            game.UIUtils.addButtonScaleEffects(this);
        };
        BaseItemRender.prototype.onTouchTap = function (e) {
        };
        return BaseItemRender;
    }(eui.ItemRenderer));
    game.BaseItemRender = BaseItemRender;
    __reflect(BaseItemRender.prototype, "game.BaseItemRender");
})(game || (game = {}));
