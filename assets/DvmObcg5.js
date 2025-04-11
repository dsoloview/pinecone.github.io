import{e as j,u as $,g as b,c as v,a,h as F,t as o,f as n,o as r,r as h,i as C,n as k,j as y,k as x,l as z,_ as N,b as s,w as g,F as B,d as P}from"./BBSh-atO.js";import{_ as S}from"./fCZ4BFQD.js";const V={class:"flex flex-col justify-between h-full"},R={class:"flex flex-col gap-5"},U={class:"font-bold"},q={key:0,class:"italic"},T=j({__name:"FlipCardContent",props:{translationName:{}},setup(i){const l=i,{t:m,te:d}=$(),f=b(()=>d(`cards.${l.translationName}.quote`));return(p,u)=>(r(),v("div",V,[a("div",R,[a("span",U,o(n(m)(`cards.${p.translationName}.name`)),1),a("span",null,o(n(m)(`cards.${p.translationName}.text`)),1)]),n(f)?(r(),v("span",q,o(n(m)(`cards.${p.translationName}.quote`)),1)):F("",!0)]))}}),E=["src"],L={class:"relative z-10 p-4 w-full h-full"},W={key:0,class:"absolute w-full h-full backface-hidden rotate-y-180 bg-black text-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center"},D=["src"],H=j({__name:"FlipCard",props:{backTranslationName:{},frontTranslationName:{},canFlip:{type:Boolean,default:!0},frontImage:{},backImage:{}},setup(i){const l=z(),m=b(()=>{var e;return(e=i.frontImage)!=null&&e.startsWith("http")?i.frontImage:l.app.baseURL+i.frontImage.replace(/^\/+/,"")}),d=b(()=>{var e,_;return(e=i.backImage)!=null&&e.startsWith("http")?i.backImage:l.app.baseURL+((_=i.backImage)==null?void 0:_.replace(/^\/+/,""))}),f=h(!1);function p(){i.canFlip&&(f.value=!f.value)}const u=h(!1),c=h(null);function I(){c.value=window.setTimeout(()=>{u.value=!0},200)}function w(){c.value!==null&&(clearTimeout(c.value),c.value=null),u.value=!1}return C(()=>{c.value!==null&&(clearTimeout(c.value),c.value=null)}),(e,_)=>(r(),v("div",{class:k(["group w-64 h-[450px] perspective text-sm",{"cursor-pointer":e.canFlip,"cursor-default":!e.canFlip}]),onClick:p,onPointerdown:I,onPointerup:w,onPointercancel:w},[a("div",{class:k(["relative w-full h-full transform-style preserve-3d",{"rotate-y-180 transition-transform duration-500":n(f)&&e.canFlip,"transition-transform duration-500":e.canFlip,"no-animation":!e.canFlip}])},[a("div",{class:k(["card-front absolute w-full h-full backface-hidden rounded-xl shadow-lg overflow-hidden",{"hover-effect":e.canFlip}])},[a("img",{src:n(m),alt:"Front",class:"object-cover w-full h-full absolute z-0"},null,8,E),a("div",L,[e.frontTranslationName?(r(),y(T,{key:0,"translation-name":e.frontTranslationName},null,8,["translation-name"])):x(e.$slots,"frontText",{key:1},void 0,!0)])],2),e.canFlip?(r(),v("div",W,[a("img",{src:n(d),alt:"Back",class:"object-cover w-full h-full absolute z-0 opacity-40"},null,8,D),a("div",{class:k(["backText relative z-10 p-4 w-full h-full",{"opacity-0":n(u),"opacity-100":!n(u)}])},[e.backTranslationName?(r(),y(T,{key:0,"translation-name":e.backTranslationName},null,8,["translation-name"])):x(e.$slots,"backText",{key:1},void 0,!0)],2)])):F("",!0)],2)],34))}}),t=N(H,[["__scopeId","data-v-4148b2cb"]]),Q={class:"my-30"},A={class:"cards"},G={class:"flex h-full w-full justify-end flex-col"},J={class:"font-bold"},K={class:"flex h-full w-full justify-end flex-col"},M={class:"font-bold"},O={class:"flex h-full w-full justify-end flex-col"},X={class:"font-bold"},Y={class:"flex h-full w-full justify-end flex-col"},Z={class:"font-bold"},aa=j({__name:"index",setup(i){const{t:l}=$();return(m,d)=>(r(),v(B,null,[a("div",Q,[s(S,{tag:"h1"},{default:g(()=>[P(o(n(l)("pages.team-cast.title")),1)]),_:1})]),a("div",A,[s(t,{"back-translation-name":"andrea","front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"}),s(t,{"back-translation-name":"nevena_matic","front-image":"/images/cards/lu.jpg","back-image":"/images/people/nevena_matic.jpg"}),s(t,{"back-translation-name":"kristina","front-image":"/images/cards/herodias.jpg","back-image":"/images/people/kristina.jpg"}),s(t,{"back-translation-name":"vedran","front-image":"/images/cards/antipa.jpg","back-image":"/images/people/vedran.jpg"}),s(t,{"back-translation-name":"maksim","front-image":"/images/cards/makareus.jpg","back-image":"/images/people/maksim.jpg"}),s(t,{"back-translation-name":"aleksandar_kecman","front-image":"/images/cards/wilhelm.jpg","back-image":"/images/people/aleksandar_kecman.jpg"}),s(t,{"back-translation-name":"milica_majkic","front-image":"/images/cards/electra.jpg","back-image":"/images/people/milica_majkic.jpg"}),s(t,{"back-translation-name":"yulia_graut","front-image":"/images/cards/electra.jpg","back-image":"/images/people/yulia_graut.jpg"}),s(t,{"back-translation-name":"nevena_dokovic","front-image":"/images/cards/canaca.jpg","back-image":"/images/people/nevena_dokovic.jpg"}),s(t,{"back-translation-name":"uros_petronijevic","front-image":"/images/cards/laius.jpg","back-image":"/images/people/uros_petronijevic.jpg"}),s(t,{"back-translation-name":"nikola_pavlovic","front-image":"/images/cards/justice.jpg","back-image":"/images/people/nikola_pavlovic.jpg"}),s(t,{"can-flip":!1,"front-image":"/images/people/jovana.jpg"},{frontText:g(()=>[a("div",G,[a("span",J,o(n(l)("cards.jovana_radovanovic.name")),1),a("span",null,o(n(l)("cards.jovana_radovanovic.role")),1)])]),_:1}),s(t,{"can-flip":!1,"front-image":"/images/people/stefan.jpg"},{frontText:g(()=>[a("div",K,[a("span",M,o(n(l)("cards.stefan_zekic.name")),1),a("span",null,o(n(l)("cards.stefan_zekic.role")),1)])]),_:1}),s(t,{"can-flip":!1,"front-image":"/images/people/julija.jpg"},{frontText:g(()=>[a("div",O,[a("span",X,o(n(l)("cards.julija_mihejeva.name")),1),a("span",null,o(n(l)("cards.julija_mihejeva.role")),1)])]),_:1}),s(t,{"can-flip":!1,"front-image":"/images/people/sofija.jpg"},{frontText:g(()=>[a("div",Y,[a("span",Z,o(n(l)("cards.sofija_sibinovic.name")),1),a("span",null,o(n(l)("cards.sofija_sibinovic.role")),1)])]),_:1}),d[0]||(d[0]=a("div",null,null,-1))])],64))}}),sa=N(aa,[["__scopeId","data-v-a4ee7256"]]);export{sa as default};
