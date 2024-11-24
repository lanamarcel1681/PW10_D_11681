import React from "react";
import "./App.css";
import { Gamepad2, Monitor, Rocket, Heart } from "lucide-react";
import CardBackground from "./components/card/CardBackground";
import Content from "./components/content/Content";
import Materi1 from "./components/materi/Materi1";
import Materi2 from "./components/materi/Materi2";
import Game1 from "./components/Game/Game1.jsx";
import Game2 from "./components/Game/Game2.jsx";
import Image from "./assets/Image.jsx";

const content = [
  {
    title: "SPIDER-MAN 2",
    image: Image.Poster1,
    platform: "PlayStation 5",
    release_date: "October 20, 2023",
    genre: "Fighting game, Action-adventure game",
  },
  {
    title: "ELDEN RING",
    image: Image.Poster2,
    platform: "PlayStation, Xbox, Microsoft Windows",
    release_date: "February 25, 2022",
    genre: "RPG, Dark Fantasy, Open World",
  },
  {
    title: "It Takes Two",
    image: Image.Poster3,
    platform: "PlayStation, Xbox, Nitendo, Microsoft Windows",
    release_date: "March 26, 2021",
    genre: "Co-op, Multiplayer, Split Screen",
  },
  {
    title: "The Legend of Zelda Breath of The Wild",
    image: Image.Poster4,
    platform: "Nitendo Switch, Wii U",
    release_date: "March 3, 2017",
    genre: " Action-adventure game, Puzzle Video Game",
  },
  {
    title: "Super Mario Bros. Wonder",
    image: Image.Poster5,
    platform: "Nintendo Switch",
    release_date: "October 20, 2023",
    genre: "Platform game",
  },
  {
    title: "Clash of Clans",
    image: Image.Poster6,
    platform: " Android, iOS",
    release_date: "August 2, 2012",
    genre: "Real-time strategy",
  },
  {
    title: "Valorant",
    image: Image.Poster8,
    platform: " PC, Xbox, PlayStation",
    release_date: "June 2,2020",
    genre: "FPS",
  },
  {
    title: "Tom Clancy's Rainbow Six Siege",
    image: Image.Poster9,
    platform: " PC, Xbox, PlayStation",
    release_date: "December 1, 2015",
    genre: "FPS",
  },
  {
    title: "counter-strike: global offensive",
    image: Image.Poster7,
    platform: " PC",
    release_date: "August 21, 2012",
    genre: "FPS",
  },
];

function App() {
  return (
  <>
    {/* Container Landing Page */}
    <div className="container container-landing">
      <div className="contentLandingPage">
        <h1 className="text-center judul">Atma Jaya Game Center</h1>
        <p className="text">
          Unleash Your Playful Spirit at Atma Jaya Game Center
        </p>
      </div>
    {/* Icon Untuk hiasan */}
    <Gamepad2 className="iconGamePad" size={32} />
    <Monitor className="iconGameConsole" size={32} />
    <Heart className="iconHealthPotion" size={32} />
    <Rocket className="iconRocket" size={32} />
    </div>

    {/* Container bawah */}
    {/* Container bawah */}
    <div className="container container-content">
      <h1 className="judulContent">Content Game</h1>
      <CardBackground>
        <div className="kolom">
          {content.map((item, index) => (
            <Content
              key={index}
              title={item.title}
              image={item.image}
              platform={item.platform}
              release_date={item.release_date}
              genre={item.genre}
            />
          ))}
        </div>
      </CardBackground>
    </div>

    {/* Container Untuk Materi 1 */}
    <div className="container container-content">
  
      <h1 className="judulContent">Materi 1</h1>
      <CardBackground>
        <Materi1 />
      </CardBackground>
    </div>

    {/* Container Untuk Materi 2 */}
    <div className="container container-content">
      <h1 className="judulContent">Materi 2</h1>
      <CardBackground>
        <Materi2 />
      </CardBackground>
    </div>


    <div className="container container-content">
      <h1 className="judulContent">Game 1</h1>
      <CardBackground>
        <Game1 />
      </CardBackground>
    </div>

    <div className="container container-content">
      <h1 className="judulContent">Game 2</h1>
      <CardBackground>
        <Game2 />
      </CardBackground>
    </div>
    </>
  );
}

export default App;
