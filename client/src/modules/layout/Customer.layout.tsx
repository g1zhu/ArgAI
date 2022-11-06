import {
  Component,
  CSSProperties,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import loginBackground from "../../images/background.jpeg";

const iconStyles: CSSProperties = {
  backgroundImage: `url('${loginBackground}'), linear-gradient(119.47deg, #091225 0%, rgba(9, 18, 37, 0.91) 31.16%, rgba(21, 32, 55, 0.97) 73.75%, #152037 99.72%)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50% 0%",
  padding: "0 0%",
  color: "#fff",
  textAlign: "center",
};

const menu = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/solution",
    name: "Solution",
  },
  {
    path: "/resource",
    name: "Resource",
  },
  // {
  //   path: '',
  //   name: 'Manage',
  //   routes: [
  //     {
  //       path: '/devices',
  //       name: 'Manage Devices',
  //     },
  //     {
  //       path: '/users',
  //       name: 'Manage Users',
  //     },
  //     {
  //       path: '/projects',
  //       name: 'Manage Projects',
  //     },
  //     {
  //       path: '/printers',
  //       name: 'Manage Printers',
  //     },
  //     {
  //       path: '/settings',
  //       name: 'Manage Organization',
  //     },
  //   ],
  // },
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
  let location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout style={iconStyles}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
          onClick={(info) => {
            console.log(info);
          }}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 0",
          marginTop: 64,
        }}
      >
        {props.children}
      </Content>
    </Layout>
  );

  // return <Navigate to="/" replace state={{ from: location }} />;
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
