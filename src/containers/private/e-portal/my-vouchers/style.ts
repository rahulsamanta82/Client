import styled from "styled-components"

export const HeadingDiv = styled.div`
.heading{
    font-size: 32px;
    font-weight: 500;
    color: var(--black-text);
    @media(max-width:768px) {
        font-size: 20px;
    }
}
`

export const ChallanTable = styled.div`
background-color: var(--white-color);
border-radius: 20px;
padding: 20px;
margin-top: 2%;
.table-heading{
    font-size: 24px;
    font-weight: 500;
    color:  var(--black-text);
    @media(max-width:768px) {
        font-size: 20px;
    }
}
.status{
background-color: #0FCB0226;
color: #43AC43;
font-size: 13px;
font-weight: 400;
width: 34px;
height: 20px;
border-radius: 4px;
padding: 2px 4px 2px 4px;
}
/* td , th{
    text-align: start;
    width: 100px;
}
.table-data{
    font-family: 'Nunito';
    border-top: 1px solid #F2F4F7;
}

.table-width{
    width: 100%;
    @media (max-width:900px ) {
        width: 300%;
    }
} */
`