import { ButtonHTMLAttributes } from 'react'

// import '../styles/button.scss';
import styled from 'styled-components'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props}: ButtonProps) {
  const Button = styled.button`
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: #835afd;
    color: #FFF;
    padding: 0 32px;
  
    display: flex;
    justify-content: center;
    align-items: center;
  
    cursor: pointer;
    border: 0;
  
    transition: filter 0.2s;
  
    img {
      margin-right: 8px;
    }
  
    &.outlined {
      background: ${props => props.theme.colors.backgroundField};
      border: 1px solid #835afd;
      color: ${props => props.theme.colors.closeRoom};
    }
  
    &:not(:disabled):hover {
      filter: brightness(0.9);
    }
  
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `


  return (
    <Button 
    className={`button ${isOutlined ? 'outlined' : ''}`} 
    {...props} />
  )
}