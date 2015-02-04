define("kg/component/0.0.1/extension/align",["util","node","ua"],function(t,e,i){var o,n=t("util"),h=t("node"),r=t("ua");o=function(t){function e(t){var e,i=t.ownerDocument,o=i.body,n=j(t).css("position"),h="fixed"===n||"absolute"===n;if(!h)return"html"===t.nodeName.toLowerCase()?null:t.parentNode;for(e=t.parentNode;e&&e!==o;e=e.parentNode)if(n=j(e).css("position"),"static"!==n)return e;return null}function i(t){var i,o,n,h,r={left:0,right:1/0,top:0,bottom:1/0},l=t.ownerDocument,f=j(l).getWindow(),a=l.body,u=l.documentElement;for(i=t;i=e(i);)if((!x.ie||0!==i.clientWidth)&&i!==a&&i!==u&&"visible"!==j(i).css("overflow")){var s=j(i).offset();s.left+=i.clientLeft,s.top+=i.clientTop,r.top=Math.max(r.top,s.top),r.right=Math.min(r.right,s.left+i.clientWidth),r.bottom=Math.min(r.bottom,s.top+i.clientHeight),r.left=Math.max(r.left,s.left)}return o=f.scrollLeft(),n=f.scrollTop(),r.left=Math.max(r.left,o),r.top=Math.max(r.top,n),h={width:f.width(),height:f.height()},r.right=Math.min(r.right,o+h.width),r.bottom=Math.min(r.bottom,n+h.height),r.top>=0&&r.left>=0&&r.bottom>r.top&&r.right>r.left?r:null}function o(t,e,i,o){var n,h,r,l;return n={left:t.left,top:t.top},r=g(e,i[0]),l=g(t,i[1]),h=[l.left-r.left,l.top-r.top],{left:n.left-h[0]+ +o[0],top:n.top-h[1]+ +o[1]}}function l(t,e,i){return t.left<i.left||t.left+e.width>i.right}function f(t,e,i){return t.top<i.top||t.top+e.height>i.bottom}function a(t,e,i,o){var n=b.clone(t),h={width:e.width,height:e.height};return o.adjustX&&n.left<i.left&&(n.left=i.left),o.resizeWidth&&n.left>=i.left&&n.left+h.width>i.right&&(h.width-=n.left+h.width-i.right),o.adjustX&&n.left+h.width>i.right&&(n.left=Math.max(i.right-h.width,i.left)),o.adjustY&&n.top<i.top&&(n.top=i.top),o.resizeHeight&&n.top>=i.top&&n.top+h.height>i.bottom&&(h.height-=n.top+h.height-i.bottom),o.adjustY&&n.top+h.height>i.bottom&&(n.top=Math.max(i.bottom-h.height,i.top)),b.mix(n,h)}function u(t,e,i){var o=[];return b.each(t,function(t){o.push(t.replace(e,function(t){return i[t]}))}),o}function s(t,e){return t[e]=-t[e],t}function c(){}function d(t){var e,i,o,n=t[0];if(b.isWindow(n)){var h=j(n).getWindow();e={left:h.scrollLeft(),top:h.scrollTop()},i=h.width(),o=h.height()}else e=t.offset(),i=t.outerWidth(),o=t.outerHeight();return e.width=i,e.height=o,e}function g(t,e){var i,o,n=e.charAt(0),h=e.charAt(1),r=t.width,l=t.height;return i=t.left,o=t.top,"c"===n?o+=l/2:"b"===n&&(o+=l),"c"===h?i+=r/2:"r"===h&&(i+=r),{left:i,top:o}}function p(t){t.target===this&&t.newVal&&m.call(this)}function w(){this.get("visible")&&m.call(this)}function m(){this._onSetAlign(this.get("align"))}var b=n,v=window,j=h,x=r;return c.__getOffsetParent=e,c.__getVisibleRectForElement=i,c.ATTRS={align:{valueFn:function(){return{}}}},c.prototype={__bindUI:function(){var t=this;t.on("beforeVisibleChange",p,t),t.$el.getWindow().on("resize",w,t)},_onSetAlign:function(t){t&&t.points&&this.align(t.node,t.points,t.offset,t.overflow)},align:function(t,e,n,h){t=j(t||v),n=n&&[].concat(n)||[0,0],h=h||{};var r=this,c=r.$el,g=0,p=i(c[0]),w=d(c),m=d(t),x=o(w,m,e,n),M=b.merge(w,x);if(p&&(h.adjustX||h.adjustY)){l(x,w,p)&&(g=1,e=u(e,/[lr]/gi,{l:"r",r:"l"}),n=s(n,0)),f(x,w,p)&&(g=1,e=u(e,/[tb]/gi,{t:"b",b:"t"}),n=s(n,1)),g&&(x=o(w,m,e,n),b.mix(M,x));var _={};_.adjustX=h.adjustX&&l(x,w,p),_.adjustY=h.adjustY&&f(x,w,p),(_.adjustX||_.adjustY)&&(M=a(x,w,p,_))}return r.set({x:M.left,y:M.top},{force:1}),M.width!==w.width&&r.set("width",c.width()+M.width-w.width),M.height!==w.height&&r.set("height",c.height()+M.height-w.height),r},center:function(t){var e=this;return e.set("align",{node:t,points:["cc","cc"],offset:[0,0]}),e},__destructor:function(){var t=this;t.$el&&t.$el.getWindow().detach("resize",w,t)}},t=c}(),i.exports=o});