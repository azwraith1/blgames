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
var GYZJNewOverItem = (function (_super) {
    __extends(GYZJNewOverItem, _super);
    function GYZJNewOverItem() {
        var _this = _super.call(this) || this;
        _this.isWin = false;
        _this.skinName = "resource/skins/component/gyzj/GYZJNewOverItemSkin.exml";
        return _this;
    }
    /**设置倍数的值*/
    GYZJNewOverItem.prototype.setBeiShu = function (win) {
        var _txt;
        if (win > 0) {
            _txt = "赢";
            this.panelImage.source = RES.getRes("gyzj_over_smallyellow_png");
            this.beishu.textColor = 0Xffe9c2;
        }
        if (win < 0) {
            _txt = "输";
        }
        else if (win == 0) {
            _txt = "";
        }
        this.beishu.text = _txt + Math.abs(win) + "倍";
    };
    GYZJNewOverItem.prototype.change2Win = function () {
        this.isWin = true;
    };
    GYZJNewOverItem.prototype.setWeiZhiLable = function (direction) {
        var _resouce;
        switch (direction) {
            case "1":
                this.weiZhi.source = RES.getRes("gyzj_weizhi1_png");
                break;
            case "2":
                this.weiZhi.source = RES.getRes("gyzj_weizhi2_png");
                break;
            case "3":
                this.weiZhi.source = RES.getRes("gyzj_weizhi3_png");
                break;
            case "4":
                this.weiZhi.source = RES.getRes("gyzj_weizhi4_png");
                break;
            default:
                break;
        }
    };
    GYZJNewOverItem.prototype.showPlayerDatas = function (playerData) {
        this.nameLabel.text = playerData.nickname;
        this.headerImage.source = "hall_header_" + playerData.sex + "_" + playerData.figureUrl + "_png";
    };
    GYZJNewOverItem.prototype.showDefeat = function (isDefeat) {
        if (isDefeat) {
            this.typeImage.visible = true;
            this.typeImage.source = RES.getRes("gyzj_over_renshu_png");
        }
    };
    GYZJNewOverItem.prototype.showWinFlag = function (type, iswin) {
        if (iswin === void 0) { iswin = false; }
        for (var i = 0; i < type.length; ++i) {
            var _type = type[i].rule;
            this.chooseFlag(_type, iswin);
        }
    };
    GYZJNewOverItem.prototype.chooseFlag = function (type, iswin) {
        if (iswin === void 0) { iswin = false; }
        var res;
        switch (type) {
            //自摸
            case 2:
                res = "gyzj_over_zimo_png";
                this.typeImage.source = RES.getRes(res);
                LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
                break;
            //点炮
            case 1:
                res = "gyzj_over_dianpao_png";
                if (iswin) {
                    res = "gyzj_over_hupai_png";
                }
                this.typeImage.source = RES.getRes(res);
                LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
                break;
            //抢杠胡
            case 103:
                res = "gyzj_over_qgh_png";
                this.typeImage.source = RES.getRes(res);
                LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
                break;
        }
    };
    /**报听*/
    GYZJNewOverItem.prototype.chooseBaoTingFlag = function (isBaoting) {
        var res;
        if (isBaoting) {
            res = "gyzj_over_jiaozui_png";
        }
        else {
            res = "gyzj_weijiao_png";
        }
        this.typeImage.source = RES.getRes(res);
        LogUtils.logD("资源的名字：" + res + "===否存在====" + this.typeImage.source);
    };
    GYZJNewOverItem.prototype.showScore = function (score) {
        this.scoreLabel.text = "";
        if (score <= 0) {
            this.scoreLabel.font = "gyzj_over_lose_fnt";
        }
        this.scoreLabel.text = score > 0 ? "+" + score : score;
    };
    /**
 * @param  {} winInfo
 */
    GYZJNewOverItem.prototype.showWinInfo = function (winInfo) {
        this.scoreLabel.text = "";
        if (winInfo.gainGold <= 0) {
            this.scoreLabel.font = "gyzj_over_lose_fnt";
        }
        this.scoreLabel.text = winInfo.gainGold > 0 ? "+" + winInfo.gainGold : winInfo.gainGold;
    };
    return GYZJNewOverItem;
}(eui.Component));
__reflect(GYZJNewOverItem.prototype, "GYZJNewOverItem");
