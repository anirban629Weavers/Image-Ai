import api from ".";
import {
  ASK_PDF_URL,
  CHAT_URL,
  IMAGE_MODIFY_URL,
  LOGIN_URL,
  MODERATOR_ANALYSIS_URL,
  SENTIMENT_ANALYSIS_URL,
  UPLOAD_PDF_URL,
} from "../constants";

export const getSuperAdmin = async () => {
  const admin: { has_user: boolean } = await api.GET("/get-superuser");
  return admin.has_user;
};

export const loginUser = async (body: { email: string; password: string }) => {
  try {
    const response = await api.POST(LOGIN_URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const chatQuery = async (
  body: { usertext: string },
  accessToken: string | undefined
) => {
  try {
    const response = await api.POST(CHAT_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const imageModify = async (
  body: { uploaded_file: File; inputtext: string },
  accessToken: string | undefined
) => {
  try {
    const response = await api.POST(IMAGE_MODIFY_URL, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadPdf = async (
  body: { uploaded_file: File },
  accessToken: string | undefined
) => {
  try {
    console.log(body.uploaded_file);
    const response = await api.POST(UPLOAD_PDF_URL, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const pdfChatQuery = async (
  body: { question: string; path: string },
  accessToken: string | undefined
) => {
  try {
    const response = await api.POST(ASK_PDF_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const sentimentAnalysis = async (
  body: { usertext: string },
  accessToken: string | undefined
) => {
  try {
    const response = await api.POST(SENTIMENT_ANALYSIS_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const moderatorAnalysis = async (
  body: { usertext: string },
  accessToken: string | undefined
) => {
  try {
    const response = await api.POST(MODERATOR_ANALYSIS_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
