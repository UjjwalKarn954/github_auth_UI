import { cleanup, renderWithStore } from '@test-utils';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Routes } from './Routes';

describe('Routes', () => {
    afterEach(cleanup);

    it('should render dashboard page properly', async () => {
        const { findByText } = renderWithStore(
            <MemoryRouter initialEntries={[{ pathname: `/` }]}>
                <Routes />
            </MemoryRouter>
        );
        const dashboard = await findByText(/Login with GitHub/i);
        expect(dashboard).toBeInTheDocument();
    });
});
