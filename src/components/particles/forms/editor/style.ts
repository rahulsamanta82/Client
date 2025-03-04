import styled from "styled-components";
export const EditorMain = styled.div`
  width: 100%;
  .editor-wrapper{
    display: flex;
    justify-content: center;
  }
  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 300px !important;
    overflow-y: auto !important;
    overflow: hidden !important;
    width: 100% !important;
  }
  .ql-editor.ql-blank {
    border-radius: 5px !important;
    width: 100%;
  }

  .ql-editor{ 
    color: var(--black-text) !important;
  }

  .ql-toolbar.ql-snow {
    width: 100% !important;
    border-top-right-radius: 5px !important;   
    border-top-left-radius: 5px !important;
    background: #F3F6F9 !important;
  }
  .ql-container.ql-snow {
    border-bottom-left-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
  .quill{
    width: 100px !important;
  }
`;

