/*
 * @Author: he bing
 * @Date: 2018-07-13 18:49:06
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-14 10:12:28
 * @Description: 左家杠牌组
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
    var MjLeftGroup = (function (_super) {
        __extends(MjLeftGroup, _super);
        //private nuberColor = [];
        function MjLeftGroup() {
            var _this = _super.call(this) || this;
            _this.list = [];
            return _this;
            // this.skinName = new MjLeftGroupSkin();
        }
        MjLeftGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MjLeftGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjLeftGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjLeftGroup.prototype.findColor = function (e) {
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
        MjLeftGroup.prototype.add = function (type, color, pbg) {
            var returnMj;
            if (pbg == 3) {
                this.g2p(color);
            }
            else {
                var mj1 = new majiang.MjLeftPg(type, color, this.list.length + 1, pbg);
                if (pbg == 1) {
                    this.p2g(color);
                }
                else {
                    this.addChild(mj1);
                    var index = this.list.length;
                    this.list.push(mj1);
                    this.resetZorder();
                    if (pbg == 2) {
                        this.setSortOne();
                    }
                    else {
                        this.setSort(index);
                    }
                }
                returnMj = mj1;
                return returnMj;
            }
        };
        // public addItems(type, value) {
        // 	let mj1 = new MjLeftPg(type, value, this.list.length + 1);
        // 	this.list.push(mj1);
        // 	this.addChild(mj1);
        // 	this.setSort(value);
        // 	this.resetZorder();
        // }
        /**
         * 调整层级
         */
        MjLeftGroup.prototype.resetZorder = function () {
            for (var i = this.list.length - 1; i >= 0; i--) {
                this.addChild(this.list[i]);
            }
        };
        /**
         * 抢杠胡牌时，玩家的牌要杠变碰。
         */
        MjLeftGroup.prototype.g2p = function (color) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == color) {
                    this.list[i].showColor();
                    this.list[i].dianpaoAni();
                    break;
                }
            }
        };
        MjLeftGroup.prototype.p2g = function (value) {
            for (var i = 0; i < this.list.length; i++) {
                if (value == this.list[i].color) {
                    this.list[i].showColor_pbg();
                    break;
                }
            }
        };
        /**
         * 玩家断线重连的赋值方法
         */
        MjLeftGroup.prototype.setSortOne = function () {
            var leftGp = [{ x: 0, y: 307 }, { x: 25, y: 195 }, { x: 48, y: 94 }, { x: 71, y: 0 }];
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].x = leftGp[i].x;
                this.list[i].y = leftGp[i].y;
            }
        };
        /**
         * 找花色
         */
        MjLeftGroup.prototype.choseColorNumer = function (value) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == value) {
                    return i;
                }
            }
        };
        MjLeftGroup.prototype.setSort = function (color) {
            var leftGp = [{ x: 0, y: 257 }, { x: 25, y: 145 }, { x: 48, y: 44 }, { x: 71, y: -50 }];
            switch (color) {
                case 0:
                    this.list[0].x = leftGp[0].x;
                    this.list[0].y = leftGp[0].y;
                    egret.Tween.get(this.list[0]).to({ x: leftGp[0].x, y: leftGp[0].y + 50 }, 200, egret.Ease.circIn);
                    break;
                case 1:
                    this.list[1].x = leftGp[1].x;
                    this.list[1].y = leftGp[1].y;
                    egret.Tween.get(this.list[1]).to({ x: leftGp[1].x, y: leftGp[1].y + 50 }, 200, egret.Ease.circIn);
                    break;
                case 2:
                    this.list[2].x = leftGp[2].x;
                    this.list[2].y = leftGp[2].y;
                    egret.Tween.get(this.list[2]).to({ x: leftGp[2].x, y: leftGp[2].y + 50 }, 200, egret.Ease.circIn);
                    break;
                case 3:
                    this.list[3].x = leftGp[3].x;
                    this.list[3].y = leftGp[3].y;
                    egret.Tween.get(this.list[3]).to({ x: leftGp[3].x, y: leftGp[3].y + 50 }, 200, egret.Ease.circIn);
                    break;
            }
        };
        return MjLeftGroup;
    }(game.BaseUI));
    majiang.MjLeftGroup = MjLeftGroup;
    __reflect(MjLeftGroup.prototype, "majiang.MjLeftGroup");
})(majiang || (majiang = {}));
