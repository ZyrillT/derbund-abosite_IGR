window.cre_client=function(){var e=function(){function e(e,n,a){var t="";if(a){var i=new Date;i.setTime(i.getTime()+1e3*60*60*24*a),t="; expires="+i.toGMTString()}document.cookie=e+"="+n+t+"; path=/"}function n(e){for(var n=e+"=",a=document.cookie.split(";"),t=0;a.length>t;t++){for(var i=a[t];" "==i.charAt(0);)i=i.substring(1,i.length);if(0==i.indexOf(n))return i.substring(n.length,i.length)}return null}function a(){var e=window.location.hash.substr(1),n=e.substr(e.indexOf("creId=")).split("&")[0].split("=")[1];return n}function t(e,n){return c.debug?(console.log("[DEBUG] "+e+": "+JSON.stringify(n)),void 0):null}function i(e){if(!s||c.debug){var n=p;p=[],_={};for(var a=0;n.length>a;a++)n[a](e);t("Requesting offer for",e)}}function r(e){var n={};c.getParams().replace(RegExp("([^?=&]+)(=([^&]*))?","g"),function(e,a,t,i){n[a]=i});var a=n[e];return null!=a?a:""}function o(){return"true"===n("CREOptOut")}function m(){var e=[];for(var n in _)if(_.hasOwnProperty(n)){var a=encodeURIComponent(_[n]);""!==a&&e.push(n+"="+a)}return"?"+e.join("&")}function l(){for(var e=[{name:"service_id",internalName:"serviceid"},{name:"origin",internalName:"origin"},{name:"doc_type",internalName:"doctype"},{name:"content_id",internalName:"content_id"},{name:"cms_id",internalName:"cms_id"},{name:"channel",internalName:"channel"},{name:"sub_channel",internalName:"subchannel"},{name:"sub_sub_channel",internalName:"subsubchannel"},{name:"heading",internalName:"heading"},{name:"kicker",internalName:"kicker"},{name:"video_length",internalName:"length"},{name:"video_auto_play",internalName:"autoplay"},{name:"video_position",internalName:"position"},{name:"site",internalName:"site"},{name:"tag",internalName:"tag"},{name:"entitlement",internalName:"entitlement"},{name:"offer_ids",internalName:"offerids"},{name:"variant_ids",internalName:"variantids"},{name:"disrupter_ids",internalName:"disrupterids"},{name:"global_variant_id",internalName:"globalvariant"},{name:"payment_method",internalName:"paymenttype"},{name:"page_view",internalName:"pageview",key:"action"},{name:"page_complete",internalName:"pagecomplete",key:"action"},{name:"video_start",internalName:"videostart",key:"action"},{name:"video_content_start",internalName:"videostart",key:"action"},{name:"video_ping",internalName:"videoposition",key:"action"},{name:"video_end",internalName:"videoend",key:"action"},{name:"app_start",internalName:"app_start",key:"action"},{name:"app_stop",internalName:"app_stop",key:"action"},{name:"app_background",internalName:"app_background",key:"action"},{name:"app_foreground",internalName:"app_foreground",key:"action"}],n=0,a=e.length;a>n;n++)(function(e){var n=e.name,a=e.internalName;c["set_"+n]=function(n){e.key?_[e.key]=a:_[a]=n}})(e[n])}var c=this,d="//track-igr.tagesanzeiger.ch/cre-1.0/tracking/call.js",u="false",s="true"==u,p=[];this.debug=-1!==document.cookie.indexOf("cre_debug=1");var _={};l();var f=a();null!=f&&e("creid",f,1e5),this.request=function(){if(!o()){_._u=window.location.href,_._r=document.referrer,null!=f&&(_._creid=f);var e="cre_callback_"+Math.floor(1e5*Math.random());window[e]=i,_._c=e,_._kid=r("kid"),_._wid=r("wid"),window.oldbrowser===!0&&(_.oldbrowser="true");var n=m(),a=document.createElement("script");return a.async=!0,a.src=d+n,t("Requested script",a.src),document.head?document.head.appendChild(a):document.body.appendChild(a),!0}},this.addListener=function(e){p.push(e)},this.getParams=function(){return window.location.search}};return new e}();