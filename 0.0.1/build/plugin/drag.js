/*
Copyright 2015, modulex-component@1.0.4
MIT Licensed
build time: Wed, 04 Feb 2015 09:39:48 GMT
*/
define("kg/component/0.0.1/plugin/drag", ["dd"], function(require, exports, module) {
var dd = require("dd");
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