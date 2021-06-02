import FlexContainer from '@components/FlexContainer';
import { PageContent } from '@components/layout';
import PrimaryButton from '@components/PrimaryButton';
import { Text } from '@medly-components/core';
import { LockIcon, StarRate18pxRoundedIcon } from '@medly-components/icons';
import { defaultTheme } from '@medly-components/theme';
import { fetch } from '@utils';
import React, { useState } from 'react';
import { StyledCard, StyledLink } from './Dashboard.styled';
import { Props } from './types';

export const Dashboard: React.FC<Props> = ({ isLoading }) => {
    const [repositories, setRepositories] = useState([]);

    async function gitLogin() {
        const { response } = await fetch({
            method: 'GET',
            url: 'http://localhost:9000/login/github'
        });
        window.location.assign(response.data);
    }

    async function getRepo() {
        const { response } = await fetch({
            method: 'GET',
            url: 'http://localhost:9000/repo/getRepo',
            params: {
                token: localStorage.getItem('access_token')
            }
        });
        setRepositories(response.data);
    }

    return (
        <PageContent isLoading={isLoading}>
            <FlexContainer flexWrap alignItems="center">
                {repositories.map(repo => (
                    <StyledCard display="flex" key={repo.id}>
                        <Text uppercase textVariant="h4" textWeight="Medium" textColor={defaultTheme.colors.grey[900]}>
                            {repo.name}
                            {repo.private && <LockIcon size="S" iconColor={defaultTheme.colors.blue[700]} />}
                        </Text>
                        <FlexContainer alignItems="center">
                            <FlexContainer alignItems="center">
                                {repo.stargazers_count} <StarRate18pxRoundedIcon size="L" iconColor={defaultTheme.colors.yellow[500]} />
                            </FlexContainer>
                            <StyledLink to={`/${repo.name}/logs`}>Get Logs</StyledLink>
                        </FlexContainer>
                    </StyledCard>
                ))}
            </FlexContainer>
            <FlexContainer minWidth="100%" justifyContent="center">
                <PrimaryButton clickHandler={gitLogin}>Login with Github</PrimaryButton>
                <PrimaryButton clickHandler={getRepo}>Fetch repo</PrimaryButton>
            </FlexContainer>
        </PageContent>
    );
};
