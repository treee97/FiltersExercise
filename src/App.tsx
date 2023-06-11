import { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
type dataType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

function App() {
  // useEffect(() => {
  //   fetch("./data.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //       console.log(data);
  //       console.log(users);
  //     });
  // }, []);

  const [users, setUsers] = useState<dataType[]>(data);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
  const [searchPhrase, setSearchPhrase] = useState("");

  const sortById = () => {
    setSorted({ sorted: "id", reversed: !sorted.reversed });
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      if (sorted.reversed) {
        return userA.id - userB.id;
      }
      return userB.id - userA.id;
    });
    setUsers(usersCopy);
  };
  const sortByName = () => {
    setSorted({ sorted: "name", reversed: !sorted.reversed });
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      const fullNameA = `${userA.first_name} ${userA.last_name}`;
      const fullNameB = `${userB.first_name} ${userB.last_name}`;

      if (sorted.reversed) {
        return fullNameB.localeCompare(fullNameA);
      }

      return fullNameA.localeCompare(fullNameB);
    });
    setUsers(usersCopy);
  };
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const matchedUsers = data.filter((user) => {
      return `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setUsers(matchedUsers);
    setSearchPhrase(e.target.value);
  };

  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{`${user.first_name} ${user.last_name}`}</td>
        <td>{user.email}</td>
        <td>{user.gender}</td>
      </tr>
    ));
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    } else {
      return <FaArrowDown />;
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="search"
          value={searchPhrase}
          onChange={search}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={sortById}>
                <span>ID</span>
                {sorted.sorted === "id" ? renderArrow() : null}
              </th>
              <th onClick={sortByName}>
                <span>Name</span>
                {sorted.sorted === "name" ? renderArrow() : null}
              </th>
              <th>
                <span>Email</span>
              </th>
              <th>
                <span>Gender</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
