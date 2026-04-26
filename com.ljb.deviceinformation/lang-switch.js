(function () {
    "use strict";

    var CSS =
        ".lang-bar{position:sticky;top:0;z-index:1;display:flex;align-items:center;justify-content:flex-end;gap:6px;" +
        "padding:8px 0 12px;margin:-8px 0 4px;" +
        "background:linear-gradient(to bottom,#fff 75%,rgba(255,255,255,0.94));border-bottom:1px solid #e8e8e8;" +
        "font-size:14px;}" +
        ".lang-bar a{color:#0b57d0;text-decoration:none;padding:4px 8px;border-radius:6px;}" +
        ".lang-bar a:hover{background:#f0f4ff;}" +
        ".lang-bar a.current{color:#222;font-weight:600;pointer-events:none;cursor:default;}" +
        ".lang-sep{color:#ccc;user-select:none;}";

    function run() {
        if (document.getElementById("lang-bar")) {
            return;
        }
        var name = (location.pathname || "").split("/").pop() || "";
        var m = /^(pp|ua)_(zh|en)\.html$/i.exec(name);
        if (!m) {
            return;
        }
        if (!document.getElementById("lang-switch-style")) {
            var styleEl = document.createElement("style");
            styleEl.id = "lang-switch-style";
            styleEl.textContent = CSS;
            document.head.appendChild(styleEl);
        }
        var type = m[1].toLowerCase();
        var lang = m[2].toLowerCase();
        var q = location.search || "";
        var bar = document.createElement("nav");
        bar.className = "lang-bar";
        bar.id = "lang-bar";
        var htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
        bar.setAttribute("aria-label", htmlLang.indexOf("zh") === 0 ? "语言" : "Language");
        var aZh = document.createElement("a");
        aZh.href = type + "_zh.html" + q;
        aZh.textContent = "中文";
        var sep = document.createElement("span");
        sep.className = "lang-sep";
        sep.setAttribute("aria-hidden", "true");
        sep.textContent = "|";
        var aEn = document.createElement("a");
        aEn.href = type + "_en.html" + q;
        aEn.textContent = "English";
        if (lang === "zh") {
            aZh.classList.add("current");
            aZh.setAttribute("aria-current", "page");
        } else {
            aEn.classList.add("current");
            aEn.setAttribute("aria-current", "page");
        }
        bar.appendChild(aZh);
        bar.appendChild(sep);
        bar.appendChild(aEn);
        document.body.insertBefore(bar, document.body.firstChild);
    }

    if (document.body) {
        run();
    } else {
        document.addEventListener("DOMContentLoaded", run);
    }
})();
