//! Copyright 2015, kissy-gallery-component@0.0.1 MIT Licensed, build time: Fri, 06 Feb 2015 03:48:10 GMT 
define("kg/component/0.0.1/plugin/resize", ["kg/resizable/0.0.1/"], function(require, exports, module) {
var resizable = require("kg/resizable/0.0.1/");
/*
combined modules:
component/plugin/resize
*/
var componentPluginResize;
componentPluginResize = function (exports) {
  /**
   * @ignore
   * resize plugin for kissy component
   * @author yiminghe@gmail.com
   */
  var Resizable = resizable;
  /**
   * resize plugin for kissy component
   *
   *      @example
   *      var o =new Overlay.Dialog({
       *          plugins:[
       *              new ResizePlugin({
       *                  handles: ['t','tr']
       *              })
       *          ]
       *      })
   *      // or
   *      o.plug(new ResizePlugin({
       *          handles: ['t','tr']
       *      });
   *
   *
   * @class KISSY.Component.Plugin.Resize
   * @extends KISSY.Resizable
   */
  exports = Resizable.extend({
    pluginBindUI: function (component) {
      var $el = component.$el, self = this;
      self.set('node', $el);
      self.set('prefixCls', component.get('prefixCls'));
      self.on('resizeEnd', function () {
        var offset = $el.offset();
        component.setInternal('xy', [
          offset.left,
          offset.top
        ]);
        component.setInternal('width', $el.width());
        component.setInternal('height', $el.height());
      });
    },
    pluginDestructor: function () {
      this.destroy();
    }
  });
  return exports;
}();
module.exports = componentPluginResize;
});