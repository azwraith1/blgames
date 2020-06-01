var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerNotify = (function () {
    function ServerNotify() {
    }
    //重连
    ServerNotify.s_robLogin = "s_robLogin";
    //玩家加入
    ServerNotify.s_playerEnter = "s_playerEnter";
    //玩家退出房间
    ServerNotify.s_playerQuitRoom = "s_playerQuitRoom";
    //玩家掉线
    ServerNotify.s_playerOffline = "s_playerOffline";
    //玩家状态变化
    ServerNotify.s_userStatusChanged = "s_userStatusChanged";
    //玩家重连
    ServerNotify.s_playerReconnect = "s_playerReconnect";
    //玩家准备
    ServerNotify.s_playerReady = "s_playerReady";
    //开始新牌局
    ServerNotify.s_startNewRound = "s_startNewRound";
    //发牌
    ServerNotify.s_initHandCards = "s_initHandCards";
    //匹配中途，退出匹配。
    ServerNotify.pexit = "s_quitRoom";
    //选择马牌
    ServerNotify.s_maCardSelected = "s_maCardSelected";
    //换三张
    ServerNotify.s_playerSelectHSZ = "s_playerSelectHSZ";
    //换三张完成
    ServerNotify.s_roomHSZFinished = "s_roomHSZFinished";
    //换三张
    ServerNotify.s_HSZCardExchanged = "s_HSZCardExchanged";
    //选择花色
    ServerNotify.s_playerSelectColor = "s_playerSelectColor";
    //选择花色
    ServerNotify.s_playerColorSelected = "s_playerColorSelected";
    //当前出牌玩家
    ServerNotify.s_curPlay = "s_curPlay";
    //摸排
    ServerNotify.s_newCard = "s_newCard";
    //出牌
    ServerNotify.s_playCard = "s_playCard";
    //公牌变化
    ServerNotify.s_publicCardChanged = "s_publicCardChanged";
    //挂起
    ServerNotify.s_hangupTask = "s_hangupTask";
    //碰
    ServerNotify.s_playerPengCard = "s_playerPengCard";
    //杠
    ServerNotify.s_playerGangCard = "s_playerGangCard";
    //胡
    ServerNotify.s_playerHu = "s_playerHu";
    //牌局结算
    ServerNotify.s_roundSettlement = "s_roundSettlement";
    //牌局结算
    ServerNotify.s_actionsCardsIndex = "s_actionsCardsIndex";
    //结束
    ServerNotify.s_roomFinished = "s_roomFinished";
    //请求解散房间
    ServerNotify.s_reqDestroyRoom = "s_reqDestroyRoom";
    //解散请求结果
    ServerNotify.s_respDestroyRoom = "s_respDestroyRoom";
    //庄家
    ServerNotify.s_dealerChanged = "s_dealerChanged";
    //聊天
    ServerNotify.s_roomChat = "s_roomChat";
    // 游戏金币同步
    ServerNotify.s_gameSyncCoins = "s_gameSyncCoins";
    // 游戏金币同步
    ServerNotify.s_syncGold = "s_syncGold";
    // 倒计时刷新
    ServerNotify.s_countdown = "s_countdown";
    // 倒计时清空
    ServerNotify.s_playerClearWaitTimeout = "s_playerClearWaitTimeout";
    //踢出游戏
    ServerNotify.s_kickPlayer = "s_kickPlayer";
    // 托管
    ServerNotify.s_trustee = "s_trustee";
    //抢杠。
    ServerNotify.s_cancelGangForQG = "s_cancelGangForQG";
    //金币变化
    ServerNotify.s_payGold = "s_payGold";
    //跑马灯
    ServerNotify.s_broadcast = "s_broadcast";
    //房间信息
    ServerNotify.s_enterResult = "s_enterResult";
    //选择老虎机场景
    ServerNotify.s_enterOtherSlotScene = "s_enterOtherSlotScene";
    //踢出游戏
    ServerNotify.s_kickGame = "s_kickGame";
    //初始化补花
    ServerNotify.s_playInitHua = "s_playInitHua";
    //过牌
    ServerNotify.s_passTask = "s_passTask";
    /**杭州麻将 */
    /**房间进入飘的时候 限制玩家打牌 */
    ServerNotify.s_roomStatusChange = "s_roomStatusChange";
    //------------------------------niuniu  star
    ServerNotify.s_startRobDealer = "s_startRobDealer"; //开始抢庄；
    ServerNotify.s_playerRobDealer = "s_playerRobDealer"; //抢庄
    ServerNotify.s_addAnteMulti = "s_addAnteMulti"; //押注倍数
    // public static s_dealerChanged: string = "s_dealerChanged";//庄家变化
    //  public static s_curPlay: string = "s_curPlay";//当前玩家
    ServerNotify.s_startAddAnte = "s_startAddAnte"; //开始押注
    ServerNotify.s_addAnteFinish = "s_addAnteFinish"; //押注完成
    // public static s_initHandCards: string = "s_initHandCards";//发牌
    ServerNotify.s_startPlayCards = "s_startPlayCards"; //开始选牌
    ServerNotify.s_playCards = "s_playCards"; //玩家选牌结果
    ServerNotify.s_playCardsFinish = "s_playCardsFinish"; //选牌完成
    ServerNotify.s_playerAddAnte = "s_playerAddAnte"; //玩家压注通知
    ServerNotify.s_playerAnteChange = "s_playerAnteChange"; //玩家押注变化
    ServerNotify.s_robDealerMulti = "s_robDealerMulti";
    //--------------------------------niuniu end
    //---------------------------------sangong star
    ServerNotify.s_openCard = "s_openCard"; //开牌。
    ServerNotify.s_openCardFinish = "s_openCardFinish"; //开牌完成。
    ServerNotify.s_startOpenCard = "s_startOpenCard"; //开牌完成。
    ServerNotify.s_enterSlotScene = "s_enterSlotScene";
    //-----红黑
    ServerNotify.s_playerBet = "s_playerBet";
    ServerNotify.s_roomInfo = "s_roomInfo";
    ServerNotify.s_roomInitHandCards = "s_roomInitHandCards";
    ServerNotify.s_roomOpenCards = "s_roomOpenCards";
    ServerNotify.s_roomStartBet = "s_roomStartBet";
    ServerNotify.s_roomStopBet = "s_roomStopBet";
    ServerNotify.s_VPlayerBet = "s_VPlayerBet";
    //--------------------扎金花
    ServerNotify.s_addBet = "s_addBet"; //玩家跟住或者加注。
    ServerNotify.s_abandonCard = "s_abandonCard"; //玩家弃牌。
    ServerNotify.s_lookCard = "s_lookCard"; //玩家看牌。
    ServerNotify.s_compareCardResult = "s_compareCardResult"; //比牌结果。
    ServerNotify.s_playerHandCard = "s_playerHandCard"; //广播玩家手牌；
    ServerNotify.s_playerCard = "s_playerCard"; //自己看牌；
    ServerNotify.s_guZhuYiZhi = "s_guZhuYiZhi"; //孤注一掷；
    ServerNotify.s_notify = "s_notify";
    ServerNotify.s_notifyCardsForTest = "s_notifyCardsForTest"; //测试
    ServerNotify.s_operation = "s_operation"; //广播玩家是否可以执行弃牌，比牌操作。
    //-------------dazhong
    ServerNotify.s_playerBaoTing = "s_playerBaoTing";
    ServerNotify.s_playerChiCard = "s_playerChiCard";
    ServerNotify.s_playHua = "s_playHua";
    ServerNotify.s_roundMaxTurn = "s_roundMaxTurn";
    ServerNotify.s_tings = "s_tings";
    //bajiale
    ServerNotify.s_ruffleCard = "s_ruffleCard";
    ServerNotify.s_cardsNumInfo = "s_cardsNumInfo";
    ServerNotify.s_sendWayBillInfo = "s_sendWayBillInfo";
    ServerNotify.s_roomStateChanged = "s_roomStateChanged";
    /**咪手牌*/
    ServerNotify.s_miniInitCards = "s_miniInitCards";
    //咪补牌
    ServerNotify.s_miniAddCards = "s_miniAddCards";
    //21点
    ServerNotify.s_tablesInfo = "s_tablesInfo";
    ServerNotify.s_startBet = "s_startBet";
    ServerNotify.s_stopBet = "s_stopBet";
    ServerNotify.s_dealHandCard = "s_dealHandCard";
    ServerNotify.s_notifyPlayerAction = "s_notifyPlayerAction";
    ServerNotify.s_bet = "s_bet";
    ServerNotify.s_startInsurance = "s_startInsurance";
    ServerNotify.s_stopInsurance = "s_stopInsurance";
    ServerNotify.s_finishBet = "s_finishBet";
    ServerNotify.s_addCard = "s_addCard";
    ServerNotify.s_doubleBet = "s_doubleBet";
    ServerNotify.s_stopCard = "s_stopCard";
    ServerNotify.s_splitCard = "s_splitCard";
    ServerNotify.s_endInsurance = "s_endInsurance";
    ServerNotify.s_insuranceSettlement = "s_insuranceSettlement";
    ServerNotify.s_dealCardsParttern = "s_dealCardsParttern";
    ServerNotify.s_sendDealLastCards = "s_sendDealLastCards";
    //gdmj
    ServerNotify.s_roomSetBaoCard = "s_roomSetBaoCard";
    ServerNotify.s_roomBuyMa = "s_roomBuyMa";
    ServerNotify.s_playerTingCards = "s_playerTingCards";
    ServerNotify.s_displayCardInfo = "s_displayCardInfo";
    //bdz
    ServerNotify.s_handleBetTask = "s_handleBetTask"; //玩家投注事件
    ServerNotify.s_handleOperateTask = "s_handleOperateTask"; //玩家弃牌、过操作。
    ServerNotify.s_startSwitchCard = "s_startSwitchCard"; //开始换牌
    ServerNotify.s_curPlaySwitchCard = "s_curPlaySwitchCard"; //开牌。
    ServerNotify.s_switchCard = "s_switchCard";
    //比赛场
    ServerNotify.s_pushRaceStartCountDown = "s_pushRaceStartCountDown";
    ServerNotify.s_raceStartResult = "s_raceStartResult";
    ServerNotify.s_enterRace = "s_enterRace";
    ServerNotify.s_pushRaceSettlementInfo = "s_pushRaceSettlementInfo";
    ServerNotify.s_pushRaceReward = "s_pushRaceReward";
    ServerNotify.s_pushRaceWaitInfo = "s_pushRaceWaitInfo";
    ServerNotify.s_freePlayer = "s_freePlayer";
    ServerNotify.s_playerEmoji = "s_playerEmoji";
    ServerNotify.s_pushRaceInvite = "s_pushRaceInvite";
    ServerNotify.s_pushRemainTableNum = "s_pushRemainTableNum";
    ServerNotify.s_playerBigWin = "s_playerBigWin";
    //-----------club
    ServerNotify.s_clubTablePlayerLeave = "s_clubTablePlayerLeave";
    ServerNotify.s_clubPlayerSitdown = "s_clubPlayerSitdown";
    ServerNotify.s_tablePlayerStateInfo = "s_tablePlayerStateInfo";
    ServerNotify.s_pushTableStateInfo = "s_pushTableStateInfo";
    ServerNotify.s_pushNewTables = "s_pushNewTables";
    /**同步销毁桌子*/
    ServerNotify.s_pushDestoryTables = "s_pushDestoryTables";
    /**当有新成员加入的时候*/
    ServerNotify.s_pushNewApprovalMessagesEvent = "s_pushNewApprovalMessagesEvent";
    ServerNotify.s_pushTableInviteMessage = "s_pushTableInviteMessage";
    ServerNotify.s_pushDestoryClub = "s_pushDestoryClub";
    /**把玩家踢出俱乐部 */
    ServerNotify.s_clubPlayerKick = "s_clubPlayerKick";
    ServerNotify.s_pushLuckyTablePlayerInfo = "s_pushLuckyTablePlayerInfo";
    ServerNotify.s_pushLuckySettlement = "s_pushLuckySettlement";
    /**血战 以下博大*/
    ServerNotify.s_overloadBackInfo = "s_overloadBackInfo";
    /**退税*/
    ServerNotify.s_leaveBackGold = "s_leaveBackGold";
    /**baicao  开牌结果*/
    ServerNotify.s_openCardResult = "s_openCardResult";
    ServerNotify.s_endOpenCard = "s_endOpenCard";
    ServerNotify.s_pushRaceRewardChange = "s_pushRaceRewardChange";
    /**supberbaicao 玩家操作 */
    ServerNotify.s_playerOprate = "s_playerOprate";
    /**玩家操作结果 */
    ServerNotify.s_playerOprateResult = "s_playerOprateResult";
    /** 新一轮操作通知 */
    ServerNotify.s_newTurnOprateNotify = "s_newTurnOprateNotify";
    /**更新金币值 */
    ServerNotify.s_asyncGoldToClient = "s_asyncGoldToClient";
    /**开放游戏改变*/
    ServerNotify.s_pushClubOpenGameChange = "s_pushClubOpenGameChange";
    return ServerNotify;
}());
__reflect(ServerNotify.prototype, "ServerNotify");
