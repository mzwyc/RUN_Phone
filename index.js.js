<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="mdui-v1.0.1/css/mdui.min.css">
    <script src="mdui-v1.0.1/js/mdui.min.js"></script>
    <title>RUN</title>
    <style>
        body {
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            margin: 0;
        }

        #statusBar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 24px;
            background: rgba(0, 0, 0, .2);
            transform: translateY(-100%);
            transition: .4s;
        }

        #dockBar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 128px;
        }

        #navBar {
            text-align: center;
            height: 48px;
            width: 100%;
            position: fixed;
            bottom: 0;
            color: #fff;
            font-size: 48px;
            transform: translateY(100%);
            transition: .3s;
            z-index: 9999;
        }

        .navButton {
            height: 48px;
            width: 30%;
            border-radius: 48px;
            display: inline-block;
            max-width: 100px;
        }

        .navButton svg {
            width: 24px;
            height: 24px;
            transform: translateY(-6.5px);
        }

        .icon {
            margin-top: 24px;
            text-align: center;
        }

        .icon-dock {
            margin-top: 8px;
            width: 64px;
            height: 64px;
        }

        .icon img {
            width: 64px;
            height: 64px;
            border-radius: 16px;
            transition: .4s;
            transform: scale(.9);
        }

        .icon img:hover {
            filter: brightness(1.5);
        }

        .icon p {
            color: #fff;
            margin: 0;
            text-shadow: 0 0 2px #000;
            font-size: 13px;
        }

        iframe {
            border: none;
            position: fixed;
            top: 28px;
            width: 100%;
            height: calc(100% - 76px);
            transform: translateY(calc(100% + 48px));
            transition-property: transform, opacity, scale;
            transition-duration: .4s, .4s, .2s;
            transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
            z-index: 9998;
            background: #fff;
        }

        .toast {
            position: fixed;
            bottom: 96px;
            background: rgba(240, 240, 240, .9);
            color: #000;
            padding: 16px 24px;
            border-radius: 32px;
            animation-name: toast;
            animation-duration: 5s;
            animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
            z-index: -1;
            opacity: 0;
            transform: scale(.85);
            max-width: 256px;
            pointer-events: none;
        }

        @keyframes toast {
            0% {
                z-index: 10000;
            }

            5% {
                z-index: 10000;
                opacity: 1;
                transform: scale(1);
            }

            95% {
                z-index: 10000;
                opacity: 1;
                transform: scale(1);
            }

            99.99% {
                z-index: 10000;
            }

            100% {}
        }

        #cover,
        #grayscale {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10001;
            pointer-events: none;
        }

        .notification {
            position: fixed;
            top: 0;
            animation-name: notification;
            animation-duration: 7s;
            z-index: 10000;
            width: 95%;
            transform: scale(1, 0);
            transform-origin: center 0;
            padding-top: 8px;
            background: #ECEFF1;
            max-width: 512px;
            border-radius: 16px;
            animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
        }

        .notification:hover {
            background-color: #EBEBEB;
        }

        @keyframes notification {
            0% {}

            5% {
                transform: scale(1) translateY(32px);
            }

            95% {
                transform: scale(1) translateY(32px);
            }

            100% {}
        }

        .mdui-theme-layout-dark .notification {
            background: #303030;
            color: #fff;
        }

        .mdui-theme-layout-dark .notification:hover {
            background: #404040;
        }

        #appList::-webkit-scrollbar-corner {
            display: none;
        }

        .mdui-dialog {
            border-radius: 24px;
            -webkit-box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12) !important;
            box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12) !important;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
            background: #ECEFF1;
        }

        .mdui-overlay {
            background: rgba(0, 0, 0, 0.3);
            transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
        }

        .mdui-dialog .mdui-btn {
            border-radius: 16px;
        }
    </style>
</head>

<body>
    <div id="customHTMLDiv"></div>
    <div id="cover"></div>
    <div id="grayscale"></div>
    <div id="statusBar" style="color: #fff;padding-top: 4px;">
        <div style="float: right;">
            <i class="mdui-icon material-icons" style="font-size: 18px;" id="WLANIcon">network_wifi</i>
            <i class="mdui-icon material-icons" style="display: inline-block;font-size: 18px;">network_cell</i>
            <i class="mdui-icon material-icons" style="display: inline-block;font-size: 18px;" id="batteryIcon"></i>
            <div id="batteryLevel" style="transform: translateY(2px);"></div>
            <div id="time" style="margin: 0 16px;display: inline-block;transform: translateY(2px);"></div>
        </div>
    </div>
    <div id="dockBar">
        <div class="mdui-container" style="padding-left: 16px;padding-right: 16px;max-width: 640px;">
            <div class="mdui-row-xs-4">
                <div class="mdui-col icon icon-dock" onclick="javascript:launchApp('images/Phone.png', 'Phone.html', '#E8EAF6', '#000', '#000');">
                    <img src="images/Phone.png">
                </div>
                <div class="mdui-col icon icon-dock" onclick="javascript:launchApp('images/MMS.png', 'MMS.html', '#E8F5E9', '#000', '#000');">
                    <img src="images/MMS.png">
                </div>
                <div class="mdui-col icon icon-dock" onclick="javascript:launchApp('images/Bing.png', 'https://www.bing.com/', '#000', '#000', '#fff');">
                    <img src="images/Bing.png">
                </div>
                <div class="mdui-col icon icon-dock" onclick="javascript:launchApp('images/AppStore.png', 'AppStore.html', '#E8EAF6', '#000', '#000');">
                    <img src="images/AppStore.png">
                </div>
            </div>
        </div>
        <div id="navBar">
            <div class="mdui-ripple mdui-ripple-white navButton" id="navBack">
                <svg>
                    <path d="M15.5417 1.66669C15.1833 1.66669 14.8417 1.76669 14.5333 1.94169L3.21667 8.74169C2.775 9.00002 2.5 9.48335 2.5 10C2.5 10.5167 2.775 11 3.21667 11.2584L14.5333 18.05C14.8417 18.2334 15.1833 18.325 15.5417 18.325C16.625 18.325 17.5 17.45 17.5 16.3667V3.62502C17.5 2.54169 16.625 1.66669 15.5417 1.66669Z" fill="rgba(255, 255, 255, .75)" />
                </svg>
            </div>
            <div class="mdui-ripple mdui-ripple-white navButton" id="navHome">
                <svg>
                    <path d="M10.0001 18.3334C5.40008 18.3334 1.66675 14.6 1.66675 10C1.66675 5.40002 5.40008 1.66669 10.0001 1.66669C14.6001 1.66669 18.3334 5.40002 18.3334 10C18.3334 14.6 14.6001 18.3334 10.0001 18.3334Z" fill="rgba(255, 255, 255, .75)" />
                </svg>
            </div>
            <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white navButton" style="position: fixed;right: 0;width: 48px;float: right;color: rgba(255, 255, 255, .75);" id="devTools">
                <i class="mdui-icon material-icons">build</i>
            </button>
        </div>
    </div>
    <div class="mdui-container mdui-center" style="padding-top: 28px;padding-left: 16px;padding-right: 16px;max-width: 640px;">
        <div class="mdui-row-xs-4" style="overflow: scroll;" id="appList">
            <div class="mdui-col icon" onclick="javascript:launchApp('images/Settings.png', 'Settings.html', '#ECEFF1', '#000', '#000');">
                <img src="images/Settings.png">
                <p>设置</p>
            </div>
            <div class="mdui-col icon" onclick="javascript:launchApp('images/Contacts.png', 'Contacts.html', '#E3F2FD', '#000', '#000');">
                <img src="images/Contacts.png">
                <p>通讯录</p>
            </div>
            <div class="mdui-col icon" onclick="javascript:launchApp('images/Files.png', 'Files.html', '#ECEFF1', '#000', '#000');">
                <img src="images/Files.png">
                <p>文件</p>
            </div>
            <div class="mdui-col icon" onclick="javascript:launchApp('images/AppStore.png', 'AppStore.html', '#E8EAF6', '#000', '#000');">
                <img src="images/AppStore.png">
                <p>应用商店</p>
            </div>
            <div class="mdui-col icon" onclick="javascript:launchApp('images/Bing.png', 'https://www.bing.com/', '#000', '#000', '#fff');">
                <img src="images/Bing.png">
                <p>Bing</p>
            </div>
            <div class="mdui-col icon" onclick="javascript:launchApp('images/BGTool.jpg', 'https://www.bgtool.tk/', '#ECEFF1', '#000', '#000');">
                <img src="images/BGTool.jpg">
                <p>BGTool</p>
            </div>
            <div id="userApps"></div>
        </div>
    </div>
    <iframe id="iframe_A" style="opacity: 0;z-index: 9998;"></iframe>
    <iframe id="iframe_B" style="opacity: 0;z-index: 9997;"></iframe>
    <iframe id="iframe_base" style="z-index: 9996;" src="splash.html"></iframe>
    <div class="mdui-dialog" id="appInstaller">
        <div class="mdui-dialog-title">
            <img id="installerIcon" style="display: inline-block;width: 32px;height: 32px;border-radius: 8px;vertical-align: middle;">
            <div id="installerName" style="display: inline-block;vertical-align: middle;margin-left: 4px;"></div>
        </div>
        <div class="mdui-dialog-content">要添加此应用吗？</div>
        <div class="mdui-dialog-actions">
            <button class="mdui-btn mdui-ripple mdui-text-color-blue-accent" mdui-dialog-close>取消</button>
            <button class="mdui-btn mdui-ripple mdui-text-color-blue-accent" id="installerContinue" mdui-dialog-close>添加</button>
        </div>
    </div>
    <div class="mdui-dialog" id="appUninstaller">
        <div class="mdui-dialog-title">
            <img id="uninstallerIcon" style="display: inline-block;width: 32px;height: 32px;border-radius: 8px;vertical-align: middle;">
            <div id="uninstallerName" style="display: inline-block;vertical-align: middle;margin-left: 4px;"></div>
        </div>
        <div class="mdui-dialog-content">要移除此应用吗？</div>
        <div class="mdui-dialog-actions">
            <button class="mdui-btn mdui-ripple mdui-text-color-blue-accent" mdui-dialog-close>取消</button>
            <button class="mdui-btn mdui-ripple mdui-text-color-blue-accent" id="uninstallerContinue" mdui-dialog-close>移除</button>
        </div>
    </div>
    <script>
        //设置默认 iframe
        currentIframe = gebi("iframe_A");
        //设置应用打开状态
        opened = 0;
        //设置历史记录相关数据
        keepHistory = 1;
        switchedApp = 0;
        recent = [];
        //函数：通过 ID 获取元素
        function gebi(id) {
            return document.getElementById(id);
        }
        //事件：页面加载完成
        window.onload = function() {
            //延时执行：显示状态栏与导航栏
            window.setTimeout(function() {
                gebi("statusBar").style.transform = "translateY(0)";
                gebi("navBar").style.transform = "translateY(0)";
            }, 500);
            //重复执行：
            window.setInterval(function() {
                //刷新时间
                var d = new Date();
                var h = d.getHours().toString().padStart(2, '0');
                var m = d.getMinutes().toString().padStart(2, '0');
                if (localStorage.getItem("displaySeconds") == 1) {
                    var s = d.getSeconds().toString().padStart(2, '0');
                    gebi("time").innerText = h + ":" + m + ":" + s;
                } else {
                    gebi("time").innerText = h + ":" + m;
                }
                //刷新深色主题
                if (localStorage.getItem("darkTheme") == "true") {
                    gebi("iframe_A").style.background = "#303030";
                    gebi("iframe_B").style.background = "#303030";
                    gebi("iframe_base").style.background = "#303030";
                    document.body.classList.add("mdui-theme-layout-dark");
                } else {
                    gebi("iframe_A").style.background = "#fff";
                    gebi("iframe_B").style.background = "#fff";
                    gebi("iframe_base").style.background = "#fff";
                    document.body.classList.remove("mdui-theme-layout-dark");
                }
            }, 100);
            //获取设置数据与基本信息
            getBatteryInfo();
            getBrightness();
            getWallpaper();
            getDockBarInfo();
            getCustomHTML();
            getInvert();
            setAppList();
            freshApps();
            getGrayscale();
            getDevTools();
            evalCustomScripts();
            if (localStorage.getItem("updateNotification") == 1) {
                checkUpdate();
            }
            if (navigator.onLine) {
                gebi("WLANIcon").style.display = "inline-block";
            } else {
                gebi("WLANIcon").style.display = "none";
                notice(`<i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-blue-grey mdui-text-color-white">signal_wifi_off</i>`, "网络连接已断开", "当前处于离线状态", `function() {
                    alert("联网功能暂不可用。\\n请检查您的网络连接。");
                }`);
            }
        };
        //函数：启动应用
        function launchApp(icon, url, color1, color2, textColor) {
            gebi("iframe_A").style.transitionDuration = "0s";
            gebi("iframe_A").style.opacity = 0;
            gebi("iframe_B").style.transitionDuration = "0s";
            gebi("iframe_B").style.opacity = 0;
            gebi("iframe_base").contentWindow.document.getElementById("splashImg").src = icon;
            gebi("iframe_base").contentWindow.document.getElementById("splashImg").style.display = "block";
            gebi("iframe_A").style.transform = "translateY(0)";
            gebi("iframe_B").style.transform = "translateY(0)";
            gebi("iframe_base").style.transform = "translateY(0)";
            window.setTimeout(function() {
                currentIframe.style.transitionDuration = ".4s";
                currentIframe.style.opacity = 1;
                gebi("statusBar").style.background = color1;
                gebi("statusBar").style.color = textColor;
                currentIframe.src = url;
                window.setTimeout(function() {
                    gebi("iframe_base").contentWindow.document.getElementById("splashImg").style.display = "none";
                }, 400);
            }, 450);
            if (localStorage.getItem("darkTheme") == "true") {
                gebi("statusBar").style.background = "#303030";
                gebi("statusBar").style.color = "#fff";
            } else {
                gebi("statusBar").style.background = "#fff";
                gebi("statusBar").style.color = "#000";
            }
            gebi("navBar").style.background = color2;
            opened = 1;
            getDevTools();
        }
        //事件：主页键被点击
        gebi("navHome").onclick = function() {
            gebi("iframe_A").style.transform = "translateY(calc(100% + 48px))";
            gebi("iframe_B").style.transform = "translateY(calc(100% + 48px))";
            gebi("iframe_base").style.transform = "translateY(calc(100% + 48px))";
            window.setTimeout(function() {
                gebi("iframe_A").src = "about:blank";
                gebi("iframe_B").src = "about:blank";
            }, 400);
            gebi("statusBar").style.background = "";
            gebi("navBar").style.background = "";
            gebi("statusBar").style.color = "#fff";
            gebi("navBar").style.color = "";
            document.title = "Launcher";
            opened = 0;
            recent = [];
            getDevTools();
        };
        //事件：返回键被点击
        gebi("navBack").onclick = function() {
            if (opened == 1) {
                if (recent[recent.length - 2] == undefined) {
                    gebi("navHome").click();
                } else {
                    keepHistory = 0;
                    if (recent[recent.length - 1][1] == 1) {
                        switchActivity(recent[recent.length - 2][0], true, true);
                    } else {
                        switchActivity(recent[recent.length - 2][0], true, false);
                    }
                    recent.splice(recent.length - 1, 1);
                }
            }
        };
        //事件：iframe 加载完成
        gebi("iframe_A").onload = function() {
            if (this.contentWindow.document.title != "" && currentIframe == this) {
                document.title = this.contentWindow.document.title;
                if (keepHistory == 1) {
                    recent.push([this.contentWindow.location.href, switchedApp]);
                    if (switchedApp == 1) {
                        switchedApp = 0;
                    }
                } else {
                    keepHistory = 1;
                }
            }
        };
        gebi("iframe_B").onload = function() {
            if (this.contentWindow.document.title != "" && currentIframe == this) {
                document.title = this.contentWindow.document.title;
                if (keepHistory == 1) {
                    recent.push([this.contentWindow.location.href, switchedApp]);
                    if (switchedApp == 1) {
                        switchedApp = 0;
                    }
                } else {
                    keepHistory = 1;
                }
            }
        };
        //函数：发送 Toast
        function toast(message) {
            //若已有 Toast 在显示，则将它们隐藏
            for (i = 0; i < document.getElementsByClassName("toast").length; i++) {
                document.getElementsByClassName("toast")[i].style.display = "none";
            }
            //创建 Toast 元素并显示
            var toastDiv = document.createElement("div");
            toastDiv.innerText = message;
            toastDiv.classList.add("toast", "mdui-shadow-6");
            document.body.appendChild(toastDiv);
            //将所有 Toast 居中显示
            for (i = 0; i < document.getElementsByClassName("toast").length; i++) {
                document.getElementsByClassName("toast")[i].style.left = "calc(50% - " + Number(document.getElementsByClassName("toast")[i].clientWidth / 2) + "px)";
            }
            //延时执行：隐藏 Toast 元素
            window.setTimeout(function() {
                document.body.removeChild(toastDiv);
            }, 5000);
        }
        //函数：发送通知，实现方法与 Toast 类似
        function notice(icon, title, content, clickFunc) {
            for (i = 0; i < document.getElementsByClassName("notification").length; i++) {
                document.getElementsByClassName("notification")[i].style.display = "none";
            }
            var notificationDiv = document.createElement("li");
            notificationDiv.innerHTML = icon + `<div class="mdui-list-item-content">
            <div class="mdui-list-item-title">` + title + `</div>
            <div class="mdui-list-item-text">` + content + `</div>
            </div>`;
            notificationDiv.classList.add("notification", "mdui-shadow-9", "mdui-ripple", "mdui-list-item");
            //设置通知回调
            notificationDiv.onclick = function() {
                eval('(' + clickFunc + ')();');
                for (i = 0; i < document.getElementsByClassName("notification").length; i++) {
                    document.getElementsByClassName("notification")[i].style.display = "none";
                }
            };
            document.body.appendChild(notificationDiv);
            for (i = 0; i < document.getElementsByClassName("notification").length; i++) {
                document.getElementsByClassName("notification")[i].style.left = "calc(50% - " + Number(document.getElementsByClassName("notification")[i].clientWidth / 2) + "px)";
            }
            window.setTimeout(function() {
                document.body.removeChild(notificationDiv);
            }, 7000);
        }
        //事件：收到来自其他页面的消息
        window.addEventListener("message", function(e) {
            if (e.data == "") return;
            var getData = JSON.parse(e.data);
            switch (getData.type) {
                //API：发送 Toast
                case "toast":
                    if (localStorage.getItem("API_postToast") == 1) {
                        toast(getData.message);
                    }
                    break;
                    //API：发送通知
                case "notification":
                    if (localStorage.getItem("API_postNotification") == 1) {
                        notice(getData.icon, getData.title, getData.content, getData.clickFunc);
                    }
                    break;
                    //API：执行 JavaScript 脚本
                case "JavaScript":
                    if (localStorage.getItem("API_postScript") == 1) {
                        eval('(' + getData.script + ')();');
                    }
                    break;
                    //API：切换应用
                case "switchApp":
                    if (localStorage.getItem("API_switchApp") == 1) {
                        switchApp(getData.url, getData.color1, getData.color2, getData.textColor, getData.back);
                    }
                    break;
                    //API：切换活动
                case "switchActivity":
                    if (localStorage.getItem("API_switchActivity") == 1) {
                        switchActivity(getData.url, getData.back);
                    }
                    break;
                    //API：添加应用
                case "addApp":
                    if (localStorage.getItem("API_addApp") == 1) {
                        addApp(getData.icon, getData.name, getData.url, getData.color1, getData.color2, getData.textColor);
                    }
                    break;
                    //API：移除应用
                case "removeApp":
                    if (localStorage.getItem("API_removeApp") == 1) {
                        removeApp(getData.index);
                    }
            }
        }, false);
        //事件：屏幕方向改变
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
            /*隐藏所有通知
            经过测试，如果这里对通知重新进行定位，在某些设备上就会表现异常
            有时间我会寻找其他方法来代替*/
            for (i = 0; i < document.getElementsByClassName("notification").length; i++) {
                document.getElementsByClassName("notification")[i].style.display = "none";
            }
        }, false);
        //自动处理某些设置项
        if (!localStorage.getItem("displaySeconds")) {
            localStorage.setItem("displaySeconds", 0);
        }
        if (!localStorage.getItem("brightness")) {
            localStorage.setItem("brightness", 1);
        }
        if (!localStorage.getItem("displayBatteryLevel")) {
            localStorage.setItem("displayBatteryLevel", 1);
        }
        if (!localStorage.getItem("wallpaper")) {
            localStorage.setItem("wallpaper", "images/default_wallpaper.png");
        }
        if (!localStorage.getItem("transparentDockBar")) {
            localStorage.setItem("transparentDockBar", 0);
        }
        if (!localStorage.getItem("customHTML")) {
            localStorage.setItem("customHTML", "");
        }
        if (!localStorage.getItem("updateNotification")) {
            localStorage.setItem("updateNotification", 1);
        }
        if (!localStorage.getItem("invert")) {
            localStorage.setItem("invert", 0);
        }
        if (!localStorage.getItem("apps")) {
            localStorage.setItem("apps", "[]");
        }
        if (!localStorage.getItem("grayscale")) {
            localStorage.setItem("grayscale", 0);
        }
        if (!localStorage.getItem("displayDevTools")) {
            localStorage.setItem("displayDevTools", 0);
        }
        //API 控制设置
        APIs = ["API_postToast", "API_postNotification", "API_postScript", "API_switchApp", "API_switchActivity", "API_addApp", "API_removeApp"];
        APIs.forEach(function(item) {
            if (!localStorage.getItem(item)) {
                localStorage.setItem(item, 1);
            }
        });
        //设置是否已提示“电池电量不足”
        batteryAlerted = 0;
        //函数：获取电池信息
        function getBatteryInfo() {
            navigator.getBattery().then(function(battery) {
                if (battery.charging) {
                    //情况 1：正在充电
                    gebi("batteryIcon").innerText = "battery_charging_full";
                    gebi("batteryIcon").classList.remove("mdui-text-color-red");
                    batteryAlerted = 0;
                } else {
                    if (battery.level <= 0.2) {
                        //情况 2：未在充电且电池电量不高于 20%
                        gebi("batteryIcon").innerText = "battery_alert";
                        gebi("batteryIcon").classList.add("mdui-text-color-red");
                        if (batteryAlerted == 0) {
                            notice(`<i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-blue-grey mdui-text-color-white">battery_alert</i>`, "电池电量不足", "仅剩 " + (battery.level * 100).toFixed(0) + "%", `function() {
                                alert("电池电量不高于 20% 时会发送此通知。\\n请及时进行充电。");}`);
                            batteryAlerted = 1;
                        }
                    } else {
                        //情况 3：未在充电且电池电量高于 20%
                        gebi("batteryIcon").innerText = "battery_full";
                        gebi("batteryIcon").classList.remove("mdui-text-color-red");
                        batteryAlerted = 0;
                    }
                }
                //确定是否显示电池电量
                if (localStorage.getItem("displayBatteryLevel") == 1) {
                    gebi("batteryLevel").style.display = "inline-block";
                    gebi("batteryLevel").innerText = (battery.level * 100).toFixed(0) + "%";
                } else {
                    gebi("batteryLevel").style.display = "none";
                }
            });
        }
        //事件：电池信息改变
        navigator.getBattery().then(function(battery) {
            battery.onlevelchange = function() {
                getBatteryInfo();
            };
            battery.onchargingchange = function() {
                getBatteryInfo();
            };
        });
        //获取并设置屏幕亮度
        function getBrightness() {
            gebi("cover").style.background = "rgba(0, 0, 0, " + (1 - localStorage.getItem("brightness")) + ")";
        }
        //获取并设置颜色反转
        function getInvert() {
            if (localStorage.getItem("invert") == 1) {
                gebi("cover").style.backdropFilter = "invert(1)";
            } else {
                gebi("cover").style.backdropFilter = "";
            }
        }
        //获取并设置灰度
        function getGrayscale() {
            if (localStorage.getItem("grayscale") == 1) {
                gebi("grayscale").style.backdropFilter = "grayscale(1)";
            } else {
                gebi("grayscale").style.backdropFilter = "";
            }
        }
        //事件：网络状态改变
        window.addEventListener("offline", function() {
            gebi("WLANIcon").style.display = "none";
            notice(`<i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-blue-grey mdui-text-color-white">signal_wifi_off</i>`, "网络连接已断开", "当前处于离线状态", `function() {
                alert("联网功能暂不可用。\\n请检查您的网络连接。");
            }`);
        });
        window.addEventListener("online", function() {
            gebi("WLANIcon").style.display = "inline-block";
            notice(`<i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-blue-grey mdui-text-color-white">network_wifi</i>`, "网络已连接", "已恢复在线状态", `function() {
                alert("联网功能可正常使用。");
            }`);
        });
        //获取并设置壁纸
        function getWallpaper() {
            document.body.style.backgroundImage = "url(" + localStorage.getItem("wallpaper") + ")";
        }
        //函数：获取 Dock 栏设置
        function getDockBarInfo() {
            if (localStorage.getItem("transparentDockBar") == 1) {
                gebi("dockBar").style.background = "";
            } else {
                gebi("dockBar").style.background = "rgba(255, 255, 255, .2)";
            }
        }
        /*全屏显示与退出全屏
        本源码来自：https://www.php.cn/article/397034.html */
        function requestFullScreen(element) {
            //判断各种浏览器，找到正确的方法
            var requestMethod = element.requestFullScreen || //W3C
                element.webkitRequestFullScreen || //Chrome等
                element.mozRequestFullScreen || //FireFox
                element.msRequestFullScreen; //IE11
            if (requestMethod) {
                requestMethod.call(element);
            } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }

        function exitFull() {
            //判断各种浏览器，找到正确的方法
            var exitMethod = document.exitFullscreen || //W3C
                document.mozCancelFullScreen || //Chrome等
                document.webkitExitFullscreen || //FireFox
                document.webkitExitFullscreen; //IE11
            if (exitMethod) {
                exitMethod.call(document);
            } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }
        //函数：获取自定义 HTML 代码
        function getCustomHTML() {
            gebi("customHTMLDiv").innerHTML = localStorage.getItem("customHTML");
        }
        //函数：处理更新数据
        function processUpdate() {
            //判断是否为最新版本
            if (versionCode < updateData.versionCode) {
                notice(`<i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-blue-grey mdui-text-color-white">system_update</i>`, "有可用的系统更新", updateData.versionName + " 版本已发布", function() {
                    if (opened == 1) {
                        switchActivity("Update.html", false, true);
                    } else {
                        launchApp("images/Update.png", "Update.html", "#1976D2", "#000", "#fff", "#fff");
                    }
                });
            }
        }
        //屏蔽右键菜单
        document.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        });
        //确定图标列表最大高度
        function setAppList() {
            gebi("appList").style.maxHeight = document.documentElement.clientHeight - 156 + "px";
        }
        //事件：屏幕方向改变
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
            window.setTimeout(function() {
                setAppList();
            }, 500);
        }, false);
        //函数：添加应用
        function addApp(icon, name, url, color1, color2, textColor) {
            gebi("iframe_A").style.transform = "translateY(calc(100% + 48px))";
            gebi("iframe_B").style.transform = "translateY(calc(100% + 48px))";
            gebi("iframe_base").style.transform = "translateY(calc(100% + 48px))";
            gebi("statusBar").style.transform = "translateY(-100%)";
            gebi("navBar").style.transform = "translateY(100%)";
            var installingInfo = [icon, name, url, color1, color2, textColor];
            var installerDialog = new mdui.Dialog("#appInstaller", {
                history: false
            });
            installerDialog.open();
            gebi("installerIcon").src = icon;
            gebi("installerName").innerText = name;
            gebi("installerContinue").onclick = function() {
                apps.push(installingInfo);
                localStorage.setItem("apps", JSON.stringify(apps));
                toast("已添加应用。");
                freshApps();
            };
        }
        //函数：移除应用
        function removeApp(index) {
            gebi("iframe_A").style.transform = "translateY(calc(100% + 48px))";
            gebi("iframe_B").style.transform = "translateY(calc(100% + 48px))";
            gebi("iframe_base").style.transform = "translateY(calc(100% + 48px))";
            gebi("statusBar").style.transform = "translateY(-100%)";
            gebi("navBar").style.transform = "translateY(100%)";
            var uninstallerDialog = new mdui.Dialog("#appUninstaller", {
                history: false
            });
            uninstallerDialog.open();
            gebi("uninstallerIcon").src = apps[index][0];
            gebi("uninstallerName").innerText = apps[index][1];
            gebi("uninstallerContinue").onclick = function() {
                apps.splice(index, 1);
                localStorage.setItem("apps", JSON.stringify(apps));
                toast("已移除应用。");
                freshApps();
            };
        }
        //函数：刷新应用图标
        function freshApps() {
            if (JSON.parse(localStorage.getItem("apps")).length == 0) {
                apps = [];
            } else {
                apps = JSON.parse(localStorage.getItem("apps"));
            }
            gebi("userApps").innerHTML = "";
            apps.forEach(function(item) {
                gebi("userApps").innerHTML += `<div class="mdui-col icon" onclick="javascript:launchApp('` + item[0] + `', '` + item[2] + `', '` + item[3] + `', '` + item[4] + `', '` + item[5] + `');">
                    <img src="` + item[0] + `">
                    <p>` + item[1] + `</p>
                </div>`;
            });
        }
        //事件：调试面板按钮被点击
        gebi("devTools").onclick = function() {
            if (navigator.onLine) {
                currentIframe.src = `javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); } })();`;
                toast("正在向嵌入页载入调试面板......");
            } else {
                toast("当前处于离线状态");
            }
        };
        //函数：获取调试面板按钮显示设置
        function getDevTools() {
            if (localStorage.getItem("displayDevTools") == 1 && opened == 1) {
                gebi("devTools").style.display = "inline-block";
            } else {
                gebi("devTools").style.display = "none";
            }
        }
        //函数：切换活动
        function switchActivity(url, back, app = false) {
            if (currentIframe == gebi("iframe_A")) {
                oldIframe = gebi("iframe_A");
                newIframe = gebi("iframe_B");
            } else {
                oldIframe = gebi("iframe_B");
                newIframe = gebi("iframe_A");
            }
            var translate = back == true ? 33.33 : -33.33;
            newIframe.src = url;
            window.setTimeout(function() {
                oldIframe.src = "about:blank";
            }, 400);
            if (app == true) {
                gebi("iframe_base").style.transitionDuration = "0s";
                gebi("iframe_base").style.opacity = 0;
                oldIframe.style.zIndex = 9997;
                oldIframe.style.transform = "translateX(" + translate * 3.25 + "%)";
                oldIframe.style.scale = .85;
                newIframe.style.zIndex = 9998;
                newIframe.style.transitionDuration = "0s";
                newIframe.style.opacity = 1;
                newIframe.style.transform = "translateX(" + (-translate * 3.25) + "%)";
                newIframe.style.scale = .85;
                window.setTimeout(function() {
                    newIframe.style.transitionDuration = ".4s";
                    newIframe.style.transform = "translateX(0)";
                    window.setTimeout(function() {
                        oldIframe.style.scale = 1;
                        newIframe.style.scale = 1;
                    }, 200);
                }, 10);
                switchedApp = 1;
                window.setTimeout(function() {
                    gebi("iframe_base").style.opacity = 1;
                    gebi("iframe_base").style.transitionDuration = ".4s";
                }, 400);
            } else {
                oldIframe.style.opacity = 0;
                oldIframe.style.zIndex = 9997;
                oldIframe.style.transform = "translateX(" + translate + "%)";
                newIframe.style.zIndex = 9998;
                newIframe.style.transitionDuration = "0s";
                newIframe.style.opacity = 0;
                newIframe.style.transform = "translateX(" + (-translate) + "%)";
                window.setTimeout(function() {
                    newIframe.style.transitionDuration = ".4s";
                    newIframe.style.opacity = 1;
                    newIframe.style.transform = "translateX(0)";
                }, 10);
                switchedApp = 0;
            }
            currentIframe = newIframe;
        }
        //函数：切换应用
        function switchApp(url, color1, color2, textColor, back) {
            gebi("statusBar").style.background = color1;
            gebi("navBar").style.background = color2;
            gebi("statusBar").style.color = textColor;
            switchActivity(url, back, true);
        }
        //函数：执行自定义 HTML 代码中的 JavaScript 脚本
        function evalCustomScripts() {
            var customScripts = document.getElementById("customHTMLDiv").getElementsByTagName("script");
            for (var i = 0; i < customScripts.length; i++) {
                eval(customScripts[i].innerHTML);
            }
        }
        //事件：添加应用对话框结束关闭动画
        gebi("appInstaller").addEventListener("closed.mdui.dialog", function() {
            gebi("iframe_A").style.transform = "translateY(0)";
            gebi("iframe_B").style.transform = "translateY(0)";
            gebi("iframe_base").style.transform = "translateY(0)";
            gebi("statusBar").style.transform = "translateY(0)";
            gebi("navBar").style.transform = "translateY(0)";
        });
        //事件：移除应用对话框结束关闭动画
        gebi("appUninstaller").addEventListener("closed.mdui.dialog", function() {
            gebi("iframe_A").style.transform = "translateY(0)";
            gebi("iframe_B").style.transform = "translateY(0)";
            gebi("iframe_base").style.transform = "translateY(0)";
            gebi("statusBar").style.transform = "translateY(0)";
            gebi("navBar").style.transform = "translateY(0)";
        });
    </script>
    <script src="eruda/eruda.js"></script>
    <script src="Update.js"></script>
</body>

</html>