import DigitButton from "./digit-button";

type KeyboardProps = {
  updateVotingCode: (digit: number) => void;
};

const Keyboard: React.FC<KeyboardProps> = ({ updateVotingCode }) => {
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4 w-fit justify-center bg-gray-50 p-4 border-2 rounded-lg shadow-lg">
      <DigitButton
        digit={1}
        onClick={() => updateVotingCode(1)}
        size={"size-16"}
      />
      <DigitButton
        digit={2}
        onClick={() => updateVotingCode(2)}
        size={"size-16"}
      />
      <DigitButton
        digit={3}
        onClick={() => updateVotingCode(3)}
        size={"size-16"}
      />
      <DigitButton
        digit={4}
        onClick={() => updateVotingCode(4)}
        size={"size-16"}
      />
      <DigitButton
        digit={5}
        onClick={() => updateVotingCode(5)}
        size={"size-16"}
      />
      <DigitButton
        digit={6}
        onClick={() => updateVotingCode(6)}
        size={"size-16"}
      />
      <DigitButton
        digit={7}
        onClick={() => updateVotingCode(7)}
        size={"size-16"}
      />
      <DigitButton
        digit={8}
        onClick={() => updateVotingCode(8)}
        size={"size-16"}
      />
      <DigitButton
        digit={9}
        onClick={() => updateVotingCode(9)}
        size={"size-16"}
      />
      <div className="grid grid-rows-subgrid col-span-3">
        <div className="col-start-2">
          <DigitButton
            digit={0}
            onClick={() => updateVotingCode(0)}
            size={"size-16"}
          />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
