<template>
<div>
    <!--<q-card class="my-card" style="max-width:400px;" v-for="data in this.comingSoonData.items" :key="data.id" v-if="!this.trailer">
        <q-img
            class="col-5"
            :src="data.image"
            v-on:click="showTrailer(data)" 
            style="height:200px;"
        />

      <q-card-section>
        <div class="text-h6">{{data.fullTitle}}</div>
        <div class="text-subtitle2">{{data.title}}, {{data.year}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{data.releaseState}}
      </q-card-section>
    </q-card>-->
    <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        style="width:30%;height:300px;object-fit:contain;border-radius:4px;"
      >
        <q-carousel-slide v-for="slide in this.comingSoonData.items" :key="slide.id" :name="slide.rank" :img-src="slide.image" >
            <div class="q-mt-md text-center text-white">
                {{slide.title}}, {{slide.year}}
            </div>
        </q-carousel-slide>
      </q-carousel>
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
            comingSoonData:[],
            trailer:null,
            slide:"1"
        }   
    },
    methods:{
        async showTrailer(data){
            const titleid = data.id
            console.log(data)
            const res = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_ui7s57x4/${titleid}`)
            const resData = await res.json()
            this.trailer = resData
            console.log('Trailer Data',this.trailer )
        },
        async getComingSoon(){
            const res = await fetch(`https://imdb-api.com/en/API/Top250Movies/k_ui7s57x4`)
            const data = await res.json()
            this.comingSoonData = data
            console.log('Comings',this.comingSoonData)
        }
    },
    created(){
        this.getComingSoon()
    }
}
</script>

<style scoped>
    .zoomPage{
        margin-top:5%;
        padding:10px;
        background-color:gray;
        height: 60vh;
    }
</style>