import { useState } from "react";

export default function TravelForm() {
  const [formData, setFormData] = useState({
    location: "",
    budget: "",
    travelStyle: "",
    interests: "",
    travelDates: "",
    numPeople: "",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `Generate a detailed travel itinerary:\n
    - Location: ${formData.location}
    - Budget: ${formData.budget}
    - Travel Style: ${formData.travelStyle}
    - Interests: ${formData.interests}
    - Travel Dates: ${formData.travelDates}
    - Number of People: ${formData.numPeople}
    - Additional Notes: ${formData.additionalNotes || "None"}\n
    Ensure the itinerary includes daily plans, places to visit, estimated costs, and local food recommendations.`;

    try {
      const response = await fetch("http://localhost:5000/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();
      setItinerary(result.itinerary);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">AI-Powered Travel Planner</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Budget ($)</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Travel Style</label>
            <input
              type="text"
              name="travelStyle"
              value={formData.travelStyle}
              onChange={handleChange}
              placeholder="Luxury, Adventure, Budget..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Interests</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Food, History, Nightlife..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Travel Dates</label>
            <input
              type="date"
              name="travelDates"
              value={formData.travelDates}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Number of People</label>
            <input
              type="number"
              name="numPeople"
              value={formData.numPeople}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">
              Additional Considerations
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any specific needs?"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 p-2 bg-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get Itinerary"}
          </button>
        </form>
      </div>

      {itinerary && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Generated Itinerary:</h3>
          <p className="mt-2 whitespace-pre-wrap">{itinerary}</p>
        </div>
      )}
    </div>
  );
}
