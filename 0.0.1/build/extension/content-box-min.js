define("kg/component/0.0.1/extension/content-box",["kg/xtemplate/4.1.4/runtime"],function(t,n,e){var o,r,a,c=t("kg/xtemplate/4.1.4/runtime");o=function(t){var n=t=function(t){{var n,e=this,o=e.root,r=e.buffer,a=e.scope,c=(e.runtime,e.name,e.pos),i=a.data,s=a.affix,l=o.nativeCommands,u=o.utils,f=u.callFn;u.callCommand,l.range,l.foreach,l.forin,l.each,l["with"],l["if"],l.set,l.include,l.parse,l.extend,l.block,l.macro,l["debugger"]}r.data+='<div class="',c.line=1;var m;m=f(e,a,{escape:1,params:["content"]},r,["getBaseCssClasses"]),r=r.writeEscaped(m),r.data+='">';var d=(n=s.content)!==t?n:(n=i.content)!==t?n:a.resolveLooseUp(["content"]);return r=r.write(d),r.data+="</div>",r};return n.TPL_NAME=e.id||e.name,t}(),r=function(t){var n=o,e=c,r=new e(n);return t=function(){return r.render.apply(r,arguments)}}(),a=function(t){function n(t){var n=t.get("contentEl");t.$contentEl=t.$contentEl=n,t.contentEl=t.contentEl=n&&n[0]}function e(){}var o=r;return e.prototype={__createDom:function(){n(this)},__decorateDom:function(){n(this)},getChildrenContainerEl:function(){return this.get("contentEl")},_onSetContent:function(t){var n=this.$contentEl;n.html(t),this.get("allowTextSelection")||n.unselectable()}},e.ATTRS={contentTpl:{value:o},contentEl:{selector:function(){return"."+this.getBaseCssClass("content")}},content:{parse:function(){return this.get("contentEl").html()}}},t=e}(),e.exports=a});