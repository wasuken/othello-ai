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
  const searchStones = (
    x: number,
    y: number,
    xx: number,
    yy: number
  ): boolean => {
    // 範囲外
    if (!board[x + xx] || !board[x + xx][y + yy]) return false;
    const rstone = turn === "black" ? "white" : "black";
    const v = board[x + xx][y + yy];
    if (v) {
      if (v === rstone) {
        // 次を検索
        return searchStones(x + xx, y + yy, xx, yy);
      } else if (v === turn) {
        return true;
      }
    }
    return false;
  };
  const replaceStones = (x: number, y: number, xx: number, yy: number) => {
    const nboard = [...board];
    if (searchStones(x, y, xx, yy)) {
      nboard[x][y] = turn;
      for (let i = 1; board[x + xx * i][y + yy * i] !== turn; i++) {
        nboard[x + xx * i][y + yy * i] = turn;
      }
      setBoard(nboard);
    } else {
      return false;
    }
    return true;
  };

  const handleClick = (x: number, y: number) => {
    const nboard = [...board];
    const rstone = turn === "black" ? "white" : "black";
    let rst = false;
    if (nboard[x] && nboard[x][y]) {
      for (let i = -1; i < 2; i++) {
        for (let k = -1; k < 2; k++) {
          if (
            !(i == 0 && k == 0) &&
            nboard[x + i] &&
            nboard[x + i][y + k] &&
            nboard[x + i][y + k] === rstone
          ) {
            const r = replaceStones(x, y, i, k);
            rst = rst || r;
          }
        }
      }
    }
    if (rst) {
      setTurn(rstone);
    } else {
      alert("置換失敗");
    }
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
