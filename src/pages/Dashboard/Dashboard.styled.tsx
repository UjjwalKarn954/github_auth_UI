import { Card } from '@medly-components/core';
import { defaultTheme } from '@medly-components/theme';
import { styled } from '@styled';
import { Link } from 'react-router-dom';

export const StyledCard = styled(Card)`
    gap: 2rem;
    min-width: 30rem;
`;

export const StyledLink = styled(Link)`
    font-weight: 700;
    color: ${defaultTheme.colors.grey[900]};
`;
