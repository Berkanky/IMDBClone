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
                                :src="this.actorDetail.image"
                            />
                            <q-card-section>
                                <div class="text-subtitle2" v-for="data in this.nameForLoop" :key="data.id" style="font-weight:bold;font-size:18px;color:#349beb;cursor:grab;" v-on:click="goForActor(data)">{{data.name}}</div>
                                <div class="text-h6 text-weight-bold" style="font-size:25px;">Awards</div>
                            </q-card-section>
                        </q-card-section>
                        <q-card-section>
                            <div class="text-subtitle2" style="padding:5px;background-color:beige;border-radius:4px;font-weight:bold;text-align:center;">{{this.awardsData.description}}</div>
                        </q-card-section>
                        <q-card-actions>
                            <q-select
                                filled
                                v-model="this.eventType"
                                input-debounce="0"
                                label="Simple filter"
                                :options="this.newList"
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
                                    <div class="text-subtitle2" style="border:0.5px solid lightgray;border-radius:4px;padding:10px;font-weight:bold;font-size:15px;color:dark;" v-for="data in this.eventsTitleForType[0]" :key="data.outcomeYear"><span style="font-weight:bold;font-size:16px;">Year :</span><span style="color:#349beb;font-weight:bold;margin-left:3px;"> {{data.outcomeYear}}</span> <span style="font-weight:bold;font-size:16px;">, Title : </span><span style="color:#349beb;margin-left:3px;"><span>{{data.outcomeTitle}}</span><span style="color:black;margin-left:2px;">({{data.outcomeCategory}})</span></span> <span style="font-weight:bold;font-size:15px;"> , Description : </span><span style="font-weight:bold;font-size:16px;margin-left:4px;color:#349beb;">{{data.outcomeDetails[0].plainText}}</span></div>
                                </q-card-section>
                            </div>
                        </q-slide-transition>
                    </q-card>
                </div>
            </div>
            <div class="col-4">

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
            awardsData:[],
            actorDetail:[],
            nameForLoop:[],
            newList : [],
            eventType:null,
            eventsTitleForType:[]
        }
    },
    methods:{
        goForActor(data){
            this.$router.push({name:'showSelectedActor',params:{id:data.id}})
        },
        clearEvents(){
            this.eventsTitleForType = []
        },
        getEventType(val){
            this.eventsTitleForType = []
            this.eventType = val
            //console.log(this.eventType)
            const newList = this.awardsData.items
            newList.forEach(element => {
                if(element.eventTitle==val){
                    this.eventsTitleForType.push(element.outcomeItems)
                }
            });
            console.log('Specific Events ',this.eventsTitleForType)
        },
        roleTypes(){
            this.newlist=[]
            //var myArray = ['a', 1, 'a', 2, '1'];
            //var unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
            ////console.log(unique); // unique is ['a', 1, 2, '1']
            //list.filter((v,i) => !list.includes(v,i+1))
            const listType = this.awardsData.items
            listType.forEach(element => {
                if(!(element.eventTitle in this.newList)){
                    this.newList.push(element.eventTitle)
                    ////console.log(this.newList)
                    this.newList = [...new Set(this.newList)];
                    //console.log('Unique :',this.uniqueList)
                }
            });
            console.log('Unique EVent Titles',this.newList)
        },
        async getNameInfoData(){
            const res = await fetch(`https://imdb-api.com/en/API/Name/k_ui7s57x4/${this.id}`)
            const data = await res.json()
            this.actorDetail = data
            console.log('Actor Detail',this.actorDetail)
        },
        async getAwardsData(){
            this.nameForLoop = []
            const res = await fetch(`https://imdb-api.com/en/API/NameAwards/k_ui7s57x4/${this.id}`)
            const data = await res.json()
            this.awardsData = data
            console.log('Awards ',this.awardsData)

            this.nameForLoop.push({id:this.awardsData.imDbId,name:this.awardsData.name})
            console.log('NameForLoop',this.nameForLoop)
            this.getNameInfoData()
            this.roleTypes()
        }
    },
    async mounted(){
        this.getAwardsData()
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