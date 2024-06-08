import Cookies from "js-cookie";

export const getJwtToken = () => {
  return Cookies.get("token"); // Assuming your JWT token is stored under the 'jwt' key
};
