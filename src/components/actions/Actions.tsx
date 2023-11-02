import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Actions = () => {
  //just a simple component with all the actions
  return (
    <div className="flex gap-[20px] ">
      <PrintOutlinedIcon />
      <SettingsOutlinedIcon />
      <ModeEditOutlineOutlinedIcon />
    </div>
  );
};

export default Actions;
