import { Layout, Space } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import moment from "moment";
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
          <MapChart setTooltipContent={setContent} />
          <ReactTooltip multiline={true} html={true}>
            {content}
          </ReactTooltip>
        </div>
        <Space></Space>
      </Content>
      {/* <Footer
        style={{ textAlign: "center", background: "none" }}
      >
        ©ArgAI Group. All rights reserved {moment().year()}.
      </Footer> */}
    </Layout>
  );
};

const MapPage = withCustomerLayout(Map);
export { MapPage };
