import { useEffect, useState } from "react";
import Actions from "../components/vote/actions";
import CandidateData from "../components/vote/candidate-data";
import Keyboard from "../components/vote/keyboard";
import axiosInstance from "../../external/axios";
import { toast } from "react-toastify";
import { Candidate } from "../../core/entities/candidate";

const Vote = () => {
  const [votingCode, setVotingCode] = useState<number[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [validCode, setValidCode] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>("");

  const updateCode = (digit: number) => {
    if (votingCode.length < 5) {
      if (votingCode.length === 0 && digit === 0) {
        toast.error("The code can't start with 0.");
        return;
      }
      setVotingCode([...votingCode, digit]);
      console.log(votingCode);
    }
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      if (votingCode.length === 5) {
        const candidateCode = votingCode.join("");
        console.log("Voting code: ", candidateCode);

        const response = await axiosInstance.get(
          `/api/candidates/?votingCode=${candidateCode}`
        );

        if (response.data && response.data.length > 0) {
          console.log("Candidate Data:", response.data);
          setCandidate(response.data[0]);
          setValidCode(true);
        } else {
          setCandidate(null);
          setValidCode(false);
          toast.error("No candidate found");
        }
      }
    };
    fetchCandidate();

    return () => {
      setCandidate(null);
      setValidCode(false);
    };
  }, [votingCode]);

  return (
    <div className="p-4">
      <h1 className="font-semibold text-4xl mb-8">Vote</h1>

      <div className="flex gap-2">
        <div className="bg-gray-50 p-4 border-2 rounded-lg shadow-lg">
          <CandidateData votingCode={votingCode} candidate={candidate} cpf={cpf} setCpf={setCpf} />
          <Actions
            votingCode={Number(votingCode.join(""))}
            cpf={cpf}
            validCode={validCode}
            onClear={() => {
              setCandidate(null);
              setValidCode(false);
              setVotingCode([]);
              setCpf("");
            }}
          />
        </div>
        <div>
          <Keyboard updateVotingCode={updateCode} />
        </div>
      </div>
    </div>
  );
};

export default Vote;
