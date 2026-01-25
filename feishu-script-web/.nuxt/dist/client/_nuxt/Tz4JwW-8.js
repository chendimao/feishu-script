import{E as h,a as I}from"./CISzIzTE.js";import{E as k,a as T}from"./Dr6QiD2B.js";import{E as g}from"./1nCaTqwN.js";import"./CwJrRe7m.js";import{d as V,x as f,y as _,z as p,B as l,C as a,D as E,A as $,J as x,g as d,_ as N}from"./WQ8t1Zmy.js";const S={class:"test-page"},A={key:0,class:"result"},C=V({__name:"test",setup(O){const o=d("test_app_token"),n=d("test_table_id"),i=d(!1),t=d("");async function c(){i.value=!0,t.value="";try{if(!o.value||!n.value){t.value="请输入 App Token 和 Table ID";return}const u=await $fetch("/api/test");t.value=`基本API测试:
${JSON.stringify(u,null,2)}

`;const e=await $fetch("/api/feishu/fields",{method:"POST",body:{appToken:o.value,tableId:n.value}});t.value+=`字段API测试:
${JSON.stringify(e,null,2)}

`;const r=await $fetch("/api/feishu/records",{method:"POST",body:{appToken:o.value,tableId:n.value,limit:3}});t.value+=`记录API测试:
${JSON.stringify(r,null,2)}

`;const s=await $fetch("/api/url-expand/batch",{method:"POST",body:{urls:["https://bit.ly/test1","https://t.cn/test2"]}});t.value+=`URL扩展API测试:
${JSON.stringify(s,null,2)}`}catch(u){t.value=`错误: ${u}`}finally{i.value=!1}}return(u,e)=>{const r=h,s=T,v=g,b=k,y=I;return f(),_("div",S,[e[5]||(e[5]=p("h1",null,"测试页面",-1)),l(y,null,{header:a(()=>[...e[2]||(e[2]=[p("h3",null,"基本功能测试",-1)])]),default:a(()=>[l(b,{"label-width":"120px"},{default:a(()=>[l(s,{label:"App Token"},{default:a(()=>[l(r,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=m=>o.value=m),placeholder:"输入app token"},null,8,["modelValue"])]),_:1}),l(s,{label:"Table ID"},{default:a(()=>[l(r,{modelValue:n.value,"onUpdate:modelValue":e[1]||(e[1]=m=>n.value=m),placeholder:"输入table id"},null,8,["modelValue"])]),_:1}),l(s,null,{default:a(()=>[l(v,{type:"primary",onClick:c,loading:i.value},{default:a(()=>[...e[3]||(e[3]=[E(" 测试连接 ",-1)])]),_:1},8,["loading"])]),_:1})]),_:1}),t.value?(f(),_("div",A,[e[4]||(e[4]=p("h4",null,"测试结果：",-1)),p("pre",null,$(t.value),1)])):x("",!0)]),_:1})])}}}),D=N(C,[["__scopeId","data-v-2f8b9dae"]]);export{D as default};
