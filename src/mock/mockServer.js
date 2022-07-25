/* 
利用mockjs来mock数据接口
*/
import Mock from 'mockjs'
import recommends from './recommends.json'
import floors from './floors.json'

// 提供今日推荐数据的接口
Mock.mock('/mock/recommends',{
    code: 200,
    data: recommends
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floors',{
    code: 200,
    data: floors
})

console.log('mockServer...')