// Othello.tsx
import React, { useState } from "react";
import styles from "./Othello.module.css";

type Cell = "empty" | "black" | "white";

const Othello: React.FC = () => {
  const initialBoard: Cell[][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => "empty" as Cell)
  );
  initialBoard[3][3] = "white";
  initialBoard[3][4] = "black";
  initialBoard[4][3] = "black";
  initialBoard[4][4] = "white";

  const [board, setBoard] = useState<Cell[][]>(initialBoard);
  const [turn, setTurn] = useState<Cell>("black");

  const handleClick = (x: number, y: number) => {
    const nboard = [...board];
    if (nboard[x] && nboard[x][y]) {
      nboard[x][y] = turn;
    }
    setTurn(turn === "black" ? "white" : "black");
    setBoard(nboard);
  };

  return (
    <div>
      <div>{turn}の番です。</div>
      <div className={styles.board}>
        {board.map((row, x) => (
          <React.Fragment key={x}>
            {row.map((cell, y) => (
              <div
                key={y}
                className={`${styles.cell} ${
                  cell === "black" ? styles.black : ""
                } ${cell === "white" ? styles.white : ""}`}
                onClick={() => handleClick(x, y)}
              ></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Othello;
