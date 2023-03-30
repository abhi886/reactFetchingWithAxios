import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}
function App() {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => setData(data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <>
      {error && <p>{error}</p>}
      <ul>
        {data.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
