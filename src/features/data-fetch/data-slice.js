import { dataActions } from "./data-action";

export const fetchingData = (cb) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchPokData = async () => {
            const response = await fetch(
                // 'https://pokeapi.co/api/v2/pokemon/?limit=54'
                'https://pokeapi.co/api/v2/pokemon/?limit=54&offset=230'
                );
                
                if(!response.ok){
                    throw new Error("failed to fetch");
                }
                
                const data = await response.json()
                // console.log('1',data.results)
                return data.results;
            };
                // create array with poks without generation
        const fetchPokUrl = (fetchedPokData) => {
            let arrayPoks = [];
            const urlData = fetchedPokData.forEach(element => {
                arrayPoks.push(element.url)
            });
            return arrayPoks
        }

        const fetchPokDetails = async (fetchedPokUrl) => {
            const pokDetails = await Promise.all(
                fetchedPokUrl.map(async (pokUrl)=>{
                    const response = await fetch(pokUrl)
                    const data = await response.json()
                    // console.log(data)
                    return data
                })
            )
        return pokDetails
        }

        const fetchPokArray = (fetchedPokDetails) => {
            let arrayPoks = [];
            const urlData = fetchedPokDetails.forEach(data => {
                const newObj = {
                        id: data?.id,
                        name: data?.name,
                        generation : 'no gen',
                        height: data?.height,
                        weight: data?.weight,
                        abilities: data?.abilities,
                        stats: data?.stats
                    }
                    arrayPoks.push(newObj)
                    // console.log('3',arrayPoks)
            });
            return arrayPoks
        }

        // add generation to array with poks
        const fetchPokGens = async () => {
            const response = await fetch(
                'https://pokeapi.co/api/v2/generation/'
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }
        
            const data = await response.json()
            return data.results
        }

        const fetchPokGenUrl = (fetchedPokGens) => {
            let arrayGens = [];
            const urlData = fetchedPokGens.forEach(element => {
                arrayGens.push(element.url)
            });
            return arrayGens
        }

        const fetchPokGenDetails = async (fetchedPokGenUrl) => {
            const pokDetails = await Promise.all(
                fetchedPokGenUrl.map(async (pokGenUrl)=>{
                    const response = await fetch(pokGenUrl)
                    const data = await response.json()
                    // console.log(data.name, data.pokemon_species)
                    return data
                })
            )
        return pokDetails
        }

        const fetchPokGenArray = (fetchedPokArray,fetchedPokGenDetails) => {
            console.log('1',fetchedPokArray,fetchedPokGenDetails)
            const addGen = fetchedPokArray.map((poke)=>{
                // console.log(poke)
                fetchedPokGenDetails.map((name)=>{
                    // console.log('1',poke, name.name, name.pokemon_species)
                    name.pokemon_species.map((specie)=>{
                        // console.log(specie.name)
                                if(poke.name === specie.name){
                                    poke.generation = name.name
                                    
                                }
                    })
                
                })
                return poke
            })
            return addGen
        }
        
        try {
            const fetchedPokData = await fetchPokData();
            // console.log('fetchedData:::',fetchedPokData)

            const fetchedPokUrl = await fetchPokUrl(fetchedPokData);
            // console.log('fetchedUrl:::',fetchedPokUrl)

            const fetchedPokDetails = await fetchPokDetails(fetchedPokUrl);
            // console.log('fetchedDetails:::',fetchedPokDetails)

            const fetchedPokArray = await fetchPokArray(fetchedPokDetails);
            // console.log('fetchedArray:::',fetchedPokArray)



            const fetchedPokGens = await fetchPokGens();
            // console.log('fetchedGens:::',fetchedPokGens)

            const fetchedPokGenUrl = await fetchPokGenUrl(fetchedPokGens);
            // console.log('fetchedGenUrl:::',fetchedPokGenUrl)

            const fetchedPokGenDetails = await fetchPokGenDetails(fetchedPokGenUrl);
            // console.log('fetchedDetails:::',fetchedPokGenDetails)

            const fetchedPokGenArray = await fetchPokGenArray(fetchedPokArray,fetchedPokGenDetails);
            // console.log('fetchedArray:::',fetchedPokGenArray)

            dispatch(dataActions.fetchBooks(fetchedPokGenArray));
            cb(fetchedPokGenArray)
            // dispatch(dataActions.fetchTotalItems(fetchedData[1]));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            dispatch(dataActions.finishedRequest('success'))    
            console.log(e);
        }
    };
};

export const fetchingBook = (bookId) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchBook = async () => {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${bookId}`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()
            const newObj = {
                id: data?.id,
                etag: data?.etag,
                title: data?.volumeInfo?.title,
                authors: data?.volumeInfo?.authors,
                categories: data?.volumeInfo?.categories,
                imageLink: data?.volumeInfo?.imageLinks?.thumbnail,
                description: data?.volumeInfo?.description,

            }
                return newObj
        };

        try {
            const fetchedBook = await fetchBook();
            dispatch(dataActions.fetchBook(fetchedBook));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            console.log(e);
        }
    };
};

export const fetchingMoreData = (numberToAdd,searchInput,orderBy,categoryBy) => {
    
    return async (dispatch) => {
        const fetchMoreBooks = async () => {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchInput}${categoryBy}&orderBy=${orderBy}&key=AIzaSyAbeMRMRrF1839zC8XCLNhal8Y7zh9ShcI&maxResults=30&startIndex=${numberToAdd}`
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }

            const data = await response.json()
            const mappedArray =  data.items.map((item)=>{
                const newObj = {
                    id: item?.id,
                    etag: item?.etag,
                    title: item?.volumeInfo?.title,
                    authors: item?.volumeInfo?.authors,
                    piblishedDate: item?.volumeInfo?.publishedDate,
                    categories: item?.volumeInfo?.categories,
                    imageLink: item?.volumeInfo?.imageLinks?.thumbnail,
                }
                return newObj
            })
            return mappedArray;
        };

        try {
            const fetchedMoreBooks = await fetchMoreBooks();
            dispatch(dataActions.fetchMoreBooks(fetchedMoreBooks));
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            console.log(e);
        }
    };
};