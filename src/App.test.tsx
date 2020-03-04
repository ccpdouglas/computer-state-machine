import React from "react"
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react"
import { createModel } from "@xstate/test"
import App from "./App"
import computerStartup from "./machines/computerStartup"

const computerModel = createModel<RenderResult>(computerStartup).withEvents({
    POWER_BUTTON_PUSHED: ({ getByText }) => {
        fireEvent.click(getByText("power"))
    },
    LOGIN: ({ getByText }) => {
        fireEvent.click(getByText("login"))
    },
    LOGOUT: ({ getByText }) => {
        fireEvent.click(getByText("logout"))
    }
})

const testPlans = computerModel.getSimplePathPlans()

testPlans.forEach(plan => {
    describe(plan.description, () => {
        afterEach(cleanup)

        plan.paths.forEach(({ description, test }) => {
            it(description, async () => {
                const rendered = render(<App />)
                await test(rendered)
            })
        })
    })
})
