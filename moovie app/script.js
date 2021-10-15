class MoovieAPI {
    SERVICE = "https://api.themoviedb.org";
    API_KEY = "04c35731a5ee918f014970082a0088b1";
    IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    
    async getMovies(sort_by='popularity.desc', page=1){
        let url = new URL("3/discover/movie", this.SERVICE);
        
        url.searchParams.append("sort_by", sort_by);
        url.searchParams.append("api_key", this.API_KEY);
        url.searchParams.append("page", page);
        return await this._loadMovies(url);
    }
    
    async searchMovies(query){
        let url = new URL("3/search/movie", this.SERVICE);
        	url.searchParams.append("api_key", this.API_KEY);
            url.searchParams.append("query", query);
        
        return await this._loadMovies(url);
    }
    
    async _loadMovies(url){
        let response = await fetch(url.toString()),
            responseJSON = await response.json(),
            movies = [];
            
        responseJSON.results.forEach((item) => {
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
        }
    }
}


class App {
    
    constructor(baseElementId, formId, searchId){
        this.main = document.getElementById(baseElementId);
        this.form = document.getElementById(formId);
        this.search = document.getElementById(searchId);
        
        this._initializeEvents();
    }
    
    async showMovies(movies=null){
        let movies_list = movies || await this.getInitialMoovies();
        this.main.innerHTML = "";
        
        movies_list.forEach((movie) => {
            let movieElement = document.createElement("div");
            
            movieElement.classList.add("movie");
            movieElement.innerHTML = this.createMovieHTMLElement(movie);
            
        	this.main.appendChild(movieElement);
    	});
    }
    
    async getInitialMoovies(){
        let api = new MoovieAPI();
        return await api.getMovies();
    }
    
    createMovieHTMLElement(movie){   
        let {poster, title, score, description: info} = movie;   
        return `
            <img
                src="${poster}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${this.getClassByScore(score)}">${score}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>${info}
            </div>
        `;
    }
    
    getClassByScore(score){
    	const classes = [
    		[8, "green"],
    		[5, "orange"],
    		[3, "black"],
    	]
    	
    	let class_ = "red";
    	for (let i=0; i < classes.length; i++){
    		let edge = classes[i][0],
    		    level = classes[i][1];
    		
    		if (score >= edge){
    			class_ = level;
    			break;
    		}
    	}    	
    	return class_;
    }
    
    _initializeEvents(){
    
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            let api = new MoovieAPI(),
                movies = await api.searchMovies(this.search.value);
                
	        this.showMovies(movies);
        });
    }
}

app = new App(
    baseElementId="main",
    formId="form",
    searchId="search",
);
app.showMovies();

