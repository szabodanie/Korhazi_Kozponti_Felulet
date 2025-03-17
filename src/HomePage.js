// src/components/HomePage.js
import React from 'react';
import './Homepage.css'; // A stílust importáljuk
import myImage from './orvos1.png';
function HomePage() {
  return (
    <div>
      <h1 className="focim">Üdvözöljük a Kórházi Weboldalon!</h1>
      <div className="wrap animate pop">
        <div className="overlay">
          <div className="overlay-content animate slide-left delay-2">
            <h1 className="animate slide-left pop delay-4" class="oldalszoveg">Weboldalunk</h1>
            <p className="animate slide-left pop delay-5" style={{ color: 'black', marginBottom: '2.5rem' }}>
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
          <img class="bentikep" src={myImage} alt="Leírás a képhez" /><p>Weboladlunk az emberek újfajta interneten való gyors időpontfoglalásához és megfelelő szakemberek elééréséhez jött létre</p><br /><p>Útmutató a weboldalhoz:</p><br /><p>Weboldalunk használatához előzör regisztráció, majd bejelentkezés szükséges. Ezáltal elérhetővé válnak az időpont foglalások. Az Orvosok menüpontban a korházunk orvosait tekintheti meg és azoknak tudásairól olvashat.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
