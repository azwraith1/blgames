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
    var BaiCaoHeader = (function (_super) {
        __extends(BaiCaoHeader, _super);
        function BaiCaoHeader() {
            var _this = _super.call(this) || this;
            _this.haveHide = false;
            return _this;
        }
        BaiCaoHeader.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.timeBg.alpha = 0.6;
        };
        BaiCaoHeader.prototype.hideClock = function () {
            this.timeGroup.visible = false;
            this.haveHide = true;
            SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
        };
        BaiCaoHeader.prototype.showClock = function (delay) {
            var _this = this;
            this.haveHide = false;
            this.setAutoTimeout(function () {
                if (_this.haveHide)
                    return;
                _this.timeGroup.visible = true;
                SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
                SoundManager.getInstance().playEffect("bc_timer_mp3", true);
            }, this, delay);
        };
        BaiCaoHeader.prototype.setBetState = function (type, bet) {
            if (type == 0) {
                this.betState.visible = false;
                return;
            }
            this.betState.visible = true;
            this.betState.font = null;
            this.betState.text = "";
            this.betState.font = type == 1 ? "superbaicao_lose_fnt" : "superbaicao_win_fnt";
            var txtVal;
            switch (type) {
                //放弃
                case 1:
                    txtVal = "f";
                    break;
                //跟注 
                case 2:
                    txtVal = "g";
                    break;
                //加注
                case 3:
                    txtVal = "j" + "+" + bet;
                    break;
            }
            this.betState.text = txtVal;
        };
        BaiCaoHeader.prototype.showShapByPo = function (angle) {
            var r = 0;
            var shape = this.timeShape;
            shape.graphics.clear();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.moveTo(r, r); //绘制点移动(r, r)点
            shape.graphics.lineTo(r * 2, r); //画线到弧的起始点
            shape.graphics.drawArc(0, 0, 37, 0, angle * Math.PI / -180, true); //-
            shape.graphics.lineTo(r, r);
            shape.graphics.endFill();
        };
        BaiCaoHeader.prototype.playChuPaiDB = function () {
            //this.chupaiDB = Owen.UtilsString.playDB("superbaicao_nc", this.dbGroup, -1);
        };
        BaiCaoHeader.prototype.stopChuPaiDB = function () {
            if (this.chupaiDB) {
                game.UIUtils.removeSelf(this.chupaiDB);
                this.chupaiDB = null;
            }
        };
        BaiCaoHeader.prototype.update = function () {
            if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
                var endTime = Global.roomProxy.roomInfo.countdown.end;
                var startTime = game.DateTimeManager.instance.now;
                var cha = endTime - startTime;
                var s = Global.roomProxy.roomInfo.countdown.s;
                var value = Math.floor(360 * cha / s);
                // * 360;
                if (value >= 0) {
                    this.showShapByPo(value);
                }
                this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
            }
        };
        BaiCaoHeader.prototype.mineReseatLiushuiPos = function (haveBack) {
            if (haveBack) {
                this.rebackTxt.visible = true;
                this.liushuiGroup.visible = true;
                this.liushuiLabel.verticalCenter = -17;
                this.rebackTxt.verticalCenter = 23;
            }
            else {
                this.rebackTxt.visible = false;
                this.liushuiLabel.verticalCenter = 10;
                //this.liushuiGroup.visible = false;
            }
        };
        BaiCaoHeader.prototype.otherReseatLiushuiPos = function (haveBack) {
            if (haveBack) {
                this.liushuiGroup.visible = true;
                this.rebackTxt.visible = true;
                this.liushuiLabel.verticalCenter = -17;
                this.rebackTxt.verticalCenter = 16;
            }
            else {
                this.rebackTxt.visible = false;
                this.liushuiLabel.verticalCenter = 10;
                //this.liushuiGroup.visible = false;
            }
        };
        BaiCaoHeader.prototype.playDB = function () {
            this.db = Owen.UtilsString.createDBLoop("ynbc_win", this.effectGroup);
        };
        BaiCaoHeader.prototype.disposeDB = function () {
            if (this.db) {
                game.UIUtils.removeSelf(this.db);
                SoundManager.getInstance().stopEffectByName("bc_win_mp3");
                this.db = null;
            }
        };
        BaiCaoHeader.prototype.playWinMusic = function () {
            SoundManager.getInstance().playEffect("bc_win_mp3");
        };
        BaiCaoHeader.prototype.showLiushui = function (gainGold) {
            this.liushuiGroup.visible = true;
            this.liushuiLabel.visible = true;
            if (gainGold > 0) {
                this.liushuiLabel.font = RES.getRes("baicao_common_fnt");
                if (Global.runBack) {
                    this.liushuiLabel.text = gainGold;
                }
                else {
                    this.liushuiLabel.text = gainGold + "";
                }
            }
            else if (gainGold <= 0) {
                this.liushuiLabel.font = RES.getRes("baicao_lose_fnt");
                if (Global.runBack) {
                    this.liushuiLabel.text = gainGold;
                }
                else {
                    this.liushuiLabel.text = gainGold + "";
                }
            }
        };
        BaiCaoHeader.prototype.showSuperLiushui = function (gainGold) {
            this.liushuiGroup.visible = true;
            this.liushuiLabel.visible = true;
            if (gainGold > 0) {
                this.liushuiLabel.font = RES.getRes("superbaicao_win_fnt");
                if (Global.runBack) {
                    this.liushuiLabel.text = gainGold;
                }
                else {
                    this.liushuiLabel.text = gainGold + "";
                }
            }
            else if (gainGold < 0) {
                this.liushuiLabel.font = RES.getRes("superbaicao_lose_fnt");
                if (Global.runBack) {
                    this.liushuiLabel.text = gainGold;
                }
                else {
                    this.liushuiLabel.text = gainGold + "";
                }
            }
            else {
                this.liushuiLabel.visible = false;
            }
        };
        return BaiCaoHeader;
    }(BlackJHeader));
    baicao.BaiCaoHeader = BaiCaoHeader;
    __reflect(BaiCaoHeader.prototype, "baicao.BaiCaoHeader");
})(baicao || (baicao = {}));
