var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zjh;
(function (zjh) {
    var ZajinhuaUtils = (function () {
        function ZajinhuaUtils() {
        }
        //-----------------------------------声音控制--------------------------------------
        /**
         * 飞筹码
         */
        ZajinhuaUtils.PlayFcm = function () {
            SoundManager.getInstance().playEffect("rbw_minexz_mp3");
        };
        /**
         * 其他飞金币
         */
        ZajinhuaUtils.otherPlayFjb = function () {
            SoundManager.getInstance().playEffect("rbw_fcm_mp3");
        };
        /**
         * 炸弹
         */
        ZajinhuaUtils.PlayBoom = function () {
            SoundManager.getInstance().playEffect("zjh_boom_mp3");
        };
        /**
         * 跟注
         */
        ZajinhuaUtils.playGz = function (sex) {
            var sound = "zjh_gz_" + sex + "_mp3";
            SoundManager.getInstance().playEffect(sound);
        };
        /**
         * 加注
         */
        ZajinhuaUtils.playJz = function (sex) {
            var sound = "zjh_jz_" + sex + "_mp3";
            SoundManager.getInstance().playEffect(sound);
        };
        /**
         *孤注一掷
         */
        ZajinhuaUtils.playGzyz = function (sex) {
            var sound = "zjh_gzyz_" + sex + "_mp3";
            SoundManager.getInstance().playEffect(sound);
        };
        /**
         *比牌
         */
        ZajinhuaUtils.playBp = function (sex) {
            var sound = "zjh_bp_" + sex + "_mp3";
            SoundManager.getInstance().playEffect(sound);
        };
        /**
         * 发牌
         */
        ZajinhuaUtils.fapai = function () {
            SoundManager.getInstance().playEffect("nns_fapai_mp3");
        };
        /**
         * 自己赢
         */
        ZajinhuaUtils.mineWin = function () {
            SoundManager.getInstance().playEffect("rbw_win_mp3");
        };
        /**
         * 展示分数
         */
        ZajinhuaUtils.playSoundByFen = function (fen) {
            SoundManager.getInstance().playEffect("rbw_" + fen + "_mp3");
        };
        return ZajinhuaUtils;
    }());
    zjh.ZajinhuaUtils = ZajinhuaUtils;
    __reflect(ZajinhuaUtils.prototype, "zjh.ZajinhuaUtils");
})(zjh || (zjh = {}));
