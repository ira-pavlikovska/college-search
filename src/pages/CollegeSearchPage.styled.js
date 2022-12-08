import styled from '@mui/system/styled';
import {TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";

export const ContainerItem = styled('div')(({theme}) => ({
  backgroundColor: '#ffffff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

export const SearchInput = styled(TextField)`
  width: 380px;
  height: 40px;

  .MuiInputBase-root {
    border-radius: 44px;
  }

  input {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #333943;

    ::placeholder {
      opacity: 1;
      font-style: italic;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.15px;
      color: #8490a3;
    }
  }
`
export const SearchIcon = styled(SearchOutlined)`
  color: #8490a3;
`
