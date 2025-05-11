export const JSXRuntime = {
    factory(type: string | JSX.Component, props: Record<string, any> | null, ...children: JSX.RawChildren[]): JSX.Element {
        const flatChildren = children.flat(Infinity) as JSX.ChildArray;

        if(typeof type !== "string") {
            return type({ children: flatChildren, ...props });
        }

        const element = document.createElement(type);

        for(let key in props) {
            let isSet = false;

            for (const plugin of PropPlugins) {
                if(plugin.filter(key)) {
                    plugin.assign(element, key, props[key]);
                    isSet = true;
                    break;
                }
            }

            if(isSet) continue;

            element.setAttribute(key, props[key]);
        }

        element.append(...buildChildren(flatChildren));

        return element;
    },

    fragmentFactory({ children }: JSX.Properties): DocumentFragment {
        const fragment = document.createDocumentFragment();
        fragment.append(...buildChildren(children));
        return fragment;
    }
}

const PropPlugins: JSXPropertyPlugin[] = [
    {
        filter: key => /^on:[A-z]+$/.test(key),
        assign(element, key, value) {
            element.addEventListener(key.match(/^on:([A-z]+)$/)?.[1] as string, value);
        }
    },
    {
        filter: key => key === "style",
        assign(element, _key, value) {
            for(let prop in value) {
                element.style[
                    prop as keyof Omit<CSSStyleDeclaration, "length" | "parentRule">
                ] = value[prop];
            }
        },
    }
]

function buildChildren(children: JSX.ChildArray): JSX.HTMLAppendableList {
    return children.map(child => (
        child instanceof Node ? child : 
        typeof child === "boolean" ? undefined :
        child.toString()
    )).filter(node => typeof node !== "undefined");
}

declare interface JSXPropertyPlugin {
    filter: (key: string) => boolean;
    assign: (element: JSX.Element, key: string, value: any) => void;
}
