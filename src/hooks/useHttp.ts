import axios from "utils/helpers/common/axios.config";
import useStore from "./useStore";
import { errorToaster } from "utils/helpers/common/alert-service";
import { errorMessages } from "utils/helpers/enums/messages.enum";
import { ORGANIZATION_APIS } from "libs/apis/organization.api";

const useHttp = () => {
  // const { errorToaster } = useToaster();
  const { logout, setLoading, setOrganization } = useStore();

  function configureHeaders() {
    axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        // Promise.reject(error)
      }
    );
  }

  const configureInterceptors = () => {
    axios.interceptors.response.use(
      (response: any) => {
        setLoading(false);
        if (response?.data?.status === false || response?.data?.status == 0) displayApiErrors(response);
        return response;
      },
      async (error) => {
        setLoading(false);
        if (error?.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );
  };

  const displayApiErrors = (response: any) => {
    errorToaster(
      response?.data?.errors?.length &&
        typeof response?.data?.errors === "object"
        ? response?.data?.errors[0]
        : response?.data?.message?.length
          ? response?.data?.message
          : response?.data?.error?.length
            ? response?.data?.error
            : errorMessages.somethingWentWrong
    );
  };

  const getCurrentOrganization = async () => {
    const response = await ORGANIZATION_APIS.getCurrentOrganization();
    const { response: organization } = response || {};
    if (organization) setOrganization(organization);
  }

  return {
    configureHeaders,
    getCurrentOrganization,
    configureInterceptors,
  };
};

export default useHttp;
