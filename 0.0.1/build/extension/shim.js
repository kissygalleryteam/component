//! Copyright 2015, kissy-gallery-component@0.0.1 MIT Licensed, build time: Fri, 06 Feb 2015 03:49:55 GMT 
define("kg/component/0.0.1/extension/shim", ["ua"], function(require, exports, module) {
var ua = require("ua");
/*
combined modules:
component/extension/shim
*/
var componentExtensionShim;
componentExtensionShim = function (exports) {
  /**
   * @ignore
   * create iframe shim for flash/select/office plugin
   * @author yiminghe@gmail.com
   */
  var UA = ua;
  var ie6 = UA.ie === 6;
  var shimTpl = '<' + 'iframe style="position: absolute;' + 'border: none;' + // consider border
  // bug fix: 2012-11-07
  'width: ' + (ie6 ? 'expression(this.parentNode.clientWidth)' : '100%') + ';' + 'top: 0;' + 'opacity: 0;' + 'filter: alpha(opacity=0);' + 'left: 0;' + 'z-index: -1;' + 'height: ' + (ie6 ? 'expression(this.parentNode.clientHeight)' : '100%') + ';' + '"/>';
  /**
   * create iframe shim for mixin.
   * @class KISSY.Component.Extension.Shim
   */
  function Shim() {
  }
  Shim.ATTRS = {
    /**
     * whether create shim
     * @cfg {Boolean} shim
     */
    /**
     * @ignore
     */
    shim: {
      // default shim for ie6
      // prevent select coming out of div
      value: ie6
    }
  };
  Shim.prototype.__createDom = function () {
    if (this.get('shim')) {
      this.get('el').prepend(shimTpl);
    }
  };
  exports = Shim;
  return exports;
}();
module.exports = componentExtensionShim;
});