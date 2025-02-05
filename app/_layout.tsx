import { useEffect } from "react";
import AuthNavigator from "./layouts/AuthNavigator";
import authServices from "./services/authService";

export default function RootLayout() {
  useEffect(() => {
    const fetchToken = async () => {
      const token = await authServices.getToken();
      console.log(token,"tjdh");
    };

    fetchToken();
  }, []);

  return <AuthNavigator />;
}
