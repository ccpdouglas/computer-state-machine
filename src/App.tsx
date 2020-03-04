import React from "react"
import { useMachine } from "@xstate/react"
import "./App.css"
import computerStartup from "./machines/computerStartup"

function App() {
    const [state, send] = useMachine(computerStartup)

    return (
        <div className="App">
            <span data-testid="screenValue">
                {state.matches("off") ? "" : state.matches("loginScreen") ? "awaiting login" : state.matches("desktop") ? "welcome" : ""}
            </span>
            <button onClick={() => send("POWER_BUTTON_PUSHED")}>power</button>
            {state.matches("loginScreen") ? <button onClick={() => send("LOGIN")}>login</button> : ""}
            {state.matches("desktop") ? <button onClick={() => send("LOGOUT")}>logout</button> : ""}
        </div>
    )
}

export default App
