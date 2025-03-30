export interface DOMParserInterface {
    load(html: string): void;
    hasCssSelector(selector: string): boolean;
    elementAttributes(tag: string, attribute: string): string[];
    styleTags(): string[];
    inlineStyles(): string[];
}

export type MatchedRules = Record<string, boolean>;