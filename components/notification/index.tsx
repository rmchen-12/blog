import { AxiosResponse } from "axios";
import { notification } from "antd";

export const notice = (res: AxiosResponse<any>) => {
  res.data.code === 1
    ? notification.success({
        message: "success",
        description: `${res.data.message}`
      })
    : notification.error({
        message: "error",
        description: `${res.data.message}`
      });
};
