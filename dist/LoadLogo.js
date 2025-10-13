"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Amazon = _interopRequireDefault(require("./Logo/Amazon"));
var _Apple = _interopRequireDefault(require("./Logo/Apple"));
var _Aqara = _interopRequireDefault(require("./Logo/Aqara"));
var _Cisco = _interopRequireDefault(require("./Logo/Cisco"));
var _Gitea = _interopRequireDefault(require("./Logo/Gitea"));
var _GitHub = _interopRequireDefault(require("./Logo/GitHub"));
var _GitLab = _interopRequireDefault(require("./Logo/GitLab"));
var _GLiNet = _interopRequireDefault(require("./Logo/GLiNet"));
var _Google = _interopRequireDefault(require("./Logo/Google"));
var _HomeAssistant = _interopRequireDefault(require("./Logo/HomeAssistant"));
var _HomeDepot = _interopRequireDefault(require("./Logo/HomeDepot"));
var _Microsoft = _interopRequireDefault(require("./Logo/Microsoft"));
var _Mqtt = _interopRequireDefault(require("./Logo/Mqtt"));
var _MSI = _interopRequireDefault(require("./Logo/MSI"));
var _Netgate = _interopRequireDefault(require("./Logo/Netgate"));
var _Netgear = _interopRequireDefault(require("./Logo/Netgear"));
var _NewEgg = _interopRequireDefault(require("./Logo/NewEgg"));
var _Reolink = _interopRequireDefault(require("./Logo/Reolink"));
var _Samsung = _interopRequireDefault(require("./Logo/Samsung"));
var _Shelly = _interopRequireDefault(require("./Logo/Shelly"));
var _Ubiquiti = _interopRequireDefault(require("./Logo/Ubiquiti"));
var _Xiaomi = _interopRequireDefault(require("./Logo/Xiaomi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var svgMap = {
  Amazon: _Amazon["default"],
  Apple: _Apple["default"],
  Aqara: _Aqara["default"],
  Cisco: _Cisco["default"],
  Gitea: _Gitea["default"],
  GitHub: _GitHub["default"],
  GitLab: _GitLab["default"],
  GLiNet: _GLiNet["default"],
  Google: _Google["default"],
  HomeAssistant: _HomeAssistant["default"],
  HomeDepot: _HomeDepot["default"],
  Microsoft: _Microsoft["default"],
  Mqtt: _Mqtt["default"],
  MSI: _MSI["default"],
  Netgate: _Netgate["default"],
  Netgear: _Netgear["default"],
  NewEgg: _NewEgg["default"],
  Reolink: _Reolink["default"],
  Samsung: _Samsung["default"],
  Shelly: _Shelly["default"],
  Ubiquiti: _Ubiquiti["default"],
  Xiaomi: _Xiaomi["default"]
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