/*
 * @Author: he bing
 * @Date: 2018-07-13 18:47:06
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-14 10:12:21
 * @Description: 麻将上家杠牌组
 */
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
    var MjTopGroup = (function (_super) {
        __extends(MjTopGroup, _super);
        //	private nuberColor = [];
        function MjTopGroup() {
            var _this = _super.call(this) || this;
            _this.list = [];
            return _this;
            // this.skinName = new MjTopGroupSkin();
        }
        MjTopGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MjTopGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjTopGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjTopGroup.prototype.findColor = function (e) {
            var value = e.data;
            for (var i = 0; i < this.list.length; i++) {
                var pgItem = this.list[i];
                if (pgItem.type == 10) {
                    //吃牌
                    this.list[i].showRect(0);
                    pgItem.checkShowRect(value);
                }
                else {
                    if (pgItem.color == value) {
                        this.list[i].showRect(value);
                    }
                    else {
                        this.list[i].showRect(0);
                    }
                }
            }
        };
        MjTopGroup.prototype.add = function (type, color, pbg) {
            var returnMj;
            if (pbg == 3) {
                this.g2p(color);
            }
            else {
                var mj1 = new majiang.MjShangPg(type, color, this.list.length + 1, pbg);
                if (pbg == 1) {
                    this.p2g(color);
                }
                else {
                    this.addChild(mj1);
                    var index = this.list.length;
                    this.list.push(mj1);
                    //this.nuberColor.push(color);
                    if (pbg == 2) {
                        this.setSortOne();
                    }
                    else {
                        this.setSort(index);
                    }
                }
                returnMj = mj1;
            }
            return returnMj;
        };
        /**
         * 抢杠胡牌时，玩家的牌要杠变碰。
         */
        MjTopGroup.prototype.g2p = function (color) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == color) {
                    this.list[i].showColor();
                    this.list[i].dianpaoAni();
                    break;
                }
            }
        };
        MjTopGroup.prototype.p2g = function (value) {
            for (var i = 0; i < this.list.length; i++) {
                if (value == this.list[i]["color"]) {
                    this.list[i].showColor_pbg();
                    break;
                }
            }
        };
        /**
     * 玩家断线重连的赋值方法
     */
        MjTopGroup.prototype.setSortOne = function () {
            var topGp = [{ x: 0, y: 0 }, { x: 113, y: 0 }, { x: 224, y: 0 }, { x: 336, y: 0 }];
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].x = topGp[i].x;
                this.list[i].y = topGp[i].y;
            }
        };
        /**
     * 找花色
     */
        MjTopGroup.prototype.choseColorNumer = function (color) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == color) {
                    return i;
                }
            }
        };
        MjTopGroup.prototype.setSort = function (color) {
            var topGp = [{ x: 100, y: 0 }, { x: 213, y: 0 }, { x: 324, y: 0 }, { x: 436, y: 0 }];
            switch (color) {
                case 0:
                    this.list[0].x = topGp[0].x;
                    this.list[0].y = topGp[0].y;
                    egret.Tween.get(this.list[0]).to({ x: topGp[0].x - 100 }, 200, egret.Ease.circIn);
                    break;
                case 1:
                    this.list[1].x = topGp[1].x;
                    this.list[1].y = topGp[1].y;
                    egret.Tween.get(this.list[1]).to({ x: topGp[1].x - 100 }, 200, egret.Ease.circIn);
                    break;
                case 2:
                    this.list[2].x = topGp[2].x;
                    this.list[2].y = topGp[2].y;
                    egret.Tween.get(this.list[2]).to({ x: topGp[2].x - 100 }, 200, egret.Ease.circIn);
                    break;
                case 3:
                    this.list[3].x = topGp[3].x;
                    this.list[3].y = topGp[3].y;
                    egret.Tween.get(this.list[3]).to({ x: topGp[3].x - 100 }, 200, egret.Ease.circIn);
                    break;
            }
        };
        return MjTopGroup;
    }(game.BaseUI));
    majiang.MjTopGroup = MjTopGroup;
    __reflect(MjTopGroup.prototype, "majiang.MjTopGroup");
})(majiang || (majiang = {}));
