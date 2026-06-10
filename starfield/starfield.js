<script>
(function(){
const path = window.location.pathname;
if(path !== '/home-dark') return;
const M=Math,R=()=>M.random(),P=M.PI,c=document.createElement('canvas');
c.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
document.body.appendChild(c);
const K=c.getContext('2d');
const rz=()=>{c.width=innerWidth;c.height=innerHeight};rz();onresize=rz;
function mK(b,s,n,t){const br=b/n,tp=br<.2?2:br<.5?1:0,sr=s/n,sh=sr<.5?0:sr<.8?1:2;return{x:R()*c.width,y:R()*c.height,r:sh?sh>1?5+R()*2:4+R()*1.5:1+R()*.4,phase:R()*P*2,speed:.3+R()*.7,type:tp,shape:sh,teal:t,vx:(R()-.5)*.3,vy:(R()-.5)*.3}}
const N=60,bo=[...Array(N).keys()].sort(()=>R()-.5),so=[...Array(N).keys()].sort(()=>R()-.5),tS=new Set;
let tc=(R()+2.5)|0;while(tS.size<tc)tS.add(R()*N|0);
const st=[...Array(N)].map((_,i)=>mK(bo[i],so[i],N,tS.has(i))),ss=[];
document.onclick=e=>{if(window.location.pathname!=='/home-dark'){c.remove();return;}if(ss.length>=3)return;const sp=7+R()*4,ag=(R()-.5)*(P/6);ss.push({x:e.clientX,y:e.clientY,vx:M.cos(ag)*sp,vy:M.sin(ag)*sp,trail:[],trailPx:86})};
function dSh(px,py,r,sh,al,tl){const rb=tl?'142,197,214':'243,241,234',a=v=>`rgba(${rb},${M.max(0,v).toFixed(3)})`;if(!sh){const h=K.createRadialGradient(px,py,0,px,py,r*3.5);h.addColorStop(0,a(al*.87));h.addColorStop(.28,a(al*.5));h.addColorStop(.55,a(al*.12));h.addColorStop(1,a(0));K.beginPath();K.arc(px,py,r*3.5,0,P*2);K.fillStyle=h;K.fill()}else if(sh<2){const g1=K.createLinearGradient(px-r,py,px+r,py),g2=K.createLinearGradient(px,py-r,px,py+r);[g1,g2].forEach(g=>{g.addColorStop(0,a(0));g.addColorStop(.3,a(al*.28));g.addColorStop(.44,a(al*.64));g.addColorStop(.5,a(al));g.addColorStop(.56,a(al*.64));g.addColorStop(.7,a(al*.28));g.addColorStop(1,a(0))});K.fillStyle=g1;K.fillRect(px-r,py-.9,r*2,1.8);K.fillStyle=g2;K.fillRect(px-.9,py-r,1.8,r*2)}else{const g1=K.createLinearGradient(px-r,py,px+r,py),g2=K.createLinearGradient(px,py-r,px,py+r);[g1,g2].forEach(g=>{g.addColorStop(0,a(0));g.addColorStop(.07,a(al*.06));g.addColorStop(.4,a(al*.25));g.addColorStop(.5,a(al*.75));g.addColorStop(.6,a(al*.25));g.addColorStop(.93,a(al*.06));g.addColorStop(1,a(0))});K.lineWidth=.7;K.lineCap='butt';K.beginPath();K.moveTo(px-r,py);K.lineTo(px+r,py);K.strokeStyle=g1;K.stroke();K.beginPath();K.moveTo(px,py-r);K.lineTo(px,py+r);K.strokeStyle=g2;K.stroke()}}
function dT(s,t){let al,r;if(!s.type){al=.75;r=s.r}else if(s.type<2){const p=.5+.5*M.sin(t*s.speed*2.5+s.phase);al=.05+.95*p;r=s.r*(.8+.2*p)}else{s.x+=s.vx;s.y+=s.vy;if(s.x<0)s.x=c.width;if(s.x>c.width)s.x=0;if(s.y<0)s.y=c.height;if(s.y>c.height)s.y=0;al=.6;r=s.r}dSh(s.x,s.y,r,s.shape,al,s.teal)}
function dSS(s){if(s.trail.length<2)return;const tl=s.trail[0],hd=s.trail[s.trail.length-1],p=new Path2D;p.moveTo(tl.x,tl.y);for(let i=1;i<s.trail.length;i++)p.lineTo(s.trail[i].x,s.trail[i].y);const gl=K.createLinearGradient(tl.x,tl.y,hd.x,hd.y),gc=K.createLinearGradient(tl.x,tl.y,hd.x,hd.y);gl.addColorStop(0,'rgba(243,241,234,0)');gl.addColorStop(1,'rgba(243,241,234,.15)');gc.addColorStop(0,'rgba(243,241,234,0)');gc.addColorStop(1,'rgba(255,253,248,.85)');K.lineCap='round';K.strokeStyle=gl;K.lineWidth=4;K.stroke(p);K.strokeStyle=gc;K.lineWidth=1.2;K.stroke(p);const h=K.createRadialGradient(s.x,s.y,0,s.x,s.y,8);h.addColorStop(0,'rgba(255,253,248,.7)');h.addColorStop(1,'rgba(243,241,234,0)');K.beginPath();K.arc(s.x,s.y,8,0,P*2);K.fillStyle=h;K.fill();K.beginPath();K.arc(s.x,s.y,1.8,0,P*2);K.fillStyle='rgba(255,253,248,1)';K.fill()}
let stop=false;
let lt=0;function fr(ts){if(stop)return;if(window.location.pathname!=='/home-dark'){c.remove();stop=true;return;}const t=ts/1e3;lt=ts;K.clearRect(0,0,c.width,c.height);for(const s of st)dT(s,t);for(let i=ss.length-1;i>=0;i--){const s=ss[i];s.trail.push({x:s.x,y:s.y});while(s.trail.length>1){const t0=s.trail[0];if(M.abs(s.x-t0.x)+M.abs(s.y-t0.y)>s.trailPx)s.trail.shift();else break}s.x+=s.vx;s.y+=s.vy;if(s.x<-80||s.x>c.width+80||s.y>c.height+80){ss.splice(i,1);continue}dSS(s)}requestAnimationFrame(fr)}
requestAnimationFrame(fr);
})();
</script>
