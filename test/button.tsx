export const Button: JSX.Component<{
    onClick: JSX.IntrinsicElement<"button">["on:click"];
    value: string
}> = function({ onClick, value, children }) {
    return (
        <button on:click={onClick} style={{
            backgroundColor: "#ff00ff"
        }}>
            {value}
            {...children}
        </button>
    );
}
