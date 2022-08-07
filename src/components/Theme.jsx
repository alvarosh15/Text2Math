import React, { useEffect, useContext } from "react";
import { Context } from "../context/context.jsx";

function Theme () {

    const { checked, setChecked } = useContext(Context)

    useEffect(() => {
        document
          .getElementsByTagName("HTML")[0]
          .setAttribute("data-theme", localStorage.getItem("theme"));
      }, [checked]);

    const toggleThemeChange = () => {
        if (checked === false) {
          localStorage.setItem("theme", "dark");
          setChecked(true);
        } else {
          localStorage.setItem("theme", "light");
          setChecked(false);
        }
      };
    
    return (
        <button className="theme" onClick={toggleThemeChange}>
            {checked ? "Modo claro" : "Modo oscuro"}
        </button>
    )
}

export default Theme