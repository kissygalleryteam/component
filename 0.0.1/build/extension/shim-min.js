//! Copyright 2015, kissy-gallery-component@0.0.1 MIT Licensed, build time: Fri, 06 Feb 2015 03:49:55 GMT 
define("kg/component/0.0.1/extension/shim",["ua"],function(e,t,i){var n,o=e("ua");n=function(e){function t(){}var i=o,n=6===i.ie,r='<iframe style="position: absolute;border: none;width: '+(n?"expression(this.parentNode.clientWidth)":"100%")+";top: 0;opacity: 0;filter: alpha(opacity=0);left: 0;z-index: -1;height: "+(n?"expression(this.parentNode.clientHeight)":"100%")+';"/>';return t.ATTRS={shim:{value:n}},t.prototype.__createDom=function(){this.get("shim")&&this.get("el").prepend(r)},e=t}(),i.exports=n});