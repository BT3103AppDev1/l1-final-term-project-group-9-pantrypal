import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        RecipeFromPage: '',
        selected: '',

      }
    },
    mutations: {
      communitypage (state) {
        state.RecipeFromPage = 'Community Page'
      },
      likedrecipes (state) {
        state.RecipeFromPage = 'Profile'
        state.selected = 'likedRecipes'
      },
      mycookbook (state) {
        state.RecipeFromPage = 'Profile'
        state.selected = 'myCookbook'
      }
    }
  })

export default store