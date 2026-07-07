(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const Qe="modulepreload",Ze=function(t,e){return new URL(t,e).href},Se={},Xe=function(e,s,n){let o=Promise.resolve();if(s&&s.length>0){let i=function(h){return Promise.all(h.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const r=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),d=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=i(s.map(h=>{if(h=Ze(h,n),h in Se)return;Se[h]=!0;const c=h.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(!!n)for(let v=r.length-1;v>=0;v--){const $=r[v];if($.href===h&&(!c||$.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Qe,c||(f.as="script"),f.crossOrigin="",f.href=h,d&&f.setAttribute("nonce",d),document.head.appendChild(f),c)return new Promise((v,$)=>{f.addEventListener("load",v),f.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return o.then(i=>{for(const r of i||[])r.status==="rejected"&&a(r.reason);return e().catch(a)})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const le=globalThis,ke=le.ShadowRoot&&(le.ShadyCSS===void 0||le.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol(),$e=new WeakMap;let et=class{constructor(e,s,n){if(this._$cssResult$=!0,n!==Ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(ke&&e===void 0){const n=s!==void 0&&s.length===1;n&&(e=$e.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&$e.set(s,e))}return e}toString(){return this.cssText}};const tt=t=>new et(typeof t=="string"?t:t+"",void 0,Ue),st=(t,e)=>{if(ke)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const n=document.createElement("style"),o=le.litNonce;o!==void 0&&n.setAttribute("nonce",o),n.textContent=s.cssText,t.appendChild(n)}},Le=ke?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const n of e.cssRules)s+=n.cssText;return tt(s)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:nt,defineProperty:ot,getOwnPropertyDescriptor:at,getOwnPropertyNames:it,getOwnPropertySymbols:rt,getPrototypeOf:lt}=Object,W=globalThis,Ce=W.trustedTypes,ht=Ce?Ce.emptyScript:"",fe=W.reactiveElementPolyfillSupport,Q=(t,e)=>t,he={toAttribute(t,e){switch(e){case Boolean:t=t?ht:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},xe=(t,e)=>!nt(t,e),Be={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:xe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),W.litPropertyMetadata??(W.litPropertyMetadata=new WeakMap);let Y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=Be){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const n=Symbol(),o=this.getPropertyDescriptor(e,n,s);o!==void 0&&ot(this.prototype,e,o)}}static getPropertyDescriptor(e,s,n){const{get:o,set:a}=at(this.prototype,e)??{get(){return this[s]},set(i){this[s]=i}};return{get:o,set(i){const r=o==null?void 0:o.call(this);a==null||a.call(this,i),this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Be}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;const e=lt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){const s=this.properties,n=[...it(s),...rt(s)];for(const o of n)this.createProperty(o,s[o])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[n,o]of s)this.elementProperties.set(n,o)}this._$Eh=new Map;for(const[s,n]of this.elementProperties){const o=this._$Eu(s,n);o!==void 0&&this._$Eh.set(o,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const o of n)s.unshift(Le(o))}else e!==void 0&&s.push(Le(e));return s}static _$Eu(e,s){const n=s.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(s=>s(this))}addController(e){var s;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)==null||s.call(e))}removeController(e){var s;(s=this._$EO)==null||s.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const n of s.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return st(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(s=>{var n;return(n=s.hostConnected)==null?void 0:n.call(s)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(s=>{var n;return(n=s.hostDisconnected)==null?void 0:n.call(s)})}attributeChangedCallback(e,s,n){this._$AK(e,n)}_$ET(e,s){var a;const n=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,n);if(o!==void 0&&n.reflect===!0){const i=(((a=n.converter)==null?void 0:a.toAttribute)!==void 0?n.converter:he).toAttribute(s,n.type);this._$Em=e,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,s){var a,i;const n=this.constructor,o=n._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const r=n.getPropertyOptions(o),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((a=r.converter)==null?void 0:a.fromAttribute)!==void 0?r.converter:he;this._$Em=o;const d=l.fromAttribute(s,r.type);this[o]=d??((i=this._$Ej)==null?void 0:i.get(o))??d,this._$Em=null}}requestUpdate(e,s,n,o=!1,a){var i;if(e!==void 0){const r=this.constructor;if(o===!1&&(a=this[e]),n??(n=r.getPropertyOptions(e)),!((n.hasChanged??xe)(a,s)||n.useDefault&&n.reflect&&a===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,s,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:n,reflect:o,wrapped:a},i){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??s??this[e]),a!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(s=void 0),this._$AL.set(e,s)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[a,i]of o){const{wrapped:r}=i,l=this[a];r!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,i,l)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(n=this._$EO)==null||n.forEach(o=>{var a;return(a=o.hostUpdate)==null?void 0:a.call(o)}),this.update(s)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(s)}willUpdate(e){}_$AE(e){var s;(s=this._$EO)==null||s.forEach(n=>{var o;return(o=n.hostUpdated)==null?void 0:o.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(s=>this._$ET(s,this[s]))),this._$EM()}updated(e){}firstUpdated(e){}};Y.elementStyles=[],Y.shadowRootOptions={mode:"open"},Y[Q("elementProperties")]=new Map,Y[Q("finalized")]=new Map,fe==null||fe({ReactiveElement:Y}),(W.reactiveElementVersions??(W.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,_e=t=>t,de=Z.trustedTypes,je=de?de.createPolicy("lit-html",{createHTML:t=>t}):void 0,Re="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,De="?"+H,dt=`<${De}>`,N=document,X=()=>N.createComment(""),ee=t=>t===null||typeof t!="object"&&typeof t!="function",Te=Array.isArray,ct=t=>Te(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",we=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Oe=/>/g,R=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,We=/"/g,qe=/^(?:script|style|textarea|title)$/i,Ne=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),u=Ne(1),L=Ne(2),F=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Ee=new WeakMap,D=N.createTreeWalker(N,129);function Fe(t,e){if(!Te(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(e):e}const ut=(t,e)=>{const s=t.length-1,n=[];let o,a=e===2?"<svg>":e===3?"<math>":"",i=K;for(let r=0;r<s;r++){const l=t[r];let d,h,c=-1,p=0;for(;p<l.length&&(i.lastIndex=p,h=i.exec(l),h!==null);)p=i.lastIndex,i===K?h[1]==="!--"?i=Pe:h[1]!==void 0?i=Oe:h[2]!==void 0?(qe.test(h[2])&&(o=RegExp("</"+h[2],"g")),i=R):h[3]!==void 0&&(i=R):i===R?h[0]===">"?(i=o??K,c=-1):h[1]===void 0?c=-2:(c=i.lastIndex-h[2].length,d=h[1],i=h[3]===void 0?R:h[3]==='"'?We:He):i===We||i===He?i=R:i===Pe||i===Oe?i=K:(i=R,o=void 0);const g=i===R&&t[r+1].startsWith("/>")?" ":"";a+=i===K?l+dt:c>=0?(n.push(d),l.slice(0,c)+Re+l.slice(c)+H+g):l+H+(c===-2?r:g)}return[Fe(t,a+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class te{constructor({strings:e,_$litType$:s},n){let o;this.parts=[];let a=0,i=0;const r=e.length-1,l=this.parts,[d,h]=ut(e,s);if(this.el=te.createElement(d,n),D.currentNode=this.el.content,s===2||s===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=D.nextNode())!==null&&l.length<r;){if(o.nodeType===1){if(o.hasAttributes())for(const c of o.getAttributeNames())if(c.endsWith(Re)){const p=h[i++],g=o.getAttribute(c).split(H),f=/([.?@])?(.*)/.exec(p);l.push({type:1,index:a,name:f[2],strings:g,ctor:f[1]==="."?mt:f[1]==="?"?gt:f[1]==="@"?ft:ce}),o.removeAttribute(c)}else c.startsWith(H)&&(l.push({type:6,index:a}),o.removeAttribute(c));if(qe.test(o.tagName)){const c=o.textContent.split(H),p=c.length-1;if(p>0){o.textContent=de?de.emptyScript:"";for(let g=0;g<p;g++)o.append(c[g],X()),D.nextNode(),l.push({type:2,index:++a});o.append(c[p],X())}}}else if(o.nodeType===8)if(o.data===De)l.push({type:2,index:a});else{let c=-1;for(;(c=o.data.indexOf(H,c+1))!==-1;)l.push({type:7,index:a}),c+=H.length-1}a++}}static createElement(e,s){const n=N.createElement("template");return n.innerHTML=e,n}}function J(t,e,s=t,n){var i,r;if(e===F)return e;let o=n!==void 0?(i=s._$Co)==null?void 0:i[n]:s._$Cl;const a=ee(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==a&&((r=o==null?void 0:o._$AO)==null||r.call(o,!1),a===void 0?o=void 0:(o=new a(t),o._$AT(t,s,n)),n!==void 0?(s._$Co??(s._$Co=[]))[n]=o:s._$Cl=o),o!==void 0&&(e=J(t,o._$AS(t,e.values),o,n)),e}class pt{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:n}=this._$AD,o=((e==null?void 0:e.creationScope)??N).importNode(s,!0);D.currentNode=o;let a=D.nextNode(),i=0,r=0,l=n[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new oe(a,a.nextSibling,this,e):l.type===1?d=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(d=new wt(a,this,e)),this._$AV.push(d),l=n[++r]}i!==(l==null?void 0:l.index)&&(a=D.nextNode(),i++)}return D.currentNode=N,o}p(e){let s=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,s),s+=n.strings.length-2):n._$AI(e[s])),s++}}class oe{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,s,n,o){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=n,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=J(this,e,s),ee(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==F&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ct(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&ee(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){var a;const{values:s,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=te.createElement(Fe(n.h,n.h[0]),this.options)),n);if(((a=this._$AH)==null?void 0:a._$AD)===o)this._$AH.p(s);else{const i=new pt(o,this),r=i.u(this.options);i.p(s),this.T(r),this._$AH=i}}_$AC(e){let s=Ee.get(e.strings);return s===void 0&&Ee.set(e.strings,s=new te(e)),s}k(e){Te(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let n,o=0;for(const a of e)o===s.length?s.push(n=new oe(this.O(X()),this.O(X()),this,this.options)):n=s[o],n._$AI(a),o++;o<s.length&&(this._$AR(n&&n._$AB.nextSibling,o),s.length=o)}_$AR(e=this._$AA.nextSibling,s){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,s);e!==this._$AB;){const o=_e(e).nextSibling;_e(e).remove(),e=o}}setConnected(e){var s;this._$AM===void 0&&(this._$Cv=e,(s=this._$AP)==null||s.call(this,e))}}class ce{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,n,o,a){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=s,this._$AM=o,this.options=a,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=x}_$AI(e,s=this,n,o){const a=this.strings;let i=!1;if(a===void 0)e=J(this,e,s,0),i=!ee(e)||e!==this._$AH&&e!==F,i&&(this._$AH=e);else{const r=e;let l,d;for(e=a[0],l=0;l<a.length-1;l++)d=J(this,r[n+l],s,l),d===F&&(d=this._$AH[l]),i||(i=!ee(d)||d!==this._$AH[l]),d===x?e=x:e!==x&&(e+=(d??"")+a[l+1]),this._$AH[l]=d}i&&!o&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class mt extends ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}}class gt extends ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}}class ft extends ce{constructor(e,s,n,o,a){super(e,s,n,o,a),this.type=5}_$AI(e,s=this){if((e=J(this,e,s,0)??x)===F)return;const n=this._$AH,o=e===x&&n!==x||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==x&&(n===x||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var s;typeof this._$AH=="function"?this._$AH.call(((s=this.options)==null?void 0:s.host)??this.element,e):this._$AH.handleEvent(e)}}class wt{constructor(e,s,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const ye=Z.litHtmlPolyfillSupport;ye==null||ye(te,oe),(Z.litHtmlVersions??(Z.litHtmlVersions=[])).push("3.3.3");const yt=(t,e,s)=>{const n=(s==null?void 0:s.renderBefore)??e;let o=n._$litPart$;if(o===void 0){const a=(s==null?void 0:s.renderBefore)??null;n._$litPart$=o=new oe(e.insertBefore(X(),a),a,void 0,s??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=globalThis;let j=class extends Y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var s;const e=super.createRenderRoot();return(s=this.renderOptions).renderBefore??(s.renderBefore=e.firstChild),e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=yt(s,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return F}};var ze;j._$litElement$=!0,j.finalized=!0,(ze=q.litElementHydrateSupport)==null||ze.call(q,{LitElement:j});const be=q.litElementPolyfillSupport;be==null||be({LitElement:j});(q.litElementVersions??(q.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:xe},vt=(t=bt,e,s)=>{const{kind:n,metadata:o}=s;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(s.name,t),n==="accessor"){const{name:i}=s;return{set(r){const l=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,l,t,!0,r)},init(r){return r!==void 0&&this.C(i,void 0,t,r),r}}}if(n==="setter"){const{name:i}=s;return function(r){const l=this[i];e.call(this,r),this.requestUpdate(i,l,t,!0,r)}}throw Error("Unsupported decorator location: "+n)};function M(t){return(e,s)=>typeof s=="object"?vt(t,e,s):((n,o,a)=>{const i=o.hasOwnProperty(a);return o.constructor.createProperty(a,n),i?Object.getOwnPropertyDescriptor(o,a):void 0})(t,e,s)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(t){return M({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=(t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,s),s);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function B(t,e){return(s,n,o)=>{const a=i=>{var r;return((r=i.renderRoot)==null?void 0:r.querySelector(t))??null};return kt(s,n,{get(){return a(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt={ATTRIBUTE:1},Tt=t=>(...e)=>({_$litDirective$:t,values:e});class It{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,n){this._$Ct=e,this._$AM=s,this._$Ci=n}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=Tt(class extends It{constructor(t){var e;if(super(t),t.type!==xt.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var n,o;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(const a in e)e[a]&&!((n=this.nt)!=null&&n.has(a))&&this.st.add(a);return this.render(e)}const s=t.element.classList;for(const a of this.st)a in e||(s.remove(a),this.st.delete(a));for(const a in e){const i=!!e[a];i===this.st.has(a)||(o=this.nt)!=null&&o.has(a)||(i?(s.add(a),this.st.add(a)):(s.remove(a),this.st.delete(a)))}return F}});/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/const At=[{lesson_number:1,text:`My name is Leo. I'm a software engineer, and I live in a gray box. It's not a real box, of course. It's a cubicle at OmniCorp, a huge tech company. But it feels like a box. The walls are gray. The carpet is gray. Even the code I write on my screen is mostly gray. I have a good job, they say. Good money. Good benefits. But I feel… empty. Stuck. I look out the window and the sky is bright blue, but I feel like I'm a million miles away from it. "Is this really it?" I think to myself, probably for the hundredth time this week. "Is this my life?" Eight hours a day. Click. Type. Stare. I need something to change. I just don't know what.

During his lunch break, Leo didn't eat. He walked to a small park nearby. The noise of the city felt distant there. He found an empty bench and just watched the world go by. He saw a young woman sitting on the grass. In her hands, she held a guitar. On her phone, an app was open. She would watch the app, try to place her fingers on the strings, and strum. The sound was wrong. She sighed, a look of pure frustration on her face. She tried again. And again. Finally, she gave up, putting the guitar and the phone aside. Leo saw the whole thing, and for him, it wasn't just a simple observation. It was a moment of clarity. A spark.`,translation:`اسمي ليو. أنا مهندس برمجيات، وعايش في صندوق رمادي.
هو مش صندوق بجد يعني، أكيد. هو مكتب صغير في أومني كورب، شركة تكنولوجيا ضخمة. بس أنا بحس إنه صندوق.
الحيطان رمادي. السجاد رمادي. حتى الكود اللي بكتبه على شاشتي أغلبه رمادي.
بيقولوا شغلي كويس. فلوسه كويسة. مميزاته حلوة. بس أنا حاسس… إني فاضي. محشور.
ببص من الشباك والسما لونها أزرق وصافية، بس بحس إني بعيد عنها مليون ميل.
"هو ده آخري؟" بفكر مع نفسي، ويمكن دي المرة المية الأسبوع ده.
"هي دي حياتي؟" تمن ساعات كل يوم. كليك. أكتب. أحدّق. أنا محتاج حاجة تتغير. بس مش عارف إيه هي.

في استراحة الغدا بتاعته، ليو مأكلش. اتمشى لحد جنينة صغيرة قريبة.
دوشة المدينة كانت بعيدة هناك. لقى كنبة فاضية وقعد يتفرج ع الدنيا وهي ماشية.
شاف بنت شابة قاعدة على النجيلة. في إيديها كان جيتار. وعلى موبايلها، كان فيه أبلكيشن مفتوح.
كانت تبص ع الأبلكيشن، وتحاول تحط صوابعها على الأوتار، وتعزف. الصوت كان غلط.
اتنهدت، وملامح الإحباط باينة على وشها. حاولت تاني. وتاني.
في الآخر، استسلمت، وحطت الجيتار والموبايل على جنب.
ليو شاف الموقف كله، وبالنسبة له، ده مكنش مجرد موقف عادي. دي كانت لحظة صفاء. شرارة.`},{lesson_number:2,text:`That night, the idea was like a fire in Leo's mind. He picked up his phone and called his best friend. "Ben? You got a minute?" "For you, Leo? Always. What's up? You sound... different." "I have an idea," Leo said, his voice full of energy. "A new kind of app. For learning skills. Anything. A guitar, a new language... But it makes learning feel like a game. Simple, fun, and you always feel like you're winning." Leo explained everything. Ben listened patiently. After a long pause, Ben's voice came back, calm and clear. "It's a great idea, Leo. A really great idea. So, here's the real question: What are you going to do about it?"

"What are you going to do about it?" Ben's question echoed in my head all the next day. At my desk, I couldn't focus on my work. All I could think about were the two paths in front of me. Path one: stay here. At OmniCorp. It's safe. The money is reliable. I know exactly what to expect every single day. No surprises. It’s easy. Path two: leave. Start the app. It's a huge risk. I have very little money saved. Most startups fail. I could lose everything. It’s terrifying. But then another word came to mind: Freedom. The freedom to create something new. The freedom to build my own dream, not someone else's. The choice was clear. The choice between a safe cage and a scary, open sky. I was tired of the cage.`,translation:`بالليل، الفكرة كانت زي النار في دماغ ليو. مسك تليفونه وكلم أعز صاحب له.
"بن؟ فاضي دقيقة؟"
"علشانك يا ليو؟ أكيد. إيه الأخبار؟ صوتك... متغير."
"عندي فكرة،" ليو قال، وصوته كله طاقة. "نوع جديد من الأبلكيشن. لتعليم المهارات. أي حاجة. جيتار، لغة جديدة..."
"بس بيخلي التعليم إحساسه زي اللعبة. بسيط، ممتع، ودايمًا تحس إنك بتكسب."
ليو شرح له كل حاجة. وبن كان بيسمع بكل صبر.
بعد سكات طويل، صوت بن رجع تاني، هادي وواضح.
"دي فكرة عظيمة يا ليو. فكرة عظيمة بجد. يبقى، ده السؤال المهم: هتعمل إيه بخصوصها؟"

"هتعمل إيه بخصوصها؟" سؤال بن فضل يرن في وداني طول اليوم اللي بعده.
على مكتبي، مكنتش عارف أركز في شغلي. كل اللي بفكر فيه كان الطريقين اللي قدامي.
الطريق الأول: أفضل هنا. في أومني كورب. أمان. الفلوس مضمونة. عارف بالظبط إيه اللي هيحصل كل يوم. مفيش مفاجآت. الموضوع سهل.
الطريق التاني: أمشي. أبدأ الأبلكيشن. دي مخاطرة كبيرة. أنا محوش فلوس قليلة. معظم الشركات الناشئة بتفشل. ممكن أخسر كل حاجة. الموضوع مرعب.
بس بعدها جت كلمة تانية في بالي: الحرية. حرية إني أخلق حاجة جديدة. حرية إني أبني حلمي أنا، مش حلم حد تاني.
الاختيار كان واضح. الاختيار بين قفص آمن، وسما مفتوحة ومخيفة. أنا زهقت من القفص.`},{lesson_number:3,text:`Leo stood in front of his manager's door. He took a deep breath and knocked. "Come in." Mr. Harrison was looking at a spreadsheet. "Leo. What can I do for you?" "Mr. Harrison, I've decided to resign." Harrison looked up, surprised. "Resign? Is this about salary? Because we can discuss a raise." "Thank you, sir, but it's not about the money," Leo said, his voice steady. "I need to pursue my own project." Mr. Harrison leaned back in his chair and almost smiled. "Your 'own project.' Leo, do you know the statistics? Ninety percent of new businesses fail within the first year. Don't make a huge mistake."

A "huge mistake." The words followed Leo back to his cubicle. His colleagues watched him silently as he began to pack. He took a small cardboard box and started filling it. A coffee mug with a funny quote. A photo of his parents. A small, struggling plant he always forgot to water. Each object represented a day, a week, a year of his life here. Two years. He felt a wave of sadness, but underneath it was a powerful feeling of relief. He sealed the box and took one last look around. He saw the gray walls, the gray carpet, the endless rows of other cubicles. And for the first time, he smiled. This wasn't just leaving a job. This was an escape.`,translation:`ليو وقف قدام باب مكتب مديره. خد نفس عميق وخبط. "ادخل." مستر هاريسون كان بيبص في ملف إكسل. "ليو. أقدر أساعدك بإيه؟"
"مستر هاريسون, أنا قررت أستقيل." هاريسون رفع عينيه من ع الشاشة، وكان متفاجئ. "تستقيل؟ ليه؟ الموضوع عشان الفلوس؟ لأننا ممكن نتكلم في زيادة."
"شكرًا يا فندم، بس الموضوع مش عشان الفلوس،" ليو قال، وصوته ثابت. "أنا محتاج أشتغل على مشروعي الخاص."
مستر هاريسون سند بضهره على الكرسي وتقريبًا ابتسم. "'مشروعك الخاص'. ليو، أنت عارف الإحصائيات؟ تسعين في المية من الشركات الجديدة بتفشل في أول سنة. متعملش غلطة كبيرة زي دي."

"غلطة كبيرة." الكلمتين فضلوا ورا ليو وهو راجع لمكتبه. زمايله كانوا بيبصوله وهما ساكتين. كانوا حاسين إن في حاجة اتغيرت.
بدأ يلم حاجته في صندوق كرتون صغير. مج القهوة بتاعه المفضل. صورة لأهله. زرعة صغيرة كانت بالعافية عايشة.
كل حاجة كان بيحطها كانت تقيلة بالذكريات. آخر سنتين من حياته بيتحطوا جوه الصندوق ده.
كان إحساس حزين، بس تحت الحزن ده، كان فيه حاجة تانية. حماس.
بص على مكتبه الرمادي لآخر مرة. مبقاش بيكرهه خلاص. حس بالامتنان للتجربة، بس هو كان جاهز يمشي. دي مكنتش نهاية. دي كانت البداية.`},{lesson_number:4,text:`I woke up and, for a moment, I panicked. The room was quiet. Too quiet. Then I remembered: there was no alarm. No office. No OmniCorp. It's Tuesday morning, and I'm completely free. The feeling was both amazing and terrifying. I am my own boss now. I made a strong cup of coffee and sat at my desk in the corner of my living room. My laptop was open to a blank document. Day one. Hour one. The "Phoenix Project," as I decided to call it, officially begins now. I stared at the blinking cursor on the screen and took a sip of my coffee. "Okay, Leo," I whispered to myself. "Let's build something."

Leo knew that good code was not the first step. The first step was a good plan. He didn't use any fancy software. He took a huge sheet of paper and a black pen. In the very center, he wrote the name he'd chosen for the app: "SkillUp." Then, he began to draw lines out from the center, like rays of sun. Each line was a major part of the project. "Users." "Features." "Design." "Marketing." He spent the entire day filling the paper. Under "Features," he wrote "Progress bars," "Daily challenges," "Points and badges." Under "Users," he wrote "Students, hobbyists, professionals." The paper became a chaotic, beautiful mess of ideas. It wasn't code. It was a map of his dream.`,translation:`صحيت، وللحظة، اتخضيت. الأوضة كانت هادية. هادية أوي. بعدها افتكرت: مفيش منبه. مفيش مكتب. مفيش أومني كورب.
النهاردة التلات الصبح، وأنا حر تمامًا. الإحساس كان مدهش ومرعب في نفس الوقت.
أنا مديري نفسي دلوقتي.
عملت فنجان قهوة تقيل وقعدت على مكتبي اللي في ركن الصالة. اللابتوب كان مفتوح على صفحة بيضا.
اليوم الأول. الساعة الأولى. "مشروع العنقاء"، زي ما قررت أسميه، بيبدأ رسميًا دلوقتي.
بصيت على علامة الكتابة اللي بتنور وتطفي على الشاشة وخدت شفطة من قهوتي. "ماشي يا ليو،" همست لنفسي. "يلا نبني حاجة."

ليو كان عارف إن الكود الكويس مش هو أول خطوة. أول خطوة هي خطة كويسة.
مستخدمش أي برامج معقدة. جاب فرخ ورق كبير وقلم أسود. في النص بالظبط، كتب الاسم اللي اختاره للأبلكيشن: "SkillUp".
وبعدين، بدأ يرسم خطوط طالعة من النص، زي أشعة الشمس. كل خط كان جزء رئيسي من المشروع.
"المستخدمين." "المميزات." "التصميم." "التسويق." قضى اليوم كله بيملى الورقة دي.
تحت "المميزات"، كتب "شرايط التقدم،" "تحديات يومية،" "نقط وشارات."
تحت "المستخدمين"، كتب "طلبة، هواة، محترفين." الورقة بقت فوضى جميلة ومليانة أفكار.
ده مكنش كود. دي كانت خريطة حلمه.`},{lesson_number:5,text:`Two weeks later, the first prototype was ready. It was simple, but it worked. Leo invited Ben over to be the first person to test it. "So, what do you think?" Leo asked nervously after Ben had spent fifteen minutes using the app. "I think it's brilliant, man. Seriously," Ben said, handing the phone back. "The core idea is very strong." Leo smiled, relieved. "Thanks! I knew you'd like..." "But," Ben interrupted gently, "we need to talk about a small problem." "What problem?" Ben didn't answer. He just looked over at the small stack of unpaid bills on Leo's kitchen counter. "That problem," he said. "Your dream is running on fumes, Leo. You need fuel. You need money."

He's right. Of course, he's right. The excitement of the last two weeks made me forget the most important thing: I'm not making any money. My savings are disappearing fast. As I see it, I have two doors in front of me. Door number one: Get a part-time job. Something simple. Maybe a few nights a week. It would bring in some cash and reduce the pressure. But it would also steal my time and my energy. The project would move much slower. Door number two: Find an investor. Someone who believes in my idea and gives me the money to build it properly. This is the faster path. But it means giving up a piece of my company. A piece of my dream. I would have to answer to someone else again. Which door do I open? This is the first real test. This is where the Phoenix Project either learns to fly or burns out on the launchpad.`,translation:`بعد أسبوعين، أول نسخة تجريبية كانت جاهزة. كانت بسيطة، بس شغالة. ليو عزم بن عشان يبقى أول واحد يجربها.
"إيه رأيك؟" ليو سأل وهو متوتر بعد ما بن قعد ربع ساعة بيستخدم الأبلكيشن.
"أنا شايف إنه عبقري يا صاحبي. بجد،" بن قال، وهو بيرجعله الموبايل. "الفكرة الأساسية قوية جدًا."
ليو ابتسم وهو مطمن. "شكرًا! أنا كنت عارف إنه هيعجب..."
"بس،" بن قاطعه بهدوء، "محتاجين نتكلم في مشكلة صغيرة."
"مشكلة إيه؟"
بن مردش. هو بس بص على كومة الفواتير اللي مش مدفوعة على ترابيزة مطبخ ليو. "المشكلة دي،" هو قال. "حلمك ماشي على أبخرة البنزين يا ليو. أنت محتاج وقود. أنت محتاج فلوس."

هو عنده حق. أكيد عنده حق. حماس آخر أسبوعين خلاني أنسى أهم حاجة: أنا مبدخلش أي فلوس. تحويشتي بتختفي بسرعة.
زي ما أنا شايف، قدامي بابين. الباب الأول: أشوف شغل بارت-تايم. حاجة بسيطة. ممكن كام ليلة في الأسبوع. هيدخلّي كام قرش ويقلل الضغط. بس ده برضه هيسرق وقتي وطاقتي. المشروع هيتحرك أبطأ بكتير.
الباب التاني: ألاقي مستثمر. حد يؤمن بفكرتي ويديني الفلوس عشان أبنيها صح. ده الطريق الأسرع. بس معناه إني هتخلى عن جزء من شركتي. جزء من حلمي. هبقى برد على حد تاني من تاني.
أفتح أنهي باب؟ ده أول اختبار حقيقي. هو ده المكان اللي "مشروع العنقاء" يا إما هيتعلم يطير، أو هيتحرق وهو بيقلع.`},{lesson_number:6,text:`Leo made his decision. He chose Door Number Two. He needed to find an investor. But how? He knew nothing about business or finance. So, for the next three days, he didn't write a single line of code. Instead, he entered "research mode." He spent hours online, reading articles and watching videos. He learned new words like "seed funding," "venture capital," and "pitch deck." It felt like learning a new language. He made a list of potential investors in his city – individuals and small firms that focused on new technology startups. The list had twenty names on it. It wasn't long, but it was a start. He felt like a student again, studying for the most important test of his life.

An investor won't give you money just because you have a good idea. You need to show them a plan. You need to show them the numbers. You need something called a "pitch deck." It's basically a short presentation that explains your business. I spent a whole week creating my first pitch deck. It was harder than writing code. I had to answer difficult questions. Who are my competitors? How will my app make money? What is my five-year plan? For the first time, I had to think of SkillUp not just as a cool project, but as a real business. I made slides with charts and simple designs. When I finished, I had a 15-slide presentation. It was my story, told in the language of money and data.`,translation:`ليو خد قراره. اختار الباب التاني. كان لازم يلاقي مستثمر. بس إزاي؟ هو ميعرفش أي حاجة عن البزنس أو التمويل.
فقعد التلات أيام اللي بعد كده، مكتبش فيهم سطر كود واحد. بدل كده، دخل في "وضع البحث".
قضى ساعات على النت، بيقرأ مقالات ويتفرج على فيديوهات. اتعلم كلمات جديدة زي "تمويل أولي،" "رأس مال مغامر،" و "عرض تقديمي."
حس كأنه بيتعلم لغة جديدة. عمل قايمة بالمستثمرين المحتملين في مدينته – أفراد وشركات صغيرة بتركز على الشركات التكنولوجية الناشئة.
القايمة كان فيها عشرين اسم. مكنتش طويلة، بس كانت بداية. حس كأنه طالب تاني، بيذاكر لأهم امتحان في حياته.

المستثمر مش هيديك فلوس عشان عندك فكرة حلوة وخلاص. لازم توريله خطة. لازم توريله الأرقام.
لازم يبقى معاك حاجة اسمها "pitch deck" أو عرض تقديمي. هو عبارة عن برزنتيشن قصيرة بتشرح البزنس بتاعك.
قضيت أسبوع بحاله بعمل أول عرض تقديمي ليا. كان أصعب من كتابة الكود.
كنت لازم أجاوب على أسئلة صعبة. مين المنافسين بتوعي؟ الأبلكيشن بتاعي هيكسب فلوس إزاي؟ إيه خطتي للخمس سنين الجايين؟
لأول مرة، كنت لازم أفكر في SkillUp مش كمشروع جامد وخلاص، لأ كبزنس حقيقي.
عملت شرايح فيها رسوم بيانية وتصميمات بسيطة. لما خلصت، كان عندي برزنتيشن من 15 شريحة. دي كانت قصتي، محكية بلغة الفلوس والبيانات.`},{lesson_number:7,text:`Leo took a deep breath and clicked "send" on the first email. It was to an investor named Mark Chen. The email was short and professional. He introduced himself, explained SkillUp in two sentences, and attached his pitch deck. Two days later, an email came back. It was from Mark Chen's assistant. "Dear Mr. Rossi, Thank you for your submission. Mr. Chen has reviewed your pitch deck. Unfortunately, it is not a good fit for our portfolio at this time. We wish you the best of luck." Leo stared at the words. "Not a good fit." It felt like a punch. "It's just the first one," he said to himself. "There are nineteen more names on the list." But the confidence he felt just days ago was starting to shrink.

The first "no" was followed by a second. And a third. By the end of the week, Leo had sent his pitch deck to ten investors. He received seven replies. All of them were rejections. Some were polite, like the first one. Some were just a single sentence: "Thanks, but we'll pass." Three investors didn't reply at all. A pattern was clear. He was doing something wrong. But what? Was his idea bad? Was his pitch deck weak? Or maybe they just didn't believe in him? The doubt started to creep in. It was a cold, heavy feeling. Mr. Harrison's voice came back to him: "This is a very big mistake." Leo started to wonder if his old manager was right.`,translation:`ليو خد نفس عميق وداس "إرسال" على أول إيميل. كان لمستثمر اسمه مارك تشين.
الإيميل كان قصير ورسمي. عرف بنفسه، شرح SkillUp في جملتين، ورفق العرض التقديمي بتاعه.
بعد يومين، جاله رد. كان من مساعدة مارك تشين. "عزيزي مستر روسي، شكرًا على طلبك. مستر تشين راجع العرض التقديمي بتاعك. للأسف، هو مش مناسب لملفنا الاستثماري في الوقت الحالي. بنتمنى لك كل التوفيق."
ليو بص للكلمات. "مش مناسب." حس كأنها لكمة. "ده بس أول واحد،" قال لنفسه. "لسه فيه تسعتاشر اسم في القايمة." بس الثقة اللي كان حاسس بيها من كام يوم بدأت تتقلص.

أول "لأ" تبعها "لأ" تانية. وتالتة. بنهاية الأسبوع، ليو كان بعت عرضه لعشر مستثمرين.
استقبل سبع ردود. كلهم كانوا رفض. بعضهم كان مهذب، زي الأولاني.
بعضهم كان مجرد جملة واحدة: "شكرًا، بس هنعدي." تلات مستثمرين مردوش خالص.
النمط كان واضح. هو بيعمل حاجة غلط. بس إيه هي؟ هل فكرته وحشة؟ هل عرضه ضعيف؟
ولا يمكن هما بس مش مؤمنين بيه؟ الشك بدأ يتسلل. كان إحساس بارد وتقيل.
صوت مستر هاريسون رجعله: "دي غلطة كبيرة أوي." ليو بدأ يتساءل لو مديره القديم كان عنده حق.`},{lesson_number:8,text:`Leo was sitting in his apartment, looking at his list of rejections, when Ben called. "Hey, man. You sound tired. What's on your mind?" "The investor search is a disaster," Leo admitted. "I got seven rejections. Everyone thinks my idea is bad." "No, they don't," Ben said firmly. "They didn't say the idea was bad. They said it wasn't a good 'fit'. That's different. They are talking business. You are talking emotion." "What do you mean?" Leo asked. "I mean you're trying to sell them a document," Ben explained. "Investors don't invest in documents. They invest in people. You need to get in a room with them. You need to let them see your passion. Stop sending emails. Start making phone calls."

I hated making phone calls. I was an engineer. I liked communicating through text, through code. But Ben was right. The emails weren't working. I had to try something different. I found the phone number for the next investor on my list, a woman named Sarah Jenkins. My hand was literally shaking as I dialed the number. A secretary answered. "Hello, this is Leo Rossi. I'm the founder of a new startup called SkillUp. I was hoping to speak with Ms. Jenkins for just two minutes." "I'm sorry, Ms. Jenkins is very busy. Can you send an email?" the secretary said. This was it. My one chance. "I already did," I said, trying to keep my voice steady. "I just have one question for her that I can't put in an email. It will only take sixty seconds." There was a long pause. "Please hold."`,translation:`ليو كان قاعد في شقته، بيبص على قايمة الرفض بتاعته، لما بن اتصل. "إيه يا صاحبي. صوتك تعبان. إيه اللي بيحصل؟"
"البحث عن مستثمر كارثة،" ليو اعترف. "جالي سبع رفض. كل الناس شايفة إن فكرتي وحشة."
"لأ، هما مش شايفين كده،" بن قال بحزم. "هما مقالوش إن الفكرة وحشة. هما قالوا إنها مش 'مناسبة'. ده مختلف. هما بيتكلموا بزنس. أنت بتتكلم بمشاعر."
"قصدك إيه؟" ليو سأل.
"قصدي إنك بتحاول تبيع لهم وثيقة،" بن شرح. "المستثمرين مش بيستثمروا في وثايق. هما بيستثمروا في الناس. أنت لازم تدخل معاهم في أوضة. لازم تخليهم يشوفوا شغفك. بطل تبعت إيميلات. ابدأ اعمل مكالمات تليفون."

أنا بكره أعمل مكالمات تليفون. أنا مهندس. بحب أتواصل بالكتابة، بالكود. بس بن كان عنده حق. الإيميلات مش جايبة نتيجة. كان لازم أجرب حاجة مختلفة.
لقيت رقم تليفون المستثمرة اللي عليها الدور في قايمتي، واحدة اسمها سارة جينكينز. إيدي كانت بتترعش حرفيًا وأنا بطلب الرقم. سكرتيرة ردت.
"ألو، معاكم ليو روسي. أنا مؤسس شركة ناشئة جديدة اسمها SkillUp. كنت بتمنى أتكلم مع مدام جينكينز دقيقتين بس."
"أنا آسفة، مدام جينكينز مشغولة جدًا. ممكن تبعت إيميل؟" السكرتيرة قالت.
هي دي. فرصتي الوحيدة. "أنا بعت فعلًا،" قلت، وأنا بحاول أخلي صوتي ثابت. "أنا بس عندي سؤال واحد ليها مقدرش أحطه في إيميل. هياخد ستين ثانية بس."
كان فيه وقفة طويلة. "لو سمحت استنى ع الخط."`},{lesson_number:9,text:`A new voice came on the line. "This is Sarah Jenkins. You have sixty seconds." Her voice was sharp and direct. Leo's heart was pounding. "Ms. Jenkins, thank you. My name is Leo Rossi. I know you're busy, so here is my question: Do you believe that the way we learn is broken? Do you believe that people want to learn new skills but give up because it's too difficult and frustrating?" There was another pause. Leo could hear her thinking. "That's an interesting question," she said, her tone softening slightly. "What's your solution?" "It's an app called SkillUp," Leo said, a surge of confidence returning. "It makes learning feel like a game. Can I have ten minutes of your time next week to show you how it works?" "...Okay, Mr. Rossi," she finally said. "My assistant will schedule a meeting. You have ten minutes. Don't waste them."

Leo felt like he had just won a war. He had a meeting! A real meeting. It was scheduled for the following Tuesday. He had six days to prepare. He knew his prototype wasn't enough. It had to be perfect. He also knew his pitch needed to be better. It needed to be more than just data. It needed to be a story. A human story. For the next six days, Leo worked like a machine. He slept four hours a night. He lived on coffee and pizza. He rewrote every line of code on the prototype to make it faster and more beautiful. He practiced his ten-minute presentation in front of his bathroom mirror over and over again until he could say it in his sleep. This wasn't just a meeting. It was his one shot.`,translation:`صوت جديد جه على الخط. "معاك سارة جينكينز. قدامك ستين ثانية." صوتها كان حاد ومباشر.
قلب ليو كان بيدق بسرعة. "مدام جينكينز، شكرًا. اسمي ليو روسي. أنا عارف إن حضرتك مشغولة, عشان كده ده سؤالي: هل حضرتك مؤمنة إن طريقتنا في التعلم بايظة؟ هل بتصدقي إن الناس عايزة تتعلم مهارات جديدة بس بتستسلم عشان الموضوع صعب ومحبط أوي؟"
كان فيه وقفة تانية. ليو كان سامعها وهي بتفكر.
"ده سؤال مثير للاهتمام،" قالت، ونبرتها لانت شوية. "إيه الحل بتاعك؟"
"هو أبلكيشن اسمه SkillUp،" ليو قال، وموجة من الثقة رجعتله. "بيخلي التعلم إحساسه زي اللعبة. ممكن آخد عشر دقايق من وقتك الأسبوع الجاي أوريكي بيشتغل إزاي؟"
"...ماشي يا مستر روسي،" قالت أخيرًا. "المساعدة بتاعتي هتحدد معاد. قدامك عشر دقايق. متضيعهمش."

ليو حس كأنه لسه كسبان حرب. جاله معاد! معاد حقيقي. كان متحدد ليوم التلات اللي بعده. كان قدامه ست أيام عشان يستعد.
كان عارف إن النسخة التجريبية بتاعته مش كفاية. لازم تكون مثالية. وكان عارف برضه إن عرضه لازم يكون أحسن. لازم يكون أكتر من مجرد بيانات. لازم يكون قصة. قصة إنسانية.
للسات أيام الجايين، ليو اشتغل زي المكنة. كان بينام أربع ساعات في الليلة. عايش على القهوة والبيتزا.
كتب كل سطر كود في النسخة التجريبية من أول وجديد عشان يخليها أسرع وأجمل. اتمرن على عرضه بتاع العشر دقايق قدام مراية الحمام مرة ورا مرة لحد ما بقى يقدر يقوله وهو نايم. ده مكنش مجرد اجتماع. دي كانت فرصته الوحيدة.`},{lesson_number:10,text:`The office of Sarah Jenkins was completely different from OmniCorp. It was modern, with glass walls and colorful art. It was an office full of energy and optimism. I felt a little out of place in my simple suit. Her assistant led me to a small meeting room. "Ms. Jenkins will be with you shortly," she said. I sat at the long, polished table and set up my laptop. My hands were cold. My mouth was dry. I took a few deep breaths, trying to calm my nerves. I thought about my old gray box. I thought about the feeling of being stuck. I thought about my dream. This is it. All my work from the past month comes down to the next ten minutes. Don't think about failure. Just tell the story. Tell your story.

The door opened and Sarah Jenkins walked in. She was confident and looked directly at Leo. "Mr. Rossi. Good to meet you in person. Your ten minutes start now." Leo stood up and smiled. He didn't start with numbers or charts. He started with a story. "Imagine a young woman," he began, "sitting in a park, trying to learn a new skill she loves, but feeling completely frustrated by the tools she's using..." He told the story he had witnessed. He explained how that simple observation gave him his mission. Then he showed her the prototype, not as a product, but as the solution to that young woman's problem. He spoke with a passion that no email could ever contain. Sarah Jenkins didn't interrupt. She just listened, her expression unreadable. Leo didn't know if he was succeeding or failing, but he knew he was giving it his all.`,translation:`مكتب سارة جينكينز كان مختلف تمامًا عن أومني كورب. كان مودرن، بحيطان إزاز ولوحات فنية ملونة. كان مكتب مليان طاقة وتفاؤل. حسيت إني مش مكاني شوية ببدلتي البسيطة.
المساعدة بتاعتها ودتني لأوضة اجتماعات صغيرة. "مدام جينكينز هتبقى معاك حالًا،" قالت. قعدت على الترابيزة الطويلة اللامعة وجهزت اللابتوب بتاعي.
إيدي كانت متلجة. وريقي ناشف. خدت كام نفس عميق، بحاول أهدي أعصابي.
افتكرت صندوقي الرمادي القديم. افتكرت إحساسي بأني محشور. افتكرت حلمي.
هي دي. كل شغلي بتاع الشهر اللي فات بيتلخص في العشر دقايق الجايين. متفكرش في الفشل. بس احكي القصة. احكي قصتك.

الباب اتفتح وسارة جينكينز دخلت. كانت واثقة وبصت في عين ليو مباشرةً. "مستر روسي. سعيدة بمقابلتك شخصيًا. العشر دقايق بتوعك بيبدأوا دلوقتي."
ليو وقف وابتسم. مبدأش بأرقام أو رسوم بيانية. بدأ بقصة. "تخيلي بنت شابة،" بدأ كلامه، "قاعدة في جنينة، بتحاول تتعلم مهارة جديدة بتحبها، بس حاسة بإحباط تام بسبب الأدوات اللي بتستخدمها..."
حكى القصة اللي كان شاهد عليها. شرح إزاي الموقف البسيط ده إداله رسالته. بعدها، وراها النسخة التجريبية، مش كمنتج، لكن كحل لمشكلة البنت الشابة دي.
اتكلم بشغف عمر أي إيميل ما يقدر يحتويه. سارة جينكينز مقاطعتهوش. هي بس كانت بتسمع، وتعبير وشها محدش يقدر يقرأه.
ليو مكنش عارف هو بينجح ولا بيفشل، بس هو كان عارف إنه بيبذل كل جهده.`},{lesson_number:11,text:`Leo finished his presentation. He had used exactly nine minutes and fifty seconds. He closed his laptop and looked at Sarah Jenkins, waiting for her reaction. Her face was still a mask – professional, thoughtful, but revealing nothing. She was silent for what felt like an eternity. She tapped her pen on her notepad. Once. Twice. "Your passion is clear, Mr. Rossi," she finally said, her voice neutral. "And the story is compelling. However, passion doesn't build a company." Leo's heart, which had been beating so fast, suddenly felt cold and heavy. He thought, "This is it. Another 'no'."

"I have a crucial question for you," Sarah continued, leaning forward. "And your answer will determine my decision." "Okay," Leo said, trying to keep his voice from shaking. "You are a great engineer. I can see that. But a company is not just one person. A great idea needs a great team to execute it. So, my question is: Who is on your team?" Leo was not prepared for this question. "Right now," he answered honestly, "it's just me." Sarah leaned back again. "That's what I thought. An army of one. That is your biggest weakness. I don't invest in solo founders. It's too risky."`,translation:`ليو خلص عرضه التقديمي. كان استخدم بالظبط تسع دقايق وخمسين ثانية.
قفل اللابتوب بتاعه وبص على سارة جينكينز، مستني رد فعلها.
وشها كان لسه قناع – رسمي، بيفكر، بس مش بيكشف عن أي حاجة.
فضلت ساكتة لمدة حس إنها دهر. كانت بتخبط بقلمها على كراستها. مرة. مرتين.
"شغفك واضح يا مستر روسي،" قالت أخيرًا، وصوتها محايد. "والقصة مقنعة. بس، الشغف لوحده مش بيبني شركة."
قلب ليو, اللي كان بيدق بسرعة أوي, حس فجأة إنه بارد وتقيل. فكر, "هي دي. 'لأ' تانية."

"عندي سؤال حاسم ليك،" سارة كملت، وهي بتميل لقدام. "وإجابتك هتحدد قراري."
"تمام،" ليو قال، وهو بيحاول يمنع صوته من الاهتزاز.
"أنت مهندس عظيم. أنا شايفة ده. بس الشركة مش شخص واحد. الفكرة العظيمة محتاجة فريق عظيم عشان ينفذها. عشان كده, سؤالي هو: مين في فريقك؟"
ليو مكنش مستعد للسؤال ده. "حاليا،" جاوب بصدق، "أنا لوحدي."
سارة سندت بظهرها تاني. "ده اللي كنت فكراه. جيش من رجل واحد. دي أكبر نقطة ضعف عندك. أنا مش بستثمر في مؤسسين فرديين. الموضوع مخاطرة كبيرة أوي."`},{lesson_number:12,text:`My mind was racing. It's over. I failed. I was so focused on the product, I completely forgot about the team. It was a rookie mistake. A fatal mistake. I started to gather my things. "Well, thank you for your time, Ms. Jenkins." "I haven't finished," she said, and I stopped. "I am not going to invest in your company as it is today. However... I am going to make you an offer." An offer? What could she possibly offer me? "I believe in your vision, Leo," she said. "And I might believe in you. I will give you a conditional offer. Find a co-founder. Someone with business or marketing experience. Someone who completes your skillset. You have thirty days. If you can find the right person, the funding is yours. If not, the offer expires."

Leo walked out of the meeting room in a daze. It wasn't a "yes," but it wasn't a "no" either. It was a challenge. A new mission. "Find a co-founder." This was a completely different kind of problem. Building an app was about logic, about code. Finding a person was about... people. About trust, communication, and shared vision. Where would he even start? He sat in the park, on the same bench where he first got his idea. The task felt almost impossible. He needed to find someone brilliant, trustworthy, and passionate about his idea, and he needed to convince them to join his risky project... all in thirty days.`,translation:`دماغي كانت بتلف. الموضوع خلص. أنا فشلت. كنت مركز أوي على المنتج، ونسيت الفريق تمامًا. دي كانت غلطة مبتدئين. غلطة قاتلة.
بدأت ألم حاجتي. "طيب، شكرًا على وقت حضرتك، مدام جينكينز."
"أنا لسه مخلصتش،" قالت، وأنا وقفت. "أنا مش هستثمر في شركتك بشكلها الحالي. بس... هعملك عرض."
عرض؟ ممكن تعرض عليا إيه؟
"أنا مؤمنة برؤيتك يا ليو،" قالت. "وممكن أؤمن بيك. أنا هديك عرض مشروط. لاقي شريك مؤسس. حد عنده خبرة في البزنس أو التسويق. حد يكمل مجموعة مهاراتك. قدامك تلاتين يوم. لو قدرت تلاقي الشخص المناسب، التمويل هيبقى بتاعك. لو لأ، العرض بينتهي."

ليو خرج من أوضة الاجتماعات وهو دايخ. ده مكنش "أه"، بس مكنش "لأ" برضه. ده كان تحدي. مهمة جديدة. "لاقي شريك مؤسس."
دي كانت مشكلة من نوع مختلف تمامًا. بناء أبلكيشن كان عن المنطق، عن الكود. إيجاد شخص كان عن... الناس. عن الثقة، والتواصل، والرؤية المشتركة. هيبدأ منين أصلًا؟
قعد في الجنينة، على نفس الكنبة اللي جاتله فيها الفكرة أول مرة. المهمة كانت شبه مستحيلة.
كان محتاج يلاقي حد عبقري، جدير بالثقة، وشغوف بفكرته، وكان محتاج يقنعه ينضم لمشروعه الخطير... كل ده في تلاتين يوم.`},{lesson_number:13,text:`Who do I know? My mind immediately went to Ben. He’s my best friend. He’s smart, practical, and I trust him completely. He’s the one who encouraged me to start this in the first place. But Ben has a great job. He’s an accountant at a big firm. He has a wife, a mortgage. A stable life. Why would he leave all that for my crazy dream? It feels selfish to even ask him. To ask him to risk his family's security for my idea. But Sarah’s words kept repeating in my head: "Someone who completes your skillset." I’m the tech guy. Ben is the numbers guy. He’s perfect. I have to at least talk to him. I owe it to the project. I owe it to myself.

Leo invited Ben for coffee the next day. He explained everything that happened with Sarah Jenkins. "...so, she gave me thirty days to find a co-founder," Leo finished. Ben nodded slowly, taking a sip of his coffee. "That's a tough deadline. So who are you thinking of?" Leo looked directly at his friend. "I'm thinking of you, Ben." Ben almost choked on his coffee. "Me? Leo, that's... crazy. I'm an accountant. I have a stable job. I can't just quit." "I know it's a huge ask," Leo said, his voice earnest. "But you're the smartest person I know when it comes to business. We complete each other. With my code and your strategy, we could actually build this thing."`,translation:`أعرف مين؟ عقلي راح لبن على طول. هو أعز صاحب ليا. هو ذكي، عملي، وأنا بثق فيه ثقة عمياء. هو اللي شجعني أبدأ في ده أصلًا.
بس بن عنده شغلانة عظيمة. هو محاسب في شركة كبيرة. عنده زوجة، وقسط بيت. حياة مستقرة. ليه هيسيب كل ده عشان حلمي المجنون؟
حاسس إنها أنانية حتى إني أسأله. إني أطلب منه يخاطر بأمان عيلته عشان فكرتي.
بس كلمات سارة فضلت تتردد في وداني: "حد يكمل مجموعة مهاراتك." أنا راجل التكنولوجيا. بن راجل الأرقام. هو مثالي.
أنا لازم ع الأقل أتكلم معاه. أنا مدين لده للمشروع. أنا مدين بده لنفسي.

ليو عزم بن على قهوة تاني يوم. شرح له كل اللي حصل مع سارة جينكينز.
"...فعشان كده، هي إدتني تلاتين يوم ألاقي شريك مؤسس،" ليو خلص كلامه.
بن هز رأسه ببطء، وهو بياخد شفطة من قهوته. "دي مهلة صعبة. طيب بتفكر في مين؟"
ليو بص في عين صاحبه مباشرةً. "أنا بفكر فيك أنت يا بن."
بن شرق تقريبا في القهوة. "أنا؟ ليو، ده... جنان. أنا محاسب. عندي شغل مستقر. مش هينفع أسيبه كده وخلاص."
"أنا عارف إنه طلب كبير أوي،" ليو قال، وصوته كله جدية. "بس أنت أذكى واحد أعرفه في البزنس. إحنا بنكمل بعض. بالكود بتاعي والاستراتيجية بتاعتك، إحنا ممكن فعلًا نبني الموضوع ده."`},{lesson_number:14,text:`Ben didn't say yes, but he didn't say no either. He was completely shocked. The two friends talked for over an hour. Leo showed him the numbers, the potential. He wasn't just selling an idea; he was selling a partnership. "I need to talk to my wife, Sarah," Ben finally said. "This is a massive decision. It affects her, too. Can you give me the weekend to think about it?" "Of course," Leo said, trying to hide his anxiety. "Take all the time you need." That weekend was the longest weekend of Leo's life. The entire future of the Phoenix Project rested on Ben's decision. All he could do was wait.

On Sunday evening, Leo's phone rang. It was Ben. Leo's heart stopped. "Hello?" "Hey, Leo. It's me." Ben's voice was serious. "So...?" Leo couldn't wait any longer. There was a pause. "So... Sarah and I talked all weekend. We looked at our finances. We talked about the risks. We talked about the future." Leo held his breath. This was it. "And we have one question for you," Ben said. "Anything." "When do we start?"`,translation:`بن مقالش أه، بس مقالش لأ برضه. كان مصدوم تمامًا. الصاحبين اتكلموا أكتر من ساعة. ليو وراه الأرقام، والإمكانيات. هو مكنش بيبيع فكرة بس؛ هو كان بيبيع شراكة.
"أنا محتاج أتكلم مع مراتي، سارة،" بن قال أخيرًا. "ده قرار ضخم. بيأثر عليها هي كمان. ممكن تديني الويك إند أفكر فيه؟"
"أكيد،" ليو قال، وهو بيحاول يخبي قلقه. "خد وقتك كله."
الويك إند ده كان أطول ويك إند في حياة ليو. مستقبل "مشروع العنقاء" كله كان بيعتمد على قرار بن. كل اللي كان يقدر يعمله هو إنه يستنى.

يوم الأحد بالليل، تليفون ليو رن. كان بن. قلب ليو وقف.
"ألو؟"
"إيه يا ليو. أنا." صوت بن كان جاد.
"ها...؟" ليو مقدرش يستنى أكتر.
كان فيه وقفة. "ها... سارة وأنا اتكلمنا طول الويك إند. بصينا على وضعنا المالي. اتكلمنا في المخاطر. اتكلمنا في المستقبل."
ليو حبس أنفاسه. هي دي اللحظة.
"وعندنا سؤال واحد ليك،" بن قال.
"أي حاجة."
"نبدأ إمتى؟"`},{lesson_number:15,text:`"When do we start?" I couldn't believe it. I literally jumped out of my chair. "Are you serious? Are you really in?" I could hear the smile in Ben's voice. "I'm serious. But I have conditions. We need to be partners. Fifty-fifty. We make all the big decisions together. And we need to register the company properly, right from the start." "Done! Yes! Anything!" I was shouting now, I couldn't help it. The feeling was indescribable. For the past month, it was "my" project. "My" dream. Suddenly, it wasn't mine anymore. It was "ours." The Phoenix Project finally had a team. It was real. We were real.

Three weeks later, Leo and Ben walked into Sarah Jenkins's office together. They looked different. They looked like a team. They had spent the weeks working nonstop, not on the code, but on a business plan. "Ms. Jenkins," Leo said confidently. "I'd like you to meet my co-founder, Ben Carter." Sarah shook Ben's hand, studying him with her sharp eyes. Ben didn't flinch. He handed her a thin folder. "This is our formal business plan, our company registration, and our financial projections for the first two years." Sarah spent twenty minutes reviewing the documents, asking tough questions. Ben answered every single one with calm, clear data. Finally, she closed the folder, looked at both of them, and for the first time, she smiled. A real smile. "Gentlemen," she said. "Welcome to the portfolio. Let's build a company."`,translation:`"نبدأ إمتى؟" أنا مصدقتش نفسي. نطيت من على الكرسي حرفيًا. "أنت بتتكلم بجد؟ أنت فعلًا معايا؟"
كنت سامع الابتسامة في صوت بن. "أنا بتكلم بجد. بس عندي شروط. إحنا لازم نكون شركاء. خمسين-خمسين. ناخد كل القرارات الكبيرة مع بعض. ولازم نسجل الشركة رسمي، من الأول خالص."
"تم! أه! أي حاجة!" كنت بزعق دلوقتي، مقدرتش أمنع نفسي. الإحساس كان لا يوصف. للشهر اللي فات، كان "مشروعي". "حلمي". فجأة، مبقاش بتاعي لوحدي. بقى "بتاعنا".
"مشروع العنقاء" أخيرًا بقى له فريق. الموضوع بقى حقيقي. إحنا بقينا حقيقيين.

بعد تلات أسابيع، ليو وبن دخلوا مكتب سارة جينكينز مع بعض. شكلهم كان مختلف. شكلهم كان فريق. كانوا قضوا الأسابيع دي شغالين بدون توقف، مش على الكود، لكن على خطة عمل.
"مدام جينكينز،" ليو قال بثقة. "أحب أقدملك شريكي المؤسس، بن كارتر."
سارة سلمت على بن، وهي بتدرسه بعينيها الحادة. بن مهتزش. إداها ملف رفيع.
"دي خطة العمل الرسمية بتاعتنا، وتسجيل الشركة، وتوقعاتنا المالية لأول سنتين." سارة قضت عشرين دقيقة بتراجع المستندات، بتسأل أسئلة صعبة. بن جاوب على كل واحد منهم ببيانات هادية وواضحة.
أخيرًا، قفلت الملف، وبصت عليهم هما الاتنين، ولأول مرة، ابتسمت. ابتسامة حقيقية. "يا سادة،" قالت. "أهلًا بيكم في الملف الاستثماري. يلا نبني شركة."`},{lesson_number:16,text:`The meeting ended. As they were leaving, Sarah's assistant handed Ben an envelope. Inside was a check. There was no number written on it yet, just a signature. "Our finance department will contact you tomorrow to finalize the initial investment amount based on your projections," the assistant explained. "Congratulations, gentlemen." Leo and Ben walked out of the building and into the bright afternoon sun. They didn't speak for a full minute. Leo looked at Ben, who was holding the envelope as if it were made of glass. A blank check. It was a symbol of trust. A symbol of the immense pressure that was just beginning. They weren't just two friends with an idea anymore. They were a real company with a real investor to answer to.

My apartment was not a place to build a company. We needed a proper workspace. Not a big, fancy office. Just a room. A space to think, to build, to create. We spent two days searching. We found a small office in an old building. It wasn't perfect. The paint was peeling, and one of the windows didn't close properly. But it had a big whiteboard, great Wi-Fi, and enough space for two desks. And most importantly, it had a door we could close. A place that was ours. The first day we moved in, Ben and I didn't work. We just stood in the empty room, imagining what it would become. "It's not OmniCorp, is it?" I said with a grin. Ben laughed. "No," he said. "It's much better."`,translation:`الاجتماع خلص. وهما خارجين، مساعدة سارة إدت لبن ظرف. جواه كان شيك. مكنش فيه رقم مكتوب لسه، مجرد توقيع.
"قسم المالية عندنا هيكلمكم بكرة عشان يخلصوا مبلغ الاستثمار المبدئي بناءً على توقعاتكم،" المساعدة شرحت. "مبروك يا سادة."
ليو وبن خرجوا من المبنى وطلعوا في شمس العصر الساطعة. متكلموش لمدة دقيقة كاملة.
ليو بص على بن، اللي كان ماسك الظرف كأنه معمول من إزاز. شيك على بياض.
كان رمز للثقة. ورمز للضغط الرهيب اللي كان لسه بيبتدي. هما مبقوش مجرد صاحبين عندهم فكرة. هما بقوا شركة حقيقية عندهم مستثمر حقيقي لازم يردوا عليه.

شقّتي مكنتش مكان ينفع تبني فيه شركة. كنا محتاجين مساحة شغل عدلة. مش مكتب كبير وفخم. مجرد أوضة. مساحة عشان نفكر، ونبني، ونخلق.
قضينا يومين بندور. لقينا مكتب صغير في مبنى قديم. مكنش مثالي. الدهان كان مقشر، وواحد من الشبابيك مكنش بيقفل كويس.
بس كان فيه سبورة بيضا كبيرة، وواي-فاي ممتاز، ومساحة كافية لمكتبين. والأهم من ده كله، كان له باب نقدر نقفله. مكان كان بتاعنا.
أول يوم نقلنا فيه، أنا وبن مشتغلناش. إحنا بس وقفنا في الأوضة الفاضية، بنتخيل هتبقى إيه. "ده مش أومني كورب، صح؟" قلت وأنا ببتسم.
بن ضحك. "لأ،" قال. "ده أحسن بكتير."`},{lesson_number:17,text:`On their first official day of work, Ben grabbed a marker and walked to the whiteboard. "Okay, first things first," he said. "We need to define our roles clearly. No confusion. No stepping on each other's toes." "I agree," Leo said. "I'm the product guy. I'm responsible for the code, the features, the whole user experience. I'm the CTO - Chief Technology Officer." "Good," Ben wrote "Leo - CTO / Product" on the board. "And I'm the business guy. I handle the money, the marketing, the strategy, the communication with Sarah. I'm the CEO - Chief Executive Officer." He wrote "Ben - CEO / Business" on the other side of the board. He drew a line between their names. "We are partners, but we have different responsibilities. Agreed?" "Agreed," Leo said, shaking Ben's hand. It felt official. It felt right.

With their roles defined, the real work began. They had a weekly check-in call with Sarah. In their first call, she was direct and to the point. "I've reviewed your business plan," she said. "It's ambitious. You project a beta version of the app ready for public testing in six months. That is now your official deadline. If you miss this deadline, it will be a very bad sign." Six months. 180 days. It sounded like a lot of time, but Leo knew it wasn't. Building a complete, stable app from nothing was a monumental task. The pressure was on. The clock was officially ticking.`,translation:`في أول يوم شغل رسمي ليهم، بن مسك ماركر ومشي ناحية السبورة البيضا. "تمام، أول حاجة،" قال. "لازم نحدد أدوارنا بوضوح. مفيش لخبطة. مفيش حد يدخل في شغل التاني."
"أنا موافق،" ليو قال. "أنا راجل المنتج. أنا مسؤول عن الكود، والمميزات، وتجربة المستخدم كلها. أنا الـ CTO - المدير التقني التنفيذي."
"حلو،" بن كتب "ليو - CTO / منتج" على السبورة. "وأنا راجل البزنس. أنا بتعامل مع الفلوس، والتسويق، والاستراتيجية، والتواصل مع سارة. أنا الـ CEO - المدير التنفيذي."
كتب "بن - CEO / بزنس" على الناحية التانية من السبورة. ورسم خط بين اسميهم. "إحنا شركاء، بس عندنا مسؤوليات مختلفة. متفقين؟" "متفقين،" ليو قال، وهو بيسلم على بن. الموضوع حس إنه رسمي. حس إنه صح.

ومع تحديد أدوارهم، الشغل الحقيقي بدأ. كان عندهم مكالمة متابعة أسبوعية مع سارة. في أول مكالمة ليهم، كانت مباشرة ومحددة.
"أنا راجعت خطة عملكم،" قالت. "هي طموحة. أنتم متوقعين نسخة تجريبية من الأبلكيشن تكون جاهزة للاختبار العام في ست شهور. ده دلوقتي الموعد النهائي الرسمي بتاعكم. لو فاتكم الموعد ده، هتبقى علامة وحشة أوي."
ست شهور. 180 يوم. كان يبان إنه وقت طويل, بس ليو كان عارف إنه لأ.
بناء أبلكيشن كامل ومستقر من العدم كانت مهمة ضخمة. الضغط بدأ. والعد التنازلي بدأ رسميًا.`},{lesson_number:18,text:`The next three months were a blur. I've never worked so hard in my life. I would arrive at the office before sunrise and leave long after sunset. Sleep became a luxury. Food was whatever was fast and cheap. My entire world shrank to the size of my laptop screen. Some days were great. I would solve a difficult coding problem or build a new feature that worked perfectly. On those days, I felt like a genius. I felt invincible. But other days were terrible. A single bug could waste an entire day. Progress felt slow, almost impossible. On those days, I would be full of doubt. I'd think, "What have I done? I left a good job for this stress, for this uncertainty." It was a constant up-and-down, a rollercoaster of creation and frustration.

While Leo was lost in the world of code, Ben was building the other half of the company. His days were filled with phone calls, spreadsheets, and meetings. He was creating financial models, researching marketing strategies, and writing content for their future website. He was also the person who made sure the company actually functioned. He ordered the coffee. He paid the rent for the office. He handled all the paperwork. It wasn't glamorous work, but it was absolutely essential. Sometimes, Leo would be so focused on his screen he would forget to eat. Ben would quietly leave a sandwich on his desk and go back to his own work. They didn't talk much during these months, but they were working in perfect sync.`,translation:`التلات شهور اللي بعد كده كانوا ضباب. عمري ما اشتغلت بالجدية دي في حياتي. كنت بوصل المكتب قبل الشروق وأمشي بعد المغرب بكتير.
النوم بقى رفاهية. الأكل كان أي حاجة سريعة ورخيصة. عالمي كله اتقلص لحجم شاشة اللابتوب بتاعتي.
كان فيه أيام حلوة. كنت بحل مشكلة كود صعبة أو أبني ميزة جديدة وتشتغل بشكل مثالي. في الأيام دي، كنت بحس إني عبقري. كنت بحس إني لا أُقهر.
بس كان فيه أيام تانية وحشة أوي. بج واحد ممكن يضيع يوم كامل. التقدم كان بيحس إنه بطيء، شبه مستحيل. في الأيام دي، كنت ببقى مليان شك.
كنت بفكر، "أنا عملت إيه؟ أنا سبت شغلانة كويسة عشان التوتر ده، عشان عدم اليقين ده." كانت طالعة نازلة مستمرة، زي الأفعوانية بين الخلق والإحباط.

في الوقت اللي ليو كان غرقان فيه في عالم الكود، بن كان بيبني النص التاني من الشركة.
أيامه كانت مليانة مكالمات تليفون، وملفات إكسل، واجتماعات. كان بيعمل نماذج مالية، وبيبحث في استراتيجيات التسويق، وبيكتب محتوى للموقع بتاعهم المستقبلي.
هو كمان كان الشخص اللي بيتأكد إن الشركة شغالة فعلًا. هو اللي بيطلب القهوة. هو اللي بيدفع إيجار المكتب. هو اللي بيتعامل مع كل الورق.
ده مكنش شغل براق، بس كان ضروري جدًا جدًا. أحيانًا، ليو كان بيبقى مركز أوي في شاشته لدرجة إنه بينسى ياكل.
بن كان بيسيبله ساندوتش على مكتبه بهدوء ويرجع لشغله. متكلموش كتير خلال الشهور دي، بس كانوا شغالين في تناغم تام.`},{lesson_number:19,text:`Three months before the deadline, they had their first big fight. Leo was working on a key feature, a complex algorithm for personalizing the learning experience. "It's taking too long, Leo," Ben said, looking at the project timeline on the whiteboard. "This feature is putting us two weeks behind schedule." "It has to be perfect, Ben!" Leo argued, his voice rising. "This is the core of the app! It's what makes us special!" "A perfect feature in a late product is useless!" Ben countered, his own voice tense. "We need to simplify it. Launch a basic version now and improve it later. We have to meet the deadline." "You don't understand the technical side!" Leo shot back. "It's not that simple!" "And you don't understand the business side!" Ben replied. "Our promise to our investor is the most important thing right now!"

We didn't speak for the rest of the day. The silence in our small office was heavy. I was angry. Ben didn't appreciate the complexity of my work. All he cared about were his charts and deadlines. But as the hours passed, my anger started to cool. I looked at the whiteboard. He was right. We were behind schedule. Sarah's words echoed in my head: "If you miss this deadline..." I hated the idea of simplifying my beautiful feature. It felt like a compromise. But maybe he was right. Maybe a finished, "good enough" product was better than a perfect, unfinished one. This was a hard lesson. Building a business wasn't just about writing perfect code. It was about making tough choices.`,translation:`قبل الموعد النهائي بتلات شهور، حصلت أول خناقة كبيرة بينهم. ليو كان شغال على ميزة أساسية، خوارزمية معقدة لتخصيص تجربة التعلم.
"الموضوع بياخد وقت أطول من اللازم يا ليو،" بن قال، وهو بيبص على الجدول الزمني للمشروع على السبورة. "الميزة دي مأخرانا أسبوعين عن الجدول."
"لازم تبقى مثالية يا بن!" ليو احتج، وصوته بيعلى. "ده هو جوهر الأبلكيشن! ده اللي بيخلينا مميزين!"
"ميزة مثالية في منتج متأخر ملهاش لازمة!" بن رد، وصوته متوتر هو كمان. "إحنا لازم نبسطها. نطلق نسخة أساسية دلوقتي ونحسنها بعدين. إحنا لازم نلتزم بالموعد النهائي."
"أنت مش فاهم الناحية التقنية!" ليو رد بعنف. "الموضوع مش بالبساطة دي!"
"وأنت مش فاهم الناحية التجارية!" بن رد. "وعدنا للمستثمرة بتاعتنا هو أهم حاجة دلوقتي!"

متكلمناش بقية اليوم. السكوت في مكتبنا الصغير كان تقيل. أنا كنت غضبان. بن مش بيقدر تعقيد شغلي. كل اللي همه الرسوم البيانية بتاعته والمواعيد النهائية.
بس مع مرور الساعات، غضبي بدأ يهدى. بصيت على السبورة. هو كان عنده حق. إحنا متأخرين عن الجدول. وكلمات سارة رنت في وداني: "لو فاتكم الموعد ده..."
كرهت فكرة تبسيط ميزتي الجميلة. حسيت إنها تنازل. بس يمكن هو كان عنده حق. يمكن منتج خلصان و"كويس كفاية" أحسن من منتج مثالي ومش خلصان.
ده كان درس صعب. بناء بزنس مكنش مجرد كتابة كود مثالي. كان عن اتخاذ قرارات صعبة.`},{lesson_number:20,text:`The next morning, Leo walked into the office. Ben was already there, looking tired. "Hey," Leo said quietly. "Hey," Ben replied. "Look," Leo started, "you were right. We're behind schedule. And you're right that we can't miss the deadline. I spent all night thinking about it. There's a way. I can build a simpler version of the feature for now. It will work, but it won't be as 'smart'. We can add the more complex parts in an update after we launch." Ben looked relieved. "Thank you, Leo. I know how much that feature means to you." "And you were wrong about one thing," Leo added, with a small smile. "What's that?" Ben asked. "I do understand the business side. It's just... hard sometimes."

That fight, as difficult as it was, made their partnership stronger. They learned how to disagree, how to argue, and most importantly, how to find a compromise. They understood that "Product" and "Business" were not two separate things; they were two sides of the same coin. With their new, simplified plan, they worked even harder. They were a team again. Not just in title, but in practice. They were united by a common goal: hitting that six-month deadline. They had to prove to Sarah, and to themselves, that they could do it.`,translation:`تاني يوم الصبح، ليو دخل المكتب. بن كان هناك فعلًا، وشكله تعبان. "صباح الخير،" ليو قال بهدوء. "صباح النور،" بن رد.
"بص،" ليو بدأ، "أنت كنت صح. إحنا متأخرين. وأنت صح إننا مينفعش نفوت الميعاد. قضيت الليل كله بفكر في الموضوع. فيه طريقة. أنا ممكن أبني نسخة أبسط من الميزة دلوقتي. هتشتغل، بس مش هتبقى 'ذكية' أوي. ممكن نضيف الأجزاء الأعقد في تحديث بعد ما نطلق."
بن حس بالراحة. "شكرًا يا ليو. أنا عارف قد إيه الميزة دي بتعنيلك." "وأنت كنت غلطان في حاجة واحدة،" ليو أضاف، بابتسامة صغيرة.
"إيه هي دي؟" بن سأل.
"أنا فاهم الناحية التجارية. هي بس... بتبقى صعبة ساعات."

الخناقة دي، على قد ما كانت صعبة، خلت شراكتهم أقوى. اتعلموا إزاي يختلفوا، وإزاي يتخانقوا، والأهم من كل ده، إزاي يلاقوا حل وسط.
فهموا إن "المنتج" و "البزنس" مش حاجتين منفصلين؛ هما وجهين لعملة واحدة.
بخطتهم الجديدة المبسطة، اشتغلوا بجدية أكبر. بقوا فريق تاني. مش بالاسم بس، لكن بالفعل.
كانوا متحدين بهدف مشترك: الالتزام بمعاد الست شهور ده. كانوا لازم يثبتوا لسارة، ولنفسهم، إنهم يقدروا يعملوها.`},{lesson_number:21,text:`The final month before the beta launch deadline was a storm of activity. The office was a mess of empty coffee cups, pizza boxes, and notes scribbled on every available surface. Leo and Ben were in the final push. Leo was fixing bugs – small errors in the code that caused the app to crash or behave unexpectedly. He was also polishing the user interface, making sure every button and menu was clean, simple, and intuitive. Meanwhile, Ben was preparing for the launch. He wrote the text for the app store, created a simple landing page, and started reaching out to a small group of people – friends, family, and tech bloggers – to be their first beta testers. This was a critical phase. They didn't just need a working product; they needed people to actually use it.

It was the night before the deadline. The app was finished. Or, as finished as it could be. I knew it wasn't perfect. There were probably a hundred small things I still wanted to change. But it was stable. It was functional. It was ready. Ben and I were the only two people in the entire office building. It was almost midnight. "Ready?" Ben asked, looking at me. My finger hovered over the mouse. The button on the screen said "Submit to App Store." It was a simple click, but it felt like jumping off a cliff. For six months, the Phoenix Project was our secret. Tomorrow, it would be out in the world, for anyone to judge. I took a deep breath. "Ready," I said. And I clicked.`,translation:`آخر شهر قبل معاد إطلاق النسخة التجريبية كان عاصفة من النشاط. المكتب كان متبهدل بكوبايات قهوة فاضية، وعلب بيتزا، وملاحظات مكتوبة بسرعة على أي سطح متاح.
ليو وبن كانوا في الدفعة الأخيرة. ليو كان بيصلح 'بجات' – أخطاء صغيرة في الكود بتخلي الأبلكيشن يقف أو يتصرف بشكل غريب. كان كمان بيلمع واجهة المستخدم، بيتأكد إن كل زرار وقايمة شكلهم نظيف، وبسيط، وسهل الاستخدام.
في نفس الوقت، بن كان بيحضر للإطلاق. كتب النص لمتجر التطبيقات، وعمل صفحة هبوط بسيطة، وبدأ يتواصل مع مجموعة صغيرة من الناس – صحاب، قرايب، ومدونين تقنيين – عشان يكونوا أول مختبرين للنسخة التجريبية.
دي كانت مرحلة حرجة. هما مش بس محتاجين منتج شغال؛ هما محتاجين ناس تستخدمه فعلًا.

كانت الليلة اللي قبل الموعد النهائي. الأبلكيشن خلص. أو يعني، خلص على قد ما يقدر. كنت عارف إنه مش مثالي. كان فيه يمكن ميت حاجة صغيرة لسه عايز أغيرها. بس هو كان مستقر. كان عملي. كان جاهز.
أنا وبن كنا الوحيدين في مبنى المكاتب كله. الساعة كانت داخلة على اتناشر بالليل.
"جاهز؟" بن سأل، وهو بيبصلي. صباعي كان بيحوم فوق الماوس. الزرار على الشاشة كان مكتوب عليه "إرسال لمتجر التطبيقات."
كانت مجرد ضغطة، بس حسيت كأني بنط من على جرف. لمدة ست شهور، "مشروع العنقاء" كان سرنا. بكرة، هيبقى في العالم، عشان أي حد يحكم عليه.
خدت نفس عميق. "جاهز،" قلت. ودوست.`},{lesson_number:22,text:`After submitting the app, there was nothing to do but wait. The app store review process could take a few days. The office, which had been a hive of activity, was now eerily quiet. All the energy, all the stress of the past six months had led to this moment of complete stillness. Leo and Ben both went home to get some much-needed sleep. But neither of them could really rest. They kept checking their phones, waiting for a notification. The feeling was a strange mix of excitement and absolute terror. They had done their part. Now, the fate of their project was in someone else's hands.

Two days later, Leo was making breakfast when his phone buzzed. It was an email. The subject line was: "Your app status is: Ready for Sale." His hands were shaking as he called Ben. "Ben! We're in! The app is live!" "Oh my god. Seriously?" Ben sounded like he had just woken up. "Yes! I just got the email! It's approved! People can download it right now!" There was a moment of pure, joyful silence. "Well," Ben finally said, a laugh in his voice. "I guess we should tell people about it." "Yeah," Leo laughed back. "That's probably a good idea." The waiting game was over. A new, much scarier game was about to begin.`,translation:`بعد ما بعتوا الأبلكيشن، مكنش فيه حاجة تتعمل غير الانتظار. عملية مراجعة متجر التطبيقات ممكن تاخد كام يوم.
المكتب، اللي كان خلية نحل، بقى هادي بشكل غريب. كل الطاقة، وكل التوتر بتاع الست شهور اللي فاتوا وصلوا للحظة السكون التام دي.
ليو وبن روحوا بيوتهم عشان يناموا نوم كانوا محتاجينه أوي. بس محدش فيهم عرف يرتاح بجد.
فضلوا يبصوا على موبايلاتهم، مستنيين إشعار. الإحساس كان خليط غريب بين الحماس والرعب المطلق.
هما عملوا اللي عليهم. دلوقتي، مصير مشروعهم في إيد حد تاني.

بعد يومين، ليو كان بيعمل فطار لما تليفونه رن. كان إيميل. عنوانه كان: "حالة تطبيقك هي: جاهز للبيع."
إيديه كانت بتترعش وهو بيكلم بن. "بن! إحنا اتقبلنا! الأبلكيشن بقى موجود!" "يا إلهي. بجد؟" بن صوته كان كأنه لسه صاحي.
"أه! لسه الإيميل جايلي! اتقبل! الناس تقدر تنزله دلوقتي!" كان فيه لحظة صمت من الفرحة الصافية.
"طيب،" بن قال أخيرًا، والضحكة في صوته. "أعتقد المفروض نقول للناس عنه."
"أه،" ليو رد وهو بيضحك. "دي غالبًا فكرة كويسة." لعبة الانتظار خلصت. لعبة جديدة، ومرعبة أكتر، كانت على وشك تبدأ.`},{lesson_number:23,text:`Ben sent out the email to our list of beta testers. One hundred people. Friends, old colleagues, and a few bloggers who agreed to try it. And then, we watched. We had a real-time analytics screen set up. It showed us how many people were downloading and using the app. The first download happened. Then a second. Then ten. Then fifty. My heart was pounding with every new number. These weren't just numbers. They were real people. Real people opening our app, creating accounts, and trying to learn something. It was the most incredible and nerve-wracking feeling I've ever had. Our idea, our "Phoenix Project," was no longer in our office. It was on people's phones, all over the country.

Along with the downloads came the first wave of feedback. Ben had set up a simple feedback form inside the app. The comments started pouring in. Most of it was positive. "This is amazing! I've learned more guitar in one day than in a whole month!" one user wrote. "The design is so clean and easy to use. I love it!" wrote another. Leo and Ben read every single comment, smiling. Their idea was working. People understood their vision. The long nights and the stressful days were all worth it.`,translation:`بن بعت الإيميل لقائمة المختبرين التجريبيين بتاعتنا. ميت شخص. صحاب، زملاء قدام، وكام مدون وافقوا يجربوه.
وبعدين، قعدنا نتفرج. كنا مجهزين شاشة تحليل لحظية. كانت بتورينا كام واحد بينزل وبيستخدم الأبلكيشن.
أول تحميل حصل. بعدين واحد تاني. بعدين عشرة. بعدين خمسين. قلبي كان بيدق مع كل رقم جديد.
دي مكنتش مجرد أرقام. دول كانوا ناس حقيقيين. ناس حقيقيين بيفتحوا الأبلكيشن بتاعنا، بيعملوا حسابات، وبيحاولوا يتعلموا حاجة.
ده كان أروع وأوتر إحساس حسيته في حياتي. فكرتنا، "مشروع العنقاء" بتاعنا، مبقاش في مكتبنا. بقى على تليفونات الناس، في كل حتة في البلد.

ومع التحميلات جت أول موجة من ردود الفعل. بن كان عمل استمارة رأي بسيطة جوه الأبلكيشن. التعليقات بدأت تنهال.
معظمها كان إيجابي. "ده مدهش! اتعلمت جيتار في يوم واحد أكتر من شهر كامل!" واحد من المستخدمين كتب.
"التصميم نظيف أوي وسهل الاستخدام. حبيته!" واحد تاني كتب.
ليو وبن قروا كل تعليق، وهما مبتسمين. فكرتهم كانت شغالة. الناس فهمت رؤيتهم. الليالي الطويلة والأيام المجهدة كلهم كانوا يستاهلوا.`},{lesson_number:24,text:`But then came another kind of feedback. An email with the subject line "CRITICAL BUG." It was from a user trying the app on a slightly older Android phone model. The email read: "Hi, I love the idea of your app, but I can't use it. Every time I try to complete the first lesson, the app just crashes and closes. Please fix!" Leo's face went pale. A crash bug. This was serious. "How could we miss this?" Leo said, already typing furiously, trying to replicate the problem. "We can't test on every single phone in the world, Leo," Ben said calmly. "This is normal for a beta launch. What's important is how we respond. What's the plan?"

The plan was simple: find the bug and fix it. Fast. A bug that crashes the app can kill a new product before it even has a chance. Leo and Ben worked through the night. It was a frustrating and difficult process. The bug didn't happen on any of their test devices. Leo had to write special code just to simulate the older phone's environment. Ben was in constant communication with the user, getting more details about the problem. Finally, at 4 AM, Leo found it. It was one single, tiny line of code that was incompatible with the older phone's operating system. It was an easy fix, but it had been incredibly hard to find.`,translation:`بس بعدها جه نوع تاني من ردود الفعل. إيميل عنوانه "بج خطير."
كان من مستخدم بيجرب الأبلكيشن على موديل تليفون أندرويد أقدم شوية.
الإيميل كان بيقول: "أهلاً، أنا حبيت فكرة الأبلكيشن بتاعكم، بس مش عارف أستخدمه. كل ما أحاول أخلص أول درس، الأبلكيشن بيقفل لوحده. لو سمحتم صلحوه!"
وش ليو بهت. بج بيقفل الأبلكيشن. ده موضوع خطير. "إزاي ده فات علينا؟" ليو قال، وهو بالفعل بيكتب بسرعة جنونية، بيحاول يكرر المشكلة.
"إحنا منقدرش نختبر على كل تليفون في العالم يا ليو،" بن قال بهدوء. "ده طبيعي في إطلاق تجريبي. المهم هو إحنا هنتصرف إزاي. إيه الخطة؟"

الخطة كانت بسيطة: نلاقي البج ونصلحه. بسرعة. بج بيقفل الأبلكيشن ممكن يموت منتج جديد قبل ما ياخد فرصة أصلًا.
ليو وبن طبقوا طول الليل. كانت عملية محبطة وصعبة. البج مكنش بيحصل على أي جهاز من أجهزتهم الاختبارية.
ليو اضطر يكتب كود مخصوص بس عشان يحاكي بيئة التليفون الأقدم. بن كان على تواصل مستمر مع المستخدم، بياخد منه تفاصيل أكتر عن المشكلة.
أخيرًا، الساعة 4 الصبح، ليو لقاه. كان سطر كود واحد، صغير جدًا، مكنش متوافق مع نظام تشغيل التليفون الأقدم. كان تصليح سهل، بس كان صعب جدًا تلاقيه.`},{lesson_number:25,text:`I fixed the bug and we submitted an update to the app store. It would be live in a day or two. But I knew that wasn't enough. The user who reported the problem was frustrated. We needed to do more than just fix the code. We needed to fix the relationship. I wrote a personal email back to the user. "Hi [User's Name]," I wrote. "This is Leo, the co-founder and lead engineer of SkillUp. First, I want to say thank you so much for your detailed feedback. Because of you, we found a critical bug. I am so sorry for the frustration it caused. I worked through the night, and I have personally fixed the issue. An update is on its way. As a small thank you, we've given your account a lifetime free premium subscription. We couldn't do this without users like you." I clicked send. This felt just as important as fixing the bug.

The user's reply came back an hour later. "Wow. I have never received a response like this from a company before. You have a customer for life. I'll be telling all my friends about SkillUp." Leo showed the email to Ben. They both knew they had just learned one of the most valuable lessons in business. Your first users are not just numbers on a screen. They are your community. They are your biggest critics and your most passionate advocates. How you treat them in a moment of failure defines your company far more than how you celebrate a moment of success. The beta launch was already a success, not because the app was perfect, but because they were learning.`,translation:`صلحت البج وبعتنا تحديث لمتجر التطبيقات. هينزل في خلال يوم أو يومين. بس أنا كنت عارف إن ده مش كفاية. المستخدم اللي بلغ عن المشكلة كان محبط. كنا محتاجين نعمل أكتر من مجرد تصليح الكود. كنا محتاجين نصلح العلاقة.
كتبت إيميل شخصي للمستخدم. "أهلاً [اسم المستخدم]،" كتبت. "معاك ليو، الشريك المؤسس والمهندس المسؤول في SkillUp. أولًا، عايز أقولك شكرًا جدًا على ملاحظاتك التفصيلية. بسببك، إحنا لقينا بج خطير. أنا آسف جدًا على الإحباط اللي سببهولك. أنا طبقت طول الليل، وصلحت المشكلة بنفسي. فيه تحديث في الطريق. وكشكر بسيط، إحنا إدينا حسابك اشتراك بريميوم مدى الحياة مجانًا. إحنا منقدرش نعمل ده من غير مستخدمين زيك."
دوست إرسال. حسيت إن ده مهم بنفس قدر أهمية تصليح البج.

رد المستخدم رجع بعد ساعة. "واو. أنا عمري ما جالي رد زي ده من شركة قبل كده. أنت كسبت عميل مدى الحياة. أنا هقول لكل صحابي عن SkillUp."
ليو ورى الإيميل لبن. هما الاتنين كانوا عارفين إنهم لسه متعلمين واحد من أهم الدروس في البزنس.
أول مستخدمين ليك مش مجرد أرقام على شاشة. هما مجتمعك. هما أكبر منتقدين ليك وأكتر مؤيدين ليك شغفًا.
إزاي بتعاملهم في لحظة فشل بيحدد شركتك أكتر بكتير من إزاي بتحتفل بلحظة نجاح. الإطلاق التجريبي كان نجاح فعلًا، مش عشان الأبلكيشن كان مثالي، لكن عشان هما كانوا بيتعلموا.`},{lesson_number:26,text:`The beta launch was a success with their small, friendly group of 100 testers. They fixed the major bugs, collected valuable feedback, and improved the app. But now, they faced a new, much bigger challenge. How do they go from 100 users to 1,000? Or 10,000? Their initial funding from Sarah gave them a safety net, but it wasn't a huge amount. They couldn't afford expensive TV commercials or big advertisements. They needed a smarter, more cost-effective way to grow. They needed a real marketing plan.

Ben stood in front of the big whiteboard, which was now covered in marketing ideas. "Okay, so our budget is limited," he began. "We can't compete with the big guys on spending. So, we have to compete by being smarter and more authentic." "What does that mean in practice?" Leo asked, leaning back in his chair. "It means we focus on two things," Ben said, drawing two circles on the board. "First, social media. Not by paying for ads, but by creating genuinely useful and interesting content. Little videos, tutorials, success stories. Second, we find our 'true fans' - the people who love our app, like that user who found the bug - and we empower them. We give them reasons to talk about us to their friends." "So our marketing is... not really marketing?" Leo said. "Exactly," Ben smiled. "It's community building."`,translation:`الإطلاق التجريبي كان نجاح مع مجموعتهم الصغيرة الودودة من 100 مختبر. صلحوا البجات الكبيرة، وجمعوا آراء قيمة، وحسنوا الأبلكيشن.
بس دلوقتي، واجهوا تحدي جديد، أكبر بكتير. إزاي ينتقلوا من 100 مستخدم لـ 1000؟ أو 10,000؟
تمويلهم المبدئي من سارة إداهم شبكة أمان، بس مكنش مبلغ ضخم. مقدروش يتحملوا تكلفة إعلانات تليفزيون غالية أو إعلانات كبيرة.
كانوا محتاجين طريقة أذكى، وأكتر فعالية من حيث التكلفة عشان يكبروا. كانوا محتاجين خطة تسويق حقيقية.

بن وقف قدام السبورة البيضا، اللي كانت متغطية بأفكار تسويق دلوقتي. "تمام، يبقى ميزانيتنا محدودة،" بدأ. "منقدرش ننافس الكبار في الصرف. عشان كده، لازم ننافس بإننا نكون أذكى وأكتر أصالة."
"ده معناه إيه عمليًا؟" ليو سأل، وهو ساند بضهره على الكرسي. "ده معناه إننا نركز على حاجتين،" بن قال، وهو بيرسم دايرتين على السبورة. "أولًا، السوشيال ميديا. مش بإننا ندفع لإعلانات، لكن بإننا نخلق محتوى مفيد ومثير للاهتمام بجد. فيديوهات صغيرة، دروس، قصص نجاح. ثانيًا، نلاقي 'معجبينا الحقيقيين' - الناس اللي بيحبوا الأبلكيشن بتاعنا، زي المستخدم اللي لقى البج - ونديهم القوة. نديهم أسباب عشان يتكلموا عننا مع صحابهم."
"يعني تسويقنا هو... مش تسويق فعلًا؟" ليو قال. "بالظبط،" بن ابتسم. "هو بناء مجتمع."`},{lesson_number:27,text:`Ben decided to start with a simple video. He used his phone to record a one-minute interview with Leo. He asked him a simple question: "What was the single hardest bug you had to fix so far?" Leo talked about the all-nighter, the frustration, and the final moment of discovery. He was honest and a little bit nerdy. Ben posted the video on Twitter with a simple caption: "The tough, behind-the-scenes life of a startup founder. #indiedev #startup" They didn't expect much. But something surprising happened. The video started to get shared. People in the tech community loved its honesty. It wasn't a polished marketing video. It was real. Within 24 hours, it had over 50,000 views. And more importantly, downloads for SkillUp tripled.

That small taste of success was exciting. It felt like we were finally moving in the right direction. We were getting hundreds of new users every day. And then, I got an email. An email that made my blood run cold. The sender was a lawyer. The subject line was: "Cease and Desist Notification regarding your app, SkillUp." My hands started shaking as I read it. The email was from OmniCorp. My old company. They were claiming that the idea for SkillUp was developed while I was still their employee, and therefore, they owned the intellectual property. They demanded that I shut down the app immediately. I felt like I couldn't breathe. They were trying to take my dream away.`,translation:`بن قرر يبدأ بفيديو بسيط. استخدم تليفونه عشان يسجل مقابلة مدتها دقيقة مع ليو.
سأله سؤال بسيط: "إيه أصعب بج اضطريت تصلحه لحد دلوقتي؟"
ليو اتكلم عن الليلة اللي طبق فيها، وعن الإحباط، ولحظة الاكتشاف الأخيرة. كان صريح وشوية 'نيرد'.
بن نشر الفيديو على تويتر مع تعليق بسيط: "حياة مؤسس الشركة الناشئة الصعبة ورا الكواليس. #مطور_مستقل #شركة_ناشئة"
متوقعوش كتير. بس حاجة مفاجئة حصلت. الفيديو بدأ يتشير. الناس في مجتمع التكنولوجيا حبوا صراحته.
ده مكنش فيديو تسويق متلمع. ده كان حقيقي. في خلال 24 ساعة، كان جاب أكتر من 50,000 مشاهدة.
والأهم، تحميلات SkillUp زادت تلات أضعاف.

الدفعة الصغيرة دي من النجاح كانت مثيرة. حسينا إننا أخيرًا ماشيين في الاتجاه الصح. كنا بنكسب مئات المستخدمين الجداد كل يوم.
وبعدين، جالي إيميل. إيميل خلى دمي يتجمد. المرسل كان محامي.
عنوانه كان: "إخطار بالإيقاف والكف بخصوص تطبيقكم، SkillUp."
إيدي بدأت تترعش وأنا بقراه. الإيميل كان من أومني كورب. شركتي القديمة.
كانوا بيدعوا إن فكرة SkillUp اتطورت وأنا لسه موظف عندهم، وبالتالي، هما اللي بيملكوا الملكية الفكرية.
طالبوا إني أقفل الأبلكيشن فورًا. حسيت إني مش عارف أتنفس. كانوا بيحاولوا ياخدوا حلمي.`},{lesson_number:28,text:`Leo immediately showed the email to Ben. Ben read it slowly, his face becoming more and more serious. "This is a scare tactic, Leo," he said, but he didn't sound completely convinced. "Is it? What if they're right?" Leo's voice was full of panic. "I did have the first spark of the idea while I was working there! I mean, I was in the park, on my lunch break, but does that matter?" "Of course it matters," Ben said, trying to be calm. "You didn't use their equipment. You didn't use their time. They have no real case. They are just trying to bully us because our small app is starting to get some attention." "So what do we do?" Leo asked. "We can't afford to fight a giant company like OmniCorp in court!"

Ben knew they couldn't fight OmniCorp alone. They needed legal help, and they needed it now. There was only one person they could turn to. They scheduled an urgent meeting with Sarah Jenkins. They showed her the "Cease and Desist" letter. She read it without changing her expression. When she finished, she put the letter down on the table. "This is predictable," she said calmly. "Big companies hate competition. They use their lawyers like weapons to crush small startups before they can grow." She looked at Leo and Ben, who were both visibly stressed. "Don't worry," she said. "This is my problem now, not just yours. My investment came with a promise: I help you navigate these kinds of storms. My legal team will handle this."`,translation:`ليو ورى الإيميل لبن فورًا. بن قراه ببطء، ووشه بيتحول لجدي أكتر وأكتر. "ده أسلوب تخويف يا ليو،" قال، بس مكنش باين عليه مقتنع تمامًا.
"هو فعلًا؟ طب لو هما صح؟" صوت ليو كان كله ذعر. "أنا فعلًا أول شرارة للفكرة جتلي وأنا شغال هناك! قصدي، كنت في الجنينة، في استراحة الغدا، بس ده يفرق؟"
"أكيد يفرق،" بن قال، وهو بيحاوليبقى هادي. "أنت مستخدمتش أجهزتهم. مستخدمتش وقتهم. هما معندهمش قضية حقيقية. هما بس بيحاولوا يبلطجوا علينا عشان الأبلكيشن الصغير بتاعنا بدأ يلفت الانتباه."
"طيب نعمل إيه؟" ليو سأل. "إحنا منقدرش نحارب شركة عملاقة زي أومني كورب في المحاكم!"

بن كان عارف إنهم ميقدروش يحاربوا أومني كورب لوحدهم. كانوا محتاجين مساعدة قانونية، ومحتاجينها دلوقتي. مكنش فيه غير شخص واحد يقدروا يلجأوا له.
حددوا اجتماع طارئ مع سارة جينكينز. وروها جواب "الإيقاف والكف". قريته من غير ما تعابير وشها تتغير.
لما خلصت، حطت الجواب على الترابيزة. "ده متوقع،" قالت بهدوء.
"الشركات الكبيرة بتكره المنافسة. بيستخدموا محامينهم زي الأسلحة عشان يسحقوا الشركات الناشئة الصغيرة قبل ما تكبر."
بصت على ليو وبن، اللي كانوا متوترين بشكل واضح. "متقلقوش،" قالت. "دي مشكلتي أنا دلوقتي, مش بس مشكلتكم. استثماري جه مع وعد: أنا بساعدكم تعدوا العواصف اللي زي دي. فريقي القانوني هيتواصل مع ده."`},{lesson_number:29,text:`While Sarah's lawyers dealt with OmniCorp, Ben told me to ignore the threat and focus on the product. "The best way to fight them is to succeed," he said. So, I went back to work, trying to push the legal battle out of my mind. We had thousands of new users now, and for the first time, we had enough data to analyze. I spent a week just looking at how people used our app. What features did they love? Where did they get stuck? Where did they quit? The data was fascinating. I discovered that users who completed the first three lessons within 24 hours were 80% more likely to keep using the app. This was a critical insight. Our mission was clear: we had to do everything possible to get a new user to finish those first three lessons.

Armed with this data, Leo completely redesigned the first five minutes of the SkillUp experience. This is called the "onboarding process." He made it more engaging, more like a game. He added encouraging messages and small "wins" for every completed step. He made the first lesson incredibly short and simple, to give users an immediate feeling of accomplishment. He was acting not just as an engineer, but as a psychologist, thinking about user motivation and behavior. This was the real work: not just building features, but building a journey that people wanted to complete.`,translation:`في الوقت اللي محامين سارة بيتعاملوا مع أومني كورب، بن قالي أتجاهل التهديد وأركز على المنتج. "أحسن طريقة نحاربهم بيها هي إننا ننجح،" قال. فرجعت للشغل، بحاول أطلع المعركة القانونية من دماغي.
بقى عندنا آلاف المستخدمين الجداد دلوقتي، ولأول مرة، عندنا بيانات كفاية نحللها. قضيت أسبوع بس ببص على إزاي الناس بتستخدم الأبلكيشن بتاعنا.
إيه المميزات اللي حبوها؟ فين اتعقدوا؟ فين زهقوا وخرجوا؟ البيانات كانت مذهلة.
اكتشفت إن المستخدمين اللي بيخلصوا أول تلات دروس في خلال 24 ساعة، كانوا أكتر عرضة 80% إنهم يكملوا استخدام الأبلكيشن. دي كانت رؤية حرجة.
مهمتنا كانت واضحة: لازم تعمل كل حاجة ممكنة عشان نخلي المستخدم الجديد يخلص أول تلات دروس دول.

بالبيانات دي، ليو صمم أول خمس دقايق من تجربة SkillUp من أول وجديد. دي اسمها "عملية الإعداد" أو "الأونبوردينج".
خلاها جذابة أكتر، أشبه باللعبة. أضاف رسايل تشجيعية و"مكاسب" صغيرة مع كل خطوة بتخلص.
خلى أول درس قصير وبسيط بشكل لا يصدق، عشان يدي المستخدمين إحساس فوري بالإنجاز.
كان بيتصرف مش بس كمهندس، لكن كعالم نفس، بيفكر في دافع المستخدم وسلوكه. ده كان الشغل الحقيقي: مش بس بناء مميزات، لكن بناء رحلة الناس عايزين يكملوها.`},{lesson_number:30,text:`A week later, Sarah called Leo and Ben for another meeting. "I have news about OmniCorp," she said. "My lawyers sent them a very firm response. They know their case is weak. They've backed down from the 'shut down' demand. But they've made an offer." "An offer?" Leo asked, surprised. "Yes," Sarah said. "They have offered to acquire SkillUp." Ben's eyes widened. "To buy us? Already?" "Yes," Sarah confirmed. "For five million dollars." Leo and Ben just stared at each other. Five million dollars. It was an unimaginable amount of money. It was more than either of them had ever dreamed of. It was safety. It was success. It was a way out of all the stress and the risk.

Five million dollars. The number just hung in the air. For that amount of money, I could buy a house. I could travel the world. I would never have to worry about money again. It was a perfect, golden escape hatch from this crazy, stressful journey. All we had to do was say "yes." But then I thought about our users. The ones sending us feedback. The ones getting excited about learning something new. I thought about the feeling I had when I fixed that first bug and the user was so happy. We were building something more than a product. We were building a community. We were helping people. Is success just a dollar amount? Or is it about finishing what you started? I looked at Ben. I could tell he was thinking the same thing. This was a much harder decision than the one about the investor. This was a decision about our soul.`,translation:`بعد أسبوع، سارة كلمت ليو وبن عشان اجتماع تاني. "عندي أخبار عن أومني كورب،" قالت.
"المحامين بتوعي بعتوا لهم رد حازم جدًا. هما عارفين إن قضيتهم ضعيفة. اتراجعوا عن طلب 'الإغلاق'. بس قدموا عرض."
"عرض؟" ليو سأل، متفاجئ. "أه،" سارة قالت. "عرضوا يستحوذوا على SkillUp."
عينين بن وسعت. "يشترونا؟ دلوقتي؟" "أه،" سارة أكدت. "بخمسة مليون دولار."
ليو وبن بصوا لبعض وبس. خمسة مليون دولار. ده كان مبلغ لا يمكن تخيله.
كان أكتر من أي حاجة حلموا بيها. كان أمان. كان نجاح. كان مخرج من كل التوتر والمخاطرة.

خمسة مليون دولار. الرقم فضل متعلق في الهوا. بالمبلغ ده، أنا ممكن أشتري بيت. ممكن أسافر العالم. عمري ما هقلق على الفلوس تاني. كان مخرج هروب مثالي ومُدهّب من الرحلة المجنونة المجهدة دي. كل اللي علينا نعمله نقول "أه".
بس بعدها فكرت في مستخدمينا. الناس اللي بيبعتولنا آراءهم. الناس اللي متحمسين لتعلم حاجة جديدة.
فكرت في الإحساس اللي حسيته لما صلحت أول بج والمستخدم كان مبسوط أوي. إحنا كنا بنبني حاجة أكتر من مجرد منتج. كنا بنبني مجتمع. كنا بنساعد الناس.
هل النجاح مجرد رقم بالدولار؟ ولا هو عن إنك تخلص اللي أنت بدأته؟ بصيت على بن. كنت أقدر أقول إنه بيفكر في نفس الحاجة. ده كان قرار أصعب بكتير من قرار المستثمر. ده كان قرار عن روحنا.`},{lesson_number:31,text:`Leo and Ben left Sarah's office without giving her an answer. They needed to talk, just the two of them. They walked to the small park where it all began, and sat on their usual bench. For a long time, neither of them spoke. They both knew what five million dollars meant. It meant an end to worry. Finally, Ben broke the silence. "That's life-changing money, Leo." "I know," Leo said quietly. "We could just take it. We could be done. We could move on to other things. No more stress, no more deadlines." "I know," Leo repeated. He looked at the spot on the grass where he had seen the young woman struggling with her guitar. That moment felt like a lifetime ago. He had a mission then. Did he still? He looked at his friend. "What do you want to do, Ben?" Ben looked back at him, a serious expression on his face. "This isn't my call to make alone. It's ours. But I know this: We didn't go through all of this just to sell out to the first bully who came along." In that moment, Leo knew. They were in complete agreement, without needing to say more.

They went back to Sarah the next day. "We've thought about OmniCorp's offer," Ben said, his voice firm and professional. "And we are respectfully declining it." Sarah didn't look surprised. In fact, she almost seemed pleased. "Okay," she said. "What's the next step?" "We don't just want to decline," Leo said, stepping forward. "We want to make a counter-proposal. We don't want their money. We want their users." Sarah raised an eyebrow. "Explain." "OmniCorp has an old, outdated learning software," Leo continued. "It has millions of users who are unhappy with it. We propose a partnership. OmniCorp shuts down its old software and officially recommends SkillUp to its entire user base. In return, we give them a small percentage of our revenue for three years."`,translation:`ليو وبن خرجوا من مكتب سارة من غير ما يدوها إجابة. كانوا محتاجين يتكلموا، هما الاتنين وبس.
راحوا الجنينة الصغيرة اللي كل حاجة بدأت فيها، وقعدوا على الكنبة المعتادة بتاعتهم. لمدة طويلة، محدش فيهم اتكلم.
هما الاتنين كانوا عارفين الخمسة مليون دولار دول معناهم إيه. معناهم نهاية القلق.
أخيرًا، بن كسر الصمت. "دي فلوس تغير الحياة يا ليو." "عارف،" ليو قال بهدوء.
"إحنا ممكن ناخدها وخلاص. نبقى خلصنا. ممكن نتحرك لحاجات تانية. مفيش توتر تاني، مفيش مواعيد نهائية."
"عارف،" ليو كرر. بص على الحتة اللي في النجيلة اللي شاف فيها البنت الشابة وهي بتعاني مع الجيتار. اللحظة دي حاسس كأنها من دهر. كان عنده رسالة وقتها. هل لسه عنده؟ بص على صاحبه. "أنت عايز تعمل إيه يا بن؟"
بن بص له، وملامح جادة على وشه. "ده مش قراري لوحدي. ده بتاعنا إحنا الاتنين. بس أنا عارف ده: إحنا معديناش بكل ده عشان نبيع لأول بلطجي جه في طريقنا." في اللحظة دي، ليو عرف. كانوا متفقين تمامًا، من غير ما يحتاجوا يقولوا أكتر.

رجعوا لسارة تاني يوم. "إحنا فكرنا في عرض أومني كورب،" بن قال، وصوته حازم ورسمي. "وإحنا بنرفضه بكل احترام."
سارة مكنتش باين عليها متفاجئة. في الحقيقة، كانت شبه مبسوطة. "تمام،" قالت. "إيه الخطوة الجاية؟"
"إحنا مش بس عايزين نرفض،" ليو قال، وهو بيتقدم لقدام. "إحنا عايزين نعمل عرض مقابل. إحنا مش عايزين فلوسهم. إحنا عايزين مستخدمينهم."
سارة رفعت حاجبها. "اشرح."
"أومني كورب عندها برنامج تعليم قديم ومتهالك،" ليو كمل. "عنده ملايين المستخدمين اللي مش مبسوطين بيه. إحنا بنقترح شراكة. أومني كورب تقفل برنامجها القديم وتوصي رسميًا بـ SkillUp لكل قاعدة المستخدمين بتوعها. في المقابل، نديهم نسبة صغيرة من أرباحنا لمدة تلات سنين."`},{lesson_number:32,text:`Sarah Jenkins was silent for a moment. Then she started to laugh. It wasn't a mocking laugh; it was a laugh of genuine surprise and admiration. "You two are either geniuses or completely insane," she said. "You're not just saying 'no' to their money. You're trying to take their customers right from under their nose." "They don't care about those customers," Ben argued. "For them, that old software is a dead end. For us, those users are everything. It's a win-win situation. They save money by shutting down an old product, and we get immediate access to a massive market." Sarah nodded slowly, considering the idea. It was an incredibly bold move. It was audacious. It was the kind of thinking that could either make a company an enormous success or a spectacular failure.

I couldn't believe we were doing this. Just a few months ago, I was terrified of a single "Cease and Desist" letter. Now, we were proposing a major strategic partnership with a billion-dollar company. Sarah's legal and business teams worked with us to craft the formal proposal. The key, she explained, was that we were now negotiating from a position of strength, not weakness. OmniCorp had tried to bully us and failed. They had admitted our value by trying to buy us. Now, we were offering them a way to solve a problem they already had – their old, failing software – while saving face. This was a masterclass in business strategy. I was learning that building a company wasn't just about the product. It was about psychology, about leverage, about seeing the bigger picture.`,translation:`سارة جينكينز فضلت ساكتة للحظة. وبعدين بدأت تضحك. مكنتش ضحكة سخرية؛ كانت ضحكة مفاجأة وإعجاب حقيقي.
"أنتو الاتنين يا إما عباقرة يا إما مجانين خالص،" قالت. "أنتو مش بس بتقولوا 'لأ' لفلوسهم. أنتو بتحاولوا تاخدوا عملاءهم من تحت إيديهم."
"هما مش مهتمين بالعملاء دول،" بن حاجج. "بالنسبة لهم، البرنامج القديم ده طريق مسدود. بالنسبة لنا، المستخدمين دول هما كل حاجة. ده وضع الكل فيه كسبان. هما هيوفروا فلوس بقفل منتج قديم، وإحنا هنوصل فورًا لسوق ضخم."
سارة هزت راسها ببطء، وهي بتفكر في الفكرة. كانت خطوة جريئة بشكل لا يصدق. كانت وقحة. كانت نوع التفكير اللي ممكن يخلي شركة نجاح باهر أو فشل ذريع.

مصدقتش إننا بنعمل كده. من كام شهر فات، كنت مرعوب من مجرد جواب "إيقاف وكف". دلوقتي، إحنا بنقترح شراكة استراتيجية كبيرة مع شركة بمليارات الدولارات.
فرق سارة القانونية والتجارية اشتغلوا معانا عشان يصيغوا العرض الرسمي.
المفتاح، زي ما شرحت، هو إننا دلوقتي بنتفاوض من موقع قوة، مش ضعف. أومني كورب حاولت تبلطج علينا وفشلت. هما اعترفوا بقيمتنا لما حاولوا يشترونا.
دلوقتي، إحنا بنعرض عليهم طريقة يحلوا بيها مشكلة عندهم فعلًا – برنامجهم القديم الفاشل – وفي نفس الوقت يحفظوا ماء الوجه. ده كان درس خصوصي في استراتيجية الأعمال.
كنت بتعلم إن بناء شركة مش بس عن المنتج. هو عن علم النفس، عن النفوذ، عن رؤية الصورة الأكبر.`},{lesson_number:33,text:`A week later, Leo and Ben were sitting in a conference room at OmniCorp's headquarters. It was a strange and surreal experience for Leo to be back in that building, not as an employee, but as the co-founder of another company. On the other side of the massive table sat Mr. Harrison, his old manager, along with two senior executives. They all looked very serious. Ben led the presentation. He didn't talk about emotion or passion. He talked about numbers. He showed them how much money they were spending to maintain their old software. He showed them the poor user reviews. Then, he presented their solution: a partnership that would save them money, make their customers happier, and give them a share in a new, exciting product.

After Ben's presentation, the head executive, a stern-looking man named Mr. Graves, spoke. "Your proposal is… unconventional, Mr. Carter." "Unconventional problems require unconventional solutions," Ben replied smoothly. Mr. Graves looked at Leo. "You used to work here, Mr. Rossi. Why should we trust you now?" It was the question Leo had been preparing for. "Because I was a user," Leo said, his voice clear and confident. "I know how frustrated your customers are because I was one of them. I didn't leave OmniCorp because I hated it. I left because I saw an opportunity to build a better solution. This partnership is not about my past. It's about your company's future." The room was quiet. Mr. Graves looked at the other executives, who gave him small, almost imperceptible nods. "We will consider your proposal," Mr. Graves said finally. "We will give you our answer by the end of the week."`,translation:`بعد أسبوع، ليو وبن كانوا قاعدين في أوضة اجتماعات في مقر أومني كورب. كانت تجربة غريبة وسيريالية لليو إنه يرجع المبنى ده، مش كموظف، لكن كشريك مؤسس لشركة تانية.
على الناحية التانية من الترابيزة الضخمة كان قاعد مستر هاريسون، مديره القديم، ومعاه اتنين مديرين تنفيذيين كبار. كلهم كان شكلهم جاد أوي.
بن هو اللي قاد العرض. متكلمش عن مشاعر أو شغف. اتكلم عن أرقام.
وراهم قد إيه فلوس بيصرفوها عشان يصينوا برنامجهم القديم. وراهم تقييمات المستخدمين السيئة.
بعدين، قدم حلهم: شراكة هتوفر عليهم فلوس، وتخلي عملاءهم مبسوطين أكتر، وتديهم حصة في منتج جديد ومثير.

بعد عرض بن، المدير التنفيذي الأكبر، راجل شكله صارم اسمه مستر جريفز، اتكلم. "اقتراحكم... مش تقليدي، مستر كارتر."
"المشاكل اللي مش تقليدية بتتطلب حلول مش تقليدية،" بن رد بسلاسة.
مستر جريفز بص لليو. "أنت كنت بتشتغل هنا يا مستر روسي. ليه المفروض نثق فيك دلوقتي؟"
ده كان السؤال اللي ليو بيحضرله. "لأني كنت مستخدم،" ليو قال، وصوته واضح وواثق. "أنا عارف قد إيه عملاؤكم محبطين لأني كنت واحد منهم. أنا مسبتش أومني كورب لأني كنت بكرهها. أنا مشيت لأني شفت فرصة أبني حل أحسن. الشراكة دي مش عن ماضيّ. هي عن مستقبل شركتكم."
الأوضة كانت هادية. مستر جريفز بص للمديرين التانيين، اللي هزوا له راسهم هزات صغيرة، شبه غير ملحوظة.
"هندرس اقتراحكم،" مستر جريفز قال أخيرًا. "هنديكوا ردنا بنهاية الأسبوع."`},{lesson_number:34,text:`Another waiting game. But this time, it felt completely different. The first time we waited, we were waiting to see if we would survive. This time, we were waiting to see if we would fly. The stress was still there, of course. The fate of our company was once again in someone else's hands. But I wasn't scared anymore. We had faced down a threat, rejected an easy payday, and made a bold, audacious move. Whatever happened next, I knew we had made the right choice. We stayed true to our mission. We defined success on our own terms. Even if OmniCorp said no, we had already won the most important battle. The battle for the soul of our company.

The email arrived on Friday afternoon. It was from Mr. Graves's office. Leo and Ben read it together over Leo's shoulder. It was very short. It just said: "Gentlemen, After careful consideration, we have decided to accept your partnership proposal in principle. Our legal team will be in touch with yours next week to begin drafting the official contracts. Regards, John Graves, CEO, OmniCorp." They had done it. It was a victory beyond their wildest dreams. They hadn't just gotten the money. They hadn't just gotten the users. They had turned their biggest enemy into their most powerful partner.`,translation:`لعبة انتظار تانية. بس المرة دي، حسيت إنها مختلفة تمامًا. أول مرة انتظرنا، كنا بننتظر نشوف هننجو ولا لأ. المرة دي، كنا بننتظر نشوف هنطير ولا لأ.
التوتر كان لسه موجود، أكيد. مصير شركتنا كان مرة تانية في إيد حد تاني. بس أنا مكنتش خايف خلاص.
إحنا واجهنا تهديد، ورفضنا فلوس سهلة، وعملنا خطوة جريئة ووقحة. أيًا كان اللي هيحصل بعد كده، أنا كنت عارف إننا خدنا القرار الصح.
فضلنا مخلصين لرسالتنا. عرفنا النجاح بشروطنا إحنا. حتى لو أومني كورب قالت لأ، إحنا كنا كسبنا أهم معركة فعلًا. المعركة على روح شركتنا.

الإيميل وصل يوم الجمعة بعد الضهر. كان من مكتب مستر جريفز. ليو وبن قرأوه مع بعض من فوق كتف ليو.
كان قصير جدًا. كان بيقول:
"يا سادة، بعد دراسة متأنية، قررنا نقبل اقتراح الشراكة بتاعكم من حيث المبدأ. فريقنا القانوني هيتواصل مع فريقكم الأسبوع الجاي عشان يبدأوا صياغة العقود الرسمية. مع تحياتي، جون جريفز، المدير التنفيذي، أومني كورب."
هما عملوها. كان نصر يفوق أجرأ أحلامهم. هما مش بس خدوا الفلوس. هما مش بس خدوا المستخدمين. هما حولوا أكبر عدو ليهم لأقوى شريك ليهم.`},{lesson_number:35,text:`We didn't cheer or shout. We were too stunned, too exhausted. We just looked at each other and started laughing. It was a laugh of disbelief, of relief, of pure, unfiltered joy. That night, we didn't work. For the first time in months, we celebrated. We went to a simple restaurant with Ben's wife, Sarah. We didn't talk about business or deadlines. We just talked, and laughed, and enjoyed the moment. I raised my glass of water. "A toast," I said. "To the Phoenix Project." "To the Phoenix Project," they all repeated. The name felt more appropriate now than ever. The company had almost died. But it had risen from the ashes, stronger and bigger than before.

The partnership with OmniCorp changed everything overnight. They weren't a small startup with a few thousand users anymore. They were about to have millions of users directed to their platform. Their small prototype wasn't ready for that kind of traffic. Their two-person team wasn't enough to handle it. The game had changed. The deadline with Sarah was met, but a new, much bigger deadline was on the horizon: the official launch to OmniCorp's user base. They had three months. Leo and Ben stood in front of their whiteboard, which they had wiped completely clean. "Okay," Ben said, a look of excitement and terror in his eyes. "We have a new problem. A great problem. We need to scale up. And we need to do it now. Our first step? We need to hire people."`,translation:`مهللناش أو زعقنا. كنا مصدومين أوي، ومرهقين أوي. إحنا بس بصينا لبعض وبدأنا نضحك. كانت ضحكة عدم تصديق، ضحكة راحة، ضحكة فرحة صافية من غير أي فلاتر.
بالليل ده، مشتغلناش. لأول مرة من شهور، احتفلنا. رحنا مطعم بسيط مع سارة، مرات بن.
متكلمناش في بزنس أو مواعيد نهائية. إحنا بس اتكلمنا، وضحكنا، واستمتعنا باللحظة.
رفعت كوباية المايه بتاعتي. "في صحة،" قلت. "مشروع العنقاء."
"في صحة مشروع العنقاء،" كلهم كرروا.
الاسم حسيت إنه مناسب دلوقتي أكتر من أي وقت فات. الشركة كانت قربت تموت. بس قامت من الرماد، أقوى وأكبر من الأول.

الشراكة مع أومني كورب غيرت كل حاجة بين يوم وليلة. مبقوش شركة ناشئة صغيرة عندها كام ألف مستخدم. كانوا على وشك يجيلهم ملايين المستخدمين لمنصتهم.
نسختهم التجريبية الصغيرة مكنتش جاهزة لكمية الزيارات دي. فريقهم المكون من شخصين مكنش كفاية عشان يتعامل معاها. اللعبة اتغيرت.
الموعد النهائي مع سارة اتحقق، بس موعد نهائي جديد، أكبر بكتير، كان في الأفق: الإطلاق الرسمي لقاعدة مستخدمي أومني كورب. كان قدامهم تلات شهور.
ليو وبن وقفوا قدام السبورة البيضا بتاعتهم، اللي كانوا مسحوها تمامًا. "تمام،" بن قال، وملامح حماس ورعب في عينيه. "عندنا مشكلة جديدة. مشكلة عظيمة. إحنا محتاجين نكبر. ومحتاجين نعمل ده دلوقتي. أول خطوة لينا؟ إحنا محتاجين نوظف ناس."`},{lesson_number:36,text:`"We need to hire." Those words echoed in their small office. But who should they hire first? Another engineer to help Leo? A marketing person to help Ben? "Our biggest and most immediate problem is technical," Leo said, pointing to his laptop. "Our current system can't handle millions of users. It will crash. Before we can even think about marketing, we need a stronger, more stable platform. We need another engineer. A senior engineer." Ben agreed. He spent the rest of the day writing their very first job description. It wasn't just a list of technical skills. He also included a section about their mission and their culture. He wrote: "We're a small, passionate team trying to change the way people learn. We're looking for someone who is not just a great coder, but a great problem-solver who believes in what we're building."

We posted the job description on a few tech job boards. The response was overwhelming. We received over 200 applications in three days. I was shocked. Reading through all the resumes was a huge job. I wasn't just looking for experience with the right programming languages. I was looking for something more. A spark. A sign of passion. We selected the top ten candidates for interviews. I've been in interviews before, but I've never been on the other side of the table. It was strange. It was difficult. You have one hour to try and understand a person's entire professional life. It was exhausting. After the first five interviews, I still hadn't found the right person.`,translation:`"إحنا محتاجين نوظف." الكلمات دي رنت في مكتبهم الصغير. بس يوظفوا مين الأول؟ مهندس تاني يساعد ليو؟ حد تسويق يساعد بن؟
"أكبر وأكتر مشكلة فورية عندنا هي تقنية،" ليو قال، وهو بيشاور على اللابتوب بتاعه. "نظامنا الحالي ميقدرش يستحمل ملايين المستخدمين. هيقع. قبل ما نفكر حتى في التسويق، محتاجين منصة أقوى وأكتر استقرارًا. محتاجين مهندس تاني. مهندس خبير."
بن وافق. قضى بقية اليوم بيكتب أول توصيف وظيفي ليهم. مكنش مجرد قايمة بالمهارات التقنية.
هو كمان أضاف قسم عن رسالتهم وثقافتهم. كتب: "إحنا فريق صغير وشغوف بنحاول نغير طريقة تعلم الناس. بندور على حد مش بس مبرمج عظيم، لكن حلال مشاكل عظيم بيؤمن باللي بنبنيه."

نشرنا التوصيف الوظيفي على كام موقع من مواقع التوظيف التقنية. الرد كان كاسح. استقبلنا أكتر من 200 طلب في تلات أيام. أنا اتصدمت.
قراية كل السير الذاتية دي كانت مهمة ضخمة. مكنتش بس بدور على خبرة بلغات البرمجة الصح.
كنت بدور على حاجة أكتر. شرارة. علامة على الشغف.
اختارنا أفضل عشر مرشحين للمقابلات. أنا كنت في مقابلات قبل كده، بس عمري ما كنت على الناحية التانية من الترابيزة.
كان غريب. كان صعب. عندك ساعة واحدة تحاول تفهم فيها حياة شخص مهنية كاملة. كان مرهق. بعد أول خمس مقابلات، كنت لسه ملاقتش الشخص المناسب.`},{lesson_number:37,text:`The sixth candidate was a woman named Maya. On paper, she was perfect. She had ten years of experience at some of the biggest tech companies in the world. She had led large teams. She had worked on products with millions of users. She was a star. During the interview, she was brilliant. She answered every technical question perfectly. She was smart, confident, and professional. Leo and Ben were incredibly impressed. After she left, Ben turned to Leo. "Wow. She's amazing. We have to hire her." Leo nodded. "I know. She's the perfect candidate." But deep down, he felt a small, strange hesitation he couldn't explain.

The seventh candidate was a young man named Carlos. His resume was good, but not as impressive as Maya's. He was quieter, more thoughtful. For the main technical challenge of the interview, Leo gave him a difficult problem. "How would you design a system to handle a sudden, massive increase in users?" Carlos didn't answer right away. He walked to the whiteboard and just stood there for a full minute, thinking. Then, instead of just giving a technical answer, he started asking questions. "Who are these users?" he asked. "What are they trying to do? What is the most important part of their experience?" Leo was surprised. "Why are you asking that?" "Because the 'best' technical solution depends on the human problem we're trying to solve," Carlos said. "We can build the fastest system in the world, but if it doesn't serve the user, it's worthless."`,translation:`المرشحة الساتتة كانت ست اسمها مايا. على الورق، كانت مثالية. كان عندها عشر سنين خبرة في أكبر شركات التكنولوجيا في العالم.
كانت قادت فرق كبيرة. اشتغلت على منتجات بملايين المستخدمين. كانت نجمة.
خلال المقابلة، كانت عبقرية. جاوبت على كل سؤال تقني بشكل مثالي. كانت ذكية، وواثقة، ومحترفة. ليو وبن كانوا منبهرين جدًا.
بعد ما مشيت، بن التفت لليو. "واو. دي مذهلة. لازم نوظفها." ليو هز رأسه. "عارف. هي المرشحة المثالية." بس في أعماقه، حس بتردد صغير وغريب مقدرش يفسره.

المرشح السابع كان شاب اسمه كارلوس. السي في بتاعه كان كويس، بس مش مبهر زي بتاع مايا. كان أهدى، وأكتر تفكيرًا.
للتحدي التقني الرئيسي في المقابلة، ليو إداله مشكلة صعبة. "إزاي هتصمم نظام عشان يستحمل زيادة مفاجئة وضخمة في عدد المستخدمين؟"
كارلوس مردش على طول. راح عند السبورة البيضا وفضل واقف هناك دقيقة كاملة، بيفكر. بعدها، بدل ما يدي إجابة تقنية وبس، بدأ يسأل أسئلة.
"مين المستخدمين دول؟" سأل. "بيحاولوا يعملوا إيه؟ إيه أهم جزء في تجربتهم؟"
ليو اتفاجئ. "أنت بتسأل كده ليه؟"
"لأن 'أحسن' حل تقني هو اللي بيعتمد على المشكلة الإنسانية اللي بنحاول نحلها،" كارلوس قال. "إحنا ممكن نبني أسرع نظام في العالم، بس لو مش بيخدم المستخدم، يبقى ملوش لازمة."`},{lesson_number:38,text:`That answer changed everything for me. Carlos wasn't just thinking about code; he was thinking about our mission. He was thinking about our users. That night, Ben and I had a long discussion. Ben wanted to hire Maya. "She's the safe choice, Leo! She has the experience. She can start building immediately. It's the logical decision." "I know," I argued, "but Carlos thinks differently. He thinks about the 'why,' not just the 'how.' He fits our culture. He's passionate about the user." "Passion doesn't write code!" Ben said, frustrated. "We have a deadline! We need experience!" This was our first major hiring decision. It was a choice between experience on paper and cultural fit in person. It was a choice that would define the kind of team we wanted to build.

In the end, Leo managed to convince Ben. He argued that they could teach someone new technical skills, but they couldn't teach passion or a user-focused mindset. They called Carlos and offered him the job. He was so excited, he accepted on the spot. They had their first employee. A week later, they called Maya to inform her of their decision. She was polite but clearly surprised. "I see," she said. "Can I ask why?" Leo was honest. "Your experience is incredible, Maya. But we felt Carlos was a slightly better fit for our company culture at this early stage." "I understand," she said. "Good luck with your project."`,translation:`الإجابة دي غيرت كل حاجة بالنسبالي. كارلوس مكنش بيفكر في الكود وبس؛ كان بيفكر في رسالتنا. كان بيفكر في مستخدمينا.
بالليل ده، أنا وبن اتناقشنا نقاش طويل. بن كان عايز يوظف مايا. "هي الاختيار الآمن يا ليو! عندها الخبرة. تقدر تبدأ تبني فورًا. ده القرار المنطقي."
"عارف،" حاججت، "بس كارلوس بيفكر بشكل مختلف. بيفكر في 'السبب'، مش بس 'الإزاي'. هو مناسب لثقافتنا. هو شغوف بالمستخدم."
"الشغف مش بيكتب كود!" بن قال، وهو محبط. "عندنا موعد نهائي! محتاجين خبرة!"
ده كان أول قرار توظيف رئيسي لينا. كان اختيار بين الخبرة على الورق والتوافق الثقافي في الواقع. كان اختيار هيحدد نوع الفريق اللي كنا عايزين نبنيه.

في النهاية، ليو قدر يقنع بن. قال إنهم ممكن يعلموا حد مهارات تقنية جديدة، بس ميقدروش يعلموا الشغف أو العقلية اللي بتركز على المستخدم.
كلموا كارلوس وعرضوا عليه الشغل. كان متحمس أوي لدرجة إنه قبل على طول. بقى عندهم أول موظف.
بعد أسبوع، كلموا مايا عشان يبلغوها بقرارهم. كانت مهذبة بس واضح إنها متفاجئة.
"فاهمة،" قالت. "ممكن أسأل ليه؟"
ليو كان صريح. "خبرتك لا تصدق يا مايا. بس إحنا حسينا إن كارلوس مناسب أكتر شوية لثقافة شركتنا في المرحلة المبكرة دي."
"فاهمة،" قالت. "بالتوفيق في مشروعكم."`},{lesson_number:39,text:`Carlos started the next Monday. Our small office suddenly felt more crowded, more energetic. The team dynamic changed completely. It wasn't just me and Ben anymore. It was a real team. We started having daily "stand-up" meetings every morning, where each of us would quickly say what we worked on yesterday and what we were planning to work on today. Carlos was amazing. He was not just a great coder, he was a great partner. He challenged my ideas in a constructive way. We would spend hours at the whiteboard, designing the new architecture for the app. With him, the work was not just faster; it was better. I knew we had made the right choice.

Their first big test as a three-person team came quickly. They needed to migrate all their user data to a new, more powerful server. It was a dangerous and complicated process. If anything went wrong, they could lose all their user information. They planned the migration for a weekend, when user activity was lowest. For 48 hours, the three of them worked side-by-side. Ben was managing the project and communicating with their server provider. Leo and Carlos were writing and running the migration scripts. It was high-stress, high-stakes work. But there was no fighting, no panic. Just calm, focused collaboration.`,translation:`كارلوس بدأ يوم الإتنين اللي بعده. مكتبنا الصغير حسيت فجأة إنه زحمة أكتر، وحيوي أكتر. ديناميكية الفريق اتغيرت تمامًا.
مبقاش أنا وبن وبس. بقى فريق حقيقي. بدأنا نعمل اجتماعات "وقوف" يومية كل صباح، كل واحد فينا يقول بسرعة اشتغل على إيه امبارح وناوي يشتغل على إيه النهاردة.
كارلوس كان مذهل. مكنش بس مبرمج عظيم، كان شريك عظيم. كان بيتحدى أفكاري بطريقة بناءة.
كنا بنقضي ساعات عند السبورة البيضا، بنصمم الهيكل الجديد للأبلكيشن. معاه، الشغل مكنش بس أسرع؛ كان أحسن. عرفت إننا خدنا القرار الصح.

أول اختبار كبير ليهم كفريق من تلات أشخاص جه بسرعة. كانوا محتاجين ينقلوا كل بيانات مستخدمينهم لسيرفر جديد وأقوى.
كانت عملية خطيرة ومعقدة. لو أي حاجة حصلت غلط، كانوا ممكن يخسروا كل معلومات مستخدمينهم.
خططوا للنقل في ويك إند، لما نشاط المستخدمين بيبقى أقل. لمدة 48 ساعة، التلاتة اشتغلوا جنب بعض.
بن كان بيدير المشروع وبيتواصل مع مزود السيرفر. ليو وكارلوس كانوا بيكتبوا وبيشغلوا برامج النقل. كان شغل ضغطه عالي ورهاناته كبيرة. بس مكنش فيه خناق، ولا ذعر. مجرد تعاون هادي ومركز.`},{lesson_number:40,text:`At 5 AM on Sunday morning, the final script finished. The migration was successful. No data was lost. The three of them were completely exhausted but filled with a sense of accomplishment. "We did it," Leo said, a tired smile on his face. "Yeah, we did," Carlos said, stretching his back. Ben returned with three bottles of cold water from the small office fridge. "I know it's not champagne," he said, handing them out. "But here's to our first successful project as a team." They tapped their water bottles together. In the quiet of the early morning, it felt just as good as champagne.

With a stable platform and a growing team, things were looking good. But the OmniCorp launch was getting closer every day. The technical side was now under control, thanks to Carlos. It was time to focus on the other side of the equation. Ben and I sat down for our weekly strategy meeting. "Okay," he said, "our tech is almost ready. But what about the users? How do we make sure that the millions of users coming from OmniCorp have a great experience? We can't handle customer support with just the three of us." He was right. Our next hire was just as important as the first one. We had built the product. Now, we had to build the community around it. We needed to find our first Community Manager. The search was on again.`,translation:`الساعة 5 الصبح يوم الأحد، آخر برنامج خلص. النقل نجح. مفيش بيانات ضاعت.
التلاتة كانوا مرهقين تمامًا بس مليانين بإحساس الإنجاز. "عملناها،" ليو قال، وابتسامة تعبانة على وشه.
"أه، عملناها،" كارلوس قال، وهو بيفرد ضهره. بن رجع بتلات ازايز مايه ساقعة من تلاجة المكتب الصغيرة.
"أنا عارف إنها مش شامبانيا،" قال، وهو بيديهم الازايز. "بس في صحة أول مشروع ناجح لينا كفريق." خبطوا ازايز المايه بتاعتهم في بعض. في هدوء الصباح الباكر، الإحساس كان بنفس حلاوة الشامبانيا.

بمنصة مستقرة وفريق بيكبر، الأمور كانت شكلها كويس. بس إطلاق أومني كورب كان بيقرب كل يوم. الناحية التقنية كانت تحت السيطرة دلوقتي، شكرًا لكارلوس. جه الوقت نركز على الناحية التانية من المعادلة.
أنا وبن قعدنا لاجتماعنا الاستراتيجي الأسبوعي. "تمام،" قال، "التكنولوجيا بتاعتنا قربت تجهز. بس إيه أخبار المستخدمين؟ إزاي نتأكد إن الملايين من المستخدمين اللي جايين من أومني كورب هياخدوا تجربة عظيمة؟ منقدرش نتعامل مع دعم العملاء بالتلاتة بس."
كان عنده حق. الموظف اللي جاي كان مهم بنفس قدر أهمية الأولاني. إحنا بنينا المنتج. دلوقتي، كان لازم نبني المجتمع حواليه. كنا محتاجين نلاقي أول مدير مجتمع لينا. البحث بدأ تاني.`},{lesson_number:41,text:`Ben’s words hung in the air: "We need to build the community." Leo had always thought about their users as data points – numbers on a screen, patterns of behavior. But Ben's point was clear. To succeed, they had to think of them as people. People with questions, frustrations, and ideas. They wrote the job description for a "Community Manager." They weren't looking for a technical person. They were looking for an excellent communicator. Someone patient, empathetic, and genuinely passionate about helping people learn. They needed someone who could be the human voice of SkillUp.

We received dozens of applications from professional Community Managers with years of experience. They all had impressive resumes. But then, one application stood out. It was different. Her name was Chloe. She had almost no professional social media experience. She was a former high school teacher. Her cover letter was what caught my attention. She didn't talk about marketing metrics or engagement rates. She talked about her students. She wrote: "For ten years, my greatest joy was seeing the 'aha!' moment on a student's face – the moment they finally understand a difficult concept. I believe your app can create millions of those moments. I don't just want to manage a community; I want to help build a classroom for the world." I knew, instantly, that we had to meet her.`,translation:`كلمات بن فضلت متعلقة في الهوا: "إحنا محتاجين نبني المجتمع." ليو كان دايمًا بيفكر في مستخدمينه كنقاط بيانات – أرقام على شاشة، أنماط سلوك.
بس نقطة بن كانت واضحة. عشان ينجحوا، لازم يفكروا فيهم كبشر. بشر عندهم أسئلة، وإحباطات، وأفكار.
كتبوا التوصيف الوظيفي لـ"مدير مجتمع." مكنوش بيدوروا على شخص تقني. كانوا بيدوروا على متواصل ممتاز. حد صبور، متعاطف، وشغوف بجد بمساعدة الناس على التعلم. كانوا محتاجين حد يقدر يبقى الصوت الإنساني لـ SkillUp.

استقبلنا عشرات الطلبات من مديرين مجتمع محترفين عندهم سنين من الخبرة. كلهم كان عندهم سيفيهات مبهرة. بس بعدها، طلب واحد برز. كان مختلف.
اسمها كان كلوي. تقريبًا معندهاش أي خبرة مهنية في السوشيال ميديا. كانت مدرسة ثانوي سابقة.
خطاب التقديم بتاعها هو اللي لفت انتباهي. متكلمتش عن مقاييس التسويق أو معدلات التفاعل. اتكلمت عن طلابها.
كتبت: "لعشر سنين، أعظم فرحة ليا كانت إني أشوف لحظة 'آها!' على وش طالب – اللحظة اللي أخيرًا يفهم فيها مفهوم صعب. أنا مؤمنة إن الأبلكيشن بتاعكم ممكن يخلق ملايين من اللحظات دي. أنا مش بس عايزة أدير مجتمع؛ أنا عايزة أساعد في بناء فصل دراسي للعالم." أنا عرفت، فورًا، إننا لازم نقابلها.`},{lesson_number:42,text:`Chloe was warm, energetic, and had a smile that immediately filled the room. "So, Chloe," Ben began, "you have no experience in the tech industry. Why should we hire you over someone with a traditional marketing background?" Chloe didn't hesitate. "Because your users aren't marketing data," she said confidently. "They are students. They will have questions. They will get frustrated. They will feel like giving up. A traditional marketer might see that as a problem. As a teacher, I see it as a normal part of the learning process. My job isn't to sell them a product. It's to support them on their learning journey. To be their teacher and their biggest cheerleader." Leo and Ben looked at each other. They didn't need to say a word.

They hired Chloe. And her impact was immediate. She created a dedicated support email, a help center with frequently asked questions, and and active social media accounts where she responded to every single user comment and question personally. She became the bridge between the users and the technical team. Every day, she would bring Leo and Carlos a list of the top problems and suggestions from the community. "Users are confused by the lesson navigation," she would say, or "Many people are requesting a feature to track their daily progress." She wasn't just solving problems; she was channeling the voice of the user directly into the product development process.`,translation:`كلوي كانت ودودة، ومليانة طاقة، وعندها ابتسامة ملت الأوضة فورًا.
"طيب يا كلوي،" بن بدأ، "أنتي معندكيش خبرة في مجال التكنولوجيا. ليه المفروض نوظفك بدل حد عنده خلفية تسويقية تقليدية؟"
كلوي مترددتش. "لأن مستخدمينكم مش بيانات تسويق،" قالت بثقة. "هما طلاب. هيبقى عندهم أسئلة. هيحبطوا. هيحسوا إنهم عايزين يستسلموا. المسوق التقليدي ممكن يشوف ده كمشكلة. كمدرسة، أنا بشوف ده جزء طبيعي من عملية التعلم. شغلي مش إني أبيع لهم منتج. شغلي إني أدعمهم في رحلتهم التعليمية. إني أكون مدرستهم وأكبر مشجعينهم."
ليو وبن بصوا لبعض. محتاجوش يقولوا كلمة.

وظفوا كلوي. وتأثيرها كان فوري. عملت إيميل دعم مخصص، ومركز مساعدة بأسئلة شائعة، وحسابات سوشيال ميديا نشطة كانت بترد فيها على كل تعليق وسؤال من المستخدمين بنفسها.
بقت الجسر بين المستخدمين والفريق التقني. كل يوم، كانت بتجيب لليو وكارلوس قايمة بأهم المشاكل والاقتراحات من المجتمع.
"المستخدمين متلخبطين في التنقل بين الدروس،" كانت تقول، أو "ناس كتير بيطلبوا ميزة لتتبع تقدمهم اليومي."
مكنتش بس بتحل مشاكل؛ كانت بتوجه صوت المستخدم مباشرةً لعملية تطوير المنتج.`},{lesson_number:43,text:`One of Chloe's first major insights was simple but brilliant. Based on user feedback, she realized people felt lonely learning by themselves. "We should create a community forum," she suggested in a team meeting. "A place where users can ask questions, share their progress, and encourage each other." I was hesitant at first. "That's a lot of work to build, Chloe. It will take weeks." "Let's not build it," she replied. "Let's just start a simple Facebook group. It takes five minutes to set up, and it's where people already are." Her approach was always practical. We started the group that afternoon. Within a month, it had thousands of members. People were sharing videos of themselves playing the guitar chords they had learned, or asking for tips on the Spanish lessons. The app was no longer just a tool; it was becoming a community.

With the community growing and the product improving every day, the big deadline was approaching: the official partnership launch with OmniCorp. They had a date set. In two months, OmniCorp would send an email to its three million users, recommending SkillUp. Ben and Sarah’s teams worked together on a detailed migration plan. They had to ensure the transition was smooth. They prepared server capacity for the massive increase in traffic. They created a special welcome experience for the new users coming from OmniCorp. The pressure was immense. This launch would make or break their company.`,translation:`واحدة من أول رؤى كلوي الكبيرة كانت بسيطة بس عبقرية. بناءً على آراء المستخدمين، أدركت إن الناس بتحس بالوحدة وهي بتتعلم لوحدها.
"المفروض نعمل منتدى مجتمعي،" اقترحت في اجتماع الفريق. "مكان يقدر فيه المستخدمين يسألوا أسئلة، ويشاركوا تقدمهم، ويشجعوا بعض."
أنا كنت متردد في الأول. "ده شغل كتير عشان نبنيه يا كلوي. هياخد أسابيع."
"بلاش نبنيه،" ردت. "يلا نبدأ جروب فيسبوك بسيط. بياخد خمس دقايق عشان يتعمل، وهو المكان اللي الناس موجودة فيه فعلًا." طريقتها كانت دايمًا عملية.
بدأنا الجروب في نفس اليوم بعد الضهر. في خلال شهر، كان فيه آلاف الأعضاء.
الناس كانت بتشارك فيديوهات لنفسها وهي بتعزف كوردات الجيتار اللي اتعلموها، أو بتسأل عن نصايح في دروس الإسباني. الأبلكيشن مبقاش مجرد أداة؛ بدأ يبقى مجتمع.

ومع نمو المجتمع وتحسن المنتج كل يوم، الموعد النهائي الكبير كان بيقرب: إطلاق الشراكة الرسمية مع أومني كورب. كان عندهم تاريخ متحدد.
في خلال شهرين، أومني كورب هتبعت إيميل لتلاتة مليون مستخدم بتوعها، توصي فيه بـ SkillUp.
فرق بن وسارة اشتغلوا مع بعض على خطة نقل تفصيلية. كان لازم يضمنوا إن الانتقال يكون سلس.
جهزوا سعة السيرفرات للزيادة الضخمة في عدد الزوار. عملوا تجربة ترحيب خاصة للمستخدمين الجداد اللي جايين من أومني كورب.
الضغط كان رهيب. الإطلاق ده كان هينجح شركتهم أو يكسرها.`},{lesson_number:44,text:`The night before the launch, the team of four gathered in the office. They had ordered pizza, but no one was very hungry. The mood was a mix of extreme excitement and crippling anxiety. "What if the servers crash?" Carlos said, voicing the technical team's biggest fear. "What if the users hate the app?" Chloe added, voicing the community team's biggest fear. "What if the download numbers are low?" Ben said, voicing the business team's biggest fear. Leo looked around at his team. A few months ago, all this pressure was on his shoulders alone. Now, he was sharing it with three other brilliant, passionate people. "Whatever happens," Leo said, "we're in this together. We've built something we can be proud of. Now we just have to trust our work."

Launch day. 9:00 AM. That's when OmniCorp was scheduled to send the email. We all sat together in the main room, staring at the real-time analytics screen. The number of active users was normal, around 200 people. 9:00 AM came and went. Nothing happened. 9:05... 9:10... The silence was unbearable. Did they change their minds? Did something go wrong? My mind started to imagine the worst possible scenarios. And then, at 9:14 AM, it happened. The number on the screen suddenly jumped. 250. 400. 1,000. 5,000. It was like watching a dam break. A huge wave of new users was flooding into our system. I couldn't speak. I could only watch the numbers climb, faster and faster.`,translation:`بالليل قبل الإطلاق، الفريق المكون من أربعة اتجمعوا في المكتب. كانوا طالبين بيتزا، بس محدش كان جعان أوي.
المود كان خليط من الحماس الشديد والقلق المدمر.
"طب لو السيرفرات وقعت؟" كارلوس قال، وهو بيعبر عن أكبر خوف عند الفريق التقني.
"طب لو المستخدمين كرهوا الأبلكيشن؟" كلوي أضافت، وهي بتعبر عن أكبر خوف عند فريق المجتمع.
"طب لو أرقام التحميل كانت قليلة؟" بن قال، وهو بيعبر عن أكبر خوف عند فريق البزنس.
ليو بص حواليه على فريقه. من كام شهر، كل الضغط ده كان على كتافه لوحده. دلوقتي، كان بيشاركه مع تلات أشخاص تانيين عباقرة وشغوفين. "أيًا كان اللي هيحصل،" ليو قال، "إحنا في ده مع بعض. إحنا بنينا حاجة نقدر نفخر بيها. دلوقتي لازم نثق في شغلنا وبس."

يوم الإطلاق. الساعة 9:00 الصبح. ده كان الوقت اللي أومني كورب المفروض تبعت فيه الإيميل.
كلنا قعدنا مع بعض في الأوضة الرئيسية، بنحدق في شاشة التحليل اللحظية. عدد المستخدمين النشطين كان عادي، حوالي 200 شخص.
الساعة 9:00 جت وعدت. محصلش حاجة. 9:05... 9:10... السكوت كان لا يطاق.
هل غيروا رأيهم؟ هل حاجة حصلت غلط؟ عقلي بدأ يتخيل أسوأ السيناريوهات الممكنة.
وبعدين، الساعة 9:14 الصبح، حصلت. الرقم على الشاشة نط فجأة. 250. 400. 1000. 5000. كان زي ما تكون بتتفرج على سد بينهار.
موجة ضخمة من المستخدمين الجداد كانت بتغرق نظامنا. مقدرتش أتكلم. كنت بس أقدر أتفرج على الأرقام وهي بتعلى، أسرع وأسرع.`},{lesson_number:45,text:`The wave was bigger than they had ever anticipated. The servers were holding up, thanks to Carlos and Leo's careful planning, but the human side of the company was overwhelmed. Chloe's support inbox exploded with hundreds of emails per hour. People had questions about their old OmniCorp accounts, about the new features, about everything. The whole team jumped into action. It was an "all hands on deck" situation. Leo, Ben, and Carlos stopped everything they were doing and started answering support emails alongside Chloe. They worked for 12 hours straight, responding to every single user with a personal, helpful message. They weren't just a tech company anymore; they were a customer service company.

By the end of the day, things had started to stabilize. We had over one hundred thousand new registered users in a single day. The number was simply unbelievable. Our small startup was not so small anymore. I looked around the office. Everyone was completely exhausted, but everyone was smiling. Chloe was helping a user in Brazil. Carlos was monitoring the server health. Ben was looking at the new revenue numbers, a look of pure shock on his face. We had survived. More than that, we had succeeded beyond our wildest dreams. This was our new reality. Our new baseline. The Phoenix Project had truly taken flight, and it was carrying us all with it. But I knew, deep down, that with this new level of success would come a whole new level of problems.`,translation:`الموجة كانت أكبر من أي حاجة توقعوها. السيرفرات كانت مستحملة، شكرًا لتخطيط كارلوس وليو الدقيق، بس الجانب الإنساني من الشركة كان غرقان.
صندوق دعم كلوي انفجر بمئات الإيميلات في الساعة. الناس كان عندها أسئلة عن حساباتهم القديمة في أومني كورب، وعن المميزات الجديدة، وعن كل حاجة.
الفريق كله نط يشتغل. كان وضع "الكل يشارك". ليو وبن وكارلوس سابوا كل اللي بيعملوه وبدأوا يردوا على إيميلات الدعم جنب كلوي.
شتغلوا 12 ساعة متواصلة، بيردوا على كل مستخدم برسالة شخصية ومفيدة. مبقوش مجرد شركة تكنولوجيا؛ بقوا شركة خدمة عملاء.

بنهاية اليوم، الأمور بدأت تستقر. بقى عندنا أكتر من ميت ألف مستخدم جديد مسجل في يوم واحد. الرقم كان ببساطة لا يصدق. شركتنا الناشئة الصغيرة مبقتش صغيرة أوي.
بصيت حواليا في المكتب. الكل كان مرهق تمامًا، بس الكل كان مبتسم. كلوي كانت بتساعد مستخدم في البرازيل. كارلوس كان بيراقب صحة السيرفرات. بن كان بيبص على أرقام الإيرادات الجديدة، وملامح صدمة صافية على وشه.
إحنا نجينا. أكتر من كده، إحنا نجحنا نجاح يفوق أجرأ أحلامنا. ده كان واقعنا الجديد. خط الأساس الجديد بتاعنا.
"مشروع العنقاء" كان فعلًا حلق، وكان شايلنا كلنا معاه. بس أنا كنت عارف، في أعماقي، إن مع المستوى الجديد ده من النجاح، هييجي مستوى جديد بالكامل من المشاكل.`},{lesson_number:46,text:`The week after the OmniCorp launch was a blur of controlled chaos. The flood of new users continued. The team was working 16-hour days, just trying to keep up. While Leo and Carlos were constantly monitoring the servers and fixing small bugs that appeared under the heavy load, Ben and Chloe were handling the human side. They created a system to manage the thousands of support tickets. They identified the most common questions and wrote clear articles for the help center. It was a reactive phase; they weren't planning new features, they were just trying to manage the overwhelming success of the present moment.

A week later, Sarah Jenkins made a surprise visit to their office. The place was a mess, with whiteboards full of frantic notes and empty takeout containers everywhere. "It looks like a war room in here," she said with a smile. "I came to say two things. First: congratulations. Your launch numbers are some of the best I've ever seen for a portfolio company." "Thank you, Sarah. We're just trying to keep our heads above water," Ben said, looking exhausted. "And that brings me to my second point," she continued, her tone becoming more serious. "You're not a startup of four people anymore. You're a real company with a massive user base. You cannot continue to operate like this. You will all burn out. It's time to grow up, organizationally."`,translation:`الأسبوع اللي بعد إطلاق أومني كورب كان ضباب من الفوضى المنظمة. سيل المستخدمين الجداد استمر. الفريق كان بيشتغل 16 ساعة في اليوم، بس بيحاولوا يلاحقوا.
في الوقت اللي ليو وكارلوس كانوا بيراقبوا السيرفرات باستمرار وبيصلحوا بجات صغيرة ظهرت تحت الضغط الكبير، بن وكلوي كانوا بيتعاملوا مع الجانب الإنساني.
عملوا نظام عشان يديروا آلاف تذاكر الدعم. حددوا الأسئلة الأكثر شيوعًا وكتبوا مقالات واضحة لمركز المساعدة.
كانت مرحلة رد فعل؛ مكنوش بيخططوا لمميزات جديدة، كانوا بس بيحاولوا يديروا النجاح الساحق بتاع اللحظة الحالية.

بعد أسبوع، سارة جينكينز عملت زيارة مفاجئة لمكتبهم. المكان كان متبهدل، بالسبورات البيضا المليانة ملاحظات مكتوبة بجنون وعلب أكل فاضية في كل حتة.
"المكان ده شكله أوضة حرب،" قالت وهي مبتسمة. "أنا جيت عشان أقول حاجتين. أولًا: مبروك. أرقام إطلاقكم من أحسن الأرقام اللي شفتها لشركة في ملفي الاستثماري."
"شكرًا يا سارة. إحنا بس بنحاول نخلي راسنا فوق المايه،" بن قال، وشكله مرهق.
"وده بيوصلني للنقطة التانية،" كملت، ونبرتها بقت أكتر جدية. "أنتو مبقتوش شركة ناشئة من أربع أفراد. أنتو شركة حقيقية بقاعدة مستخدمين ضخمة. مينفعش تكملوا شغالين بالشكل ده. كلكوا هتتحرقوا. جه الوقت تكبروا، من الناحية التنظيمية."`},{lesson_number:47,text:`"Grow up, organizationally." Sarah's words were direct, and they were true. We were still thinking like a tiny team in a small room. But we now had the responsibilities of a much larger company. That afternoon, we had a team meeting. But we didn't talk about code or marketing. We talked about structure. We needed to hire more people – more engineers, more support staff. We needed to create proper departments. We needed to establish clear processes for everything, from fixing bugs to responding to customers. It was a strange feeling. Part of me missed the simplicity of the early days, when it was just me and Ben. But this was the necessary next step. To serve our users properly, we had to build a real, scalable company around our product.

Their first senior hire was a "Head of Customer Experience." They needed someone to build and lead the entire support team, and to own the relationship with the community. The choice was obvious. Chloe had proven herself to be more than just a Community Manager. She was a natural leader. Ben and Leo officially promoted her to the new role. It was a big moment for everyone. Chloe was now part of the leadership team. And for Leo and Ben, it was the first time they had delegated a major part of their company to someone else. It required trust. But they knew they could trust Chloe completely.`,translation:`"تكبروا، من الناحية التنظيمية." كلمات سارة كانت مباشرة، وكانت حقيقية. إحنا كنا لسه بنفكر كفريق صغير جدًا في أوضة صغيرة. بس بقى علينا دلوقتي مسؤوليات شركة أكبر بكتير.
في نفس اليوم بعد الضهر، عملنا اجتماع فريق. بس متكلمناش عن كود أو تسويق. اتكلمنا عن الهيكل. كنا محتاجين نوظف ناس أكتر – مهندسين أكتر، موظفين دعم أكتر. كنا محتاجين ننشئ أقسام فعلية.
كنا محتاجين نأسس عمليات واضحة لكل حاجة، من تصليح البجات للرد على العملاء.
كان إحساس غريب. جزء مني كان بيحن لبساطة الأيام الأولى، لما كان أنا وبن بس. بس دي كانت الخطوة الضرورية اللي جاية. عشان نخدم مستخدمينا صح، كان لازم نبني شركة حقيقية وقابلة للتوسع حوالين منتجنا.

أول موظف كبير ليهم كان "رئيس تجربة العملاء." كانوا محتاجين حد يبني ويقود فريق الدعم بالكامل، ويكون مسؤول عن العلاقة مع المجتمع.
الاختيار كان واضح. كلوي كانت أثبتت إنها أكتر من مجرد مديرة مجتمع. كانت قائدة بالفطرة.
بن وليو رقوها رسميًا للمنصب الجديد. كانت لحظة كبيرة للكل. كلوي بقت جزء من فريق القيادة دلوقتي.
وبالنسبة لليو وبن، كانت دي أول مرة يفوضوا جزء رئيسي من شركتهم لحد تاني. الموضوع كان محتاج ثقة. بس هما كانوا عارفين إنهم يقدروا يثقوا في كلوي تمامًا.`},{lesson_number:48,text:`With the company structure starting to take shape, Leo could finally breathe and think about the future of the app itself. He called a product strategy meeting with Carlos. "We've been so focused on stability and fixing bugs," Leo said, standing in front of the whiteboard. "But what's next? What is the next big feature that will excite our users and keep us ahead of the competition?" Carlos was quiet for a moment. "I think we're asking the wrong question, Leo." "What do you mean?" "We shouldn't guess what users want," Carlos said. "We have over a hundred thousand active users now. They are telling us what they want every single day through their feedback and their behavior. We just need to listen."

Carlos was right. Again. My instinct as a creator was to invent something new. His instinct as a user-focused engineer was to listen and improve. We spent the next week doing a "deep dive" into the user data and feedback. We read every support ticket, every app store review, every comment on our community forum. We were searching for patterns. And a very clear pattern emerged. The number one feature request, by a huge margin, was the ability to learn with friends. Users wanted a social experience. They wanted to create study groups, challenge their friends, and track each other's progress. It wasn't my next big idea, but it was clearly our users' next big idea.`,translation:`ومع بدء تشكل هيكل الشركة، ليو قدر أخيرًا يتنفس ويفكر في مستقبل الأبلكيشن نفسه.
عمل اجتماع استراتيجية منتج مع كارلوس. "إحنا كنا مركزين أوي على الاستقرار وتصليح البجات،" ليو قال، وهو واقف قدام السبورة. "بس إيه اللي جاي؟ إيه الميزة الكبيرة الجاية اللي هتحمس مستخدمينا وتخلينا سابقين المنافسة؟"
كارلوس فضل ساكت للحظة. "أعتقد إننا بنسأل السؤال الغلط يا ليو." "قصدك إيه؟"
"المفروض منخمنش المستخدمين عايزين إيه،" كارلوس قال. "إحنا عندنا أكتر من ميت ألف مستخدم نشط دلوقتي. هما بيقولولنا هما عايزين إيه كل يوم من خلال آرائهم وسلوكهم. إحنا بس محتاجين نسمع."

كارلوس كان صح. تاني. غريزتي كمبدع كانت إني أخترع حاجة جديدة. غريزته كمهندس بيركز على المستخدم كانت إنه يسمع ويحسن.
قضينا الأسبوع اللي بعده بنعمل "غوص عميق" في بيانات المستخدمين وآرائهم. قرينا كل تذكرة دعم، كل تقييم في متجر التطبيقات، كل تعليق في منتدى مجتمعنا. كنا بندور على أنماط.
ونمط واضح جدًا ظهر. الطلب الأول للميزات، بفارق كبير جدًا، كان القدرة على التعلم مع الأصحاب.
المستخدمين كانوا عايزين تجربة اجتماعية. كانوا عايزين يعملوا مجموعات مذاكرة، ويتحدوا صحابهم، ويتتبعوا تقدم بعض.
دي مكنتش فكرتي الكبيرة الجاية، بس كانت بوضوح فكرة مستخدمينا الكبيرة الجاية.`},{lesson_number:49,text:`The next major project was born: "SkillUp Teams." It was an ambitious new feature that would allow users to form small, private groups. Leo and Carlos designed the architecture. It was complex. It required real-time chat, shared progress tracking, and a notification system. This was going to be a huge amount of work. "To build this right, we need more engineers," Carlos told Leo. "Just the two of us... it will take a year. We need to hire at least three more people for the product team." The company's growth was creating a cycle: more users led to more feature requests, which led to the need for a bigger team, which would hopefully lead to even more users.

As we started the hiring process for three new engineers, I felt a new kind of anxiety. How do we make sure that our new hires fit our culture? How do we even define our culture? Ben and I sat down and tried to write it down. We didn't want a generic corporate mission statement. We wanted to describe the way we actually worked. We came up with a few core values. "User First, Always." "Progress over Perfection." "Communicate Openly and Honestly." "Own Your Work." Creating this document was surprisingly helpful. It wasn't for the candidates; it was for us. It was a promise we were making to ourselves. As the company grew, these were the values we would fight to protect.`,translation:`المشروع الكبير اللي بعد كده اتولد: "فرق SkillUp". كانت ميزة جديدة طموحة هتسمح للمستخدمين بتكوين مجموعات صغيرة وخاصة.
ليو وكارلوس صمموا الهيكل. كان معقد. كان بيتطلب شات لحظي، وتتبع تقدم مشترك، ونظام إشعارات. ده كان هيبقى شغل كتير جدًا.
"عشان نبني ده صح، محتاجين مهندسين أكتر،" كارلوس قال لليو. "إحنا الاتنين بس... هياخد سنة. محتاجين نوظف ع الأقل تلات أشخاص تانيين لفريق المنتج."
نمو الشركة كان بيخلق دايرة: مستخدمين أكتر بيؤدوا لطلبات مميزات أكتر، وده بيؤدي للحاجة لفريق أكبر، وده كان من المأمول إنه يؤدي لمستخدمين أكتر كمان.

لما بدأنا عملية توظيف تلات مهندسين جداد، حسيت بنوع جديد من القلق. إزاي نتأكد إن الموظفين الجداد دول هيناسبوا ثقافتنا؟ إزاي أصلًا نعرّف ثقافتنا؟
أنا وبن قعدنا وحاولنا نكتبها. مكنّاش عايزين بيان رسالة شركة عام. كنا عايزين نوصف الطريقة اللي بنشتغل بيها فعلًا.
طلعنا بكام قيمة أساسية. "المستخدم أولًا، دائمًا." "التقدم أهم من الكمال." "تواصل بصراحة وصدق." "امتلك عملك."
عمل الوثيقة دي كان مفيد بشكل مدهش. مكنتش للمرشحين؛ كانت لينا إحنا. كانت وعد بنوعده لنفسنا. مع نمو الشركة، دي كانت القيم اللي هنحارب عشان نحافظ عليها.`},{lesson_number:50,text:`In the middle of the hiring process and the development of "SkillUp Teams," a date on the calendar caught Ben's eye. It had been exactly one year since Leo had walked out of OmniCorp. He showed it to Leo. They both just stared at the date for a moment. It felt like ten years and ten minutes had passed, all at the same time. They looked around their now-bustling office. There were seven employees. The whiteboard was covered in plans for the future. The quiet, empty room was a distant memory. The company was alive, breathing, and growing every day.

That afternoon, I needed a break. I walked to the park, the same park where this whole journey began. I sat on the same bench. And then, I saw something that made me stop. A young man was sitting on the grass, a guitar in his hands. He was focused, and he was smiling. On his phone, I could see the familiar, colorful interface of SkillUp. He played a chord. It was clean and confident. He looked at his phone, smiled wider, and then started playing the next chord in the lesson. I just watched him, a feeling I can't describe washing over me. All the stress, the sleepless nights, the difficult decisions... they all led to this. This one, simple, beautiful moment. A person, learning, feeling happy and successful. Our project wasn't about code, or money, or deadlines. It was about this. I finally understood. The Phoenix had not just risen; it had learned to fly. And now, it was teaching others to do the same.`,translation:`في نص عملية التوظيف وتطوير "فرق SkillUp"، تاريخ على النتيجة لفت عين بن. كان عدى بالظبط سنة من يوم ما ليو خرج من أومني كورب.
وراه لليو. هما الاتنين بصوا ع التاريخ للحظة. حسوا كأن عشر سنين وعشر دقايق عدوا، في نفس الوقت.
بصوا حواليهم في مكتبهم اللي بقى صاخب دلوقتي. كان فيه سبع موظفين. السبورة كانت متغطية بخطط للمستقبل. الأوضة الهادية الفاضية كانت ذكرى بعيدة. الشركة كانت حية، بتتنفس، وبتكبر كل يوم.

بعد الضهر ده، كنت محتاج استراحة. اتمشيت للحديقة، نفس الحديقة اللي الرحلة دي كلها بدأت فيها. قعدت على نفس الكنبة.
وبعدين، شفت حاجة خلتني أقف. راجل عجوز كان قاعد على النجيلة، بيتعلم يرسم باستخدام SkillUp على تابلت. مش بعيد عنه، مجموعة مراهقين كانوا بيضحكوا وهما بيتمرنوا على لغة جديدة مع بعض باستخدام ميزة 'الفرق' بتاعتنا.
الحديقة كانت مليانة باللحظات الصغيرة دي من التعلم، من التواصل، من التقدم. كانت رؤيتي الأولى خالص، الشرارة اللي جتلي من سنين، متجسدة قدامي.
مشروعنا مكنش عن كود، أو فلوس، أو مواعيد نهائية. كان عن ده. أنا أخيرًا فهمت. العنقاء مش بس قامت؛ هي اتعلمت تطير. ودلوقتي، كانت بتعلم غيرها يعملوا نفس الشيء.`},{lesson_number:51,text:`The hiring process was successful. Three new engineers joined Leo and Carlos, forming a strong, a five-person product team. The office was now a constant hum of activity. There were more meetings, more discussions, and a lot more coffee being consumed. For Leo, this was a huge adjustment. He was no longer just a coder; he was a manager. He spent less time writing code himself and more time planning, reviewing the team's work, and making sure everyone was moving in the same direction. It was a new skill he had to learn, and it wasn't always easy.

One morning, Chloe walked into the weekly leadership meeting looking worried. "There's something you need to see," she said, projecting her laptop screen onto the wall. It was an article from a major tech news website. The headline read: "LearnEasy launches with $10 million in funding to revolutionize online learning." Ben read the article out loud. LearnEasy was a new app, very similar to SkillUp. It had a beautiful design, and its biggest feature was social learning with friends. "They copied our idea," Leo said, his voice tight. "They copied the one big feature we've been working on for months." "It's worse than that," Chloe said quietly. "They launched it before we did."`,translation:`عملية التوظيف نجحت. تلات مهندسين جداد انضموا لليو وكارلوس، وشكلوا فريق منتج قوي من خمس أشخاص.
المكتب بقى همهمة نشاط مستمرة. كان فيه اجتماعات أكتر، ومناقشات أكتر، وقهوة أكتر بكتير بتتشرب.
بالنسبة لليو، ده كان تأقلم كبير. مبقاش مجرد مبرمج؛ بقى مدير. قضى وقت أقل بيكتب كود بنفسه ووقت أكتر بيخطط، وبيراجع شغل الفريق، وبيتأكد إن الكل ماشي في نفس الاتجاه. كانت مهارة جديدة لازم يتعلمها، ومكنتش دايمًا سهلة.

في صباح يوم، كلوي دخلت اجتماع القيادة الأسبوعي وشكلها قلقان. "فيه حاجة لازم تشوفوها،" قالت، وهي بتعرض شاشة اللابتوب بتاعها ع الحيطة.
كان مقال من موقع أخبار تقنية كبير. العنوان كان: "LearnEasy تنطلق بتمويل 10 مليون دولار لإحداث ثورة في التعليم عبر الإنترنت."
بن قرأ المقال بصوت عالي. LearnEasy كان أبلكيشن جديد، شبه SkillUp أوي. كان تصميمه جميل، وأكبر ميزة فيه كانت التعلم الاجتماعي مع الأصحاب.
"سرقوا فكرتنا،" ليو قال، وصوته مشدود. "سرقوا الميزة الكبيرة الوحيدة اللي شغالين عليها بقالنا شهور." "الموضوع أسوأ من كده،" كلوي قالت بهدوء. "هما أطلقوها قبلنا."`},{lesson_number:52,text:`My first reaction was pure panic. Then anger. How could this happen? We had a great idea, a unique idea, and now someone else, a company with more money and more resources, had beaten us to it. All the confidence from our recent success just vanished. I felt like we were back at square one, a small, irrelevant company about to be crushed by a bigger competitor. Mr. Harrison's voice from OmniCorp echoed in my head again: "Ninety percent of startups fail." I looked at Ben and Chloe. They were looking at me, waiting for my reaction. I was the product leader. I needed to have an answer. But in that moment, I had nothing. I just felt defeated.

Ben called an emergency all-hands meeting. All seven employees gathered in their small meeting room. The mood was tense. Everyone had seen the news about LearnEasy. Ben stood in front of the team. "Okay," he began, his voice calm and steady. "I know everyone is worried. A new, well-funded competitor has entered our market. This is a serious challenge. But panic is not a strategy. Today, we don't code. We don't market. Today, we think. We strategize." He handed out a notepad to everyone. "I want each of you to spend the next hour downloading and using the LearnEasy app. And I want you to answer one question: What do we do better?"`,translation:`أول رد فعل ليا كان ذعر خالص. بعدها غضب. إزاي ده يحصل؟ كان عندنا فكرة عظيمة، فكرة فريدة، ودلوقتي حد تاني، شركة معاها فلوس وموارد أكتر، سبقتنا ليها.
كل الثقة اللي جت من نجاحنا الأخير اختفت. حسيت إننا رجعنا لنقطة الصفر، شركة صغيرة، مش مهمة على وشك إنها تتسحق من منافس أكبر.
صوت مستر هاريسون من أومني كورب رن في وداني تاني: "تسعين في المية من الشركات الناشئة بتفشل." بصيت على بن وكلوي. كانوا بيبصولي، مستنيين رد فعلي. أنا كنت قائد المنتج. كنت لازم يبقى عندي إجابة. بس في اللحظة دي، معنديش أي حاجة. حسيت بالهزيمة وبس.

بن عمل اجتماع طارئ لكل الموظفين. كل السبع موظفين اتجمعوا في أوضة الاجتماعات الصغيرة بتاعتهم. الجو كان متوتر. الكل كان شاف الأخبار عن LearnEasy.
بن وقف قدام الفريق. "تمام،" بدأ، وصوته هادي وثابت. "أنا عارف إن الكل قلقان. منافس جديد وممول كويس دخل سوقنا. ده تحدي خطير. بس الذعر مش استراتيجية. النهاردة، إحنا مش هنكتب كود. مش هنسوق. النهاردة, إحنا هنفكر. هنعمل استراتيجية."
إدى لكل واحد نوتباد. "أنا عايز كل واحد فيكم يقضي الساعة الجاية بينزل وبيستخدم أبلكيشن LearnEasy. وعايزكم تجاوبوا على سؤال واحد: إحنا بنعمل إيه أحسن؟"`},{lesson_number:53,text:`An hour later, the team came back together. The whiteboard was filled with notes. "Okay, what did we learn?" Ben asked. "Their design is very polished," Carlos said. "Maybe even better than ours in some places." "Their marketing is aggressive. They have ads everywhere already," Chloe added. The team listed all the strengths of their new competitor. The mood in the room grew heavier. "Okay," Leo finally said, stepping up to the board. "All of that is true. But what do they NOT have? What do we do better?" Chloe was the first to speak. "Their community support is terrible. It's all automated. There's no human touch. They have users, but we have a community." "And their content," Carlos added. "Our lessons are designed like a game, with a sense of progress. Theirs feel like a boring textbook."

Chloe and Carlos were right. Suddenly, I saw it clearly. LearnEasy was a beautiful, empty shell. It had the features, but it didn't have a soul. It didn't have a philosophy. Our strength wasn't just a single feature like "Teams." It was our core belief. The belief that learning should be fun and that learners need support. That was our "moat" - the defensive advantage that our competitor couldn't easily copy. "So that's our strategy," I said to the team, a new wave of energy in my voice. "We don't try to beat them at their game of spending money. We beat them by being more human. We double down on our community. We double down on creating the most engaging, game-like learning content in the world."`,translation:`بعد ساعة، الفريق رجع تاني مع بعض. السبورة كانت مليانة ملاحظات. "تمام، اتعلمنا إيه؟" بن سأل.
"تصميمهم متلمع جدًا،" كارلوس قال. "يمكن أحسن من بتاعنا في بعض الأماكن." "تسويقهم شرس. عندهم إعلانات في كل حتة فعلًا،" كلوي أضافت.
الفريق عدد كل نقاط قوة منافسهم الجديد. الجو في الأوضة بقى أتقل. "تمام،" ليو قال أخيرًا، وهو بيتقدم ناحية السبورة. "كل ده حقيقي. بس هما معندهمش إيه؟ إحنا بنعمل إيه أحسن؟"
كلوي كانت أول واحدة تتكلم. "دعم مجتمعهم فظيع. كله آلي. مفيش لمسة إنسانية. هما عندهم مستخدمين، بس إحنا عندنا مجتمع." "والمحتوى بتاعهم،" كارلوس أضاف. "دروسنا مصممة زي اللعبة، بإحساس بالتقدم. بتاعتهم بتحس كأنها كتاب مدرسي ممل."

كلوي وكارلوس كانوا صح. فجأة، شفتها بوضوح. LearnEasy كانت صدفة جميلة وفاضية. كان عندها المميزات، بس معندهاش روح. معندهاش فلسفة.
قوتنا مكنتش مجرد ميزة واحدة زي "الفرق". كانت إيماننا الأساسي. الإيمان بأن التعلم لازم يكون ممتع وإن المتعلمين محتاجين دعم. ده كان "الخندق" بتاعنا - الميزة الدفاعية اللي منافسنا ميقدرش يقلدها بسهولة.
"يبقى هي دي استراتيجيتنا،" قلت للفريق، وموجة طاقة جديدة في صوتي. "إحنا مش هنحاول نغلبهم في لعبتهم بتاعة صرف الفلوس. إحنا هنغلبهم بإننا نكون إنسانيين أكتر. هنركز أضعاف على مجتمعنا. هنركز أضعاف على خلق أكتر محتوى تعليمي جذاب وشبيه باللعبة في العالم."`},{lesson_number:54,text:`The threat from LearnEasy didn't destroy SkillUp. Instead, it gave the team something incredibly valuable: clarity. It forced them to define what truly made their product special. The "SkillUp Teams" feature was no longer just about learning with friends. It became a community-building tool. The product team, led by Leo and Carlos, started working on new ideas. Not just features, but experiences. They designed "Weekly Community Challenges," where users could work together to achieve a common learning goal. They started planning "Live Q&A Sessions" with experts, hosted by Chloe.

The next time they had a meeting with Sarah Jenkins, she brought up the topic of LearnEasy. "I saw the news," she said. "Are you worried?" "We were," Ben admitted. "But not anymore. The competition has forced us to be better. It's clarified our mission." Leo then explained their new strategy – to focus on community and engagement rather than just features. Sarah nodded, a slight smile on her face. "Good," she said. "That's the answer I was hoping to hear. Any company can copy a feature. It's much harder to copy a passionate community and a unique product philosophy. This is no longer just about hitting deadlines. It's about building a brand that people love."`,translation:`التهديد من LearnEasy مدمرش SkillUp. بدل كده، هو إدى الفريق حاجة قيمة بشكل لا يصدق: وضوح.
أجبرهم يحددوا إيه اللي بيخلي منتجهم مميز بجد. ميزة "فرق SkillUp" مبقتش بس عن التعلم مع الأصحاب. بقت أداة لبناء المجتمع.
فريق المنتج، بقيادة ليو وكارلوس، بدأ يشتغل على أفكار جديدة. مش بس مميزات، لكن تجارب. صمموا "تحديات مجتمعية أسبوعية،" يقدر فيها المستخدمين يشتغلوا مع بعض عشان يحققوا هدف تعليمي مشترك.
بدأوا يخططوا لـ"جلسات أسئلة وأجوبة مباشرة" مع خبراء، تقدمها كلوي.

المرة الجاية اللي كان عندهم اجتماع مع سارة جينكينز، هي فتحت موضوع LearnEasy.
"أنا شفت الأخبار،" قالت. "قلقانين؟" "كنا،" بن اعترف. "بس مش دلوقتي. المنافسة أجبرتنا نكون أحسن. وضحت رسالتنا."
ليو بعدها شرح استراتيجيتهم الجديدة – التركيز على المجتمع والتفاعل بدلًا من مجرد المميزات.
سارة هزت راسها، وابتسامة خفيفة على وشها. "كويس،" قالت. "دي الإجابة اللي كنت بتمنى أسمعها. أي شركة تقدر تقلد ميزة. أصعب بكتير تقلد مجتمع شغوف وفلسفة منتج فريدة. الموضوع مبقاش بس عن الالتزام بالمواعيد النهائية. بقى عن بناء علامة تجارية الناس بتحبها."`},{lesson_number:55,text:`Our first big community event was a "Live Q&A" with a famous guitarist. Chloe organized the whole thing. We were expecting maybe a hundred people to join the livestream. Over two thousand people showed up. I watched the event from the back of the office. Chloe was a natural host. Users were asking amazing questions. The guitarist was sharing incredible stories and tips. And in the chat, hundreds of users were talking to each other, helping each other, encouraging each other. It felt magical. This was more than an app. This was more than a company. It was a movement. A community of people all connected by a desire to learn and grow. We weren't just a competitor to LearnEasy; we were the alternative.

The arrival of a competitor marked the end of SkillUp's childhood. They were now a real player in a competitive market. They had a clear identity, a strong team, and a passionate community. Leo, Ben, Carlos, and Chloe were the leadership team. They now had a weekly strategy meeting where they looked at the bigger picture. They didn't just talk about what they would build in the next month, but where they wanted the company to be in the next year, and the next five years. The Phoenix Project was no longer just about one app. It was about building a platform. A platform that could truly change the way the world learned. The dream was getting bigger every day.`,translation:`أول حدث مجتمعي كبير لينا كان "سؤال وجواب مباشر" مع عازف جيتار مشهور. كلوي نظمت الموضوع كله. كنا متوقعين يمكن ميت شخص ينضموا للبث المباشر. أكتر من ألفين شخص حضروا.
كنت بتفرج ع الحدث من آخر المكتب. كلوي كانت مضيفة بالفطرة. المستخدمين كانوا بيسألوا أسئلة مدهشة. عازف الجيتار كان بيشارك قصص ونصايح لا تصدق.
وفي الشات، مئات المستخدمين كانوا بيتكلموا مع بعض، وبيساعدوا بعض، وبيشجعوا بعض.
الإحساس كان سحري. ده كان أكتر من أبلكيشن. ده كان أكتر من شركة. كانت حركة. مجتمع من الناس كلهم متصلين برغبة في التعلم والنمو. إحنا مكنّاش مجرد منافس لـ LearnEasy؛ إحنا كنا البديل.

وصول منافس كان بمثابة نهاية طفولة SkillUp. هما بقوا لاعب حقيقي في سوق تنافسي. كان عندهم هوية واضحة، وفريق قوي، ومجتمع شغوف.
ليو، بن، كارلوس، وكلوي كانوا فريق القيادة. بقى عندهم اجتماع استراتيجي أسبوعي بيبصوا فيه على الصورة الأكبر.
مبقوش بس بيتكلموا عن إيه اللي هيبنوه في الشهر الجاي، لكن عن فين عايزين الشركة تكون في السنة الجاية، والخمس سنين الجايين.
"مشروع العنقاء" مبقاش بس عن أبلكيشن واحد. بقى عن بناء منصة. منصة تقدر فعلًا تغير طريقة تعلم العالم. الحلم كان بيكبر كل يوم.`},{lesson_number:56,text:`With the company's new focus on community and engagement, the product team was busier than ever. They quickly realized there were two different kinds of work. First, there was the "new stuff" – designing and building exciting new features like the Community Challenges. Second, there was the "old stuff" – fixing bugs, improving existing features, and making the app faster and more reliable. Balancing these two types of work was a major challenge. If they only focused on new features, the quality of the app would suffer. If they only focused on maintenance, the app would become boring and competitors like LearnEasy would get ahead.

To solve this problem, Leo introduced a "Product Roadmap." He dedicated a huge section of the office whiteboard to it. He drew a timeline for the next six months. He divided the product team's time. "From now on," he announced to the team, "we will dedicate 70% of our time to new features and 30% to 'health of the product' – maintenance, bug fixes, and performance improvements." "And how do we decide which new features to build?" asked one of the new engineers. "Great question," Leo said. "We'll use a simple system. We'll prioritize features based on two factors: the impact it will have on our users, and the effort it will take to build. High-impact, low-effort ideas go to the top of the list."`,translation:`مع تركيز الشركة الجديد على المجتمع والتفاعل، فريق المنتج كان مشغول أكتر من أي وقت فات. اكتشفوا بسرعة إن فيه نوعين مختلفين من الشغل.
أولًا، كان فيه "الحاجات الجديدة" – تصميم وبناء مميزات جديدة ومثيرة زي التحديات المجتمعية. ثانيًا، كان فيه "الحاجات القديمة" – تصليح بجات، وتحسين المميزات الموجودة، وجعل الأبلكيشن أسرع وأكتر موثوقية.
الموازنة بين النوعين دول من الشغل كانت تحدي كبير. لو ركزوا بس على المميزات الجديدة، جودة الأبلكيشن هتتأثر. ولو ركزوا بس على الصيانة، الأبلكيشن هيبقى ممل والمنافسين زي LearnEasy هيسبقوهم.

عشان يحل المشكلة دي، ليو قدم "خارطة طريق المنتج." خصص جزء ضخم من سبورة المكتب ليها.
رسم جدول زمني للست شهور الجايين. قسم وقت فريق المنتج. "من دلوقتي،" أعلن للفريق، "هنخصص 70% من وقتنا للمميزات الجديدة و 30% لـ 'صحة المنتج' – صيانة، تصليح بجات، وتحسينات أداء."
"وإزاي هنقرر أنهي مميزات جديدة نبنيها؟" سأل واحد من المهندسين الجداد.
"سؤال عظيم،" ليو قال. "هنستخدم نظام بسيط. هنرتب أولوية المميزات بناءً على عاملين: التأثير اللي هتعمله على مستخدمينا، والمجهود اللي هتاخده عشان تتبني. أفكار التأثير العالي والمجهود القليل بتتحط في أول القايمة."`},{lesson_number:57,text:`That 30% of our time for "health of the product" was so important. In the early days, to meet deadlines, I made a lot of quick and dirty coding decisions. I built things that worked, but they weren't clean or efficient. In the software world, we call this "technical debt." It's like taking a loan. It helps you move faster in the short term, but you have to pay it back later. If you don't, the interest grows. The code becomes slow, buggy, and almost impossible to update. A big part of our 30% was dedicated to paying back this debt: rewriting old, messy parts of the code to make them clean and strong. It wasn't glamorous work – users would never see it – but it was essential for the long-term survival of our product.

As the company grew, a new kind of problem started to appear. A communication problem. When it was just four people in a room, everyone knew what everyone else was doing. Now, with a team of twelve, information started to get lost. The marketing team would plan a campaign for a new feature, not knowing that the engineering team had delayed that feature by a week. A customer support agent would promise a user a bug fix, not realizing how complex the bug actually was. They were becoming less efficient, not more.`,translation:`الـ 30% من وقتنا لـ "صحة المنتج" دول كانوا مهمين أوي. في الأيام الأولى، عشان ألتزم بالمواعيد النهائية، خدت قرارات برمجة سريعة ومش نظيفة كتير. بنيت حاجات كانت بتشتغل، بس مكنتش نظيفة أو فعالة. في عالم البرمجة، بنسمي ده "ديون تقنية."
هو زي ما تكون بتاخد قرض. بيساعدك تتحرك أسرع في المدى القصير، بس لازم تسدده بعدين. لو معملتش كده، الفايدة بتزيد. الكود بيبقى بطيء، ومليان بجات، وشبه مستحيل تحدثه.
جزء كبير من الـ 30% بتوعنا كان مخصص لسداد الدين ده: إعادة كتابة أجزاء قديمة ومكركبة من الكود عشان نخليها نظيفة وقوية. ده مكنش شغل براق – المستخدمين عمرهم ما هيشوفوه – بس كان ضروري لبقاء منتجنا على المدى الطويل.

مع نمو الشركة، نوع جديد من المشاكل بدأ يظهر. مشكلة تواصل. لما كانوا أربع أفراد بس في أوضة، كل واحد كان عارف التاني بيعمل إيه. دلوقتي، مع فريق من اتناشر واحد، المعلومات بدأت تضيع.
فريق التسويق يخطط لحملة لميزة جديدة، وهما ميعرفوش إن فريق الهندسة أخر الميزة دي أسبوع. وكيل خدمة عملاء يوعد مستخدم بتصليح بج، وهو مش مدرك قد إيه البج ده معقد. بقوا أقل كفاءة، مش أكتر.`},{lesson_number:58,text:`Ben saw the communication problem getting worse. He decided to introduce a new company tradition. "Starting this Friday," he announced, "we will have a weekly 'All-Hands' meeting. Every Friday afternoon, the entire company will get together for 30 minutes." "What will we talk about?" Chloe asked. "Three things," Ben explained. "First, each department leader – Leo, Chloe, and myself – will give a two-minute update on our biggest achievements and challenges of the week. Second, we will welcome any new employees. And third, the final ten minutes will be an open 'Ask Me Anything' session. Anyone can ask the leadership team any question." "Even tough questions?" someone from the support team asked. "Especially tough questions," Ben replied. "Transparency is the only way this works."

I was nervous before the first All-Hands meeting. I'm an introvert. I'm not comfortable speaking in front of a group. But as I stood up and gave my update on the product team's progress, I realized how important this was. The customer support team finally understood why a certain bug was so hard to fix. The marketing team got a sneak peek at a new feature they could start planning for. And during the "Ask Me Anything" session, the questions were amazing. People asked about our long-term vision, about our competition, about our financial health. Answering them openly and honestly made me realize that these weren't just employees. They were stakeholders. They were as invested in the success of the Phoenix Project as we were.`,translation:`بن شاف مشكلة التواصل بتسوء. قرر يقدم تقليد جديد للشركة.
"بداية من يوم الجمعة ده،" أعلن، "هيبقى عندنا اجتماع 'لكل الموظفين' أسبوعي. كل يوم جمعة بعد الضهر، الشركة كلها هتتجمع لمدة 30 دقيقة."
"هنتكلم في إيه؟" كلوي سألت. "تلات حاجات،" بن شرح. "أولًا، كل قائد قسم – ليو، كلوي، وأنا – هيدي تحديث لمدة دقيقتين عن أكبر إنجازاتنا وتحدياتنا في الأسبوع. ثانيًا، هنرحب بأي موظفين جداد. وثالثًا، آخر عشر دقايق هتبقى جلسة 'اسألني أي حاجة' مفتوحة. أي حد يقدر يسأل فريق القيادة أي سؤال."
"حتى الأسئلة الصعبة؟" حد من فريق الدعم سأل. "خصوصًا الأسئلة الصعبة،" بن رد. "الشفافية هي الطريقة الوحيدة اللي ده ينجح بيها."

كنت متوتر قبل أول اجتماع لكل الموظفين. أنا انطوائي. مش برتاح وأنا بتكلم قدام مجموعة.
بس وأنا واقف وبتدي تحديثي عن تقدم فريق المنتج، أدركت قد إيه ده مهم. فريق خدمة العملاء أخيرًا فهم ليه بج معين كان صعب يتصلح. فريق التسويق خد لمحة عن ميزة جديدة يقدروا يبدأوا يخططوا لها.
وخلال جلسة 'اسألني أي حاجة'، الأسئلة كانت مدهشة. الناس سألت عن رؤيتنا طويلة المدى، وعن منافستنا، وعن صحتنا المالية. إني أجاوبهم بصراحة وصدق خلاني أدرك إن دول مش مجرد موظفين. هما أصحاب مصلحة. هما مستثمرين في نجاح مشروع العنقاء زينا بالظبط.`},{lesson_number:59,text:`Just as SkillUp was finding its rhythm as a growing company, a new piece of news sent shockwaves through the office. OmniCorp, their partner, announced that they were shutting down their old learning software much sooner than expected. This was good news. But they also announced its replacement. It wasn't just a recommendation for SkillUp. They were launching their own, brand new learning app. An app built to compete directly with SkillUp. Their biggest partner had just become their biggest competitor.

The leadership team was in shock. "They betrayed us," Chloe said, her voice full of anger. "They used our ideas. They saw our success, and now they want to copy it and use their massive brand to crush us." "This can't be legal," Leo said, thinking about their partnership contract. "They can't do this, can they?" Ben, who had been silently reading the official press release, looked up. His face was grim. "They can," he said. "The contract prevents them from copying our code, but it doesn't prevent them from building their own competing product. We never thought they would. We were naive."`,translation:`في الوقت اللي SkillUp كانت بتلاقي فيه إيقاعها كشركة نامية، خبر جديد نزل زي الصاعقة في المكتب.
أومني كورب، شريكتهم، أعلنت إنها هتقفل برنامجها التعليمي القديم أبدر بكتير من المتوقع. ده كان خبر حلو.
بس هما أعلنوا كمان عن بديله. مكنتش مجرد توصية بـ SkillUp. كانوا بيطلقوا الأبلكيشن التعليمي الجديد الخاص بيهم. أبلكيشن مبني عشان ينافس SkillUp مباشرةً.
أكبر شريك ليهم لسه متحول لأكبر منافس ليهم.

فريق القيادة كان مصدوم. "خانونا،" كلوي قالت، وصوتها مليان غضب. "استخدموا أفكارنا. شافوا نجاحنا، ودلوقتي عايزين يقلدوه ويستخدموا علامتهم التجارية الضخمة عشان يسحقونا."
"ده مش ممكن يكون قانوني،" ليو قال، وهو بيفكر في عقد الشراكة بتاعهم. "هما ميقدروش يعملوا كده، صح؟"
بن، اللي كان بيقرأ البيان الصحفي الرسمي بصمت، رفع عينيه. وشه كان متجهّم.
"يقدروا،" قال. "العقد بيمنعهم يقلدوا الكود بتاعنا، بس مش بيمنعهم يبنوا منتج منافس خاص بيهم. إحنا عمرنا ما فكرنا إنهم هيعملوا كده. إحنا كنا ساذجين."`},{lesson_number:60,text:`I felt a strange sense of déjà vu. Here we go again. David versus Goliath. But this time, Goliath wasn't just a lazy, old giant. This was a new, modern Goliath, with a huge budget and direct access to the millions of users they had promised us. All our hard work, our clever strategy... it felt like it was all for nothing. How could we possibly compete against that? The panic I felt when LearnEasy launched was nothing compared to this. This felt like a checkmate. This felt like the end. I looked at Ben, expecting to see the same fear in his eyes. But I saw something different. I saw a look of cold, hard determination.

Ben stood up. "This changes nothing," he said, his voice surprisingly strong. "Does anyone in this room honestly think that a massive, slow corporation like OmniCorp can build a better product than we can? A product with more soul? A product with a better community?" He looked around at the faces of his team. "They have money. They have size. We have speed. We have passion. And we have a one-year head start. This is not a time for fear. This is a time for action." He walked to the whiteboard and picked up a marker. "Leo, tell me about the 'SkillUp Teams' feature. How soon can we launch it?" The fight was not over. In fact, it had just truly begun.`,translation:`حسيت بإحساس غريب بالـ'ديجافو'. أدينا بنرجع تاني. داوود ضد جالوت. بس المرة دي، جالوت مكنش مجرد عملاق عجوز وكسول. ده كان جالوت جديد ومودرن، بميزانية ضخمة ووصول مباشر لملايين المستخدمين اللي وعدونا بيهم.
كل شغلنا الشاق، استراتيجيتنا الذكية... حسيت كأنه راح هدر. إزاي ممكن ننافس ده أصلًا؟ الذعر اللي حسيته لما LearnEasy انطلق كان ولا حاجة جنب ده. ده كان إحساس 'كش ملك'. ده كان إحساس النهاية.
بصيت على بن، متوقع أشوف نفس الخوف في عينيه. بس أنا شفت حاجة مختلفة. شفت نظرة تصميم باردة وقاسية.

بن وقف. "ده مش بيغير أي حاجة،" قال، وصوته قوي بشكل مفاجئ. "هل أي حد في الأوضة دي بجد يعتقد إن شركة ضخمة وبطيئة زي أومني كورب تقدر تبني منتج أحسن مننا؟ منتج فيه روح أكتر؟ منتج بمجتمع أحسن؟"
بص حواليه على وشوش فريقه. "هما معاهم فلوس. معاهم حجم. إحنا معانا سرعة. معانا شغف. ومعانا سنة سبق. ده مش وقت للخوف. ده وقت للعمل."
راح ناحية السبورة ومسك ماركر. "ليو، قولي عن ميزة 'فرق SkillUp'. إمتى نقدر نطلقها؟"
المعركة مكنتش خلصت. في الحقيقة، هي كانت لسه بادئة بجد.`},{lesson_number:61,text:`Ben’s words had a powerful effect on the team. The initial shock and fear turned into a focused energy. Their office, once again, transformed into a "war room." The product roadmap for the next six months was completely erased. On the whiteboard, Ben wrote one single goal: "Launch 'SkillUp Teams' before OmniCorp launches their app." The OmniCorp launch was in two months. That meant they had to build their most ambitious feature ever in a fraction of the planned time. It seemed impossible. But the shared threat created a powerful sense of unity. They weren't just a company anymore; they were an underdog fighting a giant.

Leo gathered his engineering team. The mood was serious but determined. "Okay," he started. "We have an impossible deadline. We cannot build the entire, perfect version of 'SkillUp Teams' in two months. It's not possible. But we don't have to." "What do you mean?" Carlos asked. "We need to focus on the 'Minimum Lovable Product'," Leo explained, borrowing a term from the startup world. "What is the absolute smallest, simplest version of this feature that our users will still love? We need to be ruthless. We cut everything that is not absolutely essential. We focus only on the core experience."`,translation:`كلمات بن كان ليها تأثير قوي على الفريق. الصدمة والخوف المبدئيين اتحولوا لطاقة مركزة.
مكتبهم، مرة تانية، اتحول لـ "غرفة حرب". خارطة طريق المنتج للست شهور الجايين اتمسحت تمامًا.
على السبورة، بن كتب هدف واحد بس: "إطلاق 'فرق SkillUp' قبل ما أومني كورب تطلق الأبلكيشن بتاعها."
إطلاق أومني كورب كان في خلال شهرين. ده معناه إنهم لازم يبنوا أكتر ميزة طموحة ليهم في جزء صغير من الوقت المخطط له. كان يبدو مستحيلًا.
بس التهديد المشترك خلق إحساس قوي بالوحدة. مبقوش مجرد شركة؛ كانوا الطرف الأضعف اللي بيحارب عملاق.

ليو جمع فريقه الهندسي. الجو كان جاد بس مليان إصرار. "تمام،" بدأ. "عندنا موعد نهائي مستحيل. منقدرش نبني النسخة الكاملة والمثالية من 'فرق SkillUp' في شهرين. ده مش ممكن. بس إحنا مش مضطرين."
"قصدك إيه؟" كارلوس سأل. "لازم نركز على 'المنتج الأدنى المحبوب'،" ليو شرح، وهو بيستعير مصطلح من عالم الشركات الناشئة.
"إيه هي أصغر وأبسط نسخة من الميزة دي اللي مستخدمينا هيفضلوا يحبوها؟ لازم نكون قاسيين. هنلغي كل حاجة مش ضرورية تمامًا. هنركز بس على التجربة الأساسية."`},{lesson_number:62,text:`To move faster than ever before, I changed the way our team worked. I introduced a new methodology called "sprints." Instead of a long, six-month plan, we broke down the project into two-week "sprints." At the beginning of each sprint, we would set a very clear, small goal. And for the next two weeks, the entire team would focus on nothing but achieving that single goal. This created an incredible sense of urgency and progress. Every two weeks, we had something new and functional to show for our work. The impossible deadline started to feel... possible. This new way of working under pressure was stressful, but it was also incredibly effective.

While the engineering team was building, Chloe was preparing the battlefield. She knew they couldn't compete with OmniCorp's marketing budget. So she focused on their secret weapon: their community. She started a "Beta Testers Club" for their most active and passionate users. She gave them early access to the new features and asked for their direct feedback. She made them feel like they were part of the team, co-creating the product with them. These users became their most powerful advocates, ready to spread the word the moment the new feature launched.`,translation:`عشان نتحرك أسرع من أي وقت فات، أنا غيرت طريقة شغل فريقنا. قدمت منهجية جديدة اسمها "سباقات السرعة" أو "sprints".
بدل خطة طويلة لست شهور، كسرنا المشروع لـ"سباقات سرعة" مدتها أسبوعين. في بداية كل سباق، كنا بنحدد هدف واضح وصغير جدًا.
وللأسبوعين الجايين، الفريق كله كان بيركز على حاجة واحدة بس وهي تحقيق الهدف ده.
ده خلق إحساس لا يصدق بالإلحاح والتقدم. كل أسبوعين، كان بيبقى عندنا حاجة جديدة وشغالة نوريها لشغلنا. الموعد النهائي المستحيل بدأ يحس إنه... ممكن. الطريقة الجديدة دي في الشغل تحت ضغط كانت مجهدة, بس كانت فعالة بشكل لا يصدق.

في الوقت اللي الفريق الهندسي كان بيبني، كلوي كانت بتجهز أرض المعركة. كانت عارفة إنهم ميقدروش ينافسوا ميزانية تسويق أومني كورب. فركزت على سلاحهم السري: مجتمعهم.
بدأت "نادي المختبرين التجريبيين" لمستخدمينهم الأكثر نشاطًا وشغفًا. إدتهم وصول مبكر للمميزات الجديدة وطلبت آرائهم المباشرة.
خلتهم يحسوا إنهم جزء من الفريق، بيشاركوا في خلق المنتج معاهم. المستخدمين دول بقوا أقوى مدافعين عنهم، جاهزين لنشر الكلمة في لحظة إطلاق الميزة الجديدة.`},{lesson_number:63,text:`One evening, Leo received an unexpected email. It was from a junior engineer at OmniCorp, someone he used to mentor. The email was short and cryptic. "Subject: Be Careful. Body: Leo, I can't say much. Just know that OmniCorp's new app is a direct copy of your old prototype. The one you showed them in the partnership meeting. They are using your design, your ideas. Be prepared. Good luck." Leo's hands clenched into fists. It was worse than he thought. It wasn't just competition. It was theft. He showed the email to Ben. Ben's face hardened. "Okay," he said after a long silence. "This doesn't change our strategy. It just makes winning even more important."

The weeks leading up to the launch were the most intense of my life. We were all working close to 100 hours a week. The lines between day and night blurred. The office became our home. The pressure was immense. And it started to show. The team was exhausted. Small disagreements turned into arguments. People were making silly mistakes. We were all on the edge of burnout. As the leader, I felt a huge weight of responsibility. Not just for the product, but for my team. Pushing them harder wasn't the answer. I had to protect them. One Friday afternoon, I stood up. "Everyone," I said. "Go home. Now. Don't come back until Monday morning. Don't check your email. Don't think about code. Just rest. That's an order."`,translation:`في مساء يوم، ليو استقبل إيميل غير متوقع. كان من مهندس صغير في أومني كورب، حد كان بيدربه زمان.
الإيميل كان قصير وغامض. "الموضوع: خلي بالك. المحتوى: ليو، مقدرش أقول كتير. بس اعرف إن أبلكيشن أومني كورب الجديد هو نسخة طبق الأصل من نسختك التجريبية القديمة. اللي وريتها لهم في اجتماع الشراكة. هما بيستخدموا تصميمك، أفكارك. استعد. بالتوفيق."
إيدين ليو اتقبضت. كان أسوأ مما تخيل. مكنتش مجرد منافسة. كانت سرقة.
ورى الإيميل لبن. وش بن تصلب. "تمام،" قال بعد صمت طويل. "ده مش بيغير استراتيجيتنا. هو بس بيخلي الفوز أهم بكتير."

الأسابيع اللي قبل الإطلاق كانت أكثف أسابيع في حياتي. كنا كلنا بنشتغل حوالي 100 ساعة في الأسبوع. الخطوط بين النهار والليل دابت. المكتب بقى بيتنا.
الضغط كان رهيب. وبدأ يبان. الفريق كان مرهق. خلافات صغيرة كانت بتتحول لخناقات. الناس كانت بتعمل غلطات تافهة. كلنا كنا على حافة الانهيار.
كقائد، حسيت بمسؤولية ضخمة. مش بس للمنتج، لكن لفريقي. إني أضغط عليهم أكتر مكنش الحل. كان لازم أحميهم.
في عصر يوم جمعة، وقفت. "يا جماعة،" قلت. "كل واحد يروح. دلوقتي. ومترجعوش لحد يوم الإتنين الصبح. متفتحوش إيميلاتكم. متفكروش في كود. بس ارتاحوا. ده أمر."`},{lesson_number:64,text:`The enforced weekend of rest worked. The team came back on Monday with renewed energy. They managed to finish the "Minimum Lovable Product" version of "SkillUp Teams" just in time. The day before their launch, the team gathered. It was also the day OmniCorp was launching their new app. A strange, tense quiet fell over the office as they all watched the OmniCorp launch event on a livestream. The app was exactly as the email had warned. A polished, corporate copy of SkillUp's core ideas. It looked good. But it felt cold. Soulless. "Okay," Leo said, shutting off the livestream. "They've made their move. Tomorrow, we make ours."

Their launch was not a big press event. It was a blog post, written by Chloe. But it was a very special blog post. She told their story. The real story. She wrote about Leo leaving OmniCorp. About their struggles. About their fight with OmniCorp's lawyers. And about how OmniCorp's new app was a direct copy of their ideas. "We can't compete with their money," she wrote at the end. "We can only compete with our passion and our community. If you believe in the underdog, if you believe in authentic creators, today is the day to show your support. Try SkillUp Teams. Tell a friend. The future of SkillUp is in your hands now." Ben hit "publish." The story was out.`,translation:`الويك إند الإجباري من الراحة جاب نتيجة. الفريق رجع يوم الإتنين بطاقة متجددة. قدروا يخلصوا نسخة "المنتج الأدنى المحبوب" من "فرق SkillUp" في الوقت المناسب بالظبط.
اليوم اللي قبل إطلاقهم، الفريق اتجمع. كان كمان اليوم اللي أومني كورب بتطلق فيه الأبلكيشن الجديد بتاعها.
صمت غريب ومتوتر نزل على المكتب وهما بيتفرجوا على حدث إطلاق أومني كورب في بث مباشر. الأبلكيشن كان بالظبط زي ما الإيميل حذر.
نسخة متلمعة ومن شركة كبيرة لأفكار SkillUp الأساسية. كان شكله حلو. بس إحساسه كان بارد. بلا روح.
"تمام،" ليو قال، وهو بيقفل البث. "هما عملوا حركتهم. بكرة، إحنا هنعمل حركتنا."

إطلاقهم مكنش حدث صحفي كبير. كان منشور على مدونة، كتبته كلوي. بس كان منشور خاص جدًا.
حكت قصتهم. القصة الحقيقية. كتبت عن ترك ليو لأومني كورب. وعن صراعاتهم. وعن خناقتهم مع محامين أومني كورب.
وعن إزاي أبلكيشن أومني كورب الجديد كان نسخة طبق الأصل من أفكارهم.
"منقدرش ننافس فلوسهم،" كتبت في النهاية. "نقدر بس ننافس بشغفنا وبمجتمعنا. لو بتؤمن بالطرف الأضعف، لو بتؤمن بالمبدعين الحقيقيين، النهاردة هو يوم إظهار دعمك. جرب 'فرق SkillUp'. قول لصاحب. مستقبل SkillUp في إيديكم دلوقتي."
بن داس "نشر". القصة انتشرت.`},{lesson_number:65,text:`What happened next was beyond anything we could have imagined. The story exploded online. Our "Beta Testers Club" shared it everywhere. Tech bloggers and journalists picked it up. "David vs. Goliath: The Startup Fighting Back Against a Corporate Giant." People weren't just downloading our app. They were joining our cause. Our server traffic went up by 500%. But more importantly, our social media was flooded with messages of support. People were angry at OmniCorp. They were cheering for us. It wasn't a product launch; it was a movement. I watched the analytics screen, but this time I wasn't just looking at user numbers. I was watching a community rise up to defend a product they loved.

By the end of the day, it was clear who had won the launch. OmniCorp's app got a decent number of downloads, but its user reviews were mixed, calling it a "boring copy." SkillUp, on the other hand, was the talk of the tech world. Their user base doubled. And their community was more passionate and loyal than ever before. The leadership team gathered that night, not in exhaustion, but in awe. They had faced their worst nightmare and turned it into their greatest victory. "You know," Chloe said, looking at the thousands of positive comments online. "They did us a favor. They gave us a story. And a good story is the best marketing you can ever have." Leo looked at his team, his friends. They hadn't just built an app. They had built something worth fighting for. And that was the truest victory of all.`,translation:`اللي حصل بعد كده كان يفوق أي حاجة ممكن نتخيلها. القصة انفجرت على النت. "نادي المختبرين التجريبيين" بتاعنا شيروها في كل حتة.
المدونين التقنيين والصحفيين لقطوها. "داوود ضد جالوت: الشركة الناشئة اللي بتقاوم عملاق الشركات."
الناس مكنتش بس بتنزل الأبلكيشن بتاعنا. كانوا بينضموا لقضيتنا. زيارات السيرفر بتاعنا زادت 500%.
بس الأهم، السوشيال ميديا بتاعتنا غرقت برسايل دعم. الناس كانت غضبانة من أومني كورب. كانوا بيشجعونا. ده مكنش إطلاق منتج؛ كانت حركة.
كنت بتفرج على شاشة التحليل، بس المرة دي مكنتش ببص على أرقام المستخدمين وبس. كنت بتفرج على مجتمع بينهض عشان يدافع عن منتج بيحبه.

بنهاية اليوم، كان واضح مين اللي كسب الإطلاق. أبلكيشن أومني كورب جاب عدد تحميلات لا بأس به، بس تقييمات مستخدمينه كانت متباينة، بيسموه "نسخة مملة."
SkillUp، من ناحية تانية، كان حديث عالم التكنولوجيا. قاعدة مستخدمينه اتضاعفت. ومجتمعهم كان أكتر شغفًا وولاءً من أي وقت فات.
فريق القيادة اتجمع بالليل ده، مش في إرهاق، لكن في ذهول. واجهوا أسوأ كوابيسهم وحولوه لأعظم انتصار ليهم.
"تعرفوا،" كلوي قالت، وهي بتبص على آلاف التعليقات الإيجابية على النت. "هما عملوا فينا معروف. إدونا قصة. والقصة الحلوة هي أحسن تسويق ممكن تعمله."
ليو بص على فريقه، صحابه. هما مش بس بنوا أبلكيشن. هما بنوا حاجة تستاهل إنك تحارب عشانها. وده كان الانتصار الحقيقي.`},{lesson_number:66,text:`The victory against OmniCorp was exhilarating. The SkillUp team spent a week riding a wave of positive press and massive user growth. Their app was number one in the education category in several countries. It felt like they had finally, truly made it. But Ben, ever the pragmatist, knew that this "afterglow" wouldn't last forever. The emotional high of their "David vs. Goliath" story would fade. To keep their new users, they needed more than just a good story. They needed a product that was consistently excellent and always improving.

After the crazy launch week, we had to adjust to a "new normal." Our user base was now in the millions. This was a whole new level of responsibility. A small bug was no longer a minor inconvenience; it was a problem that affected tens of thousands of people. The pressure on my engineering team was huge. We couldn't afford to be the small, scrappy startup making mistakes anymore. We needed to be a reliable, professional-grade product. We had to grow up, technically. This meant implementing stricter testing processes, better code reviews, and a more careful approach to launching new updates. Our days of moving fast and breaking things were, for the most part, over.`,translation:`الانتصار على أومني كورب كان مبهج. فريق SkillUp قضى أسبوع راكبين موجة من التغطية الصحفية الإيجابية ونمو المستخدمين الضخم.
الأبلكيشن بتاعهم كان رقم واحد في فئة التعليم في كذا بلد. حسوا كأنهم أخيرًا، بجد، وصلوا.
بس بن، اللي دايمًا واقعي، كان عارف إن "البهجة دي" مش هتستمر للأبد. النشوة العاطفية لقصتهم بتاعة "داوود ضد جالوت" هتتلاشى. عشان يحافظوا على مستخدمينهم الجداد، كانوا محتاجين أكتر من مجرد قصة حلوة. كانوا محتاجين منتج يكون ممتاز باستمرار وبيتحسن دايمًا.

بعد أسبوع الإطلاق المجنون، كان لازم نتأقلم على "وضع طبيعي جديد". قاعدة مستخدمينا بقت بالملايين دلوقتي. ده كان مستوى مسؤولية جديد بالكامل. بج صغير مبقاش إزعاج بسيط؛ بقى مشكلة بتأثر على عشرات الآلاف من الناس.
الضغط على فريقي الهندسي كان ضخم. مقدرناش نتحمل نكون الشركة الناشئة الصغيرة السريعة اللي بتغلط. كنا محتاجين نكون منتج موثوق فيه وذو مستوى احترافي. كان لازم نكبر، تقنيًا.
ده كان معناه تطبيق عمليات اختبار أشد، ومراجعات كود أحسن، ونهج أكتر حرصًا في إطلاق التحديثات الجديدة. أيامنا بتاعة التحرك بسرعة وتكسير الأشياء، في معظمها، خلصت.`},{lesson_number:67,text:`With the company's new stability and success, Sarah Jenkins called them for a meeting. "The board is extremely pleased," she said. "The value of your company has increased tenfold. Now, we need to talk about the future. Specifically, monetization." "We already have a premium subscription," Ben said, a little confused. "Yes," Sarah replied. "But it's very cheap, and only a small percentage of your users subscribe. To be a sustainable, long-term business, you need to be more aggressive. I'm suggesting you add advertisements to the free version of the app." Leo's heart sank. "Ads? Sarah, our whole philosophy is about a clean, focused learning experience. Ads would completely ruin that." "Leo," Sarah said, her tone firm. "A great experience doesn't pay the salaries of your twenty employees. A business needs to make money. We need to explore every option."

The idea of adding advertisements to SkillUp created the biggest internal conflict the team had ever faced. It was a direct clash between their core values and the pressure to increase revenue. Ben, the CEO, understood Sarah's point of view. His job was to ensure the financial health of the company. "If we do it tastefully," he argued in a leadership meeting, "maybe it won't be so bad. Just small banner ads." Chloe, the Head of Customer Experience, was passionately opposed. "Our users trust us," she countered. "They see us as the alternative to the greedy corporate apps. If we put ads in, we become the very thing we fought against." Leo was torn. He saw both sides. It was the hardest decision they had ever had to make.`,translation:`مع استقرار الشركة ونجاحها الجديد، سارة جينكينز طلبتهم لاجتماع. "مجلس الإدارة مبسوط جدًا،" قالت. "قيمة شركتكم زادت عشر أضعاف. دلوقتي، لازم نتكلم في المستقبل. تحديدًا، تحقيق الدخل."
"إحنا فعلًا عندنا اشتراك بريميوم،" بن قال، وهو متلخبط شوية. "أه،" سارة ردت. "بس هو رخيص جدًا، ونسبة صغيرة بس من مستخدمينكم بيشتركوا. عشان تكونوا بزنس مستدام وطويل الأمد، لازم تكونوا شرسين أكتر. أنا بقترح تضيفوا إعلانات للنسخة المجانية من الأبلكيشن."
قلب ليو اتقبض. "إعلانات؟ سارة، فلسفتنا كلها عن تجربة تعلم نظيفة ومركزة. الإعلانات هتبوظ ده تمامًا."
"ليو،" سارة قالت، ونبرتها حازمة. "التجربة العظيمة مش بتدفع مرتبات موظفينكم العشرين. البزنس لازم يكسب فلوس. لازم نستكشف كل الخيارات."

فكرة إضافة إعلانات لـ SkillUp خلقت أكبر صراع داخلي واجهه الفريق. كان صدام مباشر بين قيمهم الأساسية والضغط لزيادة الإيرادات.
بن، المدير التنفيذي، فهم وجهة نظر سارة. وظيفته كانت ضمان الصحة المالية للشركة. "لو عملناها بذوق،" احتج في اجتماع قيادة، "يمكن متبقاش وحشة أوي. مجرد إعلانات بانر صغيرة."
كلوي، رئيسة تجربة العملاء، كانت معارضة بشدة. "مستخدمينا بيثقوا فينا،" ردت. "هما شايفينا البديل للتطبيقات الجشعة بتاعة الشركات. لو حطينا إعلانات، هنبقى الحاجة اللي حاربناها بالظبط."
ليو كان محتار. كان شايف وجهتي النظر. ده كان أصعب قرار اضطروا ياخدوه.`},{lesson_number:68,text:`I couldn't sleep. The thought of ads inside our beautiful, clean app made me sick. It felt like a betrayal. But Ben's point about financial stability was real. We had a responsibility to our employees. Then, Chloe had an idea. "Why don't we just ask them?" she said. "Let's be transparent. Let's ask our community." It was a risky move, but it felt right. Chloe drafted a blog post. It was honest and direct. She explained the financial pressures of a growing company and presented two options: a) adding unobtrusive ads for free users, or b) keeping the app ad-free, but slightly increasing the price of the premium subscription and adding more value to it. She included a poll.

The response was immediate and overwhelming. Thousands of users voted in the poll and left comments. The verdict was crystal clear. Over 95% of their users said they would rather pay a little more for a premium subscription than have a free app with ads. The comments were even more powerful. "I would gladly pay more to support a company that actually respects its users," one person wrote. Another said, "The fact that you are even asking us shows why you are different. Don't sell out." The community hadn't just given them an answer. They had reaffirmed the company's core identity.`,translation:`مقدرتش أنام. فكرة وجود إعلانات جوه الأبلكيشن الجميل والنظيف بتاعنا كانت مخلية نفسي غامة عليا. حسيت إنها خيانة. بس نقطة بن عن الاستقرار المالي كانت حقيقية. كان علينا مسؤولية تجاه موظفينا.
بعدها، كلوي جت بفكرة. "ليه منسألهمش هما بس؟" قالت. "يلا نكون شفافين. يلا نسأل مجتمعنا."
كانت حركة خطيرة، بس حسيت إنها صح. كلوي صاغت منشور على مدونة. كان صريح ومباشر. شرحت الضغوط المالية لشركة نامية وقدمت خيارين: أ) إضافة إعلانات غير مزعجة للمستخدمين المجانيين، أو ب) الحفاظ على الأبلكيشن بدون إعلانات، بس مع زيادة بسيطة في سعر الاشتراك البريميوم وإضافة قيمة أكبر له. حطت تصويت.

الاستجابة كانت فورية وساحقة. آلاف المستخدمين صوتوا في الاستطلاع وسابوا تعليقات.
القرار كان واضح جدًا. أكتر من 95% من مستخدميهم قالوا إنهم يفضلوا يدفعوا أكتر شوية لاشتراك بريميوم عن إنهم ياخدوا أبلكيشن مجاني فيه إعلانات.
التعليقات كانت أقوى كمان. "أنا هدفع أكتر وبكل سرور عشان أدعم شركة بتحترم مستخدميها فعلًا،" واحد كتب.
واحد تاني قال، "مجرد إنكم بتسألونا بيوري ليه أنتو مختلفين. متبيعوش نفسكم."
المجتمع مش بس إداهم إجابة. هما أكدوا تاني على هوية الشركة الأساسية.`},{lesson_number:69,text:`They presented the results to Sarah. "The community has spoken," Ben said. "We are not adding ads. Instead, we are restructuring our premium plan. We'll add more exclusive features to it – things like personalized learning plans and access to live expert sessions – and we'll increase the price by two dollars a month." Sarah looked at the data from the poll. She looked at the passionate comments. She nodded slowly. "It's a risky move. You might lose some potential subscribers," she said. "Maybe," Leo replied. "But we will gain something much more valuable: long-term trust and loyalty from the users who matter most." "Okay," Sarah said, convinced. "Let's do it your way."

One year passed. The new business model was a huge success. The company was now highly profitable. The trust they had shown in their community was repaid tenfold. The team had grown to fifty people. We moved into a bigger, brighter office. The 'Phoenix Project' was no longer a project; it was a global platform. Millions of people, from students in Brazil to retirees in Japan, were learning new skills every day. I walked through the new office. I saw the engineering team brainstorming at a whiteboard. I saw the customer experience team laughing as they shared a positive user story. I saw Ben on a call, negotiating a new partnership. The company had a life of its own now. It was bigger than me. It was bigger than any one of us.`,translation:`عرضوا النتائج على سارة. "المجتمع قال كلمته،" بن قال. "إحنا مش هنضيف إعلانات. بدل كده، إحنا بنعيد هيكلة خطتنا البريميوم. هنضيف مميزات حصرية أكتر ليها – حاجات زي خطط تعلم مخصصة والوصول لجلسات خبراء مباشرة – وهنزود السعر اتنين دولار في الشهر."
سارة بصت على بيانات الاستطلاع. بصت على التعليقات الشغوفة. هزت راسها ببطء.
"دي حركة خطيرة. ممكن تخسروا بعض المشتركين المحتملين،" قالت. "يمكن،" ليو رد. "بس إحنا هنكسب حاجة أغلى بكتير: ثقة وولاء طويل الأمد من المستخدمين اللي يهموا بجد."
"تمام،" سارة قالت، وهي مقتنعة. "يلا نعملها بطريقتكم."

سنة عدت. نموذج العمل الجديد كان نجاح ضخم. الشركة بقت مربحة جدًا دلوقتي. الثقة اللي أظهروها في مجتمعهم اتردت لهم عشر أضعاف.
الفريق كبر لخمسين شخص. نقلنا لمكتب أكبر وأكتر إشراقًا. 'مشروع العنقاء' مبقاش مشروع؛ بقى منصة عالمية. ملايين الناس، من طلاب في البرازيل لمتقاعدين في اليابان، كانوا بيتعلموا مهارات جديدة كل يوم.
اتمشيت في المكتب الجديد. شفت الفريق الهندسي بيعمل عصف ذهني عند سبورة. شفت فريق تجربة العملاء بيضحك وهما بيشاركوا قصة مستخدم إيجابية. شفت بن في مكالمة، بيتفاوض على شراكة جديدة. الشركة بقى ليها حياة خاصة بيها دلوقتي. بقت أكبر مني. بقت أكبر من أي واحد فينا.`},{lesson_number:70,text:`One day, an invitation appeared in Leo's inbox. It was from a local university. They were hosting a conference on entrepreneurship, and they wanted him to be the keynote speaker. They wanted him to tell his story. Leo's first instinct was to say no. He was still the same introvert who hated public speaking. He was a builder, not a speaker. But he showed the invitation to Chloe. She just smiled. "You have to do it, Leo," she said. "Your story isn't just yours anymore. It's a story that can inspire so many other people who are sitting in their own gray boxes right now, dreaming of a blue sky."

She was right. The thought of standing on a stage in front of hundreds of people was terrifying. But it was a different kind of fear. It wasn't the fear of failure or of going broke. It was the fear of stepping into a new role. The role of a leader. A role model. For years, my challenge was to build a product. Then, my challenge was to build a company. Now, I had a new challenge: to share the lessons I had learned along the way. I looked at the invitation again. My journey started with a quiet observation in a park. Now, it was time to find my voice. I took a deep breath and clicked "Reply." I typed two simple words: "I'd be honored."`,translation:`في يوم، دعوة ظهرت في بريد ليو. كانت من جامعة محلية. كانوا بيستضيفوا مؤتمر عن ريادة الأعمال، وعايزينه يكون المتحدث الرئيسي. عايزينه يحكي قصته.
غريزة ليو الأولى كانت إنه يقول لأ. هو كان لسه نفس الشخص الانطوائي اللي بيكره الخطابة. هو كان باني، مش متحدث.
بس هو ورى الدعوة لكلوي. هي بس ابتسمت. "لازم تعملها يا ليو،" قالت. "قصتك مبقتش بتاعتك لوحدك. دي قصة ممكن تلهم ناس كتير تانيين قاعدين في صناديقهم الرمادية دلوقتي، بيحلموا بسما زرقا."

هي كانت صح. فكرة إني أقف على مسرح قدام مئات الناس كانت مرعبة. بس ده كان نوع مختلف من الخوف. مكنش خوف من الفشل أو الإفلاس. كان خوف من إني أخطو في دور جديد. دور القائد. القدوة.
لسنين، كان تحديي هو إني أبني منتج. بعدها، تحديي كان إني أبني شركة. دلوقتي، كان عندي تحدي جديد: إني أشارك الدروس اللي اتعلمتها على طول الطريق.
بصيت ع الدعوة تاني. رحلتي بدأت بملاحظة هادية في جنينة. دلوقتي، جه الوقت ألاقي صوتي.
خدت نفس عميق ودوست "رد." كتبت كلمتين بساط: "يشرفني ذلك."`},{lesson_number:71,text:`Preparing for the keynote speech was a new kind of challenge for me. It wasn't about logic or code. It was about storytelling. How do you take two years of stress, failure, and success, and put it into a twenty-minute talk? I spent a week just writing down notes, trying to find the core message of my journey. It wasn't about a tech product. It was about taking a risk, about the power of a simple idea, and about the importance of staying true to your values. With help from Chloe and Ben, I structured my messy notes into a real story with a beginning, a middle, and an end.

The day of the conference arrived. I stood backstage, looking out at the large, crowded auditorium. My heart was pounding just like it did before my first meeting with Sarah Jenkins. I felt like the same scared, insecure person from two years ago. I felt like an impostor. Who was I to give advice to anyone? I took out my phone and looked at a photo from our one-year anniversary party. A photo of my entire team, all fifty of them, smiling. They believed in this story. They were living this story. This wasn't just for me. It was for them.`,translation:`التحضير للخطاب الرئيسي كان نوع جديد من التحدي ليا. مكنش عن المنطق أو الكود. كان عن حكي القصص. إزاي تاخد سنتين من التوتر، والفشل، والنجاح، وتحطهم في خطاب مدته عشرين دقيقة؟
قضيت أسبوع بكتب ملاحظات بس، بحاول ألاقي الرسالة الأساسية لرحلتي. مكنتش عن منتج تكنولوجي. كانت عن المخاطرة، وعن قوة فكرة بسيطة، وعن أهمية إنك تفضل مخلص لقيمك.
بمساعدة من كلوي وبن، هيكلت ملاحظاتي المكركبة لقصة حقيقية ليها بداية، ووسط، ونهاية.

يوم المؤتمر جه. وقفت ورا الكواليس، ببص على القاعة الكبيرة والزحمة. قلبي كان بيدق بسرعة زي ما كان بيدق قبل أول اجتماع ليا مع سارة جينكينز.
حسيت إني نفس الشخص الخواف، اللي معندوش ثقة من سنتين. حسيت إني دجال. مين أنا عشان أدي نصيحة لأي حد؟
طلعت تليفوني وبصيت على صورة من حفلة الذكرى السنوية الأولى بتاعتنا. صورة لفريقي كله، الخمسين واحد، وهما مبتسمين.
هما كانوا مؤمنين بالقصة دي. هما كانوا عايشين القصة دي. ده مكنش عشاني أنا بس. كان عشانهم هما.`},{lesson_number:72,text:`I walked onto the stage. The bright lights were blinding. The room was silent. I took a deep breath and began to speak. I didn't read from my notes. I just spoke from the heart. I told them about my gray box at OmniCorp. I told them about the spark in the park, the difficult conversation with my manager, the fear of starting something new. I was honest about my doubts and my failures. I didn't present myself as a hero, but as an ordinary person who just decided to try.

As I spoke, I noticed a change in the room. People were leaning forward. They were nodding. They weren't just listening to a business story; they were hearing a human story. I realized Chloe was right. This story was bigger than me. It was the story of anyone who has ever felt stuck and dreamed of something more. At the end of my talk, I shared my biggest lesson: "Success is not about the final destination. It's about having the courage to take the first step, and the resilience to keep walking, no matter how many times you fall."`,translation:`دخلت على المسرح. الأنوار الساطعة كانت بتعمي. الأوضة كانت هادية. خدت نفس عميق وبدأت أتكلم.
مقرأتش من ملاحظاتي. أنا بس اتكلمت من قلبي. حكيتلهم عن صندوقي الرمادي في أومني كورب. حكيتلهم عن الشرارة اللي في الجنينة، والحوار الصعب مع مديري، والخوف من بدء حاجة جديدة.
كنت صريح في شكوكي وإخفاقاتي. مقدمتش نفسي كبطل، لكن كشخص عادي قرر يجرب وبس.

وأنا بتكلم، لاحظت تغيير في الأوضة. الناس كانت بتميل لقدام. كانوا بيهزوا راسهم. مكنوش بس بيسمعوا قصة بزنس؛ كانوا بيسمعوا قصة إنسانية.
أدركت إن كلوي كانت صح. القصة دي أكبر مني. كانت قصة أي حد حس في يوم إنه محشور وحلم بحاجة أكتر.
في نهاية خطابي، شاركت أكبر درس اتعلمته: "النجاح مش عن الوجهة النهائية. هو عن إنك تمتلك الشجاعة تاخد أول خطوة، والمرونة إنك تكمل مشي، مهما وقعت كام مرة."`},{lesson_number:73,text:`The applause was thunderous. After my talk, dozens of students and aspiring entrepreneurs came up to me. They didn't ask me about business models or marketing strategies. They asked about courage. They asked about how to overcome fear. One young woman came up to me, her eyes shining with excitement. "I have an idea," she said, "but I've always been too afraid to start. After hearing you speak, I'm going to do it. I'm going to start tomorrow." In that moment, I felt a new kind of success. A success that had nothing to do with user numbers or revenue. It was the success of passing the spark to someone else.

The conference changed me. I had always seen myself as a builder, a maker. I was most comfortable behind a screen. But standing on that stage, connecting with all those people, I realized I had another role to play. My journey with SkillUp wasn't just about building a company. It was about enabling others. First, by building a tool that helped people learn. And now, by sharing my story to help people dream. I finally understood that true leadership wasn't just about managing a team; it was about inspiring a community, inside and outside the company.`,translation:`التصفيق كان مدوي. بعد خطابي، عشرات الطلاب ورواد الأعمال الطموحين جم لي. مسألونيش عن نماذج العمل أو استراتيجيات التسويق. سألوني عن الشجاعة. سألوني إزاي نتغلب على الخوف.
واحدة بنت شابة جت لي، وعينيها بتلمع من الحماس. "أنا عندي فكرة،" قالت، "بس دايمًا كنت خايفة أبدأ. بعد ما سمعتك بتتكلم، أنا هعملها. أنا هبدأ بكرة." في اللحظة دي، حسيت بنوع جديد من النجاح. نجاح ملوش أي علاقة بأرقام المستخدمين أو الإيرادات. كان نجاح نقل الشرارة لحد تاني.

المؤتمر غيرني. كنت دايمًا بشوف نفسي كباني، كصانع. كنت مرتاح أكتر ورا شاشة.
بس وقفتي على المسرح ده، وتواصلي مع كل الناس، خلاني أدرك إن عندي دور تاني ألعبه.
رحلتي مع SkillUp مكنتش بس عن بناء شركة. كانت عن تمكين الآخرين. أولًا، ببناء أداة ساعدت الناس تتعلم. ودلوقتي، بمشاركة قصتي عشان أساعد الناس تحلم.
أنا أخيرًا فهمت إن القيادة الحقيقية مش بس عن إدارة فريق؛ هي عن إلهام مجتمع، جوه وبره الشركة.`},{lesson_number:74,text:`The following Monday, I walked into our All-Hands meeting with a new perspective. Our company was facing a new set of challenges: expanding into international markets, developing new technologies like AI for personalized learning, and maintaining our unique culture as we continued to grow. The problems were bigger and more complex than ever. But I wasn't scared anymore. I looked at the faces in the room - the engineers, the designers, the support team, the marketers. Each one of them was a problem-solver, a dreamer, a builder.

We had built more than a product. We had built a team capable of overcoming any challenge. I realized my most important job as a leader wasn't to have all the answers. It was to empower my team to find the answers themselves. It was to create an environment where smart, passionate people could do their best work. My job was to protect the culture we had all fought so hard to build.`,translation:`يوم الإتنين اللي بعده، دخلت اجتماعنا لكل الموظفين بمنظور جديد. شركتنا كانت بتواجه مجموعة جديدة من التحديات: التوسع في الأسواق العالمية، وتطوير تكنولوجيات جديدة زي الذكاء الاصطناعي للتعلم المخصص، والحفاظ على ثقافتنا الفريدة وإحنا بنكمل نمو.
المشاكل كانت أكبر وأكتر تعقيدًا من أي وقت فات. بس أنا مكنتش خايف خلاص. بصيت على الوشوش اللي في الأوضة - المهندسين، المصممين، فريق الدعم، فريق التسويق. كل واحد فيهم كان حلال مشاكل، حالم، وباني.

إحنا كنا بنينا أكتر من منتج. كنا بنينا فريق قادر على التغلب على أي تحدي.
أدركت إن أهم وظيفة ليا كقائد مش إني أمتلك كل الإجابات. كانت إني أمكّن فريقي يلاقي الإجابات بنفسهم.
كانت إني أخلق بيئة يقدر فيها الناس الأذكياء والشغوفين يعملوا أحسن شغل ليهم.
وظيفتي كانت إني أحمي الثقافة اللي كلنا حاربنا عشان نبنيها.`},{lesson_number:75,text:`A few weeks later, I was walking home. As I passed by the park, the same park where everything started, I stopped. On the bench, an old man was learning to paint using SkillUp on a tablet. Not far from him, a group of teenagers were laughing as they practiced a new language together using our 'Teams' feature. The park was filled with these little moments of learning, of connection, of progress. It was my very first vision, the spark I had years ago, brought to life. The Phoenix Project had succeeded beyond my wildest imagination.

I thought about my old life, my old gray box. And I thought about where I was now. The journey had been incredibly difficult. There were moments of doubt, of fear, of near-failure. But every single step, every single struggle, had been worth it. The sky above me was the same bright blue as it was on that day I sat on this bench, feeling stuck. But today, I saw it differently. It wasn't distant anymore. It didn't represent something I was missing. It represented an endless space of possibility. The project was never about escaping a box. It was about realizing that there was no box at all.`,translation:`بعد كام أسبوع، كنت مروح. وأنا معدي جنب الجنينة، نفس الجنينة اللي كل حاجة بدأت فيها، وقفت.
على الكنبة، راجل عجوز كان بيتعلم يرسم باستخدام SkillUp على تابلت. مش بعيد عنه، مجموعة مراهقين كانوا بيضحكوا وهما بيتمرنوا على لغة جديدة مع بعض باستخدام ميزة 'الفرق' بتاعتنا.
الجنينة كانت مليانة باللحظات الصغيرة دي من التعلم، من التواصل، من التقدم. كانت رؤيتي الأولى خالص، الشرارة اللي جتلي من سنين، متجسدة في الحياة.
مشروع العنقاء نجح نجاح يفوق أجرأ خيالاتي.

فكرت في حياتي القديمة، في صندوقي الرمادي القديم. وفكرت في مكاني دلوقتي. الرحلة كانت صعبة بشكل لا يصدق. كانت فيه لحظات شك، وخوف، وشبه فشل.
بس كل خطوة، كل صراع، كان يستاهل. السما فوقيا كانت بنفس اللون الأزرق الساطع زي ما كانت في اليوم اللي قعدت فيه على الكنبة دي، وأنا حاسس إني محشور.
بس النهاردة، أنا شفتها بشكل مختلف. مكنتش بعيدة خلاص. مكنتش بتمثل حاجة ناقصاني. كانت بتمثل مساحة لا نهائية من الإمكانية.
المشروع عمره ما كان عن الهروب من صندوق. كان عن إدراك إنه مكنش فيه صندوق أصلًا.`}],St=At.map(t=>{const e=[],s=t.text.split(/(\s+)/);for(const n of s)n&&e.push({text:n,start:-1,end:-1});return{id:t.lesson_number,title:`Lesson ${t.lesson_number}`,audioSrc:"",content:e,text:t.text,translation:t.translation}});/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */const $t="EnglishLearningAppDB",Lt=1,E="lessonsAudio";let C;function Me(){return new Promise((t,e)=>{if(C)return t(C);const s=indexedDB.open($t,Lt);s.onerror=n=>{console.error("Database error:",n.target.error),e("Error opening database.")},s.onsuccess=n=>{C=n.target.result,t(C)},s.onupgradeneeded=n=>{const o=n.target.result;o.objectStoreNames.contains(E)||o.createObjectStore(E,{keyPath:"id"})}})}function G(t,e){return new Promise((s,n)=>{if(!C)return n("DB not initialized.");const o=C.transaction([E],"readwrite");o.objectStore(E).put({id:t,audioBlob:e}),o.oncomplete=()=>s(),o.onerror=i=>{console.error("Save audio transaction error:",i.target.error),n("Error saving audio file.")}})}function re(t){return new Promise((e,s)=>{if(!C)return s("DB not initialized.");const a=C.transaction([E],"readonly").objectStore(E).get(t);a.onsuccess=()=>{a.result?e(a.result.audioBlob):s("Audio not found for the given ID.")},a.onerror=i=>{console.error("Get audio request error:",i.target.error),s("Error fetching audio file.")}})}function Ct(t){return new Promise((e,s)=>{if(!C)return s("DB not initialized.");const n=C.transaction([E],"readwrite");n.objectStore(E).delete(t),n.oncomplete=()=>e(),n.onerror=a=>{console.error("Delete audio transaction error:",a.target.error),s("Error deleting audio file.")}})}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/function Ve(t){let e="";const s=t.byteLength;for(let n=0;n<s;n++)e+=String.fromCharCode(t[n]);return btoa(e)}function Ge(t){const e=atob(t),s=e.length,n=new Uint8Array(s);for(let o=0;o<s;o++)n[o]=e.charCodeAt(o);return n}function Bt(t){const e=t.length,s=new Int16Array(e);for(let n=0;n<e;n++)s[n]=t[n]*32768;return{data:Ve(new Uint8Array(s.buffer)),mimeType:"audio/pcm;rate=16000"}}async function _t(t,e,s,n){const o=e.createBuffer(n,t.length/2/n,s),a=new Int16Array(t.buffer),i=a.length,r=new Float32Array(i);for(let l=0;l<i;l++)r[l]=a[l]/32768;if(n===0)o.copyToChannel(r,0);else for(let l=0;l<n;l++){const d=r.filter((h,c)=>c%n===l);o.copyToChannel(d,l)}return o}function Ye(t,e,s=1){const n=new ArrayBuffer(44),o=new DataView(n),a=t.length,i=a+36;o.setUint32(0,1380533830,!1),o.setUint32(4,i,!0),o.setUint32(8,1463899717,!1),o.setUint32(12,1718449184,!1),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,s,!0),o.setUint32(24,e,!0),o.setUint32(28,e*s*2,!0),o.setUint16(32,s*2,!0),o.setUint16(34,16,!0),o.setUint32(36,1684108385,!1),o.setUint32(40,a,!0);const r=new Uint8Array(n.byteLength+t.byteLength);return r.set(new Uint8Array(n),0),r.set(t,n.byteLength),r}function jt(t,e){const s=t.length*2,n=new ArrayBuffer(44+s),o=new DataView(n);o.setUint32(0,1380533830,!1),o.setUint32(4,36+s,!0),o.setUint32(8,1463899717,!1),o.setUint32(12,1718449184,!1),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,1,!0),o.setUint32(24,e,!0),o.setUint32(28,e*2,!0),o.setUint16(32,2,!0),o.setUint16(34,16,!0),o.setUint32(36,1684108385,!1),o.setUint32(40,s,!0);const a=t.length;let i=44;for(let r=0;r<a;r++){let l=Math.max(-1,Math.min(1,t[r]));const d=l<0?l*32768:l*32767;o.setInt16(i,d,!0),i+=2}return new Blob([n],{type:"audio/wav"})}async function Je(t){const s=window.AudioContext||window.webkitAudioContext;if(!s)throw new Error("Web Audio API is not supported in this browser.");const n=[];for(let r=0;r<t.length;r++){const d=await t[r].arrayBuffer(),h=new s;let c;try{c=await h.decodeAudioData(d)}catch(T){throw console.error(`Error decoding audio blob #${r}:`,T),new Error(`تعذر فك تشفير الملف الصوتي للدرس #${r+1}. تأكد من سلامة وصلاحية ملف الصوت لهذا الدرس.`)}finally{await h.close()}const p=c.duration,g=Math.ceil(p*24e3),f=new OfflineAudioContext(1,g,24e3),v=f.createBufferSource();v.buffer=c,v.connect(f.destination),v.start();const k=(await f.startRendering()).getChannelData(0);n.push(k)}let o=0;for(const r of n)o+=r.length;const a=new Float32Array(o);let i=0;for(const r of n)a.set(r,i),i+=r.length;return jt(a,24e3)}function Ke(t,e=600){const s=t.split(`
`).map(o=>o.trim()).filter(o=>o.length>0),n=[];for(const o of s)if(o.length<=e)n.push(o);else{const a=o.split(new RegExp("(?<=[.!?])\\s+"));let i="";for(const r of a)(i+" "+r).trim().length<=e?i=(i+" "+r).trim():(i&&n.push(i),i=r);i.trim().length>0&&n.push(i.trim())}return n}async function Ie(t,e,s="Kore"){var r,l,d,h,c,p,g;const n=Ke(t),o=[],a=typeof window<"u"?localStorage.getItem("lingo_custom_api_key"):null,i=a&&a.trim()!==""&&a!=="undefined"&&a!=="null"?a.trim().replace(/^["']|["']$/g,""):null;for(const f of n){let v="",$=!1;try{const k={"Content-Type":"application/json"};i&&(k["x-gemini-api-key"]=i);const T=await fetch("/api/tts",{method:"POST",headers:k,body:JSON.stringify({text:f,voiceName:s})});if(T.ok)v=(await T.json()).base64Audio;else if(console.warn("Backend TTS API returned error, attempting direct Gemini API..."),i)$=!0;else{const _=await T.json().catch(()=>({}));throw new Error(_.error||"فشل الاتصال بخدمة توليد الصوت.")}}catch(k){if(console.warn("Backend TTS connection failed, attempting direct Gemini API:",k),i)$=!0;else throw new Error("فشل الاتصال بخدمة توليد الصوت. يرجى إدخال مفتاح API الخاص بك في الإعدادات المتقدمة.")}if($&&i){const k=["gemini-3.1-flash-tts-preview"];let T=null,_=!1;for(const V of k)try{console.log(`[Direct Gemini TTS] Requesting model: ${V} with voice: ${s}`);const y=`https://generativelanguage.googleapis.com/v1beta/models/${V}:generateContent?key=${i}`,I=await fetch(y,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:f}]}],generationConfig:{response_modalities:["AUDIO"],speech_config:{voice_config:{prebuilt_voice_config:{voice_name:s||"Kore"}}}}})});if(!I.ok){const O=await I.json().catch(()=>({}));throw new Error(((r=O==null?void 0:O.error)==null?void 0:r.message)||`HTTP status ${I.status}`)}const U=(g=(p=(c=(h=(d=(l=(await I.json()).candidates)==null?void 0:l[0])==null?void 0:d.content)==null?void 0:h.parts)==null?void 0:c[0])==null?void 0:p.inlineData)==null?void 0:g.data;if(U){v=U,_=!0,console.log(`[Direct Gemini TTS] Success with model: ${V}`);break}}catch(y){console.warn(`[Direct Gemini TTS] Model ${V} failed to generate TTS:`,y),T=y}if(!_)throw T||new Error("فشلت جميع محاولات توليد الصوت مباشرة عبر Gemini. تأكد من صحة مفتاح الـ API الخاص بك.")}if(v){const k=Ge(v),T=Ye(k,24e3,1);o.push(new Blob([T],{type:"audio/wav"}))}else throw new Error("لم يتم إرجاع مقطع صوتي للجزء الحالي من النص.")}if(o.length===0)throw new Error("فشل توليد أي مقطع صوتي.");return o.length===1?o[0]:Je(o)}const Pt=Object.freeze(Object.defineProperty({__proto__:null,createBlob:Bt,decode:Ge,decodeAudioData:_t,encode:Ve,generateTTSWithChunking:Ie,mergeWavBlobs:Je,pcmToWav:Ye,splitTextIntoSafeChunks:Ke},Symbol.toStringTag,{value:"Module"}));var Ot=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,ue=(t,e,s,n)=>{for(var o=n>1?void 0:n?Ht(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(o=(n?i(e,s,o):i(o))||o);return n&&o&&Ot(e,s,o),o};let se=class extends j{constructor(){super(...arguments),this.lessons=[],this.generatingLessons=new Map}selectLesson(t){this.dispatchEvent(new CustomEvent("lesson-selected",{detail:t,bubbles:!0,composed:!0}))}render(){return u`
      <ul class="lesson-list">
        ${this.lessons.map(t=>{var n,o;const e=(n=this.generatingLessons)==null?void 0:n.has(t.id),s=(o=this.generatingLessons)==null?void 0:o.get(t.id);return u`
              <li class="lesson-item">
                <button
                  class="lesson-select-btn ${ve({selected:t.id===this.selectedLessonId})}"
                  @click=${()=>this.selectLesson(t)}
                >
                  ${t.title}
                  ${e?u`
                    <span class="gen-badge" style="margin-left: 8px; font-size: 0.75rem; color: var(--accent-magenta); font-weight: bold; border: 1px solid rgba(217, 70, 239, 0.3); padding: 1px 6px; border-radius: 4px; background: rgba(217, 70, 239, 0.1); display: inline-flex; align-items: center; gap: 2px;">
                      ⏳ ${s?`${s.progress}%`:""}
                    </span>
                  `:""}
                </button>
              </li>
            `})}
      </ul>
    `}createRenderRoot(){return this}};ue([M({type:Array})],se.prototype,"lessons",2);ue([M({type:Number})],se.prototype,"selectedLessonId",2);ue([M({type:Object})],se.prototype,"generatingLessons",2);se=ue([ae("lesson-selector")],se);var Wt=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,pe=(t,e,s,n)=>{for(var o=n>1?void 0:n?Et(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(o=(n?i(e,s,o):i(o))||o);return n&&o&&Wt(e,s,o),o};let ne=class extends j{constructor(){super(...arguments),this.lesson=null,this.isSyncingLeft=!1,this.isSyncingRight=!1}updated(t){t.has("lesson")&&(this.englishContainer&&(this.englishContainer.scrollTop=0),this.arabicContainer&&(this.arabicContainer.scrollTop=0)),super.updated(t)}handleScroll(t){const e=this.englishContainer,s=this.arabicContainer;if(!(!e||!s))if(t==="english"){if(this.isSyncingLeft){this.isSyncingLeft=!1;return}this.isSyncingRight=!0;const n=e.scrollTop/(e.scrollHeight-e.clientHeight);s.scrollTop=n*(s.scrollHeight-s.clientHeight)}else{if(this.isSyncingRight){this.isSyncingRight=!1;return}this.isSyncingLeft=!0;const n=s.scrollTop/(s.scrollHeight-s.clientHeight);e.scrollTop=n*(e.scrollHeight-e.clientHeight)}}render(){if(!this.lesson)return u``;const s=(this.lesson.text||"").replace(/\n\s*\n/g,`

`).split(`

`).filter(i=>i.trim().length>0),a=(this.lesson.translation||"").replace(/\n\s*\n/g,`

`).split(`

`).filter(i=>i.trim().length>0);return u`
      <div class="lesson-content-columns">
        <div class="english-content" @scroll=${()=>this.handleScroll("english")}>
          ${s.map(i=>u`
            <p>${i}</p>
          `)}
          <div style="height: 20vh;"></div> <!-- Small buffer at bottom -->
        </div>

        <div class="arabic-content" @scroll=${()=>this.handleScroll("arabic")}>
          ${a.map(i=>u`
            <p>${i}</p>
          `)}
          <div style="height: 20vh;"></div>
        </div>
      </div>
    `}createRenderRoot(){return this}};pe([M({type:Object})],ne.prototype,"lesson",2);pe([B(".english-content")],ne.prototype,"englishContainer",2);pe([B(".arabic-content")],ne.prototype,"arabicContainer",2);ne=pe([ae("lesson-view")],ne);var Mt=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,S=(t,e,s,n)=>{for(var o=n>1?void 0:n?zt(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(o=(n?i(e,s,o):i(o))||o);return n&&o&&Mt(e,s,o),o};let A=class extends j{constructor(){super(...arguments),this.lesson=null,this.isGenerating=!1,this.hasApiKey=!1,this.generationProgress=0,this.generationTimeRemaining=5,this.progressInterval=null,this.generatedAudioUrl=null,this.generatedBase64=null,this.likedAudioBlob=null,this.lastGeneratedBlob=null}startProgressCountdown(){this.generationProgress=0,this.generationTimeRemaining=5,this.progressInterval&&clearInterval(this.progressInterval);const t=Date.now(),e=5e3;this.progressInterval=setInterval(()=>{const s=Date.now()-t;let n=s/e*100;n>=98&&(n=98),this.generationProgress=Math.round(n),this.generationTimeRemaining=Math.max(1,Math.ceil((e-s)/1e3))},100)}stopProgressCountdown(t){this.progressInterval&&(clearInterval(this.progressInterval),this.progressInterval=null),t?(this.generationProgress=100,this.generationTimeRemaining=0):(this.generationProgress=0,this.generationTimeRemaining=0)}updated(t){t.has("lesson")&&(this.cleanupGeneratedAudio(),this.lastGeneratedBlob=null,this.lesson?(this.contentInput.value=this.lesson.content.map(e=>e.text).join(""),this.translationInput.value=this.lesson.translation||"",this.audioInput.required=!1):(this.form.reset(),this.audioInput.required=!0)),super.updated(t)}async connectedCallback(){super.connectedCallback();try{const t=await fetch("/api/health");if(t.ok){const e=await t.json();this.hasApiKey=!!e.hasApiKey}}catch{this.hasApiKey=!1}}disconnectedCallback(){super.disconnectedCallback(),this.cleanupGeneratedAudio()}cleanupGeneratedAudio(){this.generatedAudioUrl&&(URL.revokeObjectURL(this.generatedAudioUrl),this.generatedAudioUrl=null),this.generatedBase64=null,this.likedAudioBlob=null}async handleGenerateTTS(){const t=this.contentInput.value.trim();if(!t){alert("الرجاء كتابة نص باللغة الإنجليزية أولاً لتوليد الصوت.");return}this.isGenerating=!0,this.startProgressCountdown();try{const e=await Ie(t,"","Kore");this.cleanupGeneratedAudio(),this.generatedAudioUrl=URL.createObjectURL(e),this.lastGeneratedBlob=e;const s=new FileReader;s.onloadend=()=>{this.generatedBase64=s.result,this.stopProgressCountdown(!0)},s.readAsDataURL(e)}catch(e){console.error("Error generating audio:",e),this.stopProgressCountdown(!1),alert(`فشل في توليد الصوت. السبب: ${(e==null?void 0:e.message)||e}`)}finally{this.isGenerating=!1}}handleLikeAudio(){this.lastGeneratedBlob&&(this.likedAudioBlob=this.lastGeneratedBlob,this.audioInput.required=!1)}handleDiscardTTS(){this.cleanupGeneratedAudio(),this.lastGeneratedBlob=null,this.audioInput.required=!this.lesson}handleCopyHTMLEmbed(){const t=this.querySelector("#html-code-area");navigator.clipboard&&t?navigator.clipboard.writeText(t.value).then(()=>alert("تم نسخ كود الـ HTML بنجاح!")).catch(()=>alert("فشل النسخ تلقائياً. يرجى نسخ الكود يدوياً من الشاشة.")):t&&(t.select(),document.execCommand("copy"),alert("تم نسخ كود الـ HTML بنجاح!"))}handleSubmit(t){var r;if(t.preventDefault(),!this.form.checkValidity()){this.form.reportValidity();return}const e=this.contentInput.value,s=this.translationInput.value;let n=(r=this.audioInput.files)==null?void 0:r[0];if(!n&&this.likedAudioBlob&&(n=new File([this.likedAudioBlob],"lesson-ai-audio.wav",{type:"audio/wav"})),!n&&!this.likedAudioBlob&&!this.lesson){alert("الرجاء رفع ملف صوتي للدرس أو توليد المقطع بالذكاء الاصطناعي والموافقة عليه.");return}const o=[],a=e.split(/(\s+)/);for(const l of a)l&&o.push({text:l,start:-1,end:-1});const i={content:o,text:e,translation:s};this.lesson&&(i.id=this.lesson.id),n&&(i.audioFile=n),this.likedAudioBlob&&this.generatedBase64&&(i.audioSrc="db"),this.dispatchEvent(new CustomEvent("lesson-saved",{detail:i,bubbles:!0,composed:!0}))}handleCancel(){this.dispatchEvent(new CustomEvent("cancel-add",{bubbles:!0,composed:!0}))}handleDelete(){this.lesson&&confirm("Are you sure you want to permanently delete this lesson?")&&this.dispatchEvent(new CustomEvent("lesson-deleted",{detail:this.lesson.id,bubbles:!0,composed:!0}))}render(){const t=this.lesson!==null;return u`
      <div class="add-lesson-container" style="max-width: 800px; margin: 2rem auto; padding: 2.5rem; background: var(--card-bg, rgba(30, 41, 59, 0.45)); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35); color: #ffffff;" dir="rtl">
        
        <header style="border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 1.5rem; margin-bottom: 2rem;">
          <h2 style="margin: 0; font-size: 1.6rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, var(--primary-color, #a855f7)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: right; display: flex; align-items: center; gap: 0.6rem;">
            <span>${t?"✏️ تعديل الدرس وتحديث المحتوى":"✍️ إضافة درس تعليمي جديد"}</span>
          </h2>
          <p style="margin: 0.5rem 0 0 0; color: var(--text-color-secondary, #94a3b8); font-size: 0.9rem; text-align: right;">
            ${t?"قم بتحديث النصوص والترجمة لكي تظهر فوراً للمتعلم مع فرصة إعادة توليد المقطع الصوتي.":"قم بكتابة نص الدرس باللغة الإنجليزية، المقابل العربي، وثم توليد مقطع الصوت الذكي لتجهيز الدرس."}
          </p>
        </header>

        <form @submit=${this.handleSubmit} novalidate style="display: flex; flex-direction: column; gap: 1.75rem;">
          
          <!-- English Input Column (should remain LTR styled) -->
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem; text-align: right;">
            <label for="content-input" style="font-weight: 700; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start;">
              <span>📝 نص الدرس (باللغة الإنجليزية)</span>
              <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 1px 6px; border-radius: 4px;">مطلوب *</span>
            </label>
            <textarea 
              id="content-input" 
              required 
              placeholder="e.g. Hello, welcome to your English practice lesson. Let's start with daily greetings."
              style="width: 100%; min-height: 120px; padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; font-size: 1rem; line-height: 1.6; direction: ltr; text-align: left; transition: all 0.2s;"
            ></textarea>
          </div>

          <!-- Arabic Input Column -->
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem; text-align: right;">
            <label for="translation-input" style="font-weight: 700; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start;">
              <span>🌐 ترجمة الدرس المرافقة (باللغة العربية)</span>
              <span style="font-size: 0.75rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #94a3b8; padding: 1px 6px; border-radius: 4px;">اختياري</span>
            </label>
            <textarea 
              id="translation-input" 
              placeholder="مثال: مرحباً بك في درس التمرن على الإنجليزية. دعنا نبدأ بالتحيات اليومية والترحيب الحار."
              style="width: 100%; min-height: 100px; padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; font-size: 1rem; line-height: 1.6; direction: rtl; text-align: right; transition: all 0.2s;"
            ></textarea>
          </div>

          <!-- HTML Audio TTS Section -->
          <div class="form-group tts-generation-group" style="border: 1.5px dashed rgba(168, 85, 247, 0.3); padding: 1.75rem; border-radius: 16px; background-color: rgba(168, 85, 247, 0.03); margin-bottom: 0.5rem; text-align: right;">
            <label style="display: flex; align-items: center; gap: 0.6rem; color: #c084fc; margin-bottom: 0.5rem; font-weight: 700; font-size: 1rem; justify-content: flex-start;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
              توليد المقطع الصوتي للدرس تلقائياً بالذكاء الاصطناعي (AI Voice Generator)
            </label>
            <p style="font-size: 0.85rem; color: var(--text-color-secondary, #94a3b8); margin-top: 0; margin-bottom: 1.25rem; line-height: 1.6;">
              يمكنك تحويل النص الإنجليزي أعلاه إلى نطق بشري فائق الجودة بصوت احترافي عبر جيمني بلمسة زر واحدة للاستماع والتعلم التفاعلي.
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <button 
                  type="button" 
                  class="generate-audio-btn" 
                  @click=${this.handleGenerateTTS} 
                  ?disabled=${this.isGenerating}
                  style="border: 1.5px solid var(--primary-color, #a855f7); color: #ffffff; display: flex; align-items: center; gap: 0.5rem; padding: 0.7rem 1.4rem; border-radius: 10px; cursor: pointer; background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(217, 70, 239, 0.15)); font-weight: 700; font-size: 0.88rem; transition: all 0.2s;"
                >
                  ${this.isGenerating?u`
                    <svg style="animation: spin 1s linear infinite; width: 16px; height: 16px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; margin-left: 0.4rem;" viewBox="0 0 24 24"></svg>
                    جاري التوليد...
                  `:u`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-left: 0.4rem;">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    تحويل النص لصوت (Gemini Voice) 🎙️
                  `}
                </button>
                
                <!-- API Key Status Indicator -->
                <span style="font-size: 0.82rem; color: ${this.hasApiKey?"#34d399":"#f87171"}; font-weight: 600; display: flex; align-items: center; gap: 0.3rem;">
                  <span style="font-size: 1.1rem; vertical-align: middle;">●</span> 
                  ${this.hasApiKey?"كود الـ API متوفر وجاهز للتوليد":"سيتم استخدام مفتاح الاستضافة الافتراضي"}
                </span>
              </div>

              <!-- Animate loading and time progress bar -->
              ${this.isGenerating?u`
                <div style="padding: 1.25rem; border-radius: 12px; background-color: rgba(0, 0, 0, 0.35); border: 1px solid rgba(168, 85, 247, 0.3); display: flex; flex-direction: column; gap: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="font-weight: 700; color: #c084fc; display: flex; align-items: center; gap: 0.5rem;">
                      <svg style="animation: spin 1s linear infinite; width: 14px; height: 14px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%;" viewBox="0 0 24 24"></svg>
                      معالجة طلب جيمني وتوليد النبرة الصوتية...
                    </span>
                    <span style="font-weight: bold; color: #c084fc; font-family: monospace;">
                      ${this.generationProgress}%
                    </span>
                  </div>
                  
                  <div style="width: 100%; height: 8px; background-color: rgba(255, 255, 255, 0.05); border-radius: 999px; overflow: hidden; position: relative; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="width: ${this.generationProgress}%; height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-magenta)); border-radius: 999px; transition: width 0.1s linear;"></div>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #94a3b8;">
                    <span>سيتطلب ما يقارب: ${this.generationTimeRemaining} ثانية</span>
                    <span style="font-family: monospace; font-size: 0.72rem;">Model: gemini-3.1-flash</span>
                  </div>
                </div>
              `:""}
            </div>

            ${this.generatedAudioUrl?u`
              <div style="margin-top: 1.25rem; padding: 1.25rem; border-radius: 12px; background-color: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
                  <span style="font-size: 0.9rem; font-weight: 700; color: #34d399; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🎉 تم توليد المقطع بنجاح! استمع للمعاينة:</span>
                  </span>
                  <div style="display: flex; gap: 0.5rem;">
                    ${this.likedAudioBlob?u`
                      <span style="display: inline-flex; align-items: center; gap: 0.3rem; color: #34d399; font-weight: 700; font-size: 0.82rem; padding: 0.4rem 0.8rem; background-color: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 8px;">
                        ✓ تم اعتماد وتضمين الصوت بالدرس
                      </span>
                    `:u`
                      <button 
                        type="button" 
                        @click=${this.handleLikeAudio}
                        style="padding: 0.5rem 1rem; font-size: 0.82rem; background-color: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 750; transition: all 0.2s;"
                      >
                        👍 عجبني، اربطه بالدرس
                      </button>
                    `}
                    <button 
                      type="button" 
                      @click=${this.handleDiscardTTS}
                      style="padding: 0.5rem 1rem; font-size: 0.82rem; background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; cursor: pointer; font-weight: 750; transition: all 0.2s;"
                    >
                      حذف وإعادة توليد 🗑️
                    </button>
                  </div>
                </div>
                <audio style="width: 100%; border-radius: 8px; background: rgba(0,0,0,0.5);" controls src=${this.generatedAudioUrl||"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAAACABAAZGF0YQQAAAAAAA=="}></audio>
                
                <!-- Display direct HTML EMBED source code for user to copy -->
                <div style="margin-top: 0.5rem; padding: 0.75rem; border-radius: 8px; background-color: rgba(0, 0, 0, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-weight: 700; color: #94a3b8; font-size: 0.78rem;">كود HTML للصوت (مضمن كلياً Base64 ولا يتأثر بتغيير المتصفح):</span>
                    <button 
                      type="button"
                      @click=${this.handleCopyHTMLEmbed}
                      style="font-size: 0.72rem; background: var(--primary-color, #a855f7); border: none; color: white; padding: 0.3rem 0.6rem; border-radius: 6px; cursor: pointer; font-weight: 700; transition: all 0.2s;"
                    >
                      نسخ كود للتصدير
                    </button>
                  </div>
                  <textarea 
                    readonly
                    id="html-code-area"
                    style="width: 100%; height: 50px; font-family: monospace; font-size: 0.72rem; background: #000; color: #34d399; border: 1px solid #222; border-radius: 6px; padding: 0.3rem; box-sizing: border-box; resize: none; direction: ltr;"
                  >${`<audio src="${this.generatedBase64}" controls></audio>`}</textarea>
                </div>
              </div>
            `:""}
          </div>

          <!-- Manual Audio Upload -->
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem; text-align: right;">
            <label for="audio-input" style="font-weight: 700; font-size: 0.95rem; color: #ffffff; display: flex; align-items: justify; justify-content: flex-start; flex-wrap: wrap; gap: 0.4rem;">
              <span>🎵 رفع ملف صوتي بديل للدرس (يدوي)</span>
              ${t?u`<span style="font-size: 0.75rem; color: #94a3b8; font-weight: 500;">(اختياري: اتركه فارغاً للاحتفاظ بملف الصوت الحالي)</span>`:""}
            </label>
            <div style="background: rgba(0, 0, 0, 0.2); border: 1.5px dashed rgba(255,255,255,0.12); padding: 1rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
               <input 
                 id="audio-input" 
                 type="file" 
                 accept="audio/*"
                 style="opacity: 0; position: absolute; top:0; left:0; width:100%; height:100%; cursor:pointer;"
                 @change=${e=>{const s=e.target,n=document.getElementById("audio-upload-label");s.files&&s.files[0]&&n&&(n.textContent=`✓ تم اختيار: ${s.files[0].name}`,n.style.color="#34d399")}}
               />
               <span id="audio-upload-label" style="font-size: 0.85rem; color: #94a3b8; pointer-events: none; transition: color 0.2s;">📁 اسحب وافلت ملف الصوت هنا، أو اضغط للتصفح</span>
            </div>
          </div>

          <!-- Actions Grid Panel -->
          <div class="form-actions" style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; gap: 0.75rem; align-items: center; justify-content: flex-end; flex-wrap: wrap;">
            ${t?u`<button
                  type="button"
                  class="delete-btn"
                  @click=${this.handleDelete}
                  style="background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.8rem 1.5rem; border-radius: 10px; font-weight: 750; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;"
                >
                  حذف الدرس نهائياً 🗑️
                </button>`:""}
            <button
              type="button"
              class="cancel-btn"
              @click=${this.handleCancel}
              style="background-color: rgba(255, 255, 255, 0.04); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.8rem 1.5rem; border-radius: 10px; font-weight: 750; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; margin-right: auto;"
            >
              إلغاء الرجوع ✕
            </button>
            <button 
              type="submit" 
              class="save-btn"
              style="background: linear-gradient(135deg, var(--primary-color, #a855f7), var(--accent-magenta, #d946ef)); color: white; border: none; padding: 0.8rem 2rem; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3); transition: all 0.2s;"
            >
              ${t?"حفظ وتحديث الدرس 💾":"حفظ ونشر الدرس الجديد 🚀"}
            </button>
          </div>
        </form>
      </div>
    `}createRenderRoot(){return this}};S([M({type:Object})],A.prototype,"lesson",2);S([m()],A.prototype,"isGenerating",2);S([m()],A.prototype,"hasApiKey",2);S([m()],A.prototype,"generationProgress",2);S([m()],A.prototype,"generationTimeRemaining",2);S([m()],A.prototype,"generatedAudioUrl",2);S([m()],A.prototype,"generatedBase64",2);S([m()],A.prototype,"likedAudioBlob",2);S([B("form")],A.prototype,"form",2);S([B("#content-input")],A.prototype,"contentInput",2);S([B("#translation-input")],A.prototype,"translationInput",2);S([B("#audio-input")],A.prototype,"audioInput",2);A=S([ae("add-lesson-view")],A);var Ut=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,z=(t,e,s,n)=>{for(var o=n>1?void 0:n?Rt(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(o=(n?i(e,s,o):i(o))||o);return n&&o&&Ut(e,s,o),o};let P=class extends j{constructor(){super(...arguments),this.lessons=[],this.isOpen=!1,this.messages=[],this.inputValue="",this.isGenerating=!1,this.errorMessage=""}connectedCallback(){super.connectedCallback(),this.loadHistory()}updated(t){t.has("isOpen")&&this.isOpen&&(this.scrollToBottom(),setTimeout(()=>{const e=this.querySelector("#chat-input");e&&e.focus()},300))}loadHistory(){try{const t=localStorage.getItem("lingo_gemini_chat_history");t?this.messages=JSON.parse(t):(this.messages=[{role:"model",text:`أهلاً بك في **مساعدك وتوأمك الدراسي الذكي**! ✨

أنا هنا لمساعدتك في التخطيط لدراستك، شرح دروس الإنجليزية، اقتراح خطط حفظ ومراجعة الكلمات، وتطوير نطقك وقراءتك. أي من دروس التطبيق أو القواعد تود أن نناقشه أو تخطط له الآن؟ 🚀`,timestamp:Date.now()}],this.saveHistory())}catch(t){console.error("Error loading chat history:",t)}}saveHistory(){try{localStorage.setItem("lingo_gemini_chat_history",JSON.stringify(this.messages))}catch(t){console.error("Error saving chat history:",t)}}clearHistory(){confirm("هل أنت متأكد من رغبتك في مسح سجل المحادثة بالكامل؟")&&(this.messages=[{role:"model",text:"تم مسح السجل الدراسي بنجاح. أهلاً بك مجدداً! كيف تود بدء خطتنا أو مذاكرتنا لليوم؟",timestamp:Date.now()}],this.saveHistory(),this.errorMessage="")}scrollToBottom(){setTimeout(()=>{this.messagesContainer&&(this.messagesContainer.scrollTop=this.messagesContainer.scrollHeight)},50)}handleKeyDown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.sendMessage())}handleInput(t){const e=t.target;this.inputValue=e.value}async sendMessage(){var s,n,o,a,i,r;const t=this.inputValue.trim();if(!t||this.isGenerating)return;this.errorMessage="",this.inputValue="";const e={role:"user",text:t,timestamp:Date.now()};this.messages=[...this.messages,e],this.saveHistory(),this.scrollToBottom(),this.isGenerating=!0;try{const d=`أنت معلم لغة إنجليزية ذكي وخبير ومساعد دراسي وودود جداً تُدعى "الهدف المساعد الدراسي الذكي (Gemini)".
مهمتك الأساسية هي:
1- مساعدة المستخدم بذكاء وطلاقة بالغة في تصميم وإعطاء خطط دراسية، تذكر تقدمه الدراسي، ومناقشة تفاصيل مذاكرته بناء على السجل والمحادثات السابقة المخزنة محلياً.
2- شرح وتفسير الدروس، تقديم أمثلة حية، اختبار المستخدم بالكلمات والقواعد، وتحسين مهاراته في الاستماع والقراءة.
3- عندما يسألك عن تفاصيل مذاكرته أو خططه السابقة، اعتمد كلياً على سجل المحادثات المرفق ومحتوياته لتذكره بها فوراً وطمأنته أنك تتذكر كل شيء.

الدروس المتاحة حالياً للمقارنة والمذاكرة:
${this.lessons&&this.lessons.length>0?`الدروس المتوفرة حالياً في التطبيق للمستخدم للمذاكرة والمتابعة والخطط:
`+this.lessons.map((y,I)=>`- الدرس #${I+1}: [${y.title}] يحتوي على: "${y.text?y.text.slice(0,100)+"...":""}"`).join(`
`):"لا توجد دروس مخصصة كافية مضافة في الحساب حالياً."}

نصائح عامة للتفاعل:
- أجب باللغة العربية لشرح المفاهيم بوضوح تام وتيسير الفهم، مع وضع الكلمات والتعابير الإنجليزية بخط واضح ومترجم.
- حافظ على النبرة الإيجابية، المحفزة والمشجعة دائماً ومساعدة الطلاب على التعلم الفعال والممتع.`;let p=this.messages.slice(-20).map(y=>({role:y.role,parts:[{text:y.text}]}));for(;p.length>0&&p[0].role!=="user";)p.shift();p.length===0&&t&&(p=[{role:"user",parts:[{text:t}]}]);const g=[];for(const y of p)if(g.length===0)y.role==="user"&&g.push(y);else{const I=g[g.length-1];I.role===y.role?I.parts[0].text+=`

`+y.parts[0].text:g.push(y)}const f=localStorage.getItem("lingo_custom_api_key"),v=f&&f.trim()!==""&&f!=="undefined"&&f!=="null"?f.trim().replace(/^["']|["']$/g,""):null,$={"Content-Type":"application/json"};v&&($["x-gemini-api-key"]=v);let k=null,T="",_=!1;try{k=await fetch("/api/gemini",{method:"POST",headers:$,body:JSON.stringify({contents:g,systemInstruction:d,temperature:.7})}),!k.ok&&v&&(console.warn("Backend API returned error, attempting direct Gemini API..."),_=!0,k=null)}catch(y){if(console.warn("Backend API connection failed, attempting direct Gemini API:",y),v)_=!0;else throw new Error("فشل الاتصال بالخادم. يرجى إدخال مفتاح API الخاص بك في الإعدادات المتقدمة لتفعيل الاتصال المباشر.")}if(_&&v){const y=["gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash"];let I=null,me=!1;for(const U of y)try{console.log(`[Direct Gemini Chat] Requesting model: ${U}`);const O=`https://generativelanguage.googleapis.com/v1beta/models/${U}:generateContent?key=${v}`,ie=await fetch(O,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:g,systemInstruction:{parts:[{text:d}]},generationConfig:{temperature:.7}})});if(!ie.ok){const ge=await ie.json().catch(()=>({}));throw new Error(((s=ge==null?void 0:ge.error)==null?void 0:s.message)||`HTTP status ${ie.status}`)}const Ae=(r=(i=(a=(o=(n=(await ie.json()).candidates)==null?void 0:n[0])==null?void 0:o.content)==null?void 0:a.parts)==null?void 0:i[0])==null?void 0:r.text;if(Ae){T=Ae,me=!0,console.log(`[Direct Gemini Chat] Success with model: ${U}`);break}}catch(O){console.warn(`[Direct Gemini Chat] Model ${U} failed:`,O),I=O}if(!me)throw I||new Error("فشلت جميع محاولات الاتصال المباشر بذكاء Gemini مع مفتاح الـ API الخاص بك.")}else if(k){if(!k.ok){const I=await k.json().catch(()=>({}));throw new Error(I.error||"فشل الاتصال بخدمة المساعد الدراسي الذكي.")}T=(await k.json()).text||"عذراً، لم أتمكن من صياغة إجابة مناسبة حالياً."}else throw new Error("لم يتم الحصول على استجابة من الخادم أو الـ API المباشر.");const V={role:"model",text:T,timestamp:Date.now()};this.messages=[...this.messages,V],this.saveHistory()}catch(l){console.error("Gemini Chat error:",l),this.errorMessage=(l==null?void 0:l.message)||"واجهت مشكلة غير متوقعة أثناء الاتصال بـ Gemini."}finally{this.isGenerating=!1,this.scrollToBottom()}}handleChipClick(t){const e=this.querySelector("#chat-input");e&&(this.inputValue=t,e.value=t,e.focus())}formatText(t){if(!t)return"";let e=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return e=e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/\*(.*?)\*/g,"<em>$1</em>"),e=e.split(`
`).map(s=>{const n=s.trim();return n.startsWith("- ")||n.startsWith("* ")?`<li style="margin-right: 1.5rem; margin-bottom: 0.25rem; text-align: right; direction: rtl; list-style-type: disc;">${n.substring(2)}</li>`:s}).join(`
`),e=e.replace(/```([\s\S]*?)```/g,'<pre style="background: rgba(0,0,0,0.5); padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.85rem; overflow-x: auto; direction: ltr; text-align: left; border: 1px solid rgba(255,255,255,0.06); margin: 0.75rem 0;"><code>$1</code></pre>'),e=e.replace(/`([^`]+)`/g,'<code style="background: rgba(255,255,255,0.12); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; direction: ltr;">$1</code>'),e.replace(/\n/g,"<br>")}render(){const t=L`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`,e=L`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,s=L`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;return u`
      <style>
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          height: 100dvh;
          width: 380px;
          max-width: 100%;
          background: rgba(11, 14, 30, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.6);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
          display: flex;
          flex-direction: column;
          z-index: 100;
          box-sizing: border-box;
          opacity: 0;
          pointer-events: none;
        }

        .sidebar.open {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(5, 7, 17, 0.4);
          flex-shrink: 0;
        }

        .sidebar-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          direction: rtl;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-button {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: scale(1.05);
        }

        .action-button.delete:hover {
          background: rgba(244, 63, 94, 0.15);
          border-color: rgba(244, 63, 94, 0.3);
          color: #f43f5e;
        }

        .messages-area {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
        }

        .messages-area::-webkit-scrollbar {
          width: 5px;
        }

        .messages-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
        }

        .msg-bubble-wrapper {
          display: flex;
          flex-direction: column;
          max-width: 85%;
        }

        .msg-bubble-wrapper.user {
          align-self: flex-start;
          text-align: left;
        }

        .msg-bubble-wrapper.model {
          align-self: flex-end;
          text-align: right;
        }

        .msg-bubble {
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.95rem;
          line-height: 1.6;
          word-break: break-word;
          white-space: pre-wrap;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .msg-bubble-wrapper.user .msg-bubble {
          background: linear-gradient(135deg, #3b82f6 0%, #d946ef 100%);
          color: white;
          border-bottom-left-radius: 4px;
        }

        .msg-bubble-wrapper.model .msg-bubble {
          background: rgba(255, 255, 255, 0.03);
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom-right-radius: 4px;
        }

        .msg-meta {
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 0.25rem;
          padding: 0 0.35rem;
        }

        .msg-bubble-wrapper.user .msg-meta {
          text-align: left;
        }

        .msg-bubble-wrapper.model .msg-meta {
          text-align: right;
          direction: rtl;
        }

        .suggestion-box {
          padding: 0.65rem 1rem;
          background: rgba(0, 0, 0, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          overflow-x: auto;
          display: flex;
          gap: 0.5rem;
          scrollbar-width: none;
          max-height: 48px;
          flex-shrink: 0;
        }

        .suggestion-box::-webkit-scrollbar {
          display: none;
        }

        .suggestion-chip {
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          direction: rtl;
        }

        .suggestion-chip:hover {
          background: rgba(217, 70, 239, 0.08);
          border-color: rgba(217, 70, 239, 0.3);
          color: #f472b6;
          transform: translateY(-1px);
        }

        .input-area {
          padding: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(5, 7, 17, 0.6);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .input-row {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .chat-textarea {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 0.55rem 0.75rem;
          color: white;
          font-family: inherit;
          font-size: 0.95rem;
          resize: none;
          outline: none;
          height: 38px;
          min-height: 38px;
          max-height: 120px;
          line-height: 1.4;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: right;
          direction: rtl;
        }

        .chat-textarea:focus {
          border-color: var(--primary-color);
          background: rgba(255, 255, 255, 0.05);
        }

        .send-button {
          background: var(--primary-color);
          border: none;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
        }

        .send-button:hover {
          background: var(--primary-hover-color);
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(217, 70, 239, 0.4);
        }

        .send-button:disabled {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.15);
          cursor: not-allowed;
          box-shadow: none;
        }

        .thinking-indicator {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.35rem;
          color: var(--text-color-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0 0.5rem;
          direction: rtl;
        }

        .thinking-dots {
          display: flex;
          gap: 3px;
        }

        .thinking-dot {
          width: 5px;
          height: 5px;
          background-color: var(--primary-color);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .thinking-dot:nth-child(1) { animation-delay: -0.32s; }
        .thinking-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .error-banner {
          background: rgba(244, 63, 94, 0.08);
          border: 1px dashed rgba(244, 63, 94, 0.25);
          color: #f43f5e;
          font-size: 0.8rem;
          padding: 0.5rem;
          border-radius: 6px;
          text-align: right;
          direction: rtl;
          margin-top: 0.25rem;
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 100%;
          }
        }
      </style>

      <div class="sidebar ${this.isOpen?"open":""}">
        <div class="sidebar-header">
          <button class="action-button close" @click=${()=>this.dispatchEvent(new CustomEvent("close-chat"))} title="إغلاق اللوحة">
            ${t}
          </button>
          
          <div class="header-actions">
            <button class="action-button delete" @click=${this.clearHistory} title="مسح المحادثة بالكامل">
              ${s}
            </button>
            <h3 class="sidebar-title">
              <span>مساعد الدراسة (Gemini)</span>
              <span>✨</span>
            </h3>
          </div>
        </div>

        <div class="messages-area" id="chat-messages-container">
          ${this.messages.map(n=>u`
            <div class="msg-bubble-wrapper ${n.role}">
              <div class="msg-bubble" .innerHTML=${this.formatText(n.text)}></div>
              <div class="msg-meta">
                ${n.role==="model"?"مساعد Gemini":"أنت"} • ${new Date(n.timestamp).toLocaleTimeString("ar-EG",{hour:"numeric",minute:"2-digit"})}
              </div>
            </div>
          `)}

          ${this.isGenerating?u`
            <div class="msg-bubble-wrapper model">
              <div class="msg-bubble" style="background: rgba(255,255,255,0.02)">
                <div class="thinking-indicator">
                  <span>جاري الكتابة والتذكر</span>
                  <div class="thinking-dots">
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                  </div>
                </div>
              </div>
            </div>
          `:""}

          ${this.errorMessage?u`
            <div class="error-banner">
              ⚠️ ${this.errorMessage}
            </div>
          `:""}
        </div>

        <!-- Quick study actions chips -->
        <div class="suggestion-box">
          <div class="suggestion-chip" @click=${()=>this.handleChipClick("ضع لي خطة لمذاكرة وحفظ كلمات الدروس المتاحة")}>📅 خطة حفظ الكلمات</div>
          <div class="suggestion-chip" @click=${()=>this.handleChipClick("اشرح لي الكلمات والتعبيرات الهامة في أفضل درس متاح")}>💡 شرح عبارات هامة</div>
          <div class="suggestion-chip" @click=${()=>this.handleChipClick("اكتب لي قصة قصيرة بالإنجليزية مع ترجمتها لتحدي القراءة الجديد")}>📖 تحدي قراءة وقصة</div>
          <div class="suggestion-chip" @click=${()=>this.handleChipClick("اختبرني بخمسة أسئلة اختيار من متعدد لقواعد اللغة")}>🎯 اختبار قواعد فوري</div>
        </div>

        <div class="input-area">
          <div class="input-row">
            <button class="send-button" ?disabled=${!this.inputValue.trim()||this.isGenerating} @click=${this.sendMessage} title="إرسال">
              ${e}
            </button>
            <textarea
              id="chat-input"
              class="chat-textarea"
              placeholder="اكتب رسالتك للمذاكرة أو التخطيط..."
              .value=${this.inputValue}
              @input=${this.handleInput}
              @keydown=${this.handleKeyDown}
            ></textarea>
          </div>
        </div>
      </div>
    `}createRenderRoot(){return this}};z([M({type:Array})],P.prototype,"lessons",2);z([M({type:Boolean})],P.prototype,"isOpen",2);z([m()],P.prototype,"messages",2);z([m()],P.prototype,"inputValue",2);z([m()],P.prototype,"isGenerating",2);z([m()],P.prototype,"errorMessage",2);z([B("#chat-messages-container")],P.prototype,"messagesContainer",2);P=z([ae("chat-sidebar")],P);var Dt=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,b=(t,e,s,n)=>{for(var o=n>1?void 0:n?qt(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(o=(n?i(e,s,o):i(o))||o);return n&&o&&Dt(e,s,o),o};let w=class extends j{constructor(){super(...arguments),this.lessons=St,this.selectedLesson=null,this.currentView="list",this.lessonToEdit=null,this.audioSrc=null,this.isPlaying=!1,this.currentTime=0,this.duration=0,this.playbackRate=1,this.seekStep=10,this.isSettingsOpen=!1,this.isLoadingAudio=!1,this.generatingLessons=new Map,this.readyReferenceAudios=new Set,this.isChatOpen=!1,this.customApiKey="",this.isPlatformSettingsOpen=!1,this.backupStatus="",this.progressIntervals=new Map,this.dashboardScrollTop=0,this.handleOutsideClick=t=>{if(!this.isSettingsOpen)return;const e=t.composedPath();this.settingsContainer&&!e.includes(this.settingsContainer)&&(this.isSettingsOpen=!1)}}startLessonProgressCountdown(t){this.progressIntervals.has(t)&&clearInterval(this.progressIntervals.get(t));const e=Date.now(),s=5e3,n=setInterval(()=>{const o=Date.now()-e;let a=o/s*100;a>=98&&(a=98),this.generatingLessons.set(t,{progress:Math.round(a),timeRemaining:Math.max(1,Math.ceil((s-o)/1e3))}),this.generatingLessons=new Map(this.generatingLessons)},1e3);this.progressIntervals.set(t,n)}stopLessonProgressCountdown(t){this.progressIntervals.has(t)&&(clearInterval(this.progressIntervals.get(t)),this.progressIntervals.delete(t)),this.generatingLessons.delete(t),this.generatingLessons=new Map(this.generatingLessons)}async connectedCallback(){super.connectedCallback(),this.customApiKey=localStorage.getItem("lingo_custom_api_key")||"";try{await this.loadLessonsFromStorage(),await this.checkReferenceAudios()}catch(t){console.error("Error loading lessons:",t)}window.addEventListener("click",this.handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("click",this.handleOutsideClick)}handleDoubleClick(){this.selectedLesson&&this.audioSrc&&this.audioPlayer&&(this.isPlaying?(this.audioPlayer.pause(),this.isPlaying=!1,this.audioPlayer.currentTime=Math.max(0,this.audioPlayer.currentTime-4)):(this.audioPlayer.play(),this.isPlaying=!0))}willUpdate(t){if(t.has("currentView")&&t.get("currentView")==="list"){const s=this.querySelector(".dashboard-container");s?this.dashboardScrollTop=s.scrollTop:this.scrollContainer&&(this.dashboardScrollTop=this.scrollContainer.scrollTop)}super.willUpdate(t)}updated(t){t.has("selectedLesson")&&this.selectedLesson&&(this.resetPlayerState(),this.loadAudioForLesson(this.selectedLesson)),t.has("currentView")&&this.currentView==="list"&&setTimeout(()=>{const e=this.querySelector(".dashboard-container");e&&(e.scrollTop=this.dashboardScrollTop),this.scrollContainer&&(this.scrollContainer.scrollTop=this.dashboardScrollTop)},50),super.updated(t)}async loadLessonsFromStorage(){try{await Me();const t=localStorage.getItem("lessons");if(t){let e=JSON.parse(t),s=!1;for(const n of e)if(n.audioSrc&&n.audioSrc.startsWith("data:audio")&&n.audioSrc.length>2e3)try{const a=await(await fetch(n.audioSrc)).blob();await G(n.id,a),n.audioSrc="db",s=!0}catch(o){console.error("Error migrating old audio to IndexedDB:",o),n.audioSrc="db",s=!0}this.lessons=e,s&&localStorage.setItem("lessons",JSON.stringify(this.lessons))}!this.selectedLesson&&this.lessons.length>0&&(this.selectedLesson=this.lessons[0])}catch(t){console.error("Failed to load lessons from storage:",t)}}saveLessonsToStorage(){try{localStorage.setItem("lessons",JSON.stringify(this.lessons))}catch(t){console.error("Failed to save lessons to storage:",t)}}async exportBackup(){try{this.backupStatus="⏳ جاري تحويل الدروس وصوتيات IndexedDB إلى ملف الحزمة المجمعة... يرجى عدم إغلاق النافذة.";const t=[...this.lessons],e=await Promise.all(t.map(async i=>{let r;try{const l=await re(i.id);l&&l.size>0&&(r=await new Promise((d,h)=>{const c=new FileReader;c.onloadend=()=>d(c.result),c.onerror=h,c.readAsDataURL(l)}))}catch(l){console.warn(`Could not load audio for lesson ${i.id}:`,l)}return{lesson:i,audioBase64:r}})),s=JSON.stringify(e),n=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(n),a=document.createElement("a");a.href=o,a.download="lingo_lessons_and_voice_database.json",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(o),this.backupStatus=`✅ تم تصدير حزمة الدروس (${t.length} درس) بنجاح كامل! تم تحميل الملف إلى جهازك ونقله في ثوانٍ معدودة.`}catch(t){console.error(t),this.backupStatus="❌ حدث خطأ أثناء التصدير: "+t.message}}async importBackup(t){const e=t.target;if(!e.files||e.files.length===0)return;const s=e.files[0];try{this.backupStatus="⏳ جاري فك حزمة الدروس المستوردة وإعادة بناء الملفات الصوتية في المتصفح...";const n=await s.text(),o=JSON.parse(n);if(!Array.isArray(o))throw new Error("صيغة ملف النسخ الاحتياطي غير صالحة.");await Me();const a=[];for(const i of o)if(!(!i.lesson||!i.lesson.id)&&(a.push(i.lesson),i.audioBase64))try{const l=await(await fetch(i.audioBase64)).blob();await G(i.lesson.id,l)}catch(r){console.error("Failed to import audio for lesson "+i.lesson.id,r)}a.length>0?(this.lessons=a,this.saveLessonsToStorage(),this.lessons.length>0?this.selectedLesson=this.lessons[0]:this.selectedLesson=null,await this.checkReferenceAudios(),this.selectedLesson&&this.loadAudioForLesson(this.selectedLesson),this.backupStatus=`🎉 تم استيراد حزمتك بنجاح! تم تحميل ${a.length} درس واسترجاع كافة مقاطع الصوت المصاحبة بنسبة 100%.`):this.backupStatus="⚠️ لم يتم العثور على أي دروس صالحة داخل الملف المرفوع."}catch(n){console.error(n),this.backupStatus="❌ فشل الاستيراد: "+n.message}finally{e.value=""}}saveCustomApiKey(t){let e=t.trim().replace(/^["']|["']$/g,"");(e==="undefined"||e==="null")&&(e=""),e?(localStorage.setItem("lingo_custom_api_key",e),this.customApiKey=e,alert("تم حفظ وتثبيت مفتاح الـ API الخاص بك بنجاح! سيتم استخدامه الآن لكافة خدمات الترجمة والمحادثة وتوليد الأصوات.")):(localStorage.removeItem("lingo_custom_api_key"),this.customApiKey="",alert("تم مسح مفتاح الـ API المخصص. سيعمل التطبيق الآن بالاعتماد على مفاتيح الخادم الافتراضية.")),location.reload()}handleLessonSelected(t){this.selectedLesson=t.detail}async handleLessonSaved(t){var r;const{id:e,content:s,text:n,translation:o,audioFile:a,audioSrc:i}=t.detail;if(e!==void 0){const l=this.lessons.findIndex(d=>d.id===e);if(l>-1){const d=[...this.lessons],h={...d[l],content:s,text:n,translation:o,audioSrc:i||d[l].audioSrc||""};if(d[l]=h,a)try{await G(e,a)}catch(c){console.error("Failed to update audio file:",c);return}this.lessons=d,this.saveLessonsToStorage(),((r=this.selectedLesson)==null?void 0:r.id)===e&&(this.selectedLesson={...h})}}else{const l=Date.now();try{a&&await G(l,a);const d=`Lesson ${this.lessons.length+1}`,h={id:l,title:d,content:s,text:n,translation:o,audioSrc:i||""};this.lessons=[...this.lessons,h],this.saveLessonsToStorage(),this.selectedLesson=h}catch(d){console.error("Failed to save new lesson:",d)}}this.currentView="list",this.lessonToEdit=null}async handleLessonDeleted(t){var s;const e=t.detail;try{await Ct(e),this.lessons=this.lessons.filter(n=>n.id!==e),this.saveLessonsToStorage(),((s=this.selectedLesson)==null?void 0:s.id)===e&&(this.selectedLesson=this.lessons.length>0?this.lessons[0]:null),this.currentView==="add"&&(this.currentView="list",this.lessonToEdit=null)}catch(n){console.error("Failed to delete lesson:",n)}}handleEditClick(){this.selectedLesson&&(this.lessonToEdit=this.selectedLesson,this.currentView="add")}switchView(t){t==="add"&&(this.lessonToEdit=null),this.currentView=t}resetPlayerState(){this.audioSrc&&URL.revokeObjectURL(this.audioSrc),this.audioSrc=null,this.isPlaying=!1,this.currentTime=0,this.duration=0,this.isSettingsOpen=!1,this.isLoadingAudio=!1}async loadAudioForLesson(t){if(this.isLoadingAudio=!0,this.audioSrc=null,t.audioSrc&&(t.audioSrc.startsWith("data:")||t.audioSrc.startsWith("http")||t.audioSrc.includes("."))){this.audioSrc=t.audioSrc,this.isLoadingAudio=!1;return}try{const e=await re(t.id);this.audioSrc=URL.createObjectURL(e)}catch{}finally{this.isLoadingAudio=!1}}async checkReferenceAudios(){const t=Math.floor(this.lessons.length/10),e=new Set;for(let s=1;s<=t;s++)try{const n=-s,o=await re(n);o&&o.size>0&&e.add(s)}catch{}this.readyReferenceAudios=e}getReferenceLessonForGroup(t){const e=(t-1)*10,s=t*10-1,n=this.lessons.slice(e,s+1),o=e+1,a=Math.min(s+1,this.lessons.length),i=n.map((d,h)=>`=== ${d.title||`الدرس ${o+h}`} ===

${d.text}`).join(`


`),r=n.map((d,h)=>`=== ${d.title||`الدرس ${o+h}`} ===

${d.translation||""}`).join(`


`),l=this.readyReferenceAudios.has(t);return{id:-t,title:`درس مرجعي مجمع: مراجعة الدروس ${o} - ${a}`,audioSrc:l?"db":"",content:[],text:i,translation:r,isReference:!0,referenceRange:{start:o,end:a}}}async generateReferenceAudio(t){var o;const e=(t-1)*10,s=t*10-1,n=this.lessons.slice(e,s+1);this.generatingLessons.set(-t,{progress:0,timeRemaining:3}),this.generatingLessons=new Map(this.generatingLessons),this.startLessonProgressCountdown(-t);try{const a=[],i=[];for(let h=0;h<n.length;h++){const c=n[h],p=Math.round(h/n.length*50);this.generatingLessons.set(-t,{progress:p,timeRemaining:2}),this.generatingLessons=new Map(this.generatingLessons);try{const g=await re(c.id);g&&g.size>0?a.push(g):i.push(`الدرس #${e+h+1}: ${c.title||"بدون اسم"}`)}catch{i.push(`الدرس #${e+h+1}: ${c.title||"بدون اسم"}`)}}if(i.length>0){this.stopLessonProgressCountdown(-t),this.generatingLessons.delete(-t),this.generatingLessons=new Map(this.generatingLessons),alert(`لا يمكن دمج الدروس لعدم اكتمال توليد الصوت للدروس الفردية.

يرجى الدخول إلى الدروس التالية وتوليد الصوت الخاص بكل منها أولاً:

${i.join(`
`)}`);return}this.generatingLessons.set(-t,{progress:75,timeRemaining:1}),this.generatingLessons=new Map(this.generatingLessons);const{mergeWavBlobs:r}=await Xe(async()=>{const{mergeWavBlobs:h}=await Promise.resolve().then(()=>Pt);return{mergeWavBlobs:h}},void 0,import.meta.url),l=await r(a);await G(-t,l),this.readyReferenceAudios.add(t),this.readyReferenceAudios=new Set(this.readyReferenceAudios);const d=URL.createObjectURL(l);((o=this.selectedLesson)==null?void 0:o.id)===-t&&(this.selectedLesson=this.getReferenceLessonForGroup(t),this.audioSrc=d),this.stopLessonProgressCountdown(-t),this.generatingLessons.delete(-t),this.generatingLessons=new Map(this.generatingLessons)}catch(a){console.error("Error merging reference audio:",a),this.stopLessonProgressCountdown(-t),this.generatingLessons.delete(-t),this.generatingLessons=new Map(this.generatingLessons),alert(`فشل دمج الملف الصوتي المرجعي: ${(a==null?void 0:a.message)||a}`)}}renderPrecedingLessonsStatus(t){const e=(t-1)*10,s=t*10-1,n=this.lessons.slice(e,s+1);return u`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 0.5rem; margin-top: 0.5rem; background: rgba(0,0,0,0.2); padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);">
        ${n.map((o,a)=>{const i=!!o.audioSrc;return u`
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.25rem; font-size: 0.75rem; background: rgba(255, 255, 255, 0.02); padding: 5px 8px; border-radius: 6px; border: 1px solid ${i?"rgba(59, 130, 246, 0.25)":"rgba(217, 70, 239, 0.2)"};">
              <span style="color: var(--text-color-secondary); font-weight: 500;">#${e+a+1}</span>
              <span style="color: ${i?"#60a5fa":"#c084fc"}; font-weight: 600;">${i?"🔊 جاهز":"🧠 توليد"}</span>
            </div>
          `})}
      </div>
    `}async generateAudioForLesson(t=this.selectedLesson){var s;if(!t)return;const e=t.id;this.generatingLessons.set(e,{progress:0,timeRemaining:10}),this.generatingLessons=new Map(this.generatingLessons),this.startLessonProgressCountdown(e);try{const n=await Ie(t.text,"","Kore");await G(e,n);const o=this.lessons.map(i=>i.id===e?{...i,audioSrc:"db"}:i);this.lessons=o,this.saveLessonsToStorage();const a=URL.createObjectURL(n);((s=this.selectedLesson)==null?void 0:s.id)===e&&(this.selectedLesson={...this.selectedLesson,audioSrc:"db"},this.audioSrc=a),this.stopLessonProgressCountdown(e)}catch(n){console.error(n),this.stopLessonProgressCountdown(e),alert(`فشل توليد الصوت للدرس "${t.title}": ${(n==null?void 0:n.message)||n}`)}}handleTimeUpdate(){this.audioPlayer&&(this.currentTime=this.audioPlayer.currentTime)}handleLoadedMetadata(){this.audioPlayer&&(this.duration=this.audioPlayer.duration,this.audioPlayer.playbackRate=this.playbackRate)}handleAudioEnded(){this.isPlaying=!1}togglePlayPause(){this.audioPlayer&&(this.isPlaying?this.audioPlayer.pause():this.audioPlayer.play(),this.isPlaying=!this.isPlaying)}rewind(){this.audioPlayer&&(this.audioPlayer.currentTime=Math.max(0,this.audioPlayer.currentTime-this.seekStep))}forward(){this.audioPlayer&&(this.audioPlayer.currentTime=Math.min(this.duration,this.audioPlayer.currentTime+this.seekStep))}handleSeek(t){const e=t.target;this.audioPlayer&&(this.audioPlayer.currentTime=Number(e.value))}formatTime(t){if(isNaN(t))return"00:00";const e=Math.floor(t/60),s=Math.floor(t%60);return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}toggleSettings(t){t.stopPropagation(),this.isSettingsOpen=!this.isSettingsOpen}changePlaybackRate(t){this.playbackRate=t,this.audioPlayer&&(this.audioPlayer.playbackRate=t)}changeSeekStep(t){this.seekStep=t}downloadAudio(){if(!this.audioSrc||!this.selectedLesson)return;const t=document.createElement("a");t.href=this.audioSrc,t.download=`${this.selectedLesson.title.replace(/\s+/g,"_")}_audio.wav`,document.body.appendChild(t),t.click(),document.body.removeChild(t)}handleExportHTMLEmbed(){if(!this.selectedLesson)return;const t=this.selectedLesson.audioSrc?`<audio src="${this.selectedLesson.audioSrc}" controls style="width: 100%; border-radius: 8px; margin-top: 1rem;"></audio>`:"<!-- لم يتم تخصيص أو توليد مقطع صوتي مدمج بالـ Base64 لهذا الدرس بعد. يمكنك تشغيله بالخيار الفوري -->",e=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الهدف - ${this.selectedLesson.title}</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #121212;
            color: #e0e0e0;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            direction: ltr;
        }
        .container {
            background: #1e1e1e;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        h1 {
            color: var(--accent-magenta);
            font-size: 1.8rem;
            margin-top: 0;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #333;
            padding-bottom: 0.75rem;
        }
        .text-section {
            font-size: 1.15rem;
            line-height: 2.2;
            margin-bottom: 2rem;
        }
        .translation-section {
            font-size: 1.2rem;
            line-height: 2.2;
            color: #b0b0b0;
            direction: rtl;
            text-align: right;
            border-top: 1px solid #333;
            padding-top: 1.5rem;
        }
        audio {
            width: 100%;
            margin-top: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>الهدف - ${this.selectedLesson.title}</h1>
        <div class="text-section">
            <p>${this.selectedLesson.text.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}</p>
        </div>
        <div class="translation-section">
            <p>${(this.selectedLesson.translation||"").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}</p>
        </div>
        ${t}
    </div>
</body>
</html>`;navigator.clipboard?navigator.clipboard.writeText(e).then(()=>alert("تم نسخ كود الـ HTML المدمج للدرس بالكامل بنجاح في الحافظة! يمكنك حفظه في ملف .html لتشغيله في أي مكان.")).catch(()=>this.fallbackCopyText(e)):this.fallbackCopyText(e)}fallbackCopyText(t){const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="2em",e.style.height="2em",e.style.padding="0",e.style.border="none",e.style.outline="none",e.style.boxShadow="none",e.style.background="transparent",document.body.appendChild(e),e.focus(),e.select();try{document.execCommand("copy"),alert("تم نسخ كود الـ HTML المدمج للدرس بالكامل بنجاح!")}catch{alert("خطأ في النسخ. يرجى محاولة النسخ يدويًا.")}document.body.removeChild(e)}renderSettingsMenu(){const t=[.75,1,1.25,1.5],e=[5,10,15];return u`
      <div class="settings-popover">
        <div class="settings-group">
          <label>Playback Speed</label>
          <div class="options">
            ${t.map(s=>u`
                <button
                  class=${ve({active:this.playbackRate===s})}
                  @click=${()=>this.changePlaybackRate(s)}
                >
                  ${s}x
                </button>
              `)}
          </div>
        </div>
        <div class="settings-group">
          <label>Seek Time</label>
          <div class="options">
            ${e.map(s=>u`
                <button
                  class=${ve({active:this.seekStep===s})}
                  @click=${()=>this.changeSeekStep(s)}
                >
                  ${s}s
                </button>
              `)}
          </div>
        </div>
      </div>
    `}renderPlayer(){const t=L`<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`,e=L`<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`,s=L`<svg viewBox="0 0 24 24" style="position: relative;"><path d="M11 18V6l-8.5 6 8.5 6zm-2-6 6 4.5V7.5l-6 4.5z"></path></svg>`,n=L`<svg viewBox="0 0 24 24" style="position: relative;"><path d="M13 6v12l8.5-6-8.5-6zM4 18l8.5-6L4 6v12z"></path></svg>`,o=L`<svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>`,a=L`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px; height:20px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;return u`
      <div class="custom-audio-player">
        <div class="progress-bar-container">
          <span>${this.formatTime(this.currentTime)}</span>
          <input
            type="range"
            min="0"
            .max=${this.duration||0}
            .value=${this.currentTime}
            @input=${this.handleSeek}
          />
          <span>${this.formatTime(this.duration)}</span>
        </div>
        <div class="player-controls">
          <button @click=${this.rewind} aria-label="Rewind">
            ${s}
          </button>
          <button
            class="play-pause-btn"
            @click=${this.togglePlayPause}
            aria-label=${this.isPlaying?"Pause":"Play"}
          >
            ${this.isPlaying?e:t}
          </button>
          <button @click=${this.forward} aria-label="Forward">
            ${n}
          </button>
          
          <!-- Download Button -->
          <button @click=${this.downloadAudio} title="تحميل الملف الصوتي" aria-label="Download Audio" style="display: flex; align-items: center; justify-content: center; padding: 0.5rem; background: rgba(127, 90, 240, 0.1); border: 1px solid var(--primary-color); border-radius: 50%; width:38px; height:38px; cursor: pointer;">
            ${a}
          </button>

          <div class="settings-container">
            <button
              @click=${this.toggleSettings}
              aria-label="Audio Settings"
              aria-haspopup="true"
              aria-expanded=${this.isSettingsOpen}
            >
              ${o}
            </button>
            ${this.isSettingsOpen?this.renderSettingsMenu():""}
          </div>
        </div>
      </div>
    `}renderDashboard(){const t=L`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,e=this.lessons.length,s=this.lessons.filter(o=>o.audioSrc).length,n=this.lessons.reduce((o,a)=>o+(a.text?a.text.split(/\s+/).filter(Boolean).length:0),0);return u`
      <div class="dashboard-container" dir="rtl">
        <!-- background dynamic decorative glowing spots -->
        <div class="glow-bg-blob glow-blob-1"></div>
        <div class="glow-bg-blob glow-blob-2"></div>

        <!-- Interactive sparkling decorative floating stars -->
        <div class="sparkling-star star-1">✨</div>
        <div class="sparkling-star star-2">✦</div>
        <div class="sparkling-star star-3">✨</div>
        <div class="sparkling-star star-4">✦</div>
        <div class="sparkling-star star-5">✨</div>

        <div class="dashboard-header animated-fade-in">
          <div class="logo-area">
            <div class="logo-wrapper">
              <div class="pulse-ring pulse-ring-1"></div>
              <div class="pulse-ring pulse-ring-2"></div>
              <img src="./icons/icon.png" class="logo-image" alt="الهدف" />
            </div>
            <div class="logo-text">
              <h1>الهدف لتعلم الإنجليزية (Lingo)</h1>
              <p>منصة تفاعلية ذكية لتعلم النطق والاستماع والترجمة</p>
              <p class="creator-attribution">Created by Kareem Abdelhalim</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <button class="add-lesson-btn-dashboard" @click=${()=>this.switchView("add")} aria-label="Add Lesson">
              ${t}
              <span>إضافة درس جديد</span>
            </button>
            <button @click=${()=>this.isPlatformSettingsOpen=!0} style="display: flex; align-items: center; gap: 0.6rem; padding: 0.85rem 1.5rem; background: rgba(255, 255, 255, 0.05); border: 1.5px solid rgba(255, 255, 255, 0.15); color: #e2e8f0; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);" title="الإعدادات المتقدمة وإدارة مفتاح API والاستيراد والتصدير">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
              <span>الإعدادات المتقدمة ⚙️</span>
            </button>
            <button @click=${()=>this.isChatOpen=!this.isChatOpen} style="display: flex; align-items: center; gap: 0.6rem; padding: 0.85rem 1.5rem; background: rgba(59, 130, 246, 0.1); border: 1.5px solid var(--primary-color); color: #60a5fa; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);" title="افتح مساعدك الدراسي الذكي">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
              <span>مساعد المذاكرة (Gemini) 🤖</span>
            </button>
          </div>
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon-wrapper">📚</div>
            <div class="stat-info">
              <span class="stat-value">${e}</span>
              <span class="stat-label">إجمالي الدروس المتاحة</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper">🔊</div>
            <div class="stat-info">
              <span class="stat-value">${s}</span>
              <span class="stat-label">دروس ناطقة بالذكاء الاصطناعي</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper">📝</div>
            <div class="stat-info">
              <span class="stat-value">${n}</span>
              <span class="stat-label">عدد الكلمات الإنجليزية للتمرن</span>
            </div>
          </div>
        </div>

        <div class="lessons-grid" style="margin-top: 1rem;">
          ${this.lessons.map((o,a)=>{const i=!!o.audioSrc,r=a>0&&a%10===0?u`
              <div class="lessons-divider-group">
                <div class="lessons-divider-line"></div>
                <span class="lessons-divider-text">الدروس التالية ${a+1} - ${Math.min(a+10,e)}</span>
                <div class="lessons-divider-line"></div>
              </div>
            `:"",l=(a+1)%10===0,d=(a+1)/10,h=l?this.getReferenceLessonForGroup(d):null,c=l?this.readyReferenceAudios.has(d):!1,p=h?u`
              <div class="lesson-card reference-card" @click=${()=>{this.selectedLesson=h,this.currentView="detail"}}>
                <div class="lesson-card-right">
                  <div class="lesson-meta">
                    <span class="lesson-num ref-badge">🎯 مرجع مجمع</span>
                  </div>
                  <div class="lesson-details">
                    <h3 class="lesson-card-title ref-title">${h.title}</h3>
                    <p class="lesson-card-preview" style="color: var(--text-color-secondary); font-size: 0.8rem; margin: 0.25rem 0 0 0;">اضغط لتشغيل ملف الصوت المدمج وقراءة نصوص الدروس الـ 10 السابقة مجمعة متزامنة.</p>
                  </div>
                </div>
                <div class="lesson-card-left">
                  ${c?u`<span class="audio-badge ref-audio-ready">🔊 مدمج ومكتمل</span>`:u`<span class="audio-badge secondary">✨ جاهز للدمج</span>`}
                  <span class="start-learning-link ref-link">
                    مراجعة ⚡
                  </span>
                </div>
              </div>
            `:"";return u`
              ${r}
              <div class="lesson-card" @click=${()=>{this.selectedLesson=o,this.currentView="detail"}}>
                <div class="lesson-card-right">
                  <div class="lesson-meta">
                    <span class="lesson-num"># ${a+1}</span>
                  </div>
                  <div class="lesson-details">
                    <h3 class="lesson-card-title">${o.title}</h3>
                    <p class="lesson-card-preview">${o.text?o.text.length>80?o.text.slice(0,80)+"...":o.text:""}</p>
                  </div>
                </div>
                <div class="lesson-card-left">
                  ${i?u`<span class="audio-badge">🔊 صوت جاهز</span>`:u`<span class="audio-badge secondary">🧠 جاهز للتوليد</span>`}
                  <span class="start-learning-link">
                    دخول ⚡
                  </span>
                </div>
              </div>
              ${p}
            `})}

          <div class="lesson-card add-card" @click=${()=>this.switchView("add")}>
            <div class="add-icon-wrapper">
              ${t}
            </div>
            <div class="add-card-texts">
              <h3>إضافة درس جديد</h3>
              <p>قم بكتابة وترجمة نص مخصص لتوليد مقطع صوتي باستخدام Gemini وتطبيقه للتعلم الفوري.</p>
            </div>
          </div>
        </div>

        <footer class="app-footer">
          <div class="footer-divider"></div>
          <div class="footer-content">
            <img src="./icons/icon.png" class="footer-logo" alt="Lingo Logo" />
            <span class="footer-text">Lingo - الهدف لتعلم الإنجليزية</span>
            <span class="footer-divider-dot">•</span>
            <span class="footer-creator">Created by Kareem Abdelhalim</span>
          </div>
        </footer>
      </div>
    `}renderDetailView(){var n,o;L`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;const t=L`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2 6.4 4.5 5 7zM19.5 15.4L22 14l-1.4-2.5L22 9l-2.5 1.4L17 9l1.4 2.5L17 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-8.8 9L11 6.5 8.8 11 4.3 13.2l4.5 2.2L11 19.9l2.2-4.5 4.5-2.2z"/></svg>`,e=this.selectedLesson?this.generatingLessons.has(this.selectedLesson.id):!1,s=this.selectedLesson?this.generatingLessons.get(this.selectedLesson.id):null;return u`
      <div class="lesson-view-wrapper" @dblclick=${this.handleDoubleClick} style="display: flex; flex-direction: column; height: 100%;">
        <header class="detail-header-bar">
          <button class="back-icon-only-btn" @click=${()=>this.currentView="list"} aria-label="العودة للدروس" title="العودة للدروس">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          </button>
          
          <h2 class="detail-header-title">${(n=this.selectedLesson)==null?void 0:n.title}</h2>
          
          <div class="detail-header-actions">
            <button class="header-icon-btn action-chat-btn" @click=${()=>this.isChatOpen=!this.isChatOpen} title="افتح المساعد الدراسي الذكي (Gemini)" style="background: rgba(59, 130, 246, 0.1); border: 1px solid var(--primary-color); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #60a5fa; transition: all 0.2s ease; margin-left: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
            </button>
            <button class="header-icon-btn action-edit-btn" @click=${this.handleEditClick} aria-label="Edit lesson" title="تعديل محتوى الدرس">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>
            <button class="header-icon-btn action-export-btn" @click=${this.handleExportHTMLEmbed} title="نسخ كود الـ HTML المدمج للدرس بالكامل">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M14.6 16.6L19.2 12l-4.6-4.6c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l5.3 5.3c.39.39.39 1.02 0 1.41l-5.3 5.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.01 0-1.4zm-5.2 0L4.8 12l4.6-4.6c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-5.3 5.3c-.39.39-.39 1.02 0 1.41l5.3 5.3c.39.39 1.02.39 1.41 0 .39-.39.39-1.01 0-1.4z"/>
                </svg>
            </button>
          </div>
        </header>

        ${this.selectedLesson?u`
          <!-- خانة الصوت (The Audio Box): Thicker, slimmer, responsive -->
          <div class="compact-audio-box">
            ${e?u`
              <div style="padding: 0.5rem; text-align: center; display: flex; gap: 0.75rem; justify-content: center; align-items: center; width: 100%;">
                <p style="margin:0; font-size: 0.85rem; font-weight: 500; color: var(--text-color);">جاري معالجة وتوليد الصوت بالذكاء الاصطناعي للدرس...</p>
                ${s&&s.progress>0?u`
                  <div style="width: 100%; max-width: 250px; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; color: var(--text-color-secondary); white-space: nowrap;">جاري التوليد... ${s.progress}%</span>
                    <div style="flex: 1; height: 5px; background-color: rgba(255, 255, 255, 0.05); border-radius: 999px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
                      <div style="width: ${s.progress}%; height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-magenta)); border-radius: 999px;"></div>
                    </div>
                  </div>
                `:u`
                  <div style="animation: spin 1s linear infinite; width: 16px; height: 16px; border: 2px solid var(--primary-color); border-top-color: transparent; border-radius: 50%;"></div>
                `}
              </div>
            `:this.isLoadingAudio?u`
              <div style="padding: 0.5rem; text-align: center; display: flex; justify-content: center; align-items: center; width: 100%;">
                <div style="animation: spin 1s linear infinite; width: 16px; height: 16px; border: 2px solid var(--primary-color); border-top-color: transparent; border-radius: 50%;"></div>
              </div>
            `:this.audioSrc?u`
              <audio
                id="audio-player"
                src=${this.audioSrc}
                @timeupdate=${this.handleTimeUpdate}
                @loadedmetadata=${this.handleLoadedMetadata}
                @ended=${this.handleAudioEnded}
                @play=${()=>this.isPlaying=!0}
                @pause=${()=>this.isPlaying=!1}
              ></audio>
              ${this.renderPlayer()}
            `:(o=this.selectedLesson)!=null&&o.isReference?u`
              <div style="display:flex; flex-direction:column; gap:0.75rem; width:100%;" dir="rtl">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:1.5rem; width:100%; flex-wrap: wrap;">
                  <div>
                    <h4 style="margin: 0; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.4rem;">
                      <span>🎯 دمج ومراجعة الدروس العشرة السابقة</span>
                      <span style="font-size: 0.75rem; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); color: #c084fc; padding: 2px 8px; border-radius: 4px;">درس مرجعي</span>
                    </h4>
                    <p style="color:var(--text-color-secondary); font-size:0.8rem; margin: 0.25rem 0 0 0;">سيقوم النظام بدمج الملفات الصوتية للدروس الـ 10 السابقة وتوليد أي أصوات ناقصة تلقائياً في ملف صوتي واحد متتابع.</p>
                  </div>
                  <button class="generate-audio-btn" @click=${()=>this.generateReferenceAudio(Math.abs(this.selectedLesson.id))} style="background: linear-gradient(135deg, var(--primary-color), var(--accent-magenta)); color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(217, 70, 239, 0.4); transition: transform 0.2s; white-space: nowrap;">
                    ⚡ دمج وتوليد الملف المرجعي الموحد
                  </button>
                </div>
                ${this.renderPrecedingLessonsStatus(Math.abs(this.selectedLesson.id))}
              </div>
            `:u`
              <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; width:100%;" dir="rtl">
                <p style="color:var(--text-color-secondary); font-size:0.85rem; margin:0;">لم يتم توليد مقطع صوتي للدرس الحالي بعد.</p>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <button class="generate-audio-btn" @click=${()=>this.generateAudioForLesson()} style="background: var(--primary-color); color: white; border: none; padding: 0.4rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; transition: background 0.2s;">
                    ${t}
                    توليد مقطع صوتي (AI Voice)
                  </button>
                </div>
              </div>
            `}
          </div>

          <!-- خانة الإنجليزي وخانة العربي (The English & Arabic Content Boxes side-by-side) -->
          <div style="flex: 1; min-height: 0; display: flex; flex-direction: column;">
            <lesson-view 
              .lesson=${this.selectedLesson}>
            </lesson-view>
          </div>
        `:u`
          <div class="no-lesson">
            <h2>Welcome to الهدف!</h2>
            <p>Select a lesson from the top to begin, or click 'Add New Lesson' to create your own.</p>
          </div>
        `}
      </div>
    `}renderAddView(){return u`
      <add-lesson-view
        .lesson=${this.lessonToEdit}
        @lesson-saved=${this.handleLessonSaved}
        @lesson-deleted=${this.handleLessonDeleted}
        @cancel-add=${()=>{this.currentView="list",this.lessonToEdit=null}}
      ></add-lesson-view>
    `}render(){let t;return this.currentView==="list"?t=this.renderDashboard():this.currentView==="add"?t=u`
        <div style="display: flex; flex-direction: column; height: 100%; flex: 1;">
          <header style="padding: 1rem 2rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: flex-start; background-color: var(--bg-color); flex-shrink: 0;">
            <button class="back-btn" @click=${()=>{this.currentView="list",this.lessonToEdit=null}}>
              ↩ العودة للدروس
            </button>
            <h2 style="margin: 0 calc(50% - 250px); font-size: 1.3rem; font-weight: 700; color: white;">إضافة أو تعديل درس</h2>
          </header>
          <main class="app-body" style="flex: 1; overflow-y: auto;">
            ${this.renderAddView()}
          </main>
        </div>
      `:t=u`
        <main class="app-body" style="height: 100%; display: flex; flex-direction: column; flex: 1;">
          ${this.renderDetailView()}
        </main>
      `,u`
      <div style="display: flex; flex-direction: row; height: 100vh; width: 100vw; overflow: hidden; position: relative;">
        <div id="scroll-container" style="flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100%; overflow-y: auto;">
          ${t}
        </div>
        
        <!-- Elegant floating assistant activation button when closed -->
        ${this.isChatOpen?"":u`
          <button @click=${()=>this.isChatOpen=!0} style="position: fixed; bottom: 30px; left: 30px; width: 58px; height: 58px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--accent-magenta)); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 22px rgba(217, 70, 239, 0.4); z-index: 90; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);" title="اسأل المساعد الذكي">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          </button>
        `}

        <chat-sidebar .lessons=${this.lessons} .isOpen=${this.isChatOpen} @close-chat=${()=>this.isChatOpen=!1}></chat-sidebar>
        
        <!-- Advanced Settings and API Modal Dialogue -->
        ${this.renderPlatformSettingsModal()}
      </div>
    `}renderPlatformSettingsModal(){return this.isPlatformSettingsOpen?u`
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(5, 7, 11, 0.85); backdrop-filter: blur(12px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;" dir="rtl" @click=${()=>this.isPlatformSettingsOpen=!1}>
        <div style="background: var(--surface-color); border: 1.5px solid rgba(255, 255, 255, 0.1); border-radius: 20px; width: 100%; max-width: 650px; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6); animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; overflow-y: auto; max-height: 90vh;" @click=${t=>t.stopPropagation()}>
          
          <!-- Modal Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem 1rem 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
            <h2 style="margin: 0; font-size: 1.3rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, var(--primary-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; gap: 0.6rem;">
              <span>⚙️ الإعدادات المتقدمة وإدارة البيانات</span>
            </h2>
            <button @click=${()=>this.isPlatformSettingsOpen=!1} style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-color-secondary); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" title="إغلاق">
              ✕
            </button>
          </div>

          <!-- Modal Content -->
          <div style="padding: 0 2rem 2rem 2rem; display: flex; flex-direction: column; gap: 1.5rem; overflow-y: auto;">
            
            <!-- تثبيت مفتاح الـ API -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); padding: 1.25rem; border-radius: 12px;">
              <h3 style="margin: 0; font-size: 1.05rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; flex-wrap: wrap;">
                <span>🔑 مفتاح الـ API الخاص بك (Gemini API)</span>
                ${this.customApiKey?u`
                  <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 3px 8px; border-radius: 6px; font-weight: 500;">نشط ومثبت رائع 🟢</span>
                `:u`
                  <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #3b82f6; padding: 3px 8px; border-radius: 6px; font-weight: 500;">مفتاح الاستضافة الافتراضي 🔵</span>
                `}
              </h3>
              <p style="margin: 0; color: var(--text-color-secondary); font-size: 0.82rem; line-height: 1.5; text-align: right;">قم بوضع مفتاح API لتشغيل التطبيق والذكاء الاصطناعي الصوتي واللغوي من حسابك مباشرة، مما يضمن استمرارية بلا حدود وبأقصى سرعة استجابة دون قيود.</p>
              
              <div style="display: flex; gap: 0.5rem; align-items: center; width: 100%; margin-top: 0.5rem;">
                <input 
                  id="custom-api-key-input"
                  type="password" 
                  placeholder="أدخل مفتاح الـ API الخاص بك هنا" 
                  .value=${this.customApiKey}
                  style="flex: 1; padding: 0.6rem 1rem; border-radius: 8px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; font-size: 0.9rem;"
                />
                <button 
                  @click=${()=>{const t=document.getElementById("custom-api-key-input");this.saveCustomApiKey(t.value||"")}}
                  style="background: var(--primary-color); color: white; border: none; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; white-space: nowrap; font-size: 0.85rem;"
                >
                  حفظ المفتاح
                </button>
                ${this.customApiKey?u`
                  <button 
                    @click=${()=>{this.saveCustomApiKey("");const t=document.getElementById("custom-api-key-input");t&&(t.value="")}}
                    style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.6rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; font-size: 0.85rem;"
                  >
                    إزالة
                  </button>
                `:""}
              </div>
            </div>

            <!-- استيراد وتصدير قاعدة البيانات الصوتية والدروس كاملة -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); padding: 1.25rem; border-radius: 12px;">
              <h3 style="margin: 0; font-size: 1.05rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start;">
                <span>📦 نقل وتصدير الدروس والأصوات (Backup)</span>
              </h3>
              <p style="margin: 0; color: var(--text-color-secondary); font-size: 0.82rem; line-height: 1.5; text-align: right;">لكي لا تبدأ من الصفر عند فتح المنصة على جهاز آخر أو متصفح مختلف! يمكنك تصدير كافة الدروس والملفات الصوتية كملف حزمة مجمعة، ثم استيرادها مجدداً بلمسة واحدة للاستمرار فوراً.</p>
              
              <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-top: 0.5rem;">
                <!-- زر تصدير -->
                <button 
                  @click=${()=>this.exportBackup()} 
                  style="background: linear-gradient(135deg, var(--primary-color), var(--accent-magenta)); color: white; border: none; padding: 0.65rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: transform 0.2s; font-size: 0.82rem;"
                >
                  📥 تصدير حزمة الدروس والأصوات
                </button>

                <!-- زر استيراد -->
                <input 
                  id="modal-import-backup-file-input"
                  type="file" 
                  accept=".json"
                  @change=${t=>this.importBackup(t)}
                  style="display: none;"
                />
                <button 
                  @click=${()=>{var t;return(t=document.getElementById("modal-import-backup-file-input"))==null?void 0:t.click()}} 
                  style="background: rgba(168, 85, 247, 0.1); border: 1.5px dashed rgba(168, 85, 247, 0.4); color: #c084fc; padding: 0.6rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: background 0.2s; font-size: 0.82rem;"
                >
                  📤 استيراد الحزمة واستعادتها
                </button>
              </div>

              <!-- Real-time dynamic on-screen status updates -->
              ${this.backupStatus?u`
                <div style="margin-top: 0.75rem; padding: 0.85rem; border-radius: 8px; background-color: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.82rem; color: #ffffff; line-height: 1.5; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                  <span style="text-align: right;">${this.backupStatus}</span>
                  <button 
                    @click=${()=>this.backupStatus=""} 
                    style="background: transparent; border: none; color: var(--text-color-secondary, #94a3b8); font-weight: bold; cursor: pointer; font-size: 0.75rem; padding: 0 4px;"
                  >
                    ✕
                  </button>
                </div>
              `:""}
            </div>

          </div>

          <!-- Modal Footer -->
          <div style="display: flex; justify-content: flex-end; padding: 1.25rem 2rem; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.15); border-radius: 0 0 20px 20px;">
            <button @click=${()=>this.isPlatformSettingsOpen=!1} style="background: var(--primary-color); color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; font-size: 0.9rem;">
              تمام، إغلاق الإعدادات
            </button>
          </div>

        </div>
      </div>
    `:""}createRenderRoot(){return this}};b([m()],w.prototype,"lessons",2);b([m()],w.prototype,"selectedLesson",2);b([m()],w.prototype,"currentView",2);b([m()],w.prototype,"lessonToEdit",2);b([m()],w.prototype,"audioSrc",2);b([m()],w.prototype,"isPlaying",2);b([m()],w.prototype,"currentTime",2);b([m()],w.prototype,"duration",2);b([m()],w.prototype,"playbackRate",2);b([m()],w.prototype,"seekStep",2);b([m()],w.prototype,"isSettingsOpen",2);b([m()],w.prototype,"isLoadingAudio",2);b([m()],w.prototype,"generatingLessons",2);b([m()],w.prototype,"readyReferenceAudios",2);b([m()],w.prototype,"isChatOpen",2);b([m()],w.prototype,"customApiKey",2);b([m()],w.prototype,"isPlatformSettingsOpen",2);b([m()],w.prototype,"backupStatus",2);b([B("#audio-player")],w.prototype,"audioPlayer",2);b([B("#scroll-container")],w.prototype,"scrollContainer",2);b([B(".settings-container")],w.prototype,"settingsContainer",2);w=b([ae("english-learning-app")],w);/**
 * @fileoverview English Learning App main entry point.
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */function Nt(){const t=document.createElement("english-learning-app");document.body.appendChild(t),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{console.log("ServiceWorker registered successfully with scope: ",e.scope)}).catch(e=>{console.error("ServiceWorker registration failed: ",e)})}),"caches"in window&&caches.keys().then(e=>{for(const s of e)caches.delete(s)})}Nt();
