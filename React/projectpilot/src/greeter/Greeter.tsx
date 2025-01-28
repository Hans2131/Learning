function Greeter({first, last}: {first: string, last?: string}) {
    return <h1>Hello, {first} {last}</h1>;
}

export default Greeter;
