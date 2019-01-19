// Endurance Helper File

// Imports
let moment = require("moment");
var he = require("he");

//
let TARS = (function() {
  let methods = {};

  // Pretty Date
  methods.prettyDate = function(x, format = "MMMM Do, YYYY") {
    return moment(x).format(format);
  };

  // Clean Content
  methods.structuredContent = function(c) {
    let id = 0;
    let contents = [];
    let blocks = c.split(/(\[.*?\].*?\[\/.*?\])/gsu);
    for (let block of blocks) {
      let content = {};
      content.id = id++;
      if (/\[.*?\].*?\[\/.*?\]/gsu.test(block)) {
        content.type = "shortcode";
        content.shortcode = block.match(/\[(.*?)\]/)[1];
        content.content = he
          .decode(block.split(/\[.*?\](.*?)\[\/.*?\]/su)[1])
          .replace(/(<br \/>|<p>|<\/p>)/gm, "");
      } else {
        content.type = "regular";
        content.content = block;
      }
      contents.push(content);
    }
    return contents;
  };

  // Create Code Blocks
  // methods.codeBlock;

  return methods;
})();

module.exports = TARS;
