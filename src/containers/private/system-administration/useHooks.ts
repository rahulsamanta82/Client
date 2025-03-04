import { SYSTEM_ADMINISTRATION_APIs } from "libs/apis/system-administration";
import { useNavigate } from "react-router-dom";
import { successToaster } from "utils/helpers/common/alert-service";

const useSystemAdministration = () => {
    const navigate = useNavigate();
    const createUser = async (body: any, addMore: boolean, reset: Function) => {
        const response = await SYSTEM_ADMINISTRATION_APIs.createUser(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (addMore) {
                reset();
            } else {
                navigate(-1);
            }
        }
    }
    const updateUser = async (id: number, body: any, shouldNavigate: boolean = true) => {
        const response = await SYSTEM_ADMINISTRATION_APIs.updateUser(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const getUsers = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await SYSTEM_ADMINISTRATION_APIs.getUsers(queryParams);
        const { status } = response || {};
        if (status) {
            const data = response?.response?.data;
            if (data) {
                const {
                    total: totalRecords,
                    current_page: page,
                    per_page,
                } = response?.response;
                if (setPagination) {
                    setPagination({ per_page, totalRecords, page });
                }
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const getUserById = async (id: number, formData: any, setFormData: Function, setValue?: Function) => {
        const response = await SYSTEM_ADMINISTRATION_APIs.getUserById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            if(key === "date_of_birth"){
                formData[key] = data?.users_meta[0]?.date_of_birth;
            }else if(key === "father_name"){
                formData[key] = data?.users_meta[0]?.father_name;
            }else{
                formData[key] = data[key];
            }
            if (setValue){
                setValue(key, formData[key])
            }
        }

        setFormData({ ...formData });
    }

    const deleteUserById = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await SYSTEM_ADMINISTRATION_APIs.deleteUserById(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getUsers(setData, queryParams, setPagination);
        }
    }


      const getCitiesByAdmin = async (
        setData: Function,
        
      ) => {
        const response = await SYSTEM_ADMINISTRATION_APIs.getCitiesByAdmin();
        console.log(response)
        if(response){
            setData(response?.data)
        }
        return response
       
      };
      const getRoles = async (
        setData: Function,
        queryParams: any = { per_page: "All" },
        setPagination?: Function
      ) => {
        const response = await SYSTEM_ADMINISTRATION_APIs.getRoles(queryParams);
      
        
        if (response?.status) {
          const data = response?.response;
          if (data) {
            if (setPagination) {
              const {
                total: totalRecords,
                current_page: page,
                per_page,
              } = response?.response;
              setPagination({ per_page, totalRecords, page });
              setData(data);
            }else{
              setData(response?.response)
            }
          }
        }
      };
    

    return {
        createUser,
        updateUser,
        getUserById,
        getUsers,
        deleteUserById,
        getRoles,
        getCitiesByAdmin
    }
}

export default useSystemAdministration;