var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerPostPath = (function () {
    function ServerPostPath() {
    }
    //获取房间信息
    ServerPostPath.hall_sceneHandler_c_enter = "hall.sceneHandler.c_enter";
    //换三张选择手牌
    ServerPostPath.game_mjHandler_c_selectHSZ = "game.mjHandler.c_selectHSZ";
    //选择定缺花色
    ServerPostPath.game_mjHandler_c_selectColor = "game.mjHandler.c_selectColor";
    //玩家碰牌
    ServerPostPath.game_mjHandler_c_pengTask = "game.mjHandler.c_pengTask";
    //杠
    ServerPostPath.game_mjHandler_c_gangTask = "game.mjHandler.c_gangTask";
    //过
    ServerPostPath.game_mjHandler_c_passTask = "game.mjHandler.c_passTask";
    //胡
    ServerPostPath.game_mjHandler_c_huTask = "game.mjHandler.c_huTask";
    //获取回访
    ServerPostPath.hall_userHandler_c_getPlaybackInfo = "hall.userHandler.c_getPlaybackInfo";
    //查询听牌提示
    ServerPostPath.game_mjHandler_c_queryTings = "game.mjHandler.c_queryTings";
    //查询room
    ServerPostPath.game_roomHandler_c_queryRoomInfo = "game.roomHandler.c_queryRoomInfo";
    //玩家退出等待界面
    ServerPostPath.game_roomHandler_c_quitRoom = "hall.sceneHandler.c_quitRoom";
    //玩家取消托管操作
    ServerPostPath.game_mjHandler_c_cancelTrustee = "game.mjHandler.c_cancelTrustee";
    //玩家发文字表情
    ServerPostPath.game_mjHandler_c_chat = "game.roomHandler.c_chat";
    //查询用户是否在房间
    ServerPostPath.hall_sceneHandler_c_queryGameState = "hall.sceneHandler.c_queryGameState";
    //玩家流水记录
    ServerPostPath.hall_userHandler_c_getReportInfo = "hall.userHandler.c_getReportInfo";
    //在线人数
    ServerPostPath.hall_sceneHandler_c_getGameOnlineCountInfo = "hall.sceneHandler.c_getGameOnlineCountInfo";
    //退出房间
    ServerPostPath.hall_sceneHandler_c_leave = "hall.sceneHandler.c_leave";
    //GM工具
    ServerPostPath.game_mjHandler_c_setAIThinkTime = "game.mjHandler.c_setAIThinkTime";
    //----------------------------------------niuniu star
    //抢庄
    ServerPostPath.game_nnHandler_c_robDealer = "game.blnnHandler.c_robDealer";
    //押注
    ServerPostPath.game_nnHandler_c_addAnte = "game.blnnHandler.c_addAnte";
    //开牌
    ServerPostPath.game_nnHandle_rc_playCards = "game.blnnHandler.c_playCards";
    //----------------------------------------niuniu end
    //三公抢庄
    ServerPostPath.game_sangongHandler_c_robDealer = "game.sangongHandler.c_robDealer";
    //三公押注
    ServerPostPath.game_sangongHandler_c_addAnte = "game.sangongHandler.c_addAnte";
    //三公开牌
    ServerPostPath.game_sangongHandler_c_openCard = "game.sangongHandler.c_openCard";
    //老虎机押注
    ServerPostPath.game_slotHandler_c_bet = "game.slotHandler.c_bet";
    //老虎机选择免费场景
    ServerPostPath.game_slotHandler_c_selectBonusGame = "game.slotHandler.c_selectBonusGame";
    //rbwar
    //红黑押注
    ServerPostPath.game_rbWarHandler_c_bet = "game.rbWarHandler.c_bet";
    //百家乐押注
    ServerPostPath.game_bccaratHandler_c_bet = "game.bccaratHandler.c_bet";
    //ping服务器延迟
    ServerPostPath.connector_entryHandler_c_ping = "connector.entryHandler.c_ping";
    ServerPostPath.game_mjHandler_c_pingGame = "game.mjHandler.c_pingGame";
    //-------dazhong
    ServerPostPath.game_mjHandler_c_chiTask = "game.mjHandler.c_chiTask";
    ServerPostPath.game_mjHandler_c_baoTing = "game.mjHandler.c_baoTing";
    //zajinhua--------------------------
    //加注
    ServerPostPath.game_zjhHandler_c_addBet = "game.zjhHandler.c_addBet";
    //弃牌
    ServerPostPath.game_zjhHandler_c_abandonCard = "game.zjhHandler.c_abandonCard";
    //跟注
    ServerPostPath.game_zjhHandler_c_followBet = "game.zjhHandler.c_followBet";
    //看牌
    ServerPostPath.game_zjhHandler_c_lookCard = "game.zjhHandler.c_lookCard";
    //比牌
    ServerPostPath.game_zjhHandler_c_compareCard = "game.zjhHandler.c_compareCard";
    //超时保护
    ServerPostPath.game_zjhHandler_c_timeOutProject = "game.zjhHandler.c_timeOutProject";
    //bajiale-----------------------------------------
    //获取百家乐信息
    ServerPostPath.hall_sceneHandler_c_getSceneStateInfo = "hall.sceneHandler.c_getSceneStateInfo";
    //取消注册
    ServerPostPath.connector_entryHandler_c_cancelRoomStateInfo = "connector.entryHandler.c_cancelRoomStateInfo";
    //注册
    ServerPostPath.hall_sceneHandler_c_registerRoomStateInfo = "hall.sceneHandler.c_registerRoomStateInfo";
    //21点
    //下注
    ServerPostPath.game_blackjackHandler_c_bet = "game.blackjackHandler.c_bet";
    //完成下注
    ServerPostPath.game_blackjackHandler_c_finishBet = "game.blackjackHandler.c_finishBet";
    //玩家动作
    ServerPostPath.game_blackjackHandler_c_action = "game.blackjackHandler.c_action";
    //购买保险
    ServerPostPath.game_blackjackHandler_c_buyInsurance = "game.blackjackHandler.c_buyInsurance";
    /**superbaicao 下注 跟注 放弃 */
    ServerPostPath.game_superBaiCaoHandler_c_oprate = "game.superBaiCaoHandler.c_oprate";
    //bdz
    //押注
    ServerPostPath.game_bdzHandler_c_submitOperateTask = "game.bdzHandler.c_submitOperateTask";
    ServerPostPath.game_bdzHandler_c_switchCard = "game.bdzHandler.c_switchCard";
    // ------------ 比赛场
    //比赛场列表
    ServerPostPath.hall_userHandler_c_raceScenes = "hall.userHandler.c_raceScenes";
    //进入比赛
    ServerPostPath.hall_userHandler_c_enterRace = "hall.userHandler.c_enterRace";
    //报名比赛
    ServerPostPath.hall_userHandler_c_joinRace = "hall.userHandler.c_joinRace";
    //退出匹配房间
    ServerPostPath.hall_userHandler_quitRace = "hall.userHandler.c_quitRace";
    //发送表情
    ServerPostPath.hall_userHandler_c_playerEmoji = "game.roomHandler.c_playerEmoji";
    ServerPostPath.hall_userHandler_c_scoreRank = "hall.userHandler.c_scoreRank";
    ServerPostPath.rank_userHandler_c_getRank = "rank.userHandler.c_getRank";
    ServerPostPath.s_playerBigWin = "s_playerBigWin";
    //club
    ServerPostPath.hall_clubHandler_c_leaveClubTable = "hall.clubHandler.c_leaveClubTable";
    ServerPostPath.hall_clubHandler_c_leaveClubHall = "hall.clubHandler.c_leaveClubHall";
    ServerPostPath.hall_clubHandler_c_joinClub = "hall.clubHandler.c_joinClub";
    ServerPostPath.hall_ubHandler_c_createClub = "hall.clubHandler.c_createClub";
    ServerPostPath.hall_clubHandler_c_getClubList = "hall.clubHandler.c_getClubList";
    /**club 俱乐部成员*/
    ServerPostPath.hall_clubHandler_c_getClubPlayers = "hall.clubHandler.c_getClubPlayers";
    ServerPostPath.hall_clubHandler_c_enterClubHall = "hall.clubHandler.c_enterClubHall";
    ServerPostPath.hall_clubHandler_c_enterClubTable = "hall.clubHandler.c_enterClubTable";
    /**俱乐部 战绩 */
    ServerPostPath.hall_clubHandler_c_getClubReportInfo = "hall.clubHandler.c_getClubReportInfo";
    ServerPostPath.hall_clubHandler_c_clubPlayerSitdown = "hall.clubHandler.c_clubPlayerSitdown";
    ServerPostPath.hall_clubHandler_c_getPlayerCurTableInfo = "hall.clubHandler.c_getPlayerCurTableInfo";
    /**俱乐部管理 */
    ServerPostPath.hall_clubHandler_c_getClubConfig = "hall.clubHandler.c_getClubConfig";
    /**俱乐部税率设置 */
    ServerPostPath.hall_clubHandler_c_setClubConfig = "hall.clubHandler.c_setClubConfig";
    /**领取俱乐部金币（BOSS 专用） */
    ServerPostPath.hall_clubHandler_c_receiveClubIncome = "hall.clubHandler.c_receiveClubIncome";
    /**获取俱乐部收益信息（BOSS 专用）*/
    ServerPostPath.hall_clubHandler_c_getClubIncomeInfo = "hall.clubHandler.c_getClubIncomeInfo";
    ServerPostPath.hall_clubHandler_c_fastJoinTable = "hall.clubHandler.c_fastJoinTable";
    /**获取成员审批 */
    ServerPostPath.hall_clubHandler_c_getClubApprovalMessages = "hall.clubHandler.c_getClubApprovalMessages";
    /**成员审批拒绝或同意 */
    ServerPostPath.hall_clubHandler_c_clubMembersApproval = "hall.clubHandler.c_clubMembersApproval";
    /**获取成员管理 */
    ServerPostPath.hall_clubHandler_c_getClubMembersAdministerInfo = "hall.clubHandler.c_getClubMembersAdministerInfo";
    /**成员管理  TODO */
    ServerPostPath.hall_clubHandler_c_clubMembersAdminister = "hall.clubHandler.c_clubMembersAdminister";
    /**牌桌管理 设置 */
    ServerPostPath.hall_clubHandler_c_setClubTableConfig = "hall.clubHandler.c_setClubTableConfig";
    /**获取牌桌管理 */
    ServerPostPath.hall_clubHandler_c_getClubTableConfig = "hall.clubHandler.c_getClubTableConfig";
    //获取俱乐部大厅邮件
    ServerPostPath.hall_userHandler_c_getMailList = "hall.userHandler.c_getMailList";
    //俱乐部删除邮件
    ServerPostPath.hall_userHandler_c_delMail = "hall.userHandler.c_delMail";
    //俱乐部删除所有邮件
    ServerPostPath.hall_userHandler_c_cleanMail = "hall.userHandler.c_cleanMail";
    /**解散俱乐部*/
    ServerPostPath.hall_clubHandler_c_disbandClub = "hall.clubHandler.c_disbandClub";
    //邀请玩家列表
    ServerPostPath.hall_clubHandler_c_getInvitePlayerList = "hall.clubHandler.c_getInvitePlayerList";
    //邀请玩家
    ServerPostPath.hall_clubHandler_c_inviteOtherPlayer = "hall.clubHandler.c_inviteOtherPlayer";
    //处理玩家邀请
    ServerPostPath.hall_clubHandler_c_dealPlayerInvite = "hall.clubHandler.c_dealPlayerInvite";
    ServerPostPath.s_invitePlayerJoinTable = "s_invitePlayerJoinTable";
    // 拒绝加入俱乐部
    ServerPostPath.hall_clubHandler_c_refuseInviteGame = "hall.clubHandler.c_refuseInviteGame";
    //大厅退出俱乐部id
    ServerPostPath.hall_clubHandler_c_quitClub = "hall.clubHandler.c_quitClub";
    //比赛新模式
    ServerPostPath.hall_luckyHandler_c_getLuckyGameListInfo = "hall.luckyHandler.c_getLuckyGameListInfo";
    ServerPostPath.hall_luckyHandler_c_joinLuckyGame = "hall.luckyHandler.c_joinLuckyGame";
    ServerPostPath.hall_luckyHandler_c_quitLuckyGame = "hall.luckyHandler.c_quitLuckyGame";
    //游戏开关 Boss专用
    ServerPostPath.hall_clubHandler_c_setOpenGame = "hall.clubHandler.c_setOpenGame";
    return ServerPostPath;
}());
__reflect(ServerPostPath.prototype, "ServerPostPath");
