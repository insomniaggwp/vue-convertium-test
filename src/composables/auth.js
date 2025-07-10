import { ref } from 'vue'
import Cookies from 'js-cookie'

const isLoggedIn = ref(!!Cookies.get('user_id'))

function updateLoginState() {
  isLoggedIn.value = !!Cookies.get('user_id')
}

export function useAuth() {
  return {
    isLoggedIn,
    updateLoginState,
  }
}
