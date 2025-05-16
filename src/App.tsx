import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const name = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const loanType = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loanType.current?.value || loanType.current?.value === "") {
      toast.error("Please select a loan type");
      return;
    }

    const BASE_URL = "http://54.208.204.129:3000";

    try {
      setIsLoading(true);

      const result = await fetch(`${BASE_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.current?.value,
          phoneNumber: phone.current?.value,
          email: email.current?.value,
          loanType: loanType.current?.value,
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to submit data");
      }

      toast.success("Data submitted successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="px-24 py-12">
        <h1 className="font-semibold text-xl">Input leads data</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <span className="mr-4">Name</span>
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2"
            ref={name}
          />
          <span className="mx-4">Phone number</span>
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2"
            ref={phone}
          />
          <span className="mx-4">Email</span>
          <input
            type="email"
            className="border-2 border-gray-300 rounded-md p-2"
            ref={email}
          />

          <select
            className="border-2 border-gray-300 rounded-md mx-4 p-2"
            ref={loanType}
          >
            <option disabled selected value="">
              Select loan type
            </option>
            <option value="Home loan">Home loan</option>
            <option value="Personal loan">Personal loan</option>
            <option value="Car loan">Car loan</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
