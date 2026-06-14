import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Website",
    status: "New",
    notes: "",
  });

 const fetchLeads = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/leads"
    );

    console.log("API Data:", res.data);

    setLeads(res.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const updateStatus = async (
  id,
  status
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/leads/${id}`,
      { status }
    );

    fetchLeads();
  } catch (error) {
    console.error(error);
  }
};
const deleteLead = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/leads/${id}`
    );

    fetchLeads();
  } catch (error) {
    console.error(error);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/leads",
      formData
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      source: "Website",
      status: "New",
      notes: "",
    });

    fetchLeads();
  };

  return (
    <div className="container">
      <h1>Mini CRM Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>{leads.length}</h2>
          <p>Total Leads</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="lead-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Add Lead
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
<tbody>
  {leads.map((lead) => (
    <tr key={lead._id}>
      <td>{lead.name}</td>

      <td>{lead.email}</td>

      <td>{lead.phone}</td>

      <td>
        <select
          value={lead.status}
          onChange={(e) =>
            updateStatus(
              lead._id,
              e.target.value
            )
          }
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Converted</option>
        </select>
      </td>

      <td>
        <button
          onClick={() =>
            deleteLead(lead._id)
          }
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
    </div>
  );
}

export default App;