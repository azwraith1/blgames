/*
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:24:27 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-12-13 16:22:03
 * @Description: 面板弹出层的通知
 */
class PanelNotify {
  public constructor() {

  }

  public static OPEN_BASE_RECORD: string = "OPEN_BASE_RECORD";

  public static CLOSE_BASE_RECORD: string = "CLOSE_BASE_RECORD";

  public static OPEN_ALERT: string = "PanelNotify_OPEN_ALERT";

  public static CLOSE_ALERT: string = "PanelNotify_CLOSE_ALERT";
  //帮助
  public static OPEN_HELP: string = "PanelNotify_OPEN_HELP";

  public static CLOSE_HELP: string = "PanelNotify_CLOSE_HELP";
  //头像
  public static OPEN_HEADER: string = "PanelNotify_OPEN_HEADER";

  public static CLOSE_HEADER: string = "PanelNotify_CLOSE_HEADER";
  //设置
  public static OPEN_SETTING: string = "PanelNotify_OPEN_SETTING";

  public static CLOSE_SETTING: string = "PanelNotify_CLOSE_SETTING";
  //游戏记录
  public static CLOSE_GAMERECORD: string = "PanelNotify_CLOSE_GAMERECORD";

  public static OPEN_GAMERECORD: string = "PanelNotify_OPEN_GAMERECORD";

  //----------------------------------------niuniu star

  public static CLOSE_NIUGAMERECORD: string = "PanelNotify_CLOSE_NIUGAMERECORD";

  public static OPEN_NIUGAMERECORD: string = "PanelNotify_OPEN_NIUGAMERECORD";

  //====牛牛 横屏
  public static CLOSE_NIUGAMERECORD_Landscape: string = "PanelNotify_CLOSE_NIUGAMERECORD_Landscape";

  public static OPEN_NIUGAMERECORD_Landscape: string = "PanelNotify_OPEN_NIUGAMERECORD_Landscape";
  //--------------牛牛(竖屏)

  public static OPEN_HELP_SHU: string = "PanelNotify_OPEN_HELP_SHU";

  public static CLOSE_HELP_SHU: string = "PanelNotify_CLOSE_HELP_SHU";

  //-------------------------------------------niuniu end

  //-------------------------------------------sangong star

  public static OPEN_SGHELP: string = "PanelNotify_OPEN_SGHELP";

  public static CLOSE_SGHELP: string = "PanelNotify_CLOSE_SGHELP";
  // 老虎机tips弹窗
  public static OPEN_LAOHUGAME_TIPS: string = "PanelNotify_OPEN_LAOHUGAME_TIPS";

  public static CLOSE_LAOHUGAME_TIPS: string = "PanelNotify_CLOSE_LAOHUGAME_TIPS";

  public static OPEN_LEAVE_LAOHU_PANEL: string = "PanelNotify_OPEN_LEAVE_LAOHU_PANEL";

  public static CLOSE_LEAVE_LAOHU_PANEL: string = "PanelNotify_CLOSE_LEAVE_LAOHU_PANEL";

  public static OPEN_SETTING_LAOHU_PANEL: string = "PanelNotify_OPEN_SETTING_LAOHU_PANEL";

  public static CLOSE_SETTING_LAOHU_PANEL: string = "PanelNotify_CLOSE_SETTING_LAOHU_PANEL";

  public static OPEN_LAOHU_AUTO_PANEL: string = "PanelNotify_OPEN_LAOHU_AUTO_PANEL";

  public static CLOSE_LAOHU_AUTO_PANEL: string = "PanelNotify_CLOSE_LAOHU_AUTO_PANEL";

  public static OPEN_NETERORR_PANEL: string = "PanelNotify_OPEN_NETERORR_PANEL";

  public static CLOSE_NETERORR_PANEL: string = "PanelNotify_CLOSE_NETERORR_PANEL";

  public static OPEN_DNTG_RECORD_PANEL: string = "PanelNotify_OPEN_DNTG_RECORD_PANEL";

  public static CLOSE_DNTG_RECORD_PANEL: string = "PanelNotify_CLOSE_DNTG_RECORD_PANEL";

  public static OPEN_SDXL_TIPS: string = "PanelNotify_OPEN_SDXL_TIPS";
  public static CLOSE_SDXL_TIPS: string = "PanelNotify_CLOSE_SDXL_TIPS";

  public static OPEN_SDXL_AUTO_PANEL: string = "PanelNotify_OPEN_SDXL_AUTO_PANEL";
  public static CLOSE_SDXL_AUTO_PANEL: string = "PanelNotify_CLOSE_SDXL_AUTO_PANEL";
  //赤壁之战
  public static OPEN_CBZZ_TIPS_PANEL: string = "PanelNotify_OPEN_CBZZ_TIPS_PANEL";
  public static CLOSE_CBZZ_TIPS_PANEL: string = "PanelNotify_CLOSE_CBZZ_TIPS_PANEL";
  public static OPEN_CBZZ_AUTO_PANEL: string = "PanelNotify_OPEN_CBZZ_AUTO_PANEL";
  public static CLOSE_CBZZ_AUTO_PANEL: string = "PanelNotify_CLOSE_CBZZ_AUTO_PANEL";
  //四大美女
  public static OPEN_SDMN_TIPS_PANEL: string = "PanelNotify_OPEN_SDMN_TIPS_PANEL";
  public static CLOSE_SDMN_TIPS_PANEL: string = "PanelNotify_CLOSE_SDMN_TIPS_PANEL";
  public static OPEN_SDMN_AUTO_PANEL: string = "PanelNotify_OPEN_SDMN_AUTO_PANEL";
  public static CLOSE_SDMN_AUTO_PANEL: string = "PanelNotify_CLOSE_SDMN_AUTO_PANEL";
  //宝石矿工
  public static OPEN_BSKG_TIPS_PANEL: string = "PanelNotify_OPEN_BSKG_TIPS_PANEL";
  public static CLOSE_BSKG_TIPS_PANEL: string = "PanelNotify_CLOSE_BSKG_TIPS_PANEL";
  public static OPEN_BSKG_AUTO_PANEL: string = "PanelNotify_OPEN_BSKG_AUTO_PANEL";
  public static CLOSE_BSKG_AUTO_PANEL: string = "PanelNotify_CLOSE_BSKG_AUTO_PANEL";
  //热带水果
  public static OPEN_RDSG_TIPS_PANEL: string = "PanelNotify_OPEN_RDSG_TIPS_PANEL";
  public static CLOSE_RDSG_TIPS_PANEL: string = "PanelNotify_CLOSE_RDSG_TIPS_PANEL";
  public static OPEN_RDSG_AUTO_PANEL: string = "PanelNotify_OPEN_RDSG_AUTO_PANEL";
  public static CLOSE_RDSG_AUTO_PANEL: string = "PanelNotify_CLOSE_RDSG_AUTO_PANEL";
  //暗夜猎手
  public static OPEN_AYLS_TIPS_PANEL: string = "PanelNotify_OPEN_AYLS_TIPS_PANEL";
  public static CLOSE_AYLS_TIPS_PANEL: string = "PanelNotify_CLOSE_AYLS_TIPS_PANEL";
  public static OPEN_AYLS_AUTO_PANEL: string = "PanelNotify_OPEN_AYLS_AUTO_PANEL";
  public static CLOSE_AYLS_AUTO_PANEL: string = "PanelNotify_CLOSE_AYLS_AUTO_PANEL";
  //格斗之王
  public static OPEN_GDZW_TIPS_PANEL: string = "PanelNotify_OPEN_GDZW_TIPS_PANEL";
  public static CLOSE_GDZW_TIPS_PANEL: string = "PanelNotify_CLOSE_GDZW_TIPS_PANEL";
  public static OPEN_GDZW_AUTO_PANEL: string = "PanelNotify_OPEN_GDZW_AUTO_PANEL";
  public static CLOSE_GDZW_AUTO_PANEL: string = "PanelNotify_CLOSE_GDZW_AUTO_PANEL";
  //白蛇传说
  public static OPEN_BSCS_TIPS_PANEL: string = "PanelNotify_OPEN_BSCS_TIPS_PANEL";
  public static CLOSE_BSCS_TIPS_PANEL: string = "PanelNotify_CLOSE_BSCS_TIPS_PANEL";
  public static OPEN_BSCS_AUTO_PANEL: string = "PanelNotify_OPEN_BSCS_AUTO_PANEL";
  public static CLOSE_BSCS_AUTO_PANEL: string = "PanelNotify_CLOSE_BSCS_AUTO_PANEL";
  //嫦娥奔月
  public static OPEN_CEBY_TIPS_PANEL: string = "PanelNotify_OPEN_CEBY_TIPS_PANEL";
  public static CLOSE_CEBY_TIPS_PANEL: string = "PanelNotify_CLOSE_CEBY_TIPS_PANEL";
  public static OPEN_CEBY_AUTO_PANEL: string = "PanelNotify_OPEN_CEBY_AUTO_PANEL";
  public static CLOSE_CEBY_AUTO_PANEL: string = "PanelNotify_CLOSE_CEBY_AUTO_PANEL";
  //招财锦鲤
  public static OPEN_ZCJL_AUTO_PANEL: string = "PanelNotify_OPEN_ZCJL_AUTO_PANEL";
  public static CLOSE_ZCJL_AUTO_PANEL: string = "PanelNotify_CLOSE_ZCJL_AUTO_PANEL";
  //万兽之王
  public static OPEN_WSZW_AUTO_PANEL: string = "PanelNotify_OPEN_WSZW_AUTO_PANEL";
  public static CLOSE_WSZW_AUTO_PANEL: string = "PanelNotify_CLOSE_WSZW_AUTO_PANEL";
  //lucky7
  public static OPEN_LUCKY7_AUTO_PANEL: string = "PanelNotify_OPEN_LUCKY7_AUTO_PANEL";
  public static CLOSE_LUCKY7_AUTO_PANEL: string = "PanelNotify_CLOSE_LUCKY7_AUTO_PANEL";

  //财神到
  public static OPEN_CSD_AUTO_PANEL: string = "PanelNotify_OPEN_CSD_AUTO_PANEL";
  public static CLOSE_CSD_AUTO_PANEL: string = "PanelNotify_CLOSE_CSD_AUTO_PANEL";
  //幸运水果
  public static OPEN_XYSG_AUTO_PANEL: string = "PanelNotify_OPEN_XYSG_AUTO_PANEL";
  public static CLOSE_XYSG_AUTO_PANEL: string = "PanelNotify_CLOSE_XYSG_AUTO_PANEL";

  //星尘宝石
  public static OPEN_XCBS_TIPS_PANEL: string = "PanelNotify_OPEN_XCBS_TIPS_PANEL";
  public static CLOSE_XCBS_TIPS_PANEL: string = "PanelNotify_CLOSE_XCBS_TIPS_PANEL";
  public static OPEN_XCBS_AUTO_PANEL: string = "PanelNotify_OPEN_XCBS_AUTO_PANEL";
  public static CLOSE_XCBS_AUTO_PANEL: string = "PanelNotify_CLOSE_XCBS_AUTO_PANEL";


  //红黑大战
  //路单
  public static OPEN_RBWARZS: string = "OPEN_RBWARZS";
  public static CLOSE_RBWARZS: string = "CLOSE_RBWARZS";
  //玩家列表
  public static OPEN_RBWARPL: string = "OPEN_RBWARPL";
  public static CLOSE_RBWARPL: string = "CLOSE_RBWARPL";
  //游戏记录
  public static OPEN_RBWARJL: string = "OPEN_RBWARJL";
  public static CLOSE_RBWARJL: string = "CLOSE_RBWARJL";
  //设置
  public static OPEN_RBWARSET: string = "OPEN_RBWARSET";
  public static CLOSE_RBWARSET: string = "CLOSE_RBWARSET";
  //帮助
  public static OPEN_RBWARHELP: string = "OPEN_RBWARHELP";
  public static CLOSE_RBWARHELP: string = "CLOSE_RBWARHELP";


  //-----------------------------------扎金花
  //游戏记录
  public static OPEN_ZJHRECORD: string = "OPEN_ZJHRECORD";
  public static CLOSE_ZJHRECORD: string = "CLOSE_ZJHRECORD";

  //游戏帮助
  public static OPEN_ZJHHELP: string = "OPEN_ZJHHELP";
  public static CLOSE_ZJHHELP: string = "CLOSE_ZJHHELP";

  //游戏设置
  public static OPEN_ZJHSET: string = "OPEN_ZJHSET";
  public static CLOSE_ZJHSET: string = "CLOSE_ZJHSET";


  //---------------------大众麻将
  public static OPEN_DZMJRECORD: string = "OPEN_DZMJRECORD";
  public static CLOSE_DZMJRECORD: string = "CLOSE_DZMJRECORD";

  public static OPEN_DZMJ_HELP: string = "OPEN_DZMJ_HELP";
  public static CLOSE_DZMJ_HELP: string = "CLOSE_DZMJ_HELP";

  //-------baijiale
  public static OPEN_BJL_RECORD: string = "OPEN_BJL_RECORD";
  public static CLOSE_BJL_RECORD: string = "CLOSE_BJL_RECORD";


  //---------------------广东
  public static OPEN_GDMJRECORD: string = "OPEN_GDMJRECORD";
  public static CLOSE_GDMJRECORD: string = "CLOSE_GDMJRECORD";

  public static OPEN_GDMJ_HELP: string = "OPEN_GDMJ_HELP";
  public static CLOSE_GDMJ_HELP: string = "CLOSE_GDMJ_HELP";

  /**杭州麻将 */
  /**打开杭州麻将记录 */
  public static OPEN_HZMJRECORD: string = "OPEN_HZMJRECORD";
  /**关闭杭州麻将记录 */
  public static CLOSE_HZMJRECORD: string = "CLOSE_HZMJRECORD";
  /**打开杭州麻将帮助 */
  public static OPEN_HZMJ_HELP: string = "OPEN_HZMJ_HELP";
  /**关闭杭州麻将帮助 */
  public static CLOSE_HZMJ_HELP: string = "CLOSE_HZMJ_HELP";

  /**贵阳捉鸡*/
  /**打开贵阳捉鸡记录 */
  public static OPEN_GYZJRECORD: string = "OPEN_GYZJRECORD";
  /**关闭*贵阳捉鸡记录 */
  public static CLOSE_GYZJRECORD: string = "CLOSE_GYZJRECORD";
  /**打开*贵阳捉鸡帮助 */
  public static OPEN_GYZJ_HELP: string = "OPEN_GYZJ_HELP";
  /**关闭*贵阳捉鸡帮助 */
  public static CLOSE_GYZJ_HELP: string = "CLOSE_GYZJ_HELP";

  //====牛牛 横屏(记录)
  public static CLOSE_NIUGAMERECORD_HORIZON: string = "PanelNotify_CLOSE_NIUGAMERECORD_HORIZON";

  public static OPEN_NIUGAMERECORD_HORIZON: string = "PanelNotify_OPEN_NIUGAMERECORD_HORIZON";

  //三公help（横屏）
  public static OPEN_HELP_SHU_HORIZON: string = "PanelNotify_OPEN_HELP_SHU_HORIZON";

  public static CLOSE_HELP_SHU_HORIZON: string = "PanelNotify_CLOSE_HELP_SHU_HORIZON";

  public static OPEN_SLOT_RANK: string = "PanelNotify_OPEN_SLOT_RANK";

  public static CLOSE_SLOT_RANK: string = "PanelNotify_CLOSE_SLOT_RANK";

  //水果武士
  public static OPEN_SGWS_TIPS_PANEL: string = "PanelNotify_OPEN_SGWS_TIPS_PANEL";
  public static CLOSE_SGWS_TIPS_PANEL: string = "PanelNotify_CLOSE_SGWS_TIPS_PANEL";
  public static OPEN_SGWS_AUTO_PANEL: string = "PanelNotify_OPEN_SGWS_AUTO_PANEL";
  public static CLOSE_SGWS_AUTO_PANEL: string = "PanelNotify_CLOSE_SGWS_AUTO_PANEL";

  //鼠年有喜
  public static OPEN_SNYX_TIPS_PANEL: string = "PanelNotify_OPEN_SNYX_TIPS_PANEL";
  public static CLOSE_SNYX_TIPS_PANEL: string = "PanelNotify_CLOSE_SNYX_TIPS_PANEL";
  public static OPEN_SNYX_AUTO_PANEL: string = "PanelNotify_OPEN_SNYX_AUTO_PANEL";
  public static CLOSE_SNYX_AUTO_PANEL: string = "PanelNotify_CLOSE_SNYX_AUTO_PANEL";
}



