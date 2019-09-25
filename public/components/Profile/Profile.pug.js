function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function profileTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug":"div.ProfileSpan Мне #{age} лет и я уже #{score} раз сходил в кино.\ndiv (!!! надпись добавлена через PU(B)G !!!)"};
;var locals_for_with = (locals || {});(function (age, score) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + "\u003Cdiv class=\"ProfileSpan\"\u003E";
;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + "Мне ";
;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = age) ? "" : pug_interp));
;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + " лет и я уже ";
;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = score) ? "" : pug_interp));
;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + " раз сходил в кино.\u003C\u002Fdiv\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fpublic\u002F\u002Fcomponents\u002FProfile\u002FProfile.pug";
pug_html = pug_html + "(!!! надпись добавлена через PU(B)G !!!)\u003C\u002Fdiv\u003E";}.call(this,"age" in locals_for_with?locals_for_with.age:typeof age!=="undefined"?age:undefined,"score" in locals_for_with?locals_for_with.score:typeof score!=="undefined"?score:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}