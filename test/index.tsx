import { Button } from "./button.tsx";

const App: JSX.Component<{ show?: boolean }> = ({ children, show = true }) => (
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

const t1 = performance.now();
for (let i = 0; i < 1000; i++) {
    document.getElementById("app")!.appendChild(<App show={!(i % 2)}>{i}</App>);
}
const t2 = performance.now();
console.clear();

console.log(`Loading took avg ${Math.round(t2 - t1) / 1000}ms`);

document.getElementById("app")!.innerHTML = "";
document.getElementById("app")!.appendChild(<App show={!Math.round(Math.random())}>0<br/></App>);
