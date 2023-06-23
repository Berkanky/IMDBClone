<template>
  <div>
    <div class="row">
        <h3 style="color:white;font-size:28px;font-weight:bold;">WatchList  <q-icon name="chevron_right" size="md" color="white"></q-icon></h3>

    </div>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-2" v-for="data in this.store.watchList" :key="data.id" style="margin-left:4px;">
                <q-card class="my-card" style="width:300px;">
                    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" style="height:300px;">
                        <div class="absolute-bottom text-subtitle2 text-center">
                        {{data.title}}, {{data.year}}
                        </div>
                    </q-img>
                    <q-card-actions>
                        <q-btn icon="clear" color="red" size="md" v-on:click="deleteData(data)" class="full-width"></q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
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

        }
    },
    methods:{

        //      await axios.delete(`http://localhost:3004/addedPosts/${row.id}`).then(resDeleteAdded=>{
        //if(resDeleteAdded.status===200){
          //this.store.addedData = this.store.addedData.filter(b=>b.id!=row.id)
        //}
      //})
        async deleteData(data){
            await axios.delete(`http://localhost:3004/watchList/${data.id}`).then(res=>{
                if(res.status===200){
                    this.store.watchList = this.store.watchList.filter(b=>b.id!=data.id)
                }
            })
        },
        async getData(){
            const res = await axios.get('http://localhost:3004/watchList')
            this.store.watchList = res.data
            console.log('WatchList',this.store.watchList)
        },
    },
    created(){
        //setInterval(()=>{
          //  this.getData()
        //},10000)
        this.getData()
    }
}
</script>

<style>

</style>