import './styleCard.css';
import { Link } from 'react-router-dom';

export default function Card({ linkProjeto, fotoProjeto, textoProjeto, logoFront, logoBack }) {
  const isInternal = linkProjeto.startsWith('/');

  const conteudoCard = (
    <div className="card__projeto">
      <div className="container__imagem_projeto">
        <img src={fotoProjeto} alt="Imagem do projeto" className="projeto__imagem" />
      </div>

      <div className="container__descrição_e_ferramentas">
        <h2 className="descrição_projeto">{textoProjeto}</h2>
        <div className="container__ferramentas__logos">
          <div className="container__Front">
            <img src={logoFront} alt="Frontend" className="imagem_Front" />
          </div>
          <div className="container__Back">
            <img src={logoBack} alt="Backend" className="imagem_Back" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <article>
      {isInternal ? (
        <Link className="card__link" to={linkProjeto}>
          {conteudoCard}
        </Link>
      ) : (
        <a className="card__link" href={linkProjeto} target="_blank" rel="noopener noreferrer">
          {conteudoCard}
        </a>
      )}
    </article>
  );
}
