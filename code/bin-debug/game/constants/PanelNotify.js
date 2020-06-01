var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:24:27
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-12-13 16:22:03
 * @Description: 面板弹出层的通知
 */
var PanelNotify = (function () {
    function PanelNotify() {
    }
    PanelNotify.OPEN_BASE_RECORD = "OPEN_BASE_RECORD";
    PanelNotify.CLOSE_BASE_RECORD = "CLOSE_BASE_RECORD";
    PanelNotify.OPEN_ALERT = "PanelNotify_OPEN_ALERT";
    PanelNotify.CLOSE_ALERT = "PanelNotify_CLOSE_ALERT";
    //帮助
    PanelNotify.OPEN_HELP = "PanelNotify_OPEN_HELP";
    PanelNotify.CLOSE_HELP = "PanelNotify_CLOSE_HELP";
    //头像
    PanelNotify.OPEN_HEADER = "PanelNotify_OPEN_HEADER";
    PanelNotify.CLOSE_HEADER = "PanelNotify_CLOSE_HEADER";
    //设置
    PanelNotify.OPEN_SETTING = "PanelNotify_OPEN_SETTING";
    PanelNotify.CLOSE_SETTING = "PanelNotify_CLOSE_SETTING";
    //游戏记录
    PanelNotify.CLOSE_GAMERECORD = "PanelNotify_CLOSE_GAMERECORD";
    PanelNotify.OPEN_GAMERECORD = "PanelNotify_OPEN_GAMERECORD";
    //----------------------------------------niuniu star
    PanelNotify.CLOSE_NIUGAMERECORD = "PanelNotify_CLOSE_NIUGAMERECORD";
    PanelNotify.OPEN_NIUGAMERECORD = "PanelNotify_OPEN_NIUGAMERECORD";
    //====牛牛 横屏
    PanelNotify.CLOSE_NIUGAMERECORD_Landscape = "PanelNotify_CLOSE_NIUGAMERECORD_Landscape";
    PanelNotify.OPEN_NIUGAMERECORD_Landscape = "PanelNotify_OPEN_NIUGAMERECORD_Landscape";
    //--------------牛牛(竖屏)
    PanelNotify.OPEN_HELP_SHU = "PanelNotify_OPEN_HELP_SHU";
    PanelNotify.CLOSE_HELP_SHU = "PanelNotify_CLOSE_HELP_SHU";
    //-------------------------------------------niuniu end
    //-------------------------------------------sangong star
    PanelNotify.OPEN_SGHELP = "PanelNotify_OPEN_SGHELP";
    PanelNotify.CLOSE_SGHELP = "PanelNotify_CLOSE_SGHELP";
    // 老虎机tips弹窗
    PanelNotify.OPEN_LAOHUGAME_TIPS = "PanelNotify_OPEN_LAOHUGAME_TIPS";
    PanelNotify.CLOSE_LAOHUGAME_TIPS = "PanelNotify_CLOSE_LAOHUGAME_TIPS";
    PanelNotify.OPEN_LEAVE_LAOHU_PANEL = "PanelNotify_OPEN_LEAVE_LAOHU_PANEL";
    PanelNotify.CLOSE_LEAVE_LAOHU_PANEL = "PanelNotify_CLOSE_LEAVE_LAOHU_PANEL";
    PanelNotify.OPEN_SETTING_LAOHU_PANEL = "PanelNotify_OPEN_SETTING_LAOHU_PANEL";
    PanelNotify.CLOSE_SETTING_LAOHU_PANEL = "PanelNotify_CLOSE_SETTING_LAOHU_PANEL";
    PanelNotify.OPEN_LAOHU_AUTO_PANEL = "PanelNotify_OPEN_LAOHU_AUTO_PANEL";
    PanelNotify.CLOSE_LAOHU_AUTO_PANEL = "PanelNotify_CLOSE_LAOHU_AUTO_PANEL";
    PanelNotify.OPEN_NETERORR_PANEL = "PanelNotify_OPEN_NETERORR_PANEL";
    PanelNotify.CLOSE_NETERORR_PANEL = "PanelNotify_CLOSE_NETERORR_PANEL";
    PanelNotify.OPEN_DNTG_RECORD_PANEL = "PanelNotify_OPEN_DNTG_RECORD_PANEL";
    PanelNotify.CLOSE_DNTG_RECORD_PANEL = "PanelNotify_CLOSE_DNTG_RECORD_PANEL";
    PanelNotify.OPEN_SDXL_TIPS = "PanelNotify_OPEN_SDXL_TIPS";
    PanelNotify.CLOSE_SDXL_TIPS = "PanelNotify_CLOSE_SDXL_TIPS";
    PanelNotify.OPEN_SDXL_AUTO_PANEL = "PanelNotify_OPEN_SDXL_AUTO_PANEL";
    PanelNotify.CLOSE_SDXL_AUTO_PANEL = "PanelNotify_CLOSE_SDXL_AUTO_PANEL";
    //赤壁之战
    PanelNotify.OPEN_CBZZ_TIPS_PANEL = "PanelNotify_OPEN_CBZZ_TIPS_PANEL";
    PanelNotify.CLOSE_CBZZ_TIPS_PANEL = "PanelNotify_CLOSE_CBZZ_TIPS_PANEL";
    PanelNotify.OPEN_CBZZ_AUTO_PANEL = "PanelNotify_OPEN_CBZZ_AUTO_PANEL";
    PanelNotify.CLOSE_CBZZ_AUTO_PANEL = "PanelNotify_CLOSE_CBZZ_AUTO_PANEL";
    //四大美女
    PanelNotify.OPEN_SDMN_TIPS_PANEL = "PanelNotify_OPEN_SDMN_TIPS_PANEL";
    PanelNotify.CLOSE_SDMN_TIPS_PANEL = "PanelNotify_CLOSE_SDMN_TIPS_PANEL";
    PanelNotify.OPEN_SDMN_AUTO_PANEL = "PanelNotify_OPEN_SDMN_AUTO_PANEL";
    PanelNotify.CLOSE_SDMN_AUTO_PANEL = "PanelNotify_CLOSE_SDMN_AUTO_PANEL";
    //宝石矿工
    PanelNotify.OPEN_BSKG_TIPS_PANEL = "PanelNotify_OPEN_BSKG_TIPS_PANEL";
    PanelNotify.CLOSE_BSKG_TIPS_PANEL = "PanelNotify_CLOSE_BSKG_TIPS_PANEL";
    PanelNotify.OPEN_BSKG_AUTO_PANEL = "PanelNotify_OPEN_BSKG_AUTO_PANEL";
    PanelNotify.CLOSE_BSKG_AUTO_PANEL = "PanelNotify_CLOSE_BSKG_AUTO_PANEL";
    //热带水果
    PanelNotify.OPEN_RDSG_TIPS_PANEL = "PanelNotify_OPEN_RDSG_TIPS_PANEL";
    PanelNotify.CLOSE_RDSG_TIPS_PANEL = "PanelNotify_CLOSE_RDSG_TIPS_PANEL";
    PanelNotify.OPEN_RDSG_AUTO_PANEL = "PanelNotify_OPEN_RDSG_AUTO_PANEL";
    PanelNotify.CLOSE_RDSG_AUTO_PANEL = "PanelNotify_CLOSE_RDSG_AUTO_PANEL";
    //暗夜猎手
    PanelNotify.OPEN_AYLS_TIPS_PANEL = "PanelNotify_OPEN_AYLS_TIPS_PANEL";
    PanelNotify.CLOSE_AYLS_TIPS_PANEL = "PanelNotify_CLOSE_AYLS_TIPS_PANEL";
    PanelNotify.OPEN_AYLS_AUTO_PANEL = "PanelNotify_OPEN_AYLS_AUTO_PANEL";
    PanelNotify.CLOSE_AYLS_AUTO_PANEL = "PanelNotify_CLOSE_AYLS_AUTO_PANEL";
    //格斗之王
    PanelNotify.OPEN_GDZW_TIPS_PANEL = "PanelNotify_OPEN_GDZW_TIPS_PANEL";
    PanelNotify.CLOSE_GDZW_TIPS_PANEL = "PanelNotify_CLOSE_GDZW_TIPS_PANEL";
    PanelNotify.OPEN_GDZW_AUTO_PANEL = "PanelNotify_OPEN_GDZW_AUTO_PANEL";
    PanelNotify.CLOSE_GDZW_AUTO_PANEL = "PanelNotify_CLOSE_GDZW_AUTO_PANEL";
    //白蛇传说
    PanelNotify.OPEN_BSCS_TIPS_PANEL = "PanelNotify_OPEN_BSCS_TIPS_PANEL";
    PanelNotify.CLOSE_BSCS_TIPS_PANEL = "PanelNotify_CLOSE_BSCS_TIPS_PANEL";
    PanelNotify.OPEN_BSCS_AUTO_PANEL = "PanelNotify_OPEN_BSCS_AUTO_PANEL";
    PanelNotify.CLOSE_BSCS_AUTO_PANEL = "PanelNotify_CLOSE_BSCS_AUTO_PANEL";
    //嫦娥奔月
    PanelNotify.OPEN_CEBY_TIPS_PANEL = "PanelNotify_OPEN_CEBY_TIPS_PANEL";
    PanelNotify.CLOSE_CEBY_TIPS_PANEL = "PanelNotify_CLOSE_CEBY_TIPS_PANEL";
    PanelNotify.OPEN_CEBY_AUTO_PANEL = "PanelNotify_OPEN_CEBY_AUTO_PANEL";
    PanelNotify.CLOSE_CEBY_AUTO_PANEL = "PanelNotify_CLOSE_CEBY_AUTO_PANEL";
    //招财锦鲤
    PanelNotify.OPEN_ZCJL_AUTO_PANEL = "PanelNotify_OPEN_ZCJL_AUTO_PANEL";
    PanelNotify.CLOSE_ZCJL_AUTO_PANEL = "PanelNotify_CLOSE_ZCJL_AUTO_PANEL";
    //万兽之王
    PanelNotify.OPEN_WSZW_AUTO_PANEL = "PanelNotify_OPEN_WSZW_AUTO_PANEL";
    PanelNotify.CLOSE_WSZW_AUTO_PANEL = "PanelNotify_CLOSE_WSZW_AUTO_PANEL";
    //lucky7
    PanelNotify.OPEN_LUCKY7_AUTO_PANEL = "PanelNotify_OPEN_LUCKY7_AUTO_PANEL";
    PanelNotify.CLOSE_LUCKY7_AUTO_PANEL = "PanelNotify_CLOSE_LUCKY7_AUTO_PANEL";
    //财神到
    PanelNotify.OPEN_CSD_AUTO_PANEL = "PanelNotify_OPEN_CSD_AUTO_PANEL";
    PanelNotify.CLOSE_CSD_AUTO_PANEL = "PanelNotify_CLOSE_CSD_AUTO_PANEL";
    //幸运水果
    PanelNotify.OPEN_XYSG_AUTO_PANEL = "PanelNotify_OPEN_XYSG_AUTO_PANEL";
    PanelNotify.CLOSE_XYSG_AUTO_PANEL = "PanelNotify_CLOSE_XYSG_AUTO_PANEL";
    //星尘宝石
    PanelNotify.OPEN_XCBS_TIPS_PANEL = "PanelNotify_OPEN_XCBS_TIPS_PANEL";
    PanelNotify.CLOSE_XCBS_TIPS_PANEL = "PanelNotify_CLOSE_XCBS_TIPS_PANEL";
    PanelNotify.OPEN_XCBS_AUTO_PANEL = "PanelNotify_OPEN_XCBS_AUTO_PANEL";
    PanelNotify.CLOSE_XCBS_AUTO_PANEL = "PanelNotify_CLOSE_XCBS_AUTO_PANEL";
    //红黑大战
    //路单
    PanelNotify.OPEN_RBWARZS = "OPEN_RBWARZS";
    PanelNotify.CLOSE_RBWARZS = "CLOSE_RBWARZS";
    //玩家列表
    PanelNotify.OPEN_RBWARPL = "OPEN_RBWARPL";
    PanelNotify.CLOSE_RBWARPL = "CLOSE_RBWARPL";
    //游戏记录
    PanelNotify.OPEN_RBWARJL = "OPEN_RBWARJL";
    PanelNotify.CLOSE_RBWARJL = "CLOSE_RBWARJL";
    //设置
    PanelNotify.OPEN_RBWARSET = "OPEN_RBWARSET";
    PanelNotify.CLOSE_RBWARSET = "CLOSE_RBWARSET";
    //帮助
    PanelNotify.OPEN_RBWARHELP = "OPEN_RBWARHELP";
    PanelNotify.CLOSE_RBWARHELP = "CLOSE_RBWARHELP";
    //-----------------------------------扎金花
    //游戏记录
    PanelNotify.OPEN_ZJHRECORD = "OPEN_ZJHRECORD";
    PanelNotify.CLOSE_ZJHRECORD = "CLOSE_ZJHRECORD";
    //游戏帮助
    PanelNotify.OPEN_ZJHHELP = "OPEN_ZJHHELP";
    PanelNotify.CLOSE_ZJHHELP = "CLOSE_ZJHHELP";
    //游戏设置
    PanelNotify.OPEN_ZJHSET = "OPEN_ZJHSET";
    PanelNotify.CLOSE_ZJHSET = "CLOSE_ZJHSET";
    //---------------------大众麻将
    PanelNotify.OPEN_DZMJRECORD = "OPEN_DZMJRECORD";
    PanelNotify.CLOSE_DZMJRECORD = "CLOSE_DZMJRECORD";
    PanelNotify.OPEN_DZMJ_HELP = "OPEN_DZMJ_HELP";
    PanelNotify.CLOSE_DZMJ_HELP = "CLOSE_DZMJ_HELP";
    //-------baijiale
    PanelNotify.OPEN_BJL_RECORD = "OPEN_BJL_RECORD";
    PanelNotify.CLOSE_BJL_RECORD = "CLOSE_BJL_RECORD";
    //---------------------广东
    PanelNotify.OPEN_GDMJRECORD = "OPEN_GDMJRECORD";
    PanelNotify.CLOSE_GDMJRECORD = "CLOSE_GDMJRECORD";
    PanelNotify.OPEN_GDMJ_HELP = "OPEN_GDMJ_HELP";
    PanelNotify.CLOSE_GDMJ_HELP = "CLOSE_GDMJ_HELP";
    /**杭州麻将 */
    /**打开杭州麻将记录 */
    PanelNotify.OPEN_HZMJRECORD = "OPEN_HZMJRECORD";
    /**关闭杭州麻将记录 */
    PanelNotify.CLOSE_HZMJRECORD = "CLOSE_HZMJRECORD";
    /**打开杭州麻将帮助 */
    PanelNotify.OPEN_HZMJ_HELP = "OPEN_HZMJ_HELP";
    /**关闭杭州麻将帮助 */
    PanelNotify.CLOSE_HZMJ_HELP = "CLOSE_HZMJ_HELP";
    /**贵阳捉鸡*/
    /**打开贵阳捉鸡记录 */
    PanelNotify.OPEN_GYZJRECORD = "OPEN_GYZJRECORD";
    /**关闭*贵阳捉鸡记录 */
    PanelNotify.CLOSE_GYZJRECORD = "CLOSE_GYZJRECORD";
    /**打开*贵阳捉鸡帮助 */
    PanelNotify.OPEN_GYZJ_HELP = "OPEN_GYZJ_HELP";
    /**关闭*贵阳捉鸡帮助 */
    PanelNotify.CLOSE_GYZJ_HELP = "CLOSE_GYZJ_HELP";
    //====牛牛 横屏(记录)
    PanelNotify.CLOSE_NIUGAMERECORD_HORIZON = "PanelNotify_CLOSE_NIUGAMERECORD_HORIZON";
    PanelNotify.OPEN_NIUGAMERECORD_HORIZON = "PanelNotify_OPEN_NIUGAMERECORD_HORIZON";
    //三公help（横屏）
    PanelNotify.OPEN_HELP_SHU_HORIZON = "PanelNotify_OPEN_HELP_SHU_HORIZON";
    PanelNotify.CLOSE_HELP_SHU_HORIZON = "PanelNotify_CLOSE_HELP_SHU_HORIZON";
    PanelNotify.OPEN_SLOT_RANK = "PanelNotify_OPEN_SLOT_RANK";
    PanelNotify.CLOSE_SLOT_RANK = "PanelNotify_CLOSE_SLOT_RANK";
    //水果武士
    PanelNotify.OPEN_SGWS_TIPS_PANEL = "PanelNotify_OPEN_SGWS_TIPS_PANEL";
    PanelNotify.CLOSE_SGWS_TIPS_PANEL = "PanelNotify_CLOSE_SGWS_TIPS_PANEL";
    PanelNotify.OPEN_SGWS_AUTO_PANEL = "PanelNotify_OPEN_SGWS_AUTO_PANEL";
    PanelNotify.CLOSE_SGWS_AUTO_PANEL = "PanelNotify_CLOSE_SGWS_AUTO_PANEL";
    //鼠年有喜
    PanelNotify.OPEN_SNYX_TIPS_PANEL = "PanelNotify_OPEN_SNYX_TIPS_PANEL";
    PanelNotify.CLOSE_SNYX_TIPS_PANEL = "PanelNotify_CLOSE_SNYX_TIPS_PANEL";
    PanelNotify.OPEN_SNYX_AUTO_PANEL = "PanelNotify_OPEN_SNYX_AUTO_PANEL";
    PanelNotify.CLOSE_SNYX_AUTO_PANEL = "PanelNotify_CLOSE_SNYX_AUTO_PANEL";
    return PanelNotify;
}());
__reflect(PanelNotify.prototype, "PanelNotify");
