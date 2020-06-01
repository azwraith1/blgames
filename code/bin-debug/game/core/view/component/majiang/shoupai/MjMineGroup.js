/*
 * @Author: he bing
 * @Date: 2018-07-13 18:46:17
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-19 15:07:20
 * @Description: 自己杠牌组
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
    var MjMineGroup = (function (_super) {
        __extends(MjMineGroup, _super);
        //碰的牌的顺序
        //private nuberColor = [];
        function MjMineGroup() {
            var _this = _super.call(this) || this;
            _this.list = [];
            return _this;
            // this.skinName = new MjMimeGroupSkin();
        }
        MjMineGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MjMineGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjMineGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.FIND_COLOR, this.findColor, this);
        };
        MjMineGroup.prototype.findColor = function (e) {
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
        MjMineGroup.prototype.add = function (type, color, pbg) {
            var returnMj;
            if (pbg == 3) {
                this.g2p(color);
            }
            else {
                var mj1 = new majiang.MjziPg(type, color, this.list.length + 1, pbg);
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
        MjMineGroup.prototype.g2p = function (color) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == color) {
                    this.list[i].showColor();
                    this.list[i].dianpaoAni();
                    break;
                }
            }
        };
        /**
         * 碰变杠
         */
        MjMineGroup.prototype.p2g = function (value) {
            for (var i = 0; i < this.list.length; i++) {
                if (value == this.list[i]["color"]) {
                    this.list[i].showColor_m();
                    break;
                }
            }
        };
        /**
         * 玩家断线重连的赋值方法
         */
        MjMineGroup.prototype.setSortOne = function () {
            var mineGp = [{ x: 436, y: 0 }, { x: 291, y: 0 }, { x: 145, y: 0 }, { x: 0, y: 0 }];
            for (var i = this.list.length - 1; i < this.list.length; i++) {
                this.list[i].x = mineGp[i].x;
                this.list[i].y = mineGp[i].y;
            }
        };
        /**
         * 找花色
         */
        MjMineGroup.prototype.choseColorNumer = function (color) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].color == color) {
                    return i;
                }
            }
        };
        /**
         * 正常进入游戏的赋值方法，需要动画。
         */
        MjMineGroup.prototype.setSort = function (color) {
            var mineGp = [{ x: 336, y: 0 }, { x: 191, y: 0 }, { x: 45, y: 0 }, { x: -100, y: 0 }];
            switch (color) {
                // switch (this.choseColorNumer(color)) {
                case 0:
                    this.list[0].x = mineGp[0].x;
                    this.list[0].y = mineGp[0].y;
                    egret.Tween.get(this.list[0]).to({ x: mineGp[0].x + 100 }, 200, egret.Ease.circIn);
                    break;
                case 1:
                    this.list[1].x = mineGp[1].x;
                    this.list[1].y = mineGp[1].y;
                    egret.Tween.get(this.list[1]).to({ x: mineGp[1].x + 100 }, 200, egret.Ease.circIn);
                    break;
                case 2:
                    this.list[2].x = mineGp[2].x;
                    this.list[2].y = mineGp[2].y;
                    egret.Tween.get(this.list[2]).to({ x: mineGp[2].x + 100 }, 200, egret.Ease.circIn);
                    break;
                case 3:
                    this.list[3].x = mineGp[3].x;
                    this.list[3].y = mineGp[3].y;
                    egret.Tween.get(this.list[3]).to({ x: mineGp[3].x + 100 }, 200, egret.Ease.circIn);
                    break;
            }
        };
        return MjMineGroup;
    }(game.BaseUI));
    majiang.MjMineGroup = MjMineGroup;
    __reflect(MjMineGroup.prototype, "majiang.MjMineGroup");
})(majiang || (majiang = {}));
