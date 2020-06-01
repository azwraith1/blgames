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
var BDZHeader = (function (_super) {
    __extends(BDZHeader, _super);
    function BDZHeader() {
        var _this = _super.call(this) || this;
        _this.winGold = 0;
        return _this;
    }
    BDZHeader.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.headerImage.mask = this.headerMask;
    };
    BDZHeader.prototype.initWithPlayer = function (playerInfo) {
        this.initWithData(playerInfo);
    };
    /**
     * 更新金币
     */
    BDZHeader.prototype.updateGold = function (gold, isAdd) {
        if (isAdd === void 0) { isAdd = false; }
        if (!this.playerInfo) {
            this.goldLabel.text = NumberFormat.formatGold_scence(gold);
            return;
        }
        if (isAdd) {
            this.playerInfo.gold += NumberFormat.handleFloatDecimal(gold, 4);
        }
        else {
            this.playerInfo.gold = NumberFormat.handleFloatDecimal(gold, 4);
        }
        if (this.playerInfo) {
            if (Global.playerProxy.checkIsMe(this.playerInfo.uid)) {
                Global.playerProxy.playerData.gold = this.playerInfo.gold;
            }
        }
        this.goldLabel.text = NumberFormat.formatGold_scence(this.playerInfo.gold);
    };
    BDZHeader.prototype.initWithData = function (playerInfo) {
        if (!playerInfo) {
            this.nameLabel.text = Global.playerProxy.playerData.nickname;
            this.headerImage.source = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
            this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
        }
        else {
            this.playerInfo = playerInfo;
            this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
            this.nameLabel.text = playerInfo.nickname;
            var headerId = playerInfo['figureUrl'] || playerInfo.figure_url;
            var headerSex = playerInfo['sex'] || playerInfo.sex;
            this.headerImage.source = "hall_header_" + headerSex + "_" + headerId + "_png";
        }
        this.gold = Global.playerProxy.playerData.gold;
    };
    BDZHeader.prototype.showBoss = function (isDealer) {
        this.bossImage.visible = isDealer;
    };
    BDZHeader.prototype.showLsLabel = function (gold) {
        egret.Tween.get(this, { onChange: this.onWinChange, onChangeObj: this }).to({ winGold: gold }, 500, egret.Ease.circIn);
        // egret.Tween.get(this.lsLabel).to({
        // 	scaleX: 1
        // }, 300, egret.Ease.bounceInOut);
        // this.lsLabel.text = "+" + NumberFormat.fNumberBDZStr(gold);
    };
    BDZHeader.prototype.onWinChange = function () {
        this.lsLabel.text = "+" + NumberFormat.fNumberBDZStr(this.winGold);
    };
    return BDZHeader;
}(game.BaseUI));
__reflect(BDZHeader.prototype, "BDZHeader");
