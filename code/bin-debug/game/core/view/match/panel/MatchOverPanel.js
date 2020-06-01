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
 * @Date: 2019-11-28 14:43:44
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-24 18:19:25
 * @Description: 比赛结束
 */
var MatchOverPanel = (function (_super) {
    __extends(MatchOverPanel, _super);
    function MatchOverPanel() {
        var _this = _super.call(this) || this;
        _this.isShowed = false;
        _this.skinName = new MatchOverPanelSkin();
        return _this;
    }
    Object.defineProperty(MatchOverPanel, "instance", {
        get: function () {
            if (!MatchOverPanel._instance) {
                MatchOverPanel._instance = new MatchOverPanel();
            }
            return MatchOverPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchOverPanel.prototype.clubInvite = function (e) {
    };
    MatchOverPanel.prototype.show = function (data) {
        if (this.isShowed) {
            return;
        }
        this.isShowed = true;
        this.data = data;
        var roomInfo = Global.gameProxy.roomInfo;
        var reward = roomInfo.rewardDatas || {};
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        if (!reward || !reward.reward) {
            this.showLose();
        }
        else {
            this.showWin();
        }
        if (reward.rank) {
            this.rankLabel.text = reward.rank;
        }
        else {
            if (roomInfo.currentRank) {
                this.rankLabel.text = roomInfo.currentRank;
            }
            else {
                this.rankLabel.text = "?";
            }
            // this.failLabel.text = "您以淘汰，请等待其他桌结算排定名次.";
        }
        if (reward.reward) {
            LogUtils.logD("reward:" + reward.reward);
            this.winLabel.text = "x" + reward.reward + "y";
            this.failLabel.visible = true;
            if (roomInfo.lastRace) {
                this.failLabel.text = "奖励将在稍后发放到您的账户，请注意查收.";
            }
            else {
                this.failLabel.text = "奖励将在决赛后统一发放到您的账户，请注意查收.";
            }
        }
        this.rankLabel.alpha = 0;
        egret.Tween.get(this.rankLabel).to({
            alpha: 1
        }, 400);
    };
    MatchOverPanel.prototype.showLose = function () {
        var jinjiDb = GameCacheManager.instance.getCache("bsc_no2");
        if (!jinjiDb) {
            jinjiDb = new DBComponent("bsc_no2", false);
            GameCacheManager.instance.setCache("bsc_no2", jinjiDb);
        }
        jinjiDb.y = 220;
        this.dbGroup.addChild(jinjiDb);
        jinjiDb.playNamesAndLoop(['bsc_no2', "bsc_no2_loop"]);
        this.failLabel.visible = true;
        this.winGroup.visible = false;
        SoundManager.getInstance().playEffect("m_game_lose_mp3");
    };
    MatchOverPanel.prototype.showWin = function () {
        var jinjiDb = GameCacheManager.instance.getCache("bsc_no1");
        if (!jinjiDb) {
            jinjiDb = new DBComponent("bsc_no1", false);
            GameCacheManager.instance.setCache("bsc_no1", jinjiDb);
        }
        jinjiDb.y = 220;
        this.dbGroup.addChild(jinjiDb);
        jinjiDb.playNamesAndLoop(['bsc_no1', "bsc_no1_loop"]);
        this.failLabel.visible = false;
        this.winGroup.visible = true;
        SoundManager.getInstance().playEffect("m_game_win_mp3");
    };
    MatchOverPanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        MatchOverPanel._instance = null;
    };
    MatchOverPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchOverPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.enterBtn:
                this.enterBtnTouch();
                break;
        }
    };
    MatchOverPanel.prototype.enterBtnTouch = function () {
        var _this = this;
        var matchRType = game.Utils.getURLQueryString("race_rtype") || "1";
        //返回之前的选厂游戏大厅
        if (matchRType == "2" && this.data.lastGameCode) {
            // ServerConfig.gid = this.data/
            HallForwardFac.redirectHall(function () {
                _this.hide();
            }, this.data.lastGameCode);
            return;
        }
        this.hide();
        CF.sN(SceneNotify.OPEN_MATCH_HALL);
    };
    return MatchOverPanel;
}(game.BaseScene));
__reflect(MatchOverPanel.prototype, "MatchOverPanel");
