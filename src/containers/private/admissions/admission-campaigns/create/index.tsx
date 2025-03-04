import { FC, useEffect, useState } from "react";
import {
  CreateAdmissionCampaignTop,
  CreateACFormSection,
  CreateAdmissionCampaignMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";
import { AddAdmissionCampaignDTO } from "utils/helpers/models/admissions/add-admission-campaign.dto";
import useOrganization from "containers/private/organization/useHooks";
import useAdmissions from "../../useHooks";
import {
  errorToaster,
  warningToaster,
} from "utils/helpers/common/alert-service";
import {
  errorMessages,
  warningMessages,
} from "utils/helpers/enums/messages.enum";
import useUtils from "hooks/useUtils";

interface CreateAdmissionCampaignProps {}

const CreateAdmissionCampaign: FC<CreateAdmissionCampaignProps> = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [orgStructures, setOrgStructures] = useState<any[]>([]);
  const [certificateLevels, setCertificateLevels] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [previousLevel, setPreviousLevel] = useState<string | null>(null);
  const { getCertificateLevelsAdmin, getPrograms, getOrgStructures } =
    useOrganization();
  const {
    getAdmissionSessions,
    createAdmissionCampaign,
    updateAdmissionCampaign,
    getAdmissionCampaignById,
    getCampusList,
  } = useAdmissions();

  const {
    isComponentVisible: showDropdown,
    setIsComponentVisible: setShowDropdown,
    ref: dropdownRef,
  } = useComponentVisible();
  const { getQueryParams, compareDateStrings } = useUtils();
  const params = getQueryParams();
  const [searchedPrograms, setSearchedPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<AddAdmissionCampaignDTO>(
    new AddAdmissionCampaignDTO()
  );
  const [campus, setCampus] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<AddAdmissionCampaignDTO>({
    defaultValues: formData,
    mode: "onChange",
  });

  const onSubmit = (data: AddAdmissionCampaignDTO) => {
    const submissionData = { ...data, ...formData };

    // console.log("Submitting Data:", submissionData); // Check the payload
    // console.log("FormData State at Submit:", formData);

    if (!submissionData.program_id.length) {
      warningToaster(warningMessages.programsRequiredMsg);
      return;
    } else if (
      !compareDateStrings(
        submissionData.fee_due_date,
        submissionData.class_start_date
      )
    ) {
      warningToaster(warningMessages.classStartDateAfterFeeDateMsg);
      return;
    }

    if (params?.id) {
      updateAdmissionCampaign(params?.id, submissionData);
    } else {
      createAdmissionCampaign(submissionData);
    }
  };

  const resetForm = () => {
    for (let key in getValues()) {
      setValue(key as keyof AddAdmissionCampaignDTO, "");
    }
    setFormData({ ...new AddAdmissionCampaignDTO() });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value);
    formData[name as keyof AddAdmissionCampaignDTO] = value as never;
    setFormData({ ...formData });
    trigger(name);
  };

  // const onSelectPrograms = (program: any) => {
  //   const { selected, id } = program;
  //   if (selected) {
  //     formData.program_id.push(id);
  //   } else {
  //     const index = formData.program_id.findIndex((p: any) => p.id == id);
  //     formData.program_id.splice(index, 1);
  //   }

  //   setFormData({ ...formData });
  // };
  const onSelectPrograms = (program: any) => {
    const { selected, id } = program;
    const updatedProgramIds = selected
      ? [...formData.program_id, id]
      : formData.program_id.filter((programId) => programId !== id);

    setFormData({ ...formData, program_id: updatedProgramIds });
  };
  useEffect(() => {
    getCertificateLevelsAdmin(setCertificateLevels);
    getOrgStructures(setOrgStructures);
    getAdmissionSessions(setSessions);
    if (params?.id)
      getAdmissionCampaignById(params?.id, formData, setValue, setFormData);
  }, []);

  useEffect(() => {
    setValue("program_id", formData.program_id); // Sync formData with react-hook-form
  }, [formData.program_id]);

  useEffect(() => {
    if (formData.certificate_level_id) {
      if (previousLevel && previousLevel !== formData.certificate_level_id) {
        // Reset the selected programs when the program level changes
        setFormData({ ...formData, program_id: [] });
      }
      setPreviousLevel(formData.certificate_level_id);

      const queryParams = {
        per_page: "All",
        level_id: formData.certificate_level_id,
      };
      getPrograms(setPrograms, queryParams);
      setFormData({ ...formData, program_id: [] });
    }
  }, [formData.certificate_level_id]);

  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    const programsHelper = programs.filter((program) =>
      program.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedPrograms([...programsHelper]);
  };
  useEffect(() => {
    getCampusList(setCampus);
  }, []);
  // console.log(campus);

  return (
    <CreateAdmissionCampaignMain>
      <CreateAdmissionCampaignTop>
        <div className="heading">
          <span className="page-heading">Admission Announce </span>
          <Breadcrumb />
        </div>
      </CreateAdmissionCampaignTop>

      <CreateACFormSection
        className="content-radius-shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="common-fields">
          {/* Existing input fields */}
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="Enter Title"
                  {...register("title", { required: true })}
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors?.title} />
            </div>
          </div>
          <div className="input-field">
            <label>Session</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("session_id", { required: true })}
                  value={formData.session_id}
                  onChange={handleChange}
                >
                  <option value="">Select session</option>
                  {sessions?.map((session: any, index: number) => {
                    return (
                      <option value={session.id} key={index}>
                        {session.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.session_id} />
            </div>
          </div>

          <div className="input-field">
            <label>Campus</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("cat_id", { required: true })}
                  value={formData.cat_id}
                  onChange={handleChange}
                >
                  <option value="">Select Campus</option>
                  {campus?.map((item: any, index: number) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.cat_id} />
            </div>
          </div>
          <div className="input-field">
            <label>Program Level</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("certificate_level_id", { required: true })}
                  value={formData.certificate_level_id}
                  onChange={handleChange}
                >
                  <option value="">Select Program Level</option>
                  {certificateLevels?.map((item: any, index: number) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors?.certificate_level_id} />
            </div>
          </div>
          <div className="input-field">
            <label>Processing Fee Due Date</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="date"
                  {...register("fee_due_date", { required: true })}
                  value={formData.fee_due_date}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors?.fee_due_date} />
            </div>
          </div>
          <div className="input-field">
            <label>Class Start Date</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="date"
                  {...register("class_start_date", { required: true })}
                  value={formData.class_start_date}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors?.class_start_date} />
            </div>
          </div>

          <div className="radio-field">
            <label>Status</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Active</label>
                <input
                  type="radio"
                  id="is-active-yes"
                  value={1}
                  {...register("admission_status", { required: true })}
                  checked={formData.admission_status == 1}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">Deactivate</label>
                <input
                  type="radio"
                  id="is-active-no"
                  value={0}
                  {...register("admission_status", { required: true })}
                  checked={formData.admission_status == 0}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="multiselect-field" ref={dropdownRef}>
            <div className="input-field" onClick={() => setShowDropdown(true)}>
              <label>Program Listing</label>
              <div className="field-wrap">
                <div className="field">
                  <div className="selected-items">
                    <input
                      type="search"
                      placeholder="Select Program(s)"
                      value={search}
                      onChange={handleSearchChange}
                    />
                    {formData.program_id.length ? (
                      <div className="item">
                        {formData.program_id.length} selected
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showDropdown && (
              <MultiselectDropdown
                options={search === "" ? programs : searchedPrograms}
                onSelect={onSelectPrograms}
                value={formData.program_id}
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
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </CreateACFormSection>
    </CreateAdmissionCampaignMain>
  );
};

export default CreateAdmissionCampaign;
