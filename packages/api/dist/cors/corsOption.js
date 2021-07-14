'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : 'http://localhost:3000',
  credentials: true,
};
//# sourceMappingURL=corsOption.js.map
