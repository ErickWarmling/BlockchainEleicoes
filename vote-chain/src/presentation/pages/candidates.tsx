import { useEffect, useState } from "react";
import { Candidate } from "../../core/entities/candidate";
import axiosInstance from "../../external/axios";
import FormDialog from "../components/candidate/candidate-dialog";
import CandidateDeleteDialog from "../components/candidate/candidate-delete-dialog";

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);

  const fetchCandidates = async () => {
    try {
      const response = await axiosInstance.get("/api/candidates");
      console.log(response.data);
      setCandidates(response.data);

      // setError(false);
    } catch {
      // setError(true);
    } finally {
      // setLoading(false);
    }
  };

  // Fetch candidates when the component mounts
  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-semibold text-4xl mb-8">Manage Candidates</h1>

      <div className="mb-4 bg-gray-50 p-4  rounded-lg shadow-lg">
        <FormDialog
          title="Register Candidate"
          triggerLabel="Register New"
          onSave={() => fetchCandidates()}
        />
      </div>

      <div className="min-w-full rounded-2xl">
        {candidates.length > 0 ? (
          <table className="w-full p-4 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 rounded-tl-lg">Name</th>
                <th className="px-4 py-2 w-72">Party</th>
                <th className="px-4 py-2 w-40">Number</th>
                <th className="px-4 py-2 rounded-tr-lg min-w-fit w-60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-gray-500 rounded-b-lg"
                  >
                    No candidates registered yet.
                  </td>
                </tr>
              ) : (
                candidates.map((candidate, index) => (
                  <tr
                    key={candidate.idCandidate}
                    className={`hover:bg-gray-50 cursor-default ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } ${index === candidates.length - 1 ? "rounded-b-lg" : ""}`}
                  >
                    <td
                      className={`border-t px-4 py-2 ${
                        index === candidates.length - 1 ? "rounded-bl-lg" : ""
                      }`}
                    >
                      {candidate.name}
                    </td>
                    <td className="border-t px-4 py-2">{candidate.idParty}</td>
                    <td className="border-t px-4 py-2">
                      {candidate.votingCode}
                    </td>
                    <td
                      className={`border-t px-4 py-2 space-x-4 min-w-fit w-auto flex justify-center ${
                        index === candidates.length - 1 ? "rounded-br-lg" : ""
                      }`}
                    >
                      <FormDialog
                        title="Edit Candidate"
                        triggerLabel="Edit"
                        onSave={() => fetchCandidates()}
                        candidate={candidate}
                        variant="secondary"
                      />

                      <CandidateDeleteDialog
                        candidate={candidate}
                        onSave={() => fetchCandidates()}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <div className="mb-4 bg-gray-50 p-4  rounded-lg shadow-lg">
            <p className="text-gray-500 text-center ">
              No cadidates registered yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
