import { CSSProperties, useEffect, useState } from "react";
import { withCustomerLayout } from "../../../layout/Customer.layout";
import { Button, Layout } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

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
    // <Layout style={{ background: "none" }}>
    //   <Header></Header>
    //   <Content style={{ flex: "unset", margin: "auto 0" }}></Content>
    //   {/* <Footer
    //     style={{ textAlign: "center", background: "none", color: "#fff" }}
    //   >
    //     ©ArgAI Group. All rights reserved {moment().year()}.
    //   </Footer> */}
    // </Layout>
    <Button>click</Button>
  );
};

const DashboardPage = withCustomerLayout(Dashboard);
export { DashboardPage };
