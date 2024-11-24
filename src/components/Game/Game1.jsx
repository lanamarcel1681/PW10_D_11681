import React, { useState } from "react";
import "./Game1.css"; 

function Game1() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const combinations = suits.flatMap((suit) =>
    ranks.map((rank) => ({ 
      suit, 
      rank,
      value: ["J", "Q", "K"].includes(rank) ? 10 : 
             rank === "A" ? 11 : 
             parseInt(rank)
    }))
  );

  const [gameDeck, setGameDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(true);
  const [result, setResult] = useState({ type: "", message: "Click New Game to start!", status: "" });
  const [score, setScore] = useState({ player: 0, dealer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const shuffleDeck = () => {
    let shuffled = [...combinations];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const calculateHandValue = (hand) => {
    let value = 0;
    let aceCount = 0;

    hand.forEach((card) => {
      if (["J", "Q", "K"].includes(card.rank)) {
        value += 10;
      } else if (card.rank === "A") {
        aceCount += 1;
        value += 11;
      } else {
        value += parseInt(card.rank);
      }
    });

    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount -= 1;
    }

    return value;
  };

  const drawCard = () => {
    const card = gameDeck[0];
    setGameDeck(prev => prev.slice(1));
    return card;
  };

  const dealCardToPlayer = () => {
    if (gameDeck.length === 0) {
      setGameDeck(shuffleDeck());
      return;
    }

    const newHand = [...playerHand, drawCard()];
    setPlayerHand(newHand);
    const playerValue = calculateHandValue(newHand);

    if (playerValue > 21) {
      handleGameOver({ 
        type: "dealer", 
        message: "Bust! Dealer wins", 
        status: "dealerWin"
      });
      setScore((prevScore) => ({ ...prevScore, dealer: prevScore.dealer + 1 }));
    } else if (playerValue === 21) {
      handleGameOver({
        type: "player",
        message: "🎉 Blackjack! You win! 🎉",
        status: "playerWin"
      });
      setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
    }
  };

  const playerStand = async () => {
    let dealerCurrentHand = [...dealerHand];
    
    while (calculateHandValue(dealerCurrentHand) < 17) {
      if (gameDeck.length === 0) {
        setGameDeck(shuffleDeck());
        continue;
      }
      dealerCurrentHand = [...dealerCurrentHand, drawCard()];
      setDealerHand(dealerCurrentHand);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const dealerValue = calculateHandValue(dealerCurrentHand);
    const playerValue = calculateHandValue(playerHand);

    if (dealerValue > 21) {
      handleGameOver({ 
        type: "player", 
        message: "Dealer busts! You win! 🎉",
        status: "playerWin"
      });
      setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
    } else if (playerValue > dealerValue) {
      handleGameOver({ 
        type: "player", 
        message: "You win! 🎯",
        status: "playerWin"
      });
      setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
    } else if (playerValue < dealerValue) {
      handleGameOver({ 
        type: "dealer", 
        message: "Dealer wins! 🎲",
        status: "dealerWin"
      });
      setScore((prevScore) => ({ ...prevScore, dealer: prevScore.dealer + 1 }));
    } else {
      handleGameOver({ 
        type: "draw", 
        message: "It's a push! 🤝",
        status: "push"
      });
    }
  };

  const startNewGame = () => {
    const newDeck = shuffleDeck();
    const initialPlayerHand = [newDeck[0], newDeck[2]];
    const initialDealerHand = [newDeck[1]];
    
    setGameDeck(newDeck.slice(3));
    setPlayerHand(initialPlayerHand);
    setDealerHand(initialDealerHand);
    setGameOver(false);
    setIsPlaying(true);
    setResult({ type: "", message: "", status: "" });
  };

  const handleGameOver = (result) => {
    setGameOver(true);
    setIsPlaying(false);
    setResult(result);
  };

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  const getStatusText = () => {
    if (!isPlaying && !gameOver) return "Click New Game to start";
    if (!gameOver) return "Playing";
    return result.status === "dealerWin" ? "dealer wins" :
           result.status === "playerWin" ? "player wins" :
           result.status === "push" ? "push" : "";
  };

  // Fungsi untuk menampilkan teks default ketika tidak ada kartu
  const getDefaultHandText = () => "No cards yet";

  return (
    <div className="game1-container">
      <div className="game1-header">
        <h1 className="game1-title">♥ Blackjack ♠</h1>
        <p className="game1-subtitle">
          Score: {score.player} | Status: {getStatusText()}
        </p>
        {(gameOver || !isPlaying) && (
          <div
            className={`status-message ${
              result.type === "player" ? "status-valid" : 
              result.type === "draw" ? "" : "status-invalid"
            }`}
          >
            {result.message}
          </div>
        )}
      </div>

      <div className="input-section">
        <h2 className="dealer-title">
          Dealer's Hand:{" "}
          {dealerHand.length > 0 ? (
            gameOver
              ? dealerHand.map((card) => `${card.rank}${card.suit} `)
              : `${dealerHand[0]?.rank}${dealerHand[0]?.suit}${dealerHand.length > 1 ? ", [?]" : ""}`
          ) : (
            getDefaultHandText()
          )}{" "}
          Total: {dealerHand.length > 0 ? (gameOver ? dealerValue : dealerHand[0]?.value || 0) : 0}
        </h2>
        <h2 className="player-title">
          Your Hand:{" "}
          {playerHand.length > 0 
            ? playerHand.map((card) => `${card.rank}${card.suit} `)
            : getDefaultHandText()}{" "}
          Total: {playerHand.length > 0 ? playerValue : 0}
        </h2>
        <div className="button-group">
          <button
            className="submit-button"
            onClick={dealCardToPlayer}
            disabled={!isPlaying || gameOver}
          >
            Hit
          </button>
          <button
            className="submit-button"
            onClick={playerStand}
            disabled={!isPlaying || gameOver}
          >
            Stand
          </button>
          <button 
            className="submit-button new-game-button" 
            onClick={startNewGame}
            disabled={isPlaying && !gameOver}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game1;