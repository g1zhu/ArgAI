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
  Input,
  Select,
  Divider,
  InputNumber,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState, useEffect } from "react";
import { withCustomerLayout } from "../../../layout/Customer.layout";

// import "./index.css";
// import menu from "antd/lib/menu";

const { Option } = Select;

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

const Solution = () => {
  const [form] = Form.useForm();

  const { Header, Content, Footer } = Layout;

  const [ok, setok] = useState<boolean>(false);
  const [reponse, setResponse] = useState<any>();
  const [isloading, setloading] = useState<boolean>(false);

  const [selectedImg, setImage] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [selectedImgFile, selectImage] = useState<File>();

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

  const onReset = () => {
    form.resetFields();
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
      form
        .validateFields()
        .then((values) => {
          console.log(values);
          setloading(true);
          const formData = new FormData();
          formData.append("file", selectedImgFile, selectedImgFile.name);
          formData.append("word", "yes");
          formData.append("word", "yes");
          formData.append("word", "yes");
          formData.append("word", "yes");
          formData.append("word", "yes");
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
        })
        .catch((info) => {});
    }
  }, [form, ok, reponse, selectedImgFile]);

  return (
    <Layout style={{ flex: "center" }}>
      <Header style={{ background: "none" }}></Header>
      <Content
        style={{
          alignSelf: "center",
          flex: "unset",
          margin: "auto 0",
        }}
      >
        <Typography.Title>Process Image</Typography.Title>
        {reponse && (
          <Row>
            <Typography>{reponse.result1}</Typography>
          </Row>
        )}

        <Form
          form={form}
          name="control-hooks"
          colon={false}
          // labelCol={{ span: 9 }}
          // labelAlign="right"
          // labelWrap={true}
          // wrapperCol={{ span: 6 }}
          layout="horizontal"
        >
          {/* <Form.Item
            name="1"
            label="1"
            rules={[
              { required: false, message: "Site may be empty or Invalid" },
            ]}
          >
            <InputNumber placeholder="Latitude" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="1"
            label="1"
            rules={[
              { required: false, message: "Site may be empty or Invalid" },
            ]}
          >
            <InputNumber placeholder="Latitude" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="1"
            label=""
            rules={[
              { required: false, message: "Site may be empty or Invalid" },
            ]}
          >
            <Upload {...props} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="1"
            label="Button"
            rules={[
              { required: false, message: "Site may be empty or Invalid" },
            ]}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item> */}

          <Row gutter={[24, 0]}>
            <Col span={12}>
              <Form.Item
                name="1"
                label="1"
                rules={[
                  { required: false, message: "Site may be empty or Invalid" },
                ]}
              >
                <InputNumber placeholder="Latitude" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="latitude"
                label="Latitude"
                rules={[
                  {
                    required: false,
                    message: "Latitude may be empty or Invalid",
                  },
                  // () => ({
                  //   validator(_, value) {
                  //     if (
                  //       !value ||
                  //       value.length < 8 ||
                  //       value.toUpperCase() === value ||
                  //       value.toLowerCase() === value ||
                  //       !/\d/.test(value)
                  //     ) {
                  //       return Promise.reject(
                  //         new Error(
                  //           "special characters"
                  //         )
                  //       );
                  //     }
                  //     return Promise.resolve();
                  //   },
                  // }),
                ]}
              >
                <InputNumber placeholder="Latitude" style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Divider />

            <Col span={24}>
              <Form.Item name="image">
                <Upload {...props} listType="picture">
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
                {/* <Button onClick={() => setok(true)}>submit</Button> */}
              </Form.Item>
            </Col>

            <Divider />
            <Col span={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => setok(true)}
                >
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Content>
      {/* <Footer
        style={{ textAlign: "center", background: "none" }}
      >
        ©ArgAI Group. All rights reserved {moment().year()}.
      </Footer> */}
    </Layout>
  );
};

const SolutionPage = withCustomerLayout(Solution);
export { SolutionPage };
