<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white q-pa-sm" height-hint="98" style="background-color:#141414;">
      <q-tabs align="center">
        <q-btn v-on:click="goHome"><img src="../database/headerlogo.png" alt="" style="width:70px;height:40px;"></q-btn>
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" label="Menü"/>
        <input type="text" style="border:1px solid yellow;width:34%;height:30px;border-radius:4px;margin-left:6px;" placeholder="Search IMDB" v-on:keyup.enter="searchAll">
        <q-route-tab to="/page1" label="IMDbPro" />
        <q-route-tab to="/page2"><q-btn icon="bookmark_add" label="WatchList"></q-btn></q-route-tab>
        <q-route-tab to="/page3" label="Sign ın" />
        <q-route-tab to="/page4"><q-btn icon-right="expand_more" label="en"></q-btn></q-route-tab>
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered :width="1918" style="background-color:#1c1c1c;">
      <div style="margin-left:25%;margin-top:1%;margin-right:18%;">
        <div class="row" style="margin-left:0%;">
          <img src="../database/headerlogo.png" alt="" style="width:80px;height:50px;">
          <q-btn icon="clear" size="md" style="background-color:orange;color:black;margin-left:80%;" rounded @click="toggleLeftDrawer"></q-btn>
        </div>
        <div class="row">
          <div class="col-4" style="margin-top:2%;">
            <div class="row"><q-icon name="theaters" size="sm" color="yellow"></q-icon><p style="font-size:23px;color:White;margin-top:0px;margin-left:8px;font-weight:Bolder;">Movies</p></div>
            <div style="font-size:16px;color:White;margin-left:15px;font-weight:bold;">
              <p>Release Calendar</p>
              <p v-on:click="showTop250Movie">Top 250 Movies</p>
              <p v-on:click="mostPopularMovies">Most Popular Movies</p>
              <p>Browse Movies By Genre</p>
              <p v-on:click="topBoxOffice">Top Box Office</p>
              <p>Showtimes & Tickets</p>
              <p>Movie News</p>
              <p>Indıa Movie Spotlight</p>
              </div>
          </div>
          <div class="col-4" style="margin-top:2%;">
            <div class="row"><q-icon name="tv" size="sm" color="yellow"></q-icon><p style="font-size:23px;color:White;margin-top:0px;margin-left:10px;font-weight:Bolder;">Tv Shows</p></div>
            <div style="font-size:16px;color:White;font-weight:bold;">
              <p>What's on TV & Streaming</p>
              <p>Top 250 TV Shows</p>
              <p>Most Popular TV Shows</p>
              <p>Browse TV Shows By Genre</p>
              <p>TV News</p>
              <p>India TV Spotlight</p>
            </div>
            <div class="row" style="margin-top:25px;"><q-icon name="slideshow" size="sm" color="yellow"></q-icon><p style="font-size:23px;color:White;margin-top:0px;margin-left:10px;font-weight:Bolder;">Watch</p></div>
            <div style="font-size:16px;color:White;font-weight:bold;margin-left:25px;">
              <p>What To Watch</p>
              <p>Latest Trailer</p>
              <p>IMDb Originals</p>
              <p>IMDb Picks</p>
              <p>IMDb Podcasts</p>
            </div>
          </div>
          <div class="col-4" style="margin-top:2%;">
            <div class="row"><q-icon name="military_tech" color="yellow" size="md"></q-icon><p style="font-size:23px;color:White;margin-top:0px;margin-left:10px;font-weight:Bolder;">Awards & Events</p></div>
            <div style="font-size:16px;color:white;font-weight:bold;">
              <p>Oscars</p>
              <p>Best Picture Winners</p>
              <p>Emmys</p>
              <p>STARmeter Awards</p>
              <p>San Diego Comic-Con</p>
              <p>New York Comic-Con</p>
              <p>Sundance Film Festival</p>
              <p>Toronto Int'I Film Festival</p>
              <p>Awards Central</p>
              <p>Festival Central</p>
              <p>All Events</p>
            </div>
          </div>  
        </div>
        <div class="row">
          <div class="col-6">
            <div class="row"><q-icon name="supervisor_account" size="sm" color="yellow"></q-icon><p style="font-size:23px;color:White;margin-top:0px;margin-left:8px;font-weight:Bolder;">Celebs</p></div>
            <div style="font-size:16px;color:White;font-weight:bold;">
              <p>Born Today</p>
              <p>Most Popular Celebs</p>
              <p>Celebrity News</p>
            </div>
          </div>
          <div class="col-6" style="margin-left:67%;margin-top:-15%;">
            <div class="row"><q-icon name="public" size="sm" color="yellow"></q-icon><p style="font-size:23px;color:White;margin-top:0px;margin-left:8px;font-weight:Bolder;">Community</p></div>
            <div style="font-size:16px;color:White;font-weight:bold;">
              <p>Help Center</p>
              <p>Contributor Zone</p>
              <p>Polls</p>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import {useCounterStore} from "../stores/store"
export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const store = useCounterStore()
    return {
      store,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data:function(){
    return{
      query:null
    }
  },
  methods:{
    async topBoxOffice(){
      this.store.details = []
      const res = await fetch(`https://imdb-api.com/en/API/BoxOffice/k_ui7s57x4`)
      const data = await res.json()
      this.store.boxOfficeData = data
      console.log('Top Box Office : ',this.store.boxOfficeData)
      this.$router.push({name:'detail'})
    },
    async searchAll(event){
      this.store.boxOfficeData = []
      this.store.namesList = []
      this.store.titlesList = []
      this.query = event.target.value
      const res = await fetch(`https://imdb-api.com/en/API/SearchAll/k_ui7s57x4/${this.query}`)
      const data = await res.json()
      this.store.searchResult = data
      console.log('Search Result :',this.store.searchResult)
      this.$router.push({name:'searchResult'})
    },
    goHome(){
      this.$router.push({name:'home'})
    },
    async mostPopularMovies(){
      this.store.boxOfficeData = []
      const res = await fetch(`https://imdb-api.com/en/API/MostPopularMovies/k_ui7s57x4`)
      const data = await res.json()
      this.store.details = data.items
      this.store.headerFirst = 'IMDb Charts'
      this.store.headerSecond = 'IMDb Most Popular Movies'
      this.store.headerThird = 'IMDb Most Popular Movies by regular IMDb voters'
      console.log('Most Popular Movies :',this.store.mostPopularMovies)
      this.$router.push({name:'detail'})
    },
    async showTop250Movie(){
      this.store.boxOfficeData = []
      const res = await fetch(`https://imdb-api.com/en/API/Top250Movies/k_ui7s57x4`)
      const data = await res.json()
      this.store.details = data.items
      this.store.headerFirst = 'IMDb Charts'
      this.store.headerSecond = 'IMDb Top 250 Movies'
      this.store.headerThird = 'IMDb Top 250 as rated by regular IMDb voters.'
      console.log('Top 250 Movie',this.store.details)
      this.$router.push({name:'detail'})
    }
  }
}
</script>