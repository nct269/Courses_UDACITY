function UET(o){var n,i,t;this.stringExists=function(n){return n&&n.length>0},this.domain="bat.bing.com",this.secondaryDomain="bat.r.msn.com",this.URLLENGTHLIMIT=2048,this.pageLoadEvt="pageLoad",this.customEvt="custom",o.Ver=o.Ver!==undefined&&(o.Ver==="1"||o.Ver===1)?1:2,this.supportsCORS=this.supportsXDR=!1,this.validKeyNames={ec:1,el:1,ev:1,ea:1},this.validCustomEventKeyNames={ec:1,el:1,ev:1,ea:1,gv:1},this.invalidKeyException="Invalid data: Key Name: ",this.invalidEventException="Invalid event type: Event Type: ",this.evq=o.q||[],delete o.q,this.evqDispatch=!1,this.pageLoadDispatch=!1,this.documentLoaded=!!document.body,this.eventPushQueue=[],n=this,this.checkuetHostdocumentload=function(){this.documentLoaded=!!document.body;if(n.documentLoaded){if(n.eventPushQueue.length>0){for(var t=0;t<n.eventPushQueue.length;t++)n._push(n.eventPushQueue[t]);n.eventPushQueue=[]}}else setTimeout(function(){n.checkuetHostdocumentload()},5)},this.checkuetHostdocumentload(),window.XMLHttpRequest!==undefined&&"withCredentials"in new XMLHttpRequest&&(this.supportsCORS=!0),typeof XDomainRequest!="undefined"&&(this.supportsXDR=!0),this.push=function(){var i=arguments,t;i.length===1&&(t=i[0],n.documentLoaded?n._push(t):n.eventPushQueue.push(t))},this._push=function(n){n===this.pageLoadEvt?this.evt(this.pageLoadEvt):this.evt(this.customEvt,n)},this.dispatchq=function(){this.evqDispatch=!0;for(var n=0;n<this.evq.length;n++)this.push(this.evq[n]),this.evq[n].qe=!0},i=window.location.protocol,t=0,o.Ver===1&&o.advertiserId!==undefined&&(t=o.advertiserId),this.postURL=i+"//"+this.domain+"/action/"+t,this.urlPrefix=this.postURL+"?",this.secondPostURL=i+"//"+this.secondaryDomain+"/action-uic/"+t,this.secondUrlPrefix=this.secondPostURL+"?",delete o.advertiserId,delete o.adv,o.Ver!==1&&(this.stringExists(o.tagId)&&!this.stringExists(o.ti)&&(o.ti=o.tagId),delete o.tagId,delete o.Sig),this.invisibleDiv=null,this.invisibleFrame=null,this.getGuid=function(){function n(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()},o.mid=this.getGuid(),this.stringifyToRequest=function(n,t){var r="",u="",i;t&&(u=t+".");for(i in n)r+=typeof n[i]=="object"?this.stringifyToRequest(n[i],u+i):u+i+"="+n[i]+"&";return r},this.createInvisibleElement=function(n,t){var i=document.createElement(t);return i.setAttribute("style","width:0px; height:0px; display:none; visibility:hidden;"),i.id="batBeacon"+Math.random("bat"),n.appendChild(i),i},this.createInvisibleDiv=function(n){return this.invisibleDiv=this.createInvisibleElement(n,"div"),this.invisibleDiv.id},this.fireBeaconImg=function(n){var i=this.createInvisibleElement(this.invisibleDiv,"img"),t,r;return i.width=0,i.height=0,t=Math.floor(Math.random()*1e6),r=n+"&rn="+t,i.setAttribute("src",r),t},this.addLoadTime=function(n){var t,i;return window.performance&&(t=window.performance.timing.domContentLoadedEventEnd,window.performance.timing.loadEventEnd&&(t=window.performance.timing.loadEventEnd),t!==undefined&&t!==0&&(i=t-window.performance.timing.navigationStart,n.lt=i)),n},this.hashCode=function(n){var t=0,i,r;if(n.length===0)return t;for(i=0;i<n.length;i++)r=n.charCodeAt(i),t=(t<<5)-t+r,t=t&t;return t},this.addPluginData=function(n){for(var f=[],u,r,t,i=0;i<window.navigator.plugins.length;i++)f.push({name:window.navigator.plugins[i].name});for(u=f.sort(function(n,t){return n.name>t.name?1:n.name<t.name?-1:0}),r="",t=0;t<u.length;t++)r+=u[t].name;return n.pi=this.hashCode(r),n},this.addFraudSignals=function(n){n=this.addPluginData(n);var t=window.navigator.userLanguage||window.navigator.language;return this.stringExists(t)&&(n.lg=t),screen&&(screen.width&&(n.sw=screen.width),screen.height&&(n.sh=screen.height),screen.colorDepth&&(n.sc=screen.colorDepth)),n},this.addPageData=function(n){var r,t,i;return n=this.addLoadTime(n),n=this.addFraudSignals(n),r="",t=window.document.referrer,this.stringExists(t)&&(n.r=encodeURIComponent(t),r=t.split("?")[0]),i=window.document.title,this.stringExists(i)&&(n.tl=i),window.self!=window.top?n.hasOwnProperty("r")&&(n.p=n.r,n.r=""):(n.p=encodeURIComponent(window.location.href),n.r=encodeURIComponent(r)),n},this.removeTrailingAmp=function(n){var t=n.charAt(n.length-1);return(t==="&"||t==="?")&&(n=n.substring(0,n.length-1)),n},this.validateValue=function(n,t,i){var r=0,u=t;i=i===undefined?!1:i,t.toString().indexOf(",")!==-1&&(u=t.replace(/,/g,"")),r=parseFloat(u);if(isNaN(u)||isNaN(r)||i&&r.toString().indexOf(".")!==-1)throw n+" should be "+(i?"an integer":"a number");if(r>9999999)throw n+" cannot be greater than 9999999";return r},this.validateDataObject=function(n,t){var r,i;if(!n)throw this.invalidEventException+"undefined event.";if(n!==this.pageLoadEvt&&n!==this.customEvt)throw this.invalidEventException+n;if(!t)throw"undefined data object passed to validate";if(typeof t!="object")return;r=this.validKeyNames,n!==this.pageLoadEvt&&(r=this.validCustomEventKeyNames);for(i in t)if(!r[i])throw this.invalidKeyException+i;t.hasOwnProperty("ev")>0&&(t.ev=this.validateValue("ev",t.ev,!0)),t.hasOwnProperty("gv")>0&&(t.gv=this.validateValue("gv",t.gv,!1))},this.evt=function(n,t){var i,r;if(n===this.pageLoadEvt&&this.pageLoadDispatch===!0)return;t=t||{};if(t instanceof Array)if(t.length>0)t=t[0];else return;if(typeof t!="object")return;this.validateDataObject(n,t);if(n===this.customEvt){i=[];for(r in t)i.push(r);if(i.length===0)return}this.invisibleDiv||this.createInvisibleDiv(document.body),t.evt=n,window.self!=window.top&&(t.ifm=1),n===this.pageLoadEvt&&(t=this.addPageData(t),this.fireBeacon(t,!0),this.pageLoadDispatch=!0),this.fireBeacon(t),t.abf=!0,n===this.pageLoadEvt&&this.evqDispatch===!1&&this.dispatchq()},this.createIframe=function(n){return this.invisibleFrame=this.createInvisibleElement(n,"iframe"),this.invisibleFrame.src="",this.invisibleFrame.name=this.invisibleFrame.id,this.invisibleFrame.id},this.clone=function(n,t){t===undefined&&(t={});for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i]);return t},this.combine=function(n,t){var i=this.clone(n);return i=this.clone(t,i)},this.addHiddenFields=function(n,t,i,r){var e="",u,f;r&&(e=r+".");for(u in n)n.hasOwnProperty(u)&&(typeof n[u]=="object"?this.addHiddenFields(n[u],t,i,e+u):(f=i.createElement("input"),f.setAttribute("type","hidden"),f.setAttribute("name",e+u),f.setAttribute("value",n[u]),t.appendChild(f)))},this.fireBeacon=function(n,t){var u=this.urlPrefix,f=this.postURL;t&&(u=this.secondUrlPrefix,f=this.secondPostURL);var i=this.combine(o,n),e=this.stringifyToRequest(i),r=this.removeTrailingAmp(u+e);r.length>this.URLLENGTHLIMIT?this.supportsCORS||this.supportsXDR?this.fireBeaconCORS(i,f):this.fireBeaconForm(i):this.fireBeaconImg(r)},this.createCORSRequest=function(n,t){var i=null;return this.supportsCORS?(i=new XMLHttpRequest,i.withCredentials=!0,i.open(n,t,!0),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded")):this.supportsXDR&&(i=new XDomainRequest,i.open(n,t)),i},this.fireBeaconCORS=function(n,t){var i=this.createCORSRequest("post",t);i.send(this.removeTrailingAmp(this.stringifyToRequest(n)))},this.createForm=function(n){var t=document.createElement("form");return t.method="post",t.action=this.postURL,t.target=this.invisibleFrame.name,n.fp="1",this.addHiddenFields(n,t,document),t},this.fireBeaconForm=function(n){var i=document.getElementById(this.createIframe(document.body)),t;i.onload=function(){document.body.removeChild(i)},t=this.createForm(n,i.name),document.body.appendChild(t),t.submit(),document.body.removeChild(t)}}