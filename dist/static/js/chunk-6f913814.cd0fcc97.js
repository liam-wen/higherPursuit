(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f913814"],{"3fa5":function(e,t,n){"use strict";n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return c}));var o=n("5c96");function s(e){Object(o["Message"])({type:"success",duration:3e3,message:e})}function r(e){Object(o["Message"])({type:"info",duration:3e3,message:e})}function a(e){Object(o["Message"])({type:"error",duration:3e3,message:e})}function i(e){return Object(o["MessageBox"])({title:"提示",message:e})}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"确定执行此操作吗？",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";return o["MessageBox"].confirm(e,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:t,center:!0})}},4565:function(e,t,n){"use strict";var o=n("b195"),s=n.n(o);s.a},b195:function(e,t,n){},c245:function(e,t,n){"use strict";var o=n("dc4d"),s=n.n(o);s.a},d5c2:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[e._v("注册")])]),e._v(" "),n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),n("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),n("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),n("el-button",{staticStyle:{width:"48%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("去登录")]),e._v(" "),n("el-button",{staticStyle:{width:"48%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},on:{click:e.handleRegister}},[e._v("注册")])],1)],1)},s=[],r=n("61f7"),a=n("3fa5"),i={name:"Login",data:function(){var e=function(e,t,n){Object(r["b"])(t),n()},t=function(e,t,n){t.length<6?n(new Error("The password can not be less than 6 digits")):n()};return{loginForm:{username:"admin",password:"111111"},loginRules:{username:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){console.log("11"),this.$router.push({path:"/login"})},handleRegister:function(){var e=this;console.log(this),this.$refs.loginForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0;var n=e.loginForm;e.Axios.put("/auth/register",n).then((function(t){e.loading=!1,Object(a["a"])("注册成功").then((function(){e.$router.push({path:"/login"})}))})).catch((function(t){e.loading=!1,Object(a["c"])(t.data)}))}))}}},c=i,l=(n("4565"),n("c245"),n("2877")),u=Object(l["a"])(c,o,s,!1,null,"0469a52c",null);t["default"]=u.exports},dc4d:function(e,t,n){}}]);