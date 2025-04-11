import React from 'react';
import './Homepage.css';
import myImage from './assets/orvos1.png';
function HomePage() {
  return (
    <div>
      <h1 className="focim">Üdvözöljük a Kórházi Weboldalon!</h1>
      <div className="wrap animate pop">
        <div className="overlay">
          <div className="overlay-content animate slide-left delay-2">
            <h1 className="animate slide-left pop delay-4 oldalszoveg" >Weboldalunk</h1>
            <p className="animate slide-left pop delay-5">
              Miről szól: <em>információk</em>
            </p>
          </div>
          <div className="image-content animate slide delay-5"></div>
          <div className="dots animate">
            <div className="dot animate slide-up delay-6"></div>
            <div className="dot animate slide-up delay-7"></div>
            <div className="dot animate slide-up delay-8"></div>
          </div>
        </div>
        <div className="text">
          <img className="bentikep" src={myImage} alt="Orvosaink" /><p className="kepalairas">Szakorvosaink – az Ön egészségéért</p><p>Weboldalunk célja, hogy a páciensek gyorsan és egyszerűen foglalhassanak időpontot a megfelelő szakorvoshoz – online, bármikor.</p><br /><p>Útmutató a weboldalhoz:</p><br /><ul >
            <li>Először regisztráció, majd bejelentkezés szükséges.</li>
            <li>Ezután elérhetővé válnak az időpont foglalások.</li>
            <li>Az Orvosok menüpontban megtekintheti az orvosainkat és szakterületeiket.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
