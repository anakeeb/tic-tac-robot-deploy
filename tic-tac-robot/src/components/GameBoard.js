import React from 'react'
import styled from 'styled-components'
import X from '../img/x.png'
import XOpaque from '../img/xOpaque.png'
import O from '../img/o.png'

class Board extends React.Component {
	constructor() {
		super()
		this.renderSquare = this.renderSquare.bind(this)
	}

	renderSquare(row, col) {
		const Styles = styled.div`
        	.row {
			    clear: both;
			    content: "";
			    display: table;
			}

        	.piece {
				height: 20px;
				margin: auto;
        	}


			.square {
			    background: #fff;
			    border: 6px solid #f6f4d2;
			    float: left;
			    line-height: 34px;
			    height: 34px;
			    margin-right: -1px;
			    margin-top: -1px;
			    padding: 0;
			    width: 34px;
			}
        `

        let img


        if(this.props.board[row][col] === 1) {
        	img = (
        		<img className='piece' src={ X }/>
        	)
        }
        else if (this.props.board[row][col] === 2) {
        	img = (
        		<img className='piece' src={ O }/>
        	)
        }
        else if (this.props.hovered[row][col]) {
        	img = (
        		<img className='piece' src={ XOpaque }/>
        	)
        }


        return(
        	<Styles>
	        	<button className='square' onClick={ () => this.props.selectFunc(row, col) } 
	        			>
	        		{ img }
	        	</button>
        	</Styles>
        	
        )

	}

	render() {
		const Styles = styled.div`
        	.row {
			    
			}

			.game {
			    display: flex;
			    flex-direction: row;
			}


			.square {
			    background: #fff;
			    border: 1px solid #999;
			    float: left;
			    line-height: 34px;
			    height: 34px;
			    margin-right: -1px;
			    margin-top: -1px;
			    padding: 0;
			    width: 34px;
			}
        `

		return (
			<Styles>
				<div className='row'>
					{ this.renderSquare(0, 0) }
					{ this.renderSquare(0, 1) }
					{ this.renderSquare(0, 2) }
				</div>
				<br/>
				<br/>
				<div className='row'>
					{ this.renderSquare(1, 0) }
					{ this.renderSquare(1, 1) }
					{ this.renderSquare(1, 2) }
				</div>
				<br/>
				<br/>
				<div className='row'>
					{ this.renderSquare(2, 0) }
					{ this.renderSquare(2, 1) }
					{ this.renderSquare(2, 2) }
				</div>
			</Styles>
		)
		
	}
}
export default Board