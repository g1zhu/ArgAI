import {
  Row,
  Layout,
  Button,
  Col,
  Typography,
  Skeleton,
  Image,
  Modal,
  Divider,
} from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload/interface";
import { useState, useEffect } from "react";
import { withCustomerLayout } from "../../../layout/Customer.layout";
import Dragger from "antd/lib/upload/Dragger";

const Solution = () => {
  const { Header, Content } = Layout;

  const [ok, setok] = useState<boolean>(false);
  const [response, setResponse] = useState<{ crop: string } | null>(null);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [selectedImgFile, selectImage] = useState<File>();

  const handleUpload = (file: File) => {
    selectImage(file);
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
      setConfirmLoading(true);
      const formData = new FormData();
      formData.append("file", selectedImgFile, selectedImgFile.name);

      fetch("/process", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          setok(false);
          setOpen(false);
          setConfirmLoading(false);
        });
    }
  }, [ok, selectedImgFile]);

  return (
    <Layout style={{ flex: "center" }}>
      <Header style={{ background: "none" }}></Header>
      <Content
        style={{
          // alignSelf: "center",
          flex: "unset",
          margin: "0 2rem 6rem",
          textAlign: "left",
        }}
      >
        <>
          {/* page header */}
          <Row>
            <Col span={12}>
              <Typography.Title level={1}>
                ArgAI: Data Driven Solution
              </Typography.Title>
            </Col>
            <Col span={12}>
              <Button
                size="large"
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => {
                  showModal();
                  setResponse(null);
                }}
              >
                Upload An Image
              </Button>
            </Col>
            <Modal
              title="The Simplest Way to Find Which Crop to Grow"
              open={open}
              okText="Upload"
              onOk={() => {
                setConfirmLoading(true);
                setok(true);
              }}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Dragger {...props} style={{ textAlign: "center" }}>
                <UploadOutlined style={{ fontSize: "60px" }} />
                <p>Click or drag a single file to this area to upload</p>
                <p>PNG, JPEG, SVG, JPG files are allowed</p>
              </Dragger>
            </Modal>
          </Row>

          {/* start body */}
          <Row gutter={[16, 24]}>
            {/* left image */}
            <Col span={10}>
              {!response && (
                <Image fallback="Image Failed" src={"/placeholder.png"} />
              )}
              {response?.crop === "Maize" && (
                <Image fallback="Image Failed" src={"/maize.jpeg"} />
              )}
              {response?.crop === "Sorghum" && (
                <Image fallback="Image Failed" src={"/sorghum.jpeg"} />
              )}
              {response?.crop === "Green Gram" && (
                <Image fallback="Image Failed" src={"/greengram.jpeg"} />
              )}
              {response?.crop === "Soybean" && (
                <Image fallback="Image Failed" src={"/soybean.jpeg"} />
              )}
            </Col>

            <Col span={2} style={{ textAlign: "center" }}>
              <Divider
                type="vertical"
                style={{ height: "100%", borderColor: "#FFF" }}
              />
            </Col>

            {/* right body */}
            {response && (
              <Col span={12}>
                <Row>
                  <Typography.Title level={2}>
                    The BEST SUITABLE Crop to grow is
                  </Typography.Title>
                </Row>
                <Row>
                  <Typography.Title level={3} style={{ color: "#446B7B" }}>
                    {response.crop}
                  </Typography.Title>
                </Row>
                <Row>
                  <Typography.Title level={5}>
                    Brief Introduction:
                  </Typography.Title>
                </Row>
                <Row>
                  {response.crop === "Maize" && (
                    <Typography.Paragraph>
                      Maize, also known as corn (North American and Australian
                      English) is one of the most important cereals both for
                      human and animal consumption and is grown for grain and
                      forage. Present world production is about 594 million tons
                      of grain from about 139 million ha.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Sorghum" && (
                    <Typography.Paragraph>
                      Sorghum (Sorghum bicolor) appears to have been
                      domesticated in Ethiopia about 5000 years ago. Present
                      world production is about 58 million tons grain from 42.6
                      million ha.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Green Gram" && (
                    <Typography.Paragraph>
                      Maize, also known as corn (North American and Australian
                      English) is one of the most important cereals both for
                      human and animal consumption and is grown for grain and
                      forage. Present world production is about 594 million tons
                      of grain from about 139 million ha.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Soybean" && (
                    <Typography.Paragraph>
                      Soybean (Glycine max) is one of the most important world
                      crops and is grown for oil and protein. Present world
                      production is about 176.6 million tons of beans over 75.5
                      million ha.
                    </Typography.Paragraph>
                  )}
                </Row>
                <Row>
                  <Typography.Title level={5}>Climate:</Typography.Title>
                </Row>
                <Row>
                  {response.crop === "Maize" && (
                    <Typography.Paragraph>
                      This crop is grown in climates ranging from temperate to
                      tropic during the period when mean daily temperatures are
                      above 15°C and frost-free.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Sorghum" && (
                    <Typography.Paragraph>
                      Optimum temperatures for high producing varieties are over
                      25°C.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Green Gram" && (
                    <Typography.Paragraph>
                      Maize, also known as corn (North American and Australian
                      English) is one of the most important cereals both for
                      human and animal consumption and is grown for grain and
                      forage. Present world production is about 594 million tons
                      of grain from about 139 million ha.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Soybean" && (
                    <Typography.Paragraph>
                      The crop is grown under warm conditions in the tropics,
                      subtropics and temperate climates. Soybean is relatively
                      resistant to low and very high temperatures but growth
                      rates decrease above 35°C and below 18°C.
                    </Typography.Paragraph>
                  )}
                </Row>
                <Row>
                  <Typography.Title level={5}>
                    Water Requirement:
                  </Typography.Title>
                </Row>
                <Row>
                  {response.crop === "Maize" && (
                    <Typography.Paragraph>
                      For maximum production, a medium-maturity grain crop
                      requires between 500 and 800 mm of water depending on
                      climate.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Sorghum" && (
                    <Typography.Paragraph>
                      For high production crop water requirements (ETm) of 110
                      to 130 day sorghum are between 450 and 650 mm depending on
                      the climate.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Green Gram" && (
                    <Typography.Paragraph>
                      Maize, also known as corn (North American and Australian
                      English) is one of the most important cereals both for
                      human and animal consumption and is grown for grain and
                      forage. Present world production is about 594 million tons
                      of grain from about 139 million ha.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Soybean" && (
                    <Typography.Paragraph>
                      Water requirements (ETm) for maximum production vary
                      between 450 and 700 mm/ season depending on climate and
                      length of growing period.
                    </Typography.Paragraph>
                  )}
                </Row>
                <Row>
                  <Typography.Title level={5}>Yield:</Typography.Title>
                </Row>
                <Row>
                  {response.crop === "Maize" && (
                    <Typography.Paragraph>
                      Under irrigation, a good commercial grain yield is 6 to 9
                      tons/ha (10 to 13 percent moisture).
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Sorghum" && (
                    <Typography.Paragraph>
                      A good yield under irrigation is 3.5 to 5 ton/ha (12 to 15
                      percent moisture).
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Green Gram" && (
                    <Typography.Paragraph>
                      Maize, also known as corn (North American and Australian
                      English) is one of the most important cereals both for
                      human and animal consumption and is grown for grain and
                      forage. Present world production is about 594 million tons
                      of grain from about 139 million ha.
                    </Typography.Paragraph>
                  )}
                  {response.crop === "Soybean" && (
                    <Typography.Paragraph>
                      Under rainfed conditions, good soybean yields vary between
                      1.5 and 2.5 ton/ha seed.
                    </Typography.Paragraph>
                  )}
                </Row>
                <Row>
                  <Typography.Title level={5}>Source:</Typography.Title>
                  {response.crop === "Maize" && (
                    <Button
                      type="link"
                      href="https://www.fao.org/land-water/databases-and-software/crop-information/maize/en/"
                    >
                      "https://www.fao.org/land-water/databases-and-software/crop-information/maize/en/"
                    </Button>
                  )}
                  {response.crop === "Sorghum" && (
                    <Button
                      type="link"
                      href="https://www.fao.org/land-water/databases-and-software/crop-information/sorghum/en/"
                    >
                      "https://www.fao.org/land-water/databases-and-software/crop-information/sorghum/en/"
                    </Button>
                  )}
                  {response.crop === "Green Gram" && (
                    <Button
                      type="link"
                      href="https://www.fao.org/land-water/databases-and-software/crop-information/maize/en/"
                    >
                      "https://www.fao.org/land-water/databases-and-software/crop-information/maize/en/"
                    </Button>
                  )}
                  {response.crop === "Soybean" && (
                    <Button
                      type="link"
                      href="https://www.fao.org/land-water/databases-and-software/crop-information/soybean/en/"
                    >
                      https://www.fao.org/land-water/databases-and-software/crop-information/soybean/en/
                    </Button>
                  )}
                </Row>
              </Col>
            )}
            {!response && (
              <Col span={12}>
                <Skeleton avatar paragraph={{ rows: 12 }} />
              </Col>
            )}
          </Row>
        </>
      </Content>
    </Layout>
  );
};

const SolutionPage = withCustomerLayout(Solution);
export { SolutionPage };
