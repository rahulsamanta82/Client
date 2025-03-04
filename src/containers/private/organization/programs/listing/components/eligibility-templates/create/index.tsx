import { FC, useEffect, useState } from "react";
import {
  EligibilityTemplateCreateSection,
  EligibilityTemplateCreateMain,
  EligibilityTemplateCreateTop,
  QuotaListDropdownMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import useAdmissions from "containers/private/admissions/useHooks";
import { AddTemplateLinkToProgramDTO } from "utils/helpers/models/admissions/add-template-link-to-program.dto";
import useUtils from "hooks/useUtils";
import { warningToaster } from "utils/helpers/common/alert-service";

const EligibilityTemplateCreate: FC = () => {
  const { getTemplateHeaders, createTemplateLinkToProgram } = useAdmissions();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const [formData, setFormData] = useState<AddTemplateLinkToProgramDTO>({
    ...new AddTemplateLinkToProgramDTO(),
    program_id: params?.id,
    admission_session_id: params?.admission_session_id,
  });
  const [templateHeaders, setTemplateHeaders] = useState<any[]>([]);

  useEffect(() => {
    getTemplateHeaders(setTemplateHeaders);
  }, []);

  const handleSelect = (templateHeader: any) => {
    const { id } = templateHeader;
    if (formData.template_id.includes(id)) {
      const index = formData.template_id.indexOf(id);
      formData.template_id.splice(index, 1);
    } else {
      formData.template_id.push(id);
    }

    setFormData({ ...formData });
  };

  const onSubmit = () => {
    if (!formData.template_id.length) {
      warningToaster("Please select atleast one template");
    } else {
      createTemplateLinkToProgram(
        { ...formData, template_id: formData.template_id.join(",") },
        params
      );
    }
  };

  const resetForm = () => {
    setFormData({ ...new AddTemplateLinkToProgramDTO() });
  };

  return (
    <EligibilityTemplateCreateMain>
      <EligibilityTemplateCreateTop>
        <div className="left">
          <span className="page-heading">
            Program Linked to Eligibility Templates
          </span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </EligibilityTemplateCreateTop>

      <EligibilityTemplateCreateSection className="p-custom-scrollbar-8">
        <form>
          <div className="common-fields">
            <div className="input-field">
              <label>Templates</label>
              <div className="field-wrap">
                <QuotaListDropdownMain>
                  <ul className="p-custom-scrollbar-8">
                    {templateHeaders.map((item: any, index: number) => (
                      <li key={index} onClick={() => handleSelect(item)}>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            checked={formData.template_id.includes(item?.id)}
                          />
                        </div>
                        <div className="item-text">
                          <span className="text">{item.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </QuotaListDropdownMain>
              </div>
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
              <button
                className="lg-rounded-btn"
                type="button"
                onClick={onSubmit}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </form>
      </EligibilityTemplateCreateSection>
    </EligibilityTemplateCreateMain>
  );
};

export default EligibilityTemplateCreate;
