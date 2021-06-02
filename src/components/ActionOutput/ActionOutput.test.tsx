import { mockAxios, render, screen } from '@test-utils';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { ActionOutput } from './ActionOutput';

describe('Action Output', () => {
    it('should display details with logs', async () => {
        mockAxios.onGet('http://localhost:9000/action/logs').reply(200, {
            commit: {
                author: 'Andre',
                message: 'Added a new commit'
            },
            conclusion: 'failed',
            status: 'Completed',
            logs: 'These are the logs'
        });

        render(
            <MemoryRouter initialEntries={['test/logs']}>
                <Route path=":repo/logs">
                    <ActionOutput />
                </Route>
            </MemoryRouter>
        );

        const repoName = await screen.findByText(/Logs for test/i);
        expect(repoName).toBeInTheDocument();

        const author = await screen.findByText(/Andre/i);
        expect(author).toBeInTheDocument();

        const commitMsg = await screen.findByText(/Added a new commit/i);
        expect(commitMsg).toBeInTheDocument();

        const conclusion = await screen.findByText(/failed/i);
        expect(conclusion).toBeInTheDocument();

        const status = await screen.findByText(/completed/i);
        expect(status).toBeInTheDocument();

        const logs = await screen.findByText(/These are the logs/i);
        expect(logs).toBeInTheDocument();
    });

    it('should display error text', async () => {
        mockAxios.onGet('http://localhost:9000/action/logs').reply(500);

        render(
            <MemoryRouter initialEntries={['test/logs']}>
                <Route path=":repo/logs">
                    <ActionOutput />
                </Route>
            </MemoryRouter>
        );

        const error = await screen.findByText(/Some error occurred/i);
        expect(error).toBeInTheDocument();
    });
});
