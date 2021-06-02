import { render, screen } from '@test-utils';
import React from 'react';
import Header from './Header';

describe('Header', () => {
    it('should render properly', () => {
        render(<Header />);
        expect(screen.getByText('Github Api Test')).toBeInTheDocument();
    });
});
