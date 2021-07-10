import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
// import '../styles/auth.scss';
import styled from 'styled-components'

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }
    
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if(roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      alert('Room does not exists.');
      return
    }

    if(roomRef.val().endedAt) {
      alert('Room already closed.')
      return
    }

    history.push(`/rooms/${roomCode}`);
  }

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
        font: 700 36px "Poppins", sans-serif;
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
      align-items: center;
      justify-content: center;
    } 
  `
  const MainContent = styled.div`
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
      font-family: "Poppins", sans-serif;
    }
  
    form {
      input {
        height: 50px;
        border-radius: 8px;
        padding: 0 16px;
        background: #fff;
        border: 1px solid #a8a8b3;
      }
  
      button {
        margin-top: 16px;
      }
  
      button,
      input {
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
  `
  const CreateRoom = styled.div`
    margin-top: 64px;
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: #ea4335;
    color: #fff;
  
    display: flex;
    justify-content: center;
    align-items: center;
  
    cursor: pointer;
    border: 0;
  
    transition: filter 0.2s;
  
    img {
      margin-right: 8px;
    }
  
    &:hover {
      filter: brightness(0.9);
    }
  `

  const Separator = styled.div`
    font-size: 14px;
    color: #a8a8b3;
  
    margin: 32px 0;
    display: flex;
    align-items: center;
  
    &::before {
      content: "";
      flex: 1;
      height: 1px;
      background: #a8a8b3;
      margin-right: 16px;
    }
  
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #a8a8b3;
      margin-left: 16px;
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
        <MainContent>
          <img src={logoImg} alt="Letmeask" />
          <CreateRoom onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </CreateRoom>

          <Separator>ou entre em uma sala</Separator>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </MainContent>
      </main>
    </PageAuth>
  )
}