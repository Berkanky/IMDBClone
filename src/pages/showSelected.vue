<template>
  <q-page class="flex-column allPage">
    <div class="firstPage">
        <div class="row">
            <img :src="this.image" alt="" style="width:50%;height:250px;object-fit:cover;border-radius:2px;margin:0.5% auto;">
       </div>
    </div>
    <div class="secondPage" >
        <div class="row" style="margin-left:55%;font-size:16px;font-weight:bold;color:White;">
            <p style="margin-top:11px;">Cast & crew - User reviews - Trivia | IMDbPro | <q-icon name="dns" size="sm"></q-icon> All Topics | <q-icon name="share" size="sm"></q-icon></p>
        </div>
        <div class="row" align="center" v-if="this.store.selectedInfo">
            <div class="col-7">
                <p style="color:white;font-size:30px;">{{this.store.selectedInfo.fullTitle}}</p>
                <p style="font-weight:Bold;color:lightgray;">Original Title : {{this.store.selectedInfo.title}}</p>
                <p style="font-weight:Bold;color:lightgray;">{{this.store.selectedInfo.year}} - {{this.store.selectedInfo.imDbRating}} - {{this.store.selectedInfo.runtimeStr}}</p>
            </div>
            <div class="col-5 "  style="margin-top:50px;">
                <div class="row"> 
                <div class="col-2">
                    <p style="margin-top:10px;margin-bottom:-2px;color:lightgray;font-weight:bold;">IMDb Rating</p>
                    <p><q-icon name="star" color="orange" size="md" style="margin-top:9px;"></q-icon> <span style="color:white;font-weight:Bold;font-size:20px;"  v-if="this.store.selectedInfo.ratings">{{this.store.selectedInfo.ratings.imDb}}</span><span style="color:gray;font-weight:Bold;font-size:14px;"> / 10</span></p>
                </div>
                <div class="col-2">
                    <p style="margin-top:10px;margin-bottom:-2px;color:lightgray;font-weight:bold;">Your Rating</p>
                    <p style="margin-top:9px;color:#349beb;font-weight:bold;"><q-icon name="star" size="md" ></q-icon> <span style="font-size:17px;">Rate</span> </p>
                </div>
                <div class="col-2">
                    <p style="margin-top:10px;margin-bottom:-2px;color:lightgray;font-weight:bold;">Popularity</p>
                    <p style="margin-top:9px;"><q-icon name="trending_up" style="color:green;" size="md"></q-icon> <span style="color:White;font-size:16px;"  v-if="this.store.selectedInfo.ratings"> {{this.store.selectedInfo.ratings.metacritic}} - {{this.store.selectedInfo.ratings.rottenTomatoes}} </span></p>
                </div>
                </div>
            </div>
        </div>
        <div class="" align="center" >
            <q-card class="my-card" style="width:70%;">
                <q-card-section horizontal>
                    <q-img
                        class="col-4"
                        style="width:300px;"
                        :src="this.store.selectedInfo.image"
                        
                    />
                    <q-video :src="this.store.selectedInfo.trailer.linkEmbed" class="col-6" v-if="this.store.selectedInfo.trailer" style="width:65%;"/>
                    <div class="col-2" style="background-color:rgb(43, 43, 43);width:20%;margin-left:-12px;border:2px solid gray;" >
                        <div  class="row" style="margin-left:60px;margin-top:35%;">
                            <p><q-icon name="video_library" size="lg" style="color:lightgray;"></q-icon></p>
                            <p style="color:White;margin-left:4px;margin-top:8px;" v-if="this.store.selectedInfo.images">{{this.store.selectedInfo.images.items.length}} VIDEOS</p>
                        </div>
                        <hr style="margin-top:55px;">
                        <div class="row" style="margin-top:100px;margin-left:58px;">
                            <p><q-icon name="photo_library" size="lg" style="color:lightgray;"></q-icon></p>
                            <p style="color:White;margin-left:4px;margin-top:8px;" v-if="this.store.selectedInfo.posters">{{this.store.selectedInfo.posters.posters.length}} Images</p>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="row" align="center" style="margin-top:1%;">
           <div class="col-6">
                <div class="" style="margin-left:-130px;">
                    <q-btn class="glossy" rounded :label="data.key" style="color:White;background-color:rgb(43, 43, 43);margin-left:8px;" size="sm" v-for="data in this.store.selectedInfo.genreList" :key="data.key"/>
                </div>
                <div class="" style="margin-left:300px;margin-top:20px;text-align:justify;border-bottom:1px solid gray;">
                    <p style="font-weight:bold;color:White;font-size:16px;">{{this.store.selectedInfo.plot}}</p>
                </div>
                <q-separator vertical></q-separator>
                <div class="" style="margin-left:300px;margin-top:20px;text-align:justify;border-bottom:1px solid gray;">
                    <span style="color:White;font-weight:bold;font-size:16px;">Director </span><span style="color:#349beb;font-weight:bold;font-size:16px;margin-left:8px;" v-for="data in this.store.selectedInfo.directorList" :key="data.id" v-on:click="goActorForDetail(data)"><span style="color:white;margin:4px;">-</span> {{data.name}}</span>
                </div>
                <div class="" style="margin-left:300px;margin-top:20px;text-align:justify;border-bottom:1px solid gray;">
                     <span style="color:White;font-weight:bold;font-size:16px;">Writers  </span><span style="color:#349beb;font-weight:bold;font-size:16px;margin-left:8px;" v-for="data in this.store.selectedInfo.writerList" :key="data.id" v-on:click="goActorForDetail(data)"><span style="color:White;margin:6px;">-</span>{{data.name}}</span>
                </div>
                <div class="" style="margin-left:300px;margin-top:20px;text-align:justify;border-bottom:1px solid gray;margin-bottom:1.5%;">
                    <span style="color:White;font-weight:bold;font-size:16px;">Stars </span><span style="color:#349beb;font-weight:bold;font-size:16px;margin-left:8px;" v-for="data in this.store.selectedInfo.starList" :key="data.id" v-on:click="goActorForDetail(data)"><span style="color:White;margin:6px;">-</span>{{data.name}}</span>
                </div>
           </div>
           <div class="col-4">
                <div class="row">
                    <div class="col-10">
                        <q-btn  text-color="white" label="Add To Watch List" style="width:350px;background-color:#424242;font-weight:Bold;" icon="add" />
                    </div>
                    <div class="col-2">
                        <q-btn  text-color="white" style="width:50px;margin-left:-210%;background-color:#424242;" icon="expand_more"/>
                    </div>
                </div>
                <div class="" align="left" style="margin-left:80px;margin-top:10px;">
                    <p><q-icon name="military_tech" size="md" color="orange"></q-icon> <span style="font-size:16px;color:White;font-weight:bold;">{{this.store.selectedInfo.awards}}</span></p>
                </div>
                <div  class="" align="left" style="margin-left:80px;margin-top:10px;">
                   <span style="font-size:16px;color:white;font-weight:bold;margin-left:9px;">Languages </span><span v-for="data in this.store.selectedInfo.languageList" :key="data.key" style="font-weight:bold;color:#349beb;margin:6px;"> <span style="color:White;margin:6px;">-</span>{{data.key}}</span>
                </div>
                <div class="" align="left" style="margin-left:90px;margin-top:10px;">
                    <div class="row">
                        <div class="col-4">
                            <span style="font-size:13px;color:White;font-weight:bold;" v-if="this.store.userRatingsData.usUseres">{{this.store.userRatingsData.usUsers.votes}}</span><span style="font-size:13px;color:#349beb;font-weight:bold;margin-left:7px;">USA votes</span>
                        </div>
                        <div class="col-4">
                            <span style="font-size:13px;color:White;font-weight:bold;" v-if="this.store.userRatingsData.nonUSUsers">{{this.store.userRatingsData.nonUSUsers.votes}}</span><span style="font-size:13px;color:#349beb;font-weight:bold;margin-left:7px;">non Usa Votes</span>
                        </div>
                        <div class="col-4" >
                            <span style="padding:4px;background-color:green;text-align:center;color:White;font-weight:bold;">{{this.store.reviewsData.metacritic}}</span><span style="font-size:15px;font-weight:bold;margin-left:6px;color:White">Meta Score</span>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </div>
    <div class="thirdPage row" align="center" style="margin-top:1%;">
        <div class="col-8">
            <div class="" style="border:2px solid orange;width:50%;text-align:center;padding:8px;border-radius:4px;" v-for="data in this.awardsList" :key="data.id">
               <q-icon name="star" color="orange" size="sm"></q-icon> <span style="font-weight:bolder;font-size:13px;">{{data.awards}}</span> <span><q-icon name="chevron_right" size="sm" v-on:click="goMovieAwards(data)"></q-icon></span>

            </div>
            <div class="" style="width:50%;margin-top:30px;">
                <h4 align="left" style="border-left:4px solid orange;font-weight:bold;"><span style="margin-left:4px;">Photos</span> <span style="font-size:13px;" v-if="this.store.selectedInfo.posters">{{this.store.selectedInfo.posters.posters.length}}</span><span><q-icon name="chevron_right" size="lg"></q-icon></span></h4>
            <q-carousel
                animated
                v-model="slide"
                transition-prev="slide-right"
                transition-next="slide-left"
                arrows
                swipeable
                infinite
                padding
                autoplay="1000"
                class="bg-grey-1 shadow-2 rounded-borders"
                control-color="orange"
                v-if="this.store.selectedInfo.posters"
            >
                <q-carousel-slide v-for="(slide,index) in this.store.selectedInfo.images.items" :key="index" :name="index" class="column no-wrap flex-center">
                    <!--<div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                       <img :src="slide.link" alt="" class="sliderİmage" style="width:700px;height:300px;object-fit:cover;">
                        <img :src="slide.link" alt="" class="sliderİmage" style="width:700px;height:300px;object-fit:cover;">
                    </div>-->
                    <img :src="slide.image" alt="" class="sliderİmage" style="width:630px;height:100%;object-fit:cover;">
                </q-carousel-slide>
            </q-carousel>
            </div>
            <div class="" style="margin-top:30px;width:50%;">
                 <h4 align="left" style="border-left:4px solid orange;font-weight:bold;"><span style="margin-left:4px;">Top Cast</span></h4>
            </div>
            <div class="row" style="margin-top:30px;width:50%;">
                <div class="col-6">
                <q-card class="my-card" v-for="data in this.firstTopCast" :key="data.id" style="margin:3px;">
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar  style="width:60px;height:60px;">
                                <img :src="data.image" style="object-fit:cover;">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-on:click="goActorForDetail(data)">{{data.name}}</q-item-label>
                            <q-item-label caption>{{data.asCharacter}}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-card>
                </div>
                <div class="col-6">
                <q-card class="my-card" v-for="data in this.secondTopCast" :key="data.id" style="margin:3px;">
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar style="width:60px;height:60px;">
                                <img :src="data.image" style="object-fit:cover;">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label  v-on:click="goActorForDetail(data)">{{data.name}}</q-item-label>
                            <q-item-label caption>{{data.asCharacter}}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-card>
                </div>
            </div>
        </div>
        <div class="col-4" style="margin-top:-1.9%;">
            <div class="" style="margin-left:-180px;">
                 <h5 align="left" style="border-left:4px solid orange;font-weight:bold;"><span style="margin-left:4px;">More To Explore </span></h5>
            </div>
            <div class="row" style="margin-left:-150px;">
                <div class="col-4" v-for="data in this.randomActorImages" :key="data.id" style="margin-left:-110px;">
                    <img :src="data.image" alt="" style="width:140px;height:200px;object-fit:cover;border-radius:4px;">
                </div>
            </div>
            <div class="" style="margin-left:-200px;text-align:left;margin-top:10px;" >
                <p style="color:black;font-weight:bold;font-size:16px;">These Stars On The Rise</p>
                <p style="color:blue;font-weight:bold;font-size:16px;">See The Gallery <q-icon name="read_more" size="md" style="color:gray;"></q-icon></p>
            </div>
            <div class="" style="margin-left:-180px;">
                 <h5 align="left" style="border-left:4px solid orange;font-weight:bold;"><span style="margin-left:4px;">Directors </span></h5>
            </div>
            <div class="row" align="left"  style="margin-left:-180px;">
                <div class="" v-for="data in this.lastDirectorsList" :key="data.id" style="margin-left:5px;">
                <q-card class="my-card" style="width:200px;height:200px;">
                    <q-img  :src="data.image" style="height:300px;">
                        <div class="absolute-bottom text-subtitle2 text-center">
                            {{ data.name }} <q-icon name="info" size="md" v-on:click="goActorForDetail(data)"></q-icon>
                        </div>
                    </q-img>
                </q-card>
                </div>
            </div>
            <div class="" style="margin-left:-180px;margin-top:150px;">
                 <h5 align="left" style="border-left:4px solid orange;font-weight:bold;"><span style="margin-left:4px;">Writers </span></h5>
            </div>
            <div class="row" align="left"  style="margin-left:-180px;">
                <div class="" v-for="data in this.lastWriterList" :key="data.id" style="margin-left:5px;">
                <q-card class="my-card"  style="width:200px;height:200px;">
                    <q-img  :src="data.image" style="height:300px;">
                        <div class="absolute-bottom text-subtitle2 text-center">
                            {{ data.name }} <q-icon name="info" size="md" v-on:click="goActorForDetail(data)" ></q-icon>
                        </div>
                    </q-img>
                </q-card>
                </div>
            </div>
            <div class="row" style="margin-top:100px;">

            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import {useCounterStore} from "../stores/store"
export default {
    props:['id'],
    setup(){
        const store = useCounterStore()
        return{
            store
        }
    },
    data:function(){
        return{
            slide:"1",
            images:[],
            image:null,
            firstTopCast:[],
            secondTopCast:[],
            randomActorImages:[],
            lastDirectorsList:[],
            lastWriterList : [],
            awardsList:[]
        }
    },
    methods:{
        goMovieAwards(data){
            this.$router.push({name:'movieAwards',params:{id:data.id}})
        },
        async movieAwards(){
            this.awardsList = []
            this.awardsList.push({id:this.store.selectedInfo.id,awards:this.store.selectedInfo.awards})
            console.log('Awards :',this.awardsList)
        },
        async getWriterList(){
            this.lastWriterList = []
            const writerlist = this.store.selectedInfo.writerList
            writerlist.forEach(element => {
                fetch(`https://imdb-api.com/en/API/Name/k_ui7s57x4/${element.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const writers = data
                    ////console.log(directors)
                    this.lastWriterList.push({id:writers.id,image:writers.image,name:writers.name})
                    //console.log('DirectorsOnlyy :',this.lastWriterList)
                });
            });
        },
        async getDirectorList(){
            this.lastDirectorsList = []
            const directorList = this.store.selectedInfo.directorList
            ////console.log('Directors :',directorList)
            directorList.forEach(element => {
                fetch(`https://imdb-api.com/en/API/Name/k_ui7s57x4/${element.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const directors = data
                    ////console.log(directors)
                    this.lastDirectorsList.push({id:directors.id,image:directors.image,name:directors.name})
                    //console.log('Writers List :',this.lastDirectorsList)
                });
            });
        },
        async goActorForDetail(data){
            ////console.log(data)
             this.$router.push({name:'showSelectedActor',params:{id:data.id}})
        },
        async getUserRatings(){
            const res = await fetch(`https://imdb-api.com/en/API/UserRatings/k_ui7s57x4/${this.id}`)
            const data = await res.json()
            this.store.userRatingsData = data
            //console.log('User Ratings : ',this.store.userRatingsData)
        },
        async getRatings(){
            const res = await fetch(`https://imdb-api.com/en/API/Ratings/k_ui7s57x4/${this.id}`)
            const data  = await res.json()
            this.store.reviewsData = data
            //console.log('Ratings : ',this.store.reviewsData)
        },
        async getData(){
            const res = await fetch(`https://imdb-api.com/en/API/Title/k_ui7s57x4/${this.id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia`)
            const data = await res.json()
            this.store.selectedInfo = data
            console.log('Movie',this.store.selectedInfo)
            this.getRatings()
            this.getUserRatings()
            this.getDirectorList()
            this.getWriterList()
            this.movieAwards()
            const randomNumber = Math.floor(Math.random() * 45);
            this.image = this.store.selectedInfo.images.items[randomNumber].image

            const imageList = this.store.selectedInfo.actorList
            //console.log('Actor List :',imageList)

            //Random 3 image
            const actorListLength = this.store.selectedInfo.actorList.length
            const firstRandomNumber = Math.floor(Math.random() * actorListLength);
            if(firstRandomNumber>4){
                const secondRandomNumber =  firstRandomNumber-3
                const randomActorImages = imageList.slice(secondRandomNumber,firstRandomNumber)
                this.randomActorImages = randomActorImages
                //console.log('Random Images ',this.randomActorImages)
            }else if(firstRandomNumber<4){
                const secondRandomNumber = firstRandomNumber+3
                const randomActorImages = imageList.slice(firstRandomNumber,secondRandomNumber)
                this.randomActorImages = randomActorImages
                //console.log('Random Images ',this.randomActorImages)
            }
            //const slicedArray = array.slice(0, n);
            const firstTopActors = imageList.slice(0,6)
            this.firstTopCast = firstTopActors
            //console.log('Top First Cast',this.firstTopCast)
            const secondTopActors = imageList.slice(6,12)
            this.secondTopCast = secondTopActors
            //console.log('Top Second Cast',this.secondTopCast)

        }
    },
    created(){
    },
    mounted(){
        this.getData()
    }


}
</script>

<style scoped>
    .firstPage{
        background-color: black;
    }
    .secondPage{
        background-color: rgb(43, 43, 43);
    }
    .thirdPage{
        background-color:White;
    }
</style>