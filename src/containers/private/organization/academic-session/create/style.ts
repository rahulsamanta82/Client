import styled from "styled-components";

export const CreateAcademicSessionOrganizationMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: 0.5em;
    }
`;

export const CreateAcademicSessionOrganizationTop = styled.div`
    .header{
        display: flex;
        flex-direction: column;
        gap: .5em;
    }
`;

export const CreateAcademicSessionOrganizationFormSection = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em; 
    @media screen and (max-width: 630px){
        padding: 1em;
    }

    .common-fields{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(308px, 1fr));
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 450px){
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
}
.action-buttons{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .buttons{
            display: flex;
            flex-direction: row;
            gap: 1em;

            @media screen and (max-width: 500px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
`;