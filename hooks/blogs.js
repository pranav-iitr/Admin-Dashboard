import { useMutation } from "@tanstack/react-query";
import {
  getUrl,
  addQueryParams,
  request,
  getErrorBody,
} from "../utils/network";

const BlogData = (data) => {
  let url = getUrl(`/blogs/?page=${data.page}&pageSize=${data.pageSize}`);
  if (data.searchText) {
    url += `&search_text=${encodeURIComponent(data.searchText)}`;
  }
  return request("GET", url, {}, false);
};

export const BlogApi = (successCallback, errorCallback) => {
  return useMutation(BlogData, {
    mutationKey: "get-blog-data",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};
