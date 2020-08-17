module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{json,css,js,flow,png,xml,ico,html,md,txt,woff}"],
  swDest: "public/service-worker.js",
  swSrc: "src/service-worker.js",
  maximumFileSizeToCacheInBytes: 3000000,
};
