class ServerNotify {
  //重连
  public static s_robLogin: string = "s_robLogin";
  //玩家加入
  public static s_playerEnter: string = "s_playerEnter";
  //玩家退出房间
  public static s_playerQuitRoom: string = "s_playerQuitRoom";
  //玩家掉线
  public static s_playerOffline: string = "s_playerOffline";
  //玩家状态变化
  public static s_userStatusChanged: string = "s_userStatusChanged";
  //玩家重连
  public static s_playerReconnect: string = "s_playerReconnect";
  //玩家准备
  public static s_playerReady: string = "s_playerReady";
  //开始新牌局
  public static s_startNewRound: string = "s_startNewRound";
  //发牌
  public static s_initHandCards: string = "s_initHandCards";
  //匹配中途，退出匹配。
  public static pexit: string = "s_quitRoom";
  //选择马牌
  public static s_maCardSelected: string = "s_maCardSelected";
  //换三张
  public static s_playerSelectHSZ: string = "s_playerSelectHSZ";
  //换三张完成
  public static s_roomHSZFinished: string = "s_roomHSZFinished";
  //换三张
  public static s_HSZCardExchanged: string = "s_HSZCardExchanged";
  //选择花色
  public static s_playerSelectColor: string = "s_playerSelectColor";
  //选择花色
  public static s_playerColorSelected: string = "s_playerColorSelected";
  //当前出牌玩家
  public static s_curPlay: string = "s_curPlay";
  //摸排
  public static s_newCard: string = "s_newCard";
  //出牌
  public static s_playCard: string = "s_playCard";
  //公牌变化
  public static s_publicCardChanged: string = "s_publicCardChanged";
  //挂起
  public static s_hangupTask: string = "s_hangupTask";
  //碰
  public static s_playerPengCard: string = "s_playerPengCard";
  //杠
  public static s_playerGangCard: string = "s_playerGangCard";
  //胡
  public static s_playerHu: string = "s_playerHu";
  //牌局结算
  public static s_roundSettlement: string = "s_roundSettlement";
  //牌局结算
  public static s_actionsCardsIndex: string = "s_actionsCardsIndex";
  //结束
  public static s_roomFinished: string = "s_roomFinished";
  //请求解散房间
  public static s_reqDestroyRoom: string = "s_reqDestroyRoom";
  //解散请求结果
  public static s_respDestroyRoom: string = "s_respDestroyRoom";
  //庄家
  public static s_dealerChanged: string = "s_dealerChanged";
  //聊天
  public static s_roomChat: string = "s_roomChat";
  // 游戏金币同步
  public static s_gameSyncCoins: string = "s_gameSyncCoins";
  // 游戏金币同步
  public static s_syncGold: string = "s_syncGold";
  // 倒计时刷新
  public static s_countdown: string = "s_countdown";
  // 倒计时清空
  public static s_playerClearWaitTimeout: string = "s_playerClearWaitTimeout";
  //踢出游戏
  public static s_kickPlayer: string = "s_kickPlayer";
  // 托管
  public static s_trustee: string = "s_trustee";
  //抢杠。
  public static s_cancelGangForQG: string = "s_cancelGangForQG";
  //金币变化
  public static s_payGold: string = "s_payGold";
  //跑马灯
  public static s_broadcast: string = "s_broadcast";
  //房间信息
  public static s_enterResult: string = "s_enterResult";
  //选择老虎机场景
  public static s_enterOtherSlotScene: string = "s_enterOtherSlotScene";
  //踢出游戏
  public static s_kickGame: string = "s_kickGame";
  //初始化补花
  public static s_playInitHua: string = "s_playInitHua";
  //过牌
  public static s_passTask: string = "s_passTask";
  /**杭州麻将 */
  /**房间进入飘的时候 限制玩家打牌 */
  public static s_roomStatusChange: string = "s_roomStatusChange";


  //------------------------------niuniu  star

  public static s_startRobDealer: string = "s_startRobDealer";//开始抢庄；
  public static s_playerRobDealer: string = "s_playerRobDealer";//抢庄
  public static s_addAnteMulti: string = "s_addAnteMulti";//押注倍数
  // public static s_dealerChanged: string = "s_dealerChanged";//庄家变化
  //  public static s_curPlay: string = "s_curPlay";//当前玩家
  public static s_startAddAnte: string = "s_startAddAnte";//开始押注
  public static s_addAnteFinish: string = "s_addAnteFinish";//押注完成
  // public static s_initHandCards: string = "s_initHandCards";//发牌
  public static s_startPlayCards: string = "s_startPlayCards";//开始选牌
  public static s_playCards: string = "s_playCards";//玩家选牌结果
  public static s_playCardsFinish: string = "s_playCardsFinish";//选牌完成
  public static s_playerAddAnte: string = "s_playerAddAnte";//玩家压注通知
  public static s_playerAnteChange: string = "s_playerAnteChange";//玩家押注变化
  public static s_robDealerMulti: string = "s_robDealerMulti";
  //--------------------------------niuniu end

  //---------------------------------sangong star
  public static s_openCard: string = "s_openCard";//开牌。
  public static s_openCardFinish: string = "s_openCardFinish";//开牌完成。
  public static s_startOpenCard: string = "s_startOpenCard";//开牌完成。
  public static s_enterSlotScene: string = "s_enterSlotScene";

  //-----红黑
  public static s_playerBet: string = "s_playerBet";
  public static s_roomInfo: string = "s_roomInfo";
  public static s_roomInitHandCards: string = "s_roomInitHandCards";
  public static s_roomOpenCards: string = "s_roomOpenCards";
  public static s_roomStartBet: string = "s_roomStartBet";
  public static s_roomStopBet: string = "s_roomStopBet";
  public static s_VPlayerBet: string = "s_VPlayerBet";

  //--------------------扎金花
  public static s_addBet: string = "s_addBet"//玩家跟住或者加注。

  public static s_abandonCard: string = "s_abandonCard"//玩家弃牌。

  public static s_lookCard: string = "s_lookCard"//玩家看牌。

  public static s_compareCardResult: string = "s_compareCardResult" //比牌结果。

  public static s_playerHandCard: string = "s_playerHandCard"//广播玩家手牌；


  public static s_playerCard: string = "s_playerCard"//自己看牌；

  public static s_guZhuYiZhi: string = "s_guZhuYiZhi"//孤注一掷；

  public static s_notify: string = "s_notify"

  public static s_notifyCardsForTest: string = "s_notifyCardsForTest";//测试

  public static s_operation: string = "s_operation";//广播玩家是否可以执行弃牌，比牌操作。



  //-------------dazhong
  public static s_playerBaoTing: string = "s_playerBaoTing";

  public static s_playerChiCard: string = "s_playerChiCard";

  public static s_playHua: string = "s_playHua";

  public static s_roundMaxTurn: string = "s_roundMaxTurn";

  public static s_tings: string = "s_tings";

  //bajiale

  public static s_ruffleCard: string = "s_ruffleCard";
  public static s_cardsNumInfo: string = "s_cardsNumInfo";
  public static s_sendWayBillInfo: string = "s_sendWayBillInfo";
  public static s_roomStateChanged: string = "s_roomStateChanged";
  /**咪手牌*/
  public static s_miniInitCards: string = "s_miniInitCards";
  //咪补牌
  public static s_miniAddCards: string = "s_miniAddCards";

  //21点
  public static s_tablesInfo: string = "s_tablesInfo";

  public static s_startBet: string = "s_startBet";

  public static s_stopBet: string = "s_stopBet";

  public static s_dealHandCard: string = "s_dealHandCard";

  public static s_notifyPlayerAction: string = "s_notifyPlayerAction";

  public static s_bet: string = "s_bet";

  public static s_startInsurance: string = "s_startInsurance";

  public static s_stopInsurance: string = "s_stopInsurance";

  public static s_finishBet: string = "s_finishBet";

  public static s_addCard: string = "s_addCard";

  public static s_doubleBet: string = "s_doubleBet";

  public static s_stopCard: string = "s_stopCard";

  public static s_splitCard: string = "s_splitCard";

  public static s_endInsurance: string = "s_endInsurance";

  public static s_insuranceSettlement: string = "s_insuranceSettlement";

  public static s_dealCardsParttern: string = "s_dealCardsParttern";

  public static s_sendDealLastCards: string = "s_sendDealLastCards";

  //gdmj
  public static s_roomSetBaoCard: string = "s_roomSetBaoCard";

  public static s_roomBuyMa: string = "s_roomBuyMa";

  public static s_playerTingCards: string = "s_playerTingCards";

  public static s_displayCardInfo: string = "s_displayCardInfo";

  //bdz
  public static s_handleBetTask: string = "s_handleBetTask";//玩家投注事件
  public static s_handleOperateTask: string = "s_handleOperateTask";//玩家弃牌、过操作。
  public static s_startSwitchCard: string = "s_startSwitchCard";//开始换牌
  public static s_curPlaySwitchCard: string = "s_curPlaySwitchCard";//开牌。
  public static s_switchCard: string = "s_switchCard";

  //比赛场
  public static s_pushRaceStartCountDown: string = "s_pushRaceStartCountDown";

  public static s_raceStartResult: string = "s_raceStartResult";

  public static s_enterRace: string = "s_enterRace";

  public static s_pushRaceSettlementInfo: string = "s_pushRaceSettlementInfo";

  public static s_pushRaceReward: string = "s_pushRaceReward";

  public static s_pushRaceWaitInfo: string = "s_pushRaceWaitInfo";

  public static s_freePlayer: string = "s_freePlayer";

  public static s_playerEmoji: string = "s_playerEmoji";

  public static s_pushRaceInvite: string = "s_pushRaceInvite";

  public static s_pushRemainTableNum: string = "s_pushRemainTableNum";

  public static s_playerBigWin: string = "s_playerBigWin";


  //-----------club

  public static s_clubTablePlayerLeave: string = "s_clubTablePlayerLeave";

  public static s_clubPlayerSitdown: string = "s_clubPlayerSitdown";

  public static s_tablePlayerStateInfo: string = "s_tablePlayerStateInfo";

  public static s_pushTableStateInfo: string = "s_pushTableStateInfo";

  public static s_pushNewTables: string = "s_pushNewTables";

  /**同步销毁桌子*/
  public static s_pushDestoryTables: string = "s_pushDestoryTables";

  /**当有新成员加入的时候*/
  public static s_pushNewApprovalMessagesEvent: string = "s_pushNewApprovalMessagesEvent";

  public static s_pushTableInviteMessage: string = "s_pushTableInviteMessage";

  public static s_pushDestoryClub: string = "s_pushDestoryClub";

  /**把玩家踢出俱乐部 */
  public static s_clubPlayerKick: string = "s_clubPlayerKick";

  public static s_pushLuckyTablePlayerInfo: string = "s_pushLuckyTablePlayerInfo";

  public static s_pushLuckySettlement: string = "s_pushLuckySettlement";
  /**血战 以下博大*/
  public static s_overloadBackInfo: string = "s_overloadBackInfo";
  /**退税*/
  public static s_leaveBackGold: string = "s_leaveBackGold";

  /**baicao  开牌结果*/
  public static s_openCardResult: string = "s_openCardResult";
  public static s_endOpenCard: string = "s_endOpenCard";

  public static s_pushRaceRewardChange: string = "s_pushRaceRewardChange";
  /**supberbaicao 玩家操作 */
  public static s_playerOprate: string = "s_playerOprate";
  /**玩家操作结果 */
  public static s_playerOprateResult: string = "s_playerOprateResult";
  /** 新一轮操作通知 */
  public static s_newTurnOprateNotify: string = "s_newTurnOprateNotify";

  /**更新金币值 */
  public static s_asyncGoldToClient: string = "s_asyncGoldToClient";

  /**开放游戏改变*/
  public static s_pushClubOpenGameChange: string = "s_pushClubOpenGameChange";
} 
