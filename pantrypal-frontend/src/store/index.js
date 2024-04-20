import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        RecipeFromPage: '',
      }
    },
    mutations: {
      communitypage (state) {
        state.RecipeFromPage = 'Community Page'
      },
      mycookbook (state) {
        state.RecipeFromPage = 'Profile'
      }
    }
  })

export default store