import React, { useState } from "react";
import axios from "axios";
import "./CurrencyConverter.css";

function App() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currencyCodes = ["USD", "EUR", "GBP", "GHS", "JPY", "CAD", "INR"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "https://currency-converter-hn5n.onrender.com/api/convert",
        formData,
      );

      setResult(response.data);
      setError("");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="overlay"></div>

      <div className="container">
        <div className="hero">
          <h1>Global Currency Converter</h1>
          <p>
            Convert currencies instantly with live exchange rates around the
            world.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label>From</label>
              <select
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Currency</option>

                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>To</label>

              <select
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Currency</option>

                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="input"
              />
            </div>

            <button type="submit" className="submit-btn">
              {loading ? "Converting..." : "Convert Currency"}
            </button>
          </form>

          {result && (
            <div className="result-card">
              <h2>Conversion Result</h2>

              <p className="amount">
                {formData.amount} {formData.from} =
              </p>

              <h1>
                {parseFloat(result.convertedAmount).toFixed(2)} {result.target}
              </h1>

              <p className="rate">Exchange Rate: {result.conversionRate}</p>
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
