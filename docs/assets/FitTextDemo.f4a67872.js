var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,c=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a;import{s as i,u as o,C as s,a as m,_ as p,b as u,n as g,g as h,m as d,R as f,c as b}from"./vendor.745ff060.js";import{u as E,w as y,F as v}from"./fonts.8c7bc187.js";const w="calc(50% - 14px / 2)",x=i({height:"calc(100% - 2 * 12px - 2 * 8px)",border:"12px solid magenta",margin:"8px"}),O=i({height:"14px",background:"magenta"}),j=i({fontFamily:"Inter Medium"}),P=i({background:"cyan"}),N=i({background:"black",color:"yellow"}),S=({contentRect:{width:e,height:t}})=>u({width:e,height:t}),I=()=>{const[e,{height:t}]=p.pipe((()=>{const[e,t]=o(g),r=s.exports.useRef(null);return m(r,p.flow(S,t)),[r,e]})(),p.pipe({width:0,height:0},p.constant,h,d)),{capHeight:r,unitsPerEm:a}=E().get("Inter Medium");return{ref:e,fontSize:t/(r/a)+"px",lineHeight:t+"px"}},[k,F]=["FONT","SIZE"],H=()=>f.createElement("div",{className:O}),z=()=>{const{ref:e,fontSize:i,lineHeight:o}=I(),s=({children:e})=>f.createElement("div",{className:j,style:{fontSize:i,lineHeight:o}},e);return f.createElement(f.Fragment,null,f.createElement("div",{className:x},f.createElement("div",(m=((e,t)=>{for(var r in t||(t={}))n.call(t,r)&&c(e,r,t[r]);if(a)for(var r of a(t))l.call(t,r)&&c(e,r,t[r]);return e})({className:P},{ref:e}),t(m,r({style:{height:w}}))),f.createElement(s,null,k)),f.createElement(H,null),f.createElement("div",{className:N,style:{height:w}},f.createElement(s,null,F))));var m};y((e=>{b.render(f.createElement(s.exports.StrictMode,null,f.createElement(v.Provider,{value:e},f.createElement(z,null))),document.getElementById("root"))}));