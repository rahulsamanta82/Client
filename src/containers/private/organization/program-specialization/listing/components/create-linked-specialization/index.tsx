import { FC, useEffect, useState } from "react";
import {
  CreateLinkedSpecializationMain,
  Container,
  ContentWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";
import { AddLinkSpecialization } from "utils/helpers/models/organization/add-link-specialization.dto";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import useOrganization from "containers/private/organization/useHooks";

interface ManageCriteriaProps {
  setOpen: Function;
  admission_session_id: any;
}

const CreateLinkedSpecialization: FC<ManageCriteriaProps> = ({
  setOpen,
  admission_session_id,
}) => {
  const [formData, setFormData] = useState<AddLinkSpecialization>({
    ...new AddLinkSpecialization(),
    admission_session_id,
  });
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchedSubjects, setSearchedSubjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { getSubjects, createLinkSpecialization } = useOrganization();

  const onSubmit = () => {
    if (!formData.specialization_id.length) {
      warningToaster(warningMessages.subjectsRequiredMsg);
      return;
    }
    createLinkSpecialization(formData, setOpen);
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
      formData.specialization_id.push(id);
    } else {
      const index = formData.specialization_id.findIndex(
        (p: any) => p.id == id
      );
      formData.specialization_id.splice(index, 1);
    }

    setFormData({ ...formData });
  };

  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    const subjectsHelper = subjects.filter((subject) =>
      subject.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedSubjects([...subjectsHelper]);
  };

  useEffect(() => {
    getSubjects(setSubjects);
  }, []);

  return (
    <CreateLinkedSpecializationMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8" expand={showDropdown}>
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Select Program Specialization Options</span>
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
                <label>Specialization Subjects</label>
                <div className="field-wrap">
                  <div className="field">
                    <div className="selected-items">
                      <input
                        type="search"
                        placeholder="Select Subject(s)"
                        value={search}
                        onChange={handleSearchChange}
                      />
                      {formData.specialization_id.length ? (
                        <div className="item">
                          {formData.specialization_id.length} selected
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
                  options={search === "" ? subjects : searchedSubjects}
                  onSelect={onSelectPrograms}
                  value={formData.specialization_id}
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
    </CreateLinkedSpecializationMain>
  );
};

export default CreateLinkedSpecialization;
