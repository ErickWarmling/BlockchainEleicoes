type Error = {
  code: number;
  type: string;
  message: string;
};

const errors: { [key: string]: Error } = {
  CANDIDATE_DOESNT_EXISTS: {
    code: 1001,
    type: "CANDIDATE_DOESNT_EXISTS",
    message: `The refered candidate doesn't exists.`,
  },
  CANDIDATE_UPDATE_ERROR: {
    code: 1002,
    type: "CANDIDATE_UPDATE_ERROR",
    message: `Error updating candidate.`,
  },
  CANDIDATE_HAS_VOTES: {
    code: 1002,
    type: "CANDIDATE_HAS_VOTES",
    message: `The candidate can't be deleted because there are votes associated with him.`,
  },
  CANDIDATE_ALREADY_EXISTS: {
    code: 1003,
    type: "CANDIDATE_ALREADY_EXISTS",
    message: `The candidate already exists.`,
  },
  PARTY_NOT_FOUND: {
    code: 1004,
    type: "PARTY_NOT_FOUND",
    message: `The refered party doesn't exists.`,
  },
  CANDIDATE_DELETE_ERROR: {
    code: 1005,
    type: "CANDIDATE_DELETE_ERROR",
    message: `Error deleting candidate.`,
  },
  ASSET_TYPE_MISMATCH: {
    code: 1006,
    type: "ASSET_TYPE_MISMATCH",
    message: `The asset type is not valid.`,
  },
  INVALID_VOTING_CODE: {
    code: 1007,
    type: "INVALID_VOTING_CODE",
    message: `The voting code is not valid, it must be a 5 digit number.`,
  },
  VOTING_CODE_ALREADY_EXISTS: {
    code: 1008,
    type: "VOTING_CODE_ALREADY_EXISTS",
    message: `The informed voting code is already associated with another candidate.`,
  },
  VOTE_INVALID_TIMESTAMP: {
    code: 1009,
    type: "VOTE_INVALID_TIMESTAMP",
    message: `The informed timestamp is invalid.`,
  },
  VOTE_REGISTER_ERROR: {
    code: 1010,
    type: "VOTE_REGISTER_ERROR",
    message: `Error registering vote.`,
  },
  NO_CANDIDATES_REGISTERED: {
    code: 1011,
    type: "NO_CANIDATES_REGISTERED",
    message: `No candidates registered.`,
  },
  CANDIDATE_HAS_NO_PARTY: {
    code: 1012,
    type: "CANDIDATE_HAS_NO_PARTY",
    message: `The candidate has no party.`,
  },
};

export default errors;
