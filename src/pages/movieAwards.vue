<template>
  <q-page class="flex-column" style="background-color:lightgray;">
    <div class="secondPage">
        <div class="row">
            <div class="col-8">
                <div class="q-pa-md">
                    
                    <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                            <q-img
                                class="col-2"
                                style="height:150px;"
                                :src="this.movieData.image"
                            />
                            <q-card-section>
                                <div class="text-subtitle2" v-for="data in this.nameData" :key="data.id" style="font-weight:bold;font-size:18px;color:#349beb;" v-on:click="goMovie(data)">{{data.name}}</div>
                                <div class="text-h6 text-weight-bold" style="font-size:25px;">Awards</div>
                            </q-card-section>
                        </q-card-section>
                        <q-card-section>
                            <div class="text-subtitle2" style="padding:5px;background-color:beige;border-radius:4px;font-weight:bold;text-align:center;">{{this.movieAwardsData.description}}</div>
                        </q-card-section>
                        <q-card-actions>
                            <q-select
                                filled
                                v-model="this.eventType"
                                input-debounce="0"
                                label="Simple filter"
                                :options="this.eventListData"
                                @update:model-value="getEventType"
                                style="width:100%;"
                                >
                                <template v-slot:before><q-btn icon="clear" color="red" size="md" v-on:click="clearEvents"></q-btn></template>
                             </q-select>
                        </q-card-actions>
                        <q-slide-transition>
                            <div  v-if="this.eventsTitleForType.length!=0">
                                <q-separator />
                                <q-card-section class="text-subitle2">
<!-- <div class="text-subtitle2" style="border:0.5px solid lightgray;border-radius:4px;padding:10px;font-weight:bold;font-size:15px;color:dark;" v-for="(data) in this.eventsTitleForType[0]" :key="data.outcomeDetails[0].plainText"><span style="font-weight:bold;font-size:16px;">Category :</span><span style="color:#349beb;font-weight:bold;margin-left:3px;"> {{data.outcomeCategory}}</span> <span style="font-weight:bold;font-size:16px;">, Title : </span><span style="color:#349beb;margin-left:3px;"><span>{{data.outcomeTitle}}</span><span style="color:black;margin-left:2px;">({{data.outcomeCategory}})</span></span> <span style="font-weight:bold;font-size:15px;"> , Description : </span><span style="font-weight:bold;font-size:16px;margin-left:4px;color:#349beb;">{{data.outcomeDetails[0].plainText}}</span></div>-->
                                   <q-card class="my-card">
                                          <q-card-section>
                                                <div class="text-h6">{{this.eventType}}</div>
                                            </q-card-section>
                                        <q-markup-table>
                                            <thead>
                                            </thead>
                                            <tbody v-for="(data) in this.eventsTitleForType[0]" :key="data.outcomeTitle">
                                                <tr>
                                                    <td class="text-left text-weight-bold" style="font-size:15px;">{{data.outcomeTitle}}</td>
                                                    <td class="text-right" style="display:block;text-align:justify;font-weight:bold;font-size:15px;" v-for="dat in data.outcomeDetails" :key="dat.plainText"><span style="margin-left:50px;">{{dat.plainText}}</span></td>
                                                </tr>
                                            </tbody>
                                        </q-markup-table>
                                    </q-card>
                                </q-card-section>
                            </div>
                        </q-slide-transition>
                    </q-card>
                        
                </div>
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
            movieAwardsData:[],
            movieData:[],
            nameData:[],
            eventListData : [],
            eventsTitleForType: [],
            eventType:null
        }
    },
    methods:{
        goMovie(data){
            this.$router.push({name:'showSelected',params:{id:data.id}})
        },
        clearEvents(){
            this.eventsTitleForType = []
        },
        getEventType(val){
            this.eventsTitleForType = []
            this.eventType = val
            const newList = this.movieAwardsData.items
            newList.forEach(element => {
                if(element.eventTitle==val){
                    this.eventsTitleForType.push(element.outcomeItems)
                }
            });
            console.log('Specific Events ',this.eventsTitleForType)
        },
        eventList(){
            const listType = this.movieAwardsData.items
            listType.forEach(element => {
                if(!(element.eventTitle in this.eventListData)){
                    this.eventListData.push(element.eventTitle)
                    this.eventListData = [...new Set(this.eventListData)]
                }
            });
            console.log('Unique EVent Titles',this.eventListData)
        },
        nameForLoop(){
            this.nameData = []
            this.nameData.push({id:this.movieData.id,name:this.movieData.fullTitle})
            console.log('Name',this.nameData)
        },
        async getMovieAwards(){
            const res = await fetch(`https://imdb-api.com/en/API/Awards/k_ui7s57x4/${this.id}`)
            const data = await res.json()
            this.movieAwardsData = data
            console.log('Movie Awards :',this.movieAwardsData)

            this.getMovieData()
            
        },
        async getMovieData(){
            const res = await fetch(`https://imdb-api.com/en/API/Title/k_ui7s57x4/${this.id}`)
            const data = await res.json()
            this.movieData = data
            console.log('Movie Info ',this.movieData)
            this.nameForLoop()
            this.eventList()
        }   
    },
    mounted(){
        this.getMovieAwards()
    }
}
</script>

<style scoped>
    .secondPage{
        padding:10px;
        background-color:white;
        width:60%;
        margin:0 auto;
    }
</style>