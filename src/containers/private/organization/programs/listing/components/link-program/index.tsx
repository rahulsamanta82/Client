import { FC, useEffect, useState } from "react";
import {
  LinkProgramToAdmCampaignMain,
  Container,
  ContentWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import useOrganization from "containers/private/organization/useHooks";
import useAdmissions from "containers/private/admissions/useHooks";
import useUtils from "hooks/useUtils";

interface LinkProgramToAdmissionCampaignProps {
  setOpen: Function;
  Program_id: number[];
  admission_session_id: number;
  setData: Function;
}

const LinkProgramToAdmissionCampaign: FC<
  LinkProgramToAdmissionCampaignProps
> = ({ setOpen, Program_id, admission_session_id, setData }) => {
  console.log(admission_session_id, 'admission session id')
  const [formData, setFormData] = useState<any>({
    Program_id,
    admission_session_id,
  });
  const [programs, setPrograms] = useState<any[]>([]);
  const [searchedPrograms, setSearchedPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { getPrograms } = useOrganization();
  const { updateLinkedProgramsBySessionId } = useAdmissions();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = () => {
    if (!formData.Program_id.length) {
      warningToaster(warningMessages.programsRequiredMsg);
      return;
    }
    updateLinkedProgramsBySessionId(admission_session_id, formData, setOpen, setData);
  };

  const {
    isComponentVisible: showDropdown,
    setIsComponentVisible: setShowDropdown,
    ref: dropdownRef,
  } = useComponentVisible(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const onSelectPrograms = (program: any) => {
    const { selected, id } = program;
    if (selected) {
      formData.Program_id.push(id);
    } else {
      const index = formData.Program_id.findIndex((p: any) => p.id == id);
      formData.Program_id.splice(index, 1);
    }

    setFormData({ ...formData });
  };

  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    const programsHelper = programs.filter((program) =>
      program.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedPrograms([...programsHelper]);
  };

  useEffect(() => {
    const queryParams = { level_id: params?.level_id, per_page: 'All' };
    getPrograms(setPrograms, queryParams);
  }, []);

  return (
    <LinkProgramToAdmCampaignMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8" expand={showDropdown}>
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Link Program</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="multiselect-field" ref={dropdownRef}>
              <div
                className="input-field"
                onClick={() => setShowDropdown(true)}
              >
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
                      {formData.Program_id.length ? (
                        <div className="item">
                          {formData.Program_id.length} selected
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
                  value={formData.Program_id}
                />
              )}
            </div>
            {!showDropdown && (
              <div className="action-buttons">
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="reset"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>

                  <button
                    className="lg-rounded-btn"
                    type="button"
                    onClick={onSubmit}
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            )}
          </form>
        </ContentWrapper>
      </Container>
    </LinkProgramToAdmCampaignMain>
  );
};

export default LinkProgramToAdmissionCampaign;
