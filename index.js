import{I as q,v as L,a as w}from"./assets/vendor-BNDYmZVu.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector("[data-days]"),e=document.querySelector("[data-hours]"),n=document.querySelector("[data-minutes]"),i=document.querySelector("[data-seconds]"),t=new Date("2025-03-01T00:00:00").getTime();function r(){const h=setInterval(()=>{const y=Date.now(),a=t-y;if(a<=0){clearInterval(h),l(0,0,0,0);return}const f=1e3,E=f*60,p=E*60,v=p*24,I=Math.floor(a/v),x=Math.floor(a%v/p),M=Math.floor(a%v%p/E),O=Math.floor(a%v%p%E/f);l(I,x,M,O)},1e3)}function l(h,y,a,f){s.textContent=String(h).padStart(2,"0"),e.textContent=String(y).padStart(2,"0"),n.textContent=String(a).padStart(2,"0"),i.textContent=String(f).padStart(2,"0")}r()});const o=document.querySelector("form"),g="feedback-form-state",D=localStorage.getItem(g),c=JSON.parse(D)??{},S=o.elements.username,m=o.elements.email,d=o.elements.phone,b=o.elements.userPrivacy;S.value=c.name??"";m.value=c.email??"";d.value=c.phone??"";o.addEventListener("input",P);function P(s){c.name=o.elements.username.value.trim(),c.email=o.elements.email.value.trim(),c.phone=o.elements.phone.value.trim(),localStorage.setItem(g,JSON.stringify(c))}o.addEventListener("submit",K);function u(s,e){const n=s.nextElementSibling;n.textContent=e,n.classList.add("show")}function C(){o.querySelectorAll(".form-input").forEach(e=>{e.nextElementSibling.classList.remove("show")})}const N=document.querySelector('input[name="phone"]'),T=new q("+380 (99) 999 99 99");T.mask(N);async function K(s){s.preventDefault(),C();let e=!0;if(S.value.trim()||(u(S,"Це поле є обов'язковим"),e=!1),m.value.trim()?L.isEmail(m.value)||(u(m,"Невірний формат email"),e=!1):(u(m,"Це поле є обов'язковим"),e=!1),d.value.trim()?L.matches(d.value,/^\+380 \(\d{2}\) \d{3} \d{2} \d{2}$/)||(u(d,"Невірний формат телефону"),e=!1):(u(d,"Це поле є обов'язковим"),e=!1),b.checked||(u(b,"Потрібно погодитись з політикою конфіденційності"),e=!1),e){const n={name:S.value.trim(),email:m.value.trim(),phone:d.value.trim()};try{const i=await w.post("https://example.com/register",n);localStorage.removeItem(g),o.reset(),alert("Дані форми успішно надіслані")}catch{alert("Сталася помилка при відправленні даних форми"),localStorage.removeItem(g),o.reset()}}}
//# sourceMappingURL=index.js.map
