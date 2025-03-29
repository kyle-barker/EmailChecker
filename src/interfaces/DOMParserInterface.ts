export interface DOMParserInterface {
    load(html: string): void;
    hasCssSelector(selector: string): boolean;
}