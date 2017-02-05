#!/usr/bin/env bash
mv dist/inline.*.bundle.js dist/inline.bundle.js
mv dist/main.*.bundle.js dist/main.bundle.js
mv dist/main.*.bundle.js.gz dist/main.bundle.js.gz
mv dist/polyfills.*.bundle.js dist/polyfills.bundle.js
mv dist/polyfills.*.bundle.js.gz dist/polyfills.bundle.js.gz
mv dist/styles.*.bundle.css dist/styles.bundle.css
mv dist/vendor.*.bundle.js dist/vendor.bundle.js
mv dist/vendor.*.bundle.js.gz dist/vendor.bundle.js.gz
rm dist/index.html
rm dist/favicon.ico
