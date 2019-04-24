'use strict';


const apiKey = '20f403aab5e249d3b097ce57ebd92854'; 
const tumbImage= 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
 
function displayTvShows(responseJson) {
  
   
  $('#results-list').empty();
  
  
    for (let i= 0; i < responseJson.results.length; i++){
      console.log(responseJson.results[i]);
    $('#results-list').append(
      `     
         
     <div class= 'content col-3'>
      <img src='${tumbImage}/${responseJson.results[i].poster_path}'>
      
      <div class='description'>
      <h2>${responseJson.results[i].original_name}</h2>
          
      <h3>${responseJson.results[i].overview}</h3>
      <p>Score ${responseJson.results[i].vote_average}</p>
      <p> First Air Date ${responseJson.results[i].first_air_date}</p>
       </div>
    </div>`

    )};
}



    
  $('#results').removeClass('hidden');




function displayFilmResults(responseJson) {
  
   
  $('#results-list').empty();
  
  
    for (let i= 0; i < responseJson.results.length; i++){
      console.log(responseJson.results[i]);
    $('#results-list').append(
      `     
           
     <div class='content col-3'>
      <img class='filmImage'  src='${tumbImage}/${responseJson.results[i].poster_path}'>
     <div class='description'> 
     <h3 class='overview'>${responseJson.results[i].overview}</h3>
        
      <p class='avg'>Vote Avergae =${responseJson.results[i].vote_average}</p>
            <p class='date'>Orginal Relase Date= ${responseJson.results[i].release_date}</p>

            
            
      </div>
       
    </div>`
    )};
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
    
    else if (options =='Tv Show'){
      getTvShow(searchTerm);
    }
   else {
     return 
     `Please Select A catagory`
   }
  });
}

$(watchForm);