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
 * @Author: MC Lee
 * @Date: 2019-06-13 11:37:56
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-10 17:09:56
 * @Description: 21点头像
 */
var BlackJHeader = (function (_super) {
    __extends(BlackJHeader, _super);
    function BlackJHeader() {
        var _this = _super.call(this) || this;
        _this.angle = 0;
        _this.time = 0;
        _this.isProxy = false;
        return _this;
    }
    BlackJHeader.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.timeShape = new egret.Shape();
        this.timeShape.rotation = -90;
        this.headerGroup.addChild(this.timeShape);
        this.timeShape.x = this.timeBg.x;
        this.timeShape.y = this.timeBg.y;
        this.timeBg.mask = this.timeShape;
        this.liushuiLabel.font = "";
    };
    BlackJHeader.prototype.hideTipGroup = function () {
        this.tipGroup.visible = false;
    };
    BlackJHeader.prototype.showTipsGroup = function (text, autoHide) {
        var _this = this;
        if (autoHide === void 0) { autoHide = true; }
        this.tipGroup.visible = true;
        this.tipLabel.text = text;
        if (autoHide) {
            egret.Tween.removeTweens(this.tipGroup);
            egret.Tween.get(this.tipGroup).wait(2000).call(function () {
                _this.tipGroup.visible = false;
            });
        }
    };
    BlackJHeader.prototype.changePos2Left = function () {
        this.tipImage1.scaleX = -1;
        this.tipGroup.x = -40;
    };
    BlackJHeader.prototype.changePos2Right = function () {
        this.indexGroup.x = -20;
    };
    BlackJHeader.prototype.showLiushui = function (gainGold) {
        this.liushuiGroup.visible = true;
        if (gainGold > 0) {
            this.liushuiBg.source = RES.getRes("blackj_header_win_ls_db_png");
            this.liushuiLabel.font = RES.getRes("blackj_win_fnt");
            if (Global.runBack) {
                this.liushuiLabel.text = gainGold;
            }
            else {
                CountUpUtils.recordStart(this.liushuiLabel, 0, gainGold, 0.5);
            }
        }
        else if (gainGold < 0) {
            this.liushuiLabel.font = RES.getRes("blackj_lose_fnt");
            if (Global.runBack) {
                this.liushuiLabel.text = gainGold;
            }
            else {
                CountUpUtils.recordStart(this.liushuiLabel, 0, gainGold, 0.5);
            }
        }
        else {
            this.liushuiBg.source = RES.getRes("blackj_header_win_ls_db_png");
            this.liushuiLabel.font = "blackj_win_fnt";
            this.liushuiLabel.text = "0";
        }
    };
    /**
     * 展现胜利动画
     */
    BlackJHeader.prototype.showWinAni = function () {
        // let db = new DBComponent("21d_win01");
        // this.headerGroup.addChild(db);
        // db.x = 72;
        // db.y = 90
        // db.playNamesAndLoop(["21d_win01", "21d_win01_loop"]);
    };
    BlackJHeader.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.showShapByPo(0);
    };
    BlackJHeader.prototype.startTimer = function () {
        this.timeBg.visible = true;
        game.UpdateTickerManager.instance.add(this);
    };
    BlackJHeader.prototype.removeTimer = function () {
        game.UpdateTickerManager.instance.remove(this);
        this.timeBg.visible = false;
    };
    BlackJHeader.prototype.update = function () {
        if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
            var endTime = Global.roomProxy.roomInfo.countdown.end;
            var startTime = game.DateTimeManager.instance.now;
            var cha = endTime - startTime;
            var s = Global.roomProxy.roomInfo.countdown.s * 1000;
            var value = Math.floor(360 * cha / s);
            // * 360;
            if (value >= 0) {
                this.showShapByPo(value);
            }
        }
    };
    BlackJHeader.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        game.UpdateTickerManager.instance.remove(this);
    };
    BlackJHeader.prototype.showShapByPo = function (angle) {
        var r = 0;
        var shape = this.timeShape;
        shape.graphics.clear();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.moveTo(r, r); //绘制点移动(r, r)点
        shape.graphics.lineTo(r * 2, r); //画线到弧的起始点
        shape.graphics.drawArc(0, 0, 65, 0, angle * Math.PI / -180, true);
        shape.graphics.lineTo(r, r);
        shape.graphics.endFill();
    };
    BlackJHeader.prototype.showProxys = function (playerIndex) {
        this.visible = true;
        this.isProxy = true;
        this.proxyIndex = playerIndex;
        this.headerGroup.visible = false;
        this.proxyGroup.visible = true;
        var playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
        this.proxyName.text = playerData.nickname;
    };
    /**
     * 提示动画
     * @param  {} isShow
     */
    BlackJHeader.prototype.showTipsImage = function (isShow) {
        if (!isShow) {
            egret.Tween.removeTweens(this.tipImage);
            this.tipImage.visible = false;
        }
        else {
            this.tipImage.visible = true;
            if (this.proxyGroup.visible) {
                this.tipImage.y = 64;
            }
            else {
                this.tipImage.y = -16;
            }
            var startY = this.tipImage.y;
            egret.Tween.get(this.tipImage, { loop: true }).to({
                y: startY - 20
            }, 1000).to({
                y: startY
            }, 1000);
        }
    };
    return BlackJHeader;
}(BaseHeader));
__reflect(BlackJHeader.prototype, "BlackJHeader", ["IUpdate"]);
