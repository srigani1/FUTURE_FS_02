import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
useEffect(() => {
  if (!localStorage.getItem("token")) {
    window.location.href = "/FUTURE_FS_02/";
  }
}, []);function Dashboard() {
  const [leads, setLeads] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const API = "https://srigani1-mini-crm-backend.onrender.com/api/leads";

  const fetchLeads = async () => {
    try {
      const res = await axios.get(API);
      setLeads(res.data);
    } catch (err) {
      console.log(err);
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

  const addLead = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API, {
        ...formData,
        source: "Website",
        status: "New",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: "",
      });

      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/FUTURE_FS_02/";
  };

  return (
    <div className="container">
      <h1 className="title">Mini CRM Dashboard</h1>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <div className="card">
        <h2>{leads.length}</h2>
        <p>Total Leads</p>
      </div>

      <form className="lead-form" onSubmit={addLead}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
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
              <td>{lead.status}</td>

              <td>
                <button
                  onClick={() => deleteLead(lead._id)}
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

export default Dashboard;