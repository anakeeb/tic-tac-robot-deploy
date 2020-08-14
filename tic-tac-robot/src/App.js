import React from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'
import Board from './components/GameBoard'
import Background from './img/ticTacRobotBackground.png'
import './App.css';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            turn: true,
            plays: 0,
            hovered: [
              [false, false, false],
              [false, false, false],
              [false, false, false],
            ],
            winner: 0
        }
        this.select = this.select.bind(this)
        this.reset = this.reset.bind(this)
        this.checker = this.checker.bind(this)
        this.randomAiMove = this.randomAiMove.bind(this)
        this.getAvailableMoves = this.getAvailableMoves.bind(this)
        this.miniMaxMove = this.miniMaxMove.bind(this)
        this.handleHoverIn = this.handleHoverIn.bind(this)
        this.handleHoverOut = this.handleHoverOut.bind(this)
        this.howManyGames = this.howManyGames.bind(this)
    }

    handleHoverIn(row, col) {
      console.log(row)
      console.log(col)
      console.log(this.state.hovered)
      let newHovered = this.state.hovered
      newHovered[row][col] = true
      this.setState(prevState => {
        return {
          board: prevState.board,
          turn: prevState.turn,
          plays: prevState.plays,
          hovered: newHovered,
          winner: prevState.winner
        }
      })
    }

    handleHoverOut(row, col) {
      console.log(row)
      console.log(col)
      console.log(this.state.hovered)
      let newHovered = this.state.hovered
      newHovered[row][col] = false
      this.setState(prevState => {
        return {
          board: prevState.board,
          turn: prevState.turn,
          plays: prevState.plays,
          hovered: newHovered,
          winner: prevState.winner
        }
      })
    }

    reset() {
      this.setState(prevState => {
        return {
          board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
          turn: true,
          plays: 0,
          hovered: [
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]
          ],
          winner: 0
        }
      })
    }

    howManyGames(plays) {
      return 255168
    }

    getAvailableMoves(array) {
      let moves = []
      for (let i = 0; i < 9; i++) {
        if (array[Math.floor(i / 3)][i % 3] === 0) {
          moves.push(i)
        }
      }
      return moves
    }

    miniMaxMove(newBoard, humanTurn) {
      // console.log('iteration')
      // console.log(humanTurn)
      // console.log(newBoard)
      let availableMoves = this.getAvailableMoves(newBoard)
      if (this.checker(newBoard)) {
        if (humanTurn) {
          //console.log('ai wins')
          return {score: 10}
        }
        else {
          //console.log('human wins')
          return {score: -10}
        }
      }
      else if (availableMoves.length === 0) {
        //console.log('tie')
        return {score: 0}
      }

      let moves = []
      for (let i = 0; i < availableMoves.length; i++) {
        
        let move = {}
        move.index = availableMoves[i]
        if (humanTurn) {
          newBoard[Math.floor(availableMoves[i] / 3)][availableMoves[i] % 3] = 1
          //console.log('placing 1 in row', Math.floor(availableMoves[i] / 3), 'col', availableMoves[i] % 3)
        }
        else {
          newBoard[Math.floor(availableMoves[i] / 3)][availableMoves[i] % 3] = 2
          //console.log('placing 2 in row', Math.floor(availableMoves[i] / 3), 'col', availableMoves[i] % 3)
        }
        let result = this.miniMaxMove(newBoard, !humanTurn)
        move.score = result.score
        // console.log('done')
        // console.log('')

        newBoard[Math.floor(availableMoves[i] / 3)][availableMoves[i] % 3] = 0


        moves.push(move)
        if ((humanTurn && (move.score === -10)) || (!humanTurn && (move.score === 10))) {
          break
        }
      }
      // console.log('done with loop')
      // console.log('')
      // console.log('')
      let bestPosition = -1
      if (humanTurn) {
        let bestScore = 10000
        for (let i = 0; i < moves.length; i++) {
          //console.log('moves[', i, '] is position', moves[i].index, 'and has score', moves[i].score)
          if (moves[i].score < bestScore) {
            bestPosition = moves[i]
            bestScore = moves[i].score
          }
          // if (beta < bestScore) {
          //   alpha = Math.max(alpha, bestScore)
          // }
          // if (beta <= alpha) {
          //   break
          // }
        }
      }
      else {
        let bestScore = -10000
        for (let i = 0; i < moves.length; i++) {
          // console.log('moves[', i, '] is position', moves[i].index, 'and has score', moves[i].score)
          if (moves[i].score > bestScore) {
            bestPosition = moves[i]
            bestScore = moves[i].score
          }
          // if (alpha > bestScore) {
          //   alpha = Math.max(alpha, bestScore)
          // }
          // if (beta <= alpha) {
          //   break
          // }
        }
      }
      if (bestPosition === -1) {
        return this.randomAiMove()
      }
      return bestPosition

    }

    randomAiMove() {
      console.log('randomAiMove')
      let maximum = 8
      let minimum = 0
      return (Math.floor(Math.random() * (maximum - minimum + 1)) + minimum)
    }

    checker(array) {
      let win = 0
      if (((array[0][0] === array[0][1]) && (array[0][1] === array[0][2]) && (array[0][1] !== 0)) ||
            ((array[1][0] === array[1][1]) && (array[1][1] === array[1][2]) && (array[1][1] !== 0)) ||
              ((array[2][0] === array[2][1]) && (array[2][1] === array[2][2]) && (array[2][1] !== 0)) ||
                ((array[0][0] === array[1][0]) && (array[1][0] === array[2][0]) && (array[1][0] !== 0)) ||
                  ((array[0][1] === array[1][1]) && (array[1][1] === array[2][1]) && (array[1][1] !== 0)) ||
                    ((array[0][2] === array[1][2]) && (array[1][2] === array[2][2]) && (array[1][2] !== 0)) ||
                      ((array[0][0] === array[1][1]) && (array[1][1] === array[2][2]) && (array[1][1] !== 0)) ||
                        ((array[0][2] === array[1][1]) && (array[1][1] === array[2][0]) && (array[1][1] !== 0))) {
        return true
      }
      return false
    }

    select(row, col) {
      if((this.state.board[row][col] !== 0) || (this.state.winner !== 0)) {
        console.log('already taken')
        return
      }
      let newBoard = this.state.board
      let newPlays = this.state.plays
      let newHumanTurn = this.state.turn
      newBoard[row][col] = 1
      newPlays++
      newHumanTurn = !newHumanTurn
      let win = 0
      if(this.checker(newBoard)) {
        console.log('player 1 wins')
        win = 1
      }
      
      
      // let gate = true
      // while (gate) {
      //   let aiChoice = this.randomAiMove()
      //   console.log('lets see how it works', this.miniMaxMove(newBoard, false))
      //   console.log(aiChoice)
      //   let rowVar = Math.floor(aiChoice / 3)
      //   let colVar = aiChoice % 3
      //   console.log('the value of the square is', aiChoice)
      //   if (newPlays > 7) {
      //     console.log('stalemate')
      //     this.reset()
      //     return
      //   }
      //   if (newBoard[rowVar][colVar] === 0) {
      //     newBoard[rowVar][colVar] = 2
      //     newPlays++
      //     newHumanTurn = !newHumanTurn
      //     if(this.checker(newBoard)) {
      //       console.log('player 2 wins')
      //       this.reset()
      //       return
      //     }
      //     console.log(newBoard)
      //     gate = false
      //   }
      // }

      if (win !== 1) {
        let aiChoice = this.miniMaxMove(newBoard, false)
        console.log(aiChoice)
        newBoard[Math.floor(aiChoice.index / 3)][aiChoice.index % 3] = 2
        newPlays++
        newHumanTurn = !newHumanTurn
        if(this.checker(newBoard)) {
          console.log('ai wins')
          win = 2
        }
        if ((newPlays > 7) && (win !== 1) && (win !== 2)) {
          console.log('stalemate')
          win = 3
        }
      }
      

      this.setState(prevState => {
        return {
          board: newBoard,
          turn: newHumanTurn,
          plays: newPlays,
          hovered: prevState.hovered,
          winner: win
        }
      })
      

    }


    render() {
      console.log(this.state.winner)
      const Styles = styled.div`
        .row-center {
          place-items: center;
        }

        .col-center {
          place-items: center;
        }
        .reset {
          background: #f6f4d2;
          border: 15px solid #f6f4d2;
          float: left;
          font-size: 50px;
          line-height: 80px;
          height: 80px;
          margin-right: -1px;
          margin-top: -1px;
          padding: 0;
          width: 150px;
          
          color: #9999ff;

          &:hover {
            background: #9999ff;
            border: 15px solid #9999ff;
            color: #f6f4d2;
          }
          
        }

        .board {
          margin: auto;
          margin-left: auto;
          margin-right: auto;
        }

        .message {
          float: right;
          color: #000
        }

        .games-left {
          text-align: center;
          color: #fffffff
        }

        .background {
          background: url(${ Background }) no-repeat center fixed;
          background-position: center;
          background-size: cover;
          background-attachment: scroll;
          height: 700px;
          padding: 140px 100px;
          color: #ffffff
        }
      `

      let games = this.howManyGames(this.state.plays)
      let winner
      if (this.state.winner === 0) {
        winner = 'Will you be able to beat the AI?'
      }
      else if (this.state.winner === 1) {
        winner = 'Congradulations!  Beating this should have been mathematically impossible, so the creator of this website must have messed up real bad.'
      }
      else if (this.state.winner === 2) {
        winner = 'Oh well, Better luck next time!'
      }
      else {
        winner = 'Looks like you tied, better luck next time!'
      }
      console.log(winner)
      return (
        <Styles>
          <div className='background'> 
            <br/>
            <br/>
            <br/>
            <h1 className='message'>{ winner }</h1>
            <Board className='board' board={ this.state.board } selectFunc={ this.select } hovered={ this.state.hovered } hoverInFunc={ this.handleHoverIn } hoverOutFunc={ this.handleHoverOut }/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button className='reset' onClick={this.reset}>reset</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 className='games-left'>{ games } possible games left!</h1>
          </div>  
        </Styles>
          
      )
    }
  
}

export default App;
