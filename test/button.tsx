export const Button: JSX.Component<{
    onClick: JSX.IntrinsicElement<"button">["on:click"];
    value: string
}> = ({ onClick, value, children }) => (
    <button on:click={onClick} style={{
        backgroundColor: "#ff00ff"
    }}>
        {value}
        {children}
    </button>
);
