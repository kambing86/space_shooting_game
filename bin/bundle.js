!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){const o=n(1),i=n(2),a=n(3),r=n(4),s=n(8),c=n(10),u=n(11),l=n(22),f=n(23),p=n(24),h=n(25),d=n(7).getParameter;$(function(){function e(){requestAnimationFrame(e),g.update(),n.render(v)}function t(){var e,t,o,i;e=t=x.width(),o=i=x.height();var a=r.gameWidth,s=r.gameHeight,c=s/a;c>i/t?t=i/c:i=t*c,m.clear(),m.beginFill(16777215,1);var u=(e-t)/2,p=(o-i)/2;m.drawRect(u,p,t,i),m.endFill(),v.x=u,v.y=p,v.scale.x=t/a,v.scale.y=i/s,n.resize(e,o),l.updatePosition(u,p),f.updatePosition((e-t)/2,p)}var n=o.autoDetectRenderer(window.innerWidth,window.innerHeight,{view:$("canvas")[0]}),v=new o.Container,m=new o.Graphics,g=new c(v),x=$(window);l.init(),f.init(),p.init(),r.init(v),v.mask=m,function(){var t=$(".loading div");i.to(t,1,{text:{value:"Loading..."},ease:a.easeNone});var n=$.Deferred(),c=$.Deferred(),l=o.loader;l.baseUrl="image/";var f=[];for(var p in u)f.push(u[p]);l.once("complete",function(){n.resolve()}).once("error",function(){n.reject()}).add(f).load(),r.gameEvent.once("soundDone",function(){c.resolve()}),r.gameEvent.once("soundFail",function(){c.reject()}),s.init(),$.when(n,c).then(function(){n=c=l=f=null,g.init();var o,s=d("level");if(s){o=h[parseInt(s)-1];var u=$(".loading"),p="Level "+s+"<br/>";o.dbs&&(p+="Avoid shooting DBS<br/>"),o.banks&&(p+="Shoot other banks for getting bonus points<br/>"),p+="Tap on screen to start";var v=.05*p.length;i.to(t,v,{text:{value:p},onComplete:function(){u.on("click",function(){u.off("click"),u.detach(),u=null,r.gameEvent.emit("gameStart"),g.start(),e()})},ease:a.easeNone,delay:1})}},function(){alert("Loading failed")})}(),x.on("resize",t),t()})},function(e,t){e.exports=PIXI},function(e,t){e.exports=TweenMax},function(e,t){e.exports=Linear},function(e,t,n){const o=n(5),i=n(6);e.exports={init:function(e){this.gameStage=e,this.Input=new i(e)},gameStage:null,gameWidth:500,gameHeight:800,gameEvent:new o,Input:null}},function(e,t,n){"use strict";function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function i(){}var a=Object.prototype.hasOwnProperty,r="function"!=typeof Object.create?"~":!1;i.prototype._events=void 0,i.prototype.eventNames=function(){var e,t=this._events,n=[];if(!t)return n;for(e in t)a.call(t,e)&&n.push(r?e.slice(1):e);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(t)):n},i.prototype.listeners=function(e,t){var n=r?r+e:e,o=this._events&&this._events[n];if(t)return!!o;if(!o)return[];if(o.fn)return[o.fn];for(var i=0,a=o.length,s=new Array(a);a>i;i++)s[i]=o[i].fn;return s},i.prototype.emit=function(e,t,n,o,i,a){var s=r?r+e:e;if(!this._events||!this._events[s])return!1;var c,u,l=this._events[s],f=arguments.length;if("function"==typeof l.fn){switch(l.once&&this.removeListener(e,l.fn,void 0,!0),f){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,t),!0;case 3:return l.fn.call(l.context,t,n),!0;case 4:return l.fn.call(l.context,t,n,o),!0;case 5:return l.fn.call(l.context,t,n,o,i),!0;case 6:return l.fn.call(l.context,t,n,o,i,a),!0}for(u=1,c=new Array(f-1);f>u;u++)c[u-1]=arguments[u];l.fn.apply(l.context,c)}else{var p,h=l.length;for(u=0;h>u;u++)switch(l[u].once&&this.removeListener(e,l[u].fn,void 0,!0),f){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,t);break;case 3:l[u].fn.call(l[u].context,t,n);break;default:if(!c)for(p=1,c=new Array(f-1);f>p;p++)c[p-1]=arguments[p];l[u].fn.apply(l[u].context,c)}}return!0},i.prototype.on=function(e,t,n){var i=new o(t,n||this),a=r?r+e:e;return this._events||(this._events=r?{}:Object.create(null)),this._events[a]?this._events[a].fn?this._events[a]=[this._events[a],i]:this._events[a].push(i):this._events[a]=i,this},i.prototype.once=function(e,t,n){var i=new o(t,n||this,!0),a=r?r+e:e;return this._events||(this._events=r?{}:Object.create(null)),this._events[a]?this._events[a].fn?this._events[a]=[this._events[a],i]:this._events[a].push(i):this._events[a]=i,this},i.prototype.removeListener=function(e,t,n,o){var i=r?r+e:e;if(!this._events||!this._events[i])return this;var a=this._events[i],s=[];if(t)if(a.fn)(a.fn!==t||o&&!a.once||n&&a.context!==n)&&s.push(a);else for(var c=0,u=a.length;u>c;c++)(a[c].fn!==t||o&&!a[c].once||n&&a[c].context!==n)&&s.push(a[c]);return s.length?this._events[i]=1===s.length?s[0]:s:delete this._events[i],this},i.prototype.removeAllListeners=function(e){return this._events?(e?delete this._events[r?r+e:e]:this._events=r?{}:Object.create(null),this):this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prototype.setMaxListeners=function(){return this},i.prefixed=r,e.exports=i},function(e,t,n){function o(e){function t(e){o.emit(e.type,e),"keydown"==e.type?a[e.keyCode]=!0:"keyup"==e.type&&(a[e.keyCode]=!1)}function n(t){t.data.local=e.toLocal(t.data.global),o.emit(t.type,t)}var o=this;i.call(o);var a={};o.KEY_LEFT=37,o.KEY_UP=38,o.KEY_RIGHT=39,o.KEY_DOWN=40,$(function(){$(window).keydown(t).keyup(t).keypress(t)}),o.isDown=function(e){return a[e]},o.isUp=function(e){return!a[e]},e.interactive=!0,e.on("mousedown",n).on("touchstart",n).on("mouseup",n).on("touchend",n).on("mouseupoutside",n).on("touchendoutside",n).on("mousemove",n).on("touchmove",n)}const i=n(5),a=n(7)["extends"];a(o,i),e.exports=o},function(e,t){e.exports={"extends":function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e},json2Array:function(e){var t=[];for(var n in e)t.push(e[n]);return t},getParameter:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)","i"),n=t.exec(location.search);return null===n?"":decodeURIComponent(n[1].replace(/\+/g," "))}}},function(e,t,n){function o(){var e,t="sound/",n={laser:"laser",explosion1:"explosion1",explosion2:"explosion2",explosion3:"explosion3",music:"music"},o=200,r=.2;!function(){function e(){r++,r>=Object.keys(n).length&&(r=s=null,a.gameEvent.emit("soundDone"))}function o(){a.gameEvent.emit("soundFail")}var r=0,s=[];i.on("fileload",e),i.on("fileerror",o);for(var c in n)s.push({id:c,src:n[c]+".mp3"});i.registerSounds(s,t)}(),a.gameEvent.on("explosion",function(e,t,o){o?i.play(n.explosion2):i.play(n.explosion1)}),a.gameEvent.on("dead",function(){i.play(n.explosion3)}),a.gameEvent.on("shoot",function(){var t=Date.now();e&&o>t-e||(e=t,i.play(n.laser,{volume:r}))}),a.gameEvent.once("gameStart",function(){i.play(n.music,{loop:-1})})}const i=n(9),a=n(4);var r=null;e.exports={init:function(){return r?r:r=new o}}},function(e,t){e.exports=createjs.Sound},function(e,t,n){function o(e){function t(e){k+=e,h.updateScore(k)}function n(){k=0,h.updateScore(k),v.resetScore()}var o,x,y,b,w,E,S,_=this,T=[],k=0,C=60,M=8e3,I=0,L=!1;_.init=function(){var o=g("level");o?(S=m[parseInt(o)-1],I=S.target):($("body").detach(),alert("Please use correct link to play the game"));var E=i.loader.resources;y=new c(E[r.plane.name].texture);var _=new s(E[r.bg.name].texture,y),M=u.getInstance(E[r.bullet.name].texture);b=l.getInstance(),w=f.getInstance(S.dbs,S.banks);var D=p.getInstance();e.addChild(_),e.addChild(y),M.addToStage(e),b.addToStage(e),w.addToStage(e),D.addToStage(e),T.push(y),T.push(_),T.push(M),T.push(b),T.push(w);for(var A=0,P=T.length;P>A;A++)T[A].init();a.gameEvent.on("score",t),a.gameEvent.on("bonus",function(){v.bonusScore()}),a.gameEvent.on("resetscore",n),a.gameEvent.once("spawn",function(){x=Date.now(),v.disappear()}),a.gameEvent.once("gameover",function(){L=!0,k>=I?v.setText("MISSION SUCCESS"):v.setText("MISSION FAILED")}),h.updateScore(k),d.updateTime(C),b.updateLevel(S.rocks)},_.start=function(){v.setText("Target<br/>"+I),y.start(),E=o=Date.now()},_.update=function(){if(!L){for(var e=Date.now(),t=.001*(e-o),n=0,i=T.length;i>n;n++)T[n].update(t);e-E>M&&(w.spawn(),E=e),x&&e-x>1e3&&(x+=1e3,C--,d.updateTime(C),0==C&&a.gameEvent.emit("gameover")),o=e}}}const i=n(1),a=n(4),r=n(11),s=n(12),c=n(13),u=n(16),l=n(17),f=n(19),p=n(21),h=n(22),d=n(23),v=n(24),m=n(25),g=n(7).getParameter;e.exports=o},function(e,t){e.exports={plane:{name:"plane",url:"redfighter.png"},bg:{name:"bg",url:"spacebg.jpg"},rock1:{name:"rock1",url:"rock1.png"},rock2:{name:"rock2",url:"rock2.png"},bullet:{name:"bullet",url:"bullet.png"},explosion1:{name:"explosion1",url:"explosion1.json"},explosion2:{name:"explosion2",url:"explosion2.json"},dbs:{name:"dbs",url:"dbs.png"},standard:{name:"standard",url:"standard.png"},uob:{name:"uob",url:"uob.png"}}},function(e,t,n){function o(e,t){var n=this;i.Container.call(n);var o,r,s=50,c=t.minX,u=t.maxX-c;n.init=function(){var t=new i.Sprite(e);n.addChild(t),o=t.height,t=new i.Sprite(e),t.y=-o,n.addChild(t),n.scale.x=n.scale.y=a.gameHeight/o,o=n.height/2,n.cacheAsBitmap=!0,r=n.width-a.gameWidth},n.update=function(e){n.y+=s*e,n.y>o&&(n.y-=o),n.x=-r*(t.x-c)/u}}const i=n(1),a=n(4),r=n(7)["extends"];r(o,i.Container),e.exports=o},function(e,t,n){function o(e){function t(e){d=!0,h=e.data.local}function n(){d=!1,h=null}function o(e){d&&(h=e.data.local)}function c(){if(l.scale.x=l.scale.y=1,l.y=s.gameHeight,v)return void v.play(0);var e=l.y-l.height,t=e+l.height/2;v=new r,v.add(a.to(l.scale,1.5,{x:.5,y:.5}),0),v.add(a.to(l,.5,{y:e}),0),v.add(a.to(l,1,{y:t,onComplete:function(){f=!1,s.gameEvent.emit("spawn")}}),.5)}var l=this;i.Sprite.call(l,e);var f=!0,p=500,h=null,d=!1;l.maxX=s.gameWidth-l.width/2,l.minX=l.width/2;var v,m;l.init=function(){l.anchor.x=l.anchor.y=.5,l.x=s.gameWidth/2,s.Input.on("mousedown",t).on("touchstart",t).on("mouseup",n).on("touchend",n).on("mouseupoutside",n).on("touchendoutside",n).on("mousemove",o).on("touchmove",o),l.scale.x=l.scale.y=.5,u.addGroup(l,"plane",u.TYPE_CIRCLE,{width:l.width-10,height:l.height-10})},l.start=c,l.update=function(e){if(!l.visible){if(!(Date.now()-m>=5e3))return;l.visible=!0,c()}if(!f){if(h){if(l.x!=h.x){var t=h.x,n=Math.min(p*e,Math.abs(t-l.x));l.x+=l.x<t?n:-n}}else{var o=s.Input.isDown(s.Input.KEY_LEFT),i=s.Input.isDown(s.Input.KEY_RIGHT);(o||i)&&(l.x+=(o?-1:1)*p*e)}l.x>l.maxX?l.x=l.maxX:l.x<l.minX&&(l.x=l.minX),s.gameEvent.emit("shoot",l.x,l.y);var a=u.isCollide(l,"rock");a&&(a.visible=!1,l.visible=!1,m=Date.now(),s.gameEvent.emit("dead"),s.gameEvent.emit("explosion",a.x,a.y,a.isBig),s.gameEvent.emit("explosion",l.x,l.y),f=!0)}}}const i=n(1),a=n(2),r=n(14),s=n(4),c=n(7)["extends"],u=n(15);c(o,i.Sprite),e.exports=o},function(e,t){e.exports=TimelineMax},function(e,t){function n(e,t,n,o,i,a,r,s){return Math.abs(e-i)<(n+r)/2&&Math.abs(t-a)<(o+s)/2}function o(e,t,n,o,a,r,s,c){var u=n/2,l=o/2,f=e>a?e-u:e+u,p=t>r?t-l:t+l;return i(Math.abs(f-a),Math.abs(p-r))<c/2}function i(e,t){return Math.sqrt(Math.pow(e,2)+Math.pow(t,2))}function a(e,t,n,o,a,r,s,c){var u=o/2+c/2,l=i(Math.abs(e-a),Math.abs(t-r));return u>l}function r(e,t,i,r,s,u,l,f,p,h){return s==c.TYPE_RECTANGLE?h==c.TYPE_RECTANGLE?n(e,t,i,r,u,l,f,p):o(e,t,i,r,u,l,f,p):h==c.TYPE_RECTANGLE?o(u,l,f,p,e,t,i,r):a(e,t,i,r,u,l,f,p)}var s={},c={TYPE_RECTANGLE:0,TYPE_CIRCLE:1,addGroup:function(e,t,n,o){n?e.collisionType=n:e.collisionType=this.TYPE_RECTANGLE,o?e.collisionArea={width:o.width,height:o.height}:e.collisionArea={width:e.width,height:e.height};var i=s[t];i?i.push(e):s[t]=[e]},isCollide:function(e,t){if(e.visible){for(var n,o,i,a,c,u,l=e.collisionArea.width,f=e.collisionArea.height,p=e.x+(.5-e.anchor.x)*l,h=e.y+(.5-e.anchor.y)*f,d=e.collisionType,v=s[t],m=0,g=v.length;g>m;m++)if(n=v[m],n.visible&&(o=n.collisionArea.width,i=n.collisionArea.height,a=n.x+(.5-n.anchor.x)*o,c=n.y+(.5-n.anchor.y)*i,u=n.collisionType,r(p,h,l,f,d,a,c,o,i,u)))return n;return null}}};e.exports=c},function(e,t,n){function o(e){function t(e,t){var n=Date.now();if(!(u&&1e3/l>n-u)){u=n;var o=s.pop();o.x=e,o.y=t,c.push(o),o.visible=!0}}var n=this,o=20,s=[],c=[],u=null,l=10,f=1e3;!function(){for(var t=0;o>t;t++){var n=new i.Sprite(e);n.anchor.x=n.anchor.y=.5,n.visible=!1,s.push(n),r.addGroup(n,"bullet")}}(),n.addToStage=function(e){var t;for(t=0;o>t;t++)e.addChild(s[t])},n.init=function(){a.gameEvent.on("shoot",t)},n.update=function(e){for(var t=0,n=c.length;n>t;t++){var o=c[t];o.y-=f*e,(o.y<-o.height||!o.visible)&&(o.visible=!1,s.push(o),c.splice(t,1),n--,t--)}}}const i=n(1),a=n(4),r=n(15);var s=null;e.exports={getInstance:function(e){return s?s:s=new o(e)}}},function(e,t,n){function o(){function e(){var e=Date.now();if(!(f||l.length>c*n||p&&1e3/h>e-p)){p=e;for(var t,i=o[Math.floor(Math.random()*c)];!t;){if(t=u[i].pop(),!t)return void(i=(i+1)%c);t.refresh(),l.push(t),t.visible=!0}}}var t=this,n=40,o=[r.rock1.name,r.rock2.name],c=o.length,u={},l=[],f=!0,p=null,h=2;!function(){var e,t,a,r,l,f,p=i.loader.resources;for(e=0;c>e;e++)for(a=o[e],r=p[a].texture,l=u[a]=[],t=0;n>t;t++)f=new s(a,r),f.init(),f.visible=!1,l.push(f)}(),t.addToStage=function(e){var t,o,i;for(t in u)for(o=u[t],i=0;n>i;i++)e.addChild(o[i])},t.init=function(){a.gameEvent.on("spawn",function(){f=!1}),a.gameEvent.on("dead",function(){f=!0})},t.update=function(t){for(var n=0,o=l.length;o>n;n++){var i=l[n];i.visible&&i.y<a.gameHeight+i.height?i.update(t):(u[i.type].push(i),l.splice(n,1),o--,n--)}e()},t.updateLevel=function(e){h=e}}const i=n(1),a=n(4),r=n(11),s=n(18);var c=null;e.exports={getInstance:function(){return c?c:c=new o}}},function(e,t,n){function o(e,t){function n(){o.x=a.gameWidth/4+Math.random()*a.gameWidth/2,o.y=-o.height,o.speedX=100*(1*Math.random()-.5),o.speedY=100*(1.5+Math.random()*r),o.speedRotation=10*(1*Math.random()-.5),o.life=o.initialLife}var o=this;i.Sprite.call(o,t),e==c.rock1.name?o.initialLife=4:o.initialLife=1,o.type=e,o.isBig=e==c.rock1.name;var r=o.isBig?2:4;o.refresh=n,o.init=function(){o.anchor.x=o.anchor.y=.5,s.addGroup(o,"rock",s.TYPE_CIRCLE),n()},o.update=function(e){if(o.x+=o.speedX*e,o.y+=o.speedY*e,o.y>a.gameHeight+o.height)return void(o.visible=!1);var t=s.isCollide(o,"bullet");if(o.rotation+=o.speedRotation*e,t){if(t.visible=!1,o.life--,o.life>0)return;o.visible=!1,a.gameEvent.emit("explosion",o.x,o.y,o.isBig),o.isBig?a.gameEvent.emit("score",50):a.gameEvent.emit("score",10)}}}const i=n(1),a=n(4),r=n(7)["extends"],s=n(15),c=n(11);r(o,i.Sprite),e.exports=o},function(e,t,n){function o(e,t){function n(){if(l&&!(p.length>l*c))for(var e,t=u[Math.floor(Math.random()*l)];!e;){if(e=f[t].pop(),!e)return void(t=(t+1)%l);e.refresh(),p.push(e),e.visible=!0}}var o=this,c=2,u=[];e&&u.push(r.dbs.name),t&&u.push(r.standard.name,r.uob.name);var l=u.length,f={},p=[];!function(){var e,t,n,o,a,r,p=i.loader.resources;for(e=0;l>e;e++)for(n=u[e],o=p[n].texture,a=f[n]=[],t=0;c>t;t++)r=new s(n,o),r.init(),r.visible=!1,a.push(r)}(),o.addToStage=function(e){var t,n,o;for(t in f)for(n=f[t],o=0;c>o;o++)e.addChild(n[o])},o.init=function(){},o.update=function(e){for(var t=0,n=p.length;n>t;t++){var o=p[t];o.visible&&o.y<a.gameHeight+o.height?o.update(e):(f[o.type].push(o),p.splice(t,1),n--,t--)}},o.spawn=n}const i=n(1),a=n(4),r=n(11),s=n(20);var c=null;e.exports={getInstance:function(e,t){return c?c:c=new o(e,t)}}},function(e,t,n){function o(e,t){var n=this;i.Sprite.call(n,t),n.type=e;var o=10,r=1;n.refresh=function(){n.x=a.gameWidth/4+Math.random()*a.gameWidth/2,n.y=-n.height,n.speedX=100*(1*Math.random()-.5),n.speedY=100*(1.5+Math.random()*r),n.life=o},n.init=function(){n.anchor.x=n.anchor.y=.5,n.refresh(),s.addGroup(n,"bank")},n.update=function(t){if(n.x+=n.speedX*t,n.y+=n.speedY*t,n.y>a.gameHeight+n.height)return void(n.visible=!1);var o=s.isCollide(n,"bullet");if(o){if(o.visible=!1,n.life--,n.life>0)return;n.visible=!1,a.gameEvent.emit("explosion",n.x,n.y,!0),e==c.dbs.name?a.gameEvent.emit("resetscore"):(a.gameEvent.emit("score",500),a.gameEvent.emit("bonus"))}}}const i=n(1),a=n(4),r=n(7)["extends"],s=n(15),c=n(11);r(o,i.Sprite),e.exports=o},function(e,t,n){function o(){var e=this,t={},n=[{name:r.explosion1.name,count:10},{name:r.explosion2.name,count:20}];!function(){var e,o,a,r,c,u,l,f=n.length,p=i.loader.resources;for(e=0;f>e;e++)for(a=n[e].name,r=n[e].count,c=s(p[a].textures),u=t[a]=[],o=0;r>o;o++)l=new i.extras.MovieClip(c),l.anchor.x=l.anchor.y=.5,l.loop=!1,l.type=a,0==e&&(l.animationSpeed=.5,l.scale.x=l.scale.y=2),l.onComplete=function(){this.visible=!1,t[this.type].push(this)},l.visible=!1,u.push(l)}(),e.addToStage=function(e){var n,o,i,a;for(n in t)for(o=t[n],a=o.length,i=0;a>i;i++)e.addChild(o[i])},a.gameEvent.on("explosion",function(e,o,i){var a;a=i?n[0].name:n[1].name;var r=t[a].pop();r&&(r.rotation=(Math.random()>.5?-1:1)*Math.random()*Math.PI,r.x=e,r.y=o,r.visible=!0,r.gotoAndPlay(0))})}const i=n(1),a=n(4),r=n(11),s=n(7).json2Array;var c=null;e.exports={getInstance:function(){return c?c:c=new o}}},function(e,t){var n,o;e.exports={init:function(){n=$(".scoreDiv"),o=$(".scoreDiv span")[0]},updateScore:function(e){o.innerHTML=e},updatePosition:function(e,t){n.css({top:t,left:e})}}},function(e,t){var n,o;e.exports={init:function(){n=$(".timeDiv"),o=$(".timeDiv span")[0]},updateTime:function(e){o.innerHTML=e},updatePosition:function(e,t){n.css({top:t,right:e})}}},function(e,t,n){const o=n(2),i=n(3);var a,r=function(){o.to(a,1.2,{css:{scaleX:2,scaleY:2},startAt:{opacity:1,scaleX:1,scaleY:1}}),o.to(a,.4,{opacity:0,delay:.8})};e.exports={init:function(){a=$(".inGameTextDiv")},setText:function(e){a.css({opacity:1,color:"#fff",transform:""}).html(""),o.to(a,1,{text:{value:e},ease:i.easeNone})},disappear:function(){o.to(a,2,{opacity:0})},resetScore:function(){a.css({color:"#e6262d"}).html("Score Reset!!"),r()},bonusScore:function(){a.css({color:"#fff500"}).html("Bonus Score!!"),r()}}},function(e,t){e.exports=[{rocks:3,dbs:!1,banks:!1,target:3e3},{rocks:4,dbs:!0,banks:!1,target:3e3},{rocks:5,dbs:!0,banks:!0,target:5e3},{rocks:6,dbs:!0,banks:!0,target:5e3}]}]);
//# sourceMappingURL=bundle.js.map