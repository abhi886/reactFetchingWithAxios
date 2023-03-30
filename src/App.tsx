import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}
function App() {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setisLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then(({ data }) => {
        setisLoading(false);
        setData(data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setisLoading(false);
      });
    return () => controller.abort();
  }, []);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <ul>
        {data.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
