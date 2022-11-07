import { Layout, Typography } from "antd";
import { Header, Content } from "antd/lib/layout/layout";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { withCustomerLayout } from "../../../layout/Customer.layout";
import MapChart from "../../components/MapChart";

const Map = () => {
  const [content, setContent] = useState("");

  return (
    <Layout style={{ flex: "center" }}>
      <Header style={{ background: "none" }}></Header>
      <Content
        style={{
          flex: "unset",
          margin: "auto 0",
        }}
      >
        <div>
          <Typography.Title>World CPI Inflation Heat Map</Typography.Title>
          <MapChart setTooltipContent={setContent}/>
          <ReactTooltip multiline={true} html={true}>
            {content}
          </ReactTooltip>
        </div>
      </Content>
    </Layout>
  );
};

const MapPage = withCustomerLayout(Map);
export { MapPage };
