import React, { useState } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [panels, setPanels] = useState("");
  const [inverter, setInverter] = useState("");
  const [battery, setBattery] = useState("");
  const [totalLoad, setTotalLoad] = useState(null);

  const calculateLoad = (e) => {
    e.preventDefault();

    // Realistic default watt values (adjust as needed)
    const panelWatts = 550;      // average modern panel
    const inverterWatts = 1000;  // per kW
    const batteryWatts = 2000;   // example per battery

    const panelLoad = (parseFloat(panels) || 0) * panelWatts;
    const inverterLoad = (parseFloat(inverter) || 0) * inverterWatts;
    const batteryLoad = (parseFloat(battery) || 0) * batteryWatts;

    const total = panelLoad + inverterLoad + batteryLoad;
    setTotalLoad(total);
  };

  const resetForm = () => {
    setPanels("");
    setInverter("");
    setBattery("");
    setTotalLoad(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h1>Solar Load Calculator</h1>
        <p className="lead-text">
          Estimate your solar system capacity by entering approximate values for panels, inverter, and batteries.
        </p>

        <form onSubmit={calculateLoad} className="calculator-form">
          <div className="form-group">
            <label htmlFor="panels">Number of Solar Panels</label>
            <input
              id="panels"
              type="number"
              min="0"
              placeholder="e.g. 10"
              value={panels}
              onChange={(e) => setPanels(e.target.value)}
              required
            />
            <small>~550W per panel (typical)</small>
          </div>

          <div className="form-group">
            <label htmlFor="inverter">Inverter Capacity (kW)</label>
            <input
              id="inverter"
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g. 5"
              value={inverter}
              onChange={(e) => setInverter(e.target.value)}
              required
            />
            <small>Typical home: 3–10 kW</small>
          </div>

          <div className="form-group">
            <label htmlFor="battery">Number of Batteries</label>
            <input
              id="battery"
              type="number"
              min="0"
              placeholder="e.g. 4"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
              required
            />
            <small>~2kWh per battery (example)</small>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-calculate">
              Calculate Total Load
            </button>
            <button type="button" className="btn-reset" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        {totalLoad !== null && (
          <div className="result-section">
            <h3>Total Estimated Capacity</h3>
            <div className="total-value">
              {totalLoad.toLocaleString()} <span>W</span>
            </div>
            <p className="result-note">
              This is an approximate total power output.<br />
              Real performance varies based on efficiency, sunlight, and system setup.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;