import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  function deleteUser(user: User) {
    let originalUsers = users;
    setUsers(users.filter((data) => data.id !== user.id));
    userService.delete(user.id).catch((err) => {
      setUsers(originalUsers);
      setError(err.message);
    });
  }

  function updateUser(user: User) {
    const originalUser = [...users];
    let updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id === u.id ? updatedUser : u)));
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUser);
    });
  }

  function createUser() {
    const originalUsers = users;
    const newUser = { id: 0, name: "abhishekh" };
    setUsers([newUser, ...users]);
    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setUsers(originalUsers);
        setError(err.message);
      });
  }

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <button onClick={() => createUser()}>Add</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button type='button' onClick={() => updateUser(user)}>
              Update
            </button>
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
