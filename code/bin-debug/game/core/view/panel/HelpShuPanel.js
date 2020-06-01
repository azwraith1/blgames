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
 * @Author: he bing
 * @Date: 2018-07-31 15:05:10
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-08-23 17:35:51
 * @Description:
 */
var HelpShuPanel = (function (_super) {
    __extends(HelpShuPanel, _super);
    function HelpShuPanel(type) {
        var _this = _super.call(this) || this;
        _this.HELP_PANEL_NOTIFY = PanelNotify.CLOSE_HELP_SHU;
        //记录选择的游戏帮助的按钮
        _this.btnTimer = 0;
        _this.type = type;
        _this.skinName = new NiuniuHelpSkin();
        return _this;
    }
    HelpShuPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showOrFalse(1);
        this.texts.textFlow = (new egret.HtmlTextParser).parser(this.textLable(1));
    };
    HelpShuPanel.prototype.onTouchTap = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.jbgzbtn:
            case this.jbgzbtn0:
                majiang.MajiangUtils.playClick(); //管理声音的
                this.textGroup.removeChildren();
                this.help_scroller.viewport.scrollV = 0;
                this.texts.height = 880;
                this.texts.textFlow = (new egret.HtmlTextParser).parser(this.textLable(1));
                this.textGroup.addChild(this.texts);
                this.showOrFalse(1);
                break;
            case this.pxjsbtn:
            case this.pxjsbtn0:
                majiang.MajiangUtils.playClick(); //管理声音的
                this.textGroup.removeChildren();
                this.help_scroller.viewport.scrollV = 0;
                this.texts.height = 780;
                this.texts.textFlow = (new egret.HtmlTextParser).parser(this.textLable(2));
                this.textGroup.addChild(this.texts);
                this.showOrFalse(2);
                break;
            case this.pxdxbtn:
            case this.pxdxbtn0:
                majiang.MajiangUtils.playClick(); //管理声音的
                this.textGroup.removeChildren();
                this.help_scroller.viewport.scrollV = 0;
                this.texts.height = 280;
                this.texts.text = this.textLable(3);
                this.textGroup.addChild(this.texts);
                this.showOrFalse(3);
                break;
            case this.closeBtn:
            case this.rects:
                this.rects.visible = false;
                CF.sN(this.HELP_PANEL_NOTIFY);
                break;
        }
    };
    /**
     * 是否显示或者隐藏文字类容
     */
    HelpShuPanel.prototype.showOrFalse = function (number) {
        switch (number) {
            case 1:
                this.jbgzbtn.alpha = 1;
                this.pxdxbtn.alpha = 0.5;
                this.pxjsbtn.alpha = 0.5;
                break;
            case 2:
                this.pxjsbtn.alpha = 1;
                this.jbgzbtn.alpha = 0.5;
                this.pxdxbtn.alpha = 0.5;
                break;
            case 3:
                this.pxdxbtn.alpha = 1;
                this.jbgzbtn.alpha = 0.5;
                this.pxjsbtn.alpha = 0.5;
                break;
        }
    };
    HelpShuPanel.prototype.showNiuniuContent = function (textLables) {
        switch (textLables) {
            case 1:
                return '<font color="#18dc95" size="23"   >抢庄：</font>' + '\n'
                    + '每个玩家选择是否抢庄及抢庄的倍数，倍数最高的为庄家，当多个玩家倍数相同时，随机一名玩家当庄，随机和自身金币携带量有关，金币携带越多则随机的概率越大；所有玩家不抢庄时，系统随机选择一名玩家为庄家' + '\n'
                    + '<font color="#18dc95" size="23"   >加倍：</font>' + '\n'
                    + '闲家加倍，金币越多，可选择的倍数越大' + '\n'
                    + '<font color="#18dc95" size="23"   >拼牌：</font>' + '\n'
                    + '在5张手牌中选择三张牌组合成10点的整数倍' + '\n'
                    + '<font color="#18dc95" size="23"   >比牌：</font>' + '\n'
                    + '庄家和每个闲家分别比牌，闲家之间不会相互比牌' + '\n'
                    + '<font color="#18dc95" size="23"   >结算：</font>' + '\n'
                    + 'A：房间底注' + '\n'
                    + 'M：庄家牌型倍数' + '\n'
                    + 'N：闲家牌型倍数' + '\n'
                    + 'X：抢庄倍数' + '\n'
                    + 'Y：加倍倍数' + '\n'
                    + '庄家胜利赢得游戏币：A * M * X * Y - 抽水' + '\n'
                    + '庄家失败所输游戏币：A * N * X * Y' + '\n'
                    + '闲家胜利赢得游戏币：A * N * X * Y - 抽水' + '\n'
                    + '闲家失败所输游戏币：A * M * X * Y' + '\n'
                    + '<font color="#18dc95" size="23"   >防止以小博大机制：</font>' + '\n'
                    + '带入游戏币多少，输赢游戏币不大于带入金币' + '\n'
                    + '<font color="#18dc95" size="23"   >抽水比例：</font>' + '\n'
                    + '5 %';
            case 2:
                return '<font color="#18dc95" size="23"   >用牌:</font>' + '\n'
                    + '除开大小王52张牌' + '\n'
                    + '<font color="#18dc95" size="23"   >牌面:</font>' + '\n'
                    + '10、J、Q、K为10点，其余牌为自身牌面点数' + '\n'
                    + '<font color="#18dc95" size="23"   >没牛:</font>' + '\n'
                    + '5张手牌中任意3张牌点数之和不为10的整数倍' + '\n'
                    + '<font color="#18dc95" size="23"   >有牛:</font>' + '\n'
                    + '5张手牌中任意3张牌点数之和为10的整数倍，剩下两张点数和的个位即为牛几' + '\n'
                    + '<font color="#18dc95" size="23"   >牛牛:</font>' + '\n'
                    + '5张手牌中任意3张牌点数之和为10的整数倍，剩下两张点数和同为10的整数倍' + '\n'
                    + '<font color="#18dc95" size="23"   >四花牛:</font>' + '\n'
                    + '5张手牌中4张牌为J、Q、K，剩余一张牌为10，例如：JQQK10' + '\n'
                    + '<font color="#18dc95" size="23"   >五花牛:</font>' + '\n'
                    + '5张手牌全部为J、Q、K，例如：JQQKK' + '\n'
                    + '<font color="#18dc95" size="23"   >炸弹:</font>' + '\n'
                    + '5张手牌中4张牌相同和任意一张牌，例如：5555K' + '\n'
                    + '<font color="#18dc95" size="23"   >五小牛:</font>' + '\n'
                    + '5张手牌中所有手牌都点数都小于5，且点数之和小于等于10，例如：AA223' + '\n'
                    + '<font color="#18dc95" size="23"   >大小比较:</font>' + '\n'
                    + "\u9996\u5148\u6BD4\u8F83\u724C\u578B\uFF0C\u724C\u578B\u76F8\u540C\u6BD4\u8F83\u624B\u724C\u4E2D\u6700\u5927\u724C\u70B9\u6570\uFF0C\u70B9\u6570\u76F8\u540C\u6BD4\u8F83\u624B\u724C\u4E2D\u6700\u5927\u724C\u82B1\u8272" + '\n'
                    + '<font color="#18dc95" size="23"   >牌型大小顺序:</font>' + '\n'
                    + "\u4E94\u5C0F\u725B\uFF1E\u70B8\u5F39\uFF1E\u4E94\u82B1\u725B\uFF1E\u56DB\u82B1\u725B\uFF1E\u725B\u725B\uFF1E\u725B\u4E5D\uFF1E\u725B\u516B\uFF1E\u725B\u4E03\uFF1E\u725B\u516D\uFF1E\u725B\u4E94\uFF1E\u725B\u56DB\uFF1E\u725B\u4E09\uFF1E\u725B\u4E8C\uFF1E\u725B\u4E00\uFF1E\u6CA1\u725B" + '\n'
                    + '<font color="#18dc95" size="23"   >单张牌大小顺序:</font>' + '\n'
                    + "K\uFF1EQ\uFF1EJ\uFF1E10\uFF1E9\uFF1E8\uFF1E7\uFF1E6\uFF1E5\uFF1E4\uFF1E3\uFF1E2\uFF1EA" + '\n'
                    + '<font color="#18dc95" size="23"   >花色大小顺序:</font>' + '\n'
                    + "\u9ED1\u6843\uFF1E\u7EA2\u6843\uFF1E\u6885\u82B1\uFF1E\u65B9\u5757";
            case 3:
                return '没牛~牛五：1倍' + '\n'
                    + '牛六~牛九：2倍' + '\n'
                    + '牛牛：3倍' + '\n'
                    + '四花牛~五花牛：4倍' + '\n'
                    + '炸弹：5倍' + '\n'
                    + '五小牛：6倍';
        }
    };
    HelpShuPanel.prototype.textLable = function (textLables) {
        switch (this.type) {
            case "blnn":
                return this.showNiuniuContent(textLables);
            case "sangong":
                return this.showSangongContent(textLables);
        }
    };
    HelpShuPanel.prototype.showSangongContent = function (textLables) {
        switch (textLables) {
            case 1:
                return '<font color="#18dc95" size="23"   >抢庄：</font>' + '\n'
                    + '开始后先进行抢庄流程，点过抢庄的人有机会成为庄家，当多个玩家抢庄时，随机一名玩家当庄，随机和自身金币携带量有关，金币携带越多则随机的概率越大；所有玩家不抢庄时，系统随机选择一名玩家为庄家' + '\n'
                    + '<font color="#18dc95" size="23"   >押注：</font>' + '\n'
                    + '闲家加倍，金币越多，可选择的倍数越大' + '\n'
                    + '<font color="#18dc95" size="23"   >比牌：</font>' + '\n'
                    + '所有玩家翻牌后，庄家和每个闲家分别比牌，闲家之间不会相互比牌' + '\n'
                    + '<font color="#18dc95" size="23"   >结算：</font>' + '\n'
                    + 'A：房间底注' + '\n'
                    + 'M：庄家牌型倍数' + '\n'
                    + 'N：闲家牌型倍数' + '\n'
                    + 'X：加倍倍数' + '\n'
                    + '庄家胜利赢得游戏币：A * M * X - 抽水' + '\n'
                    + '庄家失败所输游戏币：A * N * X' + '\n'
                    + '闲家胜利赢得游戏币：A * N * X - 抽水' + '\n'
                    + '闲家失败所输游戏币：A * M * X' + '\n'
                    + '<font color="#18dc95" size="23"   >防止以小博大机制：</font>' + '\n'
                    + '带入游戏币多少，输赢游戏币不大于带入金币' + '\n'
                    + '<font color="#18dc95" size="23"   >抽水比例：</font>' + '\n'
                    + '5 %';
            case 2:
                return '<font color="#18dc95" size="23"   >用牌:</font>' + '\n'
                    + '除开大小王52张牌' + '\n'
                    + '<font color="#18dc95" size="23"   >点数牌:</font>' + '\n'
                    + 'A~9为1~9点，10为0点' + '\n'
                    + '<font color="#18dc95" size="23"   >公牌:</font>' + '\n'
                    + 'J、Q、K为公牌，公牌计为0' + '\n'
                    + '<font color="#18dc95" size="23"   >至尊:</font>' + '\n'
                    + '3张3构成的牌型' + '\n'
                    + '<font color="#18dc95" size="23"   >大三公:</font>' + '\n'
                    + '3张相同的牌构成的牌型，如：QQQ、222' + '\n'
                    + '<font color="#18dc95" size="23"   >三公:</font>' + '\n'
                    + '3张公仔牌构成的牌型，如：JQK、KKQ' + '\n'
                    + '首先比较牌型，牌型相同比单张，单张相同比花色' + '\n'
                    + '牌型大小顺序：' + '\n'
                    + '至尊＞大三公＞三公＞9点＞…＞0点' + '\n'
                    + '单张牌大小顺序：' + '\n'
                    + 'K＞Q＞J＞10＞9＞8＞7＞6＞5＞4＞3＞2＞A' + '\n'
                    + '花色大小顺序：' + '\n'
                    + '黑桃＞红桃＞梅花＞方块' + '\n';
            case 3:
                return '0点 ~ 6点：1倍' + '\n'
                    + '7点 ~ 9点：2倍' + '\n'
                    + '三公：3倍' + '\n'
                    + '大三公：4倍' + '\n'
                    + '至尊：5倍' + '\n';
        }
    };
    HelpShuPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
    };
    HelpShuPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
    };
    /**
         * 屏幕旋转
                     * */
    HelpShuPanel.prototype.oritationChange = function (e) {
        var _data = e.data;
        var currentSceneName = PanelNotify.OPEN_HELP_SHU;
        var closeName = PanelNotify.CLOSE_HELP_SHU;
        //横屏
        if (_data == "H") {
            CF.sN(closeName);
            CF.sN(currentSceneName + "_HORIZON", { type: this.type });
        }
        else {
            CF.sN(closeName + "_HORIZON");
            CF.sN(currentSceneName, { type: this.type });
        }
    };
    return HelpShuPanel;
}(game.BaseComponent));
__reflect(HelpShuPanel.prototype, "HelpShuPanel");
