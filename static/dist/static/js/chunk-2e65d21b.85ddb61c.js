(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e65d21b"],{"466d":function(e,t,a){"use strict";var r=a("d784"),i=a("825a"),n=a("50c4"),l=a("1d80"),o=a("8aa5"),s=a("14c3");r("match",1,(function(e,t,a){return[function(t){var a=l(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,a):new RegExp(t)[e](String(a))},function(e){var r=a(t,e,this);if(r.done)return r.value;var l=i(e),c=String(this);if(!l.global)return s(l,c);var d=l.unicode;l.lastIndex=0;var u,m=[],p=0;while(null!==(u=s(l,c))){var v=String(u[0]);m[p]=v,""===v&&(l.lastIndex=o(c,n(l.lastIndex),d)),p++}return 0===p?null:m}]}))},"510e":function(e,t,a){},ad8f:function(e,t,a){"use strict";a.d(t,"s",(function(){return i})),a.d(t,"m",(function(){return n})),a.d(t,"t",(function(){return l})),a.d(t,"c",(function(){return o})),a.d(t,"n",(function(){return s})),a.d(t,"a",(function(){return c})),a.d(t,"o",(function(){return d})),a.d(t,"b",(function(){return u})),a.d(t,"p",(function(){return m})),a.d(t,"d",(function(){return p})),a.d(t,"q",(function(){return v})),a.d(t,"e",(function(){return f})),a.d(t,"j",(function(){return b})),a.d(t,"h",(function(){return h})),a.d(t,"i",(function(){return _})),a.d(t,"k",(function(){return g})),a.d(t,"v",(function(){return y})),a.d(t,"u",(function(){return k})),a.d(t,"g",(function(){return F})),a.d(t,"r",(function(){return x})),a.d(t,"f",(function(){return w})),a.d(t,"l",(function(){return $})),a.d(t,"w",(function(){return z}));var r=a("b775");function i(e){return Object(r["a"])({url:"/devices/",method:"get",params:e})}function n(e){return Object(r["a"])({url:"/devices/"+e+"/",method:"delete"})}function l(e,t){return Object(r["a"])({url:"/devices/"+e+"/",method:"patch",data:t})}function o(e){return Object(r["a"])({url:"/devices/",method:"post",data:e})}function s(){return Object(r["a"])({url:"/area/",method:"get"})}function c(e){return Object(r["a"])({url:"/area/",method:"post",data:e})}function d(){return Object(r["a"])({url:"/devicebrand/",method:"get"})}function u(e){return Object(r["a"])({url:"/devicebrand/",method:"post",data:e})}function m(){return Object(r["a"])({url:"/devicetype/",method:"get"})}function p(e){return Object(r["a"])({url:"/devicetype/",method:"post",data:e})}function v(){return Object(r["a"])({url:"/deviceuser/",method:"get"})}function f(e){return Object(r["a"])({url:"/deviceuser/",method:"post",data:e})}function b(e){return Object(r["a"])({url:"/devicetype/"+e+"/",method:"delete"})}function h(e){return Object(r["a"])({url:"/area/"+e+"/",method:"delete"})}function _(e){return Object(r["a"])({url:"/devicebrand/"+e+"/",method:"delete"})}function g(e){return Object(r["a"])({url:"/deviceuser/"+e+"/",method:"delete"})}function y(e,t){return Object(r["a"])({url:"/deviceuser/"+e+"/",method:"patch",data:t})}function k(e,t){return Object(r["a"])({url:"/devicebrand/"+e+"/",method:"patch",data:t})}function F(e){return Object(r["a"])({url:"/autoconfig/",method:"post",data:e})}function x(){return Object(r["a"])({url:"/devicesgroup/",method:"get"})}function w(e){return Object(r["a"])({url:"/devicesgroup/",method:"post",data:e})}function $(e){return Object(r["a"])({url:"/devicesgroup/"+e+"/",method:"delete"})}function z(e,t){return Object(r["a"])({url:"/devicesgroup/"+e+"/",method:"patch",data:t})}},d6c4:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"设备",name:"iddevices"}},[a("el-input",{staticStyle:{width:"12%"},attrs:{placeholder:"搜索",size:"small"},on:{change:e.getDevicesList,input:e.getDevicesList},model:{value:e.params.search,callback:function(t){e.$set(e.params,"search",t)},expression:"params.search"}}),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"区域","default-first-option":"",size:"small"},on:{input:e.getDevicesList},model:{value:e.params.area_id,callback:function(t){e.$set(e.params,"area_id",t)},expression:"params.area_id"}},e._l(e.arealist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"设备厂商","default-first-option":"",size:"small"},on:{input:e.getDevicesList},model:{value:e.params.device_brand_id,callback:function(t){e.$set(e.params,"device_brand_id",t)},expression:"params.device_brand_id"}},e._l(e.brandlist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"设备类型","default-first-option":"",size:"small"},on:{input:e.getDevicesList},model:{value:e.params.device_type_id,callback:function(t){e.$set(e.params,"device_type_id",t)},expression:"params.device_type_id"}},e._l(e.devicetypelist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),a("el-button",{staticClass:"add-btn",attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(t){e.showSidebar=!0}}},[e._v("添加")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:"",border:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{fixed:"",prop:"area_name",label:"区域",width:"150",align:"center"}}),a("el-table-column",{attrs:{fixed:"",prop:"name",label:"设备名称",align:"center"}}),a("el-table-column",{attrs:{fixed:"",prop:"device_brand_name",label:"厂商",align:"center"}}),a("el-table-column",{attrs:{fixed:"",prop:"device_type_name",label:"设备类型",align:"center"}}),a("el-table-column",{attrs:{fixed:"",prop:"ip",label:"IP"}}),a("el-table-column",{attrs:{fixed:"",prop:"device_user_name",label:"管理账号"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",size:"small"},on:{click:function(a){return e.defdeviceForm(t.row)}}}),a("el-popover",{ref:"popover-"+t.$index,attrs:{trigger:"click",placement:"top"}},[a("p",[e._v("确认删除？")]),a("div",{staticStyle:{"text-align":"right","margin-top":"0"}},[a("el-button",{attrs:{size:"small",plain:""},on:{click:function(a){return e.cancelClick(t)}}},[e._v("取消")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.delteDevice(t)}}},[e._v("确定")])],1),a("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",circle:"",size:"small"},slot:"reference"})],1)]}}])})],1),a("el-pagination",{attrs:{"page-sizes":[5,10,50,100],"page-size":e.params.page_size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-tab-pane",{attrs:{label:"设备类型",name:"iddevicetype"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增设备类型",size:"small"},model:{value:e.adddevice_type_name,callback:function(t){e.adddevice_type_name=t},expression:"adddevice_type_name"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addDeviceType}}),a("el-table",{staticStyle:{width:"50%"},attrs:{data:e.devicetypelist,stripe:"",border:""}},[a("el-table-column",{attrs:{align:"center",fixed:"",prop:"id",label:"后台ID",width:"95"}}),a("el-table-column",{attrs:{fixed:"",prop:"name",label:"名称"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{ref:"popover1-"+t.$index,attrs:{trigger:"click",placement:"top"}},[a("p",[e._v("确认删除？")]),a("div",{staticStyle:{"text-align":"right","margin-top":"0"}},[a("el-button",{attrs:{size:"small",plain:""},on:{click:function(a){return e.cancelClick(t)}}},[e._v("取消")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleteDeviceType(t)}}},[e._v("确定")])],1),a("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",circle:"",size:"small"},slot:"reference"})],1)]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"设备厂商",name:"iddevicebrand"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增设备厂商",size:"small"},model:{value:e.addbrand_name,callback:function(t){e.addbrand_name=t},expression:"addbrand_name"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addBrand}}),a("el-table",{staticStyle:{width:"50%"},attrs:{data:e.brandlist,stripe:"",border:""}},[a("el-table-column",{attrs:{align:"center",fixed:"",prop:"id",label:"后台ID",width:"95"}}),a("el-table-column",{attrs:{fixed:"",prop:"name",label:"名称"}}),a("el-table-column",{attrs:{fixed:"",prop:"netmikotype",label:"Netmiko_Type"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",size:"small"},on:{click:function(a){return e.defdevicebrandForm(t.row)}}}),a("el-popover",{ref:"popover2-"+t.$index,attrs:{trigger:"click",placement:"top"}},[a("p",[e._v("确认删除？")]),a("div",{staticStyle:{"text-align":"right","margin-top":"0"}},[a("el-button",{attrs:{size:"small",plain:""},on:{click:function(a){return e.cancelClick(t)}}},[e._v("取消")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleteDeviceBrand(t)}}},[e._v("确定")])],1),a("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",circle:"",size:"small"},slot:"reference"})],1)]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"区域",name:"idarea"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增区域",size:"small"},model:{value:e.addarea_name,callback:function(t){e.addarea_name=t},expression:"addarea_name"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addArea}}),a("el-table",{staticStyle:{width:"50%"},attrs:{data:e.arealist,stripe:"",border:""}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增区域",size:"small"},model:{value:e.addarea_name,callback:function(t){e.addarea_name=t},expression:"addarea_name"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addArea}}),a("el-table-column",{attrs:{align:"center",fixed:"",prop:"id",label:"后台ID",width:"95"}}),a("el-table-column",{attrs:{fixed:"",prop:"name",label:"名称"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{ref:"popover3-"+t.$index,attrs:{trigger:"click",placement:"top"}},[a("p",[e._v("确认删除？")]),a("div",{staticStyle:{"text-align":"right","margin-top":"0"}},[a("el-button",{attrs:{size:"small",plain:""},on:{click:function(a){return e.cancelClick(t)}}},[e._v("取消")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleteArea(t)}}},[e._v("确定")])],1),a("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",circle:"",size:"small"},slot:"reference"})],1)]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"管理用户",name:"iddeviceuser"}},[a("el-button",{staticClass:"add-btn",attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(t){e.showAdduser=!0}}},[e._v("添加")]),a("el-table",{staticStyle:{width:"50%"},attrs:{data:e.deviceuser,stripe:"",border:""}},[a("el-table-column",{attrs:{align:"center",fixed:"",prop:"id",label:"后台ID",width:"95"}}),a("el-table-column",{attrs:{fixed:"",prop:"name",label:"名称"}}),a("el-table-column",{attrs:{fixed:"",prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",size:"small"},on:{click:function(a){return e.defuserForm(t.row)}}}),a("el-popover",{ref:"popover4-"+t.$index,attrs:{trigger:"click",placement:"top"}},[a("p",[e._v("确认删除？")]),a("div",{staticStyle:{"text-align":"right","margin-top":"0"}},[a("el-button",{attrs:{size:"small",plain:""},on:{click:function(a){return e.cancelClick(t)}}},[e._v("取消")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleteDeviceUser(t)}}},[e._v("确定")])],1),a("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",circle:"",size:"small"},slot:"reference"})],1)]}}])})],1)],1)],1),a("el-dialog",{attrs:{title:"修改",visible:e.visible,width:"30%"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"deviceForm",attrs:{model:e.deviceForm,"status-icon":""}},[a("el-form-item",{attrs:{label:"id",prop:"id"}},[a("el-input",{attrs:{type:"text",autocomplete:"off",disabled:""},model:{value:e.deviceForm.id,callback:function(t){e.$set(e.deviceForm,"id",t)},expression:"deviceForm.id"}})],1),a("el-form-item",{attrs:{label:"设备名",prop:"name",error:e.nameError}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},on:{blur:function(t){return e.validateName(e.deviceForm.name)}},model:{value:e.deviceForm.name,callback:function(t){e.$set(e.deviceForm,"name",t)},expression:"deviceForm.name"}})],1),a("el-form-item",{attrs:{label:"IP",prop:"ip",error:e.ipError}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},on:{blur:function(t){return e.validateIp(e.deviceForm.ip)}},model:{value:e.deviceForm.ip,callback:function(t){e.$set(e.deviceForm,"ip",t)},expression:"deviceForm.ip"}})],1),a("el-form-item",{attrs:{label:"设备类型",prop:"device_type_id"}},[a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.deviceForm.device_type_id,callback:function(t){e.$set(e.deviceForm,"device_type_id",t)},expression:"deviceForm.device_type_id"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增",size:"small"},model:{value:e.adddevice_type_name,callback:function(t){e.adddevice_type_name=t},expression:"adddevice_type_name"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addDeviceType}}),e._l(e.devicetypelist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1),a("el-form-item",{attrs:{label:"区域",prop:"area_id"}},[a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.deviceForm.area_id,callback:function(t){e.$set(e.deviceForm,"area_id",t)},expression:"deviceForm.area_id"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增",size:"small"},model:{value:e.addarea_name,callback:function(t){e.addarea_name=t},expression:"addarea_name"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addArea}}),e._l(e.arealist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1),a("el-form-item",{attrs:{label:"厂商",prop:"device_brand_id"}},[a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.deviceForm.device_brand_id,callback:function(t){e.$set(e.deviceForm,"device_brand_id",t)},expression:"deviceForm.device_brand_id"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增",size:"small"},model:{value:e.addbrand_name,callback:function(t){e.addbrand_name=t},expression:"addbrand_name"}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addBrand}}),e._l(e.brandlist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1),a("el-form-item",{attrs:{label:"管理用户",prop:"device_user_id"}},[a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.deviceForm.device_user_id,callback:function(t){e.$set(e.deviceForm,"device_user_id",t)},expression:"deviceForm.device_user_id"}},e._l(e.deviceuser,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",disabled:!e.isValidIpAddress||e.nameError||e.ipError},on:{click:function(t){e.updateDevice(),e.visible=!1}}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"新增设备",visible:e.showSidebar,width:"30%"},on:{"update:visible":function(t){e.showSidebar=t}}},[a("el-form",{ref:"adddeviceForm",staticClass:"demo-adddeviceForm",attrs:{model:e.adddeviceForm,"status-icon":""}},[a("el-form-item",{attrs:{label:"设备名",prop:"name",error:e.nameError}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("el-input",{attrs:{type:"text",autocomplete:"off"},on:{blur:function(t){return e.validateName(e.adddeviceForm.name)}},model:{value:e.adddeviceForm.name,callback:function(t){e.$set(e.adddeviceForm,"name",t)},expression:" adddeviceForm.name "}})],1),a("el-form-item",{attrs:{label:"IP",prop:"ip",error:e.ipError}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("el-input",{attrs:{type:"text",autocomplete:"off"},on:{blur:function(t){return e.validateIp(e.adddeviceForm.ip)}},model:{value:e.adddeviceForm.ip,callback:function(t){e.$set(e.adddeviceForm,"ip",t)},expression:" adddeviceForm.ip "}})],1),a("el-form-item",{attrs:{label:"区域",prop:"area_id"}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.adddeviceForm.area_id,callback:function(t){e.$set(e.adddeviceForm,"area_id",t)},expression:" adddeviceForm.area_id "}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增",size:"small"},model:{value:e.addarea_name,callback:function(t){e.addarea_name=t},expression:" addarea_name "}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addArea}}),e._l(e.arealist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1),a("el-form-item",{attrs:{label:"设备类型",prop:"device_type_id"}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.adddeviceForm.device_type_id,callback:function(t){e.$set(e.adddeviceForm,"device_type_id",t)},expression:" adddeviceForm.device_type_id "}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增",size:"small"},model:{value:e.adddevice_type_name,callback:function(t){e.adddevice_type_name=t},expression:" adddevice_type_name "}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addDeviceType}}),e._l(e.devicetypelist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1),a("el-form-item",{attrs:{label:"厂商",prop:"device_brand_id"}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.adddeviceForm.device_brand_id,callback:function(t){e.$set(e.adddeviceForm,"device_brand_id",t)},expression:" adddeviceForm.device_brand_id "}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增",size:"small"},model:{value:e.addbrand_name,callback:function(t){e.addbrand_name=t},expression:" addbrand_name "}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addBrand}}),e._l(e.brandlist,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1),a("el-form-item",{attrs:{label:"管理用户",prop:"device_user_id"}},[a("br"),a("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.adddeviceForm.device_user_id,callback:function(t){e.$set(e.adddeviceForm,"device_user_id",t)},expression:" adddeviceForm.device_user_id "}},[a("el-input",{staticStyle:{width:"170px"},attrs:{placeholder:"新增",size:"small"},model:{value:e.addbrand_name,callback:function(t){e.addbrand_name=t},expression:" addbrand_name "}}),a("el-button",{attrs:{type:"success",icon:"el-icon-check",circle:"",size:"mini"},on:{click:e.addBrand}}),e._l(e.deviceuser,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],2)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.showSidebar=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",disabled:e.nameError||e.ipError},on:{click:function(t){e.addDevice(),e.showSidebar=!1}}},[e._v("确 定")]),a("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1),a("el-dialog",{attrs:{title:"新增用户",visible:e.showAdduser,width:"30%"},on:{"update:visible":function(t){e.showAdduser=t}}},[a("el-form",{ref:"adduserForm",staticClass:"demo-adddeviceForm",attrs:{model:e.adduserForm,"status-icon":""}},[a("el-form-item",{attrs:{label:"名称",prop:"name",error:e.nameError}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("el-input",{attrs:{type:"text",autocomplete:"off"},on:{blur:function(t){return e.validateName(e.adduserForm.name)}},model:{value:e.adduserForm.name,callback:function(t){e.$set(e.adduserForm,"name",t)},expression:" adduserForm.name "}})],1),a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.adduserForm.username,callback:function(t){e.$set(e.adduserForm,"username",t)},expression:" adduserForm.username "}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.adduserForm.password,callback:function(t){e.$set(e.adduserForm,"password",t)},expression:" adduserForm.password "}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.showAdduser=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",disabled:e.nameError},on:{click:function(t){e.addDeviceUser(),e.showAdduser=!1}}},[e._v("确 定")]),a("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1),a("el-dialog",{attrs:{title:"用户编辑",visible:e.showEdituser,width:"30%"},on:{"update:visible":function(t){e.showEdituser=t}}},[a("el-form",{ref:"userForm",staticClass:"demo-adddeviceForm",attrs:{model:e.userForm,"status-icon":""}},[a("el-form-item",{attrs:{label:"名称",prop:"name",error:e.nameError}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("el-input",{attrs:{type:"text",autocomplete:"off"},on:{blur:function(t){return e.validateName(e.userForm.name)}},model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:" userForm.name "}})],1),a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.userForm.username,callback:function(t){e.$set(e.userForm,"username",t)},expression:" userForm.username "}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.userForm.password,callback:function(t){e.$set(e.userForm,"password",t)},expression:" userForm.password "}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.showEdituser=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",disabled:e.nameError},on:{click:function(t){e.updateDeviceUser(),e.showEdituser=!1}}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"厂商编辑",visible:e.showEditdevicebrand,width:"30%"},on:{"update:visible":function(t){e.showEditdevicebrand=t}}},[a("el-form",{ref:"devicebrandForm",staticClass:"demo-adddeviceForm",attrs:{model:e.userForm,"status-icon":""}},[a("el-form-item",{attrs:{label:"名称",error:e.nameError}},[a("span",{staticStyle:{color:"red","font-size":"larger"}},[e._v("*")]),a("el-input",{attrs:{type:"text",autocomplete:"off"},on:{blur:function(t){return e.validateName(e.devicebrandForm.name)}},model:{value:e.devicebrandForm.name,callback:function(t){e.$set(e.devicebrandForm,"name",t)},expression:" devicebrandForm.name "}})],1),a("el-form-item",{attrs:{label:"Netmiko_Type"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.devicebrandForm.netmikotype,callback:function(t){e.$set(e.devicebrandForm,"netmikotype",t)},expression:" devicebrandForm.netmikotype "}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.showEditdevicebrand=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",disabled:e.nameError},on:{click:function(t){e.updateDeviceBrand(),e.showEditdevicebrand=!1}}},[e._v("确 定")])],1)],1)],1)},i=[],n=(a("ac1f"),a("466d"),a("d3b7"),a("00b4"),a("ad8f")),l={data:function(){return{devicetypelist:"",deviceuser:[],activeName:"iddevices",nameError:null,ipError:null,tableData:[],arealist:[],brandlist:[],varea:"",addarea_name:"",addbrand_name:"",adddevice_type_name:"",visible:!1,showAdduser:!1,showEdituser:!1,showSidebar:!1,showEditdevicebrand:!1,dialogVisible:!1,deviceForm:{name:"",ip:"",area_id:"",device_brand_id:"",device_type_id:"",device_user_id:""},adddeviceForm:{name:"",ip:"",area_id:"",device_brand_id:"",device_type_id:"",device_user_id:""},adduserForm:{name:"",username:"",password:""},userForm:{name:"",username:"",password:""},devicebrandForm:{name:"",netmikotype:""},params:{page:1,page_size:10,search:""},total:0,isAllSelected:!1,selectedRows:[]}},created:function(){this.getDevicesList(),this.getAreaList(),this.getBrandList(),this.getDeviceUser(),this.getDeviceTypeList()},computed:{isValidIpAddress:function(){var e=/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/;return null!==this.deviceForm.ip.match(e)}},methods:{defdeviceForm:function(e){this.visible=!0,this.deviceForm=Object.assign({},e),this.nameError=null,this.ipError=null},defuserForm:function(e){this.showEdituser=!0,this.userForm=Object.assign({},e),this.nameError=null},defdevicebrandForm:function(e){this.showEditdevicebrand=!0,this.devicebrandForm=Object.assign({},e),this.nameError=null},getDevicesList:function(){var e=this;Object(n["s"])(this.params).then((function(t){e.tableData=t.data.results,e.total=t.data.count}))},getAreaList:function(){var e=this;return Object(n["n"])(this.params).then((function(t){return e.arealist=t.data,t}))},getBrandList:function(){var e=this;return Object(n["o"])(this.params).then((function(t){return e.brandlist=t.data,t}))},getDeviceUser:function(){var e=this;Object(n["q"])().then((function(t){e.deviceuser=t.data}))},getDeviceTypeList:function(){var e=this;return Object(n["p"])().then((function(t){return e.devicetypelist=t.data,t}))},delteDevice:function(e){var t=this;Object(n["m"])(e.row.id).then((function(e){t.getDevicesList(),t.$message({message:"删除成功",type:"success"})})),e._self.$refs["popover-".concat(e.$index)].doClose()},deleteArea:function(e){var t=this;Object(n["h"])(e.row.id).then((function(){return t.getAreaList()})).then((function(a){var r=a.data,i=!r.some((function(t){return t.id===e.row.id}));i?t.$message({message:"删除成功",type:"success"}):t.$message({message:"删除失败，该区域已被调用",type:"warning"}),e._self.$refs["popover1-".concat(e.$index)].doClose()}))},deleteDeviceBrand:function(e){var t=this;Object(n["i"])(e.row.id).then((function(){return t.getBrandList()})).then((function(a){var r=a.data,i=!r.some((function(t){return t.id===e.row.id}));i?t.$message({message:"删除成功",type:"success"}):t.$message({message:"删除失败，该厂商已被调用",type:"warning"}),e._self.$refs["popover1-".concat(e.$index)].doClose()}))},deleteDeviceType:function(e){var t=this;Object(n["j"])(e.row.id).then((function(){return t.getDeviceTypeList()})).then((function(a){var r=a.data,i=!r.some((function(t){return t.id===e.row.id}));i?t.$message({message:"删除成功",type:"success"}):t.$message({message:"删除失败，该类型已被关联",type:"warning"}),e._self.$refs["popover1-".concat(e.$index)].doClose()}))},deleteDeviceUser:function(e){var t=this;Object(n["k"])(e.row.id).then((function(e){t.getDeviceUser(),t.$message({message:"删除成功",type:"success"})})),e._self.$refs["popover4-".concat(e.$index)].doClose()},updateDevice:function(){var e=this,t=this.deviceForm.id;Object(n["t"])(t,this.deviceForm).then((function(t){e.getDevicesList(),e.$message({message:"修改成功",type:"success"})}))},updateDeviceUser:function(){var e=this,t=this.userForm.id;Object(n["v"])(t,this.userForm).then((function(t){e.getDeviceUser(),e.$message({message:"修改成功",type:"success"})}))},updateDeviceBrand:function(){var e=this,t=this.devicebrandForm.id;Object(n["u"])(t,this.devicebrandForm).then((function(t){e.getBrandList(),e.$message({message:"修改成功",type:"success"})}))},addDevice:function(){var e=this;Object(n["c"])(this.adddeviceForm).then((function(t){e.getDevicesList(),e.$message({message:"添加成功",type:"success"})}))},addDeviceUser:function(){var e=this;Object(n["e"])(this.adduserForm).then((function(t){e.getDeviceUser(),e.$message({message:"添加成功",type:"success"})}))},addArea:function(){var e=this,t={name:this.addarea_name};Object(n["a"])(t).then((function(t){e.getAreaList(),e.$message({message:"区域添加成功",type:"success"})}))},addBrand:function(){var e=this,t={name:this.addbrand_name};Object(n["b"])(t).then((function(t){e.getBrandList(),e.$message({message:"区域添加成功",type:"success"})}))},addDeviceType:function(){var e=this,t={name:this.adddevice_type_name};Object(n["d"])(t).then((function(t){e.getDeviceTypeList(),e.$message({message:"设备类型添加成功",type:"success"})}))},cancelClick:function(e){this.$message("取消"),e._self.$refs["popover-".concat(e.$index)].doClose(),e._self.$refs["popover1-".concat(e.$index)].doClose(),e._self.$refs["popover2-".concat(e.$index)].doClose(),e._self.$refs["popover3-".concat(e.$index)].doClose(),e._self.$refs["popover4-".concat(e.$index)].doClose()},handleSizeChange:function(e){this.params.page_size=e,this.getDevicesList()},handleCurrentChange:function(e){this.params.page=e,this.getDevicesList()},handleSelectionChange:function(e){this.isAllSelected=e.length===this.tableData.length,this.selectedRows=e},handleClick:function(e,t){},resetForm:function(){this.$refs.adddeviceForm.resetFields(),this.$refs.adduserForm.resetFields()},validateName:function(e){this.nameError=e?null:"请输入名称"},validateIp:function(e){e?/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(e)?this.ipError=null:this.ipError="请输入正确的IP地址格式":this.ipError="请输入IP地址"}}},o=l,s=(a("f0e8"),a("2877")),c=Object(s["a"])(o,r,i,!1,null,null,null);t["default"]=c.exports},f0e8:function(e,t,a){"use strict";a("510e")}}]);