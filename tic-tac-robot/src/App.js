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
        this.handleHover = this.handleHover.bind(this)
    }

    handleHover(row, col) {
      console.log(row)
      console.log(col)
      console.log(this.state.hovered)
      let newHovered = this.state.hovered
      if (newHovered[row][col]) {
        newHovered[row][col] = false
      }
      else {
        newHovered[row][col] = true
      }
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
            hovered: prevState.hovered,
            winner: prevState.winner
        }
      })
    }

    howManyGames(plays) {

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
      console.log('iteration')
      console.log(humanTurn)
      console.log(newBoard)
      let availableMoves = this.getAvailableMoves(newBoard)
      if (this.checker(newBoard)) {
        if (humanTurn) {
          console.log('ai wins')
          return {score: 10}
        }
        else {
          console.log('human wins')
          return {score: -10}
        }
      }
      else if (availableMoves.length === 0) {
        console.log('tie')
        return {score: 0}
      }

      let moves = []
      for (let i = 0; i < availableMoves.length; i++) {
        
        let move = {}
        move.index = availableMoves[i]
        if (humanTurn) {
          newBoard[Math.floor(availableMoves[i] / 3)][availableMoves[i] % 3] = 1
          console.log('placing 1 in row', Math.floor(availableMoves[i] / 3), 'col', availableMoves[i] % 3)
        }
        else {
          newBoard[Math.floor(availableMoves[i] / 3)][availableMoves[i] % 3] = 2
          console.log('placing 2 in row', Math.floor(availableMoves[i] / 3), 'col', availableMoves[i] % 3)
        }
        let result = this.miniMaxMove(newBoard, !humanTurn)
        move.score = result.score
        console.log('done')
        console.log('')

        newBoard[Math.floor(availableMoves[i] / 3)][availableMoves[i] % 3] = 0


        moves.push(move)
        if ((humanTurn && (move.score === -10)) || (!humanTurn && (move.score === 10))) {
          break
        }
      }
      console.log('done with loop')
      console.log('')
      console.log('')
      let bestPosition = -1
      if (humanTurn) {
        let bestScore = 10000
        for (let i = 0; i < moves.length; i++) {
          console.log('moves[', i, '] is position', moves[i].index, 'and has score', moves[i].score)
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
          console.log('moves[', i, '] is position', moves[i].index, 'and has score', moves[i].score)
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
      if(this.state.board[row][col] !== 0) {
        console.log('already taken')
        return
      }
      let newBoard = this.state.board
      let newPlays = this.state.plays
      let newHumanTurn = this.state.turn
      newBoard[row][col] = 1
      newPlays++
      newHumanTurn = !newHumanTurn
      if(this.checker(newBoard)) {
        console.log('player 1 wins')
        this.reset()
        return
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
      let aiChoice = this.miniMaxMove(newBoard, false)
      console.log(aiChoice)
      newBoard[Math.floor(aiChoice.index / 3)][aiChoice.index % 3] = 2
      newPlays++
      newHumanTurn = !newHumanTurn
      if(this.checker(newBoard)) {
        console.log('ai wins')
        this.reset()
        return
      }
      if (newPlays > 7) {
        console.log('stalemate')
        this.reset()
        return
      }

      this.setState(prevState => {
        return {
          board: newBoard,
          turn: newHumanTurn,
          plays: newPlays,
          hovered: prevState.hovered,
          winner: prevState.winner
        }
      })
      

    }


    render() {
      const Styles = styled.div`
        .row-center {
          place-items: center;
        }

        .col-center {
          place-items: center;
        }
        .reset {
          
          background: #fff;
          border: 6px solid #f6f4d2;
          color: #9999ff;
          float: left;
          line-height: 34px;
          height: 34px;
          margin-right: -1px;
          margin-top: -1px;
          padding: 0;
          width: 50px;
        }

        .background {
          background: url(${ Background }) no-repeat center fixed;
          background-position: center;
          background-size: cover;
          background-attachment: scroll;
          height: 1000px;
          padding: 140px 100px;
          color: #000
        }
      `
        return (
            <Styles>
              <div className='background'>
                <Board board={ this.state.board } selectFunc={ this.select } hovered={ this.state.hovered } hoverFunc={ this.handleHover }/>
                <br/>
                <br/>
                <button className='reset' onClick={this.reset}>reset</button>
              </div>  
            </Styles>
            
        )
    }
  
}

export default App;
