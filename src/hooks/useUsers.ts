import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then(({ data }) => {
        setisLoading(false);
        setUsers(data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setisLoading(false);
      });
    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};
export default useUsers;
