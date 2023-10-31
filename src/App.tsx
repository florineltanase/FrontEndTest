import Button from "@mui/material/Button";
import "./App.css";
import axios from "./axios/axios";
import React from "react";
import MiniDrawer from "./components/Drawer/Drawer";

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/beers");

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data, "cox");

  return (
    <>
      <MiniDrawer />
    </>
  );
}

export default App;
