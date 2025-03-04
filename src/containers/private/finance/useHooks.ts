import { FINANCE_APIS } from "libs/apis/finance.api"
import { useNavigate } from "react-router-dom";
import { successToaster } from "utils/helpers/common/alert-service";
import { AccSlotInstallmentParticular } from "utils/helpers/models/finance/acc-slot-installment-particular.dto";
import { BankDiscountAdjustmentDTO } from "utils/helpers/models/finance/bank-transaction.dto";
import { FineSlotDTO } from "utils/helpers/models/finance/fine-slot.dto";
import { VoucherTemplateBodyDTO } from "utils/helpers/models/finance/voucher-template-body.dto";

const useFinance = () => {
    const navigate = useNavigate();
    const createBankInfo = async (body: any) => {
        const response = await FINANCE_APIS.createBankInfo(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateBankInfo = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateBankInfo(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getBankInfos = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getBankInfos(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getBankInfoById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getBankInfoById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteBankInfo = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteBankInfoById(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getBankInfos(setData, queryParams, setPagination);
        }
    }
    const createVoucherType = async (body: any) => {
        const response = await FINANCE_APIS.createVoucherType(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateVoucherType = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateVoucherType(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getVoucherTypes = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getVoucherTypes(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getVoucherTypeById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getVoucherTypeById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteVoucherType = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteVoucherType(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getVoucherTypes(setData, queryParams, setPagination);
        }
    }
    const createVoucherParticular = async (body: any) => {
        const response = await FINANCE_APIS.createVoucherParticular(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateVoucherParticular = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateVoucherParticular(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getVoucherParticulars = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getVoucherParticulars(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getVoucherParticularById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getVoucherParticularById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteVoucherParticular = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteVoucherParticular(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getVoucherParticulars(setData, queryParams, setPagination);
        }
    }
    const createVoucherTemplateHeader = async (body: any) => {
        const response = await FINANCE_APIS.createVoucherTemplateHeader(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateVoucherTemplateHeader = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateVoucherTemplateHeader(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getVoucherTemplateHeaders = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getVoucherTemplateHeaders(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getVoucherTemplateHeaderById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getVoucherTemplateHeaderById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            if (key === 'bank_ids') {
                formData[key] = data[key].split(',');
            } else {
                formData[key] = data[key];
            }
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteVoucherTemplateHeader = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteVoucherTemplateHeader(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getVoucherTemplateHeaders(setData, queryParams, setPagination);
        }
    }
    const createVoucherTemplateBody = async (body: any, setOpen: Function) => {
        const response = await FINANCE_APIS.createVoucherTemplateBody(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            setOpen(false);
        }
    }
    const updateVoucherTemplateBody = async (id: number, body: VoucherTemplateBodyDTO, setOpen: Function, voucherTemplateBodies: VoucherTemplateBodyDTO[], setVoucherTemplateBodies: Function
    ) => {
        const response = await FINANCE_APIS.updateVoucherTemplateBody(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            const index = voucherTemplateBodies.findIndex((b) => b.id === id);
            voucherTemplateBodies[index] = body;
            setVoucherTemplateBodies([...voucherTemplateBodies]);
            setOpen(false);
        }
    }

    const getVoucherTemplateBodies = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getVoucherTemplateBodies(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getVoucherTemplateBodyById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getVoucherTemplateBodyById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            if (key === 'bank_ids') {
                formData[key] = data[key].split(',');
            } else {
                formData[key] = data[key];
            }
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteVoucherTemplateBody = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteVoucherTemplateBody(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getVoucherTemplateBodies(setData, queryParams, setPagination);
        }
    }

    const createFinanceApplication = async (body: any) => {
        const response = await FINANCE_APIS.createFinanceApplication(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateFinanceApplication = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateFinanceApplication(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getFinanceApplications = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getFinanceApplications(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getFinanceApplicationById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getFinanceApplicationById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            if (key !== 'banks' && key !== 'id') {
                if (key === 'bank_ids') {
                    formData[key] = data[key].split(',');
                } else {
                    formData[key] = data[key];
                }
                setValue(key, formData[key]);
            }
        }

        setFormData({ ...formData });
    }

    const deleteFinanceApplication = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteFinanceApplication(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getFinanceApplications(setData, queryParams, setPagination);
        }
    }
    const createApplicationTemplateLink = async (body: any) => {
        const response = await FINANCE_APIS.createApplicationTemplateLink(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateApplicationTemplateLink = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateApplicationTemplateLink(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getApplicationTemplateLinks = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination: Function) => {
        const response = await FINANCE_APIS.getApplicationTemplateLinks(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getApplicationTemplateLinkById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getApplicationTemplateLinkById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteApplicationTemplateLink = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteApplicationTemplateLink(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getApplicationTemplateLinks(setData, queryParams, setPagination);
        }
    }
    const createFineSlot = async (body: any) => {
        const response = await FINANCE_APIS.createFineSlot(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateFineSlot = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateFineSlot(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getFineSlots = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination: Function) => {
        const response = await FINANCE_APIS.getFineSlots(queryParams);
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
                setData(data.map((d: any) => new FineSlotDTO(d)));
            } else {
                setData(response?.response?.map((d: any) => new FineSlotDTO(d)));
            }
        }
    }

    const getFineSlotById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getFineSlotById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteFineSlot = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteFineSlot(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getFineSlots(setData, queryParams, setPagination);
        }
    }
    const createAccInstallment = async (body: any) => {
        const response = await FINANCE_APIS.createAccInstallment(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateAccInstallment = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateAccInstallment(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            // navigate(-1);
        }
    }

    const getAccInstallments = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination: Function) => {
        const response = await FINANCE_APIS.getAccInstallments(queryParams);
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
                setData(data.map((d: any) => new FineSlotDTO(d)));
            } else {
                setData(response?.response?.map((d: any) => new FineSlotDTO(d)));
            }
        }
    }

    const getAccInstallmentById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getAccInstallmentById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteAccInstallment = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteAccInstallment(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAccInstallments(setData, queryParams, setPagination);
        }
    }
    const createAccInstallmentSlot = async (body: any) => {
        const response = await FINANCE_APIS.createAccInstallmentSlot(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateAccInstallmentSlot = async (id: number, body: any) => {
        const response = await FINANCE_APIS.updateAccInstallmentSlot(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            // navigate(-1);
        }
    }

    const getAccInstallmentSlots = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination: Function) => {
        const response = await FINANCE_APIS.getAccInstallmentSlots(queryParams);
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
                setData(data.map((d: any) => new FineSlotDTO(d)));
            } else {
                setData(response?.response?.map((d: any) => new FineSlotDTO(d)));
            }
        }
    }

    const getAccInstallmentSlotById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getAccInstallmentSlotById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteAccInstallmentSlot = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteAccInstallmentSlot(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAccInstallmentSlots(setData, queryParams, setPagination);
        }
    }
    const createAccSlotInstallmentParticular = async (body: any, setOpen: Function) => {
        const response = await FINANCE_APIS.createAccSlotInstallmentParticular(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            setOpen(false);
        }
    }
    const updateAccSlotInstallmentParticular = async (id: number, body: any, setOpen: Function, particularSlots: AccSlotInstallmentParticular[], setParticularSlots: Function) => {
        const response = await FINANCE_APIS.updateAccSlotInstallmentParticular(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            const index = particularSlots.findIndex((ps: any) => ps.id === body.id);
            particularSlots[index] = body;
            setParticularSlots([...particularSlots]);
            setOpen(false)
        }
    }

    const getAccSlotInstallmentParticulars = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination: Function) => {
        const response = await FINANCE_APIS.getAccSlotInstallmentParticulars(queryParams);
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
                setData(data.map((d: any) => new FineSlotDTO(d)));
            } else {
                setData(response?.response?.map((d: any) => new FineSlotDTO(d)));
            }
        }
    }

    const getAccSlotInstallmentParticularById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await FINANCE_APIS.getAccSlotInstallmentParticularById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteAccSlotInstallmentParticular = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteAccSlotInstallmentParticular(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAccInstallmentSlots(setData, queryParams, setPagination);
        }
    }

    const getReferencePrograms = async (setData: Function, queryParams: any = { per_page: 'All' }) => {
        const response = await FINANCE_APIS.getReferencePrograms(queryParams);
        const { status, response: data } = response || {};
        if (status) {
            setData(data);
        }
    }
    const getChallanStatuses = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getChallanStatuses(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const masterBookListing = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination: Function) => {
        const response = await FINANCE_APIS.masterBookListing(queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const getMasterBookLinkedParticulars = async (transactionId: number, setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await FINANCE_APIS.getMasterBookLinkedParticulars(transactionId, queryParams);
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
                setData(data);
            } else {
                setData(response?.response);
            }
        }
    }

    const deleteMasterBookLinkedParticular = async (particularId: number, transactionId: number, setData: Function, queryParams: any, setPagination: Function) => {
        const response = await FINANCE_APIS.deleteMasterBookLinkedParticular(particularId);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getMasterBookLinkedParticulars(transactionId, setData, queryParams, setPagination);
        }
    }

    const updateTransactionDiscountAdjustment = async (body: BankDiscountAdjustmentDTO) => {
        const response = await FINANCE_APIS.updateTransactionDiscountAdjustment(body);
        const { status, message } = response;
        if (status) {
            successToaster(message);
        }
    }


    return {
        createBankInfo,
        getMasterBookLinkedParticulars,
        deleteMasterBookLinkedParticular,
        updateTransactionDiscountAdjustment,
        getChallanStatuses,
        getReferencePrograms,
        updateBankInfo,
        getBankInfos,
        getBankInfoById,
        deleteBankInfo,
        createVoucherType,
        updateVoucherType,
        getVoucherTypes,
        getVoucherTypeById,
        deleteVoucherType,
        createAccInstallment,
        updateAccInstallment,
        getAccInstallments,
        getAccInstallmentById,
        deleteAccInstallment,
        createAccInstallmentSlot,
        updateAccInstallmentSlot,
        getAccInstallmentSlots,
        getAccInstallmentSlotById,
        deleteAccInstallmentSlot,
        createVoucherParticular,
        updateVoucherParticular,
        getVoucherParticulars,
        getVoucherParticularById,
        deleteVoucherParticular,
        createVoucherTemplateHeader,
        updateVoucherTemplateHeader,
        getVoucherTemplateHeaders,
        getVoucherTemplateHeaderById,
        deleteVoucherTemplateHeader,
        createFinanceApplication,
        updateFinanceApplication,
        getFinanceApplications,
        getFinanceApplicationById,
        deleteFinanceApplication,
        createApplicationTemplateLink,
        updateApplicationTemplateLink,
        getApplicationTemplateLinks,
        getApplicationTemplateLinkById,
        deleteApplicationTemplateLink,
        createFineSlot,
        updateFineSlot,
        getFineSlots,
        getFineSlotById,
        deleteFineSlot,
        createVoucherTemplateBody,
        updateVoucherTemplateBody,
        getVoucherTemplateBodies,
        getVoucherTemplateBodyById,
        deleteVoucherTemplateBody,
        masterBookListing,
        createAccSlotInstallmentParticular,
        updateAccSlotInstallmentParticular,
        getAccSlotInstallmentParticulars,
        getAccSlotInstallmentParticularById,
        deleteAccSlotInstallmentParticular
    }
}

export default useFinance;