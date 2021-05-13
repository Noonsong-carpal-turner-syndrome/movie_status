try {
  importScripts(
    "config.js",
    "localStorage.js",
    "functions.js",
    "getPieData.js",
    "background.js"
  );
} catch (e) {
  console.error(e);
}
