<template>
  <q-page class="flex-column">
    <div>
    <q-card class="my-card" style="margin-top:10px;">
      <q-card-section>
        <div class="text-h6">Top Box Office (US)</div>
        <div class="text-subtitle2">Weekend of August 12 - 14, 2022</div>
      </q-card-section>

      <q-markup-table>
        <thead >
          <tr >
            <th class="text-left"></th>
            <th class="text-left" style="font-size:16px;">Title</th>
            <th class="text-left" style="font-size:16px;">Weekend</th>
            <th class="text-left" style="font-size:16px;">Gross</th>
            <th class="text-left" style="font-size:16px;">Weeks</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody v-for="data in this.store.boxOfficeData.items" :key="data.id">
          <tr>
            <td class="text-left"><img :src="data.image" alt="" style="width:100px;height:100px;object-fit:contain;"></td>
            <td class="text-left" v-on:click="goForSelected(data)">{{data.title}}</td>
            <td class="text-left">{{data.weekend}}</td>
            <td class="text-left">{{data.gross}}</td>
            <td class="text-left">{{data.weeks}}</td>
            <td class="text-left"><q-icon name="bookmark_add" size="md" style="color:gray;"></q-icon></td>
          </tr>
        </tbody>
      </q-markup-table>
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
            
        }
    },
    methods:{
      goForSelected(data){
        this.$router.push({name:'showSelected',params:{id:data.id}})
      }
    }
}
</script>

<style scoped>

</style>