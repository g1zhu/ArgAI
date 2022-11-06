import { apiClient } from "../../../service";

export async function processImage(selectedImgFile: any, name: string) {
  const formData = new FormData();
  formData.append("file", selectedImgFile, name);

  const response = await apiClient.post(`/uploadImage`, formData);

  return response && response.data;
}
