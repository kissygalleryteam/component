//! Copyright 2015, kissy-gallery-component@0.0.1 MIT Licensed, build time: Fri, 06 Feb 2015 03:48:10 GMT 
define("kg/component/0.0.1/plugin/resize",["kg/resizable/0.0.1/"],function(e,t,n){var i,r=e("kg/resizable/0.0.1/");i=function(e){var t=r;return e=t.extend({pluginBindUI:function(e){var t=e.$el,n=this;n.set("node",t),n.set("prefixCls",e.get("prefixCls")),n.on("resizeEnd",function(){var n=t.offset();e.setInternal("xy",[n.left,n.top]),e.setInternal("width",t.width()),e.setInternal("height",t.height())})},pluginDestructor:function(){this.destroy()}})}(),n.exports=i});