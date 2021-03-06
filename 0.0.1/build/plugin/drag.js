//! Copyright 2015, kissy-gallery-component@0.0.1 MIT Licensed, build time: Fri, 06 Feb 2015 03:49:55 GMT 
define("kg/component/0.0.1/plugin/drag", ["kg/dd/0.0.1/index"], function(require, exports, module) {
var dd = require("kg/dd/0.0.1/index");
/*
combined modules:
component/plugin/drag
*/
var componentPluginDrag;
componentPluginDrag = function (exports) {
  /**
   * @ignore
   * drag plugin for kissy component
   * @author yiminghe@gmail.com
   */
  var DD = dd;
  function onDragEnd() {
    var component = this.component;
    var offset = component.$el.offset();
    component.setInternal('xy', [
      offset.left,
      offset.top
    ]);
  }
  /**
   * drag plugin for kissy component
   *
   *      @example
   *      KISY.use('overlay,component/plugin/drag,dd/plugin/proxy',
   *      function(S,Overlay,DragPlugin,ProxyPlugin){
       *        var o =new Overlay.Dialog({
       *          plugins:[
       *              new DragPlugin({
       *                  handles: [function(){ return o.get('header'); }],
       *                  plugins: [ProxyPlugin]
       *              })
       *          ]
       *        })
       *        // or
       *        o.plug(new DragPlugin({
       *          handles:[function(){ return o.get('header'); }]
       *        });
       *      });
   *
   *
   * @class KISSY.Component.Plugin.Drag
   * @extends KISSY.DD.Draggable
   */
  exports = DD.Draggable.extend({
    pluginId: 'component/plugin/drag',
    pluginBindUI: function (component) {
      this.set('node', component.$el);
      this.start();
      this.component = component;
      this.on('dragend', onDragEnd);
    },
    pluginDestructor: function () {
      this.destroy();
    }
  }, {
    ATTRS: {
      move: { value: 1 },
      groups: { value: false }
    }
  });
  return exports;
}();
module.exports = componentPluginDrag;
});