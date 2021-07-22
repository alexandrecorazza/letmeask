import copyImg from '../assets/images/copy.svg';

// import '../styles/room-code.scss';
import styled from 'styled-components'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  const RoomCode = styled.button`
      height: 40px;
      border-radius: 8px;
      overflow: hidden;
      
      background: ${props => props.theme.colors.backgroundField};
      border: 1px solid #835afd;
      cursor: pointer;
      
      display: flex;
    
      div {
        background: #835afd;
        padding: 0 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    
      span {
        color: ${props => props.theme.colors.textColor};
        display: block;
        align-self: center;
        flex: 1;
        padding: 0 16px 0 12px;
        width: 230px;
        font-size: 14px;
        font-weight: 500;
      }
  `


  return (
    <RoomCode onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </RoomCode>
  )
}