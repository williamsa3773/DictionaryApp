import React from 'react'
import axios from 'axios'
import wordArray from './wordArray'

class WordOfTheDay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Rand: wordArray,
      Word: wordArray[Math.floor(Math.random() * wordArray.length)],
      dictData: [],
      count: 3600
    }
  }

  decreaseTime = () => {
    if(this.state.count === 0) {
      const word = wordArray[Math.floor(Math.random() * wordArray.length)]
      this.dictApiCall(word)
    }
    this.setState(prevState => ({
      count: prevState.count -1
    }), () => this.reset())}

  tick() {
    setInterval(this.decreaseTime, 1000)

  }

  reset() {
    if(this.state.count === -1) {
      this.setState({
        count: 3600
      })
    }
  }

  dictApiCall = async (word) => {
    const dictUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=097cb478-2f07-4d94-9e03-739c1ff1d6ab`
    const dictResponse = await axios.get(dictUrl)
    const dictData = dictResponse.data.map( (d, i) => {
      const data = {
        word: d.hwi.hw,
        sense: d.fl,
        def: d.shortdef
      }
      return data
    })
    this.setState({
      dictData: dictData
    })
  }

  componentDidMount() {
    this.dictApiCall(this.state.Word)
    this.tick()
  }

  render() {
    let wordData = this.state.dictData.map((d,i) => {
      return (
        <>
          <div className='word1'>
            <h1>{d.word} </h1>
          </div>
          <div className='sense1'>
            <h2>({d.sense})</h2>
          </div>
          <div className='def1'>
            <ul>{d.def.map((def, ind) => {
              return (
                <li key={ind}>{def}</li>
              )
            })}</ul>
          </div>
        </>
      )
    })
    return (
      <>
      <div className='header2'>
        <p>second header</p>
      </div>
      <div className='timer'>
        {this.state.count}
      </div>
        {wordData}
      </>
    )
  }
}

export default WordOfTheDay
