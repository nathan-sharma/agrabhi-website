import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import logo from "/blogo.png";

export default function DataHub() {
  const [gpsInput, setGpsInput] = useState({ lat: "", lon: "" });
 const [prediction, setPrediction] = useState(null);
const [maxUncertainty, setMaxUncertainty] = useState(null);
  const [connected, setConnected] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [logs, setLogs] = useState([]);
  const [droneStatus, setDroneStatus] = useState("Unknown");
const [rmse, setRmse] = useState(null);
const [rmseCount, setRmseCount] = useState(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const [heatmapImg, setHeatmapImg] = useState(null);
  const [piIp, setPiIp] = useState("100.78.133.78");

  const piIpRef = useRef(piIp);
  useEffect(() => {
    piIpRef.current = piIp;
  }, [piIp]);

  const baseURL = `http://${piIp}:5000`;

  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);
const [simInput, setSimInput] = useState({
  lat: "",
  lon: "",
  moisture: ""
});
const [modelConfig, setModelConfig] = useState({
  regression: "cubic",
  variogram: "spherical"
});
const [regressionImg, setRegressionImg] = useState(null);
const [variogramImg, setVariogramImg] = useState(null);
const [r2, setR2] = useState(null);
const [varError, setVarError] = useState(null);

  useEffect(() => {
    if (!connected) return;
    if (leafletMap.current) return;

    leafletMap.current = L.map(mapRef.current).setView([0, 0], 2);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles © Esri" }
    ).addTo(leafletMap.current);
  }, [connected]);
useEffect(() => {
  if (!connected) return;
  loadHeatmap();
}, [modelConfig]);


useEffect(() => {
  if (!connected) return;

  updateRMSE();
}, [connected, modelConfig.regression, modelConfig.variogram]);


  function drawMarker(point) {
    if (!leafletMap.current) return;

    const [ID, lat, lon, moist] = point;

    const marker = L.circleMarker([lat, lon], {
      radius: 8,
      fillColor:
        moist > 20
          ? "#0000ff"
          : moist > 15
          ? "#0077ff"
          : moist > 10
          ? "#00ccff"
          : "#ff4400",
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
    })
      .addTo(leafletMap.current)
      .bindPopup(`Sample ${ID}<br>Moisture: ${moist}%`);

    markersRef.current.push(marker);

    const group = L.featureGroup(markersRef.current);
    leafletMap.current.fitBounds(group.getBounds(), {
      padding: [50, 50],
      maxZoom: 18,
    });
  }

  function addLog(message, type = "info") {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [{ time, message, type }, ...prev]);
  }
async function triggerLocalNetworkPrompt() {
  try {
    const pc = new RTCPeerConnection({
      iceServers: [] // no external servers needed
    });

    // Create a dummy data channel
    pc.createDataChannel("trigger");

    // Create and set local description (this starts ICE gathering)
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Give it a moment to gather ICE candidates
    await new Promise(resolve => setTimeout(resolve, 1000));

    pc.close();
  } catch (e) {
    console.log("Local network permission trigger failed:", e);
  }
}

  async function connectToPi() {
  const url = `http://${piIpRef.current}:5000`;

 

  // 👇 Trigger iOS local network prompt
 

  setStatusMsg("Connecting...");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${url}/get_latest_point`, {
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (res.ok) {
      setConnected(true);
      addLog("Connected successfully!", "success");
      setStatusMsg("Connected!");

      setTimeout(() => loadHeatmap(), 200);
    } else {
      throw new Error();
    }
  } catch {
    setConnected(false);
    addLog("Unable to connect", "error");
    setStatusMsg(
      "Failed to connect. Check your IP address and make sure all components are powered on and connected to the internet."
    )
  }
}


  async function sendCommand(cmd) {
    addLog(`Sending ${cmd.toUpperCase()} command...`);
    try {
      const res = await fetch(`${baseURL}/${cmd}`);
      const text = await res.text();
      addLog(text, text.includes("SUCCESS") ? "success" : "error");
    } catch {
      addLog("Command failed", "error");
    }
  }

  async function logData(force = false) {
    const endpoint = force ? "/log?override=true" : "/log";
    addLog(force ? "Force logging data..." : "Logging data...");

    try {
      const res = await fetch(`${baseURL}${endpoint}`);
      const data = await res.json();

      if (data.status === "warning") return addLog(data.message, "warn");
      if (data.status === "error") return addLog(data.message, "error");

      addLog(`Logged Sample ${data.new_point[0]}`, "success");
      drawMarker(data.new_point);
      loadHeatmap();
      updateRMSE();
    } catch {
      addLog("Log failed", "error");
    }
  }
async function updateRMSE() {
  try {
    const res = await fetch(`${baseURL}/loocv_rmse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modelConfig)
    });

    const data = await res.json();

    if (data.error) return;

    setRmse(data.rmse);
    setRmseCount(data.n_points_used);
  } catch {
    addLog("Failed to compute LOOCV RMSE", "error");
  }
}



  async function collect() {
    addLog("Requesting live sensor data...");
    try {
      const res = await fetch(`${baseURL}/collect`);
      const data = await res.json();
      addLog(
        `READOUT: Lat ${data.lat}, Lon ${data.lon} | Moisture ${data.moisture}% | Elev ${data.elevation}m`,
        "info"
      );
    } catch {
      addLog("Sensor read failed", "error");
    }
  }

  async function loadHeatmap() {
  try {
    const res = await fetch(`${baseURL}/heatmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modelConfig),
      cache: "no-store"
    });

    const data = await res.json();

    if (!data || data.error) {
      addLog(data.error || "Heatmap missing response", "error");
      return;
    }

    if (!data.image) {
      addLog("Heatmap missing image field", "error");
      return;
    }

    setHeatmapImg(`data:image/png;base64,${data.image}`);

    if (data.regression_plot) {
      setRegressionImg(`data:image/png;base64,${data.regression_plot}`);
    }

    if (data.variogram_plot) {
      setVariogramImg(`data:image/png;base64,${data.variogram_plot}`);
    }

    if (data.max_uncertainty) {
      setMaxUncertainty(data.max_uncertainty);
    }
    if (data.regression_r2 !== undefined) {
  setR2(data.regression_r2);
}

    if (data.variogram_fit_error !== undefined) {
  setVarError(data.variogram_fit_error);
}


    updateRMSE();
  } catch (err) {
    console.log(err);
    addLog("Failed to load heatmap", "error");
  }
}


  async function predictMoisture() {
    try {
      const res = await fetch(`${baseURL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: parseFloat(gpsInput.lat),
          lon: parseFloat(gpsInput.lon)
        })
      });

      const data = await res.json();

      if (data.error) {
        addLog(data.error, "error");
        return;
      }

      setPrediction(data.predicted_moisture);

      addLog(
        `Predicted moisture at (${data.lat}, ${data.lon}) = ${data.predicted_moisture.toFixed(2)}%`,
        "success"
      );
    } catch {
      addLog("Prediction failed", "error");
    }
  }

  async function clearLogs() {
    if (!confirm("Are you sure you want to clear all logs? This cannot be undone.")) return;
    try {
      const res = await fetch(`${baseURL}/clear_logs`);
      const text = await res.text();
      addLog(text, "success");
    } catch {
      addLog("Failed to clear logs", "error");
    }
  }
async function simulateData() {
  addLog("Simulating point...");

  try {
    const res = await fetch(`${baseURL}/simulate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lat: parseFloat(simInput.lat),
        lon: parseFloat(simInput.lon),
        moisture: parseFloat(simInput.moisture)
      })
    });

    const data = await res.json();

    if (data.status === "error") {
      addLog(data.message, "error");
      return;
    }

    addLog(`Simulated Sample ${data.new_point[0]}`, "success");

    drawMarker(data.new_point);
    loadHeatmap();
    updateRMSE();

  } catch {
    addLog("Simulation failed", "error");
  }
}

  async function downloadLogs() {
  try {
    const res = await fetch(`${baseURL}/view_logs`);

    if (!res.ok) throw new Error("Failed download");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv"; // or whatever your file is
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    addLog("Failed to download logs", "error");
  }
}


  function openSprinklers() {
    window.open(`${baseURL}/covariates`, "_blank");
  }

  useEffect(() => {
    if (!connected) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${baseURL}/check_landing`);
        const data = await res.json();
        setDroneStatus(data.landed ? "LANDED" : "AIRBORNE");
      } catch {}
    }, 2000);

    return () => clearInterval(interval);
  }, [connected]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#eee] p-5 font-sans pt-20">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center text-xl font-bold tracking-tighter text-white">
            <img src={logo} alt="AgraBhi Logo" className="h-6 w-auto translate-y-[1px]" />
            <div>
              <Link to="/">Agra<span className="text-emerald-400">Bhi</span></Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/nathan-sharma/Agrabhi"
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500"
            >
              GitHub
            </a>

            <Link
              to="/"
              className="text-xs uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-500"
            >
              Back to Home
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-slate-400 hover:text-white"
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#0D1117] border-b border-slate-800 px-6 py-4 flex flex-col gap-4">

            <a
              href="https://github.com/nathan-sharma/Agrabhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
            >
              GitHub
            </a>

            <Link to="/" onClick={toggleMenu}>
              Back To Home
            </Link>
          </div>
        )}
      </nav>

      {/* INFO */}
      <div className="mb-6 p-4 border border-[#333] rounded bg-[#111]">
        <h2 className="text-xl font-semibold mb-3 text-white">
          AgraBhi Data Hub
        </h2>

        <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
          <p>Make sure your Pi and device you are using the Data Hub on are both registered with <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://tailscale.com/"
              className="underline hover:text-gray-500"
            >
              Tailscale
            </a> before attempting to connect.</p>
          <p>The program will refuse to log if your sample points are too close together. Use Force Log to bypass this.</p>
          <p>The Data Hub is only for analyzing and collecting moisture data. Please see Mission Planner for drone telemetry data.</p>
          <p>Enter sprinkler coordinates to improve the model's predictions.</p>
          <p>Click 'Read Sensors' before logging data to avoid blank logs!</p>
         <div className = "mt-2">
          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/document/d/1S0mL2VNIkHVH2baN0HFV6N_pfqVgpON1sv6gE_mZ1rs/edit?usp=sharing"
              className="underline hover:text-gray-500"
            >
              More Troubleshooting
            </a>
            </div>
        </div>
      </div>

      {/* CONNECT ALWAYS CLICKABLE */}
      <div className="mb-6">
        {!connected && (
          <button
            className="bg-[#444] px-3 py-2 mb-2"
            onClick={connectToPi}
          >
            Connect to Drone
          </button>
        )}

        <div>
          <button
            className="text-sm text-emerald-400 underline"
            onClick={() => {
              const newIp = prompt("Enter Pi Tailscale IP address:", piIp);
              if (newIp) {
                setPiIp(newIp);
                setConnected(false);
                setStatusMsg("");
              }
            }}
          >
            Edit IP Address
          </button>
        </div>

        {statusMsg && (
          <p className="text-sm text-yellow-400 mt-2">{statusMsg}</p>
        )}
      </div>

      {/* EVERYTHING BELOW NOW ALWAYS RENDERS (NO MORE connected CONDITION) */}
      <>
       <div className="mb-4 flex flex-wrap gap-2">

          <button className="bg-[#444] px-3 py-2 mr-2" onClick={collect}>Read Sensors</button>
          <button className="bg-[#4169E1] px-3 py-2 mr-2" onClick={() => logData(false)}>Log Sensor Data</button>
          <button className="bg-[#9335db] px-3 py-2 mr-2" onClick={() => logData(true)}>Force Log</button>
          <button className="bg-[#444] px-3 py-2 mr-2" onClick={() => sendCommand("extend")}>Extend Sensor</button>
          <button className="bg-[#444] px-3 py-2 mr-2" onClick={() => sendCommand("retract")}>Retract Sensor</button>
          <button className="bg-[#444] px-3 py-2 mr-2" onClick={downloadLogs}>Download All Logs</button>
          <button className="bg-[#e63946] px-3 py-2 mr-2" onClick={clearLogs}>ERASE ALL LOGS</button>
          <button className="bg-[#008800] px-3 py-2" onClick={openSprinklers}>Enter Sprinklers</button>
        </div>

        <p className="mb-2">
          Drone: <strong>{droneStatus}</strong>
        </p>

        <div className="mb-4 flex flex-col md:flex-row gap-2">

          <input
            className="bg-[#222] p-2 text-white"
            placeholder="Latitude"
            value={gpsInput.lat}
            onChange={(e) => setGpsInput({ ...gpsInput, lat: e.target.value })}
          />

          <input
            className="bg-[#222] p-2 text-white"
            placeholder="Longitude"
            value={gpsInput.lon}
            onChange={(e) => setGpsInput({ ...gpsInput, lon: e.target.value })}
          />

          <button
            className="bg-blue-600 px-3 py-2"
            onClick={predictMoisture}
          >
            Predict Moisture
          </button>
        </div>
<div className="mt-4 mb-4">
  <div className="text-white font-bold mb-2">Simulate</div>

  <div className="flex flex-col md:flex-row gap-2">
    <input
      className="bg-[#222] p-2 text-white"
      placeholder="Latitude"
      value={simInput.lat}
      onChange={(e) => setSimInput({ ...simInput, lat: e.target.value })}
    />

    <input
      className="bg-[#222] p-2 text-white"
      placeholder="Longitude"
      value={simInput.lon}
      onChange={(e) => setSimInput({ ...simInput, lon: e.target.value })}
    />

    <input
      className="bg-[#222] p-2 text-white"
      placeholder="Moisture"
      value={simInput.moisture}
      onChange={(e) => setSimInput({ ...simInput, moisture: e.target.value })}
    />

    <button
      className="bg-yellow-600 px-3 py-2"
      onClick={simulateData}
    >
      Log Simulated Point
    </button>
  </div>
</div>

        <h3 className="text-xl mb-2">System messages:</h3>
        <div className="bg-black text-green-400 p-3 h-[200px] overflow-y-scroll border border-[#333] font-mono">
          {logs.map((log, i) => (
            <div
              key={i}
              className={
                log.type === "error"
                  ? "text-red-400"
                  : log.type === "warn"
                  ? "text-yellow-400"
                  : log.type === "success"
                  ? "text-green-400"
                  : "text-blue-400"
              }
            >
              [{log.time}] {log.message}
            </div>
          ))}
        </div>
      </>

    <div className="flex flex-col md:flex-row gap-4 w-full mb-4">

        
        <div
          ref={mapRef}
         className="w-full md:w-1/2 h-[300px] md:h-[400px] border border-[#333] rounded"

        />

        {heatmapImg && (
          <div className="w-full md:w-1/2 border border-[#333] rounded flex flex-col">

        <div className="h-[300px] md:h-[400px] flex items-center justify-center">

              <img
                src={heatmapImg}
                className="w-full h-full object-fill"
                alt="Heatmap"
              />
            </div>
<div className="p-3 text-sm text-yellow-300 border-t border-[#333] relative z-20">


  <div className="flex flex-col md:flex-row">
<div className="flex-1">
  {maxUncertainty && (
    <>
      <div className="font-bold text-white mb-1">
        Highest Uncertainty Area
      </div>
      <div>Lat: {maxUncertainty.lat}</div>
      <div>Lon: {maxUncertainty.lon}</div>
      <div>Uncertainty: {maxUncertainty.value.toFixed(2)} % VWC</div>
    </>
  )}
</div>
<div className="flex-1">
  {rmse !== null && (
    <>
      <div className="font-bold text-white mb-1">
        LOOCV RMSE
      </div>
      <div>RMSE: {rmse.toFixed(3)} % VWC</div>
      <div>Samples: {rmseCount}</div>
    </>
  )}
</div>

<div className="mt-3 flex gap-2 flex-wrap">

  <select
    className="bg-[#222] p-2 cursor-pointer relative z-30"
    value={modelConfig.regression}
    onChange={(e) =>
      setModelConfig({ ...modelConfig, regression: e.target.value })
    }
  >
    <option value="linear">Linear Regression</option>
    <option value="quadratic">Quadratic Regression</option>
    <option value="cubic">Cubic Regression</option>
  </select>

  <select
    className="bg-[#222] p-2"
    value={modelConfig.variogram}
    onChange={(e) =>
      setModelConfig({ ...modelConfig, variogram: e.target.value })
    }
  >
    <option value="linear">Linear Variogram</option>
    <option value="exponential">Exponential Variogram</option>
    <option value="gaussian">Gaussian Variogram</option>
     <option value="spherical">Spherical Variogram</option>
  </select>

</div>

  </div>
</div>

      </div>
        )}

      </div>

<div className="flex flex-col md:flex-row gap-7 -translate-y-24">
  {regressionImg && (
    <div className="border border-[#333] rounded">
      <div className="p-2 text-sm text-white font-bold">
        Regression Model (Moisture vs Distance)
           <div> r^2 (correlation strength): {r2.toFixed(4)} </div>
     
      </div>
      <img
        src={regressionImg}
        className="w-full h-[290px] object-contain rounded"
        alt="Regression Plot"
      />
    </div>
  )}

  {variogramImg && (
    <div className="border border-[#333] rounded">
      <div className="p-2 text-sm text-white font-bold">
        Variogram
         <div> Variogram MSE: {varError.toFixed(4)} </div>
      </div>
      <img
        src={variogramImg}
        className="w-full h-[290px] object-contain rounded"
        alt="Variogram Plot"
      />
    </div>
  )}
</div>
</div>

  
  );
}
