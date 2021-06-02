import { initialState } from '@store';
import { fireEvent, mockAxios, renderWithRouter, screen, waitFor } from '@test-utils';
import React from 'react';
import { Provider } from 'react-redux';
import reduxMockStore from 'redux-mock-store';
import Dashboard from './Dashboard.container';

describe('Dashboard', () => {
    const mockStore = reduxMockStore(),
        renderDashboard = (store: ReturnType<typeof mockStore>) =>
            renderWithRouter(
                <Provider store={store}>
                    <Dashboard />
                </Provider>
            );

    const location = window.location;

    beforeAll(() => {
        delete window.location;
        window.location = { ...location, assign: jest.fn() };
    });

    afterAll(() => {
        window.location = location;
    });

    it('should render properly', () => {
        const store = mockStore({ ...initialState, loading: { dashboard: { isLoading: false } } });
        const { container } = renderDashboard(store);
        expect(container).toMatchSnapshot();
    });

    it('should show loading if isLoading Prop is true', () => {
        const store = mockStore({ ...initialState, loading: { dashboard: { isLoading: true } } });
        const { container } = renderDashboard(store);
        expect(container).toMatchSnapshot();
    });

    it('should get login callback url', async () => {
        mockAxios.onGet('http://localhost:9000/login/github').reply(200, 'https://abc.com');

        const store = mockStore({ ...initialState, loading: { dashboard: { isLoading: true } } });
        renderDashboard(store);

        const loginBtn = screen.getByRole('button', { name: /Login with GitHub/i });
        fireEvent.click(loginBtn);

        waitFor(() => expect(window.location.assign).toHaveBeenCalled(), { timeout: 5000 });
    });

    it('should get repositories', async () => {
        mockAxios.onGet('http://localhost:9000/repo/getRepo').reply(200, [{ id: 1, name: 'repo1', private: true }]);

        mockAxios.onGet('http://localhost:9000/action/runs').reply(200, 'Some random logs');

        const store = mockStore({ ...initialState, loading: { dashboard: { isLoading: true } } });
        const { container } = renderDashboard(store);

        const fetchRepoBtn = screen.getByRole('button', { name: /Fetch repo/i });
        fireEvent.click(fetchRepoBtn);

        const repoData = await screen.findByText('repo1');
        expect(repoData).toBeInTheDocument();

        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
