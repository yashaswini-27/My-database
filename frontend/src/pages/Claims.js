import { useEffect, useState } from "react";
import API from "../api";

function Claims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    API.get("/claims").then((res) => setClaims(res.data));
  }, []);

  return (
    <div>
      <h2>All Claims</h2>
      {claims.map((c) => (
        <div key={c._id} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
          <p><b>Item:</b> {c.itemId?.title}</p>
          <p><b>Claimed By:</b> {c.userId?.name}</p>
          <p><b>Status:</b> {c.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Claims;