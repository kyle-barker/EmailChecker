import postcss from "postcss";
import safeParser from "postcss-safe-parser";
import { CheerioDOMParser } from "./CheerioDOMParser.js";
import { RuleChecker } from "./RuleChecker.js";
const test = `<!DOCTYPE html>
<html amp4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
	<style>
		@media only screen and (max-width: 500px) {
			background-color: blue;
		}
		body > img {
			background-color: red;
		}
		body::first-child {
			background-color: green;
		}
		img, body > img {
      background-image: url('https://example.com/button-bg.jpg');
		}
	</style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
	<img height="10" style="width: 10px; background-color: lab(from #0000FF calc(l + 10) a b); border-block: solid; border-block-width: .1em" src="test.png"/>
	<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAoBAMAAABQlYTMAAAAG1BMVEUAgAD///9/v3+/37/f798fjx8/nz9fr1+fz59QqNX+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAxElEQVQ4je3OzwuCMBQH8Efp7Coy81hU9w5CHtPox3ES3hXCOhbUfZFQf3ZuswX6PHqq72F82eexPYB/OswkXM1UeyJ6iPLjQraB11Tze3fZNbk/14PboMkZ04Mc4ZduU0B4+CnERdiklm9H4gNjhDCh/i25bsr2AIQth5dnwcBa4yxOg0N8Rlmu1ltKQpiqDcoBjEnFWYqy6Sq+2zK07pH6OxEJElbnotoc0MchFjJmbUycFE4utDHs7dBj7Qwkx25/NG8tKxtX6Jcv2gAAAABJRU5ErkJggg==">
  </body>
</html>`;
const parser = new CheerioDOMParser();
parser.load(test);
const styleTags = parser.styleTags();
const inlineStyles = parser.inlineStyles();
const parserOptions = { parser: safeParser };
const ASTs = [...styleTags, ...inlineStyles].map(s => postcss.parse(s, parserOptions));
const rc = new RuleChecker();
const matchedRules = rc.check(ASTs, parser);
console.log(JSON.stringify(matchedRules));
//# sourceMappingURL=test.js.map