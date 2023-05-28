import styled from 'styled-components';

export const HeaderStyled = styled.nav`
    padding: 20px 10px;

    ul {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        align-items: center;
    }

    a {
        padding: 10px;
    }

    .disabledLink {
        pointer-events: none;
        cursor: default;
        color: gray;
    }
`;
