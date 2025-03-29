import postcss from "postcss";
import safeParser from "postcss-safe-parser";
import { CheerioDOMParser } from "./CheerioDOMParser.js";

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

// Example CSS string
const css = `
  .example {
    color: red;
    font-size: 16px;
  }
`;

const parser = new CheerioDOMParser();
parser.load(test);
const styleTags: string[] = parser.styleTags();
const ASTs = styleTags.map(s => postcss.parse(s));

const rules: any = {};
ASTs.forEach(ast => {
  ast.walkRules(rule => {
    const selector = rule.selector;
    if (selector.includes(":active")) { rules["css-pseudo-class-active"] = true; } 
    if (selector.includes(":checked")) { rules["css-pseudo-class-checked"] = true; } 
    if (selector.includes(":first-child")) { rules["css-pseudo-class-first-child"] = true; } 
    if (selector.includes(":first-of-type")) { rules["css-pseudo-class-first-of-type"] = true; } 
    if (selector.includes(":focus")) { rules["css-pseudo-class-focus"] = true; } 
    if (selector.includes(":hover")) { rules["css-pseudo-class-hover"] = true; } 
    if (selector.includes(":last-child")) { rules["css-pseudo-class-last-child"] = true; } 
    if (selector.includes(":last-of-type")) { rules["css-pseudo-class-last-of-type"] = true; } 
    if (selector.includes(":link")) { rules["css-pseudo-class-link"] = true; } 
    if (selector.includes(":not")) { rules["css-pseudo-class-not"] = true; } 
    if (selector.includes(":nth-child")) { rules["css-pseudo-class-nth-child"] = true; } 
    if (selector.includes(":nth-last-child")) { rules["css-pseudo-class-nth-last-child"] = true; } 
    if (selector.includes(":nth-last-of-type")) { rules["css-pseudo-class-nth-last-of-type"] = true; } 
    if (selector.includes(":nth-of-type")) { rules["css-pseudo-class-nth-of-type"] = true; } 
    if (selector.includes(":only-child")) { rules["css-pseudo-class-only-child"] = true; } 
    if (selector.includes(":only-of-type")) { rules["css-pseudo-class-only-of-type"] = true; } 
    if (selector.includes(":target")) { rules["css-pseudo-class-target"] = true; } 
    if (selector.includes(":visited")) { rules["css-pseudo-class-visited"] = true; } 
    if (selector.includes("::after")) { rules["css-pseudo-element-after"] = true; } 
    if (selector.includes("::before")) { rules["css-pseudo-element-before"] = true; } 
    if (selector.includes("::first-letter")) { rules["css-pseudo-element-first-letter"] = true; } 
    if (selector.includes("::first-line")) { rules["css-pseudo-element-first-line"] = true; } 
    if (selector.includes("::marker")) { rules["css-pseudo-element-marker"] = true; } 
    if (selector.includes("::placeholder")) { rules["css-pseudo-element-placeholder"] = true; } 
    if (selector.includes("+")) { rules["css-selector-adjacent-sibling"] = true; } 
    if (selector.includes("[")) { rules["css-selector-attribute"] = true; } 

    console.log(selector);
    rule.walkDecls( decl => {
      console.log(`  ${decl.prop}: ${decl.value}`)
    })

  })
})
console.log(JSON.stringify(rules));

// Parse the CSS string into an AST
// const ast = postcss.parse(css);

// console.log(JSON.stringify(ast, null, 2));
