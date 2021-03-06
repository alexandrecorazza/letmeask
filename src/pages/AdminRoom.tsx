import { useParams, useHistory } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
// import '../styles/rooms.scss'
import styled from 'styled-components'
import Switch from 'react-switch';
import { DarkModeDisabled, DarkModeEnabled, BoxShadow, OnColor } from '../components/SwitchTheme';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';
import { LogoImage } from '../components/LogoImage';

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id;

  const { title, questions } = useRoom(roomId)
  const { theme, toggleTheme } = useTheme()

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  // O styled component inserido aqui substitui qualquer estilização que faça o uso do className

  const PageRoom = styled.div`
    header {
      padding: 24px;
      background: ${props => props.theme.colors.header};
      border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    }
    
    main {
      max-width: 800px;
      margin: 0 auto;
    }
  `

  const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
      max-height: 45px;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        height: 40px;
      }
    }
  `

  const RoomTitle = styled.div`
    margin: 32px 0 24px;
    display: flex;
    align-items: center;

    h1 {
      font-family: "Poppins", sans-serif;
      font-size: 24px;
      color: ${props => props.theme.colors.textColor};
    }

    span {
      margin-left: 16px;
      background: #e559f9;
      border-radius: 9999px;
      padding: 8px 16px;
      color: #fff;
      font-weight: 500;
      font-size: 14px;
    }
  `
  const QuestionList = styled.div`
    margin-top: 32px;
  `


  return (
    <PageRoom>
      <header>
        <Content>
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
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </Content>
      </header>

      <main>
        <RoomTitle>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </RoomTitle>

        <QuestionList>
          {questions.map(question => {
            return <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          })}
        </QuestionList>
      </main>
    </PageRoom>
  )
}