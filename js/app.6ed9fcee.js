(function(e){function t(t){for(var r,o,u=t[0],l=t[1],i=t[2],d=0,b=[];d<u.length;d++)o=u[d],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&b.push(c[o][0]),c[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);s&&s(t);while(b.length)b.shift()();return a.push.apply(a,i||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,u=1;u<n.length;u++){var l=n[u];0!==c[l]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},c={app:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var i=0;i<u.length;i++)t(u[i]);var s=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"05fe":function(e,t,n){},"2a2e":function(e,t,n){},"318f":function(e,t,n){},3976:function(e,t,n){"use strict";n("318f")},adb1:function(e,t,n){"use strict";n("05fe")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),c={class:"appContainer"},a=Object(r["g"])("h1",null,"Web-hanabi",-1),o=Object(r["g"])("hr",null,null,-1),u=Object(r["f"])(" Powered by "),l=Object(r["g"])("a",{href:"https://v3.vuejs.org/"},"Vue.js",-1),i=Object(r["g"])("br",null,null,-1),s=Object(r["f"])(" Source on "),d=Object(r["g"])("a",{href:"https://github.com/msakuta/web-hanabi"},"GitHub",-1),b=Object(r["f"])(". ");function f(e,t,n,f,h,O){var j=Object(r["n"])("web-hanabi");return Object(r["h"])(),Object(r["d"])("div",c,[a,Object(r["g"])(j),o,u,l,i,s,d,b])}n("d3b7"),n("25f0");var h=Object(r["r"])("data-v-678523ca");Object(r["j"])("data-v-678523ca");var O=Object(r["f"])("Debug mode "),j={key:0},v=Object(r["f"])(" Remaining cards: "),p=Object(r["f"])(" Played cards: "),y=Object(r["f"])(" Discarded cards: "),g={class:"history"};Object(r["i"])();var m=h((function(e,t,n,c,a,o){var u=Object(r["n"])("player-compo");return Object(r["h"])(),Object(r["d"])(r["a"],null,[Object(r["g"])("label",null,[Object(r["q"])(Object(r["g"])("input",{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.debugMode=e})},null,512),[[r["p"],c.debugMode]]),O]),c.debugMode?(Object(r["h"])(),Object(r["d"])("div",j,[v,(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(c.cards,(function(e,t){return Object(r["h"])(),Object(r["d"])("span",{key:t,class:["card",e.getClass()]},Object(r["o"])(e.toString()),3)})),128))])):Object(r["e"])("",!0),Object(r["g"])("div",null,[p,(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(c.playedCards,(function(e,t){return Object(r["h"])(),Object(r["d"])("span",{key:t,class:["card",e.length?e[e.length-1].getClass():""]},Object(r["o"])(e.length?e[e.length-1].toString():""),3)})),128))]),Object(r["g"])("div",null,[y,(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(c.discardedCards,(function(e,t){return Object(r["h"])(),Object(r["d"])("span",{key:t,class:["card",e.getClass()]},Object(r["o"])(e.toString()),3)})),128))]),Object(r["g"])("div",g,[Object(r["g"])("ul",null,[(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(c.history,(function(e){return Object(r["h"])(),Object(r["d"])("li",{key:e},Object(r["o"])(e),1)})),128))])]),Object(r["g"])("div",null," Tokens: "+Object(r["o"])(c.tokens),1),Object(r["g"])("div",null," Strikes: "+Object(r["o"])(c.strikes),1),(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(c.players,(function(e,t){return Object(r["h"])(),Object(r["d"])(u,{key:t,idx:t,player:e,isThisPlayer:!c.debugMode&&c.thePlayer===t,activeTurn:!c.gameOver&&c.turn===t,selectedCard:c.selectedCard,onPlayerAutoClick:function(t){return e.auto=!e.auto},onPlayerCardClick:function(t){return c.playerCardClick(e,t)},onPlayCard:function(t){return c.playCard(e,t)},onDiscardCard:function(t){return c.discardCard(e,t)},onHintNumber:function(t){return c.hintNumber(e,t)},onHintColor:function(t){return c.hintColor(e,t)}},null,8,["idx","player","isThisPlayer","activeTurn","selectedCard","onPlayerAutoClick","onPlayerCardClick","onPlayCard","onDiscardCard","onHintNumber","onHintColor"])})),128))],64)})),C=n("2909"),k=(n("d81d"),n("13d5"),n("a434"),n("99af"),n("cb29"),Object(r["r"])("data-v-7a0d9626"));Object(r["j"])("data-v-7a0d9626");var P={style:{position:"absolute",left:"0",right:"0",width:"8em",height:"5em"}},w=Object(r["f"])("Auto "),x={style:{position:"absolute",left:"8em",top:"0",width:"20em",height:"5em"}},N={style:{"font-size":"+2","font-weight":"bold"}},T={class:"cardLetter"},A=Object(r["g"])("br",null,null,-1),H={style:{position:"absolute",left:"28em",width:"5em",height:"3em"}},M={style:{position:"absolute",left:"8em",top:"5em",width:"20em",height:"2em"}},S=Object(r["f"])(" Hint: ");Object(r["i"])();var _=k((function(e,t,n,c,a,o){return Object(r["h"])(),Object(r["d"])("div",{class:["frame",n.activeTurn?"activeFrame":"inactiveFrame"]},[Object(r["g"])("span",P,[Object(r["g"])("div",null,Object(r["o"])(n.activeTurn?"* ":"  ")+" Player "+Object(r["o"])(n.idx)+": ",1),Object(r["g"])("label",null,[Object(r["g"])("input",{type:"checkbox",checked:n.player.auto,onClick:t[1]||(t[1]=function(){return c.playerAutoClick&&c.playerAutoClick.apply(c,arguments)})},null,8,["checked"]),w])]),Object(r["g"])("span",x,[(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(n.player.cards,(function(e,t){return Object(r["h"])(),Object(r["d"])("span",{key:t,class:["card","noselect",n.isThisPlayer?"hidden":e.getClass(),n.activeTurn&&t===n.selectedCard?"selected":""],style:"left: ".concat(5*t,"em;"),onClick:function(e){return c.playerCardClick(t)}},[Object(r["g"])("div",N,[Object(r["g"])("span",T,Object(r["o"])(c.cardLetter(t))+": ",1),Object(r["f"])(" "+Object(r["o"])(n.isThisPlayer?"??":e.toString()),1)]),(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(Array(5).fill().map((function(e,t){return t})),(function(t){return Object(r["h"])(),Object(r["d"])("span",{key:t,class:["small",e.possibleNumbers&1<<t?"":"notPossible"],style:"left: ".concat(5*t+1,"px;")},Object(r["o"])(t+1),7)})),128)),A,(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(Array(5).fill().map((function(e,t){return t})),(function(t){return Object(r["h"])(),Object(r["d"])("span",{key:t,class:["small",e.possibleColors&1<<t?"":"notPossible"],style:"left: ".concat(5*t+1,"px;")},Object(r["o"])(c.getColor(t)),7)})),128))],14,["onClick"])})),128))]),Object(r["g"])("div",H,[Object(r["g"])("button",{onClick:t[2]||(t[2]=function(e){return c.playCard(n.selectedCard)})},"Play"),Object(r["g"])("button",{onClick:t[3]||(t[3]=function(e){return c.discardCard(n.selectedCard)})},"Discard")]),Object(r["g"])("div",M,[S,(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(Array(5).fill().map((function(e,t){return t})),(function(e){return Object(r["h"])(),Object(r["d"])("button",{key:e,onClick:function(t){return c.hintNumber(e)}},Object(r["o"])(e+1),9,["onClick"])})),128)),(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["m"])(Array(5).fill().map((function(e,t){return t})),(function(e){return Object(r["h"])(),Object(r["d"])("button",{key:e,onClick:function(t){return c.hintColor(e)}},Object(r["o"])(c.getColor(e)),9,["onClick"])})),128))])],2)})),Y=(n("a9e3"),n("d4ec")),D=n("bee2"),I=function(){function e(t,n){Object(Y["a"])(this,e),this.number=1,this.color=1,this.possibleNumbers=31,this.possibleColors=31,this.number=t,this.color=n}return Object(D["a"])(e,[{key:"toString",value:function(){return"".concat(this.getColor()).concat(this.number+1," ")}},{key:"getColor",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;switch(t=null!==(e=t)&&void 0!==e?e:this.color,t){case 0:return"r";case 1:return"g";case 2:return"b";case 3:return"y";case 4:return"w";case 5:return"x";default:return"?"}}},{key:"getClass",value:function(){switch(this.color){case 0:return"red";case 1:return"green";case 2:return"blue";case 3:return"yellow";case 4:return"white";case 5:return"rainbow";default:return""}}},{key:"hintNumber",value:function(e){return this.number===e&&(this.possibleNumbers&=1<<e,!0)}},{key:"hintColor",value:function(e){return this.color===e&&(this.possibleColors&=1<<e,!0)}}]),e}();function L(){for(var e=[],t=0;t<5;t++)for(var n=0;n<(0==t?3:t<5?2:1);n++)for(var r=0;r<5;r++)e.push(new I(t,r));return e}function W(e,t){return void 0===t&&(t=e.length-1),e.splice(t,1)[0]}function B(e){return String.fromCharCode("A".charCodeAt(0)+e)}function F(e){return 0===e.length?"none are":1===e.length?B(e[0])+" is":e.reduce((function(t,n,r){return(r===e.length-1?t+" and ":0<r?t+", ":"")+B(n)}),"")+" are"}var J={name:"Player ",props:{idx:Number,isThisPlayer:Boolean,player:Object,selectedCard:Number,activeTurn:Boolean},setup:function(e,t){return{playerAutoClick:function(){return t.emit("playerAutoClick")},playerCardClick:function(e){return t.emit("playerCardClick",e)},playCard:function(e){return t.emit("playCard",e)},discardCard:function(e){return t.emit("discardCard",e)},getColor:function(e){return I.prototype.getColor(e)},hintNumber:function(e){return t.emit("hintNumber",e)},hintColor:function(e){return t.emit("hintColor",e)},cardLetter:B}}};n("f02d");J.render=_,J.__scopeId="data-v-7a0d9626";var V=J,q=n("53ca"),z=n("b85c");n("7db0"),n("c740"),n("4de4");function G(e,t){return e.reduce((function(e,n){return e+(t(n)?1:0)}),0)}var R=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2?arguments[2]:void 0;Object(Y["a"])(this,e),this.auto=!1,this.auto=n,this.cards=Object(C["a"])(Array(4)).map((function(){return r(t,Math.floor(Math.random()*t.length))}))}return Object(D["a"])(e,[{key:"think",value:function(e,t,n,r,c,a,o){var u=this,l=function(){var n=u.lastHintedNumber;if(n){var c=n.number;if(r-e.length<=n.turn&&t.find((function(e){return(0===c||e[c-1])&&!e[c]})))return u.cards.findIndex((function(e){return e.possibleNumbers===1<<c}))}var a=u.lastHintedColor;if(a){var o=G(u.cards,(function(e){return e.color===a.color}));if(1===o&&r-e.length<=a.turn)return u.cards.findIndex((function(e){return e.color===a.color}))}return-1}();if(0<=l)c(this,l,!0);else if(0!==n){var i,s=Object(C["a"])(Array(5)).map((function(e,t){return t})).filter((function(e){return!!t.find((function(t){return(0===e||t[e-1])&&!t[e]}))})),d=Object(z["a"])(e);try{for(d.s();!(i=d.n()).done;){var b=i.value;if(b!==this){var f,h=Object(z["a"])(s);try{var O=function(){var e,n=f.value,r=0,c=0,a=Object(z["a"])(b.cards);try{var u=function(){var a=e.value;a.number===n&&c++,a.number===n&&31===a.possibleNumbers&&t.find((function(e,t){return(0===n||e[n-1])&&!e[n]&&t===a.color}))&&r++};for(a.s();!(e=a.n()).done;)u()}catch(l){a.e(l)}finally{a.f()}if(0<c&&r===c)return o(b,n,!0),{v:void 0}};for(h.s();!(f=h.n()).done;){var j=O();if("object"===Object(q["a"])(j))return j.v}}catch(v){h.e(v)}finally{h.f()}}}}catch(v){d.e(v)}finally{d.f()}a(this,this.cards.length-1,!0)}}},{key:"hintNumber",value:function(e,t){for(var n=[],r=0;r<this.cards.length;r++)this.cards[r].hintNumber(e)&&n.push(r);return this.lastHintedNumber={number:e,turn:t},n}},{key:"hintColor",value:function(e,t){for(var n=[],r=0;r<this.cards.length;r++)this.cards[r].hintColor(e)&&n.push(r);return this.lastHintedColor={color:e,turn:t},n}}]),e}(),U={name:"WebHanabi",components:{PlayerCompo:V},setup:function(){var e=Object(r["k"])([]),t=L(),n=Object(r["l"])(0),c=Object(r["k"])(Object(C["a"])(Array(5)).map((function(){return[]}))),a=Object(r["k"])([]),o=Object(r["k"])(Object(C["a"])(Array(4)).map((function(e,n){return new R(t,0!==n,W)}))),u=Object(r["l"])(-1),l=Object(r["l"])(0),i=Object(r["b"])((function(){return l.value%o.length})),s=Object(r["l"])(8),d=Object(r["l"])(0),b=Object(r["l"])(!1),f=Object(r["b"])((function(){return 3<=d.value||c.reduce((function(e,t){return e&&0<t.length&&4===t[t.length-1].number}),!0)}));function h(e){var t=o.indexOf(e);return t===n.value?"You":"Player ".concat(t)}function O(){var e=o[i.value];e.auto&&!f.value&&setTimeout((function(){return e.think(o,c,s.value,l.value,v,p,y)}),1e3)}function j(e,t){if(i.value===o.indexOf(e)){var n=e.cards[t];console.log("You clicked ".concat(n.toString())),u.value=t}else console.log("Hey, it's not your turn!")}function v(n,r){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(f.value)alert("The game is over.");else if(i.value!==o.indexOf(n)||!a&&n.auto)alert("Hey, it's not your turn!");else if(r<0)alert("Please select a card.");else{var s=n.cards[r];n.cards.splice(r,1);var b=!1;0===c[s.color].length&&0!==s.number||0<c[s.color].length&&s.number!==c[s.color][c[s.color].length-1].number+1?(d.value++,b=!0):c[s.color].push(s),n.cards.push(W(t,Math.floor(Math.random()*t.length))),l.value++,u.value=-1,e.unshift("".concat(h(n)," played ").concat(B(r)," which is ").concat(s.toString()," and it was ").concat(b?"a strike":"ok")),f.value&&e.unshift("The game is over! Your score was ".concat(c.reduce((function(e,t){return e+t.length}),0))),O()}}function p(n,r){var c=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(f.value)alert("The game is over.");else if(i.value!==o.indexOf(n)||!c&&n.auto)alert("Hey, it's not your turn!");else if(r<0)alert("Please select a card.");else{var u=n.cards[r];n.cards.splice(r,1),a.push(u),n.cards.push(W(t,Math.floor(Math.random()*t.length))),l.value++,s.value=Math.min(8,s.value+1),e.unshift("".concat(h(n)," discarded ").concat(B(r)," which is ").concat(u.toString())),O()}}function y(t,r){var c=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(f.value)alert("The game is over.");else if(c||!o[i.value].auto)if(!c&&o.indexOf(t)===n.value||o.indexOf(t)===i.value)alert("You can't hint yourself!");else if(s.value<=0)alert("You used up all tokens!");else{var a=t.hintNumber(r,l.value);s.value--,e.unshift("".concat(h(o[i.value])," hinted ").concat(h(t)," about ").concat(F(a)," number ").concat(r+1)),l.value++,O()}else alert("Hey, it's not your turn!")}function g(t,r){var c=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(f.value)alert("The game is over.");else if(c||!o[i.value].auto)if(!c&&o.indexOf(t)===n.value||o.indexOf(t)===i.value)alert("You can't hint yourself!");else if(s.value<=0)alert("You used up all tokens!");else{var a=t.hintColor(r,l.value);s.value--,e.unshift("".concat(h(o[i.value])," hinted ").concat(h(t)," about ").concat(F(a)," color ").concat(I.prototype.getColor(r))),l.value++,O()}else alert("Hey, it's not your turn!")}return{history:e,thePlayer:n,players:o,selectedCard:u,turn:i,tokens:s,strikes:d,playedCards:c,discardedCards:a,cards:t,playerCardClick:j,playCard:v,discardCard:p,hintNumber:y,hintColor:g,debugMode:b,gameOver:f}}};n("3976");U.render=m,U.__scopeId="data-v-678523ca";var E=U,K={name:"App",components:{WebHanabi:E}};n("adb1");K.render=f;var Q=K;Object(r["c"])(Q).mount("#app")},f02d:function(e,t,n){"use strict";n("2a2e")}});
//# sourceMappingURL=app.6ed9fcee.js.map