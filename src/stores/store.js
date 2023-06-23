import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    trailerid:null,
    name:'berkn',
    top250MovieData:[],
    mostPopularMovies:[],
    details:[],
    searchResult:[],
    moreDetail:[],
    headerFirst:null,
    headerSecond:null,
    headerThird:null,
    namesList:[],
    titlesList:[],
    boxOfficeData:[],
    selectedInfo:[],
    reviewsData:[],
    userRatingsData:[],
    watchList : []
  }),
  getters: {
  },
  actions: {
  },
});
