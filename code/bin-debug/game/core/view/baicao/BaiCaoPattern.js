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
var baicao;
(function (baicao) {
    var BaiCaoPattern = (function (_super) {
        __extends(BaiCaoPattern, _super);
        function BaiCaoPattern() {
            var _this = _super.call(this) || this;
            _this.skinName = "BaiCaoPatternSkin";
            return _this;
        }
        /**
         * 展现分数
         */
        BaiCaoPattern.prototype.showPattern = function (pattern, isWin) {
            this.patternBg.source = isWin > 0 ? "baicao_pattern_di_huang_png" : "baicao_paitern_di_hui_png";
            this.patternTxt.font = isWin > 0 ? "baicao_pattern_huang_fnt" : "baicao_pattern_hui_fnt";
            var _patter = pattern;
            switch (pattern) {
                case 0:
                    this.setPatternImg("baicao_bu_png");
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    this.patternTxt.visible = true;
                    this.patternTxt.text = pattern + "n";
                    this.patternImg.visible = false;
                    break;
                case 10:
                    this.setPatternImg("3n_png");
                    break;
                case 11:
                    this.setPatternImg("baicao_cao_png");
                    break;
            }
        };
        BaiCaoPattern.prototype.showSuperBaiCaoPattern = function (pattern, isWin) {
            this.patternBg.source = isWin > 0 ? "superbaicao_pattern_di_huang_png" : "superbaicao_paitern_di_hui_png";
            this.patternTxt.font = isWin > 0 ? "superbaicao_pattern_fnt" : "superbaicao_pattern_lose_fnt";
            var _patter = pattern;
            switch (pattern) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    this.setPatternTxt(pattern, "d"); //点
                    break;
                case 10:
                    this.setSpecialPattern("a"); //Ảnh（公仔）
                    break;
                case 11:
                    this.setSpecialPattern("l"); //Liêng（顺子）
                    break;
                case 12:
                    this.setSpecialPattern("s"); //Sáp（三张）
                    break;
            }
        };
        BaiCaoPattern.prototype.setPatternTxt = function (pattern, type) {
            this.patternTxt.visible = true;
            this.patternTxt.text = pattern + type;
            this.patternImg.visible = false;
            this.patternTxt.y = 5;
        };
        BaiCaoPattern.prototype.setSpecialPattern = function (type) {
            this.patternTxt.visible = true;
            this.patternTxt.text = type;
            this.patternImg.visible = false;
            this.patternTxt.y = 5;
        };
        BaiCaoPattern.prototype.setPatternImg = function (src) {
            this.patternTxt.visible = false;
            this.patternImg.visible = true;
            this.patternImg.source = src;
        };
        return BaiCaoPattern;
    }(game.BaseUI));
    baicao.BaiCaoPattern = BaiCaoPattern;
    __reflect(BaiCaoPattern.prototype, "baicao.BaiCaoPattern");
})(baicao || (baicao = {}));
