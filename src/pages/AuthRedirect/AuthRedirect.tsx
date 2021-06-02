import { PageContent } from '@components/layout/PageContent/PageContent.styled';
import { DotsLoader } from '@medly-components/loaders';
import { fetch } from '@utils';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

export const AuthRedirect: React.FC = React.memo(() => {
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        const code = query.get('code');
        async function getToken() {
            const { response } = await fetch({
                method: 'GET',
                url: `http://localhost:9000/login/github/callback`,
                params: {
                    code
                }
            });
            if (response) {
                localStorage.setItem('access_token', response.data.token);
                history.push('/');
            } else alert('Some error occurred');
        }

        getToken();
    }, [history, query]);

    return (
        <PageContent>
            <DotsLoader />
        </PageContent>
    );
});

AuthRedirect.displayName = 'AuthRedirect';
