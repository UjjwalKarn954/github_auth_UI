import { defaultTheme } from '@medly-components/theme';
import { styled } from '@styled';

export const darkColor = defaultTheme.colors.grey[900];

export const LogView = styled('p')`
    padding: 1rem;
    color: white;
    overflow: auto;
    max-height: 70%;
    border-radius: 4px;
    background-color: ${darkColor};
`;
