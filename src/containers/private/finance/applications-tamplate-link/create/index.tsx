import { FC, useEffect, useState } from "react";
import { CreateFineSlotForm, CreateFineSlotMain, CreateFineSlotTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { ApplicationTemplateLinkDTO } from "utils/helpers/models/finance/application-template-link.dto";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import useFinance from "../../useHooks";
import { VoucherTemplateHeaderDTO } from "utils/helpers/models/finance/voucher-template-header.dto";
import { FinanceApplicationDTO } from "utils/helpers/models/finance/application.dto";
import useComponentVisible from "hooks/click-outside";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { warningToaster } from "utils/helpers/common/alert-service";

interface CreateApplicationTemplateLinkProps { }

const CreateApplicationTemplateLink: FC<CreateApplicationTemplateLinkProps> = ({ }) => {
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<ApplicationTemplateLinkDTO>();
    let [formData, setFormData] = useState<ApplicationTemplateLinkDTO>(new ApplicationTemplateLinkDTO());
    const [programs, setPrograms] = useState<any[]>([]);
    const [searchedPrograms, setSearchedPrograms] = useState<any[]>([]);
    const [search, setSearch] = useState<string>('');
    const [voucherTemplateHeaders, setVoucherTemplateHeaders] = useState<VoucherTemplateHeaderDTO[]>([]);
    const [applications, setApplications] = useState<FinanceApplicationDTO[]>([]);
    const {
        isComponentVisible: showProgramsDropdown,
        setIsComponentVisible: setShowProgramsDropdown,
        ref: programsDropdownRef,
    } = useComponentVisible();
    const {
        createApplicationTemplateLink,
        updateApplicationTemplateLink,
        getApplicationTemplateLinkById,
        getVoucherTemplateHeaders,
        getFinanceApplications,
        getReferencePrograms
    } = useFinance();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (formData.ref_id.length) {
            if (params?.id) {
                updateApplicationTemplateLink(params?.id, { ...formData, ref_id: formData.ref_id.join(',') });
            } else {
                createApplicationTemplateLink({ ...formData, ref_id: formData.ref_id.join(',') });
            }
        } else {
            warningToaster('Please select atleast one program');
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new ApplicationTemplateLinkDTO();
        for (let key in formData) {
            setValue(key as keyof ApplicationTemplateLinkDTO, formData[key as keyof ApplicationTemplateLinkDTO]);
        }

        setFormData({ ...formData });
    }


    const onSelectPrograms = (bank: any) => {
        const { selected, id } = bank;
        const updatedBankIds = selected
            ? [...formData.ref_id, id]
            : formData.ref_id.filter((bankId) => bankId !== id);

        setFormData({ ...formData, ref_id: updatedBankIds });
    }

    const handleSearchChange = (event: any) => {
        const { value } = event.target;
        setSearch(value);
        const banksHelper = programs.filter((program) =>
            program.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedPrograms([...banksHelper]);
    };

    useEffect(() => {
        if (params?.id) {
            getApplicationTemplateLinkById(params?.id, formData, setValue, setFormData);
        }
        getVoucherTemplateHeaders(setVoucherTemplateHeaders);
        getFinanceApplications(setApplications);
        getReferencePrograms(setPrograms);
    }, []);

    return (
        <CreateFineSlotMain>
            <CreateFineSlotTop>
                <div className="heading">
                    <span className="page-heading">Add Application Template Link</span>
                    <Breadcrumb />
                </div>
            </CreateFineSlotTop>
            <CreateFineSlotForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label htmlFor="application">Application</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('acc_app_id', { required: true })} value={formData.acc_app_id} onChange={handleChange}>
                                    <option value="">Select Application</option>
                                    {applications.map((application, index) => {
                                        return <option value={application.id} key={index}>{application.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.acc_app_id} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="application">Voucher Templates</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('acc_voucher_temp_header_id', { required: true })} value={formData.acc_voucher_temp_header_id} onChange={handleChange}>
                                    <option value="">Select Voucher Templates</option>
                                    {voucherTemplateHeaders.map((templateHeader, index) => {
                                        return <option value={templateHeader.id} key={index}>{templateHeader.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.acc_voucher_temp_header_id} />
                        </div>
                    </div>

                    <div className="multiselect-field" ref={programsDropdownRef}>
                        <div className="input-field" onClick={() => setShowProgramsDropdown(true)}>
                            <label>Programs</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <div className="selected-items">
                                        <input
                                            type="search"
                                            placeholder="Select Programs"
                                            value={search}
                                            onChange={handleSearchChange}
                                        />
                                        {formData.ref_id.length ? (
                                            <div className="item">
                                                {formData.ref_id.length} selected
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showProgramsDropdown && (
                            <MultiselectDropdown
                                options={search === "" ? programs : searchedPrograms}
                                onSelect={onSelectPrograms}
                                value={formData.ref_id}
                            />
                        )}
                    </div>
                </div>
                <div className="action-buttons">
                    <div className="buttons">
                        <button
                            className="lg-rounded-btn gray"
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                        <button className="lg-rounded-btn">
                            Submit
                        </button>
                    </div>
                </div>
            </CreateFineSlotForm>
        </CreateFineSlotMain>
    )
}

export default CreateApplicationTemplateLink;