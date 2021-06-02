import { PageContent } from '@components';
import FlexContainer from '@components/FlexContainer';
import { Chip, Text } from '@medly-components/core';
import { ErrorOutlineIcon } from '@medly-components/icons';
import { DotsLoader } from '@medly-components/loaders';
import { fetch } from '@utils';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { darkColor, LogView } from './ActionOutput.styled';
import { LogDetail, Params } from './types';

export const ActionOutput: React.FC = React.memo(() => {
    const { repo } = useParams<Params>();
    const [logDetail, setLogDetail] = useState<LogDetail | null>(null);
    const [state, setState] = useState<'pending' | 'fulfilled' | 'rejected'>('pending');

    useEffect(() => {
        async function updateLogs() {
            const { response } = await fetch({
                method: 'GET',
                url: 'http://localhost:9000/action/logs',
                params: {
                    token: localStorage.getItem('access_token'),
                    repo,
                    user: 'pulkitbanta'
                }
            });
            if (response) {
                setLogDetail({
                    name: repo,
                    commit: { author: response.data.commit.author, message: response.data.commit.message },
                    conclusion: response.data.conclusion,
                    status: response.data.status,
                    logs: response.data.logs
                });
                setState('fulfilled');
            } else setState('rejected');
        }

        updateLogs();
    }, [repo]);

    return (
        <PageContent>
            {state === 'fulfilled' && (
                <>
                    <Text textVariant="h4" textColor={darkColor}>
                        Latest Commit: {logDetail.commit.message} (author: {logDetail.commit.author})
                    </Text>
                    <Chip color={darkColor} variant="outlined" label={`Status: ${logDetail.status}`} />
                    <Chip color={darkColor} variant="outlined" label={`Conclusion: ${logDetail.conclusion}`} />
                    <Text textVariant="h2" textColor={darkColor}>
                        Logs for {logDetail.name}:
                    </Text>
                    <LogView>{logDetail.logs}</LogView>
                </>
            )}
            {state === 'pending' && <DotsLoader />}
            {state === 'rejected' && (
                <FlexContainer alignItems="center">
                    <ErrorOutlineIcon iconColor="red" size="XL" variant="flat" />
                    <Text textVariant="h4" textColor="red" textWeight="Light">
                        Some error occurred
                    </Text>
                </FlexContainer>
            )}
        </PageContent>
    );
});

ActionOutput.displayName = 'ActionOutput';
export default ActionOutput;
