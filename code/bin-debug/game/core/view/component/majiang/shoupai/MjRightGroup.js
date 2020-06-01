/*
 * @Author: he bing
 * @Date: 2018-07-13 18:49:41
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-14 10:04:59
 * @Description: 右家杠牌组。
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
    var MjRightGroup = (function (_super) {
        __extends(MjRightGroup, _super);
        //	private nuberColor = [];
        function MjRightGroup() {
            var _this = _super.call(this) || this;
            _this.list = [];
            return _this;
            // this.skinName = new MjRightGroupSkin();
        }
        MjRightGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MjRightGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjRightGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjRightGroup.prototype.findColor = function (e) {
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
        MjRightGroup.prototype.add = function (type, color, pbg) {
            var returnMj;
            if (pbg == 3) {
                this.g2p(color);
            }
            else {
                var mj1 = new majiang.MjRightPg(type, color, this.list.length + 1, pbg);
                if (pbg == 1) {
                    this.p2g(color);
                }
                else {
                    this.addChild(mj1);
                    var index = this.list.length;
                    this.list.push(mj1);
                    //	this.nuberColor.push(color);
                    //this.resetZorder();
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
        /**
     * 抢杠胡牌时，玩家的牌要杠变碰。
     */
        MjRightGroup.prototype.g2p = function (color) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == color) {
                    this.list[i].showColor();
                    this.list[i].dianpaoAni();
                    break;
                }
            }
        };
        MjRightGroup.prototype.p2g = function (value) {
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
        MjRightGroup.prototype.setSortOne = function () {
            var rightGp = [{ x: 0, y: 0 }, { x: 20, y: 83 }, { x: 41, y: 173 }, { x: 63, y: 268 }];
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].x = rightGp[i].x;
                this.list[i].y = rightGp[i].y;
            }
        };
        /**
         * 找花色
         */
        MjRightGroup.prototype.choseColorNumer = function (color) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == color) {
                    return i;
                }
            }
        };
        MjRightGroup.prototype.setSort = function (color) {
            var rightGp = [{ x: 0, y: 50 }, { x: 20, y: 133 }, { x: 41, y: 223 }, { x: 63, y: 318 }];
            switch (color) {
                case 0:
                    this.list[0].x = rightGp[0].x;
                    this.list[0].y = rightGp[0].y;
                    egret.Tween.get(this.list[0]).to({ x: rightGp[0].x, y: rightGp[0].y - 50 }, 200, egret.Ease.circIn);
                    break;
                case 1:
                    this.list[1].x = rightGp[1].x;
                    this.list[1].y = rightGp[1].y;
                    egret.Tween.get(this.list[1]).to({ x: rightGp[1].x, y: rightGp[1].y - 50 }, 200, egret.Ease.circIn);
                    break;
                case 2:
                    this.list[2].x = rightGp[2].x;
                    this.list[2].y = rightGp[2].y;
                    egret.Tween.get(this.list[2]).to({ x: rightGp[2].x, y: rightGp[2].y - 50 }, 200, egret.Ease.circIn);
                    break;
                case 3:
                    this.list[3].x = rightGp[3].x;
                    this.list[3].y = rightGp[3].y;
                    egret.Tween.get(this.list[3]).to({ x: rightGp[3].x, y: rightGp[3].y - 50 }, 200, egret.Ease.circIn);
                    break;
            }
        };
        return MjRightGroup;
    }(game.BaseUI));
    majiang.MjRightGroup = MjRightGroup;
    __reflect(MjRightGroup.prototype, "majiang.MjRightGroup");
})(majiang || (majiang = {}));
