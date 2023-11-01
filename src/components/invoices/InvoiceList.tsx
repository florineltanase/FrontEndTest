import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Actions from "../actions/Actions";

import BasicModal from "../modal/BasicModal";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchInvoices } from "../../features/invoice/invoiceSlice";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const Invoices = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  const [openModal, setOpenModal] = useState(false);

  // const fetchInvoices = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get(
  //       `/documents?search=type:invoice&page=${paginationModel.page}&limit=${paginationModel.pageSize}`
  //     );

  //     setInvoices(response.data.data);
  //     setTotalRowCount(response.data.meta.total);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setInvoices([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchInvoices();
  // }, [paginationModel.page, totalRowCount, paginationModel.pageSize]);

  const invoices = useAppSelector((state) => state.invoices);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchInvoices({
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
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<ModeEditOutlineOutlinedIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={() => {
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
          rows={invoices.invoices}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          rowCount={200}
          loading={invoices.loading}
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

      <BasicModal open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default Invoices;