import { load } from 'cheerio';
export class CheerioDOMParser {
    $ = load("");
    load(html) {
        this.$ = load(html);
    }
    hasCssSelector(selector) {
        return this.$(selector).length != 0;
    }
    elementAttributes(tag, attribute) {
        const $ = this.$;
        return $(`${tag}[${attribute}]`)
            .map((_, el) => $(el).attr(attribute))
            .get();
    }
    styleTags() {
        const $ = this.$;
        return $("style")
            .map((_, el) => $(el).text())
            .get();
    }
    inlineStyles() {
        const $ = this.$;
        return $("[style]")
            .map((_, el) => $(el).attr("style"))
            .get();
    }
}
//# sourceMappingURL=CheerioDOMParser.js.map