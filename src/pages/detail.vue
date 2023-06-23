<template>
  <q-page class="flex-column" style="background-color:lightgray;">
    <div class="page" >
        <div class="row">
          <img src="../database/addphoto.jpg" alt="" style="width:920px;height:270px;border-radius:4px;margin:0 auto;object-fit:cover;">
        </div>
        <div class="row">
      <q-card class="my-card col-12" v-if="this.store.details.length!=0">
      <q-card-section>
        <div class="text-h6">{{this.store.headerFirst}}</div>
        <div class="text-h5 text-weight-bold">{{this.store.headerSecond}} <span style="margin-left:60%;position:Absolute;"><q-icon name="share" style="color:gray;" size="md"></q-icon></span></div>
        <div class="text-subtitle3">{{this.store.headerThird}}</div>
      </q-card-section>
  
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-center" style="font-size:15px;">Rank & Title</th>
            <th class="text-left" style="font-size:15px;">IMDb Rating</th>
            <th class="text-left" style="font-size:15px;">Your Rating</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody v-for="data in this.store.details" :key="data.id">
          <tr>
            <td class="text-left"><img :src="data.image" alt="" style="width:100px;height:100px;object-fit:contain;"></td>
            <td class="text-left" v-on:click="goForSelected(data)" v-if="!data.weekend"><span style="font-size:14px;font-weight:bold;">#{{data.rank}}</span> , {{data.fullTitle}}</td>
            <td class="text-left" v-if="data.weekend">{{data.title}}</td>
            <td class="text-left"><q-icon size="sm" name="star" color="orange"></q-icon> {{data.imDbRating}}</td>
            <td class="text-left"><q-icon name="star" size="sm" style="color:gray;"></q-icon></td>
            <td class="text-left"><q-icon name="bookmark_add" size="md" style="color:gray;"></q-icon></td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
    <box-office v-else/>
        </div>
    </div>
  </q-page>
</template>

<script>
import boxOffice from "../components/topboxoffice.vue"
import {useCounterStore} from "../stores/store"
export default {
  components:{
    boxOffice
  },
    setup(){
        const store = useCounterStore()
        return{
            store
        }
    },
    data:function(){
        return{
            details:[]
        }
    },
    methods:{
        async moreDetail(data){
            console.log(data)
            const dataid = data.id
            const res = await fetch(`https://imdb-api.com/en/API/Title/k_ui7s57x4/${dataid}/FullCast,Images,`)
            const resData = await res.json()
            this.store.moreDetail = resData
            console.log('More Detail',this.store.moreDetail)
            this.$router.push({name:'moreDetail'})
        },
        goForSelected(data){
          this.$router.push({name:'showSelected',params:{id:data.id}})
        }
    }
}
</script>

<style scoped>
    .page{
        padding:10px;
        background-color: white;
        width:50%;
        margin:0 auto;
    }
</style>