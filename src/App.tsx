import { defineComponent, ref } from "vue";
import axios from 'axios';

export interface Hobby {
  label: string;
  time: string;
}
export interface RootObject {
  name: string;
  age: number;
  hobby: Hobby[];
}

export const App = defineComponent({
  setup() {
    const arr = ref<RootObject[]>([])
    // const labelConvert = (label) => {
    //   console.log(label)
    // }
    const labelConvertMap = {
      game: '玩游戏',
      study: '学习',
      coding: '写代码',
      love: '谈恋爱'
    }
    function daysNum(date1: Date, date2: Date): number {
      const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
      const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
      return Math.round(diffInMilliseconds / oneDay);
    }


    // const res = await axios.get<any>('http://localhost:3000/api/users')
    axios.get<any>('http://localhost:3000/api/users').then(
      res => {
        console.log(res.data)
        arr.value = res.data
      }
    )

    return () => (<div>
      <h3>
        {
          arr.value.map((item, index) => {
            return <p key={index}>
              姓名：{item.name},
              年龄：{item.age},
              爱好：
              {item.hobby.map((l, hobbyIndex) => {
                return <p key={hobbyIndex}>
                  {hobbyIndex + 1}、{labelConvertMap[l.label]},
                  开始{daysNum(new Date(), new Date(l.time))}天了！
                </p>
              })}
              {/* {item.hobby[0].label} */}
            </p>
          })
        }
      </h3>
    </div>)
  }
})