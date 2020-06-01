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
var MainHallButton = (function (_super) {
    __extends(MainHallButton, _super);
    function MainHallButton(buttonData) {
        var _this = _super.call(this) || this;
        _this.buttonData = buttonData;
        if (_this.buttonData.grade == GRADE.RECOMMEND) {
            _this.skinName = new MainHallBigBtnSkin();
        }
        else {
            _this.skinName = new MainHallSmallBtnSkin();
        }
        return _this;
    }
    MainHallButton.prototype.showButtonAni = function (delay) {
        var _this = this;
        //	this.time1 = delay;
        egret.Tween.removeTweens(this.aniGroup);
        this.aniGroup.scaleX = 0;
        this.aniGroup.scaleY = 0;
        this.aniGroup.alpha = 0;
        this.visible = false;
        egret.Tween.get(this.aniGroup).wait(delay).call(function () {
            _this.visible = true;
        }).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut).to({ scaleX: 0.95, scaleY: 0.95 }, 100, egret.Ease.quadOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.quadOut);
        egret.Tween.get(this.aniGroup).wait(delay).to({ alpha: 0.6 }, 280, egret.Ease.quadOut).to({ alpha: 0.95 }, 280, egret.Ease.quadOut).to({ alpha: 1 }, 50, egret.Ease.quadOut);
    };
    MainHallButton.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var grade = this.buttonData.grade;
        if (grade == GRADE.HOT) {
            this.showHot();
        }
        else if (grade == GRADE.NEW) {
            this.showNew();
        }
        this.peopleImage.visible = this.pepleCountLabel.visible = !(this.buttonData.baseCountHide == 1);
        this.dbGroup.touchEnabled = false;
        this.dbGroup.touchChildren = false;
        if (this.buttonData.gameId == "mjxzdd" && this.buttonData.grade == GRADE.RECOMMEND) {
            this.titleImage.source = RES.getRes("main_title_mjxlch_big_png");
        }
        else {
            var str = "main_title_" + this.buttonData.gameId + CF.tic;
            if (!RES.hasRes(str)) {
                str = "main_title_" + this.buttonData.gameId + "_png";
            }
            this.titleImage.source = RES.getRes(str);
        }
        this.createDb();
        Owen.UtilsString.playDB("dt20_tittle", this.titleDB, -1);
    };
    MainHallButton.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        game.UIUtils.setAnchorPot(this);
    };
    MainHallButton.prototype.onTouchTap = function (e) {
        var _this = this;
        LogUtils.logD("=====onTouchTap======" + this.buttonData.gameId);
        majiang.MajiangUtils.playClick();
        egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            if (_this.buttonData.grade == GRADE.DEV) {
                Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
                return;
            }
            else if (_this.buttonData.grade == GRADE.MAINTENANCE) {
                Global.alertMediator.addAlert("游戏维护中", null, null, true);
                return;
            }
            CF.dP(ENo.JOIN_SCENE_GAMEID, { gameId: _this.buttonData.gameId });
        });
    };
    MainHallButton.prototype.updatePlayerCount = function () {
        if (this.buttonData.grade == GRADE.DEV) {
            this.pepleCountLabel.text = "敬请期待";
            return;
        }
        if (this.buttonData.grade == GRADE.MAINTENANCE) {
            this.pepleCountLabel.text = "维护中";
            return;
        }
        this.pepleCountLabel.text = Global.gameProxy.peoplesCounts[this.buttonData.gameId];
    };
    MainHallButton.prototype.checkAlapa = function (offersetX, width) {
        // if (this.buttonData.gameId != "mjxzdd") {
        return;
        // }
        egret.Tween.removeTweens(this);
        var alpha = -1;
        if (offersetX > 0) {
            var maxX = this.x + this.width - this.anchorOffsetX;
            var minX = this.x - this.anchorOffsetX + this.width / 3;
            var nowPoint = offersetX;
            if (nowPoint < minX) {
                alpha = 1;
            }
            else {
                if (nowPoint >= minX && nowPoint < maxX) {
                    var cha = nowPoint - minX;
                    alpha = this.getChaAlphaByRight(cha);
                }
            }
        }
        else {
            var maxX = this.x + this.width / 2 - this.width / 4 + this.anchorOffsetX;
            var minX = this.x - this.width / 2 - this.width / 4 + this.anchorOffsetX;
            var nowPoint = width + offersetX;
            if (this.buttonData.gameId == "slot" || this.buttonData.gameId == "dzmj") {
                var pOffersetX = maxX + offersetX;
                if (nowPoint >= maxX) {
                    alpha = 1;
                }
                else {
                    if (nowPoint >= minX && nowPoint < maxX) {
                        var cha = maxX - nowPoint;
                        alpha = this.getChaAlphaByRight(cha);
                    }
                }
            }
        }
        if (alpha && alpha > -1) {
            egret.Tween.get(this).to({
                alpha: alpha
            }, 50);
        }
    };
    MainHallButton.prototype.getChaAlphaByRight = function (cha) {
        if (cha > 0 && cha < this.width / 95) {
            return 1;
        }
        else if (cha >= this.width / 95 && cha < this.width / 80) {
            return 0.6;
        }
        else if (cha >= this.width / 80 && cha < this.width / 70) {
            return 0.5;
        }
        else if (cha >= this.width / 70 && cha < this.width / 50) {
            return 0.4;
        }
        else if (cha >= this.width / 50 && cha < this.width / 30) {
            return 0.3;
        }
        else if (cha >= this.width / 30 && cha < this.width) {
            return 0.2;
        }
    };
    MainHallButton.prototype.createDb = function () {
        if (!this.buttonData.gameId) {
            return;
        }
        var mc = GameCacheManager.instance.getCache("mian_button" + this.buttonData.gameId);
        if (!mc) {
            if (this.buttonData.gameId == "scmj") {
                mc = new DBComponent("mjxzdd", false);
            }
            else if (this.buttonData.gameId == "mjxzdd" && this.buttonData.grade == GRADE.RECOMMEND) {
                mc = new DBComponent("mjxzdd_big", false);
            }
            else {
                mc = new DBComponent("" + this.buttonData.gameId, false);
            }
        }
        if (mc) {
            this.dbGroup.addChild(mc);
            var gameId = this.buttonData.gameId;
            if (gameId == "sicbo" || gameId == "texaspoker" || this.buttonData.gameId == "mjxzdd" && this.buttonData.grade == GRADE.RECOMMEND) {
                mc.playDefault(-1);
            }
            else {
                mc.playByFilename(-1);
            }
            mc.verticalCenter = 0;
            mc.horizontalCenter = 0;
            this.mc = mc;
        }
    };
    MainHallButton.prototype.showHot = function () {
        //this.hotImage.visible = true;
        this.hotImageGroup.visible = true;
        if (!this.hotDb) {
            this.hotDb = new DBComponent("dt20_hot", false); //fire
        }
        this.hotImageGroup.addChild(this.hotDb);
        this.hotDb.verticalCenter = 0;
        this.hotDb.horizontalCenter = 0;
        this.hotDb.play("dt20_hot", -1); //fire
    };
    MainHallButton.prototype.showNew = function () {
        //	this.newImage.visible = true;
        this.hotImageGroup.removeChildren();
        Owen.UtilsString.playDB("dt20_update", this.hotImageGroup, -1);
    };
    return MainHallButton;
}(game.BaseUI));
__reflect(MainHallButton.prototype, "MainHallButton");
//游戏级别
var GRADE = {
    RECOMMEND: 1,
    HOT: 2,
    NEW: 3,
    COMMON: 4,
    DEV: 5,
    HIDE: 6,
    MAINTENANCE: 7 //维护
};
