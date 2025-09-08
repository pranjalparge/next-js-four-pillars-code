import axios from "axios";

interface SmsPayload {
  sender: string;
  authkey: string;
  DLT_TE_ID: string;
  route: string;
  country: string;
  sms: {
    message: string;
    to: string[];
  }[];
}

export const sendRandomSMS = async (
  templateId: string,
  msg: string,
  mobile: string,
  countryCodeReceived?: string
): Promise<string> => {
  const countryCode = countryCodeReceived ? countryCodeReceived : "91";

  const postArray: SmsPayload = {
    sender: "TESTIN",
    authkey: process.env.authKey || "128527AMelyOCkjU355affb0e4",
    DLT_TE_ID: templateId,
    route: "4",
    country: countryCode.toString(),
    sms: [
      {
        message: msg,
        to: [mobile],
      },
    ],
  };

  const url = "http://api.msg91.com/api/v2/sendsms";

  try {
    const response = await axios.post(url, postArray);
    console.log(response.data);
    return postArray.sms[0].message; // Return the sent message text
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};
