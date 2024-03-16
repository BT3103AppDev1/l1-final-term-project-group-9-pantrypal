(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ui(t,e){const n=new Set(t.split(","));return e?r=>n.has(r.toLowerCase()):r=>n.has(r)}const te={},Zt=[],Te=()=>{},nu=()=>!1,$r=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),fi=t=>t.startsWith("onUpdate:"),fe=Object.assign,di=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},ru=Object.prototype.hasOwnProperty,q=(t,e)=>ru.call(t,e),H=Array.isArray,en=t=>Hr(t)==="[object Map]",La=t=>Hr(t)==="[object Set]",V=t=>typeof t=="function",ae=t=>typeof t=="string",gn=t=>typeof t=="symbol",se=t=>t!==null&&typeof t=="object",xa=t=>(se(t)||V(t))&&V(t.then)&&V(t.catch),Da=Object.prototype.toString,Hr=t=>Da.call(t),su=t=>Hr(t).slice(8,-1),Ma=t=>Hr(t)==="[object Object]",hi=t=>ae(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Cn=ui(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),jr=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},iu=/-(\w)/g,Ke=jr(t=>t.replace(iu,(e,n)=>n?n.toUpperCase():"")),ou=/\B([A-Z])/g,_n=jr(t=>t.replace(ou,"-$1").toLowerCase()),Vr=jr(t=>t.charAt(0).toUpperCase()+t.slice(1)),ds=jr(t=>t?`on${Vr(t)}`:""),wt=(t,e)=>!Object.is(t,e),hr=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Ar=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},Ds=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Qi;const Ua=()=>Qi||(Qi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function pi(t){if(H(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ae(r)?uu(r):pi(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(ae(t)||se(t))return t}const au=/;(?![^(]*\))/g,cu=/:([^]+)/,lu=/\/\*[^]*?\*\//g;function uu(t){const e={};return t.replace(lu,"").split(au).forEach(n=>{if(n){const r=n.split(cu);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function tn(t){let e="";if(ae(t))e=t;else if(H(t))for(let n=0;n<t.length;n++){const r=tn(t[n]);r&&(e+=r+" ")}else if(se(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const fu="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",du=ui(fu);function Fa(t){return!!t||t===""}const hu=t=>ae(t)?t:t==null?"":H(t)||se(t)&&(t.toString===Da||!V(t.toString))?JSON.stringify(t,Ba,2):String(t),Ba=(t,e)=>e&&e.__v_isRef?Ba(t,e.value):en(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[hs(r,i)+" =>"]=s,n),{})}:La(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>hs(n))}:gn(e)?hs(e):se(e)&&!H(e)&&!Ma(e)?String(e):e,hs=(t,e="")=>{var n;return gn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Oe;class pu{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Oe,!e&&Oe&&(this.index=(Oe.scopes||(Oe.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=Oe;try{return Oe=this,e()}finally{Oe=n}}}on(){Oe=this}off(){Oe=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function mu(t,e=Oe){e&&e.active&&e.effects.push(t)}function gu(){return Oe}let xt;class mi{constructor(e,n,r,s){this.fn=e,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,mu(this,s)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,Ht();for(let e=0;e<this._depsLength;e++){const n=this.deps[e];if(n.computed&&(_u(n.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),jt()}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=yt,n=xt;try{return yt=!0,xt=this,this._runnings++,Zi(this),this.fn()}finally{eo(this),this._runnings--,xt=n,yt=e}}stop(){var e;this.active&&(Zi(this),eo(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function _u(t){return t.value}function Zi(t){t._trackId++,t._depsLength=0}function eo(t){if(t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)$a(t.deps[e],t);t.deps.length=t._depsLength}}function $a(t,e){const n=t.get(e);n!==void 0&&e._trackId!==n&&(t.delete(e),t.size===0&&t.cleanup())}let yt=!0,Ms=0;const Ha=[];function Ht(){Ha.push(yt),yt=!1}function jt(){const t=Ha.pop();yt=t===void 0?!0:t}function gi(){Ms++}function _i(){for(Ms--;!Ms&&Us.length;)Us.shift()()}function ja(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const r=t.deps[t._depsLength];r!==e?(r&&$a(r,t),t.deps[t._depsLength++]=e):t._depsLength++}}const Us=[];function Va(t,e,n){gi();for(const r of t.keys()){let s;r._dirtyLevel<e&&(s??(s=t.get(r)===r._trackId))&&(r._shouldSchedule||(r._shouldSchedule=r._dirtyLevel===0),r._dirtyLevel=e),r._shouldSchedule&&(s??(s=t.get(r)===r._trackId))&&(r.trigger(),(!r._runnings||r.allowRecurse)&&r._dirtyLevel!==2&&(r._shouldSchedule=!1,r.scheduler&&Us.push(r.scheduler)))}_i()}const Wa=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},Fs=new WeakMap,Dt=Symbol(""),Bs=Symbol("");function Ee(t,e,n){if(yt&&xt){let r=Fs.get(t);r||Fs.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=Wa(()=>r.delete(n))),ja(xt,s)}}function Qe(t,e,n,r,s,i){const o=Fs.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&H(t)){const c=Number(r);o.forEach((u,l)=>{(l==="length"||!gn(l)&&l>=c)&&a.push(u)})}else switch(n!==void 0&&a.push(o.get(n)),e){case"add":H(t)?hi(n)&&a.push(o.get("length")):(a.push(o.get(Dt)),en(t)&&a.push(o.get(Bs)));break;case"delete":H(t)||(a.push(o.get(Dt)),en(t)&&a.push(o.get(Bs)));break;case"set":en(t)&&a.push(o.get(Dt));break}gi();for(const c of a)c&&Va(c,4);_i()}const yu=ui("__proto__,__v_isRef,__isVue"),za=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(gn)),to=bu();function bu(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=G(this);for(let i=0,o=this.length;i<o;i++)Ee(r,"get",i+"");const s=r[e](...n);return s===-1||s===!1?r[e](...n.map(G)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Ht(),gi();const r=G(this)[e].apply(this,n);return _i(),jt(),r}}),t}function vu(t){const e=G(this);return Ee(e,"has",t),e.hasOwnProperty(t)}class Ka{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?Lu:Ya:i?Ja:Ga).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=H(e);if(!s){if(o&&q(to,n))return Reflect.get(to,n,r);if(n==="hasOwnProperty")return vu}const a=Reflect.get(e,n,r);return(gn(n)?za.has(n):yu(n))||(s||Ee(e,"get",n),i)?a:we(a)?o&&hi(n)?a:a.value:se(a)?s?Qa(a):zr(a):a}}class qa extends Ka{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const c=un(i);if(!Cr(r)&&!un(r)&&(i=G(i),r=G(r)),!H(e)&&we(i)&&!we(r))return c?!1:(i.value=r,!0)}const o=H(e)&&hi(n)?Number(n)<e.length:q(e,n),a=Reflect.set(e,n,r,s);return e===G(s)&&(o?wt(r,i)&&Qe(e,"set",n,r):Qe(e,"add",n,r)),a}deleteProperty(e,n){const r=q(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Qe(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!gn(n)||!za.has(n))&&Ee(e,"has",n),r}ownKeys(e){return Ee(e,"iterate",H(e)?"length":Dt),Reflect.ownKeys(e)}}class Eu extends Ka{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const wu=new qa,Iu=new Eu,Su=new qa(!0),yi=t=>t,Wr=t=>Reflect.getPrototypeOf(t);function or(t,e,n=!1,r=!1){t=t.__v_raw;const s=G(t),i=G(e);n||(wt(e,i)&&Ee(s,"get",e),Ee(s,"get",i));const{has:o}=Wr(s),a=r?yi:n?Ei:Dn;if(o.call(s,e))return a(t.get(e));if(o.call(s,i))return a(t.get(i));t!==s&&t.get(e)}function ar(t,e=!1){const n=this.__v_raw,r=G(n),s=G(t);return e||(wt(t,s)&&Ee(r,"has",t),Ee(r,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)}function cr(t,e=!1){return t=t.__v_raw,!e&&Ee(G(t),"iterate",Dt),Reflect.get(t,"size",t)}function no(t){t=G(t);const e=G(this);return Wr(e).has.call(e,t)||(e.add(t),Qe(e,"add",t,t)),this}function ro(t,e){e=G(e);const n=G(this),{has:r,get:s}=Wr(n);let i=r.call(n,t);i||(t=G(t),i=r.call(n,t));const o=s.call(n,t);return n.set(t,e),i?wt(e,o)&&Qe(n,"set",t,e):Qe(n,"add",t,e),this}function so(t){const e=G(this),{has:n,get:r}=Wr(e);let s=n.call(e,t);s||(t=G(t),s=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return s&&Qe(e,"delete",t,void 0),i}function io(){const t=G(this),e=t.size!==0,n=t.clear();return e&&Qe(t,"clear",void 0,void 0),n}function lr(t,e){return function(r,s){const i=this,o=i.__v_raw,a=G(o),c=e?yi:t?Ei:Dn;return!t&&Ee(a,"iterate",Dt),o.forEach((u,l)=>r.call(s,c(u),c(l),i))}}function ur(t,e,n){return function(...r){const s=this.__v_raw,i=G(s),o=en(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=s[t](...r),l=n?yi:e?Ei:Dn;return!e&&Ee(i,"iterate",c?Bs:Dt),{next(){const{value:f,done:p}=u.next();return p?{value:f,done:p}:{value:a?[l(f[0]),l(f[1])]:l(f),done:p}},[Symbol.iterator](){return this}}}}function ot(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Tu(){const t={get(i){return or(this,i)},get size(){return cr(this)},has:ar,add:no,set:ro,delete:so,clear:io,forEach:lr(!1,!1)},e={get(i){return or(this,i,!1,!0)},get size(){return cr(this)},has:ar,add:no,set:ro,delete:so,clear:io,forEach:lr(!1,!0)},n={get(i){return or(this,i,!0)},get size(){return cr(this,!0)},has(i){return ar.call(this,i,!0)},add:ot("add"),set:ot("set"),delete:ot("delete"),clear:ot("clear"),forEach:lr(!0,!1)},r={get(i){return or(this,i,!0,!0)},get size(){return cr(this,!0)},has(i){return ar.call(this,i,!0)},add:ot("add"),set:ot("set"),delete:ot("delete"),clear:ot("clear"),forEach:lr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=ur(i,!1,!1),n[i]=ur(i,!0,!1),e[i]=ur(i,!1,!0),r[i]=ur(i,!0,!0)}),[t,n,e,r]}const[Ru,Au,Cu,Pu]=Tu();function bi(t,e){const n=e?t?Pu:Cu:t?Au:Ru;return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(q(n,s)&&s in r?n:r,s,i)}const Ou={get:bi(!1,!1)},ku={get:bi(!1,!0)},Nu={get:bi(!0,!1)},Ga=new WeakMap,Ja=new WeakMap,Ya=new WeakMap,Lu=new WeakMap;function xu(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Du(t){return t.__v_skip||!Object.isExtensible(t)?0:xu(su(t))}function zr(t){return un(t)?t:vi(t,!1,wu,Ou,Ga)}function Xa(t){return vi(t,!1,Su,ku,Ja)}function Qa(t){return vi(t,!0,Iu,Nu,Ya)}function vi(t,e,n,r,s){if(!se(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=Du(t);if(o===0)return t;const a=new Proxy(t,o===2?r:n);return s.set(t,a),a}function nn(t){return un(t)?nn(t.__v_raw):!!(t&&t.__v_isReactive)}function un(t){return!!(t&&t.__v_isReadonly)}function Cr(t){return!!(t&&t.__v_isShallow)}function Za(t){return nn(t)||un(t)}function G(t){const e=t&&t.__v_raw;return e?G(e):t}function ec(t){return Object.isExtensible(t)&&Ar(t,"__v_skip",!0),t}const Dn=t=>se(t)?zr(t):t,Ei=t=>se(t)?Qa(t):t;class tc{constructor(e,n,r,s){this.getter=e,this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new mi(()=>e(this._value),()=>pr(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const e=G(this);return(!e._cacheable||e.effect.dirty)&&wt(e._value,e._value=e.effect.run())&&pr(e,4),nc(e),e.effect._dirtyLevel>=2&&pr(e,2),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function Mu(t,e,n=!1){let r,s;const i=V(t);return i?(r=t,s=Te):(r=t.get,s=t.set),new tc(r,s,i||!s,n)}function nc(t){var e;yt&&xt&&(t=G(t),ja(xt,(e=t.dep)!=null?e:t.dep=Wa(()=>t.dep=void 0,t instanceof tc?t:void 0)))}function pr(t,e=4,n){t=G(t);const r=t.dep;r&&Va(r,e)}function we(t){return!!(t&&t.__v_isRef===!0)}function Uu(t){return rc(t,!1)}function Fu(t){return rc(t,!0)}function rc(t,e){return we(t)?t:new Bu(t,e)}class Bu{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:G(e),this._value=n?e:Dn(e)}get value(){return nc(this),this._value}set value(e){const n=this.__v_isShallow||Cr(e)||un(e);e=n?e:G(e),wt(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:Dn(e),pr(this,4))}}function rn(t){return we(t)?t.value:t}const $u={get:(t,e,n)=>rn(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return we(s)&&!we(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function sc(t){return nn(t)?t:new Proxy(t,$u)}/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function bt(t,e,n,r){try{return r?t(...r):t()}catch(s){Kr(s,e,n)}}function Le(t,e,n,r){if(V(t)){const i=bt(t,e,n,r);return i&&xa(i)&&i.catch(o=>{Kr(o,e,n)}),i}const s=[];for(let i=0;i<t.length;i++)s.push(Le(t[i],e,n,r));return s}function Kr(t,e,n,r=!0){const s=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,a=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const u=i.ec;if(u){for(let l=0;l<u.length;l++)if(u[l](t,o,a)===!1)return}i=i.parent}const c=e.appContext.config.errorHandler;if(c){bt(c,null,10,[t,o,a]);return}}Hu(t,n,s,r)}function Hu(t,e,n,r=!0){console.error(t)}let Mn=!1,$s=!1;const he=[];let je=0;const sn=[];let ut=null,Ot=0;const ic=Promise.resolve();let wi=null;function oc(t){const e=wi||ic;return t?e.then(this?t.bind(this):t):e}function ju(t){let e=je+1,n=he.length;for(;e<n;){const r=e+n>>>1,s=he[r],i=Un(s);i<t||i===t&&s.pre?e=r+1:n=r}return e}function Ii(t){(!he.length||!he.includes(t,Mn&&t.allowRecurse?je+1:je))&&(t.id==null?he.push(t):he.splice(ju(t.id),0,t),ac())}function ac(){!Mn&&!$s&&($s=!0,wi=ic.then(lc))}function Vu(t){const e=he.indexOf(t);e>je&&he.splice(e,1)}function Wu(t){H(t)?sn.push(...t):(!ut||!ut.includes(t,t.allowRecurse?Ot+1:Ot))&&sn.push(t),ac()}function oo(t,e,n=Mn?je+1:0){for(;n<he.length;n++){const r=he[n];if(r&&r.pre){if(t&&r.id!==t.uid)continue;he.splice(n,1),n--,r()}}}function cc(t){if(sn.length){const e=[...new Set(sn)].sort((n,r)=>Un(n)-Un(r));if(sn.length=0,ut){ut.push(...e);return}for(ut=e,Ot=0;Ot<ut.length;Ot++)ut[Ot]();ut=null,Ot=0}}const Un=t=>t.id==null?1/0:t.id,zu=(t,e)=>{const n=Un(t)-Un(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function lc(t){$s=!1,Mn=!0,he.sort(zu);try{for(je=0;je<he.length;je++){const e=he[je];e&&e.active!==!1&&bt(e,null,14)}}finally{je=0,he.length=0,cc(),Mn=!1,wi=null,(he.length||sn.length)&&lc()}}function Ku(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||te;let s=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const l=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:p}=r[l]||te;p&&(s=n.map(g=>ae(g)?g.trim():g)),f&&(s=n.map(Ds))}let a,c=r[a=ds(e)]||r[a=ds(Ke(e))];!c&&i&&(c=r[a=ds(_n(e))]),c&&Le(c,t,6,s);const u=r[a+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,Le(u,t,6,s)}}function uc(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!V(t)){const c=u=>{const l=uc(u,e,!0);l&&(a=!0,fe(o,l))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!a?(se(t)&&r.set(t,null),null):(H(i)?i.forEach(c=>o[c]=null):fe(o,i),se(t)&&r.set(t,o),o)}function qr(t,e){return!t||!$r(e)?!1:(e=e.slice(2).replace(/Once$/,""),q(t,e[0].toLowerCase()+e.slice(1))||q(t,_n(e))||q(t,e))}let ve=null,Gr=null;function Pr(t){const e=ve;return ve=t,Gr=t&&t.type.__scopeId||null,e}function Jr(t){Gr=t}function Yr(){Gr=null}function qu(t,e=ve,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&yo(-1);const i=Pr(e);let o;try{o=t(...s)}finally{Pr(i),r._d&&yo(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function ps(t){const{type:e,vnode:n,proxy:r,withProxy:s,props:i,propsOptions:[o],slots:a,attrs:c,emit:u,render:l,renderCache:f,data:p,setupState:g,ctx:b,inheritAttrs:w}=t;let N,A;const x=Pr(t);try{if(n.shapeFlag&4){const z=s||r,ie=z;N=He(l.call(ie,z,f,i,g,p,b)),A=c}else{const z=e;N=He(z.length>1?z(i,{attrs:c,slots:a,emit:u}):z(i,null)),A=e.props?c:Gu(c)}}catch(z){kn.length=0,Kr(z,t,1),N=Re(Fn)}let M=N;if(A&&w!==!1){const z=Object.keys(A),{shapeFlag:ie}=M;z.length&&ie&7&&(o&&z.some(fi)&&(A=Ju(A,o)),M=fn(M,A))}return n.dirs&&(M=fn(M),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&(M.transition=n.transition),N=M,Pr(x),N}const Gu=t=>{let e;for(const n in t)(n==="class"||n==="style"||$r(n))&&((e||(e={}))[n]=t[n]);return e},Ju=(t,e)=>{const n={};for(const r in t)(!fi(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Yu(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?ao(r,o,u):!!o;if(c&8){const l=e.dynamicProps;for(let f=0;f<l.length;f++){const p=l[f];if(o[p]!==r[p]&&!qr(u,p))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?ao(r,o,u):!0:!!o;return!1}function ao(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!qr(n,i))return!0}return!1}function Xu({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const fc="components";function Qu(t,e){return ef(fc,t,!0,e)||t}const Zu=Symbol.for("v-ndc");function ef(t,e,n=!0,r=!1){const s=ve||pe;if(s){const i=s.type;if(t===fc){const a=Yf(i,!1);if(a&&(a===e||a===Ke(e)||a===Vr(Ke(e))))return i}const o=co(s[t]||i[t],e)||co(s.appContext[t],e);return!o&&r?i:o}}function co(t,e){return t&&(t[e]||t[Ke(e)]||t[Vr(Ke(e))])}const tf=t=>t.__isSuspense;function nf(t,e){e&&e.pendingBranch?H(t)?e.effects.push(...t):e.effects.push(t):Wu(t)}const rf=Symbol.for("v-scx"),sf=()=>Ze(rf),fr={};function mr(t,e,n){return dc(t,e,n)}function dc(t,e,{immediate:n,deep:r,flush:s,once:i,onTrack:o,onTrigger:a}=te){if(e&&i){const $=e;e=(...ce)=>{$(...ce),ie()}}const c=pe,u=$=>r===!0?$:kt($,r===!1?1:void 0);let l,f=!1,p=!1;if(we(t)?(l=()=>t.value,f=Cr(t)):nn(t)?(l=()=>u(t),f=!0):H(t)?(p=!0,f=t.some($=>nn($)||Cr($)),l=()=>t.map($=>{if(we($))return $.value;if(nn($))return u($);if(V($))return bt($,c,2)})):V(t)?e?l=()=>bt(t,c,2):l=()=>(g&&g(),Le(t,c,3,[b])):l=Te,e&&r){const $=l;l=()=>kt($())}let g,b=$=>{g=M.onStop=()=>{bt($,c,4),g=M.onStop=void 0}},w;if(es)if(b=Te,e?n&&Le(e,c,3,[l(),p?[]:void 0,b]):l(),s==="sync"){const $=sf();w=$.__watcherHandles||($.__watcherHandles=[])}else return Te;let N=p?new Array(t.length).fill(fr):fr;const A=()=>{if(!(!M.active||!M.dirty))if(e){const $=M.run();(r||f||(p?$.some((ce,_e)=>wt(ce,N[_e])):wt($,N)))&&(g&&g(),Le(e,c,3,[$,N===fr?void 0:p&&N[0]===fr?[]:N,b]),N=$)}else M.run()};A.allowRecurse=!!e;let x;s==="sync"?x=A:s==="post"?x=()=>be(A,c&&c.suspense):(A.pre=!0,c&&(A.id=c.uid),x=()=>Ii(A));const M=new mi(l,Te,x),z=gu(),ie=()=>{M.stop(),z&&di(z.effects,M)};return e?n?A():N=M.run():s==="post"?be(M.run.bind(M),c&&c.suspense):M.run(),w&&w.push(ie),ie}function of(t,e,n){const r=this.proxy,s=ae(t)?t.includes(".")?hc(r,t):()=>r[t]:t.bind(r,r);let i;V(e)?i=e:(i=e.handler,n=e);const o=Gn(this),a=dc(s,i.bind(r),n);return o(),a}function hc(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function kt(t,e,n=0,r){if(!se(t)||t.__v_skip)return t;if(e&&e>0){if(n>=e)return t;n++}if(r=r||new Set,r.has(t))return t;if(r.add(t),we(t))kt(t.value,e,n,r);else if(H(t))for(let s=0;s<t.length;s++)kt(t[s],e,n,r);else if(La(t)||en(t))t.forEach(s=>{kt(s,e,n,r)});else if(Ma(t))for(const s in t)kt(t[s],e,n,r);return t}function Nt(t,e){if(ve===null)return t;const n=ts(ve)||ve.proxy,r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,a,c=te]=e[s];i&&(V(i)&&(i={mounted:i,updated:i}),i.deep&&kt(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return t}function At(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(Ht(),Le(c,n,8,[t.el,a,t,e]),jt())}}/*! #__NO_SIDE_EFFECTS__ */function pc(t,e){return V(t)?fe({name:t.name},e,{setup:t}):t}const gr=t=>!!t.type.__asyncLoader,mc=t=>t.type.__isKeepAlive;function af(t,e){gc(t,"a",e)}function cf(t,e){gc(t,"da",e)}function gc(t,e,n=pe){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(Xr(e,r,n),n){let s=n.parent;for(;s&&s.parent;)mc(s.parent.vnode)&&lf(r,e,n,s),s=s.parent}}function lf(t,e,n,r){const s=Xr(e,t,r,!0);_c(()=>{di(r[e],s)},n)}function Xr(t,e,n=pe,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;Ht();const a=Gn(n),c=Le(e,n,t,o);return a(),jt(),c});return r?s.unshift(i):s.push(i),i}}const nt=t=>(e,n=pe)=>(!es||t==="sp")&&Xr(t,(...r)=>e(...r),n),uf=nt("bm"),ff=nt("m"),df=nt("bu"),hf=nt("u"),pf=nt("bum"),_c=nt("um"),mf=nt("sp"),gf=nt("rtg"),_f=nt("rtc");function yf(t,e=pe){Xr("ec",t,e)}function bf(t,e,n,r){let s;const i=n&&n[r];if(H(t)||ae(t)){s=new Array(t.length);for(let o=0,a=t.length;o<a;o++)s[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){s=new Array(t);for(let o=0;o<t;o++)s[o]=e(o+1,o,void 0,i&&i[o])}else if(se(t))if(t[Symbol.iterator])s=Array.from(t,(o,a)=>e(o,a,void 0,i&&i[a]));else{const o=Object.keys(t);s=new Array(o.length);for(let a=0,c=o.length;a<c;a++){const u=o[a];s[a]=e(t[u],u,a,i&&i[a])}}else s=[];return n&&(n[r]=s),s}const Hs=t=>t?Pc(t)?ts(t)||t.proxy:Hs(t.parent):null,Pn=fe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Hs(t.parent),$root:t=>Hs(t.root),$emit:t=>t.emit,$options:t=>Si(t),$forceUpdate:t=>t.f||(t.f=()=>{t.effect.dirty=!0,Ii(t.update)}),$nextTick:t=>t.n||(t.n=oc.bind(t.proxy)),$watch:t=>of.bind(t)}),ms=(t,e)=>t!==te&&!t.__isScriptSetup&&q(t,e),vf={get({_:t},e){const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=t;let u;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(ms(r,e))return o[e]=1,r[e];if(s!==te&&q(s,e))return o[e]=2,s[e];if((u=t.propsOptions[0])&&q(u,e))return o[e]=3,i[e];if(n!==te&&q(n,e))return o[e]=4,n[e];js&&(o[e]=0)}}const l=Pn[e];let f,p;if(l)return e==="$attrs"&&Ee(t,"get",e),l(t);if((f=a.__cssModules)&&(f=f[e]))return f;if(n!==te&&q(n,e))return o[e]=4,n[e];if(p=c.config.globalProperties,q(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return ms(s,e)?(s[e]=n,!0):r!==te&&q(r,e)?(r[e]=n,!0):q(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let a;return!!n[o]||t!==te&&q(t,o)||ms(e,o)||(a=i[0])&&q(a,o)||q(r,o)||q(Pn,o)||q(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:q(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function lo(t){return H(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let js=!0;function Ef(t){const e=Si(t),n=t.proxy,r=t.ctx;js=!1,e.beforeCreate&&uo(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:u,created:l,beforeMount:f,mounted:p,beforeUpdate:g,updated:b,activated:w,deactivated:N,beforeDestroy:A,beforeUnmount:x,destroyed:M,unmounted:z,render:ie,renderTracked:$,renderTriggered:ce,errorCaptured:_e,serverPrefetch:Ce,expose:Se,inheritAttrs:st,components:Rt,directives:Me,filters:vn}=e;if(u&&wf(u,r,null),o)for(const Q in o){const J=o[Q];V(J)&&(r[Q]=J.bind(n))}if(s){const Q=s.call(n,n);se(Q)&&(t.data=zr(Q))}if(js=!0,i)for(const Q in i){const J=i[Q],Ge=V(J)?J.bind(n,n):V(J.get)?J.get.bind(n,n):Te,it=!V(J)&&V(J.set)?J.set.bind(n):Te,Ue=ke({get:Ge,set:it});Object.defineProperty(r,Q,{enumerable:!0,configurable:!0,get:()=>Ue.value,set:ye=>Ue.value=ye})}if(a)for(const Q in a)yc(a[Q],r,n,Q);if(c){const Q=V(c)?c.call(n):c;Reflect.ownKeys(Q).forEach(J=>{_r(J,Q[J])})}l&&uo(l,t,"c");function le(Q,J){H(J)?J.forEach(Ge=>Q(Ge.bind(n))):J&&Q(J.bind(n))}if(le(uf,f),le(ff,p),le(df,g),le(hf,b),le(af,w),le(cf,N),le(yf,_e),le(_f,$),le(gf,ce),le(pf,x),le(_c,z),le(mf,Ce),H(Se))if(Se.length){const Q=t.exposed||(t.exposed={});Se.forEach(J=>{Object.defineProperty(Q,J,{get:()=>n[J],set:Ge=>n[J]=Ge})})}else t.exposed||(t.exposed={});ie&&t.render===Te&&(t.render=ie),st!=null&&(t.inheritAttrs=st),Rt&&(t.components=Rt),Me&&(t.directives=Me)}function wf(t,e,n=Te){H(t)&&(t=Vs(t));for(const r in t){const s=t[r];let i;se(s)?"default"in s?i=Ze(s.from||r,s.default,!0):i=Ze(s.from||r):i=Ze(s),we(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function uo(t,e,n){Le(H(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function yc(t,e,n,r){const s=r.includes(".")?hc(n,r):()=>n[r];if(ae(t)){const i=e[t];V(i)&&mr(s,i)}else if(V(t))mr(s,t.bind(n));else if(se(t))if(H(t))t.forEach(i=>yc(i,e,n,r));else{const i=V(t.handler)?t.handler.bind(n):e[t.handler];V(i)&&mr(s,i,t)}}function Si(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let c;return a?c=a:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(u=>Or(c,u,o,!0)),Or(c,e,o)),se(e)&&i.set(e,c),c}function Or(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Or(t,i,n,!0),s&&s.forEach(o=>Or(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=If[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const If={data:fo,props:ho,emits:ho,methods:Tn,computed:Tn,beforeCreate:ge,created:ge,beforeMount:ge,mounted:ge,beforeUpdate:ge,updated:ge,beforeDestroy:ge,beforeUnmount:ge,destroyed:ge,unmounted:ge,activated:ge,deactivated:ge,errorCaptured:ge,serverPrefetch:ge,components:Tn,directives:Tn,watch:Tf,provide:fo,inject:Sf};function fo(t,e){return e?t?function(){return fe(V(t)?t.call(this,this):t,V(e)?e.call(this,this):e)}:e:t}function Sf(t,e){return Tn(Vs(t),Vs(e))}function Vs(t){if(H(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ge(t,e){return t?[...new Set([].concat(t,e))]:e}function Tn(t,e){return t?fe(Object.create(null),t,e):e}function ho(t,e){return t?H(t)&&H(e)?[...new Set([...t,...e])]:fe(Object.create(null),lo(t),lo(e??{})):e}function Tf(t,e){if(!t)return e;if(!e)return t;const n=fe(Object.create(null),t);for(const r in e)n[r]=ge(t[r],e[r]);return n}function bc(){return{app:null,config:{isNativeTag:nu,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Rf=0;function Af(t,e){return function(r,s=null){V(r)||(r=fe({},r)),s!=null&&!se(s)&&(s=null);const i=bc(),o=new WeakSet;let a=!1;const c=i.app={_uid:Rf++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Qf,get config(){return i.config},set config(u){},use(u,...l){return o.has(u)||(u&&V(u.install)?(o.add(u),u.install(c,...l)):V(u)&&(o.add(u),u(c,...l))),c},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),c},component(u,l){return l?(i.components[u]=l,c):i.components[u]},directive(u,l){return l?(i.directives[u]=l,c):i.directives[u]},mount(u,l,f){if(!a){const p=Re(r,s);return p.appContext=i,f===!0?f="svg":f===!1&&(f=void 0),l&&e?e(p,u):t(p,u,f),a=!0,c._container=u,u.__vue_app__=c,ts(p.component)||p.component.proxy}},unmount(){a&&(t(null,c._container),delete c._container.__vue_app__)},provide(u,l){return i.provides[u]=l,c},runWithContext(u){const l=On;On=c;try{return u()}finally{On=l}}};return c}}let On=null;function _r(t,e){if(pe){let n=pe.provides;const r=pe.parent&&pe.parent.provides;r===n&&(n=pe.provides=Object.create(r)),n[t]=e}}function Ze(t,e,n=!1){const r=pe||ve;if(r||On){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:On._context.provides;if(s&&t in s)return s[t];if(arguments.length>1)return n&&V(e)?e.call(r&&r.proxy):e}}function Cf(t,e,n,r=!1){const s={},i={};Ar(i,Zr,1),t.propsDefaults=Object.create(null),vc(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Xa(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function Pf(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=G(s),[c]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const l=t.vnode.dynamicProps;for(let f=0;f<l.length;f++){let p=l[f];if(qr(t.emitsOptions,p))continue;const g=e[p];if(c)if(q(i,p))g!==i[p]&&(i[p]=g,u=!0);else{const b=Ke(p);s[b]=Ws(c,a,b,g,t,!1)}else g!==i[p]&&(i[p]=g,u=!0)}}}else{vc(t,e,s,i)&&(u=!0);let l;for(const f in a)(!e||!q(e,f)&&((l=_n(f))===f||!q(e,l)))&&(c?n&&(n[f]!==void 0||n[l]!==void 0)&&(s[f]=Ws(c,a,f,void 0,t,!0)):delete s[f]);if(i!==a)for(const f in i)(!e||!q(e,f))&&(delete i[f],u=!0)}u&&Qe(t,"set","$attrs")}function vc(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(Cn(c))continue;const u=e[c];let l;s&&q(s,l=Ke(c))?!i||!i.includes(l)?n[l]=u:(a||(a={}))[l]=u:qr(t.emitsOptions,c)||(!(c in r)||u!==r[c])&&(r[c]=u,o=!0)}if(i){const c=G(n),u=a||te;for(let l=0;l<i.length;l++){const f=i[l];n[f]=Ws(s,c,f,u[f],t,!q(u,f))}}return o}function Ws(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=q(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&V(c)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const l=Gn(s);r=u[n]=c.call(null,e),l()}}else r=c}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===_n(n))&&(r=!0))}return r}function Ec(t,e,n=!1){const r=e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let c=!1;if(!V(t)){const l=f=>{c=!0;const[p,g]=Ec(f,e,!0);fe(o,p),g&&a.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}if(!i&&!c)return se(t)&&r.set(t,Zt),Zt;if(H(i))for(let l=0;l<i.length;l++){const f=Ke(i[l]);po(f)&&(o[f]=te)}else if(i)for(const l in i){const f=Ke(l);if(po(f)){const p=i[l],g=o[f]=H(p)||V(p)?{type:p}:fe({},p);if(g){const b=_o(Boolean,g.type),w=_o(String,g.type);g[0]=b>-1,g[1]=w<0||b<w,(b>-1||q(g,"default"))&&a.push(f)}}}const u=[o,a];return se(t)&&r.set(t,u),u}function po(t){return t[0]!=="$"&&!Cn(t)}function mo(t){return t===null?"null":typeof t=="function"?t.name||"":typeof t=="object"&&t.constructor&&t.constructor.name||""}function go(t,e){return mo(t)===mo(e)}function _o(t,e){return H(e)?e.findIndex(n=>go(n,t)):V(e)&&go(e,t)?0:-1}const wc=t=>t[0]==="_"||t==="$stable",Ti=t=>H(t)?t.map(He):[He(t)],Of=(t,e,n)=>{if(e._n)return e;const r=qu((...s)=>Ti(e(...s)),n);return r._c=!1,r},Ic=(t,e,n)=>{const r=t._ctx;for(const s in t){if(wc(s))continue;const i=t[s];if(V(i))e[s]=Of(s,i,r);else if(i!=null){const o=Ti(i);e[s]=()=>o}}},Sc=(t,e)=>{const n=Ti(e);t.slots.default=()=>n},kf=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=G(e),Ar(e,"_",n)):Ic(e,t.slots={})}else t.slots={},e&&Sc(t,e);Ar(t.slots,Zr,1)},Nf=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=te;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:(fe(s,e),!n&&a===1&&delete s._):(i=!e.$stable,Ic(e,s)),o=e}else e&&(Sc(t,e),o={default:1});if(i)for(const a in s)!wc(a)&&o[a]==null&&delete s[a]};function zs(t,e,n,r,s=!1){if(H(t)){t.forEach((p,g)=>zs(p,e&&(H(e)?e[g]:e),n,r,s));return}if(gr(r)&&!s)return;const i=r.shapeFlag&4?ts(r.component)||r.component.proxy:r.el,o=s?null:i,{i:a,r:c}=t,u=e&&e.r,l=a.refs===te?a.refs={}:a.refs,f=a.setupState;if(u!=null&&u!==c&&(ae(u)?(l[u]=null,q(f,u)&&(f[u]=null)):we(u)&&(u.value=null)),V(c))bt(c,a,12,[o,l]);else{const p=ae(c),g=we(c);if(p||g){const b=()=>{if(t.f){const w=p?q(f,c)?f[c]:l[c]:c.value;s?H(w)&&di(w,i):H(w)?w.includes(i)||w.push(i):p?(l[c]=[i],q(f,c)&&(f[c]=l[c])):(c.value=[i],t.k&&(l[t.k]=c.value))}else p?(l[c]=o,q(f,c)&&(f[c]=o)):g&&(c.value=o,t.k&&(l[t.k]=o))};o?(b.id=-1,be(b,n)):b()}}}const be=nf;function Lf(t){return xf(t)}function xf(t,e){const n=Ua();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:u,setElementText:l,parentNode:f,nextSibling:p,setScopeId:g=Te,insertStaticContent:b}=t,w=(d,h,m,E=null,_=null,T=null,P=void 0,S=null,R=!!h.dynamicChildren)=>{if(d===h)return;d&&!wn(d,h)&&(E=v(d),ye(d,_,T,!0),d=null),h.patchFlag===-2&&(R=!1,h.dynamicChildren=null);const{type:I,ref:k,shapeFlag:F}=h;switch(I){case Qr:N(d,h,m,E);break;case Fn:A(d,h,m,E);break;case _s:d==null&&x(h,m,E,P);break;case $e:Rt(d,h,m,E,_,T,P,S,R);break;default:F&1?ie(d,h,m,E,_,T,P,S,R):F&6?Me(d,h,m,E,_,T,P,S,R):(F&64||F&128)&&I.process(d,h,m,E,_,T,P,S,R,L)}k!=null&&_&&zs(k,d&&d.ref,T,h||d,!h)},N=(d,h,m,E)=>{if(d==null)r(h.el=a(h.children),m,E);else{const _=h.el=d.el;h.children!==d.children&&u(_,h.children)}},A=(d,h,m,E)=>{d==null?r(h.el=c(h.children||""),m,E):h.el=d.el},x=(d,h,m,E)=>{[d.el,d.anchor]=b(d.children,h,m,E,d.el,d.anchor)},M=({el:d,anchor:h},m,E)=>{let _;for(;d&&d!==h;)_=p(d),r(d,m,E),d=_;r(h,m,E)},z=({el:d,anchor:h})=>{let m;for(;d&&d!==h;)m=p(d),s(d),d=m;s(h)},ie=(d,h,m,E,_,T,P,S,R)=>{h.type==="svg"?P="svg":h.type==="math"&&(P="mathml"),d==null?$(h,m,E,_,T,P,S,R):Ce(d,h,_,T,P,S,R)},$=(d,h,m,E,_,T,P,S)=>{let R,I;const{props:k,shapeFlag:F,transition:U,dirs:j}=d;if(R=d.el=o(d.type,T,k&&k.is,k),F&8?l(R,d.children):F&16&&_e(d.children,R,null,E,_,gs(d,T),P,S),j&&At(d,null,E,"created"),ce(R,d,d.scopeId,P,E),k){for(const Z in k)Z!=="value"&&!Cn(Z)&&i(R,Z,null,k[Z],T,d.children,E,_,de);"value"in k&&i(R,"value",null,k.value,T),(I=k.onVnodeBeforeMount)&&Be(I,E,d)}j&&At(d,null,E,"beforeMount");const W=Df(_,U);W&&U.beforeEnter(R),r(R,h,m),((I=k&&k.onVnodeMounted)||W||j)&&be(()=>{I&&Be(I,E,d),W&&U.enter(R),j&&At(d,null,E,"mounted")},_)},ce=(d,h,m,E,_)=>{if(m&&g(d,m),E)for(let T=0;T<E.length;T++)g(d,E[T]);if(_){let T=_.subTree;if(h===T){const P=_.vnode;ce(d,P,P.scopeId,P.slotScopeIds,_.parent)}}},_e=(d,h,m,E,_,T,P,S,R=0)=>{for(let I=R;I<d.length;I++){const k=d[I]=S?ft(d[I]):He(d[I]);w(null,k,h,m,E,_,T,P,S)}},Ce=(d,h,m,E,_,T,P)=>{const S=h.el=d.el;let{patchFlag:R,dynamicChildren:I,dirs:k}=h;R|=d.patchFlag&16;const F=d.props||te,U=h.props||te;let j;if(m&&Ct(m,!1),(j=U.onVnodeBeforeUpdate)&&Be(j,m,h,d),k&&At(h,d,m,"beforeUpdate"),m&&Ct(m,!0),I?Se(d.dynamicChildren,I,S,m,E,gs(h,_),T):P||J(d,h,S,null,m,E,gs(h,_),T,!1),R>0){if(R&16)st(S,h,F,U,m,E,_);else if(R&2&&F.class!==U.class&&i(S,"class",null,U.class,_),R&4&&i(S,"style",F.style,U.style,_),R&8){const W=h.dynamicProps;for(let Z=0;Z<W.length;Z++){const re=W[Z],ue=F[re],Pe=U[re];(Pe!==ue||re==="value")&&i(S,re,ue,Pe,_,d.children,m,E,de)}}R&1&&d.children!==h.children&&l(S,h.children)}else!P&&I==null&&st(S,h,F,U,m,E,_);((j=U.onVnodeUpdated)||k)&&be(()=>{j&&Be(j,m,h,d),k&&At(h,d,m,"updated")},E)},Se=(d,h,m,E,_,T,P)=>{for(let S=0;S<h.length;S++){const R=d[S],I=h[S],k=R.el&&(R.type===$e||!wn(R,I)||R.shapeFlag&70)?f(R.el):m;w(R,I,k,null,E,_,T,P,!0)}},st=(d,h,m,E,_,T,P)=>{if(m!==E){if(m!==te)for(const S in m)!Cn(S)&&!(S in E)&&i(d,S,m[S],null,P,h.children,_,T,de);for(const S in E){if(Cn(S))continue;const R=E[S],I=m[S];R!==I&&S!=="value"&&i(d,S,I,R,P,h.children,_,T,de)}"value"in E&&i(d,"value",m.value,E.value,P)}},Rt=(d,h,m,E,_,T,P,S,R)=>{const I=h.el=d?d.el:a(""),k=h.anchor=d?d.anchor:a("");let{patchFlag:F,dynamicChildren:U,slotScopeIds:j}=h;j&&(S=S?S.concat(j):j),d==null?(r(I,m,E),r(k,m,E),_e(h.children||[],m,k,_,T,P,S,R)):F>0&&F&64&&U&&d.dynamicChildren?(Se(d.dynamicChildren,U,m,_,T,P,S),(h.key!=null||_&&h===_.subTree)&&Tc(d,h,!0)):J(d,h,m,k,_,T,P,S,R)},Me=(d,h,m,E,_,T,P,S,R)=>{h.slotScopeIds=S,d==null?h.shapeFlag&512?_.ctx.activate(h,m,E,P,R):vn(h,m,E,_,T,P,R):Kt(d,h,R)},vn=(d,h,m,E,_,T,P)=>{const S=d.component=zf(d,E,_);if(mc(d)&&(S.ctx.renderer=L),Kf(S),S.asyncDep){if(_&&_.registerDep(S,le),!d.el){const R=S.subTree=Re(Fn);A(null,R,h,m)}}else le(S,d,h,m,_,T,P)},Kt=(d,h,m)=>{const E=h.component=d.component;if(Yu(d,h,m))if(E.asyncDep&&!E.asyncResolved){Q(E,h,m);return}else E.next=h,Vu(E.update),E.effect.dirty=!0,E.update();else h.el=d.el,E.vnode=h},le=(d,h,m,E,_,T,P)=>{const S=()=>{if(d.isMounted){let{next:k,bu:F,u:U,parent:j,vnode:W}=d;{const Jt=Rc(d);if(Jt){k&&(k.el=W.el,Q(d,k,P)),Jt.asyncDep.then(()=>{d.isUnmounted||S()});return}}let Z=k,re;Ct(d,!1),k?(k.el=W.el,Q(d,k,P)):k=W,F&&hr(F),(re=k.props&&k.props.onVnodeBeforeUpdate)&&Be(re,j,k,W),Ct(d,!0);const ue=ps(d),Pe=d.subTree;d.subTree=ue,w(Pe,ue,f(Pe.el),v(Pe),d,_,T),k.el=ue.el,Z===null&&Xu(d,ue.el),U&&be(U,_),(re=k.props&&k.props.onVnodeUpdated)&&be(()=>Be(re,j,k,W),_)}else{let k;const{el:F,props:U}=h,{bm:j,m:W,parent:Z}=d,re=gr(h);if(Ct(d,!1),j&&hr(j),!re&&(k=U&&U.onVnodeBeforeMount)&&Be(k,Z,h),Ct(d,!0),F&&ne){const ue=()=>{d.subTree=ps(d),ne(F,d.subTree,d,_,null)};re?h.type.__asyncLoader().then(()=>!d.isUnmounted&&ue()):ue()}else{const ue=d.subTree=ps(d);w(null,ue,m,E,d,_,T),h.el=ue.el}if(W&&be(W,_),!re&&(k=U&&U.onVnodeMounted)){const ue=h;be(()=>Be(k,Z,ue),_)}(h.shapeFlag&256||Z&&gr(Z.vnode)&&Z.vnode.shapeFlag&256)&&d.a&&be(d.a,_),d.isMounted=!0,h=m=E=null}},R=d.effect=new mi(S,Te,()=>Ii(I),d.scope),I=d.update=()=>{R.dirty&&R.run()};I.id=d.uid,Ct(d,!0),I()},Q=(d,h,m)=>{h.component=d;const E=d.vnode.props;d.vnode=h,d.next=null,Pf(d,h.props,E,m),Nf(d,h.children,m),Ht(),oo(d),jt()},J=(d,h,m,E,_,T,P,S,R=!1)=>{const I=d&&d.children,k=d?d.shapeFlag:0,F=h.children,{patchFlag:U,shapeFlag:j}=h;if(U>0){if(U&128){it(I,F,m,E,_,T,P,S,R);return}else if(U&256){Ge(I,F,m,E,_,T,P,S,R);return}}j&8?(k&16&&de(I,_,T),F!==I&&l(m,F)):k&16?j&16?it(I,F,m,E,_,T,P,S,R):de(I,_,T,!0):(k&8&&l(m,""),j&16&&_e(F,m,E,_,T,P,S,R))},Ge=(d,h,m,E,_,T,P,S,R)=>{d=d||Zt,h=h||Zt;const I=d.length,k=h.length,F=Math.min(I,k);let U;for(U=0;U<F;U++){const j=h[U]=R?ft(h[U]):He(h[U]);w(d[U],j,m,null,_,T,P,S,R)}I>k?de(d,_,T,!0,!1,F):_e(h,m,E,_,T,P,S,R,F)},it=(d,h,m,E,_,T,P,S,R)=>{let I=0;const k=h.length;let F=d.length-1,U=k-1;for(;I<=F&&I<=U;){const j=d[I],W=h[I]=R?ft(h[I]):He(h[I]);if(wn(j,W))w(j,W,m,null,_,T,P,S,R);else break;I++}for(;I<=F&&I<=U;){const j=d[F],W=h[U]=R?ft(h[U]):He(h[U]);if(wn(j,W))w(j,W,m,null,_,T,P,S,R);else break;F--,U--}if(I>F){if(I<=U){const j=U+1,W=j<k?h[j].el:E;for(;I<=U;)w(null,h[I]=R?ft(h[I]):He(h[I]),m,W,_,T,P,S,R),I++}}else if(I>U)for(;I<=F;)ye(d[I],_,T,!0),I++;else{const j=I,W=I,Z=new Map;for(I=W;I<=U;I++){const Ie=h[I]=R?ft(h[I]):He(h[I]);Ie.key!=null&&Z.set(Ie.key,I)}let re,ue=0;const Pe=U-W+1;let Jt=!1,Ji=0;const En=new Array(Pe);for(I=0;I<Pe;I++)En[I]=0;for(I=j;I<=F;I++){const Ie=d[I];if(ue>=Pe){ye(Ie,_,T,!0);continue}let Fe;if(Ie.key!=null)Fe=Z.get(Ie.key);else for(re=W;re<=U;re++)if(En[re-W]===0&&wn(Ie,h[re])){Fe=re;break}Fe===void 0?ye(Ie,_,T,!0):(En[Fe-W]=I+1,Fe>=Ji?Ji=Fe:Jt=!0,w(Ie,h[Fe],m,null,_,T,P,S,R),ue++)}const Yi=Jt?Mf(En):Zt;for(re=Yi.length-1,I=Pe-1;I>=0;I--){const Ie=W+I,Fe=h[Ie],Xi=Ie+1<k?h[Ie+1].el:E;En[I]===0?w(null,Fe,m,Xi,_,T,P,S,R):Jt&&(re<0||I!==Yi[re]?Ue(Fe,m,Xi,2):re--)}}},Ue=(d,h,m,E,_=null)=>{const{el:T,type:P,transition:S,children:R,shapeFlag:I}=d;if(I&6){Ue(d.component.subTree,h,m,E);return}if(I&128){d.suspense.move(h,m,E);return}if(I&64){P.move(d,h,m,L);return}if(P===$e){r(T,h,m);for(let F=0;F<R.length;F++)Ue(R[F],h,m,E);r(d.anchor,h,m);return}if(P===_s){M(d,h,m);return}if(E!==2&&I&1&&S)if(E===0)S.beforeEnter(T),r(T,h,m),be(()=>S.enter(T),_);else{const{leave:F,delayLeave:U,afterLeave:j}=S,W=()=>r(T,h,m),Z=()=>{F(T,()=>{W(),j&&j()})};U?U(T,W,Z):Z()}else r(T,h,m)},ye=(d,h,m,E=!1,_=!1)=>{const{type:T,props:P,ref:S,children:R,dynamicChildren:I,shapeFlag:k,patchFlag:F,dirs:U}=d;if(S!=null&&zs(S,null,m,d,!0),k&256){h.ctx.deactivate(d);return}const j=k&1&&U,W=!gr(d);let Z;if(W&&(Z=P&&P.onVnodeBeforeUnmount)&&Be(Z,h,d),k&6)ir(d.component,m,E);else{if(k&128){d.suspense.unmount(m,E);return}j&&At(d,null,h,"beforeUnmount"),k&64?d.type.remove(d,h,m,_,L,E):I&&(T!==$e||F>0&&F&64)?de(I,h,m,!1,!0):(T===$e&&F&384||!_&&k&16)&&de(R,h,m),E&&qt(d)}(W&&(Z=P&&P.onVnodeUnmounted)||j)&&be(()=>{Z&&Be(Z,h,d),j&&At(d,null,h,"unmounted")},m)},qt=d=>{const{type:h,el:m,anchor:E,transition:_}=d;if(h===$e){Gt(m,E);return}if(h===_s){z(d);return}const T=()=>{s(m),_&&!_.persisted&&_.afterLeave&&_.afterLeave()};if(d.shapeFlag&1&&_&&!_.persisted){const{leave:P,delayLeave:S}=_,R=()=>P(m,T);S?S(d.el,T,R):R()}else T()},Gt=(d,h)=>{let m;for(;d!==h;)m=p(d),s(d),d=m;s(h)},ir=(d,h,m)=>{const{bum:E,scope:_,update:T,subTree:P,um:S}=d;E&&hr(E),_.stop(),T&&(T.active=!1,ye(P,d,h,m)),S&&be(S,h),be(()=>{d.isUnmounted=!0},h),h&&h.pendingBranch&&!h.isUnmounted&&d.asyncDep&&!d.asyncResolved&&d.suspenseId===h.pendingId&&(h.deps--,h.deps===0&&h.resolve())},de=(d,h,m,E=!1,_=!1,T=0)=>{for(let P=T;P<d.length;P++)ye(d[P],h,m,E,_)},v=d=>d.shapeFlag&6?v(d.component.subTree):d.shapeFlag&128?d.suspense.next():p(d.anchor||d.el);let O=!1;const C=(d,h,m)=>{d==null?h._vnode&&ye(h._vnode,null,null,!0):w(h._vnode||null,d,h,null,null,null,m),O||(O=!0,oo(),cc(),O=!1),h._vnode=d},L={p:w,um:ye,m:Ue,r:qt,mt:vn,mc:_e,pc:J,pbc:Se,n:v,o:t};let Y,ne;return e&&([Y,ne]=e(L)),{render:C,hydrate:Y,createApp:Af(C,Y)}}function gs({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Ct({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function Df(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Tc(t,e,n=!1){const r=t.children,s=e.children;if(H(r)&&H(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=ft(s[i]),a.el=o.el),n||Tc(o,a)),a.type===Qr&&(a.el=o.el)}}function Mf(t){const e=t.slice(),n=[0];let r,s,i,o,a;const c=t.length;for(r=0;r<c;r++){const u=t[r];if(u!==0){if(s=n[n.length-1],t[s]<u){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<u?i=a+1:o=a;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Rc(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Rc(e)}const Uf=t=>t.__isTeleport,$e=Symbol.for("v-fgt"),Qr=Symbol.for("v-txt"),Fn=Symbol.for("v-cmt"),_s=Symbol.for("v-stc"),kn=[];let Ne=null;function Mt(t=!1){kn.push(Ne=t?null:[])}function Ff(){kn.pop(),Ne=kn[kn.length-1]||null}let Bn=1;function yo(t){Bn+=t}function Ac(t){return t.dynamicChildren=Bn>0?Ne||Zt:null,Ff(),Bn>0&&Ne&&Ne.push(t),t}function on(t,e,n,r,s,i){return Ac(D(t,e,n,r,s,i,!0))}function Bf(t,e,n,r,s){return Ac(Re(t,e,n,r,s,!0))}function Ks(t){return t?t.__v_isVNode===!0:!1}function wn(t,e){return t.type===e.type&&t.key===e.key}const Zr="__vInternal",Cc=({key:t})=>t??null,yr=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ae(t)||we(t)||V(t)?{i:ve,r:t,k:e,f:!!n}:t:null);function D(t,e=null,n=null,r=0,s=null,i=t===$e?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Cc(e),ref:e&&yr(e),scopeId:Gr,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:ve};return a?(Ai(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=ae(n)?8:16),Bn>0&&!o&&Ne&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Ne.push(c),c}const Re=$f;function $f(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Zu)&&(t=Fn),Ks(t)){const a=fn(t,e,!0);return n&&Ai(a,n),Bn>0&&!i&&Ne&&(a.shapeFlag&6?Ne[Ne.indexOf(t)]=a:Ne.push(a)),a.patchFlag|=-2,a}if(Xf(t)&&(t=t.__vccOpts),e){e=Hf(e);let{class:a,style:c}=e;a&&!ae(a)&&(e.class=tn(a)),se(c)&&(Za(c)&&!H(c)&&(c=fe({},c)),e.style=pi(c))}const o=ae(t)?1:tf(t)?128:Uf(t)?64:se(t)?4:V(t)?2:0;return D(t,e,n,r,s,o,i,!0)}function Hf(t){return t?Za(t)||Zr in t?fe({},t):t:null}function fn(t,e,n=!1){const{props:r,ref:s,patchFlag:i,children:o}=t,a=e?jf(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:a,key:a&&Cc(a),ref:e&&e.ref?n&&s?H(s)?s.concat(yr(e)):[s,yr(e)]:yr(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==$e?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&fn(t.ssContent),ssFallback:t.ssFallback&&fn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function Ri(t=" ",e=0){return Re(Qr,null,t,e)}function He(t){return t==null||typeof t=="boolean"?Re(Fn):H(t)?Re($e,null,t.slice()):typeof t=="object"?ft(t):Re(Qr,null,String(t))}function ft(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:fn(t)}function Ai(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(H(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Ai(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!(Zr in e)?e._ctx=ve:s===3&&ve&&(ve.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else V(e)?(e={default:e,_ctx:ve},n=32):(e=String(e),r&64?(n=16,e=[Ri(e)]):n=8);t.children=e,t.shapeFlag|=n}function jf(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=tn([e.class,r.class]));else if(s==="style")e.style=pi([e.style,r.style]);else if($r(s)){const i=e[s],o=r[s];o&&i!==o&&!(H(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Be(t,e,n,r=null){Le(t,e,7,[n,r])}const Vf=bc();let Wf=0;function zf(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||Vf,i={uid:Wf++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new pu(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Ec(r,s),emitsOptions:uc(r,s),emit:null,emitted:null,propsDefaults:te,inheritAttrs:r.inheritAttrs,ctx:te,data:te,props:te,attrs:te,slots:te,refs:te,setupState:te,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Ku.bind(null,i),t.ce&&t.ce(i),i}let pe=null,kr,qs;{const t=Ua(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};kr=e("__VUE_INSTANCE_SETTERS__",n=>pe=n),qs=e("__VUE_SSR_SETTERS__",n=>es=n)}const Gn=t=>{const e=pe;return kr(t),t.scope.on(),()=>{t.scope.off(),kr(e)}},bo=()=>{pe&&pe.scope.off(),kr(null)};function Pc(t){return t.vnode.shapeFlag&4}let es=!1;function Kf(t,e=!1){e&&qs(e);const{props:n,children:r}=t.vnode,s=Pc(t);Cf(t,n,s,e),kf(t,r);const i=s?qf(t,e):void 0;return e&&qs(!1),i}function qf(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=ec(new Proxy(t.ctx,vf));const{setup:r}=n;if(r){const s=t.setupContext=r.length>1?Jf(t):null,i=Gn(t);Ht();const o=bt(r,t,0,[t.props,s]);if(jt(),i(),xa(o)){if(o.then(bo,bo),e)return o.then(a=>{vo(t,a,e)}).catch(a=>{Kr(a,t,0)});t.asyncDep=o}else vo(t,o,e)}else Oc(t,e)}function vo(t,e,n){V(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:se(e)&&(t.setupState=sc(e)),Oc(t,n)}let Eo;function Oc(t,e,n){const r=t.type;if(!t.render){if(!e&&Eo&&!r.render){const s=r.template||Si(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:a,compilerOptions:c}=r,u=fe(fe({isCustomElement:i,delimiters:a},o),c);r.render=Eo(s,u)}}t.render=r.render||Te}{const s=Gn(t);Ht();try{Ef(t)}finally{jt(),s()}}}function Gf(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return Ee(t,"get","$attrs"),e[n]}}))}function Jf(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return Gf(t)},slots:t.slots,emit:t.emit,expose:e}}function ts(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(sc(ec(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Pn)return Pn[n](t)},has(e,n){return n in e||n in Pn}}))}function Yf(t,e=!0){return V(t)?t.displayName||t.name:t.name||e&&t.__name}function Xf(t){return V(t)&&"__vccOpts"in t}const ke=(t,e)=>Mu(t,e,es);function kc(t,e,n){const r=arguments.length;return r===2?se(e)&&!H(e)?Ks(e)?Re(t,null,[e]):Re(t,e):Re(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Ks(n)&&(n=[n]),Re(t,e,n))}const Qf="3.4.21";/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Zf="http://www.w3.org/2000/svg",ed="http://www.w3.org/1998/Math/MathML",dt=typeof document<"u"?document:null,wo=dt&&dt.createElement("template"),td={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?dt.createElementNS(Zf,t):e==="mathml"?dt.createElementNS(ed,t):dt.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>dt.createTextNode(t),createComment:t=>dt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>dt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{wo.innerHTML=r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t;const a=wo.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},nd=Symbol("_vtc");function rd(t,e,n){const r=t[nd];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Io=Symbol("_vod"),sd=Symbol("_vsh"),id=Symbol(""),od=/(^|;)\s*display\s*:/;function ad(t,e,n){const r=t.style,s=ae(n);let i=!1;if(n&&!s){if(e)if(ae(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&br(r,a,"")}else for(const o in e)n[o]==null&&br(r,o,"");for(const o in n)o==="display"&&(i=!0),br(r,o,n[o])}else if(s){if(e!==n){const o=r[id];o&&(n+=";"+o),r.cssText=n,i=od.test(n)}}else e&&t.removeAttribute("style");Io in t&&(t[Io]=i?r.display:"",t[sd]&&(r.display="none"))}const So=/\s*!important$/;function br(t,e,n){if(H(n))n.forEach(r=>br(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=cd(t,e);So.test(n)?t.setProperty(_n(r),n.replace(So,""),"important"):t[r]=n}}const To=["Webkit","Moz","ms"],ys={};function cd(t,e){const n=ys[e];if(n)return n;let r=Ke(e);if(r!=="filter"&&r in t)return ys[e]=r;r=Vr(r);for(let s=0;s<To.length;s++){const i=To[s]+r;if(i in t)return ys[e]=i}return e}const Ro="http://www.w3.org/1999/xlink";function ld(t,e,n,r,s){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(Ro,e.slice(6,e.length)):t.setAttributeNS(Ro,e,n);else{const i=du(e);n==null||i&&!Fa(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function ud(t,e,n,r,s,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,s,i),t[e]=n??"";return}const a=t.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){const u=a==="OPTION"?t.getAttribute("value")||"":t.value,l=n??"";(u!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let c=!1;if(n===""||n==null){const u=typeof t[e];u==="boolean"?n=Fa(n):n==null&&u==="string"?(n="",c=!0):u==="number"&&(n=0,c=!0)}try{t[e]=n}catch{}c&&t.removeAttribute(e)}function Yt(t,e,n,r){t.addEventListener(e,n,r)}function fd(t,e,n,r){t.removeEventListener(e,n,r)}const Ao=Symbol("_vei");function dd(t,e,n,r,s=null){const i=t[Ao]||(t[Ao]={}),o=i[e];if(r&&o)o.value=r;else{const[a,c]=hd(e);if(r){const u=i[e]=gd(r,s);Yt(t,a,u,c)}else o&&(fd(t,a,o,c),i[e]=void 0)}}const Co=/(?:Once|Passive|Capture)$/;function hd(t){let e;if(Co.test(t)){e={};let r;for(;r=t.match(Co);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):_n(t.slice(2)),e]}let bs=0;const pd=Promise.resolve(),md=()=>bs||(pd.then(()=>bs=0),bs=Date.now());function gd(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Le(_d(r,n.value),e,5,[r])};return n.value=t,n.attached=md(),n}function _d(t,e){if(H(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Po=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,yd=(t,e,n,r,s,i,o,a,c)=>{const u=s==="svg";e==="class"?rd(t,r,u):e==="style"?ad(t,n,r):$r(e)?fi(e)||dd(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):bd(t,e,r,u))?ud(t,e,r,i,o,a,c):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),ld(t,e,r,u))};function bd(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Po(e)&&V(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Po(e)&&ae(n)?!1:e in t}const Oo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return H(e)?n=>hr(e,n):e};function vd(t){t.target.composing=!0}function ko(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const vs=Symbol("_assign"),Lt={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[vs]=Oo(s);const i=r||s.props&&s.props.type==="number";Yt(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=Ds(a)),t[vs](a)}),n&&Yt(t,"change",()=>{t.value=t.value.trim()}),e||(Yt(t,"compositionstart",vd),Yt(t,"compositionend",ko),Yt(t,"change",ko))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:s}},i){if(t[vs]=Oo(i),t.composing)return;const o=s||t.type==="number"?Ds(t.value):t.value,a=e??"";o!==a&&(document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===a)||(t.value=a))}},Ed=["ctrl","shift","alt","meta"],wd={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Ed.some(n=>t[`${n}Key`]&&!e.includes(n))},Nc=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const a=wd[e[o]];if(a&&a(s,e))return}return t(s,...i)})},Id=fe({patchProp:yd},td);let No;function Sd(){return No||(No=Lf(Id))}const Td=(...t)=>{const e=Sd().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=Ad(r);if(!s)return;const i=e._component;!V(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const o=n(s,!1,Rd(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function Rd(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Ad(t){return ae(t)?document.querySelector(t):t}const Jn=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},Cd={name:"App"};function Pd(t,e,n,r,s,i){const o=Qu("router-view");return Mt(),Bf(o)}const Od=Jn(Cd,[["render",Pd]]);/*!
  * vue-router v4.3.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const Xt=typeof document<"u";function kd(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const X=Object.assign;function Es(t,e){const n={};for(const r in e){const s=e[r];n[r]=xe(s)?s.map(t):t(s)}return n}const Nn=()=>{},xe=Array.isArray,Lc=/#/g,Nd=/&/g,Ld=/\//g,xd=/=/g,Dd=/\?/g,xc=/\+/g,Md=/%5B/g,Ud=/%5D/g,Dc=/%5E/g,Fd=/%60/g,Mc=/%7B/g,Bd=/%7C/g,Uc=/%7D/g,$d=/%20/g;function Ci(t){return encodeURI(""+t).replace(Bd,"|").replace(Md,"[").replace(Ud,"]")}function Hd(t){return Ci(t).replace(Mc,"{").replace(Uc,"}").replace(Dc,"^")}function Gs(t){return Ci(t).replace(xc,"%2B").replace($d,"+").replace(Lc,"%23").replace(Nd,"%26").replace(Fd,"`").replace(Mc,"{").replace(Uc,"}").replace(Dc,"^")}function jd(t){return Gs(t).replace(xd,"%3D")}function Vd(t){return Ci(t).replace(Lc,"%23").replace(Dd,"%3F")}function Wd(t){return t==null?"":Vd(t).replace(Ld,"%2F")}function $n(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const zd=/\/$/,Kd=t=>t.replace(zd,"");function ws(t,e,n="/"){let r,s={},i="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,a>-1?a:e.length),s=t(i)),a>-1&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=Yd(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:$n(o)}}function qd(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Lo(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Gd(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&dn(e.matched[r],n.matched[s])&&Fc(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function dn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Fc(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!Jd(t[n],e[n]))return!1;return!0}function Jd(t,e){return xe(t)?xo(t,e):xe(e)?xo(e,t):t===e}function xo(t,e){return xe(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function Yd(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}var Hn;(function(t){t.pop="pop",t.push="push"})(Hn||(Hn={}));var Ln;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Ln||(Ln={}));function Xd(t){if(!t)if(Xt){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Kd(t)}const Qd=/^[^#]+#/;function Zd(t,e){return t.replace(Qd,"#")+e}function eh(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const ns=()=>({left:window.scrollX,top:window.scrollY});function th(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=eh(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Do(t,e){return(history.state?history.state.position-e:-1)+t}const Js=new Map;function nh(t,e){Js.set(t,e)}function rh(t){const e=Js.get(t);return Js.delete(t),e}let sh=()=>location.protocol+"//"+location.host;function Bc(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let a=s.includes(t.slice(i))?t.slice(i).length:1,c=s.slice(a);return c[0]!=="/"&&(c="/"+c),Lo(c,"")}return Lo(n,t)+r+s}function ih(t,e,n,r){let s=[],i=[],o=null;const a=({state:p})=>{const g=Bc(t,location),b=n.value,w=e.value;let N=0;if(p){if(n.value=g,e.value=p,o&&o===b){o=null;return}N=w?p.position-w.position:0}else r(g);s.forEach(A=>{A(n.value,b,{delta:N,type:Hn.pop,direction:N?N>0?Ln.forward:Ln.back:Ln.unknown})})};function c(){o=n.value}function u(p){s.push(p);const g=()=>{const b=s.indexOf(p);b>-1&&s.splice(b,1)};return i.push(g),g}function l(){const{history:p}=window;p.state&&p.replaceState(X({},p.state,{scroll:ns()}),"")}function f(){for(const p of i)p();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",l)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:c,listen:u,destroy:f}}function Mo(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?ns():null}}function oh(t){const{history:e,location:n}=window,r={value:Bc(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,u,l){const f=t.indexOf("#"),p=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+c:sh()+t+c;try{e[l?"replaceState":"pushState"](u,"",p),s.value=u}catch(g){console.error(g),n[l?"replace":"assign"](p)}}function o(c,u){const l=X({},e.state,Mo(s.value.back,c,s.value.forward,!0),u,{position:s.value.position});i(c,l,!0),r.value=c}function a(c,u){const l=X({},s.value,e.state,{forward:c,scroll:ns()});i(l.current,l,!0);const f=X({},Mo(r.value,c,null),{position:l.position+1},u);i(c,f,!1),r.value=c}return{location:r,state:s,push:a,replace:o}}function ah(t){t=Xd(t);const e=oh(t),n=ih(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=X({location:"",base:t,go:r,createHref:Zd.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function ch(t){return typeof t=="string"||t&&typeof t=="object"}function $c(t){return typeof t=="string"||typeof t=="symbol"}const at={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Hc=Symbol("");var Uo;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Uo||(Uo={}));function hn(t,e){return X(new Error,{type:t,[Hc]:!0},e)}function Je(t,e){return t instanceof Error&&Hc in t&&(e==null||!!(t.type&e))}const Fo="[^/]+?",lh={sensitive:!1,strict:!1,start:!0,end:!0},uh=/[.+*?^${}()[\]/\\]/g;function fh(t,e){const n=X({},lh,e),r=[];let s=n.start?"^":"";const i=[];for(const u of t){const l=u.length?[]:[90];n.strict&&!u.length&&(s+="/");for(let f=0;f<u.length;f++){const p=u[f];let g=40+(n.sensitive?.25:0);if(p.type===0)f||(s+="/"),s+=p.value.replace(uh,"\\$&"),g+=40;else if(p.type===1){const{value:b,repeatable:w,optional:N,regexp:A}=p;i.push({name:b,repeatable:w,optional:N});const x=A||Fo;if(x!==Fo){g+=10;try{new RegExp(`(${x})`)}catch(z){throw new Error(`Invalid custom RegExp for param "${b}" (${x}): `+z.message)}}let M=w?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;f||(M=N&&u.length<2?`(?:/${M})`:"/"+M),N&&(M+="?"),s+=M,g+=20,N&&(g+=-8),w&&(g+=-20),x===".*"&&(g+=-50)}l.push(g)}r.push(l)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(u){const l=u.match(o),f={};if(!l)return null;for(let p=1;p<l.length;p++){const g=l[p]||"",b=i[p-1];f[b.name]=g&&b.repeatable?g.split("/"):g}return f}function c(u){let l="",f=!1;for(const p of t){(!f||!l.endsWith("/"))&&(l+="/"),f=!1;for(const g of p)if(g.type===0)l+=g.value;else if(g.type===1){const{value:b,repeatable:w,optional:N}=g,A=b in u?u[b]:"";if(xe(A)&&!w)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const x=xe(A)?A.join("/"):A;if(!x)if(N)p.length<2&&(l.endsWith("/")?l=l.slice(0,-1):f=!0);else throw new Error(`Missing required param "${b}"`);l+=x}}return l||"/"}return{re:o,score:r,keys:i,parse:a,stringify:c}}function dh(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function hh(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=dh(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Bo(r))return 1;if(Bo(s))return-1}return s.length-r.length}function Bo(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const ph={type:0,value:""},mh=/[a-zA-Z0-9_]/;function gh(t){if(!t)return[[]];if(t==="/")return[[ph]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(g){throw new Error(`ERR (${n})/"${u}": ${g}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,c,u="",l="";function f(){u&&(n===0?i.push({type:0,value:u}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:l,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=c}for(;a<t.length;){if(c=t[a++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(u&&f(),o()):c===":"?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:c==="("?n=2:mh.test(c)?p():(f(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case 2:c===")"?l[l.length-1]=="\\"?l=l.slice(0,-1)+c:n=3:l+=c;break;case 3:f(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--,l="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${u}"`),f(),o(),s}function _h(t,e,n){const r=fh(gh(t.path),n),s=X(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function yh(t,e){const n=[],r=new Map;e=jo({strict:!1,end:!0,sensitive:!1},e);function s(l){return r.get(l)}function i(l,f,p){const g=!p,b=bh(l);b.aliasOf=p&&p.record;const w=jo(e,l),N=[b];if("alias"in l){const M=typeof l.alias=="string"?[l.alias]:l.alias;for(const z of M)N.push(X({},b,{components:p?p.record.components:b.components,path:z,aliasOf:p?p.record:b}))}let A,x;for(const M of N){const{path:z}=M;if(f&&z[0]!=="/"){const ie=f.record.path,$=ie[ie.length-1]==="/"?"":"/";M.path=f.record.path+(z&&$+z)}if(A=_h(M,f,w),p?p.alias.push(A):(x=x||A,x!==A&&x.alias.push(A),g&&l.name&&!Ho(A)&&o(l.name)),b.children){const ie=b.children;for(let $=0;$<ie.length;$++)i(ie[$],A,p&&p.children[$])}p=p||A,(A.record.components&&Object.keys(A.record.components).length||A.record.name||A.record.redirect)&&c(A)}return x?()=>{o(x)}:Nn}function o(l){if($c(l)){const f=r.get(l);f&&(r.delete(l),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(l);f>-1&&(n.splice(f,1),l.record.name&&r.delete(l.record.name),l.children.forEach(o),l.alias.forEach(o))}}function a(){return n}function c(l){let f=0;for(;f<n.length&&hh(l,n[f])>=0&&(l.record.path!==n[f].record.path||!jc(l,n[f]));)f++;n.splice(f,0,l),l.record.name&&!Ho(l)&&r.set(l.record.name,l)}function u(l,f){let p,g={},b,w;if("name"in l&&l.name){if(p=r.get(l.name),!p)throw hn(1,{location:l});w=p.record.name,g=X($o(f.params,p.keys.filter(x=>!x.optional).concat(p.parent?p.parent.keys.filter(x=>x.optional):[]).map(x=>x.name)),l.params&&$o(l.params,p.keys.map(x=>x.name))),b=p.stringify(g)}else if(l.path!=null)b=l.path,p=n.find(x=>x.re.test(b)),p&&(g=p.parse(b),w=p.record.name);else{if(p=f.name?r.get(f.name):n.find(x=>x.re.test(f.path)),!p)throw hn(1,{location:l,currentLocation:f});w=p.record.name,g=X({},f.params,l.params),b=p.stringify(g)}const N=[];let A=p;for(;A;)N.unshift(A.record),A=A.parent;return{name:w,path:b,params:g,matched:N,meta:Eh(N)}}return t.forEach(l=>i(l)),{addRoute:i,resolve:u,removeRoute:o,getRoutes:a,getRecordMatcher:s}}function $o(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function bh(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:vh(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function vh(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Ho(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Eh(t){return t.reduce((e,n)=>X(e,n.meta),{})}function jo(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function jc(t,e){return e.children.some(n=>n===t||jc(t,n))}function wh(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(xc," "),o=i.indexOf("="),a=$n(o<0?i:i.slice(0,o)),c=o<0?null:$n(i.slice(o+1));if(a in e){let u=e[a];xe(u)||(u=e[a]=[u]),u.push(c)}else e[a]=c}return e}function Vo(t){let e="";for(let n in t){const r=t[n];if(n=jd(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(xe(r)?r.map(i=>i&&Gs(i)):[r&&Gs(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function Ih(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=xe(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const Sh=Symbol(""),Wo=Symbol(""),Pi=Symbol(""),Vc=Symbol(""),Ys=Symbol("");function In(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function ht(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((a,c)=>{const u=p=>{p===!1?c(hn(4,{from:n,to:e})):p instanceof Error?c(p):ch(p)?c(hn(2,{from:e,to:p})):(o&&r.enterCallbacks[s]===o&&typeof p=="function"&&o.push(p),a())},l=i(()=>t.call(r&&r.instances[s],e,n,u));let f=Promise.resolve(l);t.length<3&&(f=f.then(u)),f.catch(p=>c(p))})}function Is(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const a in o.components){let c=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(Th(c)){const l=(c.__vccOpts||c)[e];l&&i.push(ht(l,n,r,o,a,s))}else{let u=c();i.push(()=>u.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${a}" at "${o.path}"`));const f=kd(l)?l.default:l;o.components[a]=f;const g=(f.__vccOpts||f)[e];return g&&ht(g,n,r,o,a,s)()}))}}return i}function Th(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function zo(t){const e=Ze(Pi),n=Ze(Vc),r=ke(()=>e.resolve(rn(t.to))),s=ke(()=>{const{matched:c}=r.value,{length:u}=c,l=c[u-1],f=n.matched;if(!l||!f.length)return-1;const p=f.findIndex(dn.bind(null,l));if(p>-1)return p;const g=Ko(c[u-2]);return u>1&&Ko(l)===g&&f[f.length-1].path!==g?f.findIndex(dn.bind(null,c[u-2])):p}),i=ke(()=>s.value>-1&&Ph(n.params,r.value.params)),o=ke(()=>s.value>-1&&s.value===n.matched.length-1&&Fc(n.params,r.value.params));function a(c={}){return Ch(c)?e[rn(t.replace)?"replace":"push"](rn(t.to)).catch(Nn):Promise.resolve()}return{route:r,href:ke(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}const Rh=pc({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:zo,setup(t,{slots:e}){const n=zr(zo(t)),{options:r}=Ze(Pi),s=ke(()=>({[qo(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[qo(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:kc("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),Ah=Rh;function Ch(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function Ph(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!xe(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function Ko(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const qo=(t,e,n)=>t??e??n,Oh=pc({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Ze(Ys),s=ke(()=>t.route||r.value),i=Ze(Wo,0),o=ke(()=>{let u=rn(i);const{matched:l}=s.value;let f;for(;(f=l[u])&&!f.components;)u++;return u}),a=ke(()=>s.value.matched[o.value]);_r(Wo,ke(()=>o.value+1)),_r(Sh,a),_r(Ys,s);const c=Uu();return mr(()=>[c.value,a.value,t.name],([u,l,f],[p,g,b])=>{l&&(l.instances[f]=u,g&&g!==l&&u&&u===p&&(l.leaveGuards.size||(l.leaveGuards=g.leaveGuards),l.updateGuards.size||(l.updateGuards=g.updateGuards))),u&&l&&(!g||!dn(l,g)||!p)&&(l.enterCallbacks[f]||[]).forEach(w=>w(u))},{flush:"post"}),()=>{const u=s.value,l=t.name,f=a.value,p=f&&f.components[l];if(!p)return Go(n.default,{Component:p,route:u});const g=f.props[l],b=g?g===!0?u.params:typeof g=="function"?g(u):g:null,N=kc(p,X({},b,e,{onVnodeUnmounted:A=>{A.component.isUnmounted&&(f.instances[l]=null)},ref:c}));return Go(n.default,{Component:N,route:u})||N}}});function Go(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const kh=Oh;function Nh(t){const e=yh(t.routes,t),n=t.parseQuery||wh,r=t.stringifyQuery||Vo,s=t.history,i=In(),o=In(),a=In(),c=Fu(at);let u=at;Xt&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const l=Es.bind(null,v=>""+v),f=Es.bind(null,Wd),p=Es.bind(null,$n);function g(v,O){let C,L;return $c(v)?(C=e.getRecordMatcher(v),L=O):L=v,e.addRoute(L,C)}function b(v){const O=e.getRecordMatcher(v);O&&e.removeRoute(O)}function w(){return e.getRoutes().map(v=>v.record)}function N(v){return!!e.getRecordMatcher(v)}function A(v,O){if(O=X({},O||c.value),typeof v=="string"){const h=ws(n,v,O.path),m=e.resolve({path:h.path},O),E=s.createHref(h.fullPath);return X(h,m,{params:p(m.params),hash:$n(h.hash),redirectedFrom:void 0,href:E})}let C;if(v.path!=null)C=X({},v,{path:ws(n,v.path,O.path).path});else{const h=X({},v.params);for(const m in h)h[m]==null&&delete h[m];C=X({},v,{params:f(h)}),O.params=f(O.params)}const L=e.resolve(C,O),Y=v.hash||"";L.params=l(p(L.params));const ne=qd(r,X({},v,{hash:Hd(Y),path:L.path})),d=s.createHref(ne);return X({fullPath:ne,hash:Y,query:r===Vo?Ih(v.query):v.query||{}},L,{redirectedFrom:void 0,href:d})}function x(v){return typeof v=="string"?ws(n,v,c.value.path):X({},v)}function M(v,O){if(u!==v)return hn(8,{from:O,to:v})}function z(v){return ce(v)}function ie(v){return z(X(x(v),{replace:!0}))}function $(v){const O=v.matched[v.matched.length-1];if(O&&O.redirect){const{redirect:C}=O;let L=typeof C=="function"?C(v):C;return typeof L=="string"&&(L=L.includes("?")||L.includes("#")?L=x(L):{path:L},L.params={}),X({query:v.query,hash:v.hash,params:L.path!=null?{}:v.params},L)}}function ce(v,O){const C=u=A(v),L=c.value,Y=v.state,ne=v.force,d=v.replace===!0,h=$(C);if(h)return ce(X(x(h),{state:typeof h=="object"?X({},Y,h.state):Y,force:ne,replace:d}),O||C);const m=C;m.redirectedFrom=O;let E;return!ne&&Gd(r,L,C)&&(E=hn(16,{to:m,from:L}),Ue(L,L,!0,!1)),(E?Promise.resolve(E):Se(m,L)).catch(_=>Je(_)?Je(_,2)?_:it(_):J(_,m,L)).then(_=>{if(_){if(Je(_,2))return ce(X({replace:d},x(_.to),{state:typeof _.to=="object"?X({},Y,_.to.state):Y,force:ne}),O||m)}else _=Rt(m,L,!0,d,Y);return st(m,L,_),_})}function _e(v,O){const C=M(v,O);return C?Promise.reject(C):Promise.resolve()}function Ce(v){const O=Gt.values().next().value;return O&&typeof O.runWithContext=="function"?O.runWithContext(v):v()}function Se(v,O){let C;const[L,Y,ne]=Lh(v,O);C=Is(L.reverse(),"beforeRouteLeave",v,O);for(const h of L)h.leaveGuards.forEach(m=>{C.push(ht(m,v,O))});const d=_e.bind(null,v,O);return C.push(d),de(C).then(()=>{C=[];for(const h of i.list())C.push(ht(h,v,O));return C.push(d),de(C)}).then(()=>{C=Is(Y,"beforeRouteUpdate",v,O);for(const h of Y)h.updateGuards.forEach(m=>{C.push(ht(m,v,O))});return C.push(d),de(C)}).then(()=>{C=[];for(const h of ne)if(h.beforeEnter)if(xe(h.beforeEnter))for(const m of h.beforeEnter)C.push(ht(m,v,O));else C.push(ht(h.beforeEnter,v,O));return C.push(d),de(C)}).then(()=>(v.matched.forEach(h=>h.enterCallbacks={}),C=Is(ne,"beforeRouteEnter",v,O,Ce),C.push(d),de(C))).then(()=>{C=[];for(const h of o.list())C.push(ht(h,v,O));return C.push(d),de(C)}).catch(h=>Je(h,8)?h:Promise.reject(h))}function st(v,O,C){a.list().forEach(L=>Ce(()=>L(v,O,C)))}function Rt(v,O,C,L,Y){const ne=M(v,O);if(ne)return ne;const d=O===at,h=Xt?history.state:{};C&&(L||d?s.replace(v.fullPath,X({scroll:d&&h&&h.scroll},Y)):s.push(v.fullPath,Y)),c.value=v,Ue(v,O,C,d),it()}let Me;function vn(){Me||(Me=s.listen((v,O,C)=>{if(!ir.listening)return;const L=A(v),Y=$(L);if(Y){ce(X(Y,{replace:!0}),L).catch(Nn);return}u=L;const ne=c.value;Xt&&nh(Do(ne.fullPath,C.delta),ns()),Se(L,ne).catch(d=>Je(d,12)?d:Je(d,2)?(ce(d.to,L).then(h=>{Je(h,20)&&!C.delta&&C.type===Hn.pop&&s.go(-1,!1)}).catch(Nn),Promise.reject()):(C.delta&&s.go(-C.delta,!1),J(d,L,ne))).then(d=>{d=d||Rt(L,ne,!1),d&&(C.delta&&!Je(d,8)?s.go(-C.delta,!1):C.type===Hn.pop&&Je(d,20)&&s.go(-1,!1)),st(L,ne,d)}).catch(Nn)}))}let Kt=In(),le=In(),Q;function J(v,O,C){it(v);const L=le.list();return L.length?L.forEach(Y=>Y(v,O,C)):console.error(v),Promise.reject(v)}function Ge(){return Q&&c.value!==at?Promise.resolve():new Promise((v,O)=>{Kt.add([v,O])})}function it(v){return Q||(Q=!v,vn(),Kt.list().forEach(([O,C])=>v?C(v):O()),Kt.reset()),v}function Ue(v,O,C,L){const{scrollBehavior:Y}=t;if(!Xt||!Y)return Promise.resolve();const ne=!C&&rh(Do(v.fullPath,0))||(L||!C)&&history.state&&history.state.scroll||null;return oc().then(()=>Y(v,O,ne)).then(d=>d&&th(d)).catch(d=>J(d,v,O))}const ye=v=>s.go(v);let qt;const Gt=new Set,ir={currentRoute:c,listening:!0,addRoute:g,removeRoute:b,hasRoute:N,getRoutes:w,resolve:A,options:t,push:z,replace:ie,go:ye,back:()=>ye(-1),forward:()=>ye(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:le.add,isReady:Ge,install(v){const O=this;v.component("RouterLink",Ah),v.component("RouterView",kh),v.config.globalProperties.$router=O,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>rn(c)}),Xt&&!qt&&c.value===at&&(qt=!0,z(s.location).catch(Y=>{}));const C={};for(const Y in at)Object.defineProperty(C,Y,{get:()=>c.value[Y],enumerable:!0});v.provide(Pi,O),v.provide(Vc,Xa(C)),v.provide(Ys,c);const L=v.unmount;Gt.add(v),v.unmount=function(){Gt.delete(v),Gt.size<1&&(u=at,Me&&Me(),Me=null,c.value=at,qt=!1,Q=!1),L()}}};function de(v){return v.reduce((O,C)=>O.then(()=>Ce(C)),Promise.resolve())}return ir}function Lh(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(u=>dn(u,a))?r.push(a):n.push(a));const c=t.matched[o];c&&(e.matched.find(u=>dn(u,c))||s.push(c))}return[n,r,s]}const Oi="/assets/logo-PjH7a8V4.jpg",xh="/assets/landingfood-iaW25sLx.png",Dh={name:"LandingPage",methods:{goToSignUp(){this.$router.push("/signup")},goToLogin(){this.$router.push("/login")}}},ki=t=>(Jr("data-v-7468dc4e"),t=t(),Yr(),t),Mh={id:"app"},Uh={class:"top-bar"},Fh=ki(()=>D("img",{src:Oi,alt:"PantryPal Logo",class:"logo"},null,-1)),Bh={class:"menu"},$h=ki(()=>D("div",{class:"separator"},null,-1)),Hh=ki(()=>D("div",{class:"gallery-container"},[D("header",null,[D("h1",null,"Transform leftovers into culinary treasures!")]),D("section",{class:"gallery"},[D("div",null,[D("img",{class:"gallery-item",src:xh,alt:"food"})])])],-1));function jh(t,e,n,r,s,i){return Mt(),on("div",Mh,[D("div",Uh,[Fh,D("div",Bh,[D("button",{class:"btn-login",onClick:e[0]||(e[0]=(...o)=>i.goToLogin&&i.goToLogin(...o))},"Login"),D("button",{class:"btn-signup",onClick:e[1]||(e[1]=(...o)=>i.goToSignUp&&i.goToSignUp(...o))},"Sign Up")])]),$h,Hh])}const Vh=Jn(Dh,[["render",jh],["__scopeId","data-v-7468dc4e"]]);var Jo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Wh=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},zc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,l=i>>2,f=(i&3)<<4|a>>4;let p=(a&15)<<2|u>>6,g=u&63;c||(g=64,o||(p=64)),r.push(n[l],n[f],n[p],n[g])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Wc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Wh(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||u==null||f==null)throw new zh;const p=i<<2|a>>4;if(r.push(p),u!==64){const g=a<<4&240|u>>2;if(r.push(g),f!==64){const b=u<<6&192|f;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class zh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Kh=function(t){const e=Wc(t);return zc.encodeByteArray(e,!0)},Kc=function(t){return Kh(t).replace(/\./g,"")},qc=function(t){try{return zc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=()=>qh().__FIREBASE_DEFAULTS__,Jh=()=>{if(typeof process>"u"||typeof Jo>"u")return;const t=Jo.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Yh=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&qc(t[1]);return e&&JSON.parse(e)},Ni=()=>{try{return Gh()||Jh()||Yh()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Xh=t=>{var e,n;return(n=(e=Ni())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Gc=()=>{var t;return(t=Ni())===null||t===void 0?void 0:t.config},Jc=t=>{var e;return(e=Ni())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function ep(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function tp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function np(){const t=me();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function rp(){try{return typeof indexedDB=="object"}catch{return!1}}function sp(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip="FirebaseError";class It extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=ip,Object.setPrototypeOf(this,It.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yn.prototype.create)}}class Yn{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?op(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new It(s,a,r)}}function op(t,e){return t.replace(ap,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const ap=/\{\$([^}]+)}/g;function cp(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Nr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Yo(i)&&Yo(o)){if(!Nr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Yo(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xn(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Rn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function An(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function lp(t,e){const n=new up(t,e);return n.subscribe.bind(n)}class up{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");fp(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Ss),s.error===void 0&&(s.error=Ss),s.complete===void 0&&(s.complete=Ss);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fp(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ss(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(t){return t&&t._delegate?t._delegate:t}class pn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Qh;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(pp(e))try{this.getOrInitializeService({instanceIdentifier:Pt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Pt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Pt){return this.instances.has(e)}getOptions(e=Pt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:hp(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Pt){return this.component?this.component.multipleInstances?e:Pt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function hp(t){return t===Pt?void 0:t}function pp(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new dp(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ee;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ee||(ee={}));const gp={debug:ee.DEBUG,verbose:ee.VERBOSE,info:ee.INFO,warn:ee.WARN,error:ee.ERROR,silent:ee.SILENT},_p=ee.INFO,yp={[ee.DEBUG]:"log",[ee.VERBOSE]:"log",[ee.INFO]:"info",[ee.WARN]:"warn",[ee.ERROR]:"error"},bp=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=yp[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Yc{constructor(e){this.name=e,this._logLevel=_p,this._logHandler=bp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ee.DEBUG,...e),this._logHandler(this,ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ee.VERBOSE,...e),this._logHandler(this,ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ee.INFO,...e),this._logHandler(this,ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ee.WARN,...e),this._logHandler(this,ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ee.ERROR,...e),this._logHandler(this,ee.ERROR,...e)}}const vp=(t,e)=>e.some(n=>t instanceof n);let Xo,Qo;function Ep(){return Xo||(Xo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wp(){return Qo||(Qo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Xc=new WeakMap,Xs=new WeakMap,Qc=new WeakMap,Ts=new WeakMap,Li=new WeakMap;function Ip(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(vt(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Xc.set(n,t)}).catch(()=>{}),Li.set(e,t),e}function Sp(t){if(Xs.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Xs.set(t,e)}let Qs={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Xs.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Qc.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return vt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Tp(t){Qs=t(Qs)}function Rp(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Rs(this),e,...n);return Qc.set(r,e.sort?e.sort():[e]),vt(r)}:wp().includes(t)?function(...e){return t.apply(Rs(this),e),vt(Xc.get(this))}:function(...e){return vt(t.apply(Rs(this),e))}}function Ap(t){return typeof t=="function"?Rp(t):(t instanceof IDBTransaction&&Sp(t),vp(t,Ep())?new Proxy(t,Qs):t)}function vt(t){if(t instanceof IDBRequest)return Ip(t);if(Ts.has(t))return Ts.get(t);const e=Ap(t);return e!==t&&(Ts.set(t,e),Li.set(e,t)),e}const Rs=t=>Li.get(t);function Cp(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=vt(o);return r&&o.addEventListener("upgradeneeded",c=>{r(vt(o.result),c.oldVersion,c.newVersion,vt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const Pp=["get","getKey","getAll","getAllKeys","count"],Op=["put","add","delete","clear"],As=new Map;function Zo(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(As.get(e))return As.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Op.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Pp.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),s&&c.done]))[0]};return As.set(e,i),i}Tp(t=>({...t,get:(e,n,r)=>Zo(e,n)||t.get(e,n,r),has:(e,n)=>!!Zo(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Np(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Np(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zs="@firebase/app",ea="0.9.28";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new Yc("@firebase/app"),Lp="@firebase/app-compat",xp="@firebase/analytics-compat",Dp="@firebase/analytics",Mp="@firebase/app-check-compat",Up="@firebase/app-check",Fp="@firebase/auth",Bp="@firebase/auth-compat",$p="@firebase/database",Hp="@firebase/database-compat",jp="@firebase/functions",Vp="@firebase/functions-compat",Wp="@firebase/installations",zp="@firebase/installations-compat",Kp="@firebase/messaging",qp="@firebase/messaging-compat",Gp="@firebase/performance",Jp="@firebase/performance-compat",Yp="@firebase/remote-config",Xp="@firebase/remote-config-compat",Qp="@firebase/storage",Zp="@firebase/storage-compat",em="@firebase/firestore",tm="@firebase/firestore-compat",nm="firebase",rm="10.8.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei="[DEFAULT]",sm={[Zs]:"fire-core",[Lp]:"fire-core-compat",[Dp]:"fire-analytics",[xp]:"fire-analytics-compat",[Up]:"fire-app-check",[Mp]:"fire-app-check-compat",[Fp]:"fire-auth",[Bp]:"fire-auth-compat",[$p]:"fire-rtdb",[Hp]:"fire-rtdb-compat",[jp]:"fire-fn",[Vp]:"fire-fn-compat",[Wp]:"fire-iid",[zp]:"fire-iid-compat",[Kp]:"fire-fcm",[qp]:"fire-fcm-compat",[Gp]:"fire-perf",[Jp]:"fire-perf-compat",[Yp]:"fire-rc",[Xp]:"fire-rc-compat",[Qp]:"fire-gcs",[Zp]:"fire-gcs-compat",[em]:"fire-fst",[tm]:"fire-fst-compat","fire-js":"fire-js",[nm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr=new Map,ti=new Map;function im(t,e){try{t.container.addComponent(e)}catch(n){Ft.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function jn(t){const e=t.name;if(ti.has(e))return Ft.debug(`There were multiple attempts to register component ${e}.`),!1;ti.set(e,t);for(const n of Lr.values())im(n,t);return!0}function Zc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const om={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Et=new Yn("app","Firebase",om);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Et.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn=rm;function el(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ei,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Et.create("bad-app-name",{appName:String(s)});if(n||(n=Gc()),!n)throw Et.create("no-options");const i=Lr.get(s);if(i){if(Nr(n,i.options)&&Nr(r,i.config))return i;throw Et.create("duplicate-app",{appName:s})}const o=new mp(s);for(const c of ti.values())o.addComponent(c);const a=new am(n,r,o);return Lr.set(s,a),a}function cm(t=ei){const e=Lr.get(t);if(!e&&t===ei&&Gc())return el();if(!e)throw Et.create("no-app",{appName:t});return e}function an(t,e,n){var r;let s=(r=sm[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ft.warn(a.join(" "));return}jn(new pn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm="firebase-heartbeat-database",um=1,Vn="firebase-heartbeat-store";let Cs=null;function tl(){return Cs||(Cs=Cp(lm,um,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Vn)}catch(n){console.warn(n)}}}}).catch(t=>{throw Et.create("idb-open",{originalErrorMessage:t.message})})),Cs}async function fm(t){try{const n=(await tl()).transaction(Vn),r=await n.objectStore(Vn).get(nl(t));return await n.done,r}catch(e){if(e instanceof It)Ft.warn(e.message);else{const n=Et.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ft.warn(n.message)}}}async function ta(t,e){try{const r=(await tl()).transaction(Vn,"readwrite");await r.objectStore(Vn).put(e,nl(t)),await r.done}catch(n){if(n instanceof It)Ft.warn(n.message);else{const r=Et.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Ft.warn(r.message)}}}function nl(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dm=1024,hm=30*24*60*60*1e3;class pm{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new gm(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=na();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)))return this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=hm}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=na(),{heartbeatsToSend:r,unsentEntries:s}=mm(this._heartbeatsCache.heartbeats),i=Kc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function na(){return new Date().toISOString().substring(0,10)}function mm(t,e=dm){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),ra(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),ra(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class gm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return rp()?sp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await fm(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ta(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ta(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ra(t){return Kc(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(t){jn(new pn("platform-logger",e=>new kp(e),"PRIVATE")),jn(new pn("heartbeat",e=>new pm(e),"PRIVATE")),an(Zs,ea,t),an(Zs,ea,"esm2017"),an("fire-js","")}_m("");var ym="firebase",bm="10.8.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */an(ym,bm,"app");function xi(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function rl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const vm=rl,sl=new Yn("auth","Firebase",rl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr=new Yc("@firebase/auth");function Em(t,...e){xr.logLevel<=ee.WARN&&xr.warn(`Auth (${Qn}): ${t}`,...e)}function vr(t,...e){xr.logLevel<=ee.ERROR&&xr.error(`Auth (${Qn}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(t,...e){throw Di(t,...e)}function We(t,...e){return Di(t,...e)}function wm(t,e,n){const r=Object.assign(Object.assign({},vm()),{[e]:n});return new Yn("auth","Firebase",r).create(e,{appName:t.name})}function Di(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return sl.create(t,...e)}function B(t,e,...n){if(!t)throw Di(e,...n)}function Ye(t){const e="INTERNAL ASSERTION FAILED: "+t;throw vr(e),new Error(e)}function tt(t,e){t||Ye(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Im(){return sa()==="http:"||sa()==="https:"}function sa(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Im()||ep()||"connection"in navigator)?navigator.onLine:!0}function Tm(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,n){this.shortDelay=e,this.longDelay=n,tt(n>e,"Short delay should be less than long delay!"),this.isMobile=Zh()||tp()}get(){return Sm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(t,e){tt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am=new Zn(3e4,6e4);function St(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Tt(t,e,n,r,s={}){return ol(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=Xn(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),il.fetch()(al(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function ol(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Rm),e);try{const s=new Pm(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw dr(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw dr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw dr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw dr(t,"user-disabled",o);const l=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw wm(t,l,u);De(t,l)}}catch(s){if(s instanceof It)throw s;De(t,"network-request-failed",{message:String(s)})}}async function er(t,e,n,r,s={}){const i=await Tt(t,e,n,r,s);return"mfaPendingCredential"in i&&De(t,"multi-factor-auth-required",{_serverResponse:i}),i}function al(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Mi(t.config,s):`${t.config.apiScheme}://${s}`}function Cm(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Pm{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(We(this.auth,"network-request-failed")),Am.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function dr(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=We(t,e,r);return s.customData._tokenResponse=n,s}function ia(t){return t!==void 0&&t.enterprise!==void 0}class Om{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Cm(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function km(t,e){return Tt(t,"GET","/v2/recaptchaConfig",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nm(t,e){return Tt(t,"POST","/v1/accounts:delete",e)}async function Lm(t,e){return Tt(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function xm(t,e=!1){const n=Vt(t),r=await n.getIdToken(e),s=Ui(r);B(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:xn(Ps(s.auth_time)),issuedAtTime:xn(Ps(s.iat)),expirationTime:xn(Ps(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ps(t){return Number(t)*1e3}function Ui(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return vr("JWT malformed, contained fewer than 3 sections"),null;try{const s=qc(n);return s?JSON.parse(s):(vr("Failed to decode base64 JWT payload"),null)}catch(s){return vr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Dm(t){const e=Ui(t);return B(e,"internal-error"),B(typeof e.exp<"u","internal-error"),B(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof It&&Mm(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Mm({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=xn(this.lastLoginAt),this.creationTime=xn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dr(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Wn(t,Lm(n,{idToken:r}));B(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?$m(i.providerUserInfo):[],a=Bm(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),l=c?u:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new cl(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,f)}async function Fm(t){const e=Vt(t);await Dr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Bm(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function $m(t){return t.map(e=>{var{providerId:n}=e,r=xi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hm(t,e){const n=await ol(t,{},async()=>{const r=Xn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=al(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",il.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function jm(t,e){return Tt(t,"POST","/v2/accounts:revokeToken",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken<"u","internal-error"),B(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Dm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return B(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await Hm(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new zn;return r&&(B(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(B(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(B(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new zn,this.toJSON())}_performRefresh(){return Ye("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(t,e){B(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ut{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=xi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Um(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new cl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Wn(this,this.stsTokenManager.getToken(this.auth,e));return B(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return xm(this,e)}reload(){return Fm(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ut(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Dr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Wn(this,Nm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,a,c,u,l;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(s=n.email)!==null&&s!==void 0?s:void 0,g=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,b=(o=n.photoURL)!==null&&o!==void 0?o:void 0,w=(a=n.tenantId)!==null&&a!==void 0?a:void 0,N=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,A=(u=n.createdAt)!==null&&u!==void 0?u:void 0,x=(l=n.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:M,emailVerified:z,isAnonymous:ie,providerData:$,stsTokenManager:ce}=n;B(M&&ce,e,"internal-error");const _e=zn.fromJSON(this.name,ce);B(typeof M=="string",e,"internal-error"),ct(f,e.name),ct(p,e.name),B(typeof z=="boolean",e,"internal-error"),B(typeof ie=="boolean",e,"internal-error"),ct(g,e.name),ct(b,e.name),ct(w,e.name),ct(N,e.name),ct(A,e.name),ct(x,e.name);const Ce=new Ut({uid:M,auth:e,email:p,emailVerified:z,displayName:f,isAnonymous:ie,photoURL:b,phoneNumber:g,tenantId:w,stsTokenManager:_e,createdAt:A,lastLoginAt:x});return $&&Array.isArray($)&&(Ce.providerData=$.map(Se=>Object.assign({},Se))),N&&(Ce._redirectEventId=N),Ce}static async _fromIdTokenResponse(e,n,r=!1){const s=new zn;s.updateFromServerResponse(n);const i=new Ut({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Dr(i),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=new Map;function Xe(t){tt(t instanceof Function,"Expected a class definition");let e=oa.get(t);return e?(tt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,oa.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ll.type="NONE";const aa=ll;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(t,e,n){return`firebase:${t}:${e}:${n}`}class cn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Er(this.userKey,s.apiKey,i),this.fullPersistenceKey=Er("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ut._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new cn(Xe(aa),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Xe(aa);const o=Er(r,e.config.apiKey,e.name);let a=null;for(const u of n)try{const l=await u._get(o);if(l){const f=Ut._fromJSON(e,l);u!==i&&(a=f),i=u;break}}catch{}const c=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new cn(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new cn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(dl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ul(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(pl(e))return"Blackberry";if(ml(e))return"Webos";if(Fi(e))return"Safari";if((e.includes("chrome/")||fl(e))&&!e.includes("edge/"))return"Chrome";if(hl(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ul(t=me()){return/firefox\//i.test(t)}function Fi(t=me()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function fl(t=me()){return/crios\//i.test(t)}function dl(t=me()){return/iemobile/i.test(t)}function hl(t=me()){return/android/i.test(t)}function pl(t=me()){return/blackberry/i.test(t)}function ml(t=me()){return/webos/i.test(t)}function rs(t=me()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Vm(t=me()){var e;return rs(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Wm(){return np()&&document.documentMode===10}function gl(t=me()){return rs(t)||hl(t)||ml(t)||pl(t)||/windows phone/i.test(t)||dl(t)}function zm(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(t,e=[]){let n;switch(t){case"Browser":n=ca(me());break;case"Worker":n=`${ca(me())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Qn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qm(t,e={}){return Tt(t,"GET","/v2/passwordPolicy",St(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm=6;class Jm{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Gm,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,a;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new la(this),this.idTokenSubscription=new la(this),this.beforeStateQueue=new Km(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=sl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Xe(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await cn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Dr(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Tm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?Vt(e):null;return n&&B(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Xe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await qm(this),n=new Jm(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Yn("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await jm(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Xe(e)||this._popupRedirectResolver;B(n,this,"argument-error"),this.redirectPersistenceManager=await cn.create(this,[Xe(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=_l(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Em(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Wt(t){return Vt(t)}class la{constructor(e){this.auth=e,this.observer=null,this.addObserver=lp(n=>this.observer=n)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Xm(t){ss=t}function yl(t){return ss.loadJS(t)}function Qm(){return ss.recaptchaEnterpriseScript}function Zm(){return ss.gapiScript}function eg(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const tg="recaptcha-enterprise",ng="NO_RECAPTCHA";class rg{constructor(e){this.type=tg,this.auth=Wt(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{km(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const u=new Om(c);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;ia(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(ng)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(a=>{if(!n&&ia(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Qm();c.length!==0&&(c+=a),yl(c).then(()=>{s(a,i,o)}).catch(u=>{o(u)})}}).catch(a=>{o(a)})})}}async function ua(t,e,n,r=!1){const s=new rg(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function ri(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await ua(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await ua(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sg(t,e){const n=Zc(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Nr(i,e??{}))return s;De(s,"already-initialized")}return n.initialize({options:e})}function ig(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Xe);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function og(t,e,n){const r=Wt(t);B(r._canInitEmulator,r,"emulator-config-failed"),B(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=bl(e),{host:o,port:a}=ag(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||cg()}function bl(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function ag(t){const e=bl(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:fa(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:fa(o)}}}function fa(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function cg(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ye("not implemented")}_getIdTokenResponse(e){return Ye("not implemented")}_linkToIdToken(e,n){return Ye("not implemented")}_getReauthenticationResolver(e){return Ye("not implemented")}}async function lg(t,e){return Tt(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ug(t,e){return er(t,"POST","/v1/accounts:signInWithPassword",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fg(t,e){return er(t,"POST","/v1/accounts:signInWithEmailLink",St(t,e))}async function dg(t,e){return er(t,"POST","/v1/accounts:signInWithEmailLink",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn extends Bi{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Kn(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Kn(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ri(e,n,"signInWithPassword",ug);case"emailLink":return fg(e,{email:this._email,oobCode:this._password});default:De(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ri(e,r,"signUpPassword",lg);case"emailLink":return dg(e,{idToken:n,email:this._email,oobCode:this._password});default:De(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ln(t,e){return er(t,"POST","/v1/accounts:signInWithIdp",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg="http://localhost";class Bt extends Bi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Bt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):De("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=xi(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Bt(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return ln(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,ln(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ln(e,n)}buildRequest(){const e={requestUri:hg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Xn(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pg(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function mg(t){const e=Rn(An(t)).link,n=e?Rn(An(e)).deep_link_id:null,r=Rn(An(t)).deep_link_id;return(r?Rn(An(r)).link:null)||r||n||e||t}class $i{constructor(e){var n,r,s,i,o,a;const c=Rn(An(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,l=(r=c.oobCode)!==null&&r!==void 0?r:null,f=pg((s=c.mode)!==null&&s!==void 0?s:null);B(u&&l&&f,"argument-error"),this.apiKey=u,this.operation=f,this.code=l,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=mg(e);try{return new $i(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(){this.providerId=yn.PROVIDER_ID}static credential(e,n){return Kn._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=$i.parseLink(n);return B(r,"argument-error"),Kn._fromEmailAndCode(e,r.code,r.tenantId)}}yn.PROVIDER_ID="password";yn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";yn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr extends vl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends tr{constructor(){super("facebook.com")}static credential(e){return Bt._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return pt.credential(e.oauthAccessToken)}catch{return null}}}pt.FACEBOOK_SIGN_IN_METHOD="facebook.com";pt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends tr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Bt._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return mt.credential(n,r)}catch{return null}}}mt.GOOGLE_SIGN_IN_METHOD="google.com";mt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt extends tr{constructor(){super("github.com")}static credential(e){return Bt._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gt.credential(e.oauthAccessToken)}catch{return null}}}gt.GITHUB_SIGN_IN_METHOD="github.com";gt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends tr{constructor(){super("twitter.com")}static credential(e,n){return Bt._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return _t.credential(n,r)}catch{return null}}}_t.TWITTER_SIGN_IN_METHOD="twitter.com";_t.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gg(t,e){return er(t,"POST","/v1/accounts:signUp",St(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Ut._fromIdTokenResponse(e,r,s),o=da(r);return new $t({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=da(r);return new $t({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function da(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr extends It{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Mr.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Mr(e,n,r,s)}}function El(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Mr._fromErrorAndOperation(t,i,e,r):i})}async function _g(t,e,n=!1){const r=await Wn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return $t._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yg(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await Wn(t,El(r,s,e,t),n);B(i.idToken,r,"internal-error");const o=Ui(i.idToken);B(o,r,"internal-error");const{sub:a}=o;return B(t.uid===a,r,"user-mismatch"),$t._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&De(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wl(t,e,n=!1){const r="signIn",s=await El(t,r,e),i=await $t._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function bg(t,e){return wl(Wt(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Il(t){const e=Wt(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function vg(t,e,n){const r=Wt(t),o=await ri(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",gg).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Il(t),c}),a=await $t._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function Eg(t,e,n){return bg(Vt(t),yn.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Il(t),r})}function wg(t,e,n,r){return Vt(t).onIdTokenChanged(e,n,r)}function Ig(t,e,n){return Vt(t).beforeAuthStateChanged(e,n)}const Ur="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ur,"1"),this.storage.removeItem(Ur),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sg(){const t=me();return Fi(t)||rs(t)}const Tg=1e3,Rg=10;class Tl extends Sl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Sg()&&zm(),this.fallbackToPolling=gl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Wm()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Rg):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Tg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Tl.type="LOCAL";const Ag=Tl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl extends Sl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Rl.type="SESSION";const Al=Rl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new is(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async u=>u(n.origin,i)),c=await Cg(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}is.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const u=Hi("",20);s.port1.start();const l=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const p=f;if(p.data.eventId===u)switch(p.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(p.data.response);break;default:clearTimeout(l),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(){return window}function Og(t){ze().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(){return typeof ze().WorkerGlobalScope<"u"&&typeof ze().importScripts=="function"}async function kg(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ng(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Lg(){return Cl()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl="firebaseLocalStorageDb",xg=1,Fr="firebaseLocalStorage",Ol="fbase_key";class nr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function os(t,e){return t.transaction([Fr],e?"readwrite":"readonly").objectStore(Fr)}function Dg(){const t=indexedDB.deleteDatabase(Pl);return new nr(t).toPromise()}function si(){const t=indexedDB.open(Pl,xg);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Fr,{keyPath:Ol})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Fr)?e(r):(r.close(),await Dg(),e(await si()))})})}async function ha(t,e,n){const r=os(t,!0).put({[Ol]:e,value:n});return new nr(r).toPromise()}async function Mg(t,e){const n=os(t,!1).get(e),r=await new nr(n).toPromise();return r===void 0?null:r.value}function pa(t,e){const n=os(t,!0).delete(e);return new nr(n).toPromise()}const Ug=800,Fg=3;class kl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await si(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Fg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=is._getInstance(Lg()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await kg(),!this.activeServiceWorker)return;this.sender=new Pg(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ng()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await si();return await ha(e,Ur,"1"),await pa(e,Ur),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>ha(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Mg(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>pa(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=os(s,!1).getAll();return new nr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ug)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}kl.type="LOCAL";const Bg=kl;new Zn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(t,e){return e?Xe(e):(B(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji extends Bi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ln(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ln(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ln(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Hg(t){return wl(t.auth,new ji(t),t.bypassAuthState)}function jg(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),yg(n,new ji(t),t.bypassAuthState)}async function Vg(t){const{auth:e,user:n}=t;return B(n,e,"internal-error"),_g(n,new ji(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nl{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Hg;case"linkViaPopup":case"linkViaRedirect":return Vg;case"reauthViaPopup":case"reauthViaRedirect":return jg;default:De(this.auth,"internal-error")}}resolve(e){tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg=new Zn(2e3,1e4);class Qt extends Nl{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Qt.currentPopupAction&&Qt.currentPopupAction.cancel(),Qt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){tt(this.filter.length===1,"Popup operations only handle one event");const e=Hi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(We(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(We(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(We(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Wg.get())};e()}}Qt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg="pendingRedirect",wr=new Map;class Kg extends Nl{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=wr.get(this.auth._key());if(!e){try{const r=await qg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}wr.set(this.auth._key(),e)}return this.bypassAuthState||wr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function qg(t,e){const n=Yg(e),r=Jg(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Gg(t,e){wr.set(t._key(),e)}function Jg(t){return Xe(t._redirectPersistence)}function Yg(t){return Er(zg,t.config.apiKey,t.name)}async function Xg(t,e,n=!1){const r=Wt(t),s=$g(r,e),o=await new Kg(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qg=10*60*1e3;class Zg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!e_(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Ll(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(We(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Qg&&this.cachedEventUids.clear(),this.cachedEventUids.has(ma(e))}saveEventToCache(e){this.cachedEventUids.add(ma(e)),this.lastProcessedEventTime=Date.now()}}function ma(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Ll({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function e_(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ll(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t_(t,e={}){return Tt(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,r_=/^https?/;async function s_(t){if(t.config.emulator)return;const{authorizedDomains:e}=await t_(t);for(const n of e)try{if(i_(n))return}catch{}De(t,"unauthorized-domain")}function i_(t){const e=ni(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!r_.test(n))return!1;if(n_.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_=new Zn(3e4,6e4);function ga(){const t=ze().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function a_(t){return new Promise((e,n)=>{var r,s,i;function o(){ga(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ga(),n(We(t,"network-request-failed"))},timeout:o_.get()})}if(!((s=(r=ze().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=ze().gapi)===null||i===void 0)&&i.load)o();else{const a=eg("iframefcb");return ze()[a]=()=>{gapi.load?o():n(We(t,"network-request-failed"))},yl(`${Zm()}?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Ir=null,e})}let Ir=null;function c_(t){return Ir=Ir||a_(t),Ir}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_=new Zn(5e3,15e3),u_="__/auth/iframe",f_="emulator/auth/iframe",d_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},h_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function p_(t){const e=t.config;B(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Mi(e,f_):`https://${t.config.authDomain}/${u_}`,r={apiKey:e.apiKey,appName:t.name,v:Qn},s=h_.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Xn(r).slice(1)}`}async function m_(t){const e=await c_(t),n=ze().gapi;return B(n,t,"internal-error"),e.open({where:document.body,url:p_(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:d_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=We(t,"network-request-failed"),a=ze().setTimeout(()=>{i(o)},l_.get());function c(){ze().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},__=500,y_=600,b_="_blank",v_="http://localhost";class _a{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function E_(t,e,n,r=__,s=y_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},g_),{width:r.toString(),height:s.toString(),top:i,left:o}),u=me().toLowerCase();n&&(a=fl(u)?b_:n),ul(u)&&(e=e||v_,c.scrollbars="yes");const l=Object.entries(c).reduce((p,[g,b])=>`${p}${g}=${b},`,"");if(Vm(u)&&a!=="_self")return w_(e||"",a),new _a(null);const f=window.open(e||"",a,l);B(f,t,"popup-blocked");try{f.focus()}catch{}return new _a(f)}function w_(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_="__/auth/handler",S_="emulator/auth/handler",T_=encodeURIComponent("fac");async function ya(t,e,n,r,s,i){B(t.config.authDomain,t,"auth-domain-config-required"),B(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Qn,eventId:s};if(e instanceof vl){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",cp(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[l,f]of Object.entries(i||{}))o[l]=f}if(e instanceof tr){const l=e.getScopes().filter(f=>f!=="");l.length>0&&(o.scopes=l.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const l of Object.keys(a))a[l]===void 0&&delete a[l];const c=await t._getAppCheckToken(),u=c?`#${T_}=${encodeURIComponent(c)}`:"";return`${R_(t)}?${Xn(a).slice(1)}${u}`}function R_({config:t}){return t.emulator?Mi(t,S_):`https://${t.authDomain}/${I_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os="webStorageSupport";class A_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Al,this._completeRedirectFn=Xg,this._overrideRedirectResult=Gg}async _openPopup(e,n,r,s){var i;tt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await ya(e,n,r,ni(),s);return E_(e,o,Hi())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await ya(e,n,r,ni(),s);return Og(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(tt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await m_(e),r=new Zg(e);return n.register("authEvent",s=>(B(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Os,{type:Os},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Os];o!==void 0&&n(!!o),De(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=s_(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return gl()||Fi()||rs()}}const C_=A_;var ba="@firebase/auth",va="1.6.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O_(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function k_(t){jn(new pn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;B(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_l(t)},u=new Ym(r,s,i,c);return ig(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),jn(new pn("auth-internal",e=>{const n=Wt(e.getProvider("auth").getImmediate());return(r=>new P_(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),an(ba,va,O_(t)),an(ba,va,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_=5*60,L_=Jc("authIdTokenMaxAge")||N_;let Ea=null;const x_=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>L_)return;const s=n==null?void 0:n.token;Ea!==s&&(Ea=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function D_(t=cm()){const e=Zc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=sg(t,{popupRedirectResolver:C_,persistence:[Bg,Ag,Al]}),r=Jc("authTokenSyncURL");if(r){const i=x_(r);Ig(n,i,()=>i(n.currentUser)),wg(n,o=>i(o))}const s=Xh("auth");return s&&og(n,`http://${s}`),n}function M_(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Xm({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=We("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",M_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});k_("Browser");const U_={apiKey:"AIzaSyCZ-HBufDf5JrElikOjjVwcVxeyLRd6BzU",authDomain:"pantrypal-e1225.firebaseapp.com",projectId:"pantrypal-e1225",storageBucket:"pantrypal-e1225.appspot.com",messagingSenderId:"694619781401",appId:"1:694619781401:web:ec0a8b6ad6950a1a222d88",measurementId:"G-SW04Z59K30"},F_=el(U_),xl=D_(F_),B_={name:"SignUp",data(){return{user:{email:"",username:"",password:"",confirmPassword:""},error:""}},methods:{register(){if(this.user.password!==this.user.confirmPassword){this.error="Passwords do not match.";return}vg(xl,this.user.email,this.user.password).then(t=>{console.log("User created:",t.user),alert("User created:",t.user)}).catch(t=>{this.error=t.message,console.error("Registration error:",t)})}}},rt=t=>(Jr("data-v-3388deda"),t=t(),Yr(),t),$_={class:"signup-container"},H_=rt(()=>D("div",{class:"signup-image-container"},null,-1)),j_={class:"signup-form-container"},V_=rt(()=>D("img",{src:Oi,alt:"PantryPal Logo",class:"logo"},null,-1)),W_=rt(()=>D("h1",null,"Create New Account",-1)),z_={class:"input-group"},K_=rt(()=>D("label",{for:"email"},"EMAIL",-1)),q_={class:"input-group"},G_=rt(()=>D("label",{for:"username"},"USERNAME",-1)),J_={class:"input-group"},Y_=rt(()=>D("label",{for:"password"},"PASSWORD",-1)),X_={class:"input-group"},Q_=rt(()=>D("label",{for:"confirm-password"},"CONFIRM PASSWORD",-1)),Z_=rt(()=>D("div",{class:"login-link"},[Ri(" Already Registered? "),D("a",{href:"/login"},"Login")],-1)),ey=rt(()=>D("button",{type:"submit",class:"btn-signup"},"Sign Up",-1));function ty(t,e,n,r,s,i){return Mt(),on("div",$_,[H_,D("div",j_,[V_,W_,D("form",{class:"signup-form",onSubmit:e[4]||(e[4]=Nc((...o)=>i.register&&i.register(...o),["prevent"]))},[D("div",z_,[K_,Nt(D("input",{type:"email",id:"email","onUpdate:modelValue":e[0]||(e[0]=o=>s.user.email=o),required:""},null,512),[[Lt,s.user.email]])]),D("div",q_,[G_,Nt(D("input",{type:"text",id:"username","onUpdate:modelValue":e[1]||(e[1]=o=>s.user.username=o),required:""},null,512),[[Lt,s.user.username]])]),D("div",J_,[Y_,Nt(D("input",{type:"password",id:"password","onUpdate:modelValue":e[2]||(e[2]=o=>s.user.password=o),required:""},null,512),[[Lt,s.user.password]])]),D("div",X_,[Q_,Nt(D("input",{type:"password",id:"confirm-password","onUpdate:modelValue":e[3]||(e[3]=o=>s.user.confirmPassword=o),required:""},null,512),[[Lt,s.user.confirmPassword]])]),Z_,ey],32)])])}const ny=Jn(B_,[["render",ty],["__scopeId","data-v-3388deda"]]),ry={name:"Login",data(){return{user:{email:"",password:""},error:""}},methods:{login(){Eg(xl,this.user.email,this.user.password).then(t=>{console.log("User logged in:",t.user)}).catch(t=>{this.error=t.message,console.error("Login error:",t)})}}},zt=t=>(Jr("data-v-211f3e54"),t=t(),Yr(),t),sy={class:"login-container"},iy={class:"login-form-container"},oy=zt(()=>D("img",{src:Oi,alt:"PantryPal Logo",class:"logo"},null,-1)),ay=zt(()=>D("h1",null,"Welcome Back",-1)),cy={class:"input-group"},ly=zt(()=>D("label",{for:"email"},"EMAIL",-1)),uy={class:"input-group"},fy=zt(()=>D("label",{for:"password"},"PASSWORD",-1)),dy=zt(()=>D("div",{class:"register-link"},[Ri(" New Here? "),D("a",{href:"/register"},"Register")],-1)),hy=zt(()=>D("button",{type:"submit",class:"btn-login"},"log in",-1)),py=zt(()=>D("div",{class:"login-image-container"},null,-1));function my(t,e,n,r,s,i){return Mt(),on("div",sy,[D("div",iy,[oy,ay,D("form",{class:"login-form",onSubmit:e[2]||(e[2]=Nc((...o)=>i.login&&i.login(...o),["prevent"]))},[D("div",cy,[ly,Nt(D("input",{type:"email",id:"email","onUpdate:modelValue":e[0]||(e[0]=o=>s.user.email=o),required:""},null,512),[[Lt,s.user.email]])]),D("div",uy,[fy,Nt(D("input",{type:"password",id:"password","onUpdate:modelValue":e[1]||(e[1]=o=>s.user.password=o),required:""},null,512),[[Lt,s.user.password]])]),dy,hy],32)]),py])}const gy=Jn(ry,[["render",my],["__scopeId","data-v-211f3e54"]]);function Dl(t,e){return function(){return t.apply(e,arguments)}}const{toString:_y}=Object.prototype,{getPrototypeOf:Vi}=Object,as=(t=>e=>{const n=_y.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),qe=t=>(t=t.toLowerCase(),e=>as(e)===t),cs=t=>e=>typeof e===t,{isArray:bn}=Array,qn=cs("undefined");function yy(t){return t!==null&&!qn(t)&&t.constructor!==null&&!qn(t.constructor)&&Ae(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Ml=qe("ArrayBuffer");function by(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Ml(t.buffer),e}const vy=cs("string"),Ae=cs("function"),Ul=cs("number"),ls=t=>t!==null&&typeof t=="object",Ey=t=>t===!0||t===!1,Sr=t=>{if(as(t)!=="object")return!1;const e=Vi(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},wy=qe("Date"),Iy=qe("File"),Sy=qe("Blob"),Ty=qe("FileList"),Ry=t=>ls(t)&&Ae(t.pipe),Ay=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||Ae(t.append)&&((e=as(t))==="formdata"||e==="object"&&Ae(t.toString)&&t.toString()==="[object FormData]"))},Cy=qe("URLSearchParams"),Py=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function rr(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let r,s;if(typeof t!="object"&&(t=[t]),bn(t))for(r=0,s=t.length;r<s;r++)e.call(null,t[r],r,t);else{const i=n?Object.getOwnPropertyNames(t):Object.keys(t),o=i.length;let a;for(r=0;r<o;r++)a=i[r],e.call(null,t[a],a,t)}}function Fl(t,e){e=e.toLowerCase();const n=Object.keys(t);let r=n.length,s;for(;r-- >0;)if(s=n[r],e===s.toLowerCase())return s;return null}const Bl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,$l=t=>!qn(t)&&t!==Bl;function ii(){const{caseless:t}=$l(this)&&this||{},e={},n=(r,s)=>{const i=t&&Fl(e,s)||s;Sr(e[i])&&Sr(r)?e[i]=ii(e[i],r):Sr(r)?e[i]=ii({},r):bn(r)?e[i]=r.slice():e[i]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&rr(arguments[r],n);return e}const Oy=(t,e,n,{allOwnKeys:r}={})=>(rr(e,(s,i)=>{n&&Ae(s)?t[i]=Dl(s,n):t[i]=s},{allOwnKeys:r}),t),ky=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Ny=(t,e,n,r)=>{t.prototype=Object.create(e.prototype,r),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},Ly=(t,e,n,r)=>{let s,i,o;const a={};if(e=e||{},t==null)return e;do{for(s=Object.getOwnPropertyNames(t),i=s.length;i-- >0;)o=s[i],(!r||r(o,t,e))&&!a[o]&&(e[o]=t[o],a[o]=!0);t=n!==!1&&Vi(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},xy=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const r=t.indexOf(e,n);return r!==-1&&r===n},Dy=t=>{if(!t)return null;if(bn(t))return t;let e=t.length;if(!Ul(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},My=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Vi(Uint8Array)),Uy=(t,e)=>{const r=(t&&t[Symbol.iterator]).call(t);let s;for(;(s=r.next())&&!s.done;){const i=s.value;e.call(t,i[0],i[1])}},Fy=(t,e)=>{let n;const r=[];for(;(n=t.exec(e))!==null;)r.push(n);return r},By=qe("HTMLFormElement"),$y=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),wa=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),Hy=qe("RegExp"),Hl=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),r={};rr(n,(s,i)=>{let o;(o=e(s,i,t))!==!1&&(r[i]=o||s)}),Object.defineProperties(t,r)},jy=t=>{Hl(t,(e,n)=>{if(Ae(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=t[n];if(Ae(r)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Vy=(t,e)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return bn(t)?r(t):r(String(t).split(e)),n},Wy=()=>{},zy=(t,e)=>(t=+t,Number.isFinite(t)?t:e),ks="abcdefghijklmnopqrstuvwxyz",Ia="0123456789",jl={DIGIT:Ia,ALPHA:ks,ALPHA_DIGIT:ks+ks.toUpperCase()+Ia},Ky=(t=16,e=jl.ALPHA_DIGIT)=>{let n="";const{length:r}=e;for(;t--;)n+=e[Math.random()*r|0];return n};function qy(t){return!!(t&&Ae(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator])}const Gy=t=>{const e=new Array(10),n=(r,s)=>{if(ls(r)){if(e.indexOf(r)>=0)return;if(!("toJSON"in r)){e[s]=r;const i=bn(r)?[]:{};return rr(r,(o,a)=>{const c=n(o,s+1);!qn(c)&&(i[a]=c)}),e[s]=void 0,i}}return r};return n(t,0)},Jy=qe("AsyncFunction"),Yy=t=>t&&(ls(t)||Ae(t))&&Ae(t.then)&&Ae(t.catch),y={isArray:bn,isArrayBuffer:Ml,isBuffer:yy,isFormData:Ay,isArrayBufferView:by,isString:vy,isNumber:Ul,isBoolean:Ey,isObject:ls,isPlainObject:Sr,isUndefined:qn,isDate:wy,isFile:Iy,isBlob:Sy,isRegExp:Hy,isFunction:Ae,isStream:Ry,isURLSearchParams:Cy,isTypedArray:My,isFileList:Ty,forEach:rr,merge:ii,extend:Oy,trim:Py,stripBOM:ky,inherits:Ny,toFlatObject:Ly,kindOf:as,kindOfTest:qe,endsWith:xy,toArray:Dy,forEachEntry:Uy,matchAll:Fy,isHTMLForm:By,hasOwnProperty:wa,hasOwnProp:wa,reduceDescriptors:Hl,freezeMethods:jy,toObjectSet:Vy,toCamelCase:$y,noop:Wy,toFiniteNumber:zy,findKey:Fl,global:Bl,isContextDefined:$l,ALPHABET:jl,generateString:Ky,isSpecCompliantForm:qy,toJSONObject:Gy,isAsyncFn:Jy,isThenable:Yy};function K(t,e,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}y.inherits(K,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:y.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Vl=K.prototype,Wl={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Wl[t]={value:t}});Object.defineProperties(K,Wl);Object.defineProperty(Vl,"isAxiosError",{value:!0});K.from=(t,e,n,r,s,i)=>{const o=Object.create(Vl);return y.toFlatObject(t,o,function(c){return c!==Error.prototype},a=>a!=="isAxiosError"),K.call(o,t.message,e,n,r,s),o.cause=t,o.name=t.name,i&&Object.assign(o,i),o};const Xy=null;function oi(t){return y.isPlainObject(t)||y.isArray(t)}function zl(t){return y.endsWith(t,"[]")?t.slice(0,-2):t}function Sa(t,e,n){return t?t.concat(e).map(function(s,i){return s=zl(s),!n&&i?"["+s+"]":s}).join(n?".":""):e}function Qy(t){return y.isArray(t)&&!t.some(oi)}const Zy=y.toFlatObject(y,{},null,function(e){return/^is[A-Z]/.test(e)});function us(t,e,n){if(!y.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=y.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(w,N){return!y.isUndefined(N[w])});const r=n.metaTokens,s=n.visitor||l,i=n.dots,o=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&y.isSpecCompliantForm(e);if(!y.isFunction(s))throw new TypeError("visitor must be a function");function u(b){if(b===null)return"";if(y.isDate(b))return b.toISOString();if(!c&&y.isBlob(b))throw new K("Blob is not supported. Use a Buffer instead.");return y.isArrayBuffer(b)||y.isTypedArray(b)?c&&typeof Blob=="function"?new Blob([b]):Buffer.from(b):b}function l(b,w,N){let A=b;if(b&&!N&&typeof b=="object"){if(y.endsWith(w,"{}"))w=r?w:w.slice(0,-2),b=JSON.stringify(b);else if(y.isArray(b)&&Qy(b)||(y.isFileList(b)||y.endsWith(w,"[]"))&&(A=y.toArray(b)))return w=zl(w),A.forEach(function(M,z){!(y.isUndefined(M)||M===null)&&e.append(o===!0?Sa([w],z,i):o===null?w:w+"[]",u(M))}),!1}return oi(b)?!0:(e.append(Sa(N,w,i),u(b)),!1)}const f=[],p=Object.assign(Zy,{defaultVisitor:l,convertValue:u,isVisitable:oi});function g(b,w){if(!y.isUndefined(b)){if(f.indexOf(b)!==-1)throw Error("Circular reference detected in "+w.join("."));f.push(b),y.forEach(b,function(A,x){(!(y.isUndefined(A)||A===null)&&s.call(e,A,y.isString(x)?x.trim():x,w,p))===!0&&g(A,w?w.concat(x):[x])}),f.pop()}}if(!y.isObject(t))throw new TypeError("data must be an object");return g(t),e}function Ta(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(r){return e[r]})}function Wi(t,e){this._pairs=[],t&&us(t,this,e)}const Kl=Wi.prototype;Kl.append=function(e,n){this._pairs.push([e,n])};Kl.toString=function(e){const n=e?function(r){return e.call(this,r,Ta)}:Ta;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function eb(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ql(t,e,n){if(!e)return t;const r=n&&n.encode||eb,s=n&&n.serialize;let i;if(s?i=s(e,n):i=y.isURLSearchParams(e)?e.toString():new Wi(e,n).toString(r),i){const o=t.indexOf("#");o!==-1&&(t=t.slice(0,o)),t+=(t.indexOf("?")===-1?"?":"&")+i}return t}class Ra{constructor(){this.handlers=[]}use(e,n,r){return this.handlers.push({fulfilled:e,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){y.forEach(this.handlers,function(r){r!==null&&e(r)})}}const Gl={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},tb=typeof URLSearchParams<"u"?URLSearchParams:Wi,nb=typeof FormData<"u"?FormData:null,rb=typeof Blob<"u"?Blob:null,sb={isBrowser:!0,classes:{URLSearchParams:tb,FormData:nb,Blob:rb},protocols:["http","https","file","blob","url","data"]},Jl=typeof window<"u"&&typeof document<"u",ib=(t=>Jl&&["ReactNative","NativeScript","NS"].indexOf(t)<0)(typeof navigator<"u"&&navigator.product),ob=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",ab=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Jl,hasStandardBrowserEnv:ib,hasStandardBrowserWebWorkerEnv:ob},Symbol.toStringTag,{value:"Module"})),Ve={...ab,...sb};function cb(t,e){return us(t,new Ve.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,i){return Ve.isNode&&y.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},e))}function lb(t){return y.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function ub(t){const e={},n=Object.keys(t);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],e[i]=t[i];return e}function Yl(t){function e(n,r,s,i){let o=n[i++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),c=i>=n.length;return o=!o&&y.isArray(s)?s.length:o,c?(y.hasOwnProp(s,o)?s[o]=[s[o],r]:s[o]=r,!a):((!s[o]||!y.isObject(s[o]))&&(s[o]=[]),e(n,r,s[o],i)&&y.isArray(s[o])&&(s[o]=ub(s[o])),!a)}if(y.isFormData(t)&&y.isFunction(t.entries)){const n={};return y.forEachEntry(t,(r,s)=>{e(lb(r),s,n,0)}),n}return null}function fb(t,e,n){if(y.isString(t))try{return(e||JSON.parse)(t),y.trim(t)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(t)}const zi={transitional:Gl,adapter:["xhr","http"],transformRequest:[function(e,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=y.isObject(e);if(i&&y.isHTMLForm(e)&&(e=new FormData(e)),y.isFormData(e))return s?JSON.stringify(Yl(e)):e;if(y.isArrayBuffer(e)||y.isBuffer(e)||y.isStream(e)||y.isFile(e)||y.isBlob(e))return e;if(y.isArrayBufferView(e))return e.buffer;if(y.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return cb(e,this.formSerializer).toString();if((a=y.isFileList(e))||r.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return us(a?{"files[]":e}:e,c&&new c,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),fb(e)):e}],transformResponse:[function(e){const n=this.transitional||zi.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(e&&y.isString(e)&&(r&&!this.responseType||s)){const o=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(e)}catch(a){if(o)throw a.name==="SyntaxError"?K.from(a,K.ERR_BAD_RESPONSE,this,null,this.response):a}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ve.classes.FormData,Blob:Ve.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};y.forEach(["delete","get","head","post","put","patch"],t=>{zi.headers[t]={}});const Ki=zi,db=y.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),hb=t=>{const e={};let n,r,s;return t&&t.split(`
`).forEach(function(o){s=o.indexOf(":"),n=o.substring(0,s).trim().toLowerCase(),r=o.substring(s+1).trim(),!(!n||e[n]&&db[n])&&(n==="set-cookie"?e[n]?e[n].push(r):e[n]=[r]:e[n]=e[n]?e[n]+", "+r:r)}),e},Aa=Symbol("internals");function Sn(t){return t&&String(t).trim().toLowerCase()}function Tr(t){return t===!1||t==null?t:y.isArray(t)?t.map(Tr):String(t)}function pb(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(t);)e[r[1]]=r[2];return e}const mb=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Ns(t,e,n,r,s){if(y.isFunction(r))return r.call(this,e,n);if(s&&(e=n),!!y.isString(e)){if(y.isString(r))return e.indexOf(r)!==-1;if(y.isRegExp(r))return r.test(e)}}function gb(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,r)=>n.toUpperCase()+r)}function _b(t,e){const n=y.toCamelCase(" "+e);["get","set","has"].forEach(r=>{Object.defineProperty(t,r+n,{value:function(s,i,o){return this[r].call(this,e,s,i,o)},configurable:!0})})}class fs{constructor(e){e&&this.set(e)}set(e,n,r){const s=this;function i(a,c,u){const l=Sn(c);if(!l)throw new Error("header name must be a non-empty string");const f=y.findKey(s,l);(!f||s[f]===void 0||u===!0||u===void 0&&s[f]!==!1)&&(s[f||c]=Tr(a))}const o=(a,c)=>y.forEach(a,(u,l)=>i(u,l,c));return y.isPlainObject(e)||e instanceof this.constructor?o(e,n):y.isString(e)&&(e=e.trim())&&!mb(e)?o(hb(e),n):e!=null&&i(n,e,r),this}get(e,n){if(e=Sn(e),e){const r=y.findKey(this,e);if(r){const s=this[r];if(!n)return s;if(n===!0)return pb(s);if(y.isFunction(n))return n.call(this,s,r);if(y.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Sn(e),e){const r=y.findKey(this,e);return!!(r&&this[r]!==void 0&&(!n||Ns(this,this[r],r,n)))}return!1}delete(e,n){const r=this;let s=!1;function i(o){if(o=Sn(o),o){const a=y.findKey(r,o);a&&(!n||Ns(r,r[a],a,n))&&(delete r[a],s=!0)}}return y.isArray(e)?e.forEach(i):i(e),s}clear(e){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!e||Ns(this,this[i],i,e,!0))&&(delete this[i],s=!0)}return s}normalize(e){const n=this,r={};return y.forEach(this,(s,i)=>{const o=y.findKey(r,i);if(o){n[o]=Tr(s),delete n[i];return}const a=e?gb(i):String(i).trim();a!==i&&delete n[i],n[a]=Tr(s),r[a]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return y.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=e&&y.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const r=new this(e);return n.forEach(s=>r.set(s)),r}static accessor(e){const r=(this[Aa]=this[Aa]={accessors:{}}).accessors,s=this.prototype;function i(o){const a=Sn(o);r[a]||(_b(s,o),r[a]=!0)}return y.isArray(e)?e.forEach(i):i(e),this}}fs.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);y.reduceDescriptors(fs.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(r){this[n]=r}}});y.freezeMethods(fs);const et=fs;function Ls(t,e){const n=this||Ki,r=e||n,s=et.from(r.headers);let i=r.data;return y.forEach(t,function(a){i=a.call(n,i,s.normalize(),e?e.status:void 0)}),s.normalize(),i}function Xl(t){return!!(t&&t.__CANCEL__)}function sr(t,e,n){K.call(this,t??"canceled",K.ERR_CANCELED,e,n),this.name="CanceledError"}y.inherits(sr,K,{__CANCEL__:!0});function yb(t,e,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?t(n):e(new K("Request failed with status code "+n.status,[K.ERR_BAD_REQUEST,K.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const bb=Ve.hasStandardBrowserEnv?{write(t,e,n,r,s,i){const o=[t+"="+encodeURIComponent(e)];y.isNumber(n)&&o.push("expires="+new Date(n).toGMTString()),y.isString(r)&&o.push("path="+r),y.isString(s)&&o.push("domain="+s),i===!0&&o.push("secure"),document.cookie=o.join("; ")},read(t){const e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(t){this.write(t,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function vb(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Eb(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}function Ql(t,e){return t&&!vb(e)?Eb(t,e):e}const wb=Ve.hasStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function s(i){let o=i;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(o){const a=y.isString(o)?s(o):o;return a.protocol===r.protocol&&a.host===r.host}}():function(){return function(){return!0}}();function Ib(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function Sb(t,e){t=t||10;const n=new Array(t),r=new Array(t);let s=0,i=0,o;return e=e!==void 0?e:1e3,function(c){const u=Date.now(),l=r[i];o||(o=u),n[s]=c,r[s]=u;let f=i,p=0;for(;f!==s;)p+=n[f++],f=f%t;if(s=(s+1)%t,s===i&&(i=(i+1)%t),u-o<e)return;const g=l&&u-l;return g?Math.round(p*1e3/g):void 0}}function Ca(t,e){let n=0;const r=Sb(50,250);return s=>{const i=s.loaded,o=s.lengthComputable?s.total:void 0,a=i-n,c=r(a),u=i<=o;n=i;const l={loaded:i,total:o,progress:o?i/o:void 0,bytes:a,rate:c||void 0,estimated:c&&o&&u?(o-i)/c:void 0,event:s};l[e?"download":"upload"]=!0,t(l)}}const Tb=typeof XMLHttpRequest<"u",Rb=Tb&&function(t){return new Promise(function(n,r){let s=t.data;const i=et.from(t.headers).normalize();let{responseType:o,withXSRFToken:a}=t,c;function u(){t.cancelToken&&t.cancelToken.unsubscribe(c),t.signal&&t.signal.removeEventListener("abort",c)}let l;if(y.isFormData(s)){if(Ve.hasStandardBrowserEnv||Ve.hasStandardBrowserWebWorkerEnv)i.setContentType(!1);else if((l=i.getContentType())!==!1){const[w,...N]=l?l.split(";").map(A=>A.trim()).filter(Boolean):[];i.setContentType([w||"multipart/form-data",...N].join("; "))}}let f=new XMLHttpRequest;if(t.auth){const w=t.auth.username||"",N=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";i.set("Authorization","Basic "+btoa(w+":"+N))}const p=Ql(t.baseURL,t.url);f.open(t.method.toUpperCase(),ql(p,t.params,t.paramsSerializer),!0),f.timeout=t.timeout;function g(){if(!f)return;const w=et.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),A={data:!o||o==="text"||o==="json"?f.responseText:f.response,status:f.status,statusText:f.statusText,headers:w,config:t,request:f};yb(function(M){n(M),u()},function(M){r(M),u()},A),f=null}if("onloadend"in f?f.onloadend=g:f.onreadystatechange=function(){!f||f.readyState!==4||f.status===0&&!(f.responseURL&&f.responseURL.indexOf("file:")===0)||setTimeout(g)},f.onabort=function(){f&&(r(new K("Request aborted",K.ECONNABORTED,t,f)),f=null)},f.onerror=function(){r(new K("Network Error",K.ERR_NETWORK,t,f)),f=null},f.ontimeout=function(){let N=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded";const A=t.transitional||Gl;t.timeoutErrorMessage&&(N=t.timeoutErrorMessage),r(new K(N,A.clarifyTimeoutError?K.ETIMEDOUT:K.ECONNABORTED,t,f)),f=null},Ve.hasStandardBrowserEnv&&(a&&y.isFunction(a)&&(a=a(t)),a||a!==!1&&wb(p))){const w=t.xsrfHeaderName&&t.xsrfCookieName&&bb.read(t.xsrfCookieName);w&&i.set(t.xsrfHeaderName,w)}s===void 0&&i.setContentType(null),"setRequestHeader"in f&&y.forEach(i.toJSON(),function(N,A){f.setRequestHeader(A,N)}),y.isUndefined(t.withCredentials)||(f.withCredentials=!!t.withCredentials),o&&o!=="json"&&(f.responseType=t.responseType),typeof t.onDownloadProgress=="function"&&f.addEventListener("progress",Ca(t.onDownloadProgress,!0)),typeof t.onUploadProgress=="function"&&f.upload&&f.upload.addEventListener("progress",Ca(t.onUploadProgress)),(t.cancelToken||t.signal)&&(c=w=>{f&&(r(!w||w.type?new sr(null,t,f):w),f.abort(),f=null)},t.cancelToken&&t.cancelToken.subscribe(c),t.signal&&(t.signal.aborted?c():t.signal.addEventListener("abort",c)));const b=Ib(p);if(b&&Ve.protocols.indexOf(b)===-1){r(new K("Unsupported protocol "+b+":",K.ERR_BAD_REQUEST,t));return}f.send(s||null)})},ai={http:Xy,xhr:Rb};y.forEach(ai,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const Pa=t=>`- ${t}`,Ab=t=>y.isFunction(t)||t===null||t===!1,Zl={getAdapter:t=>{t=y.isArray(t)?t:[t];const{length:e}=t;let n,r;const s={};for(let i=0;i<e;i++){n=t[i];let o;if(r=n,!Ab(n)&&(r=ai[(o=String(n)).toLowerCase()],r===void 0))throw new K(`Unknown adapter '${o}'`);if(r)break;s[o||"#"+i]=r}if(!r){const i=Object.entries(s).map(([a,c])=>`adapter ${a} `+(c===!1?"is not supported by the environment":"is not available in the build"));let o=e?i.length>1?`since :
`+i.map(Pa).join(`
`):" "+Pa(i[0]):"as no adapter specified";throw new K("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return r},adapters:ai};function xs(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new sr(null,t)}function Oa(t){return xs(t),t.headers=et.from(t.headers),t.data=Ls.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Zl.getAdapter(t.adapter||Ki.adapter)(t).then(function(r){return xs(t),r.data=Ls.call(t,t.transformResponse,r),r.headers=et.from(r.headers),r},function(r){return Xl(r)||(xs(t),r&&r.response&&(r.response.data=Ls.call(t,t.transformResponse,r.response),r.response.headers=et.from(r.response.headers))),Promise.reject(r)})}const ka=t=>t instanceof et?{...t}:t;function mn(t,e){e=e||{};const n={};function r(u,l,f){return y.isPlainObject(u)&&y.isPlainObject(l)?y.merge.call({caseless:f},u,l):y.isPlainObject(l)?y.merge({},l):y.isArray(l)?l.slice():l}function s(u,l,f){if(y.isUndefined(l)){if(!y.isUndefined(u))return r(void 0,u,f)}else return r(u,l,f)}function i(u,l){if(!y.isUndefined(l))return r(void 0,l)}function o(u,l){if(y.isUndefined(l)){if(!y.isUndefined(u))return r(void 0,u)}else return r(void 0,l)}function a(u,l,f){if(f in e)return r(u,l);if(f in t)return r(void 0,u)}const c={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(u,l)=>s(ka(u),ka(l),!0)};return y.forEach(Object.keys(Object.assign({},t,e)),function(l){const f=c[l]||s,p=f(t[l],e[l],l);y.isUndefined(p)&&f!==a||(n[l]=p)}),n}const eu="1.6.8",qi={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{qi[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}});const Na={};qi.transitional=function(e,n,r){function s(i,o){return"[Axios v"+eu+"] Transitional option '"+i+"'"+o+(r?". "+r:"")}return(i,o,a)=>{if(e===!1)throw new K(s(o," has been removed"+(n?" in "+n:"")),K.ERR_DEPRECATED);return n&&!Na[o]&&(Na[o]=!0,console.warn(s(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(i,o,a):!0}};function Cb(t,e,n){if(typeof t!="object")throw new K("options must be an object",K.ERR_BAD_OPTION_VALUE);const r=Object.keys(t);let s=r.length;for(;s-- >0;){const i=r[s],o=e[i];if(o){const a=t[i],c=a===void 0||o(a,i,t);if(c!==!0)throw new K("option "+i+" must be "+c,K.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new K("Unknown option "+i,K.ERR_BAD_OPTION)}}const ci={assertOptions:Cb,validators:qi},lt=ci.validators;class Br{constructor(e){this.defaults=e,this.interceptors={request:new Ra,response:new Ra}}async request(e,n){try{return await this._request(e,n)}catch(r){if(r instanceof Error){let s;Error.captureStackTrace?Error.captureStackTrace(s={}):s=new Error;const i=s.stack?s.stack.replace(/^.+\n/,""):"";r.stack?i&&!String(r.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+i):r.stack=i}throw r}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=mn(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&ci.assertOptions(r,{silentJSONParsing:lt.transitional(lt.boolean),forcedJSONParsing:lt.transitional(lt.boolean),clarifyTimeoutError:lt.transitional(lt.boolean)},!1),s!=null&&(y.isFunction(s)?n.paramsSerializer={serialize:s}:ci.assertOptions(s,{encode:lt.function,serialize:lt.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&y.merge(i.common,i[n.method]);i&&y.forEach(["delete","get","head","post","put","patch","common"],b=>{delete i[b]}),n.headers=et.concat(o,i);const a=[];let c=!0;this.interceptors.request.forEach(function(w){typeof w.runWhen=="function"&&w.runWhen(n)===!1||(c=c&&w.synchronous,a.unshift(w.fulfilled,w.rejected))});const u=[];this.interceptors.response.forEach(function(w){u.push(w.fulfilled,w.rejected)});let l,f=0,p;if(!c){const b=[Oa.bind(this),void 0];for(b.unshift.apply(b,a),b.push.apply(b,u),p=b.length,l=Promise.resolve(n);f<p;)l=l.then(b[f++],b[f++]);return l}p=a.length;let g=n;for(f=0;f<p;){const b=a[f++],w=a[f++];try{g=b(g)}catch(N){w.call(this,N);break}}try{l=Oa.call(this,g)}catch(b){return Promise.reject(b)}for(f=0,p=u.length;f<p;)l=l.then(u[f++],u[f++]);return l}getUri(e){e=mn(this.defaults,e);const n=Ql(e.baseURL,e.url);return ql(n,e.params,e.paramsSerializer)}}y.forEach(["delete","get","head","options"],function(e){Br.prototype[e]=function(n,r){return this.request(mn(r||{},{method:e,url:n,data:(r||{}).data}))}});y.forEach(["post","put","patch"],function(e){function n(r){return function(i,o,a){return this.request(mn(a||{},{method:e,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}Br.prototype[e]=n(),Br.prototype[e+"Form"]=n(!0)});const Rr=Br;class Gi{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const o=new Promise(a=>{r.subscribe(a),i=a}).then(s);return o.cancel=function(){r.unsubscribe(i)},o},e(function(i,o,a){r.reason||(r.reason=new sr(i,o,a),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}static source(){let e;return{token:new Gi(function(s){e=s}),cancel:e}}}const Pb=Gi;function Ob(t){return function(n){return t.apply(null,n)}}function kb(t){return y.isObject(t)&&t.isAxiosError===!0}const li={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(li).forEach(([t,e])=>{li[e]=t});const Nb=li;function tu(t){const e=new Rr(t),n=Dl(Rr.prototype.request,e);return y.extend(n,Rr.prototype,e,{allOwnKeys:!0}),y.extend(n,e,null,{allOwnKeys:!0}),n.create=function(s){return tu(mn(t,s))},n}const oe=tu(Ki);oe.Axios=Rr;oe.CanceledError=sr;oe.CancelToken=Pb;oe.isCancel=Xl;oe.VERSION=eu;oe.toFormData=us;oe.AxiosError=K;oe.Cancel=oe.CanceledError;oe.all=function(e){return Promise.all(e)};oe.spread=Ob;oe.isAxiosError=kb;oe.mergeConfig=mn;oe.AxiosHeaders=et;oe.formToJSON=t=>Yl(y.isHTMLForm(t)?new FormData(t):t);oe.getAdapter=Zl.getAdapter;oe.HttpStatusCode=Nb;oe.default=oe;const Lb={name:"Recipe Generator",data(){return{currentMessage:"",messages:[]}},methods:{async sendMessage(t){this.messages.push({from:"user",data:t}),await oe.post("http://localhost:3000/chatbot",{message:t}).then(e=>{this.messages.push({from:"chatGpt",data:e.data.data})})}}},xb=t=>(Jr("data-v-572d5e77"),t=t(),Yr(),t),Db={class:"chatbox-container"},Mb={class:"container"},Ub=xb(()=>D("h1",null,"Ai Chat Bot",-1)),Fb={class:"messageBox mt-8"},Bb={class:"inputContainer"};function $b(t,e,n,r,s,i){return Mt(),on("div",Db,[D("div",Mb,[Ub,D("div",Fb,[(Mt(!0),on($e,null,bf(s.messages,(o,a)=>(Mt(),on("div",{key:a,class:tn(o.from=="user"?"messageFromUser":"messageFromChatGpt")},[D("div",{class:tn(o.from=="user"?"userMessageWrapper":"chatGptMessageWrapper")},[D("div",{class:tn(o.from=="user"?"userMessageContent":"chatGptMessageContent")},hu(o.data),3)],2)],2))),128))]),D("div",Bb,[Nt(D("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>s.currentMessage=o),type:"text",class:"messageInput",placeholder:"Ask me anything..."},null,512),[[Lt,s.currentMessage]]),D("button",{onClick:e[1]||(e[1]=o=>i.sendMessage(s.currentMessage)),class:"askButton"}," Ask ")])])])}const Hb=Jn(Lb,[["render",$b],["__scopeId","data-v-572d5e77"]]),jb=[{path:"/",name:"Landing",component:Vh},{path:"/signup",name:"Sign Up",component:ny},{path:"/login",name:"Login",component:gy},{path:"/recipe-generator",name:"Recipe Generator",component:Hb}],Vb=Nh({history:ah(),routes:jb});Td(Od).use(Vb).mount("#app");
