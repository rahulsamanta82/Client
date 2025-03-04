import { AUTHORITIES_API } from "libs/apis/authorities.api";
import { useNavigate } from "react-router-dom";
import { successToaster } from "utils/helpers/common/alert-service";
import { AuthorityDTO } from "utils/helpers/models/authorities/authorities.dto";
import { AuthorityBoardDTO } from "utils/helpers/models/authorities/authority-board.dto";
import { AuthorityMeetingdDTO } from "utils/helpers/models/authorities/authority-meeting.dto";

const useAuthorities = () => {
    const navigate = useNavigate();
    const createCommitteeType = async (body: any, addMore: boolean, reset: Function) => {
        const response = await AUTHORITIES_API.createCommitteeType(body);
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
    const updateCommitteeType = async (id: number, body: any, shouldNavigate: boolean = true) => {
        const response = await AUTHORITIES_API.updateCommitteeType(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const getCommitteeTypes = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await AUTHORITIES_API.getCommitteeTypes(queryParams);
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
    const createAuthorityBoard = async (body: AuthorityBoardDTO) => {
        const response = await AUTHORITIES_API.createAuthorityBoard(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateAuthorityBoard = async (id: number, body: AuthorityBoardDTO, shouldNavigate: boolean = true) => {
        const response = await AUTHORITIES_API.updateAuthorityBoard(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const getAuthorityBoards = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await AUTHORITIES_API.getAuthorityBoards(queryParams);
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

    const getAuthorityBoardById = async (id: number, formData: any, setFormData: Function, setValue?: Function) => {
        const response = await AUTHORITIES_API.getAuthorityBoardById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            if (key === "date_of_birth") {
                formData[key] = data?.users_meta[0]?.date_of_birth;
            } else {
                formData[key] = data[key];
            }
            if (setValue) {
                setValue(key, formData[key])
            }
        }

        setFormData({ ...formData });
    }

    const deleteAuthorityBoard = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await AUTHORITIES_API.deleteAuthorityBoard(id);
        const updatedQueryParams = { ...queryParams, type: 'auth_com_type' };
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAuthorityBoards(setData, updatedQueryParams, setPagination);
        }
    }
    const getCommitteeTypeById = async (id: number, formData: any, setFormData: Function, setValue?: Function) => {
        const response = await AUTHORITIES_API.getCommitteeTypeById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            if (key === "date_of_birth") {
                formData[key] = data?.users_meta[0]?.date_of_birth;
            } else {
                formData[key] = data[key];
            }
            if (setValue) {
                setValue(key, formData[key])
            }
        }

        setFormData({ ...formData });
    }

    const deleteCommitteeTypeById = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await AUTHORITIES_API.deleteCommitteeTypeById(id);
        const updatedQueryParams = { ...queryParams, type: 'auth_com_type' };
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getCommitteeTypes(setData, updatedQueryParams, setPagination);
        }
    }

    const deleteCommitteeMemberTypeById = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await AUTHORITIES_API.deleteCommitteeTypeById(id);
        const updatedQueryParams = { ...queryParams, type: 'member_type' };
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getCommitteeTypes(setData, updatedQueryParams, setPagination);
        }
    }

    const getAcademicNotification = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await AUTHORITIES_API.getAcademicNotification(queryParams);
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

    const getAuthorities = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await AUTHORITIES_API.getAuthorities(queryParams);
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

    const createAcademicNotification = async (body: any, addMore: boolean, reset: Function) => {
        const response = await AUTHORITIES_API.createAcademicNotification(body);
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
    const updateAcademicNotification = async (id: number, body: any, shouldNavigate: boolean = true) => {
        const response = await AUTHORITIES_API.updateAcademicNotification(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const getAcademicNotificationById = async (id: number, formData: any, setFormData: Function, setValue?: Function) => {
        const response = await AUTHORITIES_API.getAcademicNotificationById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            if (key === "date_of_birth") {
                formData[key] = data?.users_meta[0]?.date_of_birth;
            } else {
                formData[key] = data[key];
            }
            if (setValue) {
                setValue(key, formData[key])
            }
        }

        setFormData({ ...formData });
    }
    const getAuthorityById = async (id: number, formData: any, setFormData: Function, setValue: Function) => {
        const response = await AUTHORITIES_API.getAuthorityById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key])
        }

        setFormData({ ...formData });
    }

    const deleteAcademicNotificationById = async (id: number, authority_id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await AUTHORITIES_API.deleteAcademicNotificationById(id);
        const updatedQueryParams = { ...queryParams, authority_id: authority_id };
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAcademicNotification(setData, updatedQueryParams, setPagination);
        }
    }

    const createAuthority = async (body: AuthorityDTO) => {
        const response = await AUTHORITIES_API.createAuthority(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateAuthority = async (id: number, body: any, shouldNavigate: boolean = true) => {
        const response = await AUTHORITIES_API.updateAuthority(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const uploadAuthorityDocument = async (body: FormData, formData: AuthorityDTO, setFormData: Function, setValue: Function) => {
        const response = await AUTHORITIES_API.uploadAuthorityDocument(body);
        const { status, response: data } = response || {};
        if (status) {
            formData.document = data.document;
            formData.id = data.id;
            setFormData({ ...formData });
            setValue('document', formData.document);
            setValue('id', formData.id);
        }
    }
    const uploadAuthorityMeetingDocument = async (body: FormData, name: string, formData: AuthorityMeetingdDTO, setFormData: Function, setValue: Function) => {
        const response = await AUTHORITIES_API.uploadAuthorityMeetingDocument(body);
        const { status, response: path } = response || {};
        if (status) {
            formData.attachments = formData.attachments.map((attachment) => {
                if (attachment.type === name) {
                    attachment.filename = path;
                }

                return attachment;
            })
            setFormData({ ...formData });
        }
    }

    const getAuthorityMeetings = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await AUTHORITIES_API.getAuthorityMeetings(queryParams);
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

    const deleteAuthorityById = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await AUTHORITIES_API.deleteAuthorityById(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAuthorities(setData, queryParams, setPagination);
        }
    }

    const deleteAuthorityMeetingById = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await AUTHORITIES_API.deleteAuthorityMeetingById(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAuthorityMeetings(setData, queryParams, setPagination);
        }
    }

    const createAuthorityMeeting = async (body: any, addMore: boolean, reset: Function) => {
        const response = await AUTHORITIES_API.createAuthorityMeeting(body);
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
    const updateAuthorityMeeting = async (id: number, body: any, shouldNavigate: boolean = true) => {
        const response = await AUTHORITIES_API.updateAuthorityMeeting(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const updateAuthorityMeetingAttendance = async (id: any, body: any, shouldNavigate: boolean = true) => {
        try {
            const response = await AUTHORITIES_API.updateAuthorityMeetingAttendance(id, body);
            const { status, message } = response || {};
            if (status) {
                successToaster(message);
                if (shouldNavigate) navigate(-1);
            }
            return response;
        } catch (error) {
            console.error("Error updating attendance:", error);
            throw error;
        }
    };


    return {
        createCommitteeType,
        updateCommitteeType,
        getCommitteeTypeById,
        getCommitteeTypes,
        deleteCommitteeTypeById,
        createAuthorityBoard,
        updateAuthorityBoard,
        uploadAuthorityMeetingDocument,
        getAuthorityBoardById,
        getAuthorityBoards,
        deleteAuthorityBoard,
        deleteCommitteeMemberTypeById,
        getAcademicNotification,
        createAcademicNotification,
        updateAcademicNotification,
        getAcademicNotificationById,
        deleteAcademicNotificationById,
        getAuthorities,
        createAuthority,
        updateAuthority,
        getAuthorityById,
        deleteAuthorityById,
        uploadAuthorityDocument,
        getAuthorityMeetings,
        deleteAuthorityMeetingById,
        createAuthorityMeeting,
        updateAuthorityMeeting,
        updateAuthorityMeetingAttendance
    }
}

export default useAuthorities;