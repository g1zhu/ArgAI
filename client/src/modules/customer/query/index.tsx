import { AxiosError } from "axios";
import { useQuery } from "react-query";
import * as Services from "../services";

export const useProcessImageQuery = (selectedImgFile: any, name: string) =>
  useQuery<any, AxiosError>(["customer.processImage", name], () =>
    Services.processImage(selectedImgFile, name)
  );
