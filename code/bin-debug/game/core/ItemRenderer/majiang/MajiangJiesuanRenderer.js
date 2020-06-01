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
var majiang;
(function (majiang) {
    var MajiangJiesuanRenderer = (function (_super) {
        __extends(MajiangJiesuanRenderer, _super);
        function MajiangJiesuanRenderer(data) {
            var _this = _super.call(this) || this;
            _this.data = data;
            _this.skinName = new MajiangJiesuan();
            return _this;
        }
        MajiangJiesuanRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var num = this.data;
            for (var i in num) {
                //产生的动作，分正值和负值
                if (i === "type") {
                    this.dongzuo = num[i];
                }
                else if (i === "info") {
                    for (var j in num[i]) {
                        var values = num[i][j];
                        if (j === "gainGold") {
                            if (this.dongzuo == 6) {
                                this.dongzuoxiang.text = "呼叫转移";
                            }
                            else {
                                var from = num["info"]["from"];
                                var texcontent = majiang.MajiangUtils.getBiliTypeStr(this.dongzuo, values, from);
                                //this.dongzuoxiang.text = MajiangUtils.getBiliTypeStr(this.dongzuo, values, num["info"]["from"]);
                                this.dongzuoxiang.text = texcontent + this.getDirec(num["info"]["from"]);
                            }
                            //this.dongzuoxiang.textColor = this.socreW2L(values);
                            if (values > 0) {
                                this.fen.text = "+" + NumberFormat.formatGold_scence(values);
                                this.fen.textColor = this.socreW2L(values);
                            }
                            else {
                                this.fen.text = NumberFormat.formatGold_scence(values);
                                this.fen.textColor = this.socreW2L(values);
                            }
                            this.fenshu = NumberFormat.formatGold_scence(values);
                        }
                        else if (j === "gangType") {
                            if (this.dongzuo == 6) {
                                this.dongzuoxiang.text = "呼叫转移";
                            }
                            else {
                                //samrt
                                texcontent = majiang.MajiangUtils.getGangTypeStr(values, this.fenshu);
                                //this.dongzuoxiang.text = MajiangUtils.getGangTypeStr(values, this.fenshu, num["info"]["from"], Global.gameProxy.getMineIndex());
                                this.dongzuoxiang.text = texcontent + this.getDirec(num["info"]["from"]);
                            }
                            //	this.dongzuoxiang.textColor = this.socreW2L(this.fenshu);
                        }
                    }
                }
            }
        };
        MajiangJiesuanRenderer.prototype.getDirec = function (from) {
            var mineIndex = Global.gameProxy.getMineIndex();
            // return "(" + MajiangUtils.getDirStr(from, mineIndex) + ")";
            return "";
        };
        /**
         * 判断分数正负颜色
         */
        MajiangJiesuanRenderer.prototype.socreW2L = function (nums) {
            if (nums >= 0) {
                return 0xf6b74b;
                //return 0xfff729;
            }
            else {
                return 0xc4dfff;
                //return 0xffffff;
            }
        };
        /**原来字体颜色 */
        /**
 * 判断分数正负颜色
 */
        MajiangJiesuanRenderer.prototype.socreW2LYuanlai = function (nums) {
            if (nums >= 0) {
                return 0xfff729;
            }
            else {
                return 0xffffff;
            }
        };
        return MajiangJiesuanRenderer;
    }(game.BaseUI));
    majiang.MajiangJiesuanRenderer = MajiangJiesuanRenderer;
    __reflect(MajiangJiesuanRenderer.prototype, "majiang.MajiangJiesuanRenderer");
})(majiang || (majiang = {}));
