import {
  Row,
  Layout,
  Form,
  Button,
  Col,
  Upload,
  Typography,
  Select,
  Divider,
  InputNumber,
} from "antd";
import "antd/dist/antd.css";
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
          console.log(values.drought_probability);
          setloading(true);
          const formData = new FormData();

          formData.append("file", selectedImgFile, selectedImgFile.name);
          formData.append("drought_probability", values.drought_probability);
          formData.append("drought_extent", values.drought_extent);
          formData.append("growth_sowing", values.growth_sowing);
          formData.append("growth_vegetative", values.growth_vegetative);
          formData.append("growth_flowering", values.growth_flowering);
          formData.append("growth_maturity", values.growth_maturity);
          formData.append("disturbance_none", values.disturbance_none);
          formData.append("disturbance_weeds", values.disturbance_weeds);
          formData.append("disturbance_drought", values.disturbance_drought);
          formData.append(
            "disturbance_nutrient_deficit",
            values.disturbance_nutrient_deficit
          );

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

        <Row>
          <Col span={6}></Col>
          <Col span={10}>
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
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item
                    name="drought_probability"
                    label="Drought Probability"
                  >
                    <InputNumber
                      placeholder="Drought Probability"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="drought_extent"
                    label="Drought Extent"
                    rules={
                      [
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
                      ]
                    }
                  >
                    <InputNumber
                      placeholder="Draught Extent"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="growth_sowing" label="Growth Sowing">
                    <InputNumber
                      placeholder="Growth Sowing"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="growth_vegetative" label="Growth Vegetative">
                    <InputNumber
                      placeholder="Growth Vegetative"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="growth_flowering" label="Growth Flowering">
                    <InputNumber
                      placeholder="Growth Flowering"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="growth_maturity" label="Growth Maturity">
                    <InputNumber
                      placeholder="Growth Maturity"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="disturbance_none" label="Distribution None">
                    <InputNumber
                      placeholder="Growth Flowering"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="disturbance_weeds"
                    label="Distribution Weeds"
                  >
                    <InputNumber
                      placeholder="Distribution Weeds"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="disturbance_drought"
                    label="Disturbance Drought"
                  >
                    <InputNumber
                      placeholder="Disturbance Drought"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="disturbance_nutrient_deficit"
                    label="Disturbance Nutrient Deficit"
                  >
                    <InputNumber
                      placeholder="Disturbance Nutrient Deficit"
                      style={{ width: "100%" }}
                    />
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
          </Col>
          <Col span={6}></Col>
        </Row>
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
