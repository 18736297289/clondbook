//index.js
//获取应用实例

import {fetch} from '../../utils/util.js';
const app = getApp()

Page({
  data: {
    
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isLoading:false
  },
  onLoad(){
    this.getData()
    this.getcontent()
  },
  //获取轮播图数据
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get('/swiper').then( res => {
      this.setData({
        swiperData:res.data.data,
        isLoading:false
      })
    }).catch(err => {
      this.setData({
        isLoading:false
      })
    })
  },
  //获取按照分类书籍信息
  getcontent(){
    fetch.get('/category/books').then(res =>{
      // console.log(res.data.data)
      this.setData({
         mainContent:res.data.data
      })
    })
  },
  //点击事件
  jump(e){
    console.log("....")
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }
})
  