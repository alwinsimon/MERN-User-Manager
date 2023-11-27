import UsersDataTable from "../../components/AdminComponents/UserDataTable";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";

import { useGetUsersDataMutation } from "../../slices/adminApiSlice";

import Loader from "../../components/Loader";


const AdminHomeScreen = () => {

  const [usersData, setUsersData] = useState([]);

  const [usersDataFromAPI, { isLoading } ] = useGetUsersDataMutation();

  useEffect(() => {
    
    try {

      const fetchData = async () => {

        const responseFromApiCall = await usersDataFromAPI();

        const usersArray = responseFromApiCall.data.usersData;
  
        setUsersData(usersArray);

      };
  
      fetchData();

    } catch (err) {

      toast.error( err?.data?.errors[0]?.message || err );

      console.error("Error fetching users:", err);

    }

  }, []);

  return (
    <div>
      <h1>Users List</h1>
      { isLoading ? <Loader/> : <UsersDataTable users={usersData} /> }
    </div>
  );
};

export default AdminHomeScreen;
