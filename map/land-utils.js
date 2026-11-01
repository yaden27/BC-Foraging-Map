(function(root){
// Source classes: 0 no polygon, 1 registered provincial, 2 generalized provincial,
// 3 explicitly unknown/ambiguous, 4 known other administration/ownership.
function sourceKind(r,g,b,a){if(a<160)return 0;if(r>200&&g>200&&b<70)return 3;if(r>200&&g<70&&b<70)return 1;if(g>200&&r<70&&b<70)return 2;if(b>200&&r<70&&g<70)return 4;return 3}
function combine(pm,ld,pmReady=true,ldReady=true){if(!pmReady){if(ld===2||ld===1)return 3;return ld===4?4:ld===3?3:0}if(pm===4)return 4;if(pm===3)return 3;if(pm===1)return ldReady&&(ld===3||ld===4)?3:1;if(ld===2||ld===1)return 2;if(ld===3)return 3;if(ld===4)return 4;return 0}
const palette={0:[0,0,0,0],1:[24,116,68,160],2:[128,192,119,118],3:[140,147,157,115],4:[0,0,0,0]};
function compose(pm,ld,pmReady=true,ldReady=true){const len=(pm||ld).length,out=new Uint8ClampedArray(len),mask=new Uint8ClampedArray(len),classes=new Uint8Array(len/4);for(let i=0;i<len;i+=4){const p=pm?sourceKind(pm[i],pm[i+1],pm[i+2],pm[i+3]):0,l=ld?sourceKind(ld[i],ld[i+1],ld[i+2],ld[i+3]):0,k=combine(p,l,pmReady,ldReady);classes[i/4]=k;const c=palette[k];out[i]=c[0];out[i+1]=c[1];out[i+2]=c[2];out[i+3]=c[3];if(k===1||k===2){mask[i]=mask[i+1]=mask[i+2]=mask[i+3]=255}}return {out,mask,classes}}
function excludeDeveloped(data,pixels){for(let i=0;i<data.classes.length;i++){if(data.classes[i]!==1&&data.classes[i]!==2)continue;const j=i*4;if(!pixels||pixels[j+3]>20){data.classes[i]=pixels?5:6;data.out.fill(0,j,j+4);data.mask.fill(0,j,j+4)}}return data}
const api={excludeDeveloped,sourceKind,combine,compose,palette};if(typeof module!=='undefined')module.exports=api;else root.LandUtils=api;
})(typeof window==='undefined'?globalThis:window);
