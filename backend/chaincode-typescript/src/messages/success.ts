type Message = {
    code: number;
    type: string;
    message: string;
};

const success: { [key: string]: Message } = {
    CANDIDATE_DELETED: {
        code: 2001,
        type: 'CANDIDATE_DELETED',
        message: `The candidate has been deleted successfully.`,
    },
    CANDIDATE_UPDATED: {
        code: 2002,
        type: 'CANDIDATE_UPDATED',
        message: `The candidate has been updated successfully.`,
    },
    CANDIDATE_REGISTERED: {
        code: 2003,
        type: 'CANDIDATE_REGISTERED',
        message: `The candidate has been registered successfully.`,
    },
    VOTE_REGISTERED: {
        code: 2004,
        type: 'VOTE_REGISTERED',
        message: `The vote has been registered successfully.`,
    },
};

export default success;
