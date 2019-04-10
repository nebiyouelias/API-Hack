'use strict';


const apiKey = '20f403aab5e249d3b097ce57ebd92854'; 
const tumbImage= 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
 
function displayTvShows(responseJson) {
  
   
  $('#results-list').empty();
  
  
    for (let i= 0; i < responseJson.results.length; i++){
      console.log(responseJson.results[i]);
    $('#results-list').append(
      `     
         
     <li class='tvList'>
      <img src='${tumbImage}/${responseJson.results[i].poster_path}'>
      <p>${responseJson.results[i].original_name}</p>
      <h3>${responseJson.results[i].vote_count}</h3>
      <p>${responseJson.results[i].vote_average}</p>
      <p>${responseJson.results[i].first_air_date}</p>
      <p>${responseJson.results[i].overview}</p>
       
    </li>`
    )};
}



    
  $('#results').removeClass('hidden');

function displayPersonResults(responseJson) {
  
   const listArray= responseJson.results.flatMap(x => x.known_for); 
   
  $('#results-list').empty();
  
  
    for (let i= 0;  i < responseJson.results.length; i++){
    
    $('#results-list').append(
      `     
           
     <div class='person'>
      <h1 class='personName'>${responseJson.results[i].name}
      <img class= 'Personimage' src='${tumbImage}/${responseJson.results[i].profile_path}'>
    <ul class='list'>Known For
    ${responseJson.results[i].known_for.map(x => {
      return `<img class='personMovies'
                  src='${tumbImage}/${x.poster_path}'>
    <li class='title'>${x.title}</li>
    <li>${x.overview}</li>
    <li>${x.release_date}</li>
    
    </div>`
    
    }).join('')}
    
        </ul>`
    
    )};
  }
    
  $('#results').removeClass('hidden');
function displayFilmResults(responseJson) {
  
   
  $('#results-list').empty();
  
  
    for (let i= 0; i < responseJson.results.length; i++){
      console.log(responseJson.results[i]);
    $('#results-list').append(
      `     
           
     <div class='filmResults'>
      <img  src='${tumbImage}/${responseJson.results[i].poster_path}'>
      <p class='lang'>${responseJson.results[i].original_language}</p>
      <h3 class='overview'>${responseJson.results[i].overview}</h3>
      <p class='avg'>${responseJson.results[i].vote_average}</p>
      <p class='date'>${responseJson.results[i].release_date}</p>
       
    </div>`
    )};
}

function getPersonInfo(person) {
  
  const personUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${person}&include_adult=false`;
   
   console.log(personUrl);
 
    fetch(personUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayPersonResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getFilmInfo(movies) {
  
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movies}&include_adult=false`;
   
 
    console.log(url);

fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayFilmResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
} 
function getTvShow(tvShow) {
  
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${tvShow}&include_adult=false`;
   
 
    console.log(url);

fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayTvShows(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
} 






function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const options= $('.list').val()
    if (options=='Movies') {
      getFilmInfo(searchTerm);
    } 
    else if (options=='people'){
      getPersonInfo(searchTerm);
    }
    else if (options =='Tv Show'){
      getTvShow(searchTerm);
    }
   
  });
}

$(watchForm);