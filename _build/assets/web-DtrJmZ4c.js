const c={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return we(this.context.count)},getNextContextId(){return we(this.context.count++)}};function we(e){const t=String(e),n=t.length-1;return c.context.id+(n?String.fromCharCode(96+n):"")+t}function v(e){c.context=e}function Fe(){return{...c.context,id:c.getNextContextId(),count:0}}const De=(e,t)=>e===t,Z=Symbol("solid-proxy"),Te=typeof Proxy=="function",Ue=Symbol("solid-track"),ee={equals:De};let Y=null,ke=ve;const I=1,G=2,$e={owned:null,cleanups:null,context:null,owner:null},le={};var g=null;let u=null,qe=null,w=null,O=null,A=null,se=0;function X(e,t){const n=w,s=g,i=e.length===0,r=t===void 0?s:t,o=i?$e:{owned:null,cleanups:null,context:r?r.context:null,owner:r},l=i?e:()=>e(()=>N(()=>F(o)));g=o,w=null;try{return T(l,!0)}finally{w=n,g=s}}function H(e,t){t=t?Object.assign({},ee,t):ee;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(u&&u.running&&u.sources.has(n)?i=i(n.tValue):i=i(n.value)),Ie(n,i));return[je.bind(n),s]}function be(e,t,n){const s=Q(e,t,!0,I);K(s)}function D(e,t,n){const s=Q(e,t,!1,I);K(s)}function Be(e,t,n){ke=ze;const s=Q(e,t,!1,I),i=U&&ge(U);i&&(s.suspense=i),s.user=!0,A?A.push(s):K(s)}function j(e,t,n){n=n?Object.assign({},ee,n):ee;const s=Q(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,K(s),je.bind(s)}function Re(e){return e&&typeof e=="object"&&"then"in e}function Ke(e,t,n){let s,i,r;arguments.length===1?(s=!0,i=e,r={}):(s=e,i=t,r={});let o=null,l=le,f=null,d=!1,h=!1,a="initialValue"in r,y=typeof s=="function"&&j(s);const b=new Set,[x,C]=(r.storage||H)(r.initialValue),[k,$]=H(void 0),[E,P]=H(void 0,{equals:!1}),[L,M]=H(a?"ready":"unresolved");c.context&&(f=c.getNextContextId(),r.ssrLoadFrom==="initial"?l=r.initialValue:c.load&&c.has(f)&&(l=c.load(f)));function V(m,p,S,q){return o===m&&(o=null,q!==void 0&&(a=!0),(m===l||p===l)&&r.onHydrated&&queueMicrotask(()=>r.onHydrated(q,{value:p})),l=le,u&&m&&d?(u.promises.delete(m),d=!1,T(()=>{u.running=!0,ye(p,S)},!1)):ye(p,S)),p}function ye(m,p){T(()=>{p===void 0&&C(()=>m),M(p!==void 0?"errored":a?"ready":"unresolved"),$(p);for(const S of b.keys())S.decrement();b.clear()},!1)}function ie(){const m=U&&ge(U),p=x(),S=k();if(S!==void 0&&!o)throw S;return w&&!w.user&&m&&be(()=>{E(),o&&(m.resolved&&u&&d?u.promises.add(o):b.has(m)||(m.increment(),b.add(m)))}),p}function re(m=!0){if(m!==!1&&h)return;h=!1;const p=y?y():s;if(d=u&&u.running,p==null||p===!1){V(o,N(x));return}u&&o&&u.promises.delete(o);const S=l!==le?l:N(()=>i(p,{value:x(),refetching:m}));return Re(S)?(o=S,"value"in S?(S.status==="success"?V(o,S.value,void 0,p):V(o,void 0,fe(S.value),p),S):(h=!0,queueMicrotask(()=>h=!1),T(()=>{M(a?"refreshing":"pending"),P()},!1),S.then(q=>V(S,q,void 0,p),q=>V(S,void 0,fe(q),p)))):(V(o,S,void 0,p),S)}return Object.defineProperties(ie,{state:{get:()=>L()},error:{get:()=>k()},loading:{get(){const m=L();return m==="pending"||m==="refreshing"}},latest:{get(){if(!a)return ie();const m=k();if(m&&!o)throw m;return x()}}}),y?be(()=>re(!1)):re(!1),[ie,{refetch:re,mutate:C}]}function $t(e){return T(e,!1)}function N(e){if(w===null)return e();const t=w;w=null;try{return e()}finally{w=t}}function Lt(e,t,n){const s=Array.isArray(e);let i,r=n&&n.defer;return o=>{let l;if(s){l=Array(e.length);for(let d=0;d<e.length;d++)l[d]=e[d]()}else l=e();if(r)return r=!1,o;const f=N(()=>t(l,i,o));return i=l,f}}function jt(e){Be(()=>N(e))}function he(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function Ye(e,t){Y||(Y=Symbol("error")),g=Q(void 0,void 0,!0),g.context={...g.context,[Y]:[t]},u&&u.running&&u.sources.add(g);try{return e()}catch(n){J(n)}finally{g=g.owner}}function It(){return w}function Xe(){return g}function vt(e,t){const n=g,s=w;g=e,w=null;try{return T(t,!0)}catch(i){J(i)}finally{g=n,w=s}}function Ht(e){if(u&&u.running)return e(),u.done;const t=w,n=g;return Promise.resolve().then(()=>{w=t,g=n;let s;return U&&(s=u||(u={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0}),s.done||(s.done=new Promise(i=>s.resolve=i)),s.running=!0),T(e,!1),w=g=null,s?s.done:void 0})}const[Mt,me]=H(!1);function Ge(e){A.push.apply(A,e),e.length=0}function Le(e,t){const n=Symbol("context");return{id:n,Provider:Ze(n),defaultValue:e}}function ge(e){let t;return g&&g.context&&(t=g.context[e.id])!==void 0?t:e.defaultValue}function We(e){const t=j(e),n=j(()=>ue(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let U;function Qe(){return U||(U=Le())}function je(){const e=u&&u.running;if(this.sources&&(e?this.tState:this.state))if((e?this.tState:this.state)===I)K(this);else{const t=O;O=null,T(()=>ne(this),!1),O=t}if(w){const t=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(t)):(w.sources=[this],w.sourceSlots=[t]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return e&&u.sources.has(this)?this.tValue:this.value}function Ie(e,t,n){let s=u&&u.running&&u.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(s,t)){if(u){const i=u.running;(i||!n&&u.sources.has(e))&&(u.sources.add(e),e.tValue=t),i||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&T(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],o=u&&u.running;o&&u.disposed.has(r)||((o?!r.tState:!r.state)&&(r.pure?O.push(r):A.push(r),r.observers&&He(r)),o?r.tState=I:r.state=I)}if(O.length>1e6)throw O=[],new Error},!1)}return t}function K(e){if(!e.fn)return;F(e);const t=se;xe(e,u&&u.running&&u.sources.has(e)?e.tValue:e.value,t),u&&!u.running&&u.sources.has(e)&&queueMicrotask(()=>{T(()=>{u&&(u.running=!0),w=g=e,xe(e,e.tValue,t),w=g=null},!1)})}function xe(e,t,n){let s;const i=g,r=w;w=g=e;try{s=e.fn(t)}catch(o){return e.pure&&(u&&u.running?(e.tState=I,e.tOwned&&e.tOwned.forEach(F),e.tOwned=void 0):(e.state=I,e.owned&&e.owned.forEach(F),e.owned=null)),e.updatedAt=n+1,J(o)}finally{w=r,g=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ie(e,s,!0):u&&u.running&&e.pure?(u.sources.add(e),e.tValue=s):e.value=s,e.updatedAt=n)}function Q(e,t,n,s=I,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:g?g.context:null,pure:n};return u&&u.running&&(r.state=0,r.tState=s),g===null||g!==$e&&(u&&u.running&&g.pure?g.tOwned?g.tOwned.push(r):g.tOwned=[r]:g.owned?g.owned.push(r):g.owned=[r]),r}function te(e){const t=u&&u.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===G)return ne(e);if(e.suspense&&N(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<se);){if(t&&u.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let s=n.length-1;s>=0;s--){if(e=n[s],t){let i=e,r=n[s+1];for(;(i=i.owner)&&i!==r;)if(u.disposed.has(i))return}if((t?e.tState:e.state)===I)K(e);else if((t?e.tState:e.state)===G){const i=O;O=null,T(()=>ne(e,n[0]),!1),O=i}}}function T(e,t){if(O)return e();let n=!1;t||(O=[]),A?n=!0:A=[],se++;try{const s=e();return Je(n),s}catch(s){n||(A=null),O=null,J(s)}}function Je(e){if(O&&(ve(O),O=null),e)return;let t;if(u){if(!u.promises.size&&!u.queue.size){const s=u.sources,i=u.disposed;A.push.apply(A,u.effects),t=u.resolve;for(const r of A)"tState"in r&&(r.state=r.tState),delete r.tState;u=null,T(()=>{for(const r of i)F(r);for(const r of s){if(r.value=r.tValue,r.owned)for(let o=0,l=r.owned.length;o<l;o++)F(r.owned[o]);r.tOwned&&(r.owned=r.tOwned),delete r.tValue,delete r.tOwned,r.tState=0}me(!1)},!1)}else if(u.running){u.running=!1,u.effects.push.apply(u.effects,A),A=null,me(!0);return}}const n=A;A=null,n.length&&T(()=>ke(n),!1),t&&t()}function ve(e){for(let t=0;t<e.length;t++)te(e[t])}function ze(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:te(s)}if(c.context){if(c.count){c.effects||(c.effects=[]),c.effects.push(...e.slice(0,n));return}v()}for(c.effects&&(c.done||!c.count)&&(e=[...c.effects,...e],n+=c.effects.length,delete c.effects),t=0;t<n;t++)te(e[t])}function ne(e,t){const n=u&&u.running;n?e.tState=0:e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];if(i.sources){const r=n?i.tState:i.state;r===I?i!==t&&(!i.updatedAt||i.updatedAt<se)&&te(i):r===G&&ne(i,t)}}}function He(e){const t=u&&u.running;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(t?!s.tState:!s.state)&&(t?s.tState=G:s.state=G,s.pure?O.push(s):A.push(s),s.observers&&He(s))}}function F(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),o=n.observerSlots.pop();s<i.length&&(r.sourceSlots[o]=s,i[s]=r,n.observerSlots[s]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)F(e.tOwned[t]);delete e.tOwned}if(u&&u.running&&e.pure)Me(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)F(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}u&&u.running?e.tState=0:e.state=0}function Me(e,t){if(t||(e.tState=0,u.disposed.add(e)),e.owned)for(let n=0;n<e.owned.length;n++)Me(e.owned[n])}function fe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function pe(e,t,n){try{for(const s of t)s(e)}catch(s){J(s,n&&n.owner||null)}}function J(e,t=g){const n=Y&&t&&t.context&&t.context[Y],s=fe(e);if(!n)throw s;A?A.push({fn(){pe(s,n,t)},state:I}):pe(s,n,t)}function ue(e){if(typeof e=="function"&&!e.length)return ue(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=ue(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function Ze(e,t){return function(s){let i;return D(()=>i=N(()=>(g.context={...g.context,[e]:s.value},We(()=>s.children))),void 0),i}}const et=Symbol("fallback");function Se(e){for(let t=0;t<e.length;t++)e[t]()}function tt(e,t,n={}){let s=[],i=[],r=[],o=0,l=t.length>1?[]:null;return he(()=>Se(r)),()=>{let f=e()||[],d=f.length,h,a;return f[Ue],N(()=>{let b,x,C,k,$,E,P,L,M;if(d===0)o!==0&&(Se(r),r=[],s=[],i=[],o=0,l&&(l=[])),n.fallback&&(s=[et],i[0]=X(V=>(r[0]=V,n.fallback())),o=1);else if(o===0){for(i=new Array(d),a=0;a<d;a++)s[a]=f[a],i[a]=X(y);o=d}else{for(C=new Array(d),k=new Array(d),l&&($=new Array(d)),E=0,P=Math.min(o,d);E<P&&s[E]===f[E];E++);for(P=o-1,L=d-1;P>=E&&L>=E&&s[P]===f[L];P--,L--)C[L]=i[P],k[L]=r[P],l&&($[L]=l[P]);for(b=new Map,x=new Array(L+1),a=L;a>=E;a--)M=f[a],h=b.get(M),x[a]=h===void 0?-1:h,b.set(M,a);for(h=E;h<=P;h++)M=s[h],a=b.get(M),a!==void 0&&a!==-1?(C[a]=i[h],k[a]=r[h],l&&($[a]=l[h]),a=x[a],b.set(M,a)):r[h]();for(a=E;a<d;a++)a in C?(i[a]=C[a],r[a]=k[a],l&&(l[a]=$[a],l[a](a))):i[a]=X(y);i=i.slice(0,o=d),s=f.slice(0)}return i});function y(b){if(r[a]=b,l){const[x,C]=H(a);return l[a]=C,t(f[a],x)}return t(f[a])}}}let _e=!1;function nt(){_e=!0}function st(e,t){if(_e&&c.context){const n=c.context;v(Fe());const s=N(()=>e(t||{}));return v(n),s}return N(()=>e(t||{}))}function z(){return!0}const ce={get(e,t,n){return t===Z?n:e.get(t)},has(e,t){return t===Z?!0:e.has(t)},set:z,deleteProperty:z,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:z,deleteProperty:z}},ownKeys(e){return e.keys()}};function oe(e){return(e=typeof e=="function"?e():e)?e:{}}function it(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function _t(...e){let t=!1;for(let o=0;o<e.length;o++){const l=e[o];t=t||!!l&&Z in l,e[o]=typeof l=="function"?(t=!0,j(l)):l}if(Te&&t)return new Proxy({get(o){for(let l=e.length-1;l>=0;l--){const f=oe(e[l])[o];if(f!==void 0)return f}},has(o){for(let l=e.length-1;l>=0;l--)if(o in oe(e[l]))return!0;return!1},keys(){const o=[];for(let l=0;l<e.length;l++)o.push(...Object.keys(oe(e[l])));return[...new Set(o)]}},ce);const n={},s=Object.create(null);for(let o=e.length-1;o>=0;o--){const l=e[o];if(!l)continue;const f=Object.getOwnPropertyNames(l);for(let d=f.length-1;d>=0;d--){const h=f[d];if(h==="__proto__"||h==="constructor")continue;const a=Object.getOwnPropertyDescriptor(l,h);if(!s[h])s[h]=a.get?{enumerable:!0,configurable:!0,get:it.bind(n[h]=[a.get.bind(l)])}:a.value!==void 0?a:void 0;else{const y=n[h];y&&(a.get?y.push(a.get.bind(l)):a.value!==void 0&&y.push(()=>a.value))}}}const i={},r=Object.keys(s);for(let o=r.length-1;o>=0;o--){const l=r[o],f=s[l];f&&f.get?Object.defineProperty(i,l,f):i[l]=f?f.value:void 0}return i}function Vt(e,...t){if(Te&&Z in e){const i=new Set(t.length>1?t.flat():t[0]),r=t.map(o=>new Proxy({get(l){return o.includes(l)?e[l]:void 0},has(l){return o.includes(l)&&l in e},keys(){return o.filter(l=>l in e)}},ce));return r.push(new Proxy({get(o){return i.has(o)?void 0:e[o]},has(o){return i.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!i.has(o))}},ce)),r}const n={},s=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const r=Object.getOwnPropertyDescriptor(e,i),o=!r.get&&!r.set&&r.enumerable&&r.writable&&r.configurable;let l=!1,f=0;for(const d of t)d.includes(i)&&(l=!0,o?s[f][i]=r.value:Object.defineProperty(s[f],i,r)),++f;l||(o?n[i]=r.value:Object.defineProperty(n,i,r))}return[...s,n]}function Ft(e){let t,n;const s=i=>{const r=c.context;if(r){const[l,f]=H();c.count||(c.count=0),c.count++,(n||(n=e())).then(d=>{!c.done&&v(r),c.count--,f(()=>d.default),v()}),t=l}else if(!t){const[l]=Ke(()=>(n||(n=e())).then(f=>f.default));t=l}let o;return j(()=>(o=t())?N(()=>{if(!r||c.done)return o(i);const l=c.context;v(r);const f=o(i);return v(l),f}):"")};return s.preload=()=>n||((n=e()).then(i=>t=()=>i.default),n),s}let rt=0;function Dt(){return c.context?c.getNextContextId():`cl-${rt++}`}const lt=e=>`Stale read from <${e}>.`;function Ut(e){const t="fallback"in e&&{fallback:()=>e.fallback};return j(tt(()=>e.each,e.children,t||void 0))}function qt(e){const t=e.keyed,n=j(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return j(()=>{const s=n();if(s){const i=e.children;return typeof i=="function"&&i.length>0?N(()=>i(t?s:()=>{if(!N(n))throw lt("Show");return e.when})):i}return e.fallback},void 0,void 0)}let R;function Bt(){R&&[...R].forEach(e=>e())}function Rt(e){let t;c.context&&c.load&&(t=c.load(c.getContextId()));const[n,s]=H(t,void 0);return R||(R=new Set),R.add(s),he(()=>R.delete(s)),j(()=>{let i;if(i=n()){const r=e.fallback;return typeof r=="function"&&r.length?N(()=>r(i,()=>s())):r}return Ye(()=>e.children,s)},void 0,void 0)}const ot=Le();function Kt(e){let t=0,n,s,i,r,o;const[l,f]=H(!1),d=Qe(),h={increment:()=>{++t===1&&f(!0)},decrement:()=>{--t===0&&f(!1)},inFallback:l,effects:[],resolved:!1},a=Xe();if(c.context&&c.load){const x=c.getContextId();let C=c.load(x);if(C&&(typeof C!="object"||C.status!=="success"?i=C:c.gather(x)),i&&i!=="$$f"){const[k,$]=H(void 0,{equals:!1});r=k,i.then(()=>{if(c.done)return $();c.gather(x),v(s),$(),v()},E=>{o=E,$()})}}const y=ge(ot);y&&(n=y.register(h.inFallback));let b;return he(()=>b&&b()),st(d.Provider,{value:h,get children(){return j(()=>{if(o)throw o;if(s=c.context,r)return r(),r=void 0;s&&i==="$$f"&&v();const x=j(()=>e.children);return j(C=>{const k=h.inFallback(),{showContent:$=!0,showFallback:E=!0}=n?n():{};if((!k||i&&i!=="$$f")&&$)return h.resolved=!0,b&&b(),b=s=i=void 0,Ge(h.effects),x();if(E)return b?C:X(P=>(b=P,s&&(v({id:s.id+"F",count:0}),s=void 0),e.fallback),a)})})}})}const ft=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],ut=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...ft]),ct=new Set(["innerHTML","textContent","innerText","children"]),at=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),dt=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function ht(e,t){const n=dt[e];return typeof n=="object"?n[t]?n.$:void 0:n}const gt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),yt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function wt(e,t,n){let s=n.length,i=t.length,r=s,o=0,l=0,f=t[i-1].nextSibling,d=null;for(;o<i||l<r;){if(t[o]===n[l]){o++,l++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===o){const h=r<s?l?n[l-1].nextSibling:n[r-l]:f;for(;l<r;)e.insertBefore(n[l++],h)}else if(r===l)for(;o<i;)(!d||!d.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[r-1]&&n[l]===t[i-1]){const h=t[--i].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--r],h),t[i]=n[r]}else{if(!d){d=new Map;let a=l;for(;a<r;)d.set(n[a],a++)}const h=d.get(t[o]);if(h!=null)if(l<h&&h<r){let a=o,y=1,b;for(;++a<i&&a<r&&!((b=d.get(t[a]))==null||b!==h+y);)y++;if(y>h-l){const x=t[o];for(;l<h;)e.insertBefore(n[l++],x)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const Ae="_$DX_DELEGATE";function Ce(e,t,n,s={}){let i;return X(r=>{i=r,t===document?e():Ot(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function Yt(e,t,n){let s;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},r=t?()=>N(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return r.cloneNode=r,r}function bt(e,t=window.document){const n=t[Ae]||(t[Ae]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,Ve))}}function Xt(e,t,n){_(e)||(e[t]=n)}function ae(e,t,n){_(e)||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function mt(e,t,n,s){_(e)||(s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s))}function xt(e,t,n){_(e)||(n?e.setAttribute(t,""):e.removeAttribute(t))}function pt(e,t){_(e)||(t==null?e.removeAttribute("class"):e.className=t)}function St(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=r=>i.call(e,n[1],r))}else e.addEventListener(t,n,typeof n!="function"&&n)}function At(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let r,o;for(r=0,o=i.length;r<o;r++){const l=i[r];!l||l==="undefined"||t[l]||(Ee(e,l,!1),delete n[l])}for(r=0,o=s.length;r<o;r++){const l=s[r],f=!!t[l];!l||l==="undefined"||n[l]===f||!f||(Ee(e,l,!0),n[l]=f)}return n}function Ct(e,t,n){if(!t)return n?ae(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,r;for(r in n)t[r]==null&&s.removeProperty(r),delete n[r];for(r in t)i=t[r],i!==n[r]&&(s.setProperty(r,i),n[r]=i);return n}function Gt(e,t={},n,s){const i={};return s||D(()=>i.children=W(e,t.children,i.children)),D(()=>typeof t.ref=="function"&&Et(t.ref,e)),D(()=>Nt(e,t,n,!0,i,!0)),i}function Et(e,t,n){return N(()=>e(t,n))}function Ot(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return W(e,t,s,n);D(i=>W(e,t(),i,n),s)}function Nt(e,t,n,s,i={},r=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=Oe(e,o,null,i[o],n,r,t)}for(const o in t){if(o==="children")continue;const l=t[o];i[o]=Oe(e,o,l,i[o],n,r,t)}}function Pt(e,t,n={}){if(globalThis._$HY.done)return Ce(e,t,[...t.childNodes],n);c.completed=globalThis._$HY.completed,c.events=globalThis._$HY.events,c.load=s=>globalThis._$HY.r[s],c.has=s=>s in globalThis._$HY.r,c.gather=s=>Pe(t,s),c.registry=new Map,c.context={id:n.renderId||"",count:0};try{return Pe(t,n.renderId),Ce(e,t,[...t.childNodes],n)}finally{c.context=null}}function Wt(e){let t,n;return!_()||!(t=c.registry.get(n=kt()))?e():(c.completed&&c.completed.add(t),c.registry.delete(n),t)}function Qt(e){let t=e,n=0,s=[];if(_(e))for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="$")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function Jt(){c.events&&!c.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=c;if(t){for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;t.shift(),Ve(s)}c.done&&(c.events=_$HY.events=null,c.completed=_$HY.completed=null)}}),c.events.queued=!0)}function _(e){return!!c.context&&!c.done&&(!e||e.isConnected)}function Tt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Ee(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,r=s.length;i<r;i++)e.classList.toggle(s[i],n)}function Oe(e,t,n,s,i,r,o){let l,f,d,h,a;if(t==="style")return Ct(e,n,s);if(t==="classList")return At(e,n,s);if(n===s)return s;if(t==="ref")r||n(e);else if(t.slice(0,3)==="on:"){const y=t.slice(3);s&&e.removeEventListener(y,s,typeof s!="function"&&s),n&&e.addEventListener(y,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const y=t.slice(10);s&&e.removeEventListener(y,s,!0),n&&e.addEventListener(y,n,!0)}else if(t.slice(0,2)==="on"){const y=t.slice(2).toLowerCase(),b=gt.has(y);if(!b&&s){const x=Array.isArray(s)?s[0]:s;e.removeEventListener(y,x)}(b||n)&&(St(e,y,n,b),b&&bt([y]))}else if(t.slice(0,5)==="attr:")ae(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")xt(e,t.slice(5),n);else if((a=t.slice(0,5)==="prop:")||(d=ct.has(t))||!i&&((h=ht(t,e.tagName))||(f=ut.has(t)))||(l=e.nodeName.includes("-")||"is"in o)){if(a)t=t.slice(5),f=!0;else if(_(e))return n;t==="class"||t==="className"?pt(e,n):l&&!f&&!d?e[Tt(t)]=n:e[h||t]=n}else{const y=i&&t.indexOf(":")>-1&&yt[t.split(":")[0]];y?mt(e,y,t,n):ae(e,at[t]||t,n)}return n}function Ve(e){if(c.registry&&c.events&&c.events.find(([f,d])=>d===e))return;let t=e.target;const n=`$$${e.type}`,s=e.target,i=e.currentTarget,r=f=>Object.defineProperty(e,"target",{configurable:!0,value:f}),o=()=>{const f=t[n];if(f&&!t.disabled){const d=t[`${n}Data`];if(d!==void 0?f.call(t,d,e):f.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&r(t.host),!0},l=()=>{for(;o()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),c.registry&&!c.done&&(c.done=_$HY.done=!0),e.composedPath){const f=e.composedPath();r(f[0]);for(let d=0;d<f.length-2&&(t=f[d],!!o());d++){if(t._$host){t=t._$host,l();break}if(t.parentNode===i)break}}else l();r(s)}function W(e,t,n,s,i){const r=_(e);if(r){!n&&(n=[...e.childNodes]);let f=[];for(let d=0;d<n.length;d++){const h=n[d];h.nodeType===8&&h.data.slice(0,2)==="!$"?h.remove():f.push(h)}n=f}for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,l=s!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(r||o==="number"&&(t=t.toString(),t===n))return n;if(l){let f=n[0];f&&f.nodeType===3?f.data!==t&&(f.data=t):f=document.createTextNode(t),n=B(e,n,s,f)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(r)return n;n=B(e,n,s)}else{if(o==="function")return D(()=>{let f=t();for(;typeof f=="function";)f=f();n=W(e,f,n,s)}),()=>n;if(Array.isArray(t)){const f=[],d=n&&Array.isArray(n);if(de(f,t,n,i))return D(()=>n=W(e,f,n,s,!0)),()=>n;if(r){if(!f.length)return n;if(s===void 0)return n=[...e.childNodes];let h=f[0];if(h.parentNode!==e)return n;const a=[h];for(;(h=h.nextSibling)!==s;)a.push(h);return n=a}if(f.length===0){if(n=B(e,n,s),l)return n}else d?n.length===0?Ne(e,f,s):wt(e,n,f):(n&&B(e),Ne(e,f));n=f}else if(t.nodeType){if(r&&t.parentNode)return n=l?[t]:t;if(Array.isArray(n)){if(l)return n=B(e,n,s,t);B(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function de(e,t,n,s){let i=!1;for(let r=0,o=t.length;r<o;r++){let l=t[r],f=n&&n[e.length],d;if(!(l==null||l===!0||l===!1))if((d=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))i=de(e,l,f)||i;else if(d==="function")if(s){for(;typeof l=="function";)l=l();i=de(e,Array.isArray(l)?l:[l],Array.isArray(f)?f:[f])||i}else e.push(l),i=!0;else{const h=String(l);f&&f.nodeType===3&&f.data===h?e.push(f):e.push(document.createTextNode(h))}}return i}function Ne(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function B(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(i!==l){const f=l.parentNode===e;!r&&!o?f?e.replaceChild(i,l):e.insertBefore(i,n):f&&l.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}function Pe(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],r=i.getAttribute("data-hk");(!t||r.startsWith(t))&&!c.registry.has(r)&&c.registry.set(r,i)}}function kt(){return c.getNextContextId()}const zt=()=>{},Zt=!1,en=(...e)=>(nt(),Pt(...e));export{Z as $,Kt as A,en as B,Vt as C,vt as D,Rt as E,Ut as F,Ht as G,$t as H,Zt as I,zt as J,Bt as K,Xt as L,Et as M,jt as N,Ct as O,Ue as P,It as Q,qt as S,Le as a,Gt as b,st as c,Dt as d,D as e,We as f,j as g,Xe as h,N as i,Lt as j,X as k,H as l,bt as m,Wt as n,he as o,_t as p,Ot as q,Jt as r,c as s,Yt as t,ge as u,Ft as v,Qt as w,Be as x,ae as y,pt as z};
