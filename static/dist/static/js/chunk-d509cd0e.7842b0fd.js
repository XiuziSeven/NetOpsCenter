(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d509cd0e"],{5719:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-container",{staticStyle:{height:"800px",border:"1px solid #eee"}},[n("el-aside",{attrs:{width:"300px"}},[n("br"),n("el-radio-group",{attrs:{size:"mini"},on:{change:function(e){return t.getDevicesList()}},model:{value:t.params.device_brand_id,callback:function(e){t.$set(t.params,"device_brand_id",e)},expression:"params.device_brand_id"}},[n("el-radio-button",{attrs:{label:""}},[t._v("All")]),t._l(t.brandlist,(function(e){return n("el-radio-button",{key:e.id,attrs:{label:e.id}},[t._v(t._s(e.name))])}))],2),n("el-tree",{ref:"tree",attrs:{data:t.treeData,"show-checkbox":"","default-expand-all":""}})],1),n("el-container",[n("el-header",{staticStyle:{"text-align":"right",height:"400px","font-size":"12px"},attrs:{loading:t.loading}},[n("div",{staticStyle:{"text-align":"left"}},[n("el-button",{staticStyle:{display:"inline-block"},attrs:{type:"success",disabled:t.isButtonDisabled,icon:"el-icon-caret-right",size:"mini",loading:t.loading},on:{click:function(e){return t.handleButtonClick()}}},[t._v("运行")])],1),n("el-input",{attrs:{type:"textarea",autosize:{minRows:15,maxRows:15},placeholder:"请输入命令"},model:{value:t.info.commits,callback:function(e){t.$set(t.info,"commits",e)},expression:"info.commits"}})],1),n("el-main",[t._v(" 结果： "),n("el-input",{attrs:{type:"textarea",autosize:{minRows:15,maxRows:15},readonly:""},model:{value:t.results,callback:function(e){t.results=e},expression:"results"}})],1)],1)],1)],1)},i=[],a=(n("498a"),n("4de4"),n("d3b7"),n("d81d"),n("159b"),n("c740"),n("b0c0"),n("ad8f")),u={data:function(){return{loading:!1,results:"",treeData:[],checkedNodes:[],brandlist:[],info:{deviceid:"",commits:""},params:{page:1,page_size:999,search:"",device_brand_id:""}}},mounted:function(){},created:function(){this.getDevicesList(),this.getBrandList()},computed:{isButtonDisabled:function(){return 0===this.info.commits.trim().length}},methods:{handleButtonClick:function(){var t=this;this.loading=!0;var e=this.$refs.tree.getCheckedNodes(),n=e.filter((function(t){return!t.children}));this.info.deviceid=n.map((function(t){return t.id})),console.log("request------",this.info),Object(a["g"])(this.info).then((function(e){t.results=e.data.status,t.loading=!1})).catch((function(e){t.loading=!1}))},getDevicesList:function(){var t=this;Object(a["s"])(this.params).then((function(e){var n=[];e.data.results.forEach((function(t){var e=n.findIndex((function(e){return e.label===t.area_name}));-1===e?n.push({label:t.area_name,children:[{id:t.id,label:t.name+"("+t.ip+")",ip:t.ip}]}):n[e].children.push({id:t.id,label:t.name+"("+t.ip+")",ip:t.ip})})),t.treeData=n}))},getBrandList:function(){var t=this;Object(a["o"])(this.params).then((function(e){t.brandlist=e.data}))}}},c=u,o=(n("7a9e"),n("2877")),d=Object(o["a"])(c,r,i,!1,null,null,null);e["default"]=d.exports},"7a9e":function(t,e,n){"use strict";n("cde3")},ad8f:function(t,e,n){"use strict";n.d(e,"s",(function(){return i})),n.d(e,"m",(function(){return a})),n.d(e,"t",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"n",(function(){return o})),n.d(e,"a",(function(){return d})),n.d(e,"o",(function(){return s})),n.d(e,"b",(function(){return l})),n.d(e,"p",(function(){return f})),n.d(e,"d",(function(){return h})),n.d(e,"q",(function(){return b})),n.d(e,"e",(function(){return m})),n.d(e,"j",(function(){return p})),n.d(e,"h",(function(){return v})),n.d(e,"i",(function(){return g})),n.d(e,"k",(function(){return j})),n.d(e,"v",(function(){return O})),n.d(e,"u",(function(){return x})),n.d(e,"g",(function(){return _})),n.d(e,"r",(function(){return k})),n.d(e,"f",(function(){return y})),n.d(e,"l",(function(){return w})),n.d(e,"w",(function(){return D}));var r=n("b775");function i(t){return Object(r["a"])({url:"/devices/",method:"get",params:t})}function a(t){return Object(r["a"])({url:"/devices/"+t+"/",method:"delete"})}function u(t,e){return Object(r["a"])({url:"/devices/"+t+"/",method:"patch",data:e})}function c(t){return Object(r["a"])({url:"/devices/",method:"post",data:t})}function o(){return Object(r["a"])({url:"/area/",method:"get"})}function d(t){return Object(r["a"])({url:"/area/",method:"post",data:t})}function s(){return Object(r["a"])({url:"/devicebrand/",method:"get"})}function l(t){return Object(r["a"])({url:"/devicebrand/",method:"post",data:t})}function f(){return Object(r["a"])({url:"/devicetype/",method:"get"})}function h(t){return Object(r["a"])({url:"/devicetype/",method:"post",data:t})}function b(){return Object(r["a"])({url:"/deviceuser/",method:"get"})}function m(t){return Object(r["a"])({url:"/deviceuser/",method:"post",data:t})}function p(t){return Object(r["a"])({url:"/devicetype/"+t+"/",method:"delete"})}function v(t){return Object(r["a"])({url:"/area/"+t+"/",method:"delete"})}function g(t){return Object(r["a"])({url:"/devicebrand/"+t+"/",method:"delete"})}function j(t){return Object(r["a"])({url:"/deviceuser/"+t+"/",method:"delete"})}function O(t,e){return Object(r["a"])({url:"/deviceuser/"+t+"/",method:"patch",data:e})}function x(t,e){return Object(r["a"])({url:"/devicebrand/"+t+"/",method:"patch",data:e})}function _(t){return Object(r["a"])({url:"/autoconfig/",method:"post",data:t})}function k(){return Object(r["a"])({url:"/devicesgroup/",method:"get"})}function y(t){return Object(r["a"])({url:"/devicesgroup/",method:"post",data:t})}function w(t){return Object(r["a"])({url:"/devicesgroup/"+t+"/",method:"delete"})}function D(t,e){return Object(r["a"])({url:"/devicesgroup/"+t+"/",method:"patch",data:e})}},c740:function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").findIndex,a=n("44d2"),u=n("ae40"),c="findIndex",o=!0,d=u(c);c in[]&&Array(1)[c]((function(){o=!1})),r({target:"Array",proto:!0,forced:o||!d},{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a(c)},cde3:function(t,e,n){}}]);