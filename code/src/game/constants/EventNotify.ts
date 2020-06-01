/*
   EventNotify
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:24:11 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-30 14:29:31
 * @Description: 游戏内事件通知定义
 */
class ENo {
	//浏览器窗口大小改变
	public static EVENT_RESIZE: string = "EVENT_RESIZE";
	//前台运行
	public static RUN_FORTEND: string = "RUN_FORTEND";
	//后台运行
	public static RUN_BACKEND: string = "RUN_BACKEND";

	public static EVENT_USER_LOGIN_SUC: string = "EVENT_USER_LOGIN_SUC";
	//点击加入金币场
	public static ENTER_GOLD_SCENE: string = "ENTER_GOLD_SCENE";
	/**横竖切换*/
	public static STAGE_ORITATIONCHANGE: string = "STATE_ORITATIONCHANGE";
	public static JOIN_SCENE_GAMEID: string = "JOIN_SCENE_GAMEID";

	public static GO_OTHERHALL_SCENE: string = "GO_OTHERHALL_SCENE";

	public static READY: string = "SysNotify_READY";
	//游戏开始
	public static START_GAME: string = "SysNotify_START_GAME";
	//发送表情
	public static SEND_EMOJI: string = "SysNotify_SEND_EMOJI";
	//玩家落子
	public static PLAYER_LUOZI: string = "SysNotify_PLAYER_LUOZI";
	//求和
	public static QIU_HE: string = "SysNotify_ANSWER_QIUHE";
	//游戏结束
	public static GAME_OVER: string = "EventNotify_GAME_OVER";
	//游戏结束
	public static RESTART_GAME: string = "EventNotify_RESTART_GAME";
	//手牌点击
	public static SHOUPAI_TOUCH: string = "EventNotify_SHOUPAI_TOUCH";
	//选择出来的牌
	public static HSZ_SELECT_NUM: string = "EventNotify_HSZ_SELECT_NUM";
	//杠牌选择
	public static GANG_SELECT: string = "EventNotify_GANG_SELECT";
	//断线重连回来
	public static RECONNECT_SUC: string = "EventNotify_RECONNECT_SUC";
	//功能按钮
	public static SHOW_GNBTN: string = "EventNotify_SHOW_GNBTN";
	//断线重连回来
	public static FIND_COLOR: string = "EventNotify_FIND_COLOR";
	/**贵阳捉鸡 找到鸡牌 */
	public static FIND_GYZJ_JIPAICOLOR: string = "EventNotify_FIND_GYZJ_JIPAICOLOR";
	//手牌出牌成功
	public static SHOUPAI_TOUCH_SUC: string = "EventNotify_SHOUPAI_TOUCH_SUC"

	public static UPDATE_PLAYER_COUNT: string = "EventNotify_UPDATE_PLAYER_COUNT";
	//===>贵阳捉鸡
	/**点击鸡牌界面的继续 */
	public static GYZJ_ONCLICKJIXU: string = "EventNotify_GYZJ_ONCLICKJIXU";
	//--------------------------------------niuniu_star
	//牛牛计算
	public static CACULATOR_VALUE: string = "CACULATOR_VALUE";
	//牛牛未选中的牌
	public static CACULATOR_UNTOUCH_VALUE: string = "CACULATOR_UNTOUCH_VALUE";
	// 老虎自动游戏
	public static AUTO_GAME: string = "AUTO_GAME";
	//老虎机接收消息
	public static LAOHU_RECIVE: string = "LAOHU_RECIVE";
	//老虎机旋转
	public static LAOHU_START_SPIN: string = "LAOHU_SPIN";
	//老虎机大厅icon
	public static SLOT_HALL_CLICK: string = "SLOT_HALL_CLICK";

	public static LAOHU_GROUP_COMPLETE: string = "LAOHU_GROUP_COMPLETE";
	//老虎机金币下落
	public static LAOHU_GOLD_DOWN: string = "LAOHU_GOLD_DOWN";

	public static RBWAR_CM_TOUCH: string = "RBWAR_CM_TOUCH";

	public static RBWAR_XUYA: string = "RBWAR_XUYA";

	//------------------------------------------toixiang
	public static CHANG_PLAYER_HEADER: string = "EventNotify_CHANG_PLAYER_HEADER";
	public static CHANG_PLAYER: string = "EventNotify_CHANG_PLAYER";

	//红黑
	public static ROOM_FULSH: string = "ROOM_FULSH";

	//杠牌选择
	public static CHI_SELECT: string = "EventNotify_CHI_SELECT";

	//-------------------------------扎金花
	public static ZJH_CM_TOUCH: string = "ZJH_CM_TOUCH";
	public static ZJH_HEADER_TOUCH: string = "ZJH_HEADER_TOUCH";

	//21
	public static CMGROUP_TOUCH: string = "CMGROUP_TOUCH";
	public static CM_TOUCH: string = "CM_TOUCH";

	public static BDZ_CARD_TOUCH: string = "EventNotify_BDZ_CARD_TOUCH";

	//老虎机单列旋转完成
	public static LHJ_ITEM_OVER: string = "LHJ_ITEM_OVER";
	//老虎机大厅跑马灯对应图标金币
	public static SLOT_HALL_ICON_GOLD: string = "SLOT_HALL_ICON_GOLD";

	//大闹天宫进入免费游戏
	public static DNTG_ENTER_FREE_GAME: string = "DNTG_ENTER_FREE_GAME";
	public static DNTG_ENTER_FREE_GAME_SCENE: string = "DNTG_ENTER_FREE_GAME_SCENE";
	//大闹天宫开始免费游戏
	public static DNTG_START_FREE_GAME: string = "DNTG_START_FREE_GAME";
	public static DNTG_START_FREE_GAME_SCENE: string = "DNTG_START_FREE_GAME_SCENE";
	//大闹天宫免费游戏完成
	public static DNTG_QUIT_FREE_GAME: string = "DNTG_QUIT_FREE_GAME";
	//大鬧天宮免費遊戲完成后進入普通遊戲
	public static DNTG_ENTER_COMMON_GAME: string = "DNTG_ENTER_COMMON_GAME";

	//神雕侠侣进入免费游戏
	public static SDXL_ENTER_FREE_GAME: string = "SDXL_ENTER_FREE_GAME";
	//神雕侠侣进入免费游戏场景
	public static SDXL_ENTER_FREE_GAME_SCENE: string = "SDXL_ENTER_FREE_GAME_SCENE";
	//神雕侠侣开始免费游戏
	public static SDXL_START_FREE_GAME: string = "SDXL_START_FREE_GAME";
	public static SDXL_START_FREE_GAME_SCENE: string = "SDXL_START_FREE_GAME_SCENE";
	//神雕侠侣免费游戏完成进入普通游戏
	public static SDXL_QUIT_FREE_GAME: string = "SDXL_QUIT_FREE_GAME";
	public static SDXL_ENTER_COMMON_GAME: string = "SDXL_ENTER_COMMON_GAME";

	//赤壁之战
	public static CBZZ_ENTER_FREE_GAME: string = "CBZZ_ENTER_FREE_GAME";
	public static CBZZ_ENTER_FREE_GAME_SCENE: string = "CBZZ_ENTER_FREE_GAME_SCENE";
	public static CBZZ_START_FREE_GAME: string = "CBZZ_START_FREE_GAME";
	public static CBZZ_START_FREE_GAME_SCENE: string = "CBZZ_START_FREE_GAME_SCENE";
	public static CBZZ_QUIT_FREE_GAME: string = "CBZZ_QUIT_FREE_GAME";
	public static CBZZ_ENTER_COMMOM_GAME: string = "CBZZ_ENTER_COMMOM_GAME";
	public static CBZZ_AUTO_GAME: string = "CBZZ_AUTO_GAME";
	//四大美女
	public static SDMN_ENTER_FREE_GAME: string = "SDMN_ENTER_FREE_GAME";
	public static SDMN_ENTER_FREE_GAME_SCENE: string = "SDMN_ENTER_FREE_GAME_SCENE";
	public static SDMN_START_FREE_GAME: string = "SDMN_START_FREE_GAME";
	public static SDMN_START_FREE_GAME_SCENE: string = "SDMN_START_FREE_GAME_SCENE";
	public static SDMN_QUIT_FREE_GAME: string = "SDMN_QUIT_FREE_GAME";
	public static SDMN_ENTER_COMMOM_GAME: string = "SDMN_ENTER_COMMOM_GAME";
	public static SDMN_AUTO_GAME: string = "SDMN_AUTO_GAME";
	//宝石矿工
	public static BSKG_ENTER_FREE_GAME: string = "BSKG_ENTER_FREE_GAME";
	public static BSKG_ENTER_FREE_GAME_SCENE: string = "BSKG_ENTER_FREE_GAME_SCENE";
	public static BSKG_START_FREE_GAME: string = "BSKG_START_FREE_GAME";
	public static BSKG_START_FREE_GAME_SCENE: string = "BSKG_START_FREE_GAME_SCENE";
	public static BSKG_QUIT_FREE_GAME: string = "BSKG_QUIT_FREE_GAME";
	public static BSKG_ENTER_COMMOM_GAME: string = "BSKG_ENTER_COMMOM_GAME";
	public static BSKG_AUTO_GAME: string = "BSKG_AUTO_GAME";
	//热带水果
	public static RDSG_START_FREE_GAME: string = "RDSG_START_FREE_GAME";
	public static RDSG_ENTER_FREE_GAME: string = "RDSG_ENTER_FREE_GAME";
	public static RDSG_QUIT_FREE_GAME: string = "RDSG_QUIT_FREE_GAME";
	public static RDSG_ENTER_COMMOM_GAME: string = "RDSG_ENTER_COMMOM_GAME";
	public static RDSG_AUTO_GAME: string = "RDSG_AUTO_GAME";
	public static RDSG_START_FREE_GAME_SCENE: string = "RDSG_START_FREE_GAME_SCENE";
	//格斗之王
	public static GDZW_START_FREE_GAME: string = "GDZW_START_FREE_GAME";
	public static GDZW_ENTER_FREE_GAME: string = "GDZW_ENTER_FREE_GAME";
	public static GDZW_QUIT_FREE_GAME: string = "GDZW_QUIT_FREE_GAME";
	public static GDZW_ENTER_COMMOM_GAME: string = "GDZW_ENTER_COMMOM_GAME";
	public static GDZW_AUTO_GAME: string = "GDZW_AUTO_GAME";
	public static GDZW_START_FREE_GAME_SCENE: string = "GDZW_START_FREE_GAME_SCENE";

	public static TING_FLUSH: string = "TING_FLUSH";
	//暗夜猎手
	public static AYLS_START_FREE_GAME: string = "AYLS_START_FREE_GAME";
	public static AYLS_ENTER_FREE_GAME: string = "AYLS_ENTER_FREE_GAME";
	public static AYLS_QUIT_FREE_GAME: string = "AYLS_QUIT_FREE_GAME";
	public static AYLS_ENTER_COMMOM_GAME: string = "AYLS_ENTER_COMMOM_GAME";
	public static AYLS_AUTO_GAME: string = "AYLS_AUTO_GAME";
	public static AYLS_START_FREE_GAME_SCENE: string = "AYLS_START_FREE_GAME_SCENE";
	//白蛇传说
	public static BSCS_START_FREE_GAME: string = "BSCS_START_FREE_GAME";
	public static BSCS_ENTER_FREE_GAME: string = "BSCS_ENTER_FREE_GAME";
	public static BSCS_QUIT_FREE_GAME: string = "BSCS_QUIT_FREE_GAME";
	public static BSCS_ENTER_COMMOM_GAME: string = "BSCS_ENTER_COMMOM_GAME";
	public static BSCS_AUTO_GAME: string = "BSCS_AUTO_GAME";
	public static BSCS_START_FREE_GAME_SCENE: string = "BSCS_START_FREE_GAME_SCENE";
	//嫦娥奔月
	public static CEBY_START_FREE_GAME: string = "CEBY_START_FREE_GAME";
	public static CEBY_ENTER_FREE_GAME: string = "CEBY_ENTER_FREE_GAME";
	public static CEBY_QUIT_FREE_GAME: string = "CEBY_QUIT_FREE_GAME";
	public static CEBY_ENTER_COMMOM_GAME: string = "CEBY_ENTER_COMMOM_GAME";
	public static CEBY_AUTO_GAME: string = "CEBY_AUTO_GAME";
	public static CEBY_START_FREE_GAME_SCENE: string = "CEBY_START_FREE_GAME_SCENE";

	//星尘宝石
	public static XCBS_START_FREE_GAME: string = "XCBS_START_FREE_GAME";
	public static XCBS_ENTER_FREE_GAME: string = "XCBS_ENTER_FREE_GAME";
	public static XCBS_QUIT_FREE_GAME: string = "XCBS_QUIT_FREE_GAME";
	public static XCBS_ENTER_COMMOM_GAME: string = "XCBS_ENTER_COMMOM_GAME";
	public static XCBS_AUTO_GAME: string = "XCBS_AUTO_GAME";
	public static XCBS_START_FREE_GAME_SCENE: string = "XCBS_START_FREE_GAME_SCENE";

	//bdz
	public static s_initHandCards: string = "s_initHandCards";

	//比赛场
	public static MATCH_TAB_TOUCH: string = "MATCH_TAB_TOUCH";
	public static ENTER_MATCH: string = "ENTER_MATCH";
	public static HEADER_TOUCH: string = "HEADER_TOUCH";
	public static EMOJI_SEND: string = "EMOJI_SEND";

	public static CLOSE_ALL: string = "CLOSE_ALL";


	public static RANK_FLUSH: string = "RANK_FLUSH";

	/**牛牛挂机 */

	public static NIUNIU_GUAJI: string = "NIUNIU_GUAJI";

	/**百家乐翻牌 */
	public static BJL_FANPAI: string = "BJL_FANPAI";

	//水果武士
	public static SGWS_START_FREE_GAME: string = "SGWS_START_FREE_GAME";
	public static SGWS_ENTER_FREE_GAME: string = "SGWS_ENTER_FREE_GAME";
	public static SGWS_QUIT_FREE_GAME: string = "SGWS_QUIT_FREE_GAME";
	public static SGWS_ENTER_COMMOM_GAME: string = "SGWS_ENTER_COMMOM_GAME";
	public static SGWS_AUTO_GAME: string = "SGWS_AUTO_GAME";
	public static SGWS_START_FREE_GAME_SCENE: string = "SGWS_START_FREE_GAME_SCENE";
	//club
	public static CLUB_FLASH_CLUB_LIST: string = "CLUB_FLASH_CLUB_LIST";

	public static CLUB_JOIN_CLUB: string = "CLUB_JOIN_CLUB";

	public static CLUB_INNER_ITEM_TOUCH: string = "CLUB_INNER_ITEM_TOUCH";

	public static CLUB_INNER_TABLE_TOUCH: string = "CLUB_INNER_TABLE_TOUCH";

	public static CLUB_CHANGE_ICON: string = "CLUB_CHANGE_ICON";

	public static CLUB_INNER_RECORD_ITEM_TOUCH: string = "CLUB_INNER_RECORD_ITEM_TOUCH";

	public static CLUB_INNER_RATE_CHANGE: string = "CLUB_INNER_RATE_CHANGE";
	public static CLUB_INNER_TABLE_SET_TOUCH: string = "CLUB_INNER_TABLE_SET_TOUCH";

	public static CLUB_FLASH_MAILS: string = "CLUB_FLASH_MAILS";

	public static CLUB_INVITE_PLAYER: string = "CLUB_INVITE_PLAYER";

	public static CLUB_HALL_QUIT_TOUCH: string = "CLUB_HALL_QUIT_TOUCH";

	public static CLUB_HALL_QUIT: string = "CLUB_HALL_QUIT";

	//比赛新模式

	public static JACKEY_ITEM_TOUCH: string = "JACKEY_ITEM_TOUCH";
	//鼠年有喜
	public static SNYX_START_FREE_GAME: string = "SNYX_START_FREE_GAME";
	public static SNYX_ENTER_FREE_GAME: string = "SNYX_ENTER_FREE_GAME";
	public static SNYX_QUIT_FREE_GAME: string = "SNYX_QUIT_FREE_GAME";
	public static SNYX_ENTER_COMMOM_GAME: string = "SNYX_ENTER_COMMOM_GAME";
	public static SNYX_AUTO_GAME: string = "SNYX_AUTO_GAME";
	public static SNYX_START_FREE_GAME_SCENE: string = "SNYX_START_FREE_GAME_SCENE";


	//点击游戏
	public static CLUB_CLICK_OPENGAME: string = "CLUB_CLICK_OPENGAME";

	//麻将热门按钮被点击
	public static MJ_HOTBTN_ONCLICK:string="MJ_HOTBTN_ONCLICK";
}