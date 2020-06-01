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
var sangong;
(function (sangong) {
    var SangongFen = (function (_super) {
        __extends(SangongFen, _super);
        function SangongFen(data) {
            var _this = _super.call(this) || this;
            _this.data = parseInt(data);
            _this.skinName = new SangongFenSkin();
            return _this;
        }
        SangongFen.prototype.createChildren = function () {
            this.beishuLabel.visible = false;
            _super.prototype.createChildren.call(this);
            this.showFen(this.data);
        };
        /**
         * 底板龙骨动画
         */
        SangongFen.prototype.createDbComp = function (fileName) {
            var dbComp = new DBComponent(fileName);
            dbComp.callback = function () {
            };
            this.dbGroup.addChild(dbComp);
            // dbComp.resetPosition();
            this.dbComp = dbComp;
            this.dbComp.x = 101;
            this.dbComp.y = 27;
        };
        /**
         * 根据label定位位置
         */
        SangongFen.prototype.resetPositionByLabel = function () {
            this.beishuLabel.x = this.patternLabel.x + this.patternLabel.width;
        };
        /**
         * 根据image定位位子
         */
        SangongFen.prototype.resetPositionByImage = function () {
            this.beishuLabel.x = this.patternImage.x + this.patternImage.width;
        };
        /**
         * image放大缩小
         */
        SangongFen.prototype.showScalImageAni = function () {
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
        SangongFen.prototype.showFen = function (data) {
            switch (data) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    //this.bgImage.source = RES.getRes("sg_06_bg_png");
                    //this.bgImage.visible = true;
                    this.patternLabel.font = "sg_06_fnt";
                    this.patternLabel.text = this.showFenshu(data);
                    this.beishuLabel.font = "sg_huise_fnt";
                    // this.beishuLabel.font = "sg_06bei_fnt";
                    // this.beishuLabel.text = "(1倍)";
                    this.beishuLabel.text = "(1b)";
                    this.patternLabel.visible = true;
                    this.resetPositionByLabel();
                    this.niuFenFDSX(this.patternLabel, this.dir);
                    break;
                case 7:
                case 8:
                case 9:
                    // this.bgImage.source = RES.getRes("sg_79_bg_png");
                    // this.bgImage.visible = true;
                    this.patternLabel.font = "sg_79_fnt";
                    this.patternLabel.text = this.showFenshu(data);
                    this.beishuLabel.font = "sg_dsgzz_fnt";
                    //this.beishuLabel.font = "sg_79bei_fnt"
                    this.beishuLabel.text = "(2b)";
                    this.patternLabel.visible = true;
                    this.resetPositionByLabel();
                    this.niuFenFDSX(this.patternLabel, this.dir);
                    break;
                case 10:
                    //smart 屏蔽
                    // this.bgImage.source = RES.getRes("sg_sg_bg_png");
                    // this.patternImage.visible = true;
                    // this.patternImage.source = RES.getRes("sg_sg_png")
                    //smart
                    //smart override
                    this.showPaiXinDB("sg_px_sg");
                    this.bgImage.visible = false;
                    //smart
                    //this.beishuLabel.font = "sg_sgbei_fnt"
                    this.beishuLabel.font = "sg_sgbeishu_fnt";
                    this.beishuLabel.text = "(3b)";
                    this.resetPositionByImage();
                    this.showScalImageAni();
                    break;
                case 11:
                    //smart屏蔽
                    // this.createDbComp("sg_dasangong");
                    // this.dbComp.playDefault(1)
                    //smart 
                    //smart override
                    //this.createDbComp("sg_px_dsg");
                    this.showPaiXinDB("sg_px_dsg");
                    //smart
                    // this.patternImage.visible = true;
                    this.bgImage.visible = false;
                    // this.patternImage.source = RES.getRes("sg_dsg_png")
                    //	this.beishuLabel.font = "sg_dsgbei_fnt"
                    this.beishuLabel.font = "sg_dsgzz_fnt";
                    this.beishuLabel.text = "(4b)";
                    this.resetPositionByImage();
                    this.showScalImageAni();
                    break;
                case 12:
                    //smart屏蔽
                    // this.createDbComp("sg_zhizun");
                    // this.dbComp.playDefault(1)
                    //smart override
                    this.showPaiXinDB("sg_px_zz");
                    //smart
                    // this.patternImage.visible = true;
                    this.bgImage.visible = false;
                    // this.patternImage.source = RES.getRes("sg_zz_png")
                    //this.beishuLabel.font = "sg_zzbei_fnt"
                    //this.beishuLabel.font = "sg_dsgbei_fnt"
                    this.beishuLabel.font = "sg_dsgzz_fnt";
                    this.beishuLabel.text = "(5b)";
                    this.resetPositionByImage();
                    this.showScalImageAni();
                    break;
            }
        };
        /**
         * smart
         *
         */
        SangongFen.prototype.showPaiXinDB = function (name) {
            this.paiXinGroup.removeChildren();
            var loopName = name + "_loop";
            var winDb = new DBComponent(name);
            this.paiXinGroup.addChild(winDb);
            winDb.playNamesAndLoop([name, loopName]);
        };
        SangongFen.prototype.niuFenFDSX = function (num, dir) {
            var _this = this;
            game.UIUtils.setAnchorPot(num);
            num.alpha = 0;
            num.scaleX = num.scaleY = 0;
            egret.Tween.get(num).to({ alpha: 1, scaleX: 1.4, scaleY: 1.4 }, 300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300);
            this.setAutoTimeout(function () {
                _this.beishuLabel.visible = true;
            }, this, 650);
        };
        SangongFen.prototype.showFenshu = function (data) {
            switch (data) {
                case 0:
                    return "零点";
                case 1:
                    return "一点";
                case 2:
                    return "二点";
                case 3:
                    return "三点";
                case 4:
                    return "四点";
                case 5:
                    return "五点";
                case 6:
                    return "六点";
                case 7:
                    return "七点";
                case 8:
                    return "八点";
                case 9:
                    return "九点";
            }
        };
        return SangongFen;
    }(game.BaseUI));
    sangong.SangongFen = SangongFen;
    __reflect(SangongFen.prototype, "sangong.SangongFen");
})(sangong || (sangong = {}));
