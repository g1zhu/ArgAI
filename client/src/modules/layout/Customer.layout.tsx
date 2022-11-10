import {
  Component,
  CSSProperties,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import loginBackground from "../../images/background.jpeg";
import moment from "moment";
import { HeatMapOutlined, HomeOutlined, SearchOutlined, SolutionOutlined } from "@ant-design/icons";

const iconStyles: CSSProperties = {
  backgroundImage: `url('${loginBackground}'), linear-gradient(119.47deg, #091225 0%, rgba(9, 18, 37, 0.91) 31.16%, rgba(21, 32, 55, 0.97) 73.75%, #152037 99.72%)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50% 0%",
  padding: "0 0%",
  color: "#fff",
  textAlign: "center",
  // display: 'flex',
  // flexDirection: 'column',
};



const menu = [
  {
    key: "/dashboard",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "/map",
    label: "Heatmap",
    icon: <HeatMapOutlined />,
  },
  {
    key: "/solution",
    label: "Crop Recommendation",
    icon: <SolutionOutlined />,
  },
  {
    key: "/disease",
    label: "Disease Detection",
    icon: <SearchOutlined />,
  },
];

export const CustomerLayout = (props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <Layout style={iconStyles}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={menu}
          onClick={({ key }) => {  
            navigate(key);
          }}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 0",
          marginTop: 64,
          "minHeight": "660px",
        }}
      >
        {props.children}
      </Content>
      <Footer
        style={{ textAlign: "center", background: "none", color: "#fff" }}
      >
        ©Team 3994. All rights reserved {moment().year()}.
      </Footer>
    </Layout>
  );
};

export function withCustomerLayout(WrappedComponent: React.FC) {
  // And return a new anonymous component
  return class extends Component {
    render() {
      return (
        <CustomerLayout>
          <WrappedComponent {...this.props} />
        </CustomerLayout>
      );
    }
  };
}
