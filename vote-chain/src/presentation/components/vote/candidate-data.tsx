import React from "react";
import DigitButton from "./digit-button";
import { Candidate } from "../../../core/entities/candidate";

type CandidateDataProps = {
  votingCode: number[];
  candidate: Candidate | null;
  cpf: string;
  setCpf: (value: string) => void;
};

const CandidateData: React.FC<CandidateDataProps> = ({
  votingCode,
  candidate,
  cpf,
  setCpf
}) => {
  return (
    <div>
      <div className="mb-8">
        <label htmlFor="votingCode" className="text-lg font-semibold">
          Candidate Code
        </label>
        <div className="flex gap-2">
          <DigitButton digit={votingCode[0]} disabled={true} />
          <DigitButton digit={votingCode[1]} disabled={true} />
          <DigitButton digit={votingCode[2]} disabled={true} />
          <DigitButton digit={votingCode[3]} disabled={true} />
          <DigitButton digit={votingCode[4]} disabled={true} />
        </div>
      </div>

      <h2 className="text-lg mb-4 font-semibold">Candidate</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        className="border-2 p-2 rounded-lg w-full bg-white"
        disabled
        value={candidate?.name || ""}
      />
      <label htmlFor="idParty">Party</label>
      <input
        id="idParty"
        type="text"
        className="border-2 p-2 rounded-lg w-full bg-white"
        disabled
        value={candidate?.idParty || ""}
      />
      <div className="mt-6">
        <label htmlFor="cpf" className="block font-semibold mb-1">
          CPF do votante
        </label>
        <input
          id="cpf"
          type="text"
          inputMode="numeric"
          maxLength={14}
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="border-2 p-2 rounded-lg w-full"
          required
        />
      </div>
    </div>
  );
};

export default CandidateData;
