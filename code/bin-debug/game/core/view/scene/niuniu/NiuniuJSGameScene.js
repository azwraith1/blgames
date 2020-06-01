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
var niuniu;
(function (niuniu) {
    var NiuniuJSGameScene = (function (_super) {
        __extends(NiuniuJSGameScene, _super);
        function NiuniuJSGameScene() {
            var _this = _super.call(this) || this;
            /**
         * 打开游戏界面通知
         */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIUJSGAMES;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIUSELECT;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_NIUNIUJSGAMES;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIU_JSMATCHING;
            _this.skinName = "resource/skins/scene/niuniu/NiuniuJSGameSceneSkin.exml";
            return _this;
        }
        /**
         * 结算
         */
        NiuniuJSGameScene.prototype.roundSettlement = function (e) {
            var _this = this;
            //调用展示牌
            try {
                this.releaseKPUI();
                this.closeTipsGroup();
                var data_1 = e.data;
                var roomInfo = Global.roomProxy.roomInfo;
                var keys = NiuniuUtils.getNNSort(roomInfo.dealer, Global.roomProxy.getPlayersLength());
                async.eachSeries(keys, function (key, callback) {
                    var player = Global.roomProxy.getPlayerInfoByIndex(key);
                    var ptn = player.roundPattern;
                    var dir = _this.directions[key];
                    if (!Global.roomProxy.checkIndexIsMe(key)) {
                        var resultCards = _this.sortShoupai(player.handCards, player.selectCards);
                        var list1 = _this['cards' + dir];
                        list1.renderByList(resultCards);
                    }
                    else {
                        var resultCards = _this.sortShoupai(player.handCards, player.selectCards);
                        var list1 = _this['cards' + dir + "_" + dir];
                        list1.renderByList(resultCards);
                    }
                    _this.setAutoTimeout(function () {
                        var playerData = Global.roomProxy.getPlayerByIndex(key);
                        if (playerData) {
                            _this.showNiu(ptn, dir);
                            //播声音
                            NiuniuUtils.playShowNiu(playerData.sex, ptn);
                        }
                    }, _this, 100);
                    //this.setAutoTimeout(() => {
                    callback();
                    // }, this, 1000);
                }, function () {
                    _this.setAutoTimeout(function () {
                        _this.goldAni(data_1);
                    }, _this, 1000);
                });
            }
            catch (e) {
            }
        };
        NiuniuJSGameScene.prototype.runXuanpaiStep = function () {
            var _this = this;
            var players = Global.roomProxy.getPlayers();
            this.qzBar.visible = false;
            this.yzBar.visible = false;
            this.cards1.addTouch();
            for (var key in players) {
                var player = players[key];
                var dirIndex = this.directions[key];
                var header = this.getHeaderByIndex(key);
                header.showBeishu(player.addAnte);
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    if (player.isPlayCards) {
                        //选择了牌
                        this.cards1_1.visible = true;
                    }
                    else {
                        if (player.roundPattern == 13) {
                            this.otherBtnGroups.visible = true;
                            this.boomBtn.visible = true;
                            //如果是自动模式
                            if (NiuniuGuaJiConfig.Instance.autoStatus) {
                                this.setAutoTimeout(function () {
                                    _this.boomBtnTouch();
                                }, this, this.autoDelayTime);
                            }
                        }
                        else if (player.roundPattern == 14) {
                            this.otherBtnGroups.visible = true;
                            this.fiveBtn.visible = true;
                            //如果是自动模式
                            if (NiuniuGuaJiConfig.Instance.autoStatus) {
                                this.setAutoTimeout(function () {
                                    _this.fiveBtnTouch();
                                }, this, this.autoDelayTime);
                            }
                        }
                        else {
                            this.caculatorGroup.visible = true;
                            //smart 加上倒计时
                            this.timeBar.visible = true;
                            this.cards1.visible = true;
                            this.cards1.renderByList(player.handCards);
                            //如果是自动模式
                            if (NiuniuGuaJiConfig.Instance.autoStatus) {
                                this.setAutoTimeout(function () {
                                    //this.autoSelectCards();
                                    _this.tpBtnTouchEnd();
                                }, this, this.autoDelayTime);
                            }
                        }
                    }
                }
                else {
                    var cards = this['cards' + this.directions[key]];
                    cards.renderByList(5);
                    cards.visible = true;
                }
            }
        };
        /**
         * 服务器推送什么牌型  8
         */
        NiuniuJSGameScene.prototype.playCards = function (e) {
            //展示有牛没牛，但是不给其他玩家展示
            var data = e.data;
            var cards = data.handCards;
            var roundPattern = data.roundPattern;
            var selectCards = data.selectedCards;
            var index = data.playerIndex;
            var player = Global.roomProxy.getPlayerInfoByIndex(index);
            player.handCards = cards;
            player.roundPattern = roundPattern;
            player.selectCards = selectCards;
            /**
             * 显示完成
             */
            var dir = this.directions[index];
            // this["wc" + dir].visbile = true;
            this.showWc(index);
            if (Global.roomProxy.checkIndexIsMe(index)) {
                //是我
                this.hideTouch();
                this.cards1.delTouch();
                this.cards1.visible = false;
                this.cards1_1.visible = true;
                if (this.findNotChooseOver()) {
                    this.closeTipsGroup();
                    //this.timeBar.visible = false;
                }
                else {
                    //	this.showTipsGroup("等待其他玩家选牛")
                }
            }
            else {
                this["cards" + dir].visible = true;
                if (this.findNotChooseOver()) {
                    this.closeTipsGroup();
                    //this.timeBar.visible = false;
                }
            }
        };
        return NiuniuJSGameScene;
    }(niuniu.NiuniuSGameScene));
    niuniu.NiuniuJSGameScene = NiuniuJSGameScene;
    __reflect(NiuniuJSGameScene.prototype, "niuniu.NiuniuJSGameScene");
})(niuniu || (niuniu = {}));
