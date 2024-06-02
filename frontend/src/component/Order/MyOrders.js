import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Header from "../layout/Header/Header";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    //{ field: "id", headerName: "Order ID", minWidth: 250, flex: 0.5 },    
    {
      field: "orderfrom",
      headerName: "Ordered By",
      type: "string",
      minWidth: 150,
      flex: 0.5,      
    },
     {
      field: "studentId",
      headerName: "Student Id",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "OrderDate",
      headerName: "OrderDate",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: 150,
      flex: 0,
    }, 
    {
      field: "actions",
      flex: 0,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      //console.log(item);
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        OrderDate:item.shippingInfo.orderDate,
        status: item.orderStatus,
        amount: item.totalPrice,
        studentId: item.shippingInfo.receivingPersonName,
        orderfrom:  user.name
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <div>
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
    </div>
  );
};

export default MyOrders;
