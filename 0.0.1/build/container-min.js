//! Copyright 2015, kissy-gallery-component@0.0.1 MIT Licensed, build time: Fri, 06 Feb 2015 03:48:10 GMT 
define("kg/component/0.0.1/container",["util","kg/component/0.0.1/control"],function(e,n,t){var r,i=e("util"),o=e("kg/component/0.0.1/control");r=function(e){function n(e){var n=this,t=e.component,r=n.get("children"),i=e.index;r.splice(i,0,t),r=n.get("children"),t=r[i],t.setInternal&&t.setInternal("parent",n),n.get("rendered")&&n.renderChild(i),n.fire("afterAddChild",{component:t,index:i})}function t(e){var n=this,t=e.component,r=e.destroy,i=n.get("children"),o=e.index;-1!==o&&i.splice(o,1),t.setInternal&&t.setInternal("parent",null),t.destroy?t.destroy(r):t.isNode&&r&&t.remove(),n.fire("afterRemoveChild",{component:t,index:o})}var r=i,d=o,l=d.Manager;return e=d.extend({isContainer:!0,initializer:function(){var e=this,r=e.get("prefixCls"),i=e.get("defaultChildCfg");e.publish("beforeAddChild",{defaultFn:n,defaultTargetOnly:!0}),e.publish("beforeRemoveChild",{defaultFn:t,defaultTargetOnly:!0}),i.prefixCls=i.prefixCls||r},decorateDom:function(){var e=this,n=e.getChildrenContainerEl(),t=e.get("defaultChildCfg"),i=t.prefixCls,o=t.xclass,d=[],h=n.children();h.each(function(n){var h=e.getComponentConstructorByNode(i,n)||o&&l.getConstructorByXClass(o);h?d.push(new h(r.merge(t,{srcNode:n}))):d.push(n)}),e.set("children",d)},createDom:function(){this.createChildren()},renderUI:function(){this.renderChildren()},renderChildren:function(){var e,n=this,t=n.get("children");for(e=0;e<t.length;e++)n.renderChild(e)},createChildren:function(){var e,n=this,t=n.get("children");for(e=0;e<t.length;e++)n.createChild(e)},addChild:function(e,n){var t=this,r=t.get("children");return void 0===n&&(n=r.length),t.fire("beforeAddChild",{component:e,index:n}),r[n]},renderChild:function(e){var n=this,t=n.get("children"),r=n.createChild(e);r.isNode||r.render(),n.fire("afterRenderChild",{component:t[e],index:e})},createChild:function(e){var n,t,r,i,o,d=this,l=d.get("children");return n=l[e],o=d.getChildrenContainerEl(),r=o[0],t=r.children[e]||null,n.isNode?(i=n.isNode?n[0]:n.el,i.parentNode!==r&&r.insertBefore(i,t)):n.get("rendered")?(i=n.isNode?n[0]:n.el,i.parentNode!==r&&r.insertBefore(i,t)):(t?n.set("elBefore",t):n.set("render",o),n.create()),d.fire("afterCreateChild",{component:n,index:e}),n},addChildren:function(e){var n,t=e.length;for(n=0;t>n;n++)this.addChild(e[n])},removeChild:function(e,n){void 0===n&&(n=!0),this.fire("beforeRemoveChild",{component:e,index:r.indexOf(e,this.get("children")),destroy:n})},removeChildren:function(e){var n,t=this,r=[].concat(t.get("children"));for(n=0;n<r.length;n++)t.removeChild(r[n],!1);return e!==!1&&t.$el&&(t.getChildrenContainerEl()[0].innerHTML=""),t},getChildAt:function(e){var n=this.get("children");return n[e]||null},getChildrenContainerEl:function(){return this.$el},destructor:function(e){this.removeChildren(e)}},{ATTRS:{children:{valueFn:function(){return[]},getter:function(e){var n,t,i=null,o=this;for(n=0;n<e.length;n++)t=e[n],t.isControl||t.isNode||(i=i||o.get("defaultChildCfg"),r.mix(t,i,!1),e[n]=this.createComponent(t));return e},setter:function(e){var n,t;for(n=0;n<e.length;n++)t=e[n],t.isControl&&t.setInternal("parent",this)}},defaultChildCfg:{valueFn:function(){return{}}}},name:"container"})}(),t.exports=r});