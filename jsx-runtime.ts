export const JSXRuntime = {
    factory(type: string | JSX.Component, props: Record<string, any> | null, ...children: JSX.RawChildren[]): JSX.Element {
        if(typeof type !== "string") {
            return type({ children, ...props });
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

        element.append(...JSXRuntime.buildChildren(children));

        return element;
    },

    fragmentFactory({ children }: JSX.Properties): DocumentFragment {
        const fragment = document.createDocumentFragment();
        fragment.append(...JSXRuntime.buildChildren(children));
        return fragment;
    },

    buildChildren(children: JSX.RawChildren): JSX.HTMLAppendableList {
       const flatChildren = JSXRuntime.flatten(children);

       return flatChildren.map(child => (
           child instanceof Node ? child : 
           typeof child === "boolean" ? undefined :
           child === null ? undefined :
           typeof child === "undefined" ? undefined :
           child.toString()
       )).filter(node => typeof node !== "undefined");
    },

    flatten(children: JSX.RawChildren): JSX.ChildArray {
        return (children instanceof Array ? children : [children]).flat(Infinity);
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

declare interface JSXPropertyPlugin {
    filter: (key: string) => boolean;
    assign: (element: JSX.Element, key: string, value: any) => void;
}
