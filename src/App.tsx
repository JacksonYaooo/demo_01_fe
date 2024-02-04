import { defineComponent, ref } from "vue";
import axios from 'axios';

export const App = defineComponent({
  setup() {
    const arr = ref([])
    // const res = await axios.get<any>('http://localhost:3000/api/users')
    axios.get<any>('http://localhost:3000/api/users').then(
      res => {
        console.log(res.data)
        arr.value = res.data
      }
    )

    return () => (<div>
      <ul>
        {
          arr.value.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>)
  }
})