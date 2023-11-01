import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Invoices from "../components/invoices/InvoiceList";
import Bills from "../components/bills/BillList";

const invoices_routes = [
  {
    path: "/invoices",
    element: <Invoices />,
  },
];

const bills_routes = [
  {
    path: "/bills",
    element: <Bills />,
  },
];

const routes = [
  {
    path: "/",
    element: <App />,
    children: [...invoices_routes, ...bills_routes],
  },
];

const router = createBrowserRouter(routes);

export default router;
