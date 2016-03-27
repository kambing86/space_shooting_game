!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var o=n(1),i=n(2),r=n(6),a=n(8),s=n(9),u=n(22),c=n(23);$(function(){function e(){requestAnimationFrame(e),h.update(),n.render(l)}function t(){var e,t,o,r;e=t=f.width(),o=r=f.height();var a=i.gameWidth,s=i.gameHeight,h=s/a;h>r/t?t=r/h:r=t*h,p.clear(),p.beginFill(16777215,1);var d=(e-t)/2,v=(o-r)/2;p.drawRect(d,v,t,r),p.endFill(),l.x=d,l.y=v,l.scale.x=t/a,l.scale.y=r/s,n.resize(e,o),u.updatePosition(d,v),c.updatePosition(d,v,t)}var n=o.autoDetectRenderer(window.innerWidth,window.innerHeight,{view:$("canvas")[0]}),l=new o.Container,p=new o.Graphics,h=new a(l),f=$(window);u.init(),c.init(),i.gameStage=l,l.mask=p,function(){var t=$.Deferred(),n=$.Deferred(),a=o.loader;a.baseUrl="image/";var u=[];for(var c in s)u.push(s[c]);a.once("complete",function(){t.resolve()}).once("error",function(){t.reject()}).add(u).load(),i.gameEvent.once("soundDone",function(){n.resolve()}),i.gameEvent.once("soundFail",function(){n.reject()}),r.init(),$.when(t,n).then(function(){t=n=a=u=null;var o=$(".loading");o.find("div").html("Tap on screen to start"),o.on("click",function(){o.off("click"),o.detach(),o=null,h.init(),i.gameEvent.emit("gameStart"),e()})},function(){alert("Loading failed")})}(),f.on("resize",t),t()})},function(e,t){e.exports=PIXI},function(e,t,n){"use strict";var o=n(3),i=n(4);e.exports={gameStage:null,gameWidth:500,gameHeight:800,gameEvent:new o,gameStartTime:null,Input:new i}},function(e,t,n){"use strict";function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function i(){}var r=Object.prototype.hasOwnProperty,a="function"!=typeof Object.create?"~":!1;i.prototype._events=void 0,i.prototype.eventNames=function(){var e,t=this._events,n=[];if(!t)return n;for(e in t)r.call(t,e)&&n.push(a?e.slice(1):e);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(t)):n},i.prototype.listeners=function(e,t){var n=a?a+e:e,o=this._events&&this._events[n];if(t)return!!o;if(!o)return[];if(o.fn)return[o.fn];for(var i=0,r=o.length,s=new Array(r);r>i;i++)s[i]=o[i].fn;return s},i.prototype.emit=function(e,t,n,o,i,r){var s=a?a+e:e;if(!this._events||!this._events[s])return!1;var u,c,l=this._events[s],p=arguments.length;if("function"==typeof l.fn){switch(l.once&&this.removeListener(e,l.fn,void 0,!0),p){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,t),!0;case 3:return l.fn.call(l.context,t,n),!0;case 4:return l.fn.call(l.context,t,n,o),!0;case 5:return l.fn.call(l.context,t,n,o,i),!0;case 6:return l.fn.call(l.context,t,n,o,i,r),!0}for(c=1,u=new Array(p-1);p>c;c++)u[c-1]=arguments[c];l.fn.apply(l.context,u)}else{var h,f=l.length;for(c=0;f>c;c++)switch(l[c].once&&this.removeListener(e,l[c].fn,void 0,!0),p){case 1:l[c].fn.call(l[c].context);break;case 2:l[c].fn.call(l[c].context,t);break;case 3:l[c].fn.call(l[c].context,t,n);break;default:if(!u)for(h=1,u=new Array(p-1);p>h;h++)u[h-1]=arguments[h];l[c].fn.apply(l[c].context,u)}}return!0},i.prototype.on=function(e,t,n){var i=new o(t,n||this),r=a?a+e:e;return this._events||(this._events=a?{}:Object.create(null)),this._events[r]?this._events[r].fn?this._events[r]=[this._events[r],i]:this._events[r].push(i):this._events[r]=i,this},i.prototype.once=function(e,t,n){var i=new o(t,n||this,!0),r=a?a+e:e;return this._events||(this._events=a?{}:Object.create(null)),this._events[r]?this._events[r].fn?this._events[r]=[this._events[r],i]:this._events[r].push(i):this._events[r]=i,this},i.prototype.removeListener=function(e,t,n,o){var i=a?a+e:e;if(!this._events||!this._events[i])return this;var r=this._events[i],s=[];if(t)if(r.fn)(r.fn!==t||o&&!r.once||n&&r.context!==n)&&s.push(r);else for(var u=0,c=r.length;c>u;u++)(r[u].fn!==t||o&&!r[u].once||n&&r[u].context!==n)&&s.push(r[u]);return s.length?this._events[i]=1===s.length?s[0]:s:delete this._events[i],this},i.prototype.removeAllListeners=function(e){return this._events?(e?delete this._events[a?a+e:e]:this._events=a?{}:Object.create(null),this):this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prototype.setMaxListeners=function(){return this},i.prefixed=a,e.exports=i},function(e,t,n){"use strict";function o(){function e(e){t.emit(e.type,e),"keydown"==e.type?n[e.keyCode]=!0:"keyup"==e.type&&(n[e.keyCode]=!1)}var t=this;i.call(t);var n={};t.KEY_LEFT=37,t.KEY_UP=38,t.KEY_RIGHT=39,t.KEY_DOWN=40,$(function(){$(window).keydown(e).keyup(e).keypress(e)}),t.isDown=function(e){return n[e]},t.isUp=function(e){return!n[e]}}var i=n(3),r=n(5);r(o,i),e.exports=o},function(e,t){"use strict";e.exports=function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e}},function(e,t,n){"use strict";function o(){var e,t="sound/",n={laser:"laser",explosion1:"explosion1",explosion2:"explosion2",explosion3:"explosion3",music:"music"},o=200,a=.2;!function(){function e(){a++,a>=Object.keys(n).length&&(a=s=null,r.gameEvent.emit("soundDone"))}function o(){r.gameEvent.emit("soundFail")}var a=0,s=[];i.on("fileload",e),i.on("fileerror",o);for(var u in n)s.push({id:u,src:n[u]+".mp3"});i.registerSounds(s,t)}(),r.gameEvent.on("explosion",function(e,t,o){o?i.play(n.explosion2):i.play(n.explosion1)}),r.gameEvent.on("dead",function(){i.play(n.explosion3)}),r.gameEvent.on("shoot",function(){var t=Date.now();e&&o>t-e||(e=t,i.play(n.laser,{volume:a}))}),r.gameEvent.once("gameStart",function(){i.play(n.music,{loop:-1})})}var i=n(7),r=n(2),a=null;e.exports={init:function(){return a?a:a=new o}}},function(e,t){e.exports=createjs.Sound},function(e,t,n){"use strict";function o(e){function t(t){t.data.local=e.toLocal(t.data.global),r.Input.emit(t.type,t)}function n(e){b+=e,f.updateScore(b),4>C&&b/500>C&&(C++,d.updateLevel(C),v.updateLevel(C))}function o(){b=0,f.updateScore(b)}var v,m,g,x=this,y=Date.now(),w=[],b=0,C=1,_=1e4;x.init=function(){var f=i.loader.resources,d=new u(f[a.plane.name].texture),x=new s(f[a.bg.name].texture,d);e.addChild(x),w.push(x),e.addChild(d),w.push(d);var y=new c(f[a.bullet.name].texture);e.addChild(y),w.push(y),v=new l,e.addChild(v),w.push(v),m=new p,e.addChild(m),w.push(m),h.init(e),e.interactive=!0,e.on("mousedown",t).on("touchstart",t).on("mouseup",t).on("touchend",t).on("mouseupoutside",t).on("touchendoutside",t).on("mousemove",t).on("touchmove",t);for(var b=0,C=w.length;C>b;b++)w[b].init();r.gameStartTime=Date.now(),r.gameEvent.on("score",n),r.gameEvent.on("resetscore",o),g=Date.now()},x.update=function(){for(var e=Date.now(),t=.001*(e-y),n=0,o=w.length;o>n;n++)w[n].update(t);e-g>_&&(m.spawn(),g=e),y=e}}var i=n(1),r=n(2),a=n(9),s=n(10),u=n(11),c=n(15),l=n(16),p=n(18),h=n(20),f=n(22),d=n(23);e.exports=o},function(e,t){"use strict";e.exports={plane:{name:"plane",url:"redfighter.png"},bg:{name:"bg",url:"spacebg.jpg"},rock1:{name:"rock1",url:"rock1.png"},rock2:{name:"rock2",url:"rock2.png"},bullet:{name:"bullet",url:"bullet.png"},explosion1:{name:"explosion1",url:"explosion1.json"},explosion2:{name:"explosion2",url:"explosion2.json"},dbs:{name:"dbs",url:"dbs.png"},standard:{name:"standard",url:"standard.png"},uob:{name:"uob",url:"uob.png"}}},function(e,t,n){"use strict";function o(e,t){var n=this;i.Container.call(n);var o,a,s=50,u=t.minX,c=t.maxX-u;n.init=function(){var t=new i.Sprite(e);n.addChild(t),o=t.height,t=new i.Sprite(e),t.y=-o,n.addChild(t),n.scale.x=n.scale.y=r.gameHeight/o,o=n.height/2,n.cacheAsBitmap=!0,a=n.width-r.gameWidth},n.update=function(e){n.y+=s*e,n.y>o&&(n.y-=o),n.x=-a*(t.x-u)/c}}var i=n(1),r=n(2),a=n(5);a(o,i.Container),e.exports=o},function(e,t,n){"use strict";function o(e){function t(e){d=!0,f=e.data.local}function n(){d=!1,f=null}function o(e){d&&(f=e.data.local)}function u(){if(l.scale.x=l.scale.y=1,l.y=s.gameHeight,v)return void v.play(0);var e=l.y-l.height,t=e+l.height/2;v=new a,v.add(r.to(l.scale,1.5,{x:.5,y:.5}),0),v.add(r.to(l,.5,{y:e}),0),v.add(r.to(l,1,{y:t,onComplete:function(){p=!1,s.gameEvent.emit("spawn")}}),.5)}var l=this;i.Sprite.call(l,e);var p=!0,h=500,f=null,d=!1;l.maxX=s.gameWidth-l.width/2,l.minX=l.width/2;var v,m;l.init=function(){l.anchor.x=l.anchor.y=.5,l.x=s.gameWidth/2,s.Input.on("mousedown",t).on("touchstart",t).on("mouseup",n).on("touchend",n).on("mouseupoutside",n).on("touchendoutside",n).on("mousemove",o).on("touchmove",o),u()},l.update=function(e){if(!l.parent){if(!(Date.now()-m>=5e3))return;s.gameStage.addChild(l),u()}if(!p){if(f){if(l.x!=f.x){var t=f.x,n=Math.min(h*e,Math.abs(t-l.x));l.x+=l.x<t?n:-n}}else{var o=s.Input.isDown(s.Input.KEY_LEFT),i=s.Input.isDown(s.Input.KEY_RIGHT);(o||i)&&(l.x+=(o?-1:1)*h*e)}l.x>l.maxX?l.x=l.maxX:l.x<l.minX&&(l.x=l.minX),s.gameEvent.emit("shoot",l.x,l.y);var r=c.isCollide(l,"rock");r&&(r.parent.removeChild(r),l.parent.removeChild(l),m=Date.now(),s.gameEvent.emit("dead"),s.gameEvent.emit("explosion",r.x,r.y,r.isBig),s.gameEvent.emit("explosion",l.x,l.y),p=!0)}}}var i=n(1),r=n(12),a=n(13),s=n(2),u=n(5),c=n(14);u(o,i.Sprite),e.exports=o},function(e,t){e.exports=TweenMax},function(e,t){e.exports=TimelineMax},function(e,t){"use strict";var n={},o={addGroup:function(e,t){var o=n[t];o?o.push(e):n[t]=[e]},isCollide:function(e,t){if(null!=e.parent){for(var o,i,r,a,s,u=e.width,c=e.height,l=e.x+(.5-e.anchor.x)*u,p=e.y+(.5-e.anchor.y)*c,h=n[t],f=0,d=h.length;d>f;f++)if(o=h[f],null!=o.parent&&(i=o.width,r=o.height,a=o.x+(.5-o.anchor.x)*i,s=o.y+(.5-o.anchor.y)*r,Math.abs(l-a)<(u+i)/2&&Math.abs(p-s)<(c+r)/2))return o;return null}}};e.exports=o},function(e,t,n){"use strict";function o(e){function t(e,t){var o=Date.now();if(!(c&&1e3/l>o-c)){c=o;var i=a.pop();i.x=e,i.y=t,u.push(i),n.addChild(i)}}var n=this;i.Container.call(n);var o=20,a=[],u=[],c=null,l=10,p=1e3;n.init=function(){for(var n=0;o>n;n++){var u=new i.Sprite(e);u.anchor.x=u.anchor.y=.5,a.push(u),s.addGroup(u,"bullet")}r.gameEvent.on("shoot",t)},n.update=function(e){for(var t=0,o=u.length;o>t;t++){var i=u[t];i.y-=p*e,(i.y<-i.height||!i.parent)&&(n.removeChild(i),a.push(i),u.splice(t,1),o--,t--)}}}var i=n(1),r=n(2),a=n(5),s=n(14);a(o,i.Container),e.exports=o},function(e,t,n){"use strict";function o(){function e(){var e=Date.now();if(!(p||l.length>a*n||h&&1e3/d>e-h)){h=e;for(var i,r=o[Math.floor(Math.random()*a)];!i;){if(i=c[r].pop(),!i)return void(r=(r+1)%a);i.refresh(),l.push(i),t.addChild(i)}}}var t=this,n=40;i.Container.call(t);var o=[s.rock1.name,s.rock2.name],a=o.length,c={},l=[],p=!0,h=null,f=2,d=f;t.init=function(){var e,t,s,l,h,f,d=i.loader.resources;for(t=0;a>t;t++)for(s=o[t],l=d[s].texture,h=c[s]=[],e=0;n>e;e++)f=new u(s,l),f.init(),h.push(f);r.gameEvent.on("spawn",function(){p=!1}),r.gameEvent.on("dead",function(){p=!0})},t.update=function(t){for(var n=0,o=l.length;o>n;n++){var i=l[n];i.parent&&i.y<r.gameHeight+i.height?i.update(t):(c[i.type].push(i),l.splice(n,1),o--,n--)}e()},t.updateLevel=function(e){d=e*f}}var i=n(1),r=n(2),a=n(5),s=n(9),u=n(17);a(o,i.Container),e.exports=o},function(e,t,n){"use strict";function o(e,t){function n(){o.x=r.gameWidth/4+Math.random()*r.gameWidth/2,o.y=-o.height,o.speedX=100*(1*Math.random()-.5),o.speedY=100*(1.5+Math.random()*a),o.speedRotation=10*(1*Math.random()-.5),o.life=o.initialLife}var o=this;i.Sprite.call(o,t),e==u.rock1.name?o.initialLife=4:o.initialLife=1,o.type=e,o.isBig=e==u.rock1.name;var a=o.isBig?2:4;o.refresh=n,o.init=function(){o.anchor.x=o.anchor.y=.5,s.addGroup(o,"rock"),n()},o.update=function(e){if(o.x+=o.speedX*e,o.y+=o.speedY*e,o.y>r.gameHeight+o.height)return void o.parent.removeChild(o);var t=s.isCollide(o,"bullet");if(o.rotation+=o.speedRotation*e,t){if(t.parent.removeChild(t),o.life--,o.life>0)return;o.parent.removeChild(o),r.gameEvent.emit("explosion",o.x,o.y,o.isBig),o.isBig?r.gameEvent.emit("score",10):r.gameEvent.emit("score",5)}}}var i=n(1),r=n(2),a=n(5),s=n(14),u=n(9);a(o,i.Sprite),e.exports=o},function(e,t,n){"use strict";function o(){function e(){if(!(l.length>a*n))for(var e,i=o[Math.floor(Math.random()*a)];!e;){if(e=c[i].pop(),!e)return void(i=(i+1)%a);e.refresh(),l.push(e),t.addChild(e)}}var t=this,n=2;i.Container.call(t);var o=[s.dbs.name,s.standard.name,s.uob.name],a=o.length,c={},l=[];t.init=function(){var e,t,r,s,l,p,h=i.loader.resources;for(t=0;a>t;t++)for(r=o[t],s=h[r].texture,l=c[r]=[],e=0;n>e;e++)p=new u(r,s),p.init(),l.push(p)},t.update=function(e){for(var t=0,n=l.length;n>t;t++){var o=l[t];o.parent&&o.y<r.gameHeight+o.height?o.update(e):(c[o.type].push(o),l.splice(t,1),n--,t--)}},t.spawn=e}var i=n(1),r=n(2),a=n(5),s=n(9),u=n(19);a(o,i.Container),e.exports=o},function(e,t,n){"use strict";function o(e,t){var n=this;i.Sprite.call(n,t),n.type=e;var o=10,a=1;n.refresh=function(){n.x=r.gameWidth/4+Math.random()*r.gameWidth/2,n.y=-n.height,n.speedX=100*(1*Math.random()-.5),n.speedY=100*(1.5+Math.random()*a),n.life=o},n.init=function(){n.anchor.x=n.anchor.y=.5,n.refresh()},n.update=function(t){if(n.x+=n.speedX*t,n.y+=n.speedY*t,n.y>r.gameHeight+n.height)return void n.parent.removeChild(n);var o=s.isCollide(n,"bullet");if(o){if(o.parent.removeChild(o),n.life--,n.life>0)return;n.parent.removeChild(n),r.gameEvent.emit("explosion",n.x,n.y,!0),e==u.dbs.name?r.gameEvent.emit("resetscore"):r.gameEvent.emit("score",100)}}}var i=n(1),r=n(2),a=n(5),s=n(14),u=n(9);a(o,i.Sprite),e.exports=o},function(e,t,n){"use strict";function o(e){var t={},n=[a.explosion1.name,a.explosion2.name];!function(){var e,o,r,a,u,c,l=20,p=n.length,h=i.loader.resources;for(e=0;p>e;e++)for(r=n[e],a=s.convert(h[r].textures),u=t[r]=[],o=0;l>o;o++)c=new i.extras.MovieClip(a),c.anchor.x=c.anchor.y=.5,c.loop=!1,c.type=r,0==e&&(c.animationSpeed=.5,c.scale.x=c.scale.y=2),c.onComplete=function(){this.parent.removeChild(this),t[this.type].push(this)},u.push(c)}(),r.gameEvent.on("explosion",function(o,i,r){var a;a=r?n[0]:n[1];var s=t[a].pop();s&&(s.rotation=(Math.random()>.5?-1:1)*Math.random()*Math.PI,s.x=o,s.y=i,e.addChild(s),s.gotoAndPlay(0))})}var i=n(1),r=n(2),a=n(9),s=n(21),u=null;e.exports={init:function(e,t){return u?u:u=new o(e,t)}}},function(e,t){"use strict";e.exports={convert:function(e){var t=[];for(var n in e)t.push(e[n]);return t}}},function(e,t){"use strict";var n,o;e.exports={init:function(){n=$(".scoreDiv"),o=$(".scoreDiv span")},updateScore:function(e){o.html(e)},updatePosition:function(e,t){n.css({top:t,left:e})}}},function(e,t){"use strict";var n,o;e.exports={init:function(){n=$(".levelDiv"),o=$(".levelDiv span")},updateLevel:function(e){o.html(e)},updatePosition:function(e,t,o){n.css({top:t,left:e,width:o})}}}]);
//# sourceMappingURL=bundle.js.map