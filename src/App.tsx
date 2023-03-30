import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}
function App() {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => setData(data[0].id))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
