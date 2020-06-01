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
    var BaseChupaiGroup = (function (_super) {
        __extends(BaseChupaiGroup, _super);
        function BaseChupaiGroup() {
            var _this = _super.call(this) || this;
            _this.recordsJson = {};
            _this.chupais = [];
            return _this;
        }
        BaseChupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //记录坐标
            this.setRecords();
            this.group1.removeChildren();
            this.group2.removeChildren();
            this.group3.removeChildren();
        };
        BaseChupaiGroup.prototype.clearDatas = function () {
            this.group1.removeChildren();
            this.group2.removeChildren();
            this.group3.removeChildren();
        };
        /**
         * 设置坐标点
         */
        BaseChupaiGroup.prototype.setRecords = function () {
            for (var i = 1; i <= 21; i++) {
                var image = this['mj' + i];
                this.recordsJson[i] = {};
                this.recordsJson[i].source = image.source;
                this.recordsJson[i].x = image.x;
                this.recordsJson[i].y = image.y;
                this.recordsJson[i].scaleX = image.scaleX;
                this.recordsJson[i].scaleY = image.scaleY;
            }
        };
        BaseChupaiGroup.prototype.removeLastChupai = function () {
            var pai = this.chupais.pop();
            game.UIUtils.removeSelf(pai);
            pai = null;
        };
        BaseChupaiGroup.prototype.getLastChuipai = function () {
            if (this.chupais && this.chupais.length > 0) {
                return this.chupais[this.chupais.length - 1];
            }
            return null;
        };
        BaseChupaiGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.FIND_COLOR, this.findColor, this);
            CF.aE(ENo.FIND_GYZJ_JIPAICOLOR, this.findJiPaiColor, this);
        };
        BaseChupaiGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.FIND_COLOR, this.findColor, this);
            CF.rE(ENo.FIND_GYZJ_JIPAICOLOR, this.findJiPaiColor, this);
        };
        /**
         * 查找颜色相同的
         * @param  {egret.Event} e
         */
        BaseChupaiGroup.prototype.findColor = function (e) {
            var value = e.data;
            for (var i = 0; i < this.chupais.length; i++) {
                this.chupais[i].showMaskRect(value);
            }
        };
        /**	/贵阳捉鸡  把鸡牌标识显示*/
        BaseChupaiGroup.prototype.findJiPaiColor = function (e) {
            var value = e.data;
            if (value && value["gyzj"]) {
                var jipaiData = value["gyzj"];
                for (var i = 0; i < jipaiData.length; ++i) {
                    for (var j = 0; j < this.chupais.length; j++) {
                        if (this.chupais[j].value == jipaiData[i]) {
                            this.chupais[j].maskRect.visible = true;
                        }
                    }
                }
            }
        };
        BaseChupaiGroup.prototype.showDianpaoAni = function (mainCard) {
            if (mainCard == true) {
                return 400;
            }
            else {
                var pai = this.chupais.pop();
                return pai.dianpaoAni();
            }
        };
        return BaseChupaiGroup;
    }(game.BaseUI));
    majiang.BaseChupaiGroup = BaseChupaiGroup;
    __reflect(BaseChupaiGroup.prototype, "majiang.BaseChupaiGroup");
})(majiang || (majiang = {}));
