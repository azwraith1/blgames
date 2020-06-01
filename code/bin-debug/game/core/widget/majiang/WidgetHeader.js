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
 * @Author: Li MengChan
 * @Date: 2018-07-05 15:15:39
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-11 16:25:34
 * @Description: 麻将桌子上面的头像
 */
var majiang;
(function (majiang) {
    var WidgetHeader = (function (_super) {
        __extends(WidgetHeader, _super);
        function WidgetHeader() {
            return _super.call(this) || this;
            // this.skinName = new WidgetHeaderSkin();
        }
        WidgetHeader.prototype.haveXieGold = function (have) {
            this.xieImg.visible = have;
            this.linImg.visible = have;
            this.initGold.visible = have;
        };
        WidgetHeader.prototype.setGoldImgHeigt = function (isClub) {
            if (isClub) {
                this.goldImage.height = 18;
            }
            else {
                this.goldImage.height = 38;
            }
        };
        WidgetHeader.prototype.onTouchTap = function (e) {
            CF.dP(ENo.HEADER_TOUCH, this);
        };
        WidgetHeader.prototype.createAnimation = function (direction) {
            var _this = this;
            GameCacheManager.instance.getMcCache("header", direction + "_header", function (mc) {
                if (mc) {
                    _this.headerAni = mc;
                    _this.addChild(_this.headerAni);
                    // this.headerAni.x = 11;
                    // this.headerAni.y = -10;
                    // this.headerAni.scaleX = 1.5
                    // this.headerAni.scaleY = 1.7;
                    //因为新加头像框 对头像闪光位置进行了修改 smart
                    _this.headerAni.x = 11;
                    _this.headerAni.y = -6;
                    _this.headerAni.scaleX = 1.5;
                    _this.headerAni.scaleY = 1.55;
                    _this.addChild(_this.zhuangImage);
                    _this.addChild(_this.colorImage);
                    mc.visible = false;
                    // mc.play(-1);
                }
            });
        };
        WidgetHeader.prototype.showTingImages = function (useAni) {
            this.tingImage.visible = true;
            if (useAni) {
                this.tingImage.scaleX = this.tingImage.scaleY = 2;
                egret.Tween.get(this.tingImage).to({
                    scaleX: 1,
                    scaleY: 1
                }, 500, egret.Ease.elasticInOut);
            }
        };
        WidgetHeader.prototype.showLiangDaoImage = function (useAni) {
            this.liangdaoImage.visible = true;
            this.liangdaoImage.source = RES.getRes("hbmj_game_ld_png");
            if (useAni) {
                this.liangdaoImage.scaleX = this.liangdaoImage.scaleY = 2;
                egret.Tween.get(this.liangdaoImage).to({
                    scaleX: 1,
                    scaleY: 1
                }, 500, egret.Ease.elasticInOut);
            }
        };
        WidgetHeader.prototype.hideGold = function () {
            this.goldImage.visible = false;
            this.goldLabel.visible = false;
        };
        WidgetHeader.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            // game.MCUtils.reclaim("header", this.headerAni);
        };
        WidgetHeader.prototype.showTip = function (flag) {
            this.headerAni.visible = flag;
            if (flag) {
                this.headerAni.play(-1);
            }
            else {
                this.headerAni.stop();
            }
        };
        WidgetHeader.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        WidgetHeader.prototype.xlchInitWithData = function (playerInfo, isClub, direction) {
            if (!playerInfo) {
                this.nameLabel.text = Global.playerProxy.playerData.nickname;
                this.headerImage.source = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
                this.goldLabel.text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
            }
            else {
                this.playerInfo = playerInfo;
                if (this.playerInfo.score != undefined) {
                    this.playerInfo.gold = this.playerInfo.score;
                }
                this.setGoldImgHeigt(isClub);
                //smart 当前金币 携带金币
                // if (isClub) {
                // 	this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
                // 	this.haveXieGold(false);
                // }
                // else {
                this.haveXieGold(true);
                this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.curGainGold);
                this.initGold.text = NumberFormat.formatGold_scence(playerInfo.initGold);
                this.initGold.visible = true;
                // }
                //smart
                this.nameLabel.text = playerInfo.nickname;
                var headerId = playerInfo['figureUrl'] || playerInfo.figure_url;
                var headerSex = playerInfo['sex'] || playerInfo.sex;
                this.headerImage.source = "hall_header_" + headerSex + "_" + headerId + "_png";
                if (playerInfo && playerInfo.selectColor > 0 && Global.gameProxy.roomInfo && Global.gameProxy.roomInfo.selectColorStatus == 1) {
                    this.showColor(playerInfo.selectColor);
                }
                if (playerInfo.displayCard) {
                    this.showLiangDaoImage(false);
                }
                else {
                    this.liangdaoImage.visible = false;
                }
            }
            if (direction) {
                this.direction = direction;
                this.createAnimation(direction);
            }
        };
        /**
         * 根据玩家数据渲染
         * @param  {PlayerInfoBean} playerInfo
         */
        WidgetHeader.prototype.initWithData = function (playerInfo, direction) {
            if (!playerInfo) {
                this.nameLabel.text = Global.playerProxy.playerData.nickname;
                this.headerImage.source = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
                this.goldLabel.text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
            }
            else {
                this.playerInfo = playerInfo;
                if (this.playerInfo.score != undefined) {
                    this.playerInfo.gold = this.playerInfo.score;
                }
                this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
                this.nameLabel.text = playerInfo.nickname;
                var headerId = playerInfo['figureUrl'] || playerInfo.figure_url;
                var headerSex = playerInfo['sex'] || playerInfo.sex;
                this.headerImage.source = "hall_header_" + headerSex + "_" + headerId + "_png";
                if (playerInfo && playerInfo.selectColor > 0 && Global.gameProxy.roomInfo && Global.gameProxy.roomInfo.selectColorStatus == 1) {
                    this.showColor(playerInfo.selectColor);
                }
                if (playerInfo.displayCard) {
                    this.showLiangDaoImage(false);
                }
                else {
                    this.liangdaoImage.visible = false;
                }
            }
            if (direction) {
                this.direction = direction;
                this.createAnimation(direction);
            }
        };
        WidgetHeader.prototype.initWithPlayer = function (playerInfo, direction) {
            this.initWithData(playerInfo);
        };
        WidgetHeader.prototype.showColor = function (color) {
            this.colorImage.visible = true;
            this.colorImage.source = RES.getRes("q_type_" + color + "_png");
        };
        WidgetHeader.prototype.showIsZhuang = function (isZhuang) {
            this.zhuangImage.visible = isZhuang;
        };
        WidgetHeader.prototype.updateGold = function (gold) {
            LogUtils.logD("===updateGold===");
            if (gold == null) {
                LogUtils.logE("number error value = " + gold);
                return;
            }
            if (this.playerInfo) {
                this.playerInfo.gold = gold;
            }
            this.goldLabel.text = NumberFormat.formatGold_scence(gold);
        };
        //smart
        WidgetHeader.prototype.updateXieGold = function (gold, curGainGold) {
            if (gold == null) {
                LogUtils.logE("number error value = " + gold);
                return;
            }
            if (this.playerInfo) {
                this.playerInfo.gold = gold;
                this.playerInfo.curGainGold = curGainGold;
            }
            if (curGainGold != null || curGainGold != undefined) {
                this.goldLabel.text = NumberFormat.formatGold_scence(curGainGold);
            }
            else {
                this.goldLabel.text = NumberFormat.formatGold_scence(gold);
            }
            // this.initGold.text = NumberFormat.formatGold_scence(initGold);
        };
        /**
         * 声音播放
         */
        WidgetHeader.prototype.playSound = function (soundName) {
            if (this.playerInfo.sex == 1) {
                //女生
            }
            else {
            }
        };
        /**
         * 设置位置和播放表情和文字
         * direction:玩家的方向，左，上，右，自己
         * msg:文字消息
         * id:文字消息对应的id，确定语音。
         * playerIndex:玩家座位号
         * img:图片消息
         */
        WidgetHeader.prototype.showMsgAndImg = function (direction, msg, id, playerIndex, img) {
            var _this = this;
            egret.Tween.removeTweens(this.messageGroup);
            if (msg != 0) {
                this.showVisible(1);
                this.msgLable.text = msg;
                if (Global.gameProxy.getPlayerByIndex(playerIndex).sex == 1) {
                    SoundManager.getInstance().playEffect("m_fix_msg_" + id + "_mp3");
                }
                else {
                    SoundManager.getInstance().playEffect("w_fix_msg_" + id + "_mp3");
                }
            }
            if (img != 0) {
                this.showVisible(2);
                this.msgPng.source = RES.getRes(img);
            }
            this.msgBg.width = this.msgLable.width + 30;
            switch (direction) {
                case "right":
                    this.messageGroup.scaleX = -1;
                    this.messageGroup.x = 75;
                    this.messageGroup.y = -66;
                    this.msgLable.scaleX = -1;
                    this.msgLable.x = 187;
                    this.msgLable.y = 14;
                    this.msgPng.scaleX = -1;
                    this.msgPng.x = 68;
                    this.msgPng.y = -10;
                    this.msgLable.x = this.msgBg.x;
                    this.msgLable.x = this.msgBg.x + this.msgLable.width + 15;
                    this.msgLable.y = this.msgLable.y + 3;
                    break;
                case "left":
                case "mine":
                    this.messageGroup.x = 22;
                    this.messageGroup.y = -66;
                    break;
                case "top":
                    this.messageGroup.scaleX = -1;
                    this.messageGroup.scaleY = -1;
                    this.messageGroup.x = 75;
                    this.messageGroup.y = 127;
                    this.msgLable.scaleX = -1;
                    this.msgLable.scaleY = -1;
                    this.msgLable.y = 48;
                    this.msgLable.x = 180;
                    this.msgPng.scaleX = -1;
                    this.msgPng.scaleY = -1;
                    this.msgPng.y = 50;
                    this.msgPng.x = 67;
                    this.msgLable.x = this.msgBg.x + this.msgLable.width + 15;
                    this.msgLable.y = this.msgLable.y - 3;
                    break;
            }
            this.addChild(this.messageGroup);
            this.messageGroup.visible = true;
            this.messageGroup.alpha = 0;
            egret.Tween.get(this.messageGroup).to({ alpha: 0 }).to({ alpha: 1 }, 300).wait(2000).to({ alpha: 0 }, 300).wait(10).call(function () {
                _this.messageGroup.visible = false;
            });
        };
        WidgetHeader.prototype.showVisible = function (num) {
            if (num == 1) {
                this.msgPngBg.visible = false;
                this.msgPng.visible = false;
                this.msgBg.visible = true;
                this.msgLable.visible = true;
            }
            else {
                this.msgPngBg.visible = true;
                this.msgPng.visible = true;
                this.msgBg.visible = false;
                this.msgLable.visible = false;
            }
        };
        WidgetHeader.prototype.showLinImage = function () {
            this.linImg.visible = true;
        };
        return WidgetHeader;
    }(game.BaseUI));
    majiang.WidgetHeader = WidgetHeader;
    __reflect(WidgetHeader.prototype, "majiang.WidgetHeader");
})(majiang || (majiang = {}));
