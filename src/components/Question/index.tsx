import { ReactNode } from 'react';
import cx from 'classnames'

// import './styles.scss'
import styled from 'styled-components'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode,
  isAnswered?: boolean,
  isHighlighted?: boolean, 
}

export function Question({ 
  content, 
  author, 
  isAnswered = false, 
  isHighlighted = false, 
  children 
}: QuestionProps) {

  const QuestionStyle = styled.div`
    background: ${props => props.theme.colors.backgroundField};
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    padding: 24px;
  
    & + .question { //No sass quando usamos & estamos referenciando o próprio elemento. Isso seria equivalente a fazer .question + .question { ... }
      margin-top: 8px;
    }
  
    &.highlighted {
      background: #f4f0ff;
      border: 1px solid #835AFD;
  
      footer .user-info span {
        color: #29292E;
      }
    }
  
    &.answered {
      background: #DBDCDD;
    }
  
    p {
      color: ${props => props.theme.colors.textColor};
    }
  
    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      
      .user-info {
        display: flex;
        align-items: center;
    
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
    
        span {
          margin-left: 8px;
          color: #737380;
          font-size: 14px;
        }
      }
  
      > div {
        display: flex;
        gap: 16px;
      }
  
      button {
        border: 0;
        background: transparent;
        cursor: pointer;
        transition: filter 0.2;
  
        &.like-button {
          display: flex;
          align-items: flex-end;
          color: #737380;
          gap: 8px;
  
          &.liked {
            color: #835afd;
  
            svg path {
              stroke: #835afd;
            }
          }
        }
  
        &:hover {
          filter: brightness(0.7)
        }
      }
    }
  `


  return (
    // Sem a instalação do pacote classname faríamos da forma tradicional:
    // <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'highlighted' : ''}`}>
    <QuestionStyle 
      className={cx(
        'question', 
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered},
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </QuestionStyle>
  )
}