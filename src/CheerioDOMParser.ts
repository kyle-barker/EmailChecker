import { load  } from 'cheerio'
import { DOMParserInterface } from "./interfaces/DOMParserInterface";

export class CheerioDOMParser implements DOMParserInterface {
  private $: cheerio.Root = load("");

  load(html: string): void {
    this.$ = load(html);
  }

  hasCssSelector(selector: string): boolean {
    return this.$(selector).length != 0;
  }

  styleTags(): string[] {
    const $: cheerio.Root = this.$
    return $("style")
      .map((_: number,  el: cheerio.Element) => $(el).text())
      .get();
  }
}