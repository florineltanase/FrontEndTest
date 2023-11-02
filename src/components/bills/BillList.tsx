import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Actions from "../actions/Actions";

import BasicModal from "../modal/BasicModal";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { fetchBills } from "../../features/bill/billSlice";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const Bills = () => {
  const bills = useAppSelector((state) => state.bills);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [billData, setBillData] = useState({
    contact_name: "",
    contact_address: "",
    contact_email: "",
    contact_phone: "",
    amount_formatted: "",
    document_number: "",
    issued_at: "",
    items: {
      data: [],
    },
  });
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  useEffect(() => {
    dispatch(
      fetchBills({
        page: paginationModel.page,
        perPage: paginationModel.pageSize,
      })
    );
  }, [paginationModel.page, paginationModel.pageSize]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "issued_at", headerName: "Date", width: 130 },
    { field: "notes", headerName: "Description", width: 130 },
    {
      field: "contact_name",
      headerName: "Payee",
      type: "number",
      width: 130,
    },
    { field: "amount", headerName: "Spent", width: 130 },
    { field: "amount_formatted", headerName: "Received", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<ModeEditOutlineOutlinedIcon />}
            label="Open"
            sx={{
              color: "primary.main",
            }}
            onClick={() => {
              //setting the state with the data from the row in order to use it in the modal
              setBillData(params.row);
              setOpenModal(true);
            }}
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div className="mb-[30px] mt-[50px] flex justify-end ">
        <Actions />
      </div>

      <div>
        <DataGrid
          key={paginationModel.page}
          rows={bills.bills}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          rowCount={bills.totalCount}
          loading={bills.loading}
          checkboxSelection
          sx={{
            " & .MuiDataGrid-columnHeaders": {
              backgroundColor: "#EEEEEE",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#EEEEEE",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": { color: "black" },
          }}
        />
      </div>

      <BasicModal open={openModal} setOpen={setOpenModal} data={billData} />
    </div>
  );
};

export default Bills;
