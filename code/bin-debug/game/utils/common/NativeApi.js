var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NativeApi = (function () {
    function NativeApi() {
        this.openBetMode = false;
        this.openBetPlayForFunMode = false;
        this.isGcmEnabled = false;
        this.isiPad = false;
        this.isiPhone = false;
        this.isiPhoneIOS7 = false;
        this.isiPhoneIOS8 = false;
        this.isiPhoneIOS9 = false;
        this.isiPod = false;
        this.isAndroidDevice = false;
        this.isSamsungS = false;
        this.isOneX = false;
        this.isHTCOne = false;
        this.isAndroid23Device = false;
        this.isAndroid400 = false;
        this.isAndroid410 = false;
        this.isAndroid420 = false;
        this.isAndroid430 = false;
        this.isAndroidTablet = false;
        this.isAndroid3Tablet = false;
        this.isDesktop = false;
        this.has3DTransforms = false;
        this.isChrome = false;
        this.isChrome280 = false;
        this.isSafari = false;
        this.isChromeForIOS = false;
        if (NativeApi._instance) {
            throw new Error("DateTimer使用单例");
        }
    }
    Object.defineProperty(NativeApi, "instance", {
        get: function () {
            if (!NativeApi._instance) {
                NativeApi._instance = new NativeApi();
            }
            return NativeApi._instance;
        },
        enumerable: true,
        configurable: true
    });
    NativeApi.prototype.initApi = function () {
        var f = navigator.userAgent, e, d;
        if (/callbackurl/i.test(window.location.search) && (/integration=openbet/i.test(window.location.search) || /openbet\.user_id/i.test(window.location.search))) {
            this.openBetMode = true;
        }
        if (/integration=openbet/i.test(window.location.search) && !this.openBetMode) {
            this.openBetPlayForFunMode = true;
        }
        if (/openbet.gcmMode=true/i.test(window.location.search)) {
            this.isGcmEnabled = true;
        }
        if (f.match(/Chrome/i)) {
            this.isChrome = true;
            if (f.match(/Chrome\/28[\.\d]/i)) {
                this.isChrome280 = true;
            }
        }
        if (f.match(/CriOS/i)) {
            this.isChromeForIOS = true;
        }
        if (f.match(/Safari/i) && !this.isChromeForIOS) {
            this.isSafari = true;
        }
        if (f.match(/iPad/i) !== null) {
            this.isiPad = true;
        }
        else {
            if ((f.match(/iPod/i))) {
                this.isiPod = true;
            }
            else {
                if ((f.match(/iPhone/i))) {
                    e = "3gs,4,4s";
                    d = "standard";
                    e = (window.screen.height === 568) ? "5" : e;
                    e = (window.screen.height === 667) ? "6" : e;
                    d = window.matchMedia("(-webkit-min-device-pixel-ratio: 3)").matches && e === "6" ? "zoomed" : d;
                    e = window.matchMedia("(-webkit-min-device-pixel-ratio: 3)").matches ? "6+" : e;
                    this.isiPhone = {
                        series: "iPhone",
                        model: e,
                        displayZoom: d
                    };
                }
                else {
                    if ((f.match(/Android/i)) || f.match(/HTC_Sensation/i)) {
                        this.isAndroidDevice = true;
                        if (f.match(/Android 3[\.\d]+/i)) {
                            this.isAndroid3Tablet = true;
                            this.isAndroidTablet = true;
                        }
                        else {
                            if (!f.match(/mobile/i)) {
                                this.isAndroidTablet = true;
                            }
                            else {
                                if (f.match(/Android 2\.3/i)) {
                                    this.isAndroid23Device = true;
                                }
                                else {
                                    if (f.match(/Android 4\.0/i)) {
                                        this.isAndroid400 = true;
                                    }
                                    else {
                                        if (f.match(/Android 4\.1/i)) {
                                            this.isAndroid410 = true;
                                        }
                                        else {
                                            if (f.match(/Android 4\.2/i)) {
                                                this.isAndroid420 = true;
                                            }
                                            else {
                                                if (f.match(/Android 4\.3/i)) {
                                                    this.isAndroid430 = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        this.isDesktop = true;
                    }
                }
            }
        }
        this.isiPhoneIOS7 = (f.indexOf("IEMobile") < 0) && (/(?:OS\s*[7]+_0(?:_\d+)?\s*)/i.test(f) && !window.navigator['standalone']) && (this.isiPhone || this.isiPod) && this.isSafari;
        this.isiPhoneIOS8 = (/OS\s*8_/i.test(f) && !window.navigator['standalone']) && this.isiPhone && this.isSafari;
        this.isiPhoneIOS9 = (/OS\s*9_/i.test(f) && !window.navigator['standalone']) && this.isiPhone && this.isSafari;
        this.isiPhoneIOS10 = (/OS\s*10_/i.test(f) && !window.navigator['standalone']) && this.isiPhone && this.isSafari;
        this.isiPhoneIOS11 = (/OS\s*11_/i.test(f) && !window.navigator['standalone']) && this.isiPhone && this.isSafari;
        this.isiPhoneIOS12 = (/OS\s*12_/i.test(f) && !window.navigator['standalone']) && this.isiPhone && this.isSafari;
        this.isiPhoneIOS13 = (/OS\s*13_/i.test(f) && !window.navigator['standalone']) && this.isiPhone && this.isSafari;
        this.isiOS9 = (/OS\s*9_/i.test(f));
        this.isIphone4Or4s = this.isiPhone && window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches && window.screen.width === 320 && window.screen.height === 480;
        this.isIphone5Or5sOr5c = this.isiPhone && window.screen.width === 320 && window.screen.height === 568;
        if ((f.match(/GT-I9100/))) {
            this.isSamsungS = {
                series: "samsungS",
                model: "s2"
            };
        }
        else {
            if ((f.match(/GT-I9300/))) {
                this.isSamsungS = {
                    series: "samsungS",
                    model: "s3"
                };
            }
            else {
                if ((f.match(/GT-I9505/)) || (f.match(/GT-I9506/)) || (f.match(/GT-I9521/)) || (f.match(/GT-I9525/))) {
                    this.isSamsungS = {
                        series: "samsungS",
                        model: "s4"
                    };
                }
            }
        }
        this['isiOSDevice'] = this.isiPad || this.isiPhone || this.isiPod;
        this['isIphone3GS'] = (this.isiOSDevice && !window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches && window.screen.width === 320 && window.screen.height === 480);
        this.getIsIphoneX();
        // this['isTouchDevice'] = Boolean("ontouchstart" in window);
        // this['clickEvent'] = this.isTouchDevice ? "touchend" : "click";
        // this['touchstartEvent'] = this.isTouchDevice ? "touchstart" : "mousedown";
        // this['touchendEvent'] = this.isTouchDevice ? "touchend" : "mouseup";
        // this['touchoutEvent'] = "mouseout";
        // this['touchmoveEvent'] = this.isTouchDevice ? "touchmove" : "mousemove";
        // this['isInIFrame'] = (window !== window.parent)
    };
    NativeApi.prototype.getIphoneBanben = function () {
        if (this.isiPhoneIOS11 || this.isiPhoneIOS12 || this.isiPhoneIOS13) {
            if (this.isSafari) {
                return true;
            }
        }
        return false;
    };
    NativeApi.prototype.getIsIphoneX = function () {
        if (this.isiOSDevice) {
            if (screen.height == 812 && screen.width == 375) {
                this.isIphoneX = true;
            }
        }
    };
    NativeApi.prototype.IsPC = function () {
        var userAgentInfo = navigator.userAgent.toString();
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    NativeApi.prototype.showIsFirstLogin = function () {
        var isFirst = egret.localStorage.getItem("firstlogin");
        if (!isFirst) {
            isFirst = "1";
            egret.localStorage.setItem("firstlogin", isFirst);
        }
        return isFirst;
    };
    NativeApi.prototype.addPlayCount = function () {
        var isFirst = egret.localStorage.getItem("firstlogin");
        if (!isFirst) {
            isFirst = "1";
            egret.localStorage.setItem("firstlogin", isFirst);
        }
        else {
            isFirst = parseInt(isFirst) + 1 + "";
            egret.localStorage.setItem("firstlogin", isFirst);
        }
    };
    NativeApi.prototype.getDeivice = function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        if (userAgent.indexOf("MiuiBrowser") > -1) {
            return "小米浏览器";
        }
        if (userAgent.indexOf("MQQBrowser") > -1) {
            return "QQ浏览器";
        }
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera";
        }
        ; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        } //判断是否IE浏览器
        return "未知浏览器";
    };
    NativeApi.getChromeVersion = function () {
        var arr = navigator.userAgent.split(' ');
        var chromeVersion = '';
        for (var i = 0; i < arr.length; i++) {
            if (/chrome/i.test(arr[i])) {
                chromeVersion = arr[i];
            }
            else if (/CriOS/i.test(arr[i])) {
                chromeVersion = arr[i];
            }
        }
        if (chromeVersion) {
            return Number(chromeVersion.split('/')[1].split('.')[0]);
        }
        else {
            return false;
        }
    };
    return NativeApi;
}());
__reflect(NativeApi.prototype, "NativeApi");
