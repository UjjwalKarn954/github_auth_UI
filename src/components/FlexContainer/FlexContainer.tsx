import React from 'react';
import * as Styled from './FlexContainer.styled';
import { Props } from './types';

export const FlexContainer: React.FC<Props> = React.memo(props => {
    return <Styled.FlexContainer {...props}>{props.children}</Styled.FlexContainer>;
});

FlexContainer.displayName = 'FlexContainer';
