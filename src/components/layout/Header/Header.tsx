import { Avatar, Text } from '@medly-components/core';
import { defaultTheme } from '@medly-components/theme';
import { WithStyle } from '@medly-components/utils';
import React from 'react';
import * as Styled from './Header.styled';

export const Header: React.SFC & WithStyle = () => {
    return (
        <Styled.Header>
            <Styled.LeftSide>
                <Text textWeight="Strong" textVariant="h4" textColor={defaultTheme.colors.grey[900]}>
                    Github Api Test
                </Text>
            </Styled.LeftSide>
            <Styled.RightSide>
                <Avatar size="M">JD</Avatar>
            </Styled.RightSide>
        </Styled.Header>
    );
};

Header.displayName = 'Header';
Header.Style = Styled.Header;

export default Header;
