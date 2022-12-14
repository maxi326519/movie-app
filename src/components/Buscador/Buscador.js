import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Buscador.css';

import { getMovies, addMovieFavourite } from '../../redux/actions'

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`Buscando: ${this.state.title}...`);
    this.props.getMovies(this.state.title);
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul>
          {
            this.props.movies.map(movie => {
              if(movie.Type === 'movie'){
                return(
                  <div key={ movie.imdbID }>
                    <img src={ movie.Poster } alt='poster' />
                    <span>{ movie.Title }</span>
                    <span>{ movie.Year }</span>
                    <button onClick={ ()=>{this.props.addMovieFavourite(movie)} }>Favourite</button>
                  </div>
                )
              }
            })
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    movies: state.movies
  }
}

function mapDispatchToProps(dispatch){
  return {
    addMovieFavourite: movie => dispatch(addMovieFavourite(movie)),
    getMovies: title => { console.log(title); dispatch(getMovies(title)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
