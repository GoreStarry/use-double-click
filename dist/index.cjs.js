'use strict';

var react = require('react');

var noop = function noop() {
  return null;
};
/**
 * A simple React hook for differentiating single and double clicks on the same component.
 *
 * @param {node} ref Dom node to watch for double clicks
 * @param {number} [latency=300] The amount of time (in milliseconds) to wait before differentiating a single from a double click
 * @param {function} onSingleClick A callback function for single click events
 * @param {function} onDoubleClick A callback function for double click events
 */


var useDoubleClick = function useDoubleClick(_ref) {
  var ref = _ref.ref,
      _ref$latency = _ref.latency,
      latency = _ref$latency === void 0 ? 300 : _ref$latency,
      _ref$onSingleClick = _ref.onSingleClick,
      onSingleClick = _ref$onSingleClick === void 0 ? noop : _ref$onSingleClick,
      _ref$onDoubleClick = _ref.onDoubleClick,
      onDoubleClick = _ref$onDoubleClick === void 0 ? noop : _ref$onDoubleClick;
  react.useEffect(function () {
    var clickRef = ref.current;
    var clickCount = 0;

    var handleClick = function handleClick(e) {
      clickCount += 1;
      setTimeout(function () {
        if (clickCount === 1) onSingleClick(e);else if (clickCount === 2) onDoubleClick(e);
        clickCount = 0;
      }, latency);
    }; // Add event listener for click events


    clickRef.addEventListener('click', handleClick); // Remove event listener

    return function () {
      clickRef.removeEventListener('click', handleClick);
    };
  }, [latency, onDoubleClick, onSingleClick, ref]);
};

module.exports = useDoubleClick;
//# sourceMappingURL=index.cjs.js.map
