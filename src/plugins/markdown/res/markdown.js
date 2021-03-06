var WizMD_pluginPath = "${CACHE_PATH}";

//-----------------------------------------------------------------
//-----------------------------------------------------------------
function WizMDInsertElem(part, elem_type, callbackfunc) {
    var WizMD_pluginPath = WizMD_pluginPath;
    var oPart = document.getElementsByTagName(part).item(0);
    var oElem = document.createElement(elem_type);
    callbackfunc(oElem);
    //oHead.appendChild(oElem); 
    oPart.insertBefore(oElem, null);
    return oElem;
}
//--------------------------------------------

function WizMDAppendScriptSrc(part, script_type, str) {
    return WizMDInsertElem(part, "script", function(oScript) {
        oScript.type = script_type;
        oScript.src = ("file://" + WizMD_pluginPath + str).replace(/\\/g, '/');
    }
  );
}

function WizMDAppendCssSrc(str) {
    WizMDInsertElem('HEAD', "link", function(oCss) {
        oCss.rel = "stylesheet";
        oCss.href = ("file://" + WizMD_pluginPath + str).replace(/\\/g, '/');
    }
  );
}

function WizMDAppendScriptInnerHtml(part, script_type, innerHtmlStr) {
    WizMDInsertElem(part, "div", function(oDiv) {
        oDiv.innerHTML = "<input type=\"hidden\"><script defer=\"true\" type=\"" + script_type + "\">" + innerHtmlStr + "</scr" + "ipt>";
    }
  );
}

function InitMarkdown() {
    WizMDAppendScriptSrc('HEAD', "text/javascript", "highlight.pack.js");
    WizMDAppendScriptSrc('HEAD', "text/javascript", "marked.js");
    var jqueryScript = WizMDAppendScriptSrc('HEAD', "text/javascript", "jquery.min.js");
    WizMDAppendCssSrc("github2.css");
    jqueryScript.onload = function() {
        WizMDAppendScriptSrc('HEAD', "text/javascript", "inject.js");
    }
}

InitMarkdown();
