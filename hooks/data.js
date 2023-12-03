import { useMutation } from "@tanstack/react-query";
import { request } from "../utils/network";

const getDataRequest = () => {
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  return request("GET", url, {}, false);
};

export const getData = (successCallback, errorCallback) => {
  return useMutation(getDataRequest, {
    mutationKey: "get-data",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};
