import { Button } from '@medly-components/core';
import { defaultTheme } from '@medly-components/theme';
import { updateNestedValue } from '@medly-components/utils';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Props } from './types';

export const PrimaryButton: React.FC<Props> = React.memo(({ clickHandler, children }) => {
    return (
        <ThemeProvider
            theme={updateNestedValue(defaultTheme, 'button.outlined', {
                borderColor: {
                    default: defaultTheme.colors.grey[900],
                    hovered: defaultTheme.colors.grey[800],
                    pressed: defaultTheme.colors.grey[700],
                    disabled: defaultTheme.colors.grey[200]
                },
                textColor: {
                    default: defaultTheme.colors.grey[900],
                    hovered: defaultTheme.colors.grey[800],
                    pressed: defaultTheme.colors.grey[700],
                    disabled: defaultTheme.colors.grey[200]
                }
            })}
        >
            <Button size="S" variant="outlined" onClick={clickHandler}>
                {children}
            </Button>
        </ThemeProvider>
    );
});

PrimaryButton.displayName = 'PrimaryButton';
