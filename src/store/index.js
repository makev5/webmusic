import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 音乐播放地址
    musicUrl: ''
  },
  mutations: {
    // 得到音乐地址
    getUrl(state, id){
        Axios.get('https://autumnfish.cn/song/url', {
            params: {
                id
            }
        }).then(res=>{
            state.musicUrl = res.data.data[0].url
        })
    }
  },
})
export default store
