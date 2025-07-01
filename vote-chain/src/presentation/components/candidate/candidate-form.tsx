import React, { useState, useEffect } from "react";
import axiosInstance from "../../../external/axios";
import { Party } from "../../../core/entities/party";
import { Candidate } from "../../../core/entities/candidate";
import { toast } from "react-toastify";
import { ApiResponse } from "../../../core/types/apiResponse";
import ApiSuccess from "../../../core/types/successResponse";

type CandidateFormProps = {
  onSave: () => void;
  candidate?: Candidate;
};

const CandidateForm: React.FC<CandidateFormProps> = ({ onSave, candidate }) => {
  // State to store the form data
  const [formData, setFormData] = useState({
    name: candidate?.name || "",
    idParty: candidate?.idParty || "",
    votingCode: candidate?.votingCode || "",
  });
  const [parties, setParties] = useState<Party[]>([]);

  // Fetch parties from the API
  const fetchParties = async () => {
    try {
      const response = await axiosInstance.get("/api/parties");
      console.log("parties:", response.data);
      setParties(response.data);
    } catch (error) {
      console.error("Erro ao carregar os partidos:", error);
    }
  };

  // Fetch parties when the component mounts
  useEffect(() => {
    fetchParties();
  }, []);

  // Updates the form data when the user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (candidate) {
        // Send the form data to the API to update the candidate
        const response = await axiosInstance.put("/api/candidates", {
          idCandidate: candidate.idCandidate,
          ...formData,
        });

        const data = response.data as ApiResponse;
        console.log("Resposta da API:", data);
        if (data.type === ApiSuccess.CANDIDATE_UPDATED) {
          toast.success(data.message);
          setFormData({
            name: "",
            idParty: "",
            votingCode: "",
          });
        } else {
          toast.error(data.message);
        }
      } else {
        // Send the form data to the API to create a new candidate
        const response = await axiosInstance.post("/api/candidates", formData);

        const data = response.data as ApiResponse;
        console.log("Resposta da API:", data);
        if (data.type === ApiSuccess.CANDIDATE_REGISTERED) {
          toast.success(data.message);
          setFormData({
            name: "",
            idParty: "",
            votingCode: "",
          });
        } else {
          toast.error(data.message);
        }
      }
      // Callback to refresh the list of candidates
      onSave();
    } catch {
      console.error("Error saving candidate.");
      return;
    }
  };

  // Função para limpar os campos do formulário
  const handleCancel = () => {
    setFormData({
      name: "",
      idParty: "",
      votingCode: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label
          htmlFor="idParty"
          className="block text-sm font-medium text-gray-700"
        >
          Party
        </label>
        <select
          id="idParty"
          name="idParty"
          value={formData.idParty}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            Select a party
          </option>
          {parties.map((party) => (
            <option key={party.idParty} value={party.idParty}>
              {party.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="votingCode"
          className="block text-sm font-medium text-gray-700"
        >
          Voting Number
        </label>
        <input
          id="votingCode"
          name="votingCode"
          type="text"
          value={formData.votingCode}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
