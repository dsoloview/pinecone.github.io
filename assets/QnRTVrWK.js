import{e as c,U as i,j as n,V as f,W as d,X as m,Y as x}from"./DP_IVT6I.js";import{d as L}from"./Bu9_nwIX.js";const a=L({...x,componentName:"NuxtLinkLocale"}),k=c({name:"NuxtLinkLocale",props:{...a.props,locale:{type:String,default:void 0,required:!1}},setup(t,{slots:o}){const l=i(),r=n(()=>{const e=t.to??t.href;return e!=null?l(e,t.locale):e}),u=n(()=>{if(t.external||t.target&&t.target!=="_self")return!0;const e=t.to??t.href;return d(e)?!1:e===""||e==null||m(e,{acceptRelative:!0})}),s=()=>{const e={...t};return u.value||(e.to=r.value),delete e.href,delete e.locale,e};return()=>f(a,s(),o.default)}});export{k as _};
