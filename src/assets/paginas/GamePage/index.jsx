import { useParams } from "react-router-dom";
import games from "../../json/games.json";
import styled from "styled-components";

// Estilos
const PageContainer = styled.div`
  box-sizing: border-box;
`;

const Banner = styled.div`
  text-align: center;
  width: 100%;
  height: 400px; 
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px 0 ;
`;


const Title = styled.h1`
  color: #ffffff;
  margin: 30px 0 0 0;
  font-size: 5rem;

  @media (max-width: 768px) {
    font-size: 3rem;

  }
`;

const Catchphrase = styled.p`
  color: #fff;
  font-size: 1.2rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;

  img {
    width: 150px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    img {
      width: 100%;
    }
  }
`;

const Summary = styled.p`
  color: #000000;
  line-height: 1.5;
  margin: 30px 0;
  max-width: 80%;
  text-align: justify;
  margin-left: auto;
  margin-right: auto;
`;


const Gameplay = styled.h2`
align-items: center;
text-align: center;
`
const VideoContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  display: flex;
  flex-direction: row;
  gap: 50px;
  


  iframe {
    width: 40%;
    height: 350px;
    border-radius: 20px;
    border: none;
  }

  p {
    color: #000000;
    margin-top: 10px;
    width: 40%;
    text-align: justify;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    iframe {
        width: 90%;
    }

    p {
        width: 85%;
    }
  }

`;

const CuriositiesContainer = styled.div`
  margin-top: 40px;
  align-items: center;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 15px;
  }

  ol {
    width: 80%;
    color: #000000;
    font-size: 18px;
  }

  li {
    margin-bottom: 20px;
  }
`;

const GamePage = () => {
  const parametros = useParams();
  const game = games.find((game) => game.id_nome === parametros.id);

  if (!game) {
    return <p>Jogo não encontrado</p>;
  }

  return (
    <PageContainer>
      <Banner background={`/games/${game.id}/capa.png`}>
        <Title>{game.title}</Title>
        <Catchphrase>{game.catchphrase}</Catchphrase>
      </Banner>

      <ImagesContainer>
        <img src={game.img_1} alt="Imagem 1" />
        <img src={game.img_2} alt="Imagem 2" />
        <img src={game.img_3} alt="Imagem 3" />
        <img src={game.img_4} alt="Imagem 4" />
      </ImagesContainer>

      <Summary>{game.summary}</Summary>

      <Gameplay>Sobre a Gameplay</Gameplay>
      <VideoContainer>
        
        <iframe
          src={`https://www.youtube.com/embed/${game.video_id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Gameplay Video"
        ></iframe>
        <p>{game.gameplay}</p>
      </VideoContainer>



      <CuriositiesContainer>
        <h2>Curiosidades do Jogo</h2>
        <ol>
            {game.curiosities.map((curiosity, index) => (
                <li key={index}>{curiosity}</li>
            ))}
        </ol>
      </CuriositiesContainer>

    </PageContainer>
  );
};

export default GamePage;
