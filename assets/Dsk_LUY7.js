import{_ as b}from"./DntKXPyi.js";import{F as y}from"./CGbN90_g.js";import{e as v,c as r,o as c,a as o,t as d,b as u,_ as x,i as C,q as N,j as I,n as $,r as j,u as k,w as h,F as w,y as T,f as l,d as S}from"./CsJnznEW.js";import{H as F}from"./CNGKrrT2.js";import"./CkQp258n.js";const P={class:"cocktailsSlide grid md:grid-flow-col md:auto-cols-auto justify-center items-center gap-8 text-white"},B={class:"flex flex-col gap-6 md:gap-10 self-center justify-self-center order-2 md:order-1"},E={class:"text-2xl md:text-5xl cocktailsSlide__title uppercase"},O={class:"cocktailsSlide__text max-w-[600px] text-lg"},V={class:"self-center justify-self-center order-1 md:order-2"},q=v({__name:"CocktailsSlide",props:{title:{},text:{},image:{}},setup(i){return(s,t)=>(c(),r("div",P,[o("div",B,[o("div",E,d(s.title),1),o("div",O,d(s.text),1)]),o("div",V,[u(y,{class:"h-[300px] md:h-[450px]","front-image":s.image,"can-flip":!1},null,8,["front-image"])])]))}}),H=x(q,[["__scopeId","data-v-b841e3f5"]]);function R(i,s){const t=C(()=>{var e;return((e=i==null?void 0:i.value)==null?void 0:e.swiper)??null}),_=(...e)=>{t.value&&(e.length===0?t.value.slideNext():t.value.slideNext(...e))},a=(...e)=>{t.value&&t.value.slideTo(...e)},f=(...e)=>{t.value&&(e.length===0?t.value.slideReset():t.value.slideReset(...e))},g=(...e)=>{t.value&&(e.length===0?t.value.slidePrev():t.value.slidePrev(...e))},n=()=>{var p;!(((p=i.value)==null?void 0:p.nodeName)==="SWIPER-CONTAINER")&&t.value!==null&&console.warn('"useSwiper()" requires a ref and is tied to the %c`<swiper-container ref="swiperContainerRef"></swiper-container>` element.',"font-weight: bold;")},m=()=>{i.value};return N(t,()=>n()),I(()=>$(()=>m())),{instance:t,next:_,prev:g,to:a,reset:f}}const z={class:"flex flex-col gap-10 text-white"},A={class:"flex justify-center items-center gap-3"},D=v({__name:"CocktailsSlider",setup(i){const s=j(null),t=R(s),{tm:_,rt:a,t:f}=k();return(g,n)=>{const m=b;return c(),r("div",z,[u(m,null,{default:h(()=>[o("swiper-container",{ref_key:"containerRef",ref:s,autoplay:{delay:5e3,disableOnInteraction:!0},loop:""},[(c(!0),r(w,null,T(l(_)("sliders.cocktails"),(e,p)=>(c(),r("swiper-slide",{key:p},[u(H,{title:l(a)(e.title),text:l(a)(e.text),image:l(a)(e.image)},null,8,["title","text","image"])]))),128))],512)]),_:1}),o("div",A,[o("button",{class:"cocktailsSlider__button",onClick:n[0]||(n[0]=e=>l(t).prev())},d(l(f)("buttons.prev")),1),n[2]||(n[2]=S(" / ")),o("button",{class:"cocktailsSlider__button",onClick:n[1]||(n[1]=e=>l(t).next())},d(l(f)("buttons.next")),1)])])}}}),K=x(D,[["__scopeId","data-v-2bfdef8a"]]),L="pages.pinecone-bar.subPages.cocktails",M=v({__name:"cocktails",setup(i){const{t:s}=k();return(t,_)=>(c(),r(w,null,[u(F,{tag:"h1"},{default:h(()=>[S(d(l(s)(`${L}.title`)),1)]),_:1}),u(K)],64))}}),X=x(M,[["__scopeId","data-v-f622befe"]]);export{X as default};
