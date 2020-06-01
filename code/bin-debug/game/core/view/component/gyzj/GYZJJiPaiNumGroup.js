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
    var GYZJJiPaiNumGroup = (function (_super) {
        __extends(GYZJJiPaiNumGroup, _super);
        function GYZJJiPaiNumGroup() {
            var _this = _super.call(this) || this;
            _this.isShaoji = false;
            _this.skinName = "resource/skins/scene/gyzj/GYZJJiPaiNumGroupSkin.exml";
            return _this;
        }
        GYZJJiPaiNumGroup.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        GYZJJiPaiNumGroup.prototype.removeGroupChidren = function () {
            this.mineGroup.removeChildren();
            this.leftGroup.removeChildren();
            this.rightGroup.removeChildren();
            this.topGroup.removeChildren();
        };
        GYZJJiPaiNumGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.removeGroupChidren();
            this.jixuBtn.alpha = 0;
            this.jixuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchJiXu, this);
        };
        GYZJJiPaiNumGroup.prototype.onTouchJiXu = function () {
            CF.dP(ENo.GYZJ_ONCLICKJIXU);
        };
        /**创建鸡牌*/
        GYZJJiPaiNumGroup.prototype.createJiPai = function (chickCardInfo, direction, jiaozui, iswin) {
            if (iswin === void 0) { iswin = false; }
            var currentGroup = this[direction + "Group"];
            if (currentGroup.numChildren > 0)
                currentGroup.removeChildren();
            var _haveShaoJi = this.haveShaoji(chickCardInfo);
            this.setJiaoZuiFlag(direction, jiaozui, iswin, chickCardInfo, jiaozui, _haveShaoJi);
        };
        /**设置叫嘴的标识 */
        GYZJJiPaiNumGroup.prototype.setJiaoZuiFlag = function (direction, isJiaoZui, isWin, chickCardInfo, jiaozui, isShaoJi) {
            var _this = this;
            if (isWin === void 0) { isWin = false; }
            var jiaozuiImg = this[direction + "JiaoZui"];
            var resName;
            if (isWin) {
                resName = "gyzj_over_hu_png";
            }
            else {
                if (isJiaoZui) {
                    resName = "gyzj_over_jiao_png";
                }
                else {
                    resName = "gyzj_over_weij_png";
                }
            }
            if (isShaoJi) {
                resName = "gyzj_over_shaoji_png";
            }
            jiaozuiImg.source = RES.getRes(resName);
            jiaozuiImg.scaleX = 1.3;
            jiaozuiImg.scaleY = 1.3;
            jiaozuiImg.anchorOffsetX = jiaozuiImg.width / 2;
            jiaozuiImg.anchorOffsetY = jiaozuiImg.height / 2;
            egret.Tween.get(jiaozuiImg).to({ scaleX: 0.7, scaleY: 0.7 }, 500, egret.Ease.bounceOut).wait(300).call(function () {
                egret.Tween.get(_this.jixuBtn).to({ alpha: 1 }, 500);
                _this.showChickCard(chickCardInfo, jiaozui, direction, isWin);
            }, this);
        };
        GYZJJiPaiNumGroup.prototype.showChickCard = function (chickCardInfo, jiaozui, direction, iswin) {
            var item;
            var jipai;
            var data = this.chuliShuJu(chickCardInfo);
            for (var key in data) {
                item = data[key];
                jipai = new GYZJJiPai(item.cardVale, item.num, jiaozui, item.isChongFeng);
                jipai.setFont(jiaozui || iswin);
                this[direction + "Group"].addChild(jipai);
            }
        };
        GYZJJiPaiNumGroup.prototype.haveShaoji = function (chickCardInfo) {
            var haveshaoJi = false;
            for (var key in chickCardInfo) {
                var _data = chickCardInfo[key];
                if (JSON.stringify(_data) === '{}') {
                    continue;
                }
                for (var key in _data) {
                    var singleData = _data[key];
                    if (JSON.stringify(singleData) === '{}') {
                        continue;
                    }
                    if (singleData.type == 7) {
                        haveshaoJi = true;
                    }
                }
            }
            return haveshaoJi;
        };
        GYZJJiPaiNumGroup.prototype.chuliShuJu = function (chickCardInfo) {
            var _chickendata = [];
            var _singleItem;
            var obj = {};
            for (var key in chickCardInfo) {
                var _data = chickCardInfo[key];
                if (key == "general") {
                    for (var key in _data) {
                        var _singleData = _data[key];
                        if (JSON.stringify(_singleData) === '{}') {
                            continue;
                        }
                        _singleItem = new ChickCardInfo(Number(key), Number(_singleData.num), false);
                        obj[key] = _singleItem;
                    }
                }
                else if (key == "special") {
                    if (JSON.stringify(_data) === '{}') {
                        continue;
                    }
                    for (var key in _data) {
                        var _singleData = _data[key];
                        if (JSON.stringify(_singleData) === '{}') {
                            continue;
                        }
                        if (obj[key]) {
                            obj[key].num += 1;
                        }
                        else {
                            _singleItem = new ChickCardInfo(Number(key), Number(_singleData.num), false);
                            obj[key] = _singleItem;
                        }
                        if (_singleData.type == 1) {
                            obj[key].isChongFeng = true;
                        }
                    }
                }
            }
            return obj;
        };
        return GYZJJiPaiNumGroup;
    }(game.BaseComponent));
    majiang.GYZJJiPaiNumGroup = GYZJJiPaiNumGroup;
    __reflect(GYZJJiPaiNumGroup.prototype, "majiang.GYZJJiPaiNumGroup");
    var ChickCardInfo = (function () {
        function ChickCardInfo(_cardVal, _num, _ischong) {
            this.cardVale = _cardVal;
            this.num = _num;
            this.isChongFeng = _ischong;
        }
        return ChickCardInfo;
    }());
    __reflect(ChickCardInfo.prototype, "ChickCardInfo");
})(majiang || (majiang = {}));
