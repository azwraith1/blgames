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
 * @Author: li mengchan
 * @Date: 2018-07-16 00:05:02
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-19 10:31:10
 * @Description: 玩家胡牌
 */
var majiang;
(function (majiang) {
    var MajiangHupai = (function (_super) {
        __extends(MajiangHupai, _super);
        function MajiangHupai(direction, value) {
            var _this = _super.call(this) || this;
            _this.value = value;
            _this.colorStr = "color_value_`VALUE`_png";
            _this.direction = direction;
            switch (direction) {
                case "mine":
                    _this.skinName = new majiang.MineHupaiSkin();
                    break;
                case "left":
                    _this.skinName = new majiang.LeftHupaiSkin();
                    break;
                case "right":
                    _this.skinName = new majiang.RightHupaiSkin();
                    break;
                case "top":
                    _this.skinName = new majiang.TopHupaiSkin();
                    break;
            }
            return _this;
        }
        /**
         * 展现为背面
         */
        MajiangHupai.prototype.change2bei = function () {
            this.colorImage.visible = false;
            switch (this.direction) {
                case "mine":
                    this.bgImage.source = RES.getRes("plist2_json.mine_angang_1_png");
                    break;
                case "left":
                    this.bgImage.source = RES.getRes("plist2_json.left_angang_1_png");
                    break;
                case "right":
                    this.bgImage.source = RES.getRes("plist2_json.right_angang_1_png");
                    break;
                case "top":
                    this.bgImage.source = RES.getRes("plist2_json.top_angang_12_png");
                    break;
            }
        };
        MajiangHupai.prototype.showMaskRect = function (value) {
            this.maskRect.visible = this.value == value;
        };
        MajiangHupai.prototype.showMaimaiWinAni = function () {
            var db = new DBComponent("gdmj_mapai");
            db.x = 30;
            db.y = 30;
            db.callback = function () {
                game.UIUtils.removeSelf(db);
                db = null;
            };
            this.addChild(db);
            this.addChild(this.bgImage1);
            this.addChild(this.bgImage);
            this.addChild(this.colorImage);
            this.addChild(this.maskRect);
            db.playByFilename(1);
        };
        MajiangHupai.prototype.setMaiMaMaskColor = function (state) {
            if (state == 1) {
                this.maskRect.fillColor = 0xFFAE00;
                this.showMaimaiWinAni();
                this.maskRect.visible = true;
            }
            else if (state == 2) {
                this.maskRect.fillColor = 0x08324A;
                this.maskRect.alpha = 0.3;
                this.maskRect.visible = true;
            }
            else {
                this.maskRect.visible = false;
            }
        };
        MajiangHupai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.value > 0) {
                var color = this.colorStr.replace("`VALUE`", this.value + "");
                this.colorImage.source = RES.getRes(color);
            }
            this.maskRect.mask = this.bgImage1;
        };
        MajiangHupai.prototype.showHouseValue = function (value) {
            this.colorImage.visible = true;
            this.bgImage.source = this.bgImage1.source;
            var color = this.colorStr.replace("`VALUE`", value + "");
            this.colorImage.source = RES.getRes(color);
        };
        MajiangHupai.prototype.showZimo = function () {
            var _this = this;
            this.alpha = 1;
            var effectName = "zimohu";
            var mc = GameCacheManager.instance.getMcCache("zimohu", this.direction + "_" + effectName, null);
            this.maskRect.alpha = this.bgImage.alpha = 0;
            this.colorImage.alpha = 0;
            this.addChild(this.bgImage);
            this.addChild(this.colorImage);
            this.addChild(this.maskRect);
            this.addChild(mc);
            mc.scaleX = mc.scaleX = 1.5;
            mc.x = this.width / 2;
            if (this.direction == "mine" || this.direction == "right") {
                mc.y = this.height / 2 - 30;
            }
            else {
                mc.y = this.height / 2;
            }
            var mcCallback = function () {
                mc.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, _this);
                game.UIUtils.removeSelf(mc);
                // game.MCUtils.reclaim("zimohu", mc);
                _this.maskRect.alpha = 1;
            };
            mc.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this);
            mc.gotoAndPlay(1);
            this.setAutoTimeout(function () {
                egret.Tween.get(_this.bgImage).to({
                    alpha: 1
                }, 100);
                egret.Tween.get(_this.colorImage).to({
                    alpha: 1
                }, 100);
            }, this, 200);
        };
        MajiangHupai.prototype.showDianpao = function () {
            var _this = this;
            var mc1 = GameCacheManager.instance.getMcCache("hu_down1", this.direction + "_hu_down1", null);
            var mc2 = GameCacheManager.instance.getMcCache("hu_down2", this.direction + "_hu_down2", null);
            this.addChild(mc2);
            this.addChild(this.bgImage);
            this.addChild(this.colorImage);
            this.addChild(this.maskRect);
            // pai.parent.addChild(pai);
            this.addChild(mc1);
            var alpha = this.alpha;
            this.alpha = 0;
            mc2.scaleX = mc2.scaleX = 1.5;
            mc2.x = this.width / 2;
            mc2.y = this.height / 2;
            mc1.scaleX = mc1.scaleY = 1.5;
            mc1.x = this.width / 2;
            mc1.y = this.height / 2 - 20;
            var mcCallback1 = function () {
                mc1.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback1, _this);
                game.UIUtils.removeSelf(mc1);
            };
            mc1.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback1, this);
            var mcCallback2 = function () {
                mc2.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback2, _this);
                game.UIUtils.removeSelf(mc2);
            };
            mc2.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback2, this);
            egret.Tween.get(this).to({
                alpha: alpha
            }, 50);
            mc1.play(1);
            mc2.play(1);
        };
        return MajiangHupai;
    }(game.BaseUI));
    majiang.MajiangHupai = MajiangHupai;
    __reflect(MajiangHupai.prototype, "majiang.MajiangHupai");
})(majiang || (majiang = {}));
