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
var GYZJOverItem = (function (_super) {
    __extends(GYZJOverItem, _super);
    function GYZJOverItem() {
        var _this = _super.call(this) || this;
        _this.isWin = false;
        _this.skinName = "resource/skins/component/gyzj/GYZJOverItemSkin.exml";
        return _this;
    }
    GYZJOverItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //this.mineTip.visible = false;
    };
    /**设置倍数的值*/
    GYZJOverItem.prototype.setBeiShu = function (win) {
        var _txt;
        if (win > 0) {
            this.change2Win();
            _txt = "赢";
        }
        if (win < 0) {
            this.panelImage.source = RES.getRes("gyzj_over_biggreen_png");
            _txt = "输";
            this.beishu.textColor = 0Xaaf8ff;
        }
        else if (win == 0) {
            this.panelImage.source = RES.getRes("gyzj_over_biggreen_png");
            this.beishu.textColor = 0Xaaf8ff;
            _txt = "";
        }
        this.beishu.text = _txt + Math.abs(win) + "倍";
    };
    GYZJOverItem.prototype.setWeiZhiLable = function (direction) {
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
    GYZJOverItem.prototype.change2Win = function () {
        this.isWin = true;
    };
    GYZJOverItem.prototype.showPlayerDatas = function (playerData) {
        this.nameLabel.text = playerData.nickname;
        this.headerImage.source = "hall_header_" + playerData.sex + "_" + playerData.figureUrl + "_png";
    };
    GYZJOverItem.prototype.showDefeat = function (isDefeat) {
        if (isDefeat) {
            this.typeImage.visible = true;
            this.typeImage.source = RES.getRes("gyzj_over_renshu_png");
        }
    };
    GYZJOverItem.prototype.showWinFlag = function (type, iswin) {
        if (iswin === void 0) { iswin = false; }
        for (var i = 0; i < type.length; ++i) {
            var _type = type[i].rule;
            this.chooseFlag(_type, iswin);
        }
    };
    GYZJOverItem.prototype.chooseFlag = function (type, iswin) {
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
    GYZJOverItem.prototype.chooseBaoTingFlag = function (isBaoting) {
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
    GYZJOverItem.prototype.showScore = function (score) {
        this.scoreLabel.text = "";
        if (score <= 0) {
            this.scoreLabel.font = "gyzj_over_lose_fnt";
        }
        this.scoreLabel.text = score > 0 ? "+" + score : score;
    };
    /**
     * @param  {} winInfo
     */
    GYZJOverItem.prototype.showWinInfo = function (winInfo) {
        this.scoreLabel.text = "";
        if (winInfo.gainGold <= 0) {
            this.scoreLabel.font = "gyzj_over_lose_fnt";
        }
        this.scoreLabel.text = winInfo.gainGold > 0 ? "+" + winInfo.gainGold : winInfo.gainGold;
    };
    /**
     * 展示流水数据
     */
    GYZJOverItem.prototype.showPlayerBills = function (bills, playerIndex, settleData, roundScoreRules) {
        //if(bills.length==0) this.setLiuShuiBgVis(false);
        for (var i = 0; i < bills.length; i++) {
            var bill = bills[i];
            var info = bill.info;
            var type = bill.type;
            var str1 = void 0;
            var str2 = void 0;
            var str3 = void 0;
            var num = void 0;
            //方位
            str1 = majiang.MajiangUtils.getDirStr(info.from, playerIndex);
            str3 = info["score"] + "倍";
            if (type == 1) {
                var gangContent;
                var gangType = info["gangType"];
                switch (gangType) {
                    case 1:
                        gangContent = "爬坡豆";
                        break;
                    case 2:
                    case 4:
                        gangContent = "闷豆";
                        break;
                    case 3:
                        gangContent = "点豆";
                        break;
                    case 5:
                        gangContent = "杠上杠";
                        break;
                }
                var bei = "";
                // str2 = "抢杠"
                if (info["score"] < 0) {
                    bei = "被";
                    //str2 = "被抢杠"
                }
                str2 = bei + gangContent;
            }
            else if (type == 2) {
                var _winType = void 0;
                for (var i_1 = 0; i_1 < roundScoreRules.length; ++i_1) {
                    var _data = roundScoreRules[i_1];
                    if (_data.rule == 104) {
                        continue;
                    }
                    _winType = _data.rule;
                }
                if (_winType == 2) {
                    str2 = "自摸";
                }
                else if (_winType == 101) {
                    str2 = "杠上花";
                }
                else if (_winType == 102) {
                    str2 = "热炮";
                }
                else if (_winType == 103) {
                    str2 = "抢杠胡";
                }
                else if (_winType == 105) {
                    str2 = "天胡";
                }
                else if (_winType == 107) {
                    str2 = "地胡";
                }
                if (_winType == 1) {
                    if (info["score"] > 0) {
                        str2 = "接炮";
                    }
                    else {
                        str2 = "点炮";
                    }
                }
            }
            else if (type == 16) {
                var minechickType = info["type"];
                num = info["num"];
                str2 = this.getChickChinese(minechickType) + "(" + num + "张" + ")";
                //	LogUtils.logD("==============" + str2);
                // str3 = info["score"] + "倍";
                // let item = new GYZJOverItemRenderer();
                // item.showText(str1, str2, str3, this.isWin);
                // this.mainGroup.addChild(item)
            }
            else if (type == 3) {
                // let str = info.winner || info.from;
                if (info["score"] < 0) {
                    str2 = "被查叫";
                }
                else {
                    str2 = "查叫";
                }
            }
            var item = new GYZJOverItemRenderer();
            item.showText(str1, str2, str3, this.isWin); // this.isWin
            this.mainGroup.addChild(item);
        }
    };
    GYZJOverItem.prototype.getChickChinese = function (type) {
        switch (type) {
            case 1:
                return "冲锋鸡";
            case 2:
                return "责任鸡";
            case 3:
                return "包鸡";
            case 4:
                return "捉鸡";
            case 5:
                return "幺鸡";
            case 6:
                return "八筒";
            default:
                return "你传的type 我这里没有";
        }
    };
    return GYZJOverItem;
}(eui.Component));
__reflect(GYZJOverItem.prototype, "GYZJOverItem");
