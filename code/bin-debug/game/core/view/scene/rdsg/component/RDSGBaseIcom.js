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
    var RDSGBaseIcon = (function (_super) {
        __extends(RDSGBaseIcon, _super);
        function RDSGBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "rdsg";
            return _this;
        }
        RDSGBaseIcon.prototype.changeSource = function (source) {
            this.icon.source = RES.getRes(source);
        };
        RDSGBaseIcon.prototype.changeSouceByValue = function (value) {
            this.value = value;
            this.icon.source = RES.getRes(this.iconKey + "_icon _" + value + "_png");
        };
        RDSGBaseIcon.prototype.changeSourceByNameValue = function (iconKey, value) {
            this.value = value;
            this.iconKey = iconKey;
            this.icon.source = RES.getRes(this.iconKey + "_icon_" + value + "_png");
        };
        RDSGBaseIcon.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            // sdmn图标动画初始化
            // this.cbzzIconBg = new DBComponent("sdmn_icon_di");
            this.cbzzIconKuang = new DBComponent("rdsg_icon_kuang");
            // this.cbzzIconBg.x = 76.5;
            // this.cbzzIconBg.y = 81.5;
            this.cbzzIconKuang.x = 76.5;
            this.cbzzIconKuang.y = 81.5;
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
        RDSGBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.scatterGuang = new DBComponent(str);
            if (str == "rdsg_icon_2") {
                this.icon.visible = false;
                this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            }
            this.scatterGuang.x = 76.5;
            this.scatterGuang.y = 81.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * scatterxiaoguo
         * @param  {string} str
         */
        RDSGBaseIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 76.5;
            this.scatterGuang.y = 81.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        RDSGBaseIcon.prototype.hideDbComponent = function () {
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
        RDSGBaseIcon.prototype.showSdDbComponet = function (dir1, dir2, dir3, dir4) {
            var _this = this;
            this.addChild(this.icon);
            // this.cbzzIconBg.play("", 1);
            this.cbzzIconKuang.play1("", 1);
            if (this.value) {
                this.dbComp = this.createDbCom("rdsg_" + ("icon_" + this.value));
                this.dbComp.callback = function () {
                    if (_this.dbComp) {
                        _this.icon.visible = true;
                        game.UIUtils.removeSelf(_this.dbComp);
                    }
                };
                this.icon.visible = false;
                this.dbComp.x = 77;
                this.dbComp.y = 81.75;
                this.changePosition();
                this.addChild(this.cbzzIconKuang);
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
            // this.addChild(this.cbzzIconBg);
        };
        RDSGBaseIcon.prototype.changePosition = function () {
            switch (this.value) {
                case 1:
                    this.dbComp.x = 76.5;
                    this.dbComp.y = 74;
                    break;
                case 2:
                    this.dbComp.x = 76.5;
                    this.dbComp.y = 81.5;
                    break;
                case 3:
                    this.dbComp.x = 77.5;
                    this.dbComp.y = 82;
                    break;
                case 4:
                    this.dbComp.x = 76;
                    this.dbComp.y = 81;
                    break;
                case 5:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 6:
                    this.dbComp.x = 77;
                    this.dbComp.y = 82;
                    break;
                case 7:
                    this.dbComp.x = 77.5;
                    this.dbComp.y = 81.5;
                    break;
                case 8:
                    this.dbComp.x = 76.5;
                    this.dbComp.y = 81.5;
                    break;
            }
        };
        RDSGBaseIcon.prototype.createDbCom = function (name) {
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
        RDSGBaseIcon.prototype.setIconHui = function () {
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
        RDSGBaseIcon.prototype.resetIconHui = function () {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.icon.filters = [colorFlilter];
        };
        RDSGBaseIcon.prototype.stopDbComponet = function () {
            egret.Tween.removeTweens(this.icon);
            this.icon.scaleX = this.icon.scaleY = 1;
            this.icon.visible = true;
            game.UIUtils.removeSelf(this.dbComp);
            this.stopKuangDB();
        };
        RDSGBaseIcon.prototype.clearIcon = function () {
            this.removeChildren();
        };
        RDSGBaseIcon.prototype.stopKuangDB = function () {
            // this.cbzzIconBg.visible = false;
            this.cbzzIconKuang.visible = false;
        };
        return RDSGBaseIcon;
    }(eui.Component));
    rdsg.RDSGBaseIcon = RDSGBaseIcon;
    __reflect(RDSGBaseIcon.prototype, "rdsg.RDSGBaseIcon");
})(rdsg || (rdsg = {}));
