import { dataActions } from "./data-action";

export const fetchingData = () => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        let  finalResult = []
        const fetchData = async () => {
            const response = await fetch(
                'https://pokeapi.co/api/v2/pokemon/?limit=54'
                );
                
                if(!response.ok){
                    throw new Error("failed to fetch");
                }
                
                const data = await response.json()
                console.log('1',data)

                // create array with poks without generation
            const arrayPoks = [];
            // if(data){
                const urlData = data.results.forEach(element => {
                    ( async () => {
                        const response = await fetch(element.url)

                    if(!response.ok){
                        throw new Error("failed to fetch");
                    }
                
                    const data = await response.json()
                    console.log('2')
                        const newObj = {
                            id: data?.id,
                            name: data?.name,
                            generation : '',
                            height: data?.height,
                            weight: data?.weight,
                            abilities: data?.abilities,
                            stats: data?.stats
                        }
                        arrayPoks.push(newObj)
                        // console.log(newObj,arrayPoks)
                        return newObj
                })()
                

            });
        // }

        // add generation to array with poks
        const fetchGens = async () => {
            const response = await fetch(
                'https://pokeapi.co/api/v2/generation/'
            );

            if(!response.ok){
                throw new Error("failed to fetch");
            }
        
            const data = await response.json()
            console.log('3',data)

            // if(data){
                // prom.all
                const genData = data.results.forEach(element => {
                    const fetchGen = async () => {
                        const response = await fetch(element.url)
    
                        if(!response.ok){
                            throw new Error("failed to fetch");
                        }
                    
                        const data = await response.json()
                        console.log('4',data)
                        const addGen = arrayPoks.map((item)=>{
                            data.pokemon_species.map((name)=>{
                                if(item.name === name.name){
                                    item.generation = data.name
                                }
                            })
                        })
                    }
                    fetchGen()
                });
            // }
            console.log(arrayPoks)
            finalResult = arrayPoks;
            console.log(finalResult)
            return finalResult;
        }
        fetchGens()
        console.log(finalResult)
            // return [mappedArray,data.totalItems];
        };
        
        try {
            const fetchedData = await fetchData();
            const fetchedDet = await fetchDetail(fetchedData);
            const fetchedGen = await fetchDetail(fetchedDet);
            console.log('fetchedData:::',fetchedData)
            dispatch(dataActions.fetchBooks(fetchedData));
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