function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function menuTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug":"mixin item(title, href, section)\n\tli\n\t\ta(href=href data-section=section)= title\nul\n\t+item('Афиша', '\u002Fposter', 'poster')\n\tif authorized\n\t\t+item('Профиль', '\u002Fprofile', 'profile')\n\tunless authorized\n\t\t+item('Вход', '\u002Fsignin', 'signin')\n\t\t+item('Регистрация', '\u002Fsignup', 'signup')\n\t+item('О нас', '\u002Fabout', 'about')"};
;var locals_for_with = (locals || {});(function (authorized) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_mixins["item"] = pug_interp = function(title, href, section){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", href, true, false)+pug_attr("data-section", section, true, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
};
;pug_debug_line = 4;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_mixins["item"]('Афиша', '/poster', 'poster');
;pug_debug_line = 6;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
if (authorized) {
;pug_debug_line = 7;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_mixins["item"]('Профиль', '/profile', 'profile');
}
;pug_debug_line = 8;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
if (!(authorized)) {
;pug_debug_line = 9;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_mixins["item"]('Вход', '/signin', 'signin');
;pug_debug_line = 10;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_mixins["item"]('Регистрация', '/signup', 'signup');
}
;pug_debug_line = 11;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FMenu\u002FMenu.pug";
pug_mixins["item"]('О нас', '/about', 'about');
pug_html = pug_html + "\u003C\u002Ful\u003E";}.call(this,"authorized" in locals_for_with?locals_for_with.authorized:typeof authorized!=="undefined"?authorized:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}