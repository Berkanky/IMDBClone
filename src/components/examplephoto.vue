<template>
  <div>
    <img src="../database/addPhoto2.jpg" alt="" style="width:80%;height:80%;object-fit:cover;border-radius:1px;">
  </div>
</template>

<script>
import {useCounterStore} from "../stores/store"
export default {
  setup(){
    const store = useCounterStore()
    return{
      store
    }
  },
  data:function(){
    return{
      movieData:[],
      image:null
    }
  },
  methods:{
    async randomPicture(){
      //const slicedArray = array.slice(0, n);
      //Math.floor(Math.random() * 10);
      const dataLength = this.movieData.items.length
      const firstRandomNumber = Math.floor(Math.random() * dataLength);
      this.image = this.movieData.items[firstRandomNumber].image
    },
    async getMostPopularMovies(){
      const res = await fetch(`https://imdb-api.com/en/API/MostPopularTVs/k_ui7s57x4`)
      const data = await res.json()
      this.movieData = data
      this.randomPicture()
      console.log(this.movieData)
      
    }
  },
  created(){
    this.getMostPopularMovies()
    
  }
}
</script>

<style scoped>

</style>