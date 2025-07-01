const About = () => {
  return (
    <div className="p-4 max-w-full">
      <h1 className="font-semibold text-4xl mb-8">About</h1>
      <div className="mb-4 bg-gray-50 p-4  rounded-lg shadow-lg w-fit">
        <h2 className="font-bold text-xl mb-6">Who Are We?</h2>
        <p className="whitespace-normal break-words indent-4 max-w-4xl text-justify">
          Welcome to Damocratic, the electronic voting system that elevates
          security and transparency to a whole new level! Inspired by the
          strength and purpose of our mascot, the beaver, we’ve created a
          platform built on the robust Blockchain technology, leveraging
          Hyperledger Fabric to completely transform the way electoral processes
          are conducted.
        </p>
        <p className="whitespace-normal break-words max-w-4xl mt-2 indent-4 text-justify">
          At the heart of Damocratic lies a simple yet powerful idea: just as
          the beaver builds dams to protect and sustain its ecosystem, we have
          developed an electoral solution that not only safeguards every vote
          but also strengthens trust and integrity in the democratic process.
          Here, data is immutable, and transparency is guaranteed for all
          participants.
        </p>
      </div>

      <div className="mb-4 bg-gray-50 p-4  rounded-lg shadow-lg w-fit">
        <h2 className="font-bold text-xl mb-6">Why “Damocratic”?</h2>
        <p className="whitespace-normal break-words indent-4 max-w-4xl text-justify">
          The name is a creative blend of “Dam” and “Democratic.” Like a dam,
          our system is designed to be an impenetrable barrier against fraud
          while building the foundation for public trust. With Hyperledger
          Fabric, every vote is securely and definitively recorded, creating a
          trustworthy history that gives you confidence in your decision and
          voting power!
        </p>
      </div>

      <div className="mb-4 bg-gray-50 p-4  rounded-lg shadow-lg w-fit">
        <h2 className="font-bold text-xl mb-6">Our Mission:</h2>
        <p className="whitespace-normal break-words indent-4 max-w-4xl text-justify">
          To provide the most secure, efficient, and transparent voting
          experience possible, transforming public trust in elections through
          cutting-edge technology and democratic principles. What’s good for you
          is good for the entire ecosystem!
        </p>
      </div>
    </div>
  );
};

export default About;
