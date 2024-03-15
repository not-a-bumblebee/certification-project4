import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { store } from "../store";
import { Provider } from "react-redux";
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();

test('Successful Login', async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    const user = userEvent.setup()
    const usernameInput = await screen.findByTestId("username");
    const passwordInput = await screen.findByTestId("pw");
    const submitRef = await screen.findByTestId("submit")

    // screen.debug(await screen.findByText('Login'));
    // screen.debug(usernameInput)
    // screen.debug(passwordInput)
    // screen.debug(submitRef)

    console.log(window.location.pathname);

    // Filling out login Form
    await user.type(usernameInput, "bakura");
    await user.type(passwordInput, "gon");
    await user.click(submitRef);

    //waiting for login redirect to finish
    await screen.findByText("Home")


    // Redirected to home after login
    expect(window.location.pathname).toBe("/");

})