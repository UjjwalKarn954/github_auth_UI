import { render, screen } from '@test-utils';
import React from 'react';
import { FlexContainer } from './FlexContainer';

describe('Flex Container', () => {
    it('should render properly with children', () => {
        const { container } = render(<FlexContainer>Sample text</FlexContainer>);
        expect(screen.getByText(/Sample text/i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should render properly with flex-grow and flex-wrap', () => {
        const { container } = render(
            <FlexContainer flexGrow flexWrap>
                Sample text
            </FlexContainer>
        );
        expect(container).toMatchSnapshot();
    });
});
