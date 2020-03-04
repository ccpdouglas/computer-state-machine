import { Machine } from "xstate"

interface StateSchema {
    states: {
        off: {}
        loginScreen: {}
        desktop: {}
        error: {}
    }
}

// The events that the machine handles
type Event = { type: "POWER_BUTTON_PUSHED" } | { type: "ERROR" } | { type: "LOGIN" } | { type: "LOGOUT" }

export default Machine<{}, StateSchema, Event>({
    id: "computerStartup",
    initial: "off",
    states: {
        off: {
            on: {
                POWER_BUTTON_PUSHED: "loginScreen",
                ERROR: "error"
            }
        },
        loginScreen: {
            on: {
                POWER_BUTTON_PUSHED: "off",
                LOGIN: "desktop",
                ERROR: "error"
            }
        },
        desktop: {
            on: {
                LOGOUT: "loginScreen",
                POWER_BUTTON_PUSHED: "off",
                ERROR: "error"
            }
        },
        error: {}
    }
})
