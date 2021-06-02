import { styled } from '@styled';
import { Props } from './types';

export const FlexContainer = styled('div')<Props>`
    display: flex;
    padding: 1rem;
    gap: ${({ gap }) => gap};
    flex: ${({ flexGrow }) => (flexGrow ? 1 : 'auto')};
    flex-wrap: ${({ flexWrap }) => (flexWrap ? 'wrap' : 'nowrap')};
    min-width: ${({ minWidth }) => minWidth};
    align-items: ${({ alignItems }) => alignItems};
    justify-content: ${({ justifyContent }) => justifyContent};
`;

FlexContainer.defaultProps = {
    gap: '1rem',
    flexGrow: false,
    flexWrap: false,
    minWidth: 'auto',
    alignItems: 'initial',
    justifyContent: 'initial'
};
