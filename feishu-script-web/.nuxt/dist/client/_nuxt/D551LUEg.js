import{_ as h}from"./B9kDMttj.js";import{E as k,a as T}from"./BOZUAO0b.js";import{E as g,a as E}from"./3bT2f6wW.js";import{E as V}from"./Bue0N5W5.js";import{d as x,x as c,y as f,B as l,C as a,D as A,z as _,A as P,E as S,g as r,_ as $}from"./sq3K_qnO.js";import"./CckOn9TO.js";const N={class:"test-page"},C={key:0,class:"result"},O=x({__name:"test",setup(w){const o=r("test_app_token"),n=r("test_table_id"),p=r(!1),t=r("");async function v(){p.value=!0,t.value="";try{if(!o.value||!n.value){t.value="请输入 App Token 和 Table ID";return}const s=await $fetch("/api/test");t.value=`基本API测试:
${JSON.stringify(s,null,2)}

`;const e=await $fetch("/api/feishu/fields",{method:"POST",body:{appToken:o.value,tableId:n.value}});t.value+=`字段API测试:
${JSON.stringify(e,null,2)}

`;const i=await $fetch("/api/feishu/records",{method:"POST",body:{appToken:o.value,tableId:n.value,limit:3}});t.value+=`记录API测试:
${JSON.stringify(i,null,2)}

`;const u=await $fetch("/api/url-expand/batch",{method:"POST",body:{urls:["https://bit.ly/test1","https://t.cn/test2"]}});t.value+=`URL扩展API测试:
${JSON.stringify(u,null,2)}`}catch(s){t.value=`错误: ${s}`}finally{p.value=!1}}return(s,e)=>{const i=h,u=k,d=E,b=V,y=g,I=T;return c(),f("div",N,[l(i,{title:"🧪 API测试工具",description:"测试各种API接口的功能和响应"}),l(I,null,{header:a(()=>[...e[2]||(e[2]=[_("h3",null,"基本功能测试",-1)])]),default:a(()=>[l(y,{"label-width":"120px"},{default:a(()=>[l(d,{label:"App Token"},{default:a(()=>[l(u,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=m=>o.value=m),placeholder:"输入app token"},null,8,["modelValue"])]),_:1}),l(d,{label:"Table ID"},{default:a(()=>[l(u,{modelValue:n.value,"onUpdate:modelValue":e[1]||(e[1]=m=>n.value=m),placeholder:"输入table id"},null,8,["modelValue"])]),_:1}),l(d,null,{default:a(()=>[l(b,{type:"primary",onClick:v,loading:p.value},{default:a(()=>[...e[3]||(e[3]=[A(" 测试连接 ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1}),t.value?(c(),f("div",C,[e[4]||(e[4]=_("h4",null,"测试结果：",-1)),_("pre",null,P(t.value),1)])):S("",!0)]),_:1})])}}}),z=$(O,[["__scopeId","data-v-72284798"]]);export{z as default};
