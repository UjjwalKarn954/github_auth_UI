export type Props = {
    name: string;
    output: string;
};

export type ArtifactLogs = {
    name: string;
    output: string;
};

export type Params = {
    repo: string;
};

export type LogDetail = {
    name: string;
    commit: {
        author: string;
        message: string;
    };
    conclusion: string;
    status: string;
    logs: string;
};
