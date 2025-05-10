declare namespace JSX {
    //#region JSX built-in types

    type Element = HTMLElement;

    interface IntrinsicElements extends IntrinsicElementMap { }
    
    interface ElementChildrenAttribute {
        children: ChildOrNestedArrayOriginal;
    }

    //#endregion

    type IntrinsicElementMap = {
        [K in TagName]: Partial<IntrinsicElement<K>>;
    }
    
    /**
     * JSX Built-in element type
     * @param K Element's tag name
     */
    type IntrinsicElement<K extends TagName> = Omit<
        IntrinsicElementAttributeMap<K>,
        keyof IntrinsicElementBase<K>
    > & IntrinsicElementBase<K>;

    type IntrinsicElementAttributeMap<K> = {
        [A in Exclude<
            KeysMatching<HTMLElementTagNameMap[K], string>,
            `${"inner" | "outer"}${"HTML" | "Text"}` | `access${string}`
        >]: HTMLElementTagNameMap[K][A];
    }

    type IntrinsicElementBase<K extends TagName> = ElementChildrenAttribute & {
        [E in keyof HTMLElementEventMap as `on:${E}`]: (this: HTMLElementTagNameMap[K], event: HTMLElementEventMap[E]) => void;
    } & { style: Partial<CSSStyleDeclaration> };

    /** Component function type */
    interface Component<P extends Record<string, any> = {}> {
        (props: Properties<P>): Element;
    }

    /** JSX element children type */
    type ChildType = HTMLAppendable | number | boolean;

    /**
     * Raw non-flat children array
     * Problematic, produces TS2589 "Type instantiation is excessively deep and possibly infinite." error.
     * 
     * Original is available as {@link JSX.ChildOrNestedArrayOriginal}
     * 
     * Replaced by `unknown[]` while no better solution is found. See original definition below:
     * ```ts
     * type ChildOrNestedArray = ChildType | ChildOrNestedArray[];
     * ```
     */
    type ChildOrNestedArray = unknown[];
    type ChildOrNestedArrayOriginal = ChildType | ChildOrNestedArrayOriginal[];

    /** Flattened children array type */
    type ChildArray = ChildType[];

    /** HTML Factory processed children type */
    type HTMLAppendable = JSX.Element | DocumentFragment | string;

    /** Array of {@link JSX.HTMLAppendable} */
    type HTMLAppendableList = HTMLAppendable[];

    /** First argument of {@link JSX.Component} functions */
    interface Properties<P extends Record<string, any> = {}> extends P {
        children: ChildArray;
    };

    /** HTML tag name type union */
    type TagName = keyof HTMLElementTagNameMap;
}

/** 
 * Utility type for extracting keys of a type from an object
 */
type KeysMatching<I extends object, T> = {
    [K in keyof I]: I[K] extends T ? K : never
}[keyof I];

declare const JSXRuntime: typeof import("../jsx-runtime").JSXRuntime;