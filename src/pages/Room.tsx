import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import Switch from 'react-switch';
import { DarkModeDisabled, DarkModeEnabled, BoxShadow, OnColor } from '../components/SwitchTheme';

// import '../styles/rooms.scss'
import styled from 'styled-components'
import { useTheme } from '../hooks/useTheme';
import { LogoImage } from '../components/LogoImage';

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id;

  const { title, questions } = useRoom(roomId)

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {

    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      })
    }
  }

  // O styled component inserido aqui mantém as estilizações que faça o uso do className. Substituiu apenas o className="page-room" que vem do auth.scss. A ideia é mostrar que mesmo usando styled components, podemos continuar usando classes do css para estilizar nosso html

  const PageRoom = styled.div`
    header {
      padding: 24px;
      background: ${props => props.theme.colors.header};
      border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  
      .content {
        max-width: 1120px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
  
        // > img {
        //   max-height: 45px;
        // }

        > div {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      }
    }
  
    main {
      max-width: 800px;
      margin: 0 auto;
  
      .room-title {
        margin: 32px 0 24px;
        display: flex;
        align-items: center;
  
        h1 {
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          color: ${props => props.theme.colors.textColor};
        }
  
        span {
          margin-left: 16px;
          background: #e559f9;
          border-radius: 9999px;
          padding: 8px 16px;
          color: #FFF;
          font-weight: 500;
          font-size: 14px;
        }
      }
  
      form {
        textarea {
          width: 100%;
          border: 0;
          padding: 16px;
          border-radius: 8px;
          background: ${props => props.theme.colors.backgroundField};
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          resize: vertical;
          min-height: 130px;
        }
  
        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
  
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
              color: ${props => props.theme.colors.textColor};
              font-weight: 500;
              font-size: 14px;
            }
          }
  
          > span {
            font-size: 14px;
            color: #737380;
            font-weight: 500;
  
            button {
              background: transparent;
              border: 0;
              color: #835AFD;
              text-decoration: underline;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
            }
          }
        }
      }
  
      .question-list {
        margin-top: 32px;
      }
    }
  `

  return (
    <PageRoom>
      <header>
        <div className="content">
          {/* <img src={logoImg} alt="Letmeask" /> */}
          <LogoImage heightSize={120}/>
          <div>
            <Switch
              onChange={toggleTheme}
              checked={theme === 'dark' ? true : false}
              onColor={OnColor}
              checkedIcon={<DarkModeEnabled />}
              uncheckedIcon={<DarkModeDisabled />}
              boxShadow={BoxShadow}
            />
            <RoomCode code={roomId} />
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntas?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map(question => {
            return <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <button
                  className={`like-button ${question.likeId ? 'liked' : ''}`}
                  type="button"
                  aria-label="Marcar como gostei"
                  onClick={() => handleLikeQuestion(question.id, question.likeId)}
                >
                  {question.likeCount > 0 && <span>{question.likeCount}</span>}
                  {/* Como queremos mudar a cor do svg, não podemos importá-lo como uma tag <img>, devemos jogar o código diretamente no html  */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </Question>
          })}
        </div>
      </main>
    </PageRoom>
  )
}