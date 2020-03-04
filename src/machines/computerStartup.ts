import { Machine } from "xstate"
import { RenderResult } from "@testing-library/react"

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
            },
            meta: {
                test: ({ getByTestId, getByText }: RenderResult) => {
                    expect(getByText("power")).toBeDefined()
                    expect(getByTestId("screenValue").textContent).toBe("")
                }
            }
        },
        loginScreen: {
            on: {
                POWER_BUTTON_PUSHED: "off",
                LOGIN: "desktop",
                ERROR: "error"
            },
            meta: {
                test: ({ getByTestId, getByText }: RenderResult) => {
                    expect(getByText("power")).toBeDefined()
                    expect(getByText("login")).toBeDefined()
                    expect(getByTestId("screenValue").textContent).toBe("awaiting login")
                }
            }
        },
        desktop: {
            on: {
                LOGOUT: "loginScreen",
                POWER_BUTTON_PUSHED: "off",
                ERROR: "error"
            },
            meta: {
                test: ({ getByTestId, getByText }: RenderResult) => {
                    expect(getByText("power")).toBeDefined()
                    expect(getByText("logout")).toBeDefined()
                    expect(getByTestId("screenValue").textContent).toBe("welcome")
                }
            }
        },
        error: {}
    }
})
