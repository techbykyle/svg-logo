"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Apple = _interopRequireDefault(require("./Logo/Apple"));
var _Google = _interopRequireDefault(require("./Logo/Google"));
var _Amazon = _interopRequireDefault(require("./Logo/Amazon"));
var _HomeAssistant = _interopRequireDefault(require("./Logo/HomeAssistant"));
var _HomeDepot = _interopRequireDefault(require("./Logo/HomeDepot"));
var _Microsoft = _interopRequireDefault(require("./Logo/Microsoft"));
var _NewEgg = _interopRequireDefault(require("./Logo/NewEgg"));
var _Samsung = _interopRequireDefault(require("./Logo/Samsung"));
var _Shelly = _interopRequireDefault(require("./Logo/Shelly"));
var _Aqara = _interopRequireDefault(require("./Logo/Aqara"));
var _Xiaomi = _interopRequireDefault(require("./Logo/Xiaomi"));
var _Ubiquiti = _interopRequireDefault(require("./Logo/Ubiquiti"));
var _Cisco = _interopRequireDefault(require("./Logo/Cisco"));
var _Netgear = _interopRequireDefault(require("./Logo/Netgear"));
var _Netgate = _interopRequireDefault(require("./Logo/Netgate"));
var _MSI = _interopRequireDefault(require("./Logo/MSI"));
var _GLiNet = _interopRequireDefault(require("./Logo/GLiNet"));
var _Reolink = _interopRequireDefault(require("./Logo/Reolink"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var svgMap = {
  Apple: _Apple["default"],
  Google: _Google["default"],
  Amazon: _Amazon["default"],
  HomeAssistant: _HomeAssistant["default"],
  HomeDepot: _HomeDepot["default"],
  Microsoft: _Microsoft["default"],
  NewEgg: _NewEgg["default"],
  Samsung: _Samsung["default"],
  Shelly: _Shelly["default"],
  Aqara: _Aqara["default"],
  Xiaomi: _Xiaomi["default"],
  Ubiquiti: _Ubiquiti["default"],
  Cisco: _Cisco["default"],
  Netgear: _Netgear["default"],
  Netgate: _Netgate["default"],
  MSI: _MSI["default"],
  GLiNet: _GLiNet["default"],
  Reolink: _Reolink["default"]
};
var LoadLogo = function LoadLogo(_ref) {
  var iconPath = _ref.iconPath,
    w = _ref.w,
    h = _ref.h,
    fill = _ref.fill;
  var Icon = svgMap[iconPath];
  if (!Icon) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(Icon, {
    w: w,
    h: h,
    fill: fill
  });
};
var _default = exports["default"] = LoadLogo;