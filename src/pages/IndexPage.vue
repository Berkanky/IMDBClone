<template>
  <q-page class="flex-column" style="background-color:black;">
    <transition-group appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <div class="goTopDiv" align="center" v-if="this.showScrollButton">
        <q-btn rounded color="dark" label="Back To Top" icon="expand_less" class="goTopButton" v-on:click="goTop"></q-btn>
      </div>
    </transition-group>
    <div class="row" style="width:70%;margin:0 auto;margin-left:20%;">
      <addphoto style="margin-top:1%;"></addphoto>
    </div>
    <div class="row" style="margin-left:16%;margin-top:-3%;"> 
      <div class="col-6" style="margin-top:6%;">
       <!--<div class="row" v-for="data in this.imagesAll" :key="data.image" >
          <img :src="data.image" alt="" style="width:760px;height:600px;object-fit:cover;border-radius:4px;">
        </div>-->
      <div class="row">
      <q-carousel
        animated
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        arrows
        swipeable
        infinite
        padding
        class="bg-grey-1 shadow-2 rounded-borders"
        control-color="white"
        style="width:90%;"
      >
        <q-carousel-slide  v-for="data in this.imagesAll" :key="data.id" :name="data.rank" class="column no-wrap flex-center">
          <img :src="data.image" class="sliderİmage">
            <div class="q-mt-md text-center text-white" style="position:absolute;margin-top:32%;margin-left:10px;">
                <div class="row" >
                  <div class="col-2">
                    <img :src="data.image" alt="" style="width:145px;height:150px;object-fit:cover;">
                  </div>  
                  <div class="col-10" style="margin-left:143px;margin-top:-156px;background-color:black;width:550px;height:150px;opacity:0.8;">
                    <q-btn icon="play_circle" size="lg" round style="margin-top:30px;margin-left:-440px;color:black;background-color:white;" v-on:click="goTrailer(data)"></q-btn>
                    <p style="margin-top:-60px;font-weight:bold;font-size:14px;margin-left:40px;">{{data.crew}}</p>
                    <p style="font-weight:bold;font-size:13px;">{{data.title}} <q-icon round size="md" color="white" name="info" v-on:click="goShowSelected(data)" style="cursor:grab;"></q-icon></p>
                  </div>
                </div>
            </div>
        </q-carousel-slide>
      </q-carousel>   
      </div>
      </div>
      <div class="col-6">
        <div class="row" style="margin-top:2%;">
          <p style="color:orange;font-weight:bold;font-size:20px;">Up Next</p>
        </div>
        <div class="row">
          <q-card class="my-card" style="width:420px;height:160px;background-color:#141414;margin-top:6px;" v-for="data in this.onlyThreeData" :key="data.id">
            <q-card-section horizontal>
              <q-img
                class="col-5"
                :src="data.image"
                height="160px"
                width="100px"
                style="object-fit:scale-down;image-rendering: pixelated;"
              />
              <q-card-section>
                <q-btn icon="play_circle" style="color:gray;" size="md" v-on:click="goTrailer(data)" rounded></q-btn>
                <span style="color:lightgray;margin-left:6px;">2:11</span>
                <p style="color:White;font-size:13px;">{{data.title}}, {{data.year}} <q-btn round size="md" color="dark" icon="info" v-on:click="goShowSelected(data)"></q-btn></p>
                <p style="color:White;font-size:16px;">IMDb : {{data.imDbRating}}</p>
              </q-card-section>
              </q-card-section>
            </q-card>
        </div>
        <div class="row" style="margin-top:30px;">
          <p style="color:White;font-size:18px;font-weight:bold;">Browse Trailers</p><q-icon name="chevron_right" size="sm" color="white" style="margin-top:1px;margin-left:4px;"></q-icon>
        </div>
      </div>
    </div>
    <div class="row" align="center">
      <div class="col-5" >
        <h5 style="color:orange;font-size:25px;font-weight:bold;">Featured Today</h5>
        <p style="font-size:15px;font-weight:bold;color:gray;margin-top:-20px;">Most Popular Movies For You</p>
      </div>
      <div class="col-2" style="margin:3% auto;margin-left:70%;position:Absolute;">
        <q-btn color="orange" size="md" label="More..." icon-right="navigate_next" v-on:click="getNewMostPopularMovies"></q-btn>
      </div>
    </div>
    <div class="row" style="width:70%;margin:0 auto;">
      <div class="col-2" v-for="data in this.getNewMostPopularMoviesData" :key="data.id">
        <q-card class="my-card" style="width:90%;background-color:#141414;">
          <img :src="data.image" style="width:330px;height:300px;">
            <q-card-section style="height:180px;">
              <div class="text-subtitle2" align="center"><q-icon name="star" size="sm" color="yellow"></q-icon> <span style="color:White;">{{data.imDbRating}}</span></div>
              <div class="text-subtitle2 text-weight-bold text-white" style="margin-top:4px;cursor:grab;" align="center">{{data.title}} <q-icon name="info" style="background-color:#141414;color:white;" size="sm"  v-on:click="goShowSelected(data)"></q-icon></div>
              <div class="text-subtitle2" style="margin-top:3px;"><q-btn icon="add" style="background-color:#141414;color:#349beb;font-size:13px;margin-top:5px;" label="Watch List" v-on:click="addWatchList(data)"></q-btn></div>
              <div class="text-subtitle2" style="margin-top:2px;"><q-btn icon="play_arrow" style="background-color:#141414;color:white;" label="Trailer" size="md" v-on:click="goTrailer(data)"></q-btn></div>
            </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="" style="width:70%;margin:0 auto;">
        <div class=""> 
           <h5 align="left" style="border-left:4px solid orange;font-weight:bold;"><span style="margin-left:4px;color:White;">Top Box Office</span> <span><q-icon style="color:white;cursor:grab;" name="navigate_next" size="md" v-on:click="goTopBoxOffice"></q-icon></span></h5>
        </div>
    </div>
      <div class="row" style="width:70%;margin:0 auto;">
          <div class="col-6" v-for="data in this.topBoxOfficeData " :key="data.id">
              <q-card class="my-card bg-dark" flat bordered style="margin:5px;" >
                <q-item align="left">
                  <q-item-section avatar>
                    <div class="text-h6 text-white">{{data.rank}}</div>
                  </q-item-section>
                  <q-item-section style="margin-left:-3%;">
                    <q-item-label>
                    <span style="border-right:4px solid orange;font-weight:bold;"></span></q-item-label>
                  </q-item-section>
                  <q-item-section style="margin-left:-60%;">
                     <q-item-label><q-btn icon="bookmark_add" style="color:gray;" size="md" round></q-btn></q-item-label>
                  </q-item-section>
                  <q-item-section style="margin-left:-55%;">
                    <q-avatar>
                      <img :src="data.image" alt="">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section style="color:White;font-weight:bold;text-align:justify;margin-left:-50%;">
                    <q-item-label style="color:#349beb;cursor:grab;font-size:16px;" v-on:click="goShowSelected(data)">{{data.title}} </q-item-label>
                    <q-item-label caption style="color:White;font-weight:bold;">{{data.weekend}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-card>
          </div>
        </div>
        <div class="row" style="width:70%;margin:0 auto;">
          <watch-list/>
        </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import addphoto from "../components/examplephoto.vue"
import {useCounterStore} from "../stores/store"
import watchList from "../pages/watchList.vue"
import comingsoon from "../components/comingsoon.vue"
export default {
  components:{
    comingsoon,
    addphoto,
    watchList
  },
  setup(){
    const store = useCounterStore()
    return{
      store
    }
  },
  data(){
    return{
      slide:"1",
      slideTwo:"1",
      query:null,
      name:null,
      titleid:null,
      movieData:[],
      trailerData:[],
      isActive:false,
      expanded:true,
      trailerNewData:[],
      actorid:null,
      actorDetails:[],
      comingSoonData:[],
      onlyThreeData:[],
      upComingData:[],
      mostPopularTv:[],
      MostPopularTvAndUpComingData:[],
      getNewMostPopularMoviesData:[],
      scrollValue:0,
      showScrollButton:false,
      topBoxOfficeData:[],
      randomMostPopularMovies:[],
      imagesAll:[],
      randomData:[],
      newİmage:null,
      watchListData : null
      
    }
  },
  methods:{
    async addWatchList(data){
      // this.store.addedData = [...this.store.addedData,sendRes.data]
      const arr2 = this.store.watchList
      const value2  = data
      const index = arr2.findIndex(object => object.id === value2.id);
      if (index === -1) {
        const res = await axios.post('http://localhost:3004/watchList',data)
        this.store.watchList = [...this.store.watchList,res.data]
        console.log('AxiosDAta',res.data) 
      }else{
        this.$q.notify({
          type:'negative',
          message:'Already Added',
          timeout:2500
        })
      }
    },
    async getRandomImageFromImages(){
      //var item = items[Math.floor(Math.random()*items.length)];
      //const res = await fetch(`https://imdb-api.com/en/API/Images/k_ui7s57x4/tt1375666/Full`)
      //const slicedArray = array.slice(0, n);
      const images = this.randomMostPopularMovies
      this.randomData = images[Math.floor(Math.random()*images.length)]
      //console.log('Random DAta,',this.randomData)
      const resTwo = await fetch(`https://imdb-api.com/en/API/Images/k_ui7s57x4/${this.randomData.id}/Full`)
      const dataTwo = await resTwo.json()
      //this.imagesAll = dataTwo.items.slice(0,1)
      const dataTwoLength = dataTwo.items.length
      const randomNumber = Math.floor(Math.random() * dataTwoLength);
      if(randomNumber>10){
        const secondRandomNumber = randomNumber-6
        //this.imagesAll = dataTwo.items.slice(secondRandomNumber,randomNumber)
      }else if(randomNumber<10){
        const secondRandomNumber = randomNumber+6
        //this.imagesAll = dataTwo.items.slice(randomNumber,secondRandomNumber)
      }
      //this.imagesAll = dataTwo.items.slice()
      //console.log('imageLast',this.imagesAll)
      ////console.log('Random',this.randomData)
    },
    async getNewImage(){
      this.imagesAll = []
      const datas = this.randomMostPopularMovies
      const datasLength = this.randomMostPopularMovies.length
      const randomNumber = Math.floor(Math.random() * datasLength);
      if(randomNumber<=50){
        const secondRandomNumber = randomNumber + 30
        datas.forEach(element => {
          if(element.rank<secondRandomNumber&&element.rank>randomNumber){
            fetch(`https://imdb-api.com/en/API/Images/k_ui7s57x4/${element.id}/Full`)
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data)
                    const images = data.items[0]
                    this.imagesAll.push({id:element.id,title:element.fullTitle,image:images.image,rank:element.rank})
                    //items.sort((a, b) => a.value - b.value);
                    //const min = arr.reduce((a, b) => Math.min(a, b))
                    this.imagesAll.sort((a,b)=>a.rank - b.rank);
                    this.slide = this.imagesAll[0].rank  
                });
            //this.imagesAll.push(element)
          }
        });
      }else if(randomNumber>50){
        const secondRandomNumber = randomNumber - 30
        datas.forEach(element => {
            if(element.rank>secondRandomNumber&&element.rank<randomNumber){
              fetch(`https://imdb-api.com/en/API/Images/k_ui7s57x4/${element.id}/Full`)
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data)
                    const images = data.items[0]
                    this.imagesAll.push({id:element.id,title:element.fullTitle,image:images.image,rank:element.rank})
                    this.imagesAll.sort((a,b)=>a.rank - b.rank);
                    this.slide = this.imagesAll[0].rank  
                });
            }
        });
      }
      console.log('İmagesLAstNew',this.imagesAll,this.imagesAll.length)
    },
    async getİmages(){
      //var item = items[Math.floor(Math.random()*items.length)];
      const resFirst = await fetch(`https://imdb-api.com/en/API/MostPopularMovies/k_ui7s57x4`)
      const data = await resFirst.json()
      this.randomMostPopularMovies = data.items
      //const resTwo = await fetch(`https://imdb-api.com/en/API/Images/k_ui7s57x4/tt1375666/Full`)
      //const dataTwo = await resTwo.json()
      //this.imagesAll = dataTwo.items
      //this.getRandomImageFromImages()
      this.getNewImage()
      //console.log('Most Popular Movies',this.randomMostPopularMovies)
    },
    goTopBoxOffice(){
      this.$router.push({name:'detail'})
    },
    async getTopBoxOffice(){
      const res = await fetch(`https://imdb-api.com/en/API/BoxOffice/k_ui7s57x4`)
      const data = await res.json()
      this.topBoxOfficeData = data.items.slice(0,6)
      ////console.log('Top Box Office',this.topBoxOfficeData)
    },
    goTop(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    async goShowSelected(data){
      //////console.log(data)
      this.$router.push({name:'showSelected',params:{id:data.id}})
    },
    async getNewMostPopularMovies(){
      const res = await fetch(`https://imdb-api.com/en/API/MostPopularMovies/k_ui7s57x4`)
      const data = await res.json()
      //const slicedArray = array.slice(0, n);
      //Math.floor(Math.random() * 10);
      const lengthData = data.items.length
      const firstRandomNumber = Math.floor(Math.random() * lengthData);
      if(firstRandomNumber<14){
        const secondRandomNumber = firstRandomNumber + 6
        this.getNewMostPopularMoviesData = data.items.slice(firstRandomNumber,secondRandomNumber)
      }else if(firstRandomNumber>14){
        const secondRandomNumber = firstRandomNumber - 6
        this.getNewMostPopularMoviesData = data.items.slice(secondRandomNumber,firstRandomNumber)
      }
      //////console.log('Most Popular Movies :',data)
    },
    async concatList(){
      const res = await fetch(`https://imdb-api.com/en/API/MostPopularTVs/k_ui7s57x4`)
      const data = await res.json()
      this.mostPopularTv = data.items

      const resTwo = await fetch(`https://imdb-api.com/en/API/InTheaters/k_ui7s57x4`)
      const dataTwo = await resTwo.json()
      this.upComingData = dataTwo.items
      //////console.log(this.mostPopularTv,this.upComingData)
      this.MostPopularTvAndUpComingData = this.mostPopularTv.concat(this.upComingData)
      ////console.log(this.MostPopularTvAndUpComingData)
    },
    async getMostPopularTv(){
      const res = await fetch(`https://imdb-api.com/en/API/MostPopularTVs/k_ui7s57x4`)
      const data = await res.json()
      this.mostPopularTv = data
      //this.MostPopularTvAndUpComingData.push(this.mostPopularTv.items)
      //////console.log('Most Popular Tv :',this.mostPopularTv)
    },
    async upComing(){
      const res = await fetch(`https://imdb-api.com/en/API/InTheaters/k_ui7s57x4`)
      const data = await res.json()
      this.upComingData = data
      //this.getMostPopularTv()
      //this.MostPopularTvAndUpComingData.push(this.upComingData.items)
      //////console.log('Upcoming',this.upComingData)
      //////console.log(this.upComingData)
    },
    async getOnlyThree(){
      this.onlyThreeData = []
      const res = await fetch(`https://imdb-api.com/en/API/Top250Movies/k_ui7s57x4`)
      const data = await res.json()
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      const secondRandom = Math.floor(Math.random() * 100) + 1;
      const thirdRandom = Math.floor(Math.random() * 100) + 1;
      const firstOne = data.items[randomNumber]
      const secondOne = data.items[secondRandom]
      const thirdOne = data.items[thirdRandom]
      this.onlyThreeData.push(firstOne)
      this.onlyThreeData.push(secondOne)
      this.onlyThreeData.push(thirdOne)
      ////////console.log('Only Three',this.onlyThreeData)
    },
    async comingSoon(){
      const res = await fetch(`https://imdb-api.com/en/API/Top250Movies/k_ui7s57x4`)
      const data = await res.json()
      this.comingSoonData = data
      //console.log('Coming Soon',this.comingSoonData)
    },
    async actorAwards(){
      this.actorid = this.actorDetails.results[0].id
      const res = await fetch(`https://imdb-api.com/en/API/NameAwards/k_ui7s57x4/${this.actorid}`)
      const data = await res.json()
      //////console.log('Awards',data)
    },
    async showTrailerNewData(data){
      this.expanded = true
      const titleid = data.id
      if(this.expanded){
        const res = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_ui7s57x4/${titleid}`)
        const data = await res.json()
        this.trailerNewData = data
        //////console.log(this.trailerNewData)
      }
    },
    async getActorDetails(event){
      this.name = event.target.value
      const res = await fetch(`https://imdb-api.com/en/API/SearchName/k_ui7s57x4/${this.name}`)
      const data = await res.json()
      this.actorDetails = data
      const actorid =   data.results[0].id
      //////console.log('Actor Details',this.actorDetails,"Actor İd :",actorid)
      this.actorAwards()
    },
    async goTrailer(data){
      //this.store.trailerid = data.id
      //////console.log(data)
      this.$router.push({name:'trailer',params:{id:data.id}})
    },
    async getData(event){
      this.query = event.target.value
      if(this.query){
        this.getStoreApi()
      }
    },
    async top50(){
      const res = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_ui7s57x4/${this.titleid}`)
      const data = await res.json()
      this.trailerData = data
      //////console.log('Trailer:',this.trailerData)
    },
    async getStoreApi(){
      const res = await fetch(`https://imdb-api.com/en/API/SearchAll/k_ui7s57x4/${this.query}`)
      const data = await res.json()
      this.movieData = data
      //this.showTrailerNewData(data)
      //////console.log(this.movieData)
      //this.top50()
    }
  },
  created(){
    //this.getStoreApi()
    //this.top50()
    this.comingSoon()
    //setInterval(()=>{
    this.getOnlyThree()
    this.upComing()
    this.getNewMostPopularMovies()
    this.getİmages()
    if(this.imagesAll){
      setInterval(()=>{
        this.getNewImage()
      },600000)
    }
    //if(this.randomMostPopularMovies){
      //setInterval(()=>{
        //this.getRandomImageFromImages()
      //},10000)
    //}
    this.getTopBoxOffice()
    //this.getMostPopularTv()
    //this.concatList()
    //},6000)

    window.addEventListener("scroll", (event) => {
      this.scrollValue = window.scrollY;
      //////console.log(this.scrollValue)
    })
  },
  watch:{
    scrollValue:function(){
      if(this.scrollValue>20){
        this.showScrollButton=true
        //////console.log(this.showScrollButton)
      }else{
        this.showScrollButton = false
      }
    }
  }
}
</script>

<style scoped>
  .sliderİmage{
    image-rendering: pixelated;
    object-fit: cover;
    border-radius: 4px;
    width:718px;
    height:400px;
  }
  .goTopDiv{
    position: fixed;
    top: 90px;
    margin-left:45%;
    z-index: 1;
  }
  .goTopButton{
    overflow: hidden;
  }
</style>