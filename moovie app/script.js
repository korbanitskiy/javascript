class MovieAPI {
    SERVICE = "https://api.themoviedb.org/3";
    API_KEY = "04c35731a5ee918f014970082a0088b1";
    IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    
    getMovies(sort_by='popularity.desc', page=1){
        let url = new URL("/discover/movie", base=this.SERVICE)
            .append("api_key", this.API_KEY)
            .append("page", page)
            .append("sort_by", sort_by);
        
        return this._loadMovies(url);
    }
    
    searchMovies(query){
        let url = new URL("/search/movie", base=this.SERVICE)
            .append("api_key", this.API_KEY)
            .append("query", query);
        
        return this._loadMovies(url);
    }
    
    _loadMovies(url){
        let response = await fetch(url);
        let responseJSON = await response.json();
        
        let movies = [];
        responseJSON.each((item) => {
            movies.push(this._getMovieInfo(item));
        });
        
        return movies;
    }
    
    _getMovieInfo(movie){
        return {
            poster: this.IMAGE_PATH + movie.poster_path,
            title: movie.title,
            description: movie.overview,
            score: movie.vote_average,
        };
    }
    
}

class App {
    
    constructor(baseElementId, formId, searchId){
        this.main = document.getElementById(baseElementId);
        this.form = document.getElementById(formId);
        this.search = document.getElementById(searchId);
        
        initializeEvents();
    }
    
    showMovies(movies){
        this.main.innerHTML = "";

        movies.forEach((movie) => {
            const { poster_path, title, vote_average, overview } = movie;
            const movieElement = document.createElement("div");
            
            movieElement.classList.add("movie");
            movieElement.innerHTML = 

        main.appendChild(movieEl);
    });
    }
    
    createMovieHTMLElement(movie){      
        html = `
            <img
                src="${this + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;
    }
    
    initializeEvents(){
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let 
            
        });
        
    }

}
