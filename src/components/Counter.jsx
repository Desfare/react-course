import React, { useState } from "react";

const Counter = function() {
    const [count, setCount] = useState(0); // обрати внимание что используется двухстороннее связывание с HTML разметкой для перестройки дома (компонент считается управляемым)

    function increment() {
        setCount(count + 1)
    }
    
    function decrement() {
        setCount(count - 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

export default Counter;