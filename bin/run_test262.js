const fs = require("fs")
const run = require("test262-parser-runner")
const parse = require("..").parse

const unsupportedFeatures = ["object-rest", "object-spread", "regexp-named-groups",
"BigInt", "async-iteration", "class-fields", "regexp-unicode-property-escapes",
"regexp-lookbehind", "regexp-dotall", "optional-catch-binding"];

run(
  (content, {sourceType}) => parse(content, {sourceType, ecmaVersion: 9}),
  test => (test.attrs.features && unsupportedFeatures.some(f => test.attrs.features.includes(f))),
  fs.readFileSync("./bin/test262.whitelist", "utf8").split("\n").filter(v => v)
)
