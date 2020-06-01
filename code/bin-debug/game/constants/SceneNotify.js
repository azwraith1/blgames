var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:24:47
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-30 14:31:29
 * @Description: 场景的消息通知
 */
var SceneNotify = (function () {
    function SceneNotify() {
    }
    //打开加载
    SceneNotify.OPEN_LOADING = "SceneNotify_OPEN_LOADING";
    //关闭加载
    SceneNotify.CLOSE_LOADING = "SceneNotify_CLOSE_LOADING";
    //打开大厅 
    SceneNotify.OPEN_MAIN_HALL = "SceneNotify_OPEN_MAIN_HALL";
    //关闭大厅 
    SceneNotify.CLOSE_MAIN_HALL = "SceneNotify_CLOSE_MAIN_HALL";
    SceneNotify.FLUSH_MAJIANG = "FLUSH_MAJIANG";
    //打开主城场景
    SceneNotify.PRE_OPEN_HOME = "SceneNotify_PRE_OPEN_HOME";
    //关闭主城场景
    SceneNotify.PRE_CLOSE_HOME = "SceneNotify_PRE_CLOSE_HOME";
    //打开游戏场景
    SceneNotify.OPEN_GAME = "SceneNotify_OPEN_GAME";
    //关闭游戏场景
    SceneNotify.CLOSE_GAME = "SceneNotify_CLOSE_GAME";
    //打开游戏场景
    SceneNotify.OPEN_RANK = "SceneNotify_OPEN_RANK";
    //关闭游戏场景
    SceneNotify.CLOSE_RANK = "SceneNotify_CLOSE_RANK";
    //关闭游戏场景
    SceneNotify.GAME_NEXT_QUESTION = "GAME_NEXT_QUESTION";
    SceneNotify.CLOSE_TOUCH_GROUP = "CLOSE_TOUCH_GROUP";
    //打开测试
    SceneNotify.CLOSE_CESI = "CLOSE_CESI";
    SceneNotify.OPEN_CESI = "OPEN_CESI";
    //--------------------------------------niuniu star
    //牛牛选场
    SceneNotify.CLOSE_NIUNIUSELECT = "CLOSE_BLNN_HALL";
    SceneNotify.OPEN_NIUNIUSELECT = "OPEN_BLNN_HALL";
    //牛牛(横板)
    SceneNotify.OPEN_NIUNIUSELECT_LANDSCAPE = "OPEN_BLNN_HALL_LANDSCAPE";
    SceneNotify.CLOSE_NIUNIUSELECT_LANDSCAPE = "CLOSE_BLNN_HALL_LANDSCAPE";
    //牛牛匹配
    SceneNotify.CLOSE_NIUNIU_MATCHING = "CLOSE_NIUNIU_MATCHING";
    SceneNotify.OPEN_NIUNIU_MATCHING = "OPEN_NIUNIU_MATCHING";
    //牛牛匹配（极速）
    SceneNotify.CLOSE_NIUNIU_JSMATCHING = "CLOSE_NIUNIU_JSMATCHING";
    SceneNotify.OPEN_NIUNIU_JSMATCHING = "OPEN_NIUNIU_JSMATCHING";
    //牛牛游戏场景(竖版)
    SceneNotify.CLOSE_NIUNIUGAMES = "CLOSE_NIUNIUGAMES";
    SceneNotify.OPEN_NIUNIUGAMES = "OPEN_NIUNIUGAMES";
    //牛牛（极速场）
    SceneNotify.CLOSE_NIUNIUJSGAMES = "CLOSE_NIUNIUJSGAMES";
    SceneNotify.OPEN_NIUNIUJSGAMES = "OPEN_NIUNIUJSGAMES";
    //牛牛结算
    SceneNotify.CLOSE_NIUNIUJIESUAN = "CLOSE_NIUNIUJIESUAN";
    SceneNotify.OPEN_NIUNIUJIESUAN = "OPEN_NIUNIUJIESUAN";
    //niuniu--over
    //--------------------------------------sangong star
    //三公首页
    SceneNotify.OPEN_SANGONG_HALL = "OPEN_SANGONG_HALL";
    SceneNotify.CLOSE_SANGONG_HALL = "CLOSE_SANGONG_HALL";
    //三公首页(横板)
    SceneNotify.OPEN_SANGONG_HALL_HORIZON = "OPEN_SANGONG_HALL_HORIZON";
    SceneNotify.CLOSE_SANGONG_HALL_HORIZON = "CLOSE_SANGONG_HALL_HORIZON";
    //牛牛等待
    SceneNotify.OPEN_SANGONG_WATING = "OPEN_SANGONG_WATING";
    SceneNotify.CLOSE_SANGONG_WATING = "CLOSE_SANGONG_WATING";
    //三公等待（横板）
    SceneNotify.OPEN_SANGONG_WATING_HORIZON = "OPEN_SANGONG_WATING_HORIZON";
    SceneNotify.CLOSE_SANGONG_WATING_HORIZON = "CLOSE_SANGONG_WATING_HORIZON";
    //三公游戏场景
    SceneNotify.OPEN_SANGONG_GAME = "OPEN_SANGONG_GAME";
    SceneNotify.CLOSE_SANGONG_GAME = "CLOSE_SANGONG_GAME";
    //三公游戏场景（横板）
    SceneNotify.OPEN_SANGONG_GAME_HORIZON = "OPEN_SANGONG_GAME_HORIZON";
    SceneNotify.CLOSE_SANGONG_GAME_HORIZON = "CLOSE_SANGONG_GAME_HORIZON";
    //sangong--over
    //老虎机场景
    SceneNotify.OPEN_LAOHU_GAME = "OPEN_LAOHU_GAME";
    SceneNotify.CLOSE_LAOHU_GAME = "CLOSE_LAOHU_GAME";
    SceneNotify.OPEN_LAOHU_LOADING = "OPENLAOHU_LAODING";
    SceneNotify.CLOSE_LAOHU_LOADING = "CLOSE_LAOHU_LOADING";
    SceneNotify.OPEN_LAOHUJI_HALL = "OPEN_SLOT_HALL";
    SceneNotify.CLOSE_LAOHUJI_HALL = "CLOSE_SLOT_HALL";
    //tiger over 
    //rbwar-----------------------------------------------------
    //红黑大厅
    SceneNotify.OPEN_RBWAR_HALL = "OPEN_RBWAR_HALL";
    SceneNotify.CLOSE_RBWAR_HALL = "CLOSE_RBWAR_HALL";
    //红黑游戏
    SceneNotify.OPEN_RBWAR_GAME = "OPEN_RBWAR_GAME";
    SceneNotify.CLOSE_RBWAR_GAME = "CLOSE_RBWAR_GAME";
    //--------------大众麻将
    SceneNotify.OPEN_DZMJ = "OPEN_DZMJ";
    SceneNotify.CLOSE_DZMJ = "CLOSE_DZMJ";
    SceneNotify.OPEN_DZMJ_HALL = "OPEN_DZMJ_HALL";
    SceneNotify.CLOSE_DZMJ_HALL = "CLOSE_DZMJ_HALL";
    SceneNotify.OPEN_DZMJ_OVER = "OPEN_DZMJ_OVER";
    SceneNotify.CLOSE_DZMJ_OVER = "CLOSE_DZMJ_OVER";
    SceneNotify.FLUSH_DZMJ = "FLUSH_DZMJ";
    //----------------贵阳捉鸡
    SceneNotify.OPEN_GYZJMJ = "OPEN_GYZJMJ";
    SceneNotify.CLOSE_GYZJMJ = "CLOSE_GYZJMJ";
    SceneNotify.OPEN_GYZJMJ_HALL = "OPEN_GYZJMJ_HALL";
    SceneNotify.CLOSE_GYZJMJ_HALL = "CLOSE_GYZJMJ_HALL";
    SceneNotify.OPEN_GYZJMJ_OVER = "OPEN_GYZJMJ_OVER";
    SceneNotify.CLOSE_GYZJMJ_OVER = "CLOSE_GYZJMJ_OVER";
    SceneNotify.FLUSH_GYZJMJ = "FLUSH_GYZJMJ";
    /**杭州麻将*/
    /**打开杭州麻将游戏场景 */
    SceneNotify.OPEN_HZMJ = "OPEN_HZMJ";
    /**关闭杭州麻将游戏场景 */
    SceneNotify.CLOSE_HZMJ = "CLOSE_HZMJ";
    /**打开杭州麻将游戏大厅 */
    SceneNotify.OPEN_HZMJ_HALL = "OPEN_HZMJ_HALL";
    /**关闭杭州麻将游戏大厅 */
    SceneNotify.CLOSE_HZMJ_HALL = "CLOSE_HZMJ_HALL";
    /**打开杭州麻将结束场景 */
    SceneNotify.OPEN_HZMJ_OVER = "OPEN_HZMJ_OVER";
    /**关闭杭州麻将结束场景 */
    SceneNotify.CLOSE_HZMJ_OVER = "CLOSE_HZMJ_OVER";
    /**杭州麻将flush */
    SceneNotify.FLUSH_HZMJ = "FLUSH_HZMJ";
    //------------------------------------------扎金花
    //扎金花选场界面
    SceneNotify.OPEN_ZJHSELECT = "OPEN_ZJH_HALL";
    SceneNotify.CLOSE_ZJHSELECT = "CLOSE_ZJH_HALL";
    //游戏界面
    SceneNotify.OPEN_ZJHGAME = "OPEN_ZJHGAME";
    SceneNotify.CLOSE_ZJHGAME = "CLOSE_ZJHGAME";
    //游戏匹配界面
    SceneNotify.OPEN_ZJH_MATCHING = "OPEN_ZJH_MATCHING";
    SceneNotify.CLOSE_ZJH_MATCHING = "CLOSE_ZJH_MATCHING";
    SceneNotify.OPEN_DNTG = "OPEN_DNTG";
    SceneNotify.CLOSE_DNTG = "CLOSE_DNTG";
    // 神雕侠侣界面
    SceneNotify.OPEN_SDXL = "OPEN_SDXL";
    SceneNotify.CLOSE_SDXL = "CLOSE_SDXL";
    //赤壁之战界面
    SceneNotify.OPEN_CBZZ = "OPEN_CBZZ";
    SceneNotify.CLOSE_CBZZ = "CLOSE_CBZZ";
    //四大美女
    SceneNotify.OPEN_SDMN = "OPEN_SDMN";
    SceneNotify.CLOSE_SDMN = "CLOSE_SDMN";
    //宝石矿工
    SceneNotify.OPEN_BSKG = "OPEN_BSKG";
    SceneNotify.CLOSE_BSKG = "CLOSE_BSKG";
    //热带水果
    SceneNotify.OPEN_RDSG = "OPEN_RDSG";
    SceneNotify.CLOSE_RDSG = "CLOSE_RDSG";
    //暗夜猎手
    SceneNotify.OPEN_AYLS = "OPEN_AYLS";
    SceneNotify.CLOSE_AYLS = "CLOSE_AYLS";
    //格斗之王
    SceneNotify.OPEN_GDZW = "OPEN_GDZW";
    SceneNotify.CLOSE_GDZW = "CLOSE_GDZW";
    //白蛇传说
    SceneNotify.OPEN_BSCS = "OPEN_BSCS";
    SceneNotify.CLOSE_BSCS = "CLOSE_BSCS";
    //嫦娥奔月
    SceneNotify.OPEN_CEBY = "OPEN_CEBY";
    SceneNotify.CLOSE_CEBY = "CLOSE_CEBY";
    //招财锦鲤
    SceneNotify.OPEN_ZCJL = "OPEN_ZCJL";
    SceneNotify.CLOSE_ZCJL = "CLOSE_ZCJL";
    //万兽之王
    SceneNotify.OPEN_WSZW = "OPEN_WSZW";
    SceneNotify.CLOSE_WSZW = "CLOSE_WSZW";
    //LUCKY7
    SceneNotify.OPEN_LUCKY7 = "OPEN_LUCKY7";
    SceneNotify.CLOSE_LUCKY7 = "CLOSE_LUCKY7";
    //财神到
    SceneNotify.OPEN_CSD = "OPEN_CSD";
    SceneNotify.CLOSE_CSD = "CLOSE_CSD";
    //财神到
    SceneNotify.OPEN_XYSG = "OPEN_XYSG";
    SceneNotify.CLOSE_XYSG = "CLOSE_XYSG";
    //星尘宝石
    SceneNotify.OPEN_XCBS = "OPEN_XCBS";
    SceneNotify.CLOSE_XCBS = "CLOSE_XCBS";
    //打开麻将匹配界面
    SceneNotify.OPEN_DZMJ_MATCHING = "OPEN_DZMJ_MATCHING";
    /**杭州麻将匹配 */
    SceneNotify.OPEN_HZMJ_MATCHING = "OPEN_HZMJ_MATCHING";
    /**关闭杭州麻将匹配界面 */
    SceneNotify.CLOSE_HZMJ_MATCHING = "CLOSE_HZMJ_MATCHING";
    //关闭麻将匹配界面
    SceneNotify.CLOSE_DZMJ_MATCHING = "CLOSE_DZMJ_MATCHING";
    /**贵阳捉鸡匹配 */
    SceneNotify.OPEN_GYZJ_MATCHING = "OPEN_GYZJ_MATCHING";
    /**关闭贵阳捉鸡匹配界面 */
    SceneNotify.CLOSE_GYZJ_MATCHING = "CLOSE_GYZJ_MATCHING";
    //关闭麻将匹配界面
    SceneNotify.CLOSE_MJ_JIESSUAN = "CLOSE_MJ_JIESSUAN";
    //百家乐
    SceneNotify.OPEN_BJLGAME = "OPEN_BJLGAME";
    SceneNotify.CLOSE_BJLGAME = "CLOSE_BJLGAME";
    SceneNotify.OPEN_BJLHALL = "OPEN_BACCARAT_HALL";
    SceneNotify.CLOSE_BJLHALL = "CLOSE_BACCARAT_HALL";
    //21点
    SceneNotify.OPEN_BLACKJ_GAME = "OPEN_BLACKJ_GAME";
    SceneNotify.CLOSE_BLACKJ_GAME = "CLOSE_BLACKJ_GAME";
    SceneNotify.OPEN_BLACKJ_HALL = "OPEN_BLACKJACK_HALL";
    SceneNotify.CLOSE_BLACKJ_HALL = "CLOSE_BLACKJACK_HALL";
    SceneNotify.OPEN_BLACKJ_MATCHING = "OPEN_BLACKJ_MATCHING";
    SceneNotify.CLOSE_BLACKJ_MATCHING = "CLOSE_BLACKJ_MATCHING";
    //BAICAO
    SceneNotify.OPEN_BAICAO_GAME = "OPEN_BAICAO_GAME";
    SceneNotify.CLOSE_BAICAO_GAME = "CLOSE_BAICAO_GAME";
    SceneNotify.OPEN_BAICAO_MATCHING = "OPEN_BAICAO_MATCHING";
    SceneNotify.CLOSE_BAICAO_MATCHING = "CLOSE_BAICAO_MATCHING";
    SceneNotify.OPEN_BAICAO_HALL = "OPEN_BAICAO_HALL";
    SceneNotify.CLOSE_BAICAO_HALL = "CLOSE_BAICAO_HALL";
    //BAICAO2
    SceneNotify.OPEN_SUPERBAICAO_GAME = "OPEN_SUPERBAICAO_GAME";
    SceneNotify.CLOSE_SUPERBAICAO_GAME = "CLOSE_SUPERBAICAO_GAME";
    SceneNotify.OPEN_SUPERBAICAO_MATCHING = "OPEN_SUPERBAICAO_MATCHING";
    SceneNotify.CLOSE_SUPERBAICAO_MATCHING = "CLOSE_SUPERBAICAO_MATCHING";
    SceneNotify.OPEN_SUPERBAICAO_HALL = "OPEN_SUPERBAICAO_HALL";
    SceneNotify.CLOSE_SUPERBAICAO_HALL = "CLOSE_SUPERBAICAO_HALL";
    //广东麻将
    SceneNotify.OPEN_GDMJ = "OPEN_GDMJ";
    SceneNotify.CLOSE_GDMJ = "CLOSE_GDMJ";
    SceneNotify.OPEN_GDMJ_HALL = "OPEN_GDMJ_HALL";
    SceneNotify.CLOSE_GDMJ_HALL = "CLOSE_GDMJ_HALL";
    SceneNotify.OPEN_GDMJ_OVER = "OPEN_GDMJ_OVER";
    SceneNotify.CLOSE_GDMJ_OVER = "CLOSE_GDMJ_OVER";
    SceneNotify.FLUSH_GDMJ = "FLUSH_GDMJ";
    //打开麻将匹配界面
    SceneNotify.OPEN_GDMJ_MATCHING = "OPEN_GDMJ_MATCHING";
    //关闭麻将匹配界面
    SceneNotify.CLOSE_GDMJ_MATCHING = "CLOSE_GDMJ_MATCHING";
    //湖南麻将
    SceneNotify.OPEN_HNMJ_MATCHING = "OPEN_HNMJ_MATCHING";
    SceneNotify.CLOSE_HNMJ_MATCHING = "CLOSE_HNMJ_MATCHING";
    SceneNotify.OPEN_HNMJ = "OPEN_HNMJ";
    SceneNotify.CLOSE_HNMJ = "CLOSE_HNMJ";
    SceneNotify.OPEN_HNMJ_HALL = "OPEN_HNMJ_HALL";
    SceneNotify.CLOSE_HNMJ_HALL = "CLOSE_HNMJ_HALL";
    SceneNotify.OPEN_HNMJ_OVER = "OPEN_HNMJ_OVER";
    SceneNotify.CLOSE_HNMJ_OVER = "CLOSE_HNMJ_OVER";
    //血战到底
    SceneNotify.OPEN_MJXZDD_HALL = "OPEN_MJXZDD_HALL";
    SceneNotify.CLOSE_MJXZDD_HALL = "CLOSE_MJXZDD_HALL";
    SceneNotify.OPEN_MJXZDD_MATCHING = "OPEN_MJXZDD_MATCHING";
    SceneNotify.CLOSE_MJXZDD_MATCHING = "CLOSE_MJXZDD_MATCHING";
    SceneNotify.OPEN_MJXZDD = "OPEN_MJXZDD";
    SceneNotify.CLOSE_MJXZDD = "CLOSE_MJXZDD";
    SceneNotify.OPEN_MJXZDD_OVER = "OPEN_MJXZDD_OVER";
    SceneNotify.CLOSE_MJXZDD_OVER = "CLOSE_MJXZDD_OVER";
    //血流成河
    SceneNotify.OPEN_MJXLCH_HALL = "OPEN_MJXLCH_HALL";
    SceneNotify.CLOSE_MJXLCH_HALL = "CLOSE_MJXLCH_HALL";
    SceneNotify.OPEN_MJXLCH_MATCHING = "OPEN_MJXLCH_MATCHING";
    SceneNotify.CLOSE_MJXLCH_MATCHING = "CLOSE_MJXLCH_MATCHING";
    SceneNotify.OPEN_MJXLCH = "OPEN_MJXLCH";
    SceneNotify.CLOSE_MJXLCH = "CLOSE_MJXLCH";
    SceneNotify.OPEN_MJXLCH_OVER = "OPEN_MJXLCH_OVER";
    SceneNotify.CLOSE_MJXLCH_OVER = "CLOSE_MJXLCH_OVER";
    //四川麻将
    SceneNotify.OPEN_SCMJ_HALL = "OPEN_SCMJ_HALL";
    SceneNotify.CLOSE_SCMJ_HALL = "CLOSE_SCMJ_HALL";
    SceneNotify.OPEN_SCMJ_MATCHING = "OPEN_SCMJ_MATCHING";
    SceneNotify.CLOSE_SCMJ_MATCHING = "CLOSE_SCMJ_MATCHING";
    SceneNotify.OPEN_SCMJ = "OPEN_SCMJ";
    SceneNotify.CLOSE_SCMJ = "CLOSE_SCMJ";
    SceneNotify.OPEN_SCMJ_OVER = "OPEN_SCMJ_OVER";
    SceneNotify.CLOSE_SCMJ_OVER = "CLOSE_SCMJ_OVER";
    //湖北麻将-卡五星
    SceneNotify.OPEN_HBMJ_MATCHING = "OPEN_HBMJ_MATCHING";
    SceneNotify.CLOSE_HBMJ_MATCHING = "CLOSE_HBMJ_MATCHING";
    SceneNotify.OPEN_HBMJ = "OPEN_HBMJ";
    SceneNotify.CLOSE_HBMJ = "CLOSE_HBMJ";
    SceneNotify.OPEN_HBMJ_HALL = "OPEN_HBMJ_HALL";
    SceneNotify.CLOSE_HBMJ_HALL = "CLOSE_HBMJ_HALL";
    SceneNotify.OPEN_HBMJ_OVER = "OPEN_HBMJ_OVER";
    SceneNotify.CLOSE_HBMJ_OVER = "CLOSE_HBMJ_OVER";
    //二人麻将
    SceneNotify.OPEN_ERMJ_MATCHING = "OPEN_ERMJ_MATCHING";
    SceneNotify.CLOSE_ERMJ_MATCHING = "CLOSE_ERMJ_MATCHING";
    SceneNotify.OPEN_ERMJ = "OPEN_ERMJ";
    SceneNotify.CLOSE_ERMJ = "CLOSE_ERMJ";
    SceneNotify.OPEN_ERMJ_HALL = "OPEN_ERMJ_HALL";
    SceneNotify.CLOSE_ERMJ_HALL = "CLOSE_ERMJ_HALL";
    SceneNotify.OPEN_ERMJ_OVER = "OPEN_ERMJ_OVER";
    SceneNotify.CLOSE_ERMJ_OVER = "CLOSE_ERMJ_OVER";
    SceneNotify.OPEN_BDZ = "OPEN_BDZ";
    SceneNotify.CLOSE_BDZ = "CLOSE_BDZ_GAME";
    SceneNotify.OPEN_BDZ_HALL = "OPEN_BDZ_HALL";
    SceneNotify.CLOSE_BDZ_HALL = "CLOSE_BDZ_HALL";
    SceneNotify.OPEN_BDZ_MATCHING = "OPEN_BDZ_MATCHING";
    SceneNotify.CLOSE_BDZ_MATCHING = "CLOSE_BDZ_MATCHING";
    //比赛场
    // public static OPEN_BDZ: string = "OPEN_BDZ";
    // public static CLOSE_BDZ: string = "CLOSE_BDZ_GAME";
    SceneNotify.OPEN_MATCH_HALL = "OPEN_RACE_HALL";
    SceneNotify.CLOSE_MATCH_HALL = "CLOSE_RACE_HALL";
    // public static OPEN_BDZ_MATCHING: string = "OPEN_BDZ_MATCHING";
    // public static CLOSE_BDZ_MATCHING: string = "CLOSE_BDZ_MATCHING";
    //血战到底比赛
    SceneNotify.OPEN_MATCH_MJXZDD = "OPEN_MATCH_MJXZDD";
    SceneNotify.CLOSE_MATCH_MJXZDD = "CLOSE_MATCH_MJXZDD";
    SceneNotify.OPEN_MATCH_OVER_MJXZDD = "OPEN_MATCH_OVER_MJXZDD";
    SceneNotify.CLOSE_MATCH_OVER_MJXZDD = "CLOSE_MATCH_OVER_MJXZDD";
    //水果武士
    SceneNotify.OPEN_SGWS = "OPEN_SGWS";
    SceneNotify.CLOSE_SGWS = "CLOSE_SGWS";
    SceneNotify.OPEN_CLUB_HALL = "OPEN_CLUB_HALL";
    SceneNotify.CLOSE_CLUB_HALL = "CLOSE_CLUB_HALL";
    //水果武士
    SceneNotify.OPEN_SNYX = "OPEN_SNYX";
    SceneNotify.CLOSE_SNYX = "CLOSE_SNYX";
    return SceneNotify;
}());
__reflect(SceneNotify.prototype, "SceneNotify");
