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
var sdmn;
(function (sdmn) {
    var SDMNBaseIcon = (function (_super) {
        __extends(SDMNBaseIcon, _super);
        function SDMNBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "sdmn";
            return _this;
        }
        SDMNBaseIcon.prototype.changeSource = function (source) {
            this.icon.source = RES.getRes(source);
        };
        SDMNBaseIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            this.icon.source = RES.getRes(this.iconKey + "_icon _" + value + "_png");
        };
        SDMNBaseIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        SDMNBaseIcon.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            // sdmn图标动画初始化
            // this.cbzzIconBg = new DBComponent("sdmn_icon_di");
            this.cbzzIconKuang = new DBComponent("sdmn_icon_kuang");
            // this.cbzzIconBg.x = 94;
            // this.cbzzIconBg.y = 92;
            this.cbzzIconKuang.x = 94;
            this.cbzzIconKuang.y = 92;
            // this.cbzzIconBg.visible = 
            this.cbzzIconKuang.visible = false;
            // this.cbzzIconBg.callback = () => {
            //     this.cbzzIconBg.visible = false;
            // }; 
            this.cbzzIconKuang.callback = function () {
                _this.cbzzIconKuang.visible = false;
            };
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        SDMNBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.scatterGuang = new DBComponent(str);
            if (str == "sdmn_icon_2") {
                this.icon.visible = false;
                this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            }
            this.scatterGuang.x = 94;
            this.scatterGuang.y = 86;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * scatterxiaoguo
         * @param  {string} str
         */
        SDMNBaseIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 94;
            this.scatterGuang.y = 92;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        SDMNBaseIcon.prototype.hideDbComponent = function () {
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
         * 中奖动画添加
         * @param  {number} dir1? 上方特效
         * @param  {number} dir2? 下方特效
         * @param  {number} dir3? 左边特效
         * @param  {number} dir4? 右边特效
         */
        SDMNBaseIcon.prototype.showSdDbComponet = function (dir1, dir2, dir3, dir4) {
            var _this = this;
            this.addChild(this.icon);
            // this.cbzzIconBg.play("", 1);
            this.cbzzIconKuang.play1("", 1);
            if (this.value <= 8) {
                this.dbComp = this.createDbCom("sdmn_" + ("icon_" + this.value));
                this.dbComp.callback = function () {
                    if (_this.dbComp) {
                        _this.icon.visible = true;
                        _this.dbComp.visible = false;
                    }
                };
                this.dbComp.x = 94;
                this.dbComp.y = 86;
                if (this.value <= 2) {
                    this.icon.visible = false;
                    this.dbComp.play1("", 1);
                    this.addChild(this.dbComp);
                }
                else if (this.value <= 6 && this.value > 2) {
                    this.icon.visible = false;
                    this.addChild(this.dbComp);
                    this.dbComp.play1("", 1);
                }
                else {
                    if (this.value == 7) {
                        this.dbComp.x = 94;
                        this.dbComp.y = 86;
                    }
                    else if (this.value == 8) {
                        this.dbComp.x = 94;
                        this.dbComp.y = 87;
                    }
                    this.icon.visible = false;
                    this.dbComp.play1("", 1);
                    this.addChild(this.dbComp);
                }
                // this.addChild(this.cbzzIconBg);
            }
            else {
                this.addChild(this.icon);
                // this.addChild(this.cbzzIconKuang);                
                this.icon.visible = true;
            }
            this.cbzzIconKuang.visible = true;
            this.addChild(this.cbzzIconKuang);
        };
        SDMNBaseIcon.prototype.createDbCom = function (name) {
            var gold_big = ObjectPool.produce(name, null);
            if (!gold_big) {
                gold_big = new DBComponent(name);
                gold_big.scaleY = 1;
                gold_big.scaleX = 1;
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
         * 图标置灰
         */
        SDMNBaseIcon.prototype.setIconHui = function () {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.icon.filters = [colorFlilter];
        };
        /**
         * 图标置灰还原
         */
        SDMNBaseIcon.prototype.resetIconHui = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.icon.filters = [colorFlilter];
        };
        SDMNBaseIcon.prototype.stopDbComponet = function () {
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
        SDMNBaseIcon.prototype.clearIcon = function () {
            this.removeChildren();
        };
        SDMNBaseIcon.prototype.stopKuangDB = function () {
            // this.cbzzIconBg.visible = false;
            this.cbzzIconKuang.visible = false;
        };
        return SDMNBaseIcon;
    }(eui.Component));
    sdmn.SDMNBaseIcon = SDMNBaseIcon;
    __reflect(SDMNBaseIcon.prototype, "sdmn.SDMNBaseIcon");
})(sdmn || (sdmn = {}));
