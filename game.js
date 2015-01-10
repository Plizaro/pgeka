function SimpleText(a, c, e) {
    this.font = a;
    this.y = this.x = 0;
    this.width = c;
    this.height = e;
    this.align = SimpleText.ALIGN_LEFT;
    this.charSpacing = this.rotation = 0;
    this.opacity = this.scale = 1;
    this.static = !1;
    this.charMap = "0123456789".split("");
    this.charWidth = [];
    this.sprites = [];
    this.text = "";
    this.parent = this.stage = window.stage;
    this.ALIGN_LEFT = SimpleText.ALIGN_LEFT;
    this.ALIGN_RIGHT = SimpleText.ALIGN_RIGHT;
    this.ALIGN_CENTER = SimpleText.ALIGN_CENTER
}
SimpleText.prototype.manageSprites = function(a) {
    var c, e = a.length,
        f = this.sprites.length;
    if (f < e)
        for (a = 0; a < e - f; a++) c = new window[SimpleText.spriteClass](this.font, this.width, this.height, this.charMap.length), this.sprites.push(c), this.parent.addChild(c);
    if (f > e) {
        for (a = 0; a < f - e; a++) this.parent.removeChild(this.sprites[a]);
        this.sprites.splice(0, f - e)
    }
};
SimpleText.prototype.getCharIx = function(a) {
    for (var c = 0; c < this.charMap.length; c++)
        if (this.charMap[c] == a) return c;
    return -1
};
SimpleText.prototype.getCharWidth = function(a) {
    a = this.getCharIx(a);
    return 0 <= a ? this.charWidth[a] ? this.charWidth[a] : this.width : this.width
};
SimpleText.prototype.getWidth = function() {
    for (var a = 0, c = 0; c < this.text.length; c++) a += this.getCharWidth(this.text.substr(c, 1)) + this.charSpacing;
    return a
};
SimpleText.prototype.write = function(a) {
    var c, e, f, g;
    this.text = a += "";
    this.manageSprites(a);
    c = this.x;
    this.align == SimpleText.ALIGN_CENTER && (c = this.x - this.getWidth() / 2 * this.scale + this.getCharWidth(this.text.substr(0, 1)) / 2 * this.scale);
    this.align == SimpleText.ALIGN_RIGHT && (c = this.x - this.getWidth() * this.scale);
    f = new Vector(c - this.x, 0);
    f.rotate(-this.rotation);
    c = f.x + this.x;
    e = f.y + this.y;
    f = new Vector(0, 0);
    for (var h = 0; h < a.length; h++)
        if (this.sprites[h].visible = !0, g = this.charMap.indexOf(a.substr(h, 1)), 0 > g) this.sprites[h].visible = !1;
        else {
            var k = this.getCharWidth(this.text.substr(h, 1));
            this.sprites[h].scaleX = this.sprites[h].scaleY = this.scale;
            this.sprites[h].gotoAndStop(g);
            g = f.clone();
            g.x *= this.scale;
            g.rotate(-this.rotation);
            this.sprites[h].x = g.x + ("," == this.text.substr(h, 1) ? c - k / 2 : c);
            this.sprites[h].y = g.y + e;
            this.sprites[h].rotation = this.rotation;
            this.sprites[h].static = this.static;
            this.sprites[h].opacity = this.opacity;
            this.sprites[h].gx = this.sprites[h].x;
            this.sprites[h].gy = this.sprites[h].y;
            this.sprites[h].gscaleX = this.sprites[h].scaleX;
            this.sprites[h].gscaleY = this.sprites[h].scaleY;
            this.sprites[h].grotation = this.sprites[h].rotation;
            this.sprites[h].gopacity = this.sprites[h].opacity;
            f.x += k + this.charSpacing
        }
};
SimpleText.prototype.refresh = function() {
    this.write(this.text)
};
SimpleText.prototype.addToGroup = function(a) {
    for (var c = 0; c < this.sprites.length; c++) this.sprites[c].gx = this.sprites[c].x / 2, this.sprites[c].gy = this.sprites[c].y, a.addChild(this.sprites[c], !1)
};
SimpleText.prototype.putToGroup = function(a) {
    for (var c = 0; c < this.sprites.length; c++) this.sprites[c].gx = this.sprites[c].x, this.sprites[c].gy = this.sprites[c].y, a.addChild(this.sprites[c], !1)
};
SimpleText.prototype.refreshOnTween = function(a) {
    a.target.obj.refresh()
};
SimpleText.prototype.setPosition = function(a, c) {
    this.x = a;
    this.y = c;
    this.refresh()
};
SimpleText.prototype.removeTweens = function() {
    this.stage && this.stage.clearObjectTweens(this)
};
SimpleText.prototype.addTween = function(a, c, e, f, g, h) {
    if (this.stage) {
        var k = this[a];
        if (!isNaN(k)) return a = this.stage.createTween(this, a, k, c, e, f), a.onchange = h, a.onfinish = g, a
    }
};
SimpleText.prototype.moveTo = function(a, c, e, f, g, h) {
    e = ~~e;
    if (0 >= e) this.setPosition(a, c);
    else {
        if (a = this.addTween("x", a, e, f, g, h)) a.play(), a.addEventListener("change", this.refreshOnTween);
        (c = this.addTween("y", c, e, f, a ? null : g, a ? null : h)) && c.play();
        c && !a && c.addEventListener("change", this.refreshOnTween)
    }
    return this
};
SimpleText.prototype.moveBy = function(a, c, e, f, g, h) {
    return this.moveTo(this.x + a, this.y + c, e, f, g, h)
};
SimpleText.prototype.fadeTo = function(a, c, e, f, g) {
    c = ~~c;
    if (0 >= c) this.opacity = a;
    else if (a = this.addTween("opacity", a, c, e, f, g)) a.play(), a.addEventListener("change", this.refreshOnTween);
    return this
};
SimpleText.prototype.fadeBy = function(a, c, e, f, g) {
    a = Math.max(0, Math.min(1, this.opacity + a));
    return this.fadeTo(a, c, e, f, g)
};
SimpleText.prototype.rotateTo = function(a, c, e, f, g) {
    c = ~~c;
    if (0 >= c) this.rotation = a;
    else if (a = this.addTween("rotation", a, c, e, f, g)) a.play(), a.addEventListener("change", this.refreshOnTween);
    return this
};
SimpleText.prototype.rotateBy = function(a, c, e, f, g) {
    return this.rotateTo(this.rotation + a, c, e, f, g)
};
SimpleText.prototype.scaleTo = function(a, c, e, f, g) {
    c = ~~c;
    if (0 >= c) this.scale = a;
    else if (a = this.addTween("scale", a, c, e, f, g)) a.play(), a.addEventListener("change", this.refreshOnTween);
    return this
};
SimpleText.spriteClass = "Sprite";
SimpleText.ALIGN_LEFT = 0;
SimpleText.ALIGN_RIGHT = 1;
SimpleText.ALIGN_CENTER = 2;
var CRENDER_DEBUG = !1;
"undefined" == typeof window.console && (window.console = {
    log: function() {}
});
var Utils = {};
Utils.touchScreen = "ontouchstart" in window;
Utils.globalScale = 1;
Utils.globalPixelScale = 1;
Utils.isWindowHidden = !1;
Utils.DOMMainContainerId = "main_container";
Utils.DOMProgressContainerId = "progress_container";
Utils.DOMProgressId = "progress";
Utils.DOMScreenBackgroundContainerId = "screen_background_container";
Utils.DOMScreenBackgroundWrapperId = "screen_background_wrapper";
Utils.DOMScreenBackgroundId = "screen_background";
Utils.DOMScreenContainerId = "screen_container";
Utils.DOMScreenWrapperId = "screen_wrapper";
Utils.DOMScreenId = "screen";
Utils.DOMP2lContainerId = "p2l_container";
Utils.DOMP2lId = "p2l";
Utils.DOMMarkId = "mark";
Utils.setCookie = function(a, c) {
    try {
        window.localStorage.setItem(a, c)
    } catch (e) {
        var f = new Date;
        f.setDate(f.getDate() + 3650);
        document.cookie = a + "=" + c + "; expires=" + f.toUTCString()
    }
};
Utils.getCookie = function(a) {
    var c;
    try {
        c = window.localStorage.getItem(a)
    } catch (e) {
        a += "=";
        c = document.cookie.indexOf(a);
        if (-1 == c) return null;
        var f = document.cookie.indexOf(";", c + a.length); - 1 == f && (f = document.cookie.length);
        c = unescape(document.cookie.substring(c + a.length, f))
    }
    return c
};
Utils.bindEvent = function(a, c, e) {
    a.addEventListener ? a.addEventListener(c, e, !1) : a.attachEvent && a.attachEvent("on" + c, e)
};
Utils.getObjectLeft = function(a) {
    var c = a.offsetLeft;
    a.offsetParent && (c += Utils.getObjectLeft(a.offsetParent));
    return c
};
Utils.getObjectTop = function(a) {
    var c = a.offsetTop;
    a.offsetParent && (c += Utils.getObjectTop(a.offsetParent));
    return c
};
Utils.parseGet = function() {
    var a = {},
        c = window.location.toString(),
        e = window.location.toString().indexOf("?");
    if (0 <= e)
        for (var c = c.substr(e + 1, c.length), e = c.split("&"), f = 0; f < e.length; f++) c = e[f].split("="), a[c[0]] = c[1];
    return a
};
Utils.getMouseCoord = function(a, c) {
    var e = a || window.event;
    e.touches && (e = e.touches[0]);
    if (!e) return {
        x: 0,
        y: 0
    };
    var f = 0,
        g = 0,
        h = 0,
        k = 0;
    c && (f = Utils.getObjectLeft(c), g = Utils.getObjectTop(c));
    if (e.pageX || e.pageY) h = e.pageX, k = e.pageY;
    else if (e.clientX || e.clientY) h = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft, k = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
    return {
        x: h - f,
        y: k - g
    }
};
Utils.removeFromArray = function(a, c) {
    for (var e = [], f = 0; f < a.length; f++) a[f] != c && e.push(a[f]);
    return e
};
Utils.showLoadProgress = function(a) {
    var c = Utils.globalScale,
        e;
    e = "Loading: " + a + "%<br><br>";
    e += '<div style="display: block; background: #000; width: ' + a * c * 2 + "px; height: " + 10 * c + 'px;">&nbsp;</div>';
    document.getElementById(Utils.DOMProgressId).innerHTML = e
};
Utils.hideAddressBarLock = !1;
Utils.mobileHideAddressBar = function() {
    Utils.hideAddressBarLock || window.scrollTo(0, 1)
};
Utils.mobileCheckIphone4 = function() {
    return Utils.touchScreen && 0 <= navigator.userAgent.indexOf("iPhone") && 2 == window.devicePixelRatio
};
Utils.mobileCheckBrokenAndroid = function() {
    return Utils.touchScreen && Utils.isAndroid() && !Utils.isChrome() && !Utils.isFirefox()
};
Utils.mobileCheckSlowDevice = function() {
    return Utils.mobileCheckBrokenAndroid() && 0 <= navigator.userAgent.toLowerCase().indexOf("sm-t310") || Utils.touchScreen && Utils.isAndroid() && Utils.isFirefox() && 0 <= navigator.userAgent.toLowerCase().indexOf("sm-t310")
};
Utils.isChrome = function() {
    var a = !1;
    0 <= navigator.userAgent.toLowerCase().indexOf("chrome") && (a = !0, Utils.isAndroid() && 22 > (parseInt((/Chrome\/([0-9]+)/.exec(navigator.appVersion) || 0)[1], 10) || 0) && (a = !1));
    return a
};
Utils.isAndroid = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("android")
};
Utils.isIOS = function() {
    return navigator.userAgent.toLowerCase().match(/(ipad|iphone|ipod)/g) ? !0 : !1
};
Utils.isPlayFreeBrowser = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("playfreebrowser")
};
Utils.isFirefox = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("firefox")
};
Utils.checkSpilgamesEnvironment = function() {
    return "undefined" != typeof window.ExternalAPI && "Spilgames" == ExternalAPI.type && ExternalAPI.check()
};
Utils.mobileCorrectPixelRatio = function() {
    var a = document.createElement("meta");
    a.name = "viewport";
    var c = "target-densitydpi=device-dpi, user-scalable=0";
    Utils.isPlayFreeBrowser() && (c += ", width=device-width, height=device-height");
    var e = 1 / (window.devicePixelRatio ? window.devicePixelRatio : 1),
        e = e.toFixed(2);
    a.content = c + (", initial-scale=" + e + ", maximum-scale=" + e + ", minimum-scale=" + e);
    document.getElementsByTagName("head")[0].appendChild(a)
};
Utils.getMobileScreenResolution = function(a) {
    var c = 1,
        e = window.innerWidth,
        f = window.innerHeight;
    e && f || (e = screen.width, f = screen.height);
    var g = [{
            scale: 1,
            width: 320,
            height: 480
        }, {
            scale: 1.5,
            width: 480,
            height: 720
        }, {
            scale: 2,
            width: 640,
            height: 960
        }],
        h = {
            width: 0,
            height: 0
        },
        k = "";
    Utils.touchScreen ? (h.width = Math.min(e, f), h.height = Math.max(e, f)) : (a && (g = [{
        scale: 1,
        width: 480,
        height: 320
    }, {
        scale: 1.5,
        width: 720,
        height: 480
    }, {
        scale: 2,
        width: 960,
        height: 640
    }]), h.width = e, h.height = f);
    k = "height";
    e = Number.MAX_VALUE;
    for (f = 0; f < g.length; f++) {
        var l =
            Math.abs(h[k] - g[f][k]);
        e > l && (e = l, c = g[f].scale)
    }
    return Utils.getScaleScreenResolution(c, a)
};
Utils.getScaleScreenResolution = function(a, c) {
    var e = Math.round(320 * a),
        f = Math.round(480 * a);
    return {
        width: c ? f : e,
        height: c ? e : f,
        scale: a
    }
};
Utils.imagesRoot = "images";
Utils.initialResolution = {
    width: 320,
    height: 480,
    scale: 1
};
Utils.ignoreMobileHeightCorrection = !1;
Utils.createLayout = function(a, c, e, f) {
    var g = Utils.globalScale;
    Utils.initialResolution = c;
    e = window.innerHeight;
    document.body.style.overflow = "hidden";
    var h;
    h = "" + ('<div id="' + Utils.DOMProgressContainerId + '" align="center" style="width: 100%; height: ' + e + 'px; display: block; width: 100%; position: absolute; left: 0px; top: 0px;">');
    h += '<table cellspacing="0" cellpadding="0" border="0"><tr><td id="' + Utils.DOMProgressId + '" align="center" valign="middle" style="width: ' + c.width + "px; height: " + c.height + "px; color: #000; background: #fff; font-weight: bold; font-family: Verdana; font-size: " +
        12 * g + 'px; vertical-align: middle;"></td></tr></table>';
    h = h + "</div>" + ('<div id="' + Utils.DOMScreenBackgroundContainerId + '" style="width: 100%; height: ' + e + 'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 2;">');
    h += '<div id="' + Utils.DOMScreenBackgroundWrapperId + '" style="width: ' + c.width + "px; height: " + c.height + 'px; position: relative; left: 0px; overflow: hidden;">';
    f || (h += '<canvas id="' + Utils.DOMScreenBackgroundId + '" width="' + c.width + '" height="' + c.height + '"></canvas>');
    h += "</div>";
    h += "</div>";
    h += '<div id="' + Utils.DOMScreenContainerId + '" style="width: 100%; height: ' + e + 'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 3;">';
    h += '<div id="' + Utils.DOMScreenWrapperId + '" width="' + c.width + '" height="' + c.height + '" style="width: ' + c.width + "px; height: " + c.height + 'px; position: relative; left: 0px; overflow: hidden;">';
    f || (h += '<canvas id="' + Utils.DOMScreenId + '" style="position: absolute; left: 0px; top: 0px;" width="' + c.width + '" height="' + c.height + '">You browser does not support this application :(</canvas>');
    h += "</div>";
    h += "</div>";
    a.innerHTML = h;
    a = document.createElement("div");
    a.setAttribute("id", Utils.DOMP2lContainerId);
    a.setAttribute("align", "center");
    c = c.width;
    a.setAttribute("style", "width: 100%; height: " + e + "px; position: absolute; left: 0px; top: 0px; visibility: hidden; z-index: 1000; background: #fff;");
    c = (c - 240) / 2;
    Utils.isPlayFreeBrowser() && (c /= 8);
    a.innerHTML = '<img id="' + Utils.DOMP2lId + '" src="' + Utils.imagesRoot + '/p2l.jpg" style="padding-top: ' + Math.floor(c) + 'px" />';
    document.body.appendChild(a);
    c = document.createElement("div");
    c.setAttribute("id", Utils.DOMMarkId);
    c.style.position = "fixed";
    c.style.right = "0px";
    c.style.bottom = "0px";
    c.style.width = "1px";
    c.style.height = "1px";
    c.style.background = "";
    c.style.zIndex = "100000";
    document.body.appendChild(c);
    Utils.fitLayoutToScreen()
};
Utils.showMainLayoutContent = function() {
    document.getElementById(Utils.DOMProgressContainerId).style.display = "none";
    document.getElementById(Utils.DOMScreenContainerId).style.display = "block";
    document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = "block"
};
Utils.preventEvent = function(a) {
    a.preventDefault();
    a.stopPropagation();
    a.cancelBubble = !0;
    return a.returnValue = !1
};
Utils.addMobileListeners = function(a, c) {
    !c && navigator.userAgent.match(/(iPad|iPhone|iPod).*CPU.*OS 7_\d/i) || Utils.bindEvent(document.body, "touchstart", Utils.preventEvent);
    Utils.isPlayFreeBrowser() || Utils.bindEvent(window, "scroll", function(a) {
        setTimeout(Utils.mobileHideAddressBar, 300)
    });
    document.addEventListener(Utils.getVisibiltyProps().visibilityChange, Utils.handleVisibilityChange, !1);
    setInterval("Utils.checkOrientation(" + (a ? "true" : "false") + ")", 500);
    setTimeout(Utils.mobileHideAddressBar, 500)
};
Utils.handleVisibilityChange = function() {
    Utils.isWindowHidden = document[Utils.getVisibiltyProps().hidden];
    Utils.dispatchEvent(Utils.isWindowHidden ? "hidewindow" : "showwindow")
};
Utils.getVisibiltyProps = function() {
    var a, c;
    "undefined" !== typeof document.hidden ? (a = "hidden", c = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (a = "mozHidden", c = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (a = "msHidden", c = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (a = "webkitHidden", c = "webkitvisibilitychange");
    return {
        hidden: a,
        visibilityChange: c
    }
};
Utils.getWindowRect = function() {
    var a = document.getElementById(Utils.DOMMarkId);
    return Utils.isAndroid() && a ? {
        width: window.innerWidth,
        height: a.offsetTop + 1
    } : {
        width: window.innerWidth,
        height: window.innerHeight
    }
};
Utils.storeOrient = null;
Utils.noCheckOrient = !1;
Utils.checkOrientation = function(a) {
    if (Utils.touchScreen && document.getElementById(Utils.DOMScreenContainerId) && !Utils.noCheckOrient && 1 != Utils.parseGet().nocheckorient) {
        var c = Utils.getWindowRect(),
            c = c.width > c.height;
        Utils.storeOrient !== c && (Utils.storeOrient = c, c != a ? (Utils.dispatchEvent("lockscreen"), document.getElementById(Utils.DOMP2lContainerId).style.visibility = "visible", document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = "none", document.getElementById(Utils.DOMScreenContainerId).style.display =
            "none") : (Utils.dispatchEvent("unlockscreen"), document.getElementById(Utils.DOMP2lContainerId).style.visibility = "hidden", document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = "block", document.getElementById(Utils.DOMScreenContainerId).style.display = "block"), Utils.checkSpilgamesEnvironment() && (document.getElementById(Utils.DOMP2lContainerId).style.display = "none"), setTimeout(Utils.mobileHideAddressBar, 900), setTimeout(Utils.fitLayoutToScreen, 1E3))
    }
};
Utils.fitLayoutTimer = null;
Utils.addFitLayoutListeners = function() {
    Utils.fitLayoutTimer = setInterval(Utils.fitLayoutToScreen, 500)
};
Utils.removeFitLayoutListeners = function() {
    clearInterval(Utils.fitLayoutTimer)
};
Utils.fitLayoutLock = !1;
Utils.fitLayoutCorrectHeight = 0;
Utils.fitLayoutToScreen = function(a) {
    if (!Utils.fitLayoutLock) {
        var c, e, f, g;
        "object" == typeof a && a.width || (g = Utils.getWindowRect(), e = g.width, f = g.height, Utils.checkSpilgamesEnvironment() && (f -= 25), f += Utils.fitLayoutCorrectHeight, a = {
            width: e,
            height: f
        });
        if (c = document.getElementById(Utils.DOMScreenWrapperId)) {
            c.initWidth || (c.initWidth = Utils.initialResolution.width, c.initHeight = Utils.initialResolution.height);
            e = c.initWidth;
            f = c.initHeight;
            var h = 1,
                h = a.width / e;
            a = a.height / f;
            h = h < a ? h : a;
            Utils.globalPixelScale = h;
            e =
                Math.floor(e * h);
            f = Math.floor(f * h);
            if (c.lastWidth != e || c.lastHeight != f) {
                c.lastWidth = e;
                c.lastHeight = f;
                Utils.resizeElement(Utils.DOMScreenId, e, f);
                Utils.resizeElement(Utils.DOMScreenBackgroundId, e, f);
                Utils.resizeElement(Utils.DOMProgressContainerId, g.width, g.height);
                Utils.resizeElement(Utils.DOMProgressId, e, f);
                if (c = Utils.resizeElement(Utils.DOMScreenWrapperId, e, f)) c.style.left = Math.floor((g.width - e) / 2) + "px";
                if (c = Utils.resizeElement(Utils.DOMScreenBackgroundWrapperId, e, f)) c.style.left = Math.floor((g.width -
                    e) / 2) + "px";
                Utils.resizeElement(Utils.DOMP2lContainerId, g.width, g.height);
                Utils.resizeElement(Utils.DOMScreenContainerId, g.width, g.height);
                Utils.resizeElement(Utils.DOMScreenBackgroundContainerId, g.width, g.height);
                Utils.dispatchEvent("fitlayout");
                Utils.isPlayFreeBrowser() && window.scrollTo(1, 2);
                setTimeout(Utils.mobileHideAddressBar, 10)
            }
        }
    }
};
Utils.resizeElement = function(a, c, e) {
    a = document.getElementById(a);
    if (!a) return null;
    a.style.width = Math.floor(c) + "px";
    a.style.height = Math.floor(e) + "px";
    return a
};
Utils.drawIphoneLimiter = function(a, c) {
    c ? a.drawRectangle(240, 295, 480, 54, "#f00", !0, .5, !0) : a.drawRectangle(160, 448, 320, 64, "#f00", !0, .5, !0)
};
Utils.drawGrid = function(a, c, e) {
    "undefined" == typeof c && (c = !1);
    "undefined" == typeof e && (e = "#FFF");
    var f = c ? 480 : 320;
    c = c ? 320 : 480;
    for (var g = 10; g < f; g += 10) {
        var h = .1 + (g - 10) / 10 % 10 * .1;
        a.drawLine(g, 0, g, c, 1, e, h)
    }
    for (g = 10; g < c; g += 10) h = .1 + (g - 10) / 10 % 10 * .1, a.drawLine(0, g, f, g, 1, e, h)
};
Utils.drawScaleFix = function(a, c) {.75 == Utils.globalScale && (c ? a.drawRectangle(507, 160, 54, 320, "#000", !0, 1, !0) : a.drawRectangle(160, 507, 320, 54, "#000", !0, 1, !0));
    1.5 == Utils.globalScale && (c ? a.drawRectangle(510, 160, 60, 320, "#000", !0, 1, !0) : a.drawRectangle(160, 510, 320, 60, "#000", !0, 1, !0))
};
Utils.grad2radian = function(a) {
    return a / (180 / Math.PI)
};
Utils.radian2grad = function(a) {
    return 180 / Math.PI * a
};
Utils.eventsListeners = [];
Utils.onlockscreen = null;
Utils.onunlockscreen = null;
Utils.onhidewindow = null;
Utils.onshowwindow = null;
Utils.onfitlayout = null;
Utils.addEventListener = function(a, c) {
    EventsManager.addEvent(Utils, a, c)
};
Utils.removeEventListener = function(a, c) {
    EventsManager.removeEvent(Utils, a, c)
};
Utils.dispatchEvent = function(a, c) {
    return EventsManager.dispatchEvent(Utils, a, c)
};
Utils.isArray = function(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
};
Utils.isPlainObject = function(a) {
    return a && a.constructor ? a.constructor === Object : !1
};
Utils.getFunctionArguments = function(a, c) {
    "undefined" == typeof c && (c = 0);
    return [].slice.call(a, c)
};
Utils.proxy = function(a, c) {
    var e = Utils.getFunctionArguments(arguments, 2);
    return function() {
        return a.apply(c || this, Utils.getFunctionArguments(arguments, 0).concat(e))
    }
};
Utils.extend = function(a, c) {
    var e = function() {};
    e.prototype = c.prototype;
    a.prototype = new e;
    a.prototype.constructor = a;
    a.superclass = c.prototype
};
Utils.callSuperConstructor = function(a, c) {
    a.superclass.constructor.apply(c, Utils.getFunctionArguments(arguments, 2))
};
Utils.callSuperMethod = function(a, c, e) {
    return a.superclass[e].apply(c, Utils.getFunctionArguments(arguments, 3))
};
Utils.copyObjectProps = function(a, c) {
    for (var e in a)
        if (a.hasOwnProperty(e))
            if (Utils.isArray(a[e])) {
                c[e] = [];
                for (var f = 0; f < a[e].length; f++) "object" == typeof a[e][f] && (c[e][f] = Utils.cloneEmptyObject(a[e][f])), Utils.copyObjectProps(a[e][f], c[e][f])
            } else Utils.isPlainObject(a[e]) ? Utils.copyObjectProps(a[e], c[e]) : c[e] = a[e]
};
Utils.cloneEmptyObject = function(a) {
    return a.constructor ? new a.constructor : {}
};
Utils.clone = function(a) {
    if (!a || "object" != typeof a) return a;
    var c = Utils.cloneEmptyObject(a);
    Utils.copyObjectProps(a, c);
    return c
};
Utils.switchToTimeMode = function(a) {
    Tween.STEP_TYPE = Tween.STEP_BY_TIME;
    StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_TIME;
    Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_TIME;
    Sprite.CHANGE_FRAME_DELAY = a
};
Utils.getGameID = function() {
    if (window.GAME_ID && "my_game" != window.GAME_ID) return window.GAME_ID;
    for (var a = window.location.toString().split("/"), c = ""; !c;) c = a.pop(), 1 < c.split(".").length && (c = ""), 0 == a.length && (c = "my_game");
    return c
};
Utils.ajax = function(a, c, e, f, g, h) {
    var k;
    k = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    k.onreadystatechange = function() {
        if (4 == k.readyState)
            if (200 == k.status) {
                var a = k.responseText;
                "json" == f && (a = JSON.parse(a));
                "xml" == f && (a = Utils.parseXMLString(a));
                g && g(a, k)
            } else h && h(k.status, k)
    };
    if (e) {
        var l = [],
            m;
        for (m in e) l.push(encodeURIComponent(m) + "=" + encodeURIComponent(e[m]));
        e = l.join("&")
    } else e = "";
    c || (c = "GET");
    k.open(c, a + ("GET" == c ? "?" + e : ""), !0);
    "POST" == c && k.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded");
    k.send("GET" != c ? e : null)
};
Utils.get = function(a, c, e, f, g) {
    Utils.ajax(a, "GET", c, e, f, g)
};
Utils.post = function(a, c, e, f, g) {
    Utils.ajax(a, "POST", c, e, f, g)
};
Utils.getBezierBasis = function(a, c, e) {
    function f(a) {
        return 1 >= a ? 1 : a * f(a - 1)
    }
    return f(c) / (f(a) * f(c - a)) * Math.pow(e, a) * Math.pow(1 - e, c - a)
};
Utils.getBezierCurve = function(a, c) {
    "undefined" == typeof c && (c = .1);
    var e = [];
    c /= a.length;
    for (var f = 0; f < 1 + c; f += c) {
        1 < f && (f = 1);
        var g = e.length;
        e[g] = {
            x: 0,
            y: 0
        };
        for (var h = 0; h < a.length; h++) {
            var k = Utils.getBezierBasis(h, a.length - 1, f);
            e[g].x += a[h].x * k;
            e[g].y += a[h].y * k
        }
    }
    return e
};
Utils.parseXMLString = function(a) {
    var c = null;
    if ("undefined" != typeof window.DOMParser) c = (new window.DOMParser).parseFromString(a, "text/xml");
    else if ("undefined" != typeof window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLDOM")) c = new window.ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a);
    else throw Error("No XML parser found");
    return c
};

function ImagesPreloader() {
    this.curItem = -1;
    this.loadedImages = {};
    this.processCallback = this.endCallback = this.data = null;
    this.minProgressVal = 0;
    this.maxProgressVal = 100;
    this.wait = Utils.proxy(this.wait, this)
}
ImagesPreloader.prototype.load = function(a, c, e) {
    this.data = a;
    this.endCallback = c;
    this.processCallback = e;
    for (a = 0; a < this.data.length; a++) c = this.data[a], e = new Image, e.src = c.src, this.loadedImages[c.name] = e;
    this.wait()
};
ImagesPreloader.prototype.wait = function() {
    var a = 0,
        c = 0,
        e;
    for (e in this.loadedImages) this.loadedImages[e].complete && a++, c++;
    a >= c ? this.endCallback && this.endCallback(this.loadedImages) : (this.processCallback && this.processCallback(Math.floor(a / c * this.maxProgressVal + this.minProgressVal)), setTimeout(this.wait, 50))
};

function SoundsPreloader(a, c, e) {
    this.sounds = a;
    this.endCallback = c;
    this.progressCallback = e;
    this.minProgressVal = this.loadedCount = 0;
    this.maxProgressVal = 100
}
SoundsPreloader.prototype.isMp3Support = function() {
    return "" != document.createElement("audio").canPlayType("audio/mpeg")
};
SoundsPreloader.prototype.isWebAudio = function() {
    return Boolean(window.AudioMixer) && AudioMixer.isWebAudioSupport()
};
SoundsPreloader.prototype.load = function(a, c, e) {
    a && (this.sounds = a);
    c && (this.endCallback = c);
    e && (this.progressCallback = e);
    if (!this.sounds || 1 > this.sounds.length || !this.isWebAudio()) this.endCallback && this.endCallback();
    else {
        a = this.isMp3Support() ? "mp3" : "ogg";
        var f;
        this.loadedCount = 0;
        var g = this;
        for (e = 0; e < this.sounds.length; e++) c = this.sounds[e] + "." + a, this.isWebAudio() ? (f = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), f.open("GET", c, !0), f.responseType = "arraybuffer", f.onreadystatechange =
            function() {
                if (4 == this.readyState && 200 == this.status) {
                    var a = this.soundSrc;
                    AudioMixer.waContext || (AudioMixer.waContext = new AudioContext);
                    AudioMixer.waContext.decodeAudioData(this.response, function(c) {
                        AudioMixer.buffer[a] = c;
                        g.soundIsLoaded(null, g)
                    }, function(a) {
                        g.soundIsLoaded(null, g)
                    })
                }
            }, f.soundSrc = c, f.send()) : (f = document.createElement("audio"), f.src = c, f.type = "mp3" == a ? "audio/mpeg" : "audio/ogg", f.preload = "auto", f.load(), f.addEventListener("canplay", Utils.proxy(this.soundIsLoaded, f, this)), f.addEventListener("canplaythrough",
            Utils.proxy(this.soundIsLoaded, f, this)))
    }
};
SoundsPreloader.prototype.soundIsLoaded = function(a, c) {
    if (this.nodeName && "audio" == this.nodeName.toLowerCase()) {
        if (this.alreadyLoaded) return;
        this.alreadyLoaded = !0
    }
    c.loadedCount++;
    c.progressCallback && c.progressCallback(Math.floor(c.loadedCount / c.sounds.length * c.maxProgressVal + c.minProgressVal));
    c.loadedCount >= c.sounds.length && c.endCallback && c.endCallback()
};

function Asset(a, c, e, f, g, h) {
    this.name = a + "";
    this.src = c + "";
    this.width = e;
    this.height = f;
    this.frames = g;
    this.layers = h;
    this.object = this.bitmap = null;
    this.ready = this.width && this.height;
    this.spriteClass = null
}
Asset.prototype.detectSize = function() {
    if (!this.bitmap) return !1;
    try {
        isNaN(this.width) && (this.width = this.bitmap.width ? parseInt(this.bitmap.width) : 0), isNaN(this.height) && (this.height = this.bitmap.height ? parseInt(this.bitmap.height) : 0)
    } catch (a) {
        CRENDER_DEBUG && console.log(a)
    }
    return !isNaN(this.width) && !isNaN(this.height)
};
Asset.prototype.normalize = function(a) {
    if (!this.ready && this.detectSize()) {
        if (isNaN(this.frames) || 1 > this.frames) this.frames = 1;
        if (isNaN(this.layers) || 1 > this.layers) this.layers = 1;
        this.width = Math.ceil(this.width / this.layers / a);
        this.height = Math.ceil(this.height / this.frames / a);
        this.ready = !0
    }
};

function AssetsLibrary(a, c, e) {
    this.path = "images";
    this.scale = 1;
    this.items = {};
    this.bitmaps = {};
    this.loaded = !1;
    this.onloadprogress = this.onload = null;
    this.spriteClass = Sprite;
    this.onLoadHandler = Utils.proxy(this.onLoadHandler, this);
    this.onLoadProgressHandler = Utils.proxy(this.onLoadProgressHandler, this);
    this.init(a, c);
    this.addAssets(e)
}
AssetsLibrary.prototype.init = function(a, c) {
    "undefined" != typeof a && (this.path = a + "");
    "undefined" != typeof c && (this.scale = parseFloat(c), isNaN(this.scale) && (this.scale = 1))
};
AssetsLibrary.prototype.load = function(a, c, e, f) {
    this.onload = a;
    this.onloadprogress = c;
    a = new ImagesPreloader;
    c = [];
    for (var g in this.items) c.push(this.items[g]);
    "undefined" != typeof e && (a.minProgressVal = e);
    "undefined" != typeof f && (a.maxProgressVal = f);
    a.load(c, this.onLoadHandler, this.onLoadProgressHandler)
};
AssetsLibrary.prototype.onLoadProgressHandler = function(a) {
    if ("function" == typeof this.onloadprogress) this.onloadprogress(a)
};
AssetsLibrary.prototype.onLoadHandler = function(a) {
    this.loaded = !0;
    for (var c in a) {
        var e = this.items[c];
        e.bitmap = a[c];
        e.normalize(this.scale)
    }
    if ("function" == typeof this.onload) this.onload(this.items)
};
AssetsLibrary.prototype.addAssets = function(a) {
    if ("undefined" != typeof a && "object" == typeof a)
        for (var c = 0; c < a.length; c++) {
            var e = a[c];
            e.noscale = "undefined" == typeof e.noscale ? !1 : e.noscale;
            e.noscale || (e.src = "%SCALE%/" + e.src);
            this.addAsset(e)
        }
};
AssetsLibrary.prototype.addAsset = function(a, c, e, f, g, h) {
    var k = null;
    "object" == typeof a && 1 == arguments.length && (c = a.name, e = a.width || 1, f = a.height || 1, g = a.frames || 1, h = a.layers || 1, k = a.spriteClass || null, properties = a.properties || null, a = a.src);
    a = a.replace("%SCALE%", "%PATH%/" + this.scale);
    a = a.replace("%PATH%", this.path);
    if ("undefined" == typeof c) {
        var l = a.split("/"),
            l = l.pop(),
            l = l.split(".");
        c = l = l.shift() + ""
    }
    l = new Asset(c, a, e, f, g, h);
    l.spriteClass = k;
    if (properties)
        for (var m in properties) "undefined" == typeof l[m] &&
            (l[m] = properties[m]);
    return this.items[c] = l
};
AssetsLibrary.prototype.addObject = function(a) {
    var c = this.addAsset("%SCALE%/" + a.image, a.name, a.width * this.scale, a.height * this.scale, a.frames, a.layers);
    c && (c.object = a);
    return c
};
AssetsLibrary.prototype.getAsset = function(a, c) {
    var e = null;
    "undefined" != typeof this.items[a] && this.items[a].bitmap && (e = "undefined" != typeof c && !c || this.items[a].ready ? this.items[a] : null);
    if (!e) throw Error('Trying to get undefined asset "' + a + '"');
    return e
};
AssetsLibrary.prototype.getSprite = function(a, c, e) {
    var f = null,
        f = null;
    try {
        f = this.getAsset(a, !0)
    } catch (g) {
        f = new Asset
    }
    if ((e = e || f.spriteClass || this.spriteClass || window.Sprite) && "function" == typeof e || "function" == typeof window[e]) e = "function" == typeof e ? e : window[e];
    f = e.create && "function" == typeof e.create ? e.create(f, this) : new e(f.bitmap, f.width, f.height, f.frames, f.layers);
    if (c && "object" == typeof c)
        for (var h in c) f[h] = c[h];
    return f
};
AssetsLibrary.prototype.getBitmap = function(a) {
    try {
        return this.getAsset(a, !0).bitmap
    } catch (c) {
        return null
    }
};

function Vector(a, c) {
    "undefined" == typeof a && (a = 0);
    this.x = a;
    "undefined" == typeof c && (c = 0);
    this.y = c
}
Vector.prototype.isZero = function() {
    return 0 == this.x && 0 == this.y
};
Vector.prototype.clone = function() {
    return new Vector(this.x, this.y)
};
Vector.prototype.add = function(a) {
    this.x += a.x;
    this.y += a.y;
    return this
};
Vector.prototype.subtract = function(a) {
    this.x -= a.x;
    this.y -= a.y;
    return this
};
Vector.prototype.mult = function(a) {
    this.x *= a;
    this.y *= a;
    return this
};
Vector.prototype.invert = function() {
    this.mult(-1);
    return this
};
Vector.prototype.rotate = function(a, c) {
    "undefined" == typeof c && (c = new Vector(0, 0));
    var e = this.clone();
    e.subtract(c);
    e.x = this.x * Math.cos(a) + this.y * Math.sin(a);
    e.y = this.x * -Math.sin(a) + this.y * Math.cos(a);
    e.add(c);
    this.x = e.x;
    this.y = e.y;
    return this
};
Vector.prototype.normalize = function(a, c) {
    "undefined" == typeof c && (c = new Vector(0, 0));
    this.subtract(c);
    this.rotate(-a);
    return this
};
Vector.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
};
Vector.prototype.distanceTo = function(a) {
    p2 = this.clone();
    p2.subtract(a);
    return p2.getLength()
};

function Rectangle(a, c, e, f, g) {
    this.center = new Vector(a, c);
    this.width = e;
    this.height = f;
    this.angle = g;
    this.vertices = [];
    this.AABB = [];
    this.refreshVertices()
}
Rectangle.prototype.clone = function() {
    return new Rectangle(this.center.x, this.center.y, this.width, this.height, this.angle)
};
Rectangle.prototype.refreshVertices = function() {
    var a = this.width / 2,
        c = this.height / 2;
    this.vertices = [];
    this.vertices.push(new Vector(-a, c));
    this.vertices.push(new Vector(a, c));
    this.vertices.push(new Vector(a, -c));
    this.vertices.push(new Vector(-a, -c));
    this.AABB = [this.center.clone(), this.center.clone()];
    for (a = 0; 4 > a; a++) this.vertices[a].rotate(-this.angle, this.center), this.vertices[a].x < this.AABB[0].x && (this.AABB[0].x = this.vertices[a].x), this.vertices[a].x > this.AABB[1].x && (this.AABB[1].x = this.vertices[a].x),
        this.vertices[a].y < this.AABB[0].y && (this.AABB[0].y = this.vertices[a].y), this.vertices[a].y > this.AABB[1].y && (this.AABB[1].y = this.vertices[a].y)
};
Rectangle.prototype.move = function(a, c) {
    this.center.add(new Vector(a, c));
    this.refreshVertices()
};
Rectangle.prototype.rotate = function(a) {
    this.angle += a;
    this.refreshVertices()
};
Rectangle.prototype.hitTestPoint = function(a) {
    a = a.clone();
    a.normalize(-this.angle, this.center);
    return Math.abs(a.x) <= this.width / 2 && Math.abs(a.y) <= this.height / 2
};
Rectangle.prototype.hitTestRectangle = function(a) {
    var c = this.clone();
    a = a.clone();
    var e, f, g;
    c.move(-this.center.x, -this.center.y);
    a.move(-this.center.x, -this.center.y);
    a.center.rotate(this.angle);
    c.rotate(-this.angle);
    a.rotate(-this.angle);
    e = Math.max(c.AABB[0].x, c.AABB[1].x, a.AABB[0].x, a.AABB[1].x) - Math.min(c.AABB[0].x, c.AABB[1].x, a.AABB[0].x, a.AABB[1].x);
    f = c.AABB[1].x - c.AABB[0].x;
    g = a.AABB[1].x - a.AABB[0].x;
    if (e > f + g) return !1;
    e = Math.max(c.AABB[0].y, c.AABB[1].y, a.AABB[0].y, a.AABB[1].y) - Math.min(c.AABB[0].y,
        c.AABB[1].y, a.AABB[0].y, a.AABB[1].y);
    f = c.AABB[1].y - c.AABB[0].y;
    g = a.AABB[1].y - a.AABB[0].y;
    if (e > f + g) return !1;
    c.move(-a.center.x, -a.center.y);
    a.move(-a.center.x, -a.center.y);
    c.center.rotate(a.angle);
    c.refreshVertices();
    c.rotate(-a.angle);
    a.rotate(-a.angle);
    e = Math.max(c.AABB[0].x, c.AABB[1].x, a.AABB[0].x, a.AABB[1].x) - Math.min(c.AABB[0].x, c.AABB[1].x, a.AABB[0].x, a.AABB[1].x);
    f = c.AABB[1].x - c.AABB[0].x;
    g = a.AABB[1].x - a.AABB[0].x;
    if (e > f + g) return !1;
    e = Math.max(c.AABB[0].y, c.AABB[1].y, a.AABB[0].y, a.AABB[1].y) -
        Math.min(c.AABB[0].y, c.AABB[1].y, a.AABB[0].y, a.AABB[1].y);
    f = c.AABB[1].y - c.AABB[0].y;
    g = a.AABB[1].y - a.AABB[0].y;
    return e > f + g ? !1 : !0
};
var EventsManager = {
    addEvent: function(a, c, e) {
        if (a.eventsListeners) {
            for (var f = 0; f < a.eventsListeners.length; f++)
                if (a.eventsListeners[f].type === c && a.eventsListeners[f].callback === e) return;
            a.eventsListeners.push({
                type: c,
                callback: e
            })
        }
    },
    removeEvent: function(a, c, e) {
        if (a.eventsListeners)
            for (var f = 0; f < a.eventsListeners.length; f++)
                if (a.eventsListeners[f].type === c && a.eventsListeners[f].callback === e) {
                    a.eventsListeners = Utils.removeFromArray(a.eventsListeners, a.eventsListeners[f]);
                    break
                }
    },
    dispatchEvent: function(a,
        c, e) {
        if (a.eventsListeners) {
            var f;
            if ("function" == typeof a["on" + c] && (f = a["on" + c](e), !1 === f)) return !1;
            for (var g = 0; g < a.eventsListeners.length; g++)
                if (a.eventsListeners[g].type === c && (f = a.eventsListeners[g].callback(e), !1 === f)) return !1
        }
    },
    hasEventListener: function(a, c) {
        if (a.eventsListeners) {
            for (var e = 0; e < a.eventsListeners.length; e++)
                if (a.eventsListeners[e].type === c) return !0;
            return !1
        }
    },
    removeAllEventListeners: function(a, c) {
        if (a.eventsListeners) {
            "undefined" == typeof c && (a.eventsListeners = []);
            for (var e = [], f =
                    0; f < a.eventsListeners.length; f++) a.eventsListeners[f].type !== c && e.push(a.eventsListeners[f]);
            a.eventsListeners = e
        }
    }
};

function EventsProxy() {
    this.eventsListeners = []
}
EventsProxy.prototype.addEventListener = function(a, c) {
    EventsManager.addEvent(this, a, c)
};
EventsProxy.prototype.removeEventListener = function(a, c) {
    EventsManager.removeEvent(this, a, c)
};
EventsProxy.prototype.dispatchEvent = function(a, c) {
    return EventsManager.dispatchEvent(this, a, c)
};
EventsProxy.prototype.hasEventListener = function(a) {
    return EventsManager.hasEventListener(this, a)
};
EventsProxy.prototype.removeAllEventListeners = function(a) {
    EventsManager.removeAllEventListeners(this, a)
};
var Easing = {
    back: {
        easeIn: function(a, c, e, f) {
            return e * (a /= f) * a * (2.70158 * a - 1.70158) + c
        },
        easeOut: function(a, c, e, f) {
            return e * ((a = a / f - 1) * a * (2.70158 * a + 1.70158) + 1) + c
        },
        easeInOut: function(a, c, e, f) {
            var g = 1.70158;
            return 1 > (a /= f / 2) ? e / 2 * a * a * (((g *= 1.525) + 1) * a - g) + c : e / 2 * ((a -= 2) * a * (((g *= 1.525) + 1) * a + g) + 2) + c
        }
    },
    bounce: {
        easeIn: function(a, c, e, f) {
            return e - Easing.bounce.easeOut(f - a, 0, e, f) + c
        },
        easeOut: function(a, c, e, f) {
            return (a /= f) < 1 / 2.75 ? 7.5625 * e * a * a + c : a < 2 / 2.75 ? e * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + c : a < 2.5 / 2.75 ? e * (7.5625 * (a -= 2.25 /
                2.75) * a + .9375) + c : e * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + c
        },
        easeInOut: function(a, c, e, f) {
            return a < f / 2 ? .5 * Easing.bounce.easeIn(2 * a, 0, e, f) + c : .5 * Easing.bounce.easeOut(2 * a - f, 0, e, f) + .5 * e + c
        }
    },
    circular: {
        easeIn: function(a, c, e, f) {
            return -e * (Math.sqrt(1 - (a /= f) * a) - 1) + c
        },
        easeOut: function(a, c, e, f) {
            return e * Math.sqrt(1 - (a = a / f - 1) * a) + c
        },
        easeInOut: function(a, c, e, f) {
            return 1 > (a /= f / 2) ? -e / 2 * (Math.sqrt(1 - a * a) - 1) + c : e / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + c
        }
    },
    cubic: {
        easeIn: function(a, c, e, f) {
            return e * (a /= f) * a * a + c
        },
        easeOut: function(a, c,
            e, f) {
            return e * ((a = a / f - 1) * a * a + 1) + c
        },
        easeInOut: function(a, c, e, f) {
            return 1 > (a /= f / 2) ? e / 2 * a * a * a + c : e / 2 * ((a -= 2) * a * a + 2) + c
        }
    },
    exponential: {
        easeIn: function(a, c, e, f) {
            return 0 == a ? c : e * Math.pow(2, 10 * (a / f - 1)) + c
        },
        easeOut: function(a, c, e, f) {
            return a == f ? c + e : e * (-Math.pow(2, -10 * a / f) + 1) + c
        },
        easeInOut: function(a, c, e, f) {
            return 0 == a ? c : a == f ? c + e : 1 > (a /= f / 2) ? e / 2 * Math.pow(2, 10 * (a - 1)) + c : e / 2 * (-Math.pow(2, -10 * --a) + 2) + c
        }
    },
    linear: {
        easeIn: function(a, c, e, f) {
            return e * a / f + c
        },
        easeOut: function(a, c, e, f) {
            return e * a / f + c
        },
        easeInOut: function(a,
            c, e, f) {
            return e * a / f + c
        }
    },
    quadratic: {
        easeIn: function(a, c, e, f) {
            return e * (a /= f) * a + c
        },
        easeOut: function(a, c, e, f) {
            return -e * (a /= f) * (a - 2) + c
        },
        easeInOut: function(a, c, e, f) {
            return 1 > (a /= f / 2) ? e / 2 * a * a + c : -e / 2 * (--a * (a - 2) - 1) + c
        }
    },
    quartic: {
        easeIn: function(a, c, e, f) {
            return e * (a /= f) * a * a * a + c
        },
        easeOut: function(a, c, e, f) {
            return -e * ((a = a / f - 1) * a * a * a - 1) + c
        },
        easeInOut: function(a, c, e, f) {
            return 1 > (a /= f / 2) ? e / 2 * a * a * a * a + c : -e / 2 * ((a -= 2) * a * a * a - 2) + c
        }
    },
    quintic: {
        easeIn: function(a, c, e, f) {
            return e * (a /= f) * a * a * a * a + c
        },
        easeOut: function(a, c, e, f) {
            return e *
                ((a = a / f - 1) * a * a * a * a + 1) + c
        },
        easeInOut: function(a, c, e, f) {
            return 1 > (a /= f / 2) ? e / 2 * a * a * a * a * a + c : e / 2 * ((a -= 2) * a * a * a * a + 2) + c
        }
    },
    sine: {
        easeIn: function(a, c, e, f) {
            return -e * Math.cos(a / f * (Math.PI / 2)) + e + c
        },
        easeOut: function(a, c, e, f) {
            return e * Math.sin(a / f * (Math.PI / 2)) + c
        },
        easeInOut: function(a, c, e, f) {
            return -e / 2 * (Math.cos(Math.PI * a / f) - 1) + c
        }
    }
};

function Tween(a, c, e, f, g, h) {
    Utils.callSuperConstructor(Tween, this);
    "object" != typeof a && (a = null);
    if (a) {
        if ("undefined" == typeof a[c]) throw Error('Trying to tween undefined property "' + c + '"');
        if (isNaN(a[c])) throw Error("Tweened value can not be " + typeof a[c]);
    } else if (isNaN(c)) throw Error("Tweened value can not be " + typeof c);
    "function" != typeof h && (h = Easing.linear.easeIn);
    this.obj = a;
    this.prop = c;
    this.onfinish = this.onchange = null;
    this.start = e;
    this.end = f;
    this.duration = ~~g;
    this.callback = h;
    this.playing = !1;
    this._pos = -1;
    this.newly = !0;
    this.eventsListeners = []
}
Utils.extend(Tween, EventsProxy);
Tween.prototype.play = function() {
    this.playing = !0;
    this.tick(0)
};
Tween.prototype.pause = function() {
    this.playing = !1
};
Tween.prototype.rewind = function() {
    this._pos = -1
};
Tween.prototype.forward = function() {
    this._pos = this.duration
};
Tween.prototype.stop = function() {
    this.pause();
    this.rewind()
};
Tween.prototype.updateValue = function(a) {
    this.obj ? this.obj[this.prop] = a : this.prop = a
};
Tween.prototype.tick = function(a) {
    if (!this.playing) return !1;
    a || (a = 0);
    Tween.STEP_TYPE == Tween.STEP_BY_FRAME ? this._pos++ : this._pos += a;
    if (0 > this._pos) return !1;
    if (this._pos > this.duration) return this.finish();
    a = this.callback;
    a = a(this._pos, this.start, this.end - this.start, this.duration);
    this.updateValue(a);
    this.dispatchEvent("change", {
        target: this,
        value: a
    });
    return !1
};
Tween.prototype.finish = function() {
    this.stop();
    this.updateValue(this.end);
    return !1 === this.dispatchEvent("finish", {
        target: this,
        value: this.end
    }) ? !1 : !0
};
Tween.STEP_BY_FRAME = 0;
Tween.STEP_BY_TIME = 1;
Tween.STEP_TYPE = Tween.STEP_BY_FRAME;

function DisplayObjectContainer() {
    Utils.callSuperConstructor(DisplayObjectContainer, this);
    this.parent = null;
    this.objectsCounter = 0;
    this.objects = [];
    this.height = this.width = this.y = this.x = 0;
    this.anchor = {
        x: 0,
        y: 0
    };
    this.hitArea = null;
    this.scaleY = this.scaleX = 1;
    this.rotation = this.skewY = this.skewX = 0;
    this.opacity = 1;
    this.fillPattern = this.fillRadialGradient = this.fillLinearGradient = this.fillColor = null
}
Utils.extend(DisplayObjectContainer, EventsProxy);
DisplayObjectContainer.prototype.getAbsoluteRotation = function() {
    return this.rotation + (this.parent ? this.parent.getAbsoluteRotation() : 0)
};
DisplayObjectContainer.prototype.getAbsoluteOpacity = function() {
    return this.opacity * (this.parent ? this.parent.getAbsoluteOpacity() : 1)
};
DisplayObjectContainer.prototype.getAbsoluteScaleX = function() {
    return this.scaleX * (this.parent ? this.parent.getAbsoluteScaleX() : 1)
};
DisplayObjectContainer.prototype.getAbsoluteScaleY = function() {
    return this.scaleY * (this.parent ? this.parent.getAbsoluteScaleY() : 1)
};
DisplayObjectContainer.prototype.getAbsoluteSkewX = function() {
    return this.skewX + (this.parent ? this.parent.getAbsoluteSkewX() : 0)
};
DisplayObjectContainer.prototype.getAbsoluteSkewY = function() {
    return this.skewY + (this.parent ? this.parent.getAbsoluteSkewY() : 0)
};
DisplayObjectContainer.prototype.render = function(a, c, e) {
    for (var f = 0; f < this.objects.length; f++) obj = this.objects[f], obj.destroy ? (this.removeChild(obj), f--) : obj.visible && obj.render(a, c, e)
};
DisplayObjectContainer.prototype.getX = function() {
    return Math.round(this.x * Utils.globalScale)
};
DisplayObjectContainer.prototype.getY = function() {
    return Math.round(this.y * Utils.globalScale)
};
DisplayObjectContainer.prototype.getWidth = function() {
    return this.width * Math.abs(this.getAbsoluteScaleX()) * Utils.globalScale
};
DisplayObjectContainer.prototype.getHeight = function() {
    return this.height * Math.abs(this.getAbsoluteScaleY()) * Utils.globalScale
};
DisplayObjectContainer.prototype.getPosition = function() {
    return {
        x: this.x,
        y: this.y
    }
};
DisplayObjectContainer.prototype.setPosition = function(a, c) {
    if ("undefined" == typeof c && "undefined" != typeof a.x && "undefined" != typeof a.y) return this.setPosition(a.x, a.y);
    this.x = parseFloat(a);
    this.y = parseFloat(c)
};
DisplayObjectContainer.prototype.setPropScale = function(a) {
    this.scaleX = this.scaleY = 1 * a
};
DisplayObjectContainer.prototype.getAnchor = function() {
    return this.anchor
};
DisplayObjectContainer.prototype.setAnchor = function(a, c) {
    if ("undefined" == typeof c && "undefined" != typeof a.x && "undefined" != typeof a.y) return this.setAnchor(a.x, a.y);
    this.anchor.x = parseFloat(a);
    this.anchor.y = parseFloat(c)
};
DisplayObjectContainer.prototype.alignAnchor = function(a, c) {
    a = parseInt(a);
    isNaN(a) && (a = DisplayObjectContainer.ANCHOR_ALIGN_CENTER);
    0 > a && (a = DisplayObjectContainer.ANCHOR_ALIGN_LEFT);
    0 < a && (a = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT);
    c = parseInt(c);
    isNaN(c) && (c = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE);
    0 > c && (c = DisplayObjectContainer.ANCHOR_VALIGN_TOP);
    0 < c && (c = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM);
    this.anchor.x = this.width * a / 2;
    this.anchor.y = this.height * c / 2;
    return this.getAnchor()
};
DisplayObjectContainer.prototype.getAbsoluteAnchor = function() {
    return this.getPosition()
};
DisplayObjectContainer.prototype.getRelativeCenter = function() {
    var a = this.getAnchor(),
        c = this.getAbsoluteRotation(),
        a = {
            x: a.x,
            y: a.y
        };
    0 != c ? (a = new Vector(-a.x * this.getAbsoluteScaleX(), -a.y * this.getAbsoluteScaleY()), a.rotate(-c)) : (a.x = -(a.x * this.getAbsoluteScaleX()), a.y = -(a.y * this.getAbsoluteScaleY()));
    return a
};
DisplayObjectContainer.prototype.getAbsolutePosition = function() {
    var a = {
        x: this.x,
        y: this.y
    };
    if (this.parent) {
        var c = this.parent.getAbsolutePosition(),
            e = this.parent.getAbsoluteRotation();
        if (0 != e) {
            var f = new Vector(a.x * this.parent.getAbsoluteScaleX(), a.y * this.parent.getAbsoluteScaleY());
            f.rotate(-e);
            a.x = c.x + f.x;
            a.y = c.y + f.y
        } else a.x = c.x + a.x * this.parent.getAbsoluteScaleX(), a.y = c.y + a.y * this.parent.getAbsoluteScaleY()
    }
    return a
};
DisplayObjectContainer.prototype.getAbsoluteCenter = function() {
    var a = this.getAbsolutePosition(),
        c = this.getRelativeCenter();
    a.x += c.x;
    a.y += c.y;
    return a
};
DisplayObjectContainer.prototype.getCenter = function() {
    return this.getAbsoluteCenter()
};
DisplayObjectContainer.prototype.getHitAreaRectangle = function() {
    if (!this.hitArea) return this.getDrawRectangle();
    var a = this.getAbsoluteRotation(),
        c = this.getAbsoluteScaleX(),
        e = this.getAbsoluteScaleY(),
        f = this.getCenter(),
        g = new Rectangle(0, 0, this.hitArea.width * Math.abs(c), this.hitArea.height * Math.abs(e), a);
    0 != a ? (c = new Vector(this.hitArea.x * c, this.hitArea.y * e), c.rotate(-a), g.move(f.x + c.x, f.y + c.y)) : g.move(f.x + this.hitArea.x * c, f.y + this.hitArea.x * e);
    return g
};
DisplayObjectContainer.prototype.getDrawRectangle = function() {
    var a = this.getCenter(),
        c = new Rectangle(0, 0, this.width * Math.abs(this.getAbsoluteScaleX()), this.height * Math.abs(this.getAbsoluteScaleY()), this.getAbsoluteRotation());
    c.move(a.x, a.y);
    return c
};
DisplayObjectContainer.prototype.getAABBRectangle = function() {
    var a = this.getDrawRectangle(),
        c = a.AABB[1].x - a.AABB[0].x,
        e = a.AABB[1].y - a.AABB[0].y;
    return new Rectangle(a.AABB[0].x + c / 2, a.AABB[0].y + e / 2, c, e, 0)
};
DisplayObjectContainer.prototype.localToGlobal = function(a, c) {
    var e = "object" == typeof a && "undefined" != typeof a.x && "undefined" != typeof a.y ? new Vector(a.x + 0, a.y + 0) : new Vector(a, c);
    e.rotate(this.getAbsoluteRotation()).add(this.getAbsolutePosition());
    return e
};
DisplayObjectContainer.prototype.globalToLocal = function(a, c) {
    var e = "object" == typeof a && "undefined" != typeof a.x && "undefined" != typeof a.y ? new Vector(a.x + 0, a.y + 0) : new Vector(a, c);
    e.subtract(this.getAbsolutePosition()).rotate(this.getAbsoluteRotation());
    return e
};
DisplayObjectContainer.prototype.findMaxZIndex = function() {
    for (var a = -1, c = !1, e = 0; e < this.objects.length; e++) this.objects[e].zIndex > a && (a = this.objects[e].zIndex, c = e);
    return {
        index: c,
        zIndex: a
    }
};
DisplayObjectContainer.prototype.findMinZIndex = function() {
    for (var a = -1, c = !1, e = 0; e < this.objects.length; e++) 0 == e && (a = this.objects[e].zIndex, c = 0), this.objects[e].zIndex < a && (a = this.objects[e].zIndex, c = e);
    return {
        index: c,
        zIndex: a
    }
};
DisplayObjectContainer.prototype.addChild = function(a) {
    var c = this.findMaxZIndex(),
        e = a.zIndex;
    a.zIndex = !1 !== c.index ? c.zIndex + 1 : 0;
    this.objectsCounter++;
    a.uid = this.objectsCounter;
    a.parent = this;
    a.setStage(this.stage);
    this.objects.push(a);
    0 != e && this.setChildZIndex(a, ~~e);
    a.dispatchEvent("add", {
        target: a
    });
    return a
};
DisplayObjectContainer.prototype.setStage = function(a) {
    this.stage = a;
    for (var c = 0; c < this.objects.length; c++) this.objects[c].setStage(a)
};
DisplayObjectContainer.prototype.removeChild = function(a) {
    a && 0 <= this.objects.indexOf(a) && (a.clear(), a.removeAllEventListeners(), a.dispatchEvent("remove", {
        target: a
    }), a.parent = null, this.objects = Utils.removeFromArray(this.objects, a))
};
DisplayObjectContainer.prototype.setChildZIndex = function(a, c) {
    a.zIndex = c;
    this.objects = this.objects.sort(function(a, c) {
        return a.zIndex == c.zIndex ? a.uid > c.uid ? 1 : -1 : a.zIndex > c.zIndex ? 1 : -1
    })
};
DisplayObjectContainer.prototype.getHitArea = function() {
    return this.hitArea ? this.hitArea : {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
    }
};
DisplayObjectContainer.prototype.hitTestPointObject = function(a, c, e, f, g) {
    var h, k, l, m, n, p, q;
    "boolean" == typeof a.pixelCheck && (f = a.pixelCheck);
    q = a.getHitArea();
    l = q.width * Math.abs(a.getAbsoluteScaleX());
    m = q.height * Math.abs(a.getAbsoluteScaleY());
    n = a.getAbsoluteCenter();
    h = n.x + q.x - l / 2;
    k = n.y + q.y - m / 2;
    n = c;
    p = e;
    a.ignoreViewport || (n += this.stage.viewport.x, p += this.stage.viewport.y);
    q = !1;
    0 == a.getAbsoluteRotation() ? h <= n && k <= p && h + l >= n && k + m >= p && (q = !0) : (h = a.getHitAreaRectangle(), h.hitTestPoint(new Vector(n, p)) && (q = !0));
    q && f && (this.stage.buffer.width = this.stage.canvas.width, this.stage.buffer.height = this.stage.canvas.height, this.stage.clearScreen(this.stage.buffer), a.render(this.stage.buffer, a.static, 0), c = this.stage.buffer.ctx.getImageData(Math.floor(c * Utils.globalScale), Math.floor(e * Utils.globalScale), 1, 1), 0 == c.data[3] && (q = !1));
    !q && g && a.dragged && (q = !0);
    return q
};
DisplayObjectContainer.prototype.getObjectsStackByCoord = function(a, c, e, f) {
    for (var g, h = [], k = this.objects.length - 1; 0 <= k; k--) this.objects[k].visible && (g = this.objects[k], g.objects && g.objects.length && (h = h.concat(g.getObjectsStackByCoord(a, c, e, f))), this.hitTestPointObject(g, a, c, e, f) && h.push(g));
    return h
};
DisplayObjectContainer.prototype.doDrag = function(a, c) {
    for (var e = 0; e < this.objects.length; e++) this.objects[e].doDrag(a, c);
    if (this.dragged) {
        var e = a,
            f = c;
        this.ignoreViewport || (e += this.stage.viewport.x, f += this.stage.viewport.y);
        this.x = e - this.dragX;
        this.y = f - this.dragY
    }
};
DisplayObjectContainer.prototype.checkMouseOut = function(a, c) {
    for (var e = this.objects.length - 1; 0 <= e; e--)
        if (!1 === this.objects[e].checkMouseOut(a, c)) return;
    if (this.mouseOn && 0 > a.indexOf(this)) return this.mouseOn = !1, e = this.stage.finalizeMouseCoords(this, c), this.dispatchEvent("mouseout", {
        target: this,
        x: e.x,
        y: e.y
    })
};
DisplayObjectContainer.prototype.getMaxZIndexInStack = function(a) {
    for (var c = -1, e = 0, f = 0; f < a.length; f++) a[f].zIndex > c && (c = a[f].zIndex, e = f);
    return e
};
DisplayObjectContainer.prototype.sortStack = function(a, c) {
    return a.sort(function(a, f) {
        a.zIndex == f.zIndex ? c ? a.uid < f.uid ? 1 : -1 : a.uid > f.uid ? 1 : -1 : c ? a.zIndex < f.zIndex ? 1 : -1 : a.zIndex > f.zIndex ? 1 : -1
    })
};
DisplayObjectContainer.prototype.clear = function() {
    for (; this.objects.length;) this.removeChild(this.objects[0])
};
DisplayObjectContainer.prototype.getFillStyle = function(a) {
    var c = null;
    if (this.fillLinearGradient) {
        a = a.ctx.createLinearGradient(this.fillLinearGradient.x0 * Utils.globalScale, this.fillLinearGradient.y0 * Utils.globalScale, this.fillLinearGradient.x1 * Utils.globalScale, this.fillLinearGradient.y1 * Utils.globalScale);
        for (c = 0; c < this.fillLinearGradient.points.length; c++) a.addColorStop(this.fillLinearGradient.points[c].point, this.fillLinearGradient.points[c].color);
        c = a
    } else if (this.fillRadialGradient) {
        a = a.ctx.createRadialGradient(this.fillRadialGradient.x0 *
            Utils.globalScale, this.fillRadialGradient.y0 * Utils.globalScale, this.fillRadialGradient.r0 * Utils.globalScale, this.fillRadialGradient.x1 * Utils.globalScale, this.fillRadialGradient.y1 * Utils.globalScale, this.fillRadialGradient.r1 * Utils.globalScale);
        for (c = 0; c < this.fillRadialGradient.points.length; c++) a.addColorStop(this.fillRadialGradient.points[c].point, this.fillRadialGradient.points[c].color);
        c = a
    } else c = this.fillPattern ? a.ctx.createPattern(this.fillPattern.img, this.fillPattern.repeat) : this.fillColor;
    return c
};
DisplayObjectContainer.ANCHOR_ALIGN_LEFT = -1;
DisplayObjectContainer.ANCHOR_ALIGN_CENTER = 0;
DisplayObjectContainer.ANCHOR_ALIGN_RIGHT = 1;
DisplayObjectContainer.ANCHOR_VALIGN_TOP = -1;
DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE = 0;
DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM = 1;
var ANCHOR_ALIGN_LEFT = DisplayObjectContainer.ANCHOR_ALIGN_LEFT,
    ANCHOR_ALIGN_CENTER = DisplayObjectContainer.ANCHOR_ALIGN_CENTER,
    ANCHOR_ALIGN_RIGHT = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT,
    ANCHOR_VALIGN_TOP = DisplayObjectContainer.ANCHOR_VALIGN_TOP,
    ANCHOR_VALIGN_MIDDLE = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE,
    ANCHOR_VALIGN_BOTTOM = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM;

function DisplayObject() {
    Utils.callSuperConstructor(DisplayObject, this);
    this.uid = 0;
    this.shadowColor = this.stage = null;
    this.zIndex = this.shadowBlur = this.shadowOffsetY = this.shadowOffsetX = 0;
    this.visible = !0;
    this.dragged = this.destroy = this.ignoreViewport = this.static = !1;
    this.dragY = this.dragX = 0;
    this.mouseOn = !1;
    this.allowDebugDrawing = !0;
    this.onbox2dsync = this.onremove = this.onadd = this.onrender = this.onenterframe = this.onprerender = this.onmousemove = this.oncontextmenu = this.onclick = this.onmouseup = this.onmousedown = this.onmouseout =
        this.onmouseover = this.pixelCheck = null
}
Utils.extend(DisplayObject, DisplayObjectContainer);
DisplayObject.prototype.setStatic = function(a) {
    a = Boolean(a);
    for (var c = 0; c < this.objects.length; c++) this.objects[c].setStatic(a);
    return this.static != a ? (this.static = a, this.stage && this.stage.refreshBackground(), !0) : !1
};
DisplayObject.prototype.startDrag = function(a, c) {
    this.dragged = !0;
    this.dragX = a;
    this.dragY = c
};
DisplayObject.prototype.stopDrag = function() {
    this.dragged = !1;
    this.dragY = this.dragX = 0
};
DisplayObject.prototype.removeTweens = function() {
    this.stage && this.stage.clearObjectTweens(this)
};
DisplayObject.prototype.addTween = function(a, c, e, f, g, h) {
    if (this.stage) {
        var k = this[a];
        if (!isNaN(k)) return a = this.stage.createTween(this, a, k, c, e, f), a.onchange = h, a.onfinish = g, a
    }
};
DisplayObject.prototype.moveTo = function(a, c, e, f, g, h) {
    e = ~~e;
    0 >= e ? this.setPosition(a, c) : ((a = this.addTween("x", a, e, f)) && a.play(), (c = this.addTween("y", c, e, f, g, h)) && c.play());
    return this
};
DisplayObject.prototype.moveBy = function(a, c, e, f, g, h) {
    return this.moveTo(this.x + a, this.y + c, e, f, g, h)
};
DisplayObject.prototype.fadeTo = function(a, c, e, f, g) {
    c = ~~c;
    0 >= c ? this.opacity = a : (a = this.addTween("opacity", a, c, e, f, g)) && a.play();
    return this
};
DisplayObject.prototype.fadeBy = function(a, c, e, f, g) {
    a = Math.max(0, Math.min(1, this.opacity + a));
    return this.fadeTo(a, c, e, f, g)
};
DisplayObject.prototype.rotateTo = function(a, c, e, f, g) {
    c = ~~c;
    0 >= c ? this.rotation = a : (a = this.addTween("rotation", a, c, e, f, g)) && a.play();
    return this
};
DisplayObject.prototype.rotateBy = function(a, c, e, f, g) {
    return this.rotateTo(this.rotation + a, c, e, f, g)
};
DisplayObject.prototype.skewXTo = function(a, c, e, f, g) {
    c = ~~c;
    0 >= c ? this.skewX = a : (a = this.addTween("skewX", a, c, e, f, g)) && a.play();
    return this
};
DisplayObject.prototype.skewXBy = function(a, c, e, f, g) {
    return this.skewXTo(this.skewX + a, c, e, f, g)
};
DisplayObject.prototype.skewYTo = function(a, c, e, f, g) {
    c = ~~c;
    0 >= c ? this.skewY = a : (a = this.addTween("skewY", a, c, e, f, g)) && a.play();
    return this
};
DisplayObject.prototype.skewYBy = function(a, c, e, f, g) {
    return this.skewYTo(this.skewY + a, c, e, f, g)
};
DisplayObject.prototype.scaleTo = function(a, c, e, f, g) {
    c = ~~c;
    if (0 >= c) this.scaleX = this.scaleY = a;
    else {
        var h = this.addTween("scaleX", a, c, e, f, g);
        h && h.play();
        (a = this.addTween("scaleY", a, c, e, h ? null : f, h ? null : g)) && a.play()
    }
    return this
};
DisplayObject.prototype.setZIndex = function(a) {
    this.zIndex = ~~a;
    this.parent && this.parent.setChildZIndex(this, this.zIndex)
};
DisplayObject.prototype.hitTestPoint = function(a, c, e, f, g) {
    return this.stage ? this.stage.hitTestPointObject(this, a, c, e, f, g) : !1
};
DisplayObject.prototype.setRelativePosition = function(a, c, e, f) {
    switch (e) {
        case "right":
            a = this.stage.screenWidth - a;
            break;
        case "left":
            break;
        default:
            a = this.stage.screenWidth / 2 + a
    }
    switch (f) {
        case "bottom":
            c = this.stage.screenHeight - c;
            break;
        case "top":
            break;
        default:
            c = this.stage.screenHeight / 2 + c
    }
    this.setPosition(a, c)
};
DisplayObject.prototype.debugDraw = function() {
    if (this.visible && this.allowDebugDrawing) {
        var a = this.getAbsolutePosition(),
            c = this.getCenter(),
            e = this.getDrawRectangle(),
            f = this.getAABBRectangle();
        stage.drawCircle(a.x, a.y, 1, 1, "rgba(255,0,0,0.9)");
        stage.drawCircle(c.x, c.y, 1, 1, "rgba(0,255,0,0.9)");
        stage.drawLine(a.x, a.y, c.x, c.y, 1, "rgba(255,255,255,0.5)");
        stage.drawPolygon(e.vertices, .5, "rgba(255,0,255,0.5)", 1);
        stage.drawLine(f.vertices[0].x, f.vertices[0].y, f.vertices[2].x, f.vertices[2].y, 1, "rgba(255,255,255,0.5)");
        stage.drawLine(f.vertices[2].x, f.vertices[0].y, f.vertices[0].x, f.vertices[2].y, 1, "rgba(255,255,255,0.5)");
        stage.drawPolygon(f.vertices, .5, "rgba(255,255,255,0.5)")
    }
};
DisplayObject.prototype.clone = function() {
    return Utils.clone(this)
};

function Graphics() {
    Utils.callSuperConstructor(Graphics, this);
    this.y = this.x = 0;
    this.color = "#000";
    this.lineWidth = 1
}
Utils.extend(Graphics, DisplayObject);
Graphics.prototype.render = function(a, c, e) {
    !!this.static == !!c && this.dispatchEvent("render", {
        target: this,
        canvas: a,
        delta: e
    });
    Utils.callSuperMethod(Graphics, this, "render", a, c, e)
};
Graphics.prototype.prepareCanvas = function(a, c) {
    c.ctx.save();
    this.ignoreViewport || (a.x -= this.stage.viewport.x, a.y -= this.stage.viewport.y);
    a.x *= Utils.globalScale;
    a.y *= Utils.globalScale;
    c.ctx.translate(a.x, a.y);
    var e = this.getAbsoluteRotation();
    c.ctx.rotate(e);
    c.ctx.scale(this.getAbsoluteScaleX(), this.getAbsoluteScaleY());
    var f = this.getAbsoluteSkewX(),
        g = this.getAbsoluteSkewY();
    0 == f && 0 == g || c.ctx.transform(1, f, g, 1, 0, 0);
    this.shadowColor && (c.ctx.shadowColor = this.shadowColor, 0 != e ? (f = new Vector(this.shadowOffsetX *
        Utils.globalScale, this.shadowOffsetY * Utils.globalScale), f.rotate(-e), c.ctx.shadowOffsetX = f.x, c.ctx.shadowOffsetY = f.y) : (c.ctx.shadowOffsetX = this.shadowOffsetX * Utils.globalScale, c.ctx.shadowOffsetY = this.shadowOffsetY * Utils.globalScale), c.ctx.shadowBlur = this.shadowBlur * Utils.globalScale)
};
Graphics.prototype.preparePath = function(a) {
    a.ctx.beginPath();
    a.ctx.strokeStyle = 0 < this.lineWidth ? this.color : "transparent";
    a.ctx.lineWidth = this.lineWidth * Utils.globalScale;
    a.ctx.globalAlpha = this.getAbsoluteOpacity();
    a.ctx.fillStyle = this.getFillStyle(a)
};
Graphics.prototype.finalizeCanvas = function(a) {
    (this.fillColor || this.fillLinearGradient || this.fillRadialGradient || this.fillPattern) && a.ctx.fill();
    a.ctx.stroke()
};
Graphics.prototype.restoreCanvas = function(a) {
    a.ctx.restore()
};
Graphics.circle = function(a, c, e) {
    Utils.callSuperConstructor(Graphics.circle, this);
    this.x = a;
    this.y = c;
    this.radius = e;
    this.width = 2 * e;
    this.height = 2 * e
};
Utils.extend(Graphics.circle, Graphics);
Graphics.circle.prototype.render = function(a, c, e) {
    !!this.static == !!c && (this.prepareCanvas(this.getAbsoluteCenter(), a), this.preparePath(a), a.ctx.arc(0, 0, this.radius * Utils.globalScale, 0, 2 * Math.PI), this.finalizeCanvas(a), this.restoreCanvas(a));
    Utils.callSuperMethod(Graphics.circle, this, "render", a, c, e)
};
Graphics.line = function(a, c, e, f) {
    Utils.callSuperConstructor(Graphics.line, this);
    this.x1 = a;
    this.x2 = e;
    this.y1 = c;
    this.y2 = f
};
Utils.extend(Graphics.line, Graphics);
Graphics.line.prototype.render = function(a, c, e) {
    !!this.static == !!c && (this.prepareCanvas(this.getAbsoluteCenter(), a), this.preparePath(a), a.ctx.moveTo(this.x1 * Utils.globalScale, this.y1 * Utils.globalScale), a.ctx.lineTo(this.x2 * Utils.globalScale, this.y2 * Utils.globalScale), this.finalizeCanvas(a), this.restoreCanvas(a));
    Utils.callSuperMethod(Graphics.line, this, "render", a, c, e)
};
Graphics.rectangle = function(a, c, e, f) {
    Utils.callSuperConstructor(Graphics.rectangle, this);
    this.x = a;
    this.y = c;
    this.width = e;
    this.height = f
};
Utils.extend(Graphics.rectangle, Graphics);
Graphics.rectangle.prototype.render = function(a, c, e) {
    !!this.static == !!c && (this.prepareCanvas(this.getAbsoluteCenter(), a), this.preparePath(a), a.ctx.rect(-this.width / 2 * Utils.globalScale, -this.height / 2 * Utils.globalScale, this.width * Utils.globalScale, this.height * Utils.globalScale), this.finalizeCanvas(a), this.restoreCanvas(a));
    Utils.callSuperMethod(Graphics.rectangle, this, "render", a, c, e)
};
Graphics.arc = function(a, c, e, f, g, h) {
    Utils.callSuperConstructor(Graphics.arc, this);
    this.x = a;
    this.y = c;
    this.radius = e;
    this.startAngle = f;
    this.endAngle = g;
    this.antiClockWise = h;
    this.width = 2 * e;
    this.height = 2 * e
};
Utils.extend(Graphics.arc, Graphics);
Graphics.arc.prototype.render = function(a, c, e) {
    !!this.static == !!c && (this.prepareCanvas(this.getAbsoluteCenter(), a), this.preparePath(a), a.ctx.arc(0, 0, this.radius * Utils.globalScale, this.startAngle, this.endAngle, this.antiClockWise), this.finalizeCanvas(a), this.restoreCanvas(a));
    Utils.callSuperMethod(Graphics.arc, this, "render", a, c, e)
};
Graphics.polygon = function(a) {
    if (!a || 2 > a.length) throw Error("Invalid parameters");
    Utils.callSuperConstructor(Graphics.polygon, this);
    this.points = a;
    for (var c = Number.MAX_VALUE, e = Number.MAX_VALUE, f = Number.MIN_VALUE, g = Number.MIN_VALUE, h = 0; h < a.length; h++) a[h].x < c && (c = a[h].x), a[h].y < e && (e = a[h].y), a[h].x > f && (f = a[h].x), a[h].y > g && (g = a[h].y);
    this.width = f - c;
    this.height = g - e
};
Utils.extend(Graphics.polygon, Graphics);
Graphics.polygon.prototype.render = function(a, c, e) {
    if (!!this.static == !!c) {
        this.prepareCanvas(this.getAbsoluteCenter(), a);
        this.preparePath(a);
        a.ctx.moveTo(this.points[0].x * Utils.globalScale, this.points[0].y * Utils.globalScale);
        for (var f = 1; f < this.points.length; f++) a.ctx.lineTo(this.points[f].x * Utils.globalScale, this.points[f].y * Utils.globalScale);
        a.ctx.lineTo(this.points[0].x * Utils.globalScale, this.points[0].y * Utils.globalScale);
        this.finalizeCanvas(a);
        this.restoreCanvas(a)
    }
    Utils.callSuperMethod(Graphics.polygon,
        this, "render", a, c, e)
};
Graphics.text = function(a, c, e) {
    Utils.callSuperConstructor(Graphics.text, this);
    this.x = a;
    this.y = c;
    this.text = e;
    this.align = Graphics.text.ALIGN_LEFT;
    this.valign = Graphics.text.VALIGN_MIDDLE;
    this.style = "normal";
    this.size = 10;
    this.font = "sans-serif"
};
Utils.extend(Graphics.text, Graphics);
Graphics.text.ALIGN_LEFT = "left";
Graphics.text.ALIGN_CENTER = "center";
Graphics.text.ALIGN_RIGHT = "right";
Graphics.text.VALIGN_TOP = "top";
Graphics.text.VALIGN_MIDDLE = "middle";
Graphics.text.VALIGN_BOTTOM = "bottom";
Graphics.text.prototype.getRect = function(a) {
    return a.ctx.measureText(this.text)
};
Graphics.text.prototype.render = function(a, c, e) {
    !!this.static == !!c && (this.prepareCanvas(this.getAbsoluteCenter(), a), this.preparePath(a), a.ctx.font = this.style + " " + Math.floor(this.size * Utils.globalScale) + "px " + this.font, a.ctx.textAlign = this.align, a.ctx.textBaseline = this.valign, this.fillColor && a.ctx.fillText(this.text, 0, 0), a.ctx.strokeText(this.text, 0, 0), this.finalizeCanvas(a), this.restoreCanvas(a));
    Utils.callSuperMethod(Graphics.text, this, "render", a, c, e)
};
Graphics.free = function() {
    this.commands = [];
    Utils.callSuperConstructor(Graphics.free, this)
};
Utils.extend(Graphics.free, Graphics);
Graphics.free.prototype.clear = function() {
    this.commands = []
};
Graphics.free.prototype.beginPath = function() {
    this.commands.push({
        command: "beginPath"
    });
    return this
};
Graphics.free.prototype.stroke = function() {
    this.commands.push({
        command: "stroke"
    });
    return this
};
Graphics.free.prototype.setStrokeStyle = function(a) {
    this.commands.push({
        command: "setStrokeStyle",
        style: a
    });
    return this
};
Graphics.free.prototype.setFillStyle = function(a) {
    this.commands.push({
        command: "setFillStyle",
        style: a
    });
    return this
};
Graphics.free.prototype.fill = function() {
    this.commands.push({
        command: "fill"
    });
    return this
};
Graphics.free.prototype.moveTo = function(a, c) {
    this.commands.push({
        command: "moveTo",
        x: a,
        y: c
    });
    return this
};
Graphics.free.prototype.lineTo = function(a, c) {
    this.commands.push({
        command: "lineTo",
        x: a,
        y: c
    });
    return this
};
Graphics.free.prototype.arc = function(a, c, e, f, g, h) {
    this.commands.push({
        command: "arc",
        x: a,
        y: c,
        radius: e,
        startAngle: f,
        endAngle: g,
        antiClockWise: h
    });
    return this
};
Graphics.free.prototype.circle = function(a, c, e) {
    this.commands.push({
        command: "circle",
        x: a,
        y: c,
        radius: e
    });
    return this
};
Graphics.free.prototype.rect = function(a, c, e, f) {
    this.commands.push({
        command: "circle",
        x: a,
        y: c,
        width: e,
        height: f
    });
    return this
};
Graphics.free.prototype.polygon = function(a) {
    this.commands.push({
        command: "polygon",
        points: a
    });
    return this
};
Graphics.free.prototype.executeCommand = function(a, c) {
    switch (c.command) {
        case "beginPath":
            a.ctx.beginPath();
            break;
        case "stroke":
            a.ctx.stroke();
            break;
        case "fill":
            a.ctx.fill();
            break;
        case "setStrokeStyle":
            a.ctx.strokeStyle = 0 < this.lineWidth ? c.style : "transparent";
            break;
        case "setFillStyle":
            a.ctx.fillStyle = c.style;
            break;
        case "moveTo":
            a.ctx.moveTo(c.x * Utils.globalScale, c.y * Utils.globalScale);
            break;
        case "lineTo":
            a.ctx.lineTo(c.x * Utils.globalScale, c.y * Utils.globalScale);
            break;
        case "arc":
            a.ctx.arc(c.x * Utils.globalScale,
                c.y * Utils.globalScale, c.radius * Utils.globalScale, c.startAngle, c.endAngle, c.antiClockWise);
            break;
        case "circle":
            a.ctx.arc(c.x * Utils.globalScale, c.y * Utils.globalScale, c.radius * Utils.globalScale, 0, 2 * Math.PI);
            break;
        case "rect":
            a.ctx.rect((c.x - c.width / 2) * Utils.globalScale, (c.y - c.height / 2) * Utils.globalScale, c.width * Utils.globalScale, \u0441.height * Utils.globalScale);
            break;
        case "polygon":
            a.ctx.moveTo(c.points[0].x * Utils.globalScale, c.points[0].y * Utils.globalScale);
            for (var e = 1; e < c.points.length; e++) a.ctx.lineTo(c.points[e].x *
                Utils.globalScale, c.points[e].y * Utils.globalScale);
            a.ctx.lineTo(c.points[0].x * Utils.globalScale, c.points[0].y * Utils.globalScale)
    }
};
Graphics.free.prototype.executeCommands = function(a) {
    for (var c = 0; c < this.commands.length; c++) this.executeCommand(a, this.commands[c])
};
Graphics.free.prototype.render = function(a, c, e) {
    !!this.static == !!c && (this.prepareCanvas(this.getAbsoluteCenter(), a), this.preparePath(a), this.executeCommands(a), this.finalizeCanvas(a), this.restoreCanvas(a));
    Utils.callSuperMethod(Graphics.free, this, "render", a, c, e)
};
var BitmapsCache = {
    bitmaps: {},
    cache: function(a) {
        if (!(a && a instanceof Image)) return a;
        if (BitmapsCache.bitmaps[a.src]) return BitmapsCache.bitmaps[a.src];
        cns = document.createElement("canvas");
        cns.width = a.width;
        cns.height = a.height;
        ctx = cns.getContext("2d");
        ctx.drawImage(a, 0, 0, a.width, a.height, 0, 0, a.width, a.height);
        return BitmapsCache.bitmaps[a.src] = cns
    }
};

function Sprite(a, c, e, f, g) {
    Utils.callSuperConstructor(Sprite, this);
    this.width = c;
    this.height = e;
    this.offset = {
        left: 0,
        top: 0
    };
    this.animated = !0;
    this.animDirection = 1;
    this.currentFrame = 0;
    this.totalFrames = Math.max(1, ~~f);
    1 >= this.totalFrames && (this.animated = !1);
    this.currentLayer = 0;
    this.totalLayers = Math.max(1, ~~g);
    this.bitmap = a;
    this.mask = null;
    this.isMask = !1;
    this.maskParent = null;
    this.maskInvert = !1;
    this.animStep = 0;
    this.animDelay = 1;
    this.changeFrameDelay = Sprite.CHANGE_FRAME_DELAY;
    this.changeFrameTime = 0;
    this.onchangeframe =
        null;
    this.cacheBitmap = Sprite.CACHE_BITMAPS
}
Utils.extend(Sprite, DisplayObject);
Sprite.create = function(a, c) {
    if ("string" == typeof a) {
        c = c || window.library;
        if (!c) throw Error("Could not create sprite from asset '%s'. Library not found.", a);
        a = c.getAsset(a)
    }
    return new Sprite(a.bitmap, a.width || 1, a.height || 1, a.frames || 1, a.layers || 1)
};
Sprite.prototype.play = function() {
    this.animated = !0
};
Sprite.prototype.stop = function() {
    this.animated = !1
};
Sprite.prototype.gotoAndStop = function(a) {
    this.currentFrame = a;
    this.stop()
};
Sprite.prototype.gotoAndPlay = function(a) {
    this.currentFrame = a;
    this.play()
};
Sprite.prototype.nextFrame = function(a) {
    this.dispatchEvent("enterframe", {
        target: this,
        delta: a
    });
    var c = 1;
    if (Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME)
        if (this.changeFrameTime += a, this.changeFrameTime >= this.changeFrameDelay * this.animDelay) c = Math.floor(this.changeFrameTime / (this.changeFrameDelay * this.animDelay)), this.changeFrameTime -= Math.abs(c) * this.changeFrameDelay * this.animDelay;
        else return;
    else this.animStep++;
    if (this.animStep >= this.animDelay || Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME) {
        for (var e =
                0; e < c; e++) this.animated && (this.currentFrame += this.animDirection), 0 < this.animDirection && this.currentFrame >= this.totalFrames && (this.currentFrame = 0), 0 > this.animDirection && 0 > this.currentFrame && (this.currentFrame = this.totalFrames - 1), this.dispatchEvent("changeframe", {
            target: this,
            delta: a
        });
        this.animStep = 0
    }
};
Sprite.prototype.setMask = function(a) {
    this.mask = a;
    this.mask.isMask = !0;
    this.mask.stage = this.stage;
    this.mask.maskParent = this
};
Sprite.prototype.renderBack = function(a, c, e, f, g, h) {
    c && (a.ctx.fillStyle = c, a.ctx.strokeStyle = c, a.ctx.fillRect(e, f, g, h))
};
Sprite.prototype.renderBitmap = function(a, c, e, f, g) {
    var h = {
        x: 0,
        y: 0,
        width: f,
        height: g
    };
    if (this.bitmap) {
        var k = this.bitmap.width,
            l = this.bitmap.height,
            m = this.currentLayer * f + this.offset.left * Utils.globalScale,
            n = this.currentFrame * g + this.offset.top * Utils.globalScale;
        if (m < k && n < l) {
            var p = f,
                q = g;
            m + p > k && (p = k - m);
            n + q > l && (q = l - n);
            Sprite.FLOOR_VALUES_ON_RENDER && (m = ~~m, n = ~~n, p = ~~p, q = ~~q, c = ~~c, e = ~~e, f = ~~f, g = ~~g);
            0 < p && 0 < q && 0 < f && 0 < g && a.ctx.drawImage(this.cacheBitmap ? BitmapsCache.cache(this.bitmap) : this.bitmap, m, n, p, q, c, e,
                f, g);
            h.x = m;
            h.y = n;
            h.width = p;
            h.height = q
        }
    }
    return h
};
Sprite.prototype.render = function(a, c, e, f) {
    if (!this.isMask || f) {
        if (!!this.static == !!c) {
            e || (e = 0);
            this.nextFrame(e);
            if (!1 === this.dispatchEvent("prerender", {
                    target: this,
                    canvas: a,
                    delta: e
                }) || !this.stage) return;
            var g = this.getAbsoluteCenter();
            if (f) {
                var g = {
                        x: this.x - this.getAnchor().x,
                        y: this.y - this.getAnchor().y
                    },
                    h = this.parent ? this.parent : this.maskParent;
                h && (g.x += h.getAnchor().x + h.width / 2, g.y += h.getAnchor().y + h.height / 2)
            }
            f = this.width * Utils.globalScale;
            var k = this.height * Utils.globalScale,
                l = g.x * Utils.globalScale -
                f / 2,
                g = g.y * Utils.globalScale - k / 2,
                m = this.getAbsoluteRotation(),
                h = this.getAbsoluteScaleX(),
                n = this.getAbsoluteScaleY(),
                p = this.getAbsoluteSkewX(),
                q = this.getAbsoluteSkewY(),
                r = this.getFillStyle(a),
                s = Boolean(0 != m || 1 != h || 1 != n || this.shadowColor || r || 0 != p || 0 != q);
            this.ignoreViewport || (l -= this.stage.viewport.x * Utils.globalScale, g -= this.stage.viewport.y * Utils.globalScale);
            s && (a.ctx.save(), a.ctx.translate(l + f / 2, g + k / 2), a.ctx.rotate(m), a.ctx.scale(h, n), 0 == p && 0 == q || a.ctx.transform(1, p, q, 1, 0, 0), l = -(f / 2), g = -(k / 2), this.shadowColor &&
                (0 != m ? (h = new Vector(this.shadowOffsetX * Utils.globalScale, this.shadowOffsetY * Utils.globalScale), h.rotate(-m), a.ctx.shadowOffsetX = h.x, a.ctx.shadowOffsetY = h.y) : (a.ctx.shadowOffsetX = this.shadowOffsetX * Utils.globalScale, a.ctx.shadowOffsetY = this.shadowOffsetY * Utils.globalScale), a.ctx.shadowColor = this.shadowColor, a.ctx.shadowBlur = this.shadowBlur * Utils.globalScale));
            a.ctx.globalAlpha = this.getAbsoluteOpacity();
            this.ceilSizes && (f = Math.ceil(f), k = Math.ceil(k));
            this.mask ? (this.stage.buffer.ctx.save(), this.stage.buffer.ctx.clearRect(0,
                0, f, k), this.renderBack(this.stage.buffer, r, 0, 0, f, k), m = this.renderBitmap(this.stage.buffer, 0, 0, f, k), this.stage.buffer.ctx.globalCompositeOperation = this.maskInvert ? "destination-out" : "destination-in", this.mask.render ? this.mask.render(this.stage.buffer, c, e, !0) : this.stage.buffer.ctx.drawImage(this.mask, this.mask.x ? this.mask.x : 0, this.mask.y ? this.mask.y : 0), Sprite.FLOOR_VALUES_ON_RENDER ? a.ctx.drawImage(this.stage.buffer, 0, 0, m.width, m.height, ~~l, ~~g, ~~f, ~~k) : a.ctx.drawImage(this.stage.buffer, 0, 0, m.width, m.height,
                l, g, f, k), this.stage.buffer.ctx.restore()) : (this.renderBack(a, r, l, g, f, k), this.renderBitmap(a, l, g, f, k));
            s && a.ctx.restore();
            this.stage.allowDebugDrawing && this.allowDebugDrawing && (!this.stage.allowStaticDebugDrawing && this.static || this.debugDraw());
            this.dispatchEvent("render", {
                target: this,
                canvas: a,
                delta: e
            })
        }
        Utils.callSuperMethod(Sprite, this, "render", a, c, e)
    }
};
Sprite.CHANGE_FRAME_BY_FRAME = 0;
Sprite.CHANGE_FRAME_BY_TIME = 1;
Sprite.CHANGE_FRAME_DELAY = 1E3 / 24;
Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_FRAME;
Sprite.FLOOR_VALUES_ON_RENDER = !0;
Sprite.CACHE_BITMAPS = Utils.isIOS();

function StageTimer(a, c, e) {
    Utils.callSuperConstructor(StageTimer, this);
    this.repeat = e;
    this.timeout = this.initialTimeout = c;
    this.onend = a;
    this.ontick = null;
    this.newly = !0;
    this.paused = !1
}
Utils.extend(StageTimer, EventsProxy);
StageTimer.prototype.update = function(a) {
    if (!this.paused) {
        StageTimer.TIMEOUT_TYPE == StageTimer.TIMEOUT_BY_FRAME ? this.timeout-- : this.timeout -= a;
        if (0 >= this.timeout)
            if ("string" == typeof this.onend ? eval(this.onend) : this.dispatchEvent("end", {
                    target: this
                }), this.repeat) this.timeout = this.initialTimeout;
            else return !0;
        this.dispatchEvent("tick", {
            target: this,
            delta: a
        });
        return !1
    }
};
StageTimer.prototype.resume = function() {
    this.paused = !1
};
StageTimer.prototype.pause = function() {
    this.paused = !0
};
StageTimer.TIMEOUT_BY_FRAME = 0;
StageTimer.TIMEOUT_BY_TIME = 1;
StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_FRAME;

function Stage(a, c, e) {
    Utils.callSuperConstructor(Stage, this);
    this.canvas = null;
    a && (this.canvas = document.getElementById(a), this.canvas.ctx = this.canvas.getContext("2d"));
    this.backgroundCanvas = null;
    this.needToRebuildBack = !1;
    this.screenWidth = c;
    this.screenHeight = e;
    this.viewport = {
        x: 0,
        y: 0
    };
    this.buffer = null;
    try {
        this.buffer = document.createElement("canvas"), this.buffer.width = c * Utils.globalScale, this.buffer.height = e * Utils.globalScale, this.buffer.ctx = this.buffer.getContext("2d")
    } catch (f) {
        this.buffer = this.canvas
    }
    this.delay =
        40;
    this.started = !1;
    this.lastFPS = this.fps = 0;
    this.ceilSizes = this.pixelMouseMoveEvent = this.pixelMouseDownEvent = this.pixelMouseUpEvent = this.pixelClickEvent = this.showFPS = !1;
    this.tmFPS = this.tmMain = null;
    this.allowStaticDebugDrawing = this.allowDebugDrawing = this.clearLock = !1;
    this.drawBackAlways = Utils.mobileCheckBrokenAndroid();
    this.tweens = [];
    this.timers = [];
    this.eventsListeners = [];
    this.lastTick = 0;
    this.onmousemove = this.oncontextmenu = this.onclick = this.onmouseup = this.onmousedown = this.onposttick = this.onpretick =
        this.inputController = null;
    this.canvas && this.addInputListeners(this.canvas);
    this.tick = Utils.proxy(this.tick, this);
    this.clearFPS = Utils.proxy(this.clearFPS, this);
    this.stage = this;
    this.drawScene = this.render
}
Utils.extend(Stage, DisplayObjectContainer);
Stage.prototype.refreshBackground = function() {
    this.needToRebuildBack = !0
};
Stage.prototype.setBackgroundCanvas = function(a) {
    a && (this.backgroundCanvas = document.getElementById(a), this.backgroundCanvas.ctx = this.backgroundCanvas.getContext("2d"))
};
Stage.prototype.destroy = function() {
    clearTimeout(this.tmMain);
    clearTimeout(this.tmFPS);
    this.stop();
    this.clear();
    this.clearScreen(this.canvas);
    this.backgroundCanvas && this.clearScreen(this.backgroundCanvas);
    this.removeInputListeners(this.stage)
};
Stage.prototype.clearScreen = function(a) {
    this.clearLock || a.ctx.clearRect(0, 0, Math.floor(a.width), Math.floor(a.height))
};
Stage.prototype.addChild = function(a) {
    a.stage = this;
    return Utils.callSuperMethod(Stage, this, "addChild", a)
};
Stage.prototype.setZIndex = function(a, c) {
    this.setChildZIndex(a, c)
};
Stage.prototype.removeChild = function(a) {
    a && 0 <= this.objects.indexOf(a) && (this.clearObjectTweens(a), a.stage = null, Utils.callSuperMethod(Stage, this, "removeChild", a))
};
Stage.prototype.finalizeMouseCoords = function(a, c) {
    if (!a) return c;
    var e = this.prepareMouseCoord(c.x),
        f = this.prepareMouseCoord(c.y);
    a.ignoreViewport || (e += this.viewport.x, f += this.viewport.y);
    e -= a.x;
    f -= a.y;
    return {
        x: e,
        y: f
    }
};
Stage.prototype.prepareMouseCoord = function(a) {
    return a / Utils.globalScale / Utils.globalPixelScale
};
Stage.prototype.processMouseEvent = function(a, c, e) {
    a = Utils.getMouseCoord(a, this.inputController);
    e = this.getObjectsStackByCoord(this.prepareMouseCoord(a.x), this.prepareMouseCoord(a.y), e, !1);
    for (var f, g = 0; g < e.length; g++)
        if (f = this.finalizeMouseCoords(e[g], a), f = e[g].dispatchEvent(c, {
                target: e[g],
                x: f.x,
                y: f.y
            }), !1 === f) return;
    this.dispatchEvent(c, {
        target: this,
        x: Math.floor(this.prepareMouseCoord(a.x)),
        y: Math.floor(this.prepareMouseCoord(a.y))
    })
};
Stage.prototype.checkClick = function(a) {
    this.processMouseEvent(a, "click", this.pixelClickEvent)
};
Stage.prototype.checkContextMenu = function(a) {
    this.processMouseEvent(a, "contextmenu", this.pixelClickEvent)
};
Stage.prototype.checkMouseMove = function(a) {
    a = Utils.getMouseCoord(a, this.inputController);
    this.doDrag(this.prepareMouseCoord(a.x), this.prepareMouseCoord(a.y));
    var c = this.getObjectsStackByCoord(this.prepareMouseCoord(a.x), this.prepareMouseCoord(a.y), this.pixelMouseMoveEvent),
        e, f, g, h = [];
    if (0 < c.length) {
        for (e = 0; e < c.length && (h.push(c[e]), g = this.finalizeMouseCoords(c[e], a), c[e].mouseOn || (f = c[e].dispatchEvent("mouseover", {
                target: c[e],
                x: g.x,
                y: g.y
            })), c[e].mouseOn = !0, !1 !== f); e++);
        f = !0;
        for (e = 0; e < c.length && (g =
                this.finalizeMouseCoords(c[e], a), f = c[e].dispatchEvent("mousemove", {
                    target: c[e],
                    x: g.x,
                    y: g.y
                }), !1 !== f); e++);
        !1 !== f && this.dispatchEvent("mousemove", {
            target: this,
            x: Math.floor(this.prepareMouseCoord(a.x)),
            y: Math.floor(this.prepareMouseCoord(a.y))
        })
    }
    this.checkMouseOut(h, a)
};
Stage.prototype.checkMouseDown = function(a) {
    this.processMouseEvent(a, "mousedown", this.pixelMouseDownEvent)
};
Stage.prototype.checkMouseUp = function(a) {
    this.processMouseEvent(a, "mouseup", this.pixelMouseUpEvent)
};
Stage.prototype.clear = function() {
    this.tweens = [];
    this.timers = [];
    this.eventsListeners = [];
    this.objectsCounter = 0;
    Utils.callSuperMethod(Stage, this, "clear")
};
Stage.prototype.hitTest = function(a, c) {
    if (0 == a.getAbsoluteRotation() && 0 == c.getAbsoluteRotation()) {
        var e = a.getX() - a.getWidth() / 2,
            f = a.getY() - a.getHeight() / 2,
            g = c.getX() - c.getWidth() / 2,
            h = c.getY() - c.getHeight() / 2,
            k = Math.max(f, h),
            l = Math.max(e, g),
            e = Math.min(e + a.getWidth(), g + c.getWidth()),
            f = Math.min(f + a.getHeight(), h + c.getHeight()) - k;
        return 0 < e - l && 0 < f ? !0 : !1
    }
    l = a.getDrawRectangle();
    f = c.getDrawRectangle();
    return l.hitTestRectangle(f)
};
Stage.prototype.getCenter = function() {
    return {
        x: this.screenWidth / 2,
        y: this.screenHeight / 2
    }
};
Stage.prototype.drawRectangle = function(a, c, e, f, g, h, k, l) {
    var m = this.canvas;
    m.ctx.globalAlpha = "undefined" != typeof k ? k : 1;
    m.ctx.fillStyle = g;
    m.ctx.strokeStyle = g;
    l || (a -= this.viewport.x, c -= this.viewport.y);
    a *= Utils.globalScale;
    c *= Utils.globalScale;
    e *= Utils.globalScale;
    f *= Utils.globalScale;
    h ? m.ctx.fillRect(a - e / 2, c - f / 2, e, f) : m.ctx.strokeRect(a - e / 2, c - f / 2, e, f)
};
Stage.prototype.drawCircle = function(a, c, e, f, g, h, k) {
    this.drawArc(a, c, e, 0, 2 * Math.PI, !1, f, g, h, k)
};
Stage.prototype.drawArc = function(a, c, e, f, g, h, k, l, m, n) {
    var p = this.canvas,
        q = p.ctx.lineWidth;
    "undefined" == typeof l && (l = "#000");
    p.ctx.strokeStyle = l;
    "undefined" == typeof k && (k = 1);
    p.ctx.lineWidth = k * Utils.globalScale;
    "undefined" == typeof m && (m = 1);
    p.ctx.globalAlpha = m;
    n || (a -= this.viewport.x, c -= this.viewport.y);
    a *= Utils.globalScale;
    c *= Utils.globalScale;
    e *= Utils.globalScale;
    p.ctx.beginPath();
    p.ctx.arc(a, c, e, f, g, h);
    p.ctx.stroke();
    p.ctx.lineWidth = q
};
Stage.prototype.drawPolygon = function(a, c, e, f, g) {
    if ("object" == typeof a && a instanceof Array && !(2 > a.length)) {
        for (var h = 0; h < a.length - 1; h++) this.drawLine(a[h].x, a[h].y, a[h + 1].x, a[h + 1].y, c, e, f, g);
        this.drawLine(a[h].x, a[h].y, a[0].x, a[0].y, c, e, f, g)
    }
};
Stage.prototype.drawLine = function(a, c, e, f, g, h, k, l) {
    var m = this.canvas,
        n = m.ctx.lineWidth;
    m.ctx.strokeStyle = h ? h : "#000";
    m.ctx.lineWidth = g ? g * Utils.globalScale : 1 * Utils.globalScale;
    m.ctx.globalAlpha = k ? k : 1;
    l || (a -= this.viewport.x, c -= this.viewport.y, e -= this.viewport.x, f -= this.viewport.y);
    a *= Utils.globalScale;
    c *= Utils.globalScale;
    e *= Utils.globalScale;
    f *= Utils.globalScale;
    m.ctx.beginPath();
    m.ctx.moveTo(a, c);
    m.ctx.lineTo(e, f);
    m.ctx.stroke();
    m.ctx.lineWidth = n
};
Stage.prototype.start = function() {
    this.started || (this.started = !0, this.clearFPS(), this.tick())
};
Stage.prototype.forceRender = function() {
    this.started && this.tick()
};
Stage.prototype.stop = function() {
    this.started = !1
};
Stage.prototype.clearFPS = function() {
    this.lastFPS = this.fps;
    this.fps = 0;
    this.started && (this.tmFPS = setTimeout(this.clearFPS, 1E3))
};
Stage.prototype.setTextStyle = function(a, c, e, f, g, h) {
    h = h ? h : this.canvas;
    h.ctx.fillStyle = f;
    h.ctx.strokeStyle = g;
    f = "";
    e && (f += e + " ");
    c && (f += Math.floor(c * Utils.globalScale) + "px ");
    a && (f += a);
    h.ctx.font = f
};
Stage.prototype.drawText = function(a, c, e, f, g, h, k) {
    k = k ? k : this.canvas;
    k.ctx.globalAlpha = "undefined" == typeof f ? 1 : f;
    g || (c -= this.viewport.x, e -= this.viewport.y);
    c *= Utils.globalScale;
    e *= Utils.globalScale;
    h && (c -= this.getTextWidth(a) / 2);
    k.ctx.fillText(a, c, e)
};
Stage.prototype.strokeText = function(a, c, e, f, g, h, k) {
    k = k ? k : this.canvas;
    k.ctx.globalAlpha = "undefined" == typeof f ? 1 : f;
    g || (c -= this.viewport.x, e -= this.viewport.y);
    c *= Utils.globalScale;
    e *= Utils.globalScale;
    h && (c -= this.getTextWidth(a) / 2);
    k.ctx.strokeText(a, c, e)
};
Stage.prototype.getTextWidth = function(a, c) {
    return (c ? c : this.canvas).ctx.measureText(a).width
};
Stage.prototype.render = function(a, c, e, f) {
    a && (f || (f = 0), a && !a.ctx && (a.ctx = a.getContext("2d")), e || ((e = this.getFillStyle(a)) ? (a.ctx.fillStyle = e, a.ctx.fillRect(0, 0, a.width, a.height)) : this.clearLock || this.clearScreen(a)), Utils.callSuperMethod(Stage, this, "render", a, c, f))
};
Stage.prototype.createTween = function(a, c, e, f, g, h) {
    a = new Tween(a, c, e, f, g, h);
    this.tweens.push(a);
    return a
};
Stage.prototype.removeTween = function(a) {
    var c = null;
    if (isNaN(a))
        for (var e = 0; e < this.tweens.length; e++) {
            if (this.tweens[e] === a) {
                c = e;
                break
            }
        } else c = a;
    isNaN(c) || (this.tweens[c] && this.tweens[c].pause(), this.tweens.splice(c, 1));
    return c
};
Stage.prototype.clearObjectTweens = function(a) {
    for (var c = 0; c < this.tweens.length; c++) this.tweens[c].obj === a && (this.tweens[c].destroy = !0)
};
Stage.prototype.updateTweens = function(a) {
    for (var c, e = 0; e < this.tweens.length; e++) c = this.tweens[e], c.destroy && (e = this.removeTween(e), e--);
    for (e = 0; e < this.tweens.length; e++) c = this.tweens[e], !c.newly && c.tick(a) && (c.destroy = !0), c.newly = !1
};
Stage.prototype.setTimeout = function(a, c) {
    var e = new StageTimer(a, c);
    this.timers.push(e);
    return e
};
Stage.prototype.clearTimeout = function(a) {
    a && (a.destroy = !0)
};
Stage.prototype.setInterval = function(a, c) {
    var e = new StageTimer(a, c, !0);
    this.timers.push(e);
    return e
};
Stage.prototype.clearInterval = function(a) {
    this.clearTimeout(a)
};
Stage.prototype.removeTimer = function(a) {
    this.timers = Utils.removeFromArray(this.timers, a)
};
Stage.prototype.updateTimers = function(a) {
    for (var c, e = 0; e < this.timers.length; e++) c = this.timers[e], c.destroy && (this.removeTimer(c), e--);
    for (e = 0; e < this.timers.length; e++) c = this.timers[e], !c.newly && c.update(a) && (c.destroy = !0), c.newly = !1
};
Stage.prototype.tick = function() {
    clearTimeout(this.tmMain);
    var a;
    if (Utils.isWindowHidden) this.lastTick = 0, a = this.delay;
    else {
        a = (new Date).getTime();
        var c = Math.min(Stage.MIN_DELTA, a - this.lastTick);
        this.lastTick = a;
        this.dispatchEvent("pretick", {
            target: this,
            delta: c
        });
        if (!this.started) {
            this.lastTick = 0;
            return
        }
        this.updateTweens(c);
        if (!this.started) {
            this.lastTick = 0;
            return
        }
        this.updateTimers(c);
        if (!this.started) {
            this.lastTick = 0;
            return
        }
        var e = !1;
        this.drawBackAlways ? (this.render(this.canvas, !0, !1, c), e = !0) : this.needToRebuildBack &&
            (this.needToRebuildBack = !1, this.backgroundCanvas && this.render(this.backgroundCanvas, !0));
        this.render(this.canvas, !1, e, c);
        this.showFPS && (this.setTextStyle("sans-serif", 10, "bold", "#fff", "#000"), this.drawText("FPS: " + this.lastFPS, 2, 10, 1, !0));
        this.dispatchEvent("posttick", {
            target: this,
            delta: c
        });
        a = (new Date).getTime() - a;
        a = this.delay - a;
        1 > a && (a = 1);
        this.fps++
    }
    this.started ? this.tmMain = setTimeout(this.tick, a) : this.lastTick = 0
};
Stage.prototype.box2dSync = function(a) {
    for (b = a.m_bodyList; b; b = b.m_next) b.sprite && (b.sprite.rotation = b.GetRotation(), a = b.GetPosition(), b.sprite.x = a.x, b.sprite.y = a.y, b.sprite.dispatchEvent("box2dsync", {
        target: b.sprite
    }))
};
Stage.prototype.processTouchEvent = function(a, c) {
    for (var e = 0; e < a.length; e++) this[c]({
        clientX: a[e].clientX,
        clientY: a[e].clientY
    })
};
Stage.prototype.addInputListeners = function(a) {
    this.inputController = a;
    Utils.touchScreen ? (a.ontouchstart = Utils.proxy(function(a) {
        this.processTouchEvent(a.touches, "checkMouseDown");
        this.processTouchEvent(a.touches, "checkClick");
        a.preventDefault()
    }, this), a.ontouchmove = Utils.proxy(function(a) {
        this.processTouchEvent(a.touches, "checkMouseMove");
        a.preventDefault()
    }, this), a.ontouchend = Utils.proxy(function(a) {
        this.processTouchEvent(a.changedTouches, "checkMouseUp");
        a.preventDefault()
    }, this)) : (a.onclick = Utils.proxy(function(a) {
            this.checkClick(a)
        },
        this), a.onmousemove = Utils.proxy(function(a) {
        this.checkMouseMove(a)
    }, this), a.onmousedown = Utils.proxy(function(a) {
        0 == a.button && this.checkMouseDown(a)
    }, this), a.onmouseup = Utils.proxy(function(a) {
        0 == a.button && this.checkMouseUp(a)
    }, this), a.oncontextmenu = Utils.proxy(function(a) {
        this.checkContextMenu(a)
    }, this))
};
Stage.prototype.removeInputListeners = function(a) {
    a.ontouchstart = null;
    a.ontouchmove = null;
    a.ontouchend = null;
    a.onclick = null;
    a.onmousemove = null;
    a.onmousedown = null;
    a.onmouseup = null;
    a.oncontextmenu = null
};
Stage.MIN_DELTA = 500;
var TTLoader = {
    endCallback: null,
    loadedData: null,
    landscapeMode: !1,
    skipPlayButton: !1,
    create: function(a, c, e, f) {
        TTLoader.endCallback = a;
        TTLoader.landscapeMode = c;
        TTLoader.skipPlayButton = e;
        document.getElementById("progress_container").style.background = "#fff";
        document.getElementById("progress_container").style.zIndex = "1000";
        a = document.getElementById("progress");
        a.setAttribute("valign", "top");
        a.style.verticalAlign = "top";
        a.style.background = "#fff";
        c = document.createElement("div");
        e = document.createElement("a");
        e.setAttribute("id",
            "tt_load_logo_c");
        var g = window.ExternalAPI ? ExternalAPI.exec("getPreloaderURL") : "https://itunes.apple.com/artist/appmosys/id898185915",
            h = "_blank";
        f && (g = "javascript:void(0)", h = "");
        e.setAttribute("href", g);
        e.setAttribute("target", h);
        f = new Image;
        f.setAttribute("id", "tt_load_logo");
        f.setAttribute("border", "");
        f.src = TTLoader.logoSrc;
        f.style.cursor = "pointer";
        e.appendChild(f);
        c.appendChild(e);
        a.appendChild(c);
        c = document.createElement("div");
        c.setAttribute("id", "tt_load_progress_cont");
        c.setAttribute("align", "left");
        c.setAttribute("style",
            "padding: 1px; border: 2px solid #e44d26; background: #fff");
        f = document.createElement("div");
        f.setAttribute("id", "tt_load_progress");
        f.setAttribute("style", "width: 0px; background: #e44d26;");
        f.innerHTML = "&nbsp;";
        c.appendChild(f);
        a.appendChild(c);
        c = document.createElement("div");
        c.setAttribute("id", "tt_load_play");
        f = new Image;
        f.setAttribute("id", "tt_load_button");
        f.src = TTLoader.buttonDisabledSrc;
        f.style.visibility = TTLoader.skipPlayButton ? "hidden" : "visible";
        c.appendChild(f);
        a.appendChild(c);
        Utils.addEventListener("fitlayout",
            TTLoader.setSizes);
        TTLoader.setSizes()
    },
    setSizes: function() {
        var a = Utils.getWindowRect();
        document.getElementById("progress_container").style.width = a.width + "px";
        document.getElementById("progress_container").style.height = a.height + "px";
        a = Utils.globalScale * Utils.globalPixelScale;
        TTLoader.landscapeMode || (document.getElementById("progress").style.paddingTop = Math.floor(80 * a) + "px");
        document.getElementById("tt_load_progress_cont").style.width = Math.floor(200 * a) + "px";
        document.getElementById("tt_load_progress").style.height =
            Math.floor(12 * a) + "px";
        document.getElementById("tt_load_progress").style.width = a * TTLoader.progressVal * 2 + "px";
        document.getElementById("tt_load_logo").style.marginTop = Math.floor(80 * a) + "px";
        document.getElementById("tt_load_logo").setAttribute("width", Math.floor(300 * a) + "px");
        document.getElementById("tt_load_logo").setAttribute("height", Math.floor(65 * a) + "px");
        document.getElementById("tt_load_button").setAttribute("height", Math.floor(29 * a) + "px");
        document.getElementById("tt_load_button").style.marginTop =
            Math.floor(30 * a) + "px"
    },
    progressVal: 0,
    showLoadProgress: function(a) {
        0 > a && (a = 0);
        100 < a && (a = 100);
        TTLoader.progressVal = a;
        TTLoader.setSizes()
    },
    loadComplete: function(a) {
        TTLoader.showLoadProgress(100);
        TTLoader.loadedData = a;
        a = document.getElementById("tt_load_button");
        Utils.touchScreen ? a.ontouchstart = TTLoader.close : a.onclick = TTLoader.close;
        a.style.cursor = "pointer";
        a.src = TTLoader.buttonSrc;
        a = document.getElementById("tt_load_progress");
        a.style.background = "transparent";
        a = document.getElementById("tt_load_progress_cont");
        a.style.border = "2px solid transparent";
        a.style.background = "transparent";
        document.getElementById("tt_load_button").style.display = "block";
        TTLoader.skipPlayButton && TTLoader.close()
    },
    close: function() {
        clearTimeout(TTLoader.animateTimeout);
        TTLoader.endCallback(TTLoader.loadedData);
        Utils.touchScreen && !navigator.userAgent.match(/(iPad|iPhone|iPod).*CPU.*OS 7_\d/i) && document.body.addEventListener("touchstart", Utils.preventEvent, !1)
    },
    logoSrc: "data:image/jpeg;base64,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",
    buttonDisabledSrc: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGOTNDRkRBRDlFQjExRTNCODI2OTVDQ0I1QjQ3QTUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGOTNDRkRCRDlFQjExRTNCODI2OTVDQ0I1QjQ3QTUzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEY5M0NGRDhEOUVCMTFFM0I4MjY5NUNDQjVCNDdBNTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEY5M0NGRDlEOUVCMTFFM0I4MjY5NUNDQjVCNDdBNTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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",
    buttonSrc: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ0MkY2NjRBRDlFQjExRTNBNzU1REY3NjZERUJEODBBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ0MkY2NjRCRDlFQjExRTNBNzU1REY3NjZERUJEODBBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDQyRjY2NDhEOUVCMTFFM0E3NTVERjc2NkRFQkQ4MEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDQyRjY2NDlEOUVCMTFFM0E3NTVERjc2NkRFQkQ4MEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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"
};

function SpritesGroup(a) {
    this.stage = a;
    this.rotation = this.y = this.x = 0;
    this.opacity = this.scaleY = this.scaleX = 1;
    this.sprites = [];
    a.addEventListener("pretick", Utils.proxy(this.update, this))
}
SpritesGroup.prototype.addChild = function(a, c) {
    "undefined" == typeof a.gscaleX && (a.gscaleX = 1);
    "undefined" == typeof a.gscaleY && (a.gscaleY = 1);
    "undefined" == typeof a.grotation && (a.grotation = 0);
    "undefined" == typeof a.gopacity && (a.gopacity = 1);
    this.sprites.push(a);
    c && this.stage.addChild(a);
    this.update()
};
SpritesGroup.prototype.removeChild = function(a, c) {
    this.sprites = Utils.removeFromArray(this.sprites, a);
    c && (a.destroy = !0)
};
SpritesGroup.prototype.remove = function() {
    for (var a = 0; a < this.sprites.length; a++) this.sprites[a].destroy = !0;
    this.sprites = []
};
SpritesGroup.prototype.update = function() {
    for (var a, c = 0; c < this.sprites.length; c++) {
        a = this.sprites[c];
        var e = a.gx,
            f = a.gy,
            g = new Vector(e, f);
        g.rotate(-this.rotation);
        e += g.x;
        f += g.y;
        e *= this.scaleX;
        f *= this.scaleY;
        e += this.x;
        f += this.y;
        a.x = e;
        a.y = f;
        a.scaleX = a.gscaleX * this.scaleX;
        a.scaleY = a.gscaleY * this.scaleY;
        a.rotation = a.grotation + this.rotation;
        a.opacity = a.gopacity * this.opacity
    }
};

function AudioPlayer() {
    this.disabled = !1;
    this.basePath = "";
    this.mp3Support = !0;
    this.delayPlay = !1;
    this.audioWrapper = null;
    this.busy = this.locked = !1;
    this.startPlayTime = 0;
    this.onend = null;
    this.controlPlay = Utils.proxy(this.controlPlay, this)
}
AudioPlayer.prototype.createNewAudio = function() {
    if (AudioMixer.isWebAudioSupport()) {
        var a = AudioMixer.waContext.createBufferSource();
        a.connect(AudioMixer.waContext.destination);
        return a
    }
    return document.createElement("audio")
};
AudioPlayer.prototype.init = function(a) {
    this.basePath = a ? a : "";
    this.delayPlay = "ontouchstart" in window;
    this.audioWrapper = this.createNewAudio();
    a = document.createElement("audio");
    a.canPlayType ? this.mp3Support = "" != a.canPlayType("audio/mpeg") : this.disabled = !0;
    return !this.disabled
};
AudioPlayer.prototype.play = function(a, c) {
    if (this.disabled) return !1;
    var e = this.basePath + "/" + a + (this.mp3Support ? ".mp3" : ".ogg");
    this.stop();
    this.audioWrapper = this.createNewAudio();
    this.audioWrapper.doLoop = c ? !0 : !1;
    this.audioWrapper.fileName = a;
    if (AudioMixer.isWebAudioSupport()) {
        var f = this;
        this.loadSound(e, function(a) {
            f.audioWrapper.buffer = a;
            f.audioWrapper.noteOn ? f.audioWrapper.noteOn(0) : f.audioWrapper.start(0);
            f.startPlayTime = (new Date).getTime();
            f.audioWrapper.loop = c;
            "undefined" != typeof f.audioWrapper.playbackState ?
                f.waCheckInterval = setInterval(function() {
                    f.audioWrapper ? f.audioWrapper.playbackState == f.audioWrapper.FINISHED_STATE && f.controlPlay() : clearInterval(f.waCheckInterval)
                }, 100) : f.audioWrapper.onended = f.controlPlay
        })
    } else this.audioWrapper.src = e, this.audioWrapper.type = this.mp3Support ? "audio/mpeg" : "audio/ogg", this.audioWrapper.loop = !1, this.audioWrapper.preload = "auto", this.audioWrapper.load(), this.delayPlay ? (this.audioWrapper.addEventListener("canplay", this.readyToPlay), this.audioWrapper.addEventListener("canplaythrough",
        this.readyToPlay)) : this.audioWrapper.play(), this.audioWrapper.addEventListener("ended", this.controlPlay, !1);
    this.busy = !0;
    this.startPlayTime = (new Date).getTime()
};
AudioPlayer.prototype.loadSound = function(a, c) {
    if (AudioMixer.buffer[a]) c && c(AudioMixer.buffer[a]);
    else {
        var e = new XMLHttpRequest;
        e.open("GET", a, !0);
        e.responseType = "arraybuffer";
        e.onload = function() {
            AudioMixer.waContext.decodeAudioData(this.response, function(e) {
                AudioMixer.buffer[a] = e;
                c && c(e)
            })
        };
//        e.send()
    }
};
AudioPlayer.prototype.readyToPlay = function(a) {
    a.currentTarget.alreadyLoaded || (a.currentTarget.alreadyLoaded = !0, a.currentTarget.play())
};
AudioPlayer.prototype.stop = function() {
    this.busy = !1;
    try {
        AudioMixer.isWebAudioSupport() ? this.audioWrapper.noteOff ? this.audioWrapper.noteOff(0) : this.audioWrapper.stop(0) : (this.audioWrapper.removeEventListener("canplay", this.readyToPlay), this.audioWrapper.removeEventListener("canplaythrough", this.readyToPlay), this.audioWrapper.pause(), this.audioWrapper.currentTime = 0), this.audioWrapper = null
    } catch (a) {}
};
AudioPlayer.prototype.pause = function() {
    AudioMixer.isWebAudioSupport() ? this.audioWrapper && this.audioWrapper.disconnect() : this.audioWrapper.pause()
};
AudioPlayer.prototype.resume = function() {
    if (AudioMixer.isWebAudioSupport()) {
        if (this.audioWrapper) try {
            this.audioWrapper.connect(AudioMixer.waContext.destination)
        } catch (a) {}
    } else this.audioWrapper.play()
};
AudioPlayer.prototype.controlPlay = function() {
    if (this.audioWrapper)
        if (this.audioWrapper.doLoop) AudioMixer.isWebAudioSupport() || (Utils.isFirefox() ? this.play(this.audioWrapper.fileName, !0) : (this.audioWrapper.currentTime = 0, this.audioWrapper.play()));
        else {
            this.busy = !1;
            if ("function" == typeof this.onend) this.onend();
            this.waCheckInterval && clearInterval(this.waCheckInterval)
        }
};
AudioPlayer.prototype.getPosition = function() {
    if (AudioMixer.isWebAudioSupport()) {
        if (!this.startPlayTime) return 0;
        var a = this.getDuration();
        if (!a) return 0;
        var c = ((new Date).getTime() - this.startPlayTime) / 1E3;
        return c <= a ? c : this.audioWrapper.doLoop ? c - Math.floor(c / a) * a : a
    }
    return this.audioWrapper.currentTime ? this.audioWrapper.currentTime : 0
};
AudioPlayer.prototype.getDuration = function() {
    return AudioMixer.isWebAudioSupport() ? this.audioWrapper.buffer ? this.audioWrapper.buffer.duration : 0 : this.audioWrapper.duration ? this.audioWrapper.duration : 0
};

function AudioMixer(a, c) {
    this.singleChannelMode = !1;
    this.channels = [];
    this.init(a, c)
}
AudioMixer.prototype.init = function(a, c) {
    if (AudioMixer.isWebAudioSupport()) {
        AudioMixer.waContext = new window.AudioContext;
        var e = AudioMixer.waContext.createBuffer(1, 1, 22050),
            f = AudioMixer.waContext.createBufferSource();
        f.buffer = e;
        f.connect(AudioMixer.waContext.destination);
        f.noteOn ? f.noteOn(0) : f.start(0)
    }
    AudioMixer.isWebAudioSupport() || -1 == navigator.userAgent.toLowerCase().indexOf("mac") || (this.singleChannelMode = !0, c = 1);
    this.path = a;
    this.channels = [];
    for (e = 0; e < c; e++) this.channels[e] = new AudioPlayer, this.channels[e].init(a);
    Utils.addEventListener("hidewindow", Utils.proxy(this.pauseOnHide, this));
    Utils.addEventListener("showwindow", Utils.proxy(this.resumeOnShow, this))
};
AudioMixer.prototype.pauseOnHide = function() {
    for (var a = 0; a < this.channels.length; a++) this.channels[a].pause()
};
AudioMixer.prototype.resumeOnShow = function() {
    for (var a = 0; a < this.channels.length; a++) this.channels[a].resume()
};
AudioMixer.prototype.play = function(a, c, e, f) {
    var g = -1,
        g = "number" == typeof f ? f : this.getFreeChannel(e);
    0 <= g && g < this.channels.length && (this.channels[g].stop(), this.channels[g].play(a, c));
    return this.channels[g]
};
AudioMixer.prototype.stop = function(a) {
    0 <= a && a < this.channels.length && this.channels[a].stop()
};
AudioMixer.prototype.getFreeChannel = function(a) {
    for (var c = -1, e = [], f = -1, g = -1, h = 0, k = 0; k < this.channels.length; k++) this.channels[k].locked || (this.channels[k].busy ? (h = (new Date).getTime(), h -= this.channels[k].startPlayTime, h > g && (g = h, f = k)) : e.push(k));
    0 == e.length ? !a && 0 <= f && (c = f) : c = e[0];
    return c
};
AudioMixer.isWebAudioSupport = function() {
    return Boolean(window.AudioContext)
};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
AudioMixer.buffer = {};
AudioMixer.waContext = null;
var ExternalAPI = {
    type: "default",
    init: function() {},
    exec: function() {
        var a = arguments[0];
        if ("exec" != a && "function" == typeof ExternalAPI[a]) return ExternalAPI[a].apply(ExternalAPI, Utils.getFunctionArguments(arguments, 1))
    },
    check: function() {
        return !1
    },
    openWidget: function() {},
    closeWidget: function() {},
    getMoreGamesURL: function(a, c) {
        return "https://itunes.apple.com/artist/appmosys/id898185915"
    },
    getPreloaderURL: function() {
        return "https://itunes.apple.com/artist/appmosys/id898185915"
    },
    showCopyright: function() {},
    showCompanyLogo: function(a) {
        a && a()
    },
    showAds: function() {
        var a = window.location.href;
        if (0 == a.indexOf("https://itunes.apple.com/artist/appmosys/id898185915") || 0 == a.indexOf("https://itunes.apple.com/artist/appmosys/id898185915")) window.GoogleIMA ? GoogleIMA.show() : window.Leadbolt && Leadbolt.show()
    }
};

function box2DCreateWorld(a) {
    var c = new b2AABB;
    c.minVertex.Set(-1E3, -1E3);
    c.maxVertex.Set(1E3, 1E3);
    a = "undefined" != typeof a ? new b2Vec2(0, a) : new b2Vec2(0, 300);
    return new b2World(c, a, !0)
}

function box2DCreateGround(a, c, e) {
    var f = new b2BoxDef;
    f.extents.Set(1E4, 50);
    f.restitution = c ? c : .2;
    c = new b2BodyDef;
    c.AddShape(f);
    c.position.Set(-500, e ? e : 480);
    a = a.CreateBody(c);
    a.bodyDef = c;
    return a
}

function box2DCreateCircle(a, c, e, f, g, h, k, l, m) {
    "undefined" == typeof h && (h = !0);
    var n = new b2CircleDef;
    h || (n.density = k ? k : .8, n.restitution = l ? l : .1, n.friction = m ? m : 3);
    n.radius = f;
    f = new b2BodyDef;
    f.rotation = g;
    f.AddShape(n);
    f.position.Set(c, e);
    a = a.CreateBody(f);
    a.bodyDef = f;
    return a
}

function box2DCreateBox(a, c, e, f, g, h, k, l, m, n) {
    "undefined" == typeof k && (k = !0);
    var p = new b2BoxDef;
    k || (p.density = l ? l : 1, p.restitution = m ? m : .2, p.friction = n ? n : .3);
    p.extents.Set(f, g);
    f = new b2BodyDef;
    f.rotation = h;
    f.AddShape(p);
    f.position.Set(c, e);
    a = a.CreateBody(f);
    a.bodyDef = f;
    return a
}

function box2DCreatePoly(a, c, e, f, g, h, k, l, m) {
    var n = new b2BodyDef;
    n.rotation = g;
    for (g = 0; g < f.length; g++) {
        var p = f[g],
            q = new b2PolyDef;
        h || (q.density = k ? k : 1, q.restitution = l ? l : .2, q.friction = m ? m : .3);
        q.vertexCount = p.length;
        for (var r = 0; r < p.length; r++) q.vertices[r].Set(p[r][0], p[r][1]);
        n.AddShape(q)
    }
    n.position.Set(c, e);
    a = a.CreateBody(n);
    a.bodyDef = n;
    return a
}

function box2DCreateRevoluteJoint(a, c, e, f, g) {
    var h = new b2RevoluteJointDef;
    h.body1 = c;
    h.body2 = e;
    h.anchorPoint = f;
    h.collideConnected = !0;
    g && (h.motorSpeed = g, h.motorTorque = 5E8, h.enableMotor = !0);
    return a.CreateJoint(h)
}

function box2DCreateDistanceJoint(a, c, e, f, g) {
    var h = new b2DistanceJointDef;
    h.body1 = c;
    h.body2 = e;
    h.anchorPoint1 = f;
    h.anchorPoint2 = g;
    h.collideConnected = !0;
    return a.CreateJoint(h)
}

function box2DCreatePrismaticJoint(a, c, e, f, g) {
    var h = new b2PrismaticJointDef;
    h.anchorPoint.Set(f.x, f.y);
    h.body1 = c;
    h.body2 = e;
    h.axis.Set(0, 1);
    g && (h.motorSpeed = g, h.motorForce = 1E5, h.enableMotor = !0);
    return a.CreateJoint(h)
}
var mathSin = Math.sin;
Math.sin = function(a) {
    return 0 === a ? 0 : mathSin(a)
};
var mathCos = Math.cos;
Math.cos = function(a) {
    return 0 === a ? 1 : mathCos(a)
};
var Prototype = {
    Version: "1.6.0.2",
    Browser: {
        IE: !(!window.attachEvent || window.opera),
        Opera: !!window.opera,
        WebKit: -1 < navigator.userAgent.indexOf("AppleWebKit/"),
        Gecko: -1 < navigator.userAgent.indexOf("Gecko") && -1 == navigator.userAgent.indexOf("KHTML"),
        MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
    },
    BrowserFeatures: {
        XPath: !!document.evaluate,
        ElementExtensions: !!window.HTMLElement,
        SpecificElementExtensions: document.createElement("div").__proto__ && document.createElement("div").__proto__ !==
            document.createElement("form").__proto__
    },
    ScriptFragment: "<script[^>]*>([\\S\\s]*?)\x3c/script>",
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    emptyFunction: function() {},
    K: function(a) {
        return a
    }
};
Prototype.Browser.MobileSafari && (Prototype.BrowserFeatures.SpecificElementExtensions = !1);
var Class = {
        create: function() {
            function a() {
                this.initialize.apply(this, arguments)
            }
            var c = null,
                e = $A(arguments);
            Object.isFunction(e[0]) && (c = e.shift());
            Object.extend(a, Class.Methods);
            a.superclass = c;
            a.subclasses = [];
            if (c) {
                var f = function() {};
                f.prototype = c.prototype;
                a.prototype = new f;
                c.subclasses.push(a)
            }
            for (c = 0; c < e.length; c++) a.addMethods(e[c]);
            a.prototype.initialize || (a.prototype.initialize = Prototype.emptyFunction);
            return a.prototype.constructor = a
        },
        Methods: {
            addMethods: function(a) {
                var c = this.superclass && this.superclass.prototype,
                    e = Object.keys(a);
                Object.keys({
                    toString: !0
                }).length || e.push("toString", "valueOf");
                for (var f = 0, g = e.length; f < g; f++) {
                    var h = e[f],
                        k = a[h];
                    if (c && Object.isFunction(k) && "$super" == k.argumentNames().first()) var l = k,
                        k = Object.extend(function(a) {
                            return function() {
                                return c[a].apply(this, arguments)
                            }
                        }(h).wrap(l), {
                            valueOf: function() {
                                return l
                            },
                            toString: function() {
                                return l.toString()
                            }
                        });
                    this.prototype[h] = k
                }
                return this
            }
        }
    },
    Abstract = {};
Object.extend = function(a, c) {
    for (var e in c) a[e] = c[e];
    return a
};
Object.extend(Object, {
    inspect: function(a) {
        try {
            return Object.isUndefined(a) ? "undefined" : null === a ? "null" : a.inspect ? a.inspect() : String(a)
        } catch (c) {
            if (c instanceof RangeError) return "...";
            throw c;
        }
    },
    toJSON: function(a) {
        switch (typeof a) {
            case "undefined":
            case "function":
            case "unknown":
                return;
            case "boolean":
                return a.toString()
        }
        if (null === a) return "null";
        if (a.toJSON) return a.toJSON();
        if (!Object.isElement(a)) {
            var c = [],
                e;
            for (e in a) {
                var f = Object.toJSON(a[e]);
                Object.isUndefined(f) || c.push(e.toJSON() + ": " + f)
            }
            return "{" +
                c.join(", ") + "}"
        }
    },
    toQueryString: function(a) {
        return $H(a).toQueryString()
    },
    toHTML: function(a) {
        return a && a.toHTML ? a.toHTML() : String.interpret(a)
    },
    keys: function(a) {
        var c = [],
            e;
        for (e in a) c.push(e);
        return c
    },
    values: function(a) {
        var c = [],
            e;
        for (e in a) c.push(a[e]);
        return c
    },
    clone: function(a) {
        return Object.extend({}, a)
    },
    isElement: function(a) {
        return a && 1 == a.nodeType
    },
    isArray: function(a) {
        return null != a && "object" == typeof a && "splice" in a && "join" in a
    },
    isHash: function(a) {
        return a instanceof Hash
    },
    isFunction: function(a) {
        return "function" ==
            typeof a
    },
    isString: function(a) {
        return "string" == typeof a
    },
    isNumber: function(a) {
        return "number" == typeof a
    },
    isUndefined: function(a) {
        return "undefined" == typeof a
    }
});
Object.extend(Function.prototype, {
    argumentNames: function() {
        var a = this.toString().match(/^[\s\(]*function[^(]*\((.*?)\)/)[1].split(",").invoke("strip");
        return 1 != a.length || a[0] ? a : []
    },
    bind: function() {
        if (2 > arguments.length && Object.isUndefined(arguments[0])) return this;
        var a = this,
            c = $A(arguments),
            e = c.shift();
        return function() {
            return a.apply(e, c.concat($A(arguments)))
        }
    },
    bindAsEventListener: function() {
        var a = this,
            c = $A(arguments),
            e = c.shift();
        return function(f) {
            return a.apply(e, [f || window.event].concat(c))
        }
    },
    curry: function() {
        if (!arguments.length) return this;
        var a = this,
            c = $A(arguments);
        return function() {
            return a.apply(this, c.concat($A(arguments)))
        }
    },
    delay: function() {
        var a = this,
            c = $A(arguments),
            e = 1E3 * c.shift();
        return window.setTimeout(function() {
            return a.apply(a, c)
        }, e)
    },
    wrap: function(a) {
        var c = this;
        return function() {
            return a.apply(this, [c.bind(this)].concat($A(arguments)))
        }
    },
    methodize: function() {
        if (this._methodized) return this._methodized;
        var a = this;
        return this._methodized = function() {
            return a.apply(null, [this].concat($A(arguments)))
        }
    }
});
Function.prototype.defer = Function.prototype.delay.curry(.01);
Object.extend(String, {
    interpret: function(a) {
        return null == a ? "" : String(a)
    },
    specialChar: {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\\": "\\\\"
    }
});
Object.extend(String.prototype, {
    gsub: function(a, c) {
        var e = "",
            f = this,
            g;
        for (c = arguments.callee.prepareReplacement(c); 0 < f.length;)(g = f.match(a)) ? (e += f.slice(0, g.index), e += String.interpret(c(g)), f = f.slice(g.index + g[0].length)) : (e += f, f = "");
        return e
    },
    sub: function(a, c, e) {
        c = this.gsub.prepareReplacement(c);
        e = Object.isUndefined(e) ? 1 : e;
        return this.gsub(a, function(a) {
            return 0 > --e ? a[0] : c(a)
        })
    },
    scan: function(a, c) {
        this.gsub(a, c);
        return String(this)
    },
    truncate: function(a, c) {
        a = a || 30;
        c = Object.isUndefined(c) ? "..." : c;
        return this.length > a ? this.slice(0, a - c.length) + c : String(this)
    },
    strip: function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    },
    stripTags: function() {
        return this.replace(/<\/?[^>]+>/gi, "")
    },
    stripScripts: function() {
        return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
    },
    extractScripts: function() {
        var a = new RegExp(Prototype.ScriptFragment, "im");
        return (this.match(new RegExp(Prototype.ScriptFragment, "img")) || []).map(function(c) {
            return (c.match(a) || ["", ""])[1]
        })
    },
    evalScripts: function() {
        return this.extractScripts().map(function(a) {
            return eval(a)
        })
    },
    escapeHTML: function() {
        var a = arguments.callee;
        a.text.data = this;
        return a.div.innerHTML
    },
    unescapeHTML: function() {
        var a = new Element("div");
        a.innerHTML = this.stripTags();
        return a.childNodes[0] ? 1 < a.childNodes.length ? $A(a.childNodes).inject("", function(a, e) {
            return a + e.nodeValue
        }) : a.childNodes[0].nodeValue : ""
    },
    toQueryParams: function(a) {
        var c = this.strip().match(/([^?#]*)(#.*)?$/);
        return c ? c[1].split(a || "&").inject({}, function(a, c) {
            if ((c = c.split("="))[0]) {
                var g = decodeURIComponent(c.shift()),
                    h = 1 < c.length ? c.join("=") :
                    c[0];
                void 0 != h && (h = decodeURIComponent(h));
                g in a ? (Object.isArray(a[g]) || (a[g] = [a[g]]), a[g].push(h)) : a[g] = h
            }
            return a
        }) : {}
    },
    toArray: function() {
        return this.split("")
    },
    succ: function() {
        return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
    },
    times: function(a) {
        return 1 > a ? "" : Array(a + 1).join(this)
    },
    camelize: function() {
        var a = this.split("-"),
            c = a.length;
        if (1 == c) return a[0];
        for (var e = "-" == this.charAt(0) ? a[0].charAt(0).toUpperCase() + a[0].substring(1) : a[0], f = 1; f < c; f++) e += a[f].charAt(0).toUpperCase() +
            a[f].substring(1);
        return e
    },
    capitalize: function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
    },
    underscore: function() {
        return this.gsub(/::/, "/").gsub(/([A-Z]+)([A-Z][a-z])/, "#{1}_#{2}").gsub(/([a-z\d])([A-Z])/, "#{1}_#{2}").gsub(/-/, "_").toLowerCase()
    },
    dasherize: function() {
        return this.gsub(/_/, "-")
    },
    inspect: function(a) {
        var c = this.gsub(/[\x00-\x1f\\]/, function(a) {
            var c = String.specialChar[a[0]];
            return c ? c : "\\u00" + a[0].charCodeAt().toPaddedString(2, 16)
        });
        return a ? '"' + c.replace(/"/g,
            '\\"') + '"' : "'" + c.replace(/'/g, "\\'") + "'"
    },
    toJSON: function() {
        return this.inspect(!0)
    },
    unfilterJSON: function(a) {
        return this.sub(a || Prototype.JSONFilter, "#{1}")
    },
    isJSON: function() {
        var a;
        if (this.blank()) return !1;
        a = this.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, "");
        return /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(a)
    },
    evalJSON: function(a) {
        var c = this.unfilterJSON();
        try {
            if (!a || c.isJSON()) return eval("(" + c + ")")
        } catch (e) {}
        throw new SyntaxError("Badly formed JSON string: " + this.inspect());
    },
    include: function(a) {
        return -1 <
            this.indexOf(a)
    },
    startsWith: function(a) {
        return 0 === this.indexOf(a)
    },
    endsWith: function(a) {
        var c = this.length - a.length;
        return 0 <= c && this.lastIndexOf(a) === c
    },
    empty: function() {
        return "" == this
    },
    blank: function() {
        return /^\s*$/.test(this)
    },
    interpolate: function(a, c) {
        return (new Template(this, c)).evaluate(a)
    }
});
(Prototype.Browser.WebKit || Prototype.Browser.IE) && Object.extend(String.prototype, {
    escapeHTML: function() {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    },
    unescapeHTML: function() {
        return this.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    }
});
String.prototype.gsub.prepareReplacement = function(a) {
    if (Object.isFunction(a)) return a;
    var c = new Template(a);
    return function(a) {
        return c.evaluate(a)
    }
};
String.prototype.parseQuery = String.prototype.toQueryParams;
Object.extend(String.prototype.escapeHTML, {
    div: document.createElement("div"),
    text: document.createTextNode("")
});
with(String.prototype.escapeHTML) div.appendChild(text);
var Template = Class.create({
    initialize: function(a, c) {
        this.template = a.toString();
        this.pattern = c || Template.Pattern
    },
    evaluate: function(a) {
        Object.isFunction(a.toTemplateReplacements) && (a = a.toTemplateReplacements());
        return this.template.gsub(this.pattern, function(c) {
            if (null == a) return "";
            var e = c[1] || "";
            if ("\\" == e) return c[2];
            var f = a,
                g = c[3],
                h = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
            c = h.exec(g);
            if (null == c) return e;
            for (; null != c;) {
                var k = c[1].startsWith("[") ? c[2].gsub("\\\\]", "]") : c[1],
                    f = f[k];
                if (null == f || "" ==
                    c[3]) break;
                g = g.substring("[" == c[3] ? c[1].length : c[0].length);
                c = h.exec(g)
            }
            return e + String.interpret(f)
        })
    }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
var $break = {},
    Enumerable = {
        each: function(a, c) {
            var e = 0;
            a = a.bind(c);
            try {
                this._each(function(c) {
                    a(c, e++)
                })
            } catch (f) {
                if (f != $break) throw f;
            }
            return this
        },
        eachSlice: function(a, c, e) {
            c = c ? c.bind(e) : Prototype.K;
            for (var f = -a, g = [], h = this.toArray();
                (f += a) < h.length;) g.push(h.slice(f, f + a));
            return g.collect(c, e)
        },
        all: function(a, c) {
            a = a ? a.bind(c) : Prototype.K;
            var e = !0;
            this.each(function(c, g) {
                e = e && !!a(c, g);
                if (!e) throw $break;
            });
            return e
        },
        any: function(a, c) {
            a = a ? a.bind(c) : Prototype.K;
            var e = !1;
            this.each(function(c, g) {
                if (e = !!a(c, g)) throw $break;
            });
            return e
        },
        collect: function(a, c) {
            a = a ? a.bind(c) : Prototype.K;
            var e = [];
            this.each(function(c, g) {
                e.push(a(c, g))
            });
            return e
        },
        detect: function(a, c) {
            a = a.bind(c);
            var e;
            this.each(function(c, g) {
                if (a(c, g)) throw e = c, $break;
            });
            return e
        },
        findAll: function(a, c) {
            a = a.bind(c);
            var e = [];
            this.each(function(c, g) {
                a(c, g) && e.push(c)
            });
            return e
        },
        grep: function(a, c, e) {
            c = c ? c.bind(e) : Prototype.K;
            var f = [];
            Object.isString(a) && (a = new RegExp(a));
            this.each(function(e, h) {
                a.match(e) && f.push(c(e, h))
            });
            return f
        },
        include: function(a) {
            if (Object.isFunction(this.indexOf) &&
                -1 != this.indexOf(a)) return !0;
            var c = !1;
            this.each(function(e) {
                if (e == a) throw c = !0, $break;
            });
            return c
        },
        inGroupsOf: function(a, c) {
            c = Object.isUndefined(c) ? null : c;
            return this.eachSlice(a, function(e) {
                for (; e.length < a;) e.push(c);
                return e
            })
        },
        inject: function(a, c, e) {
            c = c.bind(e);
            this.each(function(e, g) {
                a = c(a, e, g)
            });
            return a
        },
        invoke: function(a) {
            var c = $A(arguments).slice(1);
            return this.map(function(e) {
                return e[a].apply(e, c)
            })
        },
        max: function(a, c) {
            a = a ? a.bind(c) : Prototype.K;
            var e;
            this.each(function(c, g) {
                c = a(c, g);
                if (null ==
                    e || c >= e) e = c
            });
            return e
        },
        min: function(a, c) {
            a = a ? a.bind(c) : Prototype.K;
            var e;
            this.each(function(c, g) {
                c = a(c, g);
                if (null == e || c < e) e = c
            });
            return e
        },
        partition: function(a, c) {
            a = a ? a.bind(c) : Prototype.K;
            var e = [],
                f = [];
            this.each(function(c, h) {
                (a(c, h) ? e : f).push(c)
            });
            return [e, f]
        },
        pluck: function(a) {
            var c = [];
            this.each(function(e) {
                c.push(e[a])
            });
            return c
        },
        reject: function(a, c) {
            a = a.bind(c);
            var e = [];
            this.each(function(c, g) {
                a(c, g) || e.push(c)
            });
            return e
        },
        sortBy: function(a, c) {
            a = a.bind(c);
            return this.map(function(c, f) {
                return {
                    value: c,
                    criteria: a(c, f)
                }
            }).sort(function(a, c) {
                var g = a.criteria,
                    h = c.criteria;
                return g < h ? -1 : g > h ? 1 : 0
            }).pluck("value")
        },
        toArray: function() {
            return this.map()
        },
        zip: function() {
            var a = Prototype.K,
                c = $A(arguments);
            Object.isFunction(c.last()) && (a = c.pop());
            var e = [this].concat(c).map($A);
            return this.map(function(c, g) {
                return a(e.pluck(g))
            })
        },
        size: function() {
            return this.toArray().length
        },
        inspect: function() {
            return "#<Enumerable:" + this.toArray().inspect() + ">"
        }
    };
Object.extend(Enumerable, {
    map: Enumerable.collect,
    find: Enumerable.detect,
    select: Enumerable.findAll,
    filter: Enumerable.findAll,
    member: Enumerable.include,
    entries: Enumerable.toArray,
    every: Enumerable.all,
    some: Enumerable.any
});

function $A(a) {
    if (!a) return [];
    if (a.toArray) return a.toArray();
    for (var c = a.length || 0, e = Array(c); c--;) e[c] = a[c];
    return e
}
Prototype.Browser.WebKit && ($A = function(a) {
    if (!a) return [];
    if ((!Object.isFunction(a) || "[object NodeList]" != a) && a.toArray) return a.toArray();
    for (var c = a.length || 0, e = Array(c); c--;) e[c] = a[c];
    return e
});
Array.from = $A;
Object.extend(Array.prototype, Enumerable);
Array.prototype._reverse || (Array.prototype._reverse = Array.prototype.reverse);
Object.extend(Array.prototype, {
    _each: function(a) {
        for (var c = 0, e = this.length; c < e; c++) a(this[c])
    },
    clear: function() {
        this.length = 0;
        return this
    },
    first: function() {
        return this[0]
    },
    last: function() {
        return this[this.length - 1]
    },
    compact: function() {
        return this.select(function(a) {
            return null != a
        })
    },
    flatten: function() {
        return this.inject([], function(a, c) {
            return a.concat(Object.isArray(c) ? c.flatten() : [c])
        })
    },
    without: function() {
        var a = $A(arguments);
        return this.select(function(c) {
            return !a.include(c)
        })
    },
    reverse: function(a) {
        return (!1 !==
            a ? this : this.toArray())._reverse()
    },
    reduce: function() {
        return 1 < this.length ? this : this[0]
    },
    uniq: function(a) {
        return this.inject([], function(c, e, f) {
            0 != f && (a ? c.last() == e : c.include(e)) || c.push(e);
            return c
        })
    },
    intersect: function(a) {
        return this.uniq().findAll(function(c) {
            return a.detect(function(a) {
                return c === a
            })
        })
    },
    clone: function() {
        return [].concat(this)
    },
    size: function() {
        return this.length
    },
    inspect: function() {
        return "[" + this.map(Object.inspect).join(", ") + "]"
    },
    toJSON: function() {
        var a = [];
        this.each(function(c) {
            c =
                Object.toJSON(c);
            Object.isUndefined(c) || a.push(c)
        });
        return "[" + a.join(", ") + "]"
    }
});
Object.isFunction(Array.prototype.forEach) && (Array.prototype._each = Array.prototype.forEach);
Array.prototype.indexOf || (Array.prototype.indexOf = function(a, c) {
    c || (c = 0);
    var e = this.length;
    for (0 > c && (c = e + c); c < e; c++)
        if (this[c] === a) return c;
    return -1
});
Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(a, c) {
    c = isNaN(c) ? this.length : (0 > c ? this.length + c : c) + 1;
    var e = this.slice(0, c).reverse().indexOf(a);
    return 0 > e ? e : c - e - 1
});
Array.prototype.toArray = Array.prototype.clone;
var b2Settings = Class.create();
b2Settings.prototype = {
    initialize: function() {}
};
b2Settings.USHRT_MAX = 65535;
b2Settings.b2_pi = Math.PI;
b2Settings.b2_massUnitsPerKilogram = 1;
b2Settings.b2_timeUnitsPerSecond = 1;
b2Settings.b2_lengthUnitsPerMeter = 30;
b2Settings.b2_maxManifoldPoints = 2;
b2Settings.b2_maxShapesPerBody = 64;
b2Settings.b2_maxPolyVertices = 8;
b2Settings.b2_maxProxies = 1024;
b2Settings.b2_maxPairs = 8 * b2Settings.b2_maxProxies;
b2Settings.b2_linearSlop = .005 * b2Settings.b2_lengthUnitsPerMeter;
b2Settings.b2_angularSlop = 2 / 180 * b2Settings.b2_pi;
b2Settings.b2_velocityThreshold = 1 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
b2Settings.b2_maxLinearCorrection = .2 * b2Settings.b2_lengthUnitsPerMeter;
b2Settings.b2_maxAngularCorrection = 8 / 180 * b2Settings.b2_pi;
b2Settings.b2_contactBaumgarte = .2;
b2Settings.b2_timeToSleep = .5 * b2Settings.b2_timeUnitsPerSecond;
b2Settings.b2_linearSleepTolerance = .01 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
b2Settings.b2_angularSleepTolerance = 2 / 180 / b2Settings.b2_timeUnitsPerSecond;
b2Settings.b2Assert = function(a) {
    a || (void 0).x++
};
var b2Vec2 = Class.create();
b2Vec2.prototype = {
    initialize: function(a, c) {
        this.x = a;
        this.y = c
    },
    SetZero: function() {
        this.y = this.x = 0
    },
    Set: function(a, c) {
        this.x = a;
        this.y = c
    },
    SetV: function(a) {
        this.x = a.x;
        this.y = a.y
    },
    Negative: function() {
        return new b2Vec2(-this.x, -this.y)
    },
    Copy: function() {
        return new b2Vec2(this.x, this.y)
    },
    Add: function(a) {
        this.x += a.x;
        this.y += a.y
    },
    Subtract: function(a) {
        this.x -= a.x;
        this.y -= a.y
    },
    Multiply: function(a) {
        this.x *= a;
        this.y *= a
    },
    MulM: function(a) {
        var c = this.x;
        this.x = a.col1.x * c + a.col2.x * this.y;
        this.y = a.col1.y * c + a.col2.y *
            this.y
    },
    MulTM: function(a) {
        var c = b2Math.b2Dot(this, a.col1);
        this.y = b2Math.b2Dot(this, a.col2);
        this.x = c
    },
    CrossVF: function(a) {
        var c = this.x;
        this.x = a * this.y;
        this.y = -a * c
    },
    CrossFV: function(a) {
        var c = this.x;
        this.x = -a * this.y;
        this.y = a * c
    },
    MinV: function(a) {
        this.x = this.x < a.x ? this.x : a.x;
        this.y = this.y < a.y ? this.y : a.y
    },
    MaxV: function(a) {
        this.x = this.x > a.x ? this.x : a.x;
        this.y = this.y > a.y ? this.y : a.y
    },
    Abs: function() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y)
    },
    Length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    Normalize: function() {
        var a = this.Length();
        if (a < Number.MIN_VALUE) return 0;
        var c = 1 / a;
        this.x *= c;
        this.y *= c;
        return a
    },
    IsValid: function() {
        return b2Math.b2IsValid(this.x) && b2Math.b2IsValid(this.y)
    },
    x: null,
    y: null
};
b2Vec2.Make = function(a, c) {
    return new b2Vec2(a, c)
};
var b2Mat22 = Class.create();
b2Mat22.prototype = {
    initialize: function(a, c, e) {
        null == a && (a = 0);
        this.col1 = new b2Vec2;
        this.col2 = new b2Vec2;
        null != c && null != e ? (this.col1.SetV(c), this.col2.SetV(e)) : (c = Math.cos(a), a = Math.sin(a), this.col1.x = c, this.col2.x = -a, this.col1.y = a, this.col2.y = c)
    },
    Set: function(a) {
        var c = Math.cos(a);
        a = Math.sin(a);
        this.col1.x = c;
        this.col2.x = -a;
        this.col1.y = a;
        this.col2.y = c
    },
    SetVV: function(a, c) {
        this.col1.SetV(a);
        this.col2.SetV(c)
    },
    Copy: function() {
        return new b2Mat22(0, this.col1, this.col2)
    },
    SetM: function(a) {
        this.col1.SetV(a.col1);
        this.col2.SetV(a.col2)
    },
    AddM: function(a) {
        this.col1.x += a.col1.x;
        this.col1.y += a.col1.y;
        this.col2.x += a.col2.x;
        this.col2.y += a.col2.y
    },
    SetIdentity: function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 1
    },
    SetZero: function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 0
    },
    Invert: function(a) {
        var c = this.col1.x,
            e = this.col2.x,
            f = this.col1.y,
            g = this.col2.y,
            h;
        h = 1 / (c * g - e * f);
        a.col1.x = h * g;
        a.col2.x = -h * e;
        a.col1.y = -h * f;
        a.col2.y = h * c;
        return a
    },
    Solve: function(a, c, e) {
        var f = this.col1.x,
            g = this.col2.x,
            h =
            this.col1.y,
            k = this.col2.y,
            l;
        l = 1 / (f * k - g * h);
        a.x = l * (k * c - g * e);
        a.y = l * (f * e - h * c);
        return a
    },
    Abs: function() {
        this.col1.Abs();
        this.col2.Abs()
    },
    col1: new b2Vec2,
    col2: new b2Vec2
};
var b2Math = Class.create();
b2Math.prototype = {
    initialize: function() {}
};
b2Math.b2IsValid = function(a) {
    return isFinite(a)
};
b2Math.b2Dot = function(a, c) {
    return a.x * c.x + a.y * c.y
};
b2Math.b2CrossVV = function(a, c) {
    return a.x * c.y - a.y * c.x
};
b2Math.b2CrossVF = function(a, c) {
    return new b2Vec2(c * a.y, -c * a.x)
};
b2Math.b2CrossFV = function(a, c) {
    return new b2Vec2(-a * c.y, a * c.x)
};
b2Math.b2MulMV = function(a, c) {
    return new b2Vec2(a.col1.x * c.x + a.col2.x * c.y, a.col1.y * c.x + a.col2.y * c.y)
};
b2Math.b2MulTMV = function(a, c) {
    return new b2Vec2(b2Math.b2Dot(c, a.col1), b2Math.b2Dot(c, a.col2))
};
b2Math.AddVV = function(a, c) {
    return new b2Vec2(a.x + c.x, a.y + c.y)
};
b2Math.SubtractVV = function(a, c) {
    return new b2Vec2(a.x - c.x, a.y - c.y)
};
b2Math.MulFV = function(a, c) {
    return new b2Vec2(a * c.x, a * c.y)
};
b2Math.AddMM = function(a, c) {
    return new b2Mat22(0, b2Math.AddVV(a.col1, c.col1), b2Math.AddVV(a.col2, c.col2))
};
b2Math.b2MulMM = function(a, c) {
    return new b2Mat22(0, b2Math.b2MulMV(a, c.col1), b2Math.b2MulMV(a, c.col2))
};
b2Math.b2MulTMM = function(a, c) {
    var e = new b2Vec2(b2Math.b2Dot(a.col1, c.col1), b2Math.b2Dot(a.col2, c.col1)),
        f = new b2Vec2(b2Math.b2Dot(a.col1, c.col2), b2Math.b2Dot(a.col2, c.col2));
    return new b2Mat22(0, e, f)
};
b2Math.b2Abs = function(a) {
    return 0 < a ? a : -a
};
b2Math.b2AbsV = function(a) {
    return new b2Vec2(b2Math.b2Abs(a.x), b2Math.b2Abs(a.y))
};
b2Math.b2AbsM = function(a) {
    return new b2Mat22(0, b2Math.b2AbsV(a.col1), b2Math.b2AbsV(a.col2))
};
b2Math.b2Min = function(a, c) {
    return a < c ? a : c
};
b2Math.b2MinV = function(a, c) {
    return new b2Vec2(b2Math.b2Min(a.x, c.x), b2Math.b2Min(a.y, c.y))
};
b2Math.b2Max = function(a, c) {
    return a > c ? a : c
};
b2Math.b2MaxV = function(a, c) {
    return new b2Vec2(b2Math.b2Max(a.x, c.x), b2Math.b2Max(a.y, c.y))
};
b2Math.b2Clamp = function(a, c, e) {
    return b2Math.b2Max(c, b2Math.b2Min(a, e))
};
b2Math.b2ClampV = function(a, c, e) {
    return b2Math.b2MaxV(c, b2Math.b2MinV(a, e))
};
b2Math.b2Swap = function(a, c) {
    var e = a[0];
    a[0] = c[0];
    c[0] = e
};
b2Math.b2Random = function() {
    return 2 * Math.random() - 1
};
b2Math.b2NextPowerOfTwo = function(a) {
    a |= a >> 1 & 2147483647;
    a |= a >> 2 & 1073741823;
    a |= a >> 4 & 268435455;
    a |= a >> 8 & 16777215;
    return (a | a >> 16 & 65535) + 1
};
b2Math.b2IsPowerOfTwo = function(a) {
    return 0 < a && 0 == (a & a - 1)
};
b2Math.tempVec2 = new b2Vec2;
b2Math.tempVec3 = new b2Vec2;
b2Math.tempVec4 = new b2Vec2;
b2Math.tempVec5 = new b2Vec2;
b2Math.tempMat = new b2Mat22;
var b2AABB = Class.create();
b2AABB.prototype = {
    IsValid: function() {
        var a = this.maxVertex.x,
            c = this.maxVertex.y,
            a = this.maxVertex.x,
            c = this.maxVertex.y,
            a = a - this.minVertex.x,
            c = c - this.minVertex.y;
        return a = 0 <= a && 0 <= c && this.minVertex.IsValid() && this.maxVertex.IsValid()
    },
    minVertex: new b2Vec2,
    maxVertex: new b2Vec2,
    initialize: function() {
        this.minVertex = new b2Vec2;
        this.maxVertex = new b2Vec2
    }
};
var b2Bound = Class.create();
b2Bound.prototype = {
    IsLower: function() {
        return 0 == (this.value & 1)
    },
    IsUpper: function() {
        return 1 == (this.value & 1)
    },
    Swap: function(a) {
        var c = this.value,
            e = this.proxyId,
            f = this.stabbingCount;
        this.value = a.value;
        this.proxyId = a.proxyId;
        this.stabbingCount = a.stabbingCount;
        a.value = c;
        a.proxyId = e;
        a.stabbingCount = f
    },
    value: 0,
    proxyId: 0,
    stabbingCount: 0,
    initialize: function() {}
};
var b2BoundValues = Class.create();
b2BoundValues.prototype = {
    lowerValues: [0, 0],
    upperValues: [0, 0],
    initialize: function() {
        this.lowerValues = [0, 0];
        this.upperValues = [0, 0]
    }
};
var b2Pair = Class.create();
b2Pair.prototype = {
    SetBuffered: function() {
        this.status |= b2Pair.e_pairBuffered
    },
    ClearBuffered: function() {
        this.status &= ~b2Pair.e_pairBuffered
    },
    IsBuffered: function() {
        return (this.status & b2Pair.e_pairBuffered) == b2Pair.e_pairBuffered
    },
    SetRemoved: function() {
        this.status |= b2Pair.e_pairRemoved
    },
    ClearRemoved: function() {
        this.status &= ~b2Pair.e_pairRemoved
    },
    IsRemoved: function() {
        return (this.status & b2Pair.e_pairRemoved) == b2Pair.e_pairRemoved
    },
    SetFinal: function() {
        this.status |= b2Pair.e_pairFinal
    },
    IsFinal: function() {
        return (this.status &
            b2Pair.e_pairFinal) == b2Pair.e_pairFinal
    },
    userData: null,
    proxyId1: 0,
    proxyId2: 0,
    next: 0,
    status: 0,
    initialize: function() {}
};
b2Pair.b2_nullPair = b2Settings.USHRT_MAX;
b2Pair.b2_nullProxy = b2Settings.USHRT_MAX;
b2Pair.b2_tableCapacity = b2Settings.b2_maxPairs;
b2Pair.b2_tableMask = b2Pair.b2_tableCapacity - 1;
b2Pair.e_pairBuffered = 1;
b2Pair.e_pairRemoved = 2;
b2Pair.e_pairFinal = 4;
var b2PairCallback = Class.create();
b2PairCallback.prototype = {
    PairAdded: function(a, c) {
        return null
    },
    PairRemoved: function(a, c, e) {},
    initialize: function() {}
};
var b2BufferedPair = Class.create();
b2BufferedPair.prototype = {
    proxyId1: 0,
    proxyId2: 0,
    initialize: function() {}
};
var b2PairManager = Class.create();
b2PairManager.prototype = {
    initialize: function() {
        var a = 0;
        this.m_hashTable = Array(b2Pair.b2_tableCapacity);
        for (a = 0; a < b2Pair.b2_tableCapacity; ++a) this.m_hashTable[a] = b2Pair.b2_nullPair;
        this.m_pairs = Array(b2Settings.b2_maxPairs);
        for (a = 0; a < b2Settings.b2_maxPairs; ++a) this.m_pairs[a] = new b2Pair;
        this.m_pairBuffer = Array(b2Settings.b2_maxPairs);
        for (a = 0; a < b2Settings.b2_maxPairs; ++a) this.m_pairBuffer[a] = new b2BufferedPair;
        for (a = 0; a < b2Settings.b2_maxPairs; ++a) this.m_pairs[a].proxyId1 = b2Pair.b2_nullProxy, this.m_pairs[a].proxyId2 =
            b2Pair.b2_nullProxy, this.m_pairs[a].userData = null, this.m_pairs[a].status = 0, this.m_pairs[a].next = a + 1;
        this.m_pairs[b2Settings.b2_maxPairs - 1].next = b2Pair.b2_nullPair;
        this.m_pairCount = 0
    },
    Initialize: function(a, c) {
        this.m_broadPhase = a;
        this.m_callback = c
    },
    AddBufferedPair: function(a, c) {
        var e = this.AddPair(a, c);
        0 == e.IsBuffered() && (e.SetBuffered(), this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = e.proxyId1, this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = e.proxyId2, ++this.m_pairBufferCount);
        e.ClearRemoved();
        b2BroadPhase.s_validate && this.ValidateBuffer()
    },
    RemoveBufferedPair: function(a, c) {
        var e = this.Find(a, c);
        null != e && (0 == e.IsBuffered() && (e.SetBuffered(), this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = e.proxyId1, this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = e.proxyId2, ++this.m_pairBufferCount), e.SetRemoved(), b2BroadPhase.s_validate && this.ValidateBuffer())
    },
    Commit: function() {
        for (var a = 0, c = 0, e = this.m_broadPhase.m_proxyPool, a = 0; a < this.m_pairBufferCount; ++a) {
            var f = this.Find(this.m_pairBuffer[a].proxyId1,
                this.m_pairBuffer[a].proxyId2);
            f.ClearBuffered();
            var g = e[f.proxyId1],
                h = e[f.proxyId2];
            f.IsRemoved() ? (1 == f.IsFinal() && this.m_callback.PairRemoved(g.userData, h.userData, f.userData), this.m_pairBuffer[c].proxyId1 = f.proxyId1, this.m_pairBuffer[c].proxyId2 = f.proxyId2, ++c) : 0 == f.IsFinal() && (f.userData = this.m_callback.PairAdded(g.userData, h.userData), f.SetFinal())
        }
        for (a = 0; a < c; ++a) this.RemovePair(this.m_pairBuffer[a].proxyId1, this.m_pairBuffer[a].proxyId2);
        this.m_pairBufferCount = 0;
        b2BroadPhase.s_validate && this.ValidateTable()
    },
    AddPair: function(a, c) {
        if (a > c) {
            var e = a;
            a = c;
            c = e
        }
        var e = b2PairManager.Hash(a, c) & b2Pair.b2_tableMask,
            f = f = this.FindHash(a, c, e);
        if (null != f) return f;
        var g = this.m_freePair,
            f = this.m_pairs[g];
        this.m_freePair = f.next;
        f.proxyId1 = a;
        f.proxyId2 = c;
        f.status = 0;
        f.userData = null;
        f.next = this.m_hashTable[e];
        this.m_hashTable[e] = g;
        ++this.m_pairCount;
        return f
    },
    RemovePair: function(a, c) {
        if (a > c) {
            var e = a;
            a = c;
            c = e
        }
        for (var f = b2PairManager.Hash(a, c) & b2Pair.b2_tableMask, g = this.m_hashTable[f], h = null; g != b2Pair.b2_nullPair;) {
            if (b2PairManager.Equals(this.m_pairs[g],
                    a, c)) return e = g, h ? h.next = this.m_pairs[g].next : this.m_hashTable[f] = this.m_pairs[g].next, f = this.m_pairs[e], g = f.userData, f.next = this.m_freePair, f.proxyId1 = b2Pair.b2_nullProxy, f.proxyId2 = b2Pair.b2_nullProxy, f.userData = null, f.status = 0, this.m_freePair = e, --this.m_pairCount, g;
            h = this.m_pairs[g];
            g = h.next
        }
        return null
    },
    Find: function(a, c) {
        if (a > c) {
            var e = a;
            a = c;
            c = e
        }
        e = b2PairManager.Hash(a, c) & b2Pair.b2_tableMask;
        return this.FindHash(a, c, e)
    },
    FindHash: function(a, c, e) {
        for (e = this.m_hashTable[e]; e != b2Pair.b2_nullPair &&
            0 == b2PairManager.Equals(this.m_pairs[e], a, c);) e = this.m_pairs[e].next;
        return e == b2Pair.b2_nullPair ? null : this.m_pairs[e]
    },
    ValidateBuffer: function() {},
    ValidateTable: function() {},
    m_broadPhase: null,
    m_callback: null,
    m_pairs: null,
    m_freePair: 0,
    m_pairCount: 0,
    m_pairBuffer: null,
    m_pairBufferCount: 0,
    m_hashTable: null
};
b2PairManager.Hash = function(a, c) {
    var e = c << 16 & 4294901760 | a,
        e = ~e + (e << 15 & 4294934528),
        e = e ^ e >> 12 & 1048575,
        e = e + (e << 2 & 4294967292),
        e = 2057 * (e ^ e >> 4 & 268435455);
    return e ^= e >> 16 & 65535
};
b2PairManager.Equals = function(a, c, e) {
    return a.proxyId1 == c && a.proxyId2 == e
};
b2PairManager.EqualsPair = function(a, c) {
    return a.proxyId1 == c.proxyId1 && a.proxyId2 == c.proxyId2
};
var b2BroadPhase = Class.create();
b2BroadPhase.prototype = {
    initialize: function(a, c) {
        this.m_pairManager = new b2PairManager;
        this.m_proxyPool = Array(b2Settings.b2_maxPairs);
        this.m_bounds = Array(2 * b2Settings.b2_maxProxies);
        this.m_queryResults = Array(b2Settings.b2_maxProxies);
        this.m_quantizationFactor = new b2Vec2;
        var e = 0;
        this.m_pairManager.Initialize(this, c);
        this.m_worldAABB = a;
        for (e = this.m_proxyCount = 0; e < b2Settings.b2_maxProxies; e++) this.m_queryResults[e] = 0;
        this.m_bounds = Array(2);
        for (e = 0; 2 > e; e++) {
            this.m_bounds[e] = Array(2 * b2Settings.b2_maxProxies);
            for (var f = 0; f < 2 * b2Settings.b2_maxProxies; f++) this.m_bounds[e][f] = new b2Bound
        }
        e = a.maxVertex.x;
        f = a.maxVertex.y;
        e -= a.minVertex.x;
        f -= a.minVertex.y;
        this.m_quantizationFactor.x = b2Settings.USHRT_MAX / e;
        this.m_quantizationFactor.y = b2Settings.USHRT_MAX / f;
        for (e = 0; e < b2Settings.b2_maxProxies - 1; ++e) f = new b2Proxy, this.m_proxyPool[e] = f, f.SetNext(e + 1), f.timeStamp = 0, f.overlapCount = b2BroadPhase.b2_invalid, f.userData = null;
        f = new b2Proxy;
        this.m_proxyPool[b2Settings.b2_maxProxies - 1] = f;
        f.SetNext(b2Pair.b2_nullProxy);
        f.timeStamp =
            0;
        f.overlapCount = b2BroadPhase.b2_invalid;
        f.userData = null;
        this.m_freeProxy = 0;
        this.m_timeStamp = 1;
        this.m_queryResultCount = 0
    },
    InRange: function(a) {
        var c, e, f, g;
        c = a.minVertex.x;
        e = a.minVertex.y;
        c -= this.m_worldAABB.maxVertex.x;
        e -= this.m_worldAABB.maxVertex.y;
        f = this.m_worldAABB.minVertex.x;
        g = this.m_worldAABB.minVertex.y;
        f -= a.maxVertex.x;
        g -= a.maxVertex.y;
        c = b2Math.b2Max(c, f);
        e = b2Math.b2Max(e, g);
        return 0 > b2Math.b2Max(c, e)
    },
    GetProxy: function(a) {
        return a == b2Pair.b2_nullProxy || 0 == this.m_proxyPool[a].IsValid() ? null :
            this.m_proxyPool[a]
    },
    CreateProxy: function(a, c) {
        var e = 0,
            f, g = this.m_freeProxy;
        f = this.m_proxyPool[g];
        this.m_freeProxy = f.GetNext();
        f.overlapCount = 0;
        f.userData = c;
        f = 2 * this.m_proxyCount;
        var h = [],
            k = [];
        this.ComputeBounds(h, k, a);
        for (var l = 0; 2 > l; ++l) {
            var m = this.m_bounds[l],
                n = 0,
                p = 0,
                n = [n],
                p = [p];
            this.Query(n, p, h[l], k[l], m, f, l);
            for (var n = n[0], p = p[0], e = [], q = 0, r = f - p, s, t, q = 0; q < r; q++) e[q] = new b2Bound, s = e[q], t = m[p + q], s.value = t.value, s.proxyId = t.proxyId, s.stabbingCount = t.stabbingCount;
            for (var r = e.length, u = p + 2, q = 0; q < r; q++) t =
                e[q], s = m[u + q], s.value = t.value, s.proxyId = t.proxyId, s.stabbingCount = t.stabbingCount;
            e = [];
            r = p - n;
            for (q = 0; q < r; q++) e[q] = new b2Bound, s = e[q], t = m[n + q], s.value = t.value, s.proxyId = t.proxyId, s.stabbingCount = t.stabbingCount;
            r = e.length;
            u = n + 1;
            for (q = 0; q < r; q++) t = e[q], s = m[u + q], s.value = t.value, s.proxyId = t.proxyId, s.stabbingCount = t.stabbingCount;
            ++p;
            m[n].value = h[l];
            m[n].proxyId = g;
            m[p].value = k[l];
            m[p].proxyId = g;
            m[n].stabbingCount = 0 == n ? 0 : m[n - 1].stabbingCount;
            m[p].stabbingCount = m[p - 1].stabbingCount;
            for (e = n; e < p; ++e) m[e].stabbingCount++;
            for (e = n; e < f + 2; ++e) n = this.m_proxyPool[m[e].proxyId], m[e].IsLower() ? n.lowerBounds[l] = e : n.upperBounds[l] = e
        }++this.m_proxyCount;
        for (f = 0; f < this.m_queryResultCount; ++f) this.m_pairManager.AddBufferedPair(g, this.m_queryResults[f]);
        this.m_pairManager.Commit();
        this.m_queryResultCount = 0;
        this.IncrementTimeStamp();
        return g
    },
    DestroyProxy: function(a) {
        for (var c = this.m_proxyPool[a], e = 2 * this.m_proxyCount, f = 0; 2 > f; ++f) {
            for (var g = this.m_bounds[f], h = c.lowerBounds[f], k = c.upperBounds[f], l = g[h].value, m = g[k].value, n = [], p =
                    0, q = k - h - 1, r, s, p = 0; p < q; p++) n[p] = new b2Bound, r = n[p], s = g[h + 1 + p], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount;
            for (var q = n.length, t = h, p = 0; p < q; p++) s = n[p], r = g[t + p], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount;
            n = [];
            q = e - k - 1;
            for (p = 0; p < q; p++) n[p] = new b2Bound, r = n[p], s = g[k + 1 + p], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount;
            q = n.length;
            t = k - 1;
            for (p = 0; p < q; p++) s = n[p], r = g[t + p], r.value = s.value, r.proxyId = s.proxyId, r.stabbingCount = s.stabbingCount;
            q = e -
                2;
            for (n = h; n < q; ++n) p = this.m_proxyPool[g[n].proxyId], g[n].IsLower() ? p.lowerBounds[f] = n : p.upperBounds[f] = n;
            for (q = k - 1; h < q; ++h) g[h].stabbingCount--;
            this.Query([0], [0], l, m, g, e - 2, f)
        }
        for (e = 0; e < this.m_queryResultCount; ++e) this.m_pairManager.RemoveBufferedPair(a, this.m_queryResults[e]);
        this.m_pairManager.Commit();
        this.m_queryResultCount = 0;
        this.IncrementTimeStamp();
        c.userData = null;
        c.overlapCount = b2BroadPhase.b2_invalid;
        c.lowerBounds[0] = b2BroadPhase.b2_invalid;
        c.lowerBounds[1] = b2BroadPhase.b2_invalid;
        c.upperBounds[0] =
            b2BroadPhase.b2_invalid;
        c.upperBounds[1] = b2BroadPhase.b2_invalid;
        c.SetNext(this.m_freeProxy);
        this.m_freeProxy = a;
        --this.m_proxyCount
    },
    MoveProxy: function(a, c) {
        var e = 0,
            f = 0,
            g, h, k = 0,
            l;
        if (!(a == b2Pair.b2_nullProxy || b2Settings.b2_maxProxies <= a) && 0 != c.IsValid()) {
            var m = 2 * this.m_proxyCount,
                n = this.m_proxyPool[a],
                p = new b2BoundValues;
            this.ComputeBounds(p.lowerValues, p.upperValues, c);
            for (var q = new b2BoundValues, e = 0; 2 > e; ++e) q.lowerValues[e] = this.m_bounds[e][n.lowerBounds[e]].value, q.upperValues[e] = this.m_bounds[e][n.upperBounds[e]].value;
            for (e = 0; 2 > e; ++e) {
                var r = this.m_bounds[e],
                    s = n.lowerBounds[e],
                    t = n.upperBounds[e],
                    u = p.lowerValues[e],
                    x = p.upperValues[e],
                    v = u - r[s].value,
                    A = x - r[t].value;
                r[s].value = u;
                r[t].value = x;
                if (0 > v)
                    for (f = s; 0 < f && u < r[f - 1].value;) g = r[f], h = r[f - 1], k = h.proxyId, l = this.m_proxyPool[h.proxyId], h.stabbingCount++, 1 == h.IsUpper() ? (this.TestOverlap(p, l) && this.m_pairManager.AddBufferedPair(a, k), l.upperBounds[e] ++, g.stabbingCount++) : (l.lowerBounds[e] ++, g.stabbingCount--), n.lowerBounds[e] --, g.Swap(h), --f;
                if (0 < A)
                    for (f = t; f < m - 1 && r[f + 1].value <=
                        x;) g = r[f], h = r[f + 1], k = h.proxyId, l = this.m_proxyPool[k], h.stabbingCount++, 1 == h.IsLower() ? (this.TestOverlap(p, l) && this.m_pairManager.AddBufferedPair(a, k), l.lowerBounds[e] --, g.stabbingCount++) : (l.upperBounds[e] --, g.stabbingCount--), n.upperBounds[e] ++, g.Swap(h), f++;
                if (0 < v)
                    for (f = s; f < m - 1 && r[f + 1].value <= u;) g = r[f], h = r[f + 1], k = h.proxyId, l = this.m_proxyPool[k], h.stabbingCount--, h.IsUpper() ? (this.TestOverlap(q, l) && this.m_pairManager.RemoveBufferedPair(a, k), l.upperBounds[e] --, g.stabbingCount--) : (l.lowerBounds[e] --,
                        g.stabbingCount++), n.lowerBounds[e] ++, g.Swap(h), f++;
                if (0 > A)
                    for (f = t; 0 < f && x < r[f - 1].value;) g = r[f], h = r[f - 1], k = h.proxyId, l = this.m_proxyPool[k], h.stabbingCount--, 1 == h.IsLower() ? (this.TestOverlap(q, l) && this.m_pairManager.RemoveBufferedPair(a, k), l.lowerBounds[e] ++, g.stabbingCount--) : (l.upperBounds[e] ++, g.stabbingCount++), n.upperBounds[e] --, g.Swap(h), f--
            }
        }
    },
    Commit: function() {
        this.m_pairManager.Commit()
    },
    QueryAABB: function(a, c, e) {
        var f = [],
            g = [];
        this.ComputeBounds(f, g, a);
        a = [0];
        var h = [0];
        this.Query(a, h, f[0], g[0],
            this.m_bounds[0], 2 * this.m_proxyCount, 0);
        this.Query(a, h, f[1], g[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
        for (g = f = 0; g < this.m_queryResultCount && f < e; ++g, ++f) c[g] = this.m_proxyPool[this.m_queryResults[g]].userData;
        this.m_queryResultCount = 0;
        this.IncrementTimeStamp();
        return f
    },
    Validate: function() {
        for (var a = 0; 2 > a; ++a)
            for (var c = this.m_bounds[a], e = 2 * this.m_proxyCount, f = 0, g = 0; g < e; ++g) 1 == c[g].IsLower() ? f++ : f--
    },
    ComputeBounds: function(a, c, e) {
        var f = e.minVertex.x,
            g = e.minVertex.y,
            f = b2Math.b2Min(f, this.m_worldAABB.maxVertex.x),
            g = b2Math.b2Min(g, this.m_worldAABB.maxVertex.y),
            f = b2Math.b2Max(f, this.m_worldAABB.minVertex.x),
            g = b2Math.b2Max(g, this.m_worldAABB.minVertex.y),
            h = e.maxVertex.x;
        e = e.maxVertex.y;
        h = b2Math.b2Min(h, this.m_worldAABB.maxVertex.x);
        e = b2Math.b2Min(e, this.m_worldAABB.maxVertex.y);
        h = b2Math.b2Max(h, this.m_worldAABB.minVertex.x);
        e = b2Math.b2Max(e, this.m_worldAABB.minVertex.y);
        a[0] = this.m_quantizationFactor.x * (f - this.m_worldAABB.minVertex.x) & b2Settings.USHRT_MAX - 1;
        c[0] = this.m_quantizationFactor.x * (h - this.m_worldAABB.minVertex.x) &
            65535 | 1;
        a[1] = this.m_quantizationFactor.y * (g - this.m_worldAABB.minVertex.y) & b2Settings.USHRT_MAX - 1;
        c[1] = this.m_quantizationFactor.y * (e - this.m_worldAABB.minVertex.y) & 65535 | 1
    },
    TestOverlapValidate: function(a, c) {
        for (var e = 0; 2 > e; ++e) {
            var f = this.m_bounds[e];
            if (f[a.lowerBounds[e]].value > f[c.upperBounds[e]].value || f[a.upperBounds[e]].value < f[c.lowerBounds[e]].value) return !1
        }
        return !0
    },
    TestOverlap: function(a, c) {
        for (var e = 0; 2 > e; ++e) {
            var f = this.m_bounds[e];
            if (a.lowerValues[e] > f[c.upperBounds[e]].value || a.upperValues[e] <
                f[c.lowerBounds[e]].value) return !1
        }
        return !0
    },
    Query: function(a, c, e, f, g, h, k) {
        e = b2BroadPhase.BinarySearch(g, h, e);
        f = b2BroadPhase.BinarySearch(g, h, f);
        for (h = e; h < f; ++h) g[h].IsLower() && this.IncrementOverlapCount(g[h].proxyId);
        if (0 < e) {
            h = e - 1;
            for (var l = g[h].stabbingCount; l;) g[h].IsLower() && e <= this.m_proxyPool[g[h].proxyId].upperBounds[k] && (this.IncrementOverlapCount(g[h].proxyId), --l), --h
        }
        a[0] = e;
        c[0] = f
    },
    IncrementOverlapCount: function(a) {
        var c = this.m_proxyPool[a];
        c.timeStamp < this.m_timeStamp ? (c.timeStamp = this.m_timeStamp,
            c.overlapCount = 1) : (c.overlapCount = 2, this.m_queryResults[this.m_queryResultCount] = a, ++this.m_queryResultCount)
    },
    IncrementTimeStamp: function() {
        if (this.m_timeStamp == b2Settings.USHRT_MAX) {
            for (var a = 0; a < b2Settings.b2_maxProxies; ++a) this.m_proxyPool[a].timeStamp = 0;
            this.m_timeStamp = 1
        } else ++this.m_timeStamp
    },
    m_pairManager: new b2PairManager,
    m_proxyPool: Array(b2Settings.b2_maxPairs),
    m_freeProxy: 0,
    m_bounds: Array(2 * b2Settings.b2_maxProxies),
    m_queryResults: Array(b2Settings.b2_maxProxies),
    m_queryResultCount: 0,
    m_worldAABB: null,
    m_quantizationFactor: new b2Vec2,
    m_proxyCount: 0,
    m_timeStamp: 0
};
b2BroadPhase.s_validate = !1;
b2BroadPhase.b2_invalid = b2Settings.USHRT_MAX;
b2BroadPhase.b2_nullEdge = b2Settings.USHRT_MAX;
b2BroadPhase.BinarySearch = function(a, c, e) {
    var f = 0;
    for (c -= 1; f <= c;) {
        var g = Math.floor((f + c) / 2);
        if (a[g].value > e) c = g - 1;
        else if (a[g].value < e) f = g + 1;
        else return g
    }
    return f
};
var b2Collision = Class.create();
b2Collision.prototype = {
    initialize: function() {}
};
b2Collision.b2_nullFeature = 255;
b2Collision.ClipSegmentToLine = function(a, c, e, f) {
    var g = 0,
        h = c[0].v,
        k = c[1].v,
        l = b2Math.b2Dot(e, c[0].v) - f;
    e = b2Math.b2Dot(e, c[1].v) - f;
    0 >= l && (a[g++] = c[0]);
    0 >= e && (a[g++] = c[1]);
    0 > l * e && (e = l / (l - e), f = a[g].v, f.x = h.x + e * (k.x - h.x), f.y = h.y + e * (k.y - h.y), a[g].id = 0 < l ? c[0].id : c[1].id, ++g);
    return g
};
b2Collision.EdgeSeparation = function(a, c, e) {
    for (var f = a.m_vertices, g = e.m_vertexCount, h = e.m_vertices, k = a.m_normals[c].x, l = a.m_normals[c].y, m = k, n = a.m_R, k = n.col1.x * m + n.col2.x * l, l = n.col1.y * m + n.col2.y * l, p = k, q = l, n = e.m_R, m = p * n.col1.x + q * n.col1.y, q = p * n.col2.x + q * n.col2.y, p = m, m = 0, n = Number.MAX_VALUE, r = 0; r < g; ++r) {
        var s = h[r],
            s = s.x * p + s.y * q;
        s < n && (n = s, m = r)
    }
    n = a.m_R;
    g = a.m_position.x + (n.col1.x * f[c].x + n.col2.x * f[c].y);
    a = a.m_position.y + (n.col1.y * f[c].x + n.col2.y * f[c].y);
    n = e.m_R;
    c = e.m_position.x + (n.col1.x * h[m].x + n.col2.x *
        h[m].y);
    e = e.m_position.y + (n.col1.y * h[m].x + n.col2.y * h[m].y);
    return (c - g) * k + (e - a) * l
};
b2Collision.FindMaxSeparation = function(a, c, e, f) {
    for (var g = c.m_vertexCount, h = e.m_position.x - c.m_position.x, k = e.m_position.y - c.m_position.y, l = h * c.m_R.col1.x + k * c.m_R.col1.y, k = h * c.m_R.col2.x + k * c.m_R.col2.y, h = 0, m = -Number.MAX_VALUE, n = 0; n < g; ++n) {
        var p = c.m_normals[n].x * l + c.m_normals[n].y * k;
        p > m && (m = p, h = n)
    }
    l = b2Collision.EdgeSeparation(c, h, e);
    if (0 < l && 0 == f) return l;
    n = 0 <= h - 1 ? h - 1 : g - 1;
    p = b2Collision.EdgeSeparation(c, n, e);
    if (0 < p && 0 == f) return p;
    var q = h + 1 < g ? h + 1 : 0,
        r = b2Collision.EdgeSeparation(c, q, e);
    if (0 < r && 0 == f) return r;
    m = k = 0;
    if (p > l && p > r) m = -1, k = n, n = p;
    else if (r > l) m = 1, k = q, n = r;
    else return a[0] = h, l;
    for (;;) {
        h = -1 == m ? 0 <= k - 1 ? k - 1 : g - 1 : k + 1 < g ? k + 1 : 0;
        l = b2Collision.EdgeSeparation(c, h, e);
        if (0 < l && 0 == f) return l;
        if (l > n) k = h, n = l;
        else break
    }
    a[0] = k;
    return n
};
b2Collision.FindIncidentEdge = function(a, c, e, f) {
    var g = c.m_vertices,
        h = f.m_vertexCount,
        k = f.m_vertices,
        l = g[e + 1 == c.m_vertexCount ? 0 : e + 1],
        m = l.x,
        n = l.y,
        l = g[e],
        m = m - l.x,
        n = n - l.y,
        l = m,
        m = n,
        n = -l,
        l = 1 / Math.sqrt(m * m + n * n),
        m = m * l,
        n = n * l,
        l = m,
        g = c.m_R,
        m = g.col1.x * l + g.col2.x * n,
        n = g.col1.y * l + g.col2.y * n;
    c = m;
    g = f.m_R;
    l = c * g.col1.x + n * g.col1.y;
    n = c * g.col2.x + n * g.col2.y;
    c = l;
    for (var g = m = 0, p = Number.MAX_VALUE, q = 0; q < h; ++q) {
        var r = q,
            s = q + 1 < h ? q + 1 : 0,
            l = k[s],
            t = l.x,
            u = l.y,
            l = k[r],
            t = t - l.x,
            u = u - l.y,
            l = t,
            t = u,
            u = -l,
            l = 1 / Math.sqrt(t * t + u * u),
            t = t * l,
            u = u * l,
            l = t * c +
            u * n;
        l < p && (p = l, m = r, g = s)
    }
    h = a[0];
    l = h.v;
    l.SetV(k[m]);
    l.MulM(f.m_R);
    l.Add(f.m_position);
    h.id.features.referenceFace = e;
    h.id.features.incidentEdge = m;
    h.id.features.incidentVertex = m;
    h = a[1];
    l = h.v;
    l.SetV(k[g]);
    l.MulM(f.m_R);
    l.Add(f.m_position);
    h.id.features.referenceFace = e;
    h.id.features.incidentEdge = m;
    h.id.features.incidentVertex = g
};
b2Collision.b2CollidePolyTempVec = new b2Vec2;
b2Collision.b2CollidePoly = function(a, c, e, f) {
    a.pointCount = 0;
    var g, h = [0],
        k = b2Collision.FindMaxSeparation(h, c, e, f);
    g = h[0];
    if (!(0 < k && 0 == f)) {
        var l, h = [0],
            m = b2Collision.FindMaxSeparation(h, e, c, f);
        l = h[0];
        if (!(0 < m && 0 == f)) {
            var n = 0,
                h = 0;
            m > .98 * k + .001 ? (k = e, n = l, h = 1) : (k = c, c = e, n = g, h = 0);
            e = [new ClipVertex, new ClipVertex];
            b2Collision.FindIncidentEdge(e, k, n, c);
            c = k.m_vertices;
            var p = c[n],
                q = n + 1 < k.m_vertexCount ? c[n + 1] : c[0];
            g = q.x - p.x;
            l = q.y - p.y;
            var r = g,
                s = k.m_R;
            g = s.col1.x * r + s.col2.x * l;
            l = s.col1.y * r + s.col2.y * l;
            n = 1 / Math.sqrt(g *
                g + l * l);
            g *= n;
            l *= n;
            r = g;
            n = l;
            c = -r;
            var m = p.x,
                t = p.y,
                r = m,
                s = k.m_R,
                m = s.col1.x * r + s.col2.x * t,
                t = s.col1.y * r + s.col2.y * t,
                m = m + k.m_position.x,
                t = t + k.m_position.y,
                p = q.x,
                q = q.y,
                r = p,
                s = k.m_R,
                p = s.col1.x * r + s.col2.x * q,
                q = s.col1.y * r + s.col2.y * q,
                p = p + k.m_position.x,
                q = q + k.m_position.y,
                k = n * m + c * t,
                r = -(g * m + l * t),
                p = g * p + l * q,
                q = [new ClipVertex, new ClipVertex],
                m = [new ClipVertex, new ClipVertex],
                s = 0;
            b2Collision.b2CollidePolyTempVec.Set(-g, -l);
            s = b2Collision.ClipSegmentToLine(q, e, b2Collision.b2CollidePolyTempVec, r);
            if (!(2 > s || (b2Collision.b2CollidePolyTempVec.Set(g,
                    l), s = b2Collision.ClipSegmentToLine(m, q, b2Collision.b2CollidePolyTempVec, p), 2 > s))) {
                h ? a.normal.Set(-n, -c) : a.normal.Set(n, c);
                for (g = e = 0; g < b2Settings.b2_maxManifoldPoints; ++g)
                    if (l = m[g].v, l = n * l.x + c * l.y - k, 0 >= l || 1 == f) p = a.points[e], p.separation = l, p.position.SetV(m[g].v), p.id.Set(m[g].id), p.id.features.flip = h, ++e;
                a.pointCount = e
            }
        }
    }
};
b2Collision.b2CollideCircle = function(a, c, e, f) {
    a.pointCount = 0;
    var g = e.m_position.x - c.m_position.x,
        h = e.m_position.y - c.m_position.y,
        k = g * g + h * h;
    c = c.m_radius + e.m_radius;
    k > c * c && 0 == f || (k < Number.MIN_VALUE ? (f = -c, a.normal.Set(0, 1)) : (k = Math.sqrt(k), f = k - c, k = 1 / k, a.normal.x = k * g, a.normal.y = k * h), a.pointCount = 1, g = a.points[0], g.id.set_key(0), g.separation = f, g.position.x = e.m_position.x - e.m_radius * a.normal.x, g.position.y = e.m_position.y - e.m_radius * a.normal.y)
};
b2Collision.b2CollidePolyAndCircle = function(a, c, e, f) {
    a.pointCount = 0;
    var g, h;
    h = e.m_position.x - c.m_position.x;
    var k = e.m_position.y - c.m_position.y;
    f = c.m_R;
    var l = h * f.col1.x + k * f.col1.y,
        k = h * f.col2.x + k * f.col2.y;
    h = l;
    var m = 0,
        n = -Number.MAX_VALUE,
        l = e.m_radius;
    for (g = 0; g < c.m_vertexCount; ++g) {
        var p = c.m_normals[g].x * (h - c.m_vertices[g].x) + c.m_normals[g].y * (k - c.m_vertices[g].y);
        if (p > l) return;
        p > n && (n = p, m = g)
    }
    if (n < Number.MIN_VALUE) a.pointCount = 1, c = c.m_normals[m], a.normal.x = f.col1.x * c.x + f.col2.x * c.y, a.normal.y = f.col1.y *
        c.x + f.col2.y * c.y, g = a.points[0], g.id.features.incidentEdge = m, g.id.features.incidentVertex = b2Collision.b2_nullFeature, g.id.features.referenceFace = b2Collision.b2_nullFeature, g.id.features.flip = 0, g.position.x = e.m_position.x - l * a.normal.x, g.position.y = e.m_position.y - l * a.normal.y, g.separation = n - l;
    else {
        var n = m + 1 < c.m_vertexCount ? m + 1 : 0,
            q = c.m_vertices[n].x - c.m_vertices[m].x,
            p = c.m_vertices[n].y - c.m_vertices[m].y,
            r = Math.sqrt(q * q + p * p),
            q = q / r,
            p = p / r;
        if (r < Number.MIN_VALUE) h -= c.m_vertices[m].x, c = k - c.m_vertices[m].y,
            k = Math.sqrt(h * h + c * c), h /= k, c /= k, k > l || (a.pointCount = 1, a.normal.Set(f.col1.x * h + f.col2.x * c, f.col1.y * h + f.col2.y * c), g = a.points[0], g.id.features.incidentEdge = b2Collision.b2_nullFeature, g.id.features.incidentVertex = m, g.id.features.referenceFace = b2Collision.b2_nullFeature, g.id.features.flip = 0, g.position.x = e.m_position.x - l * a.normal.x, g.position.y = e.m_position.y - l * a.normal.y, g.separation = k - l);
        else {
            var s = (h - c.m_vertices[m].x) * q + (k - c.m_vertices[m].y) * p;
            g = a.points[0];
            g.id.features.incidentEdge = b2Collision.b2_nullFeature;
            g.id.features.incidentVertex = b2Collision.b2_nullFeature;
            g.id.features.referenceFace = b2Collision.b2_nullFeature;
            g.id.features.flip = 0;
            0 >= s ? (q = c.m_vertices[m].x, c = c.m_vertices[m].y, g.id.features.incidentVertex = m) : s >= r ? (q = c.m_vertices[n].x, c = c.m_vertices[n].y, g.id.features.incidentVertex = n) : (q = q * s + c.m_vertices[m].x, c = p * s + c.m_vertices[m].y, g.id.features.incidentEdge = m);
            h -= q;
            c = k - c;
            k = Math.sqrt(h * h + c * c);
            h /= k;
            c /= k;
            k > l || (a.pointCount = 1, a.normal.Set(f.col1.x * h + f.col2.x * c, f.col1.y * h + f.col2.y * c), g.position.x =
                e.m_position.x - l * a.normal.x, g.position.y = e.m_position.y - l * a.normal.y, g.separation = k - l)
        }
    }
};
b2Collision.b2TestOverlap = function(a, c) {
    var e = c.minVertex,
        f = a.maxVertex,
        g = e.x - f.x,
        h = e.y - f.y,
        e = a.minVertex,
        f = c.maxVertex,
        k = e.y - f.y;
    return 0 < g || 0 < h || 0 < e.x - f.x || 0 < k ? !1 : !0
};
var Features = Class.create();
Features.prototype = {
    set_referenceFace: function(a) {
        this._referenceFace = a;
        this._m_id._key = this._m_id._key & 4294967040 | this._referenceFace & 255
    },
    get_referenceFace: function() {
        return this._referenceFace
    },
    _referenceFace: 0,
    set_incidentEdge: function(a) {
        this._incidentEdge = a;
        this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
    },
    get_incidentEdge: function() {
        return this._incidentEdge
    },
    _incidentEdge: 0,
    set_incidentVertex: function(a) {
        this._incidentVertex = a;
        this._m_id._key = this._m_id._key & 4278255615 |
            this._incidentVertex << 16 & 16711680
    },
    get_incidentVertex: function() {
        return this._incidentVertex
    },
    _incidentVertex: 0,
    set_flip: function(a) {
        this._flip = a;
        this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
    },
    get_flip: function() {
        return this._flip
    },
    _flip: 0,
    _m_id: null,
    initialize: function() {}
};
var b2ContactID = Class.create();
b2ContactID.prototype = {
    initialize: function() {
        this.features = new Features;
        this.features._m_id = this
    },
    Set: function(a) {
        this.set_key(a._key)
    },
    Copy: function() {
        var a = new b2ContactID;
        a.set_key(this._key);
        return a
    },
    get_key: function() {
        return this._key
    },
    set_key: function(a) {
        this._key = a;
        this.features._referenceFace = this._key & 255;
        this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
        this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
        this.features._flip = (this._key & 4278190080) >> 24 & 255
    },
    features: new Features,
    _key: 0
};
var b2ContactPoint = Class.create();
b2ContactPoint.prototype = {
    position: new b2Vec2,
    separation: null,
    normalImpulse: null,
    tangentImpulse: null,
    id: new b2ContactID,
    initialize: function() {
        this.position = new b2Vec2;
        this.id = new b2ContactID
    }
};
var b2Distance = Class.create();
b2Distance.prototype = {
    initialize: function() {}
};
b2Distance.ProcessTwo = function(a, c, e, f, g) {
    var h = -g[1].x,
        k = -g[1].y,
        l = g[0].x - g[1].x,
        m = g[0].y - g[1].y,
        n = Math.sqrt(l * l + m * m),
        h = l / n * h + m / n * k;
    if (0 >= h || n < Number.MIN_VALUE) return a.SetV(e[1]), c.SetV(f[1]), e[0].SetV(e[1]), f[0].SetV(f[1]), g[0].SetV(g[1]), 1;
    h /= n;
    a.x = e[1].x + h * (e[0].x - e[1].x);
    a.y = e[1].y + h * (e[0].y - e[1].y);
    c.x = f[1].x + h * (f[0].x - f[1].x);
    c.y = f[1].y + h * (f[0].y - f[1].y);
    return 2
};
b2Distance.ProcessThree = function(a, c, e, f, g) {
    var h = g[0].x,
        k = g[0].y,
        l = g[1].x,
        m = g[1].y,
        n = g[2].x,
        p = g[2].y,
        q = l - h,
        r = m - k,
        s = n - h,
        t = p - k,
        u = n - l,
        x = p - m,
        v = -(h * s + k * t),
        A = n * s + p * t,
        D = -(l * u + m * x),
        u = n * u + p * x;
    if (0 >= A && 0 >= u) return a.SetV(e[2]), c.SetV(f[2]), e[0].SetV(e[2]), f[0].SetV(f[2]), g[0].SetV(g[2]), 1;
    r = q * t - r * s;
    q = r * (h * m - k * l);
    l = r * (l * p - m * n);
    if (0 >= l && 0 <= D && 0 <= u) return v = D / (D + u), a.x = e[1].x + v * (e[2].x - e[1].x), a.y = e[1].y + v * (e[2].y - e[1].y), c.x = f[1].x + v * (f[2].x - f[1].x), c.y = f[1].y + v * (f[2].y - f[1].y), e[0].SetV(e[2]), f[0].SetV(f[2]),
        g[0].SetV(g[2]), 2;
    h = r * (n * k - p * h);
    if (0 >= h && 0 <= v && 0 <= A) return v /= v + A, a.x = e[0].x + v * (e[2].x - e[0].x), a.y = e[0].y + v * (e[2].y - e[0].y), c.x = f[0].x + v * (f[2].x - f[0].x), c.y = f[0].y + v * (f[2].y - f[0].y), e[1].SetV(e[2]), f[1].SetV(f[2]), g[1].SetV(g[2]), 2;
    v = 1 / (l + h + q);
    g = l * v;
    v *= h;
    A = 1 - g - v;
    a.x = g * e[0].x + v * e[1].x + A * e[2].x;
    a.y = g * e[0].y + v * e[1].y + A * e[2].y;
    c.x = g * f[0].x + v * f[1].x + A * f[2].x;
    c.y = g * f[0].y + v * f[1].y + A * f[2].y;
    return 3
};
b2Distance.InPoinsts = function(a, c, e) {
    for (var f = 0; f < e; ++f)
        if (a.x == c[f].x && a.y == c[f].y) return !0;
    return !1
};
b2Distance.Distance = function(a, c, e, f) {
    var g = Array(3),
        h = Array(3),
        k = Array(3),
        l = 0;
    a.SetV(e.m_position);
    c.SetV(f.m_position);
    for (var m = 0, n = 0; 20 > n; ++n) {
        var p = c.x - a.x,
            q = c.y - a.y,
            r = e.Support(p, q),
            s = f.Support(-p, -q),
            m = p * p + q * q,
            t = s.x - r.x,
            u = s.y - r.y;
        if (m - b2Dot(p * t + q * u) <= .01 * m) return 0 == l && (a.SetV(r), c.SetV(s)), b2Distance.g_GJK_Iterations = n, Math.sqrt(m);
        switch (l) {
            case 0:
                g[0].SetV(r);
                h[0].SetV(s);
                k[0] = w;
                a.SetV(g[0]);
                c.SetV(h[0]);
                ++l;
                break;
            case 1:
                g[1].SetV(r);
                h[1].SetV(s);
                k[1].x = t;
                k[1].y = u;
                l = b2Distance.ProcessTwo(a,
                    c, g, h, k);
                break;
            case 2:
                g[2].SetV(r), h[2].SetV(s), k[2].x = t, k[2].y = u, l = b2Distance.ProcessThree(a, c, g, h, k)
        }
        if (3 == l) return b2Distance.g_GJK_Iterations = n, 0;
        p = -Number.MAX_VALUE;
        for (q = 0; q < l; ++q) p = b2Math.b2Max(p, k[q].x * k[q].x + k[q].y * k[q].y);
        if (3 == l || m <= 100 * Number.MIN_VALUE * p) return b2Distance.g_GJK_Iterations = n, Math.sqrt(m)
    }
    b2Distance.g_GJK_Iterations = 20;
    return Math.sqrt(m)
};
b2Distance.g_GJK_Iterations = 0;
var b2Manifold = Class.create();
b2Manifold.prototype = {
    initialize: function() {
        this.points = Array(b2Settings.b2_maxManifoldPoints);
        for (var a = 0; a < b2Settings.b2_maxManifoldPoints; a++) this.points[a] = new b2ContactPoint;
        this.normal = new b2Vec2
    },
    points: null,
    normal: null,
    pointCount: 0
};
var b2OBB = Class.create();
b2OBB.prototype = {
    R: new b2Mat22,
    center: new b2Vec2,
    extents: new b2Vec2,
    initialize: function() {
        this.R = new b2Mat22;
        this.center = new b2Vec2;
        this.extents = new b2Vec2
    }
};
var b2Proxy = Class.create();
b2Proxy.prototype = {
    GetNext: function() {
        return this.lowerBounds[0]
    },
    SetNext: function(a) {
        this.lowerBounds[0] = a
    },
    IsValid: function() {
        return this.overlapCount != b2BroadPhase.b2_invalid
    },
    lowerBounds: [0, 0],
    upperBounds: [0, 0],
    overlapCount: 0,
    timeStamp: 0,
    userData: null,
    initialize: function() {
        this.lowerBounds = [0, 0];
        this.upperBounds = [0, 0]
    }
};
var ClipVertex = Class.create();
ClipVertex.prototype = {
    v: new b2Vec2,
    id: new b2ContactID,
    initialize: function() {
        this.v = new b2Vec2;
        this.id = new b2ContactID
    }
};
var b2Shape = Class.create();
b2Shape.prototype = {
    TestPoint: function(a) {
        return !1
    },
    GetUserData: function() {
        return this.m_userData
    },
    GetType: function() {
        return this.m_type
    },
    GetBody: function() {
        return this.m_body
    },
    GetPosition: function() {
        return this.m_position
    },
    GetRotationMatrix: function() {
        return this.m_R
    },
    ResetProxy: function(a) {},
    GetNext: function() {
        return this.m_next
    },
    initialize: function(a, c) {
        this.m_R = new b2Mat22;
        this.m_position = new b2Vec2;
        this.m_userData = a.userData;
        this.m_friction = a.friction;
        this.m_restitution = a.restitution;
        this.m_body =
            c;
        this.m_proxyId = b2Pair.b2_nullProxy;
        this.m_maxRadius = 0;
        this.m_categoryBits = a.categoryBits;
        this.m_maskBits = a.maskBits;
        this.m_groupIndex = a.groupIndex
    },
    DestroyProxy: function() {
        this.m_proxyId != b2Pair.b2_nullProxy && (this.m_body.m_world.m_broadPhase.DestroyProxy(this.m_proxyId), this.m_proxyId = b2Pair.b2_nullProxy)
    },
    Synchronize: function(a, c, e, f) {},
    QuickSync: function(a, c) {},
    Support: function(a, c, e) {},
    GetMaxRadius: function() {
        return this.m_maxRadius
    },
    m_next: null,
    m_R: new b2Mat22,
    m_position: new b2Vec2,
    m_type: 0,
    m_userData: null,
    m_body: null,
    m_friction: null,
    m_restitution: null,
    m_maxRadius: null,
    m_proxyId: 0,
    m_categoryBits: 0,
    m_maskBits: 0,
    m_groupIndex: 0
};
b2Shape.Create = function(a, c, e) {
    switch (a.type) {
        case b2Shape.e_circleShape:
            return new b2CircleShape(a, c, e);
        case b2Shape.e_boxShape:
        case b2Shape.e_polyShape:
            return new b2PolyShape(a, c, e)
    }
    return null
};
b2Shape.Destroy = function(a) {
    a.m_proxyId != b2Pair.b2_nullProxy && a.m_body.m_world.m_broadPhase.DestroyProxy(a.m_proxyId)
};
b2Shape.e_unknownShape = -1;
b2Shape.e_circleShape = 0;
b2Shape.e_boxShape = 1;
b2Shape.e_polyShape = 2;
b2Shape.e_meshShape = 3;
b2Shape.e_shapeTypeCount = 4;
b2Shape.PolyMass = function(a, c, e, f) {
    var g = new b2Vec2;
    g.SetZero();
    for (var h = 0, k = 0, l = new b2Vec2(0, 0), m = 1 / 3, n = 0; n < e; ++n) {
        var p = l,
            q = c[n],
            r = n + 1 < e ? c[n + 1] : c[0],
            s = b2Math.SubtractVV(q, p),
            t = b2Math.SubtractVV(r, p),
            u = b2Math.b2CrossVV(s, t),
            x = .5 * u,
            h = h + x,
            v = new b2Vec2;
        v.SetV(p);
        v.Add(q);
        v.Add(r);
        v.Multiply(m * x);
        g.Add(v);
        q = p.x;
        p = p.y;
        r = s.x;
        s = s.y;
        x = t.x;
        t = t.y;
        k += u * (m * (.25 * (r * r + x * r + x * x) + (q * r + q * x)) + .5 * q * q + (m * (.25 * (s * s + t * s + t * t) + (p * s + p * t)) + .5 * p * p))
    }
    a.mass = f * h;
    g.Multiply(1 / h);
    a.center = g;
    k = f * (k - h * b2Math.b2Dot(g, g));
    a.I = k
};
b2Shape.PolyCentroid = function(a, c, e) {
    for (var f = 0, g = 0, h = 0, k = 1 / 3, l = 0; l < c; ++l) var m = a[l].x,
        n = a[l].y,
        p = l + 1 < c ? a[l + 1].x : a[0].x,
        q = l + 1 < c ? a[l + 1].y : a[0].y,
        r = .5 * ((m - 0) * (q - 0) - (n - 0) * (p - 0)),
        h = h + r,
        f = f + r * k * (0 + m + p),
        g = g + r * k * (0 + n + q);
    e.Set(1 / h * f, 1 / h * g)
};
var b2ShapeDef = Class.create();
b2ShapeDef.prototype = {
    initialize: function() {
        this.type = b2Shape.e_unknownShape;
        this.userData = null;
        this.localPosition = new b2Vec2(0, 0);
        this.localRotation = 0;
        this.friction = .2;
        this.density = this.restitution = 0;
        this.categoryBits = 1;
        this.maskBits = 65535;
        this.groupIndex = 0
    },
    ComputeMass: function(a) {
        a.center = new b2Vec2(0, 0);
        0 == this.density && (a.mass = 0, a.center.Set(0, 0), a.I = 0);
        switch (this.type) {
            case b2Shape.e_circleShape:
                a.mass = this.density * b2Settings.b2_pi * this.radius * this.radius;
                a.center.Set(0, 0);
                a.I = .5 * a.mass * this.radius *
                    this.radius;
                break;
            case b2Shape.e_boxShape:
                a.mass = 4 * this.density * this.extents.x * this.extents.y;
                a.center.Set(0, 0);
                a.I = a.mass / 3 * b2Math.b2Dot(this.extents, this.extents);
                break;
            case b2Shape.e_polyShape:
                b2Shape.PolyMass(a, this.vertices, this.vertexCount, this.density);
                break;
            default:
                a.mass = 0, a.center.Set(0, 0), a.I = 0
        }
    },
    type: 0,
    userData: null,
    localPosition: null,
    localRotation: null,
    friction: null,
    restitution: null,
    density: null,
    categoryBits: 0,
    maskBits: 0,
    groupIndex: 0
};
var b2BoxDef = Class.create();
Object.extend(b2BoxDef.prototype, b2ShapeDef.prototype);
Object.extend(b2BoxDef.prototype, {
    initialize: function() {
        this.type = b2Shape.e_unknownShape;
        this.userData = null;
        this.localPosition = new b2Vec2(0, 0);
        this.localRotation = 0;
        this.friction = .2;
        this.density = this.restitution = 0;
        this.categoryBits = 1;
        this.maskBits = 65535;
        this.groupIndex = 0;
        this.type = b2Shape.e_boxShape;
        this.extents = new b2Vec2(1, 1)
    },
    extents: null
});
var b2CircleDef = Class.create();
Object.extend(b2CircleDef.prototype, b2ShapeDef.prototype);
Object.extend(b2CircleDef.prototype, {
    initialize: function() {
        this.type = b2Shape.e_unknownShape;
        this.userData = null;
        this.localPosition = new b2Vec2(0, 0);
        this.localRotation = 0;
        this.friction = .2;
        this.density = this.restitution = 0;
        this.categoryBits = 1;
        this.maskBits = 65535;
        this.groupIndex = 0;
        this.type = b2Shape.e_circleShape;
        this.radius = 1
    },
    radius: null
});
var b2CircleShape = Class.create();
Object.extend(b2CircleShape.prototype, b2Shape.prototype);
Object.extend(b2CircleShape.prototype, {
    TestPoint: function(a) {
        var c = new b2Vec2;
        c.SetV(a);
        c.Subtract(this.m_position);
        return b2Math.b2Dot(c, c) <= this.m_radius * this.m_radius
    },
    initialize: function(a, c, e) {
        this.m_R = new b2Mat22;
        this.m_position = new b2Vec2;
        this.m_userData = a.userData;
        this.m_friction = a.friction;
        this.m_restitution = a.restitution;
        this.m_body = c;
        this.m_proxyId = b2Pair.b2_nullProxy;
        this.m_maxRadius = 0;
        this.m_categoryBits = a.categoryBits;
        this.m_maskBits = a.maskBits;
        this.m_groupIndex = a.groupIndex;
        this.m_localPosition =
            new b2Vec2;
        this.m_localPosition.Set(a.localPosition.x - e.x, a.localPosition.y - e.y);
        this.m_type = b2Shape.e_circleShape;
        this.m_radius = a.radius;
        this.m_R.SetM(this.m_body.m_R);
        a = this.m_R.col1.x * this.m_localPosition.x + this.m_R.col2.x * this.m_localPosition.y;
        c = this.m_R.col1.y * this.m_localPosition.x + this.m_R.col2.y * this.m_localPosition.y;
        this.m_position.x = this.m_body.m_position.x + a;
        this.m_position.y = this.m_body.m_position.y + c;
        this.m_maxRadius = Math.sqrt(a * a + c * c) + this.m_radius;
        a = new b2AABB;
        a.minVertex.Set(this.m_position.x -
            this.m_radius, this.m_position.y - this.m_radius);
        a.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
        c = this.m_body.m_world.m_broadPhase;
        c.InRange(a) ? this.m_proxyId = c.CreateProxy(a, this) : this.m_proxyId = b2Pair.b2_nullProxy;
        this.m_proxyId == b2Pair.b2_nullProxy && this.m_body.Freeze()
    },
    Synchronize: function(a, c, e, f) {
        this.m_R.SetM(f);
        this.m_position.x = f.col1.x * this.m_localPosition.x + f.col2.x * this.m_localPosition.y + e.x;
        this.m_position.y = f.col1.y * this.m_localPosition.x + f.col2.y * this.m_localPosition.y +
            e.y;
        if (this.m_proxyId != b2Pair.b2_nullProxy) {
            e = a.x + (c.col1.x * this.m_localPosition.x + c.col2.x * this.m_localPosition.y);
            f = a.y + (c.col1.y * this.m_localPosition.x + c.col2.y * this.m_localPosition.y);
            a = Math.min(e, this.m_position.x);
            c = Math.min(f, this.m_position.y);
            e = Math.max(e, this.m_position.x);
            var g = Math.max(f, this.m_position.y);
            f = new b2AABB;
            f.minVertex.Set(a - this.m_radius, c - this.m_radius);
            f.maxVertex.Set(e + this.m_radius, g + this.m_radius);
            a = this.m_body.m_world.m_broadPhase;
            a.InRange(f) ? a.MoveProxy(this.m_proxyId,
                f) : this.m_body.Freeze()
        }
    },
    QuickSync: function(a, c) {
        this.m_R.SetM(c);
        this.m_position.x = c.col1.x * this.m_localPosition.x + c.col2.x * this.m_localPosition.y + a.x;
        this.m_position.y = c.col1.y * this.m_localPosition.x + c.col2.y * this.m_localPosition.y + a.y
    },
    ResetProxy: function(a) {
        if (this.m_proxyId != b2Pair.b2_nullProxy) {
            a.GetProxy(this.m_proxyId);
            a.DestroyProxy(this.m_proxyId);
            var c = new b2AABB;
            c.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
            c.maxVertex.Set(this.m_position.x + this.m_radius,
                this.m_position.y + this.m_radius);
            a.InRange(c) ? this.m_proxyId = a.CreateProxy(c, this) : this.m_proxyId = b2Pair.b2_nullProxy;
            this.m_proxyId == b2Pair.b2_nullProxy && this.m_body.Freeze()
        }
    },
    Support: function(a, c, e) {
        var f = Math.sqrt(a * a + c * c);
        e.Set(this.m_position.x + a / f * this.m_radius, this.m_position.y + c / f * this.m_radius)
    },
    m_localPosition: new b2Vec2,
    m_radius: null
});
var b2MassData = Class.create();
b2MassData.prototype = {
    mass: 0,
    center: new b2Vec2(0, 0),
    I: 0,
    initialize: function() {
        this.center = new b2Vec2(0, 0)
    }
};
var b2PolyDef = Class.create();
Object.extend(b2PolyDef.prototype, b2ShapeDef.prototype);
Object.extend(b2PolyDef.prototype, {
    initialize: function() {
        this.type = b2Shape.e_unknownShape;
        this.userData = null;
        this.localPosition = new b2Vec2(0, 0);
        this.localRotation = 0;
        this.friction = .2;
        this.density = this.restitution = 0;
        this.categoryBits = 1;
        this.maskBits = 65535;
        this.groupIndex = 0;
        this.vertices = Array(b2Settings.b2_maxPolyVertices);
        this.type = b2Shape.e_polyShape;
        for (var a = this.vertexCount = 0; a < b2Settings.b2_maxPolyVertices; a++) this.vertices[a] = new b2Vec2
    },
    vertices: Array(b2Settings.b2_maxPolyVertices),
    vertexCount: 0
});
var b2PolyShape = Class.create();
Object.extend(b2PolyShape.prototype, b2Shape.prototype);
Object.extend(b2PolyShape.prototype, {
    TestPoint: function(a) {
        var c = new b2Vec2;
        c.SetV(a);
        c.Subtract(this.m_position);
        c.MulTM(this.m_R);
        for (a = 0; a < this.m_vertexCount; ++a) {
            var e = new b2Vec2;
            e.SetV(c);
            e.Subtract(this.m_vertices[a]);
            if (0 < b2Math.b2Dot(this.m_normals[a], e)) return !1
        }
        return !0
    },
    initialize: function(a, c, e) {
        this.m_R = new b2Mat22;
        this.m_position = new b2Vec2;
        this.m_userData = a.userData;
        this.m_friction = a.friction;
        this.m_restitution = a.restitution;
        this.m_body = c;
        this.m_proxyId = b2Pair.b2_nullProxy;
        this.m_maxRadius =
            0;
        this.m_categoryBits = a.categoryBits;
        this.m_maskBits = a.maskBits;
        this.m_groupIndex = a.groupIndex;
        this.syncAABB = new b2AABB;
        this.syncMat = new b2Mat22;
        this.m_localCentroid = new b2Vec2;
        this.m_localOBB = new b2OBB;
        var f = 0,
            g;
        c = new b2AABB;
        this.m_vertices = Array(b2Settings.b2_maxPolyVertices);
        this.m_coreVertices = Array(b2Settings.b2_maxPolyVertices);
        this.m_normals = Array(b2Settings.b2_maxPolyVertices);
        this.m_type = b2Shape.e_polyShape;
        var h = new b2Mat22(a.localRotation);
        if (a.type == b2Shape.e_boxShape) {
            this.m_localCentroid.x =
                a.localPosition.x - e.x;
            this.m_localCentroid.y = a.localPosition.y - e.y;
            this.m_vertexCount = 4;
            e = a.extents.x;
            g = a.extents.y;
            a = Math.max(0, e - 2 * b2Settings.b2_linearSlop);
            var k = Math.max(0, g - 2 * b2Settings.b2_linearSlop),
                f = this.m_vertices[0] = new b2Vec2;
            f.x = h.col1.x * e + h.col2.x * g;
            f.y = h.col1.y * e + h.col2.y * g;
            f = this.m_vertices[1] = new b2Vec2;
            f.x = h.col1.x * -e + h.col2.x * g;
            f.y = h.col1.y * -e + h.col2.y * g;
            f = this.m_vertices[2] = new b2Vec2;
            f.x = h.col1.x * -e + h.col2.x * -g;
            f.y = h.col1.y * -e + h.col2.y * -g;
            f = this.m_vertices[3] = new b2Vec2;
            f.x = h.col1.x *
                e + h.col2.x * -g;
            f.y = h.col1.y * e + h.col2.y * -g;
            f = this.m_coreVertices[0] = new b2Vec2;
            f.x = h.col1.x * a + h.col2.x * k;
            f.y = h.col1.y * a + h.col2.y * k;
            f = this.m_coreVertices[1] = new b2Vec2;
            f.x = h.col1.x * -a + h.col2.x * k;
            f.y = h.col1.y * -a + h.col2.y * k;
            f = this.m_coreVertices[2] = new b2Vec2;
            f.x = h.col1.x * -a + h.col2.x * -k;
            f.y = h.col1.y * -a + h.col2.y * -k;
            f = this.m_coreVertices[3] = new b2Vec2;
            f.x = h.col1.x * a + h.col2.x * -k;
            f.y = h.col1.y * a + h.col2.y * -k
        } else {
            this.m_vertexCount = a.vertexCount;
            b2Shape.PolyCentroid(a.vertices, a.vertexCount, b2PolyShape.tempVec);
            var k = b2PolyShape.tempVec.x,
                l = b2PolyShape.tempVec.y;
            this.m_localCentroid.x = a.localPosition.x + (h.col1.x * k + h.col2.x * l) - e.x;
            this.m_localCentroid.y = a.localPosition.y + (h.col1.y * k + h.col2.y * l) - e.y;
            for (f = 0; f < this.m_vertexCount; ++f) {
                this.m_vertices[f] = new b2Vec2;
                this.m_coreVertices[f] = new b2Vec2;
                e = a.vertices[f].x - k;
                g = a.vertices[f].y - l;
                this.m_vertices[f].x = h.col1.x * e + h.col2.x * g;
                this.m_vertices[f].y = h.col1.y * e + h.col2.y * g;
                e = this.m_vertices[f].x;
                g = this.m_vertices[f].y;
                var m = Math.sqrt(e * e + g * g);
                m > Number.MIN_VALUE &&
                    (e *= 1 / m, g *= 1 / m);
                this.m_coreVertices[f].x = this.m_vertices[f].x - 2 * b2Settings.b2_linearSlop * e;
                this.m_coreVertices[f].y = this.m_vertices[f].y - 2 * b2Settings.b2_linearSlop * g
            }
        }
        a = h = Number.MAX_VALUE;
        e = -Number.MAX_VALUE;
        g = -Number.MAX_VALUE;
        for (f = this.m_maxRadius = 0; f < this.m_vertexCount; ++f) k = this.m_vertices[f], h = Math.min(h, k.x), a = Math.min(a, k.y), e = Math.max(e, k.x), g = Math.max(g, k.y), this.m_maxRadius = Math.max(this.m_maxRadius, k.Length());
        this.m_localOBB.R.SetIdentity();
        this.m_localOBB.center.Set(.5 * (h + e), .5 * (a + g));
        this.m_localOBB.extents.Set(.5 * (e - h), .5 * (g - a));
        for (f = a = h = 0; f < this.m_vertexCount; ++f) this.m_normals[f] = new b2Vec2, h = f, a = f + 1 < this.m_vertexCount ? f + 1 : 0, this.m_normals[f].x = this.m_vertices[a].y - this.m_vertices[h].y, this.m_normals[f].y = -(this.m_vertices[a].x - this.m_vertices[h].x), this.m_normals[f].Normalize();
        for (f = 0; f < this.m_vertexCount; ++f);
        this.m_R.SetM(this.m_body.m_R);
        this.m_position.x = this.m_body.m_position.x + (this.m_R.col1.x * this.m_localCentroid.x + this.m_R.col2.x * this.m_localCentroid.y);
        this.m_position.y =
            this.m_body.m_position.y + (this.m_R.col1.y * this.m_localCentroid.x + this.m_R.col2.y * this.m_localCentroid.y);
        b2PolyShape.tAbsR.col1.x = this.m_R.col1.x * this.m_localOBB.R.col1.x + this.m_R.col2.x * this.m_localOBB.R.col1.y;
        b2PolyShape.tAbsR.col1.y = this.m_R.col1.y * this.m_localOBB.R.col1.x + this.m_R.col2.y * this.m_localOBB.R.col1.y;
        b2PolyShape.tAbsR.col2.x = this.m_R.col1.x * this.m_localOBB.R.col2.x + this.m_R.col2.x * this.m_localOBB.R.col2.y;
        b2PolyShape.tAbsR.col2.y = this.m_R.col1.y * this.m_localOBB.R.col2.x + this.m_R.col2.y *
            this.m_localOBB.R.col2.y;
        b2PolyShape.tAbsR.Abs();
        e = b2PolyShape.tAbsR.col1.x * this.m_localOBB.extents.x + b2PolyShape.tAbsR.col2.x * this.m_localOBB.extents.y;
        g = b2PolyShape.tAbsR.col1.y * this.m_localOBB.extents.x + b2PolyShape.tAbsR.col2.y * this.m_localOBB.extents.y;
        f = this.m_position.x + (this.m_R.col1.x * this.m_localOBB.center.x + this.m_R.col2.x * this.m_localOBB.center.y);
        h = this.m_position.y + (this.m_R.col1.y * this.m_localOBB.center.x + this.m_R.col2.y * this.m_localOBB.center.y);
        c.minVertex.x = f - e;
        c.minVertex.y = h - g;
        c.maxVertex.x = f + e;
        c.maxVertex.y = h + g;
        f = this.m_body.m_world.m_broadPhase;
        f.InRange(c) ? this.m_proxyId = f.CreateProxy(c, this) : this.m_proxyId = b2Pair.b2_nullProxy;
        this.m_proxyId == b2Pair.b2_nullProxy && this.m_body.Freeze()
    },
    syncAABB: new b2AABB,
    syncMat: new b2Mat22,
    Synchronize: function(a, c, e, f) {
        this.m_R.SetM(f);
        this.m_position.x = this.m_body.m_position.x + (f.col1.x * this.m_localCentroid.x + f.col2.x * this.m_localCentroid.y);
        this.m_position.y = this.m_body.m_position.y + (f.col1.y * this.m_localCentroid.x + f.col2.y * this.m_localCentroid.y);
        if (this.m_proxyId != b2Pair.b2_nullProxy) {
            var g, h;
            g = c.col1;
            h = c.col2;
            var k = this.m_localOBB.R.col1,
                l = this.m_localOBB.R.col2;
            this.syncMat.col1.x = g.x * k.x + h.x * k.y;
            this.syncMat.col1.y = g.y * k.x + h.y * k.y;
            this.syncMat.col2.x = g.x * l.x + h.x * l.y;
            this.syncMat.col2.y = g.y * l.x + h.y * l.y;
            this.syncMat.Abs();
            g = this.m_localCentroid.x + this.m_localOBB.center.x;
            h = this.m_localCentroid.y + this.m_localOBB.center.y;
            k = a.x + (c.col1.x * g + c.col2.x * h);
            a = a.y + (c.col1.y * g + c.col2.y * h);
            g = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x *
                this.m_localOBB.extents.y;
            h = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
            this.syncAABB.minVertex.x = k - g;
            this.syncAABB.minVertex.y = a - h;
            this.syncAABB.maxVertex.x = k + g;
            this.syncAABB.maxVertex.y = a + h;
            g = f.col1;
            h = f.col2;
            k = this.m_localOBB.R.col1;
            l = this.m_localOBB.R.col2;
            this.syncMat.col1.x = g.x * k.x + h.x * k.y;
            this.syncMat.col1.y = g.y * k.x + h.y * k.y;
            this.syncMat.col2.x = g.x * l.x + h.x * l.y;
            this.syncMat.col2.y = g.y * l.x + h.y * l.y;
            this.syncMat.Abs();
            g = this.m_localCentroid.x + this.m_localOBB.center.x;
            h = this.m_localCentroid.y + this.m_localOBB.center.y;
            k = e.x + (f.col1.x * g + f.col2.x * h);
            a = e.y + (f.col1.y * g + f.col2.y * h);
            g = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
            h = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
            this.syncAABB.minVertex.x = Math.min(this.syncAABB.minVertex.x, k - g);
            this.syncAABB.minVertex.y = Math.min(this.syncAABB.minVertex.y, a - h);
            this.syncAABB.maxVertex.x = Math.max(this.syncAABB.maxVertex.x, k + g);
            this.syncAABB.maxVertex.y =
                Math.max(this.syncAABB.maxVertex.y, a + h);
            e = this.m_body.m_world.m_broadPhase;
            e.InRange(this.syncAABB) ? e.MoveProxy(this.m_proxyId, this.syncAABB) : this.m_body.Freeze()
        }
    },
    QuickSync: function(a, c) {
        this.m_R.SetM(c);
        this.m_position.x = a.x + (c.col1.x * this.m_localCentroid.x + c.col2.x * this.m_localCentroid.y);
        this.m_position.y = a.y + (c.col1.y * this.m_localCentroid.x + c.col2.y * this.m_localCentroid.y)
    },
    ResetProxy: function(a) {
        if (this.m_proxyId != b2Pair.b2_nullProxy) {
            a.GetProxy(this.m_proxyId);
            a.DestroyProxy(this.m_proxyId);
            var c = b2Math.b2MulMM(this.m_R, this.m_localOBB.R),
                c = b2Math.b2AbsM(c),
                c = b2Math.b2MulMV(c, this.m_localOBB.extents),
                e = b2Math.b2MulMV(this.m_R, this.m_localOBB.center);
            e.Add(this.m_position);
            var f = new b2AABB;
            f.minVertex.SetV(e);
            f.minVertex.Subtract(c);
            f.maxVertex.SetV(e);
            f.maxVertex.Add(c);
            a.InRange(f) ? this.m_proxyId = a.CreateProxy(f, this) : this.m_proxyId = b2Pair.b2_nullProxy;
            this.m_proxyId == b2Pair.b2_nullProxy && this.m_body.Freeze()
        }
    },
    Support: function(a, c, e) {
        var f = a * this.m_R.col1.x + c * this.m_R.col1.y;
        a = a * this.m_R.col2.x +
            c * this.m_R.col2.y;
        c = 0;
        for (var g = this.m_coreVertices[0].x * f + this.m_coreVertices[0].y * a, h = 1; h < this.m_vertexCount; ++h) {
            var k = this.m_coreVertices[h].x * f + this.m_coreVertices[h].y * a;
            k > g && (c = h, g = k)
        }
        e.Set(this.m_position.x + (this.m_R.col1.x * this.m_coreVertices[c].x + this.m_R.col2.x * this.m_coreVertices[c].y), this.m_position.y + (this.m_R.col1.y * this.m_coreVertices[c].x + this.m_R.col2.y * this.m_coreVertices[c].y))
    },
    m_localCentroid: new b2Vec2,
    m_localOBB: new b2OBB,
    m_vertices: null,
    m_coreVertices: null,
    m_vertexCount: 0,
    m_normals: null
});
b2PolyShape.tempVec = new b2Vec2;
b2PolyShape.tAbsR = new b2Mat22;
var b2Body = Class.create();
b2Body.prototype = {
    SetOriginPosition: function(a, c) {
        if (!this.IsFrozen()) {
            this.m_rotation = c;
            this.m_R.Set(this.m_rotation);
            this.m_position = b2Math.AddVV(a, b2Math.b2MulMV(this.m_R, this.m_center));
            this.m_position0.SetV(this.m_position);
            this.m_rotation0 = this.m_rotation;
            for (var e = this.m_shapeList; null != e; e = e.m_next) e.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R);
            this.m_world.m_broadPhase.Commit()
        }
    },
    GetOriginPosition: function() {
        return b2Math.SubtractVV(this.m_position, b2Math.b2MulMV(this.m_R,
            this.m_center))
    },
    SetCenterPosition: function(a, c) {
        if (!this.IsFrozen()) {
            this.m_rotation = c;
            this.m_R.Set(this.m_rotation);
            this.m_position.SetV(a);
            this.m_position0.SetV(this.m_position);
            this.m_rotation0 = this.m_rotation;
            for (var e = this.m_shapeList; null != e; e = e.m_next) e.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R);
            this.m_world.m_broadPhase.Commit()
        }
    },
    GetCenterPosition: function() {
        return this.m_position
    },
    GetPosition: function() {
        var a, c;
        a = this.m_position.x;
        c = this.m_position.y;
        if (0 != this.m_center.x ||
            0 != this.m_center.y) a -= this.m_center.x * Math.cos(-this.m_rotation) + this.m_center.y * Math.sin(-this.m_rotation), c -= this.m_center.x * -Math.sin(-this.m_rotation) + this.m_center.y * Math.cos(-this.m_rotation);
        return new b2Vec2(a, c)
    },
    GetRotation: function() {
        return this.m_rotation
    },
    GetRotationMatrix: function() {
        return this.m_R
    },
    SetLinearVelocity: function(a) {
        this.m_linearVelocity.SetV(a)
    },
    GetLinearVelocity: function() {
        return this.m_linearVelocity
    },
    SetAngularVelocity: function(a) {
        this.m_angularVelocity = a
    },
    GetAngularVelocity: function() {
        return this.m_angularVelocity
    },
    ApplyForce: function(a, c) {
        0 == this.IsSleeping() && (this.m_force.Add(a), this.m_torque += b2Math.b2CrossVV(b2Math.SubtractVV(c, this.m_position), a))
    },
    ApplyTorque: function(a) {
        0 == this.IsSleeping() && (this.m_torque += a)
    },
    ApplyImpulse: function(a, c) {
        0 == this.IsSleeping() && (this.m_linearVelocity.Add(b2Math.MulFV(this.m_invMass, a)), this.m_angularVelocity += this.m_invI * b2Math.b2CrossVV(b2Math.SubtractVV(c, this.m_position), a))
    },
    GetMass: function() {
        return this.m_mass
    },
    GetInertia: function() {
        return this.m_I
    },
    GetWorldPoint: function(a) {
        return b2Math.AddVV(this.m_position,
            b2Math.b2MulMV(this.m_R, a))
    },
    GetWorldVector: function(a) {
        return b2Math.b2MulMV(this.m_R, a)
    },
    GetLocalPoint: function(a) {
        return b2Math.b2MulTMV(this.m_R, b2Math.SubtractVV(a, this.m_position))
    },
    GetLocalVector: function(a) {
        return b2Math.b2MulTMV(this.m_R, a)
    },
    IsStatic: function() {
        return (this.m_flags & b2Body.e_staticFlag) == b2Body.e_staticFlag
    },
    IsFrozen: function() {
        return (this.m_flags & b2Body.e_frozenFlag) == b2Body.e_frozenFlag
    },
    IsSleeping: function() {
        return (this.m_flags & b2Body.e_sleepFlag) == b2Body.e_sleepFlag
    },
    AllowSleeping: function(a) {
        a ?
            this.m_flags |= b2Body.e_allowSleepFlag : (this.m_flags &= ~b2Body.e_allowSleepFlag, this.WakeUp())
    },
    WakeUp: function() {
        this.m_flags &= ~b2Body.e_sleepFlag;
        this.m_sleepTime = 0
    },
    GoToSleep: function() {
        this.m_flags |= b2Body.e_sleepFlag;
        this.m_linearVelocity.SetZero();
        this.m_angularVelocity = 0
    },
    GetShapeList: function() {
        return this.m_shapeList
    },
    GetContactList: function() {
        return this.m_contactList
    },
    GetJointList: function() {
        return this.m_jointList
    },
    GetNext: function() {
        return this.m_next
    },
    GetUserData: function() {
        return this.m_userData
    },
    initialize: function(a, c) {
        this.sMat0 = new b2Mat22;
        this.m_position = new b2Vec2;
        this.m_R = new b2Mat22(0);
        this.m_position0 = new b2Vec2;
        var e = 0,
            f, g;
        this.m_flags = 0;
        this.m_position.SetV(a.position);
        this.m_rotation = a.rotation;
        this.m_R.Set(this.m_rotation);
        this.m_position0.SetV(this.m_position);
        this.m_rotation0 = this.m_rotation;
        this.m_world = c;
        this.m_linearDamping = b2Math.b2Clamp(1 - a.linearDamping, 0, 1);
        this.m_angularDamping = b2Math.b2Clamp(1 - a.angularDamping, 0, 1);
        this.m_force = new b2Vec2(0, 0);
        this.m_mass = this.m_torque =
            0;
        for (var h = Array(b2Settings.b2_maxShapesPerBody), e = 0; e < b2Settings.b2_maxShapesPerBody; e++) h[e] = new b2MassData;
        this.m_shapeCount = 0;
        this.m_center = new b2Vec2(0, 0);
        for (e = 0; e < b2Settings.b2_maxShapesPerBody; ++e) {
            f = a.shapes[e];
            if (null == f) break;
            g = h[e];
            f.ComputeMass(g);
            this.m_mass += g.mass;
            this.m_center.x += g.mass * (f.localPosition.x + g.center.x);
            this.m_center.y += g.mass * (f.localPosition.y + g.center.y);
            ++this.m_shapeCount
        }
        0 < this.m_mass ? (this.m_center.Multiply(1 / this.m_mass), this.m_position.Add(b2Math.b2MulMV(this.m_R,
            this.m_center))) : this.m_flags |= b2Body.e_staticFlag;
        for (e = this.m_I = 0; e < this.m_shapeCount; ++e) f = a.shapes[e], g = h[e], this.m_I += g.I, f = b2Math.SubtractVV(b2Math.AddVV(f.localPosition, g.center), this.m_center), this.m_I += g.mass * b2Math.b2Dot(f, f);
        this.m_invMass = 0 < this.m_mass ? 1 / this.m_mass : 0;
        this.m_invI = 0 < this.m_I && 0 == a.preventRotation ? 1 / this.m_I : this.m_I = 0;
        this.m_linearVelocity = b2Math.AddVV(a.linearVelocity, b2Math.b2CrossFV(a.angularVelocity, this.m_center));
        this.m_angularVelocity = a.angularVelocity;
        this.m_shapeList =
            this.m_next = this.m_prev = this.m_contactList = this.m_jointList = null;
        for (e = 0; e < this.m_shapeCount; ++e) f = a.shapes[e], g = b2Shape.Create(f, this, this.m_center), g.m_next = this.m_shapeList, this.m_shapeList = g;
        this.m_sleepTime = 0;
        a.allowSleep && (this.m_flags |= b2Body.e_allowSleepFlag);
        a.isSleeping && (this.m_flags |= b2Body.e_sleepFlag);
        if (this.m_flags & b2Body.e_sleepFlag || 0 == this.m_invMass) this.m_linearVelocity.Set(0, 0), this.m_angularVelocity = 0;
        this.m_userData = a.userData
    },
    Destroy: function() {
        for (var a = this.m_shapeList; a;) {
            var c =
                a,
                a = a.m_next;
            b2Shape.Destroy(c)
        }
    },
    sMat0: new b2Mat22,
    SynchronizeShapes: function() {
        this.sMat0.Set(this.m_rotation0);
        for (var a = this.m_shapeList; null != a; a = a.m_next) a.Synchronize(this.m_position0, this.sMat0, this.m_position, this.m_R)
    },
    QuickSyncShapes: function() {
        for (var a = this.m_shapeList; null != a; a = a.m_next) a.QuickSync(this.m_position, this.m_R)
    },
    IsConnected: function(a) {
        for (var c = this.m_jointList; null != c; c = c.next)
            if (c.other == a) return 0 == c.joint.m_collideConnected;
        return !1
    },
    Freeze: function() {
        this.m_flags |=
            b2Body.e_frozenFlag;
        this.m_linearVelocity.SetZero();
        this.m_angularVelocity = 0;
        for (var a = this.m_shapeList; null != a; a = a.m_next) a.DestroyProxy()
    },
    m_flags: 0,
    m_position: new b2Vec2,
    m_rotation: null,
    m_R: new b2Mat22(0),
    m_position0: new b2Vec2,
    m_rotation0: null,
    m_linearVelocity: null,
    m_angularVelocity: null,
    m_force: null,
    m_torque: null,
    m_center: null,
    m_world: null,
    m_prev: null,
    m_next: null,
    m_shapeList: null,
    m_shapeCount: 0,
    m_jointList: null,
    m_contactList: null,
    m_mass: null,
    m_invMass: null,
    m_I: null,
    m_invI: null,
    m_linearDamping: null,
    m_angularDamping: null,
    m_sleepTime: null,
    m_userData: null
};
b2Body.e_staticFlag = 1;
b2Body.e_frozenFlag = 2;
b2Body.e_islandFlag = 4;
b2Body.e_sleepFlag = 8;
b2Body.e_allowSleepFlag = 16;
b2Body.e_destroyFlag = 32;
var b2BodyDef = Class.create();
b2BodyDef.prototype = {
    initialize: function() {
        this.shapes = [];
        this.userData = null;
        for (var a = 0; a < b2Settings.b2_maxShapesPerBody; a++) this.shapes[a] = null;
        this.position = new b2Vec2(0, 0);
        this.rotation = 0;
        this.linearVelocity = new b2Vec2(0, 0);
        this.angularDamping = this.linearDamping = this.angularVelocity = 0;
        this.allowSleep = !0;
        this.preventRotation = this.isSleeping = !1
    },
    userData: null,
    shapes: [],
    position: null,
    rotation: null,
    linearVelocity: null,
    angularVelocity: null,
    linearDamping: null,
    angularDamping: null,
    allowSleep: null,
    isSleeping: null,
    preventRotation: null,
    AddShape: function(a) {
        for (var c = 0; c < b2Settings.b2_maxShapesPerBody; ++c)
            if (null == this.shapes[c]) {
                this.shapes[c] = a;
                break
            }
    }
};
var b2CollisionFilter = Class.create();
b2CollisionFilter.prototype = {
    ShouldCollide: function(a, c) {
        return a.m_groupIndex == c.m_groupIndex && 0 != a.m_groupIndex ? 0 < a.m_groupIndex : 0 != (a.m_maskBits & c.m_categoryBits) && 0 != (a.m_categoryBits & c.m_maskBits)
    },
    initialize: function() {}
};
b2CollisionFilter.b2_defaultFilter = new b2CollisionFilter;
var b2Island = Class.create();
b2Island.prototype = {
    initialize: function(a, c, e, f) {
        var g = 0;
        this.m_bodyCapacity = a;
        this.m_contactCapacity = c;
        this.m_jointCapacity = e;
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        this.m_bodies = Array(a);
        for (g = 0; g < a; g++) this.m_bodies[g] = null;
        this.m_contacts = Array(c);
        for (g = 0; g < c; g++) this.m_contacts[g] = null;
        this.m_joints = Array(e);
        for (g = 0; g < e; g++) this.m_joints[g] = null;
        this.m_allocator = f
    },
    Clear: function() {
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
    },
    Solve: function(a, c) {
        for (var e = 0, f, e =
                0; e < this.m_bodyCount; ++e) f = this.m_bodies[e], 0 != f.m_invMass && (f.m_linearVelocity.Add(b2Math.MulFV(a.dt, b2Math.AddVV(c, b2Math.MulFV(f.m_invMass, f.m_force)))), f.m_angularVelocity += a.dt * f.m_invI * f.m_torque, f.m_linearVelocity.Multiply(f.m_linearDamping), f.m_angularVelocity *= f.m_angularDamping, f.m_position0.SetV(f.m_position), f.m_rotation0 = f.m_rotation);
        var g = new b2ContactSolver(this.m_contacts, this.m_contactCount, this.m_allocator);
        g.PreSolve();
        for (e = 0; e < this.m_jointCount; ++e) this.m_joints[e].PrepareVelocitySolver();
        for (e = 0; e < a.iterations; ++e)
            for (g.SolveVelocityConstraints(), f = 0; f < this.m_jointCount; ++f) this.m_joints[f].SolveVelocityConstraints(a);
        for (e = 0; e < this.m_bodyCount; ++e) f = this.m_bodies[e], 0 != f.m_invMass && (f.m_position.x += a.dt * f.m_linearVelocity.x, f.m_position.y += a.dt * f.m_linearVelocity.y, f.m_rotation += a.dt * f.m_angularVelocity, f.m_R.Set(f.m_rotation));
        for (e = 0; e < this.m_jointCount; ++e) this.m_joints[e].PreparePositionSolver();
        if (b2World.s_enablePositionCorrection)
            for (b2Island.m_positionIterationCount = 0; b2Island.m_positionIterationCount <
                a.iterations; ++b2Island.m_positionIterationCount) {
                f = g.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
                for (var h = !0, e = 0; e < this.m_jointCount; ++e) var k = this.m_joints[e].SolvePositionConstraints(),
                    h = h && k;
                if (f && h) break
            }
        g.PostSolve();
        for (e = 0; e < this.m_bodyCount; ++e) f = this.m_bodies[e], 0 != f.m_invMass && (f.m_R.Set(f.m_rotation), f.SynchronizeShapes(), f.m_force.Set(0, 0), f.m_torque = 0)
    },
    UpdateSleep: function(a) {
        for (var c = 0, e, f = Number.MAX_VALUE, g = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance,
                h = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance, c = 0; c < this.m_bodyCount; ++c) e = this.m_bodies[c], 0 != e.m_invMass && (0 == (e.m_flags & b2Body.e_allowSleepFlag) && (f = e.m_sleepTime = 0), 0 == (e.m_flags & b2Body.e_allowSleepFlag) || e.m_angularVelocity * e.m_angularVelocity > h || b2Math.b2Dot(e.m_linearVelocity, e.m_linearVelocity) > g ? f = e.m_sleepTime = 0 : (e.m_sleepTime += a, f = b2Math.b2Min(f, e.m_sleepTime)));
        if (f >= b2Settings.b2_timeToSleep)
            for (c = 0; c < this.m_bodyCount; ++c) e = this.m_bodies[c], e.m_flags |= b2Body.e_sleepFlag,
                e.m_linearVelocity.SetZero(), e.m_angularVelocity = 0
    },
    AddBody: function(a) {
        this.m_bodies[this.m_bodyCount++] = a
    },
    AddContact: function(a) {
        this.m_contacts[this.m_contactCount++] = a
    },
    AddJoint: function(a) {
        this.m_joints[this.m_jointCount++] = a
    },
    m_allocator: null,
    m_bodies: null,
    m_contacts: null,
    m_joints: null,
    m_bodyCount: 0,
    m_jointCount: 0,
    m_contactCount: 0,
    m_bodyCapacity: 0,
    m_contactCapacity: 0,
    m_jointCapacity: 0,
    m_positionError: null
};
b2Island.m_positionIterationCount = 0;
var b2TimeStep = Class.create();
b2TimeStep.prototype = {
    dt: null,
    inv_dt: null,
    iterations: 0,
    initialize: function() {}
};
var b2ContactNode = Class.create();
b2ContactNode.prototype = {
    other: null,
    contact: null,
    prev: null,
    next: null,
    initialize: function() {}
};
var b2Contact = Class.create();
b2Contact.prototype = {
    GetManifolds: function() {
        return null
    },
    GetManifoldCount: function() {
        return this.m_manifoldCount
    },
    GetNext: function() {
        return this.m_next
    },
    GetShape1: function() {
        return this.m_shape1
    },
    GetShape2: function() {
        return this.m_shape2
    },
    initialize: function(a, c) {
        this.m_node1 = new b2ContactNode;
        this.m_node2 = new b2ContactNode;
        this.m_flags = 0;
        a && c ? (this.m_shape1 = a, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution,
            this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = null, this.m_node2.other = null) : this.m_shape2 = this.m_shape1 = null
    },
    Evaluate: function() {},
    m_flags: 0,
    m_prev: null,
    m_next: null,
    m_node1: new b2ContactNode,
    m_node2: new b2ContactNode,
    m_shape1: null,
    m_shape2: null,
    m_manifoldCount: 0,
    m_friction: null,
    m_restitution: null
};
b2Contact.e_islandFlag = 1;
b2Contact.e_destroyFlag = 2;
b2Contact.AddType = function(a, c, e, f) {
    b2Contact.s_registers[e][f].createFcn = a;
    b2Contact.s_registers[e][f].destroyFcn = c;
    b2Contact.s_registers[e][f].primary = !0;
    e != f && (b2Contact.s_registers[f][e].createFcn = a, b2Contact.s_registers[f][e].destroyFcn = c, b2Contact.s_registers[f][e].primary = !1)
};
b2Contact.InitializeRegisters = function() {
    b2Contact.s_registers = Array(b2Shape.e_shapeTypeCount);
    for (var a = 0; a < b2Shape.e_shapeTypeCount; a++) {
        b2Contact.s_registers[a] = Array(b2Shape.e_shapeTypeCount);
        for (var c = 0; c < b2Shape.e_shapeTypeCount; c++) b2Contact.s_registers[a][c] = new b2ContactRegister
    }
    b2Contact.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
    b2Contact.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polyShape, b2Shape.e_circleShape);
    b2Contact.AddType(b2PolyContact.Create, b2PolyContact.Destroy, b2Shape.e_polyShape, b2Shape.e_polyShape)
};
b2Contact.Create = function(a, c, e) {
    0 == b2Contact.s_initialized && (b2Contact.InitializeRegisters(), b2Contact.s_initialized = !0);
    var f = a.m_type,
        g = c.m_type,
        h = b2Contact.s_registers[f][g].createFcn;
    if (h) {
        if (b2Contact.s_registers[f][g].primary) return h(a, c, e);
        a = h(c, a, e);
        for (c = 0; c < a.GetManifoldCount(); ++c) e = a.GetManifolds()[c], e.normal = e.normal.Negative();
        return a
    }
    return null
};
b2Contact.Destroy = function(a, c) {
    0 < a.GetManifoldCount() && (a.m_shape1.m_body.WakeUp(), a.m_shape2.m_body.WakeUp());
    var e = b2Contact.s_registers[a.m_shape1.m_type][a.m_shape2.m_type].destroyFcn;
    e(a, c)
};
b2Contact.s_registers = null;
b2Contact.s_initialized = !1;
var b2ContactConstraint = Class.create();
b2ContactConstraint.prototype = {
    initialize: function() {
        this.normal = new b2Vec2;
        this.points = Array(b2Settings.b2_maxManifoldPoints);
        for (var a = 0; a < b2Settings.b2_maxManifoldPoints; a++) this.points[a] = new b2ContactConstraintPoint
    },
    points: null,
    normal: new b2Vec2,
    manifold: null,
    body1: null,
    body2: null,
    friction: null,
    restitution: null,
    pointCount: 0
};
var b2ContactConstraintPoint = Class.create();
b2ContactConstraintPoint.prototype = {
    localAnchor1: new b2Vec2,
    localAnchor2: new b2Vec2,
    normalImpulse: null,
    tangentImpulse: null,
    positionImpulse: null,
    normalMass: null,
    tangentMass: null,
    separation: null,
    velocityBias: null,
    initialize: function() {
        this.localAnchor1 = new b2Vec2;
        this.localAnchor2 = new b2Vec2
    }
};
var b2ContactRegister = Class.create();
b2ContactRegister.prototype = {
    createFcn: null,
    destroyFcn: null,
    primary: null,
    initialize: function() {}
};
var b2ContactSolver = Class.create();
b2ContactSolver.prototype = {
    initialize: function(a, c, e) {
        this.m_constraints = [];
        this.m_allocator = e;
        e = 0;
        var f, g;
        for (e = this.m_constraintCount = 0; e < c; ++e) this.m_constraintCount += a[e].GetManifoldCount();
        for (e = 0; e < this.m_constraintCount; e++) this.m_constraints[e] = new b2ContactConstraint;
        var h = 0;
        for (e = 0; e < c; ++e)
            for (var k = a[e], l = k.m_shape1.m_body, m = k.m_shape2.m_body, n = k.GetManifoldCount(), p = k.GetManifolds(), q = k.m_friction, k = k.m_restitution, r = l.m_linearVelocity.x, s = l.m_linearVelocity.y, t = m.m_linearVelocity.x, u =
                    m.m_linearVelocity.y, x = l.m_angularVelocity, v = m.m_angularVelocity, A = 0; A < n; ++A) {
                var D = p[A],
                    B = D.normal.x,
                    F = D.normal.y,
                    C = this.m_constraints[h];
                C.body1 = l;
                C.body2 = m;
                C.manifold = D;
                C.normal.x = B;
                C.normal.y = F;
                C.pointCount = D.pointCount;
                C.friction = q;
                C.restitution = k;
                for (var G = 0; G < C.pointCount; ++G) {
                    var z = D.points[G],
                        y = C.points[G];
                    y.normalImpulse = z.normalImpulse;
                    y.tangentImpulse = z.tangentImpulse;
                    y.separation = z.separation;
                    var E = z.position.x - l.m_position.x,
                        H = z.position.y - l.m_position.y,
                        J = z.position.x - m.m_position.x,
                        z = z.position.y - m.m_position.y;
                    f = y.localAnchor1;
                    g = l.m_R;
                    f.x = E * g.col1.x + H * g.col1.y;
                    f.y = E * g.col2.x + H * g.col2.y;
                    f = y.localAnchor2;
                    g = m.m_R;
                    f.x = J * g.col1.x + z * g.col1.y;
                    f.y = J * g.col2.x + z * g.col2.y;
                    f = E * E + H * H;
                    g = J * J + z * z;
                    var I = E * B + H * F,
                        L = J * B + z * F,
                        K = l.m_invMass + m.m_invMass,
                        K = K + (l.m_invI * (f - I * I) + m.m_invI * (g - L * L));
                    y.normalMass = 1 / K;
                    L = F;
                    K = -B;
                    I = E * L + H * K;
                    L = J * L + z * K;
                    K = l.m_invMass + m.m_invMass;
                    K += l.m_invI * (f - I * I) + m.m_invI * (g - L * L);
                    y.tangentMass = 1 / K;
                    y.velocityBias = 0;
                    0 < y.separation && (y.velocityBias = -60 * y.separation);
                    E = C.normal.x *
                        (t + -v * z - r - -x * H) + C.normal.y * (u + v * J - s - x * E);
                    E < -b2Settings.b2_velocityThreshold && (y.velocityBias += -C.restitution * E)
                }++h
            }
    },
    PreSolve: function() {
        for (var a, c, e = 0; e < this.m_constraintCount; ++e) {
            var f = this.m_constraints[e],
                g = f.body1,
                h = f.body2,
                k = g.m_invMass,
                l = g.m_invI,
                m = h.m_invMass,
                n = h.m_invI,
                p = f.normal.x,
                q = f.normal.y,
                r = q,
                s = -p,
                t = 0,
                u = 0;
            if (b2World.s_enableWarmStarting)
                for (u = f.pointCount, t = 0; t < u; ++t) {
                    var x = f.points[t],
                        v = x.normalImpulse * p + x.tangentImpulse * r,
                        A = x.normalImpulse * q + x.tangentImpulse * s;
                    c = g.m_R;
                    a = x.localAnchor1;
                    var D = c.col1.x * a.x + c.col2.x * a.y,
                        B = c.col1.y * a.x + c.col2.y * a.y;
                    c = h.m_R;
                    a = x.localAnchor2;
                    var F = c.col1.x * a.x + c.col2.x * a.y;
                    a = c.col1.y * a.x + c.col2.y * a.y;
                    g.m_angularVelocity -= l * (D * A - B * v);
                    g.m_linearVelocity.x -= k * v;
                    g.m_linearVelocity.y -= k * A;
                    h.m_angularVelocity += n * (F * A - a * v);
                    h.m_linearVelocity.x += m * v;
                    h.m_linearVelocity.y += m * A;
                    x.positionImpulse = 0
                } else
                    for (u = f.pointCount, t = 0; t < u; ++t) g = f.points[t], g.normalImpulse = 0, g.tangentImpulse = 0, g.positionImpulse = 0
        }
    },
    SolveVelocityConstraints: function() {
        for (var a = 0, c, e, f, g, h,
                k, l, m, n = 0; n < this.m_constraintCount; ++n) {
            for (var p = this.m_constraints[n], q = p.body1, r = p.body2, s = q.m_angularVelocity, t = q.m_linearVelocity, u = r.m_angularVelocity, x = r.m_linearVelocity, v = q.m_invMass, A = q.m_invI, D = r.m_invMass, B = r.m_invI, F = p.normal.x, C = p.normal.y, G = C, z = -F, y = p.pointCount, a = 0; a < y; ++a) c = p.points[a], h = q.m_R, k = c.localAnchor1, e = h.col1.x * k.x + h.col2.x * k.y, f = h.col1.y * k.x + h.col2.y * k.y, h = r.m_R, k = c.localAnchor2, g = h.col1.x * k.x + h.col2.x * k.y, h = h.col1.y * k.x + h.col2.y * k.y, k = x.x + -u * h - t.x - -s * f, l = x.y + u * g - t.y -
                s * e, k = -c.normalMass * (k * F + l * C - c.velocityBias), l = b2Math.b2Max(c.normalImpulse + k, 0), k = l - c.normalImpulse, m = k * F, k *= C, t.x -= v * m, t.y -= v * k, s -= A * (e * k - f * m), x.x += D * m, x.y += D * k, u += B * (g * k - h * m), c.normalImpulse = l, k = x.x + -u * h - t.x - -s * f, l = x.y + u * g - t.y - s * e, k = c.tangentMass * -(k * G + l * z), l = p.friction * c.normalImpulse, l = b2Math.b2Clamp(c.tangentImpulse + k, -l, l), k = l - c.tangentImpulse, m = k * G, k *= z, t.x -= v * m, t.y -= v * k, s -= A * (e * k - f * m), x.x += D * m, x.y += D * k, u += B * (g * k - h * m), c.tangentImpulse = l;
            q.m_angularVelocity = s;
            r.m_angularVelocity = u
        }
    },
    SolvePositionConstraints: function(a) {
        for (var c =
                0, e, f, g = 0; g < this.m_constraintCount; ++g) {
            for (var h = this.m_constraints[g], k = h.body1, l = h.body2, m = k.m_position, n = k.m_rotation, p = l.m_position, q = l.m_rotation, r = k.m_invMass, s = k.m_invI, t = l.m_invMass, u = l.m_invI, x = h.normal.x, v = h.normal.y, A = h.pointCount, D = 0; D < A; ++D) {
                var B = h.points[D];
                e = k.m_R;
                f = B.localAnchor1;
                var F = e.col1.x * f.x + e.col2.x * f.y,
                    C = e.col1.y * f.x + e.col2.y * f.y;
                e = l.m_R;
                f = B.localAnchor2;
                var G = e.col1.x * f.x + e.col2.x * f.y;
                e = e.col1.y * f.x + e.col2.y * f.y;
                f = (p.x + G - (m.x + F)) * x + (p.y + e - (m.y + C)) * v + B.separation;
                c = b2Math.b2Min(c,
                    f);
                f = a * b2Math.b2Clamp(f + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                f *= -B.normalMass;
                var z = B.positionImpulse;
                B.positionImpulse = b2Math.b2Max(z + f, 0);
                f = B.positionImpulse - z;
                B = f * x;
                f *= v;
                m.x -= r * B;
                m.y -= r * f;
                n -= s * (F * f - C * B);
                k.m_R.Set(n);
                p.x += t * B;
                p.y += t * f;
                q += u * (G * f - e * B);
                l.m_R.Set(q)
            }
            k.m_rotation = n;
            l.m_rotation = q
        }
        return c >= -b2Settings.b2_linearSlop
    },
    PostSolve: function() {
        for (var a = 0; a < this.m_constraintCount; ++a)
            for (var c = this.m_constraints[a], e = c.manifold, f = 0; f < c.pointCount; ++f) {
                var g = e.points[f],
                    h = c.points[f];
                g.normalImpulse = h.normalImpulse;
                g.tangentImpulse = h.tangentImpulse
            }
    },
    m_allocator: null,
    m_constraints: [],
    m_constraintCount: 0
};
var b2CircleContact = Class.create();
Object.extend(b2CircleContact.prototype, b2Contact.prototype);
Object.extend(b2CircleContact.prototype, {
    initialize: function(a, c) {
        this.m_node1 = new b2ContactNode;
        this.m_node2 = new b2ContactNode;
        this.m_flags = 0;
        a && c ? (this.m_shape1 = a, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact =
            null, this.m_node2.prev = null, this.m_node2.next = null, this.m_node2.other = null, this.m_manifold = [new b2Manifold], this.m_manifold[0].pointCount = 0, this.m_manifold[0].points[0].normalImpulse = 0, this.m_manifold[0].points[0].tangentImpulse = 0) : this.m_shape2 = this.m_shape1 = null
    },
    Evaluate: function() {
        b2Collision.b2CollideCircle(this.m_manifold[0], this.m_shape1, this.m_shape2, !1);
        this.m_manifoldCount = 0 < this.m_manifold[0].pointCount ? 1 : 0
    },
    GetManifolds: function() {
        return this.m_manifold
    },
    m_manifold: [new b2Manifold]
});
b2CircleContact.Create = function(a, c, e) {
    return new b2CircleContact(a, c)
};
b2CircleContact.Destroy = function(a, c) {};
var b2Conservative = Class.create();
b2Conservative.prototype = {
    initialize: function() {}
};
b2Conservative.R1 = new b2Mat22;
b2Conservative.R2 = new b2Mat22;
b2Conservative.x1 = new b2Vec2;
b2Conservative.x2 = new b2Vec2;
b2Conservative.Conservative = function(a, c) {
    var e = a.GetBody(),
        f = c.GetBody(),
        g = e.m_position.x - e.m_position0.x,
        h = e.m_position.y - e.m_position0.y,
        k = e.m_rotation - e.m_rotation0,
        l = f.m_position.x - f.m_position0.x,
        m = f.m_position.y - f.m_position0.y,
        n = f.m_rotation - f.m_rotation0,
        p = a.GetMaxRadius(),
        q = c.GetMaxRadius(),
        r = e.m_position0.x,
        s = e.m_position0.y,
        t = e.m_rotation0,
        u = f.m_position0.x,
        x = f.m_position0.y,
        v = f.m_rotation0,
        A = r,
        D = s,
        B = t,
        F = u,
        C = x,
        G = v;
    b2Conservative.R1.Set(B);
    b2Conservative.R2.Set(G);
    a.QuickSync(p1, b2Conservative.R1);
    c.QuickSync(p2, b2Conservative.R2);
    var z = 0,
        y, E;
    y = 0;
    for (var H = !0, J = 0; 10 > J; ++J) {
        var I = b2Distance.Distance(b2Conservative.x1, b2Conservative.x2, a, c);
        if (I < b2Settings.b2_linearSlop) {
            H = 0 == J ? !1 : !0;
            break
        }
        if (0 == J) {
            y = b2Conservative.x2.x - b2Conservative.x1.x;
            E = b2Conservative.x2.y - b2Conservative.x1.y;
            Math.sqrt(y * y + E * E);
            y = y * (g - l) + E * (h - m) + Math.abs(k) * p + Math.abs(n) * q;
            if (Math.abs(y) < Number.MIN_VALUE) {
                H = !1;
                break
            }
            y = 1 / y
        }
        I = z + I * y;
        if (0 > I || 1 < I) {
            H = !1;
            break
        }
        if (I < (1 + 100 * Number.MIN_VALUE) * z) {
            H = !0;
            break
        }
        z = I;
        A = r + z * v1.x;
        D = s + z * v1.y;
        B = t + z * k;
        F = u + z * v2.x;
        C = x + z * v2.y;
        G = v + z * n;
        b2Conservative.R1.Set(B);
        b2Conservative.R2.Set(G);
        a.QuickSync(p1, b2Conservative.R1);
        c.QuickSync(p2, b2Conservative.R2)
    }
    if (H) return y = b2Conservative.x2.x - b2Conservative.x1.x, E = b2Conservative.x2.y - b2Conservative.x1.y, g = Math.sqrt(y * y + E * E), g > FLT_EPSILON && (d *= b2_linearSlop / g), e.IsStatic() ? (e.m_position.x = A, e.m_position.y = D) : (e.m_position.x = A - y, e.m_position.y = D - E), e.m_rotation = B, e.m_R.Set(B), e.QuickSyncShapes(), f.IsStatic() ? (f.m_position.x = F, f.m_position.y = C) : (f.m_position.x =
        F + y, f.m_position.y = C + E), f.m_position.x = F + y, f.m_position.y = C + E, f.m_rotation = G, f.m_R.Set(G), f.QuickSyncShapes(), !0;
    a.QuickSync(e.m_position, e.m_R);
    c.QuickSync(f.m_position, f.m_R);
    return !1
};
var b2NullContact = Class.create();
Object.extend(b2NullContact.prototype, b2Contact.prototype);
Object.extend(b2NullContact.prototype, {
    initialize: function(a, c) {
        this.m_node1 = new b2ContactNode;
        this.m_node2 = new b2ContactNode;
        this.m_flags = 0;
        a && c ? (this.m_shape1 = a, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact =
            null, this.m_node2.prev = null, this.m_node2.next = null, this.m_node2.other = null) : this.m_shape2 = this.m_shape1 = null
    },
    Evaluate: function() {},
    GetManifolds: function() {
        return null
    }
});
var b2PolyAndCircleContact = Class.create();
Object.extend(b2PolyAndCircleContact.prototype, b2Contact.prototype);
Object.extend(b2PolyAndCircleContact.prototype, {
    initialize: function(a, c) {
        this.m_node1 = new b2ContactNode;
        this.m_node2 = new b2ContactNode;
        this.m_flags = 0;
        a && c ? (this.m_shape1 = a, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null,
            this.m_node2.contact = null, this.m_node2.prev = null, this.m_node2.next = null, this.m_node2.other = null, this.m_manifold = [new b2Manifold], b2Settings.b2Assert(this.m_shape1.m_type == b2Shape.e_polyShape), b2Settings.b2Assert(this.m_shape2.m_type == b2Shape.e_circleShape), this.m_manifold[0].pointCount = 0, this.m_manifold[0].points[0].normalImpulse = 0, this.m_manifold[0].points[0].tangentImpulse = 0) : this.m_shape2 = this.m_shape1 = null
    },
    Evaluate: function() {
        b2Collision.b2CollidePolyAndCircle(this.m_manifold[0], this.m_shape1,
            this.m_shape2, !1);
        this.m_manifoldCount = 0 < this.m_manifold[0].pointCount ? 1 : 0
    },
    GetManifolds: function() {
        return this.m_manifold
    },
    m_manifold: [new b2Manifold]
});
b2PolyAndCircleContact.Create = function(a, c, e) {
    return new b2PolyAndCircleContact(a, c)
};
b2PolyAndCircleContact.Destroy = function(a, c) {};
var b2PolyContact = Class.create();
Object.extend(b2PolyContact.prototype, b2Contact.prototype);
Object.extend(b2PolyContact.prototype, {
    initialize: function(a, c) {
        this.m_node1 = new b2ContactNode;
        this.m_node2 = new b2ContactNode;
        this.m_flags = 0;
        a && c ? (this.m_shape1 = a, this.m_shape2 = c, this.m_manifoldCount = 0, this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction), this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution), this.m_next = this.m_prev = null, this.m_node1.contact = null, this.m_node1.prev = null, this.m_node1.next = null, this.m_node1.other = null, this.m_node2.contact =
            null, this.m_node2.prev = null, this.m_node2.next = null, this.m_node2.other = null, this.m0 = new b2Manifold, this.m_manifold = [new b2Manifold], this.m_manifold[0].pointCount = 0) : this.m_shape2 = this.m_shape1 = null
    },
    m0: new b2Manifold,
    Evaluate: function() {
        for (var a = this.m_manifold[0], c = this.m0.points, e = 0; e < a.pointCount; e++) {
            var f = c[e],
                g = a.points[e];
            f.normalImpulse = g.normalImpulse;
            f.tangentImpulse = g.tangentImpulse;
            f.id = g.id.Copy()
        }
        this.m0.pointCount = a.pointCount;
        b2Collision.b2CollidePoly(a, this.m_shape1, this.m_shape2, !1);
        if (0 < a.pointCount) {
            c = [!1, !1];
            for (e = 0; e < a.pointCount; ++e) {
                f = a.points[e];
                f.normalImpulse = 0;
                f.tangentImpulse = 0;
                for (var g = f.id.key, h = 0; h < this.m0.pointCount; ++h)
                    if (1 != c[h]) {
                        var k = this.m0.points[h];
                        if (k.id.key == g) {
                            c[h] = !0;
                            f.normalImpulse = k.normalImpulse;
                            f.tangentImpulse = k.tangentImpulse;
                            break
                        }
                    }
            }
            this.m_manifoldCount = 1
        } else this.m_manifoldCount = 0
    },
    GetManifolds: function() {
        return this.m_manifold
    },
    m_manifold: [new b2Manifold]
});
b2PolyContact.Create = function(a, c, e) {
    return new b2PolyContact(a, c)
};
b2PolyContact.Destroy = function(a, c) {};
var b2ContactManager = Class.create();
Object.extend(b2ContactManager.prototype, b2PairCallback.prototype);
Object.extend(b2ContactManager.prototype, {
    initialize: function() {
        this.m_nullContact = new b2NullContact;
        this.m_world = null;
        this.m_destroyImmediate = !1
    },
    PairAdded: function(a, c) {
        var e = a,
            f = c,
            g = e.m_body,
            h = f.m_body;
        if (g.IsStatic() && h.IsStatic() || e.m_body == f.m_body || h.IsConnected(g) || null != this.m_world.m_filter && 0 == this.m_world.m_filter.ShouldCollide(e, f)) return this.m_nullContact;
        0 == h.m_invMass && (g = e, e = f, f = g);
        e = b2Contact.Create(e, f, this.m_world.m_blockAllocator);
        if (null == e) return this.m_nullContact;
        e.m_prev =
            null;
        e.m_next = this.m_world.m_contactList;
        null != this.m_world.m_contactList && (this.m_world.m_contactList.m_prev = e);
        this.m_world.m_contactList = e;
        this.m_world.m_contactCount++;
        return e
    },
    PairRemoved: function(a, c, e) {
        null != e && e != this.m_nullContact && (1 == this.m_destroyImmediate ? this.DestroyContact(e) : e.m_flags |= b2Contact.e_destroyFlag)
    },
    DestroyContact: function(a) {
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_world.m_contactList && (this.m_world.m_contactList = a.m_next);
        if (0 <
            a.GetManifoldCount()) {
            var c = a.m_shape1.m_body,
                e = a.m_shape2.m_body,
                f = a.m_node1,
                g = a.m_node2;
            c.WakeUp();
            e.WakeUp();
            f.prev && (f.prev.next = f.next);
            f.next && (f.next.prev = f.prev);
            f == c.m_contactList && (c.m_contactList = f.next);
            f.prev = null;
            f.next = null;
            g.prev && (g.prev.next = g.next);
            g.next && (g.next.prev = g.prev);
            g == e.m_contactList && (e.m_contactList = g.next);
            g.prev = null;
            g.next = null
        }
        b2Contact.Destroy(a, this.m_world.m_blockAllocator);
        --this.m_world.m_contactCount
    },
    CleanContactList: function() {
        for (var a = this.m_world.m_contactList; null !=
            a;) {
            var c = a,
                a = a.m_next;
            c.m_flags & b2Contact.e_destroyFlag && this.DestroyContact(c)
        }
    },
    Collide: function() {
        for (var a, c, e, f, g = this.m_world.m_contactList; null != g; g = g.m_next) g.m_shape1.m_body.IsSleeping() && g.m_shape2.m_body.IsSleeping() || (a = g.GetManifoldCount(), g.Evaluate(), c = g.GetManifoldCount(), 0 == a && 0 < c ? (a = g.m_shape1.m_body, c = g.m_shape2.m_body, e = g.m_node1, f = g.m_node2, e.contact = g, e.other = c, e.prev = null, e.next = a.m_contactList, null != e.next && (e.next.prev = g.m_node1), a.m_contactList = g.m_node1, f.contact = g, f.other =
            a, f.prev = null, f.next = c.m_contactList, null != f.next && (f.next.prev = f), c.m_contactList = f) : 0 < a && 0 == c && (a = g.m_shape1.m_body, c = g.m_shape2.m_body, e = g.m_node1, f = g.m_node2, e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e == a.m_contactList && (a.m_contactList = e.next), e.prev = null, e.next = null, f.prev && (f.prev.next = f.next), f.next && (f.next.prev = f.prev), f == c.m_contactList && (c.m_contactList = f.next), f.prev = null, f.next = null))
    },
    m_world: null,
    m_nullContact: new b2NullContact,
    m_destroyImmediate: null
});
var b2World = Class.create();
b2World.prototype = {
    initialize: function(a, c, e) {
        this.step = new b2TimeStep;
        this.m_contactManager = new b2ContactManager;
        this.m_listener = null;
        this.m_filter = b2CollisionFilter.b2_defaultFilter;
        this.m_jointList = this.m_contactList = this.m_bodyList = null;
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        this.m_bodyDestroyList = null;
        this.m_allowSleep = e;
        this.m_gravity = c;
        this.m_contactManager.m_world = this;
        this.m_broadPhase = new b2BroadPhase(a, this.m_contactManager);
        a = new b2BodyDef;
        this.m_groundBody = this.CreateBody(a)
    },
    SetListener: function(a) {
        this.m_listener = a
    },
    SetFilter: function(a) {
        this.m_filter = a
    },
    CreateBody: function(a) {
        a = new b2Body(a, this);
        a.m_prev = null;
        if (a.m_next = this.m_bodyList) this.m_bodyList.m_prev = a;
        this.m_bodyList = a;
        ++this.m_bodyCount;
        return a
    },
    DestroyBody: function(a) {
        a.m_flags & b2Body.e_destroyFlag || (a.m_prev && (a.m_prev.m_next = a.m_next), a.m_next && (a.m_next.m_prev = a.m_prev), a == this.m_bodyList && (this.m_bodyList = a.m_next), a.m_flags |= b2Body.e_destroyFlag, --this.m_bodyCount, a.m_prev = null, a.m_next = this.m_bodyDestroyList,
            this.m_bodyDestroyList = a)
    },
    CleanBodyList: function() {
        this.m_contactManager.m_destroyImmediate = !0;
        for (var a = this.m_bodyDestroyList; a;) {
            for (var c = a, a = a.m_next, e = c.m_jointList; e;) {
                var f = e,
                    e = e.next;
                this.m_listener && this.m_listener.NotifyJointDestroyed(f.joint);
                this.DestroyJoint(f.joint)
            }
            c.Destroy()
        }
        this.m_bodyDestroyList = null;
        this.m_contactManager.m_destroyImmediate = !1
    },
    CreateJoint: function(a) {
        var c = b2Joint.Create(a, this.m_blockAllocator);
        c.m_prev = null;
        if (c.m_next = this.m_jointList) this.m_jointList.m_prev =
            c;
        this.m_jointList = c;
        ++this.m_jointCount;
        c.m_node1.joint = c;
        c.m_node1.other = c.m_body2;
        c.m_node1.prev = null;
        if (c.m_node1.next = c.m_body1.m_jointList) c.m_body1.m_jointList.prev = c.m_node1;
        c.m_body1.m_jointList = c.m_node1;
        c.m_node2.joint = c;
        c.m_node2.other = c.m_body1;
        c.m_node2.prev = null;
        if (c.m_node2.next = c.m_body2.m_jointList) c.m_body2.m_jointList.prev = c.m_node2;
        c.m_body2.m_jointList = c.m_node2;
        if (0 == a.collideConnected)
            for (a = (a.body1.m_shapeCount < a.body2.m_shapeCount ? a.body1 : a.body2).m_shapeList; a; a = a.m_next) a.ResetProxy(this.m_broadPhase);
        return c
    },
    DestroyJoint: function(a) {
        var c = a.m_collideConnected;
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_jointList && (this.m_jointList = a.m_next);
        var e = a.m_body1,
            f = a.m_body2;
        e.WakeUp();
        f.WakeUp();
        a.m_node1.prev && (a.m_node1.prev.next = a.m_node1.next);
        a.m_node1.next && (a.m_node1.next.prev = a.m_node1.prev);
        a.m_node1 == e.m_jointList && (e.m_jointList = a.m_node1.next);
        a.m_node1.prev = null;
        a.m_node1.next = null;
        a.m_node2.prev && (a.m_node2.prev.next = a.m_node2.next);
        a.m_node2.next &&
            (a.m_node2.next.prev = a.m_node2.prev);
        a.m_node2 == f.m_jointList && (f.m_jointList = a.m_node2.next);
        a.m_node2.prev = null;
        a.m_node2.next = null;
        b2Joint.Destroy(a, this.m_blockAllocator);
        --this.m_jointCount;
        if (0 == c)
            for (a = (e.m_shapeCount < f.m_shapeCount ? e : f).m_shapeList; a; a = a.m_next) a.ResetProxy(this.m_broadPhase)
    },
    GetGroundBody: function() {
        return this.m_groundBody
    },
    step: new b2TimeStep,
    Step: function(a, c) {
        var e, f;
        this.step.dt = a;
        this.step.iterations = c;
        this.step.inv_dt = 0 < a ? 1 / a : 0;
        this.m_positionIterationCount = 0;
        this.m_contactManager.CleanContactList();
        this.CleanBodyList();
        this.m_contactManager.Collide();
        var g = new b2Island(this.m_bodyCount, this.m_contactCount, this.m_jointCount, this.m_stackAllocator);
        for (e = this.m_bodyList; null != e; e = e.m_next) e.m_flags &= ~b2Body.e_islandFlag;
        for (var h = this.m_contactList; null != h; h = h.m_next) h.m_flags &= ~b2Contact.e_islandFlag;
        for (h = this.m_jointList; null != h; h = h.m_next) h.m_islandFlag = !1;
        for (var h = Array(this.m_bodyCount), k = 0; k < this.m_bodyCount; k++) h[k] = null;
        for (k = this.m_bodyList; null != k; k = k.m_next)
            if (!(k.m_flags & (b2Body.e_staticFlag |
                    b2Body.e_islandFlag | b2Body.e_sleepFlag | b2Body.e_frozenFlag))) {
                g.Clear();
                var l = 0;
                h[l++] = k;
                for (k.m_flags |= b2Body.e_islandFlag; 0 < l;)
                    if (e = h[--l], g.AddBody(e), e.m_flags &= ~b2Body.e_sleepFlag, !(e.m_flags & b2Body.e_staticFlag)) {
                        for (var m = e.m_contactList; null != m; m = m.next) m.contact.m_flags & b2Contact.e_islandFlag || (g.AddContact(m.contact), m.contact.m_flags |= b2Contact.e_islandFlag, f = m.other, f.m_flags & b2Body.e_islandFlag || (h[l++] = f, f.m_flags |= b2Body.e_islandFlag));
                        for (e = e.m_jointList; null != e; e = e.next) 1 != e.joint.m_islandFlag &&
                            (g.AddJoint(e.joint), e.joint.m_islandFlag = !0, f = e.other, f.m_flags & b2Body.e_islandFlag || (h[l++] = f, f.m_flags |= b2Body.e_islandFlag))
                    }
                g.Solve(this.step, this.m_gravity);
                this.m_positionIterationCount = b2Math.b2Max(this.m_positionIterationCount, b2Island.m_positionIterationCount);
                this.m_allowSleep && g.UpdateSleep(a);
                for (f = 0; f < g.m_bodyCount; ++f) e = g.m_bodies[f], e.m_flags & b2Body.e_staticFlag && (e.m_flags &= ~b2Body.e_islandFlag), e.IsFrozen() && this.m_listener && this.m_listener.NotifyBoundaryViolated(e) == b2WorldListener.b2_destroyBody &&
                    (this.DestroyBody(e), g.m_bodies[f] = null)
            }
        this.m_broadPhase.Commit()
    },
    Query: function(a, c, e) {
        var f = [];
        a = this.m_broadPhase.QueryAABB(a, f, e);
        for (e = 0; e < a; ++e) c[e] = f[e];
        return a
    },
    GetBodyList: function() {
        return this.m_bodyList
    },
    GetJointList: function() {
        return this.m_jointList
    },
    GetContactList: function() {
        return this.m_contactList
    },
    m_blockAllocator: null,
    m_stackAllocator: null,
    m_broadPhase: null,
    m_contactManager: new b2ContactManager,
    m_bodyList: null,
    m_contactList: null,
    m_jointList: null,
    m_bodyCount: 0,
    m_contactCount: 0,
    m_jointCount: 0,
    m_bodyDestroyList: null,
    m_gravity: null,
    m_allowSleep: null,
    m_groundBody: null,
    m_listener: null,
    m_filter: null,
    m_positionIterationCount: 0
};
b2World.s_enablePositionCorrection = 1;
b2World.s_enableWarmStarting = 1;
var b2WorldListener = Class.create();
b2WorldListener.prototype = {
    NotifyJointDestroyed: function(a) {},
    NotifyBoundaryViolated: function(a) {
        return b2WorldListener.b2_freezeBody
    },
    initialize: function() {}
};
b2WorldListener.b2_freezeBody = 0;
b2WorldListener.b2_destroyBody = 1;
var b2JointNode = Class.create();
b2JointNode.prototype = {
    other: null,
    joint: null,
    prev: null,
    next: null,
    initialize: function() {}
};
var b2Joint = Class.create();
b2Joint.prototype = {
    GetType: function() {
        return this.m_type
    },
    GetAnchor1: function() {
        return null
    },
    GetAnchor2: function() {
        return null
    },
    GetReactionForce: function(a) {
        return null
    },
    GetReactionTorque: function(a) {
        return 0
    },
    GetBody1: function() {
        return this.m_body1
    },
    GetBody2: function() {
        return this.m_body2
    },
    GetNext: function() {
        return this.m_next
    },
    GetUserData: function() {
        return this.m_userData
    },
    initialize: function(a) {
        this.m_node1 = new b2JointNode;
        this.m_node2 = new b2JointNode;
        this.m_type = a.type;
        this.m_next = this.m_prev =
            null;
        this.m_body1 = a.body1;
        this.m_body2 = a.body2;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData
    },
    PrepareVelocitySolver: function() {},
    SolveVelocityConstraints: function(a) {},
    PreparePositionSolver: function() {},
    SolvePositionConstraints: function() {
        return !1
    },
    m_type: 0,
    m_prev: null,
    m_next: null,
    m_node1: new b2JointNode,
    m_node2: new b2JointNode,
    m_body1: null,
    m_body2: null,
    m_islandFlag: null,
    m_collideConnected: null,
    m_userData: null
};
b2Joint.Create = function(a, c) {
    var e = null;
    switch (a.type) {
        case b2Joint.e_distanceJoint:
            e = new b2DistanceJoint(a);
            break;
        case b2Joint.e_mouseJoint:
            e = new b2MouseJoint(a);
            break;
        case b2Joint.e_prismaticJoint:
            e = new b2PrismaticJoint(a);
            break;
        case b2Joint.e_revoluteJoint:
            e = new b2RevoluteJoint(a);
            break;
        case b2Joint.e_pulleyJoint:
            e = new b2PulleyJoint(a);
            break;
        case b2Joint.e_gearJoint:
            e = new b2GearJoint(a)
    }
    return e
};
b2Joint.Destroy = function(a, c) {};
b2Joint.e_unknownJoint = 0;
b2Joint.e_revoluteJoint = 1;
b2Joint.e_prismaticJoint = 2;
b2Joint.e_distanceJoint = 3;
b2Joint.e_pulleyJoint = 4;
b2Joint.e_mouseJoint = 5;
b2Joint.e_gearJoint = 6;
b2Joint.e_inactiveLimit = 0;
b2Joint.e_atLowerLimit = 1;
b2Joint.e_atUpperLimit = 2;
b2Joint.e_equalLimits = 3;
var b2JointDef = Class.create();
b2JointDef.prototype = {
    initialize: function() {
        this.type = b2Joint.e_unknownJoint;
        this.body2 = this.body1 = this.userData = null;
        this.collideConnected = !1
    },
    type: 0,
    userData: null,
    body1: null,
    body2: null,
    collideConnected: null
};
var b2DistanceJoint = Class.create();
Object.extend(b2DistanceJoint.prototype, b2Joint.prototype);
Object.extend(b2DistanceJoint.prototype, {
    initialize: function(a) {
        this.m_node1 = new b2JointNode;
        this.m_node2 = new b2JointNode;
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_body1 = a.body1;
        this.m_body2 = a.body2;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_u = new b2Vec2;
        var c, e, f;
        c = this.m_body1.m_R;
        e = a.anchorPoint1.x - this.m_body1.m_position.x;
        f = a.anchorPoint1.y - this.m_body1.m_position.y;
        this.m_localAnchor1.x = e * c.col1.x + f * c.col1.y;
        this.m_localAnchor1.y = e * c.col2.x + f * c.col2.y;
        c = this.m_body2.m_R;
        e = a.anchorPoint2.x - this.m_body2.m_position.x;
        f = a.anchorPoint2.y - this.m_body2.m_position.y;
        this.m_localAnchor2.x = e * c.col1.x + f * c.col1.y;
        this.m_localAnchor2.y = e * c.col2.x + f * c.col2.y;
        e = a.anchorPoint2.x - a.anchorPoint1.x;
        f = a.anchorPoint2.y - a.anchorPoint1.y;
        this.m_length = Math.sqrt(e * e + f * f);
        this.m_impulse = 0
    },
    PrepareVelocitySolver: function() {
        var a;
        a = this.m_body1.m_R;
        var c = a.col1.x * this.m_localAnchor1.x +
            a.col2.x * this.m_localAnchor1.y,
            e = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
        a = this.m_body2.m_R;
        var f = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
        a = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y;
        this.m_u.x = this.m_body2.m_position.x + f - this.m_body1.m_position.x - c;
        this.m_u.y = this.m_body2.m_position.y + a - this.m_body1.m_position.y - e;
        var g = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
        g > b2Settings.b2_linearSlop ? this.m_u.Multiply(1 / g) : this.m_u.SetZero();
        var g = c * this.m_u.y - e * this.m_u.x,
            h = f * this.m_u.y - a * this.m_u.x;
        this.m_mass = this.m_body1.m_invMass + this.m_body1.m_invI * g * g + this.m_body2.m_invMass + this.m_body2.m_invI * h * h;
        this.m_mass = 1 / this.m_mass;
        b2World.s_enableWarmStarting ? (g = this.m_impulse * this.m_u.x, h = this.m_impulse * this.m_u.y, this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * g, this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * h, this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (c * h - e * g), this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass *
            g, this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * h, this.m_body2.m_angularVelocity += this.m_body2.m_invI * (f * h - a * g)) : this.m_impulse = 0
    },
    SolveVelocityConstraints: function(a) {
        var c;
        c = this.m_body1.m_R;
        a = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
        var e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
        c = this.m_body2.m_R;
        var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
        c = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
        var g = -this.m_mass *
            (this.m_u.x * (this.m_body2.m_linearVelocity.x + -this.m_body2.m_angularVelocity * c - (this.m_body1.m_linearVelocity.x + -this.m_body1.m_angularVelocity * e)) + this.m_u.y * (this.m_body2.m_linearVelocity.y + this.m_body2.m_angularVelocity * f - (this.m_body1.m_linearVelocity.y + this.m_body1.m_angularVelocity * a)));
        this.m_impulse += g;
        var h = g * this.m_u.x,
            g = g * this.m_u.y;
        this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * h;
        this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * g;
        this.m_body1.m_angularVelocity -= this.m_body1.m_invI *
            (a * g - e * h);
        this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * h;
        this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * g;
        this.m_body2.m_angularVelocity += this.m_body2.m_invI * (f * g - c * h)
    },
    SolvePositionConstraints: function() {
        var a;
        a = this.m_body1.m_R;
        var c = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y,
            e = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
        a = this.m_body2.m_R;
        var f = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
        a = a.col1.y * this.m_localAnchor2.x +
            a.col2.y * this.m_localAnchor2.y;
        var g = this.m_body2.m_position.x + f - this.m_body1.m_position.x - c,
            h = this.m_body2.m_position.y + a - this.m_body1.m_position.y - e,
            k = Math.sqrt(g * g + h * h),
            g = g / k,
            h = h / k,
            k = k - this.m_length,
            k = b2Math.b2Clamp(k, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection),
            l = -this.m_mass * k;
        this.m_u.Set(g, h);
        g = l * this.m_u.x;
        h = l * this.m_u.y;
        this.m_body1.m_position.x -= this.m_body1.m_invMass * g;
        this.m_body1.m_position.y -= this.m_body1.m_invMass * h;
        this.m_body1.m_rotation -= this.m_body1.m_invI *
            (c * h - e * g);
        this.m_body2.m_position.x += this.m_body2.m_invMass * g;
        this.m_body2.m_position.y += this.m_body2.m_invMass * h;
        this.m_body2.m_rotation += this.m_body2.m_invI * (f * h - a * g);
        this.m_body1.m_R.Set(this.m_body1.m_rotation);
        this.m_body2.m_R.Set(this.m_body2.m_rotation);
        return b2Math.b2Abs(k) < b2Settings.b2_linearSlop
    },
    GetAnchor1: function() {
        return b2Math.AddVV(this.m_body1.m_position, b2Math.b2MulMV(this.m_body1.m_R, this.m_localAnchor1))
    },
    GetAnchor2: function() {
        return b2Math.AddVV(this.m_body2.m_position, b2Math.b2MulMV(this.m_body2.m_R,
            this.m_localAnchor2))
    },
    GetReactionForce: function(a) {
        var c = new b2Vec2;
        c.SetV(this.m_u);
        c.Multiply(this.m_impulse * a);
        return c
    },
    GetReactionTorque: function(a) {
        return 0
    },
    m_localAnchor1: new b2Vec2,
    m_localAnchor2: new b2Vec2,
    m_u: new b2Vec2,
    m_impulse: null,
    m_mass: null,
    m_length: null
});
var b2DistanceJointDef = Class.create();
Object.extend(b2DistanceJointDef.prototype, b2JointDef.prototype);
Object.extend(b2DistanceJointDef.prototype, {
    initialize: function() {
        this.type = b2Joint.e_unknownJoint;
        this.body2 = this.body1 = this.userData = null;
        this.collideConnected = !1;
        this.anchorPoint1 = new b2Vec2;
        this.anchorPoint2 = new b2Vec2;
        this.type = b2Joint.e_distanceJoint
    },
    anchorPoint1: new b2Vec2,
    anchorPoint2: new b2Vec2
});
var b2Jacobian = Class.create();
b2Jacobian.prototype = {
    linear1: new b2Vec2,
    angular1: null,
    linear2: new b2Vec2,
    angular2: null,
    SetZero: function() {
        this.linear1.SetZero();
        this.angular1 = 0;
        this.linear2.SetZero();
        this.angular2 = 0
    },
    Set: function(a, c, e, f) {
        this.linear1.SetV(a);
        this.angular1 = c;
        this.linear2.SetV(e);
        this.angular2 = f
    },
    Compute: function(a, c, e, f) {
        return this.linear1.x * a.x + this.linear1.y * a.y + this.angular1 * c + (this.linear2.x * e.x + this.linear2.y * e.y) + this.angular2 * f
    },
    initialize: function() {
        this.linear1 = new b2Vec2;
        this.linear2 = new b2Vec2
    }
};
var b2GearJoint = Class.create();
Object.extend(b2GearJoint.prototype, b2Joint.prototype);
Object.extend(b2GearJoint.prototype, {
    GetAnchor1: function() {
        var a = this.m_body1.m_R;
        return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
    },
    GetAnchor2: function() {
        var a = this.m_body2.m_R;
        return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y *
            this.m_localAnchor2.y))
    },
    GetReactionForce: function(a) {
        return new b2Vec2
    },
    GetReactionTorque: function(a) {
        return 0
    },
    GetRatio: function() {
        return this.m_ratio
    },
    initialize: function(a) {
        this.m_node1 = new b2JointNode;
        this.m_node2 = new b2JointNode;
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_body1 = a.body1;
        this.m_body2 = a.body2;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData;
        this.m_groundAnchor1 = new b2Vec2;
        this.m_groundAnchor2 = new b2Vec2;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_J = new b2Jacobian;
        this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
        var c, e;
        this.m_ground1 = a.joint1.m_body1;
        this.m_body1 = a.joint1.m_body2;
        a.joint1.m_type == b2Joint.e_revoluteJoint ? (this.m_revolute1 = a.joint1, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), c = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1),
            this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), c = this.m_prismatic1.GetJointTranslation());
        this.m_ground2 = a.joint2.m_body1;
        this.m_body2 = a.joint2.m_body2;
        a.joint2.m_type == b2Joint.e_revoluteJoint ? (this.m_revolute2 = a.joint2, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), e = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2),
            e = this.m_prismatic2.GetJointTranslation());
        this.m_ratio = a.ratio;
        this.m_constant = c + this.m_ratio * e;
        this.m_impulse = 0
    },
    PrepareVelocitySolver: function() {
        var a = this.m_ground1,
            c = this.m_ground2,
            e = this.m_body1,
            f = this.m_body2,
            g, h, k, l = 0;
        this.m_J.SetZero();
        this.m_revolute1 ? (this.m_J.angular1 = -1, l += e.m_invI) : (k = a.m_R, g = this.m_prismatic1.m_localXAxis1, a = k.col1.x * g.x + k.col2.x * g.y, g = k.col1.y * g.x + k.col2.y * g.y, k = e.m_R, h = k.col1.x * this.m_localAnchor1.x + k.col2.x * this.m_localAnchor1.y, k = k.col1.y * this.m_localAnchor1.x +
            k.col2.y * this.m_localAnchor1.y, h = h * g - k * a, this.m_J.linear1.Set(-a, -g), this.m_J.angular1 = -h, l += e.m_invMass + e.m_invI * h * h);
        this.m_revolute2 ? (this.m_J.angular2 = -this.m_ratio, l += this.m_ratio * this.m_ratio * f.m_invI) : (k = c.m_R, g = this.m_prismatic2.m_localXAxis1, a = k.col1.x * g.x + k.col2.x * g.y, g = k.col1.y * g.x + k.col2.y * g.y, k = f.m_R, h = k.col1.x * this.m_localAnchor2.x + k.col2.x * this.m_localAnchor2.y, k = k.col1.y * this.m_localAnchor2.x + k.col2.y * this.m_localAnchor2.y, h = h * g - k * a, this.m_J.linear2.Set(-this.m_ratio * a, -this.m_ratio *
            g), this.m_J.angular2 = -this.m_ratio * h, l += this.m_ratio * this.m_ratio * (f.m_invMass + f.m_invI * h * h));
        this.m_mass = 1 / l;
        e.m_linearVelocity.x += e.m_invMass * this.m_impulse * this.m_J.linear1.x;
        e.m_linearVelocity.y += e.m_invMass * this.m_impulse * this.m_J.linear1.y;
        e.m_angularVelocity += e.m_invI * this.m_impulse * this.m_J.angular1;
        f.m_linearVelocity.x += f.m_invMass * this.m_impulse * this.m_J.linear2.x;
        f.m_linearVelocity.y += f.m_invMass * this.m_impulse * this.m_J.linear2.y;
        f.m_angularVelocity += f.m_invI * this.m_impulse * this.m_J.angular2
    },
    SolveVelocityConstraints: function(a) {
        a = this.m_body1;
        var c = this.m_body2,
            e = this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity),
            e = -this.m_mass * e;
        this.m_impulse += e;
        a.m_linearVelocity.x += a.m_invMass * e * this.m_J.linear1.x;
        a.m_linearVelocity.y += a.m_invMass * e * this.m_J.linear1.y;
        a.m_angularVelocity += a.m_invI * e * this.m_J.angular1;
        c.m_linearVelocity.x += c.m_invMass * e * this.m_J.linear2.x;
        c.m_linearVelocity.y += c.m_invMass * e * this.m_J.linear2.y;
        c.m_angularVelocity += c.m_invI *
            e * this.m_J.angular2
    },
    SolvePositionConstraints: function() {
        var a = this.m_body1,
            c = this.m_body2,
            e, f;
        e = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation();
        f = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation();
        e = -this.m_mass * (this.m_constant - (e + this.m_ratio * f));
        a.m_position.x += a.m_invMass * e * this.m_J.linear1.x;
        a.m_position.y += a.m_invMass * e * this.m_J.linear1.y;
        a.m_rotation += a.m_invI * e * this.m_J.angular1;
        c.m_position.x += c.m_invMass * e *
            this.m_J.linear2.x;
        c.m_position.y += c.m_invMass * e * this.m_J.linear2.y;
        c.m_rotation += c.m_invI * e * this.m_J.angular2;
        a.m_R.Set(a.m_rotation);
        c.m_R.Set(c.m_rotation);
        return 0 < b2Settings.b2_linearSlop
    },
    m_ground1: null,
    m_ground2: null,
    m_revolute1: null,
    m_prismatic1: null,
    m_revolute2: null,
    m_prismatic2: null,
    m_groundAnchor1: new b2Vec2,
    m_groundAnchor2: new b2Vec2,
    m_localAnchor1: new b2Vec2,
    m_localAnchor2: new b2Vec2,
    m_J: new b2Jacobian,
    m_constant: null,
    m_ratio: null,
    m_mass: null,
    m_impulse: null
});
var b2GearJointDef = Class.create();
Object.extend(b2GearJointDef.prototype, b2JointDef.prototype);
Object.extend(b2GearJointDef.prototype, {
    initialize: function() {
        this.type = b2Joint.e_gearJoint;
        this.joint2 = this.joint1 = null;
        this.ratio = 1
    },
    joint1: null,
    joint2: null,
    ratio: null
});
var b2MouseJoint = Class.create();
Object.extend(b2MouseJoint.prototype, b2Joint.prototype);
Object.extend(b2MouseJoint.prototype, {
    GetAnchor1: function() {
        return this.m_target
    },
    GetAnchor2: function() {
        var a = b2Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor);
        a.Add(this.m_body2.m_position);
        return a
    },
    GetReactionForce: function(a) {
        var c = new b2Vec2;
        c.SetV(this.m_impulse);
        c.Multiply(a);
        return c
    },
    GetReactionTorque: function(a) {
        return 0
    },
    SetTarget: function(a) {
        this.m_body2.WakeUp();
        this.m_target = a
    },
    initialize: function(a) {
        this.m_node1 = new b2JointNode;
        this.m_node2 = new b2JointNode;
        this.m_type = a.type;
        this.m_next =
            this.m_prev = null;
        this.m_body1 = a.body1;
        this.m_body2 = a.body2;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData;
        this.K = new b2Mat22;
        this.K1 = new b2Mat22;
        this.K2 = new b2Mat22;
        this.m_localAnchor = new b2Vec2;
        this.m_target = new b2Vec2;
        this.m_impulse = new b2Vec2;
        this.m_ptpMass = new b2Mat22;
        this.m_C = new b2Vec2;
        this.m_target.SetV(a.target);
        var c = this.m_target.x - this.m_body2.m_position.x,
            e = this.m_target.y - this.m_body2.m_position.y;
        this.m_localAnchor.x = c * this.m_body2.m_R.col1.x +
            e * this.m_body2.m_R.col1.y;
        this.m_localAnchor.y = c * this.m_body2.m_R.col2.x + e * this.m_body2.m_R.col2.y;
        this.m_maxForce = a.maxForce;
        this.m_impulse.SetZero();
        var e = this.m_body2.m_mass,
            f = 2 * b2Settings.b2_pi * a.frequencyHz,
            c = 2 * e * a.dampingRatio * f,
            e = e * f * f;
        this.m_gamma = 1 / (c + a.timeStep * e);
        this.m_beta = a.timeStep * e / (c + a.timeStep * e)
    },
    K: new b2Mat22,
    K1: new b2Mat22,
    K2: new b2Mat22,
    PrepareVelocitySolver: function() {
        var a = this.m_body2,
            c;
        c = a.m_R;
        var e = c.col1.x * this.m_localAnchor.x + c.col2.x * this.m_localAnchor.y;
        c = c.col1.y *
            this.m_localAnchor.x + c.col2.y * this.m_localAnchor.y;
        var f = a.m_invMass,
            g = a.m_invI;
        this.K1.col1.x = f;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = f;
        this.K2.col1.x = g * c * c;
        this.K2.col2.x = -g * e * c;
        this.K2.col1.y = -g * e * c;
        this.K2.col2.y = g * e * e;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.col1.x += this.m_gamma;
        this.K.col2.y += this.m_gamma;
        this.K.Invert(this.m_ptpMass);
        this.m_C.x = a.m_position.x + e - this.m_target.x;
        this.m_C.y = a.m_position.y + c - this.m_target.y;
        a.m_angularVelocity *= .98;
        var h = this.m_impulse.x,
            k = this.m_impulse.y;
        a.m_linearVelocity.x += f * h;
        a.m_linearVelocity.y += f * k;
        a.m_angularVelocity += g * (e * k - c * h)
    },
    SolveVelocityConstraints: function(a) {
        var c = this.m_body2,
            e;
        e = c.m_R;
        var f = e.col1.x * this.m_localAnchor.x + e.col2.x * this.m_localAnchor.y,
            g = e.col1.y * this.m_localAnchor.x + e.col2.y * this.m_localAnchor.y,
            h = c.m_linearVelocity.x + -c.m_angularVelocity * g,
            k = c.m_linearVelocity.y + c.m_angularVelocity * f;
        e = this.m_ptpMass;
        var h = h + this.m_beta * a.inv_dt * this.m_C.x + this.m_gamma * this.m_impulse.x,
            l = k + this.m_beta * a.inv_dt * this.m_C.y + this.m_gamma *
            this.m_impulse.y,
            k = -(e.col1.x * h + e.col2.x * l),
            l = -(e.col1.y * h + e.col2.y * l);
        e = this.m_impulse.x;
        h = this.m_impulse.y;
        this.m_impulse.x += k;
        this.m_impulse.y += l;
        k = this.m_impulse.Length();
        k > a.dt * this.m_maxForce && this.m_impulse.Multiply(a.dt * this.m_maxForce / k);
        k = this.m_impulse.x - e;
        l = this.m_impulse.y - h;
        c.m_linearVelocity.x += c.m_invMass * k;
        c.m_linearVelocity.y += c.m_invMass * l;
        c.m_angularVelocity += c.m_invI * (f * l - g * k)
    },
    SolvePositionConstraints: function() {
        return !0
    },
    m_localAnchor: new b2Vec2,
    m_target: new b2Vec2,
    m_impulse: new b2Vec2,
    m_ptpMass: new b2Mat22,
    m_C: new b2Vec2,
    m_maxForce: null,
    m_beta: null,
    m_gamma: null
});
var b2MouseJointDef = Class.create();
Object.extend(b2MouseJointDef.prototype, b2JointDef.prototype);
Object.extend(b2MouseJointDef.prototype, {
    initialize: function() {
        this.type = b2Joint.e_unknownJoint;
        this.body2 = this.body1 = this.userData = null;
        this.collideConnected = !1;
        this.target = new b2Vec2;
        this.type = b2Joint.e_mouseJoint;
        this.maxForce = 0;
        this.frequencyHz = 5;
        this.dampingRatio = .7;
        this.timeStep = 1 / 60
    },
    target: new b2Vec2,
    maxForce: null,
    frequencyHz: null,
    dampingRatio: null,
    timeStep: null
});
var b2PrismaticJoint = Class.create();
Object.extend(b2PrismaticJoint.prototype, b2Joint.prototype);
Object.extend(b2PrismaticJoint.prototype, {
    GetAnchor1: function() {
        var a = this.m_body1,
            c = new b2Vec2;
        c.SetV(this.m_localAnchor1);
        c.MulM(a.m_R);
        c.Add(a.m_position);
        return c
    },
    GetAnchor2: function() {
        var a = this.m_body2,
            c = new b2Vec2;
        c.SetV(this.m_localAnchor2);
        c.MulM(a.m_R);
        c.Add(a.m_position);
        return c
    },
    GetJointTranslation: function() {
        var a = this.m_body1,
            c = this.m_body2,
            e;
        e = a.m_R;
        var f = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y,
            g = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y;
        e = c.m_R;
        f = c.m_position.x + (e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y) - (a.m_position.x + f);
        c = c.m_position.y + (e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y) - (a.m_position.y + g);
        e = a.m_R;
        return (e.col1.x * this.m_localXAxis1.x + e.col2.x * this.m_localXAxis1.y) * f + (e.col1.y * this.m_localXAxis1.x + e.col2.y * this.m_localXAxis1.y) * c
    },
    GetJointSpeed: function() {
        var a = this.m_body1,
            c = this.m_body2,
            e;
        e = a.m_R;
        var f = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y,
            g = e.col1.y * this.m_localAnchor1.x +
            e.col2.y * this.m_localAnchor1.y;
        e = c.m_R;
        var h = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y,
            k = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y,
            l = c.m_position.x + h - (a.m_position.x + f),
            m = c.m_position.y + k - (a.m_position.y + g);
        e = a.m_R;
        var n = e.col1.x * this.m_localXAxis1.x + e.col2.x * this.m_localXAxis1.y;
        e = e.col1.y * this.m_localXAxis1.x + e.col2.y * this.m_localXAxis1.y;
        var p = a.m_linearVelocity,
            q = c.m_linearVelocity,
            a = a.m_angularVelocity,
            c = c.m_angularVelocity;
        return l * -a * e + m * a * n + (n * (q.x +
            -c * k - p.x - -a * g) + e * (q.y + c * h - p.y - a * f))
    },
    GetMotorForce: function(a) {
        return a * this.m_motorImpulse
    },
    SetMotorSpeed: function(a) {
        this.m_motorSpeed = a
    },
    SetMotorForce: function(a) {
        this.m_maxMotorForce = a
    },
    GetReactionForce: function(a) {
        a *= this.m_limitImpulse;
        var c;
        c = this.m_body1.m_R;
        return new b2Vec2(a * (c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y) + a * (c.col1.x * this.m_localYAxis1.x + c.col2.x * this.m_localYAxis1.y), a * (c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y) + a * (c.col1.y * this.m_localYAxis1.x +
            c.col2.y * this.m_localYAxis1.y))
    },
    GetReactionTorque: function(a) {
        return a * this.m_angularImpulse
    },
    initialize: function(a) {
        this.m_node1 = new b2JointNode;
        this.m_node2 = new b2JointNode;
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_body1 = a.body1;
        this.m_body2 = a.body2;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_localXAxis1 = new b2Vec2;
        this.m_localYAxis1 = new b2Vec2;
        this.m_linearJacobian =
            new b2Jacobian;
        this.m_motorJacobian = new b2Jacobian;
        var c, e, f;
        c = this.m_body1.m_R;
        e = a.anchorPoint.x - this.m_body1.m_position.x;
        f = a.anchorPoint.y - this.m_body1.m_position.y;
        this.m_localAnchor1.Set(e * c.col1.x + f * c.col1.y, e * c.col2.x + f * c.col2.y);
        c = this.m_body2.m_R;
        e = a.anchorPoint.x - this.m_body2.m_position.x;
        f = a.anchorPoint.y - this.m_body2.m_position.y;
        this.m_localAnchor2.Set(e * c.col1.x + f * c.col1.y, e * c.col2.x + f * c.col2.y);
        c = this.m_body1.m_R;
        e = a.axis.x;
        f = a.axis.y;
        this.m_localXAxis1.Set(e * c.col1.x + f * c.col1.y, e *
            c.col2.x + f * c.col2.y);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_initialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
        this.m_linearJacobian.SetZero();
        this.m_angularImpulse = this.m_angularMass = this.m_linearImpulse = this.m_linearMass = 0;
        this.m_motorJacobian.SetZero();
        this.m_limitPositionImpulse = this.m_limitImpulse = this.m_motorImpulse = this.m_motorMass = 0;
        this.m_lowerTranslation = a.lowerTranslation;
        this.m_upperTranslation = a.upperTranslation;
        this.m_maxMotorForce =
            a.motorForce;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor
    },
    PrepareVelocitySolver: function() {
        var a = this.m_body1,
            c = this.m_body2,
            e;
        e = a.m_R;
        var f = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y,
            g = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y;
        e = c.m_R;
        var h = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y,
            k = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y,
            l = a.m_invMass,
            m = c.m_invMass,
            n = a.m_invI,
            p =
            c.m_invI;
        e = a.m_R;
        var q = e.col1.x * this.m_localYAxis1.x + e.col2.x * this.m_localYAxis1.y;
        e = e.col1.y * this.m_localYAxis1.x + e.col2.y * this.m_localYAxis1.y;
        var r = c.m_position.x + h - a.m_position.x,
            s = c.m_position.y + k - a.m_position.y;
        this.m_linearJacobian.linear1.x = -q;
        this.m_linearJacobian.linear1.y = -e;
        this.m_linearJacobian.linear2.x = q;
        this.m_linearJacobian.linear2.y = e;
        this.m_linearJacobian.angular1 = -(r * e - s * q);
        this.m_linearJacobian.angular2 = h * e - k * q;
        this.m_linearMass = l + n * this.m_linearJacobian.angular1 * this.m_linearJacobian.angular1 +
            m + p * this.m_linearJacobian.angular2 * this.m_linearJacobian.angular2;
        this.m_linearMass = 1 / this.m_linearMass;
        this.m_angularMass = 1 / (n + p);
        if (this.m_enableLimit || this.m_enableMotor) e = a.m_R, q = e.col1.x * this.m_localXAxis1.x + e.col2.x * this.m_localXAxis1.y, e = e.col1.y * this.m_localXAxis1.x + e.col2.y * this.m_localXAxis1.y, this.m_motorJacobian.linear1.x = -q, this.m_motorJacobian.linear1.y = -e, this.m_motorJacobian.linear2.x = q, this.m_motorJacobian.linear2.y = e, this.m_motorJacobian.angular1 = -(r * e - s * q), this.m_motorJacobian.angular2 =
            h * e - k * q, this.m_motorMass = l + n * this.m_motorJacobian.angular1 * this.m_motorJacobian.angular1 + m + p * this.m_motorJacobian.angular2 * this.m_motorJacobian.angular2, this.m_motorMass = 1 / this.m_motorMass, this.m_enableLimit && (f = q * (r - f) + e * (s - g), b2Math.b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop ? this.m_limitState = b2Joint.e_equalLimits : f <= this.m_lowerTranslation ? (this.m_limitState != b2Joint.e_atLowerLimit && (this.m_limitImpulse = 0), this.m_limitState = b2Joint.e_atLowerLimit) : f >= this.m_upperTranslation ?
                (this.m_limitState != b2Joint.e_atUpperLimit && (this.m_limitImpulse = 0), this.m_limitState = b2Joint.e_atUpperLimit) : (this.m_limitState = b2Joint.e_inactiveLimit, this.m_limitImpulse = 0));
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        0 == this.m_enableLimit && (this.m_limitImpulse = 0);
        b2World.s_enableWarmStarting ? (f = this.m_linearImpulse * this.m_linearJacobian.linear1.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.y, g = this.m_linearImpulse * this.m_linearJacobian.linear2.x + (this.m_motorImpulse +
            this.m_limitImpulse) * this.m_motorJacobian.linear2.x, h = this.m_linearImpulse * this.m_linearJacobian.linear2.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.y, k = this.m_linearImpulse * this.m_linearJacobian.angular1 - this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular1, r = this.m_linearImpulse * this.m_linearJacobian.angular2 + this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular2, a.m_linearVelocity.x += l * (this.m_linearImpulse *
            this.m_linearJacobian.linear1.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.x), a.m_linearVelocity.y += l * f, a.m_angularVelocity += n * k, c.m_linearVelocity.x += m * g, c.m_linearVelocity.y += m * h, c.m_angularVelocity += p * r) : this.m_motorImpulse = this.m_limitImpulse = this.m_angularImpulse = this.m_linearImpulse = 0;
        this.m_limitPositionImpulse = 0
    },
    SolveVelocityConstraints: function(a) {
        var c = this.m_body1,
            e = this.m_body2,
            f = c.m_invMass,
            g = e.m_invMass,
            h = c.m_invI,
            k = e.m_invI,
            l = this.m_linearJacobian.Compute(c.m_linearVelocity,
                c.m_angularVelocity, e.m_linearVelocity, e.m_angularVelocity),
            l = -this.m_linearMass * l;
        this.m_linearImpulse += l;
        c.m_linearVelocity.x += f * l * this.m_linearJacobian.linear1.x;
        c.m_linearVelocity.y += f * l * this.m_linearJacobian.linear1.y;
        c.m_angularVelocity += h * l * this.m_linearJacobian.angular1;
        e.m_linearVelocity.x += g * l * this.m_linearJacobian.linear2.x;
        e.m_linearVelocity.y += g * l * this.m_linearJacobian.linear2.y;
        e.m_angularVelocity += k * l * this.m_linearJacobian.angular2;
        l = -this.m_angularMass * (e.m_angularVelocity - c.m_angularVelocity);
        this.m_angularImpulse += l;
        c.m_angularVelocity -= h * l;
        e.m_angularVelocity += k * l;
        if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
            var l = this.m_motorJacobian.Compute(c.m_linearVelocity, c.m_angularVelocity, e.m_linearVelocity, e.m_angularVelocity) - this.m_motorSpeed,
                l = -this.m_motorMass * l,
                m = this.m_motorImpulse;
            this.m_motorImpulse = b2Math.b2Clamp(this.m_motorImpulse + l, -a.dt * this.m_maxMotorForce, a.dt * this.m_maxMotorForce);
            l = this.m_motorImpulse - m;
            c.m_linearVelocity.x += f * l * this.m_motorJacobian.linear1.x;
            c.m_linearVelocity.y += f * l * this.m_motorJacobian.linear1.y;
            c.m_angularVelocity += h * l * this.m_motorJacobian.angular1;
            e.m_linearVelocity.x += g * l * this.m_motorJacobian.linear2.x;
            e.m_linearVelocity.y += g * l * this.m_motorJacobian.linear2.y;
            e.m_angularVelocity += k * l * this.m_motorJacobian.angular2
        }
        this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit && (a = this.m_motorJacobian.Compute(c.m_linearVelocity, c.m_angularVelocity, e.m_linearVelocity, e.m_angularVelocity), l = -this.m_motorMass * a, this.m_limitState == b2Joint.e_equalLimits ?
            this.m_limitImpulse += l : this.m_limitState == b2Joint.e_atLowerLimit ? (a = this.m_limitImpulse, this.m_limitImpulse = b2Math.b2Max(this.m_limitImpulse + l, 0), l = this.m_limitImpulse - a) : this.m_limitState == b2Joint.e_atUpperLimit && (a = this.m_limitImpulse, this.m_limitImpulse = b2Math.b2Min(this.m_limitImpulse + l, 0), l = this.m_limitImpulse - a), c.m_linearVelocity.x += f * l * this.m_motorJacobian.linear1.x, c.m_linearVelocity.y += f * l * this.m_motorJacobian.linear1.y, c.m_angularVelocity += h * l * this.m_motorJacobian.angular1, e.m_linearVelocity.x +=
            g * l * this.m_motorJacobian.linear2.x, e.m_linearVelocity.y += g * l * this.m_motorJacobian.linear2.y, e.m_angularVelocity += k * l * this.m_motorJacobian.angular2)
    },
    SolvePositionConstraints: function() {
        var a, c, e = this.m_body1,
            f = this.m_body2,
            g = e.m_invMass,
            h = f.m_invMass,
            k = e.m_invI,
            l = f.m_invI;
        a = e.m_R;
        var m = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y,
            n = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
        a = f.m_R;
        var p = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
        a = a.col1.y * this.m_localAnchor2.x +
            a.col2.y * this.m_localAnchor2.y;
        var m = e.m_position.x + m,
            n = e.m_position.y + n,
            p = f.m_position.x + p,
            q = f.m_position.y + a;
        a = e.m_R;
        var r = (a.col1.x * this.m_localYAxis1.x + a.col2.x * this.m_localYAxis1.y) * (p - m) + (a.col1.y * this.m_localYAxis1.x + a.col2.y * this.m_localYAxis1.y) * (q - n),
            r = b2Math.b2Clamp(r, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
        c = -this.m_linearMass * r;
        e.m_position.x += g * c * this.m_linearJacobian.linear1.x;
        e.m_position.y += g * c * this.m_linearJacobian.linear1.y;
        e.m_rotation += k * c * this.m_linearJacobian.angular1;
        f.m_position.x += h * c * this.m_linearJacobian.linear2.x;
        f.m_position.y += h * c * this.m_linearJacobian.linear2.y;
        f.m_rotation += l * c * this.m_linearJacobian.angular2;
        r = b2Math.b2Abs(r);
        c = f.m_rotation - e.m_rotation - this.m_initialAngle;
        c = b2Math.b2Clamp(c, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
        var s = -this.m_angularMass * c;
        e.m_rotation -= e.m_invI * s;
        e.m_R.Set(e.m_rotation);
        f.m_rotation += f.m_invI * s;
        f.m_R.Set(f.m_rotation);
        s = b2Math.b2Abs(c);
        this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit &&
            (a = e.m_R, m = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y, n = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y, a = f.m_R, p = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y, a = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y, m = e.m_position.x + m, n = e.m_position.y + n, p = f.m_position.x + p, q = f.m_position.y + a, a = e.m_R, m = (a.col1.x * this.m_localXAxis1.x + a.col2.x * this.m_localXAxis1.y) * (p - m) + (a.col1.y * this.m_localXAxis1.x + a.col2.y * this.m_localXAxis1.y) * (q - n), a = 0, this.m_limitState ==
                b2Joint.e_equalLimits ? (a = b2Math.b2Clamp(m, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection), a *= -this.m_motorMass, r = b2Math.b2Max(r, b2Math.b2Abs(c))) : this.m_limitState == b2Joint.e_atLowerLimit ? (a = m - this.m_lowerTranslation, r = b2Math.b2Max(r, -a), a = b2Math.b2Clamp(a + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0), a *= -this.m_motorMass, c = this.m_limitPositionImpulse, this.m_limitPositionImpulse = b2Math.b2Max(this.m_limitPositionImpulse + a, 0), a = this.m_limitPositionImpulse - c) : this.m_limitState ==
                b2Joint.e_atUpperLimit && (a = m - this.m_upperTranslation, r = b2Math.b2Max(r, a), a = b2Math.b2Clamp(a - b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection), a *= -this.m_motorMass, c = this.m_limitPositionImpulse, this.m_limitPositionImpulse = b2Math.b2Min(this.m_limitPositionImpulse + a, 0), a = this.m_limitPositionImpulse - c), e.m_position.x += g * a * this.m_motorJacobian.linear1.x, e.m_position.y += g * a * this.m_motorJacobian.linear1.y, e.m_rotation += k * a * this.m_motorJacobian.angular1, e.m_R.Set(e.m_rotation), f.m_position.x +=
                h * a * this.m_motorJacobian.linear2.x, f.m_position.y += h * a * this.m_motorJacobian.linear2.y, f.m_rotation += l * a * this.m_motorJacobian.angular2, f.m_R.Set(f.m_rotation));
        return r <= b2Settings.b2_linearSlop && s <= b2Settings.b2_angularSlop
    },
    m_localAnchor1: new b2Vec2,
    m_localAnchor2: new b2Vec2,
    m_localXAxis1: new b2Vec2,
    m_localYAxis1: new b2Vec2,
    m_initialAngle: null,
    m_linearJacobian: new b2Jacobian,
    m_linearMass: null,
    m_linearImpulse: null,
    m_angularMass: null,
    m_angularImpulse: null,
    m_motorJacobian: new b2Jacobian,
    m_motorMass: null,
    m_motorImpulse: null,
    m_limitImpulse: null,
    m_limitPositionImpulse: null,
    m_lowerTranslation: null,
    m_upperTranslation: null,
    m_maxMotorForce: null,
    m_motorSpeed: null,
    m_enableLimit: null,
    m_enableMotor: null,
    m_limitState: 0
});
var b2PrismaticJointDef = Class.create();
Object.extend(b2PrismaticJointDef.prototype, b2JointDef.prototype);
Object.extend(b2PrismaticJointDef.prototype, {
    initialize: function() {
        this.type = b2Joint.e_unknownJoint;
        this.body2 = this.body1 = this.userData = null;
        this.collideConnected = !1;
        this.type = b2Joint.e_prismaticJoint;
        this.anchorPoint = new b2Vec2(0, 0);
        this.axis = new b2Vec2(0, 0);
        this.motorSpeed = this.motorForce = this.upperTranslation = this.lowerTranslation = 0;
        this.enableMotor = this.enableLimit = !1
    },
    anchorPoint: null,
    axis: null,
    lowerTranslation: null,
    upperTranslation: null,
    motorForce: null,
    motorSpeed: null,
    enableLimit: null,
    enableMotor: null
});
var b2PulleyJoint = Class.create();
Object.extend(b2PulleyJoint.prototype, b2Joint.prototype);
Object.extend(b2PulleyJoint.prototype, {
    GetAnchor1: function() {
        var a = this.m_body1.m_R;
        return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
    },
    GetAnchor2: function() {
        var a = this.m_body2.m_R;
        return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y *
            this.m_localAnchor2.y))
    },
    GetGroundPoint1: function() {
        return new b2Vec2(this.m_ground.m_position.x + this.m_groundAnchor1.x, this.m_ground.m_position.y + this.m_groundAnchor1.y)
    },
    GetGroundPoint2: function() {
        return new b2Vec2(this.m_ground.m_position.x + this.m_groundAnchor2.x, this.m_ground.m_position.y + this.m_groundAnchor2.y)
    },
    GetReactionForce: function(a) {
        return new b2Vec2
    },
    GetReactionTorque: function(a) {
        return 0
    },
    GetLength1: function() {
        var a;
        a = this.m_body1.m_R;
        var c = this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x +
            a.col2.x * this.m_localAnchor1.y) - (this.m_ground.m_position.x + this.m_groundAnchor1.x);
        a = this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y) - (this.m_ground.m_position.y + this.m_groundAnchor1.y);
        return Math.sqrt(c * c + a * a)
    },
    GetLength2: function() {
        var a;
        a = this.m_body2.m_R;
        var c = this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y) - (this.m_ground.m_position.x + this.m_groundAnchor2.x);
        a = this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x +
            a.col2.y * this.m_localAnchor2.y) - (this.m_ground.m_position.y + this.m_groundAnchor2.y);
        return Math.sqrt(c * c + a * a)
    },
    GetRatio: function() {
        return this.m_ratio
    },
    initialize: function(a) {
        this.m_node1 = new b2JointNode;
        this.m_node2 = new b2JointNode;
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_body1 = a.body1;
        this.m_body2 = a.body2;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData;
        this.m_groundAnchor1 = new b2Vec2;
        this.m_groundAnchor2 = new b2Vec2;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_u1 = new b2Vec2;
        this.m_u2 = new b2Vec2;
        var c, e, f;
        this.m_ground = this.m_body1.m_world.m_groundBody;
        this.m_groundAnchor1.x = a.groundPoint1.x - this.m_ground.m_position.x;
        this.m_groundAnchor1.y = a.groundPoint1.y - this.m_ground.m_position.y;
        this.m_groundAnchor2.x = a.groundPoint2.x - this.m_ground.m_position.x;
        this.m_groundAnchor2.y = a.groundPoint2.y - this.m_ground.m_position.y;
        c = this.m_body1.m_R;
        e = a.anchorPoint1.x - this.m_body1.m_position.x;
        f = a.anchorPoint1.y - this.m_body1.m_position.y;
        this.m_localAnchor1.x = e * c.col1.x + f * c.col1.y;
        this.m_localAnchor1.y = e * c.col2.x + f * c.col2.y;
        c = this.m_body2.m_R;
        e = a.anchorPoint2.x - this.m_body2.m_position.x;
        f = a.anchorPoint2.y - this.m_body2.m_position.y;
        this.m_localAnchor2.x = e * c.col1.x + f * c.col1.y;
        this.m_localAnchor2.y = e * c.col2.x + f * c.col2.y;
        this.m_ratio = a.ratio;
        e = a.groundPoint1.x - a.anchorPoint1.x;
        f = a.groundPoint1.y - a.anchorPoint1.y;
        c = Math.sqrt(e * e + f * f);
        e = a.groundPoint2.x - a.anchorPoint2.x;
        f = a.groundPoint2.y - a.anchorPoint2.y;
        e = Math.sqrt(e * e + f * f);
        f = b2Math.b2Max(.5 *
            b2PulleyJoint.b2_minPulleyLength, c);
        e = b2Math.b2Max(.5 * b2PulleyJoint.b2_minPulleyLength, e);
        this.m_constant = f + this.m_ratio * e;
        this.m_maxLength1 = b2Math.b2Clamp(a.maxLength1, f, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
        this.m_maxLength2 = b2Math.b2Clamp(a.maxLength2, e, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
        this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_pulleyImpulse = 0
    },
    PrepareVelocitySolver: function() {
        var a = this.m_body1,
            c = this.m_body2,
            e;
        e = a.m_R;
        var f = e.col1.x *
            this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y,
            g = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y;
        e = c.m_R;
        var h = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y;
        e = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y;
        var k = c.m_position.x + h,
            l = c.m_position.y + e,
            m = this.m_ground.m_position.x + this.m_groundAnchor2.x,
            n = this.m_ground.m_position.y + this.m_groundAnchor2.y;
        this.m_u1.Set(a.m_position.x + f - (this.m_ground.m_position.x + this.m_groundAnchor1.x), a.m_position.y +
            g - (this.m_ground.m_position.y + this.m_groundAnchor1.y));
        this.m_u2.Set(k - m, l - n);
        k = this.m_u1.Length();
        l = this.m_u2.Length();
        k > b2Settings.b2_linearSlop ? this.m_u1.Multiply(1 / k) : this.m_u1.SetZero();
        l > b2Settings.b2_linearSlop ? this.m_u2.Multiply(1 / l) : this.m_u2.SetZero();
        k < this.m_maxLength1 ? (this.m_limitState1 = b2Joint.e_inactiveLimit, this.m_limitImpulse1 = 0) : (this.m_limitState1 = b2Joint.e_atUpperLimit, this.m_limitPositionImpulse1 = 0);
        l < this.m_maxLength2 ? (this.m_limitState2 = b2Joint.e_inactiveLimit, this.m_limitImpulse2 =
            0) : (this.m_limitState2 = b2Joint.e_atUpperLimit, this.m_limitPositionImpulse2 = 0);
        k = f * this.m_u1.y - g * this.m_u1.x;
        l = h * this.m_u2.y - e * this.m_u2.x;
        this.m_limitMass1 = a.m_invMass + a.m_invI * k * k;
        this.m_limitMass2 = c.m_invMass + c.m_invI * l * l;
        this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
        this.m_limitMass1 = 1 / this.m_limitMass1;
        this.m_limitMass2 = 1 / this.m_limitMass2;
        this.m_pulleyMass = 1 / this.m_pulleyMass;
        k = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.x;
        l = (-this.m_pulleyImpulse -
            this.m_limitImpulse1) * this.m_u1.y;
        m = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.x;
        n = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.y;
        a.m_linearVelocity.x += a.m_invMass * k;
        a.m_linearVelocity.y += a.m_invMass * l;
        a.m_angularVelocity += a.m_invI * (f * l - g * k);
        c.m_linearVelocity.x += c.m_invMass * m;
        c.m_linearVelocity.y += c.m_invMass * n;
        c.m_angularVelocity += c.m_invI * (h * n - e * m)
    },
    SolveVelocityConstraints: function(a) {
        a = this.m_body1;
        var c = this.m_body2,
            e;
        e = a.m_R;
        var f = e.col1.x * this.m_localAnchor1.x +
            e.col2.x * this.m_localAnchor1.y,
            g = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y;
        e = c.m_R;
        var h = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y;
        e = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y;
        var k, l, m, n;
        k = a.m_linearVelocity.x + -a.m_angularVelocity * g;
        l = a.m_linearVelocity.y + a.m_angularVelocity * f;
        m = c.m_linearVelocity.x + -c.m_angularVelocity * e;
        n = c.m_linearVelocity.y + c.m_angularVelocity * h;
        k = -(this.m_u1.x * k + this.m_u1.y * l) - this.m_ratio * (this.m_u2.x * m + this.m_u2.y *
            n);
        n = -this.m_pulleyMass * k;
        this.m_pulleyImpulse += n;
        k = -n * this.m_u1.x;
        l = -n * this.m_u1.y;
        m = -this.m_ratio * n * this.m_u2.x;
        n = -this.m_ratio * n * this.m_u2.y;
        a.m_linearVelocity.x += a.m_invMass * k;
        a.m_linearVelocity.y += a.m_invMass * l;
        a.m_angularVelocity += a.m_invI * (f * l - g * k);
        c.m_linearVelocity.x += c.m_invMass * m;
        c.m_linearVelocity.y += c.m_invMass * n;
        c.m_angularVelocity += c.m_invI * (h * n - e * m);
        this.m_limitState1 == b2Joint.e_atUpperLimit && (k = a.m_linearVelocity.x + -a.m_angularVelocity * g, l = a.m_linearVelocity.y + a.m_angularVelocity *
            f, k = -(this.m_u1.x * k + this.m_u1.y * l), n = -this.m_limitMass1 * k, k = this.m_limitImpulse1, this.m_limitImpulse1 = b2Math.b2Max(0, this.m_limitImpulse1 + n), n = this.m_limitImpulse1 - k, k = -n * this.m_u1.x, l = -n * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * k, a.m_linearVelocity.y += a.m_invMass * l, a.m_angularVelocity += a.m_invI * (f * l - g * k));
        this.m_limitState2 == b2Joint.e_atUpperLimit && (m = c.m_linearVelocity.x + -c.m_angularVelocity * e, n = c.m_linearVelocity.y + c.m_angularVelocity * h, k = -(this.m_u2.x * m + this.m_u2.y * n), n = -this.m_limitMass2 *
            k, k = this.m_limitImpulse2, this.m_limitImpulse2 = b2Math.b2Max(0, this.m_limitImpulse2 + n), n = this.m_limitImpulse2 - k, m = -n * this.m_u2.x, n = -n * this.m_u2.y, c.m_linearVelocity.x += c.m_invMass * m, c.m_linearVelocity.y += c.m_invMass * n, c.m_angularVelocity += c.m_invI * (h * n - e * m))
    },
    SolvePositionConstraints: function() {
        var a = this.m_body1,
            c = this.m_body2,
            e, f = this.m_ground.m_position.x + this.m_groundAnchor1.x,
            g = this.m_ground.m_position.y + this.m_groundAnchor1.y,
            h = this.m_ground.m_position.x + this.m_groundAnchor2.x,
            k = this.m_ground.m_position.y +
            this.m_groundAnchor2.y,
            l, m, n, p, q, r, s, t = 0;
        e = a.m_R;
        l = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y;
        m = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y;
        e = c.m_R;
        n = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y;
        e = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y;
        p = a.m_position.x + l;
        q = a.m_position.y + m;
        r = c.m_position.x + n;
        s = c.m_position.y + e;
        this.m_u1.Set(p - f, q - g);
        this.m_u2.Set(r - h, s - k);
        p = this.m_u1.Length();
        q = this.m_u2.Length();
        p > b2Settings.b2_linearSlop ?
            this.m_u1.Multiply(1 / p) : this.m_u1.SetZero();
        q > b2Settings.b2_linearSlop ? this.m_u2.Multiply(1 / q) : this.m_u2.SetZero();
        p = this.m_constant - p - this.m_ratio * q;
        t = b2Math.b2Max(t, Math.abs(p));
        p = b2Math.b2Clamp(p, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
        s = -this.m_pulleyMass * p;
        p = -s * this.m_u1.x;
        q = -s * this.m_u1.y;
        r = -this.m_ratio * s * this.m_u2.x;
        s = -this.m_ratio * s * this.m_u2.y;
        a.m_position.x += a.m_invMass * p;
        a.m_position.y += a.m_invMass * q;
        a.m_rotation += a.m_invI * (l * q - m * p);
        c.m_position.x += c.m_invMass *
            r;
        c.m_position.y += c.m_invMass * s;
        c.m_rotation += c.m_invI * (n * s - e * r);
        a.m_R.Set(a.m_rotation);
        c.m_R.Set(c.m_rotation);
        this.m_limitState1 == b2Joint.e_atUpperLimit && (e = a.m_R, l = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y, m = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y, p = a.m_position.x + l, q = a.m_position.y + m, this.m_u1.Set(p - f, q - g), p = this.m_u1.Length(), p > b2Settings.b2_linearSlop ? (this.m_u1.x *= 1 / p, this.m_u1.y *= 1 / p) : this.m_u1.SetZero(), p = this.m_maxLength1 - p, t = b2Math.b2Max(t, -p),
            p = b2Math.b2Clamp(p + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0), s = -this.m_limitMass1 * p, f = this.m_limitPositionImpulse1, this.m_limitPositionImpulse1 = b2Math.b2Max(0, this.m_limitPositionImpulse1 + s), s = this.m_limitPositionImpulse1 - f, p = -s * this.m_u1.x, q = -s * this.m_u1.y, a.m_position.x += a.m_invMass * p, a.m_position.y += a.m_invMass * q, a.m_rotation += a.m_invI * (l * q - m * p), a.m_R.Set(a.m_rotation));
        this.m_limitState2 == b2Joint.e_atUpperLimit && (e = c.m_R, n = e.col1.x * this.m_localAnchor2.x + e.col2.x * this.m_localAnchor2.y,
            e = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y, r = c.m_position.x + n, s = c.m_position.y + e, this.m_u2.Set(r - h, s - k), q = this.m_u2.Length(), q > b2Settings.b2_linearSlop ? (this.m_u2.x *= 1 / q, this.m_u2.y *= 1 / q) : this.m_u2.SetZero(), p = this.m_maxLength2 - q, t = b2Math.b2Max(t, -p), p = b2Math.b2Clamp(p + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0), s = -this.m_limitMass2 * p, f = this.m_limitPositionImpulse2, this.m_limitPositionImpulse2 = b2Math.b2Max(0, this.m_limitPositionImpulse2 + s), s = this.m_limitPositionImpulse2 -
            f, r = -s * this.m_u2.x, s = -s * this.m_u2.y, c.m_position.x += c.m_invMass * r, c.m_position.y += c.m_invMass * s, c.m_rotation += c.m_invI * (n * s - e * r), c.m_R.Set(c.m_rotation));
        return t < b2Settings.b2_linearSlop
    },
    m_ground: null,
    m_groundAnchor1: new b2Vec2,
    m_groundAnchor2: new b2Vec2,
    m_localAnchor1: new b2Vec2,
    m_localAnchor2: new b2Vec2,
    m_u1: new b2Vec2,
    m_u2: new b2Vec2,
    m_constant: null,
    m_ratio: null,
    m_maxLength1: null,
    m_maxLength2: null,
    m_pulleyMass: null,
    m_limitMass1: null,
    m_limitMass2: null,
    m_pulleyImpulse: null,
    m_limitImpulse1: null,
    m_limitImpulse2: null,
    m_limitPositionImpulse1: null,
    m_limitPositionImpulse2: null,
    m_limitState1: 0,
    m_limitState2: 0
});
b2PulleyJoint.b2_minPulleyLength = b2Settings.b2_lengthUnitsPerMeter;
var b2PulleyJointDef = Class.create();
Object.extend(b2PulleyJointDef.prototype, b2JointDef.prototype);
Object.extend(b2PulleyJointDef.prototype, {
    initialize: function() {
        this.type = b2Joint.e_unknownJoint;
        this.body2 = this.body1 = this.userData = null;
        this.collideConnected = !1;
        this.groundPoint1 = new b2Vec2;
        this.groundPoint2 = new b2Vec2;
        this.anchorPoint1 = new b2Vec2;
        this.anchorPoint2 = new b2Vec2;
        this.type = b2Joint.e_pulleyJoint;
        this.groundPoint1.Set(-1, 1);
        this.groundPoint2.Set(1, 1);
        this.anchorPoint1.Set(-1, 0);
        this.anchorPoint2.Set(1, 0);
        this.maxLength1 = .5 * b2PulleyJoint.b2_minPulleyLength;
        this.maxLength2 = .5 * b2PulleyJoint.b2_minPulleyLength;
        this.ratio = 1;
        this.collideConnected = !0
    },
    groundPoint1: new b2Vec2,
    groundPoint2: new b2Vec2,
    anchorPoint1: new b2Vec2,
    anchorPoint2: new b2Vec2,
    maxLength1: null,
    maxLength2: null,
    ratio: null
});
var b2RevoluteJoint = Class.create();
Object.extend(b2RevoluteJoint.prototype, b2Joint.prototype);
Object.extend(b2RevoluteJoint.prototype, {
    GetAnchor1: function() {
        var a = this.m_body1.m_R;
        return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
    },
    GetAnchor2: function() {
        var a = this.m_body2.m_R;
        return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y *
            this.m_localAnchor2.y))
    },
    GetJointAngle: function() {
        return this.m_body2.m_rotation - this.m_body1.m_rotation
    },
    GetJointSpeed: function() {
        return this.m_body2.m_angularVelocity - this.m_body1.m_angularVelocity
    },
    GetMotorTorque: function(a) {
        return a * this.m_motorImpulse
    },
    SetMotorSpeed: function(a) {
        this.m_motorSpeed = a
    },
    SetMotorTorque: function(a) {
        this.m_maxMotorTorque = a
    },
    GetReactionForce: function(a) {
        var c = this.m_ptpImpulse.Copy();
        c.Multiply(a);
        return c
    },
    GetReactionTorque: function(a) {
        return a * this.m_limitImpulse
    },
    initialize: function(a) {
        this.m_node1 = new b2JointNode;
        this.m_node2 = new b2JointNode;
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_body1 = a.body1;
        this.m_body2 = a.body2;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData;
        this.K = new b2Mat22;
        this.K1 = new b2Mat22;
        this.K2 = new b2Mat22;
        this.K3 = new b2Mat22;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_ptpImpulse = new b2Vec2;
        this.m_ptpMass = new b2Mat22;
        var c, e, f;
        c = this.m_body1.m_R;
        e = a.anchorPoint.x -
            this.m_body1.m_position.x;
        f = a.anchorPoint.y - this.m_body1.m_position.y;
        this.m_localAnchor1.x = e * c.col1.x + f * c.col1.y;
        this.m_localAnchor1.y = e * c.col2.x + f * c.col2.y;
        c = this.m_body2.m_R;
        e = a.anchorPoint.x - this.m_body2.m_position.x;
        f = a.anchorPoint.y - this.m_body2.m_position.y;
        this.m_localAnchor2.x = e * c.col1.x + f * c.col1.y;
        this.m_localAnchor2.y = e * c.col2.x + f * c.col2.y;
        this.m_intialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
        this.m_ptpImpulse.Set(0, 0);
        this.m_limitPositionImpulse = this.m_limitImpulse = this.m_motorImpulse =
            0;
        this.m_lowerAngle = a.lowerAngle;
        this.m_upperAngle = a.upperAngle;
        this.m_maxMotorTorque = a.motorTorque;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor
    },
    K: new b2Mat22,
    K1: new b2Mat22,
    K2: new b2Mat22,
    K3: new b2Mat22,
    PrepareVelocitySolver: function() {
        var a = this.m_body1,
            c = this.m_body2,
            e;
        e = a.m_R;
        var f = e.col1.x * this.m_localAnchor1.x + e.col2.x * this.m_localAnchor1.y,
            g = e.col1.y * this.m_localAnchor1.x + e.col2.y * this.m_localAnchor1.y;
        e = c.m_R;
        var h = e.col1.x * this.m_localAnchor2.x +
            e.col2.x * this.m_localAnchor2.y;
        e = e.col1.y * this.m_localAnchor2.x + e.col2.y * this.m_localAnchor2.y;
        var k = a.m_invMass,
            l = c.m_invMass,
            m = a.m_invI,
            n = c.m_invI;
        this.K1.col1.x = k + l;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = k + l;
        this.K2.col1.x = m * g * g;
        this.K2.col2.x = -m * f * g;
        this.K2.col1.y = -m * f * g;
        this.K2.col2.y = m * f * f;
        this.K3.col1.x = n * e * e;
        this.K3.col2.x = -n * h * e;
        this.K3.col1.y = -n * h * e;
        this.K3.col2.y = n * h * h;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.AddM(this.K3);
        this.K.Invert(this.m_ptpMass);
        this.m_motorMass =
            1 / (m + n);
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        if (this.m_enableLimit) {
            var p = c.m_rotation - a.m_rotation - this.m_intialAngle;
            b2Math.b2Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2Settings.b2_angularSlop ? this.m_limitState = b2Joint.e_equalLimits : p <= this.m_lowerAngle ? (this.m_limitState != b2Joint.e_atLowerLimit && (this.m_limitImpulse = 0), this.m_limitState = b2Joint.e_atLowerLimit) : p >= this.m_upperAngle ? (this.m_limitState != b2Joint.e_atUpperLimit && (this.m_limitImpulse = 0), this.m_limitState = b2Joint.e_atUpperLimit) :
                (this.m_limitState = b2Joint.e_inactiveLimit, this.m_limitImpulse = 0)
        } else this.m_limitImpulse = 0;
        b2World.s_enableWarmStarting ? (a.m_linearVelocity.x -= k * this.m_ptpImpulse.x, a.m_linearVelocity.y -= k * this.m_ptpImpulse.y, a.m_angularVelocity -= m * (f * this.m_ptpImpulse.y - g * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse), c.m_linearVelocity.x += l * this.m_ptpImpulse.x, c.m_linearVelocity.y += l * this.m_ptpImpulse.y, c.m_angularVelocity += n * (h * this.m_ptpImpulse.y - e * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse)) :
            (this.m_ptpImpulse.SetZero(), this.m_limitImpulse = this.m_motorImpulse = 0);
        this.m_limitPositionImpulse = 0
    },
    SolveVelocityConstraints: function(a) {
        var c = this.m_body1,
            e = this.m_body2,
            f;
        f = c.m_R;
        var g = f.col1.x * this.m_localAnchor1.x + f.col2.x * this.m_localAnchor1.y,
            h = f.col1.y * this.m_localAnchor1.x + f.col2.y * this.m_localAnchor1.y;
        f = e.m_R;
        var k = f.col1.x * this.m_localAnchor2.x + f.col2.x * this.m_localAnchor2.y;
        f = f.col1.y * this.m_localAnchor2.x + f.col2.y * this.m_localAnchor2.y;
        var l = e.m_linearVelocity.x + -e.m_angularVelocity *
            f - c.m_linearVelocity.x - -c.m_angularVelocity * h,
            m = e.m_linearVelocity.y + e.m_angularVelocity * k - c.m_linearVelocity.y - c.m_angularVelocity * g,
            n = -(this.m_ptpMass.col1.x * l + this.m_ptpMass.col2.x * m),
            l = -(this.m_ptpMass.col1.y * l + this.m_ptpMass.col2.y * m);
        this.m_ptpImpulse.x += n;
        this.m_ptpImpulse.y += l;
        c.m_linearVelocity.x -= c.m_invMass * n;
        c.m_linearVelocity.y -= c.m_invMass * l;
        c.m_angularVelocity -= c.m_invI * (g * l - h * n);
        e.m_linearVelocity.x += e.m_invMass * n;
        e.m_linearVelocity.y += e.m_invMass * l;
        e.m_angularVelocity += e.m_invI *
            (k * l - f * n);
        this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits && (g = -this.m_motorMass * (e.m_angularVelocity - c.m_angularVelocity - this.m_motorSpeed), h = this.m_motorImpulse, this.m_motorImpulse = b2Math.b2Clamp(this.m_motorImpulse + g, -a.dt * this.m_maxMotorTorque, a.dt * this.m_maxMotorTorque), g = this.m_motorImpulse - h, c.m_angularVelocity -= c.m_invI * g, e.m_angularVelocity += e.m_invI * g);
        this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit && (g = -this.m_motorMass * (e.m_angularVelocity - c.m_angularVelocity),
            this.m_limitState == b2Joint.e_equalLimits ? this.m_limitImpulse += g : this.m_limitState == b2Joint.e_atLowerLimit ? (a = this.m_limitImpulse, this.m_limitImpulse = b2Math.b2Max(this.m_limitImpulse + g, 0), g = this.m_limitImpulse - a) : this.m_limitState == b2Joint.e_atUpperLimit && (a = this.m_limitImpulse, this.m_limitImpulse = b2Math.b2Min(this.m_limitImpulse + g, 0), g = this.m_limitImpulse - a), c.m_angularVelocity -= c.m_invI * g, e.m_angularVelocity += e.m_invI * g)
    },
    SolvePositionConstraints: function() {
        var a, c = this.m_body1,
            e = this.m_body2,
            f =
            0,
            f = c.m_R,
            g = f.col1.x * this.m_localAnchor1.x + f.col2.x * this.m_localAnchor1.y,
            h = f.col1.y * this.m_localAnchor1.x + f.col2.y * this.m_localAnchor1.y,
            f = e.m_R;
        a = f.col1.x * this.m_localAnchor2.x + f.col2.x * this.m_localAnchor2.y;
        var k = f.col1.y * this.m_localAnchor2.x + f.col2.y * this.m_localAnchor2.y,
            l = e.m_position.x + a - (c.m_position.x + g),
            m = e.m_position.y + k - (c.m_position.y + h),
            f = Math.sqrt(l * l + m * m),
            n = c.m_invMass,
            p = e.m_invMass,
            q = c.m_invI,
            r = e.m_invI;
        this.K1.col1.x = n + p;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = n + p;
        this.K2.col1.x =
            q * h * h;
        this.K2.col2.x = -q * g * h;
        this.K2.col1.y = -q * g * h;
        this.K2.col2.y = q * g * g;
        this.K3.col1.x = r * k * k;
        this.K3.col2.x = -r * a * k;
        this.K3.col1.y = -r * a * k;
        this.K3.col2.y = r * a * a;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.AddM(this.K3);
        this.K.Solve(b2RevoluteJoint.tImpulse, -l, -m);
        l = b2RevoluteJoint.tImpulse.x;
        m = b2RevoluteJoint.tImpulse.y;
        c.m_position.x -= c.m_invMass * l;
        c.m_position.y -= c.m_invMass * m;
        c.m_rotation -= c.m_invI * (g * m - h * l);
        c.m_R.Set(c.m_rotation);
        e.m_position.x += e.m_invMass * l;
        e.m_position.y += e.m_invMass * m;
        e.m_rotation +=
            e.m_invI * (a * m - k * l);
        e.m_R.Set(e.m_rotation);
        g = 0;
        this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit && (a = e.m_rotation - c.m_rotation - this.m_intialAngle, h = 0, this.m_limitState == b2Joint.e_equalLimits ? (a = b2Math.b2Clamp(a, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection), h = -this.m_motorMass * a, g = b2Math.b2Abs(a)) : this.m_limitState == b2Joint.e_atLowerLimit ? (a -= this.m_lowerAngle, g = b2Math.b2Max(0, -a), a = b2Math.b2Clamp(a + b2Settings.b2_angularSlop, -b2Settings.b2_maxAngularCorrection,
                0), h = -this.m_motorMass * a, a = this.m_limitPositionImpulse, this.m_limitPositionImpulse = b2Math.b2Max(this.m_limitPositionImpulse + h, 0), h = this.m_limitPositionImpulse - a) : this.m_limitState == b2Joint.e_atUpperLimit && (a -= this.m_upperAngle, g = b2Math.b2Max(0, a), a = b2Math.b2Clamp(a - b2Settings.b2_angularSlop, 0, b2Settings.b2_maxAngularCorrection), h = -this.m_motorMass * a, a = this.m_limitPositionImpulse, this.m_limitPositionImpulse = b2Math.b2Min(this.m_limitPositionImpulse + h, 0), h = this.m_limitPositionImpulse - a), c.m_rotation -=
            c.m_invI * h, c.m_R.Set(c.m_rotation), e.m_rotation += e.m_invI * h, e.m_R.Set(e.m_rotation));
        return f <= b2Settings.b2_linearSlop && g <= b2Settings.b2_angularSlop
    },
    m_localAnchor1: new b2Vec2,
    m_localAnchor2: new b2Vec2,
    m_ptpImpulse: new b2Vec2,
    m_motorImpulse: null,
    m_limitImpulse: null,
    m_limitPositionImpulse: null,
    m_ptpMass: new b2Mat22,
    m_motorMass: null,
    m_intialAngle: null,
    m_lowerAngle: null,
    m_upperAngle: null,
    m_maxMotorTorque: null,
    m_motorSpeed: null,
    m_enableLimit: null,
    m_enableMotor: null,
    m_limitState: 0
});
b2RevoluteJoint.tImpulse = new b2Vec2;
var b2RevoluteJointDef = Class.create();
Object.extend(b2RevoluteJointDef.prototype, b2JointDef.prototype);
Object.extend(b2RevoluteJointDef.prototype, {
    initialize: function() {
        this.type = b2Joint.e_unknownJoint;
        this.body2 = this.body1 = this.userData = null;
        this.collideConnected = !1;
        this.type = b2Joint.e_revoluteJoint;
        this.anchorPoint = new b2Vec2(0, 0);
        this.motorSpeed = this.motorTorque = this.upperAngle = this.lowerAngle = 0;
        this.enableMotor = this.enableLimit = !1
    },
    anchorPoint: null,
    lowerAngle: null,
    upperAngle: null,
    motorTorque: null,
    motorSpeed: null,
    enableLimit: null,
    enableMotor: null
});

function drawWorld(a, c) {
    for (var e = a.m_jointList; e; e = e.m_next) drawJoint(a, e, c);
    for (e = a.m_bodyList; e; e = e.m_next)
        for (var f = e.GetShapeList(); null != f; f = f.GetNext()) drawShape(f, c)
}

function drawJoint(a, c, e, f) {
    var g = c.m_body1,
        h = c.m_body2,
        k = g.m_position,
        l = h.m_position,
        m = c.GetAnchor1(),
        n = c.GetAnchor2();
    f || (f = "#00f");
    switch (c.m_type) {
        case b2Joint.e_distanceJoint:
            e.drawLine(m.x, m.y, n.x, n.y, 1, f);
            break;
        case b2Joint.e_pulleyJoint:
            break;
        default:
            g == a.m_groundBody ? e.drawLine(m.x, m.y, l.x, l.y, 1, f) : h == a.m_groundBody ? e.drawLine(m.x, m.y, k.x, k.y, 1, f) : (e.drawLine(k.x, k.y, m.x, m.y, 1, f), e.drawLine(m.x, m.y, l.x, l.y, 1, f), e.drawLine(l.x, l.y, n.x, n.y, 1, f))
    }
}

function drawShape(a, c) {
    switch (a.m_type) {
        case b2Shape.e_circleShape:
            for (var e = a.m_position, f = a.m_radius, g = 0, h = 2 * Math.PI / 16, k = e.x + f, l = e.y, m = 0; 16 > m; m++) {
                var n = new b2Vec2(f * Math.cos(g), f * Math.sin(g)),
                    n = b2Math.AddVV(e, n);
                c.drawLine(k, l, n.x, n.y, 1, "#33f");
                k = n.x;
                l = n.y;
                g += h
            }
            c.drawLine(k, l, e.x + f, e.y, 1, "#33f");
            k = a.m_R.col1;
            f = new b2Vec2(e.x + f * k.x, e.y + f * k.y);
            c.drawLine(e.x, e.y, f.x, f.y, 1, "#33f");
            break;
        case b2Shape.e_polyShape:
            e = b2Math.AddVV(a.m_position, b2Math.b2MulMV(a.m_R, a.m_vertices[0]));
            k = e.x;
            l = e.y;
            for (m =
                0; m < a.m_vertexCount; m++) n = b2Math.AddVV(a.m_position, b2Math.b2MulMV(a.m_R, a.m_vertices[m])), c.drawLine(k, l, n.x, n.y, 1, "#fff"), k = n.x, l = n.y;
            c.drawLine(k, l, e.x, e.y, 1, "#fff")
    }
}
var stage, world, mc, fps = 24,
    bitmaps, GET, data = [],
    LANDSCAPE_MODE = !0,
    STATE_LOAD = 0,
    STATE_LOGO = 1,
    STATE_MENU = 2,
    STATE_GAME = 3,
    STATE_PAUSE = 4,
    STATE_VICTORY = 5,
    STATE_LEVELMAP = 6,
    STATE_ALL_VICTORY = 7,
    STATE_LOOSE = 8,
    BREAK_VELOCITY = 300,
    BOMB_FORCE = 2E3,
    gameState = STATE_LOAD,
    gameScore, totalscore, curLevel = 0,
    lastLevel = -1,
    isIngameMusic, isSomeBombActive, isSoundOn = !0,
    mixer, zombies, showDebugDraw = !1,
    cannonMount, cannon, bodyCannon;
window.onload = function() {
    GET = Utils.parseGet();
    Utils.addMobileListeners(LANDSCAPE_MODE);
    Utils.mobileCorrectPixelRatio();
    Utils.addFitLayoutListeners();
    ExternalAPI.init();
    setTimeout(startLoad, 600)
};

function startLoad() {
    var a = Utils.getMobileScreenResolution(LANDSCAPE_MODE);
    1 == GET.debug && (a = Utils.getScaleScreenResolution(1, LANDSCAPE_MODE));
    Utils.globalScale = a.scale;
    Utils.createLayout(document.getElementById("main_container"), a);
    Utils.addEventListener("fitlayout", function() {
        stage && (stage.drawScene(document.getElementById("screen")), buildBackground())
    });
    Utils.addEventListener("lockscreen", function() {
        stage && stage.started && stage.stop()
    });
    Utils.addEventListener("unlockscreen", function() {
        stage && !stage.started &&
            stage.start()
    });
    Utils.mobileHideAddressBar();
    1 != GET.debug && Utils.checkOrientation(LANDSCAPE_MODE);
    for (var a = Utils.imagesRoot + "/" + Utils.globalScale + "/", c = new ImagesPreloader, e = 0; e < objects.length; e++) data.push({
        name: objects[e].name,
        src: a + objects[e].image
    });
    data.push({
        name: "hourglass",
        src: a + "hourglass.png"
    });
    data.push({
        name: "Button_Play",
        src: a + "UI/Buttons_Menu/Button_Play.png"
    });
    data.push({
        name: "Button_LevelMap",
        src: a + "UI/Buttons_Menu/Button_LevelMap.png"
    });
    data.push({
        name: "Button_Ingame_Menu",
        src: a +
            "UI/Buttons_Ingame/Button_Ingame_Menu.png"
    });
    data.push({
        name: "Button_Ingame_Restart",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Restart.png"
    });
    data.push({
        name: "gun",
        src: a + "Objects/Gameplay_Objects/gun.png"
    });
    data.push({
        name: "Animation_Sponsor_Happy",
        src: a + "Animations/Animation_Sponsor_Happy/Animation_Sponsor_Happy.png"
    });
    data.push({
        name: "Animation_Sponsor_Sad",
        src: a + "Animations/Animation_Sponsor_Sad/Animation_Sponsor_Sad.png"
    });
    data.push({
        name: "bomb_explosion",
        src: a + "Animations/bomb_explosion/bomb_explosion.png"
    });
    data.push({
        name: "bomb_fuse",
        src: a + "Animations/bomb_fuse/bomb_fuse_3.png"
    });
    data.push({
        name: "gun_fire",
        src: a + "Animations/gun_fire/gun_fire.png"
    });
    data.push({
        name: "orangeBounce_m",
        src: a + "Animations/orangeBounce_m/orangeBounce_m.png"
    });
    data.push({
        name: "orangeJump_m",
        src: a + "Animations/orangeJump_m/orangeJump_m.png"
    });
    data.push({
        name: "orangeRotation_m",
        src: a + "Animations/orangeRotation_m/orangeRotation_m.png"
    });
    data.push({
        name: "orangeTremble_m",
        src: a + "Animations/orangeTremble_m/orangeTremble_m.png"
    });
    data.push({
        name: "zombie_disappearance",
        src: a + "Animations/zombie_disappearance/zombie_disappearance.png"
    });
    data.push({
        name: "Button_Hint",
        src: a + "UI/Buttons_Ingame/Button_Hint.png"
    });
    data.push({
        name: "Button_Ingame_Back",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Back.png"
    });
    data.push({
        name: "Button_Ingame_Forward",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Forward.png"
    });
    data.push({
        name: "Button_Ingame_Hint_MC",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Hint_MC.png"
    });
    data.push({
        name: "Button_Ingame_Menu",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Menu.png"
    });
    data.push({
        name: "Button_Ingame_Next",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Next.png"
    });
    data.push({
        name: "Button_Ingame_No",
        src: a + "UI/Buttons_Ingame/Button_Ingame_No.png"
    });
    data.push({
        name: "Button_Ingame_Pause",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Pause.png"
    });
    data.push({
        name: "Button_Ingame_Question",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Question.png"
    });
    data.push({
        name: "Button_Ingame_Reset",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Reset.png"
    });
    data.push({
        name: "Button_Ingame_Restart",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Restart.png"
    });
    data.push({
        name: "Button_Ingame_SoundToggle",
        src: a + "UI/Buttons_Ingame/Button_Ingame_SoundToggle.png"
    });
    data.push({
        name: "Button_Ingame_Sponsor",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Sponsor_.png"
    });
    data.push({
        name: "Button_Ingame_Yes",
        src: a + "UI/Buttons_Ingame/Button_Ingame_Yes.png"
    });
    data.push({
        name: "Button_Credits",
        src: a + "UI/Buttons_Menu/Button_Credits.png"
    });
    data.push({
        name: "Button_Level_MC",
        src: a + "UI/Buttons_Menu/Button_Level_MC.png"
    });
    data.push({
        name: "Button_LevelLocked",
        src: a + "UI/Buttons_Menu/Button_LevelLocked.png"
    });
    data.push({
        name: "Button_LevelMap",
        src: a + "UI/Buttons_Menu/Button_LevelMap.png"
    });
    data.push({
        name: "Button_MoreGames",
        src: a + "UI/Buttons_Menu/Button_MoreGames.png"
    });
    data.push({
        name: "Button_Play",
        src: a + "UI/Buttons_Menu/Button_Play.png"
    });
    data.push({
        name: "Button_PlayAgain",
        src: a + "UI/Buttons_Menu/Button_PlayAgain.png"
    });
    data.push({
        name: "Button_Restart",
        src: a + "UI/Buttons_Menu/Button_Restart.png"
    });
    data.push({
        name: "Button_Resume",
        src: a + "UI/Buttons_Menu/Button_Resume.png"
    });
    data.push({
        name: "Button_StartGame",
        src: a + "UI/Buttons_Menu/Button_StartGame.png"
    });
    data.push({
        name: "hint1_s",
        src: a + "UI/Hints/hint1_s.png"
    });
    data.push({
        name: "hint1_s_small",
        src: a + "UI/Hints/hint1_s_small.png"
    });
    data.push({
        name: "hint2_s",
        src: a + "UI/Hints/hint2_s.png"
    });
    data.push({
        name: "hint2_s_small",
        src: a + "UI/Hints/hint2_s_small.png"
    });
    data.push({
        name: "hint3_s",
        src: a + "UI/Hints/hint3_s.png"
    });
    data.push({
        name: "hint3_s_small",
        src: a + "UI/Hints/hint3_s_small.png"
    });
    data.push({
        name: "Menu_Fail",
        src: a + "UI/Menus/Menu_Fail.png"
    });
    data.push({
        name: "Menu_Interlevel_2",
        src: a + "UI/Menus/Menu_Interlevel_2_part_up.png"
    });
    data.push({
        name: "Menu_Interlevel_4",
        src: a + "UI/Menus/Menu_Interlevel_4_part_up.png"
    });
    data.push({
        name: "Menu_InterlevelAuxiliary",
        src: a + "UI/Menus/Menu_InterlevelAuxiliary.png"
    });
    data.push({
        name: "Menu_LevelMap",
        src: a + "UI/Menus/Menu_LevelMap.png"
    });
    data.push({
        name: "Menu_Pause",
        src: a + "UI/Menus/Menu_Pause.png"
    });
    data.push({
        name: "Menu_Victory",
        src: a + "UI/Menus/Menu_Victory1.png"
    });
    data.push({
        name: "text_MC",
        src: a + "UI/Menus/text_MC_1.png"
    });
    data.push({
        name: "Award_highscore",
        src: a + "UI/Menus/Award_LevelResults_highscore.png"
    });
    data.push({
        name: "Award_score",
        src: a + "UI/Menus/Award_LevelResults_score.png"
    });
    data.push({
        name: "Award_highscore_S",
        src: a + "UI/Menus/Award_LevelResults_S_highscore.png"
    });
    data.push({
        name: "Award_score_S",
        src: a + "UI/Menus/Award_LevelResults_S_score.png"
    });
    data.push({
        name: "Num_in_game",
        src: a + "UI/Numbers/Num_in_game.png"
    });
    data.push({
        name: "Num_level_map_level_victory",
        src: a + "UI/Numbers/Num_level_map_level_victory.png"
    });
    data.push({
        name: "Num_victory",
        src: a +
            "UI/Numbers/Num_victory.png"
    });
    data.push({
        name: "Num_victory_new",
        src: a + "UI/Numbers/Num_victory_new.png"
    });
    data.push({
        name: "btn_more_games",
        src: a + "btn_more_games.png"
    });
    for (e = 1; 25 >= e; e++) data.push({
        name: e + "",
        src: a + "Backs/" + e + ".jpg"
    });
    data.push({
        name: "Background_Main",
        src: a + "Backs/Background_Main.jpg"
    });
    TTLoader.create(loadImagesEnd, !0, 1 == GET.debug);
    c.load(data, TTLoader.loadComplete, TTLoader.showLoadProgress)
}

function loadImagesEnd(a) {
    document.getElementById("progress_container").style.display = "none";
    document.getElementById("screen_container").style.display = "block";
    document.getElementById("screen_background_container").style.display = "block";
    bitmaps = a;
    getLevelsScores();
    mixer = new AudioMixer("Music", 5);
    1 != GET.debug && ExternalAPI.showCompanyLogo(showMenu)
}

function showMenu() {
    gameState = STATE_MENU;
    createScene();
    ExternalAPI.exec("showCopyright")
}

function createStage() {
    stage && (stage.destroy(), stage.stop());
    stage = new Stage("screen", 480, 320, !1);
    stage.delay = 1E3 / fps;
    stage.onpretick = preTick;
    stage.onposttick = postTick;
    stage.ceilSizes = !0;
    stage.showFPS = !1
}

function createScene() {
    createStage();
    isSoundOn && !1 !== isIngameMusic && (mixer.play("menu", !0, !0, 0), isIngameMusic = !1);
    mc = new Sprite(bitmaps.Background_Main, 480, 320, 1);
    mc.x = 240;
    mc.y = 160;
    mc.static = !0;
    stage.addChild(mc);
    gameState == STATE_MENU && (mc = 0 <= levelsScores[0] ? new Sprite(bitmaps.Button_Resume, 134, 52, 1) : new Sprite(bitmaps.Button_Play, 134, 52, 1), mc.y = 80, mc.x = 120, mc.static = !0, mc.onclick = function() {
            playBtnSound2();
            prepareLevel(curLevel)
        }, stage.addChild(mc), mc = new Sprite(bitmaps.Button_LevelMap, 134, 52), mc.x =
        120, mc.y = 125, mc.static = !0, mc.onclick = function() {
            playBtnSound2();
            gameState = STATE_LEVELMAP;
            createScene()
        }, stage.addChild(mc), mc = new Sprite(bitmaps.Button_MoreGames, 134, 52), mc.x = 120, mc.y = 170, mc.static = !0, mc.onclick = showMoreGames
                                //, stage.addChild(mc)
                                );
    if (gameState == STATE_LEVELMAP) {
        for (var a = levels.length, c = 0; c < a; c++) 0 <= levelsScores[c] && (lastLevel = c);
        mc = new Sprite(bitmaps.Menu_LevelMap, 284, 271, 1);
        mc.x = 240;
        mc.y = 160;
        mc.static = !0;
        stage.addChild(mc);
        mc = new Sprite(bitmaps.Button_Ingame_Back, 71, 71, 1);
        mc.x = 75;
        mc.y = 160;
        mc.static = !0;
        mc.onclick = function() {
            playBtnSound();
            showMenu()
        };
        stage.addChild(mc);
        mc = new Sprite(bitmaps.btn_more_games, 73, 73);
        mc.x = 405;
        mc.y = 160;
        mc.static = !0;
        mc.onclick = showMoreGames;
        //stage.addChild(mc);
        mc.setPropScale(.8);
        for (c = 0; c < a; c++) {
            var e = new SimpleText(bitmaps.Num_level_map_level_victory, 14, 19);
            bm = c <= lastLevel + 1 ? bitmaps.Button_Level_MC : bitmaps.Button_LevelLocked;
            mc = new Sprite(bm, 45, 45, 1);
            var f = Math.floor(c / 5);
            mc.x = 45 * (c - 5 * f) + 146;
            mc.y = 45 * f + 67;
            mc.static = !0;
            stage.addChild(mc);
            e.align = e.ALIGN_CENTER;
            e.x = mc.x;
            e.y = mc.y;
            e.static = !0;
            e.write(c + 1);
            if (c <= lastLevel + 1) mc.levelId = c, mc.onclick = function(a) {
                playBtnSound2();
                prepareLevel(a.target.levelId)
            };
            else
                for (f = 0; f < e.sprites.length; f++) e.sprites[f].opacity = .5
        }
    }
    gameState == STATE_ALL_VICTORY && (mc = new Sprite(bitmaps.Menu_Victory, 307, 173, 1), mc.x = 240, mc.y = 160, mc.static = !0, stage.addChild(mc), a = getTotalLevelsScores(), c = new SimpleText(bitmaps.Num_victory_new, 17, 20), c.align = c.ALIGN_LEFT, c.x = 241, c.y = 136, c.static = !0, c.write(a), c = new SimpleText(bitmaps.Num_victory_new,
        17, 20), c.align = c.ALIGN_LEFT, c.x = 304, c.y = 163, c.charMap.push("/"), c.static = !0, c.write(curLevel + 1 + "/" + levels.length), mc = new Sprite(bitmaps.Button_MoreGames, 134, 52, 1), mc.x = 240, mc.y = 205, mc.static = !0, mc.onclick = showMoreGames, stage.addChild(mc), mc = new Sprite(bitmaps.Button_Ingame_Back, 71, 71, 1), mc.x = 60, mc.y = 160, mc.static = !0, mc.onclick = function() {
        playBtnSound();
        showMenu()
    }, stage.addChild(mc));
    mc = new Sprite(bitmaps.Button_Ingame_SoundToggle, 71, 71, 2);
    mc.x = 35;
    mc.y = 270;
    isSoundOn ? mc.stop() : mc.gotoAndStop(1);
    mc.onclick =
        toggleSound;
//    stage.addChild(mc);
    buildBackground();
    stage.start()
}

function findObject(a) {
    for (var c = 0; c < objects.length; c++)
        if (objects[c].name == a) return objects[c];
    return !1
}

function prepareLevel(a) {
    stage && (mc = new Sprite(bitmaps.hourglass, 100, 150, 1), mc.x = 240, mc.y = 130, stage.addChild(mc));
    setTimeout("startLevel(" + a + ")", 1E3 / fps * 2)
}

function startLevel(a, c) {
    isSoundOn && !isIngameMusic && (mixer.play("ingame", !0, !0, 0), isIngameMusic = !0);
    world = box2DCreateWorld();
    b2Settings.b2_timeToSleep = .05;
    b2Settings.b2_linearSleepTolerance = 1;
    b2Settings.b2_angularSleepTolerance = .1;
    createStage();
    mc = new Sprite(bitmaps[a + 1], 480, 320, 1);
    mc.x = 240;
    mc.y = 160;
    mc.static = !0;
    mc.onclick = fire;
    stage.addChild(mc);
    var e, f;
    c && (a = 0, levels = [c], gameState = STATE_GAME);
    e = levels[a].objects;
    f = levels[a].joints;
    if (levels[a]) {
        curLevel = a;
        var g, h;
        angle = -.7;
        for (var k = 0; k < e.length; k++) g =
            e[k], h = findObject(g.type), mc = createObject(g, h), "gun_carriage" == g.type && (mc.static = !1, mc.setZIndex(5), cannonMount = mc, cannon = new Sprite(bitmaps.gun, 100, 55, 1), cannon.force = g.custom ? g.custom : 1E3, cannon.x = mc.x, cannon.y = mc.y - 10, cannon.setZIndex(4), cannon.rotation = angle, stage.addChild(cannon));
        gameScore = 301;
        zombies = [];
        isSomeBombActive = !1;
        if (f)
            for (k = 0; k < f.length; k++) e = f[k], g = getBodyByPoint(e.point1), h = getBodyByPoint(e.point2 ? e.point2 : e.point1, g), 0 == e.type && box2DCreateRevoluteJoint(world, g, h, e.point1, e.custom),
                1 == e.type && box2DCreateDistanceJoint(world, g, h, e.point1, e.point2), 2 == e.type && box2DCreatePrismaticJoint(world, g, h, e.point2, e.custom);
        gameState = STATE_GAME;
        mc = new Sprite(bitmaps.text_MC, 161, 20, 1);
        mc.x = 90;
        mc.y = 18;
        stage.addChild(mc);
        mc = new Sprite(bitmaps.Button_Ingame_Menu, 71, 71, 1);
        mc.x = 30;
        mc.y = 290;
        mc.onclick = function() {
            playBtnSound();
            gameState == STATE_GAME && showMenu()
        };
        stage.addChild(mc);
        mc = new Sprite(bitmaps.Button_Ingame_SoundToggle, 71, 71, 2);
        mc.x = 80;
        mc.y = 290;
        isSoundOn ? mc.stop() : mc.gotoAndStop(1);
        mc.onclick =
            function(a) {
                if (gameState == STATE_GAME) return toggleSound(a), !1
            };
//        stage.addChild(mc);
        mc = new Sprite(bitmaps.Button_Ingame_Pause, 71, 71, 1);
        mc.x = 130;
        mc.y = 290;
        mc.onclick = function() {
            playBtnSound();
            gameState == STATE_GAME && (gameState = STATE_PAUSE, showPause())
        };
        stage.addChild(mc);
        mc = new Sprite(bitmaps.Button_Ingame_Restart, 71, 71, 1);
        mc.x = 180;
        mc.y = 290;
        mc.onclick = function() {
            //window.location.href="objc://"+"gameOver:/0"; //by decamincow
            playBtnSound();
            if (gameState == STATE_GAME) return prepareLevel(curLevel), !1
        };
        stage.addChild(mc);
        mc = new Sprite(bitmaps.btn_more_games, 73, 73);
        mc.x =
            230;
        mc.y = 290;
        mc.static = !0;
        mc.onclick = showMoreGames;
       // stage.addChild(mc);
        mc.setPropScale(.72);
        f = new SimpleText(bitmaps.Num_in_game, 11, 11);
        f.align = f.ALIGN_LEFT;
        f.x = 150;
        f.y = 20;
        f.charMap.push("/");
        f.write(a + 1 + "/" + levels.length);
        buildBackground();
        stage.start();
        drawScore()
    }
}

function destroyZombie(a, c, e) {
    for (var f in a) "joints" != f && (a[f].destroy = !0, world.DestroyBody(a[f].box2dBody));
    for (f = 0; f < a.joints.length; f++) world.DestroyJoint(a.joints[f]);
    e && gameState == STATE_GAME && (mc = new Sprite(bitmaps.zombie_disappearance, 64, 68, 8), mc.x = a.body.x, mc.y = a.body.y, mc.onenterframe = function(a) {
        if (gameState != STATE_GAME || 6 == a.target.currentFrame) a.target.destroy = !0
    }, stage.addChild(mc));
    zombies.splice(c, 1)
}

function fire(a) {
    if (gameState == STATE_GAME) {
        stage.box2dSync(world);
        isSoundOn && mixer.play("cannon", !1);
        gameScore -= 10;
        var c = a.target.x + a.x - cannon.x,
            e = a.target.y + a.y - cannon.y;
        angle = Math.atan2(e, c);
        angle < 7 * Math.PI / 8 && angle > Math.PI / 2 && (angle = 7 * Math.PI / 8);
        angle > Math.PI / 8 && angle <= Math.PI / 2 && (angle = Math.PI / 8);
        cannon.rotation = angle;
        for (a = 0; a < zombies.length; a++)(530 < zombies[a].body.x || -50 > zombies[a].body.x || 370 < zombies[a].body.y) && destroyZombie(zombies[a], a, !1);
        2 < zombies.length && destroyZombie(zombies[0], 0, !0);
        a = {};
        len = Math.sqrt(c * c + e * e);
        c = new Vector(60, 0);
        c.rotate(-angle);
        c.x += cannon.x;
        c.y += cannon.y;
        mc = new Sprite(bitmaps.gun_fire, 54, 60, 8);
        mc.x = c.x;
        mc.y = c.y;
        mc.rotation = cannon.rotation;
        mc.onenterframe = function(a) {
            6 == a.target.currentFrame && (a.target.destroy = !0)
        };
        stage.addChild(mc);
        c = new Vector(30, 0);
        c.rotate(-angle);
        c.x += cannon.x;
        c.y += cannon.y;
        lo = {
            x: c.x,
            y: c.y,
            rotation: 0
        };
        ob = findObject("zombie_torso");
        mc = createObject(lo, ob);
        mc.active = !0;
        mc.name = "zombie_torso";
        mc.obType = ZOMBIE;
        a.body = mc;
        stage.setZIndex(mc,
            2);
        lo = {
            x: c.x - 2,
            y: c.y - 24,
            rotation: 0
        };
        ob = findObject("zombie_head");
        mc = createObject(lo, ob);
        mc.obType = ZOMBIE;
        mc.name = "zombie_head";
        a.head = mc;
        stage.setZIndex(mc, 3);
        lo = {
            x: c.x - 24,
            y: c.y,
            rotation: 0
        };
        ob = findObject("zombie_arm_left");
        mc = createObject(lo, ob);
        mc.obType = ZOMBIE;
        a.hand1 = mc;
        stage.setZIndex(mc, 1);
        lo = {
            x: c.x + 19,
            y: c.y,
            rotation: 0
        };
        ob = findObject("zombie_arm_right");
        mc = createObject(lo, ob);
        mc.obType = ZOMBIE;
        a.hand2 = mc;
        stage.setZIndex(mc, 1);
        lo = {
            x: c.x - 15,
            y: c.y + 26,
            rotation: 0
        };
        ob = findObject("zombie_leg_left");
        mc = createObject(lo, ob);
        mc.obType = ZOMBIE;
        a.leg1 = mc;
        stage.setZIndex(mc, 1);
        lo = {
            x: c.x + 10,
            y: c.y + 26,
            rotation: 0
        };
        ob = findObject("zombie_leg_right");
        mc = createObject(lo, ob);
        mc.obType = ZOMBIE;
        a.leg2 = mc;
        stage.setZIndex(mc, 1);
        a.joints = [];
        a.joints.push(box2DCreateRevoluteJoint(world, a.body.box2dBody, a.head.box2dBody, new b2Vec2(c.x - 2, c.y - 11.5)));
        a.joints.push(box2DCreateRevoluteJoint(world, a.body.box2dBody, a.hand1.box2dBody, new b2Vec2(c.x - 10.5, c.y - 9)));
        a.joints.push(box2DCreateRevoluteJoint(world, a.body.box2dBody,
            a.hand2.box2dBody, new b2Vec2(c.x + 6.5, c.y - 9)));
        a.joints.push(box2DCreateRevoluteJoint(world, a.body.box2dBody, a.leg1.box2dBody, new b2Vec2(c.x - 10, c.y + 12.5)));
        a.joints.push(box2DCreateRevoluteJoint(world, a.body.box2dBody, a.leg2.box2dBody, new b2Vec2(c.x + 4.5, c.y + 12.5)));
        c = a.body.box2dBody;
        c.ApplyImpulse(new b2Vec2(Math.cos(angle) * cannon.force * len, Math.sin(angle) * cannon.force * len), new b2Vec2(c.m_position.x, c.m_position.y));
        c = a.head.box2dBody;
        c.ApplyImpulse(new b2Vec2(Math.cos(angle) * cannon.force * len, Math.sin(angle) *
            cannon.force * len), new b2Vec2(c.m_position.x, c.m_position.y));
        zombies.push(a)
    }
}

function getBodyByPoint(a, c) {
    var e = null;
    if (a && (stack = stage.getObjectsStackByCoord(a.x, a.y, !1), 0 < stack.length))
        for (var f = stack.length - 1; 0 <= f; f--) stack[f].box2dBody && stack[f].box2dBody != c && (e = stack[f].box2dBody);
    e || (e = box2DCreateCircle(world, a.x, a.y, 1, 1, !0, 1, 0, 0));
    return e
}

function createObject(a, c) {
    var e, f, g, h, k, l, m, n, p;
    mc = new Sprite(bitmaps[c.name], c.width, c.height, c.frames);
    mc.x = a.x;
    mc.y = a.y;
    mc.rotation = a.rotation;
    mc.name = c.name;
    stage.addChild(mc);
    if (c.bodyType != NONE) {
        k = "undefined" != typeof a.fixed ? a.fixed : c.fixed;
        f = "undefined" != typeof a.density ? a.density : c.density;
        g = "undefined" != typeof a.restitution ? a.restitution : c.restitution;
        h = "undefined" != typeof a.friction ? a.friction : c.friction;
        0 >= f && (k = !0);
        n = c.bodyWidth ? c.bodyWidth : c.width;
        p = c.bodyHeight ? c.bodyHeight : c.height;
        l = a.x;
        m = a.y;
        c.bodyPosCorrect && (l += c.bodyPosCorrect.x, m += c.bodyPosCorrect.y, mc.syncX = c.bodyPosCorrect.x, mc.syncY = c.bodyPosCorrect.y, mc.onbox2dsync = spritesSync);
        c.bodyType == BOX && (e = box2DCreateBox(world, l, m, n / 2, p / 2, a.rotation, k, f, g, h));
        c.bodyType == CIRCLE && (e = box2DCreateCircle(world, l, m, n / 2, a.rotation, k, f, g, h));
        c.bodyType == POLY && (e = box2DCreatePoly(world, l, m, c.points, a.rotation, k, f, g, h));
        if (c.joints)
            for (f = 0; f < c.joints.length; f++) "pivot" == c.joints[f].type && (g = new Vector(c.joints[f].x, c.joints[f].y), 0 !=
                a.rotation && g.rotate(-a.rotation), g.x += a.x, g.y += a.y, g = box2DCreateCircle(world, g.x, g.y, 1, 0, !0, .01, 0, 0), box2DCreateRevoluteJoint(world, g, e, g.GetCenterPosition()));
        e.sprite = mc;
        mc.box2dBody = e
    }
    1 == GET.debug || !k && c.bodyType != NONE || (mc.static = !0);
    c.type == BOMB && (mc.break_force = a.custom ? 1 * a.custom : BREAK_VELOCITY, mc.force = a.force ? a.force : BOMB_FORCE);
    c.type == NAIL && (mc.static = !1);
    mc.obType = c.type;
    return mc
}

function getLevelsScores() {
    levelsScores = [];
    var a = Utils.getCookie("zombie_launcher_levels_scores") + "";
    "null" != a && (levelsScores = a.split(","));
    for (a = 0; a < levels.length; a++) levelsScores[a] || (levelsScores[a] = -1), levelsScores[a] *= 1
}

function saveLevelsScores() {
    Utils.setCookie("zombie_launcher_levels_scores", levelsScores.join(","))
}

function getTotalLevelsScores() {
    for (var a = 0, c = 0; c < levels.length; c++) 0 <= levelsScores[c] && (a += levelsScores[c]);
    return a
}

function buildBackground() {
    world && stage.box2dSync(world);
    stage.drawScene(document.getElementById("screen_background"), !0)
}

function showHighscores() {
    ExternalAPI.check() && ExternalAPI.showScoreboard(function() {})
}

function submitScores() {
    ExternalAPI.check() && ExternalAPI.checkUserLoggedIn() && insertScores()
}

function insertScores() {
    ExternalAPI.check() && ExternalAPI.submitScores(getTotalLevelsScores())
}

function preTick() {
    var a = [],
        c = [],
        e = [],
        f;
    if (gameState == STATE_GAME) {
        world.Step(1 / (2 * fps), 1);
        world.Step(1 / (2 * fps), 1);
        stage.box2dSync(world);
        for (var g = 0; g < stage.objects.length; g++) stage.objects[g].obType == ORANGE && a.push(stage.objects[g]), stage.objects[g].obType == DYNAMIC && c.push(stage.objects[g]), stage.objects[g].obType == BOMB && e.push(stage.objects[g]);
        f = a.length;
        for (g = 0; g < a.length; g++) {
            var h = a[g];
            if (-20 > h.x || 600 < h.x || 340 < h.y) gameState = STATE_LOOSE, isSoundOn && mixer.play("ouch", !1), stage.setTimeout(levelFailed,
                fps / 2);
            for (var k = h.box2dBody.GetContactList(); k; k = k.next)
                if (k.other.sprite && k.other.sprite.obType == ZOMBIE) {
                    f--;
                    h.destroy = !0;
                    world.DestroyBody(h.box2dBody);
                    k = Math.random(); - 1 != h.name.indexOf("orange_1") ? .5 > k ? (mc = new Sprite(bitmaps.orangeJump_m, 30, 58, 15), k = "sound133") : (mc = new Sprite(bitmaps.orangeRotation_m, 32, 32, 15), k = "sound500") : .5 > k ? (mc = new Sprite(bitmaps.orangeBounce_m, 32, 28, 15), k = "sound391") : (mc = new Sprite(bitmaps.orangeTremble_m, 38, 32, 15), k = "sound412");
                    isSoundOn && mixer.play(k, !1);
                    mc.x = h.x;
                    mc.y =
                        h.y;
                    mc.onenterframe = function(a) {
                        13 == a.target.currentFrame && (a.target.destroy = !0, 0 == f && (gameState = STATE_VICTORY, levelVictory()))
                    };
                    stage.addChild(mc);
                    break
                }
        }
        for (g = 0; g < e.length; g++)
            if (a = e[g], (h = a.box2dBody.GetContactList()) && "chain" != h.other.sprite.name && !isSomeBombActive)
                if (a.box2dBody.GetLinearVelocity().Length() >= a.break_force && !a.fuse) explode(a), isSomeBombActive = a.fuse = !0;
                else
                    for (h = a.box2dBody.GetContactList(); h; h = h.next)
                        if (h.other.GetLinearVelocity().Length() >= a.break_force && !a.fuse || h.other.sprite.obType ==
                            ZOMBIE) {
                            explode(a);
                            isSomeBombActive = a.fuse = !0;
                            break
                        }
        for (g = 0; g < c.length; g++)
            if (e = c[g], 600 < e.x || -100 > e.x || 500 < e.y) e.destroy = !0, world.DestroyBody(e.box2dBody)
    }
}

function explode(a) {
    var c = 0;
    a.bitmap = bitmaps.bomb_fuse;
    a.totalFrames = 3;
    a.gotoAndPlay(0);
    a.animDelay = 2;
    a.onenterframe = function(e) {
        if (gameState == STATE_GAME && (c++, 100 == c)) {
            var f, g = new b2Vec2(a.x, a.y);
            f = new b2AABB;
            var h = g.Copy();
            h.Subtract(new b2Vec2(45, 45));
            var k = g.Copy();
            k.Add(new b2Vec2(45, 45));
            f.minVertex = h;
            f.maxVertex = k;
            h = [];
            world.Query(f, h, 45);
            world.DestroyBody(a.box2dBody);
            e.target.destroy = !0;
            for (k = 0; k < h.length; k++) {
                var l = h[k].GetBody(),
                    m = l.GetCenterPosition().Copy();
                m.Subtract(g);
                f = 1E5 * a.force /
                    m.Length();
                m.Normalize();
                m.Multiply(f);
                l.WakeUp();
                l.ApplyForce(m, l.GetCenterPosition())
            }
            isSoundOn && mixer.play("bomb", !1);
            isSomeBombActive = !1;
            g = new Sprite(bitmaps.bomb_explosion, 68, 70, 11);
            g.x = e.target.x;
            g.y = e.target.y;
            g.onenterframe = function(a) {
                9 == a.target.currentFrame && (a.target.destroy = !0)
            };
            stage.addChild(g)
        }
    }
}

function nextLevel() {
    //window.location.href="objc://"+"gameOver:/0"; //by decamincow
    playBtnSound();
    prepareLevel(curLevel + 1)
}

function levelFailed() {
    gameState == STATE_LOOSE && (mc = new Sprite(bitmaps.Menu_Fail, 456, 351, 1), mc.x = 240, mc.y = 160, stage.addChild(mc), mc = new Sprite(bitmaps.Button_Restart, 134, 52, 1), mc.x = 240, mc.y = 185, mc.onclick = function() {
        playBtnSound2();
        prepareLevel(curLevel)
    }, stage.addChild(mc), ExternalAPI.exec("showAds"))
}

function levelVictory() {
    var a;
    if (gameState == STATE_VICTORY) {
        levelsScores[curLevel] < gameScore ? (levelsScores[curLevel] = gameScore, saveLevelsScores(), a = bitmaps.Menu_Interlevel_4) : a = bitmaps.Menu_Interlevel_2;
        popup = new SpritesGroup(stage);
        popup.x = 240;
        popup.y = 130;
        mc = new Sprite(bitmaps.Menu_InterlevelAuxiliary, 268, 87);
        mc.gx = 0;
        mc.gy = 0;
        popup.addChild(mc, !0);
        mc = new Sprite(bitmaps.Award_highscore, 22, 25, 1);
        mc.gx = 26;
        mc.gy = -1;
        popup.addChild(mc, !0);
        mc = new Sprite(bitmaps["Award_highscore" + (100 > levelsScores[curLevel] ?
            "_S" : "")], 22, 25, 1);
        mc.gx = 38;
        mc.gy = -1;
        popup.addChild(mc, !0);
        mc = new Sprite(bitmaps["Award_highscore" + (200 > levelsScores[curLevel] ? "_S" : "")], 22, 25, 1);
        mc.gx = 50;
        mc.gy = -1;
        popup.addChild(mc, !0);
        var c = new SimpleText(bitmaps.Num_victory, 22, 26);
        c.x = -105;
        c.y = -5;
        c.write(curLevel + 1);
        c.addToGroup(popup);
        c = new SimpleText(bitmaps.Num_level_map_level_victory, 14, 19);
        c.x = 30;
        c.y = 0;
        c.align = c.ALIGN_RIGHT;
        c.write(levelsScores[curLevel]);
        c.addToGroup(popup);
        stage.createTween(popup, "y", 130, 65, fps / 3, Easing.linear).play();
        mc =
            new Sprite(a, 307, 173, 1);
        mc.x = 240;
        mc.y = 160;
        stage.addChild(mc);
        mc = new Sprite(bitmaps.Button_Ingame_Restart, 71, 71, 1);
        mc.x = 65;
        mc.y = 160;
        mc.onclick = function() {
            playBtnSound();
            prepareLevel(curLevel)
        };
        stage.addChild(mc);
        mc = new Sprite(bitmaps.Button_Ingame_Next, 71, 71, 1);
        mc.x = 415;
        mc.y = 160;
        mc.onclick = function() {
            playBtnSound();
            curLevel + 1 != levels.length ? nextLevel() : winAll()
        };
        stage.addChild(mc);
        a = new SimpleText(bitmaps.Num_level_map_level_victory, 14, 19);
        a.align = a.ALIGN_LEFT;
        a.x = 165;
        a.y = 143;
        a.write(gameScore);
        c =
            getTotalLevelsScores();
        a = new SimpleText(bitmaps.Num_level_map_level_victory, 14, 19);
        a.align = a.ALIGN_LEFT;
        a.x = 206;
        a.y = 198;
        a.write(c);
        mc = new Sprite(bitmaps.Award_highscore, 28, 32, 1);
        mc.x = 215;
        mc.y = 142;
        stage.addChild(mc);
        mc = new Sprite(bitmaps["Award_score" + (100 > gameScore ? "_S" : "")], 28, 32, 1);
        mc.x = 245;
        mc.y = 142;
        stage.addChild(mc);
        mc = new Sprite(bitmaps["Award_score" + (200 > gameScore ? "_S" : "")], 28, 32, 1);
        mc.x = 275;
        mc.y = 142;
        stage.addChild(mc);
        ExternalAPI.exec("showAds");
        ExternalAPI.openWidget(160, 50, "I scored " + getTotalLevelsScores() +
            " in Zombie Launcher game! Try to beat me!")
    }
}

function winAll() {
    gameState = STATE_ALL_VICTORY;
    createScene()
}

function showPause() {
    gameState == STATE_PAUSE && (isSoundOn && mixer.stop(0), mc = new Sprite(bitmaps.Menu_Pause, 480, 320, 1), mc.x = 240, mc.y = 160, mc.onclick = function(a) {
        gameState = STATE_GAME;
        isSoundOn && mixer.play("ingame", !0, !0, 0);
        drawScore();
        a.target.destroy = !0;
        return !1
    }, stage.addChild(mc))
}

function toggleSound(a) {
    isSoundOn ? (isSoundOn = !1, a.target.gotoAndStop(1), mixer.stop(0)) : (isSoundOn = !0, a.target.gotoAndStop(0), gameState == STATE_GAME || gameState == STATE_VICTORY || gameState == STATE_LOOSE ? mixer.play("ingame", !0, !0, 0) : mixer.play("menu", !0, !0, 0));
    playBtnSound();
    return !1
}

function showMoreGames() {
    playBtnSound2();
    window.open(ExternalAPI.getMoreGamesURL(), "_blank")
}
var tmScore, scoreText;

function drawScore() {
    if (gameState != STATE_MENU && gameState != STATE_LEVELMAP && gameState != STATE_ALL_VICTORY)
        if (gameState == STATE_GAME) {
            clearTimeout(tmScore);
            gameScore--;
            0 > gameScore && (gameScore = 0);
            if (scoreText) {
                var a;
                for (a = 0; a < scoreText.sprites.length; a++) scoreText.sprites[a] && (scoreText.sprites[a].destroy = !0)
            }
            scoreText = new SimpleText(bitmaps.Num_in_game, 11, 11);
            scoreText.align = scoreText.ALIGN_LEFT;
            scoreText.x = 67;
            scoreText.y = 20;
            scoreText.write(gameScore);
            tmScore = setTimeout(function() {
                if (scoreText) {
                    var a;
                    for (a = 0; a < scoreText.sprites.length; a++) scoreText.sprites[a] && (scoreText.sprites[a].destroy = !0)
                }
                drawScore()
            }, 400)
        } else
            for (scoreText = new SimpleText(bitmaps.Num_in_game, 11, 11), scoreText.align = scoreText.ALIGN_LEFT, scoreText.x = 67, scoreText.y = 20, scoreText.write(gameScore), a = 0; a < scoreText.sprites.length; a++) scoreText.sprites[a].setZIndex(1)
}
var debug = {};

function playBtnSound() {
    isSoundOn && mixer.play("button_tick", !1)
}

function playBtnSound2() {
    isSoundOn && mixer.play("button_switch_slide", !1)
}

function postTick() {
    showDebugDraw && world && drawWorld(world, stage)
}
var NONE = 0,
    BOX = 1,
    CIRCLE = 2,
    POLY = 3,
    NORMAL = 0,
    CARRIAGE = 1,
    ORANGE = 2,
    ZOMBIE = 3,
    BOMB = 4,
    DYNAMIC = 5,
    NAIL = 6;

function spritesSync(a, c, e) {
    c = new Vector(-a.target.syncX, -a.target.syncY);
    c.rotate(-a.target.rotation);
    a.target.x += c.x;
    a.target.y += c.y
}
var objects = [{
        name: "orange_1",
        image: "Objects/Gameplay_Objects/orange_1.png",
        type: ORANGE,
        width: 23,
        height: 22,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "orange_1_2",
        image: "Objects/Gameplay_Objects/orange_1_2.png",
        type: ORANGE,
        width: 30,
        height: 29,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "orange_1_3",
        image: "Objects/Gameplay_Objects/orange_1_3.png",
        type: ORANGE,
        width: 36,
        height: 34,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "orange_2",
        image: "Objects/Gameplay_Objects/orange_2.png",
        type: ORANGE,
        width: 25,
        height: 27,
        bodyWidth: 23,
        bodyHeight: 22,
        bodyPosCorrect: {
            x: .5,
            y: 2
        },
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "orange_2_2",
        image: "Objects/Gameplay_Objects/orange_2.png",
        type: ORANGE,
        width: 32,
        height: 35,
        bodyWidth: 29,
        bodyHeight: 29,
        bodyPosCorrect: {
            x: .5,
            y: 2.5
        },
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "orange_2_3",
        image: "Objects/Gameplay_Objects/orange_2_3.png",
        type: ORANGE,
        width: 39,
        height: 42,
        bodyWidth: 35,
        bodyHeight: 35,
        bodyPosCorrect: {
            x: .5,
            y: 3
        },
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "gun_carriage",
        image: "Objects/Gameplay_Objects/gun_carriage.png",
        width: 50,
        height: 44,
        frames: 1,
        bodyType: NONE
    }, {
        name: "bomb",
        image: "Objects/Gameplay_Objects/bomb_my.png",
        type: BOMB,
        width: 26,
        height: 38,
        bodyWidth: 21,
        bodyHeight: 21,
        bodyPosCorrect: {
            x: -1.5,
            y: 6
        },
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 3,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_1",
        image: "Objects/Static_Objects/earth_1.png",
        width: 43,
        height: 43,
        bodyWidth: 40,
        bodyHeight: 40,
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_1_snow",
        image: "Objects/Static_Objects/earth_1_snow.png",
        width: 43,
        height: 43,
        bodyWidth: 40,
        bodyHeight: 40,
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_2",
        image: "Objects/Static_Objects/earth_2.png",
        width: 43,
        height: 43,
        bodyWidth: 40,
        bodyHeight: 40,
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_2_snow",
        image: "Objects/Static_Objects/earth_2_snow.png",
        width: 43,
        height: 43,
        bodyWidth: 40,
        bodyHeight: 40,
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_2_level20",
        image: "Objects/Static_Objects/earth_2_level20.png",
        width: 22,
        height: 25,
        bodyWidth: 21,
        bodyHeight: 21,
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_3",
        image: "Objects/Static_Objects/earth_3.png",
        width: 47,
        height: 44,
        bodyWidth: 40,
        bodyHeight: 40,
        bodyPosCorrect: {
            x: -1.5,
            y: 0
        },
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_3_snow",
        image: "Objects/Static_Objects/earth_3_snow.png",
        width: 47,
        height: 44,
        bodyWidth: 40,
        bodyHeight: 40,
        bodyPosCorrect: {
            x: -1.5,
            y: 0
        },
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_3_level8",
        image: "Objects/Static_Objects/earth_3_level8.png",
        width: 24,
        height: 25,
        bodyWidth: 20,
        bodyHeight: 20,
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_4",
        image: "Objects/Static_Objects/earth_4.png",
        width: 47,
        height: 44,
        bodyWidth: 40,
        bodyHeight: 40,
        bodyPosCorrect: {
            x: -1.5,
            y: 0
        },
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "earth_4_snow",
        image: "Objects/Static_Objects/earth_4_snow.png",
        width: 47,
        height: 44,
        bodyWidth: 40,
        bodyHeight: 40,
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "nail",
        image: "Objects/Static_Objects/nail.png",
        type: NAIL,
        width: 9,
        height: 9,
        bodyType: NONE
    }, {
        name: "screw",
        image: "Objects/Static_Objects/screw.png",
        type: NAIL,
        width: 9,
        height: 9,
        bodyType: NONE
    }, {
        name: "pillar_1",
        image: "Objects/Static_Objects/pillar_1.png",
        width: 18,
        height: 181,
        bodyWidth: 14,
        bodyHeight: 163,
        bodyPosCorrect: {
            x: 1.5,
            y: 9
        },
        frames: 1,
        bodyType: BOX,
        fixed: !0,
        density: 6,
        restitution: .1,
        friction: .6
    }, {
        name: "pillar_2",
        image: "Objects/Static_Objects/pillar_2.png",
        width: 75,
        height: 181,
        frames: 1,
        bodyType: POLY,
        fixed: !0,
        density: 6,
        restitution: .1,
        friction: .6,
        points: [
            [
                [23, -71],
                [36, -71],
                [36, 90.5],
                [23, 90.5]
            ],
            [
                [-37, -20],
                [-20, -37],
                [36, -37],
                [36, -20]
            ]
        ]
    }, {
        name: "snow_tile",
        image: "Objects/Static_Objects/snow_tile.png",
        width: 43,
        height: 11,
        bodyType: NONE
    }, {
        name: "brick",
        image: "Objects/Dynamic_Objects/brick.png",
        type: DYNAMIC,
        width: 26,
        height: 14,
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .6,
        restitution: .1,
        friction: .6
    }, {
        name: "chain",
        image: "Objects/Dynamic_Objects/chain.png",
        type: DYNAMIC,
        width: 12,
        height: 26,
        bodyWidth: 10,
        bodyHeight: 25,
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "chain_rusted",
        image: "Objects/Dynamic_Objects/chain_rusted.png",
        type: DYNAMIC,
        width: 12,
        height: 26,
        bodyWidth: 10,
        bodyHeight: 25,
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .6,
        restitution: .2,
        friction: .6
    }, {
        name: "cogwheel_1",
        image: "Objects/Dynamic_Objects/cogwheel_1.png",
        type: DYNAMIC,
        width: 48,
        height: 48,
        bodyWidth: 46,
        bodyHeight: 46,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .7
    }, {
        name: "cogwheel_2",
        image: "Objects/Dynamic_Objects/cogwheel_2.png",
        type: DYNAMIC,
        width: 50,
        height: 49,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .7,
        points: [
            [
                [-2, -2],
                [2, -2],
                [2, 2],
                [-2, 2]
            ],
            [
                [-4, 16],
                [4, 16],
                [4, 24],
                [-4, 24]
            ]
        ]
    }, {
        name: "wheel",
        image: "Objects/Dynamic_Objects/wheel.png",
        type: DYNAMIC,
        width: 33,
        height: 33,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .7
    }, {
        name: "wheel_level6_8",
        image: "Objects/Dynamic_Objects/wheel_level6,8.png",
        type: DYNAMIC,
        width: 25,
        height: 25,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .7
    }, {
        name: "ice_ball",
        image: "Objects/Dynamic_Objects/ice_ball.png",
        type: DYNAMIC,
        width: 40,
        height: 40,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .1
    }, {
        name: "ice_ball_level4_7_19_22",
        image: "Objects/Dynamic_Objects/ice_ball_level4,7,19,22.png",
        type: DYNAMIC,
        width: 56,
        height: 56,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .1
    }, {
        name: "snow_ball",
        image: "Objects/Dynamic_Objects/snow_ball.png",
        type: DYNAMIC,
        width: 39,
        height: 39,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .1
    }, {
        name: "snow_ball_level5_14",
        image: "Objects/Dynamic_Objects/snow_ball_level5,14.png",
        type: DYNAMIC,
        width: 77,
        height: 77,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .1
    }, {
        name: "snow_ball_level10v2",
        image: "Objects/Dynamic_Objects/snow_ball_level10_2.png",
        type: DYNAMIC,
        width: 48,
        height: 48,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .1
    }, {
        name: "snow_ball_level10v3",
        image: "Objects/Dynamic_Objects/snow_ball_level10_3.png",
        type: DYNAMIC,
        width: 59,
        height: 59,
        frames: 1,
        bodyType: CIRCLE,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .1
    }, {
        name: "ice_cube",
        image: "Objects/Dynamic_Objects/ice_cube.png",
        type: DYNAMIC,
        width: 46,
        height: 46,
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: 1,
        restitution: .1,
        friction: .1
    }, {
        name: "log_1",
        image: "Objects/Dynamic_Objects/log_1.png",
        type: DYNAMIC,
        width: 219,
        height: 25,
        bodyWidth: 211,
        bodyHeight: 20,
        bodyPosCorrect: {
            x: 2,
            y: 1.5
        },
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .4,
        restitution: .1,
        friction: .5
    }, {
        name: "log_2",
        image: "Objects/Dynamic_Objects/log_2.png",
        type: DYNAMIC,
        width: 151,
        height: 25,
        bodyWidth: 140,
        bodyHeight: 20,
        bodyPosCorrect: {
            x: 2,
            y: 0
        },
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .4,
        restitution: .1,
        friction: .5
    }, {
        name: "log_3",
        image: "Objects/Dynamic_Objects/log_3.png",
        type: DYNAMIC,
        width: 87,
        height: 25,
        bodyWidth: 80,
        bodyHeight: 19,
        bodyPosCorrect: {
            x: 2,
            y: .5
        },
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .4,
        restitution: .1,
        friction: .5
    }, {
        name: "plank_1",
        image: "Objects/Dynamic_Objects/plank_1.png",
        type: DYNAMIC,
        width: 133,
        height: 16,
        bodyWidth: 130,
        bodyHeight: 13,
        bodyPosCorrect: {
            x: 0,
            y: .5
        },
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .4,
        restitution: .1,
        friction: .5
    }, {
        name: "plank_2",
        image: "Objects/Dynamic_Objects/plank_2.png",
        type: DYNAMIC,
        width: 133,
        height: 9,
        bodyWidth: 130,
        bodyHeight: 7,
        bodyPosCorrect: {
            x: 0,
            y: .5
        },
        frames: 1,
        bodyType: BOX,
        fixed: !1,
        density: .4,
        restitution: .1,
        friction: .5
    }, {
        name: "snowman_head",
        image: "Objects/Dynamic_Objects/snowman_head.png",
        type: DYNAMIC,
        width: 28,
        height: 34,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: .7,
        restitution: .1,
        friction: .2,
        points: [
            [
                [-3, -17],
                [8, -17],
                [14, 0],
                [13, 9],
                [2, 16],
                [-2, 16],
                [-13, 9],
                [-14, 0]
            ]
        ]
    }, {
        name: "zombie_arm_left",
        image: "Objects/Gameplay_Objects/Zombie/zombie_arm_left.png",
        width: 27,
        height: 25,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: .8,
        restitution: .2,
        friction: .6,
        points: [
            [
                [8, -12],
                [13, -8],
                [-6, 12],
                [-13, 5]
            ]
        ]
    }, {
        name: "zombie_arm_right",
        image: "Objects/Gameplay_Objects/Zombie/zombie_arm_right.png",
        width: 24,
        height: 26,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: .8,
        restitution: .2,
        friction: .6,
        points: [
            [
                [-8, -12],
                [13, 5],
                [6, 12],
                [-13, -8]
            ]
        ]
    }, {
        name: "zombie_head",
        image: "Objects/Gameplay_Objects/Zombie/zombie_head.png",
        width: 24,
        height: 27,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: .8,
        restitution: .2,
        friction: .6,
        points: [
            [
                [-5, -12],
                [0, -12.5],
                [5, -12],
                [12, 1],
                [4, 13],
                [-4, 13],
                [-12, -1]
            ]
        ]
    }, {
        name: "zombie_leg_left",
        image: "Objects/Gameplay_Objects/Zombie/zombie_leg_left.png",
        width: 19,
        height: 30,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: .8,
        restitution: .2,
        friction: .6,
        points: [
            [
                [5, -15],
                [9, -10],
                [3, 14.5],
                [-6, 11]
            ]
        ]
    }, {
        name: "zombie_leg_right",
        image: "Objects/Gameplay_Objects/Zombie/zombie_leg_right.png",
        width: 20,
        height: 30,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: .8,
        restitution: .2,
        friction: .6,
        points: [
            [
                [-5, -15],
                [6, 12],
                [-3, 14.5],
                [-9, -12]
            ]
        ]
    }, {
        name: "zombie_torso",
        image: "Objects/Gameplay_Objects/Zombie/zombie_torso.png",
        width: 24,
        height: 30,
        frames: 1,
        bodyType: POLY,
        fixed: !1,
        density: .8,
        restitution: .2,
        friction: .6,
        points: [
            [
                [-11, -12],
                [7, -11],
                [5, 13],
                [-11, 13]
            ]
        ]
    }],
    levels = [{
        objects: [{
            type: "earth_1_snow",
            x: 18,
            y: 261,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 57,
            y: 261,
            rotation: 0
        }, {
            type: "earth_1",
            x: 356,
            y: 299,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 355,
            y: 259,
            rotation: 0
        }, {
            type: "earth_1",
            x: 486,
            y: 139,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 485,
            y: 99,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 467,
            y: 173,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 428,
            y: 173,
            rotation: 0,
            friction: 5
        }, {
            type: "log_1",
            x: 350,
            y: 134,
            rotation: -1.5707963267948966,
            density: 1.5
        }, {
            type: "gun_carriage",
            x: 52,
            y: 219,
            rotation: 0
        }, {
            type: "orange_1_3",
            x: 437,
            y: 135,
            rotation: 0,
            density: 4,
            friction: 5
        }, {
            type: "orange_1_2",
            x: 437,
            y: 102,
            rotation: 0,
            density: 3,
            friction: 15
        }, {
            type: "orange_2",
            x: 436,
            y: 73,
            rotation: 0,
            density: .3,
            friction: 25
        }, {
            type: "earth_1",
            x: 20,
            y: 300,
            rotation: 0
        }, {
            type: "earth_1",
            x: 58,
            y: 300,
            rotation: 0
        }],
        joints: []
    }, {
        objects: [{
            type: "earth_2_snow",
            x: 467,
            y: 19,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 467,
            y: 57,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 467,
            y: 95,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 467,
            y: 133,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 472,
            y: 160,
            rotation: -.5207963267948956
        }, {
            type: "earth_2_snow",
            x: 438,
            y: 180,
            rotation: -.5207963267948956
        }, {
            type: "earth_2_snow",
            x: 404,
            y: 200,
            rotation: -.5207963267948956
        }, {
            type: "earth_2_snow",
            x: 373,
            y: 218,
            rotation: -.5207963267948956
        }, {
            type: "earth_2_snow",
            x: 340,
            y: 237,
            rotation: -.5207963267948956
        }, {
            type: "earth_2_snow",
            x: 306,
            y: 256,
            rotation: -.5207963267948956
        }, {
            type: "earth_2_snow",
            x: 273,
            y: 275,
            rotation: -.5207963267948956
        }, {
            type: "earth_2_snow",
            x: 240,
            y: 294,
            rotation: -.5207963267948956
        }, {
            type: "earth_3",
            x: 279,
            y: 20,
            rotation: 0
        }, {
            type: "earth_3",
            x: 319,
            y: 7,
            rotation: 0
        }, {
            type: "earth_3",
            x: 358,
            y: 7,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 280,
            y: 89,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 319,
            y: 89,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 358,
            y: 89,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 18,
            y: 141,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 58,
            y: 141,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 33,
            y: 100,
            rotation: 0
        }, {
            type: "orange_2",
            x: 365,
            y: 54,
            rotation: 0,
            density: 1.5
        }, {
            type: "orange_1",
            x: 329,
            y: 56,
            rotation: 0,
            density: 1.5
        }, {
            type: "log_3",
            x: 269,
            y: 58,
            rotation: 0,
            density: 2
        }, {
            type: "earth_2_snow",
            x: 207,
            y: 313,
            rotation: -.5207963267948956
        }],
        joints: []
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 19,
            y: 221,
            rotation: 0
        }, {
            type: "earth_3",
            x: 19,
            y: 301,
            rotation: 0
        }, {
            type: "earth_3",
            x: 19,
            y: 262,
            rotation: 0
        }, {
            type: "earth_3",
            x: 149,
            y: 301,
            rotation: 0
        }, {
            type: "earth_3",
            x: 149,
            y: 263,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 149,
            y: 222,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 460,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 421,
            y: 300,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 443,
            y: 258,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 173,
            y: 121,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 213,
            y: 121,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 253,
            y: 121,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 253,
            y: 121,
            rotation: 0
        }, {
            type: "log_1",
            x: 152,
            y: 44,
            rotation: 0
        }, {
            type: "screw",
            x: 152,
            y: 44,
            rotation: 0
        }, {
            type: "snow_ball_level5_14",
            x: 244,
            y: 43,
            rotation: 0,
            density: .8
        }, {
            type: "orange_2",
            x: 193,
            y: 86,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 60,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 79,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 99,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 119,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 139,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 159,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 180,
            rotation: 0
        }, {
            type: "chain",
            x: 55,
            y: 201,
            rotation: 0
        }, {
            type: "log_3",
            x: 86,
            y: 275.5,
            rotation: -.1,
            density: .5
        }, {
            type: "log_3",
            x: 56,
            y: 246.5,
            rotation: 1.5207963267948965,
            density: .5
        }],
        joints: [{
            type: 0,
            point1: {
                x: 152,
                y: 44
            }
        }, {
            type: 0,
            point1: {
                x: 255,
                y: 44
            }
        }, {
            type: 0,
            point1: {
                x: 218,
                y: 45
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 50
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 191
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 212
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 170
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 149
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 129
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 109
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 89
            }
        }, {
            type: 0,
            point1: {
                x: 55,
                y: 70
            }
        }, {
            type: 0,
            point1: {
                x: 50,
                y: 273.5
            }
        }, {
            type: 0,
            point1: {
                x: 63,
                y: 282.5
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 460,
            y: 275,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 421,
            y: 275,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 437,
            y: 233,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 139,
            y: 275,
            rotation: 0
        }, {
            type: "earth_3",
            x: 19,
            y: 315,
            rotation: 0
        }, {
            type: "earth_3",
            x: 59,
            y: 315,
            rotation: 0
        }, {
            type: "earth_3",
            x: 100,
            y: 315,
            rotation: 0
        }, {
            type: "earth_3",
            x: 140,
            y: 315,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 100,
            y: 276,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 60,
            y: 276,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 20,
            y: 276,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 9,
            y: 259,
            rotation: .7500000000000001
        }, {
            type: "earth_3_snow",
            x: -3,
            y: 221,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: -3,
            y: 181,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: -3,
            y: 141,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: -3,
            y: 101,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: -3,
            y: 61,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: -3,
            y: 21,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: 13,
            y: -2,
            rotation: 2.270796326794896
        }, {
            type: "earth_3",
            x: 461,
            y: 315,
            rotation: 0
        }, {
            type: "earth_3",
            x: 422,
            y: 315,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 106,
            y: 199,
            rotation: 0,
            friction: .01
        }, {
            type: "earth_3_snow",
            x: 146,
            y: 199,
            rotation: 0,
            friction: .01
        }, {
            type: "plank_1",
            x: 218,
            y: 34,
            rotation: 0,
            density: 0
        }, {
            type: "screw",
            x: 166,
            y: 34,
            rotation: 0
        }, {
            type: "screw",
            x: 268,
            y: 34,
            rotation: 0
        }, {
            type: "wheel_level6_8",
            x: 195,
            y: 15,
            rotation: 0
        }, {
            type: "orange_1",
            x: 236,
            y: 16,
            rotation: 0
        }, {
            type: "bomb",
            x: 274,
            y: 50,
            rotation: -.35,
            custom: "200"
        }, {
            type: "earth_3_snow",
            x: 67,
            y: 199,
            rotation: 0
        }, {
            type: "orange_1",
            x: 53,
            y: 168,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 157,
            y: 79,
            rotation: -1.0000000000000002
        }, {
            type: "earth_3_snow",
            x: 136,
            y: 112,
            rotation: -1.0000000000000002
        }, {
            type: "earth_3_snow",
            x: 115,
            y: 146,
            rotation: -1.0000000000000002
        }, {
            type: "earth_3_snow",
            x: 94,
            y: 179,
            rotation: -1.0000000000000002
        }, {
            type: "plank_2",
            x: 63,
            y: -90,
            rotation: 1.5707963267948966,
            density: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 274,
                y: 40
            }
        }]
    }, {
        objects: [{
            type: "earth_2_snow",
            x: 16,
            y: 300,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 54,
            y: 300,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 460,
            y: 260,
            rotation: 0
        }, {
            type: "earth_2",
            x: 461,
            y: 300,
            rotation: 0
        }, {
            type: "log_1",
            x: 358,
            y: 228,
            rotation: 0
        }, {
            type: "nail",
            x: 356,
            y: 228,
            rotation: 0
        }, {
            type: "earth_2_level20",
            x: 327,
            y: 199,
            rotation: 0
        }, {
            type: "earth_2",
            x: 325,
            y: 172,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 324,
            y: 131,
            rotation: 0
        }, {
            type: "orange_2",
            x: 418,
            y: 203,
            rotation: 0,
            density: 2
        }, {
            type: "earth_2_snow",
            x: 168,
            y: 96,
            rotation: 0
        }, {
            type: "snow_ball_level5_14",
            x: 166,
            y: 39,
            rotation: 0,
            density: .6
        }, {
            type: "earth_2",
            x: 323,
            y: 54,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 322,
            y: 20,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 31,
            y: 258,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 358,
                y: 228
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 467,
            y: 138,
            rotation: 0
        }, {
            type: "earth_3",
            x: 465,
            y: 178,
            rotation: 0
        }, {
            type: "earth_3",
            x: 464,
            y: 218,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 442,
            y: 274,
            rotation: -.8500000000000002
        }, {
            type: "earth_3",
            x: 463,
            y: 258,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 460,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 421,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 381,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 341,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 301,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 262,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 222,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 182,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 143,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 103,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 63,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 23,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: -17,
            y: 299,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 8,
            y: 76,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 202,
            y: 183,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 202,
            y: 141,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 254,
            y: 156,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 278,
            y: 162,
            rotation: .35
        }, {
            type: "earth_3_snow",
            x: 312,
            y: 167,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 352,
            y: 167,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 352,
            y: 95,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 320,
            y: 89,
            rotation: .3
        }, {
            type: "earth_3_snow",
            x: 287,
            y: 85,
            rotation: 0
        }, {
            type: "orange_1",
            x: 359,
            y: 136,
            rotation: 0
        }, {
            type: "orange_1",
            x: 283,
            y: 52,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 114,
            y: 64,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 134,
            y: 64,
            rotation: 0
        }, {
            type: "wheel_level6_8",
            x: 113,
            y: 43,
            rotation: 0
        }, {
            type: "plank_1",
            x: 52,
            y: 92,
            rotation: 1.2000000000000004
        }, {
            type: "brick",
            x: 35,
            y: 34,
            rotation: -.3
        }, {
            type: "screw",
            x: 58,
            y: 111,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 35,
                y: 33
            }
        }, {
            type: 0,
            point1: {
                x: 26,
                y: 37
            }
        }, {
            type: 0,
            point1: {
                x: 58,
                y: 111
            }
        }]
    }, {
        objects: [{
            type: "earth_2_snow",
            x: 460,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 422,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 383,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 345,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 306,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 268,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 229,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 190,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 151,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 113,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 74,
            y: 299,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 424,
            y: 258,
            rotation: 0,
            custom: "900"
        }, {
            type: "earth_2_snow",
            x: 151,
            y: 203,
            rotation: 0
        }, {
            type: "plank_1",
            x: 65,
            y: 191,
            rotation: 0,
            density: 0
        }, {
            type: "orange_1",
            x: 145,
            y: 172,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: -5,
            y: 219,
            rotation: 1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 5,
            y: 259,
            rotation: .970796326794896
        }, {
            type: "earth_2_snow",
            x: 29,
            y: 282,
            rotation: -.029203673205104308
        }, {
            type: "earth_2_snow",
            x: 36,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: -2,
            y: 298,
            rotation: 0
        }, {
            type: "orange_2",
            x: 39,
            y: 251,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 1,
            y: 53,
            rotation: .7500000000000001
        }, {
            type: "earth_2_snow",
            x: 122,
            y: 53,
            rotation: 0,
            friction: 2
        }, {
            type: "earth_2_snow",
            x: 145,
            y: 61,
            rotation: .65,
            friction: 3
        }, {
            type: "bomb",
            x: 109,
            y: 17,
            rotation: 0,
            density: 5,
            friction: 3,
            custom: "108"
        }, {
            type: "plank_2",
            x: 60,
            y: 70,
            rotation: .7853981633974483,
            density: .4
        }, {
            type: "nail",
            x: 14,
            y: 191,
            rotation: 0
        }, {
            type: "nail",
            x: 114,
            y: 190,
            rotation: 0
        }, {
            type: "nail",
            x: 59,
            y: 70,
            rotation: 0
        }, {
            type: "earth_2",
            x: 152,
            y: 231,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 278,
            y: 271,
            rotation: -1.0000000000000002
        }],
        joints: [{
            type: 0,
            point1: {
                x: 60,
                y: 70
            }
        }]
    }, {
        objects: [{
            type: "earth_1",
            x: 18,
            y: 300,
            rotation: 0
        }, {
            type: "earth_1",
            x: 57,
            y: 300,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 18,
            y: 260,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 56,
            y: 260,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 38,
            y: 219,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 216,
            y: 193,
            rotation: 0
        }, {
            type: "earth_1",
            x: 216,
            y: 233,
            rotation: 0
        }, {
            type: "earth_1",
            x: 217,
            y: 273,
            rotation: 0
        }, {
            type: "earth_1",
            x: 217,
            y: 312,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 295,
            y: 199,
            rotation: 0
        }, {
            type: "earth_1",
            x: 295,
            y: 239,
            rotation: 0
        }, {
            type: "earth_1",
            x: 295,
            y: 278,
            rotation: 0
        }, {
            type: "earth_1",
            x: 295,
            y: 317,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 333,
            y: 250,
            rotation: 0
        }, {
            type: "earth_1",
            x: 333,
            y: 290,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 371,
            y: 290,
            rotation: 0
        }, {
            type: "earth_1",
            x: 329,
            y: 326,
            rotation: 0
        }, {
            type: "earth_1",
            x: 368,
            y: 326,
            rotation: 0
        }, {
            type: "orange_2",
            x: 332,
            y: 216,
            rotation: 0
        }, {
            type: "orange_2",
            x: 370,
            y: 257,
            rotation: 0
        }, {
            type: "log_3",
            x: 330,
            y: 51,
            rotation: 0,
            density: 0
        }, {
            type: "snow_ball",
            x: 309,
            y: 21,
            rotation: 0,
            density: 1.9
        }, {
            type: "nail",
            x: 308,
            y: 52,
            rotation: 0
        }, {
            type: "nail",
            x: 359,
            y: 52,
            rotation: 0
        }, {
            type: "log_1",
            x: 352,
            y: 144,
            rotation: -.2,
            density: 2
        }, {
            type: "nail",
            x: 362,
            y: 142,
            rotation: 0
        }, {
            type: "log_3",
            x: 441,
            y: 92,
            rotation: -1.800000000000001,
            density: .1
        }, {
            type: "log_3",
            x: 384,
            y: 105,
            rotation: -1.800000000000001,
            density: .1
        }, {
            type: "chain",
            x: 256,
            y: 184,
            rotation: 0,
            density: .3
        }, {
            type: "chain",
            x: 256,
            y: 205,
            rotation: 0,
            density: .3
        }, {
            type: "chain",
            x: 256,
            y: 227,
            rotation: 0,
            density: .3
        }, {
            type: "chain",
            x: 256,
            y: 248,
            rotation: 0,
            density: .3
        }, {
            type: "chain",
            x: 256,
            y: 270,
            rotation: 0,
            density: .3
        }, {
            type: "orange_1",
            x: 255,
            y: 291,
            rotation: 0,
            density: 1
        }],
        joints: [{
            type: 0,
            point1: {
                x: 442,
                y: 119
            }
        }, {
            type: 0,
            point1: {
                x: 256,
                y: 280
            }
        }, {
            type: 0,
            point1: {
                x: 256,
                y: 259
            }
        }, {
            type: 0,
            point1: {
                x: 256,
                y: 216
            }
        }, {
            type: 0,
            point1: {
                x: 256,
                y: 237
            }
        }, {
            type: 0,
            point1: {
                x: 384,
                y: 131
            }
        }, {
            type: 0,
            point1: {
                x: 400,
                y: 128
            }
        }, {
            type: 0,
            point1: {
                x: 453,
                y: 117
            }
        }, {
            type: 0,
            point1: {
                x: 451,
                y: 126
            }
        }, {
            type: 0,
            point1: {
                x: 394,
                y: 139
            }
        }, {
            type: 0,
            point1: {
                x: 256,
                y: 194
            }
        }, {
            type: 0,
            point1: {
                x: 362,
                y: 142
            }
        }, {
            type: 0,
            point1: {
                x: 256,
                y: 174
            }
        }]
    }, {
        objects: [{
            type: "pillar_1",
            x: 9,
            y: 154,
            rotation: 0
        }, {
            type: "earth_3",
            x: 18,
            y: 302,
            rotation: 0
        }, {
            type: "earth_3",
            x: 58,
            y: 302,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 18,
            y: 262,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 57,
            y: 262,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 8,
            y: 39,
            rotation: .15000000000000002
        }, {
            type: "gun_carriage",
            x: 45,
            y: 219,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 28,
            y: 42,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 48,
            y: 45,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 68,
            y: 48,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 88,
            y: 52,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 108,
            y: 55,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 128,
            y: 59,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 148,
            y: 62,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 168,
            y: 65,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 188,
            y: 68,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 208,
            y: 72,
            rotation: .15000000000000002
        }, {
            type: "earth_3_snow",
            x: 287,
            y: 308,
            rotation: .44999999999999996,
            friction: .1
        }, {
            type: "earth_3_snow",
            x: 255,
            y: 293,
            rotation: .39999999999999997
        }, {
            type: "earth_3_snow",
            x: 388,
            y: 299,
            rotation: 1.3877787807814457E-17
        }, {
            type: "log_2",
            x: 241,
            y: 196,
            rotation: -1.5707963267948966,
            density: 1.5,
            friction: .7
        }, {
            type: "snow_ball_level5_14",
            x: 30,
            y: -11,
            rotation: 0,
            density: .25
        }, {
            type: "log_3",
            x: 389,
            y: 239,
            rotation: -1.5707963267948966,
            density: 3.2,
            friction: .4
        }, {
            type: "log_3",
            x: 389,
            y: 159,
            rotation: -1.5707963267948966,
            density: 3.2,
            friction: .4
        }, {
            type: "snowman_head",
            x: 390,
            y: 100,
            rotation: 0,
            density: 1,
            friction: .01
        }, {
            type: "snowman_head",
            x: 389,
            y: 67,
            rotation: 0,
            density: 1,
            friction: .01
        }, {
            type: "orange_2",
            x: 386,
            y: 38,
            rotation: 0,
            density: 1
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 194,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 176,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 158,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 140,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 122,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 104,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 86,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 68,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 50,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 32,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 364,
            y: 15,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 364,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 194,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 176,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 158,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 140,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 122,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 104,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 86,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 68,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 50,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 32,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 417,
            y: 15,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 417,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 227,
            y: 75,
            rotation: .15000000000000002
        }, {
            type: "earth_3_level8",
            x: 247,
            y: 78,
            rotation: .15000000000000002
        }, {
            type: "earth_3",
            x: 240,
            y: 330,
            rotation: .39999999999999997,
            friction: .1
        }],
        joints: []
    }, {
        objects: [{
            type: "earth_1_snow",
            x: 18,
            y: 300,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 56,
            y: 300,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 38,
            y: 259,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 483,
            y: 37,
            rotation: 0
        }, {
            type: "earth_1",
            x: 484,
            y: 78,
            rotation: 0
        }, {
            type: "earth_1",
            x: 484,
            y: 118,
            rotation: 0
        }, {
            type: "earth_1",
            x: 484,
            y: 157,
            rotation: 0
        }, {
            type: "earth_1",
            x: 484,
            y: 184,
            rotation: 0
        }, {
            type: "log_1",
            x: 353,
            y: 62,
            rotation: 0,
            density: .7
        }, {
            type: "nail",
            x: 326,
            y: 62,
            rotation: 0
        }, {
            type: "plank_1",
            x: 269,
            y: 121,
            rotation: -1.5707963267948966,
            density: .6
        }, {
            type: "chain",
            x: 454,
            y: 81,
            rotation: 0,
            density: 1
        }, {
            type: "chain",
            x: 454,
            y: 101,
            rotation: 0,
            density: 1
        }, {
            type: "chain",
            x: 454,
            y: 122,
            rotation: 0,
            density: 1
        }, {
            type: "chain",
            x: 454,
            y: 142,
            rotation: 0,
            density: 1
        }, {
            type: "chain",
            x: 454,
            y: 163,
            rotation: 0,
            density: 1
        }, {
            type: "chain",
            x: 454,
            y: 183,
            rotation: 0,
            density: 1
        }, {
            type: "chain",
            x: 454,
            y: 203,
            rotation: 0,
            density: 1
        }, {
            type: "orange_1_2",
            x: 454,
            y: 223,
            rotation: 0,
            density: 3
        }, {
            type: "orange_2",
            x: 419,
            y: 38,
            rotation: 0
        }, {
            type: "orange_1",
            x: 381,
            y: 42,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 424,
            y: 97,
            rotation: 0
        }, {
            type: "earth_1",
            x: 425,
            y: 137,
            rotation: 0
        }, {
            type: "earth_1",
            x: 425,
            y: 176,
            rotation: 0
        }, {
            type: "earth_1",
            x: 316,
            y: -3,
            rotation: 0
        }, {
            type: "earth_1",
            x: 277,
            y: -2,
            rotation: 0
        }, {
            type: "earth_1",
            x: 238,
            y: 0,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 197,
            y: 23,
            rotation: 0
        }, {
            type: "earth_1",
            x: 198,
            y: 64,
            rotation: 0
        }, {
            type: "earth_1",
            x: 198,
            y: 103,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 454,
                y: 212
            }
        }, {
            type: 0,
            point1: {
                x: 454,
                y: 194
            }
        }, {
            type: 0,
            point1: {
                x: 454,
                y: 71
            }
        }, {
            type: 0,
            point1: {
                x: 454,
                y: 92
            }
        }, {
            type: 0,
            point1: {
                x: 454,
                y: 111
            }
        }, {
            type: 0,
            point1: {
                x: 454,
                y: 133
            }
        }, {
            type: 0,
            point1: {
                x: 454,
                y: 152
            }
        }, {
            type: 0,
            point1: {
                x: 454,
                y: 173
            }
        }, {
            type: 0,
            point1: {
                x: 265,
                y: 58
            }
        }, {
            type: 0,
            point1: {
                x: 275,
                y: 58
            }
        }, {
            type: 0,
            point1: {
                x: 266,
                y: 70
            }
        }, {
            type: 0,
            point1: {
                x: 274,
                y: 70
            }
        }, {
            type: 0,
            point1: {
                x: 270,
                y: 64
            }
        }, {
            type: 0,
            point1: {
                x: 326,
                y: 62
            }
        }]
    }, {
        objects: [{
            type: "earth_1_snow",
            x: 92,
            y: 309.5,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 131,
            y: 309.5,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 403,
            y: 282,
            rotation: -.65
        }, {
            type: "earth_1_snow",
            x: 378,
            y: 283,
            rotation: .017453292519943295
        }, {
            type: "plank_1",
            x: 377,
            y: 197,
            rotation: -1.5707963267948966,
            density: 2,
            restitution: .01
        }, {
            type: "gun_carriage",
            x: 112,
            y: 267.5,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 337,
            y: 110,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 298,
            y: 110,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 260,
            y: 110,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 156,
            y: 92,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 189,
            y: 105,
            rotation: .65
        }, {
            type: "earth_1_snow",
            x: 222,
            y: 110,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 86,
            y: 92,
            rotation: 0
        }, {
            type: "plank_1",
            x: 139,
            y: 63,
            rotation: 0,
            density: 1
        }, {
            type: "log_3",
            x: 122,
            y: 105,
            rotation: 1.5207963267948965,
            density: 2
        }, {
            type: "orange_1",
            x: 179,
            y: 46,
            rotation: 0
        }, {
            type: "orange_2",
            x: 436,
            y: 106,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 483,
            y: 75,
            rotation: -1.5500000000000007
        }, {
            type: "earth_1_snow",
            x: 475,
            y: 114,
            rotation: -.9000000000000001
        }, {
            type: "bomb",
            x: 429,
            y: 135,
            rotation: -.25,
            restitution: .01,
            custom: "50",
            force: 500
        }, {
            type: "earth_1_snow",
            x: 448,
            y: 138,
            rotation: 9.71445146547012E-17
        }, {
            type: "earth_1_snow",
            x: 47,
            y: 92,
            rotation: 0
        }, {
            type: "earth_1",
            x: 379,
            y: 324,
            rotation: 0
        }, {
            type: "earth_1",
            x: 418,
            y: 310,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 433,
                y: 129
            }
        }, {
            type: 0,
            point1: {
                x: 121,
                y: 64
            }
        }]
    }, {
        objects: [{
            type: "earth_2_snow",
            x: 460,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 422,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 383,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 345,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 306,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 268,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 229,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 190,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 151,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 113,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 74,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: -2,
            y: 273,
            rotation: .9000000000000002
        }, {
            type: "earth_2_snow",
            x: 36,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: -2,
            y: 298,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 212,
            y: 256,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 431,
            y: 256,
            rotation: 0,
            custom: "800"
        }, {
            type: "earth_2_snow",
            x: 279,
            y: 31,
            rotation: 0
        }, {
            type: "earth_2",
            x: 280,
            y: 72,
            rotation: 0
        }, {
            type: "earth_2",
            x: 280,
            y: 111,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 213,
            y: 78,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 175,
            y: 78,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 137,
            y: 78,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 98,
            y: 78,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 9,
            y: 78,
            rotation: 0
        }, {
            type: "plank_1",
            x: 124,
            y: 50,
            rotation: 0,
            density: 1
        }, {
            type: "orange_1",
            x: 213,
            y: 47,
            rotation: 0,
            density: 1
        }, {
            type: "ice_ball",
            x: 212,
            y: 217,
            rotation: 0
        }, {
            type: "plank_1",
            x: 127,
            y: 244,
            rotation: 0,
            density: 0
        }, {
            type: "screw",
            x: 80,
            y: 244,
            rotation: 0
        }, {
            type: "screw",
            x: 175,
            y: 244,
            rotation: 0
        }, {
            type: "orange_1",
            x: 67,
            y: 265,
            rotation: 0
        }, {
            type: "log_3",
            x: 52,
            y: 90,
            rotation: 1.2500000000000004,
            density: 1
        }, {
            type: "screw",
            x: 51,
            y: 89,
            rotation: 0
        }, {
            type: "earth_2",
            x: 236,
            y: 7,
            rotation: 0
        }, {
            type: "earth_2",
            x: 198,
            y: 7,
            rotation: 0
        }, {
            type: "earth_2",
            x: 160,
            y: 7,
            rotation: 0
        }, {
            type: "earth_2",
            x: 122,
            y: 7,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: -22,
            y: 248,
            rotation: 1.5707963267948966
        }],
        joints: [{
            type: 0,
            point1: {
                x: 52,
                y: 90
            }
        }]
    }, {
        objects: [{
            type: "earth_2_snow",
            x: 242,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 203,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 164,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 126,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 87,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 49,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 11,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: -22,
            y: 248,
            rotation: 1.5707963267948966
        }, {
            type: "orange_1",
            x: 228,
            y: 268,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 3,
            y: 138,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 42,
            y: 138,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 30,
            y: 96,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 263,
            y: 99,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 328,
            y: 81,
            rotation: -.8500000000000002
        }, {
            type: "earth_2",
            x: 249,
            y: 140,
            rotation: 0
        }, {
            type: "chain_rusted",
            x: 293,
            y: 90,
            rotation: 0
        }, {
            type: "bomb",
            x: 296,
            y: 67,
            rotation: .15000000000000002,
            custom: "200"
        }, {
            type: "orange_2",
            x: 293,
            y: 108,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 18,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 56,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 94,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 131,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 169,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 207,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 245,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 283,
            rotation: -1.5707963267948966
        }, {
            type: "earth_2_snow",
            x: 476,
            y: 321,
            rotation: -1.5707963267948966
        }, {
            type: "wheel",
            x: 387,
            y: 256,
            rotation: 0
        }, {
            type: "screw",
            x: 387,
            y: 256,
            rotation: 0
        }, {
            type: "plank_2",
            x: 388,
            y: 185,
            rotation: 1.5707963267948966,
            density: .8
        }],
        joints: [{
            type: 0,
            point1: {
                x: 293,
                y: 101
            }
        }, {
            type: 0,
            point1: {
                x: 293,
                y: 77
            }
        }, {
            type: 0,
            point1: {
                x: 387,
                y: 256
            }
        }, {
            type: 0,
            point1: {
                x: 387,
                y: 249
            }
        }, {
            type: 0,
            point1: {
                x: 387,
                y: 242
            }
        }]
    }, {
        objects: [{
            type: "pillar_2",
            x: 51,
            y: 230,
            rotation: 0
        }, {
            type: "pillar_1",
            x: 41,
            y: 80,
            rotation: 1.5707963267948966
        }, {
            type: "orange_2",
            x: 36,
            y: 66,
            rotation: 0
        }, {
            type: "orange_2",
            x: 53,
            y: 177,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 485,
            y: 79,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 379,
            y: 80,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 340,
            y: 80,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 200,
            y: 214,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 239,
            y: 214,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 277,
            y: 214,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 315,
            y: 214,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 354,
            y: 214,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 441,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 402,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 363,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 324,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 286,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 248,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 209,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 171,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 138,
            y: 294,
            rotation: .39999999999999997
        }, {
            type: "earth_2_snow",
            x: 106,
            y: 279,
            rotation: .8000000000000002
        }, {
            type: "earth_2_snow",
            x: 480,
            y: 299,
            rotation: 0
        }, {
            type: "orange_2",
            x: 327,
            y: 266,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 238,
            y: 173,
            rotation: 0
        }, {
            type: "ice_ball",
            x: 382,
            y: 41,
            rotation: 0
        }, {
            type: "plank_2",
            x: 445,
            y: 86,
            rotation: -1.1000000000000003
        }, {
            type: "nail",
            x: 445,
            y: 86,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 445,
                y: 86
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 358,
            y: 195,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 398,
            y: 182,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 381,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 341,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 301,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 262,
            y: 303,
            rotation: 0,
            restitution: .5
        }, {
            type: "earth_3_snow",
            x: 222,
            y: 303,
            rotation: 0,
            restitution: .5
        }, {
            type: "earth_3_snow",
            x: 182,
            y: 303,
            rotation: 0,
            restitution: .5
        }, {
            type: "earth_3_snow",
            x: 143,
            y: 303,
            rotation: 0,
            restitution: .5
        }, {
            type: "earth_3_snow",
            x: 103,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 63,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 23,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: -17,
            y: 302,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 484,
            y: 240,
            rotation: -1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: 472,
            y: 265,
            rotation: -.8707963267948959
        }, {
            type: "earth_3_snow",
            x: 441,
            y: 289,
            rotation: -.47079632679489564
        }, {
            type: "earth_3_snow",
            x: 460,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 421,
            y: 303,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 437,
            y: 209,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 319,
            y: 195,
            rotation: 0
        }, {
            type: "earth_3",
            x: 398,
            y: 223,
            rotation: 0
        }, {
            type: "earth_3",
            x: 359,
            y: 236,
            rotation: 0
        }, {
            type: "earth_3",
            x: 320,
            y: 236,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 347,
            y: 76,
            rotation: 0
        }, {
            type: "plank_2",
            x: 281,
            y: 52.5,
            rotation: -.008726646259971648,
            density: 2,
            restitution: .1,
            friction: .01
        }, {
            type: "nail",
            x: 222,
            y: 54.5,
            rotation: -.05
        }, {
            type: "bomb",
            x: 286,
            y: 39,
            rotation: 0,
            density: .1,
            restitution: .2,
            friction: .01,
            custom: "100"
        }, {
            type: "snow_ball",
            x: 398,
            y: 142,
            rotation: 0
        }, {
            type: "orange_1",
            x: 436,
            y: 177,
            rotation: 0
        }, {
            type: "orange_2_3",
            x: 349,
            y: 153,
            rotation: 0
        }, {
            type: "orange_1",
            x: 390,
            y: 271,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 152,
            y: 286,
            rotation: .65,
            restitution: .5
        }, {
            type: "gun_carriage",
            x: 147,
            y: 262,
            rotation: 0,
            custom: "900"
        }],
        joints: [{
            type: 0,
            point1: {
                x: 222,
                y: 55.5
            }
        }]
    }, {
        objects: [{
            type: "earth_3",
            x: 18,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3",
            x: 58,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3",
            x: 333.5,
            y: 300,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3",
            x: 427,
            y: 302,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_snow",
            x: 18,
            y: 259,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 57,
            y: 259,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 36,
            y: 216,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 158,
            y: 86,
            rotation: .6
        }, {
            type: "earth_3_snow",
            x: 137,
            y: 76,
            rotation: 0
        }, {
            type: "ice_ball_level4_7_19_22",
            x: 124,
            y: 27,
            rotation: 0
        }, {
            type: "earth_3",
            x: 478.5,
            y: -6,
            rotation: 0
        }, {
            type: "earth_3",
            x: 439.5,
            y: -6,
            rotation: 0
        }, {
            type: "earth_3",
            x: 400.5,
            y: -7,
            rotation: 0
        }, {
            type: "earth_3",
            x: 362.5,
            y: -6,
            rotation: 0
        }, {
            type: "earth_3",
            x: 323.5,
            y: 18,
            rotation: 0
        }, {
            type: "earth_3",
            x: 323.5,
            y: 57,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 434.5,
            y: 281,
            rotation: -.7948376736367676,
            custom: "0.1"
        }, {
            type: "earth_3_snow",
            x: 462.5,
            y: 252,
            rotation: -.7948376736367676
        }, {
            type: "earth_3_snow",
            x: 480,
            y: 232,
            rotation: 0
        }, {
            type: "log_2",
            x: 466,
            y: 137,
            rotation: -1.5707963267948966,
            density: 1.5,
            friction: 1
        }, {
            type: "earth_3_snow",
            x: 323.5,
            y: 278,
            rotation: .7948376736367676,
            friction: .1
        }, {
            type: "earth_3_snow",
            x: 295.5,
            y: 249,
            rotation: .7948376736367676,
            friction: .1
        }, {
            type: "earth_3_snow",
            x: 275.5,
            y: 236,
            rotation: 0
        }, {
            type: "log_2",
            x: 273.5,
            y: 143,
            rotation: -1.5707963267948966,
            density: 1.5,
            friction: .6
        }, {
            type: "log_2",
            x: 221.5,
            y: 51,
            rotation: .1,
            density: 1.5,
            friction: .5
        }, {
            type: "plank_2",
            x: 410,
            y: 68,
            rotation: -.017453292519943295
        }, {
            type: "screw",
            x: 350,
            y: 68,
            rotation: 0
        }, {
            type: "orange_1",
            x: 372,
            y: 54,
            rotation: 0
        }, {
            type: "orange_1",
            x: 397,
            y: 54,
            rotation: 0
        }, {
            type: "orange_1",
            x: 423,
            y: 54,
            rotation: 0
        }, {
            type: "orange_1",
            x: 410,
            y: 35,
            rotation: 0
        }, {
            type: "orange_1",
            x: 385,
            y: 35,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 275.5,
            y: 236,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 275.5,
            y: 235,
            rotation: 0,
            friction: .1
        }],
        joints: [{
            type: 0,
            point1: {
                x: 350,
                y: 68
            }
        }]
    }, {
        objects: [{
            type: "earth_2_snow",
            x: 452,
            y: 299,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 414,
            y: 299,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 438,
            y: 258,
            rotation: 0
        }, {
            type: "earth_2",
            x: 19,
            y: 310,
            rotation: 0
        }, {
            type: "earth_2",
            x: 19,
            y: 271,
            rotation: 0
        }, {
            type: "earth_2_snow",
            x: 18,
            y: 230,
            rotation: 0
        }, {
            type: "log_1",
            x: 118,
            y: 178,
            rotation: 0
        }, {
            type: "log_1",
            x: 119,
            y: 127,
            rotation: 0
        }, {
            type: "chain",
            x: 22,
            y: 143,
            rotation: 0
        }, {
            type: "chain",
            x: 22,
            y: 162,
            rotation: 0
        }, {
            type: "orange_2",
            x: 40,
            y: 153,
            rotation: 0
        }, {
            type: "nail",
            x: 118,
            y: 127,
            rotation: 0
        }, {
            type: "nail",
            x: 118,
            y: 179,
            rotation: 0
        }, {
            type: "brick",
            x: 21,
            y: 111,
            rotation: 1.5707963267948966
        }, {
            type: "earth_2",
            x: 183,
            y: 47,
            rotation: 0
        }, {
            type: "earth_2",
            x: 183,
            y: 8,
            rotation: 0
        }, {
            type: "earth_2_level20",
            x: 69,
            y: 74,
            rotation: 0
        }, {
            type: "plank_1",
            x: 96,
            y: 55,
            rotation: 0
        }, {
            type: "nail",
            x: 89,
            y: 55,
            rotation: 0
        }, {
            type: "orange_2",
            x: 80,
            y: 33,
            rotation: 0
        }, {
            type: "nail",
            x: 90,
            y: 56,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 118,
                y: 178
            }
        }, {
            type: 0,
            point1: {
                x: 119,
                y: 127
            }
        }, {
            type: 0,
            point1: {
                x: 22,
                y: 173
            }
        }, {
            type: 0,
            point1: {
                x: 22,
                y: 133
            }
        }, {
            type: 0,
            point1: {
                x: 22,
                y: 154
            }
        }, {
            type: 0,
            point1: {
                x: 27,
                y: 121
            }
        }, {
            type: 0,
            point1: {
                x: 18,
                y: 121
            }
        }, {
            type: 0,
            point1: {
                x: 90,
                y: 55
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 222,
            y: 308,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 262,
            y: 308,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 337,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 148,
            y: 300,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 242,
            y: 267,
            rotation: 0,
            custom: 900
        }, {
            type: "log_1",
            x: 336,
            y: 175,
            rotation: -1.5707963267948966,
            density: 1.5
        }, {
            type: "log_1",
            x: 149,
            y: 173,
            rotation: 1.5707963267948966,
            density: 1.5
        }, {
            type: "earth_3_snow",
            x: 182,
            y: 101,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 302,
            y: 101,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 205,
            y: 108,
            rotation: .6108652381980153
        }, {
            type: "earth_3_snow",
            x: 279,
            y: 108,
            rotation: -.6108652381980153
        }, {
            type: "bomb",
            x: 245,
            y: 88,
            rotation: 0,
            custom: "110",
            force: 550
        }, {
            type: "orange_1",
            x: 224,
            y: 78,
            rotation: 0
        }, {
            type: "orange_1",
            x: 263,
            y: 78,
            rotation: 0
        }, {
            type: "orange_1",
            x: 245,
            y: 66,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 3,
            y: 121,
            rotation: .7853981633974483
        }, {
            type: "earth_3_snow",
            x: 479,
            y: 121,
            rotation: -.7853981633974483
        }],
        joints: []
    }, {
        objects: [{
            type: "earth_1_snow",
            x: 18,
            y: 304,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 57,
            y: 304,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 223,
            y: 308,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 262,
            y: 308,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 301,
            y: 308,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 437,
            y: 134,
            rotation: 0
        }, {
            type: "earth_1_snow",
            x: 382,
            y: 81,
            rotation: 0,
            density: 10,
            friction: .01
        }, {
            type: "earth_1_snow",
            x: 343,
            y: 81,
            rotation: 0,
            density: 10,
            friction: .01
        }, {
            type: "earth_1_snow",
            x: 288,
            y: 19,
            rotation: .8500000000000002
        }, {
            type: "earth_1",
            x: 363,
            y: 121,
            rotation: 0
        }, {
            type: "chain",
            x: 411,
            y: 56,
            rotation: -1.1000000000000003,
            density: .3,
            friction: .1
        }, {
            type: "chain",
            x: 424,
            y: 70,
            rotation: -.5499999999999998,
            density: .3,
            friction: .1
        }, {
            type: "chain",
            x: 429,
            y: 88,
            rotation: -.09999999999999991,
            density: .3,
            friction: .1
        }, {
            type: "orange_1",
            x: 431,
            y: 104,
            rotation: 0,
            friction: .01
        }, {
            type: "chain",
            x: 392,
            y: 51,
            rotation: -1.4000000000000008,
            density: .6,
            friction: .1
        }, {
            type: "chain",
            x: 354,
            y: 50,
            rotation: 1.6500000000000008,
            density: .6,
            friction: .1
        }, {
            type: "chain",
            x: 335,
            y: 48,
            rotation: 1.6500000000000008,
            density: .5,
            friction: .1
        }, {
            type: "chain",
            x: 316.5,
            y: 54,
            rotation: .9000000000000001,
            density: .4
        }, {
            type: "chain",
            x: 305.5,
            y: 70,
            rotation: .34999999999999987,
            density: .3
        }, {
            type: "chain",
            x: 299.5,
            y: 89,
            rotation: .2999999999999999,
            density: .3
        }, {
            type: "chain",
            x: 293.5,
            y: 107,
            rotation: .2999999999999999,
            density: .3
        }, {
            type: "chain",
            x: 289.5,
            y: 126,
            rotation: .1499999999999999,
            density: .2
        }, {
            type: "chain",
            x: 286.5,
            y: 146,
            rotation: .1499999999999999,
            density: .2
        }, {
            type: "chain",
            x: 283.5,
            y: 165,
            rotation: .1499999999999999,
            density: .2
        }, {
            type: "chain",
            x: 280.5,
            y: 183,
            rotation: .049999999999999906,
            density: .2
        }, {
            type: "chain",
            x: 279.5,
            y: 202,
            rotation: .049999999999999906,
            density: .2
        }, {
            type: "chain",
            x: 278.5,
            y: 221,
            rotation: .049999999999999906,
            density: .2
        }, {
            type: "chain",
            x: 274.5,
            y: 240,
            rotation: .2499999999999999,
            density: .2
        }, {
            type: "chain",
            x: 281,
            y: 254,
            rotation: -.9000000000000005
        }, {
            type: "ice_ball_level4_7_19_22",
            x: 304,
            y: 261,
            rotation: 0,
            density: .5
        }, {
            type: "orange_1",
            x: 371,
            y: 50,
            rotation: 0,
            friction: .1
        }, {
            type: "gun_carriage",
            x: 38,
            y: 263,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 430,
                y: 96
            }
        }, {
            type: 0,
            point1: {
                x: 402,
                y: 52
            }
        }, {
            type: 0,
            point1: {
                x: 279.5,
                y: 212
            }
        }, {
            type: 0,
            point1: {
                x: 280.5,
                y: 192
            }
        }, {
            type: 0,
            point1: {
                x: 282.5,
                y: 174
            }
        }, {
            type: 0,
            point1: {
                x: 284.5,
                y: 156
            }
        }, {
            type: 0,
            point1: {
                x: 287.5,
                y: 137
            }
        }, {
            type: 0,
            point1: {
                x: 290.5,
                y: 116
            }
        }, {
            type: 0,
            point1: {
                x: 296.5,
                y: 98
            }
        }, {
            type: 0,
            point1: {
                x: 309.5,
                y: 61
            }
        }, {
            type: 0,
            point1: {
                x: 325,
                y: 48
            }
        }, {
            type: 0,
            point1: {
                x: 344,
                y: 49
            }
        }, {
            type: 0,
            point1: {
                x: 363,
                y: 51
            }
        }, {
            type: 0,
            point1: {
                x: 419,
                y: 60
            }
        }, {
            type: 0,
            point1: {
                x: 278,
                y: 230
            }
        }, {
            type: 0,
            point1: {
                x: 285,
                y: 255
            }
        }, {
            type: 0,
            point1: {
                x: 302.5,
                y: 79
            }
        }, {
            type: 0,
            point1: {
                x: 428,
                y: 79
            }
        }, {
            type: 0,
            point1: {
                x: 271,
                y: 250
            }
        }, {
            type: 0,
            point1: {
                x: 381,
                y: 49
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 115,
            y: 308,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 155,
            y: 308,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 135,
            y: 267,
            rotation: 0,
            custom: "850"
        }, {
            type: "earth_3_snow",
            x: 9,
            y: 163,
            rotation: .7853981633974483
        }, {
            type: "earth_3_snow",
            x: 19,
            y: 182,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 57,
            y: 182,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 1,
            y: 127,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: 1,
            y: 86,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: 1,
            y: 45,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: 76,
            y: 96,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 106,
            y: 99,
            rotation: .2617993877991494
        }, {
            type: "earth_3_snow",
            x: 212,
            y: 125,
            rotation: .2617993877991494
        }, {
            type: "log_2",
            x: 164,
            y: 67,
            rotation: .11179938779914943,
            density: .5,
            friction: .8
        }, {
            type: "orange_1",
            x: 77,
            y: 62,
            rotation: 0
        }, {
            type: "cogwheel_1",
            x: 364,
            y: 81.5,
            rotation: 0
        }, {
            type: "ice_ball_level4_7_19_22",
            x: 345,
            y: 157.5,
            rotation: 0,
            density: .37
        }, {
            type: "chain",
            x: 345,
            y: 102.5,
            rotation: 0
        }, {
            type: "chain",
            x: 345,
            y: 122.5,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 345,
                y: 112.5
            }
        }, {
            type: 0,
            point1: {
                x: 344,
                y: 132.5
            }
        }, {
            type: 0,
            point1: {
                x: 345,
                y: 91.5
            }
        }, {
            type: 0,
            point1: {
                x: 344,
                y: 112.5
            }
        }, {
            type: 0,
            point1: {
                x: 364,
                y: 81.5
            },
            custom: "-4"
        }]
    }, {
        objects: [{
            type: "gun_carriage",
            x: 240,
            y: 258,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 198,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 238,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 19,
            y: 243,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 460,
            y: 243,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 9,
            y: 117,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 465,
            y: 117,
            rotation: 0
        }, {
            type: "earth_3",
            x: 17,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 56,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 95,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 134,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 173,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 212,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 251,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 290,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 328,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 367,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 406,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 445,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3",
            x: 483,
            y: -3,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 79,
            y: 44,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 402,
            y: 44,
            rotation: 0
        }, {
            type: "log_2",
            x: 61,
            y: 199,
            rotation: -1.5707963267948966
        }, {
            type: "screw",
            x: 62,
            y: 258,
            rotation: 0
        }, {
            type: "log_2",
            x: 410,
            y: 199,
            rotation: 1.5707963267948966
        }, {
            type: "screw",
            x: 410,
            y: 258,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 278,
            y: 300,
            rotation: 0
        }, {
            type: "plank_1",
            x: 168,
            y: 57,
            rotation: 0
        }, {
            type: "plank_1",
            x: 314,
            y: 57,
            rotation: 0
        }, {
            type: "bomb",
            x: 244,
            y: 51,
            rotation: 0,
            density: .7,
            custom: "150"
        }, {
            type: "orange_1",
            x: 227,
            y: 40,
            rotation: 0
        }, {
            type: "orange_1",
            x: 205,
            y: 40,
            rotation: 0
        }, {
            type: "orange_1",
            x: 184,
            y: 40,
            rotation: 0
        }, {
            type: "orange_1",
            x: 162,
            y: 40,
            rotation: 0
        }, {
            type: "orange_1",
            x: 265,
            y: 40,
            rotation: 0
        }, {
            type: "orange_1",
            x: 286,
            y: 40,
            rotation: 0
        }, {
            type: "orange_1",
            x: 308,
            y: 40,
            rotation: 0
        }, {
            type: "orange_1",
            x: 330,
            y: 40,
            rotation: 0
        }, {
            type: "screw",
            x: 109,
            y: 56,
            rotation: 0
        }, {
            type: "screw",
            x: 371,
            y: 57,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 371,
                y: 57
            }
        }, {
            type: 0,
            point1: {
                x: 109,
                y: 57
            }
        }, {
            type: 0,
            point1: {
                x: 232,
                y: 57
            }
        }, {
            type: 0,
            point1: {
                x: 252,
                y: 57
            }
        }, {
            type: 0,
            point1: {
                x: 61,
                y: 258
            }
        }, {
            type: 0,
            point1: {
                x: 410,
                y: 258
            }
        }]
    }, {
        objects: [{
            type: "earth_4_snow",
            x: 19,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 59,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 99,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 139,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 179,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 219,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 259,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 299,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 339,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 379,
            y: 300,
            rotation: 0
        }, {
            type: "earth_4_snow",
            x: 448,
            y: 29,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 41,
            y: 257,
            rotation: 0
        }, {
            type: "snow_ball_level5_14",
            x: 221,
            y: 242,
            rotation: 0,
            density: 2
        }, {
            type: "snow_ball_level10v3",
            x: 221,
            y: 174,
            rotation: 0,
            density: 1.5
        }, {
            type: "snow_ball_level10v2",
            x: 221,
            y: 120,
            rotation: 0,
            density: 1,
            restitution: .01,
            friction: 5
        }, {
            type: "orange_2",
            x: 220.5,
            y: 82,
            rotation: 0,
            density: .5,
            restitution: .01,
            friction: 5
        }, {
            type: "chain",
            x: 448,
            y: 59,
            rotation: 0
        }, {
            type: "chain",
            x: 448,
            y: 79,
            rotation: 0
        }, {
            type: "chain",
            x: 448,
            y: 121,
            rotation: 0
        }, {
            type: "chain",
            x: 448,
            y: 140,
            rotation: 0
        }, {
            type: "chain",
            x: 448,
            y: 188,
            rotation: 0
        }, {
            type: "chain",
            x: 448,
            y: 208,
            rotation: 0
        }, {
            type: "orange_1",
            x: 448,
            y: 99,
            rotation: 0
        }, {
            type: "orange_1_2",
            x: 449,
            y: 163,
            rotation: 0
        }, {
            type: "orange_1_3",
            x: 448,
            y: 235,
            rotation: 0
        }, {
            type: "orange_2_2",
            x: 294,
            y: 262,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 448,
                y: 49
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 219
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 199
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 177
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 151
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 130
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 110
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 90
            }
        }, {
            type: 0,
            point1: {
                x: 448,
                y: 69
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 461,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 422,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 383,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 343,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 303,
            y: 262,
            rotation: 0
        }, {
            type: "earth_3",
            x: 303,
            y: 301,
            rotation: 0
        }, {
            type: "earth_3",
            x: 263,
            y: 301,
            rotation: 0
        }, {
            type: "earth_3",
            x: 224,
            y: 301,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 264,
            y: 261,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 224,
            y: 261,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 224,
            y: 182,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 263,
            y: 182,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 301,
            y: 182,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 486,
            y: 109,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 447,
            y: 109,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 457,
            y: 68,
            rotation: 0
        }, {
            type: "orange_2",
            x: 290,
            y: 226,
            rotation: 0
        }, {
            type: "log_3",
            x: 231,
            y: 228,
            rotation: 0
        }, {
            type: "orange_1",
            x: 248,
            y: 151,
            rotation: 0
        }, {
            type: "orange_1",
            x: 299,
            y: 151,
            rotation: 0
        }, {
            type: "plank_1",
            x: 263,
            y: 132,
            rotation: 0
        }, {
            type: "log_2",
            x: 72,
            y: 117,
            rotation: 1.5707963267948966
        }, {
            type: "nail",
            x: 71,
            y: 117,
            rotation: 0
        }, {
            type: "chain_rusted",
            x: 71,
            y: 199,
            rotation: 0
        }, {
            type: "chain_rusted",
            x: 71,
            y: 219,
            rotation: 0
        }, {
            type: "chain_rusted",
            x: 71,
            y: 240,
            rotation: 0
        }, {
            type: "ice_ball",
            x: 71,
            y: 267,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 72,
                y: 117
            }
        }, {
            type: 0,
            point1: {
                x: 71,
                y: 250
            }
        }, {
            type: 0,
            point1: {
                x: 71,
                y: 188
            }
        }, {
            type: 0,
            point1: {
                x: 71,
                y: 231
            }
        }, {
            type: 0,
            point1: {
                x: 71,
                y: 210
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 18,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 57,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3",
            x: 434,
            y: 287,
            rotation: 0
        }, {
            type: "earth_3",
            x: 434,
            y: 247,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 433,
            y: 207,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 40,
            y: 261,
            rotation: 0,
            custom: "900"
        }, {
            type: "orange_2_2",
            x: 431,
            y: 171,
            rotation: 0
        }, {
            type: "chain",
            x: 287,
            y: 55,
            rotation: 0,
            density: 2
        }, {
            type: "chain",
            x: 287,
            y: 75,
            rotation: 0
        }, {
            type: "chain",
            x: 287,
            y: 95,
            rotation: 0
        }, {
            type: "orange_1_3",
            x: 288,
            y: 118,
            rotation: 0
        }, {
            type: "chain",
            x: 250,
            y: 57,
            rotation: 0,
            density: 2
        }, {
            type: "chain",
            x: 250,
            y: 93,
            rotation: 0,
            density: 1.5
        }, {
            type: "bomb",
            x: 250,
            y: 72,
            rotation: -.35,
            density: 1,
            custom: "115"
        }, {
            type: "wheel",
            x: 260,
            y: 139,
            rotation: 0,
            density: .5
        }, {
            type: "chain",
            x: 253,
            y: 120,
            rotation: -.15000000000000002,
            density: 1
        }, {
            type: "bomb",
            x: 251,
            y: 104,
            rotation: -.35,
            density: 1,
            custom: "130"
        }, {
            type: "wheel",
            x: 300,
            y: 152,
            rotation: 0,
            density: .5
        }, {
            type: "wheel",
            x: 321,
            y: 122,
            rotation: 0,
            density: .5
        }, {
            type: "wheel",
            x: 321,
            y: 86,
            rotation: 0,
            density: .5
        }, {
            type: "chain",
            x: 276,
            y: 146,
            rotation: -1.0000000000000002
        }, {
            type: "chain",
            x: 309,
            y: 142,
            rotation: .7000000000000005
        }, {
            type: "chain",
            x: 322,
            y: 103,
            rotation: 0
        }, {
            type: "chain",
            x: 320,
            y: 51,
            rotation: 0,
            density: 2
        }, {
            type: "chain",
            x: 320,
            y: 69,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 433,
            y: 207,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 459,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 420,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 381,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 342,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 303,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 264,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 225,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 186,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 147,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 108,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 68,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 29,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: -10,
            y: 29,
            rotation: 0
        }, {
            type: "earth_3",
            x: 435,
            y: 325,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 287,
                y: 106
            }
        }, {
            type: 0,
            point1: {
                x: 287,
                y: 85
            }
        }, {
            type: 0,
            point1: {
                x: 250,
                y: 68
            }
        }, {
            type: 0,
            point1: {
                x: -10,
                y: 26
            }
        }, {
            type: 0,
            point1: {
                x: -10,
                y: 26
            }
        }, {
            type: 0,
            point1: {
                x: 250,
                y: 81
            }
        }, {
            type: 0,
            point1: {
                x: 250,
                y: 103
            }
        }, {
            type: 0,
            point1: {
                x: 255,
                y: 128
            }
        }, {
            type: 0,
            point1: {
                x: 251,
                y: 112
            }
        }, {
            type: 0,
            point1: {
                x: 250,
                y: 48
            }
        }, {
            type: 0,
            point1: {
                x: 287,
                y: 47
            }
        }, {
            type: 0,
            point1: {
                x: 320,
                y: 47
            }
        }, {
            type: 0,
            point1: {
                x: 320,
                y: 60
            }
        }, {
            type: 0,
            point1: {
                x: 319,
                y: 78
            }
        }, {
            type: 0,
            point1: {
                x: 322,
                y: 93
            }
        }, {
            type: 0,
            point1: {
                x: 322,
                y: 112
            }
        }, {
            type: 0,
            point1: {
                x: 302,
                y: 150
            }
        }, {
            type: 0,
            point1: {
                x: 269,
                y: 141
            }
        }, {
            type: 0,
            point1: {
                x: 284,
                y: 151
            }
        }, {
            type: 0,
            point1: {
                x: 287,
                y: 63
            }
        }, {
            type: 0,
            point1: {
                x: 315,
                y: 134
            }
        }]
    }, {
        objects: [{
            type: "earth_3_snow",
            x: 461,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 422,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 383,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 343,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 303,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 264,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 225,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 186,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 147,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 108,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 68,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 29,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 83,
            y: 176,
            rotation: .7853981633974483,
            friction: .1
        }, {
            type: "earth_3_snow",
            x: -10,
            y: 278,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: -10,
            y: 241,
            rotation: 1.5707963267948966
        }, {
            type: "earth_3_snow",
            x: -9,
            y: 300,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 110,
            y: 204,
            rotation: .7853981633974483,
            friction: .1
        }, {
            type: "earth_3_snow",
            x: 128,
            y: 211,
            rotation: 0,
            friction: .1
        }, {
            type: "earth_3_level8",
            x: 170,
            y: 59,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 465,
            y: 158,
            rotation: 0
        }, {
            type: "earth_3",
            x: 217,
            y: -1,
            rotation: 0
        }, {
            type: "earth_3",
            x: 178,
            y: -1,
            rotation: 0
        }, {
            type: "log_3",
            x: 221,
            y: 34,
            rotation: 0,
            density: 1
        }, {
            type: "orange_2",
            x: 166,
            y: 36,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 465,
            y: 158,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 445,
            y: 158,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 426,
            y: 158,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 407,
            y: 158,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 388,
            y: 158,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 369,
            y: 158,
            rotation: 0
        }, {
            type: "earth_3_snow",
            x: 212,
            y: 288,
            rotation: .7853981633974483
        }, {
            type: "cogwheel_1",
            x: 460,
            y: 225,
            rotation: 0
        }, {
            type: "brick",
            x: 440,
            y: 245,
            rotation: -.7000000000000001,
            density: .3
        }, {
            type: "brick",
            x: 480,
            y: 205,
            rotation: -.7500000000000001,
            density: .3
        }, {
            type: "orange_2",
            x: 428,
            y: 267,
            rotation: 0
        }, {
            type: "gun_carriage",
            x: 453,
            y: 129,
            rotation: 0,
            custom: "900"
        }, {
            type: "earth_3_snow",
            x: 56,
            y: 147,
            rotation: .7853981633974483,
            friction: .1
        }, {
            type: "earth_3_snow",
            x: 231,
            y: 65,
            rotation: 0
        }, {
            type: "earth_3_level8",
            x: 486,
            y: 158,
            rotation: 0
        }],
        joints: [{
            type: 0,
            point1: {
                x: 443,
                y: 238
            }
        }, {
            type: 0,
            point1: {
                x: 449,
                y: 243
            }
        }, {
            type: 0,
            point1: {
                x: 469,
                y: 208
            }
        }, {
            type: 0,
            point1: {
                x: 475,
                y: 214
            }
        }, {
            type: 0,
            point1: {
                x: 460,
                y: 225
            },
            custom: "-5"
        }]
    }];