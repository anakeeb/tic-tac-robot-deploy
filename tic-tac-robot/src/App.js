import React from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
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
            turn: true
        }
        this.select = this.select.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset() {
      this.setState(prevState => {
        return {
          board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            turn: true
        }
      })
    }

    select(row, col) {
      console.log(row)
      console.log(col)
      if(this.state.board[row][col] !== 0) {
        console.log('already taken')
        return
      }

      this.setState(prevState => {
        let newBoard = prevState.board
        let playerVar
        if (prevState.turn) {
          playerVar = 1
        }
        else {
          playerVar = 2
        }
        newBoard[row][col] = playerVar
        return {
          board: newBoard,
          turn: !prevState.turn
        }
      })
      let board = this.state.board
      console.log(board)
      if (((board[row][0] === board[row][1]) && 
            (board[row][2] === board[row][1]) && (board[row][1] !== 0)) || 
              ((board[0][col] === board[1][col]) && 
                (board[1][col] === board[2][col]) && (board[1][col] !== 0)) ||
                  ((((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])) || ((board[0][2] === board[1][1]) && (board[1][1] === board[2][0]))) 
                    && (board[1][1] !== 0))){
        console.log('three in a row')

        let winner = (this.state.turn ? 'player 1 wins' : 'player 2 wins')

        console.log(winner)

      }
      
    }


    render() {

        return (
            <Container>
                <h1>
                    { this.state.turn ? 'player 1 turn' : 'player 2 turn' }
                </h1>
                <Row>
                    <Col>
                        <button onClick={ () => this.select(0, 0) }>{ this.state.board[0][0] }</button>
                    </Col>
                    <Col>
                        <button onClick={ () => this.select(0, 1) }>{ this.state.board[0][1] }</button>
                    </Col>
                    <Col>
                        <button onClick={ () => this.select(0, 2) }>{ this.state.board[0][2] }</button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <button onClick={ () => this.select(1, 0) }>{ this.state.board[1][0] }</button>
                    </Col>
                    <Col>
                        <button onClick={ () => this.select(1, 1) }>{ this.state.board[1][1] }</button>
                    </Col>
                    <Col>
                        <button onClick={ () => this.select(1, 2) }>{ this.state.board[1][2] }</button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <button onClick={ () => this.select(2, 0) }>{ this.state.board[2][0] }</button>
                    </Col>
                    <Col>
                        <button onClick={ () => this.select(2, 1) }>{ this.state.board[2][1] }</button>
                    </Col>
                    <Col>
                        <button onClick={ () => this.select(2, 2) }>{ this.state.board[2][2] }</button>
                    </Col>
                </Row>
                <button onClick={this.reset}>reset</button>

            </Container>
        )
    }
  
}

export default App;
