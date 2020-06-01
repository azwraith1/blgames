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
 * @Date: 2019-06-10 10:27:36
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-19 10:23:11
 * @Description: 21点 炒作bar
 */
var BlackJackGameBar = (function (_super) {
    __extends(BlackJackGameBar, _super);
    function BlackJackGameBar() {
        return _super.call(this) || this;
    }
    BlackJackGameBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    BlackJackGameBar.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.button1:
                this.buttonTouch(ACTIONS.ADD_CARD);
                break;
            case this.button2:
                this.buttonTouch(ACTIONS.SPLIT_CARD);
                break;
            case this.button3:
                this.visible = false;
                this.buttonTouch(ACTIONS.DOUBLE_BET);
                break;
            case this.button4:
                this.visible = false;
                this.buttonTouch(ACTIONS.STOP_CARD);
                break;
        }
    };
    //分牌
    /**
     * 操作
     */
    BlackJackGameBar.prototype.buttonTouch = function (action) {
        var roomInfo = Global.roomProxy.roomInfo;
        var data = {};
        data.tableIndex = roomInfo.currentTableIndex;
        data.type = action;
        data.index = roomInfo.currentCardGroupIndex;
        this.root.gameBarTouch(data);
    };
    BlackJackGameBar.prototype.resize2Last = function () {
        this.initActions(this.lastData);
    };
    BlackJackGameBar.prototype.lockAll = function () {
        var data = [0, 0, 0, 0];
        for (var i = 0; i < data.length; i++) {
            var button = this["button" + (i + 1)];
            if (data[i] == 0) {
                button.touchEnabled = false;
                button.currentState = "disabled";
            }
            else {
                button.touchEnabled = true;
                button.currentState = "up";
            }
        }
    };
    BlackJackGameBar.prototype.initActions = function (data) {
        this.lastData = data;
        for (var i = 0; i < data.length; i++) {
            var button = this["button" + (i + 1)];
            if (data[i] == 0) {
                button.touchEnabled = false;
                button.currentState = "disabled";
            }
            else {
                button.touchEnabled = true;
                button.currentState = "up";
            }
        }
    };
    BlackJackGameBar.prototype.setRoot = function (root) {
        this.root = root;
    };
    return BlackJackGameBar;
}(game.BaseUI));
__reflect(BlackJackGameBar.prototype, "BlackJackGameBar");
var ACTIONS = {
    ADD_CARD: 1,
    SPLIT_CARD: 2,
    DOUBLE_BET: 3,
    STOP_CARD: 4
};
