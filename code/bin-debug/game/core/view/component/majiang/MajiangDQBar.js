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
/*
 * @Author: li mengchan
 * @Date: 2018-07-11 10:07:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-19 16:02:35
 * @Description: 麻将的定缺条
 */
var majiang;
(function (majiang) {
    var MajiangDQBar = (function (_super) {
        __extends(MajiangDQBar, _super);
        function MajiangDQBar(root) {
            var _this = _super.call(this) || this;
            _this.times = []; //选择次数，仅前端判断。
            _this.root = root;
            _this.skinName = new majiang.MajiangDQBarSkin();
            return _this;
        }
        MajiangDQBar.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        MajiangDQBar.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            var mineShoupai = Global.gameProxy.getMineShuopaiArr();
            var mineData = Global.gameProxy.getMineGameData();
            var color = mineData.selectColorTip ? mineData.selectColorTip : majiang.MajiangUtils.getColorLatestNum(mineShoupai);
            this.btn1.alpha = this.btn2.alpha = this.btn3.alpha = 0.3;
            this.addEffectAni("color1", function (mv) {
                if (mv) {
                    _this.addChild(mv);
                    game.UIUtils.setAnchorPot(mv);
                    _this.effect1 = mv;
                    mv.x = _this.btn1.x + 49;
                    mv.y = _this.btn1.y + 48;
                    if (color == 1) {
                        mv.play(-1);
                    }
                }
            });
            this.addEffectAni("color2", function (mv) {
                if (mv) {
                    _this.addChild(mv);
                    game.UIUtils.setAnchorPot(mv);
                    _this.effect2 = mv;
                    mv.x = _this.btn2.x + 49;
                    mv.y = _this.btn2.y + 48;
                    if (color == 2) {
                        mv.play(-1);
                    }
                }
            });
            this.addEffectAni("color3", function (mv) {
                if (mv) {
                    _this.addChild(mv);
                    game.UIUtils.setAnchorPot(mv);
                    mv.scaleX = mv.scaleY = 1;
                    _this.effect3 = mv;
                    mv.x = _this.btn3.x + 49;
                    mv.y = _this.btn3.y + 48;
                    if (color == 3) {
                        mv.play(-1);
                    }
                }
            });
        };
        MajiangDQBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.btn1:
                    // this.effect1.gotoAndPlay(1);
                    this.root.chooseDQ(1);
                    this.root.otherChose.visible = true;
                    break;
                case this.btn2:
                    // this.effect2.gotoAndPlay(1);
                    this.root.chooseDQ(2);
                    this.root.otherChose.visible = true;
                    break;
                case this.btn3:
                    // this.effect3.gotoAndPlay(1);
                    this.root.chooseDQ(3);
                    this.root.otherChose.visible = true;
                    break;
            }
        };
        /**
         * 胡碰杠
         * @param  {} direction
         * @param  {} effectName
         */
        MajiangDQBar.prototype.addEffectAni = function (effectName, callback) {
            GameCacheManager.instance.getMcCache(effectName, "mine_" + effectName, function (mv) {
                callback && callback(mv);
            });
        };
        return MajiangDQBar;
    }(game.BaseUI));
    majiang.MajiangDQBar = MajiangDQBar;
    __reflect(MajiangDQBar.prototype, "majiang.MajiangDQBar");
})(majiang || (majiang = {}));
