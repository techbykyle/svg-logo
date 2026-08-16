"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoNames = exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Amazon = _interopRequireDefault(require("./Logo/Amazon.js"));
var _Apple = _interopRequireDefault(require("./Logo/Apple.js"));
var _Aqara = _interopRequireDefault(require("./Logo/Aqara.js"));
var _Cisco = _interopRequireDefault(require("./Logo/Cisco.js"));
var _Gitea = _interopRequireDefault(require("./Logo/Gitea.js"));
var _GitHub = _interopRequireDefault(require("./Logo/GitHub.js"));
var _GitLab = _interopRequireDefault(require("./Logo/GitLab.js"));
var _GLiNet = _interopRequireDefault(require("./Logo/GLiNet.js"));
var _Google = _interopRequireDefault(require("./Logo/Google.js"));
var _HomeAssistant = _interopRequireDefault(require("./Logo/HomeAssistant.js"));
var _HomeDepot = _interopRequireDefault(require("./Logo/HomeDepot.js"));
var _Microsoft = _interopRequireDefault(require("./Logo/Microsoft.js"));
var _Mqtt = _interopRequireDefault(require("./Logo/Mqtt.js"));
var _MSI = _interopRequireDefault(require("./Logo/MSI.js"));
var _Netgate = _interopRequireDefault(require("./Logo/Netgate.js"));
var _Netgear = _interopRequireDefault(require("./Logo/Netgear.js"));
var _NewEgg = _interopRequireDefault(require("./Logo/NewEgg.js"));
var _OpenAi = _interopRequireDefault(require("./Logo/OpenAi.js"));
var _Opensource = _interopRequireDefault(require("./Logo/Opensource.js"));
var _Reolink = _interopRequireDefault(require("./Logo/Reolink.js"));
var _Samsung = _interopRequireDefault(require("./Logo/Samsung.js"));
var _Shelly = _interopRequireDefault(require("./Logo/Shelly.js"));
var _Ubiquiti = _interopRequireDefault(require("./Logo/Ubiquiti.js"));
var _VsCode = _interopRequireDefault(require("./Logo/VsCode.js"));
var _Wellcube = _interopRequireDefault(require("./Logo/Wellcube.js"));
var _Xiaomi = _interopRequireDefault(require("./Logo/Xiaomi.js"));
var _jsxRuntime = require("react/jsx-runtime");
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
  OpenAi: _OpenAi["default"],
  Opensource: _Opensource["default"],
  Reolink: _Reolink["default"],
  Samsung: _Samsung["default"],
  Shelly: _Shelly["default"],
  Ubiquiti: _Ubiquiti["default"],
  VsCode: _VsCode["default"],
  Wellcube: _Wellcube["default"],
  Xiaomi: _Xiaomi["default"]
};
var logoNames = exports.logoNames = Object.freeze(Object.keys(svgMap));
var LoadLogo = function LoadLogo(_ref) {
  var iconPath = _ref.iconPath,
    w = _ref.w,
    h = _ref.h,
    fill = _ref.fill,
    title = _ref.title;
  var Icon = svgMap[iconPath];
  if (!Icon) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, {
    w: w,
    h: h,
    fill: fill,
    title: title
  });
};
var _default = exports["default"] = LoadLogo;
