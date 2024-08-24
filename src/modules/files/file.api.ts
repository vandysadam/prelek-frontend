import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../api/api.query";
import { BaseResponse } from "../api/api.types";

export const FILE_API_REDUCER_KEY = "fileApi";

class UploadFileResponse {
  name: string;
  url: string;
  uploadedDir: string;
}

export const fileApi = createApi({
  reducerPath: FILE_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    uploadFileArticle: builder.mutation<
      BaseResponse<UploadFileResponse>,
      { file: File; folderName: string }
    >({
      query: ({ file }) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderName", "articles");

        return {
          method: "POST",
          url: "/api/file/upload",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        };
      },
    }),
    deleteFileArticle: builder.mutation<
      BaseResponse<boolean>,
      { fileString: string }
    >({
      query: ({ fileString }) => ({
        method: "POST",
        url: `/api/file/delete`,
        data:{
          fileString
        }
      }),
    }),    
  }),
});

export const {
  useUploadFileArticleMutation,
  useDeleteFileArticleMutation,
} = fileApi;