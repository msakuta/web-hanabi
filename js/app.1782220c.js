(function(e){function t(t){for(var n,l,u=t[0],o=t[1],i=t[2],d=0,b=[];d<u.length;d++)l=u[d],Object.prototype.hasOwnProperty.call(c,l)&&c[l]&&b.push(c[l][0]),c[l]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);s&&s(t);while(b.length)b.shift()();return a.push.apply(a,i||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,u=1;u<r.length;u++){var o=r[u];0!==c[o]&&(n=!1)}n&&(a.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},c={app:0},a=[];function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],o=u.push.bind(u);u.push=t,u=u.slice();for(var i=0;i<u.length;i++)t(u[i]);var s=o;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"05fe":function(e,t,r){},a289:function(e,t,r){},adb1:function(e,t,r){"use strict";r("05fe")},c265:function(e,t,r){"use strict";r("df03")},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("7a23"),c={class:"appContainer"},a=Object(n["e"])("h1",null,"Web-hanabi",-1),l=Object(n["e"])("hr",null,null,-1),u=Object(n["d"])(" Powered by "),o=Object(n["e"])("a",{href:"https://v3.vuejs.org/"},"Vue.js",-1),i=Object(n["e"])("br",null,null,-1),s=Object(n["d"])(" Source on "),d=Object(n["e"])("a",{href:"https://github.com/msakuta/web-hanabi"},"GitHub",-1),b=Object(n["d"])(". ");function f(e,t,r,f,j,O){var p=Object(n["l"])("web-hanabi");return Object(n["f"])(),Object(n["c"])("div",c,[a,Object(n["e"])(p),l,u,o,i,s,d,b])}r("d3b7"),r("25f0");var j=Object(n["n"])("data-v-25fa0b0c");Object(n["h"])("data-v-25fa0b0c");var O=Object(n["d"])(" Remaining cards: "),p=Object(n["d"])(" Played cards: "),h=Object(n["d"])(" Discarded cards: ");Object(n["g"])();var y=j((function(e,t,r,c,a,l){var u=Object(n["l"])("player");return Object(n["f"])(),Object(n["c"])(n["a"],null,[Object(n["e"])("div",null,[O,(Object(n["f"])(!0),Object(n["c"])(n["a"],null,Object(n["k"])(c.cards,(function(e,t){return Object(n["f"])(),Object(n["c"])("span",{key:t,class:["card",e.getClass()]},Object(n["m"])(e.toString()),3)})),128))]),Object(n["e"])("div",null,[p,(Object(n["f"])(!0),Object(n["c"])(n["a"],null,Object(n["k"])(c.playedCards,(function(e,t){return Object(n["f"])(),Object(n["c"])("span",{key:t,class:["card",e.length?e[e.length-1].getClass():""]},Object(n["m"])(e.length?e[e.length-1].toString():""),3)})),128))]),Object(n["e"])("div",null,[h,(Object(n["f"])(!0),Object(n["c"])(n["a"],null,Object(n["k"])(c.discardedCards,(function(e,t){return Object(n["f"])(),Object(n["c"])("span",{key:t,class:["card",e.getClass()]},Object(n["m"])(e.toString()),3)})),128))]),Object(n["e"])("div",null," Tokens: "+Object(n["m"])(c.tokens),1),Object(n["e"])("div",null," Strikes: "+Object(n["m"])(c.strikes),1),(Object(n["f"])(!0),Object(n["c"])(n["a"],null,Object(n["k"])(c.players,(function(e,t){return Object(n["f"])(),Object(n["c"])(u,{key:t,idx:t,cards:e,isThisPlayer:c.thePlayer===t,activeTurn:c.turn===t,selectedCard:c.selectedCard,onPlayerCardClick:function(t){return c.playerCardClick(e,t)},onPlayCard:function(t){return c.playCard(e,t)},onDiscardCard:function(t){return c.discardCard(e,t)}},null,8,["idx","cards","isThisPlayer","activeTurn","selectedCard","onPlayerCardClick","onPlayCard","onDiscardCard"])})),128))],64)})),v=r("2909"),C=r("d4ec"),g=r("bee2"),m=(r("99af"),r("a434"),r("d81d"),Object(n["n"])("data-v-73967e8d")),k=m((function(e,t,r,c,a,l){return Object(n["f"])(),Object(n["c"])("div",null,[Object(n["d"])(Object(n["m"])(r.activeTurn?"* ":"  ")+" Player "+Object(n["m"])(r.idx)+": ",1),(Object(n["f"])(!0),Object(n["c"])(n["a"],null,Object(n["k"])(r.cards,(function(e,t){return Object(n["f"])(),Object(n["c"])("span",{key:t,class:["card",r.isThisPlayer?"hidden":e.getClass(),r.activeTurn&&t===r.selectedCard?"selected":""],onClick:function(e){return c.playerCardClick(t)}},Object(n["m"])(r.isThisPlayer?"  ":e.toString()),11,["onClick"])})),128)),Object(n["e"])("button",{onClick:t[1]||(t[1]=function(e){return c.playCard(r.selectedCard)})},"Play"),Object(n["e"])("button",{onClick:t[2]||(t[2]=function(e){return c.discardCard(r.selectedCard)})},"Discard")])})),P=(r("a9e3"),{name:"Player",props:{idx:Number,isThisPlayer:Boolean,cards:Array,selectedCard:Number,activeTurn:Boolean},setup:function(e,t){return{playerCardClick:function(e){return t.emit("playerCardClick",e)},playCard:function(e){return t.emit("playCard",e)},discardCard:function(e){return t.emit("discardCard",e)}}}});r("e476");P.render=k,P.__scopeId="data-v-73967e8d";var w=P,x=function(){function e(t,r){Object(C["a"])(this,e),this.number=1,this.color=1,this.number=t,this.color=r}return Object(g["a"])(e,[{key:"toString",value:function(){return"".concat(this.getColor()).concat(this.number+1," ")}},{key:"getColor",value:function(){switch(this.color){case 0:return"r";case 1:return"g";case 2:return"b";case 3:return"y";case 4:return"w";case 5:return"x";default:return"?"}}},{key:"getClass",value:function(){switch(this.color){case 0:return"red";case 1:return"green";case 2:return"blue";case 3:return"yellow";case 4:return"white";case 5:return"rainbow";default:return""}}}]),e}();function S(){for(var e=[],t=0;t<5;t++)for(var r=0;r<(0==t?3:t<5?2:1);r++)for(var n=0;n<5;n++)e.push(new x(t,n));return e}function T(e,t){return void 0===t&&(t=e.length-1),e.splice(t,1)[0]}var M={name:"WebHanabi",components:{Player:w},setup:function(){var e=S(),t=Object(n["j"])(0),r=Object(n["i"])(Object(v["a"])(Array(5)).map((function(){return[]}))),c=Object(n["i"])([]),a=Object(n["i"])(Object(v["a"])(Array(4)).map((function(){return Object(v["a"])(Array(4)).map((function(){return T(e,Math.floor(Math.random()*e.length))}))}))),l=Object(n["j"])(-1),u=Object(n["j"])(0),o=Object(n["j"])(8),i=Object(n["j"])(0);function s(e,t){if(u.value===a.indexOf(e)){var r=e[t];console.log("You clicked ".concat(r.toString())),l.value=t}else console.log("Hey, it's not your turn!")}function d(t,n){if(u.value===a.indexOf(t))if(n<0)alert("Please select a card.");else{var c=t[n];t.splice(n,1),0===r[c.color].length&&0!==c.number||0<r[c.color].length&&c.number!==r[c.color][r[c.color].length-1].number+1?i.value++:r[c.color].push(c),t.push(T(e,Math.floor(Math.random()*e.length))),u.value=(u.value+1)%a.length,l.value=-1}else alert("Hey, it's not your turn!")}function b(t,r){if(u.value===a.indexOf(t))if(r<0)alert("Please select a card.");else{var n=t[r];t.splice(r,1),c.push(n),t.push(T(e,Math.floor(Math.random()*e.length))),u.value=(u.value+1)%a.length,o.value=Math.min(8,o.value+1)}else alert("Hey, it's not your turn!")}return console.log(r),{thePlayer:t,players:a,selectedCard:l,turn:u,tokens:o,strikes:i,playedCards:r,discardedCards:c,cards:e,playerCardClick:s,playCard:d,discardCard:b}}};r("c265");M.render=y,M.__scopeId="data-v-25fa0b0c";var _=M,H={name:"App",components:{WebHanabi:_}};r("adb1");H.render=f;var A=H;Object(n["b"])(A).mount("#app")},df03:function(e,t,r){},e476:function(e,t,r){"use strict";r("a289")}});
//# sourceMappingURL=app.1782220c.js.map