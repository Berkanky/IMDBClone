<template>
  <q-page class="flex-column">
    <div>
        <p>{{this.store.moreDetail.directors.items}}</p>
    </div>
    <div class="row">
    <q-card class="my-card col-3" v-for="data in this.store.moreDetail.actorList" :key="data.id" style="width:40%;">
      <q-img :src="data.image" >
        <div class="absolute-bottom text-subtitle2 text-center" v-on:click="showImage(data)">
          {{data.name}}
        </div>
      </q-img>
    </q-card>
    </div>
  </q-page>
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
            nameData:[],
            image:null
        }
    },
    methods:{
        async showImage(data){
            console.log(data)
            const dataid = data.id
            const res = await fetch(`https://imdb-api.com/en/API/Name/k_ui7s57x4/${dataid}`)
            const resData = await res.json()
            this.nameData = resData
            console.log(this.nameData)
            this.image = this.nameData.image
        }
    },
    created(){
    }
}
</script>

<style scoped>

</style>