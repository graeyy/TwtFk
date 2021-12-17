<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      
      <div class="q-py-lg q-px-lg row items-end 
      q-col-gutter-md">
        <div class="col">
          <q-input 
            class="new-twt"
            bottom-slots 
            v-model="newTwtContent" 
            placeholder="What's happening?" 
            counter maxlength="280" 
            autogrow        
            >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://i.ibb.co/zS14kx8/avatar-yul.jpg">
              </q-avatar>
            </template>
          </q-input>

        </div>
        <div class="col col-shrink q-mb-md">

          <q-btn 
            @click="addNewTwt"
            :disable="!newTwtContent"
            unelevated rounded 
            color="primary" 
            label="Tweet" 
            no-caps
          />
        </div>      
      </div>

      <q-separator 
        class="twt-divider" 
        size="8px" 
        color="grey-2"
      />

      <!--//*Twt List-->
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animate__animated animate__fadeIn animate__slower"
          leave-active-class="animate__animated animate__fadeOut animate__slower"
        >

          <q-item 
            v-for="twt in twts"
            :key="twt.date"
            class="q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://www.dropbox.com/s/puiys1tihpggzqj/avatar_yul.jpg?raw=1">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>yultide</strong> 
                <span class="text-grey-7">
                  @zo_glass
                  &bull; {{ getRelDate(twt.date) }} ago
                </span>
              </q-item-label>
              <q-item-label class="twt-content text-body1">
                {{twt.content}}
                </q-item-label>
                <div class="row justify-between q-mt-sm twt-icons">
                  <q-btn
                    color="grey-5"
                    icon="far fa-comment"
                    size="sm"
                    flat 
                    round
                  />

                  <q-btn
                    color="grey-5"
                    icon="fas fa-retweet"
                    size="sm"
                    flat 
                    round
                  />

                  <q-btn
                    @click="likeTwt(twt)"
                    :icon="twt.liked ? 'fas fa-heart' : 'far fa-heart'"
                    :color="twt.liked ? 'pink' : 'grey-5'"
                    size="sm"
                    flat 
                    round
                  />

                  <q-btn
                    @click="deleteTwt(twt)"
                    color="grey-5"
                    icon="far fa-trash-alt"
                    size="sm"
                    flat 
                    round
                  />
                  
                </div>
            </q-item-section>

          </q-item>
        </transition-group>

      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import db from 'src/boot/firebase'
import { collection, query, where, onSnapshot, orderBy, 
addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"

export default defineComponent({
  name: 'PageHome',
  data() {
    return{
      newTwtContent: "",
      format,
      formatDistance,
      twts: [

      ]
    }
  },
  methods: {
    addNewTwt() {
      let newTwt = {
        content: this.newTwtContent,
        date: Date.now(),
        liked: false
      }
      //this.twts.unshift(newTwt)
      const docRef = addDoc(collection(db, "twts"), newTwt);
      console.log("Document written with ID: ", docRef.id);
      this.newTwtContent = ""
    },
    deleteTwt(twt) {
      console.log('delete twt', twt)
      deleteDoc(doc(db, "twts", twt.id));

    },
    getRelDate(val) {
      return formatDistance(val, new Date(), 
            {
              includeSeconds: true,
            })
    },
    likeTwt(twt) {
      const twtRef = doc(db, "twts", twt.id);

      // Set the "capital" field of the city 'DC'
      updateDoc(twtRef, {
        liked: !twt.liked
      });

    }
  },
  mounted() {

    const q = query(collection(db, "twts"), orderBy("date"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let twtChange = change.doc.data()
        twtChange.id = change.doc.id
        if (change.type === "added") {
          console.log("New tweet: ", twtChange)
          this.twts.unshift(twtChange)
        }
        if (change.type === "modified") {
          console.log("Modified tweet: ", twtChange);
          let index = this.twts.findIndex(twt => twt.id === twtChange.id)
          Object.assign(this.twts[index], twtChange)
        }
        if (change.type === "removed") {
          console.log("Removed tweet: ", twtChange);
          let index = this.twts.findIndex(twt => twt.id === twtChange.id)
          this.twts.splice(index, 1)
        }
      });
    });
  }
})
</script>

<style lang="sass">
.new-twt
  textarea
    font-size: 19px
    line-height: 1.2 !important

.twt-divider
  border-top: 1px solid
  border-top: 1px solid
  border-color: $grey-4

.twt-content
  white-space: pre-line

.twt-icons
  margin-left: -5px
</style>