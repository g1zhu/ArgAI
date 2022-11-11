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

const Disease = () => {
  const { Header, Content } = Layout;

  const [ok, setok] = useState<boolean>(false);
  const [response, setResponse] = useState<{
    crop: string;
    disease: string;
  } | null>(null);

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

      fetch("/disease", {
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
                ArgAI: Disease Detection
              </Typography.Title>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                size="large"
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
              title="Food Security Warning System"
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
              {response?.disease === "Healthy" && (
                <Image fallback="Image Failed" src={"/congrat.webp"} />
              )}

              {response?.disease === "Potato Early Blight" && (
                <Image
                  fallback="Image Failed"
                  src={`/PotatoEarlyBlight.jpeg`}
                />
              )}
              {response?.disease === "Potato Late Blight" && (
                <Image fallback="Image Failed" src={"/PotatoLateBlight.png"} />
              )}
              {response?.disease === "Tomato Target Spot" && (
                <Image fallback="Image Failed" src={"/TomatoTargetSpot.png"} />
              )}
              {response?.disease === "Tomato Late Blight" && (
                <Image fallback="Image Failed" src={"/TomatoLateBlight.jpg"} />
              )}
              {response?.disease === "Tomato Mosaic Virus" && (
                <Image fallback="Image Failed" src={"/TomatoMosaicVirus.jpg"} />
              )}
              {response?.disease === "Tomato Leaf Mold" && (
                <Image fallback="Image Failed" src={"/TomatoLeafMold.jpg"} />
              )}
              {response?.disease === "Tomato Bacterial Spot" && (
                <Image
                  fallback="Image Failed"
                  src={"/TomatoBacterialSpot.jpg"}
                />
              )}
              {response?.disease === "Tomato Early Blight" && (
                <Image
                  fallback="Image Failed"
                  src={"/TomatoEarlyBlight.jpeg"}
                />
              )}
              {response?.disease === "Tomato Yellow Leaf Curl Virus" && (
                <Image
                  fallback="Image Failed"
                  src={"/TomatoYellowLeafCurlVirus.png"}
                />
              )}
              {response?.disease === "Tomato Two Spotted Spider Mites" && (
                <Image
                  fallback="Image Failed"
                  src={"/TomatoTwoSpottedSpiderMites.jpg"}
                />
              )}
              {response?.disease === "Tomato Septoria Leaf Spot" && (
                <Image
                  fallback="Image Failed"
                  src={"/TomatoSeptoriaLeafSpot.jpg"}
                />
              )}
              {response?.disease === "Corn Cercospora Leaf Spot" && (
                <Image
                  fallback="Image Failed"
                  src={"/CornCercosporaLeafSpot.png"}
                />
              )}
              {response?.disease === "Corn Northern Leaf Blight" && (
                <Image
                  fallback="Image Failed"
                  src={"/CornNorthernLeafBlight.jpg"}
                />
              )}
              {response?.disease === "Corn Common Rust" && (
                <Image fallback="Image Failed" src={"/CornCommonRust.png"} />
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
                  {response.disease === "Healthy" && (
                    <Typography.Title level={2}>
                      {`Your ${response.crop} is excellent!`}
                    </Typography.Title>
                  )}

                  {response.disease !== "Healthy" && (
                    <Typography.Title level={2}>
                      {`Warning! Your ${response.crop} may have a disease!`}
                    </Typography.Title>
                  )}
                </Row>

                {response.disease !== "Healthy" && (
                  <>
                    <Row>
                      <Typography.Title level={3} style={{ color: "#446B7B" }}>
                        {response.disease}
                      </Typography.Title>
                      )
                    </Row>
                    <Row>
                      <Typography.Title level={5}>
                        Brief Introduction:
                      </Typography.Title>
                    </Row>
                    <Row>
                      {response.disease === "Potato Early Blight" && (
                        <Typography.Paragraph>
                          Early blight of potatoes is caused by the fungal
                          pathogen Alternaria solani. The disease affects
                          leaves, stems, and tubers and can reduce yield, tuber
                          size, storability of tubers, quality of fresh-market
                          and processing tubers, and marketability of the crop.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Potato Late Blight" && (
                        <Typography.Paragraph>
                          Late blight is caused by the fungal-like oomycete
                          pathogen Phytophthora infestans. The primary host is
                          potato, but P. infestans also can infect other
                          solanaceous plants, including tomatoes, petunias and
                          hairy nightshade. These infected species can act as
                          source of inoculum to potato.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Tomato Target Spot" && (
                        <Typography.Paragraph>
                          Target spot of tomato is caused by the fungal pathogen
                          Corynespora cassiicola. The disease occurs on
                          field-grown tomatoes in tropical and subtropical
                          regions of the world. Target spot infections reduce
                          yield indirectly by reducing the photosynthetic area
                          and directly by reducing the fruit’s marketability
                          through fruit spots.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Tomato Late Blight" && (
                        <Typography.Paragraph>
                          Symptoms of late blight may be found on any
                          above-ground part of the tomato plant. Infected leaves
                          typically have green to brown patches of dead tissue
                          surrounded by a pale green or gray border.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Tomato Mosaic Virus" && (
                        <Typography.Paragraph>
                          The foliage of affected tomato plants shows mottling,
                          with alternating yellowish and darker green areas, the
                          latter often appearing thicker and raised giving a
                          blister-like appearance.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Tomato Leaf Mold" && (
                        <Typography.Paragraph>
                          Tomato leaf mold is a fungal disease that can develop
                          when there are extended periods of leaf wetness and
                          the relative humidity is high (greater than 85
                          percent). Symptoms of disease include yellow spots on
                          the upper leaf surface. Discrete masses of olive-green
                          spores can be seen on the underside of the affected
                          leaves. The older leaves become infected first and die
                          prematurely.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Tomato Bacterial Spot" && (
                        <Typography.Paragraph>
                          Bacterial spot of tomato is a potentially devastating
                          disease that, in severe cases, can lead to
                          unmarketable fruit and even plant death. Bacterial
                          spot can occur wherever tomatoes are grown, but is
                          found most frequently in warm, wet climates, as well
                          as in greenhouses.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Tomato Early Blight" && (
                        <Typography.Paragraph>
                          Lesions first develop on lower leaves as small,
                          brownish-black spots which can expand to about 1⁄4 -
                          1⁄2-inch in diameter with characteristic concentric
                          rings in the darkened area. The area surrounding the
                          lesions may become yellow and, as disease progresses,
                          the entire leaf may turn yellow. In later stages,
                          lesions may appear in the upper leaves and defoliation
                          may occur in the lower part of the plant leaving the
                          fruit susceptible to sunscald.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Tomato Yellow Leaf Curl Virus" && (
                        <Typography.Paragraph>
                          The most common reason why the leaves on established
                          tomato plants turn yellow is a lack of nutrients in
                          the soil. Tomatoes are extremely heavy feeders and
                          require plenty of nutrients to grow healthy and be
                          fruitful.
                        </Typography.Paragraph>
                      )}
                      {response.disease ===
                        "Tomato Two Spotted Spider Mites" && (
                          <Typography.Paragraph>
                            Generally, mites feed on the undersides of leaves.
                            They use their sucking mouthparts to remove sap from
                            plants, giving the upper leaf surface a speckled or
                            mottled appearance. Leaves of mite-infested plants may
                            turn yellow and dry up, and plants may lose vigor and
                            die when infestations are severe.
                          </Typography.Paragraph>
                        )}
                      {response.disease === "Tomato Septoria Leaf Spot" && (
                        <Typography.Paragraph>
                          Septoria leaf spot, also called Septoria blight,
                          occurs throughout the United States and worldwide
                          wherever tomatoes are grown. This disease can be quite
                          destructive and crop losses of up to 100% have been
                          reported in heavily defoliated fields. Septoria leaf
                          spot is primarily a disease of tomato, but it has been
                          reported on other Solanaceous hosts including
                          eggplant, potato, petunia, horsenettle, and black
                          nightshade.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Corn Cercospora Leaf Spot" && (
                        <Typography.Paragraph>
                          One of the most significant yield-limiting diseases of
                          corn worldwide. Symptoms seen on corn include leaf
                          lesions, discoloration (chlorosis), and foliar blight.
                          Environmental conditions that best suit infection and
                          growth include moist, humid, and warm climates.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Corn Northern Leaf Blight" && (
                        <Typography.Paragraph>
                          Typical symptoms of northern corn leaf blight are
                          canoe-shaped lesions 1 inch to 6 inches long. The
                          lesions are initially bordered by gray-green margins.
                          They eventually turn tan colored and may contain dark
                          areas of fungal sporulation.
                        </Typography.Paragraph>
                      )}
                      {response.disease === "Corn Common Rust" && (
                        <Typography.Paragraph>
                          Common rust produces rust-colored to dark brown,
                          elongated pustules on both leaf surfaces. The pustules
                          contain rust spores (urediniospores) that are cinnamon
                          brown in color. Pustules darken as they age. Leaves,
                          as well as sheaths, can be infected. Under severe
                          conditions leaf chlorosis and death may occur.
                        </Typography.Paragraph>
                      )}
                    </Row>

                    <Row>
                      <Typography.Title level={5}>Source:</Typography.Title>
                      {response.disease === "Potato Early Blight" && (
                        <Button
                          type="link"
                          href="https://www.ndsu.edu/agriculture/ag-hub/publications/early-blight-potato#:~:text=Early%20blight%20of%20potato%20is,and%20marketability%20of%20the%20crop"
                        >
                          https://www.ndsu.edu/agriculture/ag-hub/publications/early-blight-potato#:~:text=Early%20blight%20of%20potato%20is,and%20marketability%20of%20the%20crop
                        </Button>
                      )}
                      {response.disease === "Potato Late Blight" && (
                        <Button
                          type="link"
                          href="https://www.ndsu.edu/agriculture/extension/publications/late-blight-potato"
                        >
                          https://www.ndsu.edu/agriculture/extension/publications/late-blight-potato
                        </Button>
                      )}
                      {response.disease === "Tomato Target Spot" && (
                        <Button
                          type="link"
                          href="https://www.vegetables.bayer.com/ca/en-ca/resources/agronomic-spotlights/target-spot-of-tomato.html"
                        >
                          https://www.vegetables.bayer.com/ca/en-ca/resources/agronomic-spotlights/target-spot-of-tomato.html
                        </Button>
                      )}
                      {response.disease === "Tomato Late Blight" && (
                        <Button
                          type="link"
                          href="https://vegpath.plantpath.wisc.edu/diseases/tomato-late-blight/"
                        >
                          https://vegpath.plantpath.wisc.edu/diseases/tomato-late-blight/
                        </Button>
                      )}
                      {response.disease === "Tomato Mosaic Virus" && (
                        <Button
                          type="link"
                          href="https://en.wikipedia.org/wiki/Tomato_mosaic_virus"
                        >
                          https://en.wikipedia.org/wiki/Tomato_mosaic_virus
                        </Button>
                      )}
                      {response.disease === "Tomato Leaf Mold" && (
                        <Button
                          type="link"
                          href="https://www.canr.msu.edu/news/tomato-leaf-mold-in-hoophouse-tomatoes"
                        >
                          https://www.canr.msu.edu/news/tomato-leaf-mold-in-hoophouse-tomatoes
                        </Button>
                      )}
                      {response.disease === "Tomato Bacterial Spot" && (
                        <Button
                          type="link"
                          href="https://hort.extension.wisc.edu/articles/bacterial-spot-of-tomato/"
                        >
                          https://hort.extension.wisc.edu/articles/bacterial-spot-of-tomato/
                        </Button>
                      )}
                      {response.disease === "Tomato Early Blight" && (
                        <Button
                          type="link"
                          href="https://content.ces.ncsu.edu/early-blight-of-tomato"
                        >
                          https://content.ces.ncsu.edu/early-blight-of-tomato
                        </Button>
                      )}
                      {response.disease === "Tomato Yellow Leaf Curl Virus" && (
                        <Button
                          type="link"
                          href="https://en.wikipedia.org/wiki/Tomato_yellow_leaf_curl_virus"
                        >
                          https://en.wikipedia.org/wiki/Tomato_yellow_leaf_curl_virus
                        </Button>
                      )}
                      {response.disease ===
                        "Tomato Two Spotted Spider Mites" && (
                          <Button
                            type="link"
                            href="https://entomology.ca.uky.edu/ef310"
                          >
                            https://entomology.ca.uky.edu/ef310
                          </Button>
                        )}
                      {response.disease === "Tomato Septoria Leaf Spot" && (
                        <Button
                          type="link"
                          href="https://portal.ct.gov/CAES/Fact-Sheets/Plant-Pathology/Septoria-Leaf-Spot-of-Tomato"
                        >
                          https://portal.ct.gov/CAES/Fact-Sheets/Plant-Pathology/Septoria-Leaf-Spot-of-Tomato
                        </Button>
                      )}
                      {response.disease === "Corn Cercospora Leaf Spot" && (
                        <Button
                          type="link"
                          href="https://portal.ct.gov/CAES/Fact-Sheets/Plant-Pathology/Septoria-Leaf-Spot-of-Tomato"
                        >
                          https://portal.ct.gov/CAES/Fact-Sheets/Plant-Pathology/Septoria-Leaf-Spot-of-Tomato
                        </Button>
                      )}
                      {response.disease === "Corn Northern Leaf Blight" && (
                        <Button
                          type="link"
                          href="https://extension.umn.edu/corn-pest-management/northern-corn-leaf-blight"
                        >
                          https://extension.umn.edu/corn-pest-management/northern-corn-leaf-blight
                        </Button>
                      )}
                      {response.disease === "Corn Northern Leaf Blight" && (
                        <Button
                          type="link"
                          href="https://extension.umn.edu/corn-pest-management/common-rust-cornt"
                        >
                          https://extension.umn.edu/corn-pest-management/common-rust-corn
                        </Button>
                      )}
                    </Row>
                  </>
                )}
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

const DiseasePage = withCustomerLayout(Disease);
export { DiseasePage };
