import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { CSSProperties, useEffect, useState } from "react";
import { withCustomerLayout } from "../../../layout/Customer.layout";
import {
  Row,
  Layout,
  Form,
  Button,
  Card,
  Col,
  Space,
  Upload,
  Typography,
} from "antd";
import "antd/dist/antd.css";
import loginBackground from "../../../../images/background.jpeg";
import moment from "moment";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useProcessImageQuery } from "../../query/index";
// import "./index.css";
// import menu from "antd/lib/menu";

const Dashboard = () => {
  const { Header, Content, Footer } = Layout;

  const [ok, setok] = useState<boolean>(false);
  const [reponse, setResponse] = useState<any>();
  const [isloading, setloading] = useState<boolean>(false);

  const [selectedImg, setImage] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [selectedImgFile, selectImage] = useState<File>();

  const handleSubmit = async () => {
    setok(true);
  };

  const handleUpload = (file: File) => {
    console.log("file", file);
    selectImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result);
    };
    reader.readAsDataURL(file as Blob);

    return false;
  };

  const props: UploadProps = {
    maxCount: 1,
    accept: ".png, .jpeg, .svg, .jpg",
    showUploadList: true,
    beforeUpload: handleUpload,
  };

  useEffect(() => {
    if (ok && selectedImgFile) {
      console.log("i am here");
      const formData = new FormData();
      formData.append("file", selectedImgFile, selectedImgFile.name);
      setloading(true);
      fetch("/process", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          setok(false);
          setloading(false);
        });
    }
  }, [ok, reponse, selectedImgFile]);

  return (
    <Layout>
      <Header style={{ background: "none" }}></Header>
      <Content style={{ flex: "unset", margin: "auto 0" }}>
        <Card style={{ background: "none" }}>
          <Row gutter={[24, 24]}>
            <Col
              span={6}
              offset={1}
              style={{ justifyContent: "center", paddingTop: "2rem" }}
            >
              <Space direction="vertical">
                <Upload {...props} listType="picture">
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={isloading ? true : false}
                  loading={isloading}
                  style={{
                    marginTop: 0,
                    justifyContent: "center",
                    marginLeft: "4rem",
                  }}
                >
                  submit
                </Button>
              </Space>
            </Col>
          </Row>
          {reponse && (
            <Row>
              <Typography>{reponse.result}</Typography>
            </Row>
          )}
        </Card>
      </Content>
      <Footer
        style={{ textAlign: "center", background: "none", color: "#fff" }}
      >
        ©ArgAI Group. All rights reserved {moment().year()}.
      </Footer>
    </Layout>
  );
};

const DashboardPage = withCustomerLayout(Dashboard);
export { DashboardPage };
