import { mockAxios, renderWithRouter } from '@test-utils';
import React from 'react';
import { AuthRedirect } from './AuthRedirect';

describe('AuthRedirect', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {
        console.log('alert called');
    });

    it('should render properly', () => {
        mockAxios.onGet(`http://localhost:9000/login/github/callback`).reply(200, { token: 'ureioqpw' });
        const { container } = renderWithRouter(<AuthRedirect />);
        expect(container).toMatchSnapshot();
    });

    it('should display alert', () => {
        mockAxios.onGet(`http://localhost:9000/login/github/callback`).reply(500, { message: 'Cannot authenticate' });
        const { container } = renderWithRouter(<AuthRedirect />);
        expect(container).toMatchSnapshot();
    });
});
