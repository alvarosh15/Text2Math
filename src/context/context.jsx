import React, { createContext, useState } from 'react';


const Context = createContext()

function ContextProvider({ children }) {

    const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);

    return (
        <Context.Provider
        value={
            {
                checked,
                setChecked
            }
        }>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }