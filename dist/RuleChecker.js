import valueParser from "postcss-value-parser";
export class RuleChecker {
    check(styleASTs, parser) {
        const matchedRules = {};
        this.testCssSelectors(parser, matchedRules);
        styleASTs.forEach(ast => {
            const src = ast.source?.input?.css;
            if (src?.includes('/*')) {
                matchedRules['css-comments'] = true;
            }
            if (src?.includes('!important')) {
                matchedRules['css-important'] = true;
            }
            // Process @ rules (e.g. @media)
            ast.walkAtRules(rule => {
                switch (rule.name) {
                    case "font-face":
                    case "import":
                    case "keyframes":
                    case "supports":
                        matchedRules[`css-at-${rule.name}`] = true;
                        break;
                    case "media":
                        matchedRules["css-at-media"] = true;
                        rule.walkDecls(decl => {
                            switch (decl.prop) {
                                case "hover":
                                case "orientation":
                                case "prefers-color-scheme":
                                case "prefers-reduced-motion":
                                    matchedRules[`css-at-media-${decl.prop}`] = true;
                                    break;
                                case "any-hover":
                                    matchedRules["css-at-media-hover"] = true;
                                    break;
                                case "-webkit-device-pixel-ratio":
                                    matchedRules["css-at-media-device-pixel-ratio"] = true;
                                    break;
                            }
                        });
                        break;
                }
            });
            //Process selectors & declarations
            //Inline styles don't have rules (or selectors)
            if (ast.nodes.some(n => n.type == 'rule')) {
                ast.walkRules(rule => {
                    this.testSelector(rule.selector, matchedRules);
                    rule.walkDecls(decl => this.testDeclParsed(decl, matchedRules));
                });
            }
            else {
                ast.walkDecls(decl => this.testDeclParsed(decl, matchedRules));
            }
        });
        return matchedRules;
    }
    testCssSelectors(dom, matchedRules) {
        // This could could work even with a SAX parser keeping track of unique tags and attributes for very large documents (with only a few special cases for <html>, <button>, <input>, <img>, and [background])
        // Instead we we run individual selectors for simpler code, but this could do the same logic as a full SAX would do but with a simple DOM traversal
        if (dom.hasCssSelector('html[⚡4email], html[amp4email]')) {
            matchedRules["amp"] = true;
        }
        if (dom.hasCssSelector('abbr')) {
            matchedRules["html-abbr"] = true;
        }
        if (dom.hasCssSelector('acronym')) {
            matchedRules["html-acronym"] = true;
        }
        if (dom.hasCssSelector('[align]')) {
            matchedRules["html-align"] = true;
        }
        if (dom.hasCssSelector('[aria-describedby]')) {
            matchedRules["html-aria-describedby"] = true;
        }
        if (dom.hasCssSelector('[aria-hidden]')) {
            matchedRules["html-aria-hidden"] = true;
        }
        if (dom.hasCssSelector('[aria-label]')) {
            matchedRules["html-aria-label"] = true;
        }
        if (dom.hasCssSelector('[aria-labelledby]')) {
            matchedRules["html-aria-labelledby"] = true;
        }
        if (dom.hasCssSelector('[aria-live]')) {
            matchedRules["html-aria-live"] = true;
        }
        if (dom.hasCssSelector('audio')) {
            matchedRules["html-audio"] = true;
        }
        if (dom.hasCssSelector('[background]')) {
            matchedRules["html-background"] = true;
        }
        if (dom.hasCssSelector('base')) {
            matchedRules["html-base"] = true;
        }
        if (dom.hasCssSelector('bdi')) {
            matchedRules["html-bdi"] = true;
        }
        if (dom.hasCssSelector('blockquote')) {
            matchedRules["html-blockquote"] = true;
        }
        if (dom.hasCssSelector('body')) {
            matchedRules["html-body"] = true;
        }
        if (dom.hasCssSelector('button[type="reset"]')) {
            matchedRules["html-button-reset"] = true;
        }
        if (dom.hasCssSelector('button[type="submit"]')) {
            matchedRules["html-button-submit"] = true;
        }
        if (dom.hasCssSelector('[cellpadding]')) {
            matchedRules["html-cellpadding"] = true;
        }
        if (dom.hasCssSelector('[cellspacing]')) {
            matchedRules["html-cellspacing"] = true;
        }
        if (dom.hasCssSelector('code')) {
            matchedRules["html-code"] = true;
        }
        if (dom.hasCssSelector('del')) {
            matchedRules["html-del"] = true;
        }
        if (dom.hasCssSelector('dfn')) {
            matchedRules["html-dfn"] = true;
        }
        if (dom.hasCssSelector('dialog')) {
            matchedRules["html-dialog"] = true;
        }
        if (dom.hasCssSelector('[dir]')) {
            matchedRules["html-dir"] = true;
        }
        if (dom.hasCssSelector('div')) {
            matchedRules["html-div"] = true;
        }
        if (dom.hasCssSelector('form')) {
            matchedRules["html-form"] = true;
        }
        if (dom.hasCssSelector('h1, h2, h3, h4, h5, h6')) {
            matchedRules["html-h1-h6"] = true;
        }
        if (dom.hasCssSelector('[height]')) {
            matchedRules["html-height"] = true;
        }
        if (dom.hasCssSelector('[hidden]')) {
            matchedRules["html-hidden"] = true;
        }
        if (dom.hasCssSelector('hr')) {
            matchedRules["html-hr"] = true;
        }
        if (dom.hasCssSelector('img')) {
            matchedRules["html-img"] = true;
        }
        if (dom.hasCssSelector('input[type="checkbox"]')) {
            matchedRules["html-input-checkbox"] = true;
        }
        if (dom.hasCssSelector('input[type="hidden"]')) {
            matchedRules["html-input-hidden"] = true;
        }
        if (dom.hasCssSelector('input[type="radio"]')) {
            matchedRules["html-input-radio"] = true;
        }
        if (dom.hasCssSelector('input[type="reset"]')) {
            matchedRules["html-input-reset"] = true;
        }
        if (dom.hasCssSelector('input[type="submit"]')) {
            matchedRules["html-input-submit"] = true;
        }
        if (dom.hasCssSelector('input[type="text"]')) {
            matchedRules["html-input-text"] = true;
        }
        if (dom.hasCssSelector('[lang]')) {
            matchedRules["html-lang"] = true;
        }
        if (dom.hasCssSelector('link')) {
            matchedRules["html-link"] = true;
        }
        if (dom.hasCssSelector('ul, ol, dl')) {
            matchedRules["html-lists"] = true;
        }
        if (dom.hasCssSelector('[loading]')) {
            matchedRules["html-loading-attribute"] = true;
        }
        if (dom.hasCssSelector('marquee')) {
            matchedRules["html-marquee"] = true;
        }
        if (dom.hasCssSelector('meter')) {
            matchedRules["html-meter"] = true;
        }
        if (dom.hasCssSelector('object')) {
            matchedRules["html-object"] = true;
        }
        if (dom.hasCssSelector('p')) {
            matchedRules["html-p"] = true;
        }
        if (dom.hasCssSelector('picture')) {
            matchedRules["html-picture"] = true;
        }
        if (dom.hasCssSelector('[popover]')) {
            matchedRules["html-popover"] = true;
        }
        if (dom.hasCssSelector('pre')) {
            matchedRules["html-pre"] = true;
        }
        if (dom.hasCssSelector('progress')) {
            matchedRules["html-progress"] = true;
        }
        if (dom.hasCssSelector('[required]')) {
            matchedRules["html-required"] = true;
        }
        if (dom.hasCssSelector('[role]')) {
            matchedRules["html-role"] = true;
        }
        if (dom.hasCssSelector('rp')) {
            matchedRules["html-rp"] = true;
        }
        if (dom.hasCssSelector('rt')) {
            matchedRules["html-rt"] = true;
        }
        if (dom.hasCssSelector('ruby')) {
            matchedRules["html-ruby"] = true;
        }
        if (dom.hasCssSelector('select')) {
            matchedRules["html-select"] = true;
        }
        if (dom.hasCssSelector('small')) {
            matchedRules["html-small"] = true;
        }
        if (dom.hasCssSelector('span')) {
            matchedRules["html-span"] = true;
        }
        if (dom.hasCssSelector('[srcset], [sizes ]')) {
            matchedRules["html-srcset"] = true;
        }
        if (dom.hasCssSelector('strike')) {
            matchedRules["html-strike"] = true;
        }
        if (dom.hasCssSelector('strong')) {
            matchedRules["html-strong"] = true;
        }
        if (dom.hasCssSelector('style')) {
            matchedRules["html-style"] = true;
        }
        if (dom.hasCssSelector('svg')) {
            matchedRules["html-svg"] = true;
        }
        if (dom.hasCssSelector('table')) {
            matchedRules["html-table"] = true;
        }
        if (dom.hasCssSelector('[target]')) {
            matchedRules["html-target"] = true;
        }
        if (dom.hasCssSelector('textarea')) {
            matchedRules["html-textarea"] = true;
        }
        if (dom.hasCssSelector('[valign]')) {
            matchedRules["html-valign"] = true;
        }
        if (dom.hasCssSelector('video')) {
            matchedRules["html-video"] = true;
        }
        if (dom.hasCssSelector('wbr')) {
            matchedRules["html-wbr"] = true;
        }
        if (dom.hasCssSelector('[width]')) {
            matchedRules["html-width"] = true;
        }
        dom.elementAttributes('img', 'src').forEach(src => {
            this.testImgSrc(src, '', matchedRules);
        });
        dom.elementAttributes('*', 'background').forEach(src => {
            this.testImgSrc(src, 'x-background-attr-', matchedRules);
        });
    }
    testSelector(selector, matchedRules) {
        if (selector.includes(":active")) {
            matchedRules["css-pseudo-class-active"] = true;
        }
        if (selector.includes(":checked")) {
            matchedRules["css-pseudo-class-checked"] = true;
        }
        if (selector.includes(":first-child")) {
            matchedRules["css-pseudo-class-first-child"] = true;
        }
        if (selector.includes(":first-of-type")) {
            matchedRules["css-pseudo-class-first-of-type"] = true;
        }
        if (selector.includes(":focus")) {
            matchedRules["css-pseudo-class-focus"] = true;
        }
        if (selector.includes(":has")) {
            matchedRules["css-pseudo-class-focus"] = true;
        }
        if (selector.includes(":hover")) {
            matchedRules["css-pseudo-class-hover"] = true;
        }
        if (selector.includes(":last-child")) {
            matchedRules["css-pseudo-class-last-child"] = true;
        }
        if (selector.includes(":last-of-type")) {
            matchedRules["css-pseudo-class-last-of-type"] = true;
        }
        if (selector.includes(":link")) {
            matchedRules["css-pseudo-class-link"] = true;
        }
        if (selector.includes(":not")) {
            matchedRules["css-pseudo-class-not"] = true;
        }
        if (selector.includes(":nth-child")) {
            matchedRules["css-pseudo-class-nth-child"] = true;
        }
        if (selector.includes(":nth-last-child")) {
            matchedRules["css-pseudo-class-nth-last-child"] = true;
        }
        if (selector.includes(":nth-last-of-type")) {
            matchedRules["css-pseudo-class-nth-last-of-type"] = true;
        }
        if (selector.includes(":nth-of-type")) {
            matchedRules["css-pseudo-class-nth-of-type"] = true;
        }
        if (selector.includes(":only-child")) {
            matchedRules["css-pseudo-class-only-child"] = true;
        }
        if (selector.includes(":only-of-type")) {
            matchedRules["css-pseudo-class-only-of-type"] = true;
        }
        if (selector.includes(":target")) {
            matchedRules["css-pseudo-class-target"] = true;
        }
        if (selector.includes(":visited")) {
            matchedRules["css-pseudo-class-visited"] = true;
        }
        if (selector.includes("::after")) {
            matchedRules["css-pseudo-element-after"] = true;
        }
        if (selector.includes("::before")) {
            matchedRules["css-pseudo-element-before"] = true;
        }
        if (selector.includes("::first-letter")) {
            matchedRules["css-pseudo-element-first-letter"] = true;
        }
        if (selector.includes("::first-line")) {
            matchedRules["css-pseudo-element-first-line"] = true;
        }
        if (selector.includes("::marker")) {
            matchedRules["css-pseudo-element-marker"] = true;
        }
        if (selector.includes("::placeholder")) {
            matchedRules["css-pseudo-element-placeholder"] = true;
        }
        if (selector.includes("+")) {
            matchedRules["css-selector-adjacent-sibling"] = true;
        }
        if (selector.includes("[")) {
            matchedRules["css-selector-attribute"] = true;
        }
        if (selector.includes(">")) {
            matchedRules["css-selector-child"] = true;
        }
        if (selector.includes(".")) {
            matchedRules["css-selector-class"] = true;
        }
        if (selector.includes(" ~ ")) {
            matchedRules["css-selector-general-sibling"] = true;
        }
        if (selector.includes(",")) {
            matchedRules["css-selector-grouping"] = true;
        }
        if (selector.includes("#")) {
            matchedRules["css-selector-id"] = true;
        }
    }
    testDeclProp(decl, matchedRules) {
        if (decl.prop == "accent-color") {
            matchedRules["css-accent-color"] = true;
        }
        if (decl.prop == "align-items") {
            matchedRules["css-align-items"] = true;
        }
        if (decl.prop == "animation") {
            matchedRules["css-animation"] = true;
        }
        if (decl.prop == "aspect-ratio") {
            matchedRules["css-aspect-ratio"] = true;
        }
        if (decl.prop == "backdrop-filter") {
            matchedRules["css-backdrop-filter"] = true;
        }
        if (decl.prop == "background-blend-mode") {
            matchedRules["css-background-blend-mode"] = true;
        }
        if (decl.prop == "background-clip") {
            matchedRules["css-background-clip"] = true;
        }
        if (decl.prop == "background-color") {
            matchedRules["css-background-color"] = true;
        }
        if (decl.prop == "background-image") {
            matchedRules["css-background-image"] = true;
        }
        if (decl.prop == "background-origin") {
            matchedRules["css-background-origin"] = true;
        }
        if (decl.prop == "background-position") {
            matchedRules["css-background-position"] = true;
        }
        if (decl.prop == "background-repeat") {
            matchedRules["css-background-repeat"] = true;
        }
        if (decl.prop == "background-size") {
            matchedRules["css-background-size"] = true;
        }
        if (decl.prop == "border-collapse") {
            matchedRules["css-border-collapse"] = true;
        }
        if (decl.prop == "border-image") {
            matchedRules["css-border-image"] = true;
        }
        if (decl.prop == "box-shadow") {
            matchedRules["css-box-shadow"] = true;
        }
        if (decl.prop == "box-sizing") {
            matchedRules["css-box-sizing"] = true;
        }
        if (decl.prop == "caption-side") {
            matchedRules["css-caption-side"] = true;
        }
        if (decl.prop == "clear") {
            matchedRules["css-clear"] = true;
        }
        if (decl.prop == "clip-path") {
            matchedRules["css-clip-path"] = true;
        }
        if (decl.prop == "color-scheme") {
            matchedRules["css-color-scheme"] = true;
        }
        if (decl.prop == "column-count") {
            matchedRules["css-column-count"] = true;
        }
        if (decl.prop == "direction") {
            matchedRules["css-direction"] = true;
        }
        if (decl.prop == "display") {
            matchedRules["css-display"] = true;
        }
        if (decl.prop == "empty-cells") {
            matchedRules["css-empty-cells"] = true;
        }
        if (decl.prop == "filter") {
            matchedRules["css-filter"] = true;
        }
        if (decl.prop == "flex-wrap") {
            matchedRules["css-flex-wrap"] = true;
        }
        if (decl.prop == "float") {
            matchedRules["css-float"] = true;
        }
        if (decl.prop == "font-kerning") {
            matchedRules["css-font-kerning"] = true;
        }
        if (decl.prop == "font-size") {
            matchedRules["css-font-size"] = true;
        }
        if (decl.prop == "font-stretch") {
            matchedRules["css-font-stretch"] = true;
        }
        if (decl.prop == "font-weight") {
            matchedRules["css-font-weight"] = true;
        }
        if (decl.prop == "font") {
            matchedRules["css-font"] = true;
        }
        if (decl.prop == "gap, column-gap, row-gap") {
            matchedRules["css-gap"] = true;
        }
        if (decl.prop == "height") {
            matchedRules["css-height"] = true;
        }
        if (decl.prop == "hyphenate-character") {
            matchedRules["css-hyphenate-character"] = true;
        }
        if (decl.prop == "hyphenate-limit-chars") {
            matchedRules["css-hyphenate-limit-chars"] = true;
        }
        if (decl.prop == "hyphens") {
            matchedRules["css-hyphens"] = true;
        }
        if (decl.prop == "inline-size ") {
            matchedRules["css-inline-size"] = true;
        }
        if (decl.prop == "inset") {
            matchedRules["css-inset"] = true;
        }
        if (decl.prop == "fit-content, min-content, max-content") {
            matchedRules["css-intrinsic-size"] = true;
        }
        if (decl.prop == "justify-content") {
            matchedRules["css-justify-content"] = true;
        }
        if (decl.prop == "left, right, top, bottom") {
            matchedRules["css-left-right-top-bottom"] = true;
        }
        if (decl.prop == "letter-spacing") {
            matchedRules["css-letter-spacing"] = true;
        }
        if (decl.prop == "line-height") {
            matchedRules["css-line-height"] = true;
        }
        if (decl.prop == "list-style-image") {
            matchedRules["css-list-style-image"] = true;
        }
        if (decl.prop == "list-style-position") {
            matchedRules["css-list-style-position"] = true;
        }
        if (decl.prop == "list-style-type") {
            matchedRules["css-list-style-type"] = true;
        }
        if (decl.prop == "list-style") {
            matchedRules["css-list-style"] = true;
        }
        if (decl.prop == "mask-image") {
            matchedRules["css-mask-image"] = true;
        }
        if (decl.prop == "max-block-size") {
            matchedRules["css-max-block-size"] = true;
        }
        if (decl.prop == "max-height") {
            matchedRules["css-max-height"] = true;
        }
        if (decl.prop == "max-inline-size") {
            matchedRules["css-max-inline-size"] = true;
        }
        if (decl.prop == "max-width") {
            matchedRules["css-max-width"] = true;
        }
        if (decl.prop == "min-block-size") {
            matchedRules["css-min-block-size"] = true;
        }
        if (decl.prop == "min-height") {
            matchedRules["css-min-height"] = true;
        }
        if (decl.prop == "min-inline-size") {
            matchedRules["css-min-inline-size"] = true;
        }
        if (decl.prop == "min-width") {
            matchedRules["css-min-width"] = true;
        }
        if (decl.prop == "mix-blend-mode") {
            matchedRules["css-mix-blend-mode"] = true;
        }
        if (decl.prop == "object-fit") {
            matchedRules["css-object-fit"] = true;
        }
        if (decl.prop == "object-position") {
            matchedRules["css-object-position"] = true;
        }
        if (decl.prop == "opacity") {
            matchedRules["css-opacity"] = true;
        }
        if (decl.prop == "orphans") {
            matchedRules["css-orphans"] = true;
        }
        if (decl.prop == "outline-offset") {
            matchedRules["css-outline-offset"] = true;
        }
        if (decl.prop == "outline") {
            matchedRules["css-outline"] = true;
        }
        if (decl.prop == "overflow-wrap") {
            matchedRules["css-overflow-wrap"] = true;
        }
        if (decl.prop == "overflow") {
            matchedRules["css-overflow"] = true;
        }
        if (decl.prop == "position") {
            matchedRules["css-position"] = true;
        }
        if (decl.prop == "resize") {
            matchedRules["css-resize"] = true;
        }
        if (decl.prop == "scroll-snap") {
            matchedRules["css-scroll-snap"] = true;
        }
        if (decl.prop == "shape-margin") {
            matchedRules["css-shape-margin"] = true;
        }
        if (decl.prop == "shape-outside") {
            matchedRules["css-shape-outside"] = true;
        }
        if (decl.prop == "tab-size") {
            matchedRules["css-tab-size"] = true;
        }
        if (decl.prop == "table-layout") {
            matchedRules["css-table-layout"] = true;
        }
        if (decl.prop == "text-align-last") {
            matchedRules["css-text-align-last"] = true;
        }
        if (decl.prop == "text-align") {
            matchedRules["css-text-align"] = true;
        }
        if (decl.prop == "text-decoration-color") {
            matchedRules["css-text-decoration-color"] = true;
        }
        if (decl.prop == "text-decoration-line") {
            matchedRules["css-text-decoration-line"] = true;
        }
        if (decl.prop == "text-decoration-skip-ink") {
            matchedRules["css-text-decoration-skip-ink"] = true;
        }
        if (decl.prop == "text-decoration-style") {
            matchedRules["css-text-decoration-style"] = true;
        }
        if (decl.prop == "text-decoration-thickness") {
            matchedRules["css-text-decoration-thickness"] = true;
        }
        if (decl.prop == "text-decoration") {
            matchedRules["css-text-decoration"] = true;
        }
        if (decl.prop == "text-emphasis-position") {
            matchedRules["css-text-emphasis-position"] = true;
        }
        if (decl.prop == "text-emphasis") {
            matchedRules["css-text-emphasis"] = true;
        }
        if (decl.prop == "text-indent") {
            matchedRules["css-text-indent"] = true;
        }
        if (decl.prop == "text-justify") {
            matchedRules["css-text-justify"] = true;
        }
        if (decl.prop == "text-orientation") {
            matchedRules["css-text-orientation"] = true;
        }
        if (decl.prop == "text-overflow") {
            matchedRules["css-text-overflow"] = true;
        }
        if (decl.prop == "text-shadow") {
            matchedRules["css-text-shadow"] = true;
        }
        if (decl.prop == "text-transform") {
            matchedRules["css-text-transform"] = true;
        }
        if (decl.prop == "text-underline-offset") {
            matchedRules["css-text-underline-offset"] = true;
        }
        if (decl.prop == "text-underline-position") {
            matchedRules["css-text-underline-position"] = true;
        }
        if (decl.prop == "text-wrap") {
            matchedRules["css-text-wrap"] = true;
        }
        if (decl.prop == "transform") {
            matchedRules["css-transform"] = true;
        }
        if (decl.prop == "transition") {
            matchedRules["css-transition"] = true;
        }
        if (decl.prop == "user-select") {
            matchedRules["css-user-select"] = true;
        }
        if (decl.prop == "vertical-align") {
            matchedRules["css-vertical-align"] = true;
        }
        if (decl.prop == "visibility") {
            matchedRules["css-visibility"] = true;
        }
        if (decl.prop == "white-space-collapse") {
            matchedRules["css-white-space-collapse"] = true;
        }
        if (decl.prop == "white-space") {
            matchedRules["css-white-space"] = true;
        }
        if (decl.prop == "widows") {
            matchedRules["css-widows"] = true;
        }
        if (decl.prop == "width") {
            matchedRules["css-width"] = true;
        }
        if (decl.prop == "word-break") {
            matchedRules["css-word-break"] = true;
        }
        if (decl.prop == "word-spacing") {
            matchedRules["css-word-spacing"] = true;
        }
        if (decl.prop == "writing-mode") {
            matchedRules["css-writing-mode"] = true;
        }
        if (decl.prop == "z-index") {
            matchedRules["css-z-index"] = true;
        }
        if (decl.prop.startsWith("background")) {
            matchedRules["css-background"] = true;
        }
        if (decl.prop.startsWith("border-block")) {
            matchedRules["css-border-radius-logical"] = true;
        }
        if (decl.prop.startsWith("border-inline")) {
            matchedRules["css-border-radius-logical"] = true;
        } /* doubled up */
        if (decl.prop.startsWith("border-radius")) {
            matchedRules["css-border-radius"] = true;
        }
        if (decl.prop.startsWith("border-spacing")) {
            matchedRules["css-border-spacing"] = true;
        }
        if (decl.prop.startsWith("border")) {
            matchedRules["css-border"] = true;
        }
        if (decl.prop.startsWith("columns")) {
            matchedRules["css-column-layout-properties"] = true;
        }
        if (decl.prop.startsWith("grid-template")) {
            matchedRules["css-grid-template"] = true;
        }
        if (decl.prop.startsWith("margin")) {
            matchedRules["css-margin"] = true;
        }
        if (decl.prop.startsWith("padding")) {
            matchedRules["css-padding"] = true;
        }
        if (decl.prop == "display") {
            switch (decl.value) {
                case "flex":
                    matchedRules["css-display-flex"] = true;
                    break;
                case "grid":
                    matchedRules["css-display-grid"] = true;
                    break;
                case "none":
                    matchedRules["css-display-none"] = true;
                    break;
            }
        }
    }
    /** This could use a faster string based approximate for performance */
    testDeclParsed(decl, matchedRules) {
        this.testDeclProp(decl, matchedRules);
        const unit_map = { "ch": "css-unit-ch", "cm": "css-unit-cm", "em": "css-unit-em", "ex": "css-unit-ex", "in": "css-unit-in", "mm": "css-unit-mm", "pc": "css-unit-pc", "%": "css-unit-percent", "pt": "css-unit-pt", "px": "css-unit-px", "rem": "css-unit-rem", "vh": "css-unit-vh", "vw": "css-unit-vw" };
        const func_map = { "conic-gradient": "css-conic-gradient", "clamp": "css-function-clamp", "light-dark": "css-function-light-dark", "max": "css-function-max", "min": "css-function-min", "linear-gradient": "css-linear-gradient", "lch": "css-modern-color", "oklch": "css-modern-color", "lab": "css-modern-color", "oklab": "css-modern-color", "lang": "css-pseudo-class-lang", "radial-gradient": "css-radial-gradient", "rgb": "css-rgb", "rgba": "css-rgba", "calc": "css-unit-calc", "var": "css-variables" };
        const parsed = valueParser(decl.value);
        parsed.walk((node) => {
            if (node.type === "word" && node.value[0].match(/\d/)) {
                const units = valueParser.unit(node.value);
                if (units && !!unit_map[units.unit]) {
                    matchedRules[unit_map[units.unit]] = true;
                }
            }
            if (node.type === "function") {
                if (!!func_map[node.value]) {
                    matchedRules[func_map[node.value]] = true;
                }
                if (node.value == "url") {
                    // Note: this can be more than image includes https://developer.mozilla.org/en-US/docs/Web/CSS/url_function
                    this.testImgSrc(node.nodes[0].value, 'x-css-background-', matchedRules); //TODO this is a naive url extractor in this case
                }
            }
        });
    }
    testImgSrc(url, prefix, matchedRules) {
        const lastDot = url.lastIndexOf(".");
        if (lastDot !== -1 && lastDot < url.length - 1) //dot is not the last char
         {
            switch (url.slice(lastDot + 1)) {
                case "avif":
                    matchedRules[`${prefix}image-avif`] = true;
                    break;
                case "bmp":
                    matchedRules[`${prefix}image-bmp`] = true;
                    break;
                case "gif":
                    matchedRules[`${prefix}image-gif`] = true;
                    break;
                case "hdr":
                    matchedRules[`${prefix}image-hdr`] = true;
                    break;
                case "heif":
                    matchedRules[`${prefix}image-heif`] = true;
                    break;
                case "ico":
                    matchedRules[`${prefix}image-ico`] = true;
                    break;
                case "jpg":
                    matchedRules[`${prefix}image-jpg`] = true;
                    break;
                case "mp4":
                    matchedRules[`${prefix}image-mp4`] = true;
                    break;
                case "png":
                    matchedRules[`${prefix}image-png`] = true;
                    break;
                case "svg":
                    matchedRules[`${prefix}image-svg`] = true;
                    break;
                case "tiff":
                    matchedRules[`${prefix}image-tiff`] = true;
                    break;
                case "webp":
                    matchedRules[`${prefix}image-webp`] = true;
                    break;
            }
        }
        else if (url.includes('base64')) {
            matchedRules[`${prefix}image-base64`] = true;
        }
    }
}
//# sourceMappingURL=RuleChecker.js.map