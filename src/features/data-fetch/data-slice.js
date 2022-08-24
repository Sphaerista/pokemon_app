/* eslint-disable */
import { dataActions } from "./data-action";

export const fetchingData = (cb,num) => {
    
    return async (dispatch) => {
        dispatch(dataActions.pendingRequest('pending'))
        const fetchPokData = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/?limit=${num}`
                // 'https://pokeapi.co/api/v2/pokemon/?limit=${num}&offset=150'
                );
                
                if(!response.ok){
                    throw new Error("failed to fetch");
                }
                
                const data = await response.json()
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
                        img : data?.sprites.front_default,
                        height: data?.height,
                        weight: data?.weight,
                        abilities: data?.abilities,
                        stats: data?.stats
                    }
                    arrayPoks.push(newObj)
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
                    return data
                })
            )
        return pokDetails
        }

        const fetchPokGenArray = (fetchedPokArray,fetchedPokGenDetails) => {
            const addGen = fetchedPokArray.map((poke)=>{
                fetchedPokGenDetails.map((name)=>{
                    name.pokemon_species.map((specie)=>{
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
            // create array with pokemos
            const fetchedPokData = await fetchPokData();
            const fetchedPokUrl = fetchPokUrl(fetchedPokData);
            const fetchedPokDetails = await fetchPokDetails(fetchedPokUrl);
            const fetchedPokArray = fetchPokArray(fetchedPokDetails);


            // add generations to created array with pokemos
            const fetchedPokGens = await fetchPokGens();
            const fetchedPokGenUrl = fetchPokGenUrl(fetchedPokGens);
            const fetchedPokGenDetails = await fetchPokGenDetails(fetchedPokGenUrl);
            const fetchedPokGenArray = await fetchPokGenArray(fetchedPokArray,fetchedPokGenDetails);

            dispatch(dataActions.fetchPokes(fetchedPokGenArray));
            cb(fetchedPokGenArray)
            dispatch(dataActions.finishedRequest('success'))
        } catch (e){
            dispatch(dataActions.finishedRequest('success'))    
            console.log(e);
        }
    };
};