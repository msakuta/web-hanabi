(function(e){function t(t){for(var r,l,o=t[0],u=t[1],i=t[2],b=0,d=[];b<o.length;b++)l=o[b],Object.prototype.hasOwnProperty.call(c,l)&&c[l]&&d.push(c[l][0]),c[l]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);s&&s(t);while(d.length)d.shift()();return a.push.apply(a,i||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==c[u]&&(r=!1)}r&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},c={app:0},a=[];function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var i=0;i<o.length;i++)t(o[i]);var s=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"05fe":function(e,t,n){},"0691":function(e,t,n){},"7bf8":function(e,t,n){},"98d5":function(e,t,n){"use strict";n("7bf8")},adb1:function(e,t,n){"use strict";n("05fe")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),c={class:"appContainer"},a=Object(r["f"])("h1",null,"Web-hanabi",-1),l=Object(r["f"])("hr",null,null,-1),o=Object(r["e"])(" Powered by "),u=Object(r["f"])("a",{href:"https://v3.vuejs.org/"},"Vue.js",-1),i=Object(r["f"])("br",null,null,-1),s=Object(r["e"])(" Source on "),b=Object(r["f"])("a",{href:"https://github.com/msakuta/web-hanabi"},"GitHub",-1),d=Object(r["e"])(". ");function f(e,t,n,f,O,h){var j=Object(r["m"])("web-hanabi");return Object(r["g"])(),Object(r["c"])("div",c,[a,Object(r["f"])(j),l,o,u,i,s,b,d])}n("d3b7"),n("25f0");var O=Object(r["q"])("data-v-a6b316b0");Object(r["i"])("data-v-a6b316b0");var h=Object(r["e"])("Debug mode "),j={key:0},p=Object(r["e"])(" Remaining cards: "),v=Object(r["e"])(" Played cards: "),y=Object(r["e"])(" Discarded cards: ");Object(r["h"])();var g=O((function(e,t,n,c,a,l){var o=Object(r["m"])("player-compo");return Object(r["g"])(),Object(r["c"])(r["a"],null,[Object(r["f"])("label",null,[Object(r["p"])(Object(r["f"])("input",{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.debugMode=e})},null,512),[[r["o"],c.debugMode]]),h]),c.debugMode?(Object(r["g"])(),Object(r["c"])("div",j,[p,(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(c.cards,(function(e,t){return Object(r["g"])(),Object(r["c"])("span",{key:t,class:["card",e.getClass()]},Object(r["n"])(e.toString()),3)})),128))])):Object(r["d"])("",!0),Object(r["f"])("div",null,[v,(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(c.playedCards,(function(e,t){return Object(r["g"])(),Object(r["c"])("span",{key:t,class:["card",e.length?e[e.length-1].getClass():""]},Object(r["n"])(e.length?e[e.length-1].toString():""),3)})),128))]),Object(r["f"])("div",null,[y,(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(c.discardedCards,(function(e,t){return Object(r["g"])(),Object(r["c"])("span",{key:t,class:["card",e.getClass()]},Object(r["n"])(e.toString()),3)})),128))]),Object(r["f"])("div",null," Tokens: "+Object(r["n"])(c.tokens),1),Object(r["f"])("div",null," Strikes: "+Object(r["n"])(c.strikes),1),(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(c.players,(function(e,t){return Object(r["g"])(),Object(r["c"])(o,{key:t,idx:t,player:e,isThisPlayer:!c.debugMode&&c.thePlayer===t,activeTurn:c.turn===t,selectedCard:c.selectedCard,onPlayerAutoClick:function(t){return e.auto=!e.auto},onPlayerCardClick:function(t){return c.playerCardClick(e,t)},onPlayCard:function(t){return c.playCard(e,t)},onDiscardCard:function(t){return c.discardCard(e,t)},onHintNumber:function(t){return c.hintNumber(e,t)},onHintColor:function(t){return c.hintColor(e,t)}},null,8,["idx","player","isThisPlayer","activeTurn","selectedCard","onPlayerAutoClick","onPlayerCardClick","onPlayCard","onDiscardCard","onHintNumber","onHintColor"])})),128))],64)})),m=n("2909"),C=(n("d81d"),n("a434"),n("cb29"),Object(r["q"])("data-v-791f18ed"));Object(r["i"])("data-v-791f18ed");var k={style:{position:"absolute",left:"0",right:"0",width:"8em",height:"5em"}},P=Object(r["e"])("Auto "),w={style:{position:"absolute",left:"8em",top:"0",width:"20em",height:"5em"}},x={style:{"font-size":"+2","font-weight":"bold"}},N=Object(r["f"])("br",null,null,-1),A={style:{position:"absolute",left:"28em",width:"5em",height:"3em"}},M={style:{position:"absolute",left:"8em",top:"5em",width:"20em",height:"2em"}},T=Object(r["e"])(" Hint: ");Object(r["h"])();var H=C((function(e,t,n,c,a,l){return Object(r["g"])(),Object(r["c"])("div",{class:["frame",n.activeTurn?"activeFrame":"inactiveFrame"]},[Object(r["f"])("span",k,[Object(r["f"])("div",null,Object(r["n"])(n.activeTurn?"* ":"  ")+" Player "+Object(r["n"])(n.idx)+": ",1),Object(r["f"])("label",null,[Object(r["f"])("input",{type:"checkbox",checked:n.player.auto,onClick:t[1]||(t[1]=function(){return c.playerAutoClick&&c.playerAutoClick.apply(c,arguments)})},null,8,["checked"]),P])]),Object(r["f"])("span",w,[(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(n.player.cards,(function(e,t){return Object(r["g"])(),Object(r["c"])("span",{key:t,class:["card","noselect",n.isThisPlayer?"hidden":e.getClass(),n.activeTurn&&t===n.selectedCard?"selected":""],style:"left: ".concat(5*t,"em;"),onClick:function(e){return c.playerCardClick(t)}},[Object(r["f"])("div",x,Object(r["n"])(n.isThisPlayer?"??":e.toString()),1),(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(Array(5).fill().map((function(e,t){return t})),(function(t){return Object(r["g"])(),Object(r["c"])("span",{key:t,class:e.possibleNumbers[t]?"":"notPossible",style:"left: ".concat(5*t+1,"px;")},Object(r["n"])(t+1),7)})),128)),N,(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(Array(5).fill().map((function(e,t){return t})),(function(t){return Object(r["g"])(),Object(r["c"])("span",{key:t,class:e.possibleColors[t]?"":"notPossible",style:"left: ".concat(5*t+1,"px;")},Object(r["n"])(c.getColor(t)),7)})),128))],14,["onClick"])})),128))]),Object(r["f"])("div",A,[Object(r["f"])("button",{onClick:t[2]||(t[2]=function(e){return c.playCard(n.selectedCard)})},"Play"),Object(r["f"])("button",{onClick:t[3]||(t[3]=function(e){return c.discardCard(n.selectedCard)})},"Discard")]),Object(r["f"])("div",M,[T,(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(Array(5).fill().map((function(e,t){return t})),(function(e){return Object(r["g"])(),Object(r["c"])("button",{key:e,onClick:function(t){return c.hintNumber(e)}},Object(r["n"])(e+1),9,["onClick"])})),128)),(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["l"])(Array(5).fill().map((function(e,t){return t})),(function(e){return Object(r["g"])(),Object(r["c"])("button",{key:e,onClick:function(t){return c.hintColor(e)}},Object(r["n"])(c.getColor(e)),9,["onClick"])})),128))])],2)})),S=(n("a9e3"),n("d4ec")),_=n("bee2"),D=(n("99af"),function(){function e(t,n){Object(S["a"])(this,e),this.number=1,this.color=1,this.possibleNumbers=Array(5).fill(!0),this.possibleColors=Array(5).fill(!0),this.number=t,this.color=n}return Object(_["a"])(e,[{key:"toString",value:function(){return"".concat(this.getColor()).concat(this.number+1," ")}},{key:"getColor",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;switch(t=null!==(e=t)&&void 0!==e?e:this.color,t){case 0:return"r";case 1:return"g";case 2:return"b";case 3:return"y";case 4:return"w";case 5:return"x";default:return"?"}}},{key:"getClass",value:function(){switch(this.color){case 0:return"red";case 1:return"green";case 2:return"blue";case 3:return"yellow";case 4:return"white";case 5:return"rainbow";default:return""}}},{key:"hintNumber",value:function(e){if(this.number!==e);else for(var t=0;t<this.possibleNumbers.length;t++)t!==e&&(this.possibleNumbers[t]=!1)}},{key:"hintColor",value:function(e){if(this.color!==e);else for(var t=0;t<this.possibleColors.length;t++)t!==e&&(this.possibleColors[t]=!1)}}]),e}());function Y(){for(var e=[],t=0;t<5;t++)for(var n=0;n<(0==t?3:t<5?2:1);n++)for(var r=0;r<5;r++)e.push(new D(t,r));return e}function I(e,t){return void 0===t&&(t=e.length-1),e.splice(t,1)[0]}var W={name:"Player ",props:{idx:Number,isThisPlayer:Boolean,player:Object,selectedCard:Number,activeTurn:Boolean},setup:function(e,t){return{playerAutoClick:function(){return t.emit("playerAutoClick")},playerCardClick:function(e){return t.emit("playerCardClick",e)},playCard:function(e){return t.emit("playCard",e)},discardCard:function(e){return t.emit("discardCard",e)},getColor:function(e){return D.prototype.getColor(e)},hintNumber:function(e){return t.emit("hintNumber",e)},hintColor:function(e){return t.emit("hintColor",e)}}}};n("98d5");W.render=H,W.__scopeId="data-v-791f18ed";var q=W,B=n("b85c"),F=(n("c740"),n("13d5"),n("fb6a"),function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2?arguments[2]:void 0;Object(S["a"])(this,e),this.auto=!1,this.auto=n,this.cards=Object(m["a"])(Array(4)).map((function(){return r(t,Math.floor(Math.random()*t.length))}))}return Object(_["a"])(e,[{key:"think",value:function(e,t,n,r){var c=this.cards.findIndex((function(e){return e.possibleNumbers[0]&&e.possibleNumbers.slice(1).reduce((function(e,t){return!e&&!t}),!0)}));if(0<=c)t(this,c,!0);else{var a,l=Object(B["a"])(e);try{for(l.s();!(a=l.n()).done;){var o=a.value;if(o!==this){var u,i=Object(B["a"])(o.cards);try{for(i.s();!(u=i.n()).done;){var s=u.value;if(0===s.number&&s.possibleNumbers.reduce((function(e,t){return e&&t}),!0))return void r(o,s.number,!0)}}catch(b){i.e(b)}finally{i.f()}}}}catch(b){l.e(b)}finally{l.f()}n(this,this.cards.length-1,!0)}}}]),e}()),J={name:"WebHanabi",components:{PlayerCompo:q},setup:function(){var e=Y(),t=Object(r["k"])(0),n=Object(r["j"])(Object(m["a"])(Array(5)).map((function(){return[]}))),c=Object(r["j"])([]),a=Object(r["j"])(Object(m["a"])(Array(4)).map((function(t,n){return new F(e,0!==n,I)}))),l=Object(r["k"])(-1),o=Object(r["k"])(0),u=Object(r["k"])(8),i=Object(r["k"])(0),s=Object(r["k"])(!1);function b(){var e=a[o.value];e.auto&&setTimeout((function(){return e.think(a,f,O,h)}),1e3)}function d(e,t){if(o.value===a.indexOf(e)){var n=e.cards[t];console.log("You clicked ".concat(n.toString())),l.value=t}else console.log("Hey, it's not your turn!")}function f(t,r){var c=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(o.value!==a.indexOf(t)||!c&&t.auto)alert("Hey, it's not your turn!");else if(r<0)alert("Please select a card.");else{var u=t.cards[r];t.cards.splice(r,1),0===n[u.color].length&&0!==u.number||0<n[u.color].length&&u.number!==n[u.color][n[u.color].length-1].number+1?i.value++:n[u.color].push(u),t.cards.push(I(e,Math.floor(Math.random()*e.length))),o.value=(o.value+1)%a.length,l.value=-1,b()}}function O(t,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(o.value!==a.indexOf(t)||!r&&t.auto)alert("Hey, it's not your turn!");else if(n<0)alert("Please select a card.");else{var l=t.cards[n];t.cards.splice(n,1),c.push(l),t.cards.push(I(e,Math.floor(Math.random()*e.length))),o.value=(o.value+1)%a.length,u.value=Math.min(8,u.value+1),b()}}function h(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(r||!a[o.value].auto)if(!r&&a.indexOf(e)===t.value||a.indexOf(e)===o.value)alert("You can't hint yourself!");else if(u.value<=0)alert("You used up all tokens!");else{for(var c=0;c<e.cards.length;c++)e.cards[c].hintNumber(n);u.value--,o.value=(o.value+1)%a.length,b()}else alert("Hey, it's not your turn!")}function j(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(r||!a[o.value].auto)if(!r&&a.indexOf(e)===t.value||a.indexOf(e)===o.value)alert("You can't hint yourself!");else if(u.value<=0)alert("You used up all tokens!");else{for(var c=0;c<e.cards.length;c++)e.cards[c].hintColor(n);u.value--,o.value=(o.value+1)%a.length,b()}else alert("Hey, it's not your turn!")}return console.log(n),{thePlayer:t,players:a,selectedCard:l,turn:o,tokens:u,strikes:i,playedCards:n,discardedCards:c,cards:e,playerCardClick:d,playCard:f,discardCard:O,hintNumber:h,hintColor:j,debugMode:s}}};n("d581");J.render=g,J.__scopeId="data-v-a6b316b0";var V=J,z={name:"App",components:{WebHanabi:V}};n("adb1");z.render=f;var G=z;Object(r["b"])(G).mount("#app")},d581:function(e,t,n){"use strict";n("0691")}});
//# sourceMappingURL=app.9def3397.js.map