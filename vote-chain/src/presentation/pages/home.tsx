import { useEffect, useState } from "react";
import { Candidate } from "../../core/entities/candidate";
import axiosInstance from "../../external/axios";
import { Vote } from "../../core/entities/vote";
import ChartVotesByCandidate from "../components/home/chart-votes-by-candidate";
import ChartVotesByParty from "../components/home/chart-votes-by-party";

const Home = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);

  const fetchCandidates = async () => {
    try {
      const response = await axiosInstance.get("/api/candidates");
      console.log("Candidates:", response.data);
      setCandidates(response.data);
    } catch {
      console.error("Error fetching candidates");
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await axiosInstance.get("/api/voting");
      console.log("Votes:", response.data);
      setVotes(response.data);
    } catch {
      console.error("Error fetching candidates");
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchVotes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-semibold text-4xl mb-8">Dashboard</h1>

      <div className="mb-4 bg-gray-50 p-4  rounded-lg shadow-lg w-fit h-fit border">
        <h2 className="text-xl font-semibold mb-4">Data</h2>
        <p className="text-lg ">Number of Candidates: {candidates.length}</p>
        <p className="text-lg ">Total Votes: {votes.length}</p>
      </div>
      <div className="flex gap-4 grow">
        <div className="mb-4 flex gap-4 w-full">
          <ChartVotesByCandidate votes={votes} />
          <ChartVotesByParty votes={votes} />
        </div>
      </div>
    </div>
  );
};

export default Home;
