import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function deleteUser(user: User) {
    let originalUsers = users;
    setUsers(users.filter((data) => data.id !== user.id));
    // console.log(newUser)
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)

      .catch((err) => {
        setUsers(originalUsers);
        setError(err.message);
      });
  }
  useEffect(() => {
    const controller = new AbortController();
    setisLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then(({ data }) => {
        setisLoading(false);
        setUsers(data);
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
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button type='button' onClick={() => deleteUser(user)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
