import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import Switch from 'react-switch';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

// import '../styles/auth.scss';
import styled from 'styled-components'
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { DarkModeDisabled, DarkModeEnabled, BoxShadow, OnColor } from '../components/SwitchTheme';
import { LogoImage } from '../components/LogoImage';

export function NewRoom() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const history = useHistory()

  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`); // O Key é o ID do dado que foi inserido no Firebase
  }

  // O styled component inserido aqui mantém as estilizações que faça o uso do className. Substituiu apenas o className="page-auth" que vem do auth.scss. A ideia é mostrar que mesmo usando styled components, podemos continuar usando classes do css para estilizar nosso html.

  const PageAuth = styled.div`
    display: flex;
    align-items: stretch;
    height: 100vh;
  
    aside {
      flex: 7;
      background: #835afd;
      color: #fff;
  
      display: flex;
      flex-direction: column;
      justify-content: center;
  
      padding: 120px 80px;
  
      img {
        max-width: 320px;
      }
  
      strong {
        font: 700 36px 'Poppins', sans-serif;
        line-height: 42px;
        margin-top: 16px;
      }
  
      p {
        font-size: 24px;
        line-height: 32px;
        margin-top: 12px;
        color: #f8f8f8;
      }
    }
  
    main {
      flex: 8;
  
      padding: 0 32px;
  
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .switch {
        position: absolute;
        top: 110px;
      }
    }
  
    .main-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 320px;
      align-items: stretch;
      text-align: center;
  
      > img {
        align-self: center;
      }
  
      h2 {
        font-size: 24px;
        margin: 64px 0 24px;
        font-family: 'Poppins', sans-serif;
      }
  
      form {
        input {
          height: 50px;
          border-radius: 8px;
          padding: 0 16px;
          background: ${props => props.theme.colors.backgroundField};
          border: 1px solid ${props => props.theme.colors.borderColor};
        }
  
        button {
          margin-top: 16px;
        }
  
        button, input {
          width: 100%;
        }
      }
  
      p {
        font-size: 14px;
        color: #737380;
        margin-top: 16px;
  
        a {
          color: #e559f9;
        }
      }
    }
  `


  return (
    <PageAuth>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>
          Tire as dúvidas da sua audiência em tempo-real
        </p>
      </aside>

      <main>
        <div className="main-content">
          {/* <img src={logoImg} alt="Letmeask" /> */}
          <LogoImage/>
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
        <Switch
          onChange={toggleTheme}
          checked={theme === 'dark' ? true : false}
          className="switch"
          onColor={OnColor}
          checkedIcon={<DarkModeEnabled/>}
          uncheckedIcon={<DarkModeDisabled/>}
          boxShadow={BoxShadow}
        />
      </main>
    </PageAuth>
  )
}