<template>
  <q-page class="flex-column allPage">
    <div class="page">
       <div class="row">
            <img src="../database/addphoto.jpg" alt="" style="width:80%;height:300px;object-fit:cover;border-radius:4px;margin:0 auto;">
       </div>
       <div class="row resultDiv" style="display:block;margin-top:10px;">
            <div class="row" style="color:black;font-weight:bold;">
                Results for " {{this.store.searchResult.expression}} "
            </div>
            <div class="row">
                <p style="font-size:12px;">Jump To<span style="color:blue;"> Names</span> | <span style="color:blue;">Titles</span></p>
            </div>
            <div class="row" style="display:block;">
                <p style="font-weight:bolder;color:brown;font-size:16px;" class="row">Names</p>
                <q-card class="my-card" v-for="data in this.store.namesList" :key="data.id" style="margin-top:2px;"> 
                    <q-card-section horizontal>
                        <q-img
                            class="col-5"
                            :src="data.image"
                            style="width:50px;object-fit:contain;"
                        />
                        <q-card-section>
                            <span style="color:blue;" v-on:click="showMore(data)">{{data.title}}</span>, {{data.description}}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                </q-card>
            </div>
            <div class="row" style="display:block;margin-top:20px;">
                 <p style="font-weight:bolder;color:brown;font-size:16px;" class="row">Titles</p>
                <q-card class="my-card" v-for="data in this.store.titlesList" :key="data.id" style="margin-top:2px;"> 
                    <q-card-section horizontal>
                        <q-img
                            class="col-5"
                            :src="data.image"
                            style="width:50px;object-fit:contain;"
                        />
                        <q-card-section>
                            <span style="color:blue;" v-on:click="showMore(data)">{{data.title}}</span>, {{data.description}}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                </q-card>
            </div>
       </div>
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
            namesList:[],
            titlesList:[]
        }
    },
    methods:{
        showMore(data){
            console.log(data)
            if(data.resultType=='Title'){
                this.$router.push({name:'showSelected',params:{id:data.id}})
            }else if(data.resultType=='Name'){
                this.$router.push({name:'showSelectedActor',params:{id:data.id}})
            }
            
        },
        filterSearch(){
            const newList = this.store.searchResult.results
            newList.forEach(element => {
                if(element.resultType=='Name'){
                    this.store.namesList.push(element)
                }else if(element.resultType=='Title'){
                    this.store.titlesList.push(element)
                }
            });
        }
    },
    created(){
        this.filterSearch()
    },
    watch:{
        'store.searchResult':function(){
            if(this.store.searchResult.length!=0){
                this.filterSearch()
            }
        }
    }
}
</script>

<style scoped>
    .allPage{
        background-color:lightgray;
    }
    .page{
        background-color: white;
        padding:10px;
        width:60%;
        margin:0 auto;
    }
    .resultDiv{
        padding:10px;
        border: 0.5px solid lightgray;
        border-radius: 10px;
        width:60%;
    }
</style>