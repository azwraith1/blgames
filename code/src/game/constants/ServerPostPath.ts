class ServerPostPath {
	//获取房间信息
	public static hall_sceneHandler_c_enter: string = "hall.sceneHandler.c_enter";
	//换三张选择手牌
	public static game_mjHandler_c_selectHSZ: string = "game.mjHandler.c_selectHSZ";
	//选择定缺花色
	public static game_mjHandler_c_selectColor: string = "game.mjHandler.c_selectColor";
	//玩家碰牌
	public static game_mjHandler_c_pengTask: string = "game.mjHandler.c_pengTask";
	//杠
	public static game_mjHandler_c_gangTask: string = "game.mjHandler.c_gangTask";
	//过
	public static game_mjHandler_c_passTask: string = "game.mjHandler.c_passTask";
	//胡
	public static game_mjHandler_c_huTask: string = "game.mjHandler.c_huTask";
	//获取回访
	public static hall_userHandler_c_getPlaybackInfo: string = "hall.userHandler.c_getPlaybackInfo";
	//查询听牌提示
	public static game_mjHandler_c_queryTings: string = "game.mjHandler.c_queryTings";
	//查询room
	public static game_roomHandler_c_queryRoomInfo: string = "game.roomHandler.c_queryRoomInfo";
	//玩家退出等待界面
	public static game_roomHandler_c_quitRoom: string = "hall.sceneHandler.c_quitRoom";
	//玩家取消托管操作
	public static game_mjHandler_c_cancelTrustee: string = "game.mjHandler.c_cancelTrustee"
	//玩家发文字表情
	public static game_mjHandler_c_chat: string = "game.roomHandler.c_chat";
	//查询用户是否在房间
	public static hall_sceneHandler_c_queryGameState: string = "hall.sceneHandler.c_queryGameState";
	//玩家流水记录
	public static hall_userHandler_c_getReportInfo: string = "hall.userHandler.c_getReportInfo";
	//在线人数
	public static hall_sceneHandler_c_getGameOnlineCountInfo: string = "hall.sceneHandler.c_getGameOnlineCountInfo";
	//退出房间
	public static hall_sceneHandler_c_leave: string = "hall.sceneHandler.c_leave";
	//GM工具
	public static game_mjHandler_c_setAIThinkTime: string = "game.mjHandler.c_setAIThinkTime";

	//----------------------------------------niuniu star
	//抢庄
	public static game_nnHandler_c_robDealer: string = "game.blnnHandler.c_robDealer";
	//押注
	public static game_nnHandler_c_addAnte: string = "game.blnnHandler.c_addAnte";
	//开牌
	public static game_nnHandle_rc_playCards: string = "game.blnnHandler.c_playCards";
	//----------------------------------------niuniu end
	//三公抢庄
	public static game_sangongHandler_c_robDealer: string = "game.sangongHandler.c_robDealer";
	//三公押注
	public static game_sangongHandler_c_addAnte: string = "game.sangongHandler.c_addAnte";
	//三公开牌
	public static game_sangongHandler_c_openCard: string = "game.sangongHandler.c_openCard";

	//老虎机押注
	public static game_slotHandler_c_bet: string = "game.slotHandler.c_bet";
	//老虎机选择免费场景
	public static game_slotHandler_c_selectBonusGame: string = "game.slotHandler.c_selectBonusGame";


	//rbwar
	//红黑押注
	public static game_rbWarHandler_c_bet: string = "game.rbWarHandler.c_bet";
	//百家乐押注
	public static game_bccaratHandler_c_bet: string = "game.bccaratHandler.c_bet";
	//ping服务器延迟
	public static connector_entryHandler_c_ping: string = "connector.entryHandler.c_ping";

	public static game_mjHandler_c_pingGame: string = "game.mjHandler.c_pingGame";


	//-------dazhong
	public static game_mjHandler_c_chiTask: string = "game.mjHandler.c_chiTask";
	public static game_mjHandler_c_baoTing: string = "game.mjHandler.c_baoTing";

	//zajinhua--------------------------
	//加注
	public static game_zjhHandler_c_addBet: string = "game.zjhHandler.c_addBet";
	//弃牌
	public static game_zjhHandler_c_abandonCard: string = "game.zjhHandler.c_abandonCard";
	//跟注
	public static game_zjhHandler_c_followBet: string = "game.zjhHandler.c_followBet";
	//看牌
	public static game_zjhHandler_c_lookCard: string = "game.zjhHandler.c_lookCard";
	//比牌
	public static game_zjhHandler_c_compareCard: string = "game.zjhHandler.c_compareCard";
	//超时保护
	public static game_zjhHandler_c_timeOutProject: string = "game.zjhHandler.c_timeOutProject";

	//bajiale-----------------------------------------
	//获取百家乐信息
	public static hall_sceneHandler_c_getSceneStateInfo: string = "hall.sceneHandler.c_getSceneStateInfo";
	//取消注册
	public static connector_entryHandler_c_cancelRoomStateInfo: string = "connector.entryHandler.c_cancelRoomStateInfo";
	//注册
	public static hall_sceneHandler_c_registerRoomStateInfo: string = "hall.sceneHandler.c_registerRoomStateInfo";

	//21点
	//下注
	public static game_blackjackHandler_c_bet: string = "game.blackjackHandler.c_bet";
	//完成下注
	public static game_blackjackHandler_c_finishBet: string = "game.blackjackHandler.c_finishBet";
	//玩家动作
	public static game_blackjackHandler_c_action: string = "game.blackjackHandler.c_action";
	//购买保险
	public static game_blackjackHandler_c_buyInsurance: string = "game.blackjackHandler.c_buyInsurance"
	/**superbaicao 下注 跟注 放弃 */
    public static game_superBaiCaoHandler_c_oprate:string="game.superBaiCaoHandler.c_oprate";
	//bdz
	//押注
	public static game_bdzHandler_c_submitOperateTask: string = "game.bdzHandler.c_submitOperateTask";

	public static game_bdzHandler_c_switchCard: string = "game.bdzHandler.c_switchCard";
	// ------------ 比赛场
	//比赛场列表
	public static hall_userHandler_c_raceScenes: string = "hall.userHandler.c_raceScenes";
	//进入比赛
	public static hall_userHandler_c_enterRace: string = "hall.userHandler.c_enterRace";
	//报名比赛
	public static hall_userHandler_c_joinRace: string = "hall.userHandler.c_joinRace";
	//退出匹配房间
	public static hall_userHandler_quitRace: string = "hall.userHandler.c_quitRace";
	//发送表情
	public static hall_userHandler_c_playerEmoji: string = "game.roomHandler.c_playerEmoji";

	public static hall_userHandler_c_scoreRank: string = "hall.userHandler.c_scoreRank";

	public static rank_userHandler_c_getRank: string = "rank.userHandler.c_getRank";

	public static s_playerBigWin: string = "s_playerBigWin";
	//club

	public static hall_clubHandler_c_leaveClubTable: string = "hall.clubHandler.c_leaveClubTable"

	public static hall_clubHandler_c_leaveClubHall: string = "hall.clubHandler.c_leaveClubHall"

	public static hall_clubHandler_c_joinClub: string = "hall.clubHandler.c_joinClub";

	public static hall_ubHandler_c_createClub: string = "hall.clubHandler.c_createClub";

	public static hall_clubHandler_c_getClubList: string = "hall.clubHandler.c_getClubList";

	/**club 俱乐部成员*/
	public static hall_clubHandler_c_getClubPlayers: string = "hall.clubHandler.c_getClubPlayers"


	public static hall_clubHandler_c_enterClubHall: string = "hall.clubHandler.c_enterClubHall";

	public static hall_clubHandler_c_enterClubTable: string = "hall.clubHandler.c_enterClubTable";

	/**俱乐部 战绩 */
	public static hall_clubHandler_c_getClubReportInfo: string = "hall.clubHandler.c_getClubReportInfo";


	public static hall_clubHandler_c_clubPlayerSitdown: string = "hall.clubHandler.c_clubPlayerSitdown";

	public static hall_clubHandler_c_getPlayerCurTableInfo: string = "hall.clubHandler.c_getPlayerCurTableInfo";
	/**俱乐部管理 */
	public static hall_clubHandler_c_getClubConfig: string = "hall.clubHandler.c_getClubConfig";
	/**俱乐部税率设置 */
	public static hall_clubHandler_c_setClubConfig: string = "hall.clubHandler.c_setClubConfig";
	/**领取俱乐部金币（BOSS 专用） */
	public static hall_clubHandler_c_receiveClubIncome: string = "hall.clubHandler.c_receiveClubIncome";
	/**获取俱乐部收益信息（BOSS 专用）*/
	public static hall_clubHandler_c_getClubIncomeInfo: string = "hall.clubHandler.c_getClubIncomeInfo"
	public static hall_clubHandler_c_fastJoinTable: string = "hall.clubHandler.c_fastJoinTable"

	/**获取成员审批 */
	public static hall_clubHandler_c_getClubApprovalMessages: string = "hall.clubHandler.c_getClubApprovalMessages";
	/**成员审批拒绝或同意 */
	public static hall_clubHandler_c_clubMembersApproval: string = "hall.clubHandler.c_clubMembersApproval";

	/**获取成员管理 */
	public static hall_clubHandler_c_getClubMembersAdministerInfo: string = "hall.clubHandler.c_getClubMembersAdministerInfo";
	/**成员管理  TODO */
	public static hall_clubHandler_c_clubMembersAdminister: string = "hall.clubHandler.c_clubMembersAdminister";
	/**牌桌管理 设置 */
	public static hall_clubHandler_c_setClubTableConfig: string = "hall.clubHandler.c_setClubTableConfig";
	/**获取牌桌管理 */
	public static hall_clubHandler_c_getClubTableConfig: string = "hall.clubHandler.c_getClubTableConfig";
	//获取俱乐部大厅邮件
	public static hall_userHandler_c_getMailList: string = "hall.userHandler.c_getMailList";
	//俱乐部删除邮件
	public static hall_userHandler_c_delMail: string = "hall.userHandler.c_delMail";
	//俱乐部删除所有邮件
	public static hall_userHandler_c_cleanMail: string = "hall.userHandler.c_cleanMail";
	/**解散俱乐部*/
	public static hall_clubHandler_c_disbandClub: string = "hall.clubHandler.c_disbandClub";
	//邀请玩家列表
	public static hall_clubHandler_c_getInvitePlayerList: string = "hall.clubHandler.c_getInvitePlayerList";
	//邀请玩家
	public static hall_clubHandler_c_inviteOtherPlayer: string = "hall.clubHandler.c_inviteOtherPlayer";
	//处理玩家邀请
	public static hall_clubHandler_c_dealPlayerInvite: string = "hall.clubHandler.c_dealPlayerInvite";

	public static s_invitePlayerJoinTable: string = "s_invitePlayerJoinTable";
	// 拒绝加入俱乐部
	public static hall_clubHandler_c_refuseInviteGame: string = "hall.clubHandler.c_refuseInviteGame";

	//大厅退出俱乐部id
	public static hall_clubHandler_c_quitClub: string = "hall.clubHandler.c_quitClub";

	//比赛新模式
	public static hall_luckyHandler_c_getLuckyGameListInfo: string = "hall.luckyHandler.c_getLuckyGameListInfo";

	public static hall_luckyHandler_c_joinLuckyGame: string = "hall.luckyHandler.c_joinLuckyGame";

	public static hall_luckyHandler_c_quitLuckyGame: string = "hall.luckyHandler.c_quitLuckyGame";
	//游戏开关 Boss专用
    public static hall_clubHandler_c_setOpenGame:string="hall.clubHandler.c_setOpenGame";
}