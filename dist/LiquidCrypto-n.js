!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){const n=r(1);e.exports={LiquidCrypto:e=>{const t={keypair:e||(()=>{const e=n.createECDH("prime256v1");return e.generateKeys(),e})()};return{publicKey:t.keypair.getPublicKey(),deriveKey:e=>null!==t.keypair?t.keypair.computeSecret(e):"ERROR: keys not yet generated",encrypt:(e,t)=>{const r=n.randomBytes(72).toString("base64").slice(0,12),o=n.createCipheriv("aes-256-gcm",t,r);return`${r.toString("hex")}${o.update(e).toString("hex")}${o.final().toString("hex")}`},decrypt:(e,t)=>{const r=e.slice(0,12),o=e.slice(12);return n.createDecipheriv("aes-256-gcm",t,r).update(o,"hex","utf8")}}}}},function(e,t){e.exports=require("crypto")}]));