import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, FetchUsers } from "../Actions/Admin";

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [change, setChange] = useState({});
  useEffect(() => {
    FetchUsers().then((data) => setData(data));
  }, [change]);
  return (
    <div className="my-3">
      <ul className="list-group">
        {data.allUsers &&
          data.allUsers.length > 0 &&
          data.allUsers.map((element) => {
            return (
              <li className="list-group-item ps-5" key={element._id}>
                <div className="row">
                  <div className="col-7">
                    {element &&
                      element.firstName &&
                      element &&
                      element.lastName && (
                        <p>
                          {element.firstName}, {element.lastName}
                        </p>
                      )}
                    {element && element.email && <h6>{element.email}</h6>}
                  </div>
                  <span className="col-md-5 my-2 my-md-auto text-align-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => setChange(deleteUser(element._id))}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => {
                        navigate(`/profile/${element._id}`);
                      }}
                    >
                      View Profile
                    </button>
                  </span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Admin;
