import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function ShowOrders() {
  const history = useHistory();
  const [user] = useContext(UserContext);
  const [data, setData] = useState([]);
  if (!user.user) {
    history.push("/");
  }

  useEffect(() => {
    fetch("/api/orders/", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  return (
    <MaterialTable
      options={{
        headerStyle: {
          backgroundColor: "#126264",
          color: "#FFF",
        },

        exportAllData: true,
        exportButton: true,
        pageSize: 20,
        pageSizeOptions: [10, 20, 50],
      }}
      icons={tableIcons}
      title="My Orders"
      columns={[
        {
          title: "Names Order",
          field: "userDetail",
          render: (rowData) =>
            rowData.userDetail[0].firstName +
            " " +
            rowData.userDetail[0].lastName,
        },
        {
          title: "Date",
          field: "orderDate",
          render: (rowData) => rowData.orderDate.slice(0, 10),
        },
        {
          title: "Time",
          field: "orderDate",
          render: (rowData) => rowData.orderDate.slice(11, 16),
        },
        {
          title: "Total ($)",
          field: "totalAmount",
          render: (rowData) => rowData.totalAmount,
        },
      ]}
      data={data}
      detailPanel={(rowData) => {
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>qty</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData["products"].map((products) => (
                  <TableRow
                    key={products._id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <ButtonBase sx={{ width: 40, height: 40 }}>
                        <Img
                          alt={products.id["image"]}
                          src={products.id["image"]}
                        />
                      </ButtonBase>
                    </TableCell>
                    <TableCell>{products.id["title"].slice(0, 15)}</TableCell>
                    <TableCell>{products.id["price"]}</TableCell>
                    <TableCell>{products.qty}</TableCell>
                    <TableCell>{products.qty * products.id["price"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }}
    />
  );
}

export default ShowOrders;
