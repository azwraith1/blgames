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
var BaseHeader = (function (_super) {
    __extends(BaseHeader, _super);
    function BaseHeader() {
        return _super.call(this) || this;
    }
    BaseHeader.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.maskImage) {
            this.headerImage.mask = this.maskImage;
        }
    };
    BaseHeader.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    BaseHeader.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
    };
    BaseHeader.prototype.setIndex = function (index) {
        this.index = index;
    };
    BaseHeader.prototype.initWithPlayer = function (playerInfo, headerStr) {
        if (headerStr === void 0) { headerStr = "hall_header"; }
        if (!playerInfo) {
            this.nameLabel.text = Global.playerProxy.playerData.nickname;
            this.headerImage.source = headerStr + "_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
            this.goldLabel.text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
        }
        else {
            this.playerInfo = playerInfo;
            this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
            this.nameLabel.text = playerInfo.nickname || playerInfo.name;
            var headerId = playerInfo['figureUrl'] || playerInfo['url'];
            var headerSex = playerInfo['sex'] || playerInfo.sex;
            this.headerImage.source = headerStr + "_" + headerSex + "_" + headerId + "_png";
        }
        if (this.indexLabel) {
            this.indexLabel.text = playerInfo.playerIndex || playerInfo.pIndex;
        }
        this.index = playerInfo.playerIndex || playerInfo.pIndex;
    };
    /**
     * 更新金币
     */
    BaseHeader.prototype.updateGold = function (gold, isAdd) {
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
        LogUtils.logD("======this.goldLabel.text====" + this.goldLabel.text);
    };
    BaseHeader.prototype.showIsZhuang = function (isZhuang) {
        this.zhuangImage.visible = isZhuang;
        this.zhuangImage.scaleX = this.zhuangImage.scaleY = 0;
        egret.Tween.get(this.zhuangImage).to({ scaleX: 0, scaleY: 0 }, 50).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    /**
     * 玩家头像移动。
     */
    BaseHeader.prototype.headerMovie = function (dirction) {
        egret.Tween.removeTweens(this.headerGroup);
        switch (dirction) {
            case 1:
                egret.Tween.get(this.headerGroup).to({
                    y: -10
                }, 100).to({
                    y: 0
                }, 100);
                break;
            case 2:
            case 3:
                egret.Tween.get(this.headerGroup).to({
                    x: 10
                }, 100).to({
                    x: 0
                }, 100);
                break;
            case 4:
            case 5:
                egret.Tween.get(this.headerGroup).to({
                    x: -10
                }, 100).to({
                    x: 0
                }, 100);
                break;
            case 6://第一名
                egret.Tween.get(this.headerGroup).to({
                    x: 10
                }, 100).to({
                    x: 0
                }, 100);
                break;
            case 7://luckey用户
                egret.Tween.get(this.headerGroup).to({
                    x: -10
                }, 100).to({
                    x: 0
                }, 100);
                break;
        }
    };
    return BaseHeader;
}(game.BaseUI));
__reflect(BaseHeader.prototype, "BaseHeader");
