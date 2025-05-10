import { Button } from "./button.tsx";

function App({ children, show = true }: JSX.Properties<{ show?: boolean }>): JSX.Element {
    return (
        <>
            <h1>Hello world</h1>
            <Button onClick={()=>console.log("clicked!")} value="Click me">
                <h1>{children}</h1>
                k
            </Button>
            <></>
            <img/>
            <p>{show && children}</p>
            hello
        </>
    );
}

const t1 = performance.now();
for(let i = 0;i<100;i++)document.getElementById("app")!.appendChild(<App show={!(i % 2)}>{i}<br/></App>);
const t2 = performance.now();

console.log(`Loading took avg ${Math.round(t2 - t1) / 100}ms`);

document.getElementById("app")!.innerHTML = "";
document.getElementById("app")!.appendChild(<App show={!Math.round(Math.random())}>0<br/></App>);