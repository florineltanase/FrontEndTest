import { Box } from "@mui/material";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

interface ItemData {
  id: string;
  description: string;
  total_formatted: string;
}

interface ItemsDataTypes {
  data: ItemData[];
}

interface DataTypes {
  contact_name: string;
  contact_address: string;
  contact_email: string;
  contact_phone: string;
  amount_formatted: string;
  document_number: string;
  issued_at: string;
  items: ItemsDataTypes;
}

interface BasicModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: DataTypes;
}

const BasicModal = ({ open, setOpen, data }: BasicModalProps) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
              backgroundColor: "#F8F9FA",
              padding: "10px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                sx={{ marginBottom: "10px" }}
              >
                {data.contact_name}
              </Typography>

              <div>{data.contact_address}</div>
              <div>{data.contact_email}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
              }}
            >
              <div>
                <Typography id="modal-modal-title" variant="h6">
                  Amount Due
                </Typography>
              </div>
              <div className="text-xl">{data.amount_formatted}</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: "bold" }}>Billed to:</div>
              <div> {data.contact_name}</div>
              <div>{data.contact_address}</div>
              <div>{data.contact_email}</div>
              <div>{data.contact_phone}</div>
            </div>

            <div>
              <div style={{ fontWeight: "bold" }}>Invoice Number:</div>
              <div>{data.document_number}</div>
              <div style={{ fontWeight: "bold" }}>Date of Issue:</div>
              <div>{new Date(data.issued_at).toLocaleDateString()}</div>
            </div>
          </div>

          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Items
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
              backgroundColor: "#F8F9FA",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            {data.items.data.length > 0 ? (
              data.items?.data?.map(
                (el: {
                  id: string;
                  description: string;
                  total_formatted: string;
                }) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <div>Id:{el?.id}</div>{" "}
                    <div>Description:{el?.description}</div>
                    <div>Total: {el?.total_formatted} </div>
                  </div>
                )
              )
            ) : (
              <div>No items available</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
