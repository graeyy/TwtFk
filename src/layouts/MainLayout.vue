<template>
  <q-layout view="lHr lpR fFf" >

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{$route.name}}</span>
          <q-icon
            class="q-pa-md lt-md header-icon"
            name="fas fa-dove"
            size="sm"
            color="primary"
          />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above 
      v-model="leftDrawerOpen" 
      side="left" 
      bordered
      :width="283"
    >
      
      <q-icon
        class="q-pa-md"
        name="fas fa-dove"
        size="lg"
        color="primary"
      />
      <!-- list -->
      <q-list>
        
        <!--//*HOME-->
        <q-item 
          clickable v-ripple
          to="/"
          active-class="my-menu-active"
          exact
        >
          <q-item-section avatar>
            <q-icon color="black" name="home" size="md"/>
          </q-item-section>

          <q-item-section class="text-h6 text-weight-medium">Home</q-item-section>
        </q-item>       
        
        <!--//*EXPLORE-->
        <q-item 
          clickable v-ripple
          to="/explore"
          active-class="my-menu-active"
          exact
        >
          <q-item-section avatar>
            <q-icon color="grey-8" name="tag" size="md"/>
          </q-item-section>

          <q-item-section class="text-h6 text-weight-medium">Explore</q-item-section>
        </q-item>        

      </q-list>

    </q-drawer>

    <!-- RIGHT DRAWER CONTENT -->
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- SEARCH BAR -->
      <q-input 
        class="q-ma-md"
        placeholder="Search Twitter"
        rounded
        outlined
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" color="primary"/>
        </template>
      </q-input>

      <!-- TRENDS LIST -->
      <q-toolbar class="bg-white text-white">
        <q-toolbar-title 
          class="text-h7 text-weight-bolder text-black"
        >
          Trends for you
        </q-toolbar-title>
      </q-toolbar>

      <!--// TODO: make dynamic; see https://quasar.dev/vue-components/list-and-list-items#more-involved-examples -->
      <q-list>
        
        <q-item 
          clickable 
          class="q-pa-md"
        >
          <q-item-section>
            <q-item-label caption>
              K-pop · Trending
            </q-item-label>
            <q-item-label>Hyewon</q-item-label>
            <q-item-label caption>
              21.6k Tweets
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="text-black">
              <q-btn flat dense round icon="more_horiz"/>
            </div>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          class="q-pa-md"
        >
          <q-item-section>
            <q-item-label caption>
              Trending in Philippines
            </q-item-label>
            <q-item-label>Mindanao</q-item-label>
            <q-item-label caption>
              4,165 Tweets
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="text-black">
              <q-btn flat dense round icon="more_horiz"/>
            </div>
          </q-item-section>
        </q-item>

      </q-list>


    </q-drawer>

    <q-page-container >
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="sass">

.header-icon 
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)

.my-menu-active
  font-weight: bold
  color: black

.main-wrapper
  max-width: 60vw
  margin-left: auto
  margin-right: auto
</style>