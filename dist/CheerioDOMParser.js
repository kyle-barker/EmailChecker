import { load } from 'cheerio';
export class CheerioDOMParser {
    $ = load("");
    load(html) {
        this.$ = load(html);
    }
    hasCssSelector(selector) {
        return this.$(selector).length != 0;
    }
    styleTags() {
        const $ = this.$;
        return $("style")
            .map((_, el) => $(el).text())
            .get();
    }
}
//# sourceMappingURL=CheerioDOMParser.js.map