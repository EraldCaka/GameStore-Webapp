import { useEffect, useState } from "react";
import { apiCall } from "../../../axios/axios";
import { NavbarLine } from "../index";
import UserCard from "./UserCard.js";
import styled from "styled-components";

const UsersWrapper = styled.div`
  text-align: center;
`;

const SearchInput = styled.input`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-bottom: 20px;
`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiCall("/users").fetchAll();
        setUsers(response.data);
        console.log(response.data);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <UsersWrapper>
      <NavbarLine />
      <SearchInput
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </UsersWrapper>
  );
};

export default Users;
