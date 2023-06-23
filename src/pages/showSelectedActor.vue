<template>
  <q-page class="flex-column allPage"> 
    <div class="mainDiv">
        <div class="row">
            <div class="col-8">
                <div class="q-pa-md">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6 q-mb-xs text-weight-bold">{{this.store.selectedInfo.name}}</div>
                                <div class="row no-wrap items-center">
                                    <span class="text-caption text-blue text-weight-bold">{{this.store.selectedInfo.role}}</span>
                                </div>
                        </q-card-section>
                        <q-card-section horizontal>
                            <div class="absolute-center text-subtitle2 text-center text-white text-weight-bold" style="margin-left:70px;">
                                <q-btn icon="play_arrow" size="lg" style="color:black;background-color:white;" round v-on:click="goTrailer(image)"></q-btn>
                            </div>
                            <img :src="this.store.selectedInfo.image" class="col-3" style="height:250px;object-fit:cover;">
                            <div v-for="data in this.image" :key="data.id">
                                <img :src="data.image" class="col-9" style="height:250px;object-fit:cover;margin-left:2px;width:480px;" v-on:click="goTrailer(data)">
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <div class="text-subtitle2 text-black text-weight-bold" style="text-align:justify;">{{this.store.selectedInfo.summary}}</div>
                            <div class="text-subtitle2" style="font-weight:1000;color:black;font-size:15px;margin-top:8px;">Born : <span style="color:#349beb;">{{this.store.selectedInfo.birthDate}}</span></div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="" align="center" style="border:3px solid #c9c977;width:90%;margin:0 auto;margin-bottom:15px;background-color:#e3e391;">
                    <p style="color:White;font-weight:bold;font-size:15px;margin-top:12px;" v-for="data in this.awardsInfo" :key="data.id">{{data.awards}} <span style="color:#349beb;cursor:grab;" v-on:click="goAwards(data)"> See More Awards <q-icon name="read_more" size="md" style="color:gray;"></q-icon></span></p>
                </div>

                <div class="" style="border:0.2px solid lightgray;border-radius:4px;margin-left:13px;">
                    <h5 style="margin-top:10px;margin-bottom:10px;margin-left:10px;">Photos</h5>
                    <div class="row">
                        <div class="col-2" v-for="data in this.randomİmageList" :key="data.image">
                            <img :src="data.image" alt="" style="width:100px;height:130px;object-fit:cover;border-radius:4px;">
                        </div>
                    </div>
                   <p v-if="this.movieInfoData.images" style="margin-left:6px;"><span><q-icon name="reorder" size="sm" style="color:lightgray;"></q-icon></span><span style="margin-left:6px;font-weight:bold;">{{this.movieInfoData.images.items.length}} Photos</span></p>
                </div>
                <div class="" style="border:0.2px solid lightgray;border-radius:4px;margin-left:13px;margin-top:10px;">
                    <h5 style="margin-top:10px;margin-bottom:10px;margin-left:10px;">Known For</h5>
                    <div class="row">
                        <div class="col" v-for="data in this.store.selectedInfo.knownFor" :key="data.id">
                            <img :src="data.image" alt="" style="width:150px;height:200px;object-fit:cover;border-radius:4px;" v-on:click="goTrailer(data)">
                            <p align="center">{{data.title}}, {{data.year}}</p>
                        </div>
                    </div>
                </div>
                <!--<div class="">
                    <div v-for="(value,name) in this.uniqueList" :key="name" v-on:click="showMore(value)">
                        <q-btn size="md" color="dark" :label="value"></q-btn> 
                    </div>
                    <p v-for="movie in this.moviesForRole" :key="movie.id" v-if="this.moviesForRole.length!=0">{{movie.title}}, {{movie.role}}</p>   
                </div>-->
                <div class="q-pa-md">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6">Fılmography</div>
                            <div class="text-subtitle2" style="display:inline-block;">Jump To :<span v-for="(value,name) in this.uniqueList" :key="name" style="margin-left:4px;color:#349beb;">{{value}}</span></div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions vertical>
                            <q-select
                                filled
                                :model-value="this.type"
                                input-debounce="0"
                                label="Simple filter"
                                :options="this.uniqueList"
                                @filter="typeResultFilter"
                                @update:model-value="typeResult"
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                                <template v-slot:before><q-btn icon="delete" color="red" size="md" v-on:click="clearMoviesForRole"></q-btn></template>
                            </q-select>
                        </q-card-actions>
                        <q-slide-transition>
                            <div v-if="this.moviesForRole.length!=0">
                                <q-separator />
                                <q-card-section>
                                    <div class="text-subtitle2" v-for="data in this.moviesForRole" :key="data.id" style="border:0.5px solid lightgray;margin:3px;border-radius:4px;padding:10px;font-weight:bold;">Title : <span style="color:#349beb;font-weight:bold;font-size:15px;cursor:grab;" v-on:click="goTrailer(data)"> {{data.title}}</span> Role : <span style="color:dark;font-weight:bold;font-size:14px;color:#349beb;">{{data.role}}</span> <span v-if="data.year">Year :</span> <span style="color:dark;font-weight:bold;font-size:14px;color:#349beb;">{{data.year}}</span> Description : <span style="color:dark;font-weight:bold;font-size:14px;color:#349beb;">{{data.description}}</span></div>
                                </q-card-section>
                            </div>
                        </q-slide-transition>
                    </q-card>
                </div>
            </div>
            <div class="col-2">

            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import {useCounterStore} from '../stores/store'
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
            image:[],
            randomİmageList:[],
            movieInfoData:[],
            newList:[],
            uniqueList:[],
            moviesForRole:[],
            type:null,
            awardsInfo:[]
        }
    },
    methods:{
        async goAwards(data){
            //console.log(data)
            this.$router.push({name:'awards',params:{id:data.id}})
        },
        clearMoviesForRole(){
            this.moviesForRole = []
        },
        async typeResult(val){
            this.moviesForRole = []
            this.type = val
            //console.log(this.type)
            const castMovies = this.store.selectedInfo.castMovies
            castMovies.forEach(element => {
                if(element.role==val){
                    this.moviesForRole.push(element)
                    //console.log('Role Of ',this.moviesForRole)
                }
            });
            console.log('Role Of ',this.moviesForRole)
        },
        async showMore(value){
            this.moviesForRole = []
            console.log(value)
            const castMovies = this.store.selectedInfo.castMovies
            castMovies.forEach(element => {
                if(element.role==value){
                    this.moviesForRole.push(element)
                    console.log('Role Of ',this.moviesForRole)
                }
            });
        },
        async roleTypes(){
            this.newlist=[]
            //var myArray = ['a', 1, 'a', 2, '1'];
            //var unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
            ////console.log(unique); // unique is ['a', 1, 2, '1']
            //list.filter((v,i) => !list.includes(v,i+1))
            const listType = this.store.selectedInfo.castMovies
            listType.forEach(element => {
                if(!(element.role in this.newList)){
                    this.newList.push(element.role)
                    ////console.log(this.newList)
                    this.uniqueList = [...new Set(this.newList)];
                    //console.log('Unique :',this.uniqueList)
                }
            });
        },
        async getMovieInfo(){
            const movieid = this.image[0].id
            const res = await fetch(`https://imdb-api.com/en/API/Title/k_ui7s57x4/${movieid}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`)
            const data = await res.json()
            this.movieInfoData = data
            const lengthData = data.images.items.length
            const randomNumber = Math.floor(Math.random() * lengthData);
            const imageList = data.images.items
            if(randomNumber>10){
                const secondNumber = randomNumber-6
                this.randomİmageList = imageList.slice(secondNumber, randomNumber);
                //console.log('Random İmage List :',this.randomİmageList)
            }else if(randomNumber<10){
                const secondNumber = randomNumber+6
                this.randomİmageList = imageList.slice(randomNumber,secondNumber)
                //console.log('Random İmage List :',this.randomİmageList)
            }
            ////console.log('Movie Info ',data)
        },
        async castMoviesRandomPhoto(){
            //const slicedArray = array.slice(0, n);
            const lengthData = this.store.selectedInfo.castMovies.length
            const randomNumber = Math.floor(Math.random() * lengthData);
            const imageList = this.store.selectedInfo.castMovies
            if(randomNumber>10){
                const secondNumber = randomNumber-6
                this.randomİmageList = imageList.slice(secondNumber, randomNumber);
                ////console.log('Random İmage List :',this.randomİmageList)
            }else if(randomNumber<10){
                const secondNumber = randomNumber+6
                this.randomİmageList = imageList.slice(randomNumber,secondNumber)
                ////console.log('Random İmage List :',this.randomİmageList)
            }
        },
        async goTrailer(image){
            ////console.log(image)
            this.$router.push({name:'trailer',params:{id:image.id}})
        },
        async goTrailer(data){
            ////console.log(data)
            this.$router.push({name:'trailer',params:{id:data.id}})
        },
        async getRandomMovieData(){
            const lengthData = this.store.selectedInfo.knownFor.length
            const randomNumber = Math.floor(Math.random() * lengthData);
            this.image.push(this.store.selectedInfo.knownFor[randomNumber])
            //console.log(this.image)
        },
        async getActorData(){
            this.awardsInfo = []
            const res = await fetch(`https://imdb-api.com/en/API/Name/k_ui7s57x4/${this.id}`)
            const data = await res.json()
            this.store.selectedInfo = data  
            this.awardsInfo.push({id:this.store.selectedInfo.id,awards:this.store.selectedInfo.awards})
            console.log('Awards',this.awardsInfo)
            console.log('Actor Detail',this.store.selectedInfo)
            this.getRandomMovieData()
            this.getMovieInfo()
            this.roleTypes()
            //this.castMoviesRandomPhoto()
        },
    },
    mounted(){
        this.getActorData()
    }
}
</script>

<style scoped>
    .allPage{
        background-color:rgb(194, 194, 194);
    }
    .mainDiv{
        width:53%;
        background-color:white;
        margin:0 auto;
    }
</style>