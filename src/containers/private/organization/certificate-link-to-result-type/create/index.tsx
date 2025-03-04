import { ChangeEvent, FC, useEffect, useState } from "react";
import {
    CertificateLinkCreateSection,
    CertificateLinkCreateMain,
    CertificateLinkCreateTop,
} from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import { AddCertificateLinkDTO } from "utils/helpers/models/organization/add-certificate-link.dto";
import useOrganization from "../../useHooks";
import useUtils from "hooks/useUtils";
import useComponentVisible from "hooks/click-outside";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";

const CertificateLinkCreate: FC = () => {
    const [formData, setFormData] = useState<AddCertificateLinkDTO>(
        new AddCertificateLinkDTO()
    );
    const { getResultTypesAdmin, getCertificateLevelsAdmin, getDegreeCertificates } = useOrganization();
    const [searchedCertifictes, setSearchedCertificates] = useState<any[]>([]);
    const [resultTypes, setResultTypes] = useState<any[]>([]);
    const [certificateLevels, setCertificateLevels] = useState<any[]>([]);
    const [degreeCertificates, setDegreeCertificates] = useState<any[]>([]);
    const { createCertificateLink, updateCertificateLink, getCertificateLinkById } = useOrganization();
    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
    } = useForm<AddCertificateLinkDTO>();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const [search, setSearch] = useState('');

    const onSubmit = (data: AddCertificateLinkDTO) => {
        if (params?.id) {
            updateCertificateLink(params?.id, formData);
        } else {
            createCertificateLink(formData);
        }
    };

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        getResultTypesAdmin(setResultTypes);
        getCertificateLevelsAdmin(setCertificateLevels);
        getDegreeCertificates(setDegreeCertificates);
    }, []);

    const {
        isComponentVisible: showDropdown,
        setIsComponentVisible: setShowDropdown,
        ref: dropdownRef,
    } = useComponentVisible(false);


    const onSelectCertificates = (program: any) => {
        const { selected, id } = program;
        if (selected) {
            formData.skipped_certificate_ids.push(id);
        } else {
            const index = formData.skipped_certificate_ids.findIndex((p: any) => p.id == id);
            formData.skipped_certificate_ids.splice(index, 1);
        }

        setFormData({ ...formData });
    }

    const handleSearchChange = (event: any) => {
        const { value } = event.target;
        setSearch(value);
        const subjectsHelper = degreeCertificates.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        setSearchedCertificates([...subjectsHelper]);
    }

    const resetForm = () => {
        for (let key in formData) {
            if (key === 'skipped_certificate_ids') {
                setValue(key as keyof AddCertificateLinkDTO, []);
            } else {
                setValue(key as keyof AddCertificateLinkDTO, '');
            }
        }
        setFormData({ ...new AddCertificateLinkDTO() });
    }

    useEffect(() => {
        if (params?.id) getCertificateLinkById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CertificateLinkCreateMain>
            <CertificateLinkCreateTop>
                <div className="left">
                    <span className="page-heading">Link to Result Type</span>
                    {!params?.id && <Breadcrumb />}
                </div>
            </CertificateLinkCreateTop>
            <CertificateLinkCreateSection className="p-custom-scrollbar-8" expand={showDropdown}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Certificate Category</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("certificate_cat_id", { required: true })}
                                        value={formData.certificate_cat_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Certificate Category</option>
                                        {certificateLevels.map((item: any, index: number) => {
                                            return <option value={item.id} key={index}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.certificate_cat_id} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Result Type</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("result_type_id", { required: true })}
                                        value={formData.result_type_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Result Type</option>
                                        {resultTypes.map((item: any, index: number) => {
                                            return <option value={item.id} key={index}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.result_type_id} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Degree Certificate</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                        {...register("certificate_id", { required: true })}
                                        value={formData.certificate_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Degree Certificate</option>
                                        {degreeCertificates.map((item: any, index: number) => {
                                            return <option value={item.id} key={index}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.certificate_id} />
                            </div>
                        </div>

                        <div className="multiselect-field" ref={dropdownRef}>
                            <div className="input-field" onClick={() => setShowDropdown(true)}>
                                <label>Skipped Degree Certificate</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <div className="selected-items">
                                            <input type="search" placeholder="Select Skipped Degree Certificate" value={search} onChange={handleSearchChange} />
                                            {formData.skipped_certificate_ids.length ? <div className="item">{formData.skipped_certificate_ids.length} selected</div> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showDropdown && (
                                <MultiselectDropdown
                                    options={search === '' ? degreeCertificates : searchedCertifictes}
                                    onSelect={onSelectCertificates}
                                    value={formData.skipped_certificate_ids}
                                />
                            )}
                        </div>
                    </div>

                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                                Reset
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </CertificateLinkCreateSection>
        </CertificateLinkCreateMain>
    );
};

export default CertificateLinkCreate;
