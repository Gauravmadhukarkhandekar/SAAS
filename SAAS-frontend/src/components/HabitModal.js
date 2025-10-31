import { React, useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    habit: "",
    frequency: "daily",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.habit.trim()) {
      setError("Please enter a habit name.");
      return;
    }
    setError("");
    alert(`Habit added: ${formData.habit} (${formData.frequency})`);
    setFormData({ habit: "", frequency: "daily" });
  };

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h5 className="mb-3">Add New Habit</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="habit" className="form-label">
            Habit Name
          </label>
          <input
            type="text"
            id="habit"
            name="habit"
            value={formData.habit}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. Morning meditation"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="frequency" className="form-label">
            Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="form-select"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <button type="submit" className="btn btn-custom">
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default Form;