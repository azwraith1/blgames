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
 * @Date: 2019-06-10 13:46:47
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 13:49:04
 * @Description: 21点扑克
 */
var BlackJackCardList = (function (_super) {
    __extends(BlackJackCardList, _super);
    function BlackJackCardList() {
        var _this = _super.call(this) || this;
        _this.currentCard = 1;
        return _this;
    }
    BlackJackCardList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.scoreGroup.visible = false;
        this.resetLists();
    };
    /**
     * 烦开当前牌
     */
    BlackJackCardList.prototype.showCurrent = function (value) {
        var poker = this["poker" + this.currentCard];
        if (value) {
            poker.changeByNumber(value);
        }
        poker.fanpai();
    };
    BlackJackCardList.prototype.resetLists = function () {
        for (var i = 1; i <= 5; i++) {
            this["poker" + i].visible = false;
            this["poker" + i].otherImage.source = RES.getRes("blackj_point_sb" + CF.tic);
            game.UIUtils.removeSelf(this["poker" + i]);
        }
        this.currentCard = 1;
    };
    BlackJackCardList.prototype.fanCurrentCard = function (value, poker) {
        poker.visible = true;
        this.pokerGroup.addChild(poker);
        if (value == 0) {
            return;
        }
        poker.changeByNumber(value);
        poker.fanpai();
    };
    BlackJackCardList.prototype.currentCardOther = function (index) {
        var poker = this["poker" + index];
        if (!poker) {
            return;
        }
        poker.showOtherImage(true);
    };
    BlackJackCardList.prototype.getCurrentCard = function () {
        var poker = this["poker" + this.currentCard];
        if (!poker) {
            return;
        }
        this.pokerGroup.addChild(poker);
        this.changeWidth();
        return poker;
    };
    BlackJackCardList.prototype.showMaskRect = function (visible) {
        if (visible === void 0) { visible = true; }
        if (this.result == BLACKJ_PATTERN.BOOM) {
            return;
        }
        for (var i = 1; i <= 5; i++) {
            this["poker" + i].showMask(visible);
        }
    };
    /**
     * 展现分数
     */
    BlackJackCardList.prototype.showPoint = function (pattern, point) {
        if (point == null || point[0] < 0) {
            return;
        }
        if (pattern == BLACKJ_PATTERN.BOOM || point > 21) {
            this.dbImage.source = RES.getRes("blackj_point_1_png");
            this.scoreLabel.text = CF.tigc(130);
            this.scoreGroup.visible = true;
            this.dbImage.visible = true;
            this.showMaskRect();
        }
        else if (pattern == BLACKJ_PATTERN.FIVE_LITTLE_DRAGONS) {
            this.scoreGroup.visible = false;
            this.dbImage.visible = true;
            this.playFiveLong();
        }
        else if (pattern == BLACKJ_PATTERN.BLACKJACK) {
            this.scoreGroup.visible = false;
            this.playBlackJ();
        }
        else {
            if (point[0] < 1) {
                return;
            }
            if (point[0] == 21) {
                this.dbImage.source = RES.getRes("blackj_point_3_png");
            }
            else {
                this.dbImage.source = RES.getRes("blackj_point_2_png");
            }
            this.dbImage.visible = true;
            this.setPoint(point);
            this.scoreGroup.visible = true;
        }
        this.result = pattern;
        // this.changeWidth();
        this.changePointPosition();
    };
    BlackJackCardList.prototype.setPoint = function (points) {
        if (points.length == 1) {
            this.scoreLabel.text = points[0];
            this.scoreLabel.size = 28;
            this.scoreLabel.scaleX = this.scoreLabel.scaleY = 1;
        }
        else {
            this.scoreLabel.text = points[0] + "/" + points[1];
            this.scoreLabel.size = 20;
        }
    };
    BlackJackCardList.prototype.playBoom = function () {
        var db = new DBComponent("21d_boom");
        db.x = this.pokerGroup.width / 2 + 20;
        db.y = this.pokerGroup.height / 2;
        this.addChild(db);
        db.playByFilename(1);
        SoundManager.getInstance().playEffect("blackj_boom_mp3");
    };
    BlackJackCardList.prototype.playBlackJ = function () {
        var db = new DBComponent("21d_hjk" + CF.tiAni);
        db.x = this.pokerGroup.width / 2 + 20;
        db.y = this.pokerGroup.height / 2 + 30;
        this.addChild(db);
        db.playNamesAndLoop(["21d_hjk" + CF.tiAni, "21d_hjk_loop" + CF.tiAni]);
        db.x = 222 / 2;
        db.y = 103;
    };
    BlackJackCardList.prototype.playFiveLong = function () {
        var db = new DBComponent("21d_wxl" + CF.tiAni);
        this.addChild(db);
        db.playNamesAndLoop(["21d_wxl" + CF.tiAni, "21d_wxl_loop" + CF.tiAni]);
        db.x = 222 / 2;
        db.y = 103;
    };
    /**
     * 根据传入手牌显示
     * @param  {} cards
     */
    BlackJackCardList.prototype.initWidthCard = function (cards) {
        if (!cards) {
            return;
        }
        this.resetLists();
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var index = i + 1;
            var poker = this["poker" + index];
            poker.initWithNum(card);
            poker.visible = true;
            this.pokerGroup.addChild(poker);
        }
        this.currentCard = cards.length + 1;
        this.changeWidth();
    };
    /**
     * 居中
     */
    BlackJackCardList.prototype.changeWidth = function () {
        var arr = [62, 47, 31, 16, 0];
        var num = this.pokerGroup.numChildren;
        this.pokerGroup.x = arr[num - 1];
        var widthArr = [133, 177, 221, 265, 308];
        this.pokerGroup.width = widthArr[num - 1];
    };
    BlackJackCardList.prototype.changePointPosition = function () {
        // let arr = [61, 82, 103, 124, 145]
        // let num = this.pokerGroup.numChildren;
        switch (this.uiIndex) {
            case 2:
                this.scoreGroup.x = this.pokerGroup.x - this.scoreGroup.width;
                break;
            default:
                this.scoreGroup.x = this.pokerGroup.x + this.pokerGroup.width * 0.72;
                break;
        }
    };
    BlackJackCardList.prototype.changeLast2Double = function () {
        this.currentCardOther(this.currentCard - 1);
    };
    BlackJackCardList.prototype.changeScoreGroup = function (index) {
        this.uiIndex = index;
        switch (index) {
            case 3:
            case 1:
                this.dbImage.scaleX = 1;
                // if (this.cardIndex == 1) {
                // 	this.scoreGroup.y = 0;
                // } else {
                // 	this.scoreGroup.y = 20;
                // }
                break;
            case 2:
                this.dbImage.scaleX = -1;
                // if (this.cardIndex == 1) {
                // 	this.scoreGroup.y = 0;
                // } else {
                // 	this.scoreGroup.y = 20;
                // }
                break;
            case 6:
                this.dbImage.scaleX = 1;
                // this.scoreGroup.y = 40;
                break;
        }
    };
    return BlackJackCardList;
}(game.BaseUI));
__reflect(BlackJackCardList.prototype, "BlackJackCardList");
