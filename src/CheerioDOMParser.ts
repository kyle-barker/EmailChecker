import { load  } from 'cheerio'
import { DOMParserInterface } from "./types/types.js";

export class CheerioDOMParser implements DOMParserInterface {
  private $: cheerio.Root = load("");

  load(html: string): void {
    this.$ = load(html);
  }

  hasCssSelector(selector: string): boolean {
    return this.$(selector).length != 0;
  }

  elementAttributes(tag: string, attribute: string)
  {
    const $: cheerio.Root = this.$;
    return $(`${tag}[${attribute}]`)
      .map((_, el) => $(el).attr(attribute))
      .get();
  }

  styleTags(): string[] {
    const $: cheerio.Root = this.$
    return $("style")
      .map((_: number,  el: cheerio.Element) => $(el).text())
      .get();
  }

  inlineStyles(): string[] {
    const $: cheerio.Root = this.$
    return $("[style]")
      .map((_, el) => $(el).attr("style"))
      .get();
  }
}