var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,n=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o;import{w as l,b as a}from"./useFontMetrics.7b691c56.js";import{c as i,R as c,C as m}from"./vendor.745ff060.js";import{F as s}from"./FontProvider.1b21712b.js";function f(){const{width:e}=a({fontFamily:"Roboto",fontSize:16,text:"Hello World"});return c.createElement("div",null,"Hello World 16px width: ",e.toFixed(1),"px")}l((e=>{i.render(c.createElement(m.exports.StrictMode,null,c.createElement(s,((e,l)=>{for(var a in l||(l={}))r.call(l,a)&&n(e,a,l[a]);if(t)for(var a of t(l))o.call(l,a)&&n(e,a,l[a]);return e})({},{fontManager:e}),c.createElement(f,null))),document.getElementById("root"))}));