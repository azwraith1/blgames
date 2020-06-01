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
var niuniu;
(function (niuniu) {
    var NiuniuNewFen = (function (_super) {
        __extends(NiuniuNewFen, _super);
        function NiuniuNewFen(data) {
            var _this = _super.call(this) || this;
            _this.data = parseInt(data);
            _this.skinName = new NiuniuNewFenSkin();
            return _this;
        }
        NiuniuNewFen.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.showFen(this.data);
        };
        /**
 * 底板龙骨动画
 */
        NiuniuNewFen.prototype.createDbComp = function (name) {
            this.dbGroup.removeChildren();
            var dbComp = new DBComponent(name);
            var loopName = name + "_loop";
            dbComp.callback = function () {
            };
            this.dbGroup.addChild(dbComp);
            dbComp.playNamesAndLoop([name, loopName]);
        };
        NiuniuNewFen.prototype.visibles = function (nums) {
            this.patternImage.visible = this.patternLabel.visible = this.beishuLabel.visible = nums == 1 ? true : false;
            this.wancheng.visible = nums == 1 ? false : true;
        };
        /**
         * 根据label定位位置
         */
        NiuniuNewFen.prototype.resetPositionByLabel = function () {
            this.beishuLabel.x = this.patternLabel.x + this.patternLabel.width;
            this.beishuLabel.y = 11.13;
        };
        /**
         * 根据image定位位子
         */
        NiuniuNewFen.prototype.resetPositionByImage = function () {
            this.beishuLabel.x = this.patternImage.x + this.patternImage.width;
        };
        NiuniuNewFen.prototype.showFen = function (data) {
            //	data=14;
            switch (data) {
                case 0:
                    this.bgImage.source = RES.getRes("nn_pattern_bg0_png");
                    this.patternImage.visible = false;
                    this.patternLabel.visible = false;
                    this.bgImage.x = 15;
                    this.bgImage.y = -3;
                    this.beishuLabel.text = "";
                    return;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    this.bgImage.source = RES.getRes("nn_pattern_bg1_png");
                    this.patternLabel.visible = true;
                    this.patternLabel.font = "nn_pattern1_5_fnt";
                    this.patternLabel.text = this.showFenshu(data);
                    this.beishuLabel.font = "nn_beishu1_5_fnt";
                    this.beishuLabel.text = "1倍";
                    this.resetPositionByLabel();
                    this.showScaleAni();
                    return;
                case 6:
                case 7:
                case 8:
                case 9:
                    this.bgImage.source = RES.getRes("nn_pattern_bg2_png");
                    this.patternLabel.visible = true;
                    this.patternLabel.font = "nn_pattern6_9_fnt";
                    this.patternLabel.letterSpacing = -12;
                    this.patternLabel.text = this.showFenshu(data);
                    this.beishuLabel.font = "nn_beishu6_9_fnt";
                    this.beishuLabel.text = "2倍";
                    this.resetPositionByLabel();
                    this.showScaleAni();
                    return;
                case 10:
                    this.createDbComp("nn_px_nn");
                    this.bgImage.visible = false;
                    this.patternLabel.visible = false;
                    this.beishuLabel.font = "nn_beishu2_fnt";
                    this.beishuLabel.text = "3倍";
                    this.showScaleAni();
                    return;
                case 11:
                case 12:
                    //四花牛
                    if (data == 11) {
                        this.createDbComp("nn_px_shn");
                    }
                    else {
                        this.createDbComp("nn_px_whn");
                    }
                    this.bgImage.visible = false;
                    this.patternLabel.visible = false;
                    this.beishuLabel.font = "nn_beishu1_5_fnt";
                    this.beishuLabel.text = "4倍";
                    this.showScaleAni();
                    return;
                case 13:
                    this.createDbComp("nn_px_zd");
                    this.patternLabel.visible = false;
                    this.bgImage.visible = false;
                    this.beishuLabel.font = "nn_beishu6_9_fnt";
                    this.beishuLabel.text = "5倍";
                    this.showScaleAni();
                    return;
                case 14:
                    this.createDbComp("nn_px_wxn");
                    this.bgImage.visible = false;
                    this.patternLabel.visible = false;
                    this.beishuLabel.font = "nn_beishu14_fnt";
                    this.beishuLabel.text = "(6倍)";
                    this.showScaleAni();
                    return;
            }
        };
        /**
         * 放大缩小
         */
        NiuniuNewFen.prototype.showScaleAni = function () {
            var _this = this;
            this.beishuLabel.visible = false;
            game.UIUtils.setAnchorPot(this.patternLabel);
            this.patternLabel.scaleX = this.patternLabel.scaleY = 3;
            egret.Tween.get(this.patternLabel).to({
                scaleX: 1,
                scaleY: 1
            }, 300, egret.Ease.backIn);
            this.setAutoTimeout(function () {
                _this.beishuLabel.visible = true;
            }, this, 350);
        };
        /**
         * image放大缩小
         */
        NiuniuNewFen.prototype.showScalImageAni = function () {
            var _this = this;
            this.beishuLabel.visible = false;
            game.UIUtils.setAnchorPot(this.patternImage);
            this.patternImage.scaleX = this.patternImage.scaleY = 4;
            egret.Tween.get(this.patternImage).to({
                scaleX: 1,
                scaleY: 1
            }, 300, egret.Ease.backIn);
            this.setAutoTimeout(function () {
                _this.beishuLabel.visible = true;
            }, this, 350);
        };
        NiuniuNewFen.prototype.patternImageFDSX = function (num) {
            game.UIUtils.setAnchorPot(num);
            egret.Tween.get(num).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 50).to({ alpha: 1, scaleX: 1.4, scaleY: 1.4 }, 300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300);
        };
        /**
         * image放大缩小
         */
        NiuniuNewFen.prototype.showScalImageAniBg = function () {
            var _this = this;
            this.beishuLabel.visible = false;
            game.UIUtils.setAnchorPot(this.patternImage);
            this.patternImage.scaleX = this.patternImage.scaleY = 4;
            egret.Tween.get(this.patternImage).to({
                scaleX: 1,
                scaleY: 1
            }, 300, egret.Ease.backIn);
            this.setAutoTimeout(function () {
                _this.beishuLabel.visible = true;
            }, this, 350);
        };
        NiuniuNewFen.prototype.showFenshu = function (data) {
            switch (data) {
                case 1:
                    return "牛一";
                case 2:
                    return "牛二";
                case 3:
                    return "牛三";
                case 4:
                    return "牛四";
                case 5:
                    return "牛五";
                case 6:
                    return "牛六";
                case 7:
                    return "牛七";
                case 8:
                    return "牛八";
                case 9:
                    return "牛九";
                case 10:
                    return "牛牛";
                case 11:
                    return "四花牛";
                case 12:
                    return "五花牛";
            }
        };
        return NiuniuNewFen;
    }(game.BaseUI));
    niuniu.NiuniuNewFen = NiuniuNewFen;
    __reflect(NiuniuNewFen.prototype, "niuniu.NiuniuNewFen");
})(niuniu || (niuniu = {}));
