import{p as P,q as O,s as $,v as x,x as U,y as F,z as W,A as E,i as k,g as v,e as B,B as H,r as I,C as T,c as G,h as J,o as C,D as A,f as S,E as V,j as X,k as Q,G as Y}from"./C8yN0gd5.js";async function Z(e,t){return await K(t).catch(r=>(console.error("Failed to get image meta for "+t,r+""),{width:0,height:0,ratio:0}))}async function K(e){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((t,i)=>{const r=new Image;r.onload=()=>{const s={width:r.width,height:r.height,ratio:r.width/r.height};t(s)},r.onerror=s=>i(s),r.src=e})}function j(e){return t=>t?e[t]||t:e.missingValue}function ee({formatter:e,keyMap:t,joinWith:i="/",valueMap:r}={}){e||(e=(n,o)=>`${n}=${o}`),t&&typeof t!="function"&&(t=j(t));const s=r||{};return Object.keys(s).forEach(n=>{typeof s[n]!="function"&&(s[n]=j(s[n]))}),(n={})=>Object.entries(n).filter(([c,d])=>typeof d<"u").map(([c,d])=>{const l=s[c];return typeof l=="function"&&(d=l(n[c])),c=typeof t=="function"?t(c):c,e(c,d)}).join(i)}function y(e=""){if(typeof e=="number")return e;if(typeof e=="string"&&e.replace("px","").match(/^\d+$/g))return Number.parseInt(e,10)}function te(e=""){if(e===void 0||!e.length)return[];const t=new Set;for(const i of e.split(" ")){const r=Number.parseInt(i.replace("x",""));r&&t.add(r)}return Array.from(t)}function re(e){if(e.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function ie(e){const t={};if(typeof e=="string")for(const i of e.split(/[\s,]+/).filter(r=>r)){const r=i.split(":");r.length!==2?t["1px"]=r[0].trim():t[r[0].trim()]=r[1].trim()}else Object.assign(t,e);return t}function se(e){const t={options:e},i=(s,n={})=>D(t,s,n),r=(s,n={},o={})=>i(s,{...o,modifiers:P(n,o.modifiers||{})}).url;for(const s in e.presets)r[s]=(n,o,c)=>r(n,o,{...e.presets[s],...c});return r.options=e,r.getImage=i,r.getMeta=(s,n)=>ne(t,s,n),r.getSizes=(s,n)=>ce(t,s,n),t.$img=r,r}async function ne(e,t,i){const r=D(e,t,{...i});return typeof r.getMeta=="function"?await r.getMeta():await Z(e,r.url)}function D(e,t,i){var l,u;if(t&&typeof t!="string")throw new TypeError(`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`);if(!t||t.startsWith("data:"))return{url:t};const{provider:r,defaults:s}=oe(e,i.provider||e.options.provider),n=ae(e,i.preset);if(t=$(t)?t:O(t),!r.supportsAlias){for(const h in e.options.alias)if(t.startsWith(h)){const m=e.options.alias[h];m&&(t=x(m,t.slice(h.length)))}}if(r.validateDomains&&$(t)){const h=U(t).host;if(!e.options.domains.find(m=>m===h))return{url:t}}const o=P(i,n,s);o.modifiers={...o.modifiers};const c=o.modifiers.format;(l=o.modifiers)!=null&&l.width&&(o.modifiers.width=y(o.modifiers.width)),(u=o.modifiers)!=null&&u.height&&(o.modifiers.height=y(o.modifiers.height));const d=r.getImage(t,o,e);return d.format=d.format||c||"",d}function oe(e,t){const i=e.options.providers[t];if(!i)throw new Error("Unknown provider: "+t);return i}function ae(e,t){if(!t)return{};if(!e.options.presets[t])throw new Error("Unknown preset: "+t);return e.options.presets[t]}function ce(e,t,i){var _,z,q,a,f;const r=y((_=i.modifiers)==null?void 0:_.width),s=y((z=i.modifiers)==null?void 0:z.height),n=ie(i.sizes),o=(q=i.densities)!=null&&q.trim()?te(i.densities.trim()):e.options.densities;re(o);const c=r&&s?s/r:0,d=[],l=[];if(Object.keys(n).length>=1){for(const g in n){const p=M(g,String(n[g]),s,c,e);if(p!==void 0){d.push({size:p.size,screenMaxWidth:p.screenMaxWidth,media:`(max-width: ${p.screenMaxWidth}px)`});for(const w of o)l.push({width:p._cWidth*w,src:N(e,t,i,p,w)})}}de(d)}else for(const g of o){const p=Object.keys(n)[0];let w=p?M(p,String(n[p]),s,c,e):void 0;w===void 0&&(w={size:"",screenMaxWidth:0,_cWidth:(a=i.modifiers)==null?void 0:a.width,_cHeight:(f=i.modifiers)==null?void 0:f.height}),l.push({width:g,src:N(e,t,i,w,g)})}le(l);const u=l[l.length-1],h=d.length?d.map(g=>`${g.media?g.media+" ":""}${g.size}`).join(", "):void 0,m=h?"w":"x",b=l.map(g=>`${g.src} ${g.width}${m}`).join(", ");return{sizes:h,srcset:b,src:u==null?void 0:u.src}}function M(e,t,i,r,s){const n=s.options.screens&&s.options.screens[e]||Number.parseInt(e),o=t.endsWith("vw");if(!o&&/^\d+$/.test(t)&&(t=t+"px"),!o&&!t.endsWith("px"))return;let c=Number.parseInt(t);if(!n||!c)return;o&&(c=Math.round(c/100*n));const d=r?Math.round(c*r):i;return{size:t,screenMaxWidth:n,_cWidth:c,_cHeight:d}}function N(e,t,i,r,s){return e.$img(t,{...i.modifiers,width:r._cWidth?r._cWidth*s:void 0,height:r._cHeight?r._cHeight*s:void 0},i)}function de(e){var i;e.sort((r,s)=>r.screenMaxWidth-s.screenMaxWidth);let t=null;for(let r=e.length-1;r>=0;r--){const s=e[r];s.media===t&&e.splice(r,1),t=s.media}for(let r=0;r<e.length;r++)e[r].media=((i=e[r+1])==null?void 0:i.media)||""}function le(e){e.sort((i,r)=>i.width-r.width);let t=null;for(let i=e.length-1;i>=0;i--){const r=e[i];r.width===t&&e.splice(i,1),t=r.width}}const ue=ee({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(e,t)=>W(e)+"_"+W(t)}),fe=(e,{modifiers:t={},baseURL:i}={},r)=>{t.width&&t.height&&(t.resize=`${t.width}x${t.height}`,delete t.width,delete t.height);const s=ue(t)||"_";return i||(i=x(r.options.nuxt.baseURL,"/_ipx")),{url:x(i,s,F(e))}},ge=!0,he=!0,me=Object.freeze(Object.defineProperty({__proto__:null,getImage:fe,supportsAlias:he,validateDomains:ge},Symbol.toStringTag,{value:"Module"})),L={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:[],alias:{},densities:[1,2],format:["webp"]};L.providers={ipxStatic:{provider:me,defaults:{}}};const R=()=>{const e=k(),t=E();return t.$img||t._img||(t._img=se({...L,nuxt:{baseURL:e.app.baseURL},runtimeConfig:e}))};function pe(e){var t;(t=performance==null?void 0:performance.mark)==null||t.call(performance,"mark_feature_usage",{detail:{feature:e}})}const ye={src:{type:String,required:!1},format:{type:String,required:!1},quality:{type:[Number,String],required:!1},background:{type:String,required:!1},fit:{type:String,required:!1},modifiers:{type:Object,required:!1},preset:{type:String,required:!1},provider:{type:String,required:!1},sizes:{type:[Object,String],required:!1},densities:{type:String,required:!1},preload:{type:[Boolean,Object],required:!1},width:{type:[String,Number],required:!1},height:{type:[String,Number],required:!1},alt:{type:String,required:!1},referrerpolicy:{type:String,required:!1},usemap:{type:String,required:!1},longdesc:{type:String,required:!1},ismap:{type:Boolean,required:!1},loading:{type:String,required:!1,validator:e=>["lazy","eager"].includes(e)},crossorigin:{type:[Boolean,String],required:!1,validator:e=>["anonymous","use-credentials","",!0,!1].includes(e)},decoding:{type:String,required:!1,validator:e=>["async","auto","sync"].includes(e)},nonce:{type:[String],required:!1}},ve=e=>{const t=v(()=>({provider:e.provider,preset:e.preset})),i=v(()=>({width:y(e.width),height:y(e.height),alt:e.alt,referrerpolicy:e.referrerpolicy,usemap:e.usemap,longdesc:e.longdesc,ismap:e.ismap,crossorigin:e.crossorigin===!0?"anonymous":e.crossorigin||void 0,loading:e.loading,decoding:e.decoding,nonce:e.nonce})),r=R(),s=v(()=>({...e.modifiers,width:y(e.width),height:y(e.height),format:e.format,quality:e.quality||r.options.quality,background:e.background,fit:e.fit}));return{options:t,attrs:i,modifiers:s}},we={...ye,placeholder:{type:[Boolean,String,Number,Array],required:!1},placeholderClass:{type:String,required:!1},custom:{type:Boolean,required:!1}},Se=["src"],be=B({__name:"NuxtImg",props:we,emits:["load","error"],setup(e,{emit:t}){const i=e,r=H(),s=t,n=!1,o=R(),c=ve(i),d=I(!1),l=I(),u=v(()=>o.getSizes(i.src,{...c.options.value,sizes:i.sizes,densities:i.densities,modifiers:{...c.modifiers.value,width:y(i.width),height:y(i.height)}})),h=v(()=>{const a={...c.attrs.value,"data-nuxt-img":""};return(!i.placeholder||d.value)&&(a.sizes=u.value.sizes,a.srcset=u.value.srcset),a}),m=v(()=>{let a=i.placeholder;if(a===""&&(a=!0),!a||d.value)return!1;if(typeof a=="string")return a;const f=Array.isArray(a)?a:typeof a=="number"?[a,a]:[10,10];return o(i.src,{...c.modifiers.value,width:f[0],height:f[1],quality:f[2]||50,blur:f[3]||3},c.options.value)}),b=v(()=>i.sizes?u.value.src:o(i.src,c.modifiers.value,c.options.value)),_=v(()=>m.value?m.value:b.value),q=E().isHydrating;return T(()=>{if(m.value||i.custom){const a=new Image;b.value&&(a.src=b.value),i.sizes&&(a.sizes=u.value.sizes||"",a.srcset=u.value.srcset),a.onload=f=>{d.value=!0,s("load",f)},a.onerror=f=>{s("error",f)},pe("nuxt-image");return}l.value&&(l.value.complete&&q&&(l.value.getAttribute("data-error")?s("error",new Event("error")):s("load",new Event("load"))),l.value.onload=a=>{s("load",a)},l.value.onerror=a=>{s("error",a)})}),(a,f)=>a.custom?J(a.$slots,"default",V(A({key:1},{...S(n)?{onerror:"this.setAttribute('data-error', 1)"}:{},imgAttrs:{...h.value,...S(r)},isLoaded:d.value,src:_.value}))):(C(),G("img",A({key:0,ref_key:"imgEl",ref:l,class:m.value&&!d.value?a.placeholderClass:void 0},{...S(n)?{onerror:"this.setAttribute('data-error', 1)"}:{},...h.value,...S(r)},{src:_.value}),null,16,Se))}}),qe=B({__name:"ProseImg",props:{src:{type:String,default:""},alt:{type:String,default:""},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0}},setup(e){const t=e,i=v(()=>{var r;if((r=t.src)!=null&&r.startsWith("/")&&!t.src.startsWith("//")){const s=O(Y(k().app.baseURL));if(s!=="/"&&!t.src.startsWith(s))return x(s,t.src)}return t.src});return(r,s)=>(C(),X(Q(S(be)),{src:S(i),alt:t.alt,width:t.width,height:t.height},null,8,["src","alt","width","height"]))}});export{qe as default};
