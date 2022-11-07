import { withCustomerLayout } from "../../../layout/Customer.layout";
import {  Row, Typography } from "antd";
import "antd/dist/antd.css";
import Col from "antd/es/grid/col";

// import "./index.css";
// import menu from "antd/lib/menu";

const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col span={11} style={{ margin: "auto" }}>
          <img
            src={"/ml.png"}
            alt="ArgAI: The Solution"
            style={{ margin: "5rem auto auto auto", width: "50%" }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={11} style={{ margin: "auto", paddingTop: "2rem" }}>
          <Typography.Title style={{ color: "white", letterSpacing: ".4rem" }}>
            ArgAI: The Solution
          </Typography.Title>
        </Col>
      </Row>
    </div>
  );
};

const DashboardPage = withCustomerLayout(Dashboard);
export { DashboardPage };
