<template>
  <q-page class="flex-column bg-dark">
    <!--<q-card class="my-card">
      <q-video :src="'https://www.youtube.com/embed/'+`${this.trailerData.videoId}`+'?rel=0'" />

      <q-card-section>
        <div class="text-h6">{{this.trailerData.fullTitle}}</div>
        <div class="text-subtitle2">{{this.trailerData.title}}, {{this.trailerData.year}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section>
    </q-card>-->
    <div class="row" style="margin:0 auto;width:68%;">
      <div class="col-8">
        <q-video :src="'https://www.youtube.com/embed/'+`${this.trailerData.videoId}`+'?rel=0'" style="height:500px;margin-top:20px;"/>
      </div>
      <div class="col-4" style="background-color:#141414;">
          <q-card class="my-card" flat style="margin-top:20px;border-bottom:1px solid gray;">
            <q-card-section horizontal style="background-color:#141414;">
              <q-img
                class="col-5"
                :src="this.ınfoData.image"
                style="object-fit:scale-down;"
              />
              <q-card-section>
                <!--<div class="text-subtitle2 text-weight-bold text-white">{{this.trailerData.title}}, {{this.trailerData.year}} <span><q-icon name="info" color="white" size="md"></q-icon></span></div>-->
                <div class="text-subtitle2 text-weight-bold text-white" v-for="data in this.ınfoDataNewListForLoop" :key="data.imDbId">{{data.title}}, {{data.year}}  <span><q-btn icon="info" style="color:white;background-color:orange;" round size="md" v-on:click="goMovieDetail(data)"></q-btn></span></div>
                <div class="text-subtitle2" style="margin-top:10px;"><span v-for="dat in this.ınfoData.genreList" :key="dat.key" style="margin:3px;color:White;font-weight:bold;">{{dat.key}},</span></div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <div class="row" style="margin-top:20px;margin-left:10px;">
            <p class="text-weight-bold text-white" style="font-size:16px;">Watch New Scenes</p>
            <p class="text-weight-bold text-white" style="font-size:16px;">Watch New Scenes From {{this.ınfoData.title}}, {{this.ınfoData.year}}</p>
          </div>
      </div>
    </div>
    <div class="row" style="margin:0 auto;width:67%;margin-bottom:20px;">
      <div class="" style="border-left:5px solid orange;margin-top:30px;">
        <span style="color:White;font-weight:bold;font-size:20px;margin-left:10px;">Similar Shows</span>
      </div>
      <div class="" style="margin:20px auto;position:Absolute;margin-left:63%;">
        <q-btn icon="navigate_next" style="color:white;background-color:orange;" round v-on:click="getSimilarsMovie"></q-btn>
      </div>
    </div>
    <div class="row" style="margin:0 auto;width:67%;margin-bottom:20px;">
      <div class="col-4" v-for="data in this.onlyThreeSimilar" :key="data.id">
        <q-card class="my-card" style="width:400px;">
          <q-img :src="data.image" style="object-fit:cover;height:400px;">
            <div class="absolute-bottom text-subtitle2 text-center">
              <div align="left"><q-btn icon="play_arrow" color="orange" size="lg" round v-on:click="goNewTrailer(data)"></q-btn> <span style="margin-left:10px;">{{data.title}}</span> <span style="margin-left:10px;"><q-icon name="star" size="sm" style="color:#349beb;"></q-icon></span><span style="margin-left:5px;">{{data.imDbRating}}</span></div>
            </div>
          </q-img>
       </q-card>
      </div>
    </div>
    <div class="row">
    </div>
  </q-page>
</template>

<script>
import {useCounterStore} from "../stores/store"
export default {
    props:['id'],
    data:function(){
        return{
            trailerData:[],
            ınfoData:[],
            similarsMovie:[],
            onlyThreeSimilar:[],
            ınfoDataNewListForLoop:[]

        }
    },
    setup(){
        const store = useCounterStore()
        return{
            store
        }
    },
    methods:{
        async goMovieDetail(data){
          console.log(data)
          this.$router.push({name:'showSelected',params:{id:data.imDbId}})
        },
        async goNewTrailer(data){
          this.$q.loading.show()
          this.$router.push({path:'/'})
          setTimeout(()=>{
            this.$router.push({name:'trailer',params:{id:data.id}})
            setTimeout(()=>{
              this.$q.loading.hide()
            },200)
          },100)
        },
        async getSimilarsMovie(){
          const lengthData = this.similarsMovie.length
          const firstRandomNumber = Math.floor(Math.random() * lengthData);
          if(firstRandomNumber>4){
            const secondRandomNumber = firstRandomNumber -3
            //this.getNewMostPopularMoviesData = data.items.slice(firstRandomNumber,secondRandomNumber)
            this.onlyThreeSimilar = this.similarsMovie.slice(secondRandomNumber,firstRandomNumber) 
            console.log('Only 3 ',this.onlyThreeSimilar)
          }else if(firstRandomNumber<4){
            const secondRandomNumber = firstRandomNumber+3
            this.onlyThreeSimilar = this.similarsMovie.slice(firstRandomNumber,secondRandomNumber)
            console.log('Only 3 ',this.onlyThreeSimilar)
          }
        },
        async getInfoData(){
          const res = await fetch(`https://imdb-api.com/en/API/Title/k_ui7s57x4/${this.id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`)
          const data = await res.json()
          this.ınfoData = data
          this.similarsMovie = this.ınfoData.similars
          this.getSimilarsMovie()
          console.log('Info',this.ınfoData)
        },
        async getTrailerData(){
            this.ınfoDataNewListForLoop = []
            const res = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_ui7s57x4/${this.id}`)
            const data = await res.json()
            this.trailerData = data
            this.ınfoDataNewListForLoop.push(data)
            console.log('New List :',this.ınfoDataNewListForLoop)
            console.log('Trailer:',this.trailerData)
        },
    },
    mounted(){
        this.getTrailerData()
        this.getInfoData()
    }
}
</script>

<style scoped>
  .firstPage{
    background-color:black;
  }
</style>