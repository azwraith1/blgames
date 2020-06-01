/*
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:24:47 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-30 14:31:29
 * @Description: 场景的消息通知
 */
class SceneNotify {
	public constructor() {

	}

	//打开加载
	public static OPEN_LOADING: string = "SceneNotify_OPEN_LOADING";

	//关闭加载
	public static CLOSE_LOADING: string = "SceneNotify_CLOSE_LOADING";

	//打开大厅 
	public static OPEN_MAIN_HALL: string = "SceneNotify_OPEN_MAIN_HALL";

	//关闭大厅 
	public static CLOSE_MAIN_HALL: string = "SceneNotify_CLOSE_MAIN_HALL";

	public static FLUSH_MAJIANG: string = "FLUSH_MAJIANG";

	//打开主城场景
	public static PRE_OPEN_HOME: string = "SceneNotify_PRE_OPEN_HOME";

	//关闭主城场景
	public static PRE_CLOSE_HOME: string = "SceneNotify_PRE_CLOSE_HOME";


	//打开游戏场景
	public static OPEN_GAME: string = "SceneNotify_OPEN_GAME";

	//关闭游戏场景
	public static CLOSE_GAME: string = "SceneNotify_CLOSE_GAME";

	//打开游戏场景
	public static OPEN_RANK: string = "SceneNotify_OPEN_RANK";

	//关闭游戏场景
	public static CLOSE_RANK: string = "SceneNotify_CLOSE_RANK";

	//关闭游戏场景
	public static GAME_NEXT_QUESTION: string = "GAME_NEXT_QUESTION";

	public static CLOSE_TOUCH_GROUP: string = "CLOSE_TOUCH_GROUP"

	//打开测试
	public static CLOSE_CESI: string = "CLOSE_CESI";
	public static OPEN_CESI: string = "OPEN_CESI";


	//--------------------------------------niuniu star

	//牛牛选场
	public static CLOSE_NIUNIUSELECT: string = "CLOSE_BLNN_HALL";
	public static OPEN_NIUNIUSELECT: string = "OPEN_BLNN_HALL";
	//牛牛(横板)
	public static OPEN_NIUNIUSELECT_LANDSCAPE: string = "OPEN_BLNN_HALL_LANDSCAPE";
	public static CLOSE_NIUNIUSELECT_LANDSCAPE: string = "CLOSE_BLNN_HALL_LANDSCAPE";
	//牛牛匹配
	public static CLOSE_NIUNIU_MATCHING: string = "CLOSE_NIUNIU_MATCHING";
	public static OPEN_NIUNIU_MATCHING: string = "OPEN_NIUNIU_MATCHING";

	//牛牛匹配（极速）
	public static CLOSE_NIUNIU_JSMATCHING: string = "CLOSE_NIUNIU_JSMATCHING";
	public static OPEN_NIUNIU_JSMATCHING: string = "OPEN_NIUNIU_JSMATCHING";

	//牛牛游戏场景(竖版)
	public static CLOSE_NIUNIUGAMES: string = "CLOSE_NIUNIUGAMES";
	public static OPEN_NIUNIUGAMES: string = "OPEN_NIUNIUGAMES";

	//牛牛（极速场）
	public static CLOSE_NIUNIUJSGAMES: string = "CLOSE_NIUNIUJSGAMES";
	public static OPEN_NIUNIUJSGAMES: string = "OPEN_NIUNIUJSGAMES";
	//牛牛结算
	public static CLOSE_NIUNIUJIESUAN: string = "CLOSE_NIUNIUJIESUAN";
	public static OPEN_NIUNIUJIESUAN: string = "OPEN_NIUNIUJIESUAN";


	//niuniu--over

	//--------------------------------------sangong star

	//三公首页
	public static OPEN_SANGONG_HALL: string = "OPEN_SANGONG_HALL";
	public static CLOSE_SANGONG_HALL: string = "CLOSE_SANGONG_HALL";

	//三公首页(横板)
	public static OPEN_SANGONG_HALL_HORIZON: string = "OPEN_SANGONG_HALL_HORIZON";
	public static CLOSE_SANGONG_HALL_HORIZON: string = "CLOSE_SANGONG_HALL_HORIZON";
	//牛牛等待
	public static OPEN_SANGONG_WATING: string = "OPEN_SANGONG_WATING";
	public static CLOSE_SANGONG_WATING: string = "CLOSE_SANGONG_WATING";

	//三公等待（横板）
	public static OPEN_SANGONG_WATING_HORIZON: string = "OPEN_SANGONG_WATING_HORIZON";
	public static CLOSE_SANGONG_WATING_HORIZON: string = "CLOSE_SANGONG_WATING_HORIZON";

	//三公游戏场景
	public static OPEN_SANGONG_GAME: string = "OPEN_SANGONG_GAME";
	public static CLOSE_SANGONG_GAME: string = "CLOSE_SANGONG_GAME";
	//三公游戏场景（横板）
	public static OPEN_SANGONG_GAME_HORIZON: string = "OPEN_SANGONG_GAME_HORIZON";
	public static CLOSE_SANGONG_GAME_HORIZON: string = "CLOSE_SANGONG_GAME_HORIZON";

	//sangong--over
	//老虎机场景
	public static OPEN_LAOHU_GAME: string = "OPEN_LAOHU_GAME";
	public static CLOSE_LAOHU_GAME: string = "CLOSE_LAOHU_GAME";
	public static OPEN_LAOHU_LOADING: string = "OPENLAOHU_LAODING";
	public static CLOSE_LAOHU_LOADING: string = "CLOSE_LAOHU_LOADING";
	public static OPEN_LAOHUJI_HALL: string = "OPEN_SLOT_HALL";
	public static CLOSE_LAOHUJI_HALL: string = "CLOSE_SLOT_HALL";

	//tiger over 

	//rbwar-----------------------------------------------------
	//红黑大厅

	public static OPEN_RBWAR_HALL: string = "OPEN_RBWAR_HALL";
	public static CLOSE_RBWAR_HALL: string = "CLOSE_RBWAR_HALL";
	//红黑游戏

	public static OPEN_RBWAR_GAME: string = "OPEN_RBWAR_GAME";
	public static CLOSE_RBWAR_GAME: string = "CLOSE_RBWAR_GAME";

	//--------------大众麻将
	public static OPEN_DZMJ: string = "OPEN_DZMJ";
	public static CLOSE_DZMJ: string = "CLOSE_DZMJ";
	public static OPEN_DZMJ_HALL: string = "OPEN_DZMJ_HALL";
	public static CLOSE_DZMJ_HALL: string = "CLOSE_DZMJ_HALL";
	public static OPEN_DZMJ_OVER: string = "OPEN_DZMJ_OVER";
	public static CLOSE_DZMJ_OVER: string = "CLOSE_DZMJ_OVER";
	public static FLUSH_DZMJ: string = "FLUSH_DZMJ";

	//----------------贵阳捉鸡
	public static OPEN_GYZJMJ: string = "OPEN_GYZJMJ";
	public static CLOSE_GYZJMJ: string = "CLOSE_GYZJMJ";
	public static OPEN_GYZJMJ_HALL: string = "OPEN_GYZJMJ_HALL";
	public static CLOSE_GYZJMJ_HALL: string = "CLOSE_GYZJMJ_HALL";
	public static OPEN_GYZJMJ_OVER: string = "OPEN_GYZJMJ_OVER";
	public static CLOSE_GYZJMJ_OVER: string = "CLOSE_GYZJMJ_OVER";
	public static FLUSH_GYZJMJ: string = "FLUSH_GYZJMJ";

	/**杭州麻将*/
	/**打开杭州麻将游戏场景 */
	public static OPEN_HZMJ: string = "OPEN_HZMJ";
	/**关闭杭州麻将游戏场景 */
	public static CLOSE_HZMJ: string = "CLOSE_HZMJ";
	/**打开杭州麻将游戏大厅 */
	public static OPEN_HZMJ_HALL: string = "OPEN_HZMJ_HALL";
	/**关闭杭州麻将游戏大厅 */
	public static CLOSE_HZMJ_HALL: string = "CLOSE_HZMJ_HALL";
	/**打开杭州麻将结束场景 */
	public static OPEN_HZMJ_OVER: string = "OPEN_HZMJ_OVER";
	/**关闭杭州麻将结束场景 */
	public static CLOSE_HZMJ_OVER: string = "CLOSE_HZMJ_OVER";
	/**杭州麻将flush */
	public static FLUSH_HZMJ: string = "FLUSH_HZMJ";
	//------------------------------------------扎金花

	//扎金花选场界面
	public static OPEN_ZJHSELECT: string = "OPEN_ZJH_HALL";
	public static CLOSE_ZJHSELECT: string = "CLOSE_ZJH_HALL";

	//游戏界面
	public static OPEN_ZJHGAME: string = "OPEN_ZJHGAME";
	public static CLOSE_ZJHGAME: string = "CLOSE_ZJHGAME";

	//游戏匹配界面
	public static OPEN_ZJH_MATCHING: string = "OPEN_ZJH_MATCHING";
	public static CLOSE_ZJH_MATCHING: string = "CLOSE_ZJH_MATCHING";

	public static OPEN_DNTG: string = "OPEN_DNTG";
	public static CLOSE_DNTG: string = "CLOSE_DNTG";
	// 神雕侠侣界面
	public static OPEN_SDXL: string = "OPEN_SDXL";
	public static CLOSE_SDXL: string = "CLOSE_SDXL";
	//赤壁之战界面
	public static OPEN_CBZZ: string = "OPEN_CBZZ";
	public static CLOSE_CBZZ: string = "CLOSE_CBZZ";
	//四大美女
	public static OPEN_SDMN: string = "OPEN_SDMN";
	public static CLOSE_SDMN: string = "CLOSE_SDMN";
	//宝石矿工
	public static OPEN_BSKG: string = "OPEN_BSKG";
	public static CLOSE_BSKG: string = "CLOSE_BSKG";
	//热带水果
	public static OPEN_RDSG: string = "OPEN_RDSG";
	public static CLOSE_RDSG: string = "CLOSE_RDSG";
	//暗夜猎手
	public static OPEN_AYLS: string = "OPEN_AYLS";
	public static CLOSE_AYLS: string = "CLOSE_AYLS";
	//格斗之王
	public static OPEN_GDZW: string = "OPEN_GDZW";
	public static CLOSE_GDZW: string = "CLOSE_GDZW";
	//白蛇传说
	public static OPEN_BSCS: string = "OPEN_BSCS";
	public static CLOSE_BSCS: string = "CLOSE_BSCS";
	//嫦娥奔月
	public static OPEN_CEBY: string = "OPEN_CEBY";
	public static CLOSE_CEBY: string = "CLOSE_CEBY";

	//招财锦鲤
	public static OPEN_ZCJL: string = "OPEN_ZCJL";
	public static CLOSE_ZCJL: string = "CLOSE_ZCJL";

	//万兽之王
	public static OPEN_WSZW: string = "OPEN_WSZW";
	public static CLOSE_WSZW: string = "CLOSE_WSZW";

	//LUCKY7
	public static OPEN_LUCKY7: string = "OPEN_LUCKY7";
	public static CLOSE_LUCKY7: string = "CLOSE_LUCKY7";

	//财神到
	public static OPEN_CSD: string = "OPEN_CSD";
	public static CLOSE_CSD: string = "CLOSE_CSD";
	//财神到
	public static OPEN_XYSG: string = "OPEN_XYSG";
	public static CLOSE_XYSG: string = "CLOSE_XYSG";
	//星尘宝石
	public static OPEN_XCBS: string = "OPEN_XCBS";
	public static CLOSE_XCBS: string = "CLOSE_XCBS";

	//打开麻将匹配界面
	public static OPEN_DZMJ_MATCHING: string = "OPEN_DZMJ_MATCHING";
	/**杭州麻将匹配 */
	public static OPEN_HZMJ_MATCHING: string = "OPEN_HZMJ_MATCHING";
	/**关闭杭州麻将匹配界面 */
	public static CLOSE_HZMJ_MATCHING: string = "CLOSE_HZMJ_MATCHING";
	//关闭麻将匹配界面
	public static CLOSE_DZMJ_MATCHING: string = "CLOSE_DZMJ_MATCHING";
	/**贵阳捉鸡匹配 */
	public static OPEN_GYZJ_MATCHING: string = "OPEN_GYZJ_MATCHING";
	/**关闭贵阳捉鸡匹配界面 */
	public static CLOSE_GYZJ_MATCHING: string = "CLOSE_GYZJ_MATCHING";


	//关闭麻将匹配界面
	public static CLOSE_MJ_JIESSUAN: string = "CLOSE_MJ_JIESSUAN";

	//百家乐
	public static OPEN_BJLGAME: string = "OPEN_BJLGAME";
	public static CLOSE_BJLGAME: string = "CLOSE_BJLGAME";

	public static OPEN_BJLHALL: string = "OPEN_BACCARAT_HALL";
	public static CLOSE_BJLHALL: string = "CLOSE_BACCARAT_HALL";

	//21点
	public static OPEN_BLACKJ_GAME: string = "OPEN_BLACKJ_GAME";
	public static CLOSE_BLACKJ_GAME: string = "CLOSE_BLACKJ_GAME";

	public static OPEN_BLACKJ_HALL: string = "OPEN_BLACKJACK_HALL";
	public static CLOSE_BLACKJ_HALL: string = "CLOSE_BLACKJACK_HALL";

	public static OPEN_BLACKJ_MATCHING: string = "OPEN_BLACKJ_MATCHING";
	public static CLOSE_BLACKJ_MATCHING: string = "CLOSE_BLACKJ_MATCHING";
	//BAICAO
	public static OPEN_BAICAO_GAME: string = "OPEN_BAICAO_GAME";
	public static CLOSE_BAICAO_GAME: string = "CLOSE_BAICAO_GAME";
	public static OPEN_BAICAO_MATCHING: string = "OPEN_BAICAO_MATCHING";
	public static CLOSE_BAICAO_MATCHING: string = "CLOSE_BAICAO_MATCHING";
	public static OPEN_BAICAO_HALL: string = "OPEN_BAICAO_HALL";
	public static CLOSE_BAICAO_HALL: string = "CLOSE_BAICAO_HALL";

	//BAICAO2
	public static OPEN_SUPERBAICAO_GAME: string = "OPEN_SUPERBAICAO_GAME";
	public static CLOSE_SUPERBAICAO_GAME: string = "CLOSE_SUPERBAICAO_GAME";
	public static OPEN_SUPERBAICAO_MATCHING: string = "OPEN_SUPERBAICAO_MATCHING";
	public static CLOSE_SUPERBAICAO_MATCHING: string = "CLOSE_SUPERBAICAO_MATCHING";
	public static OPEN_SUPERBAICAO_HALL: string = "OPEN_SUPERBAICAO_HALL";
	public static CLOSE_SUPERBAICAO_HALL: string = "CLOSE_SUPERBAICAO_HALL";
	//广东麻将
	public static OPEN_GDMJ: string = "OPEN_GDMJ";
	public static CLOSE_GDMJ: string = "CLOSE_GDMJ";
	public static OPEN_GDMJ_HALL: string = "OPEN_GDMJ_HALL";
	public static CLOSE_GDMJ_HALL: string = "CLOSE_GDMJ_HALL";
	public static OPEN_GDMJ_OVER: string = "OPEN_GDMJ_OVER";
	public static CLOSE_GDMJ_OVER: string = "CLOSE_GDMJ_OVER";

	public static FLUSH_GDMJ: string = "FLUSH_GDMJ";
	//打开麻将匹配界面
	public static OPEN_GDMJ_MATCHING: string = "OPEN_GDMJ_MATCHING";

	//关闭麻将匹配界面
	public static CLOSE_GDMJ_MATCHING: string = "CLOSE_GDMJ_MATCHING";

	//湖南麻将
	public static OPEN_HNMJ_MATCHING: string = "OPEN_HNMJ_MATCHING";
	public static CLOSE_HNMJ_MATCHING: string = "CLOSE_HNMJ_MATCHING";
	public static OPEN_HNMJ: string = "OPEN_HNMJ";
	public static CLOSE_HNMJ: string = "CLOSE_HNMJ";
	public static OPEN_HNMJ_HALL: string = "OPEN_HNMJ_HALL";
	public static CLOSE_HNMJ_HALL: string = "CLOSE_HNMJ_HALL";
	public static OPEN_HNMJ_OVER: string = "OPEN_HNMJ_OVER";
	public static CLOSE_HNMJ_OVER: string = "CLOSE_HNMJ_OVER";

	//血战到底
	public static OPEN_MJXZDD_HALL: string = "OPEN_MJXZDD_HALL";
	public static CLOSE_MJXZDD_HALL: string = "CLOSE_MJXZDD_HALL";
	public static OPEN_MJXZDD_MATCHING: string = "OPEN_MJXZDD_MATCHING";
	public static CLOSE_MJXZDD_MATCHING: string = "CLOSE_MJXZDD_MATCHING";
	public static OPEN_MJXZDD: string = "OPEN_MJXZDD";
	public static CLOSE_MJXZDD: string = "CLOSE_MJXZDD";
	public static OPEN_MJXZDD_OVER: string = "OPEN_MJXZDD_OVER";
	public static CLOSE_MJXZDD_OVER: string = "CLOSE_MJXZDD_OVER";


	//血流成河
	public static OPEN_MJXLCH_HALL: string = "OPEN_MJXLCH_HALL";
	public static CLOSE_MJXLCH_HALL: string = "CLOSE_MJXLCH_HALL";
	public static OPEN_MJXLCH_MATCHING: string = "OPEN_MJXLCH_MATCHING";
	public static CLOSE_MJXLCH_MATCHING: string = "CLOSE_MJXLCH_MATCHING";
	public static OPEN_MJXLCH: string = "OPEN_MJXLCH";
	public static CLOSE_MJXLCH: string = "CLOSE_MJXLCH";
	public static OPEN_MJXLCH_OVER: string = "OPEN_MJXLCH_OVER";
	public static CLOSE_MJXLCH_OVER: string = "CLOSE_MJXLCH_OVER";

	//四川麻将
	public static OPEN_SCMJ_HALL: string = "OPEN_SCMJ_HALL";
	public static CLOSE_SCMJ_HALL: string = "CLOSE_SCMJ_HALL";
	public static OPEN_SCMJ_MATCHING: string = "OPEN_SCMJ_MATCHING";
	public static CLOSE_SCMJ_MATCHING: string = "CLOSE_SCMJ_MATCHING";
	public static OPEN_SCMJ: string = "OPEN_SCMJ";
	public static CLOSE_SCMJ: string = "CLOSE_SCMJ";
	public static OPEN_SCMJ_OVER: string = "OPEN_SCMJ_OVER";
	public static CLOSE_SCMJ_OVER: string = "CLOSE_SCMJ_OVER";


	//湖北麻将-卡五星
	public static OPEN_HBMJ_MATCHING: string = "OPEN_HBMJ_MATCHING";
	public static CLOSE_HBMJ_MATCHING: string = "CLOSE_HBMJ_MATCHING";
	public static OPEN_HBMJ: string = "OPEN_HBMJ";
	public static CLOSE_HBMJ: string = "CLOSE_HBMJ";
	public static OPEN_HBMJ_HALL: string = "OPEN_HBMJ_HALL";
	public static CLOSE_HBMJ_HALL: string = "CLOSE_HBMJ_HALL";
	public static OPEN_HBMJ_OVER: string = "OPEN_HBMJ_OVER";
	public static CLOSE_HBMJ_OVER: string = "CLOSE_HBMJ_OVER";

	//二人麻将
	public static OPEN_ERMJ_MATCHING: string = "OPEN_ERMJ_MATCHING";
	public static CLOSE_ERMJ_MATCHING: string = "CLOSE_ERMJ_MATCHING";
	public static OPEN_ERMJ: string = "OPEN_ERMJ";
	public static CLOSE_ERMJ: string = "CLOSE_ERMJ";
	public static OPEN_ERMJ_HALL: string = "OPEN_ERMJ_HALL";
	public static CLOSE_ERMJ_HALL: string = "CLOSE_ERMJ_HALL";
	public static OPEN_ERMJ_OVER: string = "OPEN_ERMJ_OVER";
	public static CLOSE_ERMJ_OVER: string = "CLOSE_ERMJ_OVER";


	public static OPEN_BDZ: string = "OPEN_BDZ";
	public static CLOSE_BDZ: string = "CLOSE_BDZ_GAME";
	public static OPEN_BDZ_HALL: string = "OPEN_BDZ_HALL";
	public static CLOSE_BDZ_HALL: string = "CLOSE_BDZ_HALL";
	public static OPEN_BDZ_MATCHING: string = "OPEN_BDZ_MATCHING";
	public static CLOSE_BDZ_MATCHING: string = "CLOSE_BDZ_MATCHING";

	//比赛场
	// public static OPEN_BDZ: string = "OPEN_BDZ";
	// public static CLOSE_BDZ: string = "CLOSE_BDZ_GAME";
	public static OPEN_MATCH_HALL: string = "OPEN_RACE_HALL";
	public static CLOSE_MATCH_HALL: string = "CLOSE_RACE_HALL";
	// public static OPEN_BDZ_MATCHING: string = "OPEN_BDZ_MATCHING";
	// public static CLOSE_BDZ_MATCHING: string = "CLOSE_BDZ_MATCHING";

	//血战到底比赛
	public static OPEN_MATCH_MJXZDD: string = "OPEN_MATCH_MJXZDD";
	public static CLOSE_MATCH_MJXZDD: string = "CLOSE_MATCH_MJXZDD";
	public static OPEN_MATCH_OVER_MJXZDD: string = "OPEN_MATCH_OVER_MJXZDD";
	public static CLOSE_MATCH_OVER_MJXZDD: string = "CLOSE_MATCH_OVER_MJXZDD";

	//水果武士
	public static OPEN_SGWS: string = "OPEN_SGWS";
	public static CLOSE_SGWS: string = "CLOSE_SGWS";

	public static OPEN_CLUB_HALL: string = "OPEN_CLUB_HALL";
	public static CLOSE_CLUB_HALL: string = "CLOSE_CLUB_HALL";

	//水果武士
	public static OPEN_SNYX: string = "OPEN_SNYX";
	public static CLOSE_SNYX: string = "CLOSE_SNYX";
}



