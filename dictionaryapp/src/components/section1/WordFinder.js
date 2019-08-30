import React from 'react'
import axios from 'axios'
import Form from  './Form'
import Section1 from './Section1.css'
require('dotenv').config()


class WordFinder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      word: 'software',
      dictData: [],
      thesData: []
    }
  }

  dictApiCall = async () => {
    let key = process.env.REACT_APP_DICT_API_KEY
    console.log(key)
    const dictUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.word}?key=${key}`
    const dictResponse = await axios.get(dictUrl)
    console.log(dictResponse)
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

  thesApiCall = async () => {
    const thesUrl = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${this.state.word}?key=a9a12465-41f6-45eb-8960-4783f16d1b54`
    const thesResponse = await axios.get(thesUrl)
    console.log(thesResponse)
    const thesData = thesResponse.data.map( (def, ind) => {
      const data = {
        ant: def.ants,
        syn: def.syns
      }
      return data
    })
    this.setState({
      thesData: thesData
    })

  }

  componentDidMount() {
    this.dictApiCall()
  }
  handleSubmit = (word) => {
    this.setState(prevState => ({
      word: word
    }), () => this.dictApiCall())
  }

  render() {
      let wordData = this.state.dictData.map((d,i) => {
        return (
         <>
           <div className='word'>
             <h3>{d.word}</h3>
           </div>
           <div className='sense'>
             <h4>({d.sense})</h4>
           </div>
           <div className='def'>
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
     <div className='container'>
      <div className='section1'>
        <div className='header'>
          <h2>Word Search</h2>
        </div>
         <div className='form'>
           <Form onSubmit={this.handleSubmit}/>
         </div>
         {wordData[0]}
      </div>
     </div>
   )
 }
}

export default WordFinder
