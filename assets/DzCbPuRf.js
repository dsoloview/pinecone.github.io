import{g as p,r as c,c as g,n as t,a,j as f,k as b,o as u,_ as m,b as l,w as s,d as n}from"./BaqVzuAG.js";const j=["src"],v={class:"relative z-10 p-4 w-full h-full"},k={class:"absolute w-full h-full backface-hidden rotate-y-180 bg-black text-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center"},x=["src"],w={class:"relative z-10 p-4 w-full h-full"},T=p({__name:"FlipCard",props:{canFlip:{type:Boolean,default:!0},frontImage:{},backImage:{}},setup(d){const r=c(!1);function e(){d.canFlip&&(r.value=!r.value)}return(i,y)=>(u(),g("div",{class:t(["group w-64 h-[450px] perspective",{"cursor-pointer":i.canFlip,"cursor-default":!i.canFlip}]),onClick:e},[a("div",{class:t(["relative w-full h-full transform-style preserve-3d",{"rotate-y-180 transition-transform duration-500":b(r)&&i.canFlip,"transition-transform duration-500":i.canFlip,"no-animation":!i.canFlip}])},[a("div",{class:t(["card-front absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden",{"hover-effect":i.canFlip}])},[a("img",{src:i.frontImage,alt:"Front",class:"object-cover w-full h-full absolute z-0"},null,8,j),a("div",v,[f(i.$slots,"frontText",{},void 0,!0)])],2),a("div",k,[a("img",{src:i.backImage,alt:"Back",class:"object-cover w-full h-full absolute z-0 opacity-40"},null,8,x),a("div",w,[f(i.$slots,"backText",{},void 0,!0)])])],2)],2))}}),o=m(T,[["__scopeId","data-v-de7a3927"]]),h={class:"cards"},F=p({__name:"index",setup(d){return(r,e)=>(u(),g("div",h,[l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[0]||(e[0]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[1]||(e[1]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[2]||(e[2]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[3]||(e[3]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[4]||(e[4]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[5]||(e[5]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[6]||(e[6]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[7]||(e[7]=[n(" Andrea ")])),_:1}),l(o,{"front-image":"/images/cards/herodias.jpg","back-image":"/images/people/andrea.jpg"},{backText:s(()=>e[8]||(e[8]=[n(" Andrea ")])),_:1}),l(o,{"can-flip":!1,"front-image":"/images/people/jovana.jpg"},{frontText:s(()=>e[9]||(e[9]=[a("div",{class:"flex h-full w-full justify-end flex-col"},[a("span",{class:"font-bold"},"Jovana Radovanović"),a("span",null,"Project creator/ Producer")],-1)])),_:1}),l(o,{"can-flip":!1,"front-image":"/images/people/stefan.jpg"},{frontText:s(()=>e[10]||(e[10]=[a("div",{class:"flex h-full w-full justify-end flex-col"},[a("span",{class:"font-bold"},"Stefan Zekić"),a("span",null,"Music Director")],-1)])),_:1}),l(o,{"can-flip":!1,"front-image":"/images/people/julija.jpg"},{frontText:s(()=>e[11]||(e[11]=[a("div",{class:"flex h-full w-full justify-end flex-col"},[a("span",{class:"font-bold"},"Julija Mihejeva"),a("span",null,"Visual identity/costume")],-1)])),_:1}),l(o,{"can-flip":!1,"front-image":"/images/people/sofija.jpg"},{frontText:s(()=>e[12]||(e[12]=[a("div",{class:"flex h-full w-full justify-end flex-col"},[a("span",{class:"font-bold"},"Sofija Sibinović"),a("span",null,"Harp")],-1)])),_:1}),e[13]||(e[13]=a("div",null,null,-1))]))}}),_=m(F,[["__scopeId","data-v-95a9d689"]]);export{_ as default};
